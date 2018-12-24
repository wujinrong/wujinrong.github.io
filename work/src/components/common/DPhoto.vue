<!--
  图片上传组件
  @example
  <div class="photos">
    <d-photo v-bind:form.sync="form_photo"></d-photo>
  </div>
  <script>
    import DPhoto from 'path/to/DPhoto.vue'
    $data = {
      form_photo: {
        check: '',
        front: {
          name: '身份证正面',
          model: '',
          link: '',
          reg: regexp.empty,
          err: '请上传身份证正面',
          errshow: false,
        },
        back: {
          name: '身份证反面',
          model: '',
          link: '',
          reg: regexp.empty,
          err: '请上传身份证反面',
          errshow: false,
        },
        hand: {
          name: '手持身份证',
          model: '',
          link: '',
          reg: regexp.empty,
          err: '请上传手持身份证',
          errshow: false,
        },
      },
    }
    export default {
      data() {
        return $data
      },
      components: {
        DPhoto: DPhoto,
      },
    }
  </script>
-->

<template>
  <div class="clearfix">
    <div class="photo" id="{{ 'item_' + $key + (index ? index : '') }}" v-for="i in form | filterBy filterByLink">
      <div v-bind:style="i.link && { backgroundImage: 'url(' + i.link + ')', backgroundSize: '100% 100%' }">
        <!-- 上传 loading -->
        <div class="loading layermbox2" :class="$key">
          <div class="laymshade"></div>
          <div class="layermmain">
            <div class="section">
              <div class="layermcont">
                <i></i>
                <i class="laymloadtwo"></i>
                <i></i>
              </div>
            </div>
          </div>
        </div>
        <!-- 文件选择输入框 -->
        <input name="{{ $key }}" type="file" @click="click($event, i, $key, cos.isLogin)" @change="changeCos($event, i, cos, $key)" v-if='typeof i.model != "undefined"'>
        <!-- 示例图片弹层 -->
        <div class="example" v-if="i.example" v-show="i.example.show">
          <div class="mask" @click="hide(i)"></div>
          <div class="block">
            <p class="fs20">{{ i.example.title }}</p>
            <p class="img">
              <img :src="i.example.imgurl" alt="">
            </p>
            <p class="fs14 c-light">{{ i.example.tip }}</p>
            <div class="btn-block">
              <button @click="click($event, i, $key, cos.isLogin)" class="btn">去上传</button>
              <input name="{{ $key + '_hide' }}" type="file" @click="click($event, i, $key, cos.isLogin)" @change="changeCos($event, i, cos, $key)" v-if='typeof i.model != "undefined"'>
            </div>
          </div>
        </div>
      </div>
      <p class="name" v-if="i.name">{{ i.name }}</p>
      <!-- 报错信息 -->
      <p class="err" v-if="i.err" v-show="i.errshow">{{ i.err }}</p>
    </div>
    <!-- 添加图片按钮 -->
    <div class="photo" v-if='typeof form.add === "function"'>
      <div class="add" @click="form.add()"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      // 返回数据
      return {
        cos: {
          appid: "",
          bucketName: "",
          sign: "",
          // 用户是否登录
          isLogin: false,
        },
        // dsq 安卓 app 图片上传回调函数名，确保每个组件不同 
        dsqUploadCallbackName: 'dsqUploadCallback_' + Date.now(),
      }
    },
    props: ['form', 'index'],
    ready() {
      var _this = this
      // 没有上传功能的图片组件（仅用于显示），不进行初始化
      if(_this.form.noUpload) return
      // COS 上传鉴权
      ajax.get('/v3/upload/signature')
        .then(function (xhr, res) {
          if (res.code == 0) {
            _this.cos.appid = res.data.appid
            _this.cos.bucketName = res.data.bucketName
            _this.cos.sign = res.data.sign
            _this.cos.isLogin = true
          }
          else layer.warning(res.message)
        })
      // dsq 安卓 app 图片上传回调函数，配合 sysinfo.dsq.upload(id, callback) 使用
      if(sysinfo.dsq.isapp()) {
        var _form = _this.form
        typeof window[_this.dsqUploadCallbackName] != 'function' && (window[_this.dsqUploadCallbackName] = function(url, key) {
          if(_form[key]) {
            _form[key].link = url
            _form[key].errshow = false
          }
        })
      }
      // 初始化隐藏错误提示
      var form = _this.form
      for(var k in form) {
        typeof form[k].errshow != 'undefined' && (form[k].errshow = false)
      }
      // 重写父组件表单检查函数
      typeof form.check != 'undefined' && (form.check = function() {
        var index = this.index,
            pass = true,
            name = '',
            i = ''
        // 检查表单数据，定位第一个未检查通过的输入框
        for(var j in form) {
          i = form[j]
          if(i.reg) {
            i.reg(i.link) ? (i.errshow = false) : (i.errshow = true, pass = false, !name && (name = j))
          }
        }
        if(!name) return pass
        // 屏幕滚动到未验证通过的地方
        var row = document.querySelector('#item_' + name + (index ? index : ''))
        window.scroll(0, row.offsetTop - 20 ? row.offsetTop - 20 : 0)
        return pass
      }.bind(_this))
    },
    methods: {
      // 过滤不是上传图片组件的元素
      filterByLink(item) {
        return typeof item.$value.link != "undefined"
      },
      // 文件选择组件点击事件判断
      click(e, i, key, isLogin) {
        // 兼容先展示示例图片再上传的情况
        if(i.example && !i.example.show) {
          i.example.show = true
          e.preventDefault()
          return
        }
        if(i.example && i.example.show) {
          i.example.show = false
        }
        // dsq app 上传（版本大于 1.0.0）
        if(sysinfo.dsq.isapp() && sysinfo.isAndroid && sysinfo.dsq.getVersion() > 100) {
          e.preventDefault()
          sysinfo.dsq.upload(key, this.dsqUploadCallbackName)
          // // 由于前端和安卓同学失误，没有按照预先规定的文档来实现，所以这里做一下区分
          // if (sysinfo.isAndroid) sysinfo.dsq.upload(key, this.dsqUploadCallbackName)
          // else sysinfo.dsq.upload(this.dsqUploadCallbackName, key)
        }
        else if(!isLogin) {
          // 未登录则阻止上传
          e.preventDefault()
        }
      },
      // 普通上传 COS
      changeCos: function (e, i, cos, key) {
        var _this = e.target
        if (_this.getAttribute('type') != 'file') return
        
        // 文件类型和大小检查
        var file = _this.files[0]
        if (!/image\/[jpg,jpeg,png,JPG,JPEG,PNG]/.test(file.type)) {
          layer.warning('请确保文件为图像类型')
          return
        }
        if (file.size > 10000000) {
          layer.warning('请上传小于 10M 的图片')
          return
        }

        // 计算文件名
        var arr = file.name.split('.')
        var filename = arr[arr.length - 1]
        arr.pop()
        filename = arr.join('.') + '-' + Date.now() + '.' + filename

        // 准备上传图片数据
        var url = location.protocol + '//web.file.myqcloud.com/files/v1/'
          + cos.appid + '/'
          + cos.bucketName + '/'
          + encodeURI(filename)
          + '?sign=' + encodeURIComponent(cos.sign)
        var formdata = new FormData()
        formdata.append('op', 'upload')
        formdata.append('fileContent', file)
        // formdata.append('insertOnly', 0)

        // 上传图片并回显
        var loading = document.querySelector('.loading.' + key)
        loading.style.display = 'block'
        ajax.upload(url, formdata)          
          .then(function(xhr, res) {
            // 上传成功
            if(res.code == 0) {
              i.link = res.data.access_url
              i.errshow = false
            }
            // 上传失败
            else layer.warning(res.message)
          })
          .catch(function (err, xhr) {
            // 上传失败
            layer.warning('图片上传失败 - ' + xhr.status)
            // 签名失效重新签名
            if(typeof xhr.response.message != 'undefined' && xhr.response.message == 'ERROR_PROXY_AUTH_EXPIRED') {
              ajax.get('/v3/upload/signature')
                .then(function (xhr, res) {
                  if (res.code == 0) {
                    cos.appid = res.data.appid
                    cos.bucketName = res.data.bucketName
                    cos.sign = res.data.sign
                    cos.isLogin = true
                  }
                })
              return
            }
          })
          .complete(function() {
            loading.style.display = 'none'
          })
      },
      // 隐藏示例图片
      hide(i) {
        i.example && (i.example.show = false) 
      }
    },
    components: { },
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/_globals.scss';
  .photo {
    width: 33.33%;
    /*height: px2rem(110);*/
    float: left;
    text-align: center;
    padding: px2rem(10) 0;
    > div {
      position: relative;
      display: inline-block;
      height: px2rem(65);
      width: px2rem(65);
      border: 1px solid $light;
      border-radius: 3px;
      background: url('../../assets/auth/photo/cam.png') no-repeat 50%;
      background-size: px2rem(21);
    }
    > .add {
      background: url('../../assets/auth/photo/add.png') no-repeat 50%;
      background-size: px2rem(21);
    }
    input {
      height: 100%;
      width: 100%;
      opacity: 0;
    }
    .name {
      padding-top: px2rem(10);
    }
    .err {
      color: $red;
      text-align: center !important;
    }
  }
  .block {
    background: #FFF;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: px2rem(30) px2rem(12) 0;
    box-sizing: border-box;
    width: 100%;
    max-width: $html_max_width;
    overflow-y: scroll;
    z-index: 999;
    .img {
      padding: px2rem(20) 0;
      > img {
        height: px2rem(97);
      }
    }
    .btn-block {
      position: relative;
      padding: px2rem(20) px2rem(1);
      input {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
      }
    }
  }
  .loading {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    i {
      width: px2rem(15);
      height: px2rem(15);
      margin: 0;
    }
    .laymloadtwo {
      margin: 0 px2rem(3);
    }
    .laymshade,
    .layermmain {
      position: absolute;
    }
  }
</style>