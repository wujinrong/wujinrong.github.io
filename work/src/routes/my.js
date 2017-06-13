/**
 * 个人中心页面路由定义
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 个人中心
  '/my': {
    name: '个人中心',
    component: function (resolve) {
      require(['../components/my/Index.vue'], resolve)
    }
  },
  // 设置
  '/my/setting': {
    name: '设置',
    component: function (resolve) {
      require(['../components/my/Setting.vue'], resolve)
    }
  },
  // 我的合同
  '/my/contract': {
    name: '我的合同',
    component: function (resolve) {
      require(['../components/my/Contract.vue'], resolve)
    }
  },
  // 进度查询
  '/my/progress': {
    name: '进度查询',
    component: function (resolve) {
      require(['../components/my/Progress.vue'], resolve)
    }
  },
  // 借款记录
  '/my/record': {
    name: '借款记录',
    component: function (resolve) {
      require(['../components/my/Record.vue'], resolve)
    }
  },
  // 借款记录明细
  '/my/record/detail': {
    name: '借款记录明细',
    component: function (resolve) {
      require(['../components/my/RecordDetail.vue'], resolve)
    }
  },
  // 我的银行卡
  '/bank/list': {
    name: '我的银行卡',
    component: function (resolve) {
      require(['../components/bank/List.vue'], resolve)
    }
  },
  // 我的优惠券
  '/my/coupon': {
    name: '我的奖励',
    component: function (resolve) {
      require(['../components/my/Coupon.vue'], resolve)
    }
  },
  // 我的优惠券-使用说明
  '/my/coupon/specification': {
    name: '使用说明',
    component: function (resolve) {
      require(['../components/my/CouponSpecification.vue'], resolve)
    }
  },
  // 消息中心
  '/my/message': {
    name: '消息中心',
    component: function (resolve) {
      require(['../components/my/Message.vue'], resolve)
    }
  },
  // 消息详情
  '/my/message/detail': {
    name: '消息详情',
    component: function (resolve) {
      require(['../components/my/MessageDetail.vue'], resolve)
    }
  },
  // 我的客服 - 客服电话
  '/my/customer-service': {
    name: '我的客服',
    component: function (resolve) {
      require(['../components/my/CustomerService.vue'], resolve)
    }
  },
  // // 我的客服 - 百答云客服
  // '/my/customer-service-bd': {
  //   name: '在线客服',
  //   component: function (resolve) {
  //     require(['../components/my/CustomerServiceBD.vue'], resolve)
  //   }
  // },
  // 常见问题
  '/faq': {
    name: '常见问题',
    component: function (resolve) {
      require(['../components/FAQ.vue'], resolve)
    }
  },
  // 余额明细
  '/my/balance-detailed': {
    name: '明细',
    component: function (resolve) {
      require(['../components/my/BalanceDetailed.vue'], resolve)
    }
  },
  // 红包/提现明细
  '/my/redpacket-detailed': {
    name: '红包明细',
    component: function (resolve) {
      require(['../components/my/RedpacketDetailed.vue'], resolve)
    }
  },
  // 红包/提现明细
  '/my/withdrawals-detailed': {
    name: '余额提现',
    component: function (resolve) {
      require(['../components/my/WithdrawalsDetailed.vue'], resolve)
    }
  },
  // 提现详情
  '/my/withdrawals-result': {
    name: '提现详情',
    component: function (resolve) {
      require(['../components/my/withdrawalsresult.vue'], resolve)
    }
  }
}
