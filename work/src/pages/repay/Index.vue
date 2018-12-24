<!--
  -- 我要还款
  -- @author bigfact
  -->
<template>
  <section class="repay container fs15">
    <div v-if="flag == 1">
      <!-- banner -->
      <img class="banner" src="../../assets/repay/banner.png" alt="">
      <!-- 还款信息 -->
      <div>
        <div class="tab3 clearfix">
          <div>
            <p>{{ info.borrow_time }}</p>
            <p>借款时间</p>
          </div>
          <div>
            <p>{{ info.borrow_period + '天' }}</p>
            <p>借款期限</p>
          </div>
          <div>
            <p>{{ info.borrow_amount + '元' }}</p>
            <p>借款金额</p>
          </div>
        </div>
        <!-- 还款计划列表 -->
        <div class="tab3 clearfix">
          <div>
            <p>{{ info.repay_time }}</p>
            <p>合约还款日</p>
          </div>
          <div>
            <p>{{ info.repay_amount + '元' }}</p>
            <p>还款金额</p>
          </div>
          <div>
            <p v-bind:class="'c-' + info.status">{{ status[info.status] }}</p>
            <p>状态</p>
          </div>
        </div>
      </div>
      <!-- 逾期提示 -->
      <div class="info c-light tac fs15" v-show="isShowOverdueTip()">
        <span @click="showOverdueTip()">包含逾期费用{{ info.repay_overdue_amount }}元</span>
      </div>
      <!-- 立即还款 -->
      <div class="btn-wrap">
        <a class="btn tac" v-link="'/repay/charge'">立即还款</a>
      </div>
    </div>
    <!-- 没有还款信息 -->
    <div class="haveno tac" v-if="flag == -1">
      <div class="fs20">您当前无款项待还</div>
      <img src="../../assets/repay/haveno.png" alt="">
      <div class="btn-wrap">
        <a v-link="{ path: '/', replace: true }" class="btn outline">现在去借款</a>
      </div>
    </div>
    <!-- 页脚菜单 -->
    <d-menu v-bind:active="'repay'"></d-menu>
  </section>
</template>
<script>
  import DMenu from '../../components/common/DMenu.vue'
  var $data = {
    info: {
      borrow_time: "2016-09-11",      //借款时间
      borrow_period: "30",            //借款天数
      borrow_amount: "1000.00",       //借款金额
      repay_time: "2016-10-11",       //还款时间
      repay_amount: "1000.00",        //还款金额
      repay_overdue_amount: "0.00",   //逾期费用
      status: '0',                    //还款状态，4－待还款 7-已逾期 8-待确认
    },
    status: {
      '4': '待还款',
      '7': '已逾期',
      '8': '待确认',
    },
    flag: 0
  }
  export default {
    data() {
      var _this = this
      /**
       * 获取数据
       * https://git.fond.io/b/paydayloan/wikis/plan-v2
       */
      ajax.get('/v3/plan/repayment')
        .then(function (xhr, res) {
          if (res.code == 0) {

            // // testdata
            // res.data = {
            //   "product_type": "", // 产品类型
            //   "head_img_url": "http://paydayloan.fond.io/vue/static/img/banner.dcf4746.png",//头部图片地址
            //   "borrow_time": "2016-09-11",//借款时间
            //   "borrow_period": 30,//借款天数 int
            //   "borrow_amount": 1000,//借款金额 double
            //   "repay_time": "2016-10-11",//还款时间
            //   "repay_amount": 1010,//还款金额 double
            //   "repay_overdue_amount": 10,//逾期费用 double
            //   "repay_overdue_content": "包含逾期费用10",//文案
            //   "status": 4,//状态 4－待还款 7-已逾期 8-待确认
            //   "color": {
            //     "status": "#383838" //状态字体颜色
            //   }
            // }

            $data.flag = (res.data && res.data.product_type == 'single') ? 1 : -1
            if ($data.flag == 1) $data.info = res.data

          }
          else if (res.code == 101003) sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : _this.$router.replace('/user/login?ref=' + _this.$route.path)
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
    components: {
      DMenu: DMenu
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay {
    .banner {
      width: 100%;
    }
    .tab3 {
      padding: px2rem(30) px2rem(20);
      line-height: px2rem(30);
      text-align: center;
      &:last-of-type {
        border-bottom: 1px solid $light;
        margin-bottom: px2rem(20);
        &::before {
          content: "";
          border-bottom: 1px solid $light;
          height: 1px;
          width: 100%;
          display: block;
          position: relative;
          top: px2rem(-30);
        }
      }
      >div {
        width: 33.33%;
        float: left;
        >p {
          &:first-of-type {
            font-size: px2rem(17);
          }
          &:last-of-type {
            color: #868686;
          }
        }
        &:first-of-type {
          text-align: left;
        }
        &:last-of-type {
          text-align: right;
        }
      }
    }
    .c-7 {
      color: #FFB844;
    }
    .info {
      span {
        background: url(../../assets/repay/info.png) no-repeat 100%;
        background-size: contain;
        padding-right: px2rem(25);
      }
    }
    .btn-wrap {
      padding: px2rem(50) px2rem(12) 0;
      a {
        width: auto;
      }
    }
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