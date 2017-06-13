<template>
  <section class="id-reupload container">
      <div class="photos">
        <div class="p-title fs15">
          身份证件照片<span class="fs13 c-light">（正反面及手持身份证照片）</span>
        </div>
        <d-photo v-bind:form.sync="formIdPhoto"></d-photo>
      </div>
      <div class="btn-wrap">
        <d-button v-bind:button.sync="button"></d-button>
      </div>
  </section>
</template>

<script>
import DPhoto from '../../components/common/DPhoto'
import DButton from '../../components/directives/DButton'

var $data = {
  // 身份信息照片
  formIdPhoto: {
    check: '',
    front: {
      name: '身份证正面',
      model: '',
      link: '',
      reg: regexp.empty,
      err: '请上传照片',
      errshow: false,
      example: {
        title: '身份证正面示例',
        tip: '请确保照片中的身份证清晰可识别',
        imgurl: './static/img/auth/id-ex-front.png',
        show: false
      }
    },
    back: {
      name: '身份证反面',
      model: '',
      link: '',
      reg: regexp.empty,
      err: '请上传照片',
      errshow: false,
      example: {
        title: '身份证反面示例',
        tip: '请确保照片中的身份证清晰可识别',
        imgurl: './static/img/auth/id-ex-back.png',
        show: false
      }
    },
    hand: {
      name: '手持身份证',
      model: '',
      link: '',
      reg: regexp.empty,
      err: '请上传照片',
      errshow: false,
      example: {
        title: '手持身份证示例',
        tip: '请确保照片中的身份证清晰可识别',
        imgurl: './static/img/auth/id-ex-hand.png',
        show: false
      }
    }
  },
  // 下一步按钮
  button: {
    name: '重新上传提交',
    class: 'btn',
    click: ''
  }
}

export default {
  data() {
    // 上传按钮点击函数
    $data.button.click = this.submit
    return $data
  },
  methods: {
    submit() {
      var pass = true
      // 身份信息照片检查
      typeof $data.formIdPhoto.check === 'function' && !$data.formIdPhoto.check() && (pass = false)
      if(!pass) return

      // 检查通过提交数据
      var data = {
        // 身份信息照片
        idcard_face: $data.formIdPhoto.front.link,
        idcard_back: $data.formIdPhoto.back.link,
        idcard_hand: $data.formIdPhoto.hand.link
      }

      ajax.post('/v3/individual/identity-save', data)
        .then(function(xhr, res) {
          if(res.code == 0) {
            location.href = '#!/my/progress'
          }
          else {
            layer.warning(res.message)
          }
        })
        .complete(function() {
          layer.close(lid)
        })
    },
  },
  components: {
    DPhoto: DPhoto,
    DButton: DButton
  }
}
</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .id-reupload {
    .photos {
      padding: px2rem(26) px2rem(16);
    }
    .btn-wrap {
      margin-top: px2rem(30);
    }
  }
</style>
