<!--
  -- 在线客服 - 百答云客服
  -- @author bigfact
  -- @date 2017.06.05
  -->

<template>
  <section class="customer-service-bd">
    <iframe :src="iframeSrc" frameborder="0" class="baida-iframe" v-if="iframeSrc"></iframe>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        iframeSrc: 'http://www.baida.im/index.php?mod=myIM&act=indexChatMobile&sid=206&pid=5b45d79dcc1fc8b436dac3dfa856d0e7&original=1'
      }
    },
    methods: {},
    destroyed() {
      this.iframeSrc = ''
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .customer-service-bd {
    .baida-iframe {
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }
  }
  /*.baida-btn {
    right: px2rem(50) !important;
    bottom: px2rem(80) !important;
  }

  .baida-btn-head {
    background: $main-color !important;
  }*/
</style>