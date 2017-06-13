<!--
  -- 更换默认的收款银行卡
  -- @author bigfact
  -->
<template>
  <section class="bank-change-recevie container fs15">
    <!-- 收款银行卡 -->
    <div class="form">
      <div class="row">
        <span>姓名</span>
        <span class="fr">{{ name }}</span>
      </div>
      <div class="row">
        <span>身份证号</span>
        <span class="fr">{{ identity }}</span>
      </div>
      <a class="row link" v-link="'/bank/list?from=bankChangeRecevie'">
        <span>选择银行卡</span>
        <span class="fr c-green">{{ cardDesc }}</span>
      </a>
      <p class="err" v-show="errShow">请选择银行卡</p>
    </div>
    <!-- 提交按钮 -->
    <div class="btn-wrap">
      <d-button v-bind:button.sync="button"></d-button>
    </div>
  </section>
</template>

<script>
  import DButton from '../directives/DButton.vue'
  var $data = {
    // 持卡人信息
    name: '',
    identity: '',
    cardId: '',
    cardDesc: '',
    // 下一步按钮
    button: {
      name: '确认换卡',
      class: 'btn',
      click: '',
    },
    // 错误显示控制
    errShow: false,
    // 来源页面
    from: '',
  }
  export default {
    data() {
      // 错误显示控制
      $data.errShow = false
      // 来源页面
      $data.from = this.$route.query.from || ''
      // 获取 localStorage 中设置的银行卡数据
      try {
        var tmp = JSON.parse(store.local.get('bankChangeRecevie'))
        $data.cardId = tmp.id
        $data.cardDesc = tmp.desc
      } catch (err) {
        store.local.remove('bankChangeRecevie')
      }
      // 下一步按钮点击回调函数
      $data.button.click = this.submit
      // 数据获取
      ajax.get('/v3/util/get-user-info')
        .then(function(xhr,res) {
          if(res.code == 0){
            $data.identity = res.data.individual_identity || ''
            $data.name = res.data.individual_name || ''
          } else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      // 更换收款银行卡
      submit() {
        if(!$data.cardId) {
          $data.errShow = true
          return
        }
        $data.errShow = false
        var lid = layer.loading(false)
        var data = {
          individual_card_id : $data.cardId
        }
        ajax.post('/v3/bank/change-default-card', data)
          .then(function(xhr,res) {
            if(res.code == 0) {
              store.local.remove('bankChangeRecevie')
              if ($data.from == 'appindex') {
                // 来源为 app 首页
                sysinfo.dsq.openView('index')
              } else {
                history.back()
              }
            } else {
              layer.warning(res.message)
            }
          })
          .complete(function() {
            layer.close(lid)
          })
      },
    },
    components: {
      DButton: DButton,
    },
    destroyed() {
      // 用户离开这个页面的时候清空数据
      store.local.remove('bankChangeRecevie')
      $data.cardId = ''
      $data.cardDesc = ''
    },
  }
</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .bank-change-recevie {
    .form {
      padding-top: px2rem(10);
    }
    .row {
      padding: px2rem(20) px2rem(15);
      margin-top: 0;
      background-position: 99%;
    }
    .err {
      color: $red;
      text-align: right;
      padding: px2rem(10) px2rem(15) px2rem(10) 0;
    }
    .btn-wrap {
      margin: px2rem(30) 0;
    }
  }
</style>
