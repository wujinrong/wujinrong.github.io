/**
 * 主程序文件
 * @author qsq-frontend
 */

/**
 * 为了弥补安卓小伙伴线上包（v2.0.2）埋了此页面的测试服地址（paydayloan.fond.io/vue/#!/list），所以该页面会被重定向到线上邀请好友页面
 */
if (location.href.indexOf('paydayloan.fond.io/vue/#!/list') >= 0) location.href = 'https://api.daishangqian.com/vue/#!/active/invite/share'

/**
 * vue
 */
import Vue from 'vue'

/**
 * 路由组件
 */
import VueRouter from 'vue-router'

/**
 * 公共样式
 */
import commonStyle from './sass/common.scss'

/**
 * ajax数据请求
 */
import ajax from './services/ajax.js'

/**
 * 弹窗
 */
import layer from './services/layer.js'

/**
 * title设置
 */
import title from './services/title.js'

/**
 * 运行系统相关方法
 */
import sysinfo from './services/sysinfo.js'

/**
 * 正则表达式
 */
import regexp from './services/regexp.js'

/**
 * 本地存储操作插件（cookie和localStorage）
 */
import store from './services/store.js'

/**
 * 布局基数设置（设置根html元素font-size属性）
 */
import px2rem from './services/px2rem'

/**
 * 布局基数设置初始化
 */
px2rem()

/**
 * 导出全局方法
 */
window.store = store
window.layer = layer
window.sysinfo = sysinfo
window.regexp = regexp
window.ajax = ajax
window.title = title

/**
 * 应用程序版本
 */

window.version = '1.1.9'


// /**
//  * 快速点击
//  */
// import FastClick from 'fastclick'

// /**
//  * 快速点击初始化
//  */
// FastClick.attach(document.body, {})

/**
 * 引入路由组件
 */
var App = Vue.use(VueRouter).extend({})

/**
 * 路由组件实例
 */
var router = new VueRouter()

/**
 * 页面路由配置
 */
import routes from './routes'

/**
 * 路由配置生效
 */
router.map(routes)

/**
 * 记录已经加载过的页面路径，用于判断是否在页面切换时显示 loading
 */
var $to = []

/**
 * 页面 loading 元素
 */
var switchLoading = document.querySelector('.switch-loading')

// /**
//  * 贷上钱 app 之外禁止访问的页面
//  */
// var onlyAppPages = [
//   '/auth/identity',    // 身份信息
//   '/auth/job',         // 工作信息
//   '/auth/relation',    // 联系人信息
//   '/auth/other',       // 其他信息
//   '/auth/confirm',     // 审核信息确认
//   '/auth/sesame',      // 芝麻信用授权
//   '/auth/status',      // 初审状态
//   '/auth/bank',        // 银行卡信息
//   '/auth/contact',     // 运营商信息
//   '/auth/idreupload'   // 身份证重新上传
// ]

// var tmp = true

/**
 * 是否加载谷歌统计的代码
 */
var loadGoogleCode = /\.com|\.cn/.test(location.origin)

/**
 * 路由切换开始时调用
 */
router.beforeEach(function (transition) {
  var _toPath = transition.to.path
  // 允许加载谷歌统计，且访问路由为活动时，则加载谷歌统计的代码
  if (loadGoogleCode && transition.to.path.indexOf('/active') >= 0) {
    // console.log('loadGoogleCode')
    (function (i, s, o, g, r, a, m) { i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date(); a = s.createElement(o), m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m) })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
    ga('create', 'UA-98364847-1', 'auto')
    ga('send', 'pageview', location.href)
    loadGoogleCode = false
  }
  if (_toPath.indexOf('&appinstall=0') > -1) {
    // 当检测到 hash 路由中包含 '&appinstall=0' 字符串时，则重定向到去除该字符串的路由
    // 主要解决 qq 分享时会在链接地址 hash 后面加上 '&appinstall=0' 字符串，导致页面路由不被识别的错误
    _toPath = _toPath.replace('&appinstall=0', '')
    transition.redirect(_toPath)
  } else if (/%23/.test(location.href)) {
    // 停止切换页面
    transition.abort()
    // 对被编码过的链接进行拦截，重定向到解码之后的链接
    location.href = decodeURIComponent(location.href).replace(/#\!\/$/, '')
    // } else if (!transition.to.matched || transition.to.matched.length <= 0 || (onlyAppPages.indexOf(_toPath.replace(/\?.*/, '')) > -1 && !sysinfo.dsq.isapp())) {
  } else if (!transition.to.matched || transition.to.matched.length <= 0) {
    // // 停止切换页面
    // transition.abort()
    // 判断访问的页面，是否匹配已经配置的路由，是否为禁止访问的页面，如果符合则跳转到 404 提示页
    transition.redirect('/')
  } else {
    // 未加载过的页面显示 loading
    if ($to.indexOf(_toPath) < 0) {
      switchLoading.style.display = "block"
      $to.push(_toPath)
    }
    // 继续切换页面
    transition.next()
  }
})

/**
 * 路由切换成功进入激活阶段时调用
 */
router.afterEach(function (transition) {

  // 修改页面标题，标题名在路由中定义
  title(transition.to.name || '贷上钱')

  // 隐藏 loading
  switchLoading.style.display = "none"

})

/**
 * 导入提交按钮限制指令并注册
 */
import Submit from './directives/Submit'
Vue.directive('submit', Submit)

/**
 * 启动应用
 */
router.start(App, '#app')

// /**
//  * 记录和读取唯一标识
//  */
// import uuid from './services/uuid'
// var localUuid = store.local.get('dsq-h5-uuid')
// console.log(localUuid)
// if (!localUuid) {
//   localUuid = uuid()
//   store.local.set('dsq-h5-uuid', localUuid)
// }
// // 上报 uuid 和 url
// ajax.post('/v3/xxx', {
//   uuid: localUuid,
//   url: location.href
// })
