<!--
  -- 推广落地页
  -- 1、页面内有今日头条的统计转化代码，代码分为两部分，基础代码动态加载，用户注册完成之后触发统计函数，统计参数 convert_id 根据“渠道码和今日头条 js id 的对应关系”来确定，每次只需在 ./static/json/jrtt.channel.id.json 文件中新增运营给到的 js 代码内的 id 和渠道对应关系就好
  -- 2、页脚 ICP 备案信息通过 DICP.vue 组件来确定
  -- 3、应运营推广需求，新生成和 index 一样的一个页面，仅 banner 不一样
  —- @author bigfact
  -- @date 2017.05.16
  -->
<template>
  <section class="active-promotion-page5">
    <!--banner-->
    <div>
      <img class="banner" src="../../../assets/active/promotion/banner.png"></img>
    </div>
    <!--数据提交表单-->
    <div class="form fs16" v-if="status != 1">
      <!--手机号码-->
      <div>
        <div class="input-wrap">
          <input name="phone" type="tel" v-model="phone.model" placeholder="请输入您的手机号码" maxlength="11">
        </div>
      </div>
      <!--图形验证码-->
      <div v-show="imgCode.show">
        <div id="img-code-wrap"></div>
      </div>
      <!--短信验证码-->
      <div>
        <div class="sms-input input-wrap fl">
          <input name="sms" type="text" v-model="sms.model" placeholder="请输入短信验证码">
        </div>
        <button class="sms-btn btn fr" :class="sms.timeall != sms.timenow && 'disabled'" @click="getSms()">{{ sms.btn }}</button>
      </div>
      <!--登录密码-->
      <div>
        <div class="input-wrap">
          <input name="password" type="password" v-model="password.model" placeholder="设置登录密码（6-16位数字或字母）" maxlength="16">
        </div>
      </div>
      <!--错误提示-->
      <div class="err-hint tac c-main">{{ err }}</div>
      <!--提交按钮-->
      <div>
        <button :class="!agree && 'disabled'" class="btn" v-submit="{cb: submitClick}">立即借钱</button>
      </div>
      <!--协议-->
      <div class="protocol-link tac fs14">
        <i class="agree" :class="agree && 'active'" @click="switchAgree(agree)"></i>
        <span>我已阅读并同意</span>
        <a class="c-link" @click="showProtocolPop()">《贷上钱服务协议》</a>
      </div>
    </div>
    <!--注册成功提示-->
    <div class="tac success-wrap" v-if="status == 1">
      <p class="success-hint fs20">恭喜您，注册成功</p>
      <p class="success-icon"></p>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn" @click="emit()">马上领钱</a>
    </div>
    <!--公司信息-->
    <div class="company-info tac fs14">
      <p>公司地址：上海市淞虹路207号明基商务广场C座2层</p>
      <p>联系电话：400-136-5799</p>
    </div>
    <!--用户已存在弹框提示-->
    <div class="layermbox0" v-if="status == 2">
      <div class="laymshade"></div>
      <div class="layermmain">
        <div class="section">
          <div class="layermchild layermanim">
            <div class="close-wrap">
              <i class="close-btn" @click="close()"></i>
            </div>
            <div class="layermcont fs15">
              <p>您的手机已经注册过贷上钱账户，请前往APP登录</p>
              <br>
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn">登录领取</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--页脚 ICP 文案-->
    <d-icp></d-icp>
    <d-protocol v-show="popFlag" @close-pop="protocolPop"></d-protocol>
  </section>
</template>
<script>
  import DIcp from '../../common/DICP'
  import DProtocol from '../../common/DProtocol'
  var $data = {
    //用户协议弹出层
    popFlag: false,
    // 手机号
    phone: {
      model: '',
      reg: regexp.phone,
      err: '请输入正确的手机号',
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
      err: '请输入短信验证码',
      btntitle: '点击获取',
      btn: '点击获取',
      timeall: 60,
      timenow: 60,
    },
    // 密码
    password: {
      model: '',
      reg: regexp.password,
      err: '请输入6-16位数字或字母的密码'
    },
    // 0 注册 1 注册成功 2 用户已存在
    status: 0,
    // 错误提示
    err: '',
    // 是否同意协议
    agree: true,
    // 渠道码和今日头条 js id 的对应关系，使用 ajax 从 ./static/json/jrtt.channel.id.json 文件中加载
    jrttids: {},
    // 渠道码
    channel: sysinfo.getQueryString('channel'),
    //今日头条url地址获取Id
    ttid: sysinfo.getQueryString('ttid'),
  }
  export default {
    data() {

      // // testdata
      // $data.status = 1

      // 返回数据
      return $data
    },
    ready() {
      var _this = this
      /*
       * 加载渠道码和今日头条 js id 的对应关系数据
       */
      if($data.ttid){
        _this.loadTtJs()
      } else {
        ajax.loadJson('./static/json/jrtt.channel.id.json')
          .then((xhr, res) => {
            $data.jrttids = res
            if ($data.jrttids[$data.channel]) {
              _this.loadTtJs()
            }
          })
      }
    },
    methods: {
      // 显示用户协议弹出层
      showProtocolPop() {
        $data.popFlag = true
      },
      // 加载今日头条的统计代码
      loadTtJs() {
        (function (root) {
          root._tt_config = true
          var ta = document.createElement('script')
          ta.type = 'text/javascript'
          ta.async = true
          ta.src = document.location.protocol + '//' + 's3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js'
          ta.onerror = function () {
            var web_url = window.encodeURIComponent(window.location.href)
            var js_url = ta.src
            ajax.get('//ad.toutiao.com/link_monitor/cdn_failed?web_url=' + web_url + '&js_url=' + js_url)
          }
          var s = document.getElementsByTagName('script')[0]
          s.parentNode.insertBefore(ta, s)
        })(window)
      },
      // 隐藏用户协议弹出层
      protocolPop(res) {
        $data.popFlag = res.popFlag
      },
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
          themeColor: 'FF6262',
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
        ajax.get('/v2/action/captcha')
          .then(function (xhr, res) {
            if (res.code != 0) return
            var tmp = document.createElement('script')
            tmp.src = res.data.url
            document.body.appendChild(tmp)
            tmp.onload = function () {
              if (typeof capInit === 'function') {
                capInit(document.getElementById('img-code-wrap'), capOption)
              }
            }
          })
      },
      // 显示图片验证码组件
      showImgCode() {
        if (typeof capRefresh === 'function') {
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
        // 检查表单状态
        if (!$data.agree) return
        if (!this.check('phone')) return
        if (!this.check('sms')) return
        if (!this.check('password')) return
        // loading
        var lid = layer.loading2(false)
        var showImgCode = this.showImgCode
        /**
         * 推广注册（http://git.fond.io/b/paydayloan/wikis/user-register-v2）
         * @param {String} phone 手机号
         * @param {String} password 密码
         * @param {String} verify_code 手机验证码
         * @param {String} ticket 图形验证码
         * @return {Number} code 错误码（0-成功 106001-短信验证码不正确 101004-手机号已注册 106002-需要图形验证码 106003-图形验证码不正确）
         * @return {String} message 提示消息
         */
        ajax.post('/v2/user/register', {
          phone: $data.phone.model,
          verify_code: $data.sms.model,
          password: $data.password.model,
          ticket: $data.imgCode.ticket,
        }).then(function (xhr, res) {
          if (res.code == 0) {
            $data.status = 1
            var tmpId = $data.ttid || $data.jrttids[$data.channel]
            if (tmpId) {
              // 注册成功触发今日头条的统计
              try {
                _taq.push({
                  convert_id: tmpId,
                  //convert_id:   $data.jrttids[$data.channel] || 0,
                  event_type: "form"
                })
              } catch (err) {
                console.log(err)
              }
            }
          }
          else if (res.code == 106002 || res.code == 106003) showImgCode()
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
      // 埋点
      emit() {
        ajax.post('/v2/user/report-invite', {
          phone: $data.phone.model
        })
      }
    },
    components: {
      DIcp: DIcp,
      DProtocol: DProtocol
    },
    destroyed() {
      $data.imgCode.ticket = ''
      if (typeof capDestroy === 'function') {
        capDestroy()
      }
    }
  }

</script>
<style lang="scss">
  @import "../../../sass/_globals.scss";
  .active-promotion-page5 {
    /*banner*/
    .banner {
      width: 100%;
    }
    /*链接按钮*/
    a.btn {
      width: auto;
    }
    /*提交表单*/
    .form {
      padding: px2rem(30) px2rem(30) px2rem(15);
    }
    /*表单输入框和按钮的高度*/
    $btn-input-height: px2rem(50);
    /*输入框*/
    .input-wrap {
      display: inline-block;
      background: #FFF;
      margin-bottom: px2rem(8);
      padding: 0 px2rem(18);
      width: 100%;
      height: $btn-input-height;
      line-height: $btn-input-height;
      border: 1px solid #B7B7B7;
      border-radius: px2rem(6);
      box-sizing: border-box;
    }
    /*输入框*/
    input {
      width: 100%;
    }
    /*短信验证码*/
    .sms-input {
      width: 65%;
    }
    .sms-btn {
      width: 30%;
      height: $btn-input-height;
      border-radius: px2rem(6);
    }
    /*错误提示*/
    .err-hint {
      margin: px2rem(4) 0 px2rem(30) 0;
    }
    /*协议链接*/
    .protocol-link {
      margin-top: px2rem(14);
      >* {
        vertical-align: middle;
      }
    }
    /*公司信息*/
    .company-info {
      /*color: #B6B6B6;*/
      margin-bottom: px2rem(-25);
    }
    /*是否协议选择按钮*/
    .agree {
      display: inline-block;
      padding: px2rem(5);
      border: 1px solid #979979;
      border-radius: px2rem(18);
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
      background: #66C856;
    }
    /*注册成功容器*/
    .success-wrap {
      padding: px2rem(30);
    }
    /*注册成功提示*/
    .success-hint {
      display: inline-block;
      background: #F9EAEA;
      margin: 0 auto;
      padding: px2rem(7.5) px2rem(25);
      border-radius: 50px;
      color: #FF6262;
    }
    /*注册成功图标*/
    .success-icon {
      background: url("../../../assets/active/promotion/success-icon.png") no-repeat 50%;
      background-size: px2rem(203) 100%;
      height: px2rem(155);
      margin: px2rem(35) 0;
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
    /**
     * 页脚 icp 文案适配
     */
    .d-icp {
      /*color: #DBDBDB;*/
      position: relative;
    }
  }

  .footerarea {
    display: none !important;
  }
</style>