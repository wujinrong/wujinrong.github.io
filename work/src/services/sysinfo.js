/**
 * 运行系统信息判断
 * @author qsq-frontend
 */

var userAgent = window.navigator.userAgent.toLowerCase()

/**
 * qsq app jsbridge sysPlatform json
 */
// var sysPlatform = typeof qsqapi !== 'undefined' && typeof qsqapi.sysPlatform === 'function' ? JSON.parse(qsqapi.sysPlatform()) : ''

/**
 * dsq app jsbridge sysPlatform json
 */
// var dsqSysPlatform = typeof dsqapi !== 'undefined' && typeof dsqapi.sysPlatform === 'function' ? JSON.parse(dsqapi.sysPlatform()) : ''

export default {
  /**
   * userAgent
   */
  ua: userAgent,
  /**
   * 判断是否在微信中运行
   */
  isWeiXin: userAgent.match(/MicroMessenger/i) == 'micromessenger',
  /**
   * 判断运行设备是否是安卓
   */
  isAndroid: userAgent.indexOf('android') > -1 || userAgent.indexOf('linux') > -1,
  /**
   * 判断运行设备是否是 IOS
   */
  isIOS: userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1,
  /**
   * qsq app 中使用的方法
   */
  qsq: {
    isapp() {
      try {
        return typeof qsqapi !== 'undefined'
      } catch (err) {
        return true
      }
    },
    getToken() {
      try {
        var tmp = JSON.parse(qsqapi.sysPlatform())
        if (tmp && tmp.userToken) {
          return tmp.userToken
        }
        return ''
      }
      catch (err) {
        return ''
      }
    },
  },
  /**
   * dsq app 中使用的方法
   * ../../wikis/appapi/index.md
   */
  dsq: {
    /**
     * 判断是否在 APP 中
     */
    isapp() {
      try {
        return typeof dsqapi !== 'undefined'
      } catch (err) {
        return true
      }
    },
    /**
     * 获取客户端版本数值
     */
    getVersion() {
      try {
        var tmp = JSON.parse(dsqapi.sysPlatform())
        if (tmp && tmp.softVersion) {
          var version = tmp.softVersion.replace(/\.|dsq|_/g, '')
          version = version.substring(0, version.length > 3 ? 3 : version.length)
          version = parseInt(version)
          return version > 0 ? version : 0
        }
        return 0
      }
      catch (err) {
        return 0
      }
    },
    /**
     * 获取用户 token
     */
    getToken() {
      try {
        var tmp = JSON.parse(dsqapi.sysPlatform())
        if (tmp && tmp.userToken) {
          return tmp.userToken
        }
        return ''
      }
      catch (err) {
        return ''
      }
    },
    /**
     * 登录
     */
    login() {
      try {
        dsqapi.openView('login', '')
      } catch (err) { }
    },
    /**
     * 退出登录
     */
    logout() {
      try {
        dsqapi.logout()
      } catch (err) { }
    },
    /**
     * 找回密码
     */
    forget() {
      try {
        dsqapi.openView('forget', '')
      } catch (err) { }
    },
    /**
     * 用新的 webview 打开网页
     */
    open(url) {
      try {
        dsqapi.openView('toUrl', '{"url": "' + url + '"}')
      }
      catch (err) { }
    },
    /**
     * 打开原生界面
     */
    openView(viewName) {
      try {
        /**
         * 现有app原生页面的viewName
         * repay - app 2.0.5 新增
         */
        var tmp = ['authBank', 'index', 'forget', 'login', 'authIdentity', 'repay']
        return tmp.indexOf(viewName) > -1 && dsqapi.openView(viewName, '')
      }
      catch (err) {
        return false
      }
    },
    /**
     * 关闭当前 WebView
     */
    closeWebView() {
      try {
        return dsqapi.closeWebView()
      } catch (err) {
        // console.log(err)
        return false
      }
    },
    /**
     * 图片上传
     * @param { String } callbackName js展示图片的全局方法的名字字符串，APP完成上传图片后，调用此方法来展示图片，此方法需要接收imageUrl与viewId两个参数 webview.loadUrl("javascript:" + mFunction + "(" + url + "," + mViewId + ")")
     * @param { String } viewid view的id	用于标记当前点击的第几个View，并在后续上传完成后展示在此View中
     */
    upload(callbackName, viewid) {
      try {
        // isOnlyCapture 用于控制APP弹框是否仅仅展示拍照选择项，true/false
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.uploadImage', callbackName, viewid || '', false)
        return dsqapi.uploadImage(callbackName, viewid || '', false)
      }
      catch (err) {
        return false
      }
    },
    /**
     * 触发客户端获取地址并上报后台，上报状态通过回调函数返回
     * @param {String} callbackName 回调函数名称
     * @returns {Boolean} status 函数是否调用成功
     */
    getLocation(callbackName) {
      try {
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.getLocation', callbackName)
        return dsqapi.getLocation(callbackName)
      } catch (err) {
        return false
      }
    },
    /**
     * 触发客户端获取通讯录、通话记录信息并上报后台，上报状态通过回调函数返回
     * @param {String} callbackName 回调函数名称
     * @returns {Boolean} status 函数是否调用成功
     */
    postContacts(callbackName) {
      try {
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.postContacts', callbackName)
        return dsqapi.postContacts(callbackName)
      } catch (err) {
        return false
      }
    },
    /**
     * 触发客户端弹出选择联系人信息的弹窗
     * @param {String} callbackName 回调函数名称
     * @param {String} index 唯一标识序号
     * @returns {Boolean} status 函数是否调用成功
     */
    getContact(callbackName, index) {
      try {
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.getContact', callbackName, index)
        return dsqapi.getContact(callbackName, index)
      } catch (err) {
        return false
      }
    },
    /**
     * 通过调用 API，让 app 弹出 OCR 身份验证模块，验证状态通过回调函数返回
     * @param {String} callbackName 回调函数名称
     * @param {String} type         类型
     * @param {Number} allowModify  是否允许修改， 1 允许 0 不允许
     * @returns {Boolean} status 函数是否调用成功
     */
    openOCR(callbackName, type, allowModify) {
      try {
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.openOCR', callbackName, type, allowModify)
        return dsqapi.openOCR(callbackName, type, allowModify)
      } catch (err) {
        return false
      }
    },
    /**
     * 通过调用 API，让 app 弹出活体识别模块，验证状态通过回调函数返回
     * @param {String} callbackName 回调函数名称
     * @param {String} name         姓名
     * @param {String} idNum        身份证号
     * @param {String} type         类型
     * @returns {Boolean} status 函数是否调用成功
     */
    openFaceIdentify(callbackName, name, idNum, type) {
      try {
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.openFaceIdentify', callbackName, name, idNum, type)
        return dsqapi.openFaceIdentify(callbackName, name, idNum, type)
      } catch (err) {
        return false
      }
    },
    /**
     * 通过调用 API，让 app 弹出获取公积金信息的窗口，用户授权完成之后通过回调函数返回数据
     * @param {String} callbackName 回调函数名称
     * @returns {Boolean} status 函数是否调用成功
     */
    openGongjijin(callbackName) {
      try {
        typeof window[callbackName] !== 'function' && (window[callbackName] = function () { })
        console.log('dsqapi.openGongjijin', callbackName)
        return dsqapi.openGongjijin(callbackName)
      } catch (err) {
        return false
      }
    },
    /**
     * 获取客户端appid
     */
    getAppID() {
      try {
        var tmp = JSON.parse(dsqapi.sysPlatform())
        if (tmp && tmp.appID) {
          return tmp.appID
        }
        return ''
      }
      catch (err) {
        return ''
      }
    },
    /**
     * 调用客户端拨打电话的接口（app版本2.0.4及以上）
     * @param {String} num 电话号码
     */
    phoneCall(num) {
      try {
        dsqapi.phoneCall(num)
        return true
      }
      catch (err) {
        return false
      }
    },
    /**
     * 调用 app 分享
     * @param {Object} config 分享数据配置
     * @param {String} config.title 分享标题
     * @param {String} config.link 分享链接
     * @param {String} config.desc 分享描述
     * @param {String} config.imgUrl 分享图片 URL
     * @param {String} config.type 分享类型，分别代表不同的分享类型：微信好友（friend）、微信朋友圈（group）、QQ 好友（qq）
     */
    share(config) {
      try {
        dsqapi.setShareFromWeb(JSON.stringify(config))
        return true
      }
      catch (err) {
        return false
      }
    },
    /**
     * 当用户打开 webview 之后，设置用户点击返回，则直接关闭该 webview ，不管历史记录为多少
     */
    setCloseView() {
      try {
        dsqapi.setCloseView()
        return true
      }
      catch (err) {
        return false
      }
    },
    /**
     * 当用户打开 webview 之后，设置用户点击返回，则直接关闭该 webview ，不管历史记录为多少
     */
    setClipboard(str) {
      try {
        dsqapi.setClipboard(str)
        return true
      }
      catch (err) {
        return false
      }
    }
  },
  /**
   * 获取查询字符串
   * @param name 查询字符串的名称
   * @returns 查询字符串的值
   */
  getQueryString(name) {
    return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(name).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
  },
}
