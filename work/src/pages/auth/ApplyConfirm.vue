<!--
  -- 申请确认
  -- @author bigfact
  -->
<template>
  <section class="auth-applyconfirm">
    <!--banner-->
    <div class="banner tac c-white">
      <div class="fs40">{{ money.apply_amount }}元</div>
      <div class="fs15">可借额度</div>
    </div>
    <!--申请详情列表-->
    <div class="apply-list bg-white fs18">
      <div class="row">
        <span>借款金额</span>
        <span class="fr c-placeholder">
          <input id="apply-amount" type="number" class="tar" v-model="applyAmount" @blur="checkApplyAmount(applyAmount)"> 元
        </span>
      </div>
      <div class="row select" @click="showPeriodSelect()">
        <span>申请期数</span>
        <span class="fr c-placeholder">{{ applyPeriod.key }}</span>
      </div>
      <d-select id="apply-period-select" :datas="applyPeriod.datas" :value="applyPeriod.value" v-show="applyPeriod.selectShow" @selected="periodSelected"></d-select>
      <div class="row">
        <span>每期应还</span>
        <span class="fr c-placeholder">{{ getPeriodAmount(applyAmount, productChosen) }}元</span>
      </div>
    </div>
    <!--提交按钮-->
    <div class="btn-wrap">
      <button class="btn bottom fs20" @click="showConfirm()">确认申请</button>
    </div>
    <!--确认提交弹窗-->
    <div class="layui-m-layer layui-m-layer0" v-show="confirmShow">
      <div class="layui-m-layershade"></div>
      <div class="layui-m-layermain">
        <div class="layui-m-layersection">
          <div class="layui-m-layerchild  layui-m-anim-scale">
            <div class="confirm-content tac fs18">
              <p>请确认最终借款金额及期数，</p>
              <p>确认后请耐心等待合同推送</p>
              <div class="btns">
                <button class="btn inline disabled" @click="hideConfirm()">再想想</button>
                <button class="btn inline" v-submit="{cb: submit}">确认</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import DSelect from '../../components/common/DSelect'

  var $data = {
    // 申请类型，单期 single ，分期 multiple
    applytype: sysinfo.getQueryString('applytype') || 'single',
    // 申请期数下拉列表数据
    applyPeriod: {
      datas: [],
      key: '',
      value: '',
      selectShow: false
    },
    // 用户选择的产品
    productChosen: {},
    // 用户输入申请金额
    applyAmount: 0,
    // 是否显示确认申请弹窗
    confirmShow: false,
    // 后端返回数据
    apply_id: 0,       // 申请id
    // 金额数据
    money: {
      min: 0,          // 可申请最小金额
      max: 0,          // 可申请最大金额
      step: 0,         // 金额变化梯度
      apply_amount: 0  // 用户可借金额
    },
    // 产品数组
    product: [],
    // applyInputEl: ''
  }

  export default {
    data() {
      var _this = this
      /**
       * http://git.fond.io/b/paydayloan/wikis/apply-confirm-v2
       * 获取申请资料数据
       */
      ajax.get('/v3/apply/confirm', {
        product_type: $data.applytype
      }).then(function (xhr, res) {

        // // test data
        // res.code = 0
        // res.data = {
        //   "apply_id": 1,//int 申请id,
        //   "apply_product_id": 7, //int 默认选中产品id
        //   "amount_tip": "可借额度",//string 可借金额提示文案
        //   "money": {
        //     "min": 500,//int 可申请最小金额
        //     "max": 2000,//int 可申请最大金额
        //     "step": 100,//int 金额变化梯度
        //     "apply_amount": 500 //int 用户申请金额
        //   },
        //   "product": [
        //     {
        //       "product_id": 1,//int 产品id
        //       "product_interest_rate_percent": 0.021,//double 产品费率
        //       "product_period_count": 7,//int 产品期限
        //       "product_period_count_desc": "7天",//string 产品期限描述
        //     },
        //     {
        //       "product_id": 7,//int 产品id
        //       "product_interest_rate_percent": 0.021,//double 产品费率
        //       "product_period_count": 14,//int 产品期限
        //       "product_period_count_desc": "14天",//string 产品期限描述
        //     }
        //   ]
        // }

        if (res.code == 0) {
          $data.apply_id = res.data.apply_id
          $data.applyAmount = res.data.money.apply_amount
          $data.money = res.data.money
          $data.product = res.data.product
          // 处理产品数据
          var defaultProductId = res.data.apply_product_id
          var productChosen = {}
          $data.applyPeriod.datas = []
          for (var i = 0; i < $data.product.length; i++) {
            $data.applyPeriod.datas.push({
              key: $data.product[i].product_period_count_desc,
              value: $data.product[i].product_id
            })
            if (defaultProductId == $data.product[i].product_id) productChosen = $data.product[i]
          }
          $data.productChosen = productChosen
          _this.getPeriodAmount($data.applyAmount, $data.productChosen)
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    // created() {
    //   // 监听用户输入金额
    //   this.$watch('applyAmount', function (newVal, oldVal) {
    //     if (newVal > $data.money.apply_amount && $data.applyInputEl) {
    //       $data.applyAmount = oldVal
    //       $data.applyInputEl.value = $data.applyAmount
    //     }
    //   })
    // },
    // ready() {
    //   // 选取金额输入元素
    //   $data.applyInputEl = document.getElementById('apply-amount')
    // },
    methods: {
      /**
       * 检查输入的申请金额
       * @param {Number} val 用户输入的金额
       */
      checkApplyAmount(val) {
        var money = $data.money
        if (val > money.apply_amount) {
          layer.tip('申请金额不得大于可借额度')
          return false
        }
        // console.log(val, val % money.step != 0 || val < money.min || val > money.max)
        if (val % money.step != 0 || val < money.min || val > money.max) {
          layer.tip('申请金额必须为 ' + money.step + ' 的整数倍且不得小于 ' + money.min + ' 不得大于 ' + money.max)
          return false
        }
        return true
      },
      /**
       * 获取每期应还金额
       * @param {Number} val           用户输入的金额
       * @param {Object} productChosen 当前选择产品
       */
      getPeriodAmount(val, productChosen) {
        // 借款金额 * 4.5% + 借款金额/期数 四舍五入保留两位小数
        $data.applyPeriod.key = productChosen.product_period_count_desc
        $data.applyPeriod.value = productChosen.product_id
        // console.log(val * productChosen.product_interest_rate_percent + val / productChosen.product_period_count)
        return Math.round((val * productChosen.product_interest_rate_percent + val / productChosen.product_period_count) * 100) / 100 || 0
      },
      /**
       * 显示期数下拉列表
       */
      showPeriodSelect() {
        $data.applyPeriod.selectShow = true
      },
      /**
       * 期数选择完成监听函数
       * @param {Object} data       事件附带数据
       * @param {Number} data.index 选择数据序号
       */
      periodSelected(data) {
        // console.log(data)
        if ($data.product[data.index]) {
          $data.productChosen = $data.product[data.index]
          this.getPeriodAmount($data.applyAmount, $data.productChosen)
        }
        $data.applyPeriod.selectShow = false
      },
      /**
       * 显示确认提交弹窗
       */
      showConfirm() {

        // // testdata
        // if (this.$route.query.from) history.back()
        // else sysinfo.dsq.closeWebView()

        // 当金额小于 5000 时，期数大于等于 6 都不能选
        if ($data.applyAmount < 5000 && $data.productChosen.product_period_count > 3) {
          layer.tip('借款金额小于 5000 申请期数不能选择 3 期以上')
          return false
        }

        if (this.checkApplyAmount($data.applyAmount)) $data.confirmShow = true
      },
      /**
       * 隐藏确认提交弹窗
       */
      hideConfirm() {
        $data.confirmShow = false
      },
      /**
       * 提交数据
       */
      submit() {
        var _this = this
        _this.hideConfirm()
        if (!_this.checkApplyAmount($data.applyAmount)) return
        // loading
        var lid = layer.loading(false)
        var router = _this.$router
        /**
         * 提交数据
         * http://git.fond.io/b/paydayloan/wikis/apply-confirm-commit-v2
         */
        ajax.get('/v3/apply/confirm-save', {
          apply_id: $data.apply_id,
          apply_amount: $data.applyAmount,
          product_id: $data.applyPeriod.value
        }).then(function (xhr, res) {
          if (res.code == 0) {
            // 如果有路由查询参数来源，则直接历史回退
            if (_this.$route.query.from) history.back()
            // 关闭当前 WebView 回到来源的 app 页面
            // else sysinfo.dsq.closeWebView()
            else sysinfo.dsq.openView('index')
          } else {
            layer.warning(res.message)
          }
        }).complete(function () {
          layer.close(lid)
        })
      }
    },
    components: {
      DSelect: DSelect
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-applyconfirm {
    box-sizing: border-box;
    padding-top: px2rem(10);
    .banner {
      background: url('../../assets/auth/applyconfirm/banner-bg.png') no-repeat center;
      border-radius: px2rem(8);
      margin: 0 px2rem(12) px2rem(10);
      padding: px2rem(30) 0;
    }
    .apply-list {
      .row {
        padding: px2rem(18) px2rem(30) px2rem(18) px2rem(16);
      }
      .select {
        background-position-x: 98%;
      }
    }
    .btn-wrap {
      padding: px2rem(70) px2rem(38) px2rem(30);
    }
    .confirm-content {
      padding: px2rem(25) px2rem(10) px2rem(15) px2rem(10);
      .btns {
        margin-top: px2rem(15);
      }
      .inline {
        padding: px2rem(6) 0;
        width: 45%;
      }
    }
  }
</style>