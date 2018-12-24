<template>
  <section id="demo">
    <h1 class="tac">{{ title }}</h1>
    <div class="address">
      <div class="row link" @click="show()">
        <label for="address">选择地址</label>
        <p class="fr tar text-hide">{{ address.address }}</p>
        <input name="address" type="text" v-model='address.address' hidden>
      </div>
      <d-select-address v-bind:item.sync="address"></d-select-address>
    </div>
  </section>
</template>

<script>

import DSelectAddress from './common/DSelectAddress.vue'

/**
 * 使用到的数据需要显示声明
 */
var $data = {
  title: 'Hello Demo!',
  address: {

    address: '',
    ready: false,

    show: false,
    shengId: 0,
    shiId: 0,
    quId: 0,

    // quId: 2530,
    // shengId: 2496,
    // shiId: 2499,
    // show: false,

    // quId: 3162,
    // shengId: 3121,
    // shiId: 3127,
    // show: false,

    // quId: 3270,
    // shengId: 3236,
    // shiId: 3239,
    // show: false,

  },
}

export default {
  data() {
    return $data;
  },
  ready() {
    setTimeout(function() {
      $data.address.ready = true;
    }, 3000);
  },
  methods: {
    show() {
      $data.address.show = true;
    }
  },
  components: {
    DSelectAddress: DSelectAddress,
  },
}
</script>

<style lang="scss" scoped>
  @import '../sass/_globals.scss';
  #demo {
    padding: px2rem(20);
    h1 {
      color: #42b983;
      font-size: px2rem(20);
      padding-top: px2rem(20);
    }
    .row {
      margin-top: px2rem(14);
      padding-bottom: px2rem(7);
      .fr {
        width: 70%;
      }
    }
  }
</style>