webpackJsonp([17,98],{3:function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),o.default={data:function(){var e={show:!((sysinfo.dsq.isapp()||sysinfo.qsq.isapp())&&sysinfo.isIOS),code:"",name:""},o={"qianshengqian.com":{code:"粤ICP备14066056号",name:"深圳市钱生钱互联网金融服务有限公司"},"tengqiaotech.com":{code:"沪ICP备17017930号-1",name:"上海腾桥信息技术有限公司"},"chuanyuetech.com":{code:"沪ICP备17018722号-1",name:"上海氚悦信息科技有限公司"},"daishangqian.com":{code:"沪ICP备16041593号",name:"墨讯信息科技（上海）有限公司"}},p=location.origin,t="daishangqian.com";if(p.indexOf(t)>=0){var i=["信息流"];ajax.get("/v3/util/get-channel",{channel:sysinfo.getQueryString("channel")}).then(function(p,a){0==a.code&&i.indexOf(a.data.parent_title)>=0&&(e.code=o[t].code,e.name=o[t].name)})}else for(var a in o)if(p.indexOf(a)>=0){e.code=o[a].code,e.name=o[a].name;break}return e}}},4:function(e,o,p){o=e.exports=p(1)(),o.push([e.id,".d-icp{padding:4rem 0 2rem;line-height:2rem;position:absolute;bottom:0;width:100%}@media (max-height:450px){.d-icp{position:relative}}@media (orientation:landscape){.d-icp{position:relative}}",""])},5:function(e,o,p){var t=p(4);"string"==typeof t&&(t=[[e.id,t,""]]);p(2)(t,{});t.locals&&(e.exports=t.locals)},6:function(e,o){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcBAMAAABv4amZAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAVUExURUxpcb6+vry8vL6+vsLCwsLCwr29vRVsyJEAAAAGdFJOUwCd34AuFb7ou7gAAAB/SURBVBjTfZAxDoAgDEWLxt2J2cSEc7Do7OSOJr3/EaRCof5BFtq+T/ktjSu1I/HAc8v9lWucNHV8S7EJSuRUoIEK9K71pqug93lJxwV54yMzi0UQDBbBBxMFXuiHw3vsD/+jP/CP88H8uB/Yn7P7zeFu98+RzmR9HjRFM8dGD04XIkkvW/edAAAAAElFTkSuQmCC"},7:function(e,o){e.exports=' <div class="d-icp tac fs12" v-if=show> <p>{{ code }}</p> <p>{{ name }}</p> <p class=fs10>贷款有风险 选择需谨慎</p> </div> '},8:function(e,o,p){var t,i,a={};p(5),t=p(3),i=p(7),e.exports=t||{},e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(a).forEach(function(e){var o=a[e];s.computed[e]=function(){return o}})},9:function(e,o){e.exports="data:image/png;base64,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"},10:function(e,o){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var p={popFlag:!1};o.default={data:function(){return p},methods:{sure:function(){var e=this;e.$emit("close-pop",{popFlag:p.popFlag}),p.popFlag=!1}}}},11:function(e,o,p){o=e.exports=p(1)(),o.push([e.id,".d-protocol .layermcont{padding:1rem 0;height:32rem;overflow-y:auto;text-align:left}.d-protocol .service-protocol{padding:0 2rem;line-height:2.4rem}.d-protocol .service-protocol .title{padding:2rem 0 1rem}.d-protocol .service-protocol p{padding:.3rem 0}",""])},12:function(e,o,p){var t=p(11);"string"==typeof t&&(t=[[e.id,t,""]]);p(2)(t,{});t.locals&&(e.exports=t.locals)},13:function(e,o){e.exports=' <div class="d-protocol layermbox" v-show=popFlag index=3> <div class=laymshade></div> <div class=layermmain> <div class=section> <div class="layermchild layermanim"> <div class=layermcont> <section class="service-protocol container"> <h2 class="title fs20 tac">贷上钱服务协议</h2> <p>贷上钱平台由上海腾桥信息技术有限公司负责运营。《贷上钱服务协议》（以下简称“本协议”）是贷上钱会员（以下简称“用户”、“会员”或“您”）与上海腾桥信息技术有限公司（以下简称“贷上钱”）之间签订的协议，具有合同效力。 <ins><strong>您确认，在申请本协议项下服务时，已详细阅读本协议的所有内容，您充分理解并同意接受本协议的全部内容，包括但不限于关于电子签名认证证书的授权、转委托以及征信信息的查询等事项。贷上钱在此特别提醒：请您认真阅读和充分理解本协议各条款，特别是其中所涉及的免除或限制贷上钱责任的条款、对用户权利限制的条款以及本协议为用户在贷上钱平台从事各项活动的交易规则的条款等。若您不接受或不理解本协议任何一条款的，请您立即停止注册操作或立即停止使用任何贷上钱服务，否则由此产生的一切行为及其产生的后果由您自行承担，贷上钱及其关联公司对此不承担任何法律责任。</strong></ins> 您一经注册或使用贷上钱服务即视为对本协议全部条款已充分理解并完全接受。 </p> <h3>第一章 贷上钱服务</h3> <p>第一条 贷上钱服务是由贷上钱通过贷上钱平台向用户提供的网络借贷的信息中介服务，不直接向用户发放贷款、融资等业务。贷上钱在此郑重声明，用户从贷上钱平台上申请的借款，均来自第三方提供。</p> <p>第二条 为了保障您的权益，您在自愿注册使用贷上钱服务前，必须仔细阅读并充分理解知悉本服务协议所有条款。 <ins><strong>一经注册或使用贷上钱服务即视为您对本服务协议的充分理解和接受，如有违反，您将独立对此承担相应的法律责任。</strong></ins> </p> <p>第三条 在本协议履行过程中，贷上钱有权根据情况对本协议进行修改或修订。本协议的内容若发生修改或修订等变动，贷上钱将以在贷上钱平台公布的方式进行告知，而不再向用户作个别通知。同时，<strong>您应随时注意本协议及相关规则的变动；当发生有关争议时，以最新的协议级规则文本为准。</strong>如果您不同意贷上钱对本协议所做的修改或修订等变动，则您应立即停止使用贷上钱服务；在此之前发生的服务应遵守变动前的本协议约定内容。如果用户继续使用贷上钱服务，则视为用户接受贷上钱对本服务协议所做的修改或修订等变动，并应遵照变动后的协议内容执行。</p> <p>第四条 贷上钱对于用户的通知及任何其他的协议、告示或其他关于用户使用会员账户及服务的通知，用户同意贷上钱可通过贷上钱平台电子公告、电子邮件、手机短信、无线通讯装置等电子方式或常规的信件传递等方式进行，该等通知于发送之日视为已送达收件人。因信息传输等原因导致用户未收到该等通知的，贷上钱不承担责任。</p> <p>第五条 贷上钱可以依其判断终止或暂时停止提供、限制或改变贷上钱服务内容，若用户仍然继续使用贷上钱服务的，即视为用户对前述行为予以认可、同意和遵守。</p> <p>第六条 出借人同意向贷上钱支付平台服务费，具体金额及扣除方式以借款人签订的借款合同中约定为准。借款人认可平台服务费在贷上钱平台进行公示的方式和公示所展示内容的真实性和准确性。</p> <h3>第二章 用户</h3> <p>第七条 贷上钱会员（用户）是指符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力，能够独立承担民事责任的自然人。在使用贷上钱服务前，用户必须先在贷上钱平台上完成注册。您在注册时所设置的账户名称和密码将作为贷上钱识别用户身份的唯一有效标识及合法有效的电子签名。</p> <p>第八条 用户承诺以下事项：</p> <p>8.1用户必须依贷上钱要求提供用户真实、准确、最新、有效及完整的信息材料，包括但不限于姓名、身份证号、身份证照、经常居住所地、联系电话、邮箱、工作单位的名称、地址等信息材料。同时，用户有义务维持和立即更新前述信息材料，以保证这些信息材料的真实、准确、有效和完整。如有变更，应及时通知贷上钱并按照贷上钱要求办理变更手续。</p> <p>8.2若用户提供或维持任何错误、虚假、过时或不完整的资料，或者贷上钱依其独立判断怀疑资料为错误、虚假、过时或不完整，贷上钱有权暂停或终止用户的会员账户，并拒绝用户使用贷上钱服务的部分或全部功能。在此情况下，贷上钱不承担任何责任，并且用户同意负担由此所产生的全部直接或间接支出或损失。</p> <p>8.3如因用户未提供或及时更新信息材料而导致贷上钱服务无法提供或提供时发生任何错误的，用户不得将此作为取消交易或拒绝付款的理由，贷上钱亦不承担任何责任，所有后果应由用户独立承担。</p> <p>8.4用户确认，只有您本人可以使用您的贷上钱账户，该账户不可转让、不可赠与、不可继承。</p> <p>8.5用户在此同意并授权：本公司可以通过电信运营商、银行、或其他可以提供用户身份校验服务或提供可用于身份校验信息的主体，按照该第三方的规则对您的身份加以校验；或是以本公司认为适当的方式中的一种或多种来对您进行身份校验。</p> <p>第九条 委托及授权</p> <p>9.1用户在此不可撤销地授权贷上钱或贷上钱指定的第三方机构有权依据法律规定和本协议的约定,由贷上钱或贷上钱指定的第三方通过第三方支付机构或银行对各方账户内的资金进行扣划划转结算、处理权益转让（本协议中所指“权益”，包括但不限于债权等财产性权利）中资金划转结算、权益转让通知以及签署与交易相关的协议或合同等相关事宜。具体情形包括但不限于：</p> <p>9.1.1用户委托贷上钱进行借款匹配和权益转让匹配与确认。借款融资和权益转让时，出借人与借款人、权益出让人与权益受让人由贷上钱在其或其授权第三方的注册用户内进行匹配，并以贷上钱确认为准。</p> <p>9.1.2权益转让交易时，债权人/权利人可自行将借款合同、债权转让合同等合同项下的全部或部分权益转让给贷上钱认可的第三方的其他注册用户；该权益转让无需再另行通知债务人，且债务人不得以任何理由和形式对此提出异议或抗辩。</p> <p>9.1.3上述权益转让应以贷上钱认可的第三方对该权益转让的确认为生效要件，不管权益转让人是否已收到全部权益转让款。</p> <p>9.1.4借款融资和权益转让交易过程中，出借人向借款人交付借款和权益受让人向权益出让人支付对价时，权利人委托贷上钱或贷上钱授权的公司将出借人或权益受让人账户内相应资金划转至借款人或权益出让人的相应账户，由此产生的风险和法律责任由借款人/债权转让人来承担。</p> <p>9.1.5借款期限届满时，用户委托贷上钱或贷上钱指定的第三方将债务人账户内相应资金(包含本金及收益)依据协议约定划转债权人/权利人账户，债权出让人/债务人无条件的同意由贷上钱或贷上钱指定的第三方进行此操作，并以贷上钱确认为准。</p> <p>9.2用户授权贷上钱对用户的资信状况、财务状况和其他与评定用户信用付款额度及付款能力有关的信息进行采集、储存、整理、加工。以上信息包括但不限于：用户征信报告、学历信息、电商信息、银联流水信息等。用户知晓并同意，在不透露单个用户的具体信息内容的前提下，贷上钱有权对整个用户数据库进行分析，并对用户数据库进行商业上的利用。</p> <p>9.3用户同意拥有用户本人不良信息的机构，通过合法设立的征信公司向贷上钱提供本人的不良信息。用户已被事先明确告知并已同意拥有本人不良信息的机构提供本人的不良信息。</p> <p>9.4用户同意贷上钱委托合法设立的征信公司，采集本人收入、存款、有价证券、商业保险、不动产的信息和纳税数额信息。用户已被明确告知提供上述信息可能会给本人带来财产或信用损失，以及其他可能的不利后果，但本人仍然同意贷上钱委托合法设立的征信公司采集这些信息。</p> <p>9.5贷上钱及其合法被授权方有权使用用户通过贷上钱提供的信息以及通过本条约定自行收集的用户资料和信息用于以下用途（包括但不限于）：</p> <p>（1）为用户提供服务的整个过程中；</p> <p>（2）根据需要向其他为用户申请提供服务的第三方等披露与用户相关的任何信息；</p> <p>（3）追偿用户违约欠款、解决争议及对有关纠纷进行调停等其他合法用途。</p> <p>9.6用户同意并授权：为了使您获得更为便捷的服务，您不可撤销的授权贷上钱可以以您的名义代您注册、使用电子签名认证证书，并且贷上钱对于该项权利的使用可以进行转授权或转委托，所开立电子签名的使用范围仅限于用户所对应借款业务的办理。</p> <p>9.7用户承诺，贷上钱及其合法被授权方根据本协议所采取的全部行动和措施的法律后果均归属于用户本人承担。</p> <p>9.8用户同意并授权，贷上钱在满足用户的资金需求的过程中，可能会给用户匹配正规的金融机构提供资金。此类正规金融机构有权按照国家相关规定，将用户个人的信用信息报送给央行个人信用信息基础数据库和经央行批准设立的征信机构。</p> <p>9.9用户同意并授权，在您注册或使用贷上钱时，本公司及其关联公司、合作金融机构、技术服务合作方可依据《征信业管理条例》及相关法律法规，向央行/征信机构/金融机构合法了解、获取、核实您的信用信息。所获取的个人信用信息仅在贷上钱业务中使用，用以判断本公司及其关联公司、合作金融机构、技术服务合作方的业务风险。本公司及其关联公司、合作金融机构、技术服务合作方查询上述各类信息将用作本公司及其关联公司、合作金融机构、技术服务合作方开展评估授信及贷后管理、不良资产清收等经营活动的参考。</p> <p>9.10您同意并授权，为降低我司的贷后风险，您将授权我司通过获取您的通讯录信息进行贷后催收工作。</p> <p>9.11其他用户委托或授权事项。</p> <p>9.12用户授权贷上钱可将其授权事项的部分或者全部进行转委托。在用户未履行完毕与用户所对应借款业务以及还款等相关义务之前，用户不得单方终止上述委托 。</p> <h3>第三章 贷上钱服务内容</h3> <p>第十条 贷上钱服务内容主要包括根据用户需求进行网络借贷信息公布、提供借贷撮合管理服务、提供客户信息收集、信息交互服务等，具体详情以贷上钱平台提供的服务内容为准。贷上钱并非银行或其它金融机构，本服务也非金融业务，本协议项下的资金移转均通过银行或第三方支付公司来实现，您理解并同意您的资金于流转途中的合理时间。</p> <p>第十一条 贷上钱将为用户提供信息发布服务。贷上钱向用户提供的各种信息及资料仅为参考，用户应依其独立判断做出决策。用户据此进行交易的，产生的风险由用户自行承担，用户无权据此向贷上钱提出任何法律主张。在交易过程中，用户之间发生的纠纷，由纠纷各方自行解决，贷上钱不承担任何责任。</p> <p>第十二条 贷上钱将为用户提供以下合同管理服务：</p> <p>12.1用户使用会员账户登录贷上钱平台后，根据贷上钱的相关规则，以会员账户ID在贷上钱平台通过点击“立即借款”、“我要借款”等类似确认方式签署的电子合同即视为用户本人真实意愿并以用户本人名义签署的合同，具有法律效力。用户应妥善保管自己的账户密码等账户信息，用户通过前述方式订立的电子合同对合同各方具有法律约束力，用户不得以其账户密码等账户信息被盗用或其他理由否认已订立的合同的效力或不按照该等合同履行相关义务。</p> <p>12.2用户根据本协议以及贷上钱的相关规则签署电子合同后，即视为对本协议、借款合同、债权转让合同内容的接受，并同意承担相应的法律责任。贷上钱按贷上钱制定的规定向用户提供电子合同的备案、查看、核对服务。如对此有任何争议，应以贷上钱或与贷上钱有合作的第三方记录的合同为准。</p> <p>12.3用户不得私自仿制、伪造在贷上钱平台上签订的电子合同或印章，不得用伪造的合同进行任何损害贷上钱及贷上钱合作方利益的违法行为，否则由用户承担相应的法律责任。</p> <p>第十三条 除外责任</p> <p>13.1在任何情况下，对于用户使用贷上钱服务过程中涉及由第三方提供相关服务的责任由该第三方承担，贷上钱不承担该等责任。贷上钱不承担责任的情形包括但不限于：</p> <p>13.1.1因银行、第三方支付机构等第三方未按照用户和/或贷上钱指令进行操作引起的任何损失或责任；</p> <p>13.1.2因银行、第三方支付机构等第三方原因导致资金未能及时到账或未能到账引起的任何损失或责任；</p> <p>13.2.3因银行、第三方支付机构等第三方对交易限额或次数等方面的限制而引起的任何损失或责任；</p> <p>13.1.4因其他第三方的行为或原因导致的任何损失或责任。</p> <p>13.2因用户自身的原因导致的任何损失或责任，由用户自行负责，贷上钱不承担责任。贷上钱不承担责任的情形包括但不限于：</p> <p>13.2.1用户未按照本协议或贷上钱平台不时公布的任何规则进行操作导致的任何损失或责任；</p> <p>13.2.2因用户使用的银行卡的原因导致的损失或责任，包括用户使用未经认证的银行卡或使用非用户本人的银行卡或使用信用卡，用户的银行卡被冻结、挂失等导致的任何损失或责任；</p> <p>13.2.3用户向贷上钱发送的指令信息不明确、或存在歧义、不完整等导致的任何损失或责任；</p> <p>13.2.4用户账户内余额不足导致的任何损失或责任；</p> <p>13.2.5其他因用户原因导致的任何损失或责任。</p> <h3>第四章 风险提示</h3> <p>第十四条 用户了解并认可，任何通过贷上钱进行的交易并不能避免以下风险的产生，贷上钱不能也没有义务为如下风险负责或承担任何责任：</p> <p>14.1宏观经济风险：因宏观经济形势变化，可能引起价格等方面的异常波动，用户有可能遭受损失。</p> <p>14.2政策风险：有关法律、法规及相关政策、规则发生变化，可能引起价格等方面异常波动，用户有可能遭受损失。</p> <p>14.3违约风险：因其他交易方无力或无意愿按时足额履约，用户有可能遭受损失。</p> <p>14.4利率风险：市场利率变化可能对购买或持有产品的实际收益产生影响。</p> <p>14.5不可抗力因素导致的风险。</p> <p>14.6因用户的过错导致的任何损失，该过错包括但不限于：决策失误、操作不当、遗忘或泄露密码、密码被他人破解、用户使用的计算机系统被第三方侵入、用户委托他人代理交易时他人恶意或不当操作而造成的损失。</p> <p>第十五条 贷上钱不对任何用户及/或任何交易提供任何担保或条件，无论是明示、默示或法定的。贷上钱不能也不试图对用户发布的信息进行控制，对该等信息，贷上钱不承担任何形式的证明、鉴定服务。贷上钱不能完全保证平台披露内容的真实性、充分性、可靠性、准确性、完整性和有效性，并且无需承担任何由此引起的法律责任。用户依赖于用户的独立判断进行交易，用户应对其作出的判断承担全部责任。</p> <p>第十六条 以上并不能揭示用户通过贷上钱进行网络借贷行为的全部风险及市场的全部情形。用户在做出网络借贷决策前，应全面了解相关交易，谨慎决策，并自行承担全部风险。</p> <h3>第五章 账户安全及管理</h3> <p>第十七条 用户了解并同意，确保用户账户及密码的机密安全是用户的责任。用户将对利用该用户账户及密码所进行的一切行动及言论，负完全的责任，并同意以下事项：</p> <p>17.1用户不对其他任何人泄露账户或密码，亦不可使用其他任何人的账户或密码。因黑客、病毒或用户的保管疏忽等非贷上钱原因导致用户的用户账户遭他人非法使用的，贷上钱不承担任何责任。</p> <p>17.2贷上钱通过用户的会员账户及密码来识别用户的指令，用户确认和使用用户账户和密码登陆后在贷上钱的一切行为均代表用户本人。会员账户操作所产生的电子信息记录均为用户行为的有效凭据，并由用户本人承担由此产生的全部责任。</p> <p>17.3冒用他人账户及密码的，贷上钱及其合法被授权方保留追究实际使用人连带责任的权利。</p> <p>17.4用户应根据贷上钱的相关规则以及贷上钱平台的相关提示创建一个安全密码，应避免选择过于明显的单词或日期，比如用户的姓名、昵称或者生日等。</p> <p>17.5如果由于用户的过失导致用户的帐号和密码脱离用户的控制，则由此导致的针对用户、或任何第三方造成的损害，用户将承担全部责任。</p> <p>第十八条 贷上钱有权基于单方独立判断，在其认为可能发生危害交易安全等情形时，不经通知而先行暂停、中断或终止向用户提供本协议项下的全部或部分会员服务（包括收费服务），并将注册资料移除或删除，且无需对用户或任何第三方承担任何责任。前述情形包括但不限于：</p> <p>18.1贷上钱认为用户提供的个人资料不具有真实性、有效性或完整性。</p> <p>18.2贷上钱发现异常交易或有疑义或有违法之虞时。</p> <p>18.3贷上钱认为用户账户涉嫌洗钱、套现、传销、被冒用或其他贷上钱认为有风险之情形。</p> <p>18.4贷上钱认为用户已经违反本协议中规定的各类规则及精神。</p> <p>18.5用户在使用贷上钱收费服务时未按规定向贷上钱支付相应的服务费用。</p> <p>18.6用户账户已连续三年内未实际使用且账户中余额为零。</p> <p>18.7贷上钱基于交易安全等原因，根据其单独判断需先行暂停、中断或终止向用户提供本协议项下的全部或部分会员服务（包括收费服务），并将注册资料移除或删除的其他情形。</p> <h3>第六章 用户的守法义务及承诺</h3> <p>第十九条 用户承诺绝不为任何非法目的或以任何非法方式使用贷上钱服务，并承诺遵守中国相关法律、法规及一切使用互联网之国际惯例，遵守所有与贷上钱服务有关的网络协议、规则和程序。</p> <p>第二十条 用户同意并保证不得利用贷上钱服务从事侵害他人权益或违法之行为，若有违反者应负所有法律责任。上述行为包括但不限于：</p> <p>20.1反对宪法所确定的基本原则，危害国家安全、泄漏国家秘密、颠覆国家政权、破坏国家统一的。</p> <p>20.2侵害他人名誉、隐私权、商业秘密、商标权、著作权、专利权、其他知识产权及其他债权。</p> <p>20.3违反依法律或合约所应负之保密义务。</p> <p>20.4冒用他人名义使用贷上钱服务。</p> <p>20.5从事任何不法交易行为，如贩卖枪支、毒品、禁药、盗版软件或其他违禁物。</p> <p>20.6提供赌博资讯或以任何方式引诱他人参与赌博。</p> <p>20.7涉嫌洗钱、套现或进行传销活动的。</p> <p>20.8从事任何可能含有电脑病毒或是可能侵害贷上钱服务系統、资料等行为。</p> <p>20.9利用贷上钱服务系统进行可能对互联网或移动网正常运转造成不利影响之行为。</p> <p>20.10侵犯贷上钱的商业利益，包括但不限于发布非经贷上钱许可的商业广告。</p> <p>20.11利用贷上钱服务上传、展示或传播虚假的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料。</p> <p>20.12其他贷上钱有正当理由认为不适当之行为。</p> <p>第二十一条 贷上钱保有依其单独判断删除贷上钱平台内各类不符合法律政策或不真实或不适当的信息内容而无须通知用户的权利，并无需承担任何责任。若用户未遵守以上规定的，贷上钱有权作出独立判断并采取暂停或关闭用户账户等措施，而无需承担任何责任。</p> <p>第二十二条 用户同意，由于用户违反本协议，或违反通过援引并入本协议并成为本协议一部分的文件，或由于用户使用贷上钱服务违反了任何法律或第三方的权利而造成任何第三方进行或发起的任何补偿申请或要求（包括律师费用、鉴定费、评估费、拍卖费、诉讼费、差旅费等），用户会对贷上钱及其关联方、合作伙伴、董事以及雇员给予全额补偿并使之不受损害。</p> <p>第二十三条 用户承诺，其通过贷上钱平台上传或发布的信息均真实有效，其向贷上钱提交的任何资料均真实、有效、完整、详细、准确。如因违背上述承诺，造成贷上钱或贷上钱其他使用方损失的，用户将承担相应责任。</p> <h3>第七章 服务中断或故障</h3> <p>第二十四条 用户同意，基于互联网的特殊性，贷上钱不担保服务不会中断，也不担保服务的及时性和/或安全性。系统因相关状况无法正常运作，使用户无法使用任何贷上钱服务或使用任何贷上钱服务时受到任何影响时，贷上钱对用户或第三方不负任何责任，前述状况包括但不限于：</p> <p>24.1贷上钱系统停机维护期间。</p> <p>24.2电信设备出现故障不能进行数据传输的。</p> <p>24.3由于黑客攻击、网络供应商技术调整或故障、网站升级、银行方面的问题等原因而造成的贷上钱服务中断或延迟。</p> <p>24.4因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成贷上钱系统障碍不能执行业务的。</p> <h3>第八章 责任范围及限制</h3> <p>第二十五条 贷上钱未对任何贷上钱服务提供任何形式的保证，包括但不限于以下事项：</p> <p>25.1贷上钱服务将符合用户的需求。</p> <p>25.2贷上钱服务将不受干扰、及时提供或免于出错。</p> <p>25.3用户经由贷上钱服务购买或取得之任何产品、服务、资讯或其他资料将符合用户的期望。</p> <p>第二十六条 贷上钱服务的合作单位所提供的服务品质及内容由该合作单位自行负责。贷上钱平台的内容可能涉及由第三方所有、控制或者运营的网站或平台（以下简称“第三方网站”）提供的服务。贷上钱不能保证也没有义务保证第三方网站上任何信息的真实性和有效性。用户确认按照第三方网站的服务协议使用第三方网站提供的服务，而不是按照本协议。第三方网站不是贷上钱推荐或者介绍的，第三方网站的内容、产品、广告和其他任何信息均由用户自行判断并承担风险，而与贷上钱无关。用户经由贷上钱服务的使用下载或取得任何资料，应由用户自行考量且自负风险，因资料的下载而导致的任何损坏由用户自行承担。</p> <p>第二十七条 用户自贷上钱及贷上钱工作人员或经由贷上钱服务取得的建议或资讯，无论其为书面或口头，均不构成贷上钱对贷上钱服务内容的任何保证。</p> <p>第二十八条 在法律允许的情况下，贷上钱对于与本协议有关或由本协议引起的，或者由于使用贷上钱平台、或由于其所包含的或以其它方式通过贷上钱平台提供给用户的全部信息、内容、材料、产品（包括软件）和服务、或购买和使用产品引起的任何间接的、惩罚性的、特殊的、派生的损失（包括但不限于业务损失、收益损失、利润损失、使用数据或其他经济利益的损失），不论是如何产生的，也不论是由对本协议的违约（包括违反保证）还是由侵权造成的，均不负有任何责任，即使其事先已被告知此等损失的可能性。另外即使本协议规定的排他性救济没有达到其基本目的，也应排除贷上钱对上述损失的责任。</p> <p>第二十九条 在用户逾期还款时，如果代偿方先行向出借人垫付用户应偿还给出借人的本息垫付的借款本息的，代偿方在向出借人进行垫付的同时，即刻自动取得出借人对用户的相应债权及其他权利，包括但不限于就前述债权向用户追偿的权利。此后用户应直接向代偿方偿还其垫付的借款本息及滞纳金。</p> <p>第三十条 除本协议另有规定外，在任何情况下，贷上钱对本协议所承担的违约赔偿责任总额不超过向用户收取的当次贷上钱服务费用总额。</p> <h3>第九章 隐私权保护及授权条款</h3> <p>第三十一条 贷上钱对于用户提供的、贷上钱自行收集的、经认证的个人信息将按照本协议予以保护、使用或者披露。贷上钱无需用户同意即可向贷上钱关联实体转让与贷上钱平台有关的全部或部分权利和义务。未经贷上钱事先书面同意，用户不得转让其在本协议项下的任何权利和义务。</p> <p>第三十二条 用户同意贷上钱可使用关于用户的相关资料（包括但不限于贷上钱持有的有关用户档案中的资料，贷上钱从用户目前及以前在贷上钱平台上的活动所获取的其他资料以及贷上钱通过其他方式自行收集的资料）以解决争议、对纠纷进行调停。用户同意贷上钱可通过人工或自动程序对用户的资料进行评价。</p> <p>第三十三条 贷上钱有义务根据有关法律要求向司法机关和政府部门提供用户的个人资料。在用户未能按照与贷上钱签订的服务协议或者与贷上钱其他用户签订的协议等其他法律文本的约定履行自己应尽的义务时，贷上钱有权根据自己的判断，或者与该笔交易有关的其他用户的请求披露用户的个人信息和资料，并做出评论。用户严重违反贷上钱的相关规则（包括但不限于您的借款逾期超过[30]天等）的，贷上钱有权对用户提供的及贷上钱自行收集的用户的个人信息和资料编辑入网站黑名单，并将该黑名单对第三方披露，且贷上钱有权将您提交或贷上钱自行收集的您的个人资料和信息与任何第三方进行数据共享，以便网站和第三方催收逾期借款及对您的其他申请进行审核之用，由此可能造成的您的任何损失，贷上钱不承担法律责任。</p> <h3>第十章 知识产权的保护</h3> <p>第三十四条 贷上钱平台上所有内容，包括但不限于著作、图片、档案、资讯、资料、平台架构、平台画面的安排、网页设计，均由贷上钱或其他权利人依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。</p> <p>第三十五条 非经贷上钱或其他权利人书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表贷上钱平台程序或内容。</p> <p>第三十六条 尊重知识产权是用户应尽的义务，如有违反，用户应对贷上钱承担损害赔偿等法律责任。</p> <h3>第十一章 条款的解释、法律适用及争端解决</h3> <p>第三十七条 本协议是由用户与贷上钱共同签订的，适用于用户在贷上钱的全部活动。本协议内容包括但不限于协议正文条款及已经发布的或将来可能发布的各类规则，所有条款和规则为协议不可分割的一部分，与协议正文具有同等法律效力。</p> <p>第三十八条 本协议不涉及用户与贷上钱的其他用户之间，因网上交易而产生的法律关系及法律纠纷。但用户在此同意将全面接受并履行与贷上钱其他用户在贷上钱签订的任何电子法律文本，并承诺按照该法律文本享有和（或）放弃相应的权利、承担和（或）豁免相应的义务。</p> <p>第三十九条 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，则应认为该条款可与本协议相分割，并可被尽可能接近各方意图的、能够保留本协议要求的经济目的的、有效的新条款所取代，而且，在此情况下，本协议的其他条款仍然完全有效并具有约束力。</p> <p>第四十条 本协议自用户在贷上钱平台点击“立即借款”、“我要借款”“同意”、“确认”等类似确认方式时生效。本协议是用户在贷上钱平台从事交易和其他活动的交易规则，用户同意无条件遵守该规则。本协议及其修订的有效性、履行与本协议及其修订效力有关的所有事宜，将受中华人民共和国法律约束，任何争议仅适用中华人民共和国法律。</p> <p>第四十一条 本协议签订地为中国上海市长宁区。因本协议所引起的用户之间以及用户与贷上钱之间的任何纠纷或争议，首先应友好协商解决，协商不成的，应将纠纷或争议提交上海市长宁区人民法院诉讼解决。</p> <p>第四十二条 贷上钱在法律允许最大范围对本协议拥有解释权与修改权。</p> <h3>第十二章 法律文书送达</h3> <p>第四十三条 用户同意对于因协议和服务引起的任何纠纷，司法机关（包括但不限于人民法院）可以用手机短信或电子邮件等现代通讯方式或邮寄方式向本人送达法律文书（包括诉讼文书）。</p> <p>第四十四条 用户本人指定接收法律文书的手机号码或者电子邮箱为合同约定的或注册账户绑定的手机号码或者电子邮箱，司法机关向签署地址发出法律文书即视为送达。</p> <p>第四十五条 用户本人指定邮寄地址为本人在平台方或自测贷上钱时使用的户籍地址或者身份证地址。</p> <p>第四十六条 用户同意司法机关可采取以上一种或多种送达方式向本人送达法律文书，司法机关采取多种方式向本人送达法律文书，送达时间以上述送方式中最先送达的为准。</p> <p>第四十七条 用户确认的上述送达方式适用于各个司法阶段，包括但不限于一审、二审、再审、执行以及督促程序（含支付令送达）。</p> <p>第四十八条 若用户本人上述送达地址有变更，本人应当及时告知平台方和司法机关（如适用）变更后的送达地址。</p> <p>第四十九条 用户保证上述送达地址是准确的、有效的；如果提供的送达地址不确切或不及时告知变更后的地址，使法律文书无法送达或未及时送达，用户本人自行承担由此产生的法律后果。</p> <br> <br> <br> </section> </div> <div class=layermbtn> <span type=1 @click=sure()>确定</span> </div> </div> </div> </div> </div> '},14:function(e,o,p){var t,i,a={};p(12),t=p(10),i=p(13),e.exports=t||{},e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(a).forEach(function(e){var o=a[e];s.computed[e]=function(){return o}})},171:function(e,o,p){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(o,"__esModule",{value:!0});var i=p(8),a=t(i),s=p(14),n=t(s),c={popFlag:!1,phone:{model:"",reg:regexp.phone,err:"请输入正确的手机号"},imgCode:{ticket:"",show:!1},sms:{model:"",reg:regexp.empty,err:"请输入短信验证码",btntitle:"点击获取",btn:"点击获取",timeall:60,timenow:60},password:{model:"",reg:regexp.password,err:"请输入6-16位数字或字母的密码"},status:0,err:"",agree:!0,ids:{"58ede2fe3c7f":"59037032231","5901a872096a":"59505893298","5901a8603c30":"59505893298","5901a82d8a7d":"59505893298","5901a8f2a35b":"59505893298","5901a888f142":"59505893298","5910140f30f5":"59956805522","05910140f30f5":"59958292188","15910140f30f5":"59958358492","25910140f30f5":"59958356458","5912a954e4":"60070056150","05912a954e4":"60070056150","15912a954e4":"60070056150","25912a954e4":"60070056150","35912a954e4":"60070056150",591287648199:"59505893298","0591287648199":"59505893298",1591287648199:"59505893298","591bbb60bf8b":"60470073179","0591bbb60bf8b":"60470073179","1591bbb60bf8b":"60470073179","2591bbb60bf8b":"60470073179","3591bbb60bf8b":"60470073179","591bbd40290d":"60470073179","0591bbd40290d":"60470073179","1591bbd40290d":"60470073179","2591bbd40290d":"60470073179","3591bbd40290d":"60470073179"},channel:sysinfo.getQueryString("channel")};o.default={data:function(){return c},ready:function(){c.ids[c.channel]&&!function(e){e._tt_config=!0;var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=document.location.protocol+"//s3.pstatp.com/bytecom/resource/track_log/src/toutiao-track-log.js",o.onerror=function(){var e=window.encodeURIComponent(window.location.href),p=o.src;ajax.get("//ad.toutiao.com/link_monitor/cdn_failed?web_url="+e+"&js_url="+p)};var p=document.getElementsByTagName("script")[0];p.parentNode.insertBefore(o,p)}(window)},methods:{showProtocolPop:function(){c.popFlag=!0},protocolPop:function(e){c.popFlag=e.popFlag},close:function(){c.status=0},check:function(e){var o=c[e];if(o.reg(o.model))return c.err="",!0;c.err=o.err;try{document.querySelector('[name="'+e+'"]').focus()}catch(e){}return!1},initImgCode:function(){var e={callback:function(e){0==e.ret&&(c.imgCode.ticket=e.ticket,c.imgCode.show=!1)},showHeader:!1,themeColor:"FF6262"};return"function"==typeof capInit?void capInit(document.getElementById("img-code-wrap"),e):void ajax.get("/v2/action/captcha").then(function(o,p){if(0==p.code){var t=document.createElement("script");t.src=p.data.url,document.body.appendChild(t),t.onload=function(){"function"==typeof capInit&&capInit(document.getElementById("img-code-wrap"),e)}}})},showImgCode:function(){"function"==typeof capRefresh?capRefresh():this.initImgCode(),c.imgCode.show=!0,c.imgCode.ticket=""},getSms:function(){if(this.check("phone")&&c.sms.timenow==c.sms.timeall){c.sms.timenow=c.sms.timeall-1,c.sms.btn=c.sms.timenow+" s";var e=this.showImgCode;ajax.get("/v2/user/send-sms-code",{phone:c.phone.model,ticket:c.imgCode.ticket}).then(function(o,p){if(0==p.code)var t=setInterval(function(){--c.sms.timenow?c.sms.btn=c.sms.timenow+" s":(c.sms.btn=c.sms.btntitle,c.sms.timenow=c.sms.timeall,clearInterval(t))},1e3);else 106002==p.code||106003==p.code?e():101004==p.code?c.status=2:layer.warning(p.message),c.sms.btn=c.sms.btntitle,c.sms.timenow=c.sms.timeall}).catch(function(e,o){c.sms.btn=c.sms.btntitle,c.sms.timenow=c.sms.timeall,layer.warning("出错啦，请稍后尝试 - "+o.status)}).complete(function(){c.imgCode.ticket=""})}},submitClick:function(){if(c.agree&&this.check("phone")&&this.check("sms")&&this.check("password")){var e=layer.loading2(!1),o=this.showImgCode;ajax.post("/v2/user/register",{phone:c.phone.model,verify_code:c.sms.model,password:c.password.model,ticket:c.imgCode.ticket}).then(function(e,p){if(0==p.code){if(c.status=1,c.ids[c.channel])try{_taq.push({convert_id:c.ids[sysinfo.getQueryString("channel")]||0,event_type:"form"})}catch(e){console.log(e)}}else 106002==p.code||106003==p.code?o():101004==p.code?c.status=2:layer.warning(p.message)}).complete(function(){layer.close(e),c.imgCode.ticket=""})}},switchAgree:function(){c.agree=!c.agree},emit:function(){ajax.post("/v2/user/report-invite",{phone:c.phone.model})}},components:{DIcp:a.default,DProtocol:n.default},destroyed:function(){c.imgCode.ticket="","function"==typeof capDestroy&&capDestroy()}}},301:function(e,o,p){o=e.exports=p(1)(),o.push([e.id,'.active-promotion-page9{background-color:#fb6720}.active-promotion-page9 .banner{width:100%;display:block}.active-promotion-page9 a.btn{width:auto}.active-promotion-page9 .form{padding:3rem 3rem 1.5rem}.active-promotion-page9 .form .form-border{padding:1rem .5rem;background-color:#fff6d7;border-radius:.6rem}.active-promotion-page9 .input-wrap{display:inline-block;background:#fff;margin-bottom:.8rem;padding:0 1.8rem;width:90%;height:4rem;line-height:4rem;border:1px solid #fb8028;border-radius:.6rem;box-sizing:border-box}.active-promotion-page9 .feature{overflow:hidden;padding-bottom:1rem}.active-promotion-page9 .feature img{width:30%;display:block;margin-left:.8rem}.active-promotion-page9 input{width:100%}.active-promotion-page9 .message-wrap{overflow:hidden;width:90%;margin:0 auto}.active-promotion-page9 .sms-input{width:65%}.active-promotion-page9 .page8-btn,.active-promotion-page9 .sms-btn{background-color:#ffef75;color:#ef6c01}.active-promotion-page9 .sms-btn{width:30%;height:4rem;border-radius:.6rem}.active-promotion-page9 .err-hint{margin:.4rem 0 3rem}.active-promotion-page9 .protocol-link{margin-top:1.4rem}.active-promotion-page9 .protocol-link .c-link-8{color:#ffef75}.active-promotion-page9 .protocol-link>*{vertical-align:middle}.active-promotion-page9 .company-info{margin-bottom:-2.5rem}.active-promotion-page9 .company-info .telnum{color:#ffe72c}.active-promotion-page9 .agree{display:inline-block;padding:.5rem;border:1px solid #ffef75;border-radius:1.8rem}.active-promotion-page9 .agree:after{content:"";display:block;background:none;width:.8rem;height:.8rem;border-radius:.8rem}.active-promotion-page9 .active:after{background:#ffef75}.active-promotion-page9 .success-wrap{padding:3rem}.active-promotion-page9 .success-hint{display:inline-block;background:#f9eaea;margin:0 auto;padding:.75rem 2.5rem;border-radius:50px;color:#ff6262}.active-promotion-page9 .success-icon{background:url('+p(9)+") no-repeat 50%;background-size:20.3rem 100%;height:15.5rem;margin:3.5rem 0}.active-promotion-page9 .layermchild{width:28rem}.active-promotion-page9 .layermcont{padding:0 3rem 3rem}.active-promotion-page9 .close-wrap{margin:1rem 2rem 0;text-align:right}.active-promotion-page9 .close-btn{display:inline-block;padding:1rem;background:url("+p(6)+") no-repeat 50%;background-size:1.6rem;width:1.6rem;height:1.6rem}.active-promotion-page9 .d-icp{color:#ca420e;background-color:#fc6821;position:inherit}.footerarea{display:none!important}",""])},405:function(e,o,p){var t=p(301);"string"==typeof t&&(t=[[e.id,t,""]]);p(2)(t,{});t.locals&&(e.exports=t.locals)},573:function(e,o,p){e.exports=p.p+"static/img/banner9.363ef3b.png";
},644:function(e,o,p){e.exports=" <section class=active-promotion-page9> <div> <img class=banner src="+p(573)+'> </div> <div class="form fs16" v-if="status != 1"> <div class="form-border tac"> <div class=tac> <div class="input-wrap tac"> <input name=phone type=tel v-model=phone.model placeholder=请输入您的手机号码 maxlength=11> </div> </div> <div v-show=imgCode.show> <div id=img-code-wrap></div> </div> <div class=message-wrap> <div class="sms-input input-wrap fl"> <input name=sms type=text v-model=sms.model placeholder=请输入短信验证码> </div> <button class="btn sms-btn fr" :class="sms.timeall != sms.timenow && \'disabled\'" @click=getSms()>{{ sms.btn }}</button> </div> <div> <div class=input-wrap> <input name=password type=password v-model=password.model placeholder=设置登录密码（6-16位数字或字母） maxlength=16> </div> </div> </div> <div class="err-hint tac c-white">{{ err }}</div> <div> <button :class="!agree && \'disabled\'" class="btn page8-btn" v-submit="{cb: submitClick}">领取优惠券</button> </div> <div class="protocol-link tac fs14 c-white"> <i class=agree :class="agree && \'active\'" @click=switchAgree(agree)></i> <span>我已阅读并同意</span> <a class=c-link-8 @click=showProtocolPop()>《贷上钱服务协议》</a> </div> </div> <div class="tac success-wrap" v-if="status == 1"> <p class="success-hint fs20">恭喜您，注册成功</p> <p class=success-icon></p> <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class=btn @click=emit()>马上领钱</a> </div> <div class="company-info tac fs14 c-white"> <p class=addr>公司地址：上海市淞虹路207号明基商务广场C座2层</p> <p>联系电话：400-136-5799</p> </div> <div class=layermbox0 v-if="status == 2"> <div class=laymshade></div> <div class=layermmain> <div class=section> <div class="layermchild layermanim"> <div class=close-wrap> <i class=close-btn @click=close()></i> </div> <div class="layermcont fs15"> <p>您的手机已经注册过贷上钱账户，请前往APP登录</p> <br> <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qsq.paydayloan" class=btn>登录领取</a> </div> </div> </div> </div> </div> <d-icp></d-icp> <d-protocol v-show=popFlag @close-pop=protocolPop></d-protocol> </section> '},745:function(e,o,p){var t,i,a={};p(405),t=p(171),i=p(644),e.exports=t||{},e.exports.__esModule&&(e.exports=e.exports.default);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(s.template=i),s.computed||(s.computed={}),Object.keys(a).forEach(function(e){var o=a[e];s.computed[e]=function(){return o}})}});