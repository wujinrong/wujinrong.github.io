<!--
  -- 端午节邀新排行榜
  -- @author littlecherrymiao~
  -->
<template>
<section class="drogon-boat tac">
  <div class="banner">
    <img src="../../../assets/active/drogon/banner.png" alt="">
  </div>
  <!--排行榜，如果是微信端，不是app，此部分不显示 -->
  <div class="rank-wrap" v-show="isApp && rank && rank.length > 0">
  <!--<div class="rank-wrap">-->
    <div class="rank-title fs17">
      <p>邀请送壕礼  端午乐不停</p>
    </div>
    <div class="rank-content fs14 tac">
      <div style="height: 8rem; overflow: hidden;">
        <ul v-el:awardul>
          <li v-for="i in rank">No.{{i.index}} {{i.phone}} 成功邀请<span>{{i.invite_count}}</span>位好友</li>
        </ul>
        <ul v-el:awardul2>
          <li v-for="i in rank">No.{{i.index}} {{i.phone}} 成功邀请<span>{{i.invite_count}}</span>位好友</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="object">
    <p>参与对象：贷上钱的所有用户</p>
    <p>活动时间：2017年5月30日-2017年6月13日</p>
  </div>
  <!--这是活动规则部分  -->
  <div class="rule">
    <div class="rule-title">活动规则</div>
    <div class="rule-content">
      <p class="tal">1、活动期间邀请好友注册，好友立即获得20元优惠券，有效期7天。</p>
      <p class="tal">2、好友在30天内首次借款成功，邀请人获得好友申请金额的1%，多邀多得，上不封顶。</p>
      <br>
      <p class="tal">额外奖励:</p>
      <div class="tal notice">
        <p>活动期间，邀请成功完成借款的好友数量</p>
        <p>排名第一，获得奖励888元</p>
        <p>排名第二，获得奖励688元</p>
        <p>排名第三，获得奖励388元</p>
        <p>排名第四至十名获得188元</p>
        <br>
        <p class="fs10">（备注：额外奖励我们将在活动结束后的三个工作日内进行发放，最终中奖名单，我们将在“贷上钱服务号”上进行公布）</p>
      </div>
      <br>
      <p class="tal">提现规则：</p>
      <p class="tal">1 、现金奖励可累加，累计至20元即可提现；</p>
      <p class="tal">2 、每周可申请一次现金提现；</p>
      <p class="tal">3 、申请提现后，奖励将在1个工作日发放到您绑定的银行卡上。</p>
    </div>
  </div>
  <!--如何邀请好友  -->
  <!-- v-show="isApp && isLogin"  -->
  <div class="invite" v-show="isApp && isLogin">
    <p class="invite-title">如何邀请更多好友</p>
    <p class="invite-content tal" @touchstart="copystart($event)" @touchend="copyend()">邀请小窍门：长按复制下方文字并发送，可以获得更多现金哦！＃贷款平台推荐＃今天发现一个借款新平台：贷上钱，最高额度1万，极速放款只要5分钟，被拒还赔钱！！！戳，去拿钱》{{$data.link}}</p>
  </div>
  <br>
  <p>本活动最终解释权归贷上钱所有</p>
  <p>如有疑问可咨询贷上钱公众号“dsqmxkj”</p>
  <!--分享组  -->
  <div class="fixed share">
    <div class="clearfix">
      <div class="share-btn share-wechat" @click="share('wechat')">微信好友</div>
      <div class="share-btn share-moment" @click="share('moment')">朋友圈</div>
      <div class="share-btn share-qq" @click="share('qq')">QQ好友</div>
    </div>
  </div>
</section>
</template>
<script>
var $data = {
  /**
   * 业务数据
   */
  isApp:sysinfo.dsq.isapp(),//判断是否是app
  isLogin: false, // 用户是否登录
  title: '', // 分享标题
  desc: '', // 分享描述
  link: '', // 分享链接
  imgUrl: '', // 分享图标
  balance: '', // 余额
  withdrawalsLink: '',
  living: false, // 是否验证过身份证和人脸，如果没有，提现的时候需要提示完善信息
  rank: '', //排行信息
  /**
   * 功能数据
   */
  appId: '', // 微信 js sdk 授权信息 - 公众号的唯一标识
  timestamp: '', // 微信 js sdk 授权信息 - 生成签名的时间戳
  nonceStr: '', // 微信 js sdk 授权信息 - 生成签名的随机串
  signature: '', // 微信 js sdk 授权信息 - 签名
  isIos: sysinfo.isIOS, // 是否在 IOS 中
  ConfirmTipShow: false, // 控制是否显示提示完善信息弹窗
  copytime: {
    start: 0
  }
}
export default {
  data() {
    // 设置分享数据
    $data.title = '现金借款神器，申请简单、极速放款！'
    $data.desc = '10秒注册，88秒放款，20元代金券直接送！'
    $data.link = location.origin + location.pathname + '?sharecode=#/active/invite/register'
    $data.imgUrl = location.origin + location.pathname + '/static/img/active/invite/logo.png'
    /**
     * 获取用户分享标识
     * https://git.fond.io/b/paydayloan/wikis/share-v2
     */
    ajax.get('/v3/action/user-code').then((xhr, res) => {
      if (res.code == 0) {
        // 使用用户分享标识拼接分享链接
        $data.link = location.origin + location.pathname + '?sharecode=' + (res.data.user_code || '') + '#!/active/invite/register'
        // 已登录
        $data.isLogin = true
      } else if (res.code != 101003) {
        layer.warning(res.message)
      }
    })
    // 获取端午节邀请排行
    ajax.get('/v3/activity/invite-rank').then((xhr, res) => {
      if (res.code == 0) {
        // 处理排行信息
        $data.rank = res.data.rank
        // 已登录
        $data.isLogin = res.data.is_login
      } else if (res.code != 101003) {
        layer.warning(res.message)
      }
    })
    return $data
  },
  // 排行榜轮播
  ready: function() {
    title('邀请送壕礼 端午乐不停');
    // 此处往下是轮播图逻辑
    var _this = this
      // 添加过渡属性
    function addTransition(el) {
      el.style.transition = 'all ease'
      el.style.webkitTransition = 'all 1s'
    }
    // 移除过渡属性
    function removeTransition(el) {
      el.style.transition = 'none'
      el.style.webkitTransition = 'none'
    }
    // 运动动画
    function moveTo(el, a) {
      el.style.transform = 'translateY(' + a + 'px)'
      el.style.webkitTransform = 'translateY(' + a + 'px)'
    }

    var obj = _this.$els.awardul
    var obj2 = _this.$els.awardul2
    var flag = 0
    var flag2 = 0
    // 设置定时器运行运动动画
    setInterval(function() {
      addTransition(obj)
      flag += obj.clientHeight / 10
      moveTo(obj, -flag)
      if (flag > obj.clientHeight) {
        removeTransition(obj)
        moveTo(obj, 0)
        flag = 0
        flag2 = obj2.clientHeight
      }

      addTransition(obj2)
      flag2 += obj2.clientHeight / 10
      moveTo(obj2, -flag2)
      if (flag2 > obj2.clientHeight) {
        removeTransition(obj2)
        moveTo(obj2, 0)
        flag2 = 0
      }
    }, 1000)
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
    copyend(){
      console.log(Date.now() - $data.copytime.start)
      if (Date.now() - $data.copytime.start >= 600) {
        console.log(111)
        sysinfo.dsq.setClipboard("＃贷款平台推荐＃今天发现一个借款新平台：贷上钱，最高额度1万，极速放款只要5分钟，被拒还赔钱！！！戳，去拿钱》" + $data.link);
        layer.tip('复制成功！')
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
      wx.ready(function() {
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
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
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
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
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
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        })
      })
    },
    /**
     * 跳转到 app 首页
     */
    // gotoAppIndex() {
    //   this.toggleConfirmTip()
    //   sysinfo.dsq.openView('index')
    // }
  }
}
</script>
<style lang="scss">
@import '../../../sass/_globals.scss';
.drogon-boat {
    background: url("../../../assets/active/drogon/bg.png") no-repeat center center;
    background-size: cover;
    .banner {
        padding: px2rem(20) 0;
        img {
            margin: 0 auto;
            display: block;
            width: px2rem(90);
            height: px2rem(260);
        }
    }
    .rank-wrap {
        color: #384312;
        .rank-content {
            padding: px2rem(20) 0 px2rem(20) 0;
            background: url("../../../assets/active/drogon/rankcontent.png") no-repeat center center;
            background-size: 90% 100%;
            // height: px2rem(85);
            overflow: hidden;
            ul {
                // height: px2rem(80);
                li {
                    height: px2rem(16);
                }
                span {
                    display: inline-block;
                    width: px2rem(25);
                }
            }
        }
    }
    .object {
        margin: px2rem(20) 0;
    }
    .rule {
        background: url("../../../assets/active/drogon/rule.png") no-repeat center center;
        background-size: 100% 100%;
        position: relative;
        color: #633E25;
        .rule-title {
            padding-top: px2rem(8);
        }
        .rule-content {
            padding: px2rem(10) px2rem(50);
            .notice {
                padding: 0 px2rem(10);
            }
        }
    }
    .invite {
        background: url("../../../assets/active/drogon/invite.png") no-repeat center center;
        background-size: 87% 100%;
        margin-top: px2rem(10);
        color: #633E25;
        .invite-title {
            padding-top: px2rem(4);
        }
        .invite-content {
            padding: px2rem(10) px2rem(50);
            word-break: break-all;
        }
        .invite-content-link {
          padding: 0 px2rem(50);
          word-break: break-all;
          overflow-x: scroll;
        }
    }
    .share {
        background-color: #7c8f50;
        padding: px2rem(15) 0;
        margin-top: px2rem(10);
        /*分享按钮*/
        .share-btn {
            float: left;
            font-size: px2rem(12);
            padding-top: px2rem(42);
            width: 33.33333%;
        }
        /*分享给微信好友*/
        .share-wechat {
            background: url("../../../assets/active/drogon/share-wechat.png") center 0 no-repeat;
            background-size: px2rem(40);
        }
        /*分享到朋友圈*/
        .share-moment {
            background: url("../../../assets/active/drogon/share-moment.png") center 0 no-repeat;
            background-size: px2rem(40);
        }
        /*分享给微信好友*/
        .share-qq {
            background: url("../../../assets/active/drogon/share-qq.png") center 0 no-repeat;
            background-size: px2rem(40);
        }
        /*分享页脚提示*/
        .share-foot {
            padding: px2rem(43) 0 px2rem(40);
            color: #FED801;
        }
    }

}
</style>
