<!--
  -- 填写资料
  -- @description 基本资料入口汇总，可查看各类资料的状态，各类资料必须按顺序填写
  -- @author bigfact
  -- @date 2017.05.18
  -->
<template>
  <section class="authsingle fs18">
    <!--单期贷、分期贷信息-->
    <div class="title-wrap fs15">
      <span class="title">基础认证</span>
      <span class="fr c-placeholder">必须完成以下所有认证信息才能借款</span>
    </div>
    <div class="form bg-white">
      <div class="row line"></div>
      <div class="row link" @click="goto('/authsingle/personal', 0)">
        <span>{{ individual.name }}</span>
        <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(individual.status)">{{ individual.status === 0 ? '未填写' : individual.status === 1 ? '已填写' : '已失效' }}</span>
      </div>
      <div class="row link" @click="goto('/authsingle/sesame', 1)">
        <span>{{ zhima.name }}</span>
        <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(zhima.status)">{{ getNameByStatus(zhima.status) }}</span>
      </div>
      <div class="row link" @click="goto('/authsingle/contact', 2)">
        <span>{{ phone.name }}</span>
        <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(phone.status)">{{ getNameByStatus(phone.status) }}</span>
      </div>
    </div>
    <!--分期贷信息-->
    <!--<template v-if="true">
      <div class="title-wrap fs15">
        <span class="title">高级认证</span>
      </div>
      <div class="form bg-white">
        <div class="row line"></div>
        <div class="row link" @click="goto('/authsingle/other', 3)">
          <span>公积金认证</span>
          <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(individual)">{{ getNameByStatus(individual) }}</span>
        </div>
      </div>
    </template>-->
    <!--提交按钮-->
    <div class="btn-wrap">
      <button class="btn fs20" v-submit="{cb: submit}">确认申请</button>
    </div>
    <div class="fs14 c-placeholder tac">点击“确认申请”即同意<span class="c-link" v-link="'/auth/protocol?name=' + username">《授权委托协议》</span></div>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // 个人信息状态：0 未填写 ; 1 已填写; 2 已失效
    individual: {
      status: 0,
      name: '个人信息'
    },
    // 芝麻认证状态：0 未认证 ; 1 已认证; 2 已失效
    zhima: {
      status: 0,
      name: '芝麻认证'
    },
    // 手机认证状态：0 未认证 ; 1 已认证; 2 已失效
    phone: {
      status: 0,
      name: '手机认证'
    },
    // 用户名
    username: '',
    code: '',
    message: '数据加载中...'
  }

  export default {
    data() {
      layer.close()
      /**
       * https://git.fond.io/b/paydayloan/wikis/v3/individual/menu
       * 获取数据
       */
      ajax.get('/v3/individual/menu')
        .then((xhr, res) => {
          $data.code = res.code
          if (res.code === 0) {
            $data.individual.status = res.data.individual
            $data.zhima.status = res.data.zhima
            $data.phone.status = res.data.phone
            $data.username = encodeURI(res.data.name || '')
          } else {
            $data.message = res.message
            layer.warning(res.message)
          }
          // console.log($data)
        })
      return $data
    },
    methods: {
      /**
       * 根据状态获取样式名
       * @param {Number} status 状态， 0 未认证 ; 1 已认证; 2 已失效
       * @returns {String} 样式类名
       */
      getClassByStatus(status) {
        return status === 0 ? 'warning' : status === 1 ? 'pass' : 'invalid'
      },
      /**
       * 根据状态获取状态名
       * @param {Number} status 状态， 0 未认证 ; 1 已认证; 2 已失效
       * @returns {String} 状态名
       */
      getNameByStatus(status) {
        return status === 0 ? '未认证' : status === 1 ? '已认证' : '已失效'
      },
      /**
       * 检查状态
       * @param {String} key 需要被检查的字段
       * @returns {Boolean} 是否检查通过
       */
      check(key) {
        if ($data[key].status === 1) return true
        else {
          var tip = $data[key].name + this.getNameByStatus($data[key].status) + '，请先' + (key == 'individual' ? '填写' : '认证') + '！'
          layer.tip((key == 'individual' ? tip.replace(/认证/g, '填写'): tip))
          return false
        }
      },
      /**
       * 页面跳转
       * @param {String} link  跳转链接
       * @param {Number} index 序号
       */
      goto(link, index) {
        if ($data.code !== 0) {
          layer.tip($data.message)
          return
        }
        var _this = this
        if (index == 1) {
          if (!_this.check('individual')) return
        } else if (index === 2) {
          if (!_this.check('individual')) return
          if (!_this.check('zhima')) return
        }
        this.$router.go(link)
      },
      /**
       * 提交数据
       */
      submit() {
        if ($data.code !== 0) {
          layer.tip($data.message)
          return
        }
        var _this = this
        if (!_this.check('individual')) return
        if (!_this.check('zhima')) return
        if (!_this.check('phone')) return
        var lid = layer.loading2(false, '数据提交中...')
        /**
         * 提交风控审核
         * https://git.fond.io/b/paydayloan/wikis/v3/apply/verify
         */
        ajax.get('/v3/apply/verify')
          .then((xhr, res) => {
            if (res.code == 0) {
              if (sysinfo.dsq.isapp()) sysinfo.dsq.openView('index')
              else history.back()
            } else {
              layer.warning(res.message)
            }
          }).complete(() => {
            layer.close(lid)
          })
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .authsingle {
    .title-wrap {
      padding: px2rem(15);
    }
    .title {
      border-left: 2px solid $main-color;
      padding-left: 5px;
    }
    .form {
      .row {
        padding: px2rem(18) px2rem(16);
        &.link {
          padding: px2rem(18) px2rem(28) px2rem(18) px2rem(16);
          background-position-x: 97%;
        }
      }
      .line {
        padding: 0;
        height: 1px;
      }
    }
    .form-value {
      float: right;
      font-size: px2rem(15);
      margin-top: px2rem(3);
      text-align: right;
    }
    .field-vaild {
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: contain;
      padding-left: px2rem(22);
      &.warning {
        background-image: url(../../assets/auth/i-warning.png);
      }
      &.pass {
        background-image: url(../../assets/auth/i-pass.png);
      }
      &.invalid {
        background-image: url(../../assets/auth/i-invalid.png);
      }
    }
    .btn-wrap {
      margin: px2rem(80) 0 0;
    }
  }
</style>