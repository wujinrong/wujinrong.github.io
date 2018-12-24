<!--
  -- 我要还款-新版
  -- @author fangyunlong
  -->
<template>
  <section v-show="loaded" class="repayment container fs15">
    <!-- 判断是否有借款信息 -->
    <div v-if="info.single || info.multiple">
      <!-- 顶部按钮 -->
      <div class="topbtn">
        <div @click="isCheckout($event)" :class="{'topbtn-active':info.active_tab=='multiple'}" v-show="info.multiple" class="topbtn-multiple">
          分期贷
        </div>
        <div @click="isCheckout($event)" :class="{'topbtn-active':info.active_tab=='single'}" v-show="info.single" class="topbtn-single">
          单期贷
        </div>
      </div>
      <!-- 分期贷所在盒子 -->
      <div v-show="info.active_tab=='multiple'" class="multiple-container">
        <!-- 分期贷顶部 贷款资料div -->
        <div class="multiple-top clearfix">
          <div class="multiple-toptxt tal">
            <p v-if="info.multiple">{{info.multiple.apply.borrow_date}}</p>
            <p class="c-gray sptxt">借款时间</p>
          </div>
          <div class="multiple-toptxt tac">
            <p v-if="info.multiple">{{info.multiple.apply.borrow_period_desc}}</p>
            <p class="c-gray">借款期数</p>
          </div>
          <div class="multiple-toptxt tar">
            <p v-if="info.multiple">{{info.multiple.apply.borrow_amount_desc}}</p>
            <p class="c-gray">借款金额</p>
          </div>
          <!-- 剩余款项提示信息 -->
          <p v-if="info.multiple" class="surplusMsg tac">剩余<span class="c-red">{{info.multiple.left_period}}</span>期共<span class="c-red">{{info.multiple.left_amount}}</span>元借款未还清</p>
        </div>
        <!-- 贷款主体ul -->
        <div class="multiple-main">
          <!-- 分为两个ul，一个存放未还，一个存放已还 -->
          <ul v-el:unfinish class="mainUl">
            <li v-for="(index,item) in unfinished" class="link">
              <div @click="isSelected($event,item)" class="theCircle">
                <div :class="{'selectActive':index == 0}"></div>
              </div>
              <div @click="gotoDetail(item.period)" class="li-right">
                <div class="tal"><span class="c-gray">{{item.repay_date}}</span></div>
                <div class="tac"><span class="c-gray">{{item.status_desc}}</span></div>
                <div class="tar">
                  <p><span class="c-gray">{{item.repay_amount_desc}}</span></p>
                  <!-- 是否显示分期贷警告信息 -->
                  <p v-if="showWarningTip(item)" class="warningTxt"><span class="c-red">{{item.repay_overdue_content}}</span></p>
                </div>
              </div>
            </li>
          </ul>
          <ul class="mainUl">
            <li v-for="(index,item) in finished" class="link">
              <div class="theCircle"></div>
              <div class="li-right">
                <div class="tal"><span class="c-placeholder">{{item.repay_date}}</span></div>
                <div class="tac"><span class="c-placeholder">{{item.status_desc}}</span></div>
                <div class="tar">
                  <p><span class="c-placeholder">{{item.repay_amount_desc}}</span></p>
                  <!-- <p class="warningTxt"><span class="c-red">含逾期费200元</span></p> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 提交按钮 -->
        <div class="thebtn-multiple">
          <div class="btn-wrap">
            <a class="btn tac" @click="goPay">立即还款</a>
          </div>
        </div>
      </div>
      <!-- 单期贷所在盒子 -->
      <div v-show="info.active_tab=='single'" class="single-container">
        <div>
          <div class="tab3 clearfix">
            <div>
              <p v-if="info.single">{{ info.single.apply.borrow_date }}</p>
              <p>借款时间</p>
            </div>
            <div>
              <p v-if="info.single">{{ info.single.apply.borrow_period + '天' }}</p>
              <p>借款期限</p>
            </div>
            <div>
              <p v-if="info.single">{{ info.single.apply.borrow_amount_desc}}</p>
              <p>借款金额</p>
            </div>
          </div>
          <!-- 还款计划列表 -->
          <div class="tab3 clearfix">
            <div>
              <p v-if="info.single">{{ info.single.repay_date }}</p>
              <p>合约还款日</p>
            </div>
            <div>
              <p v-if="info.single">{{ info.single.repay_amount_desc }}</p>
              <p>还款金额</p>
            </div>
            <div>
              <!-- <p v-bind:class="'c-' + info.single.status">{{ status[info.single.status] }}</p> -->
              <p v-if="info.single" :class="'c-'+ info.single.status">{{info.single.status_desc}}</p>
              <p>状态</p>
            </div>
          </div>
        </div>
        <!-- 逾期提示 -->
        <div v-if="info.single" class="info c-light tac fs15" v-show="info.single.repay_overdue_content">
          <span @click="showOverdueTip()">{{info.single.repay_overdue_content}}</span>
        </div>
        <!-- 立即还款 -->
        <div class="btn-wrap">
          <a class="btn tac" v-link="'/repay/charge'">立即还款</a>
        </div>
      </div>
    </div>
    <!-- 没有借款信息显示这个div -->
    <div class="haveno tac c-placeholder" v-if="!info.single && !info.multiple">
      <div class="fs20">您当前无款项待还</div>
      <img src="../../assets/repay/haveno.png" alt="">
      <div class="btn-wrap">
        <!-- <a @click="goDownLoad" class="btn outline">现在去借款</a> -->
        <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class="btn outline">现在去借款</a>
      </div>
    </div>
    <!-- 页脚菜单 -->
    <d-menu v-bind:active="'repay'"></d-menu>
  </section>
</template>
<script>
import DMenu from '../../components/common/DMenu.vue'
import Vue from 'vue'
// 模拟数据结构
var $data = {
  loaded: false,
  info: {}
  // info: {
  //  is_login:true, //bool 是否登录
  //  active_tab: "single", //string 当前tab,默认为single,单期贷single,分期贷multiple,为空时表示还款计划不存在
  //  single: {
  //       apply: {
  //        borrow_date:"2017-03-14",//string 借款时间
  //         borrow_date_tip:"借款时间",//string 借款时间提示
  //         borrow_period_desc:"7天", //string 借款期限
  //         borrow_period_tip:"借款期限",//string 借款期限提示
  //         borrow_amount_desc:"2000.00元",//string 借款金额描述
  //         credit_amount_desc:"1000.00元", //string 批核金额描述
  //         amount_tip:"借款金额"//string 金额提示 单期贷 借款金额, 分期贷 批核金额
  //       },
  //       repay_date:"2017-03-21", //string 合约还款日
  //       repay_amount_desc:"2000.50元", //string 应还金额描述
  //       status:7, //int 4-待还款； 5-已还清;  7-已逾期； 8-还款中
  //       status_desc:"已逾期", //string 状态描述
  //       status_color:"#383838", //string 状态对应的颜色
  //       repay_overdue_content:"包含逾期费用0.50元",//文案  逾期金额为0时该字段为空字符串
  //       overdue_rule_title:"罚息规则说明", //string
  //       overdue_rule_desc:"未及时还款会产生相应的逾期手续费 \n 1.违约金：20元/笔 \n 2.逾期手续费：逾期15天内日费率按1%计收；自逾期第16日起日费率按2%计收", //string
  //  },
  //  multiple: {
  //    apply: {
  //      borrow_date:"2017-03-14",//string 借款时间
  //         borrow_date_tip:"借款时间",//string 借款时间提示
  //         borrow_period_desc:"7天", //string 借款期限
  //         borrow_period_tip:"借款期限",//string 借款期限提示
  //         borrow_amount_desc:"2000.00元",//string 借款金额描述
  //         credit_amount_desc:"1000.00元", //string 批核金额描述
  //         amount_tip:"借款金额"//string 金额提示 单期贷 借款金额, 分期贷 批核金额
  //    },
  //    total_desc:"剩余5期共4000元借款未结清",//string 总描述
  //       left_period:5,//int 剩余期数
  //       left_amount:4000,//double 剩余金额
  //     plans:[
  //       {
  //         period:1, //int 期数
  //         period_desc:"第一期", //string 期数描述
  //         repay_date:"3月21日", //string 合约还款日
  //         repay_date_desc:"3月21日应还款", //string 合约还款日描述
  //         status:7, //int 4-待还款; 5-已还清; 7-已逾期; 8-还款中
  //         status_desc:"已逾期", //string 状态描述
  //         repay_amount_desc:"2100.50元", //string 应还金额描述
  //         repay_overdue_content:"含逾期费0.50元",//文案  逾期金额为0时该字段为空字符串
  //         finish_date:"2017-03-21", //string 实际还款日
  //         detail:[
  //            {
  //              label:"本金",
  //              value:"2000.00元"
  //            }
  //          ]
  //         }
  //       ] 
  //  }
  // }
}
export default {
  data() {
      var _this = this
        /**
         * 获取数据
         * https://git.fond.io/b/paydayloan/wikis/plan-v2
         */
      ajax.get('/v3/repay/plan-new')
        .then(function(xhr, res) {
          // 这个loaded解决了闪烁问题
          $data.loaded = true
          if (res.code == 0) {
            // 判断登录态
            if (!res.data.is_login) sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : _this.$router.replace('/user/login?ref=' + _this.$route.path)
            if (res.data) $data.info = res.data
              // 一进来就选中第一个选择框
            Vue.set($data.info.multiple.plans[0], 'selected', true)
          } else {
            layer.warning(res.message)
          }
          // 这里依据本地存储设置默认选中哪个tab，设置完成之后立马清除
          if (window.localStorage.isMultipe === 'true') {
            $data.info.active_tab = 'multiple'
            window.localStorage.isMultipe = false
          }
        })
      return $data
    },
    components: {
      DMenu: DMenu
    },
    methods: {
      // 点击跳转支付页面并且设置本地存储
      goPay() {
        var storage = window.localStorage
        var a = this.theArr
        storage.isMultipe = true
        this.$router.go('/repay/charge?arr=' + a)
      },
      // 点击切换顶部tab的方法
      isCheckout(e) {
        if (e.target.classList.contains('topbtn-single')) this.info.active_tab = 'single'
        if (e.target.classList.contains('topbtn-multiple')) this.info.active_tab = 'multiple'
      },
      // 点击跳转对应分期的详情页
      gotoDetail(period) {
        window.localStorage.isMultipe = true
        this.$router.go('/repay/repayment/details?period=' + period)
      },
      // 点击是否选择单选框的方法
      isSelected(e, item) {

        if (e.currentTarget.parentNode.previousElementSibling) {
          var theDiv = e.currentTarget.parentNode.previousElementSibling.children[0].children[0]
        }
        if (e.currentTarget.parentNode.nextElementSibling) {
          var theDiv2 = e.currentTarget.parentNode.nextElementSibling.children[0].children[0]
        }

        var obj = e.currentTarget.children[0]
        var str = Array.prototype.slice.call(obj.classList)
          // 这里if是选中的逻辑，else是取消的逻辑
        if (str.indexOf('selectActive') == -1) {
          // 选中时首先判断有没有上一个li
          if (theDiv) {
            // 如果上一个li没有被选中，return
            if (!theDiv.classList.contains('selectActive')) {
              return
            }
          }
          obj.classList.add('selectActive')
            // 给即将选中的数据添加selected属性为true
          Vue.set(item, 'selected', true)
        } else {
          // 第一个一定要被选中，所以这里如果上一个li不存在，直接return。不允许取消选中状态
          if (!theDiv) return
          if (theDiv2) {
            if (theDiv2.classList.contains('selectActive')) {
              return
            }
          }

          obj.classList.remove('selectActive')
            // 给即将选中的数据添加selected属性为false
          Vue.set(item, 'selected', false)
        }
      },
      // 显示罚息提示
      showOverdueTip() {
        layer.warning('<p class="fs17 tal">罚息规则说明</p><br><p class="tal c-gray">未及时还款会产生相应的逾期手续费</p><p class="tal c-gray">1.违约金：20元/笔</p><p class="tal c-gray">2.逾期手续费：逾期15天内日费率按1%计收；自逾期第16日起日费率按2%计收</p>')
      },
      // 判断是否显示分期贷警告文本
      showWarningTip(item) {

        return +item.repay_overdue_content.replace(/[^0-9]/ig, "")
      },
      goDownLoad() {
        this.$router.go('http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan')
      }
    },
    computed: {
      unfinished() {
        var arr = []
        if (this.info.multiple) {
          var oldArr = this.info.multiple.plans
          for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i].status != 5) {
              arr.push(oldArr[i])
            }
          }
        }
        return arr
      },
      finished() {
        var arr = []
        if (this.info.multiple) {
          var oldArr = this.info.multiple.plans
          for (var i = 0; i < oldArr.length; i++) {
            if (oldArr[i].status == 5) {
              arr.push(oldArr[i])
            }
          }
        }
        return arr
      },
      theArr() {
        var arr = []
        var plans = this.info.multiple.plans
        for (var i = 0; i < plans.length; i++) {
          if (plans[i].selected) {
            arr.push(plans[i].period)
          }
        }
        return arr
      }
    }
}

</script>
<style lang="scss">
@import '../../sass/_globals.scss';
.repayment {
  background-color: #F5F5F5;
  min-height: 100%;
  // 一些公共样式----start
  // 一些公共样式----end
  .topbtn {
    margin: px2rem(12);
    height: px2rem(45);
    border: 1px solid #FF6262;
    border-radius: px2rem(8);
    display: flex;
    div {
      flex: 1;
      text-align: center;
      line-height: px2rem(45);
      color: #ADADAD;
    }
    .topbtn-active {
      color: white;
      background-color: #FF6262;
      border-radius: px2rem(6);
    }
  }
  .multiple-container {
    width: 100%;
    // height: 200px;
    .multiple-top {
      padding: px2rem(20) px2rem(20) 0 px2rem(20);
      border-bottom: 1px solid #E0E0E0;
      div:nth-child(2) {
        position: relative;
        &::after {
          content: '';
          width: 1px;
          height: 100%;
          background-color: #E0E0E0;
          position: absolute;
          left: 0;
          top: 0;
        }
        &::before {
          content: '';
          width: 1px;
          height: 100%;
          background-color: #E0E0E0;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .multiple-toptxt {
        float: left;
        width: 33.333%;
        .sptxt {
          margin-top: px2rem(2);
        }
      }
      .surplusMsg {
        line-height: px2rem(50);
        text-align: center !important;
      }
    }
    .multiple-main {
      width: 100%;
      .mainUl {
        width: 100%;
        li {
          min-height: px2rem(44);
          background-color: white;
          margin-top: px2rem(8);
          border-top: 1px solid #E0E0E0;
          border-bottom: 1px solid #E0E0E0;
          background: white url('../../assets/right.png') no-repeat right;
          background-size: px2rem(8);
          background-position: right px2rem(20) top px2rem(16);
          position: relative;
          padding: 0 px2rem(20);
          .theCircle {
            width: px2rem(20);
            height: px2rem(20);
            border: 1px solid gray;
            border-radius: px2rem(10);
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            div {
              width: px2rem(14);
              height: px2rem(14);
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
            }
            .selectActive {
              background-color: orange;
            }
          }
          .li-right {
            margin-left: px2rem(22);
            margin-right: 0;
            min-height: px2rem(44);
            display: flex;
            div {
              flex: 1;
              padding: 0 px2rem(20) 0 px2rem(10);
              line-height: px2rem(44);
              white-space: nowrap;
            }
            div:nth-child(3) {
              position: relative;
              p:nth-child(2) {
                line-height: px2rem(15);
                position: absolute;
                right: px2rem(20);
                bottom: px2rem(3);
                font-size: px2rem(12);
              }
            }
          }
        }
      }
    }
    .thebtn-multiple {
      .btn-wrap {
        padding: px2rem(50) px2rem(12) 0;
        a {
          width: auto;
        }
      }
    }
  }
  .single-container {
    width: 100%;
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
    .c-7 {
      color: #FFB844;
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

