"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,o);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(n):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,o,n):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp2=require("../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp3=require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_goToByCouponWeapp=require("../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),_indexWeapp4=require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp5=require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_index3=require("./api/index.js"),_indexWeapp6=require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var scopeData={throttleFlag:!0,isLoginFlag:!1},DifferentIndustry=(_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var o=arguments.length,n=Array(o),i=0;i<o;i++)n[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(n)))).$usedState=["$compid__190","showDefault","anonymousState__temp","defaultType","defaultTips","ruleDesc","showRulePop","topImgUrl","bgColor","buttonImgUrl","bottomImgUrl","couponActivityStatus","subscribeState","showMessage","receivedRecordList","getCouponSucess","bottomImgLink","topImgText"],t.config={navigationBarTitleText:"到家会员"},t.customComponents=["Default","SubscribeMessage","Pop"],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){var t=this;_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={showDefault:!0,defaultType:0,defaultTips:"",ruleDesc:"",showRulePop:!1,topImgUrl:"",bgColor:"",buttonImgUrl:"",bottomImgUrl:"",couponActivityStatus:"",subscribeState:"",showMessage:"大额优惠券",receivedRecordList:[],getCouponSucess:"",bottomImgLink:"",topImgText:""},this.$$refs=[{type:"component",id:"IwEPM",refName:"",fn:function(e){return t.childSubscribe=e}}]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__190"),o=this.__state,n=o.showDefault,i=o.defaultType,o=o.defaultTips,e=this._createMainData(e+"QhxUpEAFEm")();return n&&_index.propsManager.set({defaultType:i,defaultTips:o},t),Object.assign(this.__state,{$compid__190:t,anonymousState__temp:e}),this.__state}},{key:"_createMainData",value:function(u){var c=this;return function(){var e=(0,_index.genCompid)(u+"$compid__191"),t=(0,_index.genCompid)(u+"$compid__192"),o=(c.$router.params.channel,c.state),n=o.topImgUrl,i=o.ruleDesc,a=o.showRulePop,s=o.bgColor,r=o.bottomImgUrl,o=o.topImgText,p=c._createCenterData(u+"dPoZkIBklp")(),s=(0,_index.internal_inline_style)({backgroundColor:s});return c.anonymousFunc0=function(){return c.setState({showRulePop:!0})},_index.propsManager.set({subscribeMessageImageUrl:"https://storage.360buyimg.com/wximg/common/noticeImage1.png"},e),_index.propsManager.set({isShow:a,onPopEvent:c.onPopEvent.bind(c)},t),{anonymousState__temp3:s,$compid__191:e,$compid__192:t,style:_indexModuleScssMap2.default,topImgUrl:n,anonymousState__temp2:p,bottomImgUrl:r,ruleDesc:i,topImgText:o}}}},{key:"_createCenterData",value:function(e){var i=this;return function(){var e=i.state,t=e.getCouponSucess,o=e.buttonImgUrl,n=e.showMessage,e=e.receivedRecordList;return{anonymousState__temp4:""===t?(0,_index.internal_inline_style)({"background-image":"url("+o+")"}):null,anonymousState__temp5:!1===t?(0,_index.internal_inline_style)({"background-image":"url("+o+")"}):null,style:_indexModuleScssMap2.default,getCouponSucess:t,receivedRecordList:e,showMessage:n}}}},{key:"componentDidShow",value:function(){var e=this,t=this.$router.params.activityId;(0,_index.getApp)().globalData.qrcode.business=this.$router.params.business,(0,_index.getApp)().globalData.qrcode.channel=this.$router.params.channel,(0,_indexWeapp6.pvReport)({create_time:new Date,page_par:{activityId:t||""}}),this.judageIsLogin().then(function(){scopeData.isLoginFlag=!0,e.fetchData()}).catch(function(){scopeData.isLoginFlag=!1,e.fetchData()})}},{key:"toBtmLink",value:function(){this.state.bottomImgLink&&(-1<this.state.bottomImgLink.indexOf("home/home")?this.goHome():(this.state.bottomImgLink="/"!=this.state.bottomImgLink.substring(0,1)?"/"+this.state.bottomImgLink:this.state.bottomImgLink,(0,_indexWeapp5.navigateTo)(this.state.bottomImgLink)))}},{key:"toUse",value:function(e){var t=this.$router.params.activityId;this.clickRp("clickusecoupon",{activityId:t,couponId:e.couponId}),(0,_goToByCouponWeapp.goToByCouponId)({couponId:e.couponId,code:e.activityCode},e.couponGoSource)}},{key:"onPopEvent",value:function(e){"close"===e.type&&this.setState({showRulePop:!1})}},{key:"goHome",value:function(){var e=this.$router.params,t=e.activityId,e=e.qrCodeId;this.clickRp("clickgojddaojia",{activityId:t,qrCodeId:e}),(0,_indexWeapp3.jump)({to:"home",type:"h5",params:{}})}},{key:"getOpenIdFn",value:function(){return new Promise(function(t,o){swan.getLoginCode({success:function(e){e.code?(0,_index3.getOpenId)({jsCode:e.code}).then(function(e){e.result?t(e.result.openId):o()}).catch(function(){o()}):o()},fail:function(){o()}})})}},{key:"getCoupon",value:function(e){var t,o;scopeData.throttleFlag&&(scopeData.throttleFlag=!1,setTimeout(function(){scopeData.throttleFlag=!0},500),t={activityId:(t=this.$router.params).activityId,qrCodeId:t.qrCodeId,isClick:e},this.clickRp("clickwxcouponpage",t),scopeData.isLoginFlag?(e=(0,_indexWeapp4.getStorageSync)("login_info")||{},o=(0,_indexWeapp4.getStorageSync)("unionid")||"",t.pin=e.PDJ_H5_PIN||"",t.unionId=o||"",this.getCouponService(t)):((0,_indexWeapp5.showToast)({title:"请先登录"}),this._goToLogin()))}},{key:"getCouponService",value:function(i){var a=this;(0,_index3.getCouponAPI)(i).then(function(e){var t=e.result,o=t.subscribeState,n=t.receivedRecordList,n=void 0===n?[]:n,t=t.showMessage,t=void 0===t?"":t;i.isClick&&a.clickRp("showgetcoupontoast",{activityId:i.activityId,toast:t}),0==e.code?((0,_indexWeapp5.showToast)({title:t,icon:"none"}),a.setState({subscribeState:o,receivedRecordList:n,showMessage:t,getCouponSucess:n&&0!=n.length}),1==o&&a.childSubscribe.initSubscribeMessage(["fchAp-FzoMeL7H-ENM6JyQV7z_wHexxQfIqhou26ijY"])):((0,_indexWeapp5.showToast)({title:t,icon:"none"}),a.setState({showMessage:t,getCouponSucess:!1}))}).catch(function(){(0,_indexWeapp5.hideLoading)(),i.isClick&&a.clickRp("showgetcoupontoast",{activityId:i.activityId,toast:"获取接口数据异常"})})}},{key:"clickRp",value:function(e,t){(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:e,click_par:t})}},{key:"fetchData",value:function(){var p=this,e=this.$router.params.activityId;(0,_indexWeapp5.showLoading)(),(0,_index3.getData)({activityId:e}).then(function(e){var t,o,n,i,a,s,r;(0,_indexWeapp5.hideLoading)(),0==e.code?(t=(r=e.result).topImgUrl,o=r.bgColor,n=r.buttonImgUrl,i=r.bottomImgUrl,a=r.ruleDesc,s=r.bottomImgLink,r=r.topImgText,p.setState({topImgUrl:t,bgColor:o,buttonImgUrl:n,bottomImgUrl:i,ruleDesc:a,showDefault:!1,bottomImgLink:s,topImgText:r}),scopeData.isLoginFlag&&p.getCouponAuto()):p.setState({showDefault:!0,defaultType:2,defaultTips:e.msg||"抱歉活动不存在"})}).catch(function(e){(0,_indexWeapp5.hideLoading)(),p.setState({showDefault:!0,defaultType:2,defaultTips:"抱歉活动不存在"})})}},{key:"judageIsLogin",value:function(){return new Promise(function(e,t){(0,_indexWeapp.isLogin)().then(function(){e()}).catch(function(){(0,_indexWeapp2.getH5InWeappFlag)()||_indexWeapp2.isJDReactNativeWebView||_indexWeapp2.isJDApp||_indexWeapp2.isJDFinanceApp?(0,_indexWeapp.isLoginInWeappH5)(function(){e()}).catch(function(){t()}):t()})})}},{key:"getCouponAuto",value:function(){var e=this.$router.params.activityId;(0,_indexWeapp4.getStorageSync)("pageFrom")=="getCoupon-t"+e&&((0,_indexWeapp4.setStorageSync)("pageFrom",""),this.getCoupon(!1))}},{key:"_goToLogin",value:function(){var e=this.$router.params,t=e.activityId,e=e.qrCodeId;(0,_indexWeapp4.setStorageSync)("pageFrom","getCoupon-t"+t),(0,_indexWeapp.goToLogin)({localTargetUrl:"/pages/getCoupon-t/index?activityId="+t+"&qrCodeId="+e})}},{key:"onShareAppMessage",value:function(){return{title:"京东到家",path:"/pages/home/home",imageUrl:"https://storage.360buyimg.com/wximg/common/logo.jpg"}}},{key:"onShareTimeline",value:function(){return{title:"京东到家",path:"/pages/home/home",imageUrl:"https://storage.360buyimg.com/wximg/common/logo.jpg"}}},{key:"anonymousFunc0",value:function(e){}}]),a}(),_class.$$events=["anonymousFunc0","toBtmLink","getCoupon","goHome","toUse"],_class.multipleSlots=!0,_class.$$componentPath="pages/getCoupon-t/index",_temp2);exports.default=DifferentIndustry,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(DifferentIndustry,!0));