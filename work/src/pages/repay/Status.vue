<!--
  -- 还款结果
  -- @author bigfact
  -->
<template>
  <section class="repay-status container tac">
    <div :class="status">
      <p class="icon"></p>
      <p class="fs18">{{ titles[status] }}</p>
      <p class="amount fs30">{{ amount }}元</p>
      <p class="message fs15 c-light">
        {{ $data.message || '' }} 如有疑问，请联系客服 400-136-5799
      </p>
      <div class="btn-wrap">
        <button v-if="user_code" @click="goDownloadApp()" class="btn outline">下载APP查看更多</button>
        <button v-else @click="gotoRepay()" class="btn outline">返回我要还款</button>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    status: '',
    amount: '',
    message: '',
    titles: {
      success: '支付成功',
      fail: '支付失败',
      doing: '支付确认中',
    },
    user_code: '',
  }
  export default {
    data() {
      $data.user_code = sysinfo.getQueryString('user_code')
      var query = this.$route.query
      $data.amount = parseFloat(query.amount) ? query.amount : ''
      $data.status = query.status || ''
      $data.message = decodeURI(query.message || '')
      return $data
    },
    methods: {
      /**
       * 跳转到 app 下载页面
       */
      goDownloadApp() {
        location.href = sysinfo.isIOS ? 'https://itunes.apple.com/cn/app/dai-shang-qian/id1163674900' : ' http://static.qianshengqian.com/downloads/dsq.apk'
      },
      /**
       * 跳转到“我要还款”，需要判断是否在 app 中和 app 版本
       */
      gotoRepay() {
        var version = sysinfo.dsq.getVersion()
        if (version >= 205 && sysinfo.isAndroid) sysinfo.dsq.openView('repay')
        else if (version >= 104) sysinfo.dsq.openView('index')
        else this.$router.go('/repay/repayment')
      }
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay-status {
    p {
      padding-top: px2rem(8);
    }
    .icon {
      padding: px2rem(90) 0;
    }
    .success {
      .icon {
        background: url(../../assets/repay/success.png) no-repeat 50% 100%;
        background-size: px2rem(60);
      }
      .message {
        display: none;
      }
    }
    .fail {
      .icon {
        background: url(../../assets/repay/fail.png) no-repeat 50% 100%;
        background-size: px2rem(60);
      }
      .amount {
        display: none;
      }
    }
    .doing {
      .icon {
        background: url(../../assets/repay/doing.png) no-repeat 50% 100%;
        background-size: px2rem(60);
      }
      .amount {
        display: none;
      }
    }
    .message {
      padding: px2rem(8) px2rem(27) 0;
    }
    .btn-wrap {
      padding: px2rem(50) 0;
    }
    .btn {
      color: $black;
      width: auto;
      min-width: px2rem(120);
      padding: px2rem(12) px2rem(24);
      display: inline-block;
    }
  }
</style>
