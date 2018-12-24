<!--
  -- 充值还款
  -- @author bigfact
  -->
<template>
  <section class="repay-charge container fs15" v-show="ready">
    <div class="title tac">
      <p class="fs40 c-main">{{ amount_desc }}</p>
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
  </section>
</template>

<script>
  var $data = {
    // 还款银行卡
    bank: {
      bank_code: '',            // 银行代码
      individual_card_id: 0,    // 银行卡id
      card_desc: '',            // 银行卡显示内容
      individual_card_tel: '',  // 银行卡预留手机号尾号
      bank_icon: '',            // 银行图标
    },
    // 还款金额
    amount: '',
    // 小数点后两位
    amount_desc: '',
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
      ajax.get('/v3/repay/pay-info', {
        type: type
      }).then(function (xhr, res) {
        if (res.code == 0) {
          var tmp = ''
          // 使用接口返回的默认还款银行卡数据
          $data.bank.bank_code = res.data.card.bank_code
          $data.bank.individual_card_id = res.data.card.individual_card_id
          $data.bank.card_desc = res.data.card.bank_name + ' ' + res.data.card.card_desc
          tmp = res.data.card.individual_card_tel
          $data.bank.individual_card_tel = tmp.substr(tmp.length - 4, tmp.length - 1)
          // 获取 localStorage 中设置的银行卡数据
          try {
            tmp = JSON.parse(store.local.get($data.from))
            console.log(tmp)
            if (tmp) {
              $data.bank.individual_card_id = tmp.id
              $data.bank.card_desc = tmp.bank_name + ' ' + tmp.desc
              $data.bank.individual_card_tel = tmp.tel.substr(tmp.tel.length - 4, tmp.tel.length - 1)
              $data.bank.bank_icon = tmp.bank_icon
              $data.bank.bank_code = ''
            }
          } catch (err) {
            store.local.remove($data.from)
          }
          // 需还款金额
          $data.amount = res.data.amount
          $data.amount_desc = res.data.amount_desc
          $data.ready = true
        }
        else {
          layer.warning(res.message)
        }
      })

      // // testdata

      return $data
    },
    methods: {
      /**
       * 确认支付
       */
      submit() {
        if (!$data.amount || !$data.bank.individual_card_id || $data.bank.individual_card_id < 0) return
        var _this = this

        // // testdata
        // _this.$router.go('/repay/status?status=doing&message=' + encodeURI('由于银行系统繁忙，你的支付结果正在处理确认中'))
        // return

        var lid = layer.loading(false)
        var data = {
          individual_card_id: $data.bank.individual_card_id,
          amount: $data.amount,
        }
        /**
         * 调用充值接口
         * https://git.fond.io/b/paydayloan/wikis/charge-v2
         */
        ajax.post('/v3/deferment/with-draw', data)
          .then(function (xhr, res) {
            // 0-成功 1-失败 2-待确认 5-需要短信验证码
            var code = res.code
            if (code == 0) {
              _this.$router.go('/repay/status?status=success&amount=' + $data.amount)
              // location.href = '#!/repay/status?status=success&amount=' + $data.amount
            } else if (code == 1) {
              _this.$router.go('/repay/status?status=fail&message=' + encodeURI(res.message))
              // location.href = '#!/repay/status?status=fail&message=' + encodeURI(res.message)
            } else if (code == 2) {
              _this.$router.go('/repay/status?status=doing&message=' + encodeURI('由于银行系统繁忙，你的支付结果正在处理确认中'))
              // location.href = '#!/repay/status?status=doing'
            } else {
              layer.warning(res.message)
            }
          })
          .catch(function (err, xhr) {
            layer.warning('出错啦，请稍后尝试 - ' + xhr.status)
          })
          .complete(function () {
            layer.close(lid)
          })
      },

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

  }
</style>
