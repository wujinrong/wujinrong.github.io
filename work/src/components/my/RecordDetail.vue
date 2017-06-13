<!--
  -- 借款记录明细
  -- @author bigfact
  -->
<template>
  <section class="my-record-detail">
    <!--借款明细 - 单期贷-->
    <div class="bg-white fs15" v-if="type == 'single'">
      <div class="row field"><span class="fs18">状态</span><span class="fr" :class="status_list[status].class">{{ status_list[status].text }}</span></div>
      <div class="row field"><span class="fs18">申请时间</span><span class="fr">{{ apply_time }}</span></div>
      <div class="row field"><span class="fs18">借款金额</span><span class="fr">{{ apply_amount }}元</span></div>
      <div class="row field"><span class="fs18">借款天数</span><span class="fr">{{ period_desc }}</span></div>
      <div class="row field"><span class="fs18">服务费用</span><span class="fr">{{ fee_amount }}元</span></div>

      <div class="row field" v-if="isDelay"><span class="fs18">延期服务费用</span><span class="fr">{{ delay_fee }}</span></div>

      <div class="row field"><span class="fs18">优惠券减免</span><span class="fr">{{ coupon_amount }}元</span></div>

      <!-- 延期 -->
      <div v-if="!isDelay">
        <div class="row field"><span class="fs18">放款日期</span><span class="fr">{{ grant_time }}</span></div>
        <div class="row field"><span class="fs18">到账金额</span><span class="fr">{{ grant_amount }}元</span></div>
      </div>

      <div class="row field"><span class="fs18">合约还款日</span><span class="fr">{{ repay_time }}</span></div>
      <div class="row field"><span class="fs18">实际还款日</span><span class="fr">{{ finish_time }}</span></div>
      <div class="row field"><span class="fs18">应还金额</span><span class="fr" :class="overdue_flag && 'repay-amount'" @click="toggleRapayTip(true)">{{ repay_amount_desc }}</span></div>
    </div>
    <!--借款明细 - 分期贷-->
    <div class="bg-white fs15" v-if="type == 'multiple'">
      <div class="row field"><span class="fs18">状态</span><span class="fr" :class="status_list[status].class">{{ status_list[status].text }}</span></div>
      <div class="row field"><span class="fs18">申请时间</span><span class="fr">{{ apply_time }}</span></div>
      <div class="row field"><span class="fs18">申请金额</span><span class="fr">{{ apply_amount }}元</span></div>
      <div class="row field"><span class="fs18">放款日期</span><span class="fr">{{ grant_time }}</span></div>
      <div class="row field"><span class="fs18">批核金额</span><span class="fr">{{ credit_amount_desc }}</span></div>
      <div class="row field"><span class="fs18">借款期数</span><span class="fr">{{ period_desc }}</span></div>
      <div class="row field"><span class="fs18">结清日期</span><span class="fr">{{ finish_time }}</span></div>
    </div>
    <!--取消借款按钮-->
    <button class="btn bottom" v-if="!isDelay && status == 0 || status == 1 || status == 3" @click="cancel()">取消借款</button>
    <!--应还金额提示-->
    <div class="layermbox layermbox0" v-show="rapayTipShow">
      <div class="laymshade" @click="toggleRapayTip(false)"></div>
      <div class="layermmain">
        <div class="section">
          <div class="repay-tip-content bg-white">
            <div class="repay-tip">应还金额包含申请金额+逾期费用</div>
            <button class="btn repay-tip-btn" @click="toggleRapayTip(false)">我知道了</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    isDelay: false, // 是否延期
    delay_fee: 0, // 延期服务费
    apply_id: 0, // 申请记录唯一标识
    apply_time: '', // 申请时间
    apply_amount: '', // 借款金额
    period_desc: '', // 借款期数/天数
    grant_time: '', // 放款时间
    credit_amount_desc: '', // 批核金额描述，只有分期贷有该字段
    repay_time: '', // 合约还款时间
    finish_time: '', // 实际还款时间
    fee_amount: '', // 服务费
    coupon_amount: '', // 优惠券优惠金额
    grant_amount: '', // 放款金额
    status: 11, // 申请状态
    repay_amount_desc: '', // 应还金额，可能为 "-"
    overdue_flag: false, // 是否逾期
    type: '', // 产品类型
    status_list: [ // 申请状态枚举列表
      // 0
      {
        class: 'c-yellow',
        text: '未提交',
      },
      // 1
      {
        class: 'c-green',
        text: '审核中',
      },
      // 2
      {
        class: 'c-red',
        text: '审核拒绝',
      },
      // 3
      {
        class: 'c-yellow',
        text: '待签约',
      },
      // 4
      {
        class: 'c-yellow',
        text: '待还款',
      },
      // 5
      {
        class: 'c-gray',
        text: '已还清',
      },
      // 6
      {
        class: 'c-green',
        text: '放款中'
      },
      // 7
      {
        class: 'c-red',
        text: '已逾期'
      },
      // 8
      {
        class: 'c-yellow',
        text: '还款中'
      },
      // 9
      {
        class: 'c-red',
        text: '放款失败'
      },
      // 10
      {
        class: 'c-light',
        text: '已取消'
      },
      // 11
      {
        class: 'c-green',
        text: '确认申请'
      }
    ],
    rapayTipShow: false // 是否显示应还金额提示
  }
  export default {
    data() {
      $data.apply_id = this.$route.query.id
      $data.type = this.$route.query.type
      /**
       * 获取数据
       * http://git.fond.io/b/paydayloan/wikis/apply-detail-v2
       */
      ajax.get('/v3/record/apply-detail', {
        apply_id: $data.apply_id
      }).then(function (xhr, res) {
        if (res.code == 0) {
          $data.apply_time = res.data.apply_time
          $data.apply_amount = res.data.apply_amount || ''
          $data.period_desc = res.data.period_desc || ''
          $data.grant_time = res.data.grant_time
          $data.credit_amount_desc = res.data.credit_amount_desc
          $data.repay_time = res.data.repay_time
          $data.finish_time = res.data.finish_time
          $data.fee_amount = res.data.fee_amount
          $data.coupon_amount = res.data.coupon_amount
          $data.grant_amount = res.data.grant_amount
          $data.status = res.data.status
          $data.repay_amount_desc = res.data.repay_amount_desc
          $data.overdue_flag = res.data.overdue_flag

          // 延期字段
          $data.isDelay = res.data.contract_type === 'delay'
          $data.delay_fee = res.data.delay_fee

        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      /**
       * 取消借款方法
       */
      cancel() {
        var lid = layer.message('<br>确定要取消该笔申请吗？', {
          title: '',
          yes: function () {
            layer.close(lid)
            var loading = layer.loading(false)
            ajax.post('/v3/record/apply-cancel', {
              apply_id: $data.apply_id
            }).then(function (xhr, res) {
              if (res.code == 0) {
                history.back()
              } else {
                layer.warning(res.message)
              }
            }).complete(function () {
              layer.close(loading)
            })
          }
        })
      },
      /**
       * 切换显示应还金额提示
       * @param {Boolean} show 是否显示提示
       */
      toggleRapayTip(show) {
        if (!$data.overdue_flag) return
        $data.rapayTipShow = show
      }
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-record-detail {
    box-sizing: border-box;
    min-height: 100%;
    margin-top: px2rem(7.5);
    padding-bottom: px2rem(60);
    /*明细字段*/
    .field {
      line-height: px2rem(24);
      padding: px2rem(17.5) px2rem(16);
    }
    /*应还金额*/
    .repay-amount {
      background: url(../../assets/my/info.png) no-repeat 100% center;
      background-size: px2rem(15);
      display: inline-block;
      padding-right: px2rem(20);
    }
    /*应还金额提示*/
    .repay-tip-content {
      border-radius: 6px;
      box-sizing: border-box;
      margin: 0 auto;
      padding: px2rem(51) px2rem(40) px2rem(31);
      width: 80%;
    }
    .repay-tip {
      padding-bottom: px2rem(40);
    }
    .repay-tip-btn {
      width: 80%;
    }
  }
</style>