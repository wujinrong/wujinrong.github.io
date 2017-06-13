/**
 * vue 插件示例
 * @example
 * 
 * // 导入并注册插件
 * import Test from 'test.js'
 * Vue.use(Test)
 * 
 * // 在vue组件中使用方法
 * export default {
 *   data() {
 *	   this.test1()
 *     return { }
 *   },
 *   ready() { },
 *   methods: { },
 * }
 */

var testObj = {
  methods: {
    test1() {
      console.log('test1')
    },
  },
}

export default {
  install(Vue, options) {
    Vue.options = Vue.util.mergeOptions(Vue.options, testObj)
  }
}
