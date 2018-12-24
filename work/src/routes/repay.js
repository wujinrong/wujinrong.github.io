/**
 * 主动还款相关页面路由定义
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 我要还款-新版（同时包含单期和多期）
  '/repay/repayment': {
    name: '我要还款',
    component: function (resolve) {
      require(['../pages/repay/repayment.vue'], resolve)
    }
  },
  // 分期贷详情页面
  '/repay/repayment/details': {
    name: '还款详情',
    component: function (resolve) {
      require(['../pages/repay/details.vue'], resolve)
    }
  },
  // 我要还款
  '/repay': {
    name: '我要还款',
    component: function (resolve) {
      require(['../pages/repay/Index.vue'], resolve)
    }
  },
  // 充值还款
  '/repay/charge': {
    name: '充值还款',
    component: function (resolve) {
      require(['../pages/repay/Charge.vue'], resolve)
    }
  },
  // 还款结果
  '/repay/status': {
    name: '还款结果',
    component: function (resolve) {
      require(['../pages/repay/Status.vue'], resolve)
    }
  },
  // 还款方式说明
  '/repay/specification': {
    name: '还款方式说明',
    component: function (resolve) {
      require(['../pages/repay/Specification.vue'], resolve)
    }
  },
  /**
   * 用于外链主动还款的页面路由，使用 queryString user_code 判断登录态
   */
  // 账单详情
  '/repay/info': {
    name: '账单详情',
    component: function (resolve) {
      require(['../pages/repay/Info.vue'], resolve)
    }
  },
  // 充值还款
  '/repay/chargewithcode': {
    name: '充值还款',
    component: function (resolve) {
      require(['../pages/repay/ChargeWithCode.vue'], resolve)
    }
  },
  // 第三方（微信、支付宝）入口
  '/repay/third/entry': {
    component: function (resolve) {
      require(['../pages/repay/third/Entry.vue'], resolve)
    }
  },
  // 第三方（微信、支付宝）还款结果
  '/repay/third/result': {
    name: '还款结果 ',
    component: function (resolve) {
      require(['../pages/repay/third/Result.vue'], resolve)
    }
  },
  // 申请延期
  '/repay/delay': {
    name: '申请延期',
    component: function (resolve) {
      require(['../pages/repay/Delay.vue'], resolve)
    }
  },
  // // 账单详情（多期贷）
  // '/repay/multiple/record': {
  //   name: '账单详情',
  //   component: function (resolve) {
  //     require(['../components/repay/MultipleRecord.vue'], resolve)
  //   }
  // }
  // 充值还款 - 延期还款
  '/repay/delaycharge': {
    name: '充值还款',
    component: function (resolve) {
      require(['../pages/repay/delaycharge.vue'], resolve)
    }
  },
  // 合同
  '/repay/contract': {
    name: '借款展期协议',
    component: function (resolve) {
      require(['../pages/repay/loan-contract.vue'], resolve)
    }
  },
}
