# 目录结构

* build: webpack 开发和构建配置
* config: webpack 开发和构建配置基础信息
* dist: 发布目录
* node_modules: node 模块
* src: 源文件
	* assets: 资源文件
	* components: 组件
	* routes: 路由配置相关文件
	* sass: 公共样式文件
	* services: 公共方法
	* pages: 功能页面目录
		* active: 活动
		* auth: 分期贷申请流程
		* authsingle: 单期贷申请流程
		* example: 示例
		* repay: 主动还款
		* user: 用户登录注册
	* main.js: 主程序文件
* static: 静态资源（构建时不会被打包，直接拷贝）
* wikis: 文档
	* h5: h5 相关文档
	* appapi: 与 app 交互的 js api 文档
* index.html: 应用入口文件
* package.json: 项目信息（npm）
* README.md: 项目信息
