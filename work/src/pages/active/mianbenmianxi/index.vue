<!--
  -- 贷上钱 app banner 活动 - 免本免息
  -- @author fyl
  -- @date 20170510
  -->
<template>
	<section class="active-mianbenmianxi">
		<img class="banner" src="../../../assets/active/mianbenmianxi/banner.png">
		<div class="flow">
			<div class="tit">
				<img class="icon" src="../../../assets/active/mianbenmianxi/icon1.png">返现流程
				<div class="tit-content">
					<img src="../../../assets/active/mianbenmianxi/icon0.png">
					<span class="tit-text">
						第1步：
					</span>
					<div class="tit-text2">
						贷上钱官方将于<span>次日18:00前</span>发送获奖短信给获奖用户
					</div>
				</div>
				<div class="tit-content">
					<img src="../../../assets/active/mianbenmianxi/icon2.png">
					<span class="tit-text">
						第2步：
					</span>
					<div class="tit-text2">
						贷上钱客服将致电本人确认个人信息以便后续打款返现
					</div>
				</div>
				<div class="tit-content">
					<img src="../../../assets/active/mianbenmianxi/icon3.png">
					<span class="tit-text">
						第3步：
					</span>
					<div class="tit-text2">
						贷上钱官方将在<span>3个工作日内</span>给中奖用户进行打款
					</div>
				</div>
				<img class="icon-notice" src="../../../assets/active/mianbenmianxi/group-4.png">
				<p>自获奖名单公布一周内未完成还款的用户视为自动放弃获奖资格，不予返现。</p>
			</div>
		</div>
		<div class="rules">
			<div class="rules-icon">
				<img src="../../../assets/active/mianbenmianxi/group.png">
			</div>
			<div class="rules-content">
				<p>一、活动期间关注微信公众号：贷上钱服务号，即可进入免本免息按钮参与报名。</p>
				<p>二、报名完成并完成成功借款的用户，借款手机号末四位和当天（上证指数收盘价小数点末两位+深圳指数收盘价小数点末两位）数字及顺序都相同，即可获得“免本免息大奖“。</p>
			</div>
			<div class="rules-pic">
				<div class="tac">
					<img class="bigpic" src="../../../assets/active/mianbenmianxi/page-1.png">
				</div>
				<img class="group4" src="../../../assets/active/mianbenmianxi/group-4.png">
				<div class="rulesbox">
					<p class="rulesbox-flag">1、前日15:00-当日14:59内借款用户，以当日上证指数，深圳指数收盘价为准，计入当日获奖统计。</p>
					<p class="rulesbox-flag">2、周五15:00～下周一14:59内借款用户，以下周一上证指数、深圳指数收盘价为准，进入下周一获奖统计。</p>
				</div>
			</div>
			<p>三、贷上钱官方将于次日下午18:00前在贷上钱服务号公布前一日获奖名单，节假日顺延</p>
			<p>四、贷上钱官方将全额返还借款本金及利息.</p>
			<p>五、返现总额200万元，发完为止。</p>
		</div>
		<div class="active-notice">
			<div class="active-tit">
				<img src="../../../assets/active/mianbenmianxi/group-2.png">
			</div>
			<p>1、活动期间，每位用户只有一次获奖机会</p>
			<p>2、活动期间若有用户通过不正当手段恶意刷奖，贷上钱平台有权取消其获奖资格；</p>
			<img class="qricon" src="../../../assets/active/mianbenmianxi/qricon.png">
			<p class="txt-foot">关注“贷上钱公众号”或直接输入“dsqmxkj”</p>
			<p class="txt-foot2">查看获奖名单</p>
		</div>
		<div class="footer bg-white tac c-placeholder">
			<div class="txt-foot3">
				<p>本活动最终解释权归贷上钱所有</p>
				<p>有疑问可咨询贷上钱公众号“dsqmxkj</p>
			</div>
		</div>
	</section>
</template>

<script type="text/javascript">
	export default {

	}

</script>

<style lang="scss">
	@import '../../../sass/_globals';
	.active-mianbenmianxi {
		&::after {
			display: block;
			content: '';
			visibility: hidden;
			line-height: 0;
			height: 0;
			clear: both;
		}
		width: 100%;
		background-color: rgb(238, 239, 241);
		.banner {
			width: 100%;
			display: block;
		}
		.flow {
			background-color: white;
			padding: 0 px2rem(17);
			position: relative;
			margin-bottom: px2rem(7);
			height: px2rem(480);
			&::after {
				content: "";
				display: block;
				height: 1px;
				position: absolute;
				bottom: 0;
				background-color: rgb(236, 240, 243);
			}
			.tit {
				height: px2rem(45);
				line-height: px2rem(45);
				font-size: px2rem(16);
				color: rgb(231, 85, 85);
				.icon {
					width: px2rem(23);
					vertical-align: middle;
					margin-top: px2rem(-3);
				}
				.tit-content {
					margin-bottom: px2rem(10);
					background-color: rgb(238, 239, 241);
					border-radius: 4px;
					padding: 0 px2rem(17);
					overflow: hidden;
					position: relative;
					img {
						width: px2rem(73);
						margin-top: px2rem(14)
					}
					.tit-text {
						position: absolute;
						left: px2rem(100);
						top: px2rem(24);
						font-size: px2rem(17);
						font-weight: 700;
						color: #636162;
					}
					.tit-text2 {
						position: absolute;
						top: px2rem(38);
						left: px2rem(152);
						right: px2rem(17);
						font-size: px2rem(14);
						color: #999999;
						line-height: px2rem(18);
						span {
							text-decoration: underline;
							color: #E75556;
						}
					}
				}
				.icon-notice {
					width: px2rem(38);
					display: block;
					margin-top: px2rem(20);
					margin-bottom: px2rem(15);
				}
				p {
					font-size: px2rem(14);
					line-height: px2rem(18);
					color: #999999;
					padding-left: px2rem(20);
					margin-bottom: px2rem(0);
				}
			}
		}
		.rules {
			padding: 0 px2rem(17) px2rem(17);
			background-color: white;
			.rules-icon {
				img {
					width: px2rem(80);
					margin: px2rem(15) 0 px2rem(10) 0;
				}
			}
			.rules-content {
				font-size: px2rem(14);
				color: rgb(105, 105, 105);
				p {
					margin-top: px2rem(20);
				}
				p:nth-child(1) {
					margin-top: 0;
				}
			}
			.rules-pic {
				border-radius: 5px;
				margin-top: px2rem(20);
				padding: px2rem(25);
				background-color: rgb(238, 239, 241);
				position: relative;
				/*height: px2rem(250);*/
				/*text-align: center;*/
				.group4 {
					display: inline-block;
					width: px2rem(37.5);
					/*position: absolute;
					bottom: px2rem(80);
					left: px2rem(15);*/
				}
				.bigpic {
					/*position: absolute;
					left: 50%;
					transform: translateX(-50%);*/
					display: inline-block;
					/*width: px2rem(267.5);*/
					width: 100%;
				}
				.rulesbox {
					/*position: absolute;
					top: px2rem(220);
					bottom: px2rem(20);*/
					color: rgb(154, 154, 154);
					font-size: px2rem(14);
					p {
						margin-top: 0;
					}
					.rulesbox-flag {
						margin-top: px2rem(15);
					}
				}
			}
			p {
				font-size: px2rem(14);
				color: rgb(105, 105, 105);
				margin-top: px2rem(20);
			}
		}
		.active-notice {
			background-color: white;
			margin-top: px2rem(7);
			padding: 0 px2rem(17);
			.active-tit {
				img {
					width: px2rem(80);
					margin-top: px2rem(15);
					margin-bottom: px2rem(15);
				}
			}
			p {
				font-size: px2rem(14);
				color: rgb(105, 105, 105);
				margin-top: px2rem(10);
			}
			.qricon {
				width: px2rem(104);
				margin-top: px2rem(20);
				margin-left: 50%;
				transform: translateX(-50%);
				display: block;
			}
			.txt-foot {
				font-size: px2rem(14);
				color: rgb(105, 105, 105);
				text-align: center;
			}
			.txt-foot2 {
				font-size: px2rem(14);
				color: rgb(233, 91, 90);
				text-align: center;
				margin-top: 0;
			}
		}
		.footer {
			padding: px2rem(20) px2rem(10);
		}
		.txt-foot3 {
			/*width: px2rem(320);*/
			font-size: px2rem(12);
			line-height: px2rem(14);
			border-radius: px2rem(100);
			/*background-color: rgb(216, 216, 216);*/
			padding: px2rem(5) 0;
			/*margin-left: 50%;*/
			/*transform: translateX(-50%);*/
		}
	}
</style>