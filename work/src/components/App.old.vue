<template>
  <section id="index" class="container">
    <!-- 头部信息 -->
    <div class="top-tab clearfix fs14">
      <div class="fl">
        <p class="fs40">￥{{ money_get }}</p>
        <p>到账金额</p>
      </div>
      <div class="tar fr">
        <p class="fs18">{{ slide[1].item.product_period_count }}天</p>
        <p>借款期限</p>
      </div>
      <div class="tar fr">
        <p class="fs18">￥{{ money_pay }}</p>
        <p>服务费用</p>
      </div>
    </div>
    <!-- 金额滑动选择 -->
    <div class="info-15 fs20 tac">15分钟极速到账</div>
    <div class="slide-wrap">
      <div class="slide-value tac fs22" v-bind:style="{left: slide[0].width}">￥{{ slide[0].value }}</div>
      <div class="slide-bar bg-light">
        <div class="scale-mark">
          <div class="active"></div>
          <div class="fr" v-bind:class="slide[0].value == slide[0].max && 'active'"></div>
        </div>
        <div class="inner" v-bind:style="{width: slide[0].width}"></div>
      </div>
      <div class="slide-btn" v-bind:style="{left: slide[0].width}"></div>
      <div class="slide-handle" v-on:touchstart="start($event, 0)" v-on:touchmove="move($event, 0)" v-on:click="start($event, 0)"></div>
      <div class="slide-num c-gray">
        <span>{{ slide[0].min }}</span>
        <span class="fr">{{ slide[0].max }}</span>
      </div>
    </div>
    <!-- 天数选择 -->
    <div class="day-tab clearfix c-gray fs15 tac">
      <div v-for="i in product" v-bind:class="slide[1].value == i.product_period_count && 'active'" v-bind:style="{ width: 100 / product.length + '%' }"
        v-on:touchstart="daytouch($event, i)" v-on:click="daytouch($event, i)">
        <span>{{ i.product_period_count }}天</span>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="btn-wrap">
      <d-button v-bind:button.sync="button" v-bind:class="slide[1].item.product_id < 0 && 'disabled'"></d-button>
    </div>
    <!-- 授权协议 -->
    <!--<div class="protocol fs14 tac" v-if="!isIosPaydayApp">点击“我要借款”即同意<a v-link="'/auth/protocol'">《授权委托协议》</a></div>-->
    <div class="protocol fs14 tac">点击“我要借款”即同意<a v-link="'/auth/protocol'">《授权委托协议》</a></div>
    <!--页脚文案-->
    <d-icp></d-icp>
    <!-- 页脚菜单 -->
    <d-menu v-bind:active="'index'"></d-menu>
  </section>
</template>

<script>
  import DMenu from './common/DMenu.vue'

  import DButton from './directives/DButton.vue'
  
  import DICP from './common/DICP.vue'

  var $data = {
    slide: [
      {
        width: '0%',
        value: 500,
        value0: 500,
        max: 2000,
        min: 500,
        step: 100,
      },
      {
        value: 0,
        item: {
          product_id: -1,
          product_interest_rate: 0,
          product_period_count: 0,
        },
      },
    ],
    product: { },
    money_get: 0,
    money_pay: 0,
    // 用于判断是否显示借款协议
    isIosPaydayApp: true,
    button: {
      name: '我要借款',
      class: 'btn',
      click: '',
    },
    // 用于判断是否登录
    isLogin: 0,
  }

  export default {
    data() {
      $data.isIosPaydayApp = sysinfo.isIOS && sysinfo.dsq.isapp()
      var _this = this
      var router = _this.$router
      var route = _this.$route
      $data.button.click = _this.submit
      // 获取初始化数据
      ajax.get('/v3/action/index')
        .then(function(xhr, res) {
          if(res.code == 0) {
            // 登录状态
            $data.isLogin = res.data.isLogin
            // 初始化金额
            $data.slide[0].min = res.data.money.min
            $data.slide[0].max = res.data.money.max
            $data.slide[0].step = res.data.money.step
            $data.slide[0].value = parseInt(res.data.money.apply_amount)
            $data.slide[0].value0 = $data.slide[0].value
            $data.slide[0].width = ($data.slide[0].value - $data.slide[0].min) / ($data.slide[0].max - $data.slide[0].min) * 100 + '%'
            // 初始化天数
            $data.product = res.data.product
            // 设置已经设置的天数
            for(var j = 0; j < res.data.product.length; j++) {
              var i = res.data.product[j]
              if(i.flag) {
                $data.slide[1].value = i.product_period_count
                $data.slide[1].item = i
                break
              }
            }
          }
          // // 用户未登录
          // else if(res.code == 101003) {
          //   sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : router.replace('/user/login?ref=' + route.path)
          // }
          // 其他报错信息
          else {
            layer.warning(res.message)
          }
          // 计算显示金额
          _this.computeMoney()
        })
      return $data
    },
    ready() { },
    methods: {
      // 滑动开始，金额 slidebar 点击
      start(e, index) {
        e.preventDefault()
        var bar = document.querySelectorAll('.slide-bar')[index]
        var x = ((e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX || e.pageX) - (window.innerWidth - bar.clientWidth) / 2) / bar.clientWidth
        x > 1 && (x = 1)
        x < 0 && (x = 0)
        $data.slide[index].value = Math.floor(($data.slide[index].max - $data.slide[index].min) * x) + $data.slide[index].min
        $data.slide[index].width = x * 100 + '%'
        index == 0 && this.end0()
      },
      // 滑动中
      move(e, index) {
        e.preventDefault()
        e.stopPropagation()
        var bar = document.querySelectorAll('.slide-bar')[index]
        var x = ((e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX || e.pageX) - (window.innerWidth - bar.clientWidth) / 2) / bar.clientWidth
        x > 1 && (x = 1)
        x < 0 && (x = 0)
        $data.slide[index].value = Math.floor(($data.slide[index].max - $data.slide[index].min) * x) + $data.slide[index].min
        $data.slide[index].width = x * 100 + '%'
        this.end0()
      },
      // 金额滑动结束
      end0() {
        var tmp = Math.round($data.slide[0].value / $data.slide[0].step) * $data.slide[0].step
        $data.slide[0].width = (tmp - $data.slide[0].min) / ($data.slide[0].max - $data.slide[0].min) * 100 + '%'
        $data.slide[0].value = tmp
        $data.slide[0].value0 = tmp
        this.computeMoney()
      },
      // 天数点击
      daytouch(e, item) {
        e.preventDefault()
        $data.slide[1].value = item.product_period_count
        $data.slide[1].item = item
        this.computeMoney()
      },
      // 计算金额
      computeMoney() {
        var rate = $data.slide[1].item.product_interest_rate / 100
        var value = $data.slide[0].value0
        var get = Math.round((1 - rate) * value * 1000) / 1000 + ''
        var pay = Math.round(rate * value * 1000) / 1000 + ''
        get.indexOf('.') >= 0 && get.length - get.indexOf('.') < 3 && (get += '0')
        pay.indexOf('.') >= 0 && pay.length - pay.indexOf('.') < 3 && (pay += '0')
        get.indexOf('.') < 0 && (get += '.00')
        pay.indexOf('.') < 0 && (pay += '.00')
        $data.money_get = get
        $data.money_pay = pay
      },
      // 提交数据
      submit() {
        if($data.slide[1].item.product_id < 0) return
        if(!$data.isLogin) {
          sysinfo.dsq.isapp() ? sysinfo.dsq.logout() : this.$router.replace('/user/login?ref=' + this.$route.path)
          return
        }
        // 跳转下载 APP
        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan'
        return
        var data = {
          apply_amount: $data.slide[0].value,
          apply_product_id: $data.slide[1].item.product_id,
        }
        var lid = layer.loading(false)
        ajax.post('/v3/apply/save', data)
          .then(function(xhr, res) {
            // 0，保存成功，判断是否用户是否验证过手机号码
            // 2，申请被退回，但可重新填写资料的情况，（重新上传身份证图片）
            res.code == 0 && (res.data.tel ? location.href = '#!/auth/identity' : location.href = '#!/auth/phone/verify')
            res.code == 2 && (location.href = '#!/auth/idreupload')
            res.code != 0 && layer.warning(res.message)
          })
          .complete(function() {
            layer.close(lid)
          })
      },
    },
    components: {
      DMenu: DMenu,
      DButton: DButton,
      DIcp: DICP,
    },
  }
</script>

<style lang="scss">
  @import '../sass/_globals.scss';
  #index {
    -webkit-user-select: none;
    position: relative;
    /**
     * 顶部信息
     */
    .top-tab {
      padding: px2rem(45) px2rem(15) px2rem(25);
      line-height: px2rem(30);
      border-bottom: 1px solid $rice;
      > div {
        p {
          &:last-of-type {
            color: #868686;
          }
        }
        &:first-of-type {
          p:first-of-type {
            position: relative;
            top: px2rem(-8);
            left: px2rem(-10);
            color: #FF6262;
          }
        }
        &:last-of-type {
          padding-right: px2rem(8);
        }
      }
    }
    /**
     * 15 分钟到账提示
     */
    .info-15 {
      padding: px2rem(25) 0;
      color: #ADADAD;
    }
    /**
     * 滑动条容器
     */
    .slide-wrap {
      position: relative;
      padding: 0 px2rem(60) 0 px2rem(50);
    }
    /**
     * 滑动条变动值
     */
    $bar_color: #FFC059;
    .slide-value {
      position: relative;
      top: px2rem(-8);
      display: inline-block;
      color: $bar_color;
      min-width: px2rem(50);
      transform: translateX(px2rem(-35));
    }
    /**
     * 滑动进度条
     */
    $bar_height: px2rem(8);
    .slide-bar {
      position: relative;
      height: $bar_height;
      .inner {
        position: absolute;
        height: $bar_height;
        background: $bar_color;
        z-index: 10;
      }
    }
    /*
     * 滑动条刻度
     */
    .scale-mark {
      position: absolute;
      top: px2rem(-3);
      left: 0;
      width: 100%;
      z-index: 5;
      > div {
        height: px2rem(10);
        border-left: 1px solid $light;
        box-sizing: border-box;
        &:after {
          content: "";
          display: block;
          position: relative;
          left: px2rem(-7);
          background: $light;
          height: 14px;
          width: 14px;
          border-radius: 14px;
        }
        &.active:after {
          background: $bar_color;
        }
        &:last-of-type {
          position: absolute;
          top: 0;
          right: px2rem(-14);
        }
      }
    }
    /**
     * 滑动按钮
     */
    .slide-btn {
      position: relative;
      top: px2rem(4);
      height: px2rem(30);
      width: px2rem(30);
      background: url('../assets/slide.png') no-repeat;
      background-size: contain;
      transform: translateX(px2rem(-10.5));
    }
    /**
     * 滑动事件接受框
     */
    .slide-handle {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
    }
    /**
     * 滑动条两头的数值
     */
    .slide-num {
      position: absolute;
      left: 0;
      width: 100%;
      top: px2rem(25);
      padding: 0 px2rem(15);
      box-sizing: border-box;
    }
    /**
     * 天数选择按钮组
     */
    .day-tab {
      padding: px2rem(25) 0 px2rem(57);
      margin: px2rem(25) px2rem(15) 0 px2rem(15);
      border-top: 1px solid $rice;
      > div {
        float: left;
        box-sizing: border-box;
        padding: 0 px2rem(5);
        &:first-of-type {
          padding-left: 0;
        }
        &:last-of-type {
          padding-right: 0;
        }
        > span {
          display: inline-block;
          border: 1px solid;
          border-radius: px2rem(70);
          width: 100%;
          height: px2rem(35);
          line-height: px2rem(35);
        }
        &.active {
          > span {
            color: #FFF;
            background: $bar_color;
            border: 1px solid $bar_color;
            font-size: px2rem(17);
          }
        }
      }
    }
    /**
     * 协议链接
     */
    .protocol {
      padding-top: px2rem(15);
      color: #4A4A4A;
      a {
        color: #4A90E2;
      }
    }
    /*页脚icp文案样式修改*/
    .d-icp {
      position: relative;
    }
  }
</style>
