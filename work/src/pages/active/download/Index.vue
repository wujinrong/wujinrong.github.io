<!--
  -- 贷上钱 app 引导下载页面
  -- @author bigfact
  -->
<template>
  <section class="active-download container">
    <!--头部大标题-->
    <div class="banner">
      <div class="limit-width">
        <!--标志-->
        <img class="logo" src="../../../assets/logo-white.png" alt="">
        <!--文字-->
        <div class="banner-text fs25 c-white">
          <p>借款额度：500-2000</p>
          <p>借款期限：7天、14天</p>
        </div>
        <!--财神-->
        <img class="mammon" src="../../../assets/active/download/mammon.png" alt="">
      </div>
    </div>
    <!--中间标语-->
    <div class="row-wrap fs32 tac">
      <div class="row">
        <div class="row-inner">
          <span class="row-icon c-white fs28 simple">简</span>
          <span>申请简单</span>
        </div>
      </div>
      <div class="row">
        <div class="row-inner">
          <span class="row-icon c-white fs28 speed">快</span>
          <span>放款速度</span>
        </div>
      </div>
      <div class="row">
        <div class="row-inner">
          <span class="row-icon c-white fs28 safe">保</span>
          <span>安全保障</span>
        </div>
      </div>
    </div>
    <div class="tac">
      <!--快速放款图片-->
      <div>
        <img class="loan-fast" src="../../../assets/active/download/loan-fast.png" alt="">
      </div>
      <!--页脚下载按钮-->
      <div>
        <button class="download-btn fs26 c-white" @click="download()">立即下载</button>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    type: '',       // 根据路由查询参数 type 来判断按钮点击执行的操作
  }
  export default {
    data() {
      $data.type = this.$route.query.type || ''
      return $data
    },
    methods: {
      /**
       * 点击下载贷上钱 app ，已有的逻辑如下
       * 1、默认跳转到应用宝
       * 2、若 type == 'dsq360' 且在 Android 中，则下载 app apk dsq360 的包
       * 3、若 type == 'origin' 且在 Android 中，则下载 app apk 原始的包
       * 4、若 type 不为空 且在 Android 中，则按 type 指定的包名字下载 app apk 的包
       */
      download() {
        var downloadurl = '//a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan'
        if (sysinfo.isAndroid && !sysinfo.isWeiXin && $data.type) {
          if ($data.type == 'dsq360') downloadurl = '//static.qianshengqian.com/downloads/daishangqian_360dsp.apk'
          else if ($data.type == 'origin') downloadurl = '//static.qianshengqian.com/downloads/dsq.apk'
          else downloadurl = '//static.qianshengqian.com/downloads/' + $data.type + '.apk'
        }
        // console.log(location.protocol + downloadurl)
        location.href = location.protocol + downloadurl
      }
    }
  }

</script>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .active-download {
    padding-bottom: px2rem(50);
    /*页头大标题*/
    .banner {
      background: url(../../../assets/active/download/banner-bg.png) no-repeat center;
      background-size: cover;
    }
    /*页头标题宽度限制块*/
    .limit-width {
      box-sizing: border-box;
      height: px2rem(175);
      max-width: 414px;
      margin: 0 auto;
      padding: px2rem(20) px2rem(23);
      position: relative;
    }
    /*标志*/
    .logo {
      width: px2rem(80);
    }
    /*页头标题文字*/
    $blur: 4px;
    $length: 4px;
    $color: #633808;
    .banner-text {
      line-height: px2rem(30);
      padding: px2rem(10) px2rem(10);
      text-shadow: $length 0px $blur $color, -$length 0px $blur $color, 0px $length $blur $color, 0px (-$length) $blur $color;
    }
    /*财神*/
    .mammon {
      position: absolute;
      bottom: px2rem(9);
      right: px2rem(12);
      width: px2rem(90);
    }
    /*中间标语*/
    .row-wrap {
      color: #505050;
    }
    /*标语行*/
    .row {
      padding: px2rem(10) 0;
    }
    /*标语内部块*/
    .row-inner {
      display: inline-block;
      padding: px2rem(10) 0 px2rem(10) px2rem(80);
      position: relative;
    }
    /*标语左边的文字图标*/
    .row-icon {
      border: px2rem(3) solid;
      border-radius: 100%;
      display: inline-block;
      margin: auto;
      width: px2rem(47);
      height: px2rem(47);
      line-height: px2rem(47);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
    }
    /*简单*/
    .simple {
      background: #F29031;
      border-color: #f9c898;
    }
    /*速度*/
    .speed {
      background: #66C842;
      border-color: #b3e4a1;
    }
    /*安全*/
    .safe {
      background: #2C99FB;
      border-color: #96ccfd;
    }
    /*快速放款图片*/
    .loan-fast {
      width: px2rem(150);
      margin: px2rem(34) 0;
    }
    /*页脚下载按钮*/
    .download-btn {
      background: #F87826;
      border-radius: 5px;
      padding: px2rem(12) 0;
      width: 92%;
      max-width: 414 * .92px;
    }
  }
</style>