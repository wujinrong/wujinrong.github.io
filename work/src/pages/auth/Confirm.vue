<!--
  -- 确认资料，申请借款
  -- @author bigfact
  -->
<template>
  <section class="auth-confirm fs18">
    <!--信息表单-->
    <div class="form-wrap" v-for="i in contents">
      <div class="form-title-wrap fs16">
        <span class="form-title">{{ i.header }}</span>
        <button class="form-modify-btn fs14" @click="goto(i.redirect)">修改</button>
      </div>
      <div class="form bg-white">
        <div class="row line"></div>
        <div class="row" v-for="j in i.content">
          <span>{{ j.key }}</span>
          <span class="form-value" :class="getClass(j.key, j.value)">{{ j.value }}</span>
        </div>
      </div>
    </div>
    <br>
    <!--协议链接-->
    <div class="tac fs12" v-show="contents.length > 0">
      <span>点击“下一步”即同意</span>
      <a v-link="'/auth/protocol?name=' + name" class="c-link">《授权委托协议》</a>
    </div>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">下一步</button>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    contents: [],
    name: ''
  }

  export default {
    data() {
      /**
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-show-format-info
       * 获取用户数据
       */
      ajax.get('/v3/individual/show-format-info', {
        product_type: $data.applytype
      }).then(function (xhr, res) {
        if (res.code == 0) {
          $data.contents = res.data.content || []
          // 获取用户名
          for (var i = 0; i < $data.contents.length; i++) {
            var content = $data.contents[i].content || []
            for (var j = 0; j < content.length; j++) {
              if (/姓名/.test(content[j].key)) {
                $data.name = encodeURI(content[j].value)
                return
              }
            }
          }
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    methods: {
      /**
       * 根据 key value 来获取 css 类名
       */
      getClass(key, value) {
        key = key || ''
        var className = ''
        if (/人脸识别|绑定公积金账户/.test(key)) {
          className += 'is-valid'
          if (/已识别|已认证/.test(value)) {
            className += ' yes'
          }
        } else {
          className += 'text-hide'
        }
        return className
      },
      /**
       * 跳转到修改页面
       * @param {Number} type 跳转类型唯一标识 6 身份信息 7 工作信息 8 联系信息
       */
      goto(type) {
        switch (type) {
          case 6:
            this.$router.go('/auth/identity?type=modify')
            break
          case 7:
            this.$router.go('/auth/job?type=modify')
            break
          case 8:
            this.$router.go('/auth/relation?type=modify')
            break
          case 13:
            this.$router.go('/auth/other?type=modify')
            break
          default:
            break
        }
      },
      /**
       * 检查数据
       * @param {String} key    显示字段名
       * @param {String} val    显示值
       * @param {String} header 地段父标题
       */
      check(key, val, header) {
        if (!regexp.empty(val)) {
          layer.tip('请修改' + header + '，补充' + key)
          return false
        }
        return true
      },
      /**
       * 提交数据
       */
      submit() {
        // 数据检查
        for (var i = 0; i < $data.contents.length; i++) {
          var items = $data.contents[i].content
          for (var j = 0; j < items.length; j++) {
            if (!this.check(items[j].key, items[j].value, $data.contents[i].header)) return
          }
        }
        // loading
        var lid = layer.loading(false)
        var router = this.$router
        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/appv1/individual-confirm
         */
        ajax.post('/v3/individual/confirm', {
          product_type: $data.applytype
        }).then(function (xhr, res) {
          if (res.code == 0) {
            router.go('/auth/sesame')
          } else {
            layer.warning(res.message)
          }
        }).complete(function () {
          layer.close(lid)
        })
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-confirm {
    box-sizing: border-box;
    padding-bottom: px2rem(70);
    .form-title-wrap {
      padding: px2rem(15);
      position: relative;
    }
    .form-title {
      padding-left: px2rem(7);
      position: relative;
      &:before {
        content: "";
        border-left: px2rem(2) solid $main-color;
        height: px2rem(12.5);
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
      }
    }
    .form-modify-btn {
      background: #fff;
      border: 1px solid;
      border-radius: px2rem(6);
      margin: auto;
      height: px2rem(28);
      line-height: px2rem(28);
      padding: 0 px2rem(21);
      position: absolute;
      top: 0;
      bottom: 0;
      right: px2rem(15);
    }
    .form {
      .row {
        padding: px2rem(18) px2rem(16);
      }
      .line {
        padding: 0;
        height: 1px;
      }
    }
    .text-hide {
      width: 70%;
    }
    .form-value {
      float: right;
      font-size: px2rem(15);
      margin-top: px2rem(2);
      text-align: right;
    }
    .is-valid {
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