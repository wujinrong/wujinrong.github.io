<!--
  表单组件，现支持 text 、 select 、 password ；check 字段需要在父组件中声明，在本组件中被重写为方法，在父组件中可用于检查表单状态
  @param {Object} form 表单数据对象
  @example
  <template>
    <d-form v-bind:form="form"></d-form>
  </template>
  <script>
    import DForm from './directives/DForm.vue'
    var $data = {
      check: '',
      form: {
        tel: {
          key: '单位电话',
          model: '188888',
          type: 'tel',
        }
      },
    }
    export default {
      data() {
        return $data;
      },
      components: {
        DForm: DForm,
      },
    }
  </script>
-->

<template>
  <div class="d-form" v-for="i in form | filterBy filterByType" id="{{ 'item_' + $key + (index ? index : '') }}">
    <!-- 下拉列表组件 -->
    <div class="row select" v-if="i.type == 'select'" v-on:click="click($key)">
      <label for="{{ $key }}">{{ i.key }}</label>
      <span class="fr">{{ i.datas[i.model] }}</span>
      <input name="{{ $key + (index ? index : '') }}" type="text" v-model='i.model' hidden>
    </div>
    <d-select v-if="i.type == 'select'" v-bind:item.sync='i'></d-select>
    <!-- 其他输入框组件 -->
    <div class="row" v-if="i.type == 'text' || i.type == 'password' || i.type == 'number' || i.type == 'tel'">
      <label for="{{ $key }}">{{ i.key }}</label>
      <input class="tar fr" name="{{ $key + (index ? index : '') }}" type="{{ i.type }}" readonly="{{ i.readonly }}" maxlength="{{ i.maxlength }}"
        v-on:blur="blur(i)" v-model='i.model' placeholder="{{ i.placeholder }}">
    </div>
    <!-- 错误提示 -->
    <p class="err" v-show="i.errshow">{{ i.err }}</p>
  </div>
</template>

<script>
  import DSelect from './DSelect.vue'

  var $data = { }

  export default {
    data() {
      return $data;
    },
    props: ['form', 'index'],
    ready() {
      var _this = this;
      // 初始化隐藏错误提示
      var form = _this.form;
      for(var k in form) {
        typeof form[k].errshow != 'undefined' && (form[k].errshow = false);
      }
      // 重写父组件表单检查函数
      typeof form.check != 'undefined' && (form.check = function() {
        var index = this.index;
        var pass = true;
        var name = '';
        var i = '';
        // 检查表单数据，定位第一个未检查通过的输入框
        for(var j in form) {
          i = form[j];
          if(i.reg) {
            typeof i.model.trim === 'function' ? i.model = i.model.trim() : '';
            i.reg(i.model) ? (i.errshow = false) : (i.errshow = true, pass = false, !name && (name = j));
          }
        }
        if(!name) return pass;
        // 屏幕滚动到未验证通过的地方
        var input = document.querySelector('[name="' + name + (index ? index : '') + '"]');
        var row = document.querySelector('#item_' + name + (index ? index : ''));
        window.scroll(0, row.offsetTop - 20 ? row.offsetTop - 20 : 0);
        !input.hidden && input.focus();
        return pass;
      }.bind(_this));
    },
    methods: {
      // 过滤不是输入组件的元素
      filterByType(item) {
        return item.$value.type ? true : false;
      },
      // 下拉列表触发显示
      click($key) {
        this.form[$key].selectshow = true;
      },
      // 输入完毕后检查
      blur(i) {
        if(i.reg) {
          typeof i.model.trim === 'function' ? i.model = i.model.trim() : '';
          i.reg(i.model) ? (i.errshow = false) : (i.errshow = true);
        }
      },
    },
    components: {
      DSelect: DSelect,
    },
  }
</script>

<style lang="scss" scoped>
  @import '../../sass/_globals.scss';
  .d-form {
    input {
      width: px2rem(200);
      /*position: absolute;
      right: 0;
      z-index: 0;*/
      &::-webkit-input-placeholder {
        direction: rtl;
      }
    }
    .row {
      margin-top: px2rem(14);
    }
    .err {
      color: $red;
      text-align: right;
      padding: px2rem(10) 0;
    }
  }
</style>