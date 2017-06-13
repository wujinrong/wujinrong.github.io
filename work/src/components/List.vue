<!--
  -- 贷上钱 web app 产品功能列表
  -- @author bigfact
  -->
<template>
  <section id="list">
    <div v-if="flag">
      <div>
        <h1 class="tac">产品切换</h1>
        <div class="links">
          <a class="row link" :href="applytype == 'multiple' ? './#!/list' : './?applytype=multiple#!/list'">切换到{{ applytype == 'multiple' ? '单期贷' : '分期贷' }}</a>
        </div>
      </div>
      <div v-for="i in list">
        <h1 class="tac">{{ i.title }}</h1>
        <div class="links">
          <a class="row link" v-for="value in i.data" v-link="value">{{ $index + 1 }}、{{ $key }}</a>
        </div>
      </div>
    </div>
    <div class="count" @click="count()"></div>
  </section>
</template>

<script>
  // 使用到的数据需要显示声明
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype'),
    list: [
      {
        title: '我要借款',
        data: {
          '我要借款 - 404 页面': '/',
          '授权委托协议': '/auth/protocol',
          '手机验证': '/auth/phone/verify',
        }
      },
      {
        title: '申请流程 - 单期贷',
        data: {
          '填写资料': '/authsingle',
          '个人信息': '/authsingle/personal',
          '身份信息': '/authsingle/identity',
          '工作信息': '/authsingle/job',
          '联系人信息': '/authsingle/relation',
          '授权芝麻信用': '/authsingle/sesame',
          '手机运营商': '/authsingle/contact',
          '手机运营商 - 忘记密码': '/authsingle/contact/forget',
          '审核结果、补充信息': '/authsingle/result',
          '银行卡信息': '/authsingle/bank',
          '提交成功': '/authsingle/submit/success',
          '合同签约': '/authsingle/contractsign',
        }
      },
      {
        title: '申请流程 - 分期贷',
        data: {
          '身份信息': '/auth/identity',
          '工作信息': '/auth/job',
          '联系信息': '/auth/relation',
          '其他认证': '/auth/other',
          '确认资料，申请借款': '/auth/confirm',
          '授权芝麻信用': '/auth/sesame',
          '审核结果（审核中、失败、成功）': '/auth/status',
          '银行卡信息': '/auth/bank',
          '手机运营商': '/auth/contact',
          '手机运营商 - 忘记密码': '/auth/contact/forget',
          '提交成功': '/auth/submit/success',
          '申请确认': '/auth/applyconfirm',
          '合同签约': '/auth/contractsign',
          '重新上传身份证照片': '/auth/idreupload',
        }
      },
      {
        title: '活动',
        data: {
          '推广落地页': '/active/promotion',
          '推广落地页 - 今日头条': '/active/promotion/jinritoutiao',
          '推广落地页 - 广点通': '/active/promotion/gdt',
          '推广落地页 - 样式1': '/active/promotion/page1',
          '推广落地页 - 样式2': '/active/promotion/page2',
          '推广落地页 - 样式3': '/active/promotion/page3',
          '推广落地页 - 样式4': '/active/promotion/page4',
          '推广落地页 - 样式5': '/active/promotion/page5',
          '推广落地页 - 样式6': '/active/promotion/page6',
          '推广落地页 - 样式7': '/active/promotion/page7',
          '推广落地页 - 样式8': '/active/promotion/page8',
          '推广落地页 - 样式9': '/active/promotion/page9',
          '推广落地页 - 样式10': '/active/promotion/page10',
          '推广落地页 - 陌陌': '/active/promotion/clone',
          '邀请好友 - 分享页': '/active/invite/share',
          '邀请好友 - 活动说明': '/active/invite/specification',
          '邀请好友 - 注册页，分享出去的落地页': '/active/invite/register',
          '邀请好友 - 注册成功': '/active/invite/success',
          '贷上钱 app 引导下载页面 - 应用宝': '/active/download',
          '贷上钱 app 引导下载页面 - 借点钱': '/active/download/jiedianqian',
          '贷上钱 app 引导下载页面 - 通用': '/active/download/common?type=origin',
          '贷上钱 app banner 活动 - 拒就赔': '/active/jujiupei',
          '贷上钱 app banner 活动 - 拒就赔2': '/active/jujiupei2',
          '贷上钱 app banner 活动 - 邀请返现': '/active/invite/cashback',
          '贷上钱 app banner 活动 - 免本免息': '/active/mianbenmianxi',
          '贷上钱 app banner 活动 - 520告白日': '/active/confession',
          '贷上钱 app banner 活动 - 端午节邀新': '/active/drogon',
          '贷上钱 app banner 活动 - 端午抽奖': '/active/lotteryDraw',
          '贷上钱 邀请好友-三倍返利': 'active/invite2/dsqShare',
        }
      },
      {
        title: '主动还款',
        data: {
          '我要还款': '/repay',
          '我要还款-新版': '/repay/repayment',
          '充值还款': '/repay/charge',
          '充值还款 - 外链主动还款': '/repay/chargewithcode',
          '账单详情 - 外链主动还款': '/repay/info',
          '还款结果': '/repay/status?status=success&amount=2000.00&message=' + decodeURI('很抱歉，由于银行系统繁忙，扣款失败，请稍后重试。'), // success, fail, doing
          '还款方式说明': '/repay/specification',
          '第三方还款 - 入口': '/repay/third/entry?channel=xxx&project_num=xxx&amount=100',
          '第三方还款 - 结果': '/repay/third/result',
          '申请延期': '/repay/delay',
        }
      },
      {
        title: '银行卡相关',
        data: {
          '添加银行卡': '/bank/add',
          '支持银行卡类别': '/bank/support',
          '更换收款银行卡': '/bank/change/recevie',
        }
      },
      {
        title: '登录注册',
        data: {
          '登录': '/user/login',
          '注册': '/user/register',
          '忘记密码': '/user/forget',
          '贷上钱服务协议': '/user/service-protocol',
        },
      },
      {
        title: '个人中心',
        data: {
          '个人中心': '/my',
          '进度查询': '/my/progress',
          '我的合同（没有合同）': '/my/contract',
          '我的合同 - 特殊处理': '/my/contract?from=fdd',
          '借款记录': '/my/record',
          '借款记录详情': '/my/record/detail',
          '我的银行卡': '/bank/list',
          '我的优惠券': '/my/coupon',
          '我的优惠券 - 使用说明': '/my/coupon/specification',
          '消息中心': '/my/message',
          '消息详情': '/my/message/detail?id=xxx',
          '我的客服': '/my/customer-service',
          '设置': '/my/setting',
          '余额明细': '/my/balance-detailed',
          '红包明细': '/my/redpacket-detailed',
          '余额提现': '/my/withdrawals-detailed',
          '提现详情': '/my/withdrawals-result',
          '常见问题': '/faq',
        },
      },
      {
        title: '与产品功能无关的测试页面',
        data: {
          '功能列表': '/pagelist',
          'demo': '/demo',
          '贷上钱 app js api 测试': '/example/dsqapitest',
        },
      },
    ],
    times: 0,
    tid: -1,
    flag: false,
  }

  export default {
    data() {
      $data.times = 0
      $data.flag = location.href.indexOf('.com') < 0
      return $data
    },
    methods: {
      count() {
        if ($data.times < 0) return
        $data.tid < 0 && ($data.tid = setInterval(function () {
          $data.times = 0
        }, 3000))
        $data.times++
        if ($data.times >= 9) {
          $data.times = -1
          clearInterval($data.tid)
          $data.flag = true
        }
      },
    },
    components: {},
  }

</script>

<style lang="scss">
  @import '../sass/_globals.scss';
  #list {
    h1 {
      color: #42b983;
      font-size: px2rem(20);
      padding-top: px2rem(20);
    }
    .links {
      padding: px2rem(20);
      >a {
        padding-left: px2rem(10);
      }
    }
    .count {
      display: inline-block;
      height: px2rem(50);
      width: px2rem(50);
    }
  }
</style>