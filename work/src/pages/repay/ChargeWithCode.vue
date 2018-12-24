<!--
  -- 主动还款（用于外链主动还款），使用 query string user_code 识别用户
  -- @author bigfact
  -->
<template>
  <section class="repay-chargewithcode container fs15">
    <div class="mask" v-if="status != 4"></div>
    <div>
      <img class="logo" src="../../assets/repay/repay-logo.png" alt="">
    </div>
    <div class="title tac">
      <a v-link="'/repay/info'" class="amount fs40 c-main" :class="status == 4 && 'red'">{{ amount }}</a>
      <p class="c-gray">需还金额（元）</p>
    </div>
    <div class="group">
      <div class="row"></div>
      <div class="row">
        <span>姓名</span>
        <span class="fr c-gray">{{ name }}</span>
      </div>
      <div class="row">
        <span>身份证号</span>
        <span class="fr c-gray">{{ idcard }}</span>
      </div>
      <div class="row">
        <span>还款金额</span>
        <span class="fr c-gray">{{ amount }}元</span>
      </div>
      <div class="row link" @click="goChoose()">
        <span>还款方式</span>
        <span class="card-desc fr c-green" v-show="bank.individual_card_id > 0" :style="bank.bank_code ? {'background-image': 'url(./static/img/bank/' + bank.bank_code + '.png)'} : {'background-image': 'url(' + bank.bank_icon + ')'}">{{ bank.card_desc }}</span>
      </div>
    </div>
    <div class="btn-wrap">
      <button :class="button.class" v-submit="{cb: submit}">{{ button.name }}</button>
    </div>
    <!-- 短信验证码弹窗 -->
    <div class="pop-sms" v-show="formSms.show">
      <div class="mask"></div>
      <div class="dialog">
        <p class="fs17">验证手机号</p>
        <p>已向您银行卡预留手机尾号{{ bank.individual_card_tel }}发送了验证码</p>
        <div class="sms-wrap">
          <input type="text" v-model="formSms.model" placeholder="输入短信验证码">
          <button class="fs14" :class="formSms.btnTitle != formSms.btnNow && 'disable'" @click="getSms()">{{ formSms.btnNow }}</button>
        </div>
        <p class="err" v-show="formSms.errshow">{{ formSms.errshow }}</p>
        <button class="btn" v-submit="{cb: smsClick}">{{ formSms.name }}</button>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    // 提交按钮
    button: {
      name: '确认还款',
      class: 'btn disabled'
    },
    // 短信验证码表单
    formSms: {
      model: '',
      show: false,
      reg: regexp.empty,
      err0: '验证码不能为空',
      err1: '验证码输入有误',
      errshow: '',
      name: '确定',
      class: 'btn',
      click: '',
      btnTitle: '重新获取',
      btnNow: '重新获取',
      timeAll: 60,
      timeNow: 60,
      tid: -1,
    },
    // 还款银行卡
    bank: {
      bank_code: '',            // 银行代码
      individual_card_id: 0,    // 银行卡id
      card_desc: '',            // 银行卡显示内容
      individual_card_tel: '',  // 银行卡预留手机号尾号
      bank_icon: '',            // 银行图标
    },
    // 用户名
    name: '',
    // 身份证号
    idcard: '',
    // 还款金额
    amount: '',
    // 用户识别 code
    user_code: sysinfo.getQueryString('user_code'),
    // 还款状态
    status: 0, //还款状态 4-待还款 5-已还完 8-待确认
    // 本页面的来源标识
    from: 'repayCharge',
  }
  export default {
    data() {
      // 充值银行卡和金额数据获取
      ajax.get('/v3/pay/get-repay', {
        user_code: $data.user_code,
      }).then(function (xhr, res) {
        if (res.code == 0) {
          // $data.bank = res.data.card
          $data.idcard = res.data.card.individual_identity
          $data.name = res.data.card.individual_name
          $data.amount = res.data.amount
          // status 还款状态 4-待还款 5-已还完 8-待确认
          $data.status = res.data.status
          // $data.status = 5
          if ($data.status == 4) {
            $data.button.name = '确认还款'
            $data.button.class = 'btn'
          }
          else if ($data.status == 5) {
            $data.button.name = '账单已还清'
            $data.button.class = 'btn disabled'
          }
          else if ($data.status == 8) {
            $data.button.name = '还款待确认'
            $data.button.class = 'btn disabled'
          }

          var tmp = ''
          // 使用接口返回的默认还款银行卡数据
          $data.bank.individual_card_id = res.data.card.individual_card_id
          $data.bank.card_desc = res.data.card.card_desc
          tmp = res.data.card.individual_card_tel
          $data.bank.individual_card_tel = tmp.substr(tmp.length - 4, tmp.length - 1)
          // 获取 localStorage 中设置的银行卡数据
          try {
            tmp = JSON.parse(store.local.get($data.from))
            console.log(tmp)
            $data.bank.individual_card_id = tmp.id
            $data.bank.card_desc = tmp.bank_name + ' ' + tmp.desc
            $data.bank.individual_card_tel = tmp.tel.substr(tmp.tel.length - 4, tmp.tel.length - 1)
            $data.bank.bank_icon = tmp.bank_icon
            $data.bank.bank_code = ''
          } catch (err) {
            store.local.remove($data.from)
          }

          // // 测试
          // $data.bank = {
          //   individual_card_id: 1,//银行卡id
          //   individual_card_num: "**** **** **** **** 7092",//银行卡号
          //   individual_card_tel: "153*****2513",//银行预留手机号
          //   bank_name: "建设银行" //银行名称
          // }

        }
        else {
          layer.warning(res.message)
        }
      })

      // // 测试
      // $data.formSms.show = true

      return $data
    },
    methods: {
      // 跳转到银行卡选择页面
      goChoose() {
        parseFloat($data.amount) > 0 && this.$router.go('/bank/list?from=' + $data.from)
        // this.$router.go('/bank/list?from=' + $data.from)
      },
      /**
       * 确认支付
       * @param { Bool } isSendSms 是否为发送短信，如果为发送短信，则发送接口数据 code 为空
       */
      submit(isSendSms) {
        if (!$data.amount || !$data.bank.individual_card_id || $data.bank.individual_card_id < 0 || $data.status != 4) return
        var lid = layer.loading(false)
        var _this = this
        var data = {
          individual_card_id: $data.bank.individual_card_id,
          amount: $data.amount,
          code: isSendSms ? '' : $data.formSms.model,
          user_code: $data.user_code,
        }
        ajax.post('/v3/pay/charge', data)
          .then(function (xhr, res) {
            // 0-成功 1-失败 2-待确认 5-需要短信验证码
            var code = res.code
            if (code == 0) {
              location.href = '#!/repay/status?status=success&amount=' + $data.amount
            }
            else if (code == 1) {
              location.href = '#!/repay/status?status=fail&message=' + encodeURI(res.message)
            }
            else if (code == 2) {
              location.href = '#!/repay/status?status=doing'
            }
            else if (code == 5) {
              $data.formSms.show = true
              _this.smsTimeOn()
            }
            else {
              layer.warning(res.message)
            }
            if (code != 5) {
              _this.smsTimeInit()
            }
          })
          .catch(function (err, xhr) {
            _this.smsTimeInit()
            layer.warning('出错啦，请稍后尝试 - ' + xhr.status)
          })
          .complete(function () {
            layer.close(lid)
          })
      },
      // 获取短信验证码
      getSms() {
        if (!$data.amount || !$data.bank.individual_card_id || $data.bank.individual_card_id < 0) return
        // 防止连点
        if ($data.formSms.btnNow != $data.formSms.btnTitle) return
        $data.formSms.btnNow = $data.formSms.timeAll + ' s'
        this.submit(true)
      },
      // 检查短信验证码
      checkSms() {
        if (!$data.formSms.reg($data.formSms.model)) {
          $data.formSms.errshow = $data.formSms.err0
          return false
        }
        $data.formSms.errshow = ''
        return true
      },
      // 短信验证码获取按钮倒计时初始化
      smsTimeInit() {
        clearInterval($data.formSms.tid)
        $data.formSms.btnNow = $data.formSms.btnTitle
        $data.formSms.timeNow = $data.formSms.timeAll
      },
      // 短信验证码获取按钮倒计时
      smsTimeOn() {
        $data.formSms.timeNow = $data.formSms.timeAll
        $data.formSms.tid = setInterval(function () {
          $data.formSms.timeNow--
          if ($data.formSms.timeNow) {
            $data.formSms.btnNow = $data.formSms.timeNow + ' s'
          }
          else {
            $data.formSms.btnNow = $data.formSms.btnTitle
            $data.formSms.timeNow = $data.formSms.timeAll
            clearInterval($data.formSms.tid)
          }
        }, 1000)
      },
      // 短信按钮点击
      smsClick() {
        if (!this.checkSms()) return
        this.submit()
      }
    },
    destroyed() {
      store.local.remove($data.from)
      $data.bank.individual_card_id = 0
      $data.bank.card_desc = ''
      $data.bank.individual_card_tel = ''
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay-chargewithcode {
    .mask {
      background: rgba(0, 0, 0, 0);
    }
    .logo {
      height: px2rem(30);
      margin: px2rem(16);
    }
    .amount {
      display: inline-block;
      padding: 0 px2rem(30);
      background: url('../../assets/repay/info.png') right top / px2rem(20) no-repeat;
      &.red {
        background: url('../../assets/repay/info-red.png') right top / px2rem(20) no-repeat;
      }
    }
    .title {
      padding: px2rem(12) 0 0;
    }
    .card-desc {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: 0 center;
      display: inline-block;
      padding-left: px2rem(23);
    }
    .row {
      padding: px2rem(20) px2rem(16);
    }
    .link {
      padding-right: px2rem(25);
      background-position: 99%;
    }
    .btn-wrap {
      padding: px2rem(55) px2rem(12) px2rem(15);
      a {
        width: auto;
      }
    }
    .dialog {
      position: fixed;
      top: px2rem(100);
      left: 0;
      right: 0;
      width: px2rem(270);
      border-radius: 5px;
      margin: 0 auto;
      padding: px2rem(20);
      text-align: center;
      background: #FFF;
      z-index: 1000;
      .sms-wrap {
        height: px2rem(30);
        padding: px2rem(10) px2rem(20);
        >* {
          float: left;
        }
        input {
          border: 1px solid $light;
          width: 65%;
          height: 100%;
          padding: 0 px2rem(10);
          box-sizing: border-box;
        }
        button {
          height: 100%;
          width: 33%;
          background: $main-color;
          color: #FFF;
          margin-left: 2%;
          &:active {
            box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
          }
        }
        .disable {
          background: $gray;
        }
      }
      .err {
        color: $red;
      }
      .btn {
        width: px2rem(225);
        margin-top: px2rem(10);
      }
    }
  }
</style>