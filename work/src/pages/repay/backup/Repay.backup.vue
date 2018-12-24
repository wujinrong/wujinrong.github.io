<!--
  -- 我要还款（包含单期贷和多期贷）
  -- @author bigfact
  -->
<template>
  <section class="repay fs15 c-value" :class="singleInfo.product_type == 'multiple' ? '' : 'container'">
    <div v-if="flag == 1">
      <!--banner-->
      <div class="header">
        <img class="banner" src="../../assets/repay/banner.png" alt="">
        <div class="product-type">{{ info.product_type == 'multiple' ? '分期贷' : '单期贷' }}</div>
      </div>
      <!--单期贷还款信息-->
      <div class="single-wrap" v-if="singleInfo.product_type != 'multiple'">
        <div class="public-info bg-white">
          <!--公共信息-->
          <table class="table">
            <tr class="c-black">
              <th>{{ singleInfo.borrow_time }}</th>
              <th>{{ singleInfo.borrow_period + '天' }}</th>
              <th>{{ singleInfo.borrow_amount + '元' }}</th>
            </tr>
            <tr>
              <td>借款时间</td>
              <td>借款期限</td>
              <td>借款金额</td>
            </tr>
          </table>
          <!--单期贷信息-->
          <div class="single-info">
            <!--间隔线-->
            <div class="row line"></div>
            <table class="table">
              <tr class="c-black">
                <th>{{ singleInfo.repay_time }}</th>
                <th>{{ singleInfo.repay_amount + '元' }}</th>
                <th :class="'c-' + singleInfo.status">{{ status[singleInfo.status] }}</th>
              </tr>
              <tr>
                <td>合约还款日</td>
                <td>还款金额</td>
                <td>状态</td>
              </tr>
            </table>
          </div>
        </div>
        <!--间隔线-->
        <div class="row line"></div>
      </div>
      <!--多期贷还款信息-->
      <div class="multiple-wrap" v-else>
        <div class="public-info bg-white">
          <!--公共信息-->
          <table class="table">
            <tr class="c-black">
              <th>{{ singleInfo.borrow_time }}</th>
              <th>{{ singleInfo.borrow_period + '天' }}</th>
              <th>{{ singleInfo.borrow_amount + '元' }}</th>
            </tr>
            <tr>
              <td>借款时间</td>
              <td>借款期限</td>
              <td>借款金额</td>
            </tr>
          </table>
          <!--多期贷提示-->
          <div class="multiple-hint tac">
            <span>剩余</span>
            <span class="c-main">5</span>
            <span>期共</span>
            <span class="c-main">4000</span>
            <span>元借款未结清</span>
          </div>
        </div>
        <!--多期贷信息-->
        <div class="multiple-info">
          <a v-link="'/repay/multiple/record?id=' + i.id" class="multiple-info-row" v-for="($index, i) in multipleInfo">
            <div class="multiple-info-date fl" :class="i.chosen && 'chosen'" @click="choose($event, $index)">3月1日</div>
            <div class="multiple-info-status tac fl">已逾期</div>
            <div class="multiple-info-num multiple-info-overtime tar fl">
              <p>1200.00元</p>
              <p class="c-main">含逾期费200元</p>
            </div>
          </a>
        </div>
      </div>
      <!--逾期提示-->
      <div class="tac" v-show="isShowOverdueTip()">
        <span class="hint c-light fs15" @click="showOverdueTip()">包含逾期费用{{ singleInfo.repay_overdue_amount }}元</span>
      </div>
      <!--立即还款-->
      <div class="btn-wrap tac">
        <a class="btn" v-link="'/repay/charge'">立即还款</a>
      </div>
    </div>
    <!--没有还款信息-->
    <div class="haveno tac" v-if="flag == -1">
      <div class="fs20">您当前无款项待还</div>
      <img src="../../assets/repay/haveno.png" alt="">
      <div class="btn-wrap">
        <!--<a v-link="{ path: '/', replace: true }" class="btn outline">现在去借款</a>-->
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn outline">现在去借款</a>
      </div>
    </div>
    <!--页脚菜单-->
    <d-menu v-bind:active="'repay'"></d-menu>
  </section>
</template>
<script>
  import DMenu from '../common/DMenu.vue'
  var $data = {
    // 单期贷信息
    singleInfo: {
      product_type: '',             // 产品类型
      borrow_time: '',              // 借款时间
      borrow_period: '',            // 借款天数
      borrow_amount: '',            // 借款金额
      repay_time: '',               // 还款时间
      repay_amount: '',             // 还款金额
      repay_overdue_amount: '',     // 逾期费用
      status: '',                   // 还款状态，4－待还款 7-已逾期 8-待确认
    },
    // 多期贷信息
    multipleInfo: [
      {
        id: 1,
        chosen: false,
      },
      {
        id: 2,
        chosen: false,
      },
      {
        id: 3,
        chosen: false,
      }
    ],
    status: {                       // 状态对应文案
      '4': '待还款',
      '7': '已逾期',
      '8': '待确认',
    },
    flag: 0,                        // 是否有还款记录
  }
  export default {
    data() {
      var _this = this
      // 获取数据
      ajax.get('/v3/plan/repayment').then(function (xhr, res) {
        if (res.code == 0) {
          $data.flag = res.data && res.data.borrow_time ? 1 : -1
          if ($data.flag > 0) $data.singleInfo = res.data

          // 测试数据
          $data.flag = 1
          $data.singleInfo = {
            "product_type": "", //产品类型
            "head_img_url": "http://paydayloan.fond.io/vue/static/img/banner.dcf4746.png",//头部图片地址
            "borrow_time": "2016-09-11",//借款时间
            "borrow_period": 30,//借款天数 int
            "borrow_amount": 1000,//借款金额 double
            "repay_time": "2016-10-11",//还款时间
            "repay_amount": 1010,//还款金额 double
            "repay_overdue_amount": 10,//逾期费用 double
            "repay_overdue_content": "包含逾期费用10",//文案
            "status": 4,//状态 4－待还款 7-已逾期 8-待确认
          }
          // $data.singleInfo.product_type = 'multiple'

        }
        else if (res.code == 101003) sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : _this.$router.replace('/user/login?ref=' + _this.$route.path)
        else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      /**
       * 判断是否显示罚息信息
       */
      isShowOverdueTip() {
        return parseFloat($data.singleInfo.repay_overdue_amount) > 0
      },
      /**
       * 多期贷选择
       * @param {Object} e 点击事件数据对象
       * @param {Number} index 被点击记录的序号
       */
      choose(e, index) {
        e.preventDefault()
        $data.multipleInfo[index].chosen = !$data.multipleInfo[index].chosen
      },
      /**
       * 显示罚息提示
       */
      showOverdueTip() {
        layer.warning('<p class="fs17">罚息规则说明</p><br><p>逾期罚息=当期未还本金*0.005*逾期天数</p>')
      }
    },
    components: {
      DMenu: DMenu
    },
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .repay {
    /*页头*/
    .header {
      min-height: px2rem(150);
      position: relative;
    }
    /*头图*/
    .banner {
      width: 100%;
    }
    /*产品类型*/
    .product-type {
      background: #FEC700;
      border-top-right-radius: 58px;
      border-bottom-right-radius: 58px;
      color: #CE772E;
      padding: px2rem(7) px2rem(15) px2rem(7) px2rem(12.5);
      position: absolute;
      left: 0;
      top: px2rem(12.5);
    }
    /*间隔线条*/
    .line {
      padding: 0;
    }
    /*还款信息*/
    .public-info {
      padding: 0 px2rem(20);
    }
    /*还款信息表格*/
    .table {
      border-spacing: 0;
      line-height: px2rem(20);
      text-align: center;
      padding: px2rem(30) 0;
      width: 100%;
      tr {
        >* {
          &:first-of-type {
            text-align: left;
          }
          &:nth-of-type(2) {
            border-left: 1px solid #D8D8D8;
            border-right: 1px solid #D8D8D8;
          }
          &:last-of-type {
            text-align: right;
          }
        }
      }
      th {
        padding-bottom: px2rem(8);
        font-size: px2rem(17);
        width: 33.33%;
      }
    }
    /*多期待提示*/
    .multiple-hint {
      margin-top: px2rem(-15);
      padding-bottom: px2rem(15);
    }
    /*多期贷样式*/
    .multiple-info {
      padding: px2rem(8) 0;
    }
    /*多期贷信息行*/
    .multiple-info-row {
      background-color: #FFF;
      border-top: 1px solid #ECECEC;
      border-bottom: 1px solid #ECECEC;
      display: block;
      margin-bottom: px2rem(8);
      padding: 0 px2rem(20);
      height: px2rem(60);
      line-height: px2rem(60);
    }
    /*多期贷日期*/
    .multiple-info-date {
      background-image: url(../../assets/repay/choose-0.png);
      background-position: 0 center;
      background-repeat: no-repeat;
      background-size: px2rem(20);
      box-sizing: border-box;
      padding-left: px2rem(30);
      width: 30%;
      &.chosen {
        background-image: url(../../assets/repay/choose-1.png);
      }
    }
    /*多期贷状态*/
    .multiple-info-status {
      box-sizing: border-box;
      width: 30%;
    }
    /*多期贷金额*/
    .multiple-info-num {
      background: url(../../assets/right.png) no-repeat 100% center;
      background-size: px2rem(7) auto;
      box-sizing: border-box;
      padding-right: px2rem(21);
      width: 40%;
    }
    /*多期贷逾期*/
    .multiple-info-overtime {
      margin-top: px2rem(10);
      line-height: px2rem(20);
    }
    /*逾期提示*/
    .hint {
      background: url(../../assets/repay/info.png) no-repeat 100% center;
      background-size: px2rem(15);
      display: inline-block;
      margin-top: px2rem(19);
      padding-right: px2rem(20);
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
      padding: px2rem(130) px2rem(100);
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