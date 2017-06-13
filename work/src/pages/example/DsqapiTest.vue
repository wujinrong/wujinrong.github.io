<!--
  -- 贷上钱 app js api 测试页面
  -- @author bigfact
  -->
<template>
  <section class="example-dsqapitest">
    <!--通用功能按钮-->
    <div class="btn-wrap">
      <button v-for="i in btns" class="btn" @click="click(i.click, i.callbackName)">{{ i.title }}</button>
    </div>
    <!--上传图片-->
    <div class="btn-wrap">
      <button class="btn" @click="clickUpload(upload.click, upload.callbackName)">{{ upload.title }}</button>
    </div>
    <div class="upload-img">
      <div class="tac">上传图片回显</div>
      <div class="tac">
        <img :src="upload.imgUrl" alt="" v-if="upload.imgUrl" style="width: 90%;">
      </div>
    </div>
    <!--获取联系人-->
    <div class="btn-wrap">
      <button class="btn" @click="clickGetContact(getContact.click, getContact.callbackName)">{{ getContact.title }}</button>
    </div>
    <div>
      <div class="tac">获取联系人回显</div>
      <div class="row">
        <span>ID</span>
        <span class="fr">{{ getContact.id }}</span>
      </div>
      <div class="row">
        <span>姓名</span>
        <span class="fr">{{ getContact.name }}</span>
      </div>
      <div class="row">
        <span>电话</span>
        <span class="fr">{{ getContact.tel }}</span>
      </div>
    </div>
    <!--调试工具-->
    <d-debuger style="height: 30px;"></d-debuger>
  </section>
</template>

<script>
  import DDebuger from '../../components/common/DDebuger'
  function getNow() {
    return Date.now()
  }
  var callbackNamePrefix = 'callback'
  var $data = {
    name: '陈宇亮',
    idNum: '522172837738738813',
    btns: [
      {
        callbackName: callbackNamePrefix + getNow(),
        click: function (callbackName) {
          return sysinfo.dsq.getLocation(callbackName)
        },
        title: '上报地址'
      },
      {
        callbackName: callbackNamePrefix + getNow(),
        click: function (callbackName) {
          return sysinfo.dsq.postContacts(callbackName)
        },
        title: '上报联系人'
      },
      {

        callbackName: callbackNamePrefix + getNow(),
        click: function (callbackName) {
          return sysinfo.dsq.openOCR(callbackName, 1, 1)
        },
        title: '调用 OCR 身份验证'
      },
      {
        callbackName: callbackNamePrefix + getNow(),
        click: function (callbackName) {
          return sysinfo.dsq.openFaceIdentify(callbackName, $data.name, $data.idNum, 1)
        },
        title: '调用活体识别'
      },
      {
        callbackName: callbackNamePrefix + getNow(),
        click: function (callbackName) {
          return sysinfo.dsq.openGongjijin(callbackName)
        },
        title: '获取公积金信息'
      }
    ],
    // getContacts
    getContact: {
      id: '0',
      name: '',
      tel: '',
      callbackName: callbackNamePrefix + getNow(),
      click: function (callbackName) {
        return sysinfo.dsq.getContact(callbackName)
      },
      title: '获取联系人'
    },
    upload: {
      imgUrl: '',
      callbackName: callbackNamePrefix + getNow(),
      click: function (callbackName) {
        return sysinfo.dsq.upload(callbackName)
      },
      title: '上传图片'
    }
  }

  export default {
    data() {
      return $data
    },
    methods: {
      /**
       * 通用点击测试回调函数
       * @param {Function} clickFunction 预设点击回调函数
       * @param {String}   callbackName  js api 回调函数名
       */
      click(clickFunction, callbackName) {
        if (typeof clickFunction === 'function') {
          if (typeof window[callbackName] !== 'function') {
            window[callbackName] = function (response) {
              layer.warning('回调数据：' + response)
              console.log(response)
            }
          }
          var status = clickFunction(callbackName)
          layer.warning('调用状态：' + status)
        }
      },
      /**
       * 上传图片
       * @param {Function} clickFunction 预设点击回调函数
       * @param {String}   callbackName  js api 回调函数名
       */
      clickUpload(clickFunction, callbackName) {
        if (typeof clickFunction === 'function') {
          if (typeof window[callbackName] !== 'function') {
            window[callbackName] = function (url, id) {
              console.log(url, id)
              $data.upload.imgUrl = url
            }
          }
          var status = clickFunction(callbackName)
          layer.warning('调用状态：' + status)
        }
      },
      /**
       * 获取联系人
       * @param {Function} clickFunction 预设点击回调函数
       * @param {String}   callbackName  js api 回调函数名
       */
      clickGetContact(clickFunction, callbackName) {
        if (typeof clickFunction === 'function') {
          if (typeof window[callbackName] !== 'function') {
            window[callbackName] = function (id, name, tel) {
              console.log(id, name, tel)
              $data.getContact.name = name
              $data.getContact.tel = tel
              $data.getContact.id = id
            }
          }
          var status = clickFunction(callbackName)
          layer.warning('调用状态：' + status)
        }
      }
    },
    components: {
      DDebuger: DDebuger
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .example-dsqapitest {
    padding: px2rem(15);
    .btn {
      margin-bottom: px2rem(20);
    }
  }
</style>