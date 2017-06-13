<!--
  -- 贷上钱 分期贷详情页
  -- @author fangyunlong
  -- @date 20170518
  -->
<template>
  <section class="multiple-details">
    <div class="topbox">
      <p class="tac c-red">{{info.repay_amount_desc}}</p>
      <p class="tac c-gray">{{info.repay_date_desc}}</p>
    </div>
    <div class="statusBox clearfix">
      <span class="fl fs16">状态</span>
      <span class="fr fs16">{{info.status_desc}}</span>
    </div>
    <div class="periodBox tal fs14 c-gray">
      {{info.period_desc}}
    </div>
    <ul class="detailBox">
      <li class="clearfix">
        <span class="fl fs16">本金</span>
        <span v-if="info.detail" class="fr c-gray fs16">{{info.detail[0].value}}</span>
      </li>
      <li class="clearfix">
        <span class="fl fs16">服务费</span>
        <span v-if="info.detail" class="fr c-gray fs16">{{info.detail[1].value}}</span>
      </li>
      <li v-if="info.deleteCash" class="clearfix">
        <span class="fl fs16">逾期费</span>
        <span v-if="info.detail" class="fr c-gray fs16">{{info.detail[2].value}}</span>
      </li>
      <li class="clearfix">
        <span class="fl fs16">实际还款时间</span>
        <span v-if="info.detail" class="fr c-gray fs16">{{info.detail[info.detail.length-1].value}}</span>
      </li>
    </ul>
    <div class="btn-wrap">
      <a class="btn tac" v-link="'/repay/charge?arr='+[info.period]">立即还款</a>
    </div>
  </section>
</template>

<script>
var $data = {
  info: {}
}
export default {
  data() {
    var period = this.$route.query.period
    var _this = this
    ajax.get('/v3/repay/plan-new')
      .then(function(xhr, res) {
        if (res.code == 0) {
          if (res.data) {
            for (var i = 0; i < res.data.multiple.plans.length; i++) {
              if (res.data.multiple.plans[i].period == period) $data.info = res.data.multiple.plans[i]
            }
          }
          if ($data.info.repay_overdue_content) {
            $data.info.deleteCash = +$data.info.repay_overdue_content.replace(/[^0-9]/ig, "")
          }
        } else if (res.code == 101003) sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : _this.$router.replace('/user/login?ref=' + _this.$route.path)
        else {
          layer.warning(res.message)
        }
      })
    return $data
  }
}

</script>

<style lang="scss">
@import '../../sass/_globals.scss';
.multiple-details {
  width: 100%;
  background-color: #F8F8F8;
  .topbox {
    width: 100%;
    height: px2rem(157);
    overflow: hidden;
    p:nth-child(1) {
      font-size: px2rem(40);
      margin-top: px2rem(35);
    }
    p:nth-child(2) {
      font-size: px2rem(15);
    }
  }
  .statusBox {
    height: px2rem(60);
    background-color: white;
    line-height: px2rem(60);
    padding: 0 px2rem(16);
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    span:nth-child(1) {
      color: #383838;
    }
    span:nth-child(2) {
      color: #868686;
    }
  }
  .periodBox {
    height: px2rem(38);
    line-height: px2rem(38);
    padding: 0 px2rem(16);
  }
  .detailBox {
    border-top: 1px solid #DBDBDB;
    >li {
      height: px2rem(55);
      border-bottom: 1px solid #DBDBDB;
      padding: 0 px2rem(16);
      background-color: white;
      line-height: px2rem(55);
    }
  }
  .btn-wrap {
    padding: px2rem(50) px2rem(12) 0;
    a {
      width: auto;
    }
  }
}

</style>

