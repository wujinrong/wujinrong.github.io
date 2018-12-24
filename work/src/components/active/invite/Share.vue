<!--
  -- 邀请好友活动，分享页面，app 中使用
  -- @author bigfact
  -->
<template>
  <section class="active-invite-share fs15 tac c-white">
    <div class="header"><img src="../../../assets/active/invite/banner.png" alt=""></div>
    <!--内容-->
    <div class="content">
      <div class="content1">
        <div class="con">
          <ul>
            <li>
              <img src="../../../assets/active/invite/share-coupon-1.png" alt="" />
              <div class="coupon-tip coupon-tip-left tac">您的奖励</div>
            </li>
            <li>
              <img src="../../../assets/active/invite/share-coupon-2.png" alt="" />
              <div class="coupon-tip coupon-tip-right tac">好友奖励</div>
            </li>
          </ul>
        </div>
        <p class="fs12">例如您邀请好友成功借款2000元，获得以上奖励</p>
      </div>
      <div class="content2">
        <div class="title">
          <span>活动规则</span>
        </div>
        <div class="con">
          <ul>
            <li><span class="titlename">参与对象：</span>贷上钱的所有用户</li>
            <li><span class="titlename">活动规则：</span>活动期间，邀请人邀请好友注册，邀请人获得20元优惠券，有效期60天；好友获得10元优惠券，有效期7天；好友在30天内首次成功借款，则邀请人获得好友申请金额的1%，多邀多得，上不封顶。</li>
            <li><span class="titlename">活动日期：</span>2017年6月1日-2017年6月15日</li>
            <li>
              <p>提现规则：</p>
              <ol>
                <li>现金奖励可累加，累计至20元即可提现；</li>
                <li>每周可申请一次现金提现；</li>
                <li>借款时点击使用优惠券即可；</li>
                <li>申请成功后，奖金将在1个工作日内发放到您绑定的银行卡上；</li>
              </ol>
            </li>
          </ul>
        </div>
      </div>

      <!--<div class="content3" id="clipboard">
        <div class="title">
          <img src="../../../assets/active/invite/share-title-2.png" alt="" />
        </div>
        <div class="con">
          <div class="tips">邀请小窍门：长按复制下方文字发帖，可以获得更多好友哦！</div>
          <ul>
            <li>#贷款新产品推荐#今天发现一个新贷款产品：贷上钱</li>
            <li>极速放款，审核快，利息低！</li>
            <li>借款链接>> {{link}}</li>
          </ul>
        </div>
      </div>-->

      <div class="content4">
        <div class="title">
          <span>关于贷上钱</span>
        </div>
        <div class="con">
          <p>贷上钱是基于元方智能风控技术的短期、小额信贷产品，作为传统信贷的补充，贷上钱授信额度在500-2000元，其特点为即时、小额分散、纯电子化信审，借款用户仅 需在线提交个人信息，即进入大数据风控体系，最快1分钟便可获得系统反馈的审批结果。</p>
        </div>
      </div>
      <!--本活动与苹果公司无关-->
      <div class="fs12" v-if="isIos">本活动与苹果公司无关</div>
    </div>
    <!--分享按钮组-->
    <div class="fixed tac">
      <div class="share-title">通过以下方式，邀请我的好友</div>
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
    isLogin: 0,               // 用户是否登录
    title: '',                // 分享标题
    desc: '',                 // 分享描述
    link: '',                 // 分享链接
    imgUrl: '',               // 分享图标
    balance: '',              // 余额
    withdrawalsLink: '',
    living: false,            // 是否验证过身份证和人脸，如果没有，提现的时候需要提示完善信息
    /**
     * 功能数据
     */
    appId: '',                // 微信 js sdk 授权信息 - 公众号的唯一标识
    timestamp: '',            // 微信 js sdk 授权信息 - 生成签名的时间戳
    nonceStr: '',             // 微信 js sdk 授权信息 - 生成签名的随机串
    signature: '',            // 微信 js sdk 授权信息 - 签名
    isIos: sysinfo.isIOS,     // 是否在 IOS 中
    ConfirmTipShow: false,    // 控制是否显示提示完善信息弹窗
  }
  export default {
    data() {
      // 设置分享数据
      $data.title = '现金借款神器，申请简单、极速放款！'
      $data.desc = '10秒注册，88秒放款，20元代金券直接送！'
      $data.link = location.origin + location.pathname + '?sharecode=#!/active/invite/register'
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
          $data.isLogin = 1
        } else if (res.code != 101003) {
          layer.warning(res.message)
        }
      })
      /**
       * 查询账户余额
       * https://git.fond.io/b/paydayloan/wikis/account-balance
       */
      ajax.get('/v3/account/query').then((xhr, res) => {
        if (res.code == 0) {
          $data.isLogin = 1;
          $data.balance = res.data.balance;
          //$data.withdrawalsLink = res.data.has_card ? '/my/withdrawals-detailed' : '/bank/list?from=withdrawals';
          $data.withdrawalsLink = res.data.has_card ? '/my/withdrawals-detailed' : '/bank/add';
          $data.living = res.data.living
        }
      })
      return $data
    },
    ready() {
      /*
      var timeOutEvent=0;
      function longPress(){
        var res = sysinfo.dsq.setClipboard("'"+$data.link+"'");
        if(res){
          layer.tip("复制成功")
        }
      }
      */
      // 获取微信授权信息并初始化微信分享
      sysinfo.isWeiXin && this.loadWxJsSdk()
      /*
      document.getElementById('clipboard').addEventListener('touchstart', function (){
        timeOutEvent = setTimeout(function(){
          timeOutEvent = 0;
        },500);
        event.preventDefault();
      })
      document.getElementById('clipboard').addEventListener('touchmove', function (){
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
      })
      document.getElementById('clipboard').addEventListener('touchend', function (){
        clearTimeout(timeOutEvent);
        if(timeOutEvent != 0){
        } else {
          longPress();
        }
        return false;
      });
      */
    },
    methods: {
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
       * 加载微信 js sdk
       */
      loadWxJsSdk() {
        // 判断是否已经加载过 js sdk
        if (typeof wx == 'undefined') {
          var wxjssdk = document.createElement('script')
          wxjssdk.src = './static/js/jweixin-1.0.0.js'
          wxjssdk.onload = this.getSignature
          document.body.appendChild(wxjssdk)
        } else {
          this.getSignature()
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
          appId: $data.appId,                                                            // 必填，公众号的唯一标识
          timestamp: $data.timestamp,                                                    // 必填，生成签名的时间戳
          nonceStr: $data.nonceStr,                                                      // 必填，生成签名的随机串
          signature: $data.signature,                                                    // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']   // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
            title: $data.title,     // 分享标题
            link: $data.link,       // 分享链接
            imgUrl: $data.imgUrl,   // 分享图标
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
            title: $data.title,     // 分享标题
            desc: $data.desc,       // 分享描述
            link: $data.link,       // 分享链接
            imgUrl: $data.imgUrl,   // 分享图标
            type: '',               // 分享类型,music、video或link，不填默认为link
            dataUrl: '',            // 如果type是music或video，则要提供数据链接，默认为空
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
            title: $data.title,     // 分享标题
            desc: $data.desc,       // 分享描述
            link: $data.link,       // 分享链接
            imgUrl: $data.imgUrl,   // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          })
        })
      }
    }
  }

</script>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .active-invite-share {
    padding-bottom: px2rem(30);
    position: relative;
    background: #9300A0 url(../../../assets/active/invite/share-bg-0.png) no-repeat center top;
    background-size: 100% auto;
    box-sizing: border-box;
    img.banner {
      margin-bottom: px2rem(12);
    }
    .header {
      img {
        max-width: 100%;
      }
    }
    /*banner*/
    .banner {
      display: block;
      min-height: px2rem(200);
      width: 100%;
    }
    /*内容*/
    .content {
      padding: 0 px2rem(12) px2rem(112);
      .con {
        min-height: px2rem(100);
        overflow: hidden;
        margin-bottom: px2rem(12);
        border-left: 2px solid #FF9E08;
        border-right: 2px solid #FF9E08;
        border-bottom: 2px solid #FF9E08;
        border-radius: 0 0 4px 4px;
      }
      .title {
        color: #750E69;
        position: relative;
        width: 100%;
        padding-bottom: px2rem(16);
        span {
          background: #FF9E08;
          line-height: px2rem(24);
          display: inline-block;
          padding: 0 px2rem(12);
          border-radius: px2rem(12);
        }
      }
      .content2,
      .content4 {
        .title {
          &::before {
            content: '';
            left: 0;
            bottom: 0;
            position: absolute;
            border-top: 2px solid #ff9e08;
            border-left: 2px solid #ff9e08;
            border-radius: 4px 0 0 0;
            width: px2rem(48);
            height: 8px;
          }
          &::after {
            content: '';
            right: 0;
            bottom: 0;
            position: absolute;
            border-top: 2px solid #ff9e08;
            border-right: 2px solid #ff9e08;
            border-radius: 0 4px 0 0;
            width: px2rem(48);
            height: 8px;
          }
          span {
            position: relative;
            bottom: px2rem(-18);
          }
        }
      }
      .content1 {
        .title {
          position: static;
        }
        .con {
          border: none;
          min-height: px2rem(108);
          ul {
            position: relative;
            padding: 12px 0;
            width: 90%;
            margin: 0 auto;
            background: #FFF9E4;
            border-radius: 6px;
            &::after {
              content: '';
              display: block;
              overflow: hidden;
              clear: both;
            }
            >li {
              width: 48.9999999999%;
              padding: 0 .5%;
              float: left;
              text-align: center;
              img {
                width: 80%;
                margin: 0 auto;
              }
              p {
                padding: px2rem(12) 0;
                font-size: px2rem(12);
                color: #9d7202;
              }
            }
          }
        }
        .coupon-tip {
          border-radius: 5px;
          display: inline-block;
          margin: 0 auto;
          padding: px2rem(3) 0;
          width: 80%;
        }
        .coupon-tip-left {
          background: #FFB100;
        }
        .coupon-tip-right {
          background: #C183FF;
        }
      }
      .content2,
      .content3,
      .content4 {
        position: relative;
        .con {
          text-align: left;
          line-height: px2rem(20);
          font-size: px2rem(12);
        }
      }
      .content2 {
        .con {
          text-align: left;
          ul {
            position: relative;
            padding: px2rem(12) px2rem(8) px2rem(12) px2rem(8);
            >li:not(:last-child) {
              padding-left: px2rem(68);
              padding-bottom: px2rem(12);
              .titlename {
                width: px2rem(68);
                left: px2rem(8);
                display: block;
                position: absolute;
              }
            }
            >li {
              ol {
                counter-reset: index1 0;
                >li {
                  position: relative;
                  padding-left: px2rem(12);
                  &::before {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: px2rem(12);
                    text-align: center;
                    content: counter(index1);
                    counter-increment: index1;
                  }
                }
              }
            }
          }
        }
      }
      .content3 {
        .con {
          .tips {
            color: #9c2100;
            border-radius: px2rem(4);
            padding: px2rem(4) px2rem(8);
            margin-bottom: px2rem(16);
            background-color: #f4ee3f;
          }
        }
      }
      .content4 {
        .con {
          >p {
            padding: px2rem(12) px2rem(8);
          }
        }
      }
    }
    .fixed {
      width: 100%;
      padding-bottom: px2rem(12);
      background-color: rgba(53, 0, 134, .5);
      position: fixed;
      bottom: 0;
    }
    /*分享按钮组标题*/
    .share-title {
      font-size: px2rem(14);
      line-height: px2rem(36);
      width: 95%;
    }
    /*分享按钮*/
    .share-btn {
      float: left;
      font-size: px2rem(12);
      padding-top: px2rem(42);
      width: 33.33333%;
    }
    /*分享给微信好友*/
    .share-wechat {
      background: url("../../../assets/active/invite/share-wechat.png") center 0 no-repeat;
      background-size: px2rem(40);
    }
    /*分享到朋友圈*/
    .share-moment {
      background: url("../../../assets/active/invite/share-moment.png") center 0 no-repeat;
      background-size: px2rem(40);
    }
    /*分享给微信好友*/
    .share-qq {
      background: url("../../../assets/active/invite/share-qq.png") center 0 no-repeat;
      background-size: px2rem(40);
    }
    /*分享页脚提示*/
    .share-foot {
      padding: px2rem(43) 0 px2rem(40);
      color: #FED801;
    }
  }
</style>
