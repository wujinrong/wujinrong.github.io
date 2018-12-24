<!--
  -- 余额提现
  -- @author bigfact
  -->
<template>
  <section class="withdrawals-detailed fs18">
    <!--银行卡列表-->
    <div>
      <div class="line-10"></div>
      <div class="group">
        <div v-link="'/bank/list?from=withdrawals'" class="row" :style="'background: url(' + info.card.bank_icon + ') no-repeat 1.5rem; background-size: 3.5rem'">
          <span>{{ info.card.bank_name }}</span>
          <span class="fs15 c-link">{{ info.card.card_desc }}</span>
        </div>
      </div>
      <div class="line-10"></div>
      <div class="group">
        <div class="withdrawals">
          <div class="title">提现金额</div>
          <div class="codes-area"><span class="codes">¥</span><input type="text" v-model="form.withdrawals_balance.model"></div>
          <div>余额：{{ info.amount }} <span @click="getAll()" class="c-link">全部提现</span></div>
        </div>
      </div>
      <!-- 支持银行卡链接 -->
      <!--<div class="support-link tar">
        <a class="c-green" v-link="'/bank/support'">查看支持的银行</a>
      </div>-->
      <!-- 提交按钮 -->
      <div class="btn-wrap">
        <button class="btn" v-submit="{cb: submit}">提现</button>
      </div>
    </div>

    <!-- 提现规则 -->
    <ul class="rules fs12 c-gray">
      <li class="c-red">提现规则：</li>
      <li>- 现金奖励可累加，累计20元即可提现；</li>
      <li>- 每周可申请一次现金提现；</li>
      <li>- 申请成功后，奖金将在1个工作日内发放到您绑定的银行卡。</li>
    </ul>

  </section>
</template>

<script>
  var $data = {
    info: {
      card: {
        bank_icon: '',
        bank_name: '',
        card_desc: '',
        individual_card_id: ''
      },
      amount: 0
    },
    form: {
      withdrawals_balance: {
        model: '',
        reg: regexp.defaultMoney,
        err: '请填写正确的金额'
      }
    },
  }
  export default {
    data() {
      /**
       * 获取数据
       * http://git.fond.io/b/paydayloan/wikis/appv1/bank-get-my-cards
       */
      ajax.get('/v3/account/info')
        .then(function (xhr, res) {
          if (res.code == 0) {
            var tmp = '';
            tmp = res.data.card;
            $data.info.card = tmp;
            $data.info.amount = res.data.amount;
            try {
              tmp = JSON.parse(store.local.get('withdrawals'));
              $data.info.card.bank_icon = tmp.bank_icon;
              $data.info.card.bank_name = tmp.bank_name;
              $data.info.card.card_desc = tmp.desc;
              $data.info.card.individual_card_id = tmp.id;
            } catch (err) {
              store.local.remove('withdrawals');
            }
          }
        })
      return $data
    },
    methods: {
      getAll() {
        $data.form.withdrawals_balance.model = $data.info.amount;
      },
      validate(value, validFunction, errTip) {
        if (validFunction(value)) return true
        layer.tip(errTip)
        return false
      },
      submit() {
        var _this = this
        if (!_this.validate($data.form.withdrawals_balance.model, $data.form.withdrawals_balance.reg, $data.form.withdrawals_balance.err)) return
        if (parseInt($data.form.withdrawals_balance.model) < 20) return layer.tip("提现金额不可小于20元")
        if (parseInt(parseInt($data.form.withdrawals_balance.model)) > parseInt($data.info.amount)) return layer.tip("金额不可超过可提现金额")
        if (parseInt($data.form.withdrawals_balance.model) <= parseInt($data.info.amount)) {
          var data = {
            amount: $data.form.withdrawals_balance.model,
            individual_card_id: $data.info.card.individual_card_id
          }
          ajax.post('/v3/account/withdraw', data)
            .then(function (xhr, res) {
              if (res.code == 0) {
                var withdrawals_result = {
                  amount: $data.form.withdrawals_balance.model,
                  bank_icon: $data.info.card.bank_icon,
                  bank_name: $data.info.card.bank_name,
                  card_desc: $data.info.card.card_desc
                }
                store.local.set('withdrawals_result', JSON.stringify(withdrawals_result));
                _this.$router.go('/my/withdrawals-result')
              } else {
                layer.warning(res.message)
              }
            })
        }
      },
    },
    destroyed() {
      store.local.remove('withdrawals')
      $data.form.withdrawals_balance.model = ''
      $data.info.card.individual_card_id = ''
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .withdrawals-detailed {
    .group {
      background: #FFF;
    }
    .codes-area {
      &::after {
        content: '';
        display: block;
        overflow: hidden;
        clear: both;
      }
      >span.codes {
        vertical-align: middle;
      }
      input {
        vertical-align: middle;
        width: 80%;
      }
    }
    .row {
      padding: px2rem(20) 0 px2rem(20) px2rem(65);
      &::after {
        content: '';
        display: block;
        overflow: hidden;
        clear: both;
      }
      .c-link {
        float: right;
        margin-right: px2rem(12);
        &::after {
          content: '';
          width: 8px;
          height: 8px;
          display: inline-block;
          border-top: 1px solid #747474;
          border-right: 1px solid #747474;
          -webkit-transform: rotate(45deg);
        }
      }
    }
    .link {
      padding-left: px2rem(15);
      background-position: 97%;
    }
    .invalid {
      opacity: .4;
    }
    .no-card {
      padding: px2rem(93) px2rem(52.5) 0;
      >img {
        width: px2rem(90);
        margin-bottom: px2rem(21);
      }
      >p {
        color: #747474;
      }
      .btn {
        color: #4A4A4A;
        width: px2rem(160);
        margin-top: px2rem(165);
        font-size: px2rem(20);
      }
    }
    .support-link {
      padding: px2rem(15);
    }
    .btn-wrap {
      margin: px2rem(30) 0 0;
    }
    .withdrawals {
      font-size: px2rem(28);
      padding: px2rem(8) px2rem(12);
      div:first-child {
        color: #ADADAD;
        border-bottom: none;
        padding-bottom: 0;
        line-height: px2rem(24);
        font-size: px2rem(12);
      }
      div {
        border-bottom: 1px solid #adadad;
        padding-bottom: px2rem(8);
        input {
          margin-left: px2rem(8);
          font-size: px2rem(28);
        }
      }
      div:last-child {
        color: #ADADAD;
        border-bottom: none;
        padding-bottom: 0;
        line-height: px2rem(24);
        font-size: px2rem(12);
        &::after {
          content: '';
          display: block;
          overflow: hidden;
          clear: both;
        }
        span {
          float: right;
        }
      }
    }

    .rules {
      line-height: px2rem(18);
      padding: 0 1.5rem;
    }
  }
</style>