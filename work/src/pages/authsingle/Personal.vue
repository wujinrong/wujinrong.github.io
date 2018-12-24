<!--
  -- 个人信息
  -- @description 个人信息资料入口汇总，可查看各类资料的状态，各类资料必须按顺序填写
  -- @author bigfact
  -- @date 2017.05.18
  -->
<template>
  <section class="authsingle-personal fs18">
    <div class="form bg-white">
      <div class="row line"></div>
      <div class="row link" @click="goto('/authsingle/identity', 0)">
        <span>{{ baseinfo.name }}</span>
        <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(baseinfo.status)">{{ getNameByStatus(baseinfo.status) }}</span>
      </div>
      <div class="row link" @click="goto('/authsingle/job', 1)">
        <span>{{ workinfo.name }}</span>
        <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(workinfo.status)">{{ getNameByStatus(workinfo.status) }}</span>
      </div>
      <div class="row link" @click="goto('/authsingle/relation', 2)">
        <span>{{ contactinfo.name }}</span>
        <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(contactinfo.status)">{{ getNameByStatus(contactinfo.status) }}</span>
      </div>
    </div>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">提交</button>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // 基本信息状态：0 未填写 ; 1 已填写; 2 已失效
    baseinfo: {
      status: 0,
      name: '基本信息'
    },
    // 职业信息状态：0 未认证 ; 1 已认证; 2 已失效
    workinfo: {
      status: 0,
      name: '职业信息'
    },
    // 联系人信息状态：0 未认证 ; 1 已认证; 2 已失效
    contactinfo: {
      status: 0,
      name: '联系人信息'
    },
    code: '',
    message: '数据加载中...'
  }

  export default {
    data() {
      /**
       * https://git.fond.io/b/paydayloan/wikis/v3/individual/menu
       * 获取数据
       */
      ajax.get('/v3/individual/menu')
        .then((xhr, res) => {
          $data.code = res.code
          if (res.code === 0) {
            $data.baseinfo.status = res.data.baseinfo
            $data.workinfo.status = res.data.workinfo
            $data.contactinfo.status = res.data.contactinfo
          } else {
            $data.message = res.message
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * 根据状态获取样式名
       * @param {Number} status 状态， 0 未填写 ; 1 已填写; 2 已失效
       * @returns {String} 样式类名
       */
      getClassByStatus(status) {
        // return status === 0 ? 'invalid' : status === 1 ? 'pass' : 'warning'
        return ''
      },
      /**
       * 根据状态获取状态名
       * @param {Number} status 状态， 0 未填写 ; 1 已填写; 2 已失效
       * @returns {String} 状态名
       */
      getNameByStatus(status) {
        return status === 0 ? '未填写' : status === 1 ? '已填写' : '已失效'
      },
      /**
       * 检查状态
       * @param {String} key 需要被检查的字段
       * @returns {Boolean} 是否检查通过
       */
      check(key) {
        if ($data[key].status === 1) return true
        else {
          layer.tip($data[key].name + this.getNameByStatus($data[key].status) + '，请先填写！')
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
          if (!_this.check('baseinfo')) return
        } else if (index === 2) {
          if (!_this.check('baseinfo')) return
          if (!_this.check('workinfo')) return
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
        if (!_this.check('baseinfo')) return
        if (!_this.check('workinfo')) return
        if (!_this.check('contactinfo')) return
        history.back()
        // var lid = layer.loading2(false)
        // /**
        //  * 提交风控审核
        //  * https://git.fond.io/b/paydayloan/wikis/v3/apply/verify
        //  */
        // ajax.get('/v3/apply/verify')
        //   .then((xhr, res) => {
        //     if (res.code == 0) {
        //       if (sysinfo.dsq.isapp()) sysinfo.dsq.openView('index')
        //       else history.back()
        //     } else {
        //       layer.warning(res.message)
        //     }
        //   }).complete(() => {
        //     layer.close(lid)
        //   })
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .authsingle-personal {
    padding-top: px2rem(7.5);
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
  }
</style>