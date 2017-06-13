<!--
	-- 移动端调试工具
	-- @author bigfact
  -->
<template>
  <!--开启调试工具点击计数节点-->
  <div class="d-debuger" @touchend="count()"></div>
</template>

<script>
  export default {
    data() {
      return {
        // 开启调试工具相关变量
        times: 0,
        tid: -1
      }
    },
    methods: {
      // 开启调试工具
      count() {
        var _this = this
        if (_this.times < 0) return
        _this.tid < 0 && (_this.tid = setInterval(function () {
          _this.times = 0
        }, 3000))
        _this.times++
        if (_this.times >= 15) {
          _this.times = -1
          clearInterval(_this.tid)
          var tmp = document.createElement("script")
          tmp.src = "./static/js/vconsole.min.js"
          document.body.appendChild(tmp)
        }
      }
    },
    destroyed() {
      clearInterval(this.tid)
    }
  }

</script>