<!--
  -- 第三方（微信、支付宝）入口页面
  -- @author bigfact
  -- @date 2017.05.17
  -->
<template>
  <section class="repay-third-entry container tac">
    <div class="tac">
      <img class="logo" src="../../../assets/repay/third/entry-logo.png" alt="">
      <div class="amount-tip fs20">
        <p>{{ amount }} 元</p>
        <p>支付宝还款</p>
      </div>
    </div>
    <div class="btn-wrap">
      <button class="btn" v-submit="{cb: openThird}">打开支付宝</button>
      <button class="btn result-btn" v-submit="{cb: cancelOrder}" v-if="cancel">取消支付订单</button>
      <button class="btn result-btn" :class="!canGotoResult && 'disabled'" @click="goto('#!/repay/third/result')">查看支付结果</button>
    </div>
    <div class="c-placeholder tac">请确保您已安装支付宝</div>
    <iframe class="iframe" :src="schemeUrl" frameborder="0" v-if="showIframe"></iframe>
  </section>
</template>
<script>
  var $data = {
    product_type: '',     // 申请产品类型
    channel: '',          // 渠道
    project_num: '',      // 资产编号
    order_no: '',         // biz 订单号
    amount: '',           // 还款总额
    schemeUrl: '',        // dsq app 可以打开的第三方支付链接
    payUrl: '',           // 实际的第三方支付链接
    showIframe: false,    // 是否显示加载 schemeUrl 的 iframe
    canGotoResult: false, // 控制是否可以查看支付结果
    cancel: false,        // 是否可以取消订单
    code: -1,
    message: ''
  }
  export default {
    data() {
      title('支付宝还款')
      var _this = this

      // // 从路由查询参数中获取信息
      // $data.channel = _this.$route.query.channel || ''
      // $data.project_num = _this.$route.query.project_num || ''
      // $data.amount = _this.$route.query.amount || ''
      // $data.product_type = _this.$route.query.product_type || ''

      // Android 访问链接
      // 单期贷 http://paydayloan1.fond.io/vue/#!/repay/third/entry?channel=alipay?period=[1, 2]&product_type=multiple&amount=0.02
      // 分期贷 http://paydayloan1.fond.io/vue/#!/repay/third/entry?channel=alipay&project_num=201752479335027117&amount=500?period=&product_type=single&amount=500.00

      // IOS 访问链接
      // 单期贷 http://paydayloan1.fond.io/vue/#!/repay/third/entry?channel=alipay&amount=500.0&product_type=single
      // 分期贷 http://paydayloan1.fond.io/vue/#!/repay/third/entry?channel=alipay&amount=0.02&product_type=multiple&period=[1, 2]

      var hashQueryString = '?' + location.hash.replace(/#.[^\?]*\?|\s/g, '').replace('?', '&')

      // console.log(hashQueryString)

      $data.channel = _this.getQueryStringByStr('channel', hashQueryString)
      $data.product_type = _this.getQueryStringByStr('product_type', hashQueryString) || 'single'
      $data.period = _this.getQueryStringByStr('period', hashQueryString)
      // $data.period = $data.period.replace(/\[|\]|\s/g, '').split(',')
      $data.amount = _this.getQueryStringByStr('amount', hashQueryString)

      // console.log($data)

      // 控制参数初始化
      $data.showIframe = false
      $data.canGotoResult = false

      if (_this.check()) {
        /**
         * 请求还款链接
         * https://git.fond.io/b/paydayloan/wikis/v3/repay/mobile-charge
         */
        ajax.get('/v3/repay/mobile-charge', {
          channel: $data.channel,
          product_type: $data.product_type,
          period: $data.period,
          amount: $data.amount
        }).then((xhr, res) => {

          // console.log(JSON.stringify(res))

          $data.code = res.code
          if (res.code === 0) {

            $data.payUrl = res.data.pay_url
            // console.log($data.payUrl)

            $data.schemeUrl = _this.getSchemeUrl($data.payUrl)
            // console.log($data.schemeUrl)

            $data.order_no = res.data.order_no
            $data.cancel = res.data.is_exist_undone
            $data.project_num = res.data.apply_code
          } else {
            $data.message = res.message
            layer.warning(res.message)
          }
        })
      } else {
        $data.channel = ''
        $data.project_num = ''
        $data.product_type = ''
        $data.amount = ''
        $data.message = '页面请求参数错误！'
        layer.tip($data.message)
      }

      return $data
    },
    methods: {
      /**
       * 检查数据请求参数
       * @returns {Boolean} 是否检查通过
       */
      check() {
        // console.log($data)
        return regexp.empty($data.channel) && regexp.empty($data.amount)
      },
      /**
       * 获取查询参数
       * @param {String} name 参数名
       * @param {String} str  被查找的字符串
       * @returns {String} 查询参数值
       */
      getQueryStringByStr(name, str) {
        return decodeURI(str.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
      },
      /**
       * 生成 app 可以打开支付宝的链接
       * @description 代码逻辑来源于 http://pay.ebjfinance.com/js/callalipayna_v4.js
       * @param {String} pay_url 原始支付链接
       * @returns {String} app 可以打开支付宝的链接
       */
      getSchemeUrl(pay_url) {
        var urlscheme = 'alipay'
        if (sysinfo.isAndroid) urlscheme = 'alipays'
        var p = 'platformapi'
        var sm = '07'
        var s = '100000' + sm
        var cv = '3.7.0.0718'
        var gopage = urlscheme + '://' + p + '/startApp?saId=' + s + '&clientVersion=' + cv + '&qrcode=' + encodeURIComponent(pay_url)
        if (pay_url.indexOf("?") == -1) gopage = gopage + '%3F_s%3Dweb-other'
        else gopage = gopage + '%26_s%3Dweb-other'
        return gopage
        // return urlscheme + '://platformapi/startApp?appId=10000011&&channelId=402&&channekKey=2rklzrd23hjk&&app_pay=Y&&actionType=WebView&&schemeUrl=' + encodeURIComponent(pay_url)
      },
      /**
       * 打开第三方支付
       */
      openThird() {
        if ($data.code !== 0) $data.message && layer.tip($data.message)
        // 不在 dsq app 中
        else if (!sysinfo.dsq.isapp()) location.href = $data.payUrl
        // Android app 特殊处理
        else if (sysinfo.isAndroid && sysinfo.dsq.getVersion() < 205) layer.tip('请先升级贷上钱 APP')
        else {
          $data.showIframe = true
          // 3 秒之后设置为可以查看结果
          var tid = setTimeout(() => {
            $data.canGotoResult = true
            $data.showIframe = false
            clearTimeout(tid)
          }, 3000)
        }
      },
      /**
       * 取消支付订单
       */
      cancelOrder() {
        if (!$data.cancel) return
        var lid = layer.loading()
        /**
         * 取消支付订单
         * https://git.fond.io/b/paydayloan/wikis/v3/repay/cancel-mobile-charge
         */
        ajax.get('/v3/repay/cancel-mobile-charge', {
          project_num: $data.project_num,
          order_no: $data.order_no
        }).then((xhr, res) => {
          if (res.code === 0) {
            // dsq app 2.0.6 版本以上才可以回退到“我要还款”
            if (sysinfo.dsq.isapp()) sysinfo.dsq.openView(sysinfo.dsq.getVersion() >= 206 ? 'repay' : 'index')
            else history.back()
          } else layer.warning(res.message)
        }).complete(() => {
          layer.close(lid)
        })
      },
      /**
       * 跳转到还款结果页面
       */
      goto(link) {
        // if (!$data.canGotoResult) layer.tip('请先还款再查看支付结果')
        if (!$data.canGotoResult) return
        else if ($data.code !== 0) layer.tip($data.message)
        else location.href = link
      }
    }
  }

</script>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .repay-third-entry {
    box-sizing: border-box;
    padding-top: px2rem(90);
    .logo {
      width: px2rem(80);
    }
    .iframe {
      height: 0;
      width: 0;
    }
    .btn-wrap {
      padding: px2rem(0) px2rem(35);
    }
    .amount-tip {
      padding: px2rem(15) 0 px2rem(80);
    }
    .result-btn {
      margin: px2rem(10) 0;
    }
  }
</style>