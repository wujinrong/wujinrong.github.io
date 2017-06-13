<!--
  -- 贷上钱 app 引导下载页面 - 通用
  -- @description 页面和“借点钱”渠道的下载 app 页面一样，这是为了新增一个页面，换个访问链接
  —- @author bigfact
  -- @date 2017.05.24
  -->
<template>
  <section class="active-download-common">
    <!--banner-->
    <img class="banner" src="../../../assets/active/download/jiedianqian-banner.png"></img>
    <!--注册成功提示-->
    <div class="success-wrap tac c-tips fs20">
      <p>恭喜您，注册成功！</p>
      <p>快去下载APP借钱吧！</p>
    </div>
    <!--下载按钮-->
    <div class="download-btn-wrap">
      <!--<a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="download-btn tac fs20">立即下载</a>-->
      <button class="download-btn tac fs20" @click="download()">立即下载</button>
    </div>
    <!--我们的优势-->
    <div class="tips-area tac">
      <dl>
        <dt>我们的优势</dt>
        <dd class="tips1">纯信用刷脸借款。无抵押、无担保！</dd>
        <dd class="tips2">18-40周岁都可以借款、最快1小时到账！</dd>
        <dd class="tips3">安全保障<br />银行级信息管控，为您保驾护航！</dd>
      </dl>
      <div class="c-tips fs10">特别提示：首次借款，绑定更多真实信息有助于成功借款！</div>
    </div>
    <!--公司信息-->
    <div class="tac c-tips">
      <p>公司地址：上海市淞虹路207号明基商务广场C座2层</p>
      <p>联系电话：400-136-5799</p>
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
  @import "../../../sass/_globals.scss";
  .active-download-common {
    background: #720848 url('../../../assets/active/promotion/page3.png') no-repeat center top;
    background-size: 100% auto;
    padding-bottom: px2rem(30);
    /*banner*/
    .banner {
      display: block;
      width: 100%;
    }
    .c-tips {
      color: #FDB716;
    }
    /*注册成功容器*/
    .success-wrap {
      background: url('../../../assets/active/download/jiedianqian-tip-bg.png') no-repeat center;
      background-size: contain;
      /*height: px2rem(150);*/
      /*box-sizing: border-box;*/
      margin: px2rem(15) px2rem(30);
      padding: px2rem(45) 0;
    }
    /*下载按钮*/
    .download-btn-wrap {
      padding: 0 px2rem(30);
    }
    .download-btn {
      display: block;
      background: linear-gradient(top, #FFD86A, #FFB408);
      border-radius: 100px;
      color: #741F7B;
      padding: px2rem(11) 0;
      width: 100%;
    }
    /**
     * 我们的优势
     */
    .tips-area {
      padding-bottom: 1.2rem;
      dt {
        color: #741F7B;
        background: #FFB815;
        width: 5em;
        padding: 0.8rem 3rem;
        margin: px2rem(24) auto px2rem(12);
        border-radius: 5px;
        box-shadow: 1px 2px 1px #333;
      }
      dd {
        width: 250px;
        height: 64px;
        color: #731668;
        font-size: 1.3rem;
        line-height: 64px;
        padding-left: 50px;
        margin: 0 auto .8rem;
      }
      dd.tips1 {
        background: url("../../../assets/active/promotion/tips1.png") no-repeat center center;
        background-size: 100% 100%;
      }
      dd.tips2 {
        background: url("../../../assets/active/promotion/tips2.png") no-repeat center center;
        background-size: 100% 100%;
      }
      dd.tips3 {
        padding-top: 8px;
        padding-bottom: 8px;
        line-height: 24px;
        height: 48px;
        background: url("../../../assets/active/promotion/tips3.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
</style>