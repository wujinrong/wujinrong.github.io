/**
 * 申请流程相关页面路由配置 - 单期贷
 * @description 单期贷与分期贷的申请流程分开，分期贷保持老版本流程，单期贷的新流程页面在此文件中的定义（2017.05.22）
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 填写资料
  '/authsingle': {
    name: '填写资料',
    component: function (resolve) {
      require(['../pages/authsingle/Index.vue'], resolve)
    }
  },
  // 个人信息
  '/authsingle/personal': {
    name: '个人信息',
    component: function (resolve) {
      require(['../pages/authsingle/Personal.vue'], resolve)
    }
  },
  // 身份信息
  '/authsingle/identity': {
    name: '身份信息',
    component: function (resolve) {
      require(['../pages/authsingle/Identity.vue'], resolve)
    }
  },
  // 工作信息
  '/authsingle/job': {
    name: '工作信息',
    component: function (resolve) {
      require(['../pages/authsingle/Job.vue'], resolve)
    }
  },
  // 联系人信息
  '/authsingle/relation': {
    name: '联系人信息',
    component: function (resolve) {
      require(['../pages/authsingle/Relation.vue'], resolve)
    }
  },
  // 授权芝麻信用
  '/authsingle/sesame': {
    name: '授权芝麻信用',
    component: function (resolve) {
      require(['../pages/authsingle/Sesame.vue'], resolve)
    }
  },
  // 手机运营商
  '/authsingle/contact': {
    name: '手机运营商',
    component: function (resolve) {
      require(['../pages/authsingle/Contact.vue'], resolve)
    }
  },
  // 忘记密码
  '/authsingle/contact/forget': {
    name: '忘记密码',
    component: function (resolve) {
      require(['../pages/authsingle/ContactForget.vue'], resolve)
    }
  },
  // 审核结果、补充信息
  '/authsingle/result': {
    name: '补充信息',
    component: function (resolve) {
      require(['../pages/authsingle/Result.vue'], resolve)
    }
  },
  // 银行卡信息
  '/authsingle/bank': {
    name: '银行卡信息',
    component: function (resolve) {
      require(['../pages/authsingle/Bank.vue'], resolve)
    }
  },
  // 提交成功
  '/authsingle/submit/success': {
    name: '提交成功',
    component: function (resolve) {
      require(['../pages/authsingle/SubmitSuccess.vue'], resolve)
    }
  },
  // 合同签约
  '/authsingle/contractsign': {
    name: '合同签约',
    component: function (resolve) {
      require(['../pages/authsingle/ContractSign.vue'], resolve)
    }
  }
}
