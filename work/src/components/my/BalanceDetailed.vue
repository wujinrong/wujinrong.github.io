<template>
  <section class="my-balance-detailed container">
    <div class="panel">
      <div class="tabs">
        <span :class="active == 0 && 'active'" @click="switchTab(0)">余额明细</span>
        <span href="#" :class="active == 1 && 'active'" @click="switchTab(1)">被邀请人</span>
      </div>
      <div class="content">
        <div class="con1" :class="active > 0 && 'coupon-list-left'">
          <ul v-show="list.length > 0">
            <li v-for="i in list" v-link="'/my/redpacket-detailed?type='+i.type+'&id='+i.id">
              <div class="fl">{{ i.desc }}<br /><span>{{ i.create_date }}</span></div>
              <div class="fr" :class="i.type != 1 && 'blue'">{{ i.type == 1 ? '+&nbsp;&nbsp;' : '-&nbsp;&nbsp;' }}{{ i.amount }}<br /><span>余额：{{ i.balance }}</span></div>
            </li>
          </ul>
          <div class="tac fs18 c-gray" v-show="list.length <= 0">暂无邀请人</div>
        </div>
        <div class="con2" :class="active < 1 && 'coupon-list-right'">
          <ul v-show="invite_list.length > 0">
            <li v-for="j in invite_list">
              <div class="fl">{{ j.phone }}</div>
              <div class="fr" :class="!j.grant && 'blue'">{{ j.grant ? '已放款' : '未放款' }}</div>
            </li>
          </ul>
          <div class="tac fs18 c-gray" v-show="invite_list.length <= 0">暂无邀请人</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  var $data = {
    active: 0,
    list: [],
    invite_list: []
  }

  export default {
    data() {
      ajax.get('/v3/account/list')
        .then(function(xhr, res){
          if( res.code == 0 ) {
            $data.list = res.data.list;
            $data.invite_list = res.data.invite_list;
            store.local.set('redpacket-list',JSON.stringify($data.list));
            console.log(store.local.get('redpacket-list'))
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
      }
    },
  }
</script>

<style lang="scss">
  @import '../../sass/_globals.scss';
  .my-balance-detailed {
    overflow-x: hidden;
    .panel {
      padding-top: px2rem(20);
      .tabs {
        margin: 0 px2rem(20);
        border: 1px solid #FF6262;
        border-radius: 4px;
        &::after {
          content: '';
          display: block;
          overflow: hidden;
          clear: both;
        }
        span {
          color: #ADADAD;
          width: 49.99999999999999%;
          float: left;
          text-align: center;
          line-height: px2rem(32);
          &.active {
            color: #fff;
            background: #FF6262;
          }
        }
      }
      .content {
        margin-top: px2rem(20);
        position: relative;
        .con1, .con2 {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          transition: transform .5s ease 0s;
          ul {
            background: #fff;
            border-top: 1px solid #DBDBDB;
            li {
              padding: px2rem(8) px2rem(12);
              border-bottom: 1px solid #DBDBDB;
              &::after {
                content: '';
                display: block;
                clear: both;
                overflow: hidden;
              }
              .fl {
                float: left;
              }
              .fr {
                color: #FF6262;
                float: right;
                text-align: center;
                span {
                  color: #000;
                }
              }
              .blue {
                color: #81A3DE;
              }
            }
          }
        }
        .coupon-list-left {
          height: px2rem(300);
          overflow: hidden;
          transform: translatex(-200%);
        }
        .coupon-list-right {
          height: px2rem(300);
          overflow: hidden;
          transform: translatex(200%);
        }
      }
    }
  }
</style>
