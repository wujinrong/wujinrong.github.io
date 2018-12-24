<!--
  -- 邀请好友活动 - 注册
  -- @author bigfact
  -->
<template>
  <section class="active-invite-register">
    <!--banner-->
    <img class="banner" src="../../../assets/active/invite/share-banner-1.png" alt="">
    <!--内容-->
    <div class="content">
      <!--数据提交表单-->
      <div class="fs16" v-show="status != 1">
        <!--手机号码-->
        <div>
          <div class="input-wrap">
            <input name="phone" type="tel" v-model="phone.model" placeholder="请输入您的手机号码" maxlength="11">
          </div>
        </div>
        <!--登录密码-->
        <div>
          <div class="input-wrap">
            <input name="password" type="password" v-model="password.model" placeholder="设置登录密码（6-16位数字或字母）" maxlength="16">
          </div>
        </div>
        <!--图形验证码-->
        <div v-show="imgCode.show">
          <div id="img-code-wrap"></div>
        </div>
        <!--短信验证码-->
        <div class="sms-area">
          <div class="fl">
            <div class="sms-input input-wrap">
              <input name="sms" type="text" v-model="sms.model" placeholder="请输入短信验证码">
            </div>
          </div>
          <div class="fr">
            <button class="sms-btn btn" :class="sms.timeall != sms.timenow && 'disabled'" @click="getSms()">{{ sms.btn }}</button>
          </div>
        </div>
        <!--错误提示-->
        <div class="err-hint tac fs14">{{ err }}</div>
        <!--协议-->
        <div class="protocol-link fs14 c-white clearboth">
          <i class="agree" :class="agree && 'active'" @click="switchAgree(agree)"></i>
          <span>我已阅读并同意</span>
          <a class="c-link" v-link="'/user/service-protocol'">《贷上钱服务协议》</a>
        </div>
        <!--提交按钮-->
        <div class="smt-btn">
          <d-button v-bind:button.sync="submit" :class="!agree && 'disabled'"></d-button>
        </div>
      </div>
      <!--页脚公司信息文案-->
      <!--<div class="foot-icp tac">-->
        <!--<p>沪ICP备16041593号</p>-->
        <!--<p>墨讯信息科技（上海）有限公司</p>-->
      <!--</div>-->
    </div>
    <!--用户已存在弹框提示-->
    <div class="layermbox0" v-show="status == 2">
      <div class="laymshade"></div>
      <div class="layermmain">
        <div class="section">
          <div class="layermchild layermanim">
            <div class="close-wrap">
              <i class="close-btn" @click="close()"></i>
            </div>
            <div class="layermcont fs15">
              <p class="tac">您的手机已经注册过贷上钱账户，请前往APP登录</p>
              <br>
              <div class="sure-btn">
                <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn">登录领取</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  import DButton from '../../directives/DButton.vue'
  var $data = {
    // 手机号
    phone: {
      model: '',
      reg: regexp.phone,
      err: '请填写正确的手机号',
    },
    // 图形验证码
    imgCode: {
      ticket: '',
      show: false,
    },
    // 短信验证码
    sms: {
      model: '',
      reg: regexp.empty,
      err: '请填写短信验证码',
      btntitle: '点击获取',
      btn: '获取验证码',
      timeall: 60,
      timenow: 60,
    },
    // 密码
    password: {
      model: '',
      reg: regexp.password,
      err: '请填写6-16位数字或字母的密码'
    },
    // 用户分享唯一标识
    user_code: '',
    // 提交按钮
    submit: {
      name: '立即领取',
      class: 'btn',
      click: '',
    },
    // 0 注册 1 注册成功 2 用户已存在
    status: 0,
    // 错误提示
    err: '',
    // 是否同意协议
    agree: true,
    /**
     * 微信分享相关数据
     */
    title: '',                // 分享标题
    desc: '',                 // 分享描述
    link: '',                 // 分享链接
    imgUrl: '',               // 分享图标
    appId: '',                // 微信 js sdk 授权信息 - 公众号的唯一标识
    timestamp: '',            // 微信 js sdk 授权信息 - 生成签名的时间戳
    nonceStr: '',             // 微信 js sdk 授权信息 - 生成签名的随机串
    signature: '',            // 微信 js sdk 授权信息 - 签名
  }
  export default {
    data() {
      // 按钮点击函数初始化
      $data.submit.click = this.submitClick
      // 获取用户分享唯一标识
      $data.user_code = sysinfo.getQueryString('sharecode') || ''

      // this.$router.go('/active/invite/success')

      // $data.status = 2

      // 返回数据
      return $data
    },
    ready() {
      // 设置分享数据、获取微信授权信息初始化微信分享
      if (sysinfo.isWeiXin) {
        $data.title = '现金借款神器，申请简单、极速放款！'
        $data.desc = '10秒注册，88秒放款，20元代金券直接送！'
        $data.link = location.origin + location.pathname + '?sharecode=' + $data.user_code + '#!/active/invite/register'
        $data.imgUrl = location.origin + location.pathname + '/static/img/active/invite/logo.png'
        this.loadWxJsSdk()
      }
      // 初始化图形验证码组件（https://www.qcloud.com/document/product/295/6616）
      // this.initImgCode()
    },
    methods: {
      // 关闭用户已存在弹框提示
      close() {
        $data.status = 0
      },
      // 检查 input 值
      check(key) {
        var item = $data[key]
        if (item.reg(item.model)) {
          $data.err = ''
          return true
        }
        else {
          $data.err = item.err
          try {
            document.querySelector('[name="' + key + '"]').focus()
          } catch (err) { }
          return false
        }
      },
      // 初始化图片验证码组件
      initImgCode() {
        // 图片验证码组件配置
        var capOption = {
          // 回调函数：验证码页面关闭时回调
          callback: function (retJson) {
            if (retJson.ret == 0) {
              $data.imgCode.ticket = retJson.ticket
              $data.imgCode.show = false
            }
          },
          showHeader: false,
          themeColor: '939CFF',
        }
        // 已经加载过图形验证码执行代码
        if (typeof capInit === 'function') {
          capInit(document.getElementById('img-code-wrap'), capOption)
          return
        }
        /**
         * 获取图形验证码执行代码（http://git.fond.io/b/paydayloan/wikis/captcha-js）
         * @return {Number} code 错误码
         * @return {String} message 提示信息
         * @return {String} data.url 图片验证码地址
         */
        ajax.get('/v3/action/captcha')
          .then(function (xhr, res) {
            if (res.code != 0) return
            var tmp = document.createElement('script')
            tmp.src = res.data.url
            document.body.appendChild(tmp)
            tmp.onload = function () {
              capInit(document.getElementById('img-code-wrap'), capOption)
            }
          })
      },
      // 显示图片验证码组件
      showImgCode() {
        if (typeof capRefresh == 'function') {
          capRefresh()
        } else {
          this.initImgCode()
        }
        $data.imgCode.show = true
        $data.imgCode.ticket = ''
      },
      // 获取短信验证码
      getSms() {
        if (!this.check('phone')) return
        if ($data.sms.timenow != $data.sms.timeall) return
        $data.sms.timenow = $data.sms.timeall - 1
        $data.sms.btn = $data.sms.timenow + ' s'
        var showImgCode = this.showImgCode
        /**
         * 发送短信验证码，有图形验证码防刷逻辑（http://git.fond.io/b/paydayloan/wikis/sms-code-v2）
         * @param {String} phone 手机号
         * @return {Number} code 错误码（0-成功 101004-手机号已注册 106002-需要图形验证码 106003-图形验证码不正确）
         * @return {String} message 提示消息
         */
        ajax.get('/v2/user/send-sms-code', {
          phone: $data.phone.model,
          ticket: $data.imgCode.ticket,
        }).then(function (xhr, res) {
          if (res.code == 0) {
            var tid = setInterval(function () {
              if (--$data.sms.timenow) $data.sms.btn = $data.sms.timenow + ' s'
              else {
                $data.sms.btn = $data.sms.btntitle
                $data.sms.timenow = $data.sms.timeall
                clearInterval(tid)
              }
            }, 1000)
          }
          else {
            if (res.code == 106002 || res.code == 106003) showImgCode()
            else if (res.code == 101004) $data.status = 2
            else layer.warning(res.message)
            $data.sms.btn = $data.sms.btntitle
            $data.sms.timenow = $data.sms.timeall
          }
        }).catch(function (err, xhr) {
          $data.sms.btn = $data.sms.btntitle
          $data.sms.timenow = $data.sms.timeall
          layer.warning('出错啦，请稍后尝试 - ' + xhr.status)
        }).complete(function () {
          $data.imgCode.ticket = ''
        })
      },
      // 提交表单
      submitClick() {
        var _this = this
        // 检查表单状态
        if (!$data.agree) return
        if (!_this.check('phone')) return
        if (!_this.check('sms')) return
        if (!_this.check('password')) return
        // loading
        var lid = layer.loading2(false)
        /**
         * 推广注册（http://git.fond.io/b/paydayloan/wikis/user-register-v2）
         * @param {String} phone 手机号
         * @param {String} password 密码
         * @param {String} verify_code 手机验证码
         * @param {String} ticket 图形验证码
         * @param {String} user_code 用户分享唯一标识
         * @return {Number} code 错误码（0-成功 106001-短信验证码不正确 101004-手机号已注册 106002-需要图形验证码 106003-图形验证码不正确）
         * @return {String} message 提示消息
         */
        ajax.post('/v3/user/register', {
          phone: $data.phone.model,
          verify_code: $data.sms.model,
          password: $data.password.model,
          ticket: $data.imgCode.ticket,
          user_code: $data.user_code
        }).then(function (xhr, res) {
          if (res.code == 0) _this.$router.go('/active/invite/success')
          else if (res.code == 106002 || res.code == 106003) _this.showImgCode()
          else if (res.code == 101004) $data.status = 2
          else layer.warning(res.message)
        }).complete(function () {
          layer.close(lid)
          $data.imgCode.ticket = ''
        })
      },
      // 是否同意服务协议按钮点击切换按钮状态
      switchAgree() {
        $data.agree = !$data.agree
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
      },
    },
    components: {
      DButton: DButton,
    },
    destroyed() {
      $data.imgCode.ticket = ''
      typeof capDestroy == 'function' && capDestroy()
    }
  }
</script>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .clearboth {
    clear: both;
  }
  .active-invite-register {
    background: url(../../../assets/active/invite/register-bg-0.png) no-repeat center top;
    background-size: 100% auto;
    box-sizing: border-box;
    min-height: 100%;
    padding-bottom: px2rem(30);
    /*banner*/
    .banner {
      display: block;
      width: 100%;
    }
    /*内容*/
    .content {
      padding: 0 px2rem(18);
      .fs16 {
        padding: px2rem(24) px2rem(12);
        background: rgba(98,21,177,.54);
      }
    }
    /*链接按钮*/
    a.btn {
      width: auto;
    }
    .smt-btn, .sure-btn {
      padding-bottom: px2rem(4);
      border-radius: px2rem(3);
      background-color: rgba(201,140,23,.5);
      .btn {
        border-radius: px2rem(3);
      }
    }
    .btn {
      color: #430070;
      background-color: rgb(255,184,48);
      &.disabled {
        background: #DBDBDB;
      }
    }
    /*表单输入框和按钮的高度*/
    $btn-input-height: px2rem(28);
    /*输入框*/
    .input-wrap {
      display: inline-block;
      background: #FFF;
      margin-bottom: px2rem(14);
      padding: 0 px2rem(9);
      width: 100%;
      height: $btn-input-height;
      line-height: $btn-input-height;
      border-radius: px2rem(3);
      box-sizing: border-box;
      box-shadow: 0px 0px px2rem(2) #620AFF;
    }
    /*输入框*/
    input {
      width: 100%;
    }
    /*短信验证码*/
    .sms-area {
      >.fl {
        width: 68%;

      }
      >.fr {
        width: 32%;
        >.sms-btn {
          border-radius: 0 px2rem(3) px2rem(3) 0;
          background-color: #e6e6e6;
          font-size: px2rem(14);
          color: #000;
        }
      }
      .input-wrap {
        border-radius: px2rem(3) 0 0 px2rem(3);
      }
    }
    /*获取短信验证码按钮*/
    .sms-btn {
      height: $btn-input-height;
      padding: 0;
      border-radius: px2rem(6);
    }
    /*错误提示*/
    .err-hint {
      clear: both;
      color: #FFC800;
      margin: px2rem(4) 0 px2rem(12) 0;
    }
    /*协议链接*/
    .protocol-link {
      padding: px2rem(6) 0 px2rem(26);
      margin-top: px2rem(14);
      > * {
        vertical-align: middle;
      }
    }
    /*是否协议选择按钮*/
    .agree {
      display: inline-block;
      background: #FFF;
      padding: px2rem(5);
      border-radius: px2rem(3);
      &::after {
        content: "";
        display: block;
        background: none;
        width: px2rem(8);
        height: px2rem(8);
        border-radius: px2rem(8);
      }
    }
    .active::after {
      background: #893DFF;
    }
    /*链接样式*/
    .c-link {
      color: #fff;
    }
    /*页脚公司信息文案*/
    .foot-icp {
      font-size: px2rem(14);
      padding: px2rem(30) 0;
      color: #430070;
    }
    /*弹窗样式*/
    .layermchild {
      width: px2rem(280);
    }
    .layermcont {
      padding: 0 px2rem(30) px2rem(30);
    }
    /*弹窗关闭按钮容器*/
    .close-wrap {
      margin: px2rem(10) px2rem(20) 0;
      text-align: right;
    }
    /*弹窗关闭按钮*/
    .close-btn {
      display: inline-block;
      padding: px2rem(10);
      background: url("../../../assets/active/promotion/close.png") no-repeat 50%;
      background-size: px2rem(16);
      width: px2rem(16);
      height: px2rem(16);
    }
  }
</style>
