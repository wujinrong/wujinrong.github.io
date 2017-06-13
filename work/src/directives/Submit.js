/**
 * 提交按钮限制指令，每间隔 time 毫秒 才能提交一次（防止连点）
 * @author bigfact
 * @param {Object}   params      指令传递数据
 * @param {Function} params.cb   提交回调方法
 * @param {Object}   params.data 需要传递给提交回调方法的数据
 * @param {Number}   params.time 限制执行方法的间隔时间，单位 ms ，默认值 1000
 * @example
 * <button v-submit="{cb: submit, data: 11, time: 2000}"></button>
 * <script>
 *   export default {
 *     data() {
 *       return {}
 *     },
 *     methods: {
 *       submit(data) {
 *         console.log(data)
 *         // 点击按钮，控制台将会输出 11
 *       }
 *     }
 *   }
 * </script>
 */

export default {
  update(newValue, oldValue) {
    // console.log(newValue, oldValue)
    // 指令传递数据准备
    var cb = typeof newValue.cb === 'function' ? newValue.cb : function () {}
    // 限制点击时间
    var time = typeof newValue.time === 'number' && newValue.time > 0 ? newValue.time : 1000
    // 回调数据
    var data = newValue.data
    // 开始点击时间
    var startTime = 0
    var _this = this
    // 是否可提交
    _this.canSubmit = true
    // 指令绑定元素
    var el = _this.el
    el.addEventListener('touchstart', (e) => {
      e.preventDefault()
      // e.stopPropagation()
      startTime = Date.now()
    }, false)
    el.addEventListener('touchend', (e) => {
      e.preventDefault()
      var endTime = Date.now()
      if (endTime - startTime <= 200 && _this.canSubmit) {
        _this.canSubmit = false
        // 间隔 time ms 才能触发提交事件
        _this.tid = setTimeout(() => {
          _this.canSubmit = true
          clearTimeout(_this.tid)
        }, time)
        cb(data)
      }
    }, false)
  },
  unbind() {
    this.canSubmit = true
    clearTimeout(this.tid)
  }
}