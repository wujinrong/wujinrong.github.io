<!--
  -- 手机号验证页面（微信端使用）
  -- @author bigfact
  -->
<template>
  <section class="auth-phone-verify container">
    <div class="form">
      <!--手机号-->
      <div class="row">
        <span>手机号</span>
        <input class="phone-input fr tar" v-model="phone.model" type="tel" maxlength="11" placeholder="请输入本人实名认证手机号">
      </div>
      <!--短信验证码-->
      <div class="sms" v-show="phone.model != phone.old_model || phone.model == ''">
        <div class="row">
          <label for="sms">验证码</label>
          <button class="btn fr" v-submit="{cb: sendsms}">{{ sms.name }}</button>
          <input class="tar fr" name="sms" type="text" maxlength="6" placeholder="请输入验证码" v-model="sms.model">
        </div>
      </div>
    </div>
    <!--提交按钮-->
    <div class="btn-wrap">
      <button class="btn outline" v-submit="{cb: submit}">下一步</button>
    </div>
    <!--图片验证码组件-->
    <d-img-code :verify="imgCode.verify" @verified="imgCodeVerified" v-show="imgCode.show"></d-img-code>
  </section>
</template>

<script>
  import jsBase64 from 'js-base64'
  import DImgCode from '../../components/common/DImgCode.vue'
  
  // 导入计算 sign 的服务
  import getSign from '../../services/getsign.js'

  var $data = {
    // 手机信息
    phone: {
      model: '',
      old_model: '',
      reg: regexp.phone,
      err: '请填写正确的手机号'
    },
    // 短信验证码（包含按钮信息）
    sms: {
      model: '',
      reg: regexp.empty,
      btntitle: '获取验证码',
      name: '获取验证码',
      timeall: 60,
      timenow: 60,
      err: '请填写验证码'
    },
    // 图片验证码
    imgCode: {
      ticket: '',
      show: false,
      verify: false
    },
    ref: '' // 验证完成跳转页面
  }
  export default {
    data() {
      var _this = this
      // 隐藏短信报错信息
      $data.sms.errshow = false
      // 验证完成跳转页面
      $data.ref = jsBase64.Base64.decode(_this.$route.query.ref || '')
      // console.log($data.ref)
      // $data.ref && (location.href = $data.ref)
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
      // 发送短信验证码
      sendsms() {
        // 检查是否发送过验证码
        if ($data.sms.timenow != $data.sms.timeall) return
        var _this = this
        // 检查手机号
        if (!_this.validate($data.phone.model, $data.phone.reg, $data.phone.err)) return
        // 计时开始，防止连续点击
        $data.sms.timenow = $data.sms.timeall - 1
        $data.sms.name = $data.sms.timenow + ' s'
        /**
         * 发送验证码，0 代表第一次发送成功，101014 代表重复发送成功
         * http://git.fond.io/b/paydayloan/wikis/appv1/user-signup-code
         */
        ajax.get('/v3/util/verify-code', {
          phone: $data.phone.model,
          ticket: $data.imgCode.ticket,
          type: 72,
          sign: getSign([$data.phone.model, $data.imgCode.ticket, 72])
        }).then(function (xhr, res) {
          if (res.code == 0 || res.code == 101014) {
            var tid = setInterval(function () {
              $data.sms.timenow--
              if ($data.sms.timenow) {
                $data.sms.name = $data.sms.timenow + ' s'
              } else {
                $data.sms.name = $data.sms.btntitle
                $data.sms.timenow = $data.sms.timeall
                clearInterval(tid)
              }
            }, 1000)
            res.code == 101014 && layer.tip(res.message)
          } else {
            if (res.code === 106002 || res.code == 106003) _this.showImgCode()
            else layer.tip(res.message)
            $data.sms.name = $data.sms.btntitle
            $data.sms.timenow = $data.sms.timeall
          }
        }).catch(function (err, xhr) {
          $data.sms.name = $data.sms.btntitle
          $data.sms.timenow = $data.sms.timeall
          layer.warning('出错啦，请稍后尝试 - ' + xhr.status)
        })
      },
      /**
       * 显示图片验证码
       */
      showImgCode() {
        $data.imgCode.show = true
        $data.imgCode.verify = true
      },
      /**
       * 图片验证码组件验证成功监听方法
       * @param {Object} data        事件附带数据
       * @param {String} data.ticket 验证码验证成功票据
       */
      imgCodeVerified(data) {
        // console.log(data)
        $data.imgCode.ticket = data.ticket
        $data.imgCode.show = false
        $data.imgCode.verify = false
        // 验证完成，自动发送短信验证码
        if (data.ticket) this.sendsms()
      },
      // 提交数据
      submit() {
        // 检查手机号
        if (!this.validate($data.phone.model, $data.phone.reg, $data.phone.err)) return
        // 检查手机号
        if (!this.validate($data.sms.model, $data.sms.reg, $data.sms.err)) return
        // 提交数据组装
        var data = {
          phone: $data.phone.model,
          verify_code: $data.sms.model
        }
        // loading
        var lid = layer.loading2(false, '验证中...')
        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/phone-verify
         */
        ajax.post('/v3/user/phone-verify', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              // location.href = '#!auth/identity'
              if ($data.ref) location.href = $data.ref
              else layer.warning('手机绑定成功!')
            } else {
              layer.warning(res.message)
            }
          })
          .complete(function () {
            layer.close(lid)
          })
      }
    },
    components: {
      DImgCode: DImgCode
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .auth-phone-verify {
    .form {
      padding: px2rem(10) px2rem(22.5) 0;
    }
    .phone-input {
      width: px2rem(150);
    }
    .sms {
      .row {
        margin-top: px2rem(14);
        padding-bottom: px2rem(7);
      }
      input {
        width: px2rem(100);
      }
      .btn {
        display: inline-block;
        width: px2rem(85);
        border-radius: px2rem(85);
        font-size: px2rem(13);
        padding: px2rem(5) 0 px2rem(4);
        background: $red;
        margin: px2rem(-5) 0 0 px2rem(10);
      }
    }
    .btn-wrap {
      margin-top: px2rem(50);
    }
  }
</style>