<!--
  根据不同的渠道，更换不同的 banner 图片
  @example
  <template>
    <d-banner></d-banner>
  </template>
  <script>
    import DBanner from './directives/DBanner.vue'
    var $data = { }
    export default {
      data() {
        return $data;
      },
      components: {
        DBanner: DBanner,
      },
    }
  </script>
-->

<template>
  <img :src="bannerUrl" alt="" @click="click(message)">
</template>

<script>
  export default {
    data() {
      var channel = sysinfo.getQueryString('channel')

      // 惠刷卡：http://dsq.qianshengqian.com/vue/?channel=57c40e35bb6c#!/user/register
      // http://dsq.qianshengqian.com/vue/?channel=57be5589f8cf#!/user/register
      // 融360：http://dsq.qianshengqian.com/vue/?channel=57bd13d387f2#!/user/register
      // http://dsq.qianshengqian.com/vue/?channel=rong360#!/user/register

      // 惠刷卡：http://paydayloan.fond.io/vue/?channel=57c40e35bb6c#!/user/register
      // http://paydayloan.fond.io/vue/?channel=57be5589f8cf#!/user/register
      // 融360：http://paydayloan.fond.io/vue/?channel=57bd13d387f2#!/user/register
      // http://paydayloan.fond.io/vue/?channel=rong360#!/user/register

      var channels = {
        '57c40e35bb6c': 2,
        '57be5589f8cf': 1,
        '57bd13d387f2': 1,
        'rong360': 1,
      }

      var message1 = '<div>'
        + '<p>【活动说明】</p>'
        + '<p class="tal ti2">即日起在贷上钱首次申请借款的用户，微信搜索“贷上钱服务号”回复“个人中心-进度查询”的页面截图以及个人手机号码即可，前100名用户将有机会获得100M流量包。</p>'
        + '<br>'
        + '<p>【奖品发送时间】</p>'
        + '<p class="tal ti2">流量赠送将在活动结束后，5个工作日发送至个人手机账号。</p>'
        + '<br>'
        + '<p>本活动解释权归贷上钱所有</p>'
        + '</div>'

      var message2 = '<div>'
        + '<p>【活动说明】</p>'
        + '<p class="tal ti2">即日起贷上钱成功申请借款新用户，通过“贷上钱服务号”回复“资料审核中”（就是审核界面）界面截图和您个人手机号，前100名用户将有机会获得最高50元内随机现金红包。</p>'
        + '<br>'
        + '<p>【奖品发送时间】</p>'
        + '<p class="tal ti2">现金红包将在活动结束后，5个工作日内以微信红包的形式发送至用户微信号。</p>'
        + '<br>'
        + '<p>本活动解释权归贷上钱所有</p>'
        + '</div>'

      var banners = [
        {
          bannerUrl: './static/img/user/banner.png',
          message: '',
        },
        {
          bannerUrl: './static/img/user/banner-1.png',
          message: message1,
        },
        {
          bannerUrl: './static/img/user/banner-2.png',
          message: message2,
        },
      ]

      return banners[channels[channel] || 0]
    },
    props: [],
    methods: {
      click: function(message) {
        message && layer.warning(message, {
          style: 'width: 75%;',
        })
      }
    },
  }
</script>
