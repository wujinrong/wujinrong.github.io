/**
 * 用户登录注册相关页面路由定义
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 登录
  '/user/login': {
    name: '登录',
    component: function (resolve) {
      require(['../pages/user/Login.vue'], resolve)
    }
  },
  // 注册
  '/user/register': {
    name: '注册',
    component: function (resolve) {
      require(['../pages/user/Register.vue'], resolve)
    }
  },
  // 忘记密码
  '/user/forget': {
    name: '忘记密码',
    component: function (resolve) {
      require(['../pages/user/Forget.vue'], resolve)
    }
  },
  // 贷上钱服务协议
  '/user/service-protocol': {
    name: '贷上钱服务协议',
    component: function (resolve) {
      require(['../pages/user/ServiceProtocol.vue'], resolve)
    }
  }
}
