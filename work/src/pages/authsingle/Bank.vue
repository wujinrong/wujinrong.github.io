<!--
  -- 银行卡信息
  -- @author bigfact
  -->
<template>
  <section class="auth-bank fs18">
    <!--标题-->
    <div class="title row tac bg-white fs17">
      <span>为了方便收款，请填写银行卡信息</span>
    </div>
    <!--银行卡-->
    <div class="form bg-white">
      <div class="row line"></div>
      <div class="row">
        <span>姓名</span>
        <span class="form-value">{{ name.model }}</span>
      </div>
      <div class="row">
        <span>身份证号</span>
        <span class="form-value">{{ idNum.model }}</span>
      </div>
      <div v-if="cardId">
        <a v-link="'/bank/list?from=authBank'" class="row link">
          <span>银行卡</span>
          <div class="card-desc form-value c-gray" :style="'background-image: url(' + bank_icon + ')'">
            <span class="fs18">{{ bank_name }}</span>
            <span>{{ card_desc }}</span>
          </div>
        </a>
      </div>
      <div v-else>
        <div class="row">
          <span>银行卡号</span>
          <input class="form-value" v-model="num.model" type="text" @blur="setCache()">
        </div>
        <div class="row">
          <span>银行预留手机号</span>
          <input class="form-value" v-model="tel.model" type="tel" maxlength="11" placeholder="" @blur="setCache()">
        </div>
      </div>
    </div>
    <!--支持的银行-->
    <div class="support-link tar">
      <a v-link="'/bank/support'" class="c-warning fs15">查看支持的银行</a>
    </div>
    <!--提交按钮-->
    <button class="btn bottom fs20" v-submit="{cb: submit}">提交</button>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    name: {
      model: ''
    },
    idNum: {
      model: ''
    },
    num: {
      model: '',
      reg: regexp.bankcard,
      err: '请填写正确的银行卡号'
    },
    tel: {
      model: '',
      reg: regexp.phone,
      err: '请填写正确的银行预留手机号'
    },
    cardId: '',
    bank_icon: '',
    bank_name: '',
    card_desc: '',
    cacheName: 'cache-authsingle-bank'
  }

  export default {
    data() {
      var _this = this
      // 获取本地缓存
      _this.getCache()
      /**
       * 数据获取
       * http://git.fond.io/b/paydayloan/wikis/appv1/bank-index
       */
      ajax.get("/v3/bank/index")
        .then(function (xhr, res) {
          if (res.code == 0) {
            $data.name.model = res.data.name
            $data.idNum.model = res.data.identity
            if (typeof res.data.card === 'object' && res.data.card.individual_card_num) {
              $data.num.model = res.data.card.individual_card_num
              $data.tel.model = res.data.card.mobile
              $data.cardId = res.data.card.individual_card_id
              $data.bank_icon = res.data.card.bank_icon
              $data.bank_name = res.data.card.bank_name
              $data.card_desc = res.data.card.card_desc
              try {
                var chooseData = store.local.get('authBank')
                if (chooseData) {
                  chooseData = JSON.parse(chooseData)
                  console.log(chooseData)
                  $data.cardId = chooseData.id
                  $data.card_desc = chooseData.desc
                  $data.bank_icon = chooseData.bank_icon
                  $data.bank_name = chooseData.bank_name
                  store.local.remove('authBank')
                }
              } catch (err) {
                console.log(err)
              }
              // 清除本地缓存
              _this.clearCache()
            }
          } else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * 设置本地缓存
       */
      setCache() {
        var tmp = JSON.stringify({
          idnum: $data.idNum.model,
          num: $data.num.model,
          tel: $data.tel.model
        })
        store.local.set($data.cacheName, tmp)
      },
      /**
       * 获取本地缓存
       */
      getCache() {
        try {
          var tmp = JSON.parse(store.local.get($data.cacheName))
          // 判断本地缓存数据是否为同一个用户的数据
          if (tmp && $data.idNum.model == tmp.idnum) {
            $data.num.model = tmp.num
            $data.tel.model = tmp.tel
          } else {
            this.clearCache()
          }
        } catch (err) {
          console.log(err)
        }
      },
      /**
       * 清除本地缓存
       */
      clearCache() {
        store.local.remove($data.cacheName)
      },
      /**
       * 验证方法
       * @param {String} value           待验证值
       * @param {Function} validFunction 验证方法
       * @param {String} errTip          错误提示
       */
      validate(value, validFunction, errTip) {
        if (validFunction(value)) return true
        layer.tip(errTip)
        return false
      },
      /**
       * 数据提交
       */
      submit() {
        var _this = this

        // 如果是修改卡，则不需要检查卡号和手机号
        if (!$data.cardId) {
          // 检查表单
          if (!_this.validate($data.num.model, $data.num.reg, $data.num.err)) return
          if (!_this.validate($data.tel.model, $data.tel.reg, $data.tel.err)) return
        }

        // 设置本地缓存
        _this.setCache()

        // loading
        var lid = layer.loading(false)
        // 准备数据
        var data = {
          individual_card_id: $data.cardId,
          bank: $data.num.model,
          mobile: $data.tel.model,
          product_type: $data.applytype
        }
        /**
         * 数据提交
         * http://git.fond.io/b/paydayloan/wikis/appv1/bank-add
         */
        ajax.post('/v3/bank/add', data)
          .then(function (xhr, res) {
            if (res.code == 0) {
              history.back()
            } else {
              layer.warning(res.message)
            }
          })
          .complete(function () {
            layer.close(lid)
          })
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-bank {
    .title {
      color: #AEAEAE;
      padding: px2rem(18) 0;
      margin-bottom: px2rem(8);
      span {
        background: url('../../assets/auth/info.png') no-repeat;
        background-size: contain;
        padding-left: px2rem(25);
      }
    }
    .form {
      margin-top: px2rem(10);
      .row {
        padding: px2rem(18) px2rem(16);
        &.link {
          padding: px2rem(18) px2rem(28) px2rem(18) px2rem(16);
          background-position-x: 97%;
        }
      }
      .line {
        padding: 0;
        height: 1px;
      }
    }
    .card-desc {
      background-position: 0 center;
      background-repeat: no-repeat;
      background-size: contain;
      padding-left: px2rem(25);
    }
    .form-value {
      float: right;
      font-size: px2rem(15);
      margin-top: px2rem(2);
      text-align: right;
    }
    .support-link {
      padding: px2rem(15) px2rem(9);
    }
  }
</style>