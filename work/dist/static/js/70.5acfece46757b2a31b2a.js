webpackJsonp([70,98],{188:function(a,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e={isDelay:!1,delay_fee:0,apply_id:0,apply_time:"",apply_amount:"",period_desc:"",grant_time:"",credit_amount_desc:"",repay_time:"",finish_time:"",fee_amount:"",coupon_amount:"",grant_amount:"",status:11,repay_amount_desc:"",overdue_flag:!1,type:"",status_list:[{class:"c-yellow",text:"未提交"},{class:"c-green",text:"审核中"},{class:"c-red",text:"审核拒绝"},{class:"c-yellow",text:"待签约"},{class:"c-yellow",text:"待还款"},{class:"c-gray",text:"已还清"},{class:"c-green",text:"放款中"},{class:"c-red",text:"已逾期"},{class:"c-yellow",text:"还款中"},{class:"c-red",text:"放款失败"},{class:"c-light",text:"已取消"},{class:"c-green",text:"确认申请"}],rapayTipShow:!1};s.default={data:function(){return e.apply_id=this.$route.query.id,e.type=this.$route.query.type,ajax.get("/v3/record/apply-detail",{apply_id:e.apply_id}).then(function(a,s){0==s.code?(e.apply_time=s.data.apply_time,e.apply_amount=s.data.apply_amount||"",e.period_desc=s.data.period_desc||"",e.grant_time=s.data.grant_time,e.credit_amount_desc=s.data.credit_amount_desc,e.repay_time=s.data.repay_time,e.finish_time=s.data.finish_time,e.fee_amount=s.data.fee_amount,e.coupon_amount=s.data.coupon_amount,e.grant_amount=s.data.grant_amount,e.status=s.data.status,e.repay_amount_desc=s.data.repay_amount_desc,e.overdue_flag=s.data.overdue_flag,e.isDelay="delay"===s.data.contract_type,e.delay_fee=s.data.delay_fee):layer.warning(s.message)}),e},methods:{cancel:function(){var a=layer.message("<br>确定要取消该笔申请吗？",{title:"",yes:function(){layer.close(a);var s=layer.loading(!1);ajax.post("/v3/record/apply-cancel",{apply_id:e.apply_id}).then(function(a,s){0==s.code?history.back():layer.warning(s.message)}).complete(function(){layer.close(s)})}})},toggleRapayTip:function(a){e.overdue_flag&&(e.rapayTipShow=a)}}}},317:function(a,s,e){s=a.exports=e(1)(),s.push([a.id,".my-record-detail{box-sizing:border-box;min-height:100%;margin-top:.75rem;padding-bottom:6rem}.my-record-detail .field{line-height:2.4rem;padding:1.75rem 1.6rem}.my-record-detail .repay-amount{background:url("+e(602)+") no-repeat 100%;background-size:1.5rem;display:inline-block;padding-right:2rem}.my-record-detail .repay-tip-content{border-radius:6px;box-sizing:border-box;margin:0 auto;padding:5.1rem 4rem 3.1rem;width:80%}.my-record-detail .repay-tip{padding-bottom:4rem}.my-record-detail .repay-tip-btn{width:80%}",""])},421:function(a,s,e){var t=e(317);"string"==typeof t&&(t=[[a.id,t,""]]);e(2)(t,{});t.locals&&(a.exports=t.locals)},602:function(a,s){a.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABNlJREFUSA2Vl11oXFUQx7MfyfrxkEQo4lppqUGp8SkVBBUh+LASk+wmouCDPmhbLLGtqKX1QavFUmwCDUuUYqpWfBGRZPOlbIWm+BCFphS0yUMWxQ1hTbSSIJgmG7Px97+9Jz1J997dHjg7M2f+M3NmztfdQEUZbW1tLTQwMPAYNAG8gR6FjwYCgTX4HHwuGAyOw6fi8fhPjBfgfVvATzs2Nnb77OzsQTBv0Lf4YY2OoHPwnZFIpKepqWnZjG+mnoH7+vqeA3yKfq+MlB1tHJqGTodCodzq6ipiQNlvA/I0XdUwLQtzsL29fcAM2PSmwDgJUtbjhULhiAu8Bk0SKEkZc7bxZj6VSt2H/euMd0Ajmiz8+4lE4pjLr5tsCKyg/f39X6FVtsryO0q2l5LNrFuUwYyMjGzL5/Of4u8p18+XbW1tL9mmGwIz4xNWpl2ADxO85EaxHRp+dHQ0vLCwcIrgr7ljRyn7MaNfD+yu6deuogvQIQPyo6rS8PDwXS0tLVeL4fDbw3iHSk2PU/Yh4YL60e6FaCM55VWm4ks19sIjLM3MysrKX9BviuFra2u15ueZYIBqdk9MTFQJ5wR2j4x27zWtabnlxZFKd48c4fhZgteIt1tjY+N/VVVVexjL03dkMplXpQ9iEILqnKolb3Ej/XndzKnUJSq1YGSbNjc3/4Z8WmNM9pCyD+tGQt6iNeD2SUpZbqM6B5aWln7GTlmd9bPDf5KAB8BsHRwc3KWMEzKAjpc6p8ax9gRlfX55efkIDgPV1dWfUKl/jL4YpRq/Mn5FOsUMQ3dJwD4tWqpRoSfn5uY+w/h+g52fn78N/riRvSgxzmH3ML1Bm8tsjmkvAzPO0YizRidw8K4ZE0VWAiUbuKxABI6q1FEJuntFvZp7DD5gPXWrPWTj8HHBlr14Jv2Hq4sGmYXu0wpd+F4GGp+ZmakMh8Mv19XVXSXQboPF/nfW7wcj+1GwJsaaSqRMH2TMydzLMBaL/YvuIpvqBQLfbXDwn2PrTN6M+VBnWcHntMZO+jjQ01aygeuwQIXKysqzllyK3e4Ccir1RVfQe+rbeEQeBfC4AWH7PXf0NJNRAuW0mEDYjSuweagb9J76WbM53rT12J5Jp9N3Ypcudl3aWE7EA0xwp8awSwVbW1t/hNHnira5LvSiTVmBe8ZWIv+yuLg4zFiv13Vp8GCN7ywX1WU503vb6QI69IgbsE0nJyfDBK+0xzgJF7DvJKh5Tm31Oq9sEfRQKNsPRZ210YcZfBbHEX056BGX0m719fV5jLroelf/pnfTd/K+fmvjNvM6/+D0NSKfmZqaml5hzLmq0K0EoB8AJNBDFvs3O5E8NDR0BxtqsZiu2Bhrfwafr6ArcPk0MVHnal4PLCNA7wE66jr4SI+43lNXviWiTKempj52g6rEh0nmpHGyIbCyZYd+AX3RBZzXI+6+p8amJNWaEkjlfUJgMu0l07224YbAUig4mb+DobKXXl8Op5GTzFhPm2dzA2r37sFWa1rA7m07U2N8U2CjIPMWzm038g4zBr2Co3P0LHwOPaxz1W5HjhHMOafwahky3W/W9PrQjV/PwIK467QPh28hbr1h5stlCXhSHwd++8M3sHGvkutzBZqgN9D1oKjrCOiRyUH190Z/2i4bOz/6P4K9Nu3jyQXUAAAAAElFTkSuQmCC"},660:function(a,s){a.exports=' <section class=my-record-detail> <div class="bg-white fs15" v-if="type == \'single\'"> <div class="row field"><span class=fs18>状态</span><span class=fr :class=status_list[status].class>{{ status_list[status].text }}</span></div> <div class="row field"><span class=fs18>申请时间</span><span class=fr>{{ apply_time }}</span></div> <div class="row field"><span class=fs18>借款金额</span><span class=fr>{{ apply_amount }}元</span></div> <div class="row field"><span class=fs18>借款天数</span><span class=fr>{{ period_desc }}</span></div> <div class="row field"><span class=fs18>服务费用</span><span class=fr>{{ fee_amount }}元</span></div> <div class="row field" v-if=isDelay><span class=fs18>延期服务费用</span><span class=fr>{{ delay_fee }}</span></div> <div class="row field"><span class=fs18>优惠券减免</span><span class=fr>{{ coupon_amount }}元</span></div> <div v-if=!isDelay> <div class="row field"><span class=fs18>放款日期</span><span class=fr>{{ grant_time }}</span></div> <div class="row field"><span class=fs18>到账金额</span><span class=fr>{{ grant_amount }}元</span></div> </div> <div class="row field"><span class=fs18>合约还款日</span><span class=fr>{{ repay_time }}</span></div> <div class="row field"><span class=fs18>实际还款日</span><span class=fr>{{ finish_time }}</span></div> <div class="row field"><span class=fs18>应还金额</span><span class=fr :class="overdue_flag && \'repay-amount\'" @click=toggleRapayTip(true)>{{ repay_amount_desc }}</span></div> </div> <div class="bg-white fs15" v-if="type == \'multiple\'"> <div class="row field"><span class=fs18>状态</span><span class=fr :class=status_list[status].class>{{ status_list[status].text }}</span></div> <div class="row field"><span class=fs18>申请时间</span><span class=fr>{{ apply_time }}</span></div> <div class="row field"><span class=fs18>申请金额</span><span class=fr>{{ apply_amount }}元</span></div> <div class="row field"><span class=fs18>放款日期</span><span class=fr>{{ grant_time }}</span></div> <div class="row field"><span class=fs18>批核金额</span><span class=fr>{{ credit_amount_desc }}</span></div> <div class="row field"><span class=fs18>借款期数</span><span class=fr>{{ period_desc }}</span></div> <div class="row field"><span class=fs18>结清日期</span><span class=fr>{{ finish_time }}</span></div> </div> <button class="btn bottom" v-if="!isDelay && status == 0 || status == 1 || status == 3" @click=cancel()>取消借款</button> <div class="layermbox layermbox0" v-show=rapayTipShow> <div class=laymshade @click=toggleRapayTip(false)></div> <div class=layermmain> <div class=section> <div class="repay-tip-content bg-white"> <div class=repay-tip>应还金额包含申请金额+逾期费用</div> <button class="btn repay-tip-btn" @click=toggleRapayTip(false)>我知道了</button> </div> </div> </div> </div> </section> '},763:function(a,s,e){var t,i,l={};e(421),t=e(188),i=e(660),a.exports=t||{},a.exports.__esModule&&(a.exports=a.exports.default);var p="function"==typeof a.exports?a.exports.options||(a.exports.options={}):a.exports;i&&(p.template=i),p.computed||(p.computed={}),Object.keys(l).forEach(function(a){var s=l[a];p.computed[a]=function(){return s}})}});