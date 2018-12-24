<template>
  <section class="index container fs15 tac">
    <img src="../assets/index/icon-404.png" alt="" class="icon-404">
    <div class="c-light">
      <p class="fs22">迷路啦</p>
      <p>可能原因</p>
      <p>页面访问路径出错</p>
      <p>找不到请求页面</p>
    </div>
    <div class="btns">
      <button class="btn">您可以</button>
      <button class="btn outline" @click="goto('/auth/phone/verify')" v-if="isWx">绑定微信公众号</button>
      <button class="btn outline" @click="goto('/active/promotion')">注册贷上钱</button>
      <button class="btn outline" @click="goto('http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan')">下载APP</button>
    </div>
    <d-debuger style="height: 30px;"></d-debuger>
  </section>
</template>

<script>
  import DDebuger from './common/DDebuger.vue'
  export default {
    data() {
      return {
        isWx: sysinfo.isWeiXin
      }
    },
    methods: {
      goto(link) {
        if (/http/.test(link)) {
          location.href = link
        } else {
          this.$router.go(link)
        }
      }
    },
    components: {
      DDebuger: DDebuger
    }
  }

</script>

<style lang="scss">
  @import '../sass/_globals.scss';
  .index {
    padding: px2rem(60) px2rem(62) px2rem(50);
    .icon-404 {
      display: block;
      width: 100%;
    }
    .btns {
      margin-top: px2rem(55);
    }
    .btn {
      margin-top: px2rem(8);
      padding: px2rem(8) 0;
    }
  }
</style>