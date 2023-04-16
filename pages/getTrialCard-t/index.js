"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);return void 0!==a?"value"in a?a.value:void 0!==(a=a.get)?a.call(o):void 0:null!==(a=Object.getPrototypeOf(t))?e(a,n,o):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp2=require("../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp3=require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp4=require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp5=require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_index3=require("./api/index.js"),_indexWeapp6=require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp7=require("../../npm/@jd/djmp/common-t/js/location/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var isWeapp=!0,isInWeappH5=!1,scopeData={throttleFlag:!0},GetTrialCard=(_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(o)))).$usedState=["$compid__220","showDefault","anonymousState__temp","phone","isShowPop","gotSuccess","defaultType","defaultTips","isNewUser","toastConfigLogo","toastJumpLink","couponBaseInfo","cityId","lng","lat","buttionId"],t.config={navigationBarTitleText:"到家会员免费送"},t.getPaySource=function(){return(_indexWeapp2.isWeixin?"isWeixin":_indexWeapp2.isDaojiaApp&&"isDaojiaApp")||_indexWeapp2.isJDReactNativeWebView&&"isJDReactNativeWebView"||"isMiniProgram"},t.customComponents=["Default"],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={phone:"",isShowPop:!1,gotSuccess:!1,showDefault:!0,defaultType:0,defaultTips:"",isNewUser:!1,toastConfigLogo:"",toastJumpLink:"",couponBaseInfo:{},cityId:"",lng:"",lat:"",buttionId:""},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__220"),n=this.__state,o=n.showDefault,a=n.defaultType,n=n.defaultTips,e=this._createMainData(e+"UnDpJAdlUJ")();return o&&_index.propsManager.set({defaultType:a,defaultTips:n},t),Object.assign(this.__state,{$compid__220:t,anonymousState__temp:e}),this.__state}},{key:"_createMainData",value:function(e){var p=this;return function(){var e=p.state,t=e.bannelLogo,n=e.vipLogo,o=e.title,a=e.buttionId,i=e.phone,s=e.gotSuccess;e.toastConfigLogo;return{style:_indexModuleScssMap2.default,bannelLogo:t,buttionId:a,gotSuccess:s,title:o,phone:i,vipLogo:n}}}},{key:"toUse",value:function(){var e=this.state,e=(e.toastJumpLink,e.gotSuccess);this.$router.params.channel;e&&(0,_indexWeapp3.jump)({to:"home",type:"h5",params:{}})}},{key:"componentDidShow",value:function(){var e=this.$router.params.channel;isInWeappH5=(0,_indexWeapp2.getH5InWeappFlag)(),(0,_indexWeapp6.pvReport)({create_time:new Date,page_par:{channel_name:e}}),wx.hideShareMenu({menus:["shareAppMessage","shareTimeline"]}),(0,_index.getApp)().globalData.qrcode.business=this.$router.params.business,(0,_index.getApp)().globalData.qrcode.channel=this.$router.params.channel,this.fetchData()}},{key:"goHome",value:function(){this.$router.params.channel;(0,_indexWeapp3.jump)({to:"home",type:"h5",params:{}})}},{key:"getCouponFn",value:function(){var e=this,t=this.state,n=t.buttionId,t=t.gotSuccess,o=this.$router.params.channel;1!=n||t?this.goHome(1):((0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"clickButton",click_par:{channel_name:o,text:"freeGet"}}),this._throttle(function(){e.getCoupon()}))}},{key:"getCoupon",value:function(e){var u=this,t=this.state.vpId,c=this.$router.params.channel,n=((0,_indexWeapp5.showLoading)(),{isWeixin:96,isDaojiaApp:95,isJDReactNativeWebView:108,isJDApp:114,isMiniProgram:107,isDJBrowser:-1}),o=this.getPaySource();this.judageIsLogin().then(function(){var e={channel:c,vpId:t,cityId:-1,redPacketPaySource:n[o]};u.getPositionController().then(function(r){e.cityId=r&&r.cityId||r&&r.areaCode||-1,e=_extends({lng:r&&r.longitude||"",lat:r&&r.latitude||""},e),(0,_index3.freeTakeFn)(e).then(function(e){var t,n,o,a,i,s,p;(0,_indexWeapp5.hideLoading)(),(0,_indexWeapp5.showToast)({title:e.msg}),405==e.code||406==e.code?(p="",e.result&&(p=e.result.phone),u.setState({title:e.msg,buttionId:0,phone:p||""})):0==e.code?(t=(p=e.result).title,n=p.buttionId,o=p.isNewUser,a=p.toastConfigLogo,i=p.toastJumpLink,s=p.phone,p=p.couponBaseInfo,u.setState({title:t,phone:s,buttionId:n,gotSuccess:!0,isShowPop:!0,isNewUser:1==o,bannelLogo:a,toastJumpLink:i,couponBaseInfo:p},function(){(0,_indexWeapp6.clickReport)({create_time:new Date,click_id:"clickGetSuc",click_par:{channel_name:c}})})):201==e.code||202==r.code?u._goToLogin():(e.result&&e.result.title&&u.setState({title:e.result.title,buttionId:0}),(0,_indexWeapp5.showToast)({title:e.msg}))}).catch(function(e){(0,_indexWeapp5.showToast)({title:e.msg||"网络加载异常"}),(0,_indexWeapp5.hideLoading)()})})}).catch(function(e){(0,_indexWeapp5.showToast)({title:"请登录"}),u._goToLogin()})}},{key:"onClosePopUp",value:function(){this.setState({isShowPop:!1})}},{key:"_throttle",value:function(e,t){scopeData.throttleFlag&&(scopeData.throttleFlag=!1,e.apply(this,arguments),setTimeout(function(){scopeData.throttleFlag=!0},t||1e3))}},{key:"fetchData",value:function(){var s=this,e=this.$router.params.channel;(0,_indexWeapp5.showLoading)(),(0,_index3.getData)({channel:e}).then(function(e){var t,n,o,a,i;(0,_indexWeapp5.hideLoading)(),0==e.code?(t=(e=e.result).bannelLogo,n=e.vipLogo,o=e.title,a=e.buttionId,i=e.vpId,e=e.phone,s.setState({bannelLogo:t,vipLogo:n,title:o,buttionId:a,vpId:i,phone:e||"",showDefault:!1},function(){s.judageIsLogin().then(function(e){s.getCouponAuto()}).catch(function(e){(0,_indexWeapp4.setStorageSync)("pageFrom","")})})):s.setState({showDefault:!0,defaultType:3,defaultTips:"网络加载异常"})}).catch(function(e){(0,_indexWeapp5.hideLoading)(),s.setState({showDefault:!0,defaultType:3,defaultTips:"网络加载异常"})})}},{key:"judageIsLogin",value:function(){return new Promise(function(e,t){(0,_indexWeapp.isLogin)().then(function(){e()}).catch(function(){t()})})}},{key:"getCouponAuto",value:function(){var e=this.$router.params.channel;(0,_indexWeapp4.getStorageSync)("pageFrom")=="getTrialCard"+e&&this.getCoupon(!1),(0,_indexWeapp4.setStorageSync)("pageFrom","")}},{key:"_goToLogin",value:function(){var e=this.$router.params.channel;(0,_indexWeapp4.setStorageSync)("pageFrom","getTrialCard"+e),(0,_indexWeapp.goToLogin)({localTargetUrl:"/pages/getTrialCard-t/index?channel="+e})}},{key:"getPositionController",value:function(){var n=this,e=this.state,o=e.cityId,a=e.lng,i=e.lat;return new Promise(function(t,e){o&&a&&i?t({cityId:o,longitude:a,latitude:i}):_indexWeapp2.isJDApp?(0,_indexWeapp7.getLocation)().then(function(e){n.setState({cityId:e.cityId||e.areaCode||"",lng:e.longitude||"",lat:e.latitude||""}),t(e)}).catch(function(e){t()}):t()})}},{key:"onShareAppMessage",value:function(){return{title:"京东到家",path:"/pages/home/home",imageUrl:"https://storage.360buyimg.com/wximg/common/logo.jpg"}}},{key:"onShareTimeline",value:function(){return{title:"京东到家",path:"/pages/home/home",imageUrl:"https://storage.360buyimg.com/wximg/common/logo.jpg"}}}]),i}(),_class.$$events=["toUse","getCouponFn"],_class.multipleSlots=!0,_class.$$componentPath="pages/getTrialCard-t/index",_temp2);exports.default=GetTrialCard,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(GetTrialCard,!0));