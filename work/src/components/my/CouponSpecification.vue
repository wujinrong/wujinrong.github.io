<!--
  -- 优惠券使用说明
  -- @author bigfact
  -->
<template>
  <section class="my-coupon-specification container">
    <div class="row">
      <h2>优惠券使用规则：</h2>
      <p>1、用户在申请借款时可使用优惠券，其他状态下不可使用；</p>
      <p>2、每笔借款只可使用1张优惠券，不可叠加使用；</p>
      <p>3、优惠券不找零，不可提现或转让；</p>
      <p>4、优惠券会标明有效期，仅可在有效期内使用，过期作废；</p>
    </div>
    <div class="row">
      <h2>如何获取优惠券：</h2>
      <p>1、参与贷上钱活动，您将有机会获得优惠券；</p>
      <p>2、邀请好友使用贷上钱，当好友借款成功后，您和好友均会获得1张优惠券；</p>
      <p>3、贷上钱会根据借款金额、借款频率、还款信用等为您发放面值不等的优惠券；</p>
    </div>
    <div class="row">
      <h3>温馨提示：</h3>
      <p>
        <span>若您在使用优惠券的过程中有任何疑问或需要帮助，请及时联系贷上钱客服</span>
        <span class="c-main">400-136-5799，或微信公众号：搜索dsqmxkj（贷上钱服务号）</span>
        <span>。</span>
      </p>
    </div>
  </section>
</template>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-coupon-specification {
    .row {
      padding: px2rem(20);
      &:last-of-type::after {
        border: none;
      }
    }
    h2 {
      font-size: px2rem(18);
      margin-bottom: px2rem(10);
    }
    p, h3 {
      font-size: px2rem(15);
      color: #747474;
    }
  }
</style>