<template>
  <section id="bank-support" class="container fs18">
    <div class="group">
      <div class="row" v-for="i in list" :style="'background: url(./static/img/bank/' + $key + '.png) 1.5rem center / 3.5rem no-repeat;'">{{ i }}</div>
    </div>
    <br>
    <br>
  </section>
</template>

<script>

var $data = {
  // list: [
  //   {
  //     icon: 'gongshang',
  //     name: '工商银行',
  //   },
  //   {
  //     icon: 'nongye',
  //     name: '农业银行',
  //   },
  //   {
  //     icon: 'zhongguo',
  //     name: '中国银行',
  //   },
  //   {
  //     icon: 'jianshe',
  //     name: '建设银行',
  //   },
  //   {
  //     icon: 'zhongxin',
  //     name: '中信银行',
  //   },
  //   {
  //     icon: 'guangda',
  //     name: '光大银行',
  //   },
  //   {
  //     icon: 'pingan',
  //     name: '平安银行',
  //   },
  //   {
  //     icon: 'jiaotong',
  //     name: '交通银行',
  //   },
  //   {
  //     icon: 'xingye',
  //     name: '兴业银行',
  //   },
  //   {
  //     icon: 'minsheng',
  //     name: '民生银行',
  //   },
  //   {
  //     icon: 'zhaoshang',
  //     name: '招商银行',
  //   },
  // ],
  list: { },
  // 用户识别 code
  user_code: '',
}

export default {
  data() {
    $data.user_code = sysinfo.getQueryString('user_code')
    // 获取支持银行卡数据
    ajax.get('/v3/util/get-support-banks', {
      user_code: $data.user_code,
    })
      .then(function(xhr, res) {
        if(res.code == 0) {
          $data.list = res.data
        }
        else {
          layer.warning(res.message)
        }
      })
    return $data
  },
  ready() { },
  methods: { },
  components: { },
}
</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  #bank-support {
    .group {
      background: #FFF;
    }
    .row {
      padding: px2rem(20) px2rem(65);
    }
  }
</style>