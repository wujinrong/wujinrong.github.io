<!--
  省市区下拉选择列表组件
  @author bigfact
  @param {Object} item 省市区数据
  @example
  <template>
    <d-select-address v-bind:item.sync="item"></d-select-address>
  </template>
  <script>
    _this = {
      item: {
        show: false,
        shengId: 0,
        shiId: 0,
        quId: 0,
        address: '',
        ready: false,
      },
    }
  </script>
-->

<template>
  <div class="d-select-address tac">
    <div class="mask"></div>
    <div class="tabs">
      <div v-for='i in address' class="text-hide" v-bind:class="$key == active && 'active'" @click="tabClick($key)" v-show="i">{{ i }}</div>
    </div>
    <div class="sheet" v-bind:class="active != 'sheng' && 'trans-left'">
      <p class="row" v-for="i in sheng" @click="choose(i, 'sheng')" v-bind:class="i.id == item.shengId && 'active'">{{ i.name }}</p>
    </div>
    <div class="sheet" v-bind:class="shiClass">
      <p class="row" v-for="i in shi" @click="choose(i, 'shi')" v-bind:class="i.id == item.shiId && 'active'">{{ i.name }}</p>
    </div>
    <div class="sheet" v-bind:class="active != 'qu' && 'trans-right'">
      <p class="row" v-for="i in qu" @click="choose(i, 'qu')" v-bind:class="i.id == item.quId && 'active'">{{ i.name }}</p>
    </div>
  </div>
</template>

<script>
  // import cityData from '../../services/city-id-name'
  import cityData from '../../services/datas-city-id-name-code.json'

  export default {
    data() {
      var $data = {
        // 省市区字典数据
        sheng: [],
        shi: [],
        qu: [],
        // tab 显示值
        address: {
          sheng: '请选择省',
          shi: '',
          qu: '',
        },
        // 当前选择的 tab
        active: 'sheng',
        // “市”选择页在中间，使用单独的变量控制过渡样式
        shiClass: 'trans-right',
        // 记录 body 在下拉列表显示之前的位置
        bodyScrollTop: 0,
        // 区号
        code: ''
      }
      // 初始化
      $data.sheng = cityData
      return $data
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
        }
        catch (err) { }
      })
    },
    props: ['item'],
    methods: {
      // 隐藏下拉列表
      hide() {
        var _this = this
        // body 滚动到下拉列表显示之前的位置
        document.body.scrollTop = _this.bodyScrollTop
        _this.item.show = false
      },
      // 初始化数据
      init: function () {
        var _this = this
        var item = _this.item
        item.address = ''
        _this.getSheng()
        // 回显省数据
        if (item.shengId) {
          _this.active = 'sheng'
          _this.shiClass = 'trans-right'
          // 回显市数据
          if (item.shiId) {
            _this.active = 'shi'
            _this.shiClass = ''
            // 回显区数据
            if (item.quId) {
              _this.active = 'qu'
              _this.shiClass = 'trans-left'
            }
          }
        }
      },
      // 下拉列表选择
      choose(i, type) {
        // console.log(i)
        var _this = this
        var item = _this.item
        if (type == 'sheng') {
          // 省赋值
          item.shengId = i.id
          // 显示市
          _this.address.shi = '请选择市'
          _this.active = 'shi'
          _this.shiClass = ''
          _this.getSheng()
        }
        else if (type == 'shi') {
          // 市赋值
          item.shiId = i.id
          // 显示区
          _this.address.qu = '请选择区/县'
          _this.active = 'qu'
          _this.shiClass = 'trans-left'
          _this.getShi()
        }
        else {
          // 区赋值
          item.quId = i.id
          _this.getQu()
          // 隐藏组件
          _this.hide()
        }
      },
      // tab 切换
      tabClick(type) {
        var _this = this
        var item = _this.item
        if (type == 'sheng') {
          item.shiId = ''
          _this.address.shi = ''
          item.quId = ''
          _this.address.qu = ''
          _this.active = 'sheng'
          _this.shiClass = 'trans-right'
        }
        else if (type == 'shi') {
          item.quId = ''
          _this.address.qu = ''
          _this.active = 'shi'
          _this.shiClass = ''
          _this.getShi()
        }
      },
      // 获取省数据
      getSheng() {
        var _this = this
        var shengId = _this.item.shengId
        // 数据回显
        if (shengId) {
          var j = ''
          for (var i = 0; i < _this.sheng.length; i++) {
            j = _this.sheng[i]
            if (shengId == j.id) {
              _this.address.sheng = j.name
              _this.shi = j.city
              _this.getShi()
              break
            }
          }
        }
      },
      // 获取市数据
      getShi() {
        var _this = this
        var shiId = _this.item.shiId
        // 数据回显
        if (shiId) {
          var j = ''
          for (var i = 0; i < _this.shi.length; i++) {
            j = _this.shi[i]
            if (shiId == j.id) {
              _this.address.shi = j.name
              _this.qu = j.area
              _this.getQu()
              break
            }
          }
        }
      },
      // 获取区数据
      getQu() {
        var _this = this
        var quId = _this.item.quId
        // 数据回显
        if (quId) {
          var j = ''
          for (var i = 0; i < _this.qu.length; i++) {
            j = _this.qu[i]
            if (quId == j.id) {
              _this.address.qu = j.name
              _this.code = j.code
              _this.triggerSelected()
              break
            }
          }
        }
      },
      // 触发地址选择成功事件
      triggerSelected() {
        var _this = this
        if (_this.address.sheng && _this.address.shi && _this.address.qu) {
          _this.$emit('selected', {
            shengId: _this.item.shengId,
            shiId: _this.item.shiId,
            quId: _this.item.quId,
            address: _this.address.sheng + ' - ' + _this.address.shi + ' - ' + _this.address.qu,
            code: _this.code
          })
        }
      }
    }
  }

</script>

<style lang="scss">
  @import '../../sass/_globals';
  .d-select-address {
    position: relative;
    .tabs {
      background: #FFF;
      position: fixed;
      left: 0;
      bottom: px2rem(300);
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
      z-index: 1001;
      >div {
        float: left;
        padding: 0 px2rem(5);
        width: 33.33%;
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