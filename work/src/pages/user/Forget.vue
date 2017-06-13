<!--
  -- 忘记密码
  -- @author bigfact
  -- @date 2017.05.26
  -->
<template>
  <section class="user-forget container">
    <!--banner-->
    <d-banner></d-banner>
    <!--表单-->
    <div class="form fs16">
      <!--手机号-->
      <div class="row">
        <input type="tel" maxlength="11" placeholder="请输入本人实名认证手机号" v-model="phone.model" @blur="checkitem('phone')">
        <span class="clear" v-show="phone.model" @click="clear()"></span>
        <p class="err" v-show="phone.errshow">{{ phone.err }}</p>
      </div>
      <!--短信验证码-->
      <div class="row">
        <input type="text" placeholder="请输入验证码" v-model="sms.model" @blur="checkitem('sms')">
        <span class="fs15" @click="sendsms()">{{ sms.btn }}</span>
        <p class="err" v-show="sms.errshow">{{ sms.err }}</p>
      </div>
      <!--密码-->
      <div class="row">
        <input type="{{ seePwd ? 'text' : 'password' }}" maxlength="16" placeholder="请设置6-16位密码" v-model="password.model" @blur="checkitem('password')">
        <span class="fs15" v-show="password.model" @click="showPwd()">{{ seePwd ? '隐藏' : '显示' }}</span>
        <p class="err" v-show="password.errshow">{{ password.err }}</p>
      </div>
      <!--提交按钮-->
      <button class="btn outline" v-submit="{cb: submit}">找回密码</button>
      <!--其他按钮-->
      <div class="link tac fs12"><a v-link="{ path: '/user/login' + (phone.model && '?phone=' + phone.model), replace: true, }">返回登录</a></div>
    </div>
    <!--某一次推广提的**需求，请忽略-->
    <div v-if="companyName" class="tac c-gray fs12" style="padding-top: 3rem; line-height: 2.4rem;">{{{ companyName }}}</div>
    <!--登录态判断组件-->
    <d-islogin></d-islogin>
    <!--图片验证码组件-->
    <d-img-code :verify="imgCode.verify" @verified="imgCodeVerified" v-show="imgCode.show"></d-img-code>
  </section>
</template>

<script>
  import DIslogin from '../../components/directives/DIslogin.vue'
  import DBanner from '../../components/directives/DBanner.vue'
  import DImgCode from '../../components/common/DImgCode.vue'

  // 导入计算 sign 的服务
  import getSign from '../../services/getsign.js'

  var $data = {
    phone: {
      model: '',
      reg: regexp.phone,
      err: '请填写正确的手机号',
      errshow: '',
    },
    sms: {
      model: '',
      reg: regexp.empty,
      err: '请填写验证码',
      errshow: '',
      btntitle: '获取验证码',
      btn: '获取验证码',
      timeall: 60,
      timenow: 60,
    },
    password: {
      model: '',
      reg: function (val) {
        var tmp = new RegExp('^\\S{6,16}$')
        return tmp.test(val)
      },
      err: '请输入正确格式的密码',
      errshow: '',
    },
    // 图片验证码
    imgCode: {
      ticket: '',
      show: false,
      verify: false
    },
    // 是否显示密码
    seePwd: false,
    companyName: sysinfo.getQueryString('channel') == '5800a2f3d4a7' ? '<p>贷上钱</p><p>柳州市金亿通小额贷款股份有限公司</p>' : '',
  }

  export default {
    data() {
      var phone = this.$route.query.phone
      $data.phone.reg(phone) && ($data.phone.model = phone)
      return $data
    },
    methods: {
      // 清除手机号
      clear() {
        $data.phone.model = ''
      },
      // 检查 input 值
      checkitem(key) {
        var item = $data[key]
        if (item.reg(item.model)) {
          item.errshow = false
          return true
        } else {
          item.errshow = true
          return false
        }
      },
      // 显示或隐藏密码
      showPwd() {
        $data.seePwd = !$data.seePwd
      },
      // 发送短信验证码
      sendsms() {
        var _this = this
        if (!_this.checkitem('phone')) return
        if ($data.sms.timenow != $data.sms.timeall) return
        $data.sms.timenow = $data.sms.timeall - 1
        $data.sms.btn = $data.sms.timenow + ' s'
        /**
         * 发送短信验证码
         * https://git.fond.io/b/paydayloan/wikis/appv1/user-signup-code
         */
        ajax.get('/v3/util/verify-code', {
          phone: $data.phone.model,
          ticket: $data.imgCode.ticket,
          type: 71,
          sign: getSign([$data.phone.model, $data.imgCode.ticket, 71])
        }).then(function (xhr, res) {
          if (res.code == 0) {
            var tid = setInterval(function () {
              $data.sms.timenow--
              if ($data.sms.timenow) {
                $data.sms.btn = $data.sms.timenow + ' s'
              } else {
                $data.sms.btn = $data.sms.btntitle
                $data.sms.timenow = $data.sms.timeall
                clearInterval(tid)
              }
            }, 1000)
          } else {
            if (res.code === 106002 || res.code == 106003) _this.showImgCode()
            else layer.tip(res.message)
            $data.sms.btn = $data.sms.btntitle
            $data.sms.timenow = $data.sms.timeall
          }
        }).catch(function (err, xhr) {
          $data.sms.btn = $data.sms.btntitle
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
        var pass = true
        pass = this.checkitem('phone') && pass
        pass = this.checkitem('sms') && pass
        pass = this.checkitem('password') && pass
        if (!pass) return
        var router = this.$router
        var data = {
          phone: $data.phone.model,
          verify_code: $data.sms.model,
          password: $data.password.model,
        }
        var loading = layer.loading(false)
        /**
         * 找回密码
         * https://git.fond.io/b/paydayloan/wikis/user-signup-v2
         */
        ajax.post('/v3/user/findpwd', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              if (sysinfo.dsq.isapp()) sysinfo.dsq.logout()
              else router.replace('/user/login')
            } else {
              layer.warning(res.message)
            }
          })
          .complete(function () {
            layer.close(loading)
          })
      }
    },
    components: {
      DIslogin: DIslogin,
      DBanner: DBanner,
      DImgCode: DImgCode
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .user-forget {
    >img {
      width: 100%;
    }
    .form {
      padding: px2rem(20) px2rem(30);
      color: #747474;
      input {
        width: px2rem(240);
      }
      span {
        position: absolute;
        right: 0;
      }
    }
    .err {
      color: #FF6262;
      padding: px2rem(10) 0;
    }
    .clear {
      display: inline-block;
      margin-top: px2rem(5);
      width: px2rem(14);
      height: px2rem(14);
      background: url('../../assets/clear.png') no-repeat;
      background-size: contain;
    }
    .btn {
      margin: px2rem(40) 0 px2rem(20);
    }
    .link {
      color: #A0A0A0;
      a {
        color: #575757;
      }
    }
  }
</style>