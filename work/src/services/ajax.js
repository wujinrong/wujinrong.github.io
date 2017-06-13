/**
 * ajax 数据请求服务
 * 1. 配置默认请求头部信息
 * 2. 配置请求接口域名
 * @author qsq-frontend
 */

import qwest from 'qwest'

export default {
  /**
   * 设置数据请求配置
   */
  setOptions() {
    // 第三方 token
    var thirdToken = sysinfo.getQueryString('code')

    // 设备、渠道标识，默认值以查询参数 channel 为准（推广渠道的 code）
    var client_id = sysinfo.getQueryString('channel') || sysinfo.getQueryString('clientid')

    // 从 cookie 或者 query string 中获取贷上钱 token
    var token = store.cookie.get('_x_token') || sysinfo.getQueryString('token')

    // 在钱牛牛 app 中获取钱牛牛的 token
    sysinfo.qsq.isapp() && (thirdToken = sysinfo.qsq.getToken(), client_id = 'qianshengqian')

    // 在贷上钱 app 中获取贷上钱的 token
    sysinfo.dsq.isapp() && (token = sysinfo.dsq.getToken(), client_id = 'daishangqian')

    // 微信中的处理
    if (sysinfo.isWeiXin) {
      thirdToken = thirdToken ? thirdToken : ''
      client_id = client_id ? client_id : 'wechat'
    }

    // 检查默认的设备标识
    !client_id && (client_id = 'default')

    // 设置数据请求配置
    qwest.setDefaultOptions({
      responseType: 'json',
      timeout: 120000,
      headers: {
        'X-THIRD-TOKEN': thirdToken,
        'X-CLIENT-ID': client_id,
        'X-TOKEN': token,
        'X-App-Id': sysinfo.dsq.getAppID(),
      },
    })
  },
  /**
   * 获取数据请求源路径
   * @returns {String} origin 数据请求源路径字符串
   */
  getHost() {
    var host = location.origin
    if(/\.com|\.cn/.test(host)) host = '//api.daishangqian.com'
    else if (!/paydayloan/.test(host)) host = '//paydayloan.fond.io'

    // // testdata
    // host = 'https://api.daishangqian.com'

    // return location.origin
    return host
  },
  /**
   * ajax get 请求
   * @param {String} uri 数据请求地址
   * @param {Object} params 参数
   * @returns {Object} ajax 请求对象
   * @example
   * ajax.get('/v3/util/dictionary').then(function (xhr, response) {
   *   console.log(response.data)
   * })
   * .catch(function(response) { })
   */
  get(uri, params) {
    var _this = this
    _this.setOptions()
    var tmp = qwest.get(_this.getHost() + uri, params)
    tmp.catch(_this.catchErr)
    return tmp
  },
  /**
   * ajax post 请求，发送文件要用 FormData 提交数据
   * @param {String} uri 数据请求地址
   * @param {Object} params 参数
   * @returns ajax 请求对象
   * @example
   * ajax.post('/v3/util/dictionary', {a:1}).then(function (xhr, response) {
   *   console.log(response.data)
   * })
   * .catch(function(response) { })
   */
  post(uri, data) {
    var _this = this
    _this.setOptions()
    var tmp = qwest.post(_this.getHost() + uri, data)
    tmp.catch(_this.catchErr)
    return tmp
  },
  /**
   * 腾讯云 COS 上传文件的接口，url 链接是动态拼接的
   * @param {String} url 图片上传地址
   * @param {Object} data 参数
   * @returns {Object} ajax 请求对象
   */
  upload(url, data) {
    var _this = this
    _this.setOptions()
    var tmp = qwest.post(url, data)
    // tmp.catch(function (err, xhr) {
    //   uploadErr(err, xhr, url)
    // })
    return tmp
  },
  /**
   * 加载静态 json 文件
   * @param {String} url json 路径
   * @returns {Object} ajax 请求对象
   */
  loadJson(url, data) {
    var _this = this
    _this.setOptions()
    var tmp = qwest.get(url)
    // tmp.catch(function (err, xhr) {
    //   uploadErr(err, xhr, url)
    // })
    return tmp
  },
  // /**
  //  * 上报错误信息
  //  * @param {String} msg 错误信息字符串
  //  */
  // postErr(msg) {
  //   var _this = this
  //   _this.setOptions()
  //   qwest.post(_this.getHost() + '/site/sentry-error', {
  //     message: msg,
  //   })
  // },
  /**
   * 统一请求错误处理
   */
  catchErr(err, xhr) {
    var _this = this
    var code = xhr.status
    var errObj = {
      'timeout': '网络错误 - 0',
      'uploaderr': '图片上传失败 - ',
    }
    // 请求超时
    err.toString().toLocaleLowerCase().indexOf('timeout') > -1 && (code = 'timeout')
    layer.warning(errObj[code] || ('出错啦，请稍后尝试 - ' + code))
  },
  // /**
  //  * 上传文件失败处理
  //  */
  // uploadErr(err, xhr, url) {
  // var _this = this
  //   layer.warning(_this.errObj['uploaderr'] + xhr.status)
  //   // 测试环境不上报错误信息
  //   if(location.origin.indexOf('.com') < 0) return
  //   // 上报错误信息
  //   _this.setOptions()
  //   var msg = {
  //     title: 'PDL_COS_ERR',
  //     err: err.toString(),
  //     status: xhr.status,
  //     statusText: xhr.statusText,
  //     readyState: xhr.readyState,
  //     res: xhr.response,
  //     resURL: xhr.responseURL,
  //     reqURL: url,
  //   }
  //   var data = {
  //     message: JSON.stringify(msg),
  //   }
  //   qwest.post('/site/sentry-error', data)
  // }
}
