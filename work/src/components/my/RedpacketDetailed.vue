<template>
  <section class="my-redpacket-detailed">
    <div class="result">
     {{ list.type == 1 ? '+&nbsp;&nbsp;' : '-&nbsp;&nbsp;' }}{{ list.amount }} 元<br />
      <span>{{ list.title }}</span>
    </div>
    <div class="result-info">
      <ul>
        <li>
          <span>时间</span>
          {{ list.create_at }}
        </li>
        <li>
          <span>交易串号</span>
          {{ list.serial_number }}
        </li>
        <li>
          <span>说明</span>
          {{ list.desc }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  var $data = {
    type: 1,
    list: {
      type: '',
      title: null
    }
  }

  export default {
    data() {
      $data.type = this.$route.query['type'] || $data.type;
      var id = this.$route.query['id'] || 0;

      var redpacket_list = JSON.parse(store.local.get('redpacket-list'));
      for(var i = redpacket_list.length; i--;){
        if(redpacket_list[i].id == id) {
          $data.list = redpacket_list[i];
        }
      }
      if ($data.type == 1) {
        title('红包明细');
        $data.list.title = '已存入账户余额,可提现';
      } else if ($data.type == 2) {
        title('提现明细');
        $data.list.title = '已提现至银行卡';
      }
      return $data
    },
    methods: {},
  }
</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-redpacket-detailed {
    .result {
      padding: px2rem(32) 0;
      text-align: center;
      font-size: px2rem(18);
      span {
        font-size: px2rem(12);
      }
    }
    .result-info {
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
          span {
            float: left;
          }
        }
      }
    }
  }
</style>