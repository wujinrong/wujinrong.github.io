<!--
  -- 审核结果、补充信息
  -- @description 
  -- @author bigfact
  -- @date 2017.05.18
  -->
<template>
  <section class="auth-result container">
    <!--审核结果（失败）-->
    <!--<div class="fail-wrap" v-if="false">
      <div class="tac">
        <img class="fail-icon" src="../../assets/auth/result/i-fail.png" alt="">
      </div>
      <div class="tac fs15">
        <p class="fs20">非常抱歉，您的借款申请未通过审核</p>
        <p class="c-placeholder">请一个月后再来申请！</p>
      </div>
      <div class="btn-wrap">
        <button class="btn outline" @click="goto()">返回主页</button>
      </div>
    </div>-->
    <!--补充信息-->
    <div class="success-wrap">
      <div class="tac fs20">
        <img src="../../assets/auth/result/i-success.png" alt="" class="success-icon">
        <p>恭喜您！</p>
        <p>还差一步，即可拿到钱！</p>
      </div>
      <div class="form fs18">
        <div class="row"></div>
        <div class="row" v-submit="{cb: showLivingIdentity, time: 3000}">
          <span>人脸识别</span>
          <span class="field-vaild form-value c-placeholder" :class="getClassByStatus(livingIdentityStatus)">{{ getNameByStatus(livingIdentityStatus) }}</span>
        </div>
        <div class="row" :class="bank_icon && 'link'" v-link="'/authsingle/bank'">
          <span>收款银行卡</span>
          <div class="card-desc form-value" v-if="bank_icon" :style="'background-image: url(' + bank_icon + ')'">
            <span class="fs18">{{ card_name }}</span>
            <span>{{ card_desc }}</span>
          </div>
          <span class="field-vaild warning form-value c-placeholder" v-else="bankcard_bank">未填写</span>
        </div>
      </div>
      <div class="foot-tip c-placeholder tac fs15">请于三天内完成认证，否则会自动取消</div>
      <div class="btn-wrap">
        <button class="btn outline" @click="submit()">下一步</button>
      </div>
    </div>
  </section>
</template>

<script>
  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // 您的姓名
    name: {
      model: '',
      reg: regexp.name,
      err: '请输入正确姓名'
    },
    // 身份证号
    id_num: {
      model: '',
      reg: regexp.idcard,
      err: '请填写正确的身份证号'
    },
    // 活体识别状态：0 未识别 ; 1 已识别; 2 已失效
    livingIdentityStatus: 0,
    // 活体识别 sdk type
    livingIdentitySdkType: 1,
    // 活体识别状态认证完成回调函数
    livingIdentityCbName: 'livingIdentityCb' + Date.now(),
    bank_icon: '', // 银行icon
    card_name: '', // 建设银行
    card_desc: '', // 尾号 9834
  }

  export default {
    data() {
      /**
       * 获取 app sdk 配置信息
       * http://git.fond.io/b/paydayloan/wikis/appv1/individual-ocrliving-config
       */
      ajax.get('/v3/individual/ocrliving-config')
        .then(function (xhr, res) {
          if (res.code == 0) {
            $data.livingIdentitySdkType = res.data.identity_living_sdk
            // 姓名身份证号
            $data.name.model = res.data.individual_name
            $data.id_num.model = res.data.individual_identity
          } else {
            layer.warning(res.message)
          }
        })
      /**
       * 获取用户数据
       * https://git.fond.io/b/paydayloan/wikis/v3/individual/extra-data-menu
       */
      ajax.get('/v3/individual/extra-data-menu')
        .then(function (xhr, res) {
          if (res.code == 0) {
            if (res.data) {
              // 活体识别状态
              $data.livingIdentityStatus = res.data.living_identity
              // 收款银行卡信息
              $data.bank_icon = res.data.card.bank_icon
              $data.card_name = res.data.card.card_name
              $data.card_desc = res.data.card.card_desc
            }
          } else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * 根据状态获取样式名
       * @param {Number} status 状态， 0 未识别 ; 1 已识别; 2 已失效
       * @returns {String} 样式类名
       */
      getClassByStatus(status) {
        return status === 0 ? 'warning' : status === 1 ? 'pass' : 'invalid'
      },
      /**
       * 根据状态获取状态名
       * @param {Number} status 状态， 0 未识别 ; 1 已识别; 2 已失效
       * @returns {String} 状态名
       */
      getNameByStatus(status) {
        return status === 0 ? '未识别' : status === 1 ? '已识别' : '已失效'
      },
      /**
       * 显示人脸识别
       */
      showLivingIdentity() {
        // 如果用户已经识别过，则不再显示人脸识别
        if ($data.livingIdentityStatus === 1) {
          layer.tip('您已通过人脸识别')
          return
        }
        if (typeof window[$data.livingIdentityCbName] !== 'function') {
          window[$data.livingIdentityCbName] = function (response) {
            console.log(response)
            $data.livingIdentityStatus = response ? 1 : 0
          }
        }
        sysinfo.dsq.openFaceIdentify($data.livingIdentityCbName, $data.name.model, $data.id_num.model, $data.livingIdentitySdkType)
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
      // 跳转到首页
      goto() {
        sysinfo.dsq.openView('index')
      },
      // 提交数据
      submit() {
        var _this = this

        if ($data.livingIdentityStatus !== 1) {
          layer.tip('请先验证人脸识别')
          return
        }

        // 路由对象
        var router = _this.$router
        // loading
        var lid = layer.loading(false)
        /**
         * 提交数据
         * https://git.fond.io/b/paydayloan/wikis/v3/apply/living-verify
         */
        ajax.post('/v3/apply/living-verify')
          .then(function (xhr, res) {
            if (res.code == 0) router.replace('/authsingle/submit/success')
            else layer.warning(res.message)
          })
          .complete(function () {
            layer.close(lid)
          })
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .auth-result {
    .form {
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
    .form-value {
      float: right;
      font-size: px2rem(15);
      text-align: right;
    }
    .field-vaild {
      background-repeat: no-repeat;
      background-position: 0 center;
      background-size: contain;
      padding-left: px2rem(22);
      &.warning {
        background-image: url(../../assets/auth/i-warning.png);
      }
      &.pass {
        background-image: url(../../assets/auth/i-pass.png);
      }
      &.invalid {
        background-image: url(../../assets/auth/i-invalid.png);
      }
    }
    .foot-tip {
      padding: px2rem(15) 0;
    }
    /*.fail-wrap {
      padding-top: px2rem(100);
      .btn {
        margin-top: px2rem(80);
      }
    }
    .fail-icon {
      width: px2rem(95);
      margin-bottom: px2rem(17);
    }*/
    .card-desc {
      background-position: 0 center;
      background-repeat: no-repeat;
      background-size: contain;
      padding-left: px2rem(25);
    }
    .success-wrap {
      padding-top: px2rem(50);
      .btn {
        margin-top: px2rem(38);
      }
    }
    .success-icon {
      width: px2rem(122);
      margin-bottom: px2rem(17);
    }
    .btn-wrap {
      padding: 0 px2rem(80);
    }
    .btn {
      color: #4A4A4A;
    }
  }
</style>