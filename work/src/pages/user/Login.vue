<!--
  -- 登录
  -- @author bigfact
  -- @date 2017.05.26
  -->
<template>
  <section class="user-login container">
    <!--<img src="../../../static/img/banner.png" alt="">-->
    <!--banner-->
    <d-banner></d-banner>
    <!--表单-->
    <div class="form fs16">
      <!--手机号-->
      <div class="row">
        <input type="tel" maxlength="11" placeholder="手机号" v-model="phone.model" @blur="checkitem('phone')">
        <span class="clear" v-show="phone.model" @click="clear()"></span>
        <p class="err" v-show="phone.errshow">{{ phone.err }}</p>
      </div>
      <!--密码-->
      <div class="row">
        <input type="{{ seePwd ? 'text' : 'password' }}" maxlength="16" placeholder="密码" v-model="password.model" @blur="checkitem('password')">
        <span class="fs15" v-show="password.model" @click="showPwd()">{{ seePwd ? '隐藏' : '显示' }}</span>
        <p class="err" v-show="password.errshow">{{ password.err }}</p>
      </div>
      <!--其他链接-->
      <div class="links">
        <a class="fs12" v-link="{ path: '/user/register', replace: true, }">立即注册</a>
        <a class="fr fs12" v-link="{ path: '/user/forget' + (phone.model && '?phone=' + phone.model), replace: true, }">忘记密码？</a>
      </div>
      <!--登录按钮-->
      <button class="btn outline" v-submit="{cb: submit}">登录</button>
    </div>
    <!--某一次推广提的**需求，请忽略-->
    <div v-if="companyName" class="tac c-gray fs12" style="padding-top: 3rem; line-height: 2.4rem;">{{{ companyName }}}</div>
    <!--登录态判断组件-->
    <d-islogin></d-islogin>
  </section>
</template>

<script>
  import DIslogin from '../../components/directives/DIslogin.vue'
  import DBanner from '../../components/directives/DBanner.vue'

  var $data = {
    phone: {
      model: '',
      reg: regexp.phone,
      err: '请填写正确的手机号',
      errshow: '',
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
    // 是否显示密码
    seePwd: false,
    // 某一次推广提的**需求，请忽略
    companyName: sysinfo.getQueryString('channel') == '5800a2f3d4a7' ? '<p>贷上钱</p><p>柳州市金亿通小额贷款股份有限公司</p>' : '',
  }

  export default {
    data() {
      var phone = this.$route.query.phone
      $data.phone.reg(phone) && ($data.phone.model = phone)
      return $data
    },
    methods: {
      // 检查 input 值
      checkitem(key) {
        var item = $data[key]
        if (item.reg(item.model)) {
          item.errshow = false
          return true
        }
        else {
          item.errshow = true
        }
      },
      // 清除手机号
      clear() {
        $data.phone.model = ''
      },
      // 显示或隐藏密码
      showPwd() {
        $data.seePwd = !$data.seePwd
      },
      // 提交数据
      submit() {
        var _this = this
        var pass = true
        pass = _this.checkitem('phone') && pass
        pass = _this.checkitem('password') && pass
        if (!pass) return
        var router = _this.$router
        var ref = _this.$route.query.ref
        var data = {
          phone: $data.phone.model,
          password: $data.password.model,
        }
        var loading = layer.loading2(false, '登录中...')
        ajax.post('/v3/user/login', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              // 设置cookie
              store.cookie.set('_x_token', res.data.token, '', res.data.expires_in)
              // 跳转页面
              router.replace(ref || '/my')
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
      DBanner: DBanner
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .user-login {
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
    .links {
      padding: px2rem(10) 0 px2rem(30);
      a {
        color: #A0A0A0;
      }
    }
  }
</style>