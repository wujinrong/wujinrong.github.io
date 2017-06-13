<!--
  -- 贷上钱 app banner 活动 - 拒就赔2
  -- @author fyl
  -- @date 20170509
  -->
<template>
	<section class="active-jujiupei2">
		<!-- banner -->
		<img src="../../../assets/active/jujiupei2/bgbanner.png">
		<!-- new time -->
		<!-- <div class="newtime">2017.6.3起</div> -->
		<!-- 活动规则 -->
		<div class="content-wrap">
			<img class="ruleicon" src="../../../assets/active/jujiupei2/ruleicon.png">
			<div class="content">
				<p class="tit">参与对象：</p>
				<p>活动期间，首次借款并审核未通过的用户</p>
				<p class="tit">活动奖励：</p>
				<p>随机现金红包，最高200元（可提现）</p>
				<p class="tit">活动说明：</p>
				<p>活动期间，首次借款的用户，资料属实且审核未通过，即可领取红包，每日按照审核未通过的前1W名用户限量发放</p>
				<p class="tit">领取步骤：</p>
				<p>（1）等待领取红包通知（被拒后24h内发出）</p>
				<p>（2）关注“贷上钱服务号”</p>
				<p>（3）在服务号首页输入栏中输入兑换码，根据提示操作即可领取红包</p>
			</div>
		</div>
		<!-- 温馨提醒 -->
		<div class="msg">
			<p class="tit">温馨提醒：</p>
			<p>1、如果各位小伙伴填写虚假资料导致审核失败，贷小妹是有权取消红包领取资格的哦～</p>
			<p>2、必须在收到红包领取通知后，才可以领取红包！</p>
			<p>3、红包领取有效期为收到通知后的24小时内。</p>
		</div>
		<!-- 微信公众号 -->
		<div class="qrcode">
			<p class="qrcode-content">
				关注“贷上钱服务号“，领取拒就陪红包！
			</p>
		</div>
		<img class="qricon" src="../../../../static/img/app/index/qrcode.png">
		<footer>
			<p>本活动最终解释权归贷上钱所有</p>
		</footer>
	</section>
</template>

<style lang="scss">
	@import '../../../sass/_globals';
	.active-jujiupei2 {
		width: 100%;
		background-color: rgb(255, 235, 70);
		position: relative;
		img {
			width: 100%;
		}
		.content-wrap {
			margin: px2rem(25) px2rem(28) 0;
			border: px2rem(7) solid white;
			border-radius: 10px;
			box-shadow: 0px 0px 15px rgb(83, 77, 53);
			position: relative;
			background-color: rgb(255, 238, 99);
			.ruleicon {
				width: px2rem(126);
				height: px2rem(37);
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: px2rem(-32);
			}
			.content {
				padding: px2rem(32) px2rem(18) px2rem(30) px2rem(18);
				text-align: center;
				font-size: px2rem(12);
				line-height: px2rem(18);
				color: rgb(184, 74, 0);
				.tit {
					font-size: px2rem(17);
					margin-top: px2rem(18);
					margin-bottom: px2rem(8);
				}
				.tit:nth-child(1) {
					margin-top: 0;
				}
			}
		}
		.msg {
			padding: px2rem(10) px2rem(25) px2rem(17) px2rem(25);
			text-align: center;
			color: rgb(184, 74, 0);
			font-size: px2rem(12);
			line-height: px2rem(20);
			.tit {
				font-size: px2rem(17);
				margin-bottom: px2rem(12);
			}
		}
		.qrcode {
			width: 100%;
			height: px2rem(82);
			background-color: rgb(239, 41, 76);
			margin-top: px2rem(89);
			text-align: center;
			overflow: hidden;
			p {
				margin-top: px2rem(53);
				margin-bottom: px2rem(17);
				font-weight: 200;
				color: white;
				font-size: px2rem(12);
			}
		}
		/*微信二维码*/
		.qricon {
			width: px2rem(124);
			position: absolute;
			bottom: px2rem(126);
			left: 50%;
			transform: translateX(-50%);
		}
		footer {
			width: 100%;
			height: px2rem(82);
			line-height: px2rem(82);
			text-align: center;
			color: rgb(204, 137, 0);
			font-size: px2rem(14);
		}
	}
</style>