<!--
  -- 邀请好友活动，说明页面，app 中使用
  -- @author bigfact
  -->
<template>
  <section class="active-invite-specification c-white fs15">
    <!--banner-->
    <img class="banner" src="../../../assets/active/invite/share-banner-0.png" alt="">
    <!--内容-->
    <div class="content taj">
      <!--邀请步骤-->
      <div class="step">
        <div class="step-1">第一步，给好友发送邀请链接。</div>
      </div>
      <div class="step">
        <div class="step-2">第二步，好友在您分享的链接上注册成功，获得20元优惠券。</div>
      </div>
      <div class="step">
        <div class="step-3">第三步，好友完善资料并成功借款，您获得一张50元优惠券。</div>
      </div>
      <!--活动奖励说明-->
      <div class="note-title tac">活动奖励说明</div>
      <div class="note">
        <p>1. 活动期间，每邀请一位好友，被邀请人完成注册后可获得20元优惠券一张；被邀请人完成借款后，邀请人获得50元优惠券一张，优惠券有效期为30天；</p>
        <p>2. 优惠券使用规则：</p>
        <p>2.1 每张优惠券可以抵扣等同金额的服务费用，不能抵扣本金和滞纳金；</p>
        <p>2.2 每次每个借款项目最多可以使用一张优惠券；</p>
        <p>2.3 优惠券在有效期内才可以使用，借款时点击使用优惠券即可；</p>
        <p>2.4 每个用户每月最高可使用4张优惠券，获得数量无上限；</p>
        <p>2.5 优惠券不找零，不可提现或者转让，具体使用规则明细请参考优惠券使用说明页；</p>
        <p>2.6 此活动仅限单期贷借款适用。</p>
      </div>
      <!--本活动与苹果公司无关-->
      <div class="apple-relief tac fs12" v-if="isIos">本活动与苹果公司无关</div>
    </div>
  </section>
</template>
<script>
  export default {
    data() {
      return {
        isIos: sysinfo.isIOS,     // 是否在 IOS 中
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .active-invite-specification {
    background: url(../../../assets/active/invite/share-bg-color.png) repeat-y;
    background-size: contain;
    padding-bottom: px2rem(30);
    /*banner*/
    .banner {
      display: block;
      min-height: px2rem(200);
      width: 100%;
    }
    /*内容*/
    .content {
      padding: 0 px2rem(37.5);
    }
    /*邀请步骤*/
    .step {
      background: linear-gradient(to bottom,  #B074FF 0%,#9547FF 100%);
      box-shadow: 0px 0px px2rem(10) #7B2DEC;
      border-radius: px2rem(10);
      margin-bottom: px2rem(12);
      > div {
        padding: px2rem(15) px2rem(13.5) px2rem(15) px2rem(53);
      }
    }
    /*邀请步骤一*/
    .step-1 {
      background: url("../../../assets/active/invite/specification-step-1.png") no-repeat px2rem(15) center;
      background-size: px2rem(30);
    }
    /*邀请步骤二*/
    .step-2 {
      background: url("../../../assets/active/invite/specification-step-2.png") no-repeat px2rem(15) center;
      background-size: px2rem(30);
    }
    /*邀请步骤三*/
    .step-3 {
      background: url("../../../assets/active/invite/specification-step-3.png") no-repeat px2rem(15) center;
      background-size: px2rem(30);
    }
    /*活动说明标题*/
    .note-title {
      box-shadow: 0px 0px px2rem(60) #5401CF inset;
      border-radius: px2rem(40);
      color: #FFC800;
      margin: px2rem(33.5) auto px2rem(20);
      height: px2rem(40);
      line-height: px2rem(40);
      width: 95%;
    }
    /*活动说明*/
    .note {
      background: #B074FF;
      border-radius: px2rem(15);
      line-height: px2rem(24);
      padding: px2rem(18) px2rem(25);
    }
    /*苹果免责声明*/
    .apple-relief {
      padding-top: px2rem(20);
    }
  }
</style>