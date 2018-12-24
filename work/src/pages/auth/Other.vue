<!--
  -- 其他认证
  -- @author bigfact
  -->
<template>
  <section class="auth-other fs18">
    <div class="title fs14 c-placeholder">绑定公积金账户有助于提升您的审核通过率和放款速度</div>
    <div class="form bg-white">
      <div class="row line"></div>
      <div class="row link" @click="openGongjijin()">
        <span>公积金账户绑定</span>
        <span class="gongJijin-vaild form-value c-placeholder" :class="gongJijin.status ? 'yes' : ''">{{ gongJijin.status ? '已' : '未' }}识别</span>
      </div>
    </div>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">{{ modify ? '保存' : '下一步' }}</button>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    gongJijin: {
      status: false,
      cbName: 'cb' + Date.now(),
      taskId: 0
    },
    modify: false
  }

  export default {
    data() {
      $data.modify = this.$route.query.type == 'modify'
      // 设置标题
      title($data.modify ? '其他认证' : '其他认证（第4/4步）')
      /**
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-get-user-info
       * 获取用户数据
       */
      ajax.get('/v3/individual/get-user-info', {
        product_type: $data.applytype
      }).then(function (xhr, res) {
        if (res.code == 0) {
          if (res.data) {
            $data.gongJijin.status = res.data.youdun_fund
            // // test
            // $data.gongJijin.status = true
          }
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      /**
       * 打开公积金授权页面
       */
      openGongjijin() {
        // 设置回调函数
        if (typeof window[$data.gongJijin.cbName] !== 'function') {
          window[$data.gongJijin.cbName] = function (response) {
            try {
              console.log(response)
              var obj = JSON.parse(response)
              console.log(obj)
              if (obj.code == 1) {
                $data.gongJijin.taskId = obj.taskId
                // loading
                var lid = layer.loading(false)
                /**
                 * 上报 taskId
                 * http://git.fond.io/b/paydayloan/wikis/v3/individual-fund-task-id
                 */
                ajax.post('/v3/individual/fund-task-id', {
                  taskId: $data.gongJijin.taskId
                }).then(function (xhr, res) {
                  if (res.code == 0) {
                    $data.gongJijin.status = true
                  } else {
                    layer.warning(res.message)
                  }
                }).complete(function () {
                  layer.close(lid)
                })
              }
            } catch (err) {
              console.log(err)
            }
          }
        }
        // 调用 app 接口
        sysinfo.dsq.openGongjijin($data.gongJijin.cbName)
        console.log('sysinfo.dsq.openGongjijin', $data.gongJijin.cbName)
      },
      /**
       * 提交数据
       */
      submit() {
        // 页面跳转
        if ($data.modify) history.back()
        else this.$router.replace('/auth/confirm')
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-other {
    .title {
      padding: px2rem(15);
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
    .gongJijin-vaild {
      background: url(../../assets/auth/identity/warning.png) no-repeat 0 center;
      background-size: contain;
      padding-left: px2rem(22);
      &.yes {
        background: url(../../assets/auth/identity/success.png) no-repeat 0 center;
        background-size: contain;
      }
    }
  }
</style>