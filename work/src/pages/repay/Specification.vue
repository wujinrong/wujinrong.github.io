<!--
  -- 还款方式说明
  -- @author bigfact
  -->
<template>
  <section class="repay-specification">
    <div class="row line"></div>
    <div class="row">
      <h3>1. 在线自主还款</h3>
      <span class="recommend c-white">推荐优先选择</span>
      <p class="content">
        进入“我要还款”，点击立即还款选择确保有足够还款金额的银行卡或绑定新卡完成在线即时还款。
        <span class="c-red">（备注：还款时，共有3次机会，请仔细核实信息进行还款操作）</span>
      </p>
    </div>
    <div class="row line"></div>
    <div class="row">
      <h3>2. 自动扣款还款</h3>
      <p class="content">您在借款时验证的银行卡为您的代扣银行卡，确保还款日前卡内有足够的还款资金，还款日当天我们会自动扣款完成还款的。</p>
      <div class="tips-wrap">
        <span class="c-white tac">提示</span>
        <p>A. 若您选择让系统默认代扣方式还款，则需在还款日16:00之前确保代扣卡金额足以还款，否则因为余额不足导致代扣失败将产生逾期费用；</p>
        <p>B. 另在16:00自动代扣时因为代扣银行系统问题导致代扣失败将同样产生逾期费用。</p>
      </div>
    </div>
    <div class="row line"></div>
    <div class="row">
      <h3>3. 转账还款</h3>
      <div class="content">
        <p>支付宝还款：您也可以还款至：</p>
        <p>支付宝企业账户acc@qianshengqian.com</p>
        <p>企业名称：深圳市钱生钱互联网金融服务有限公司。</p>
        <p class="c-red">转账时请务必备注：姓名+贷上钱+注册号码</p>
        <p class="c-red">支付宝还款需要t+2个工作日处理完毕（t为还款日）</p>
        <p>完成转账后将转账凭证及姓名、注册手机号发至微信公众号：贷上钱服务号</p>
        <p class="c-red">使用此还款方式请提前1至2天还款，否则将会产生逾期费用。</p>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay-specification {
    h3 {
      font-size: px2rem(18);
    }
    .row {
      position: relative;
      background: #FFF;
      margin-bottom: px2rem(7);
      padding: px2rem(25) px2rem(20);
      &.line {
        padding: 0;
        margin: 0;
      }
    }
    .content {
      padding: px2rem(6) 0;
    }
    .recommend {
      position: absolute;
      right: 0;
      top: px2rem(12.5);
      width: px2rem(108);
      height: px2rem(26);
      line-height: px2rem(26);
      padding-left: px2rem(13);
      background: #FF6262;
      box-shadow: 8px 0px 10px 0px #FF6262;
      &:before {
        content: "";
        position: absolute;
        left: px2rem(-25);
        border-right: px2rem(13) solid #FF6262;
        border-left: px2rem(13) solid transparent;
        border-top: px2rem(13) solid #FF6262;
        border-bottom: px2rem(13) solid #FF6262;
        box-shadow: 8px 0px 10px 0px #FF6262;
      }
    }
    .tips-wrap {
      color: #AEAEAE;
      span {
        display: inline-block;
        position: relative;
        left: px2rem(-20);
        background: #FFB844;
        border-bottom-right-radius: px2rem(26);
        border-top-right-radius: px2rem(26);
        padding: px2rem(5) px2rem(20);
        margin: px2rem(7) 0;
      }
    }
  }
</style>