webpackJsonp([78,98],{219:function(a,p){"use strict";Object.defineProperty(p,"__esModule",{value:!0});var n={applytype:"",info:{individual_name:"",individual_identity:"",apply_time:"",apply_period:"",apply_amount:"",apply_repay:"",apply_fee:"",apply_coupon:"",apply_grant:"",contract_view_url:"",product_type:""},from:""};p.default={data:function(){return n.applytype=sysinfo.getQueryString("applytype")||this.$route.query.applytype||"single",n.from=this.$route.query.from||"",ajax.get("/v3/contract/index",{product_type:n.applytype}).then(function(a,p){0==p.code?(n.info.individual_name=p.data.individual_name||"",n.info.individual_identity=p.data.individual_identity||"",n.info.apply_time=p.data.apply_time||"",n.info.apply_period=p.data.apply_period||"",n.info.apply_amount=p.data.apply_amount||"",n.info.apply_repay=p.data.apply_repay||"",n.info.apply_fee=p.data.apply_fee||"",n.info.apply_coupon=p.data.apply_coupon||"",n.info.apply_grant=p.data.apply_grant||"",n.info.contract_view_url=p.data.contract_view_url||"",n.info.product_type=p.data.product_type||""):layer.warning(p.message)}),n},methods:{submit:function(){if(n.info.product_type){var a=layer.loading2(!1);ajax.get("/v3/contract/sign",{product_type:n.info.product_type}).then(function(a,p){0==p.code?n.from?history.back():sysinfo.dsq.openView("index"):layer.warning(p.message)}).complete(function(){layer.close(a)})}}}}},352:function(a,p,n){p=a.exports=n(1)(),p.push([a.id,".auth-contract-sign{padding:.8rem 0 3rem;box-sizing:border-box}.auth-contract-sign .row{padding:1.6rem}.auth-contract-sign .btn-wrap{padding-top:6rem}",""])},456:function(a,p,n){var s=n(352);"string"==typeof s&&(s=[[a.id,s,""]]);n(2)(s,{});s.locals&&(a.exports=s.locals)},695:function(a,p){a.exports=' <section class=auth-contract-sign> <div class="list bg-white fs17" v-if="applytype == \'multiple\'"> <p class=row> <span>借款人姓名</span> <span class=fr>{{info.individual_name}}</span> </p> <p class=row> <span>借款人身份证</span> <span class=fr>{{info.individual_identity}}</span> </p> <p class=row> <span>申请时间</span> <span class=fr>{{info.apply_time}}</span> </p> <p class=row> <span>借款期限</span> <span class=fr>{{info.apply_period}}</span> </p> <p class=row> <span>借款金额（元）</span> <span class=fr>{{info.apply_amount}}</span> </p> <p class=row> <span>每期应还（元）</span> <span class=fr>{{info.apply_repay}}</span> </p> </div> <div class="list bg-white fs17" v-else> <p class=row> <span>借款人姓名</span> <span class=fr>{{info.individual_name}}</span> </p> <p class=row> <span>借款人身份证</span> <span class=fr>{{info.individual_identity}}</span> </p> <p class=row> <span>申请时间</span> <span class=fr>{{info.apply_time}}</span> </p> <p class=row> <span>借款期限</span> <span class=fr>{{info.apply_period}}</span> </p> <p class=row> <span>借款金额（元）</span> <span class=fr>{{info.apply_amount}}</span> </p> <p class=row> <span>服务费用（元）</span> <span class=fr>{{info.apply_fee}}</span> </p> <p class=row> <span>优惠券减免（元）</span> <span class=fr>{{info.apply_coupon}}</span> </p> <p class=row> <span>到账金额（元）</span> <span class=fr>{{info.apply_grant}}</span> </p> </div> <div class=btn-wrap> <button class="btn fs20" v-submit="{cb: submit}">确认借款</button> </div> <div class="tac c-gray"> <p>请仔细阅读本借据信息，点击确认借款</p> <p>表示你同意遵守<a class=c-red :href=info.contract_view_url>《合同及相关协议》</a></p> </div> </section> '},798:function(a,p,n){var s,t,i={};n(456),s=n(219),t=n(695),a.exports=s||{},a.exports.__esModule&&(a.exports=a.exports.default);var o="function"==typeof a.exports?a.exports.options||(a.exports.options={}):a.exports;t&&(o.template=t),o.computed||(o.computed={}),Object.keys(i).forEach(function(a){var p=i[a];o.computed[a]=function(){return p}})}});