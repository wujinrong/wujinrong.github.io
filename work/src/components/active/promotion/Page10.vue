<!--
  -- 推广落地页
  —- @author fangyunlong
  -- @date 2017.05.27
  -->
<template>
  <section class="active-promotion4">
    <!--banner-->
    <div>
      <img class="banner" src="../../../assets/active/promotion/page10_banner.png"></img>
    </div>
    <!--数据提交表单-->
    <div class="form fs16" v-if="status != 1">
      <!-- 顶部三个标签 -->
      <div class="topIcon">
        <div><img src="../../../assets/active/promotion/topIcon1.png" alt=""></div>
        <div><img src="../../../assets/active/promotion/topIcon2.png" alt=""></div>
        <div><img src="../../../assets/active/promotion/topIcon3.png" alt=""></div>
      </div>
      <!--手机号码-->
      <div>
        <div class="input-wrap flagWrap">
          <input name="phone" type="tel" v-model="phone.model" placeholder="请输入您的手机号码" maxlength="11">
        </div>
      </div>
      <!--短信验证码-->
      <div class="clearfix">
        <div class="sms-input input-wrap fl myBtn1">
          <input name="sms" type="text" v-model="sms.model" placeholder="请输入短信验证码">
          <button class="sms-btn btn fr myBtn" :class="sms.timeall != sms.timenow && 'disabled'" @click="getSms()">{{ sms.btn }}</button>
        </div>
      </div>
      <!--登录密码-->
      <!-- <div>
        <div class="input-wrap">
          <input name="password" type="password" v-model="password.model" placeholder="设置登录密码（6-16位数字或字母）" maxlength="16">
        </div>
      </div> -->
      <!--错误提示-->
      <div class="err-hint tac c-">{{ err }}</div>
      <!--协议-->
      <div class="protocol-link tac fs14">
        <i class="agree" :class="agree && 'active'" @click="switchAgree(agree)"></i>
        <span>我已阅读并同意</span>
        <a class="c-link" @click="showProtocolPop()">《贷上钱服务协议》</a>
      </div>
      <!--提交按钮-->
      <div>
        <d-button v-bind:button.sync="submit" :class="!agree && 'disabled'"></d-button>
      </div>
    </div>
    <!--注册成功提示-->
    <div class="tac success-wrap" v-if="status == 1">
      <p class="success-hint fs20">恭喜您，注册成功</p>
      <p class="success-icon"></p>
      <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn" @click="emit()">马上领钱</a>
    </div>
    <!-- 活动规则 -->
    <div @click="showbox" class="rules tac c-white">
      活动规则
      <img src="../../../assets/active/promotion/jiantou.png" alt="">
    </div>
    <div v-show="isopen" class="rulesBox tal">
      <p>活动时间：以贷上钱官方APP时间为准；</p>
      <p>参与对象：首次借款并审核未通过的用户；</p>
      <p>活动奖励：随机现金红包，最高200元（可提现）；</p>
      <p>活动说明：每日按照审核未通过的前1W名用户限量发放。</p>
    </div>
    <p class="tac p1 fs12">本活动最终解释权归贷上钱所有</p>
    <!--公司信息-->
    <div class="company-info tac fs12 ">
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
    <footer class="tac">
      <img src="../../../assets/active/promotion/smallicon4.png" alt="">
      <span class="fs18 c-white">小额贷款专家</span>
    </footer>
    <d-protocol v-show="popFlag" @close-pop="protocolPop"></d-protocol>
    <!--图形验证码-->
    <div v-show="imgCode.show">
      <div id="img-code-wrap"></div>
    </div>
  </section>
</template>
<script>
import DButton from '../../directives/DButton.vue'
import DIcp from '../../common/DICP.vue'
import DProtocol from '../../common/DProtocol.vue'
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
    btn: '获取验证码',
    timeall: 60,
    timenow: 60,
  },
  // 密码
  // password: {
  //   model: '',
  //   reg: regexp.password,
  //   err: '请输入6-16位数字或字母的密码'
  // },
  // 提交按钮
  submit: {
    name: '立即借钱',
    class: 'btn',
    click: '',
  },
  // 0 注册 1 注册成功 2 用户已存在
  status: 0,
  // 错误提示
  err: '',
  // 是否同意协议
  agree: true,
  isopen: false
}
export default {
  data() {
      // 按钮点击函数初始化
      $data.submit.click = this.submitClick

      // // testdata
      // $data.status = 1

      // 返回数据
      return $data
    },
    ready() {
      // 初始化图形验证码组件（https://www.qcloud.com/document/product/295/6616）
      // this.initImgCode()
    },
    methods: {
      // 显示活动规则
      showbox() {
        $data.isopen = !$data.isopen
      },
      // 显示用户协议弹出层
      showProtocolPop() {
        $data.popFlag = true
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
        } else {
          $data.err = item.err
          try {
            document.querySelector('[name="' + key + '"]').focus()
          } catch (err) {}
          return false
        }
      },
      // 初始化图片验证码组件
      initImgCode() {
        // 图片验证码组件配置
        var capOption = {
            // 回调函数：验证码页面关闭时回调
            callback: function(retJson) {
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
        ajax.get('/v3/action/captcha')
          .then(function(xhr, res) {
            if (res.code != 0) return
            var tmp = document.createElement('script')
            tmp.src = res.data.url
            document.body.appendChild(tmp)
            tmp.onload = function() {
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
        }).then(function(xhr, res) {
          if (res.code == 0) {
            layer.tip("验证码已发送，请耐心等待")
            var tid = setInterval(function() {
              if (--$data.sms.timenow) $data.sms.btn = $data.sms.timenow + ' s'
              else {
                $data.sms.btn = $data.sms.btntitle
                $data.sms.timenow = $data.sms.timeall
                clearInterval(tid)
              }
            }, 1000)
          } else {
            if (res.code == 106002 || res.code == 106003) showImgCode()
            else if (res.code == 101004) $data.status = 2
            else layer.tip(res.message)
            $data.sms.btn = $data.sms.btntitle
            $data.sms.timenow = $data.sms.timeall
          }
        }).catch(function(err, xhr) {
          $data.sms.btn = $data.sms.btntitle
          $data.sms.timenow = $data.sms.timeall
          layer.warning('出错啦，请稍后尝试 - ' + xhr.status)
        }).complete(function() {
          $data.imgCode.ticket = ''
        })
      },
      // 提交表单
      submitClick() {
        // 检查表单状态
        if (!$data.agree) return
        if (!this.check('phone')) return
        if (!this.check('sms')) return
          // if (!this.check('password')) return
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
        ajax.post('/v3/user/register', {
          phone: $data.phone.model,
          verify_code: $data.sms.model,
          // password: $data.password.model,
          ticket: $data.imgCode.ticket,
        }).then(function(xhr, res) {
          if (res.code == 0) $data.status = 1
          else if (res.code == 106002 || res.code == 106003) showImgCode()
          else if (res.code == 101004) $data.status = 2
          else layer.tip(res.message)
        }).complete(function() {
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
        ajax.post('/v3/user/report-invite', {
          phone: $data.phone.model
        })
      }
    },
    components: {
      DButton: DButton,
      DIcp: DIcp,
      DProtocol: DProtocol,
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
.layermbox0 {
  .layermchild {
    color: #ff9c00;
    border: 1px solid #ff9c00;
  }
  .layermbtn {
    border-top: none;
    &::before {
      display: none;
    }
    span:first-child {
      background: none;
      border: none;
    }
  }
}

.active-promotion4 {
  // background: #ff3232 url('../../../assets/active/promotion/page1.png') no-repeat center top;
  background-size: 100% auto;
  /*banner*/
  .banner {
    width: 100%;
  }
  /*链接按钮*/
  a.btn {
    background: -webkit-linear-gradient(left, #73E9FF, #956BE7);
    width: auto;
  }
  button.btn {
    background: -webkit-linear-gradient(left, #73E9FF, #956BE7);
  }
  button.disabled {
    background: #DBDBDB;
    box-shadow: none;
  }
  .c-main {
    color: #fff;
  }
  /*提交表单*/
  .form {
    width: 90%;
    margin: 0 auto;
    position: relative;
    background-color: rgba(255, 255, 255, 0.7);
    margin-top: -40%;
    border: 2px solid #7189E7;
    border-radius: px2rem(6);
    padding: px2rem(10) px2rem(5) px2rem(15) px2rem(5);
    .topIcon {
      width: 100%;
      height: 33.333%;
      margin-bottom: px2rem(15);
      display: flex;
      div {
        flex: 1;
        text-align: center;
        img {
          width: 60%;
        }
      }
    }
  }
  .rules {
    width: 33.333%;
    height: px2rem(26);
    margin-left: 50%;
    -webkit-transform: translateX(-50%);
    margin-top: 5%;
    border-radius: px2rem(13);
    background: -webkit-linear-gradient(left, #73E9FF, #956BE7);
    line-height: px2rem(26);
    position: relative;
    img {
      width: px2rem(12);
      height: px2rem(12);
      position: absolute;
      right: 15%;
      top: 25%;
    }
  }
  .rulesBox {
    width: 94%;
    box-sizing: border-box;
    padding: px2rem(15) px2rem(5) px2rem(20) px2rem(5);
    border: 2px solid #7189E7;
    border-radius: px2rem(4);
    margin: 0 auto;
    line-height: px2rem(20);
    font-size: 12px;
    color: #585EB7;
    margin-top: px2rem(15);
  }
  .p1 {
    margin-top: px2rem(15);
    color: #585EB7;
  }
  .p2 {
    color: #585EB7;
  }
  .d-icp {
    // padding-top: 0 !important;
    color: #585EB7 !important;
  }
  footer {
    width: 100%;
    height: px2rem(60);
    background: -webkit-linear-gradient(left, #73E9FF, #956BE7);
    line-height: px2rem(60);
    img {
      width: px2rem(90);
      vertical-align: middle;
    }
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
    height: px2rem(44);
    line-height: px2rem(44);
    border: 1px solid #7189E7;
    border-radius: px2rem(3);
    box-sizing: border-box;
  }
  .myBtn {
    background: none !important;
    box-shadow: none !important;
    // border: 1px solid #7189E7;
    border-left-color: transparent;
    // border-radius: px2rem(3) !important;
    height: px2rem(44) !important;
    width: 35% !important;
    color: #4A90E2;
    font-weight: 200;
  }
  .myBtn1 {
    padding: 0 0 0 px2rem(18) !important;
    position: relative;
    &::after {
      position: absolute;
      right: 37%;
      top: 25%;
      content: '';
      width: 1px;
      height: 50%;
      background-color: #4A90E2;
    }
  }
  .flagWrap {
    margin-top: px2rem(-25) !important;
  }
  /*输入框*/
  input {
    width: 50%;
    &::-webkit-input-placeholder {
      color: #c9c9c9;
    }
    &::-moz-placeholder {
      color: #c9c9c9;
    }
  }
  /*短信验证码*/
  .sms-input {
    width: 100%;
  }
  .sms-btn {
    width: 30%;
    height: $btn-input-height;
    border-radius: px2rem(6);
  }
  /*错误提示*/
  .err-hint {
    margin: px2rem(4) 0 px2rem(40) 0;
  }
  /*协议链接*/
  .protocol-link {
    color: rgb(136, 136, 136);
    margin-top: px2rem(-30);
    margin-bottom: px2rem(8);
    >* {
      vertical-align: middle;
    }
  }
  /*公司信息*/
  .company-info {
    margin-top: px2rem(10);
    color: #585EB7;
    margin-bottom: px2rem(-25);
  }
  /*是否协议选择按钮*/
  .agree {
    display: inline-block;
    padding: px2rem(5);
    border: 1px solid #956BE7;
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
    background: #956BE7;
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
    color: #c11f1f;
    position: relative;
  }
}

.footerarea {
  display: none !important;
}

</style>

