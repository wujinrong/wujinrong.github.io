<!--
  -- 所有状态见 steps 数组
  -- 对应状态的样式名：gray （已经完成项目）, black （还未完成的项目）, red （失败的项目）, yellow （审核中的项目）, green （审核成功的项目）
	-- 各项目对应的链接（暂无链接）：发起借款申请，提交资料，资料审核，银行卡验证，合同签约，放款
  -->
<template>
  <section class="my-progress tac" v-show="ready">
    <div class="tabs fs16">
      <div class="tab tab0" :class="[active_tab == 'single' && 'active', !multiple.show && 'w100']" @click="swichTab('single')">单期贷</div>
      <div class="tab tab1" :class="active_tab == 'multiple' && 'active'" v-show="multiple.show" @click="swichTab('multiple')">分期贷</div>
    </div>
    <!--单期贷-->
    <div class="card-wrap" :class="active_tab != 'single' && multiple.show && 'card-wrap-left'">
      <!--进度框-->
      <div class="progress-wrap fs15 bg-white">
        <div class="item" v-for="i in single.states">
          <div :class="'st-' + i.active">
            <i class="circle"></i>
            <p>{{ i.title }}</p>
          </div>
        </div>
      </div>
      <!--状态内容框-->
      <div class="content-wrap bg-white">
        <!--处于放款中和已放款状态-->
        <div class="content-2" v-if="showWrap(single.step, 2)">
          <img class="content-icon" :src="single.current.image && './static/img/my/progress/' + single.current.image + '.png'" alt="" />
          <p class="content-title fs20">{{ single.current.title }}</p>
          <p class="c-placeholder fs15">{{ single.current.hint }}</p>
          <img class="qrcode" src="../../../static/img/my/progress/qrcode.png" alt="">
          <div class="c-placeholder fs12">
            <p>微信公众号：贷上钱（dsqmxkj）</p>
            <p>更多活动／最新资讯／新功能发布</p>
          </div>
        </div>
        <!--其他状态-->
        <div class="content-3" v-if="showWrap(single.step, 3)">
          <img class="content-icon" :src="single.current.image && './static/img/my/progress/' + single.current.image + '.png'" alt="" />
          <p class="content-title fs20">{{ single.current.title }}</p>
          <p class="c-placeholder fs15">{{ single.current.hint }}</p>
          <a class="btn content-link" @click="goto(single.current.link, single.current.viewName, 'single')" v-show="single.current.link && single.current.button">{{ single.current.button }}</a>
        </div>
      </div>
    </div>
    <!--分期贷-->
    <div class="card-wrap" :class="active_tab != 'multiple' && 'card-wrap-right'" v-show="multiple.show">
      <!--进度框-->
      <div class="progress-wrap fs15 bg-white">
        <div class="item" v-for="i in multiple.states">
          <div :class="'st-' + i.active">
            <i class="circle"></i>
            <p>{{ i.title }}</p>
          </div>
        </div>
      </div>
      <!--状态内容框-->
      <div class="content-wrap bg-white">
        <!--处于放款中和已放款状态-->
        <div class="content-2" v-if="showWrap(multiple.step, 2)">
          <img class="content-icon" :src="multiple.current.image && './static/img/my/progress/' + multiple.current.image + '.png'" alt="" />
          <p class="content-title fs20">{{ multiple.current.title }}</p>
          <p class="c-placeholder fs15">{{ multiple.current.hint }}</p>
          <img class="qrcode" src="../../../static/img/my/progress/qrcode.png" alt="">
          <div class="c-placeholder fs12">
            <p>微信公众号：贷上钱（dsqmxkj）</p>
            <p>更多活动／最新资讯／新功能发布</p>
          </div>
        </div>
        <!--其他状态-->
        <div class="content-3" v-if="showWrap(multiple.step, 3)">
          <img class="content-icon" :src="multiple.current.image && './static/img/my/progress/' + multiple.current.image + '.png'" alt="" />
          <p class="content-title fs20">{{ multiple.current.title }}</p>
          <p class="c-placeholder fs15">{{ multiple.current.hint }}</p>
          <a class="btn content-link" @click="goto(multiple.current.link, multiple.current.viewName, 'multiple')" v-show="multiple.current.link && multiple.current.button">{{ multiple.current.button }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    // 进度状态数组
    steps: [
      // 0
      {
        title: '您当前没有借款申请',
        hint: '',
        image: 'logo-no',
        button: '现在去借款',
        link: '/',
        viewName: 'index',
      },
      // 1
      {
        title: '提交资料',
        hint: '请完成资料提交以便我们审核',
        image: 'logo-pre-upload',
        button: '填写资料',
        link: '/auth/identity',
        viewName: 'authIdentity',
      },
      // 2
      {
        title: '资料审核中',
        hint: '请稍后至此查看审核结果',
        image: 'logo-verify',
        button: '',
        link: '',
      },
      // 3
      {
        title: '资料被退回',
        hint: '由于您的身份证照上传有误，当前申请已经被退回，请重新上传身份证照片',
        image: 'logo-return',
        button: '重新上传身份证照',
        link: '/auth/idreupload',
      },
      // 4
      {
        title: '未通过审核',
        hint: '',
        image: 'logo-reject',
        button: '',
        link: '',
      },
      // 5
      {
        title: '合同签约',
        hint: '请您完成合同签约以便我们放款',
        image: 'logo-signed',
        button: '去签约合同',
        // link: '/my/contract',
        link: '/auth/contractsign',
      },
      // 6
      {
        title: '已放款',
        hint: '请留意到账款项',
        image: 'logo-complete',
        button: '',
        link: '',
      },
      // 7
      {
        title: '放款失败',
        hint: '请更换有效收款银行卡',
        image: 'logo-pay-fail',
        button: '更换银行卡',
        // 页面需要修改
        link: '/bank/change/recevie',
      },
      // 8 长时间未补充信息，系统自动取消
      {
        title: '借贷申请已取消',
        hint: '',
        image: 'logo-cancel',
      },
      // 9 长时间未签约，系统自动取消
      {
        title: '借贷申请已取消',
        hint: '',
        image: 'logo-cancel',
      },
      // 10 用户主动取消借款
      {
        title: '借贷申请已取消',
        hint: '',
        image: 'logo-cancel',
      },
      // 11 放款中
      {
        title: '放款中',
        hint: '我们将尽快完成放款，请耐心等待',
        image: 'logo-pay-doing',
      },
      // 12 申请确认 - 分期贷状态
      {
        title: '申请确认',
        hint: '还差一步，请您尽快补充信息提交审核！',
        image: 'logo-apply-confirm',
        button: '去确认',
        link: '/auth/applyconfirm',
      }
    ],
    // 当前激活的 tab
    active_tab: 'single',
    // 单期贷
    single: {
      states: [],
      step: 0,
      current: {
        title: '',
        hint: '',
        image: '',
        button: '',
        link: ''
      }
    },
    // 分期贷
    multiple: {
      show: false,
      states: [],
      step: 0,
      current: {
        title: '',
        hint: '',
        image: '',
        button: '',
        link: ''
      }
    },
    ready: false
  }
  export default {
    data() {
      var _this = this
      /**
       * 获取当前状态
       * http://git.fond.io/b/paydayloan/wikis/step-v3
       */
      ajax.get('/v3/verify/status')
        .then(function (xhr, res) {
          if (res.code == 0) {

            // 当前激活 tab
            $data.active_tab = res.data.active_tab

            // 单期贷数据
            var singleData = res.data.single || ''
            if (singleData) {
              
              // // testdata
              // singleData.step = 12

              $data.single.states = singleData.states
              var step = $data.single.step = singleData.step
              $data.single.current = $data.steps[step]
              if (step == 1) $data.single.current.link = singleData.url
              // 当 step 等于 8, 9, 10 时，使用数据返回的提示信息
              if ((step >= 8 && step <= 10) || step == 4) $data.single.current.hint = singleData.desc
              // 当 step 等于 0 且不在 app 中时，不显示按钮
              if (step == 0 && !sysinfo.dsq.isapp()) $data.single.current.link = ''
            }

            // 分期贷数据
            var multipleData = res.data.multiple || ''
            if (multipleData) {

              // // testdata
              // multipleData.step = 12

              $data.multiple.show = true
              $data.multiple.states = multipleData.states
              var step = $data.multiple.step = multipleData.step
              $data.multiple.current = $data.steps[step]
              if (step == 1) $data.multiple.current.link = multipleData.url
              // 当 step 等于 8, 9, 10 时，使用数据返回的提示信息
              if ((step >= 8 && step <= 10) || step == 4) $data.multiple.current.hint = multipleData.desc
              // 当 step 等于 0 且不在 app 中时，不显示按钮
              if (step == 0 && !sysinfo.dsq.isapp()) $data.multiple.current.link = ''
            }

            // 数据加载完成
            $data.ready = true
          } else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * @param {String} type 
       */
      swichTab(type) {
        $data.active_tab = type
      },
      /**
       * 根据类型和当前状态判断是否显示当前模块
       * @param {Number} step 当前状态 step
       * @param {Number} type 显示类型
       */
      showWrap(step, type) {
        // 显示二维码
        if (type == 2 && [6, 11].indexOf(step) >= 0) return true
        // 普通状态
        if (type == 3 && ([0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 12].indexOf(step) >= 0)) return true
        return false
      },
      /**
       * 页面跳转
       * @param {String} link      跳转h5页面链接
       * @param {String} viewName  对应的app原生页面名字
       * @param {String} applytype 申请产品类型
       */
      goto(link, viewName, applytype) {
        if (viewName && sysinfo.dsq.getVersion() >= 104) {
          sysinfo.dsq.openView(viewName)
        } else {
          // link = !!link.indexOf('applyconfirm') ? link + '?from=' + this.$route.path : link
          if (applytype == 'multiple') location.href = location.origin + location.pathname + '?applytype=multiple#!' + link
          else this.$router.go(link + '?from=' + this.$route.path)
        }
      }
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-progress {
    height: 100%;
    position: relative;
    overflow-x: hidden;
    /*切换 tab*/
    .tabs {
      position: relative;
      height: px2rem(57);
      margin: 0 px2rem(12);
      padding: px2rem(12) 0;
    }
    .tab {
      background: #FFF;
      border: 1px solid $main-color;
      border-radius: px2rem(5);
      color: $main-color;
      height: px2rem(45);
      line-height: px2rem(45);
      position: absolute;
      width: 51%;
      transition: background ease .5s;
      z-index: 1;
      &.w100 {
        width: 100%;
      }
      &.active {
        background: $main-color;
        color: #FFF;
        z-index: 2;
      }
    }
    .tab0 {
      left: 0;
    }
    .tab1 {
      right: 0;
    }
    /*tab 切换卡片容器*/
    .card-wrap {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      min-height: 100%;
      width: 100%;
      padding: px2rem(70) px2rem(12) px2rem(12);
      transition: transform .5s ease 0s;
    }
    .card-wrap-left {
      transform: translatex(-100%);
    }
    .card-wrap-right {
      transform: translatex(100%);
    }
    .progress-wrap {
      border-radius: px2rem(6);
      margin-bottom: px2rem(12);
      padding: px2rem(20) 0;
    }
    .item {
      position: relative;
      width: 25%;
      display: inline-block;
      &:last-of-type::after {
        display: none;
      }
      &::after {
        content: '';
        display: block;
        width: px2rem(24);
        height: 2px;
        background: #DBDBDB;
        position: absolute;
        top: 23%;
        right: px2rem(-12);
      }
    }
    $circle-width: px2rem(9);
    .circle {
      display: inline-block;
      height: $circle-width;
      width: $circle-width;
      border-radius: $circle-width;
      border: px2rem(4) solid;
      position: relative;
      top: px2rem(4);
      margin-bottom: px2rem(10);
    }
    .st-0 {
      color: #ADADAD;
    }
    .st-1 {
      color: #69C959;
      p {
        color: $black !important;
      }
    }
    .st-2 {
      color: #69C959;
      .circle {
        width: px2rem(9);
        height: px2rem(14);
        display: inline-block;
        border-radius: 0;
        border: none;
        border-bottom: px2rem(4) solid #69C959;
        border-right: px2rem(4) solid #69C959;
        position: relative;
        top: 0;
        margin-bottom: px2rem(10);
        transform: rotateZ(45deg);
      }
    }
    .st-3 {
      color: $red;
      p {
        color: $black !important;
      }
    }
    /*状态内容框*/
    .content-wrap {
      border-radius: px2rem(6);
      box-sizing: border-box;
      min-height: px2rem(400);
      padding-bottom: px2rem(60);
    }
    /*内容样式二*/
    .content-2 {
      padding: px2rem(20) px2rem(25) 0;
    }
    /*内容样式三*/
    .content-3 {
      position: relative;
      padding: px2rem(80) px2rem(25) 0;
    }
    /*内容图标*/
    .content-icon {
      height: px2rem(80);
    }
    /*内容标题*/
    .content-title {
      margin: px2rem(7) 0;
    }
    /*内容链接*/
    .content-link {
      margin-top: px2rem(50);
    }
    /*二维码样式*/
    .qrcode {
      margin-top: px2rem(7);
      width: px2rem(130);
    }
  }
</style>