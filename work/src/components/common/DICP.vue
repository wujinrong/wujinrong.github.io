<!--
  -- 页脚icp文案，需要区分环境（不同的渠道，不同的域名）显示
  -- 1、对于 daishangqian.com 的特殊处理，关于“墨讯”的文案，针对特定渠道的推广页面恢复显示“墨讯”页脚文案，暂时解决因无公司信息造成审核被拒的问题，其他渠道不显示 icp 信息
  -- 2、对于其他域名下，根据 tapd 上列出的信息，动态的显示 icp 信息
  -- 3、tapd - https://www.tapd.cn/20051441/prong/stories/view/1120051441001002846?url_cache_key=3cc61a9bd2db316255d7f3f79504827b&action_entry_type=stories
  -- @author bigfact
  -- @date 2016.12.09
  -- @example
  -- <template>
  --   <d-icp></d-icp>
  -- </template>
  -- <script>
  --   import DICP from './common/DICP.vue'
  --   export default {
  --     data() {
  --       return { }
  --     },
  --     components: {
  --       DICP: DICP,
  --     },
  --   }
  -- </script>
  -->
<template>
  <div class="d-icp tac fs12" v-if="show">
    <p>{{ code }}</p>
    <p>{{ name }}</p>
    <p class="fs10">贷款有风险 选择需谨慎</p>
  </div>
</template>
<script>
  export default {
    data() {
      /**
       * 页面数据
       */
      var $data = {
        // 在钱牛牛、贷上钱 IOS app 中不显示该 ICP 文案
        show: !((sysinfo.dsq.isapp() || sysinfo.qsq.isapp()) && sysinfo.isIOS),
        code: '',
        name: ''
      }

      /**
       * 域名和公司信息的对应关系
       */
      var $relation = {
        // '10.8.40.255': {
        //   code: '沪ICP备16041593号 啦啦啦',
        //   name: '墨讯信息科技（上海）有限公司'
        // },
        'qianshengqian.com': {
          code: '粤ICP备14066056号',
          name: '深圳市钱生钱互联网金融服务有限公司'
        },
        'tengqiaotech.com': {
          code: '沪ICP备17017930号-1',
          name: '上海腾桥信息技术有限公司'
        },
        'chuanyuetech.com': {
          code: '沪ICP备17018722号-1',
          name: '上海氚悦信息科技有限公司'
        },
        'daishangqian.com': {
          code: '沪ICP备16041593号',
          name: '墨讯信息科技（上海）有限公司'
        }
      }

      var origin = location.origin

      // 对 daishangqian.com 的特殊处理逻辑
      var dsqOrigin = 'daishangqian.com'
      if (origin.indexOf(dsqOrigin) >= 0) {
        // 需要显示“墨讯”文案的父类标题
        var parentChannel = ['信息流']
        /**
         * 查询渠道码信息，父类渠道码
         * http://git.fond.io/b/paydayloan/wikis/v3-channel-info
         */
        ajax.get('/v3/util/get-channel', {
          channel: sysinfo.getQueryString('channel')
        }).then(function (xhr, res) {
          if (res.code == 0 && parentChannel.indexOf(res.data.parent_title) >= 0) {
            $data.code = $relation[dsqOrigin].code
            $data.name = $relation[dsqOrigin].name
          }
        })
      }
      // 其他域名处理
      else {
        for (var i in $relation) {
          if (origin.indexOf(i) >= 0) {
            $data.code = $relation[i].code
            $data.name = $relation[i].name
            break
          }
        }
      }
      return $data
    }
  }

</script>
<style lang="scss">
  @import "../../sass/_globals.scss";
  .d-icp {
    padding: px2rem(40) 0 px2rem(20);
    line-height: px2rem(20);
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
  @media (max-height: 450px) {
    .d-icp {
      position: relative;
    }
  }
  
  @media (orientation: landscape) {
    .d-icp {
      position: relative;
    }
  }
</style>