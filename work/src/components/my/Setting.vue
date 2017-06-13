<template>
  <section class="my-setting">
    <div class="link-wrap fs16" v-if="showChangePwd">
      <div class="line-7"></div>
      <div class="row link" @click="changePwd()">修改登录密码</div>
    </div>
    <div class="link-wrap fs16" v-if="showLoginOut">
      <div class="line-7"></div>
      <div class="row link" @click="logout()">退出登录</div>
    </div>
  </section>
</template>

<script>
  var $data = {
    // 在微信中不显示退出登录按钮
    showLoginOut: !sysinfo.isWeiXin,
    // 只在贷上钱 app 中显示修改登录密码
    showChangePwd: sysinfo.dsq.isapp(),
  }

  export default {
    data() {
      return $data
    },
    methods: {
      changePwd() {
        if(sysinfo.dsq.isapp()) {
          sysinfo.dsq.forget()
        }
      },
      // 弹框提示是否退出登录
      logout() {
        var router = this.$router
        var lid = layer.warning('<p class="fs16">退出登录</p><br><p>是否确认退出登录？</p>', {
          btn: ['是', '否'],
          yes: function() {
            ajax.get('/v3/user/logout')
              .then(function(xhr, res) {
                if(res.code == 0) {
                  if (sysinfo.dsq.isapp()) {
                    sysinfo.dsq.logout()
                  } else {
                    store.cookie.remove('_x_token', '')
                    router.replace('/user/login')
                  }
                }
                else layer.warning(res.message)
              })
            layer.close(lid)
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-setting {
    .line-7 {
      height: px2rem(7.5);
    }
    .link-wrap {
      .link {
        background-color: #FFF;
        background-position-x: 97%;
        padding-left: px2rem(20);
        &:last-of-type::after {
          border: none;
        }
      }
    }
  }
</style>