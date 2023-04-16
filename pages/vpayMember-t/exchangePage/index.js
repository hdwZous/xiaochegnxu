"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o,n=arguments[t];for(o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,o);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(n):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,o,n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp5=require("../../../npm/@jd/djmp/common-t/js/http/index.weapp.js"),_indexWeapp6=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_indexWeapp7=require("../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_common=require("../../../common-mp/api/common.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var scopeData={throttleFlag:!0},exchangePage=(_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var o=arguments.length,n=Array(o),i=0;i<o;i++)n[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(n)))).$usedState=["$compid__153","style","code","defineSelf","isShowPop"],t.config={navigationBarTitleText:"兑换码开通会员"},t.clickIntro=function(e){(0,_indexWeapp3.navigateTo)("/pages/vpayMember-t/instructions/index?page="+e)},t.customComponents=["VipPopCard"],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={code:"",defineSelf:!0,isShowPop:!1},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,e=(0,_index.genCompid)(e+"$compid__153"),t=this.__state,t=(t.code,t.isShowPop);return _index.propsManager.set({isShowPop:t,onClosePopUp:this.onClosePopUp.bind(this),showToHomeBtn:!1},e),Object.assign(this.__state,{$compid__153:e,style:_indexModuleScssMap2.default}),this.__state}},{key:"componentDidShow",value:function(){var e=this.$router.params.vipFlag;(0,_indexWeapp4.pvReport)({create_time:new Date,page_par:{url:"/pages/vpayMember-t/exchangePage/index",vipstatus:e}}),(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"show_old_vip_exchangepage"})}},{key:"inputFn",value:function(e){e=e.detail.value.replace(/[^\w]/g,"").substr(0,8).toUpperCase();this.setState({code:e})}},{key:"blurFn",value:function(e){!this.state.code&&e.value&&this.setState({code:e.value})}},{key:"goHome",value:function(){(0,_indexWeapp2.jump)({to:"home"})}},{key:"getCouponFn",value:function(){var e=this,t=this.state.code;this._throttle(function(){e.getCoupon(t)})}},{key:"freeTakeVipByRedeemCode",value:function(e){return(0,_indexWeapp5.request)({functionId:"vip/third/party/freeTakeVipByRedeemCode",body:JSON.stringify(e),method:"POST",isNeedDealError:!0})}},{key:"getCoupon",value:function(e){var t=this;e.length<8?(0,_indexWeapp3.showToast)({title:"请输入8位有效兑换码"}):((0,_indexWeapp3.showLoading)(),(0,_indexWeapp.isLogin)().then(function(){t.freeTakeVipByRedeemCode({redeemCode:e}).then(function(e){(0,_indexWeapp3.hideLoading)(),t.pvReFn("click_codebutton",e.msg),0==e.code?(t.setState({isShowPop:!0},function(){t.pvReFn("click_codepop")}),_indexWeapp7.isDaojiaApp&&((0,_common.postMsgUpdateV)(),"appTab"==t.$router.params.fromPage&&(0,_common.closeWebView)())):201==e.code||202==e.code?((0,_indexWeapp3.showToast)({title:"请先登录"}),t._goToLogin()):(0,_indexWeapp3.showToast)({title:e.msg})}).catch(function(e){(0,_indexWeapp3.showToast)({title:e.msg||"网络异常"})})}).catch(function(){(0,_indexWeapp3.hideLoading)(),t.pvReFn("click_codebutton","未登录"),(0,_indexWeapp3.showToast)({title:"请先登录"}),t._goToLogin()}))}},{key:"pvReFn",value:function(e,t){var o={vipstatus:this.$router.params.vipFlag};t&&(o=_extends({},o,{info:t})),(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:e,click_par:o})}},{key:"_throttle",value:function(e,t){scopeData.throttleFlag&&(scopeData.throttleFlag=!1,e.apply(this,arguments),setTimeout(function(){scopeData.throttleFlag=!0},t||1e3))}},{key:"onClosePopUp",value:function(){this.setState({isShowPop:!1}),(0,_indexWeapp6.getLocation)().then(function(e){e.cityId=e.cityId||e.areaCode||e.cityCode||"",e.cityName=e.city||e.cityName||"";var t=e.longitude,o=e.latitude,e=e.cityId;(0,_indexWeapp3.redirectTo)("/pages/vpayMember-t/home/index?longitude="+t+"&latitude="+o+"&cityId="+e)}).catch(function(e){})}},{key:"_goToLogin",value:function(){var e=this.$router.params.channel;(0,_indexWeapp.goToLogin)({localTargetUrl:"/pages/vpayMember-t/exchangePage/index?channel="+(void 0===e?"":e)})}}]),a}(),_class.$$events=["inputFn","blurFn","getCouponFn","clickIntro"],_class.$$componentPath="pages/vpayMember-t/exchangePage/index",_temp2);exports.default=exchangePage,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(exchangePage,!0));