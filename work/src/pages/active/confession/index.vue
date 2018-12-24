<!--
  -- 贷上钱 app banner 活动 - 520告白日
  -- @author fangyunlong
  -- @date 20170515
  -->
<template>
  <section class="active-confession">
    <!-- banner -->
    <img src="../../../assets/active/confession/banner.png" alt="" class="banner">
    <div class="toptitle">
      <img src="../../../assets/active/confession/toptitle.png" alt="" class="toptitle_pic">
      <span class="c-white fs18">双重奖励</span>
    </div>
    <!-- 第一二个提示框 -->
    <div class="reward-txt clearfix">
      <div class="fl">
        <div class="txt-left">
          <div class="bg-left fl"></div>
          <div class="bg-right fr"></div>
        </div>
        <span class="reward-first">奖励一</span>
        <span class="reward-second text-hide">借款额1%返现</span>
      </div>
      <div class="fr">
        <div class="txt-left txt-right">
          <div class="bg-left fl"></div>
          <div class="bg-right fr"></div>
          <span class="reward-first">奖励二</span>
          <span class="reward-second text-hide">前十名现金大奖</span>
        </div>
      </div>
    </div>
    <!-- 第三个提示框 -->
    <div class="reward-txt2">
      <div class="fl"></div>
      <div class="fr"></div>
      <span class="cashrule fs17">现金奖励额度</span>
      <p>
        <span>第一名:1314元</span>
        <span class="txt4">第四名:388元</span>
      </p>
      <p>
        <span>第二名:888元</span>
        <span class="txt5">第五名:288</span>
      </p>
      <p>
        <span>第三名:520元</span>
        <span class="txt6">第六名~第十名:188元</span>
      </p>
    </div>
    <!-- 活动提示信息 -->
    <p class="active-msg">参与对象：所有注册用户</p>
    <div class="rules">
      <div class="fl"></div>
      <div class="fr"></div>
      <div class="bigtitle">
        <span class="spctitle c-white fs18">活动规划</span>
      </div>
      <p>1.活动期间邀请好友申请借款，既有机会获得现金奖励。</p>
      <p>2.关注“贷上钱服务号”或者微信搜索“dsqmxkj”，查看“520告白日，赢1314给你爱的TA”活动，查看中奖名单。</p>
      <p>3.邀请好友完成借款人数最多的用户，即可获得1314元大奖，根据邀请人数以此类推选出前十名中奖用户，发放对应现金奖励。</p>
    </div>
    <p class="wx-msg tac">温馨提醒</p>
    <p class="wx-reward1 tac fs13">奖励一：邀新返现自动返至您的账户，可至“贷上钱APP”-“个人中心”-“邀请好友”查看；</p>
    <p class="wx-reward2 tac fs13">奖励二：活动结束后的3个工作日内，工作人员将与您联系并发放现金奖励。</p>
    <img class="qrcode" src="../../../../static/img/app/index/qrcode.png" alt="">
    <div class="footmsg">
      <p class="tac fa12">关注“贷上钱服务号”或直接输入“dsqmxkj”</p>
      <p class="tac fs12">参与活动，查看获奖名单</p>
    </div>
    <footer>
      <p class="tac fs14">本活动最终解释权归贷上钱所有</p>
    </footer>
  </section>
</template>
<style lang="scss">
@import '../../../sass/_globals';
.active-confession {
  background-color: #fc6791;
  .banner {
    width: 100%;
    display: block;
  }
  .toptitle {
    width: 100%;
    height: px2rem(73);
    text-align: center;
    position: relative;
    overflow: hidden;
    .toptitle_pic {
      width: px2rem(185);
    }
    span {
      font-weight: 700;
      position: absolute;
      left: 50%;
      top: px2rem(25);
      transform: translateX(-40%);
    }
  }
  .reward-txt {
    margin-left: px2rem(30);
    margin-right: px2rem(30);
    height: px2rem(84);
    >div {
      height: px2rem(83);
      width: 50%;
      position: relative;
      .txt-left {
        height: 100%;
        margin-left: 0;
        margin-right: px2rem(8);
        background: url('../../../assets/active/confession/jiangli-middle.png') 0 -1px;
        background-size: auto px2rem(83);
        .bg-left {
          height: 100%;
          width: px2rem(15);
          background: url('../../../assets/active/confession/jiangli-left.png') no-repeat center;
          background-size: cover;
        }
        .bg-right {
          height: 100%;
          width: px2rem(15);
          background: url('../../../assets/active/confession/jiangli-right.png') no-repeat center;
          background-size: cover;
        }
      }
      .reward-first {
        font-size: px2rem(17);
        color: #ff618e;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: px2rem(10)
      }
      .reward-second {
        font-size: px2rem(14);
        color: #6a232d;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: px2rem(18);
      }
      .txt-right {
        height: 100%;
        margin-right: 0;
        margin-left: px2rem(8);
        background-color: black;
      }
    }
  }
  .reward-txt2 {
    margin-top: px2rem(15);
    margin-left: px2rem(30);
    margin-right: px2rem(30);
    height: px2rem(163);
    position: relative;
    background: url('../../../assets/active/confession/jiangli-middle2.png');
    background-size: auto px2rem(163);
    overflow: hidden;
    div {
      height: 100%;
      background-color: red;
    }
    .fl {
      width: px2rem(23);
      background: url('../../../assets/active/confession/bg-left.png');
      background-size: cover;
    }
    .fr {
      width: px2rem(17.5);
      background: url('../../../assets/active/confession/bg-right.png');
      background-size: cover;
    }
    .cashrule {
      color: #ff618e;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: px2rem(15)
    }
    p {
      color: #6a232d;
      font-size: px2rem(15);
    }
    p:nth-child(4) {
      margin-top: px2rem(78);
    }
    .txt4 {
      margin-left: px2rem(10);
    }
    .txt5 {
      margin-left: px2rem(16);
    }
    .txt6 {
      margin-left: px2rem(15);
    }
  }
  .active-msg {
    text-align: center;
    color: white;
    font-size: px2rem(13);
    margin-top: px2rem(10);
    padding-bottom: px2rem(25);
  }
  .rules {
    margin-left: px2rem(32.5);
    margin-right: px2rem(32.5);
    height: px2rem(259);
    background: url('../../../assets/active/confession/bigbg-mid.png');
    background-size: auto px2rem(259);
    position: relative;
    border: 1px solid #fc6791;
    .fl {
      width: px2rem(19);
      height: 100%;
      background: url('../../../assets/active/confession/bigbg-left.png');
      background-size: cover;
    }
    .fr {
      width: px2rem(19);
      height: 100%;
      background: url('../../../assets/active/confession/bigbg-right.png');
      background-size: cover;
    }
    .bigtitle {
      position: absolute;
      background-color: red;
      width: px2rem(168);
      height: px2rem(30);
      left: 50%;
      transform: translateX(-50%);
      margin-top: px2rem(-14);
      background: url('../../../assets/active/confession/lastimg.png') no-repeat;
      background-size: auto px2rem(30);
      span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: px2rem(5);
        font-weight: 700;
      }
    }
    p {
      font-size: px2rem(14);
      color: #6a232d;
      margin-top: px2rem(20);
    }
    p:nth-child(4) {
      margin-top: px2rem(30);
    }
  }
  .wx-msg {
    font-size: px2rem(18);
    color: white;
    font-weight: 700;
    margin-top: px2rem(18);
    margin-bottom: px2rem(5);
  }
  .wx-reward1,
  .wx-reward2 {
    color: white;
    padding: 0 px2rem(32.5);
  }
  .qrcode {
    width: px2rem(80);
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: px2rem(25);
  }
  .footmsg {
    width: 100%;
    height: px2rem(100);
    background-color: white;
    margin-top: px2rem(55);
    overflow: hidden;
    p:nth-child(1) {
      margin-top: px2rem(50);
    }
  }
  footer {
    color: #ffaac3;
    p {
      margin-top: px2rem(20);
      padding-bottom: px2rem(40);
    }
  }
}
</style>
