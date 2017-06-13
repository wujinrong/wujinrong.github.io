<!--
  -- 贷上钱 邀请好友三倍返利
  -- @author wujinrong
  -- @date 20170608
  -->

<template>
  <section class="dsq-share">
    <div class="box-banner">
      <span class="logo"></span>
      <img src="../../../assets/active/invite2/share_bg1.png" alt="">
    </div>
    <!--活动信息-->
    <div class="box-active-info">
      <div class="list">
        <span class="text1"></span>
        <p class="fs15">贷上钱注册用户（被拒用户也可参加）</p>
      </div>
      <div class="list">
        <span class="text2"></span>
        <p class="fs15">2017年6月15日-2017年6月30日 </p>
      </div>
    </div>
    <br/>
    <!--实时奖励-->
    <div class="real-time">
      <h5></h5>
      <div>
        <img src="../../../assets/active/invite2/share_bg5.png" alt="">
      </div>
    </div>
    <br/>
    <!--额外奖励-->
    <div class="additional">
      <h5></h5>
      <div class="additional-main">
        <p>
          最高<span>（3% X 好友完成借款总金额）</span><br/> 按活动期间成功邀请好友完成借款数累计梯度奖励
        </p>
        <div class="additional-img">
          <img src="../../../assets/active/invite2/share_bg3.png" alt="">
        </div>
        <br/>
        <div class="additional-demo">
          <p>
            贷小妹共邀请120名好友完成借款，<br/> 平均借款金额1800元，共计获得奖励：
          </p>
          <p class="fs15">120×1800×（1%+2%）=6480元</p>
        </div>

      </div>
    </div>
    <br/>
    <!--参与方式-->
    <div class="join-way">
      <h5></h5><br/>
      <div></div>
    </div>
    <br/>
    <!--邀请小窍门-->
    <div class="box-tips">
      <div>
        <p class="tips-title fs14">邀请小窍门</p>
        <p class="fs12">长按复制下方文字，可以获得更多现金及优惠！</p>
        <p class="fs12" @touchstart="copystart($event)" @touchend="copyend()">#贷款新平台推荐#发现新平台：贷上钱，最高拿1万，<br/>极速放款5分钟，被拒还拿钱！<br/>戳，拿钱咯~{{$data.link}}</p>
      </div>
    </div>
    <br/><br/>
    <p class="footer fs12">本活动最终解释权归贷上钱所有<br/> 如有疑问可咨询贷上钱公众号“dsqmxkj”
    </p><br/>
    <!--分享-->
    <div class="share">
      <div>
        <span>分享到</span>
        <div class="clearfix">
          <div class="share-btn share-wechat" @click="share('wechat')">微信好友</div>
          <div class="share-btn share-moment" @click="share('moment')">朋友圈</div>
          <div class="share-btn share-qq" @click="share('qq')">QQ好友</div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    /**
     * 业务数据
     */
    isApp: sysinfo.dsq.isapp(),//判断是否是app
    isLogin: false, // 用户是否登录
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl: '', // 分享图标
    /**
     * 功能数据
     */
    appId: '', // 微信 js sdk 授权信息 - 公众号的唯一标识
    timestamp: '', // 微信 js sdk 授权信息 - 生成签名的时间戳
    nonceStr: '', // 微信 js sdk 授权信息 - 生成签名的随机串
    signature: '', // 微信 js sdk 授权信息 - 签名
    copytime: {
      start: 0
    }
  }

  export default {
    data() {
      // 设置分享数据
      $data.title = '现金借款神器，申请简单、极速放款！'
      $data.desc = '10秒注册，88秒放款，20元代金券直接送！'
      $data.link = location.origin + location.pathname + '?sharecode=#/active/promotion?type=jujiupei'
      $data.imgUrl = location.origin + location.pathname + '/static/img/active/invite/logo.png'
      /**
       * 获取用户分享标识
       * https://git.fond.io/b/paydayloan/wikis/share-v2
       */
      ajax.get('/v3/action/user-code').then((xhr, res) => {
        if (res.code == 0) {
          // 使用用户分享标识拼接分享链接
          $data.link = location.origin + location.pathname + '?sharecode=' + (res.data.user_code || '') + '#!/active/promotion?type=jujiupei'
          // 已登录
          $data.isLogin = true
        } else if (res.code != 101003) {
          layer.warning(res.message)
        }
      })
      return $data;
    },
    ready() {

    },
    methods: {
      /*
      * 这是长按邀请链接复制
      *
      */
      copystart($event) {
        console.log($event)
        // $event.stopPropagation()
        $event.preventDefault()
        $data.copytime.start = Date.now()
      },
      copyend() {
        if (Date.now() - $data.copytime.start >= 600) {
          sysinfo.dsq.setClipboard("＃贷款平台推荐＃今天发现一个借款新平台：贷上钱，最高额度1万，极速放款只要5分钟，被拒还赔钱！！！戳，去拿钱》" + $data.link);
          layer.tip('复制成功！')
          ga('send', 'event', 'dsq', 'Invite20170615', 'copyURL')
        }
      },
      /**
     * 分享操作
     * @param {String} type 分享类型
     */
      share(type) {
        // 微信中的分享
        if (sysinfo.isWeiXin) {
          layer.warning('请在右上角菜单中选择分享！')
          return
        }
        if (sysinfo.dsq.isapp()) {
          if (!$data.isLogin) {
            sysinfo.dsq.login()
            return
          }
          // dsq app 分享类型对应关系
          var shareType = {
            wechat: 'friend',
            moment: 'group',
            qq: 'qq',
          }
          // 按照分享类型调用 dsq app 分享 api
          if (shareType[type]) {
            sysinfo.dsq.share({
              title: $data.title,
              link: $data.link,
              desc: $data.desc,
              imgUrl: $data.imgUrl,
              type: shareType[type]
            })
            if (type == 'wechat') {
              ga('send', 'event', 'dsq', 'Invite20170615', 'WechatFriend')
            } else if (type == 'moment') {
              ga('send', 'event', 'dsq', 'Invite20170615', 'WechatMoments')
            } else if (type == 'qq') {
              ga('send', 'event', 'dsq', 'Invite20170615', 'qq')
            }
          }
        }

      },
      /**
       * 获取微信授权信息并初始化微信分享
       */
      getSignature() {
        var _this = this
        ajax.get('/v1/wechat/sign').then((xhr, res) => {
          if (res.code == 0) {
            $data.appId = res.data.appId
            $data.timestamp = res.data.timestamp
            $data.nonceStr = res.data.nonceStr
            $data.signature = res.data.signature
            _this.initWxShare()
          }
        })
      },
      /**
       * 初始化微信中的菜单分享
       */
      initWxShare() {
        /**
         * 微信 js sdk 配置
         */
        wx.config({
          // debug: true,                                                                   // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: $data.appId, // 必填，公众号的唯一标识
          timestamp: $data.timestamp, // 必填，生成签名的时间戳
          nonceStr: $data.nonceStr, // 必填，生成签名的随机串
          signature: $data.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        /**
         * config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
         * config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行
         * 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
         */
        wx.ready(function () {
          // // 设置微信菜单
          // wx.showMenuItems({
          //   menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline', 'menuItem:share:qq'] // 要显示的菜单项，所有menu项见附录3
          // })
          /**
           * 分享到朋友圈
           */
          wx.onMenuShareTimeline({
            title: $data.title, // 分享标题
            link: $data.link, // 分享链接
            imgUrl: $data.imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          /**
           * 分享给朋友
           */
          wx.onMenuShareAppMessage({
            title: $data.title, // 分享标题
            desc: $data.desc, // 分享描述
            link: $data.link, // 分享链接
            imgUrl: $data.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
          /**
           * 分享到QQ
           */
          wx.onMenuShareQQ({
            title: $data.title, // 分享标题
            desc: $data.desc, // 分享描述
            link: $data.link, // 分享链接
            imgUrl: $data.imgUrl, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      },
    },
    components: {},
  }

</script>

<style lang="scss">
  @import '../../../sass/_globals.scss';
  .dsq-share {
    background: #FED23D;
    width: 100%;
    min-height: 100%;
    /*banner部分*/
    .box-banner {
      position: relative;
      img {
        width: 100%;
      }
      .logo {
        position: absolute;
        width: px2rem(82);
        height: px2rem(42);
        background: url(../../../assets/active/invite2/dsq_logo.png) no-repeat;
        background-size: 100%;
        margin-left: 10px;
      }
    }
    /*活动信息*/
    .box-active-info {
      padding: 0 1rem;
      min-height: px2rem(170);
      background: url(../../../assets/active/invite2/share_bg2.png) no-repeat;
      background-size: 100% 100%;
      background-origin: content-box;
      text-align: center;
      position: relative;
      .list {
        padding-top: px2rem(14);
        
      }
      .list>span {
        display: block;
        height: px2rem(16);
      }
      .list>.text1 {
        background: url(../../../assets/active/invite2/text1.png) center no-repeat;
        background-size: contain;
      }
      .list>.text2 {
        height: px2rem(15);
        background: url(../../../assets/active/invite2/text2.png) center no-repeat;
        background-size: contain;
      }
      .list>p {
        width:90%;
        height: px2rem2(62);
        line-height: px2rem2(62);
        border-radius: 30px;
        background-color: #FFF8DD;
        color: #9A2D00;
        margin: 0 auto;
        margin-top: 10px;
        text-align: center;
        padding-left: 5px;
      }
    }
    /*实时奖励*/
    .real-time {
      padding: 0 1rem;
      h5 {
        height: px2rem2(60);
        background: url(../../../assets/active/invite2/text3.png) center no-repeat;
        background-size: contain;
      }
      div {
        padding: 2rem 1rem;
        border: 1px solid #FD6601;
        border-radius: 5px;
        background-color: #fff;
        img{
          width:100%;
        }
      }
    }
    /*额外奖励*/
    .additional {
      padding: 0 1rem;
      h5 {
        height: px2rem2(60);
        background: url(../../../assets/active/invite2/text4.png) center no-repeat;
        background-size: contain;
      }
      .additional-main {
        padding: px2rem2(30);
        border: 1px solid #FD6601;
        background: #fff;
        border-radius: 5px;
        &>p {
          color: #666666;
          text-align: center;
          padding-bottom: px2rem2(30);
          border-bottom: 1px dashed #FD6601;
          span {
            color: #FDA616;
          }
        }
        .additional-img {
          padding:2rem 0;
          img{
            width:100%;
          }
        }
        .additional-demo {
          height: px2rem2(292);
          border: 1px dashed #FD6601;
          border-radius: 5px;
          position: relative;
          &:after {
            position: absolute;
            content: '';
            top: -2rem;
            left: 50%;
            transform: translatex(-50%);
            width: px2rem2(239);
            height: px2rem2(83);
            background: url(../../../assets/active/invite2/text5.png) center no-repeat;
            background-size: contain;
          }
          p:first-child {
            color: #666666;
            text-align: center;
            padding: px2rem2(60) 0 px2rem2(40) 0;
          }
          p:last-child {
            width: 90%;
            height: px2rem2(62);
            line-height: px2rem2(62);
            border-radius: 30px;
            background-color: #FFF8DD;
            color: #9A2D00;
            margin: 0 auto;
            text-align: center;
            padding-left: 5px;
          }
        }
      }
    }
    /*参与方式*/
    .join-way {
      padding: 0 1rem;
      margin-top: 8px;
      h5 {
        height: px2rem2(54);
        background: url(../../../assets/active/invite2/text6.png)center no-repeat;
        background-size: contain;
      }
      div {
        height: px2rem2(246);
        background: url(../../../assets/active/invite2/share_bg4.png)center no-repeat;
        background-size: contain;
      }
    }
    /*邀请小窍门*/
    .box-tips {
      padding: 0 1rem;
      &>div {
        height: px2rem2(335);
        border: 1px dashed #FD6601;
        border-radius: 5px;
        color: #A34100;
        text-align: center;
        line-height: 1.5;
        .tips-title {
          width: px2rem2(200);
          height: px2rem2(58);
          line-height: px2rem2(58);
          border-radius: 30px;
          background-color: #FFC207;
          margin: px2rem2(30) auto;
          text-align: center;
          padding-left: 5px;
        }
      }
    }
    .footer {
      text-align: center;
      color: #CF8420;
    }
    .share {
      background-color: rgba(0, 0, 0, .6);
      padding: px2rem2(20) px2rem2(22);
      >div {
        background-color: #fff;
        border-radius: 5px;
        height: px2rem2(128);
        span {
          display: inline-block;
          width: px2rem2(28);
          padding-left: px2rem2(42);
          line-height: 1.2;
          margin-top: 5px;
          color: #FD6601;
        }
        &>div {
          float: right;
          width: 85%;
          height: 100%;
        }
      }
      /*分享按钮*/
      .share-btn {
        float: left;
        font-size: px2rem(12);
        margin-top: px2rem2(12);
        padding-top: px2rem(35);
        width: 33.33333%;
        text-align: center;
      }
      /*分享给微信好友*/
      .share-wechat {
        background: url("../../../assets/active/invite2/wechat_icon.png") center 0 no-repeat;
        background-size: px2rem(34);
      }
      /*分享到朋友圈*/
      .share-moment {
        background: url("../../../assets/active/invite2/moments.png") center 0 no-repeat;
        background-size: px2rem(30);
      }
      /*分享给微信好友*/
      .share-qq {
        background: url("../../../assets/active/invite2/QQ.png") center 0 no-repeat;
        background-size: px2rem(30);
      }
    }
  }
</style>