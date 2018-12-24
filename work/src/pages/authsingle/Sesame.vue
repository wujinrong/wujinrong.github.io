<!--
  -- 芝麻信用
  -- @description 单期贷芝麻信用授权
  -- @author bigfact
  -->
<template>
  <section class="auth-sesame container">
    <div class="block-1">
      <img src="../../assets/auth/sesame/icon-1.png">
      <p>芝麻信用</p>
    </div>
    <div class="line"></div>
    <div class="block-content block-2">
      <h5>你点击“同意授权”按钮意味着接受以下内容：</h5>
      <p>1、授权贷上钱将你的姓名和身份证号码传递给芝麻信用，用于向支付宝查询你的支付宝账户信息以便进行身份校验；</p>
      <p>2、授权贷上钱向芝麻信用查询你的芝麻分和相关信用信息，用户评估其与你之间的交易或服务条件。</p>
    </div>
    <div class="block-content block-3">
      <h3>特别注意</h3>
      <h5>当你发生违约或其他影响信用的不良行为时：</h5>
      <p>1、芝麻信用有权向贷上钱提供可能联系到你的电话号码、地址等联系信息，用于追究违约责任；</p>
      <p>2、芝麻信用会记录你的违约行为并依法向他人提供，这可能影响你的贷款等信用生活服务。</p>
    </div>
    <p class="tip-0">授权贷上钱查看您的芝麻信用,可提高80%的审核通过率</p>
    <div class="btn-wrap">
      <button class="btn" v-submit="{cb: goView}">同意授权</button>
    </div>
    <!--<iframe id="auth-iframe" class="auth-iframe bg-white" :src="authurl" v-show="show"></iframe>-->
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    res: {},
    // authIframe: '',
    // show: false,
    // authurl: ''  // 授权链接
  }
  export default {
    data() {
      /**
       * 数据请求
       * http://git.fond.io/b/paydayloan/wikis/credit-index
       */
      ajax.get('/v3/credit/credit-index', {
        product_type: $data.applytype
      }).then(function (xhr, res) {
        $data.res = res
      })
      return $data
    },
    // ready() {
    //   $data.authIframe = document.getElementById('auth-iframe')
    //   $data.authurl = ''
    // },
    methods: {
      goView() {
        if ($data.res.code == 0) {
          layer.loading2(false)
          var token = sysinfo.dsq.getToken() || store.cookie.get('_x_token') || sysinfo.getQueryString('token')
          location.href = location.origin + '/v3/credit/credit?token=' + token + '&product_type=' + $data.applytype
          
          // $data.show = true

          // var i = 0

          // var tid1 = setInterval(() => {
          //   if ($data.authIframe.src.indexOf(location.origin) >= 0) {
          //     $data.show = false
          //     history.go(-2)
          //     clearInterval(tid1)
          //   }
          //   console.log(++i)
          // }, 1000)
          // var tid0 = setTimeout(() => {
          //   $data.authurl = location.origin + location.pathname
          //   clearTimeout(tid0)
          // }, 5000)

        } else {
          layer.warning($data.res.message)
        }
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-sesame {
    .block-1 {
      background: #fff;
      text-align: center;
      padding-bottom: px2rem(23.5);
      img {
        width: px2rem(30);
        margin-top: px2rem(23.5);
      }
      p {
        color: #0DB789;
        font-size: px2rem(17);
        margin-top: px2rem(7);
      }
    }
    .line {
      background: #F6F3F3;
      height: px2rem(7.5);
      border-top: 1px solid #DBDBDB;
    }
    .block-content {
      padding: px2rem(19.5) px2rem(22.5);
      h3 {
        color: #383838;
        font-size: px2rem(15);
        line-height: px2rem(23);
      }
      h5 {
        font-size: px2rem(14);
        color: #383838;
        line-height: px2rem(23);
      }
      p {
        color: #747474;
        font-size: px2rem(14);
        line-height: px2rem(23);
        text-align: justify;
      }
    }
    .block-3 {
      margin-top: px2rem(-30);
      padding-bottom: 0;
    }
    .tip-0 {
      color: #FF4345;
      font-size: px2rem(13);
      text-align: center;
      margin-top: px2rem(18);
      margin-bottom: px2rem(18);
    }
    /*.auth-iframe {
      border: none;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 999;
    }*/
  }
</style>