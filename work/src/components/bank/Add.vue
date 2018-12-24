<!--
  -- 添加银行卡
  -- @author bigfact
  -->
<template>
  <section class="bank-add container fs15">
    <!-- 收款银行卡 -->
    <div class="form">
      <div class="row">
        <label for="">持卡人</label>
        <span class="individual-name">{{ user.individual_name }}</span>
        <span class="fr">{{ user.individual_identity }}</span>
      </div>
      <d-form v-bind:form="formBankCard" v-bind:index='1'></d-form>
    </div>
    <!-- 支持银行卡链接 -->
    <div class="support-link tar">
      <a class="c-green" v-link="'/bank/support'">查看支持的银行</a>
    </div>
    <!-- 提交按钮 -->
    <div class="btn-wrap">
      <button class="btn" v-submit="{cb: submit}">确认添加</button>
    </div>
  </section>
</template>

<script>
  import DForm from '../directives/DForm.vue'

  var $data = {
    // 持卡人信息
    user: {
      individual_name: '',
      individual_identity: '',
    },
    // 收款银行卡信息
    formBankCard: {
      check: '',
      num: {
        key: '卡号',
        model: '',
        type: 'text',
        reg: regexp.bankcard,
        placeholder: '银行卡号',
        err: '请填写正确的银行卡号',
        errshow: '',
      },
      tel: {
        key: '银行预留手机号',
        model: '',
        maxlength: 11,
        type: 'tel',
        reg: regexp.phone,
        err: '请填写正确的银行预留手机号',
        errshow: '',
      },
    },
    // 用户识别 code
    user_code: '',
    // 是否添加过银行卡
    added: false
  }

  export default {
    data() {
      $data.user_code = sysinfo.getQueryString('user_code')
      // 数据获取
      ajax.get('/v3/util/get-user-info', {
        user_code: $data.user_code
      }).then(function (xhr, res) {
        if (res.code == 0) {
          $data.user = res.data
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      submit() {
        var pass = true
        // 银行卡检查
        typeof $data.formBankCard.check === 'function' && !$data.formBankCard.check() && (pass = false)
        if (!pass) return
        // 检查通过
        var _this = this
        var lid = layer.loading(false)
        var data = {
          card_no: $data.formBankCard.num.model,
          phone: $data.formBankCard.tel.model,
          user_code: $data.user_code,
        }
        ajax.post('/v3/pay/bind', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              // location.href = '#!/bank/choose'
              $data.added = true
              if (_this.$route.query.from == 'mywithdrawals') {
                // 来源为个人中心提现按钮，添加完银行卡之后跳转到提现页面
                _this.$router.replace('/my/withdrawals-detailed')
              } else {
                history.back()
              }
            } else {
              layer.warning(res.message)
            }
          })
          .complete(function () {
            layer.close(lid)
          })
      },
    },
    components: {
      DForm: DForm
    },
    destroyed() {
      // 如果添加过银行卡，则清除数据
      if ($data.added) {
        $data.formBankCard.num.model = ''
        $data.formBankCard.tel.model = ''
        $data.added = false

      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .bank-add {
    .form {
      padding-top: px2rem(10);
    }
    .individual-name {
      padding-left: px2rem(20);
    }
    .row {
      padding: px2rem(20) px2rem(15);
      margin-top: 0;
    }
    .err {
      padding-right: px2rem(15);
    }
    .support-link {
      padding: px2rem(15);
    }
    .btn-wrap {
      margin: px2rem(30) 0;
    }
  }
</style>