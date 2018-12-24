/**
 * 相关示例页面路由定义
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 页面列表
  '/pagelist': {
    name: '列表',
    component: function (resolve) {
      require(['../components/List.vue'], resolve)
    }
  },
  // 页面列表 - 为了弥补安卓小伙伴线上包（v2.0.2）埋了此页面的测试服地址（paydayloan.fond.io/vue/#!/list），所以该页面会被重定向到线上邀请好友页面
  '/list': {
    name: '列表',
    component: function (resolve) {
      require(['../components/List.vue'], resolve)
    }
  },
  // demo 列表
  '/demo': {
    name: 'demo',
    component: function (resolve) {
      require(['../components/Demo.vue'], resolve)
    }
  },
  // 贷上钱 app js api 测试页面
  '/example/dsqapitest': {
    name: 'dsqapitest',
    component: function (resolve) {
      require(['../pages/example/DsqapiTest.vue'], resolve)
    }
  }
}
