<template>
	<section class="my-message container fs18" @touchstart="start($event)" @touchmove="move($event)">
    <!--消息条目列表-->
		<div class="link-wrap">
			<a v-for="i in msgs" @click="goto(i)" class="row link" :class="i.user_message_status == 0 && 'active'">
        <p>{{ i.message_title }}</p>
				<p class="fs16 text-hide">{{ i.message_content }}</p>
			</a>
		</div>
		<!--加载数据 loading 框-->
		<div class="loading c-main tac" v-if="isLoading">
			<div class="spinner-wrap">
				<div class="spinner">
					<div class="circle-clipper left">
						<div class="circle"></div>
					</div>
					<div class="gap-patch">
						<div class="circle"></div>
					</div>
					<div class="circle-clipper right">
						<div class="circle"></div>
					</div>
				</div>
			</div>
		</div>
    <!--没有更多消息了-->
    <div class="havenomore tac" v-if="havenomore">没有更多消息了</div>
	</section>
</template>

<script>
  var $data = {
    msgs: [],
    py0: 0,
    isLoading: false,
    pagenum: 1,
    havenomore: false,
    haveerror: false,
  }

  // 获取数据
  function getData() {
    ajax.get('/v3/message/get', {
      current_page: $data.pagenum,
    })
      .then(function(xhr, res) {
        if(res.code == 0) {
          for(var i in res.data) {
            $data.msgs.push(res.data[i])
          }
          if(res.data.length < 10) {
            $data.havenomore = true
          }
          $data.pagenum++
          $data.haveerror = false
        }
        else {
          layer.warning(res.message)
          $data.haveerror = true
        }
      })
      .complete(function() {
        $data.isLoading = false;
      })
  }

  export default {
    data() {
      // 数据初始化
      $data.msgs = []
      $data.py0 = 0
      $data.isLoading = false
      $data.pagenum = 1
      $data.havenomore = false
      $data.haveerror = false
      // 获取数据
      getData()
      return $data
    },
    ready() { },
    methods: {
      // 滑动开始记录初始位置
      start(e) {
        $data.py0 = e.touches[0].clientY
      },
      // 滑动中
      move(e) {
        // 没有错误，且还有更多数据，且没有正在加载数据，且在上滑，且滑动到页面最底部时，触发加载数据
        if(!$data.haveerror && !$data.havenomore && !$data.isLoading && $data.py0 - e.touches[0].clientY > 0 && document.body.scrollTop + document.body.offsetHeight >= document.body.scrollHeight) {          
          $data.isLoading = true
          getData()
        }
      },
      // 消息条目点击处理
      goto(i) {
        // 未读状态设为已读状态
        if(i.user_message_status == 0) {
          ajax.post('/v3/message/change', {
            user_message_id: i.user_message_id
          })
        }
        // 跳转到详情页面
        this.$router.go('/my/message/detail?title=' + encodeURI(i.message_title) + '&content=' + encodeURI(i.message_content) + '&time=' + encodeURI(i.user_message_create_at))
      }
    },
    components: { },
  }
</script>

<style lang="scss">
	@import '../../sass/_globals.scss';
	.my-message {
		.link-wrap {
			padding-left: px2rem(20);
		}
		.link {
			color: #989898;
			background-position-x: 97%;
			padding-top: px2rem(20);
			padding-bottom: px2rem(18);
			p {
				padding-right: px2rem(30);
				&:last-of-type {
          color: #AEAEAE;
					padding-top: px2rem(12);
				}
			}
		}
		.active {
			color: #383838;
      p:last-of-type {
        color: #747474;
			}
		}
		.havenomore {
			padding: px2rem(20) 0;
      color: #989898;
		}
    .loading {
			padding: px2rem(20) 0;
		}
	}
</style>