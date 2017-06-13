<!--
  -- 常见问题
  -->
<template>
  <section class="faq container">
    <div class="tabs tac fs15">
      <div v-for="items in tabs" @click="cTabs($index)" :class="items.tab_active ? 'active' : ''">{{ items.tab_title }}</div>
    </div>
    <div class="line"></div>
    <div class="wrap">
      <div class="panel" v-for="(index, items) in tabs" :style="{display : items.tab_active ? 'block' : ''}">
        <div class="faq-item row" v-for="sub_items in items.panel">
          <div class="question" @click="subTabs(index, $index)">{{ sub_items.sub_title }}</div>
          <div class="answer" :style="{display : sub_items.sub_active ? 'block' : ''}">
            {{{ sub_items.sub_content }}}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    tabs: [
      {
        tab_title : "借款",
        tab_active : true,
        panel : [
          {
            sub_title : "1、申请借款需要准备哪些材料？",
            sub_active : false,
            sub_content : "<p>第二代身份证、银行卡、手机服务密码，学生的话还需要提供学生证或校园卡。</p><p>整个借款流程在手机上完成，您不需要准备任何纸质材料，只需根据手机界面提示完成操作即可。</p>"
          },
          {
            sub_title : "2、借款提交之后能否取消？",
            sub_active : false,
            sub_content : "<p>合同签约前可以取消，在“个人中心-借款记录”中点击取消借款；若所借款项在放款中或已到账，则无法取消，视作提前还款处理。</p>"
          },
          {
            sub_title : "3、贷上钱是否会收取手续费？",
            sub_active : false,
            sub_content : "<p>除贷款利息和服务费以外，贷上钱不向您收取任何费用。</p>"
          },
          {
            sub_title : "4、贷上钱的服务费和利息怎么算的？",
            sub_active : false,
            sub_content : "<p>1）单期贷借款服务相关说明</p>"
              + "<p>服务费＝借款本金＊服务费率，利息＝借款本金＊利率；</p>"
              + "<p>2）分期贷借款服务相关说明</p>"
              + "<p>服务费＝借款本金＊服务费率＊借款期数，期利息＝借款本金＊利率，期管理费=借款本金＊管理费率</p>"
              + "<p>具体的服务费率、利率和管理费率，可参见借款协议。</p>"
          },
          {
            sub_title : "5、贷上钱支持的申请借款额度是多少？相应的借款期限？",
            sub_active : false,
            sub_content : "<p>1）单期贷：借款额度500-2000元，借款期限7天和14天。</p>"
              + "<p>2）分期贷：借款额度1000-10000元，借款期限3个月和6个月。</p>"
          },
          {
            sub_title : "6、这次申请不通过，下次还可以继续申请吗？",
            sub_active : false,
            sub_content : "<p>1）单期贷申请未通过，一个月后方可再次申请。</p>"
              + "<p>2）分期贷申请未通过，一个月后方可再次申请，但是可以立即去申请单期贷。</p>"
          },
          {
            sub_title : "7、可以多次申请借钱吗？",
            sub_active : false,
            sub_content : "<p>重复申请需要在前次借款全部偿清之后提出。</p>"
          },
          {
            sub_title : "8、申请之后多久可以知道审核结果？",
            sub_active : false,
            sub_content : "<p>如提交信息完整，申请件处理时效在15分钟内完成审批，高峰时段会略有延迟。</p>"
          },
          {
            sub_title : "9、申请通过了，钱多久可以到账？",
            sub_active : false,
            sub_content : "<p>申请通过后，签约完成、银行卡验证成功，就会进入放款流程，当天即可到账，最晚不超过T+1个工作日。</p>"
          }
        ]
      },
      {
        tab_title : "还款",
        tab_active : false,
        panel : [
          {
            sub_title : "1、还款方式是什么？",
            sub_active : false,
            sub_content : "<p>1）单期贷：到期还本付息。</p>"
              + "<p>2）分期贷：等额本息。</p>"
          },
          {
            sub_title : "2、还款日是如何确定的？",
            sub_active : false,
            sub_content : "<p>还款日为借款周期结束后的第一个自然日；比如借款7天，则第8天为还款日（放款日当天为借款周期的第一天）。</p>"
          },
          {
            sub_title : "3、我有哪些方式可以还款？",
            sub_active : false,
            sub_content : "<p>1）自主还款：点击“我要还款”，选择确保有足够还款金额的银行卡或绑定新卡完成在线即时还款。<span class=\"c-red\">（备注：还款时，共有3次机会，请仔细核实信息进行还款操作）</span></p>"
            + "<p>2）自动还款：您在借款时验证的银行卡为您的代扣银行卡，确保还款日前卡内有足够的还款资金，还款日当天我们会自动扣款完成还款的；</p>"
            + "<p>3) 支付宝还款：您也可以还款至：</p>"
            + "<p>支付宝企业账户acc@qianshengqian.com</p>"
            + "<p>企业名称：深圳市钱生钱互联网金融服务有限公司。</p>"
            + "<p class=\"c-main\">转账时请务必备注：姓名+贷上钱+注册号码</p>"
            + "<p class=\"c-main\">支付宝还款需要t+1个工作日处理完毕（t为还款日）</p>"
            + "<p>完成转账后将转账凭证及姓名、注册手机号发至微信公众号：贷上钱服务号</p>"
            + "<p class=\"c-main\">使用此还款方式请提前1至2天还款，否则将会产生逾期费用。</p>"
          },
          {
            sub_title : "4、可以提前还款吗？会不会收取违约金？什么时候可以提前还款？",
            sub_active : false,
            sub_content : "<p>1）单期贷：整个借款周期都是可以提前还款的，已经扣取的服务费不予退还，无其他费用。</p>"
              + "<p>2）分期贷：当期还款日未到，而提前将当期结清，则当期的费用不会因此减少；全部结清，需缴纳未还各期的所有费用与剩余本金，即生成还款计划的每期应还金额。</p>"
          },
          {
            sub_title : "5、怎样更换还款银行卡？",
            sub_active : false,
            sub_content : "<p>1）您在自主还款时可选择或添加指定的银行储蓄卡；</p>"
              + "<p>2）更换代扣卡请联系工作人员（400-136-5799，服务时间9：00-21：00）办理。</p>"
          },
          {
            sub_title : "6、我在还款日当天存入足额资金，但却扣款失败，这是怎么回事，该如何解决？",
            sub_active : false,
            sub_content : "<p>请至少在约定还款日前一天，确保还款账户资金足够归还当日应还本金和利息，以免扣款失败。</p>"
              + "<p>如果出现此类情况，请确保还款日16:00之前您的还款卡状态正常、余额充足，我们将在还款日再次扣款。如需帮助，可以联系工作人员(400-136-5799，服务时间9:00-21:00)。</p>"
          },
          {
            sub_title : "7、逾期后是否收取罚息，收取标准是什么？",
            sub_active : false,
            sub_content : "<p>未及时还款会产生相应的违约金和逾期手续费，收费模式如下</p>"
            + "<p>1）单期贷：</p>"
            + "<p>违约金：20元/笔；逾期费：自应还款日起日费率1%计收，逾期超过15日，自16日起日费率2%计收。</p>"
            + "<p>2）分期贷：</p>"
            + "<p>每期逾期费：每期未还本金＊0.5%＊逾期天数</p>"
          },
          {
            sub_title : "8、还款前会有提醒吗？",
            sub_active : false,
            sub_content : "<p>还款前三天、前一天我们会以短信方式通知您还款事宜。</p>"
          },
        ]
      },
      {
        tab_title : "安全",
        tab_active : false,
        panel : [
          {
            sub_title : "1、还款时，要从我的银行卡自动扣钱，这样是否安全？",
            sub_active : false,
            sub_content : "<p>我们只有在您还没有完成本期还款的情况下进行自动扣款。每次扣款金额为您当前应还款金额，自动扣款是非常安全的。</p>"
          },
        ]
      },
      {
        tab_title : "征信",
        tab_active : false,
        panel : [
          {
            sub_title : "1、我的贷上钱借还款记录会在人行征信报告中体现吗？是否会有负面的影响？",
            sub_active : false,
            sub_content : "<p>贷上钱借还款记录会在人行征信报告中体现，会按照人民银行征信管理严格规范执行报送义务。</p>"
              + "<p>只要您按期还款，没有逾期，征信报告中贷上钱记录就不会成为您的负面信息。反而，您良好的信用贷款记录会成为您的“正面信息”，有利于您个人信用水平的积累及申请其他贷款的信用良好证明。</p>"
          },
        ]
      }
    ]
  }
  export default {
    data() {
      return $data
    },
    methods: {
      cTabs: function($index) {
        for (var i = $data.tabs.length; i--; ) {
          $data.tabs[i].tab_active = false
        }
        $data.tabs[$index].tab_active = true
      },
      subTabs: function(index,$index) {
        $data.tabs[index].panel[$index].sub_active = !$data.tabs[index].panel[$index].sub_active
      }
    }
  }
</script>
<style lang="scss">
  @import '../sass/_globals.scss';
  .faq {
    padding-bottom: px2rem(20);
    .tabs {
      overflow: hidden;
      > div {
        width: 24.99999999%;
        height: px2rem(52.5);
        line-height: px2rem(52.5);
        float: left;
        &.active {
          color: $main-color;
          border-bottom: 2px solid $main-color;
        }
      }
    }
    .line {
      background: #F6F3F3;
      height: px2rem(8);
      border-top: 1px solid #DBDBDB;
    }
    .wrap {
      padding: 0;
    }
    .panel {
      display: none;
    }
    .faq-item {
      line-height: px2rem(22);
    }
    .question {
      color: #747474;
      padding: px2rem(10) px2rem(20);
      font-size: px2rem(15);
    }
    .answer {
      color: #818181;;
      display: none;
      padding: 0 px2rem(20.5);
      font-size: px2rem(13);
      text-align: justify;
    }
  }
</style>