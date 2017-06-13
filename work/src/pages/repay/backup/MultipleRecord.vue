<!--
  -- 多期贷账单详情
  -- @author bigfact
  -->
<template>
  <section class="repay-multiple-record fs18">
    <!--头部信息-->
    <div class="header tac">
      <p class="fs40 c-main">1300.00元</p>
      <p class="c-gray">3月1日应还款</p>
    </div>
    <!--状态-->
    <div class="status bg-white">
      <span>状态</span>
      <span class="fr c-value">待还款</span>
    </div>
    <!--信息-->
    <div class="info-wrap bg-white">
      <div class="title row fs14 c-value">第二期</div>
      <div class="field">
        <span>本金</span>
        <span class="fr c-value">1000元</span>
      </div>
      <div class="field">
        <span>服务费</span>
        <span class="fr c-value">1000元</span>
      </div>
      <div class="field">
        <span>逾期费</span>
        <span class="fr c-value">1000元</span>
      </div>
      <div class="field">
        <span>实际还款时间</span>
        <span class="fr c-value">1000元</span>
      </div>
    </div>
    <!--还款按钮-->
    <div class="btn-wrap">
      <button class="btn">
        <span class="fs20">立即还款</span>
      </button>
    </div>
  </section>
</template>
<script>
  var $data = {
    id: 0,
  }
  export default {
    data() {
      var _this = this
      $data.id = _this.$route.query.id || 0
      // // 获取数据
      // ajax.get('/v2/plan/repayment').then(function (xhr, res) {
      //   if (res.code == 0) {
      //   }
      //   else {
      //     layer.warning(res.message)
      //   }
      // })
      return $data
    },
    methods: {},
  }
</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay-multiple-record {
    .header {
      padding: px2rem(35) 0;
    }
    .status {
      border-top: 1px solid #ECECEC;
      border-bottom: 1px solid #ECECEC;
      margin-bottom: px2rem(7);
      padding: px2rem(20) px2rem(15);
    }
    .info-wrap {
      border-top: 1px solid #ECECEC;
      border-bottom: 1px solid #ECECEC;
    }
    .title {
      padding: px2rem(10) px2rem(16);
    }
    .field {
      padding: px2rem(30) px2rem(18) 0;
      &:last-of-type {
        padding: px2rem(30) px2rem(18);
      }
    }
    .btn-wrap {
      padding-top: px2rem(40);
    }
  }
</style>