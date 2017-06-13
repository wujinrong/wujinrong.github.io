<template>
  <section class="auth-contact-forget container">
    <div class="tabs tac clearfix">
      <div :class="active == '1' && 'active'" @click="click('1')">移动</div>
      <div :class="active == '2' && 'active'" @click="click('2')">联通</div>
      <div :class="active == '3' && 'active'" @click="click('3')">电信</div>
    </div>
    <div>
      <div class="yidong" v-show="active == '1'">
        <div class="fs18">方式一</div>
        <div class="tac">联系 10086 进行密码重置（推荐）</div>
        <br>
        <div class="btn-wrap tac">
          <a href="tel://10086" @click="call($event, '10086')" class="btn outline">呼叫</a>
        </div>
        <br>
        <div class="line-1"></div>
        <br>
        <div class="fs18">方式二</div>
        <br>
        <div class="pl20">
          <p>进入移动官网找回密码：</p>
          <p>（1）选择手机号码归属地；</p>
          <p>（2）点击【我的移动】-【密码重置】</p>
          <p>http://www.10086.cn</p>
        </div>
      </div>
      <div class="liantong" v-show="active == '2'">
        <p>1. 2G、3G手机 --- 发送 MM 到 10010 按照提示进行密码修改的操作；</p>
        <br>
        <p>2. 4G手机 --- 发送 MMCZ 到 10010 按照提示进行密码修改的操作。</p>
      </div>
      <div class="dianxin" v-show="active == '3'">
        <div class="fs18">方式一</div>
        <div class="tac">拨打 10000 ，人工服务修改</div>
        <br>
        <div class="btn-wrap tac">
          <a href="tel://10000" @click="call($event, '10000')" class="btn outline">呼叫</a>
        </div>
        <br>
        <div class="line-1"></div>
        <br>
        <div class="fs18">方式二</div>
        <div class="tac">拨打 10001 ，系统修改</div>
        <br>
        <div class="tac">
          <div class="btn-wrap tac">
            <a href="tel://10001" @click="call($event, '10001')" class="btn outline">呼叫</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  var $data = {
    active: '1',
  }
  export default {
    data() {
      return $data
    },
    ready() { },
    methods: {
      click(str) {
        $data.active = str
      },
      // 拨打电话
      call(e, num) {
        // 钱牛牛和贷上钱 app 中不使用链接拨打形式
        if(sysinfo.dsq.isapp() || sysinfo.qsq.isapp()) {
          e.preventDefault()
          sysinfo.dsq.phoneCall(num)
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../sass/_globals';
  .auth-contact-forget {
    padding: 0 px2rem(25);
    .tabs {
      padding: px2rem(30);
      > div {
        width: 33.33%;
        float: left;
        padding: px2rem(6);
        border: 1px solid $main-color;
        box-sizing: border-box;
        transition: background ease .3s;
        &:nth-of-type(2) {
          border-left: none;
          border-right: none;
        }
        &:first-of-type {
          border-radius: 5px 0 0 5px;
        }
        &:last-of-type {
          border-radius: 0 5px 5px 0;
        }
      }
      .active {
        color: #FFF;
        background: $main-color;
      }
    }
    .pl20 {
      padding-left: px2rem(50);
    }
    .line-1 {
      background: #adadad;
    }
    .btn {
      width: auto;
      padding: px2rem(8);
    }
  }
</style>