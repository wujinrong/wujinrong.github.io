// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

/**
 * 获取 node 命令行参数方法
 * @param {String} name 参数名
 * @returns {String|''} value 参数值
 */
function getParam (name) {
  if (!name) {
    return ''
  }
  var reg = new RegExp('\\S*' + name + '=(\\S*)')
  var s0 = process.argv.join(';')
  var s1 = s0.replace(reg, '$1')
  if (s0.length == s1.length) {
    return ''
  }
  else {
    return s1.split(';')[0]
  }
}

// 获取 cdn 序号，发布代码时，静态资源链接自动带上 cdn 前缀
var cdnIndex = getParam('--cdn')
var assetsPublicPath = './'
if (cdnIndex >= 0) {
  // cdn 前缀数组
  var cdns = ['//paydayloan.fond.io/vue/', '//www.daishangqian.com/vue/', '//static.qianshengqian.com/dsq/vue/']
  assetsPublicPath = cdns[cdnIndex] || assetsPublicPath
}

console.log('assetsPublicPath: ' + assetsPublicPath + '\n')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: assetsPublicPath,
    // assetsPublicPath: '/',
    productionSourceMap: false,
    // productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 1123,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // 接口代理
    proxyTable: {
      // 第一版接口
      '/v1': {
        target: 'http://paydayloan.fond.io/',
        changeOrigin: true,
      },
      // 第二版接口
      '/v2': {
        target: 'http://paydayloan.fond.io/',
        changeOrigin: true,
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  }
}
