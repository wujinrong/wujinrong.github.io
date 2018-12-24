<!--
  -- 第三方（微信、支付宝）还款结果
  -- @author bigfact
  -->
<template>
  <section class="repay-third-result container tac">
    <img src="../../../assets/repay/result.png" alt="">
    <p class="fs20">请以实际支付结果为准</p>
    <button class="btn btn-border fs20" @click="back()">确定</button>
  </section>
</template>
<script>
  export default {
    data() {
      return {}
    },
    methods: {
      /**
       * 结果页面回退
       */
      back() {
        // dsq app 2.0.6 版本以上才可以回退到“我要还款”
        if (sysinfo.dsq.isapp()) sysinfo.dsq.openView(sysinfo.dsq.getVersion() >= 206 ? 'repay' : 'index')
        else history.go(-1)
      }
    }
  }

</script>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .repay-third-result {
    padding-top: px2rem(108);

    img {
      width: px2rem(60.5);
    }

    p {
      margin-top: 10px;
    }

    .btn {
      width: px2rem(130);
      margin-top: px2rem(100);
    }
  }
</style>