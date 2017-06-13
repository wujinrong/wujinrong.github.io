<!--
  -- 银行卡列表页面，包含选择银行卡功能，根据 query from 字段判断是否在 localStorage 中设置银行卡信息
  -- @author bigfact
  -->
<template>
  <section class="bank-list fs18" :class="haveCards == -1 && 'container'">
    <!--银行卡列表-->
    <div v-if="haveCards == 1">
      <div class="line-10"></div>
      <div class="group">
        <div @click="choose(i)" class="row" :class="i.status == 2 && 'invalid'" v-for="i in list | filterBy filterById" :style="'background: url(./static/img/bank/' + i.bank_code + '.png) no-repeat 1.5rem; background-size: 3.5rem'">
          <span>{{ i.bank_name }}</span>
          <span class="fs15 c-gray">{{ i.card_desc }}</span>
        </div>
      </div>
      <div class="line-10"></div>
      <div class="group">
        <!--<a class="row link" v-link="'/bank/add'">添加银行卡</a>-->
        <div class="row link" @click="goto('/bank/add')">添加银行卡</div>
      </div>
    </div>
    <!--没有银行卡-->
    <div class="no-card tac" v-if="haveCards == -1">
      <img src="../../assets/bank/list-edit.png" alt="">
      <p>请先去完善资料，再来管理银行卡</p>
      <div class="btn-block">
        <a @click="goto('/', 'index')" class="btn outline">去完善资料</a>
      </div>
    </div>
  </section>
</template>
<script>
var $data = {
  list: [{
    individual_card_id: 0, //银行卡id
    individual_card_num: '', //银行卡号
    individual_card_tel: '', //银行预留手机号
    bank_name: '', //银行名称
    bank_code: '', //银行代号
    status: 2, //1:已验证，2：不可用（包含银行卡导致的放款失败等情况）
  }],
  // 用户识别 code
  user_code: '',
  haveCards: 0,
  // 来源
  from: '',
  // 允许的来源（更换收款银行卡，主动还款，外链主动还款）
  allowFroms: ['bankChangeRecevie', 'repayCharge', 'authBank', 'withdrawals']
}
export default {
  data() {
      // 获取来源信息
      $data.from = this.$route.query['from'] || ''
      // 获取外链主动还款情况下的用户识别码
      $data.user_code = sysinfo.getQueryString('user_code')
      /**
       * 获取数据
       * http://git.fond.io/b/paydayloan/wikis/appv1/bank-get-my-cards
       */
      ajax.get('/v3/bank/get-my-cards', {
        user_code: $data.user_code,
      }).then(function(xhr, res) {
        if (res.code == 0) {
          $data.list = res.data.list || []
          $data.haveCards = $data.list.length > 0 ? 1 : -1
        } else if (res.code == -1) {
          $data.haveCards = -1
        } else {
          layer.warning(res.message)
        }
      })
      return $data
    },
    ready() {},
    methods: {
      // 过滤银行卡
      filterById(item) {
        return item && item.individual_card_id && item.individual_card_id > 0
      },
      // 返回后四位号码
      subNum(num) {
        return num.length >= 4 ? num.substring(num.length - 4, num.length) : num
      },
      /**
       * 页面跳转
       * @param {String} link 跳转h5页面链接
       * @param {String} viewName 对应的app原生页面名字
       */
      goto(link, viewName) {
        if (viewName && sysinfo.dsq.getVersion() >= 104) {
          sysinfo.dsq.openView(viewName)
        } else {
          this.$router.go(link)
        }
      },
      // 选择银行卡，根据来源信息判断是否在 localStorage 中设置银行卡信息
      choose(i) {
        // 如果该卡是未通过验证的卡，则不能被选择
        if (i.status != 1) return
          // 根据已有的来源数组，设置选择银行卡信息
        var tmp = $data.allowFroms
        var index = tmp.indexOf($data.from)
        if (index < 0) return
        store.local.remove(tmp[index])
        store.local.set(tmp[index], JSON.stringify({
          id: i.individual_card_id,
          desc: i.card_desc,
          tel: i.individual_card_tel,
          bank_name: i.bank_name,
          bank_icon: i.bank_icon
        }))
        history.back()
      }
    }
}
</script>
<style lang="scss">
@import '../../sass/_globals.scss';
.bank-list {
  .group {
    background: #FFF;
  }
  .row {
    padding: px2rem(20) 0 px2rem(20) px2rem(65);
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
    > img {
      width: px2rem(90);
      margin-bottom: px2rem(21);
    }
    > p {
      color: #747474;
    }
    .btn {
      color: #4A4A4A;
      width: px2rem(160);
      margin-top: px2rem(165);
      font-size: px2rem(20);
    }
  }
}
</style>
