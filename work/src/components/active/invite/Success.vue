<!--
  -- 邀请好友活动 - 注册成功
  -- @author bigfact
  -->
<template>
  <section class="active-invite-success tac c-white">
    <div class="content">
      <!--标题-->
      <div class="title fs28">恭喜您</div>
      <!--优惠券-->
      <div class="coupon fs30"><img src="../../../assets/active/invite/share-coupon-2.png" alt="" /></div>
      <!--提示信息-->
      <div class="hint">已放进您的账户，下载App马上使用，7天内有效</div>
      <!--下载按钮-->
      <div class="btn-wrap fs20">
        <div class="sure-btn">
          <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn">马上领钱</a>
        </div>
      </div>
    </div>
    <!--页脚公司信息文案-->
    <!--<div class="foot-icp tac">-->
      <!--<p>沪ICP备16041593号</p>-->
      <!--<p>墨讯信息科技（上海）有限公司</p>-->
    <!--</div>-->
  </section>
</template>
<style lang="scss">
  @import '../../../sass/_globals.scss';
  .active-invite-success {
    padding: px2rem(100) px2rem(24) px2rem(16);
    .content {
      background-color: rgba(98, 21, 177, 0.54);
    }
    background: url(../../../assets/active/invite/success-bg-0.png) no-repeat center top;
    background-size: 100% auto;
    box-sizing: border-box;
    min-height: 100%;
    /*标题*/
    .title {
      color: #fff;
      padding-top: px2rem(28);
    }
    /*优惠券*/
    .coupon {
      margin-top: px2rem(23);
      text-align: center;
      img {
        width: 90%;
      }
    }
    /*提示信息*/
    .hint {
      padding: px2rem(12) 0;
      width: 90%;
      margin: 0 auto;
    }
    /*下载按钮*/
    .btn-wrap {
      padding: px2rem(30) 7%;
    }
    .sure-btn {
      padding-bottom: px2rem(4);
      border-radius: px2rem(3);
      background-color: rgba(201,140,23,.5);
      a.btn {
        color: #e70b7a;
        border-radius: px2rem(3);
        background-color: rgb(255,184,48);
        width: auto;
      }
    }
    /*页脚公司信息文案*/
    .foot-icp {
      color: #C194FF;
      max-width: $html_max_width;
      width: 100%;
      padding-top: px2rem(36);
    }
  }
</style>
