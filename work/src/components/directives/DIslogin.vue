<!--
  判断用户是否登录，如果登录，则直接跳转到首页
  flag 用于标记当前页面是否需要登录态，默认为不需要
  @example
  <template>
    <d-islogin v-bind:flag="true"></d-islogin>
  </template>
  <script>
    import DIslogin from './directives/DIslogin.vue'
    var $data = { }
    export default {
      data() {
        return $data;
      },
      components: {
        DIslogin: DIslogin,
      },
    }
  </script>
-->

<template>
  <i></i>
</template>

<script>
  export default {
    data() {
      var router = this.$router
      var route = this.$route
      var flag = typeof this.flag != 'undefined'
      ajax.get('/v3/user/is-login')
        .then(function(xhr, res) {
          if(res.code == 0 && res.data > 0 && !flag) {
            router.replace('/my')
          }
          else if(flag && !res.data) {
            sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : router.replace('/user/login?ref=' + route.path)
          }
        })
      return {}
    },
    props: ['flag'],
  }
</script>