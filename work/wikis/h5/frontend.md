# 前端相关

## 前端代码编写

### 代码风格
* 缩进统一使用 tab 制表符长度为 2 （ 2 个空格）
* 组件及组件文件命名使用大驼峰命名法
* 变量命名使用小驼峰命名法

### js 服务使用
* 布局适配
	* `px2rem`
	* 需配合 `sass px2rem` 函数使用
* 弹窗
	* `window.layer`
	* 样式使用 `./src/sass/layer.m.scss`
	* 旧版样式，`./src/sass/layer.old.scss` 兼容旧版页面中的组件，待逐步迁移
	* 封装的方法在文件 `./src/services/layer.js` 中
* 数据请求对象
	* `window.ajax`
* 系统信息对象
	* `window.sysinfo`
	* app 交互操作
	* 代码运行环境判断
* 正则表达式验证对象
	* `window.regexp`
* 标题动态设置
	* `window.title`
* 数据存储操作
	* `window.store`
	* cookie 操作
	* localStorage 操作

### 样式代码编写
* 项目整体布局逻辑，使用 `rem` 布局，达到等比缩放的效果
	* 根元素 html 字体大小设置使用 `px2rem` 服务
	* 布局 px 数值单位使用 `sass px2rem` 函数进行转换
* sass 全局配置，`./src/sass/_globals.scss` ，尽量使用该文件中定义的 sass 变量
* 图片使用
	* 引用放在 ./src/assets 中的图片会被转换为 base64 编码
	* 引用放在 ./static 文件夹中的图片不会被转换为 base64 编码
* compass ，如需使用 compass 的功能（不推荐使用，因为发布后有冗余代码），可以在 .scss 文件中的引入如下语句，.vue 文件 style 节点中也可使用，需加属性 lang="scss"
```
@import "node_modules/compass-mixins/lib/compass";
@import "node_modules/compass-mixins/lib/animate";
```
* 关于 css background 属性
	* 写法一 background: url(url) 0 / 100% no-repeat;
	* 写法二 background: url(url) no-repeat; background-size: 100%;
	* 请使用写法二，因写法一有兼容性问题，会导致在某些手机中显示不出背景图片

### vue 组件编写
* 现有功能性组件
	* 待迁移和优化，尽量使用 `./src/components/common` 目录下的组件，相应功能和使用方法在组件内都有相关注释
* 页面组件编写
	* 确定新增页面所属模块，新建 vue 文件（组件及组件文件命名使用大驼峰命名法），放到 `./src/pages` 所属模块的目录
	* 路由声明在 `./src/routes` 目录
	* 在 `.src/components/List.vue` 组件中写入访问链接
	* 编写页面

## 后端接口访问
* 接口请求服务定义在 `./src/services/ajax.js` 文件中，对应全局服务为 `window.ajax`
* http 请求 header 相关字段
	* X-THIRD-TOKEN ：第三方 token ，从生成的第三方链接的 url 查询参数中获取
  * X-CLIENT-ID ：容器 ID ，用于标识请求从哪个容器中发起，已知的值有微信（wechat）、贷上钱 APP （daishangqian）和其他第三方 APP （从 url 参数中获取）
  * X-CHANNEL ：频道标识码，用于标识用户来源于哪个渠道，从后端生成的对外开放的链接的 url 查询参数中获取
  * X-TOKEN ：后端生成的 token ，在 APP 中使用 jsbridge 获取
* 后端接口 wiki ： http://git.fond.io/b/paydayloan/wikis/home
* 后端接口域名
	* 测试服1 http://paydayloan.fond.io
	* 测试服2 http://paydayloan1.fond.io

## 微信相关（已废除微信授权相关的功能）
* 微信 jssdk 签名接口： /v1/wechat/sign
* 微信授权登录地址：
	* /v1/user/auth?authclient=wechat&redirect_url=aHR0cDovL3BheWRheWxvYW4uZm9uZC5pby92dWUvIyEv
	* /v1/user/auth?authclient=wechat&redirect_url=aHR0cDovL2RzcS5xaWFuc2hlbmdxaWFuLmNvbS92dWUvIyEv

## 参考
* [vuejs 中文文档](http://cn.vuejs.org/guide/)
* [vue-router 中文文档](https://github.com/vuejs/vue-router/tree/1.0/docs/zh-cn)
* [Webpack + vue-loader 英文文档](http://vuejs-templates.github.io/webpack/)
* [compass-mixins](https://github.com/Igosuki/compass-mixins)