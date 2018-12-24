<!--
  -- 合同签约
  -- @author bigfact
  -- @date 20170508
  -->
<template>
	<section class="auth-contract-sign">
		<!--分期贷-->
		<div class="list bg-white fs17" v-if="applytype == 'multiple'">
			<p class="row">
				<span>借款人姓名</span>
				<span class="fr">{{info.individual_name}}</span>
			</p>
			<p class="row">
				<span>借款人身份证</span>
				<span class="fr">{{info.individual_identity}}</span>
			</p>
			<p class="row">
				<span>申请时间</span>
				<span class="fr">{{info.apply_time}}</span>
			</p>
			<p class="row">
				<span>借款期限</span>
				<span class="fr">{{info.apply_period}}</span>
			</p>
			<p class="row">
				<span>借款金额（元）</span>
				<span class="fr">{{info.apply_amount}}</span>
			</p>
			<p class="row">
				<span>每期应还（元）</span>
				<span class="fr">{{info.apply_repay}}</span>
			</p>
		</div>
		<!--单期贷-->
		<div class="list bg-white fs17" v-else>
			<p class="row">
				<span>借款人姓名</span>
				<span class="fr">{{info.individual_name}}</span>
			</p>
			<p class="row">
				<span>借款人身份证</span>
				<span class="fr">{{info.individual_identity}}</span>
			</p>
			<p class="row">
				<span>申请时间</span>
				<span class="fr">{{info.apply_time}}</span>
			</p>
			<p class="row">
				<span>借款期限</span>
				<span class="fr">{{info.apply_period}}</span>
			</p>
			<p class="row">
				<span>借款金额（元）</span>
				<span class="fr">{{info.apply_amount}}</span>
			</p>
			<p class="row">
				<span>服务费用（元）</span>
				<span class="fr">{{info.apply_fee}}</span>
			</p>
			<p class="row">
				<span>优惠券减免（元）</span>
				<span class="fr">{{info.apply_coupon}}</span>
			</p>
			<p class="row">
				<span>到账金额（元）</span>
				<span class="fr">{{info.apply_grant}}</span>
			</p>
		</div>
		<!--提交按钮-->
		<div class="btn-wrap">
			<button class="btn fs20" v-submit="{cb: submit}">确认借款</button>
		</div>
		<!--合同-->
		<div class="tac c-gray">
			<p>请仔细阅读本借据信息，点击确认借款</p>
			<p>表示你同意遵守<a class="c-red" :href="info.contract_view_url">《合同及相关协议》</a></p>
		</div>
	</section>
</template>
<script>
	var $data = {
		// 申请类型，单期 single ，分期 multiple
		applytype: '',
		// 显示信息
		info: {
			individual_name: '', 				// 用户姓名,
			individual_identity: '', 		// 身份证号
			apply_time: '',							// 申请时间
			apply_period: '', 					// 借款期数
			apply_amount: '', 					// 借款金额
			apply_repay: '', 						// 每期应还
			apply_fee: '', 							// 服务费用
			apply_coupon: '', 					// 优惠劵减免
			apply_grant: '', 						// 到账金额
			contract_view_url: '', 			// 合同查看链接
			product_type: '', 					//借款类型
		},
		from: '',				// 路由查询参数，标记页面来源，来源有 app 首页、进度查询、合同列表，来源为 app 首页时此字段为空，其他则为页面路由
	}
	export default {
		data() {
			// 申请类型，单期 single ，分期 multiple
			$data.applytype = sysinfo.getQueryString('applytype') || this.$route.query.applytype || 'single'
			// 来源
			$data.from = this.$route.query.from || ''
			/**
			 * 数据获取
			 * https://git.fond.io/b/paydayloan/wikis/v3/contract-index
			 */
			ajax.get('/v3/contract/index', {
				product_type: $data.applytype
			}).then(function (xhr, res) {
				if (res.code == 0) {
					$data.info.individual_name = res.data.individual_name || ''
					$data.info.individual_identity = res.data.individual_identity || ''
					$data.info.apply_time = res.data.apply_time || ''
					$data.info.apply_period = res.data.apply_period || ''
					$data.info.apply_amount = res.data.apply_amount || ''
					$data.info.apply_repay = res.data.apply_repay || ''
					$data.info.apply_fee = res.data.apply_fee || ''
					$data.info.apply_coupon = res.data.apply_coupon || ''
					$data.info.apply_grant = res.data.apply_grant || ''
					$data.info.contract_view_url = res.data.contract_view_url || ''
					$data.info.product_type = res.data.product_type || ''
				} else {
					layer.warning(res.message)
				}
			})
			return $data
		},
		methods: {
			submit() {
				if (!$data.info.product_type) return
				// loading
				var lid = layer.loading2(false)
				/**
				 * 合同签约
				 * https://git.fond.io/b/paydayloan/wikis/v3/contract-sign
				 */
				ajax.get('/v3/contract/sign', {
					product_type: $data.info.product_type
				}).then(function (xhr, res) {
					if (res.code == 0) {
						// 路由查询参数，标记页面来源，来源有 app 首页、进度查询、合同列表，来源为 app 首页时此字段为空，其他则为页面路由
						// 成功返回的逻辑为“哪儿来哪儿去”
						if ($data.from) history.back()
						else sysinfo.dsq.openView('index')
					} else {
						layer.warning(res.message)
					}
				}).complete(function () {
					layer.close(lid)
				})
			}
		}
	}

</script>
<style lang="scss">
	@import "../../sass/_globals.scss";
	.auth-contract-sign {
		padding: px2rem(8) 0 px2rem(30);
		box-sizing: border-box;
		.row {
			padding: px2rem(16);
		}
		.btn-wrap {
			padding-top: px2rem(60);
		}
	}
</style>