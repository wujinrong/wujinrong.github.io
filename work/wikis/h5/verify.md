# 申请、审核

## 身份证和活体识别
* 测试服 testing ，执行命令
* mysql -uroot
* use paydayloan;
* call create_ocr_user('18817392207','姓名','身份证号');
* http://shenfenzheng.293.net/

## 初审
* curl http://paydayloan.fond.io/internal/risk/first -d 'applyId=1337&applyCode=201751578266499526&applyResult=pass'
* appid 和 applycode 需要到后台查询
  * /etc/hosts 配置 182.254.134.148 paydayloan.backend.io
  * 浏览器访问 http://paydayloan.backend.io/apply/index
  * 登录账号找测试同学配置

## 银行卡信息填写
* [卡号大全](www.guabu.com/bank/?cardid=6228483658596959173)

## 手机运营商验证
* 密码随便输入

## 终审
* curl http://paydayloan.fond.io/internal/risk/second -d 'applyId=1337&applyCode=201751578266499526&applyResult=pass' 
* appid 和 applycode 需要到后台查询
  * /etc/hosts 配置 182.254.134.148 paydayloan.backend.io
  * 浏览器访问 http://paydayloan.backend.io/apply/index
  * 登录账号找测试同学配置

## 生成合同
* /data/www/yubaojing/php7/bin/php ./yii manualverify/run

## 资产推送 biz
* /data/www/yubaojing/php7/bin/php ./yii manualverify/push-biz

## biz 放款
* 流程比较复杂，详情咨询测试同学