<!--
  -- 下拉列表组件
  -- @author bigfact
  -- @param {Array}  datas     下拉列表数据数组
  -- @param {String} datas.key 数据显示值
  -- @param {String} value     父组件中下拉列表的实际值
  -- @param {String} id        唯一标识
  -- @example
  -- <template>
  --   <div class="row" @click="showIndustrySelect()">
  --      <span>行业</span>
  --      <span class="fr">{{ industry.key }}</span>
  --   </div>
  --   <d-select :datas="industry.datas" :value="industry.value" id="industry-select" @selected="industrySelected"></d-select>
  -- </template>
  -- <script>
  --   $data = {
  --     industry: {
  --       key: '',
  --       value: 0,
  --       selectshow: false,
  --       datas: {
  --         1: '政府机关/社会团体',
  --         2: '军事/公检法',
  --         3: '教育/科研'
  --       }
  --     }
  --   }
  --  export default {
  --    data() {
  --      return $data
  --    },
  --    methods: {
  --      /**
  --       * 显示下拉列表组件
  --       */
  --      showIndustrySelect() {
  --        $data.industry.selectshow = true
  --      },
  --      /**
  --       * 选择完成监听函数
  --       * @param {object} data   事件附带数据对象
  --       * @param {String} key    选择数据的显示值
  --       * @param {String} value  选择数据的实际值
  --       * @param {String} index  选择数据的序号
  --       * @param {String} id     组件唯一标识
  --       */
  --      industrySelected(data) {
  --        console.log(data)
  --        $data.industry.selectshow = false
  --        $data.industry.key = data.key
  --        $data.industry.value = data.value
  --      }
  --    }
  --  }
  -- </script>
  -->

<template>
  <div :id="id" class="sheet-wrap" @touchstart="touchstart()">
    <div class="mask" @click="choose(key, value, index)" @touchstart="touchstart()"></div>
    <div class="sheet">
      <p class="row" v-for="($index, i) in datas" @click="choose(i.key, i.value, $index)" :class="i.value === value && 'c-main'">{{ i.key }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var _this = this
      // 监听组件值是否改变
      _this.$watch('value', function (val) {
        if (!val) return
        // 回显数据
        for (var j = 0; j < _this.datas.length; j++) {
          if (val == _this.datas[j].value) {
            _this.key = _this.datas[j].key
            _this.index = j
            _this.choose(_this.datas[j].key, _this.datas[j].value, j)
            break
          }
        }
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
        isTouched: false,
        bodyScrollTop: 0,
        key: '',
        index: ''
      }
    },
    props: ['datas', 'value', 'id'],
    methods: {
      /**
       * 监听组件触摸事件，记录当前页面滚动条位置
      */
      touchstart() {
        var _this = this
        if (!_this.bodyScrollTop) _this.bodyScrollTop = document.body.scrollTop
        _this.isTouched = true
        // console.log(_this.bodyScrollTop)
      },
      /**
       * 下拉列表选择
       */
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
        if (_this.isTouched) {
          document.body.scrollTop = _this.bodyScrollTop
          _this.bodyScrollTop = 0
          _this.isTouched = false
        }
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