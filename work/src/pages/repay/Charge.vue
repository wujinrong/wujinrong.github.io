<!--
  -- 充值还款
  -- @author bigfact
  -->
<template>
  <section class="repay-charge container fs15" v-show="ready">
    <div class="title tac">
      <p class="fs40 c-main">{{ amount }}</p>
      <p class="c-gray">应还金额(元)</p>
    </div>
    <div class="group">
      <div class="row"></div>
      <a class="row link" v-link="'/bank/list?from=' + from">
        <span>支付方式</span>
        <span class="card-desc fr c-green" v-show="bank.individual_card_id > 0" :style="bank.bank_code ? {'background-image': 'url(./static/img/bank/' + bank.bank_code + '.png)'} : {'background-image': 'url(' + bank.bank_icon + ')'}">{{ bank.card_desc }}</span>
      </a>
      <div class="row">
        <span>支付金额</span>
        <span class="fr c-light">{{ amount }}元</span>
      </div>
    </div>
    <div class="btn-wrap">
      <button class="btn" v-submit="{cb: submit}">立即支付</button>
    </div>
    <div class="tac c-light">暂不支持信用卡，请选择借记卡支付</div>
    <!-- 短信验证码弹窗 -->
    <div class="pop-sms" v-show="formSms.show">
      <div class="mask"></div>
      <div class="dialog">
        <p class="fs18">验证手机号</p>
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
    period: [],
    // 还款金额
    amount: '',
    // 本页面的来源标识
    from: 'repayCharge',
    ready: false
  }
  export default {
    data() {
      // 如果充值页面来源是“申请延期”，那么获取还款类型为“延期还款”，默认为“进件还款”
      var type = this.$route.query.from == '/repay/delay' ? 'equipment' : ''
      /**
       * 充值银行卡和金额数据获取
       * https://git.fond.io/b/paydayloan/wikis/appv1/repay-pay-info
       */
       // repay/pay-info
       if (this.$route.query.arr) {
         var Period = this.$route.query.arr.split(',')
         Period = Period.map(function(item){
          return +item
         })
       }else{
         var Period = ''
       }
      $data.period = Period
      ajax.get('/v3/repay/pay-info',{period:Period})
        .then(function (xhr, res) {
          if (res.code == 0) {
            var tmp = ''
            // 使用接口返回的默认还款银行卡数据
            $data.bank.bank_code = res.data.card.bank_code
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
          // 需还款金额
          $data.amount = res.data.amount
          $data.ready = true
        }
        else {
          layer.warning(res.message)
        }
      })

      // // testdata
      // $data.formSms.show = true

      return $data
    },
    methods: {
      /**
       * 确认支付
       * @param { Bool } isSendSms 是否为发送短信，如果为发送短信，则发送接口数据 code 为空
       */
      submit(isSendSms) {
        if (!$data.amount || !$data.bank.individual_card_id || $data.bank.individual_card_id < 0) return
        var _this = this

        // // testdata
        // _this.$router.go('/repay/status?status=doing&message=' + encodeURI('由于银行系统繁忙，你的支付结果正在处理确认中'))
        // return

        var lid = layer.loading(false)
        var data = {
          individual_card_id: $data.bank.individual_card_id,
          amount: $data.amount,
          code: isSendSms ? '' : $data.formSms.model,
          period: $data.period
        }
        ajax.post('/v3/repay/charge', data)
          .then(function (xhr, res) {
            // 0-成功 1-失败 2-待确认 4-需要短信验证码
            var code = res.data.status
            if (code == 0) {
              location.href = '#!/repay/status?status=success&amount=' + $data.amount
            }
            else if (code == 1) {
              location.href = '#!/repay/status?status=fail&message=' + encodeURI(res.message)
            }
            else if (code == 2) {
              location.href = '#!/repay/status?status=doing'
            }
            else if (code == 4) {
              $data.formSms.show = true
              _this.smsTimeOn()
            } else {
              layer.warning(res.message)
            }
            if (code != 4) {
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
  .repay-charge {
    .title {
      padding: px2rem(35) 0 0;
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
      width: px2rem(220);
      border-radius: 5px;
      margin: 0 auto;
      padding: px2rem(20);
      text-align: center;
      background: #FFF;
      z-index: 1000;
      .sms-wrap {
        height: px2rem(30);
        padding: px2rem(10) 0;
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
