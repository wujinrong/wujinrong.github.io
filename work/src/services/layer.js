/**
 * 封装弹窗的方法
 * @author qsq-frontend
 * @example 
 * import layer from './services/layer'
 */

require('../sass/layer.old.scss')
require('../sass/layer.m.scss')

/*
 * @Name：layer mobile v2.0 弹层组件移动版
 * @Author：贤心
 * @Site：http://layer.layui.com/mobile/
 * @License：LGPL
 */

/**
 * 根据原版本修改为适用于本项目的版本
 * @author bigfact
 * @date 2017.01.03
 */

var doc = document
var query = 'querySelectorAll'
var claname = 'getElementsByClassName'
var S = function (s) {
  return doc[query](s)
}

// 默认配置
var config = {
  type: 0,
  shade: true,
  shadeClose: true,
  fixed: true,
  anim: 'scale' // 默认动画类型
}

var ready = {
  extend: function (obj) {
    var newobj = JSON.parse(JSON.stringify(config))
    for (var i in obj) {
      newobj[i] = obj[i]
    }
    return newobj
  },
  timer: {},
  end: {}
}

// 点触事件
ready.touch = function (elem, fn) {
  elem.addEventListener('click', function (e) {
    fn.call(this, e)
  }, false)
}

var index = 0
var classs = ['layui-m-layer']
var Layer = function (options) {
  var that = this
  that.config = ready.extend(options)
  that.view()
}

Layer.prototype.view = function () {
  var that = this
  var config = that.config
  var layerbox = doc.createElement('div')
  that.id = layerbox.id = classs[0] + index
  layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0))
  layerbox.setAttribute('index', index)
  // 标题区域
  var title = (function () {
    var titype = typeof config.title === 'object'
    return config.title
      ? '<h3 style="' + (titype ? config.title[1] : '') + '">' + (titype ? config.title[0] : config.title) + '</h3>'
      : ''
  }())
  // 按钮区域
  var button = (function () {
    typeof config.btn === 'string' && (config.btn = [config.btn])
    var btns = (config.btn || []).length
    if (btns === 0 || !config.btn) {
      return ''
    }
    var btndom = '<span yes type="1">' + config.btn[0] + '</span>'
    if (btns === 2) {
      btndom = '<span no type="0">' + config.btn[1] + '</span>' + btndom
    }
    return '<div class="layui-m-layerbtn">' + btndom + '</div>'
  }())
  if (!config.fixed) {
    config.top = config.hasOwnProperty('top') ? config.top : 100
    config.style = config.style || ''
    config.style += ' top:' + (doc.body.scrollTop + config.top) + 'px'
  }
  if (config.type === 2) {
    config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (config.content || '') + '</p>'
  }
  if (config.skin) config.anim = 'up'
  if (config.skin === 'msg') config.shade = false
  layerbox.innerHTML = (config.shade ? '<div ' + (typeof config.shade === 'string' ? 'style="' +
    config.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '') +
    '<div class="layui-m-layermain" ' + (!config.fixed ? 'style="position:static"' : '') + '>' +
    '<div class="layui-m-layersection">' +
    '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + (config.style ? 'style="' + config.style + '"' : '') + '>' +
    title +
    '<div class="layui-m-layercont">' + config.content + '</div>' +
    button +
    '</div>' +
    '</div>' +
    '</div>'
  if (!config.type || config.type === 2) {
    var dialogs = doc[claname](classs[0] + config.type)
    var dialen = dialogs.length
    if (dialen >= 1) {
      layer.close(dialogs[0].getAttribute('index'))
    }
  }
  document.body.appendChild(layerbox)
  var elem = that.elem = S('#' + that.id)[0]
  config.success && config.success(elem)
  that.index = index++
  that.action(config, elem)
}

Layer.prototype.action = function (config, elem) {
  var that = this
  // 自动关闭
  if (config.time) {
    ready.timer[that.index] = setTimeout(function () {
      layer.close(that.index)
    }, config.time * 1000)
  }
  // 确认取消
  var btn = function () {
    var type = this.getAttribute('type')
    if (type === '0') {
      config.no && config.no()
      layer.close(that.index)
    } else {
      config.yes ? config.yes(that.index) : layer.close(that.index)
    }
  }
  if (config.btn) {
    var btns = elem[claname]('layui-m-layerbtn')[0].children
    var btnlen = btns.length
    for (var ii = 0; ii < btnlen; ii++) {
      ready.touch(btns[ii], btn)
    }
  }
  // 点遮罩关闭
  if (config.shade && config.shadeClose) {
    var shade = elem[claname]('layui-m-layershade')[0]
    ready.touch(shade, function () {
      layer.close(that.index, config.end)
    })
  }
  config.end && (ready.end[that.index] = config.end)
}

/**
 * 原版 layer 弹窗对象
 */
var layer = {
  v: '2.0',
  index: index,
  // 核心方法
  open: function (options) {
    var o = new Layer(options || {})
    return o.index
  },
  close: function (index) {
    var ibox = S('#' + classs[0] + index)[0]
    if (!ibox) return
    ibox.innerHTML = ''
    doc.body.removeChild(ibox)
    clearTimeout(ready.timer[index])
    delete ready.timer[index]
    typeof ready.end[index] === 'function' && ready.end[index]()
    delete ready.end[index]
  },
  // 关闭所有layer层
  closeAll: function () {
    var boxs = doc[claname](classs[0])
    for (var i = 0, len = boxs.length; i < len; i++) {
      layer.close((boxs[0].getAttribute('index') | 0))
    }
  }
}

function extend(obj0, obj1) {
  for (var o in obj1) {
    obj0[o] = obj1[o];
  }
  return obj0;
}

export default {
  /**
   * loaing 样式一，三个点
   * @param {Bool|true} shadeClose 是否点击隐藏
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  loading(shadeClose) {
    return layer.open({
      type: 2,
      shadeClose: shadeClose != false,
    });
  },
  /**
   * loaing 样式二，转圈
   * @param {Bool|true} shadeClose 是否点击隐藏
   * @param {String} hint 提示文字，默认，加载中...
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  loading2(shadeClose, hint) {
    return layer.open({
      className: 'loading2',
      content: '<div class="spinner-wrap"><div class="spinner"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div><div>' + (hint || '数据加载中...') + '</div>',
      shadeClose: shadeClose != false,
    });
  },
  /**
   * 提示
   * @param {String} message 消息内容
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  tip(message) {
    return layer.open({
      content: message,
      skin: 'msg',
      time: 3,
    });
  },
  /**
   * 提示消息，带 title 和 按钮
   * @param {String} message 提示信息内容
   * @param {String} option 配置信息，可覆盖默认配置
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  message(message, option) {
    return layer.open(extend({
      title: '提示',
      content: message,
      btn: ['确定', '取消'],
    }, option));
  },
  /**
   * 打印警告消息
   * @param {String} message
   * @param {String} option 配置信息，可覆盖默认配置
   * @returns {Number} index 弹窗的序号，可用于手动关闭弹窗
   */
  warning(message, option) {
    return layer.open(extend({
      content: message,
      btn: ['确定'],
    }, option));
  },
  /**
   * 手动关闭弹窗
   * @param {Number} index 要被关闭的弹窗的序号，如果序号小于 0 则关闭全部弹窗
   */
  close(index) {
    index >= 0 ? layer.close(index) : layer.closeAll();
  },
}