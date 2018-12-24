<template>
  <section class="auth-submit-success container">
    <div class="success">
      <div class="icon"></div>
      <div class="tac fs15 c-placeholder">
        <p>请耐心等待审核结果并留意站内信及短信通知。</p>
        <p>或至个人中心查看最新进度。</p>
      </div>
      <div class="btn-wrap">
        <button class="btn outline" @click="goto()">返回主页</button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      goto() {
        sysinfo.dsq.openView('index')
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .auth-submit-success {
    $bg-size: px2rem(110);
    padding: px2rem(130) 0 0;
    .icon {
      padding: px2rem(60) 0;
      margin-bottom: px2rem(40);
    }
    .success {
      .icon {
        background: url('../../assets/auth/submit/success.png') no-repeat 50%;
        background-size: $bg-size;
      }
    }
    .btn-wrap {
      padding: 0 px2rem(90);
    }
    .btn {
      margin-top: px2rem(40);
      color: #4A4A4A;
    }
  }
</style>