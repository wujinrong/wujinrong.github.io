<!--
  -- 消息详情
  -- @author bigfact
  -->
<template>
  <section class="my-message-detail container tac">
    <p class="row fs18">{{ title }}</p>
    <p class="fs14">{{ time }}</p>
    <p class="tal fs16">{{ content }}</p>
  </section>
</template>
<script>
  var $data = {
    title: '',
    content: '',
    time: '',
  }
  export default {
    data() {
      // 解析参数中的标题、内容和时间
      $data.title = decodeURI(this.$route.query.title || '')
      $data.content = decodeURI(this.$route.query.content || '')
      $data.time = decodeURI(this.$route.query.time || '')
      return $data
    },
  }
</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-message-detail {
    padding: px2rem(33) px2rem(22.5) 0;
    p:nth-of-type(2) {
      margin: px2rem(6) 0 px2rem(30);
      color: #AEAEAE;
    }
    p:last-of-type {
      color: #747474;
    }
  }
</style>