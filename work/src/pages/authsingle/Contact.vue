<!--
  -- 手机运营商
  -- @desciption 单期贷手机运营商信息填写
  -- @author bigfact
  -- @date 2017.05.18
  -->
<template>
  <section class="authsingle-contact fs18">
    <!--运营商信息验证-->
    <div class="form bg-white">
      <div class="row line"></div>
      <div class="row">
        <span>手机号码</span>
        <span class="form-value">{{ phone.model }}</span>
      </div>
      <div class="row">
        <span>密码</span>
        <input type="text" class="pwd-input form-value" placeholder="请输入您的手机卡服务密码" v-model="password.model">
      </div>
    </div>
    <div class="forget-link tar fs15">
      <a v-link="'/auth/contact/forget'" class="c-warning">忘记密码？</a>
    </div>
    <div class="tip-wrap">
      <div class="tip-title fs16">温馨提示：</div>
      <div class="fs14 c-placeholder">
        <p>1、服务密码是指用户用于登录手机网上营业厅的6位数字密码。</p>
        <p>2、如果您忘记密码，可点击“忘记密码”来重置。</p>
      </div>
    </div>
    <!--下一步按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">提交</button>
    <!--运营商信息短信验证码弹窗-->
    <div class="pop-sms" v-show="form_sms.show">
      <div class="mask"></div>
      <div class="dialog">
        <div class="dialog-close" v-on:click="close()"></div>
        <div class="title">请输入短信验证码</div>
        <div>
          <input type="text" v-model="form_sms.model">
        </div>
        <div class="err">{{ form_sms.errshow }}</div>
        <button class="btn fs20" v-submit="{cb: submit_sms}">确认</button>
      </div>
    </div>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    phone: {
      model: ''
    },
    password: {
      model: '',
      reg: regexp.empty,
      err: '服务密码不能为空'
    },
    form_sms: {
      model: '',
      show: false,
      reg: regexp.empty,
      err: '短信验证码不能为空',
      errshow: ''
    }
  }
  export default {
    data() {
      // $data.form_sms.show = true
      /**
       * 获取数据
       * http://git.fond.io/b/paydayloan/wikis/appv1/contact-operator-config
       */
      ajax.get('/v3/contact/operator-config')
        .then(function (xhr, res) {
          if (res.code == 0) {
            $data.phone.model = res.data.tel
          } else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * 验证方法
       * @param {String} value           待验证值
       * @param {Function} validFunction 验证方法
       * @param {String} errTip          错误提示
       */
      validate(value, validFunction, errTip) {
        if (validFunction(value)) return true
        layer.tip(errTip)
        return false
      },
      /**
       * 提交数据
       */
      submit() {
        var _this = this

        // 检查表单
        if (!_this.validate($data.password.model, $data.password.reg, $data.password.err)) return

        // loading
        var lid = layer.loading2(false, '数据提交中...')
        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/contact-operator-save
         */
        ajax.post('/v3/contact/operator-save', {
          mobile_pwd: $data.password.model,
          product_type: $data.applytype
        }).then(function (xhr, res) {
          if (res.code == 0) {
            if (res.data.status == 4) $data.form_sms.show = true // 显示验证码框
            else _this.gotoSuccess()
          } else {
            layer.warning(res.message)
          }
        }).complete(function () {
          layer.close(lid)
        })
      },
      /**
       * 提交短信验证码
       */
      submit_sms() {
        // 检查表单
        var reg = $data.form_sms.reg
        if (!reg($data.form_sms.model)) {
          $data.form_sms.errshow = $data.form_sms.err
          return
        } else {
          $data.form_sms.errshow = ''
        }

        // loading
        var lid = layer.loading(false)

        var _this = this

        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/contact-code
         */
        ajax.post('/v3/contact/code', {
          mobile_code: $data.form_sms.model,
          product_type: $data.applytype
        }).then(function (xhr, res) {
          if (res.code == 0) {
            $data.form_sms.errshow = ''
            $data.form_sms.show = false
            _this.gotoSuccess()
          } else {
            $data.form_sms.errshow = res.message
          }
        }).complete(function () {
          layer.close(lid)
        })
      },
      /**
       * 关闭短信验证码弹框
       */
      close() {
        $data.form_sms.show = false
      },
      /**
       * 跳转到成功页面
       */
      gotoSuccess() {
        // this.$router.go('/auth/submit/success')
        history.back()
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .authsingle-contact {
    padding-top: px2rem(10);
    .form {
      .row {
        padding: px2rem(18) px2rem(16);
      }
      .line {
        padding: 0;
        height: 1px;
      }
    }
    .form-value {
      float: right;
      font-size: px2rem(15);
      margin-top: px2rem(3);
      text-align: right;
    }
    .pwd-input {
      width: px2rem(220);
    }
    .forget-link {
      padding: px2rem(15) px2rem(9);
    }
    .tip-wrap {
      padding: px2rem(15) px2rem(16) 0;
    }
    .tip-title {
      padding-bottom: px2rem(14);
    }
    .close {
      position: relative;
      right: px2rem(-9);
      background: url('../../assets/auth/contact/close.png') no-repeat 100%;
      background-size: px2rem(15);
      padding-top: px2rem(30);
      margin-bottom: px2rem(-20);
      >div {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: px2rem(30);
        width: px2rem(30);
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
      padding: px2rem(10) px2rem(10) px2rem(30);
      text-align: center;
      background: #FFF;
      z-index: 1000;
      .dialog-close {
        background: url('../../assets/close.png') no-repeat 100%;
        background-size: contain;
        height: px2rem(15);
      }
      .title {
        font-size: px2rem(17);
        padding: px2rem(15) 0;
      }
      input {
        height: px2rem(40);
        width: px2rem(225);
        border: 1px solid $light;
        border-radius: 3px;
        text-align: center;
      }
      .err {
        color: $red;
        padding: px2rem(10) 0 px2rem(20);
      }
      .btn {
        width: px2rem(140);
      }
    }
  }
</style>