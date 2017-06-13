<!--
  -- 贷上钱 app banner 活动 - 拒就赔
  -- @author bigfact
  -- @date 20170420
  -->
<template>
  <section class="active-jujiupei fs15">
    <!--banner-->
    <img src="../../../assets/active/jujiupei/banner.png" alt="" class="banner">
    <!--活动规则-->
    <div class="content-wrap">
      <div class="title fs18">活动规则</div>
      <div class="content">
        <p>1、活动时间：2017.4.18—2017.4.30</p>
        <p>2、参与对象：活动期间，首次借款并审核未通过的用户</p>
        <p>3、活动奖励：随机现金红包，最高200元（可提现）</p>
        <p>4、活动说明：</p>
        <p class="ti">活动期间，首次借款的用户，资料属实且审核未通过，即可领取红包，每日限量前10000名用户</p>
        <p>5、领取步骤：</p>
        <p class="dot">等待“贷上钱”APP领取红包的通知（审核时间后24h内发出）</p>
        <p class="dot">关注“贷上钱服务号”</p>
        <p class="dot">在服务号首页输入栏中输入兑换码，根据提示操作即可领取红包</p>
      </div>
    </div>
    <!--温馨提示-->
    <div class="content-wrap hint">
      <div class="title fs18">温馨提示</div>
      <div class="content">
        <p>1、如果各位小伙伴填写虚假资料导致审核失败，贷小妹是有权取消红包领取资格的哦~</p>
        <p>2、必须在收到红包领取通知后，才可以领取红包！</p>
        <p>3、红包领取有效期为收到通知后的24小时内。</p>
      </div>
    </div>
    <!--页脚-->
    <div class="foot-wrap tac c-white">
      <p><img src="../../../../static/img/app/index/qrcode.png" alt="" class="qrcode"></p>
      <p><img src="../../../assets/active/jujiupei/people.png" alt="" class="people"></p>
      <p class="fs16">（扫码关注公众号，立即领钱）</p>
      <p class="fs12">本活动最终解释权归贷上钱所有</p>
    </div>
  </section>
</template>
<style lang="scss">
  @import '../../../sass/_globals';
  .active-jujiupei {
    background: #ffbf26;
    /*banner*/
    .banner {
      display: block;
      width: 100%;
    }
    /*内容框*/
    .content-wrap {
      background: #fff373;
      border: px2rem(3) solid #ff5b0a;
      line-height: px2rem(24);
      margin: 0 px2rem(10);
      padding: px2rem(20) px2rem(15);
      position: relative;
      text-align: justify;
    }
    /*标题*/
    .title {
      background: url(../../../assets/active/jujiupei/title-bg.png) no-repeat center;
      background-size: contain;
      color: #fff;
      height: px2rem(40);
      line-height: px2rem(40);
      position: absolute;
      top: px2rem(-20);
      left: 0;
      text-align: center;
      width: 100%;
    }
    /*内容*/
    .content {
      color: #9e4700;
    }
    /*温馨提示*/
    .hint {
      margin-top: px2rem(30);
    }
    /*缩进*/
    .ti {
      padding-left: px2rem(15)
    }
    /*点*/
    .dot {
      padding-left: px2rem(15);
      position: relative;
      $size: px2rem(6);
      &::after {
        content: "";
        display: block;
        height: $size;
        width: $size;
        border-radius: $size;
        position: absolute;
        top: px2rem(8);
        left: px2rem(2);
        background: #ff5b0a;
      }
    }
    /*页脚*/
    .foot-wrap {
      background: url(../../../assets/active/jujiupei/foot-bg.png) no-repeat center px2rem(60);
      background-size: cover;
      position: relative;
      padding: px2rem(18) 0;
    }
    /*二维码*/
    .qrcode {
      width: px2rem(80);
      position: relative;
      left: px2rem(-4);
    }
    /*人物*/
    .people {
      width: px2rem(180);
      margin-bottom: px2rem(6);
    }
  }
</style>