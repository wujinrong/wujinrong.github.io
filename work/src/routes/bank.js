/**
 * 银行卡相关页面路由定义
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 添加银行卡
  '/bank/add': {
    name: '添加银行卡',
    component: function (resolve) {
      require(['../components/bank/Add.vue'], resolve)
    }
  },
  // 支持银行卡类别
  '/bank/support': {
    name: '支持银行卡类别',
    component: function (resolve) {
      require(['../components/bank/Support.vue'], resolve)
    }
  },
  // 更换默认收款卡
  '/bank/change/recevie': {
    name: '更换银行卡',
    component: function (resolve) {
      require(['../components/bank/ChangeRecevie.vue'], resolve)
    }
  }
}
