<!--
  -- 在线客服 - 客服电话
  -- @author bigfact
  -- @date 2017.05.05
  -->

<template>
  <section class="customer-service">
    <!--<img src="../../assets/my/CS-banner.png" alt="">-->
    <!--<div class="btn-cs" @click="csCall()">客服电话：{{ num }}</div>-->
    <!--在线客服链接-->
    <!--<a href="http://www.baida.im/index.php?mod=myIM&act=indexChatMobile&sid=206&pid=5b45d79dcc1fc8b436dac3dfa856d0e7&original=1" class="bd-link tac">
      <div class="bd-link-inner">
        <p>在线</p>
        <p>客服</p>
      </div>
    </a>-->
    <iframe class="db-iframe" :src="dbUrl"></iframe>
  </section>
</template>

<script>
  var $data = {
    // num: '400-136-5799',
    dbUrl: ''
  }
  export default {
    data() {
      return $data
    },
    ready() {
      $data.dbUrl = '//www.baida.im/index.php?mod=myIM&act=indexChatMobile&sid=206&pid=5b45d79dcc1fc8b436dac3dfa856d0e7&original=1&appname=' + (sysinfo.dsq.isapp() ? '贷上钱APP' : '')
    },
    methods: {
      // // 拨打客服电话
      // csCall() {
      //   // 钱牛牛和贷上钱 app 中不使用链接拨打形式
      //   if (sysinfo.dsq.isapp() || sysinfo.qsq.isapp()) {
      //     sysinfo.dsq.phoneCall($data.num)
      //     return
      //   }
      //   var lid = layer.warning('<br>是否拨打' + $data.num + '?', {
      //     btn: ['是', '否'],
      //     yes: function () {
      //       var a = document.createElement('a')
      //       a.href = 'tel://' + $data.num
      //       a.click()
      //       layer.close(lid)
      //     }
      //   })
      // }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .customer-service {
    .db-iframe {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      border: none;
    }
    /*img {
      width: px2rem(300);
      margin: px2rem(15) 0;
    }*/
    /*.btn-cs {
      width: 82%;
      border-radius: 3rem;
      margin: 0 auto;
      font-size: 1.7rem;
      padding: 1.2rem;
      color: #FFFFFF;
      background: #FF6262;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.125);
    }*/
    /*在线客服链接*/
    /*.bd-link {
      z-index: 999;
      background: #FFF;
      position: fixed;
      right: px2rem(25);
      bottom: px2rem(55);
      width: px2rem(60);
      height: px2rem(60);
      border-radius: px2rem(60);
      box-shadow: 0 px2rem(3) px2rem(10) rgba(76, 50, 50, .5);
    }*/
    /*在线客服链接内部文字框*/
    /*.bd-link-inner {
      background: linear-gradient(top, #FF9797, #FF6262);
      color: #FFF;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: px2rem(55);
      height: px2rem(55);
      border-radius: px2rem(55);
      padding: px2rem(10) 0;
      box-sizing: border-box;
      margin: auto;
    }*/
  }
</style>