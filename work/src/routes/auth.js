/**
 * 申请流程相关页面路由配置 - 分期贷
 * @description 单期贷与分期贷的申请流程分开，分期贷保持老版本流程（2017.05.22）
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 我要借款 - 404 页面
  '/': {
    component: function (resolve) {
      require(['../components/App.vue'], resolve)
    }
  },
  // 授权委托协议
  '/auth/protocol': {
    name: '授权委托协议',
    component: function (resolve) {
      require(['../pages/auth/Protocol.vue'], resolve)
    }
  },
  // 手机验证
  '/auth/phone/verify': {
    name: '手机验证',
    component: function (resolve) {
      require(['../pages/auth/PhoneVerify.vue'], resolve)
    }
  },
  // 身份信息
  '/auth/identity': {
    component: function (resolve) {
      require(['../pages/auth/Identity.vue'], resolve)
    }
  },
  // 工作信息
  '/auth/job': {
    component: function (resolve) {
      require(['../pages/auth/Job.vue'], resolve)
    }
  },
  // 联系信息
  '/auth/relation': {
    component: function (resolve) {
      require(['../pages/auth/Relation.vue'], resolve)
    }
  },
  // 其他认证
  '/auth/other': {
    component: function (resolve) {
      require(['../pages/auth/Other.vue'], resolve)
    }
  },
  // 确认资料，申请借款
  '/auth/confirm': {
    name: '确认资料，申请借款',
    component: function (resolve) {
      require(['../pages/auth/Confirm.vue'], resolve)
    }
  },
  // 授权芝麻信用
  '/auth/sesame': {
    name: '授权芝麻信用',
    component: function (resolve) {
      require(['../pages/auth/Sesame.vue'], resolve)
    }
  },
  // 审核结果（审核中、成功、失败）
  '/auth/status': {
    name: '审核结果',
    component: function (resolve) {
      require(['../pages/auth/Status.vue'], resolve)
    }
  },
  // 银行卡信息
  '/auth/bank': {
    name: '银行卡信息',
    component: function (resolve) {
      require(['../pages/auth/Bank.vue'], resolve)
    }
  },
  // 手机运营商
  '/auth/contact': {
    name: '手机运营商',
    component: function (resolve) {
      require(['../pages/auth/Contact.vue'], resolve)
    }
  },
  // 忘记密码
  '/auth/contact/forget': {
    name: '忘记密码',
    component: function (resolve) {
      require(['../pages/auth/ContactForget.vue'], resolve)
    }
  },
  // 提交成功
  '/auth/submit/success': {
    name: '提交成功',
    component: function (resolve) {
      require(['../pages/auth/SubmitSuccess.vue'], resolve)
    }
  },
  // 申请确认
  '/auth/applyconfirm': {
    name: '申请确认',
    component: function (resolve) {
      require(['../pages/auth/ApplyConfirm.vue'], resolve)
    }
  },
  // 合同签约
  '/auth/contractsign': {
    name: '合同签约',
    component: function (resolve) {
      require(['../pages/auth/ContractSign.vue'], resolve)
    }
  },
  // 重新上传身份证照
  '/auth/idreupload': {
    name: '重新上传身份证照',
    component: function (resolve) {
      require(['../pages/auth/IdReupload.vue'], resolve)
    }
  }
}
