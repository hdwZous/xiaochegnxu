"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,o);return void 0!==a?"value"in a?a.value:void 0!==(a=a.get)?a.call(n):void 0:null!==(a=Object.getPrototypeOf(t))?e(a,o,n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp5=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_differentIndustry=require("../api/differentIndustry.js"),_indexWeapp6=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var scopeData={throttleFlag:!0},exchangePage=(_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var o=arguments.length,n=Array(o),a=0;a<o;a++)n[a]=arguments[a];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(n)))).$usedState=["$compid__188","showDefault","anonymousState__temp","defaultType","defaultTips","code","defineSelf","isShowPop","isSuccess","sendNewUserCoupon","toastConfigLogo","toastJumpLink"],t.config={navigationBarTitleText:"到家会员免费送"},t.customComponents=["Default","VipPopCard"],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={showDefault:!0,defaultType:0,defaultTips:"",code:"",defineSelf:!0,isShowPop:!1,isSuccess:!1,sendNewUserCoupon:!1,toastConfigLogo:"",toastJumpLink:""},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__188"),o=this.__state,n=o.showDefault,a=o.defaultType,o=o.defaultTips,e=this._createMainData(e+"STQniUiRXS")();return n&&_index.propsManager.set({defaultType:a,defaultTips:o},t),Object.assign(this.__state,{$compid__188:t,anonymousState__temp:e}),this.__state}},{key:"_createMainData",value:function(d){var l=this;return function(){var e=(0,_index.genCompid)(d+"$compid__189"),t=l.state,o=t.bannelLogo,n=t.vipLogo,a=t.buttionId,i=t.code,p=t.isShowPop,s=t.isSuccess,r=t.phone,c=t.toastConfigLogo,t=t.toastJumpLink,u=l.$router.params.channel;return _index.propsManager.set({isShowPop:p,onClosePopUp:l.onClosePopUp.bind(l),channel:u,showVipPop:!0,toastConfigLogo:c,toastJumpLink:t},e),{$compid__189:e,style:_indexModuleScssMap2.default,bannelLogo:o,isSuccess:s,phone:r,code:i,vipLogo:n,buttionId:a}}}},{key:"componentDidShow",value:function(){wx.hideShareMenu({menus:["shareAppMessage","shareTimeline"]}),this.fetchData()}},{key:"inputFn",value:function(e){e=e.detail.value.replace(/[^\w]/g,"").substr(0,8).toUpperCase();this.setState({code:e})}},{key:"goHome",value:function(e){var t=this.$router.params.channel;(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"clickgojddaojia",click_par:{channel:t,statusId:e}}),(0,_indexWeapp2.getH5InWeappFlag)()?(0,_indexWeapp3.jump)({to:"home",type:"h5",params:{}}):(0,_indexWeapp3.jump)({to:"home"})}},{key:"getCouponFn",value:function(){var e=this,t=this.state,o=t.buttionId,n=t.code,t=t.isSuccess,a=this.$router.params.channel;1!=o||t?this.goHome(1):((0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"click_code_cooperatepage",click_par:{channel:a}}),this._throttle(function(){e.getCoupon(n)}))}},{key:"getCoupon",value:function(e){var a,i=this;e.length<8?(0,_indexWeapp5.showToast)({title:"请输入8位有效兑换码"}):(a=this.$router.params.channel,(0,_indexWeapp5.showLoading)(),this.judageIsLogin().then(function(){(0,_differentIndustry.freeTakeVipByRedeemCode)({channel:a,redeemCode:e}).then(function(e){var t,o,n;(0,_indexWeapp5.hideLoading)(),0==e.code?(t=(n=e.result).toastConfigLogo,o=n.toastJumpLink,n={buttionId:n.buttionId,isShowPop:!0,isSuccess:!0,title:n.title||"",phone:n.phone,toastConfigLogo:t,toastJumpLink:o},(0,_indexWeapp5.showToast)({title:e.msg}),i.setState(n,function(){i.state.isShowPop&&(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"click_code_cooeratepop",click_par:{channel:a}})})):201==e.code||202==e.code?i._goToLogin():405==e.code?((0,_indexWeapp5.showToast)({title:e.msg}),i.setState({code:""})):(i.setState({code:""}),(0,_indexWeapp5.showToast)({title:e.msg}))}).catch(function(e){(0,_indexWeapp5.showToast)({title:e.msg||"网络异常"})})}).catch(function(){(0,_indexWeapp5.hideLoading)(),(0,_indexWeapp5.showToast)({title:"请先登录"}),i._goToLogin()}))}},{key:"_throttle",value:function(e,t){scopeData.throttleFlag&&(scopeData.throttleFlag=!1,e.apply(this,arguments),setTimeout(function(){scopeData.throttleFlag=!0},t||1e3))}},{key:"fetchData",value:function(){var p=this,s=this.$router.params.channel;(0,_indexWeapp5.showLoading)(),(0,_differentIndustry.getData)({channel:s,type:2}).then(function(e){(0,_indexWeapp5.hideLoading)();var e=e.result,t=e.bannelLogo,o=e.vipLogo,n=e.buttionId,a=e.title,i=e.sendNewUserCoupon;e.vpId;p.setState({bannelLogo:t,vipLogo:o,buttionId:n,showDefault:!1,sendNewUserCoupon:i},function(){p.judageIsLogin().then(function(){p.getCouponAuto()}).catch(function(e){(0,_indexWeapp4.setStorageSync)("pageFrom",""),(0,_indexWeapp4.setStorageSync)("vipInputCode","")})}),(0,_indexWeapp6.pvReport)({create_time:new Date,page_par:{channel:s,info:1==n?"免费领取":a||"不能领取"}})}).catch(function(e){(0,_indexWeapp5.hideLoading)(),p.setState({showDefault:!0,defaultType:2,defaultTips:"抱歉活动不存在"})})}},{key:"getCouponAuto",value:function(){var e=this.$router.params.channel,t=(0,_indexWeapp4.getStorageSync)("pageFrom"),o=(0,_indexWeapp4.getStorageSync)("vipInputCode");t=="vipexchangepage"+e&&((0,_indexWeapp4.setStorageSync)("vipInputCode",""),(0,_indexWeapp4.setStorageSync)("pageFrom",""),this.getCoupon(o))}},{key:"judageIsLogin",value:function(){return new Promise(function(e,t){(0,_indexWeapp.isLogin)().then(function(){e()}).catch(function(){(0,_indexWeapp2.getH5InWeappFlag)()||_indexWeapp2.isJDReactNativeWebView||_indexWeapp2.isJDApp||_indexWeapp2.isJDFinanceApp?(0,_indexWeapp.isLoginInWeappH5)(function(){e()}).catch(function(){t()}):t()})})}},{key:"onClosePopUp",value:function(){this.setState({isShowPop:!1})}},{key:"_goToLogin",value:function(){var e=this.$router.params.channel,t=this.state,o=t.code,t=t.sendNewUserCoupon;(0,_indexWeapp4.setStorageSync)("pageFrom","vipexchangepage"+e),(0,_indexWeapp4.setStorageSync)("vipInputCode",o),(0,_indexWeapp.goToLogin)({channel:1==t?"vipcooperation_"+e:"",localTargetUrl:"/pages/differentIndustry-t/exchangePage/index?channel="+e})}},{key:"onShareAppMessage",value:function(){return{title:"京东到家",path:"/pages/home/home",imageUrl:"https://storage.360buyimg.com/wximg/common/logo.jpg"}}},{key:"onShareTimeline",value:function(){return{title:"京东到家",path:"/pages/home/home",imageUrl:"https://storage.360buyimg.com/wximg/common/logo.jpg"}}}]),i}(),_class.$$events=["inputFn","getCouponFn"],_class.multipleSlots=!0,_class.$$componentPath="pages/differentIndustry-t/exchangePage/index",_temp2);exports.default=exchangePage,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(exchangePage,!0));