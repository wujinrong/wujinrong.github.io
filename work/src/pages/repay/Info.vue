<!--
  -- 还款信息（用于外链主动还款），使用 query string user_code 识别用户
  -- @author bigfact
  -->
<template>
  <section class="repay-info container fs15">
    <div v-if="flag == 1">
      <!--banner-->
      <div>
        <img class="banner" src="../../assets/repay/banner.png" alt="">
      </div>
      <!--还款信息-->
      <div class="repay-info">
        <table class="table">
          <tr>
            <th>{{ info.borrow_time }}</th>
            <th>{{ info.borrow_period + '天' }}</th>
            <th>{{ info.borrow_amount + '元' }}</th>
          </tr>
          <tr>
            <td>借款时间</td>
            <td>借款期限</td>
            <td>借款金额</td>
          </tr>
        </table>
        <!--间隔线-->
        <div class="row" style="padding: 0;"></div>
        <table class="table">
          <tr>
            <th>{{ info.repay_time }}</th>
            <th>{{ info.repay_amount + '元' }}</th>
            <th :class="'c-' + info.status">{{ status[info.status] }}</th>
          </tr>
          <tr>
            <td>合约还款日</td>
            <td>还款金额</td>
            <td>状态</td>
          </tr>
        </table>
      </div>
      <!--间隔线-->
      <div class="row" style="padding: 0;"></div>
      <!--逾期提示-->
      <div class="tac" v-show="isShowOverdueTip()">
        <span class="hint c-light fs15" @click="showOverdueTip()">包含逾期费用{{ info.repay_overdue_amount }}元</span>
      </div>
    </div>
    <!--没有还款信息-->
    <div class="haveno tac" v-if="flag == -1">
      <div class="fs20">您当前无款项待还</div>
      <img src="../../assets/repay/haveno.png" alt="">
    </div>
  </section>
</template>
<script>
  var $data = {
    info: {
      product_type: '',             // 产品类型
      borrow_time: '',              // 借款时间
      borrow_period: '',            // 借款天数
      borrow_amount: '',            // 借款金额
      repay_time: '',               // 还款时间
      repay_amount: '',             // 还款金额
      repay_overdue_amount: '',     // 逾期费用
      status: '',                   // 还款状态，4－待还款 7-已逾期 8-待确认
    },
    status: {
      '4': '待还款',
      '7': '已逾期',
      '8': '待确认',
    },
    flag: 0,
    // 用户识别 code
    user_code: sysinfo.getQueryString('user_code')
  }
  export default {
    data() {
      // 获取数据
      ajax.get('/v3/plan/repayment', {
        user_code: $data.user_code,
      }).then(function (xhr, res) {
        if (res.code == 0) {
          $data.flag = (res.data && res.data.product_type == 'single') ? 1 : -1
          if ($data.flag == 1) $data.info = res.data
        }
        else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      // 判断是否显示罚息信息
      isShowOverdueTip() {
        return parseFloat($data.info.repay_overdue_amount) > 0
      },
      // 显示罚息提示
      showOverdueTip() {
        layer.warning('<p class="fs17">罚息规则说明</p><br><p>逾期罚息=当期未还本金*0.005*逾期天数</p>')
      }
    },
  }
</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay-info {
    /*头图*/
    .banner {
      width: 100%;
    }
    /*还款信息*/
    .repay-info {
      padding: 0 px2rem(20);
    }
    /*还款信息表格*/
    .table {
      line-height: px2rem(28);
      text-align: center;
      padding: px2rem(30) 0;
      width: 100%;
      tr {
        > * {
          &:first-of-type {
            text-align: left;
          }
          &:last-of-type {
            text-align: right;
          }
        }
      }
      th {
        font-size: px2rem(17);
        width: 33.33%;
      }
      td {
        color: #868686;
      }
    }
    /*逾期提示*/
    .hint {
      background: url(../../assets/repay/info.png) no-repeat 100%;
      background-size: contain;
      padding-right: px2rem(25);
    }
    /*逾期颜色*/
    .c-7 {
      color: #FFB844;
    }
    /*还款按钮*/
    .btn-wrap {
      padding: px2rem(50) px2rem(12) 0;
      a {
        width: auto;
      }
    }
    /*没有还款计划*/
    .haveno {
      padding: px2rem(130) px2rem(50);
      img {
        width: px2rem(130);
        margin-top: px2rem(40);
      }
      .outline {
        color: $black;
      }
    }
  }
</style>