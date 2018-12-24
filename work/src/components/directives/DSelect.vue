<!--
  -- 下拉列表组件
  -- @author bigfact
  -- @param {Object} item 下拉列表描述对象
  -- @example
  -- <template>
  --   <d-select :datas="industry.datas" :value="industry.value" id="industry-select"></d-select>
  -- </template>
  -- <script>
  --   $data = {
  --     industry: {
  --       key: '所属行业',
  --       value: 2,
  --       selectshow: false,
  --       datas: {
  --         1: '政府机关/社会团体',
  --         2: '军事/公检法',
  --         3: '教育/科研'
  --       },
  --       reg: regexp.empty,
  --       err: '请选择所属行业'
  --     },
  --   }
  -- </script>
  -->

<template>
  <div :id="id" class="sheet-wrap">
    <div class="mask" @click="choose()"></div>
    <div class="sheet">
      <p class="row" v-for="($index, i) in datas" @click="choose(i.key, i.value, $index)" :class="i.value === value && 'c-main'">{{ i.key }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var _this = this
      // 监听组件是否显示
      _this.$watch('value', function (val) {
        // 记录 body 在下拉列表显示之前的位置
        _this.bodyScrollTop = document.body.scrollTop
        if (!val) return
        // 回显数据
        // todo
        // 选中项目显示到可见区域
        var actives = document.querySelectorAll('.sheet .active')
        try {
          for (var i = 0; i < actives.length; i++) {
            var parent = actives[i].parentNode
            var half = parent.clientHeight / 2
            if (actives[i].offsetTop > half) {
              parent.scrollTop = actives[i].offsetTop - half
            }
          }
        } catch (err) { }
      })
      return {
        bodyScrollTop: 0
      }
    },
    props: ['datas', 'value', 'id'],
    methods: {
      // 下拉列表选择
      choose(key, value, index) {
        key = typeof key === 'undefined' ? '' : key
        value = typeof value === 'undefined' ? '' : value
        index = typeof index === 'undefined' ? '' : index
        var _this = this
        _this.$emit('selected', {
          key: key,
          value: value,
          index: index,
          id: _this.id
        })
        // body 滚动到下拉列表显示之前的位置
        document.body.scrollTop = this.bodyScrollTop
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .sheet-wrap {
    position: relative;
    /*下拉列表第一种样式*/
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2000px;
      background: rgba(0, 0, 0, .6);
      z-index: 999;
    }
    .sheet {
      background: #FFF;
      text-align: center;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 100%;
      max-width: $html_max_width;
      max-height: 40%;
      overflow-y: scroll;
      z-index: 999;
    }
    /*下拉列表第二种样式*/
    /*.mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0);
      z-index: 999;
    }
    .sheet {
      background: #FFF;
      position: absolute;
      top: -3px;
      right: 0;
      width: 75%;
      max-height: px2rem(150);
      overflow-y: scroll;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .2), 0 3px 6px rgba(0, 0, 0, .3);
      border-top: 3px solid $main-color;
      text-align: center;
      z-index: 1000;
    }*/
  }
</style>