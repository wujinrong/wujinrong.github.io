<!--
  -- 申请延期
  -- @author bigfact
  -- @date 20170510
  -->
<template>
  <section class="repay-delay">
    <!--顶部申请信息-->
    <div class="top-info fs15">
      <div class="top-info-row row">
        <div class="clearfix">
          <div class="cell cell-left">
            <p>{{ finish_time }}</p>
            <p>合约还款日</p>
          </div>
          <div class="cell cell-right">
            <p>{{ apply_amount }}</p>
            <p>应还金额</p>
          </div>
        </div>
      </div>
      <div class="top-info-row">
        <div class="clearfix">
          <div class="cell cell-left">
            <p>{{ deferment_time }}</p>
            <p class="c-main">延期合约还款日</p>
          </div>
          <div class="cell cell-right">
            <p>{{ deferment_amount }}</p>
            <p class="c-main">延期应还金额</p>
          </div>
        </div>
      </div>
    </div>
    <!--其他信息列表-->
    <div class="middle-info bg-white fs18">
      <div class="middle-info-row row"><span>延期天数</span><span class="fr">{{ deferment_day }}</span></div>
      <div class="middle-info-row row"><span>服务费用</span><span class="fr">{{ charges_amount }}</span></div>
      <div class="middle-info-row row"><span>延期服务费用</span><span class="fr">{{ deferment_charges_amount }}</span></div>
    </div>
    <!--合同链接-->
    <div class="contract-tip tac c-placeholder" v-if="jump.target_url">
      <p>请仔细阅读本借据信息，点击立即申请</p>
      <p>表示你同意遵守<a href="{{ jump.target_url }}" class="c-main">{{ jump.message }}</a></p>
    </div>
    <!--提交按钮-->
    <div class="btn-wrap">
      <button class="btn fs15" v-submit="{cb: gotoCharge}">立即申请，并支付延期费用{{ deferment_pay_amount }}元</button>
    </div>
    <!--申请延期次数提示-->
    <div class="count-tip c-placeholder tac">{{ deferment_explain_desc }}</div>
  </section>
</template>

<script>
var $data = {
  applyid: '', // 申请产品唯一标识，从路由查询参数中获取
  // 接口返回数据
  apply_id: '', // 申请产品唯一标识
  finish_time: '***', // 合约还款日
  apply_amount: '***', // 应还金额
  deferment_time: '***', // 延期合约还款日
  deferment_amount: '***', // 延期应还金额
  deferment_day: '***', // 延期天数
  charges_amount: '***', // 服务费用
  deferment_charges_amount: '***', // 延期服务费用
  deferment_pay_amount: '', // 延期所需要支付的金额
  jump: { // 合同链接
    target_url: '', // 合同链接地址
    message: '', // 合同显示文字
  },
  deferment_explain_desc: '', // 延期申请次数
  code: '',
  message: '',
}

export default {
  data() {
    // 3000015
    $data.applyid = this.$route.query.applyid || ''

    /**
     * 获取数据
     * https://git.fond.io/b/paydayloan/wikis/v3/deferment-info
     */
    ajax.get('/v3/deferment/info').then(function(xhr, res) {

      // // testdata
      // res = {
      //   "code": 0,
      //   "message": "成功",
      //   "data": {
      //     "apply_id": 3000015,
      //     "finish_time": "1970-01-01",    //合约还款日
      //     "apply_amount": "2000.00元",  //应还金额
      //     "deferment_time": "1970-01-15",  //延期合约还款日
      //     "deferment_amount": "2000.00元",  //延期应还金额
      //     "deferment_day": 14,  //延期天数
      //     "charges_amount": "90.00元",  //服务费用
      //     "deferment_charges_amount": "20.00元",  //延期服务费用
      //     "deferment_pay_amount": "110.00元", //延期所需要支付的金额
      //     "deferment_contract_desc": {    //对应的页面说明
      //       "info": {
      //         "message": "请仔细阅读本借据信息，点击立即申请表示你同意遵守",
      //         "color": "#AEAEAE"
      //       },
      //       "jump": {
      //         "target_url": "http://www.baidu.com",    //合同的链接
      //         "message": "《XXXX合同》",
      //         "color": "#FF6262"
      //       }
      //     },
      //     "deferment_explain_desc": "可申请延期1次"
      //   }
      // }

      $data.code = res.code
      if ($data.code == 0) {
        $data.apply_id = res.data.apply_id
        $data.finish_time = res.data.finish_time
        $data.apply_amount = res.data.apply_amount
        $data.deferment_time = res.data.deferment_time
        $data.deferment_amount = res.data.deferment_amount
        $data.deferment_day = res.data.deferment_day
        $data.charges_amount = res.data.charges_amount
        $data.deferment_charges_amount = res.data.deferment_charges_amount
        $data.deferment_pay_amount = res.data.deferment_pay_amount
        $data.jump = res.data.deferment_contract_desc.jump || {}
        $data.deferment_explain_desc = res.data.deferment_explain_desc
      } else {
        $data.message = res.message
        layer.warning($data.message)
      }

    })
    return $data
  },
  methods: {
    /**
     * 跳转到充值
     */
    gotoCharge() {
      if ($data.code === '') return
      if ($data.code === 0) {
        this.$router.go('/repay/delaycharge?from=/repay/delay')
      } else {
        layer.warning($data.message)
      }
    }
  }
}

</script>

<style lang="scss">
@import '../../sass/_globals.scss';
.repay-delay {
  .top-info {
    padding: 0 px2rem(17);
  }
  .top-info-row {
    line-height: px2rem(32);
    padding: px2rem(10) 0;
  }
  .cell {
    box-sizing: border-box;
    float: left;
    width: 50%;
  }
  .cell-left {
    position: relative;
    &::after {
      content: "";
      border-right: 1px solid #d8d8d8;
      height: px2rem(42);
      margin: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
    }
  }
  .cell-right {
    text-align: right;
  }
  .middle-info-row {
    padding: px2rem(18);
  }
  .contract-tip {
    padding-top: px2rem(13);
  }
  .btn-wrap {
    padding: px2rem(60) px2rem(30) 0;
  }
  .count-tip {
    padding: px2rem(14) 0;
  }
}

</style>
