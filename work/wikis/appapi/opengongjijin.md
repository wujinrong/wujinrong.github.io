### 获取公积金信息

  通过调用 API，让 app 弹出获取公积金信息的窗口，用户授权完成之后通过回调函数返回数据

#### 调用方法
```js
dsqapi.openGongjijin(String callbackName)
```

#### 调用参数
| 参数       | 类型      | 是否必须 | 说明    | 示例数据         |
| -------   | -------  | ------- | ------- | ------- |
| **callbackName** | *String* | 是 | 回调函数名，此回调函数接收一个参数 webview.loadUrl("javascript:" + callbackName + "(" + response + ")");| |

#### 返回参数
| 参数       | 类型      | 是否必须 | 说明    | 示例数据         |
| -------   | -------  | ------- | ------- | -------     |
| **status** | *boolean* | 是   | api 是否调取成功 |  |

#### 实际例子
```js
var callbackName = 'callback0'
window[callbackName] = function (response) {
  console.log(response)
}
var status = dsqapi.openGongjijin(callbackName)
console.log(status)
```