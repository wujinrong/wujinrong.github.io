<!--
	-- 图片验证码组件
	-- @author bigfact
  -- @date 2017.04.24
  -- @example
  -- <template>
  --   <d-img-code :verify="imgCode.verify" @verified="imgCodeVerified" v-show="imgCode.show"></d-img-code>
  -- </template>
  -- <script>
  --   import DImgCode from 'path/to/DImgCode'
  --   var $data = {
  --     imgCode: {
  --       ticket: '',
  --       show: false,
  --       verify: false
  --     }
  --   }
  --   export default {
  --     data() {
  --       return $data
  --     },
  --     methods: {
  --       /**
  --        * 显示图片验证码
  --        */
  --       showImgCode() {
  --         $data.imgCode.show = true
  --         $data.imgCode.verify = true
  --       },
  --       /**
  --        * 图片验证码组件验证成功监听方法
  --        * @param {Object} data        事件附带数据
  --        * @param {String} data.ticket 验证码验证成功票据
  --        */
  --       imgCodeVerified(data) {
  --         console.log(data)
  --         $data.imgCode.ticket = data.ticket
  --         $data.imgCode.show = false
  --         $data.imgCode.verify = false
  --       }
  --     },
  --     components: {
  --       DImgCode: DImgCode
  --     }
  --   }
  -- </script>
  -->

<template>
  <div :id="id"></div>
</template>

<script>
  export default {
    data() {
      var _this = this
      _this.$watch('verify', function (val) {
        if (val) _this.showImgCode()
      })
      return {
        id: 'img-code-' + Date.now(),
        inited: false
      }
    },
    /**
     * 属性
     * @param {String} verify 是否启用验证
     */
    props: ['verify'],
    methods: {
      // 初始化图片验证码组件
      initImgCode() {
        var _this = this
        // 图片验证码组件配置
        var capOption = {
          // 回调函数：验证码页面关闭时回调
          callback: function (retJson) {
            if (retJson.ret == 0) {
              _this.$emit('verified', {
                ticket: retJson.ticket
              })
            }
          },
          showHeader: false,
          themeColor: 'FFA72E'
        }
        // 已经加载过图形验证码执行代码
        if (typeof capInit === 'function') {
          capInit(document.getElementById(_this.id), capOption)
          _this.inited = true
          return
        }
        /**
         * 获取图形验证码执行代码（http://git.fond.io/b/paydayloan/wikis/captcha-js）
         * @return {Number} code 错误码
         * @return {String} message 提示信息
         * @return {String} data.url 图片验证码地址
         */
        ajax.get('/v3/action/captcha')
          .then(function (xhr, res) {
            if (res.code == 0) {
              var tmp = document.createElement('script')
              tmp.src = res.data.url
              document.body.appendChild(tmp)
              tmp.onload = function () {
                if (typeof capInit === 'function') {
                  capInit(document.getElementById(_this.id), capOption)
                }
              }
            } else {
              layer.warning(res.message)
            }
          })
      },
      // 显示图片验证码组件
      showImgCode() {
        if (typeof capRefresh === 'function' && this.inited) {
          capRefresh()
        } else {
          this.initImgCode()
        }
      }
    },
    destroyed() {
      if (typeof capDestroy === 'function') capDestroy()
    }
  }

</script>