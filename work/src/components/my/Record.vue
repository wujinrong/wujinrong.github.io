<!--
  -- 借款记录
  -- @author bigfact
  -->
<template>
  <section class="my-record">
    <!-- 没有借款记录 -->
    <div class="haveno tac" v-if="flag == 0">
      <div>您还没有相关的借款记录</div>
    </div>
    <!-- 借款记录列表 -->
    <div v-if="flag > 0">
      <a :href="'#!/my/record/detail?id=' + i.apply_id + '&type=' + i.product_type" class="item row bg-white" v-for="i in list">
        <div class="apply-time row c-gray">
          <span>{{ i.product_type == 'multiple' ? '分期贷' : '单期贷' }}</span>
          <span class="fr">申请时间：{{ i.apply_time }}</span>
        </div>
        <table class="table">
          <tr class="c-gray">
            <th>{{ getAmount(i).key }}</th>
            <th>{{ i.product_type == 'multiple' ? '借款期数' : '借款天数' }}</th>
            <th>状态</th>
          </tr>
          <tr class="fs16">
            <td>{{ getAmount(i).value }}元</td>
            <td>{{ i.period_desc }}</td>
            <td :class="status[i.status].class">{{ status[i.status].text }}</td>
          </tr>
        </table>
        <div class="row link tar">查看借款详情</div>
      </a>
    </div>
  </section>
</template>
<script>
  var $data = {
    list: [],
    status: [
      // 0
      {
        class: 'c-yellow',
        text: '未提交',
      },
      // 1
      {
        class: 'c-green',
        text: '审核中',
      },
      // 2
      {
        class: 'c-red',
        text: '审核拒绝',
      },
      // 3
      {
        class: 'c-yellow',
        text: '待签约',
      },
      // 4
      {
        class: 'c-yellow',
        text: '待还款',
      },
      // 5
      {
        class: 'c-gray',
        text: '已还清',
      },
      // 6
      {
        class: 'c-green',
        text: '放款中'
      },
      // 7
      {
        class: 'c-red',
        text: '已逾期'
      },
      // 8
      {
        class: 'c-yellow',
        text: '还款中'
      },
      // 9
      {
        class: 'c-red',
        text: '放款失败'
      },
      // 10
      {
        class: 'c-light',
        text: '已取消'
      },
      // 11
      {
        class: 'c-green',
        text: '确认申请'
      }
    ],
    flag: -1,
  }
  export default {
    data() {
      /**
       * 获取数据
       * https://git.fond.io/b/paydayloan/wikis/apply-list-v2
       */
      ajax.get('/v3/record/apply-list')
        .then(function (xhr, res) {
          if (res.code == 0) {
            $data.list = res.data
            $data.flag = res.data.length
          }
          else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * 根据记录获取当前显示的金额字段
       * @param   {Object} i            借款记录
       * @returns {Object} result       金额字段对象
       * @returns {String} result.key   字段名
       * @returns {String} result.value 字段值
       */
      getAmount(i) {
        var key = '借款金额'
        var value = i.apply_amount
        if (i.product_type == 'multiple') {
          key = '申请金额'
          if (i.status > 2) {
            key = '批核金额'
            value = i.credit_amount
          }
        }
        return {
          key: key,
          value: value
        }
      }
    }
  }

</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-record {
    /*没有借款记录*/
    .haveno {
      padding: px2rem(20);
      div {
        padding: px2rem(35) 0;
        border: 1px dashed $gray;
      }
    }
    /*借款记录*/
    .item {
      display: block;
      margin-top: px2rem(8);
      padding: px2rem(15) px2rem(15) 0;
      &:last-of-type {
        margin-bottom: px2rem(16);
      }
    }
    /*借款信息表格*/
    .table {
      line-height: px2rem(26);
      text-align: center;
      padding-top: px2rem(15);
      width: 100%;
      tr {
        >* {
          &:first-of-type {
            text-align: left;
          }
          &:last-of-type {
            text-align: right;
          }
        }
      }
      th {
        width: 33.33%;
      }
    }
    /*申请时间*/
    .apply-time {
      padding-top: 0;
    }
    /*链接样式修改*/
    .link {
      &::after {
        display: none;
      }
    }
  }
</style>