/**
 * 活动路由配置
 * @author bigfact
 * @date 2017.02.28
 */

export default {
  // 推广落地页
  '/active/promotion': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Index.vue'], resolve)
    }
  },
  // 广点通落地页
  '/active/promotion/gdt': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/BannerGDT.vue'], resolve)
    }
  },
  // 推广落地页 - 陌陌
  '/active/promotion/clone': {
    // name: '融360',
    component: function (resolve) {
      require(['../components/active/promotion/Clone.vue'], resolve)
    }
  },
  // 推广落地页
  '/active/promotion/page1': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page1.vue'], resolve)
    }
  },
  // 推广落地页
  '/active/promotion/page2': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page2.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page3': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page3.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page4': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page4.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page5': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page5.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page6': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page6.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page7': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page7.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page8': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page8.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page9': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page9.vue'], resolve)
    }
  },
  // // 推广落地页
  '/active/promotion/page10': {
    name: '贷上钱',
    component: function (resolve) {
      require(['../components/active/promotion/Page10.vue'], resolve)
    }
  },
  // 推广落地页 - 今日头条
  '/active/promotion/jinritoutiao': {
    name: '贷上钱    ',
    component: function (resolve) {
      require(['../components/active/promotion/JinRiTouTiao.vue'], resolve)
    }
  },
  // 邀请好友分享页面
  '/active/invite/share': {
    name: '邀请好友',
    component: function (resolve) {
      require(['../components/active/invite/Share.vue'], resolve)
    }
  },
  // 邀请好友活动说明
  '/active/invite/specification': {
    name: '活动说明',
    component: function (resolve) {
      require(['../components/active/invite/Specification.vue'], resolve)
    }
  },
  // 邀请好友注册页面，分享出去的落地页
  '/active/invite/register': {
    name: '注册领取20元代金券',
    component: function (resolve) {
      require(['../components/active/invite/Register.vue'], resolve)
    }
  },
  // 邀请好友注册，注册成功页面
  '/active/invite/success': {
    name: '注册领取20元代金券',
    component: function (resolve) {
      require(['../components/active/invite/Success.vue'], resolve)
    }
  },
  // 贷上钱 app 引导下载页面
  '/active/download': {
    component: function (resolve) {
      require(['../pages/active/download/Index.vue'], resolve)
    }
  },
  // 贷上钱 app 引导下载页面 - 借点钱
  '/active/download/jiedianqian': {
    component: function (resolve) {
      require(['../pages/active/download/JieDianQian.vue'], resolve)
    }
  },
  // 贷上钱 app 引导下载页面 - 通用
  '/active/download/common': {
    component: function (resolve) {
      require(['../pages/active/download/Common.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 拒就赔
  '/active/jujiupei': {
    component: function (resolve) {
      require(['../pages/active/jujiupei/Index.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 拒就赔2
  '/active/jujiupei2': {
    component: function (resolve) {
      require(['../pages/active/jujiupei2/index.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 520表白日
  '/active/confession': {
    component: function (resolve) {
      require(['../pages/active/confession/index.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 端午节邀新排行
  '/active/drogon': {
    component: function (resolve) {
      require(['../pages/active/drogon/index.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 邀请返现
  '/active/invite/cashback': {
    component: function (resolve) {
      require(['../pages/active/invite/Cashback.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 邀请返现
  '/active/mianbenmianxi': {
    component: function (resolve) {
      require(['../pages/active/mianbenmianxi/index.vue'], resolve)
    }
  },
  // 贷上钱 app banner 活动 - 端午抽奖
  '/active/lotteryDraw': {
    component: function (resolve) {
      require(['../pages/active/lotteryDraw/index.vue'], resolve)
    }
  },
  // 贷上钱 邀请好友三倍返利
  '/active/invite2/dsqShare': {
    component: function (resolve) {
      require(['../pages/active/invite2/DsqShare.vue'], resolve)
    }
  },
}
