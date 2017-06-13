<!--
  -- 我的优惠券
  -- @author bigfact
  -->
<template>
  <section class="my-coupon container">
    <!--tab 切换按钮组-->
    <div class="tabs tac fs15 clearfix">
      <div :class="active == 0 && 'active'" @click="switchTab(0)">优惠券({{ numbers.coupons }})</div>
      <div :class="active == 2 && 'active'" @click="switchTab(2)">现金红包({{ numbers.envelopes }})</div>
    </div>
    <!--优惠券标签页列表-->
    <div class="coupon-list-wrap">
      <!--优惠券列表-->
      <div class="coupon-list" :class="active > 0 && 'coupon-list-left'">
        <div  v-show="numbers.coupons > 0">
          <div class="coupon-item" :class="i.status != 0 && 'coupon-used'" v-for="i in coupons">
            <div class="coupon-inner clearfix">
              <div class="coupon-left">{{ i.name }}</div>
              <div class="coupon-right">
                <p>{{ i.use_desc }}</p>
                <p>{{ i.expire_desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <!--没有优惠券提示-->
        <div class="coupon-null tac fs20" v-show="numbers.coupons == 0">
          <p>您还没有优惠券</p>
        </div>
      </div>
      <!--现金红包列表-->
      <div class="coupon-list" :class="active < 2 && 'coupon-list-right'">
        <div v-show="numbers.envelopes > 0">
          <div class="coupon-item" v-for="i in envelopes">
            <div class="coupon-inner clearfix">
              <div class="coupon-left">{{ i.desc }}</div>
              <div class="coupon-right te">
                <p>{{ i.create_date }}</p>
                <p>{{ i.amount }} <span>¥</span></p>
              </div>
            </div>
          </div>
        </div>
        <!--现金红包提示-->
        <div class="coupon-null tac fs20" v-show="numbers.envelopes == 0">
          <p>您还没有现金红包</p>
        </div>
      </div>
    </div>
    <!--邀请好友链接-->
    <a v-link="'/active/invite/share'" class="btn bottom">继续邀请好友，赢取更多优惠券！</a>
    <!--优惠券使用说明链接-->
    <a v-link="'/my/coupon/specification'" class="specification-link tac">
      <div class="specification-link-inner">
        <p>使用</p>
        <p>说明</p>
      </div>
    </a>
  </section>
</template>
<script>
var $data = {
  /**
   * 业务数据
   */
  coupons: [],       // 优惠券
  envelopes: [],       // 已使用的券
  numbers: {
    coupons: 0,       //未使用的券数量
    envelopes: 0,      //已使用的券数量
  },
  /**
   * 页面控制数据 
   */
  active: 0,         // 处于激活状态的tab
}
export default {
  data() {
    ajax.get('/v3/account/activity')
      .then((xhr, res) => {
        if (res.code == 0) {
          $data.coupons = res.data.coupons;
          $data.numbers.coupons = res.data.coupons.length;
          $data.envelopes = res.data.envelopes;
          $data.numbers.envelopes = res.data.envelopes.length;
        } else {
          layer.warning(res.message)
        }
      })
    return $data
  },
  methods: {
    /**
     * 切换 tab
     * @param {Number} index tab 的序号 
     */
    switchTab (index) {
      $data.active = index
    },
    /**
     * 获取优惠券列表数据
     * http://git.fond.io/b/paydayloan/wikis/coupon-v2
     * @param {String} status 状态（0-未使用 1-已使用 2-已过期）
     */
    getCoupon (status) {
    }
  },
  components: { },
}
</script>
<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-coupon {
    padding: px2rem(20) px2rem(30);
    overflow-x: hidden;
    /*tab 切换按钮组*/
    .tabs {
      margin-bottom: px2rem(15);
      border: 1px solid $main-color;
      border-radius: 4px;
      color: #ADADAD;
      > div {
        float: left;
        width: 49.9999999999%;
        padding: px2rem(12) 0 px2rem(10);
        box-sizing: border-box;
        transition: all .5s ease 0s;
      }
      .active {
        background: $main-color;
        color: #FFF;
      }
    }
    /*优惠券列表容器*/
    .coupon-list-wrap {
      position: relative;
    }
    /*优惠券列表*/
    .coupon-list {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding-bottom: px2rem(50);
      transition: transform .5s ease 0s;
      color: #FFF;
    }
    /*优惠券列表隐藏到左边*/
    .coupon-list-left {
      height: px2rem(300);
      overflow: hidden;
      transform: translatex(-200%);
    }
    /*优惠券列表隐藏到右边*/
    .coupon-list-right {
      height: px2rem(300);
      overflow: hidden;
      transform: translatex(200%);
    }
    /*优惠券条目*/
    .coupon-item {
      background: url("../../assets/my/coupon/bg-usable.png") no-repeat;
      background-size: 100% 100%;
      margin-bottom: px2rem(8);
      padding: px2rem(8) px2rem(8) px2rem(8) px2rem(12);
    }
    /*优惠券左边文字*/
    .coupon-left {
      color: $main-color;
      float: left;
      width: 25.5%;
      height: px2rem(68);
      line-height: px2rem(68);
      box-sizing: border-box;
      text-align: center;
      font-size: px2rem(16);
    }
    /*优惠券右边文字*/
    .coupon-right {
      float: right;
      line-height: px2rem(22);
      width: 74.5%;
      padding: px2rem(12) 0 px2rem(12) 15%;
      box-sizing: border-box;
      &::after {
        content: '';
        display: block;
        clear: both;
        overflow: hidden;
      }
    }
    .te{
      height: px2rem(68);
      line-height: px2rem(68);
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 8%;
      p:first-child {
        float: left;
      }
      p:last-child {
        font-size: px2rem(24);
        float: right;
      }
    }
    /*已使用和已过期的优惠券*/
    .coupon-used {
      color: #ADADAD;
      background: url("../../assets/my/coupon/bg-used.png") no-repeat;
      background-size: 100% 100%;
      .coupon-left {
        color: #ADADAD;
      }
    }
    /*没有优惠券提示*/
    .coupon-null {
      background: url("../../assets/my/coupon/bg-null.png") no-repeat;
      background-position: center px2rem(133);
      background-size: px2rem(122) auto;
      padding-top: px2rem(244);
      color: #CECECE;
    }
    /*使用说明链接*/
    .specification-link {
      z-index: 999;
      background: #FFF;
      position: fixed;
      right: px2rem(25);
      bottom: px2rem(85);
      width: px2rem(60);
      height: px2rem(60);
      border-radius: px2rem(60);
      box-shadow: 0 px2rem(3) px2rem(10) rgba(76, 50, 50, .5);
    }
    /*使用说明内部文字框*/
    .specification-link-inner {
      background: linear-gradient(top, #FF9797, #FF6262);
      color: #FFF;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: px2rem(55);
      height: px2rem(55);
      border-radius: px2rem(55);
      padding: px2rem(10) 0;
      box-sizing: border-box;
      margin: auto;
    }
  }
</style>