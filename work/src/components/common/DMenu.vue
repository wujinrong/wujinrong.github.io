<!--
  -- 页脚菜单组件，在微信中会被自动隐藏
  -- @param {String} active 当前处于激活状态的菜单项的 key
  -- @example
  -- <template>
  --   <d-menu v-bind:active="'index'"></d-menu>
  -- </template>
  -- <script>
  --   import DMenu from './directives/DMenu.vue'
  --   var $data = { }
  --   export default {
  --     data() {
  --       return $data
  --     },
  --     components: {
  --       DMenu: DMenu,
  --     },
  --   }
  -- </script>
  -->

<template>
  <div class="d-menu" v-if="show">
    <div class="menu-mask"></div>
    <div class="menu">
      <a class="item" v-link="{ path: i.link, replace: true, }" v-for="i in item" :class="i.class" :style="{ width: 100 / item.length + '%' }">{{ i.title }}</a>
    </div>
  </div>
</template>

<script>
  var $data = {
    // 是否显示页脚菜单
    show: false,
    item: [
      {
        name: 'index',
        link: '/',
        class: 'index',
        title: '我要借款',
      },
      {
        name: 'repay',
        link: '/repay/repayment',
        class: 'repay',
        title: '我要还款',
      },
      {
        name: 'my',
        link: '/my',
        class: 'my',
        title: '个人中心',
      },
      // {
      //   name: 'faq',
      //   link: '/faq',
      //   class: 'faq',
      //   title: '常见问题',
      // },
    ]
  }

  export default {
    data() {
      var active = this.active
      for (var i = 0; i < $data.item.length; i++) {
        if ($data.item[i].name == active) {
          $data.item[i].class += ' active'
        }
        else {
          $data.item[i].class = $data.item[i].class.replace(' active', '')
        }
      }
      return $data
    },
    props: ['active'],
    ready() {
      $data.show = !(sysinfo.isWeiXin || sysinfo.dsq.getVersion() >= 104)
    },
    beforeDestroy() {
      for (var i = 0; i < $data.item.length; i++) {
        $data.item[i].class = $data.item[i].class.replace(' active', '')
      }
    },
  }

</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .d-menu {
    .menu-mask {
      height: px2rem(70);
      margin: 0 auto;
      width: 100%;
      max-width: $html_max_width;
    }
    .menu {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 100%;
      max-width: $html_max_width;
      text-align: center;
      font-size: px2rem(12.5);
      background: #FFF;
      a {
        color: $gray;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        border-top: 1px solid $light;
        transform: scaleY(.5);
      }
    }
    .item {
      padding: px2rem(35) 0 px2rem(5) 0;
      float: left;
    }
    $bg-size: px2rem(23);
    .index {
      background: url('../../assets/menu/index0.png') no-repeat 50% 20%;
      background-size: $bg-size;
      &.active {
        background: url('../../assets/menu/index1.png') no-repeat 50% 20%;
        background-size: $bg-size;
      }
    }
    .repay {
      background: url('../../assets/menu/repay0.png') no-repeat 50% 20%;
      background-size: $bg-size;
      &.active {
        background: url('../../assets/menu/repay1.png') no-repeat 50% 20%;
        background-size: $bg-size;
      }
    }
    .my {
      background: url('../../assets/menu/my0.png') no-repeat 50% 20%;
      background-size: $bg-size;
      &.active {
        background: url('../../assets/menu/my1.png') no-repeat 50% 20%;
        background-size: $bg-size;
      }
    }
    .faq {
      background: url('../../assets/menu/faq0.png') no-repeat 50% 20%;
      background-size: $bg-size;
      &.active {
        background: url('../../assets/menu/faq1.png') no-repeat 50% 20%;
        background-size: $bg-size;
      }
    }
    a.active {
      color: $red;
    }
  }
</style>