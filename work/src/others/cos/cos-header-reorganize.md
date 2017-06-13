# cos header

数据从 [http://sentry.fond.io/](http://sentry.fond.io/) 所记录的错误中整理而来
(外部系统 / 贷上钱)
(搜索关键字：PDL_COS_ERR, Connection aborted)

## 常见的header
* Accept
* Accept-Charset
* Accept-Encoding
* Accept-Language
* Cache-Control
* Connection
* Content-Length
* Content-Type
* Host
* Origin
* Referer
* User-Agent
* X-Channel
* X-Client-Id
* X-Requested-With

## 罕见的header
* X-Forwarded-For
* X-Wap-Profile
* Scheme
* Request-Uri
* X-Forwarded-Proto
* X-Real-Ip
* X-T5-Version
* X-Tc-Client-Type
* X-Tc-Session-Id
* Via
* X-Up-Bear-Type
* Clientip
* X-Requested-With

### X-Wap-Profile
* http://218.249.47.94/Xianghe/MTK_Phone_JB_UAprofile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_MT7-TL00_UAProfile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_EVA-AL10_UAProfile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_RIO-AL00_UAProfile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_H60_L01_UAProfile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_NXT-AL10_UAProfile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_ALE-TL00_UAProfile.xml
* http://wap1.huawei.com/uaprof/HUAWEI_TANGO_UAProfile.xml

### Accept
* application/json; q=1.0, text/*; q=0.8, */*; q=0.1

## 参考
* [Access-Control-Allow-Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Headers)