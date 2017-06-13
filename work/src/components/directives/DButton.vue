<!--
  提交按钮
  @example
  <template>
    <d-button v-bind:button.sync="button"></d-button>
  </template>
  <script>
    import DButton from './directives/DButton.vue'
    var $data = {
      button: {
        name: '',
        class: '',
        click() {
          console.log('点击调用函数')
        },
      }
    }
    export default {
      data() {
        return $data;
      },
      components: {
        DButton: DButton,
      },
    }
  </script>
-->

<template>
  <button v-bind:class="[button.class, touchclass]" v-on:click="click($event)">{{ button.name }}</button>
</template>

<script>
  export default {
    data() {
      return {
        flag: true,
      }
    },
    props: ['button'],
    methods: {
      click(e) {
        var _this = this
        if (!_this.flag) return
        _this.flag = false
        var tid = setTimeout(function () {
          _this.flag = true
          clearTimeout(tid)
        }, 1000)
        typeof _this.button.click === 'function' && _this.button.click(e)
      },
    },
  }
</script>
