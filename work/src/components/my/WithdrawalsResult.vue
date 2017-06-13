<!--
  -- 初审审核结果
  -- @author bigfact
  -->
<template>
  <section class="container withdrawals-result tac fs15">
    <!-- 审核成功 -->
    <div class="success">
      <div class="icon"></div>
      <div class="c-gray fs20">提现申请已提交</div>
      <div class="info">
        <ul>
          <li>
            <span class="title">储蓄卡</span>
            <img :src="bank_icon" alt=""> <span>{{bank_name}}</span> <span>{{card_desc}}</span>
          </li>
          <li>
            <span class="title">提现金额</span>
            {{amount}}元
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<script>

  var $data = {
  }
  export default {
    data() {
      var tmp = JSON.parse(store.local.get('withdrawals_result')) || {};
      $data = tmp;
      return $data
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .withdrawals-result {
    $bg-size: px2rem(110);
    background: transparent;
    padding: px2rem(70) 0 0;
    .icon {
      padding: px2rem(60) 0;
      margin-bottom: px2rem(30);
      background: url('../../assets/auth/status/doing.png') no-repeat 50%;
      background-size: $bg-size;
    }
    .info {
      padding: px2rem(32) 0;
      ul {
        background: #fff;
        border-top: 1px solid #DBDBDB;
        li {
          padding: px2rem(8) px2rem(12);
          border-bottom: 1px solid #DBDBDB;
          text-align: right;
          &::after {
            content: '';
            display: block;
            clear: both;
            overflow: hidden;
          }
          span.title {
            float: left;
          }
          img {
            height: px2rem(24);
            vertical-align: middle;
          }
          span:not(first-child) {
            vertical-align: middle;
          }
        }
      }
    }
    .success {
      .icon {
        background: url('../../assets/my/withdrawals-success.png') no-repeat 50%;
        background-size: $bg-size;
      }
    }
  }
</style>
