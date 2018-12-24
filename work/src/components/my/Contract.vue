<!--
  -- 我的合同
  -- @author bigfact
  -->
<template>
  <section class="my-contract">
    <!-- 没有合同 -->
    <div class="haveno tac" v-if="flag == 0">
      <div>您还没有相关的合同</div>
    </div>
    <!-- 合同列表 -->
    <div v-if="flag > 0">
      <div class="item bg-white" :class="i.status == 2 && 'op-8'" @click="goto(i.contract_url, i.status, i.product_type)" v-for="i in list">
        <div class="row c-gray">
          <span>{{ i.product_type == 'multiple' ? '分期贷' : '单期贷' }}</span>
          <span class="fr">申请时间：{{ i.apply_time }}</span>
        </div>
        <table class="table">
          <tr class="fs16">
            <th>{{ getAmount(i).value }}</th>
            <th>{{ i.period_desc }}</th>
            <th :class="status[i.status].class">{{ status[i.status].text }}</th>
          </tr>
          <tr class="c-gray">
            <td>{{ getAmount(i).key }}</td>
            <td>{{ i.contract_type == 'delay' ? '延期期限' : i.product_type == 'multiple' ? '借款期数' : '借款天数' }}</td>
            <td>签订状态</td>
          </tr>
        </table>
        <div class="row tar" :class="i.status != 2 ? 'link' : 'c-white'">查看合同详情</a>
        </div>
      </div>
  </section>
</template>
<script>
  var $data = {
    list: [],
    flag: -1,
    status: [
      // 0
      {
        text: '未签',
        class: 'c-yellow'
      },
      // 1
      {
        text: '已签',
        class: 'c-green'
      },
      // 2
      {
        text: '已失效',
        class: 'c-light'
      }
    ],
    sp: false       // 合同签约完成，从法大大自动跳转回来的状态，如果在 1.1.2 以上版本 app 中，则需要特殊处理
  }
  export default {
    data() {
      $data.sp = this.$route.query.from && sysinfo.dsq.getVersion() >= 112
      if ($data.sp) {
        // 需要做特殊处理
        sysinfo.dsq.setCloseView()
      }
      ajax.get('/v3/record/contract-list')
        .then(function (xhr, res) {
          if (res.code == 0) {
            $data.list = res.data.list
            $data.flag = $data.list.length
          }
          else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      /**
       * 页面跳转，有特殊处理
       * @param {String} link 页面链接
       * @param {Number} status 合同状态
       * @param {String} product_type 申请类型
       */
      goto(link, status, product_type) {
        if (status == 0) this.$router.go('/auth/contractsign?from=' + this.$route.path + '&applytype=' + product_type)
        else if(status == 1) location.href = link
      },
      /**
       * 根据记录获取当前显示的金额字段
       * @param   {Object} i            借款记录
       * @returns {Object} result       金额字段对象
       * @returns {String} result.key   字段名
       * @returns {String} result.value 字段值
       */
      getAmount(i) {
        var key = '借款金额'
        var value = i.amount_desc
        if (i.product_type == 'multiple') {
          key = '批核金额'
          value = i.credit_amount_desc
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
  .my-contract {
    box-sizing: border-box;
    min-height: 100%;
    padding-bottom: px2rem(30);
    .haveno {
      padding: px2rem(20);
      div {
        padding: px2rem(35) 0;
        border: 1px dashed $gray;
      }
    }
    .item {
      margin-top: px2rem(8);
      padding: px2rem(15) px2rem(15) 0;
      border-top: 1px solid #DBDBDB;
      border-bottom: 1px solid #DBDBDB;
      .row {
        padding-top: 0;
      }
      .link {
        padding-top: px2rem(15);
        padding-bottom: px2rem(15);
        &::after {
          border: none;
        }
      }
    }
    /*合同信息表格*/
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
    .op-8 {
      opacity: .8;
    }
  }
</style>
