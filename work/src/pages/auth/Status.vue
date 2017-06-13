<!--
  -- 初审审核结果
  -- @author bigfact
  -->
<template>
  <section class="auth-status container tac fs15">
    <!-- 审核中 -->
    <div class="doing" v-if="status == '3'">
      <div class="icon"></div>
      <div class="progress">
        <div class="inner" :class="innerClass"></div>
      </div>
      <div class="c-gray">请不要走开，系统正在审核，预计2分钟</div>
    </div>
    <!-- 审核成功 -->
    <div class="success" v-if="status == '1'">
      <div class="icon"></div>
      <div class="c-gray fs20">初审通过！</div>
      <div class="c-light">
        <p>您的资料初审已通过，</p>
        <p>请按照提示完善资料。</p>
      </div>
      <div class="btn-wrap">
        <a v-link="'/auth/bank'" class="btn outline">补充信息</a>
      </div>
    </div>
    <!-- 审核失败 -->
    <div class="fail" v-if="status == '2'">
      <div class="icon"></div>
      <div class="c-gray fs20">非常抱歉，您的借款申请未通过审核</div>
      <br>
      <div class="c-gray" v-show="product_type == 'multiple'">您可去申请单期贷哦！</div>
      <br>
      <br>
      <br>
      <div>
        <a class="btn" href="https://m.rongyilai01.com/#/generalization?ref=daishangqian" @click="goto3()">别灰心，试试这个？</a>
      </div>
      <!--<div class="btn-wrap">
        <a @click="goto('/', 'index')" class="btn outline">返回主页</a>
      </div>-->
    </div>
    <!--系统维护中-->
    <div class="maintenance" v-if="status == 4">
      <div class="icon"></div>
      <div class="c-gray">
        <p>11月21日22:00~11月22日6:00，进行系统维护。</p>
        <p>请在22日6:00之后登录贷上钱APP查看审核结果。</p>
      </div>
      <div class="btn-wrap">
        <a @click="goto('/', 'index')" class="btn outline">返回主页</a>
      </div>
    </div>
  </section>
</template>
<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    title: '审核结果',
    status: 0,          // 1 表示通过 2 表示拒绝 3 表示等待 4 表示系统维护中
    product_type: '',   // 申请产品类型 single multiple
    tid: -1,
    time: 30,
    // time: 1,
    innerClass: '',
    amount: 0,
    message: ''
  }
  export default {
    data() {
      layer.close()
      this.check()
      $data.tid = setInterval(this.check, 1000 * $data.time)
      return $data
    },
    methods: {
      // 状态检查
      check() {
        var _this = this
        /**
         * http://git.fond.io/b/paydayloan/wikis/status-v2
         */
        ajax.get('/v3/apply/step', {
          product_type: $data.applytype
        }).then(function (xhr, res) {

          // // test data
          // res.code = 0
          // res.data.status = 2
          // res.data.product_type = 'multiple'

          if (res.code == 0) {
            $data.amount = res.data.amount
            $data.product_type = res.data.product_type
            _this.change(res.data.status)
          } else {
            clearInterval($data.tid)
            layer.warning(res.message)
          }
          // console.log('res.data.status', res.data.status)
        })
      },
      // 状态改变
      change(status) {
        var _this = this
        // 如果状态不处于等待中，则加速进度条，进度条满格时，改变页面状态
        $data.status = 3
        // 进度条初始化
        !$data.innerClass && _this.$nextTick(function () {
          var tid = setTimeout(function () {
            $data.innerClass = 'w-90'
            clearTimeout(tid)
          }, 300)
        })
        if (status != 3) {
          // 清除数据请求定时器
          clearInterval($data.tid)
          // 延时加速进度条
          var tid1 = setTimeout(function () {
            $data.innerClass = 'w-90 active'
            clearTimeout(tid1)
          }, 600)
          // 延时改变页面状态
          var tid2 = setTimeout(function () {
            $data.status = status
            clearTimeout(tid2)
          }, 2000)
        }
      },
      /**
       * 页面跳转
       * @param {String} link 跳转h5页面链接
       * @param {String} viewName 对应的app原生页面名字
       */
      goto(link, viewName) {
        if (viewName && sysinfo.dsq.getVersion() >= 104) {
          sysinfo.dsq.openView(viewName)
        } else {
          this.$router.go(link)
        }
      },
      /**
       * 跳转到第三方链接点击统计
       */
      goto3() {
        /**
         * http://git.fond.io/b/paydayloan/wikis/v3/statistic-index
         */
        ajax.post('/v3/statistic/index', {
          action: 'user_diversion'
        })
      }
    },
    destroyed() {
      clearInterval($data.tid)
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .auth-status {
    $bg-size: px2rem(110);
    padding: px2rem(70) 0 0;
    .icon {
      padding: px2rem(60) 0;
      margin-bottom: px2rem(30);
      background: url('../../assets/auth/status/doing.png') no-repeat 50%;
      background-size: $bg-size;
    }
    .progress {
      height: 6px;
      width: 80%;
      border-radius: 6px;
      background: #DBDBDB;
      margin: auto;
      margin-bottom: px2rem(10);
      .inner {
        border-radius: px2rem(5);
        height: 100%;
        width: 0;
        background: $main-color;
        transition: width cubic-bezier(.02, 1, .61, .93) 120s;
      }
      .w-90 {
        width: 90%;
      }
      .active {
        transition: width ease 1.5s;
        width: 100%;
      }
    }
    .success,
    .maintenance {
      .icon {
        background: url('../../assets/auth/status/success.png') no-repeat 50%;
        background-size: $bg-size;
      }
    }
    .fail {
      .icon {
        background: url('../../assets/auth/status/fail.png') no-repeat 50%;
        background-size: $bg-size;
        margin-bottom: px2rem(15);
      }
    }
    .btn {
      margin-top: px2rem(40);
      text-align: center;
      width: 45%;
      padding-right: px2rem(25);
      padding-left: px2rem(25);
    }
  }
</style>