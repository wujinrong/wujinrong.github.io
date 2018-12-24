<!--
  -- 贷上钱 app banner 活动 - 端午节抽奖
  -- @author fangyunlong
  -- @date 20170524
  -->
<template>
  <section class="active-lotteryDraw fs15">
    <!-- banner -->
    <img src="../../../assets/active/lotteryDraw/banner.png" alt="" class="banner">
    <!-- 顶部轮播获奖信息 -->
    <!-- v-el:awardul -->
    <div v-show="reward_list[0]" class="topinfo">
      <ul v-el:awardul v-show="reward_list">
        <li>恭喜 {{reward_list[0].phone}} 获得{{reward_list[0].name}}</li>
        <li>恭喜 {{reward_list[1].phone}} 获得{{reward_list[1].name}}</li>
        <li>恭喜 {{reward_list[2].phone}} 获得{{reward_list[2].name}}</li>
        <li>恭喜 {{reward_list[3].phone}} 获得{{reward_list[3].name}}</li>
        <li>恭喜 {{reward_list[4].phone}} 获得{{reward_list[4].name}}</li>
        <li>恭喜 {{reward_list[5].phone}} 获得{{reward_list[5].name}}</li>
        <li>恭喜 {{reward_list[6].phone}} 获得{{reward_list[6].name}}</li>
        <li>恭喜 {{reward_list[7].phone}} 获得{{reward_list[7].name}}</li>
        <li>恭喜 {{reward_list[8].phone}} 获得{{reward_list[8].name}}</li>
        <li>恭喜 {{reward_list[0].phone}} 获得{{reward_list[0].name}}</li>
      </ul>
    </div>
    <!-- 大转盘 -->
    <div class="activePic">
      <img v-el:img src="../../../assets/active/lotteryDraw/pan.png" alt="" class="banner">
      <img src="../../../assets/active/lotteryDraw/icon.png" alt="" class="smallicon">
      <div v-submit="{cb:openMask}" class="theWord">
        <p>立即</p>
        <p>抽奖</p>
      </div>
    </div>
    <!-- 抽奖剩余次数 -->
    <div class="theNum tac fs12">
      您还有<span>{{count}}</span>次抽奖机会
    </div>
    <!-- 活动规则 -->
    <div class="rules tal fs14">
      <div class="ruleBtn tac c-white">活动规则</div>
      <p class="p1">活动时间：2017年5月30日-2017年6月15日</p>
      <p>活动对象：贷上钱所有注册用户</p>
      <p>活动奖励：iphone7（256G）、现金红包、优惠券</p>
      <p class="p4">如何获得更多抽奖机会：</p>
      <p>1）活动期间，所有注册用户首次登录均有一次抽奖机会</p>
      <p>2）首次完成芝麻分授信【奖励1次抽奖机会】</p>
      <p>3）活动期间，完成签约（最多2次）【奖励一次抽奖机会】</p>
      <p>4）邀请好友成功注册，每邀请一位用户，可获得1次抽奖机会</p>
      <p>5）活动期间，提前或正常完成还款（非逾期）【奖励1次抽奖机会】</p>
    </div>
    <!-- 温馨提示 -->
    <div class="rules tal fs14 rules2">
      <div class="ruleBtn tac c-white msg">温馨提示</div>
      <p class="p1">1）抽奖机会可累计，活动期间不清零</p>
      <p>2）每位用户每天只能获得10次抽奖机会</p>
      <p>3）现金红包可至“个人中心”查看余额，累计20元可提现；优惠券可至“我的奖励”查看，优惠券有效期均30天。</p>
      <p>4）获得iPhone7的用户将在3个工作日内收到短信通知，并由客服人员联系发放</p>
      <div class="bg3"></div>
    </div>
    <footer class="tac">
      本活动最终解释权归贷上钱所有
    </footer>
    <!-- 遮罩层 -->
    <div v-show="open" class="mask">
      <div v-show="awardInfo.id == 4" class="result tac">
        <div class="top"></div>
        <div class="middle cashBag">现金红包</div>
        <p class="iconMsg">恭喜您获得{{awardInfo.name}}</p>
        <p>请于“个人中心”查看余额</p>
        <div @click="closeMask" class="footBtn">确定</div>
      </div>
      <div v-else class="result tac">
        <div class="top"></div>
        <div class="middle">优惠券</div>
        <p class="iconMsg">恭喜您获得{{awardInfo.name}}</p>
        <p>请于“我的奖励”查看</p>
        <div @click="closeMask" class="footBtn">确定</div>
      </div>
    </div>
  </section>
</template>

<script>
import title from '../../../services/title'
var $data = {
  info: {},
  open: false,
  // 这个a是用来控制转盘旋转角度
  a: 0,
  // 这个数组通过id映射出转盘将要旋转的角度
  deg: [{
    id: 1,
    deg: 45
  }, {
    id: 2,
    deg: -90
  }, {
    id: 3,
    deg: 180
  }, {
    id: 4,
    deg: -45
  }],
  awardInfo: {},
  reward_list: [0, 0, 0, 0],
  count: 0,
  is_login: false
}
export default {
  data() {
      var _this = this
      ajax.get('/v3/activity/detail')
        .then(function(xhr, res) {
          if (res.code == 0) {
            // 判断登录态
            if (res.data) {
              $data.info = res.data
              $data.reward_list = res.data.reward_list
              $data.count = res.data.ticket_count
              $data.is_login = res.data.is_login
            }
          } else {
            layer.warning(res.message)
          }
        })
      return $data
    },
    methods: {
      openMask() {
        var _this = this
        ajax.post('/v3/activity/poll')
          .then(function(xhr, res) {
            if (res.code == 0) {
              // 抽奖之后的逻辑在这里
              // 数据抽取
              $data.awardInfo = res.data
                // 如果可以抽奖先转动转盘
              _this.a += 1080
                // 此处计算补充角度
              var otherDeg = 0
              if ($data.awardInfo.id >= 4) {
                otherDeg = -45
              } else {
                for (var i = 0; i < $data.deg.length; i++) {
                  if ($data.deg[i].id == $data.awardInfo.id) {
                    otherDeg = $data.deg[i].deg
                  }
                }
              }
              _this.$els.img.style.webkitTransform = "rotate(" + (_this.a + otherDeg) + "deg)"
                // 打开浮层
              setTimeout(function() {
                  _this.open = true
                }, 5000)
                // 减少抽奖次数
              $data.count = $data.count - 1
            } else if (res.code == 101003) {
              // 根据返回状态码判断是否登录
              if (!$data.is_login) sysinfo.dsq.isapp() ? sysinfo.dsq.login() : _this.$router.replace('/user/login?ref=' + _this.$route.path)
            } else if (res.code == 1) {
              layer.warning(res.message)
            } else {
              layer.warning(res.message)
            }
          })

      },
      closeMask() {
        this.open = !this.open
      }
    },
    ready: function() {
      console.log(typeof sysinfo.dsq.isapp())
        // 首先设置title
      title('豪礼送不停，免息又送钱');
      console.log(document.title)
        // 此处往下是轮播图逻辑
      var flag = 0
      var _this = this
      var obj = _this.$els.awardul
      console.log(obj)
        // 添加过渡属性
      function addTransition() {
        obj.style.transition = 'all ease'
        obj.style.webkitTransition = 'all 2s'
      }
      // 移除过渡属性
      function removeTransition() {
        obj.style.transition = 'none'
        obj.style.webkitTransition = 'none'
      }
      // 运动动画
      function moveTo(a) {
        obj.style.transform = 'translateY(' + a + 'px)'
        obj.style.webkitTransform = 'translateY(' + a + 'px)'
      }
      // 设置定时器运行运动动画
      setInterval(function() {
        addTransition()
        flag += obj.clientHeight / 10
        moveTo(-flag)
        if (flag >= obj.clientHeight) {
          removeTransition()
          moveTo(0)
          flag = 0
        }
      }, 2000)
    }
}

</script>

<style lang="scss">
@import '../../../sass/_globals';
.active-lotteryDraw {
  color: #633E25;
  background-color: #FFD428;
  position: relative;
  .banner {
    width: 100%;
  }
  .topinfo {
    width: 70%;
    margin: 0 auto;
    height: px2rem(25);
    border-radius: px2rem(12.5);
    background-color: white;
    border: 2px solid #FFAA05;
    overflow: hidden;
    ul {
      width: 100%;
      margin: 0 auto;
      font-size: 12px;
      li {
        width: 100%;
        height: px2rem(25);
        text-align: center;
        line-height: px2rem(25);
        white-space: nowrap;
      }
    }
  }
  .activePic {
    margin-left: px2rem(35);
    margin-right: px2rem(35);
    margin-top: px2rem(10);
    position: relative;
    img:nth-child(1) {
      transition: all 5s ease;
    }
    .smallicon {
      display: block;
      width: px2rem(60);
      height: px2rem(73);
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -50%);
    }
    .theWord {
      position: absolute;
      left: 50%;
      top: 50%;
      -webkit-transform: translate(-50%, -35%);
      font-size: px2rem(18);
      color: #633E25;
      font-weight: 700;
      line-height: px2rem(19);
      border: px2rem(10) solid transparent;
    }
  }
  .theNum {
    width: 40%;
    margin: 0 auto;
    height: px2rem(25);
    border-radius: px2rem(15);
    line-height: px2rem(25);
    border: 2px solid #FFAA05;
    margin-top: px2rem(20);
    color: #633E25;
  }
  .rules {
    margin-left: px2rem(22.5);
    margin-right: px2rem(22.5);
    background-color: yellowgreen;
    margin-top: px2rem(36.5);
    background: url('../../../assets/active/lotteryDraw/bg.png') no-repeat center;
    background-size: 100% 100%;
    position: relative;
    padding: 0 px2rem(15) px2rem(15) px2rem(15);
    border: 1px solid transparent;
    .p1 {
      margin-top: px2rem(30);
    }
    .p4 {
      margin-top: px2rem(12);
    }
    .msg {
      top: px2rem(-16)!important;
    }
    .ruleBtn {
      position: absolute;
      width: 45%;
      height: px2rem(25);
      background-color: #FD612E;
      top: px2rem(-12);
      left: 50%;
      -webkit-transform: translateX(-50%);
      border-radius: px2rem(12.5);
      border: 2px solid #FFAA05;
      line-height: px2rem(25);
    }
  }
  .rules2 {
    background-size: 100% auto;
    background-position: left 0 top 0;
    position: relative;
    .bg3 {
      width: 100%;
      height: px2rem(15);
      position: absolute;
      bottom: 0;
      left: 50%;
      -webkit-transform: translateX(-50%);
      background: url('../../../assets/active/lotteryDraw/bg.png') no-repeat center;
      background-position: left 0 bottom 0;
      background-size: 100% auto;
      background-color: #FFD428;
    }
  }
  footer {
    line-height: px2rem(66);
  }
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    .result {
      height: 25%;
      width: 70%;
      margin-left: 50%;
      -webkit-transform: translateX(-50%);
      margin-top: px2rem(168.5);
      background-color: #FFD627;
      .top {
        width: 100%;
        height: 33.333%;
        background: url('../../../assets/active/lotteryDraw/smallbg1.png') no-repeat center;
        background-size: 100% 100%;
      }
      .middle {
        width: 70%;
        height: 26.66%;
        background: url('../../../assets/active/lotteryDraw/smallbg2.png') no-repeat center;
        background-size: 100% 100%;
        margin: 0 auto;
        font-size: px2rem(24);
        line-height: px2rem(60);
        color: white;
        font-weight: 200;
      }
      .cashBag {
        background: url('../../../assets/active/lotteryDraw/smallbg3.png') no-repeat center !important;
      }
      .iconMsg {
        margin-top: px2rem(10);
      }
      .footBtn {
        width: 70%;
        height: px2rem(35);
        margin-top: px2rem(15);
        background-color: #FC5F39;
        margin-left: 50%;
        -webkit-transform: translateX(-50%);
        border-radius: px2rem(17.5);
        line-height: px2rem(35);
        color: white;
        font-size: px2rem(16);
      }
    }
  }
}

</style>

