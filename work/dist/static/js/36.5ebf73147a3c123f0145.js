webpackJsonp([36,98],{18:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){var e=this;return e.$watch("value",function(t){if(t){for(var o=0;o<e.datas.length;o++)if(t==e.datas[o].value){e.key=e.datas[o].key,e.index=o,e.choose(e.datas[o].key,e.datas[o].value,o);break}var a=document.querySelectorAll(".sheet .active");try{for(var n=0;n<a.length;n++){var i=a[n].parentNode,r=i.clientHeight/2;a[n].offsetTop>r&&(i.scrollTop=a[n].offsetTop-r)}}catch(e){}}}),{isTouched:!1,bodyScrollTop:0,key:"",index:""}},props:["datas","value","id"],methods:{touchstart:function(){var e=this;e.bodyScrollTop||(e.bodyScrollTop=document.body.scrollTop),e.isTouched=!0},choose:function(e,t,o){e="undefined"==typeof e?"":e,t="undefined"==typeof t?"":t,o="undefined"==typeof o?"":o;var a=this;a.$emit("selected",{key:e,value:t,index:o,id:a.id}),a.isTouched&&(document.body.scrollTop=a.bodyScrollTop,a.bodyScrollTop=0,a.isTouched=!1)}}}},19:function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".sheet-wrap{position:relative}.sheet-wrap .mask{top:0;height:2000px;background:rgba(0,0,0,.6)}.sheet-wrap .mask,.sheet-wrap .sheet{position:fixed;left:0;width:100%;z-index:999}.sheet-wrap .sheet{background:#fff;text-align:center;bottom:0;right:0;margin:0 auto;max-width:768px;max-height:40%;overflow-y:scroll}",""])},20:function(e,t,o){var a=o(19);"string"==typeof a&&(a=[[e.id,a,""]]);o(2)(a,{});a.locals&&(e.exports=a.locals)},21:function(e,t){e.exports=' <div :id=id class=sheet-wrap @touchstart=touchstart()> <div class=mask @click="choose(key, value, index)" @touchstart=touchstart()></div> <div class=sheet> <p class=row v-for="($index, i) in datas" @click="choose(i.key, i.value, $index)" :class="i.value === value && \'c-main\'">{{ i.key }}</p> </div> </div> '},22:function(e,t,o){var a,n,i={};o(20),a=o(18),n=o(21),e.exports=a||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(i).forEach(function(e){var t=i[e];r.computed[e]=function(){return t}})},104:function(e,t){e.exports=[{value:0,key:"配偶"},{value:1,key:"父母"},{value:2,key:"兄弟姐妹"},{value:3,key:"子女"},{value:4,key:"同事"},{value:5,key:"同学"},{value:6,key:"朋友"}]},224:function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(22),i=a(n),r=o(104),c=a(r),s={applytype:sysinfo.getQueryString("applytype")||"single",modify:!1,contacts:[{id:"",name:{model:"",maxlength:18,reg:regexp.name,err:"请输入正确姓名"},relation:{key:"",value:"",showSelect:!1,datas:[c.default[0],c.default[1],c.default[3]],reg:regexp.empty,err:"请选择关系"},tel:{model:"",reg:regexp.empty,err:"请输入联系人电话"}},{id:"",name:{model:"",maxlength:18,reg:regexp.name,err:"请输入正确姓名"},relation:{key:"",value:"",showSelect:!1,datas:c.default,reg:regexp.empty,err:"请选择关系"},tel:{model:"",reg:regexp.empty,err:"请输入联系人电话"}}],cbName:"getContactCb"+Date.now()};t.default={data:function(){return ajax.get("/v3/individual/get-user-info",{product_type:s.applytype}).then(function(e,t){if(0==t.code){if(t.data){var o=t.data.contact_list;if(o instanceof Array)for(var a=0;a<o.length;a++)s.contacts[a].id=o[a].individual_contact_id,s.contacts[a].name.model=o[a].individual_contact_name,s.contacts[a].tel.model=o[a].individual_contact_phone,s.contacts[a].relation.value=o[a].individual_contact_type}}else layer.warning(t.message)}),s},methods:{showSelect:function(e){e.showSelect=!0},relationSelected:function(e){var t=e.id.replace("contacts-select-","");s.contacts[t].relation.showSelect=!1,"undefined"!=typeof e.key&&(s.contacts[t].relation.key=e.key,s.contacts[t].relation.value=e.value)},showContacts:function(e){"function"!=typeof window[s.cbName]&&(window[s.cbName]=function(e,t,o){try{console.log(e,t,o),e=parseInt(e),s.contacts[e].name.model=t,s.contacts[e].tel.model=o}catch(e){console.log(e)}}),sysinfo.dsq.getContact(s.cbName,e)},validate:function(e,t,o){return!!t(e)||(layer.tip(o),!1)},submit:function(){for(var e=this,t=[],o=0;o<s.contacts.length;o++){if(!e.validate(s.contacts[o].relation.value,s.contacts[o].relation.reg,s.contacts[o].relation.err))return;if(!e.validate(s.contacts[o].name.model,s.contacts[o].name.reg,s.contacts[o].name.err))return;if(!e.validate(s.contacts[o].tel.model,s.contacts[o].tel.reg,s.contacts[o].tel.err))return;t.push({individual_contact_id:s.contacts[o].id,individual_contact_name:s.contacts[o].name.model,individual_contact_phone:s.contacts[o].tel.model,individual_contact_type:s.contacts[o].relation.value})}var a=(e.$router,layer.loading2(!1,"保存中..."));ajax.post("/v3/contact/save-contacts",{contacts:t}).then(function(e,t){0==t.code?history.back():layer.warning(t.message)}).complete(function(){layer.close(a)})}},components:{DSelect:i.default}}},357:function(e,t,o){t=e.exports=o(1)(),t.push([e.id,".authsingle-relation{min-height:100%;box-sizing:border-box;padding-bottom:6rem}.authsingle-relation .title{padding:1.5rem}.authsingle-relation .form{margin-top:1rem}.authsingle-relation .form .row{padding:1.8rem 1.6rem}.authsingle-relation .form .row.select{padding:1.8rem 3.5rem 1.8rem 1.6rem;background-position-x:97%}.authsingle-relation .form .line{padding:0;height:1px}.authsingle-relation .form-value{float:right;font-size:1.5rem;margin-top:.3rem;text-align:right}.authsingle-relation .err{color:#ff6262;text-align:right;padding:1rem 0}.authsingle-relation .contact-input{float:right;width:14rem;margin:.4rem 9.5rem 0 0;text-align:right}.authsingle-relation .get-contact-btn{background:#fff;border:1px solid #383838;border-radius:5rem;font-size:1.4rem;height:3rem;line-height:3rem;margin:auto 0;padding:0 1rem;position:absolute;top:0;bottom:0;right:1.3rem}",""])},461:function(e,t,o){var a=o(357);"string"==typeof a&&(a=[[e.id,a,""]]);o(2)(a,{});a.locals&&(e.exports=a.locals)},700:function(e,t){e.exports=' <section class="authsingle-relation fs18"> <div class="title fs14 c-placeholder">请填写两个联系人的信息，非紧急情况，我们不会打扰您的联系人。</div> <div class="form bg-white" v-for="($index, i) in contacts"> <div class="row select" @click=showSelect(i.relation)> <span>关系</span> <span class=form-value>{{ i.relation.key }}</span> </div> <d-select :datas=i.relation.datas :value=i.relation.value :id="\'contacts-select-\' + $index" @selected=relationSelected v-show=i.relation.showSelect></d-select> <div class=row> <span>姓名</span> <input type=text class=contact-input v-model=i.name.model placeholder=请输入该联系人姓名> <button class=get-contact-btn v-submit="{cb: showContacts, data: $index}">选择联系人</button> </div> <div class=row> <span>电话</span> <input type=text class=form-value v-model=i.tel.model placeholder=请输入联系人电话> </div> </div> <button class="btn bottom fs20" v-submit="{cb: submit}">保存</button> </section> '},803:function(e,t,o){var a,n,i={};o(461),a=o(224),n=o(700),e.exports=a||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;n&&(r.template=n),r.computed||(r.computed={}),Object.keys(i).forEach(function(e){var t=i[e];r.computed[e]=function(){return t}})}});