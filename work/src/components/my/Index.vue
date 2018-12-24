<!--
	-- 个人中心
	-- @author bigfact
  -->
<template>
	<section class="my-index">
		<!--header-->
		<div class="header bg-white fs18">
			<div class="message-wrap" @click="goto('/my/message')">
				<img class="dingling" src="../../assets/my/dingling-white.png" alt="">
				<i v-if="dingling" class="icon-dot"></i>
			</div>
			<div class="logined" v-if="isLogin == 1">
				<div class="fl">
					<img class="avatar" src="../../assets/my/avatar.png" alt="">
				</div>
				<div class="user-info fl">
					<p class="fs14">{{ name || '&nbsp;' }}</p>
					<!--<p class="fs15">{{ phone }}</p>-->
				</div>

				<div class="my-account tac fs14">
					<p><span class="fs40">¥{{balance}}</span> <span class="withdraw c-yellow" @click="goto('/my/withdrawals-detailed')">提现</span></p>
					<p>账户余额 &nbsp;&nbsp;<span class="c-yellow" @click="goto('/my/balance-detailed')">明细</span></p>
				</div>
			</div>
			<div class="no-login tac" v-if="isLogin == -1">
				<a @click="goto('/center')" class="login-btn fs16">登录/注册</a>
			</div>
		</div>
		<!--功能列表-->
		<div class="fs16">
			<!--列表1-->
			<div class="func-wrap bg-white">
				<a @click="goto('/my/progress')" class="progress">
					<p class="row link">进度查询</p>
				</a>
				<a @click="goto('/my/contract')" class="contract">
					<p class="row link">我的合同</p>
				</a>
				<a @click="goto('/my/record')" class="record">
					<p class="row link">借款记录</p>
				</a>
				<a @click="goto('/bank/list')" class="bank">
					<p class="row link">我的银行卡</p>
				</a>
				<a @click="goto('/active/invite/share')" class="invite" v-show="showCouponInvite">
					<p class="row link">
						<span>邀请好友</span>
						<img class="right-icon" src="../../assets/my/logo-invite-right.png" alt="">
					</p>
				</a>
				<a @click="goto('/my/coupon')" class="coupon" v-show="showCouponInvite">
					<p class="row link">
						<span>我的奖励</span>
						<img class="right-icon" src="../../assets/my/logo-coupon-right.png" alt="">
					</p>
				</a>
			</div>
			<!--列表2-->
			<div class="func-wrap bg-white">
				<a @click="goto('/faq', true)" class="faq" v-show="showFaq">
					<p class="row link">常见问题</p>
				</a>
				<a @click="goto('/my/customer-service', true)" class="cs">
					<p class="row link">我的客服</p>
				</a>
				<a @click="goto('/my/setting')" class="setting" v-if="showSetting">
					<p class="row link">设置</p>
				</a>
			</div>
		</div>
		<!--调试工具-->
		<d-debuger :style="{ height: height || '30px' }"></d-debuger>
		<!--菜单-->
		<d-menu :active="'my'"></d-menu>
		<!--提示完善信息弹窗-->
		<div class="layui-m-layer" v-show="ConfirmTipShow">
			<div class="layui-m-layershade"></div>
			<div class="layui-m-layermain">
				<div class="layui-m-layersection">
					<div class="layui-m-layerchild  layui-m-anim-scale">
						<div class="layui-m-layercont confirm-content c-default">
							<p class="title fs18">提现前请先完善您的身份信息：</p>
							<div class="tal">
								<p>1、请到首页点击我要借款。</p>
								<p>2、完成身份识别。</p>
								<p>3、回到“个人中心”页面继续操作。</p>
							</div>
							<div class="btns">
								<button class="btn inline" @click="toggleConfirmTip()">我知道了</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import DMenu from '../common/DMenu'
	import DDebuger from '../common/DDebuger'

	var $data = {
		phone: '',
		name: '',
		balance: 0, // 余额
		has_card: false, // 是否绑卡
		living: false, // 是否活体
		dingling: false,
		isLogin: 0,
		// 钱升钱 app 和微信中不显示设置按钮
		showSetting: !sysinfo.qsq.isapp() && !sysinfo.isWeiXin,
		// 是否显示我的优惠券和邀请好友，在旧版的 app 中不显示
		showCouponInvite: false,
		// 是否显示常见问题
		showFaq: !sysinfo.dsq.isapp() || sysinfo.dsq.getVersion() >= 200,
		// 适配 ios app 中偶尔会出现的页脚黑块
		height: '30px',
		ConfirmTipShow: false // 弹框提示
	}

	export default {
		data() {
      /**
			 * 数据获取
			 * http://git.fond.io/b/paydayloan/wikis/appv1/util-get-user-info
			 */
			ajax.get('/v3/center/index')
				.then(function (xhr, res) {
					if (res.code == 0) {
						// 已登录
						$data.isLogin = 1
						$data.phone = res.data.user_phone
						$data.name = res.data.individual_name
						$data.dingling = res.data.message_amount > 0

						$data.balance = res.data.balance
						$data.has_card = res.data.has_card
						$data.living = res.data.living
					} else if (res.code == 101003) {
						// 未登录
						$data.isLogin = -1
					} else {
						$data.isLogin = -1
						// 其他返回信息
						layer.warning(res.message)
					}
				})
			return $data
		},
		ready() {
			$data.showCouponInvite = !sysinfo.dsq.isapp() || sysinfo.dsq.getVersion() >= 110
			// ios app 小屏幕下
			sysinfo.dsq.isapp() && sysinfo.isIOS && window.screen.height < 736 && ($data.height = '95px')
			// console.log(document.body.offsetHeight)
			// console.log(window.screen.height < 736)
		},
		methods: {
			// 根据用户登录与否跳转到某个页面
			goto(link, noLogin) {
				// 提现判断
				if (link.indexOf('withdrawals-detailed') > -1) {
					if (!$data.name) {
						// 没有实名认证，则提示信息
						$data.ConfirmTipShow = true
						return
					}
					if (!$data.has_card) {
						link = '/bank/add?from=mywithdrawals'
					}
				}
				var router = this.$router
				// 判断用户是否登录
				if ($data.isLogin == 1 || noLogin) {
					// 如果 app 版本大于 1.0.4 则用 openview 打开新的链接，否则直接跳转
					sysinfo.dsq.getVersion() >= 104 ? sysinfo.dsq.open(location.origin + location.pathname + '#!' + link) : router.go(link)
				} else {
					sysinfo.dsq.isapp() ? sysinfo.dsq.login() : router.replace('/user/login?ref=/my')
				}
				// $data.isLogin == 1 ? router.go(link) : (sysinfo.dsq.isapp() ? sysinfo.dsq.login() : router.replace('/user/login?ref=/my'))
			},
			toggleConfirmTip() {
				$data.ConfirmTipShow = false;
			}
		},
		components: {
			DMenu: DMenu,
			DDebuger: DDebuger
		}
	}

</script>

<style lang="scss">
	@import '../../sass/_globals.scss';
	.my-index {
		box-sizing: border-box;

		/*页头*/
		.header {
			// box-sizing: border-box;
			height: px2rem(90);
			padding: px2rem(15) px2rem(16);
			position: relative;
			background: $main-color url('../../assets/my/bg-hd.png') no-repeat center bottom;
			background-size: 100% px2rem(50);
			color: $color-white;
		}
		/*消息链接容器*/
		.message-wrap {
			padding: px2rem(10);
			position: absolute;
			top: 0.5rem;
			right: 0;
		}
		/*消息链接图标*/
		.dingling {
			width: px2rem(16);
		}
		/*消息未读提示红点*/
		.icon-dot {
			background: $c-yellow;
			position: absolute;
			top: px2rem(9);
			right: px2rem(9);
			height: px2rem(8);
			width: px2rem(8);
			border-radius: 100%;
		}
		/*用户信息*/
		.user-info {
			padding: 0.6rem 0;
		}
		/*头像*/
		.avatar {
			height: px2rem(30);
			margin-right: px2rem(8);
		}
		/*未登录显示*/
		.no-login {
			padding-top: px2rem(40);
			color: #fff;
			a {
				color: inherit;
			}
		}
		/*登录注册按钮*/
		.login-btn {
			display: inline-block;
			padding: px2rem(5) 0;
			width: px2rem(100);
			border: 1px solid currentColor;
			border-radius: px2rem(30);
		}
		/*功能列表容器*/
		.func-wrap {
			margin-top: px2rem(8);
			a {
				display: block;
				text-align: left;
				color: #383838;
				padding: 0 px2rem(10) 0 px2rem(50);
				.row {
					padding-top: px2rem(14);
					padding-bottom: px2rem(14);
				}
			}
			a:last-of-type .row::after {
				border: none;
			}
		}
		/*功能页面右边图标*/
		.right-icon {
			height: px2rem(30);
			position: absolute;
			top: 0;
			bottom: 0;
			right: px2rem(20);
			margin: auto;
		}
		/*功能页面链接图标*/
		$bg-size: px2rem(20);
		.contract {
			background: url('../../assets/my/logo-contract.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.progress {
			background: url('../../assets/my/logo-progress.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.record {
			background: url('../../assets/my/logo-record.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.bank {
			background: url('../../assets/my/logo-bank-list.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.invite {
			background: url('../../assets/my/logo-invite.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.coupon {
			background: url('../../assets/my/logo-coupon.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.faq {
			background: url('../../assets/my/logo-faq.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.cs {
			background: url('../../assets/my/logo-CS.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}
		.setting {
			background: url('../../assets/my/logo-setting.png') px2rem(15) no-repeat;
			background-size: $bg-size;
		}


		.my-account {
			position: absolute;
			left: 0;
			right: 0;
			bottom: px2rem(20);

			.withdraw {
				display: inline-block;
				padding: 0 px2rem(8);
				border: 1px solid $c-yellow;
				border-radius: 10rem;
				vertical-align: 0.6rem;
			}
		}
		/*提示完善信息弹窗*/
		.confirm-content {
			padding: px2rem(25) px2rem(15) px2rem(15);
			.title {
				margin-bottom: px2rem(8);
			}
			.btns {
				margin-top: px2rem(15);
			}
			.inline {
				background: #FF7100;
				padding: px2rem(6) 0;
				width: 45%;
			}
		}
	}
</style>