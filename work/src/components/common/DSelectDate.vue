<!--
  -- 日期下拉选择列表组件
  -- @author bigfact
  -- @param {Object} item 省市区数据
  -- @example
  -- <template>
  --   <d-select-address :item="item"></d-select-address>
  -- </template>
  -- <script>
  --   _this = {
  --     item: {
  --       show: false,
  --       shengId: 0,
  --       shiId: 0,
  --       quId: 0,
  --       address: '',
  --       ready: false,
  --     },
  --   }
  -- </script>
-->

<template>
  <div class="d-select-date tac">
    <div class="mask"></div>
    <div class="tabs">
      <div v-for='i in tabs' class="text-hide" v-bind:class="$key == active && 'active'" @click="tabClick($key)" v-show="i">{{ i }}</div>
    </div>
    <div class="sheet" :class="active != 'year' && 'trans-left'">
      <p class="row" v-for="i in years" @click="choose(i, 'year')" v-bind:class="i == year && 'active'">{{ i }}</p>
    </div>
    <div class="sheet" :class="active != 'month' && 'trans-right'">
      <p class="row" v-for="i in filterMonths(months)" @click="choose(i, 'month')" v-bind:class="i == month && 'active'">{{ i > 9 ? i : '0' + i }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var yearData = []
      // 初始化年数据
      var endYear = (new Date()).getFullYear()
      var beginYear = endYear - 10
      while (++beginYear <= endYear) {
        yearData.push(beginYear)
      }
      return {
        // 年数据
        years: yearData,
        // 月数据
        months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        // tab 显示值
        tabs: {
          year: '年',
          month: '月'
        },
        // 年、月值
        year: '',
        month: '',
        // 当前选择的 tab
        active: 'year',
        // 记录 body 在下拉列表显示之前的位置
        bodyScrollTop: 0
      }
    },
    created() {
      // console.log(this)
      var _this = this
      _this.init()
      // 监听父组件 ajax 数据是否获取完成
      _this.$watch('item.ready', function (val) {
        // 重新初始化
        if (val) _this.init()
      })
      // 监听组件是否显示
      _this.$watch('item.show', function (val) {
        // 记录 body 在下拉列表显示之前的位置
        _this.bodyScrollTop = document.body.scrollTop
        // 选中项目显示到可见区域
        if (!val) return
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
    },
    props: ['item'],
    methods: {
      // 隐藏下拉列表
      hide() {
        // body 滚动到下拉列表显示之前的位置
        document.body.scrollTop = _this.bodyScrollTop
      },
      // 初始化数据
      init: function () {
        var _this = this
        var item = _this.item
        if (item.year) {
          _this.active = 'year'
          _this.year = item.year
          if (item.month) {
            _this.active = 'month'
            _this.month = item.month
          }
        }
      },
      /**
       * 过滤月份，显示可选择的月份不能超出当前月份
       * @param {Array} monthArray 月份数据数组
       */
      filterMonths(monthArray) {
        var year = this.year
        var date = new Date()
        var currentYear = date.getFullYear()
        var currentMonth = date.getMonth()
        return monthArray.filter(function (month) {
          return !(currentYear == year && month > currentMonth + 1)
        })
      },
      // 下拉列表选择
      choose(i, type) {
        var _this = this
        if (type == 'year') {
          _this.year = i
          _this.active = 'month'
        } else {
          _this.month = i
          _this.active = 'month'
          _this.triggerSelected()
        }
      },
      // tab 切换
      tabClick(type) {
        var _this = this
        if (type == 'year') {
          _this.active = 'year'
          _this.month = ''
        }
      },
      // 触发日期选择成功事件
      triggerSelected() {
        var _this = this
        if (_this.year && _this.month) {
          _this.$emit('selected', {
            year: _this.year + '',
            month: _this.month > 9 ? _this.month + '' : '0' + _this.month
          })
        }
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .d-select-date {
    position: relative;
    .tabs {
      background: #FFF;
      position: fixed;
      left: 0;
      bottom: px2rem(300);
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
      z-index: 1001;
      > div {
        float: left;
        padding: 0 px2rem(5);
        width: 50%;
        height: px2rem(45);
        line-height: px2rem(50);
        box-sizing: border-box;
        &.active {
          border-bottom: 2px solid $main-color;
        }
      }
    }
    .sheet {
      background: #FFF;
      height: px2rem(300);
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      float: left;
      overflow-y: scroll;
      transition: transform .3s ease;
      z-index: 1000;
      .active {
        background: $main-color;
        color: #FFFFFF;
      }
    }
    .trans-left {
      transform: translateX(-100%);
    }
    .trans-right {
      transform: translateX(100%);
    }
  }
</style>