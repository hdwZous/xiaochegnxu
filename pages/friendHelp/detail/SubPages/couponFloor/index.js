"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var o,t=arguments[n];for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},_createClass=function(){function t(e,n){for(var o=0;o<n.length;o++){var t=n[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),_get=function e(n,o,t){null===n&&(n=Function.prototype);var i=Object.getOwnPropertyDescriptor(n,o);if(void 0!==i){if("value"in i)return i.value;i=i.get;return void 0!==i?i.call(t):void 0}i=Object.getPrototypeOf(n);if(null!==i)return e(i,o,t)},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp2=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_api=require("../../../api/api.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}_temp2=_class=function(){function a(){var e,n;_classCallCheck(this,a);for(var o=arguments.length,t=Array(o),i=0;i<o;i++)t[i]=arguments[i];return(e=n=_possibleConstructorReturn(this,(n=a.__proto__||Object.getPrototypeOf(a)).call.apply(n,[this].concat(t)))).$usedState=["loopArray64","loopArray65","loopArray66","style","userRightsResps","showCouponPop","clickParInfo","jumpStoreInfo"],n.anonymousFunc0Map={},n.anonymousFunc1Map={},n.anonymousFunc2Map={},n.customComponents=["SubscribeMessage"],_possibleConstructorReturn(n,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){var n=this;_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={showCouponPop:!0},this.$$refs=[{type:"component",id:"rHYHp",refName:"",fn:function(e){return n.childSubscribe=e}}]}},{key:"_createData",value:function(){var t=this,e=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix,this.__props.userRightsResps),i=void 0===e?[]:e,e=1==i.length?i.map(function(e,n){e={$original:(0,_index.internal_get_original)(e)};var o="Xqkfl"+n;return t.anonymousFunc0Map[o]=function(){return t.clickUseCoupon(e.$original)},{_$indexKey:o,$loopState__temp2:1==i.length?"item"+n:null,$loopState__temp4:1==i.length?(0,_index.internal_inline_style)({backgroundSize:"100% 100%"}):null,$loopState__temp6:1==i.length?e.$original.couponResp.amount.split(".")[0]:null,$loopState__temp8:e.$original.couponResp.amount.split(".")[1]&&1==i.length?e.$original.couponResp.amount.split(".")[1]:null,$loopState__temp26:e.$original.couponResp.amount.split(".")[1],$loopState__temp28:e.$original.couponResp.amount.split(".")[1],$original:e.$original}}):[],n=2==i.length?i.map(function(e,n){e={$original:(0,_index.internal_get_original)(e)};var o="xaMhb"+n;return t.anonymousFunc1Map[o]=function(){return t.clickUseCoupon(e.$original)},{_$indexKey2:o,$loopState__temp10:2==i.length?"item"+n:null,$loopState__temp12:2==i.length?(0,_index.internal_inline_style)({backgroundSize:"100% 100%"}):null,$loopState__temp14:2==i.length?e.$original.couponResp.amount.split(".")[0]:null,$loopState__temp16:e.$original.couponResp.amount.split(".")[1]&&2==i.length?e.$original.couponResp.amount.split(".")[1]:null,$loopState__temp30:e.$original.couponResp.amount.split(".")[1],$loopState__temp32:e.$original.couponResp.amount.split(".")[1],$original:e.$original}}):[],o=3==i.length?i.map(function(e,n){e={$original:(0,_index.internal_get_original)(e)};var o="pqgQz"+n;return t.anonymousFunc2Map[o]=function(){return t.clickUseCoupon(e.$original)},{_$indexKey3:o,$loopState__temp18:3==i.length?"item"+n:null,$loopState__temp20:3==i.length?(0,_index.internal_inline_style)({backgroundSize:"100% 100%"}):null,$loopState__temp22:3==i.length?e.$original.couponResp.amount.split(".")[0]:null,$loopState__temp24:e.$original.couponResp.amount.split(".")[1]&&3==i.length?e.$original.couponResp.amount.split(".")[1]:null,$loopState__temp34:e.$original.couponResp.amount.split(".")[1],$loopState__temp36:e.$original.couponResp.amount.split(".")[1],$original:e.$original}}):[];return Object.assign(this.__state,{loopArray64:e,loopArray65:n,loopArray66:o,style:_indexModuleScssMap2.default,userRightsResps:i}),this.__state}},{key:"componentDidMount",value:function(){}},{key:"clickUseCoupon",value:function(e){var n=this.props,o=n.clickParInfo,o=void 0===o?{}:o,n=n.jumpStoreInfo,n=void 0===n?{}:n,o=((0,_indexWeapp2.clickReport)({click_id:"clickcoupon",create_time:new Date,click_par:_extends({},o,{couponid:e.couponResp.couponId||"",couponType:e.couponRightsType||""})}),_api.useCoupon.bind(this,e)),t={},i=""+(new Date).getMonth()+(new Date).getDate();try{t=(0,_indexWeapp.getStorageSync)("friendHelpSubMsg")||{}}catch(e){}!(t.day&&t.day==i||1!=e.couponRightsType&&3!=e.couponRightsType)?this.childSubscribe.initSubscribeMessage(["fchAp-FzoMeL7H-ENM6JycKcHKnwK_Ae4YWl4jWXUQ4"],21,o):(0,_api.useCoupon)(e,n);try{(0,_indexWeapp.setStorageSync)("friendHelpSubMsg",{day:i})}catch(e){}}},{key:"anonymousFunc0",value:function(e,n){return this.anonymousFunc0Map[e]&&this.anonymousFunc0Map[e](n)}},{key:"anonymousFunc1",value:function(e,n){return this.anonymousFunc1Map[e]&&this.anonymousFunc1Map[e](n)}},{key:"anonymousFunc2",value:function(e,n){return this.anonymousFunc2Map[e]&&this.anonymousFunc2Map[e](n)}}]),a}(),_class.$$events=["anonymousFunc0","anonymousFunc1","anonymousFunc2"],_class.options={addGlobalClass:!0},_class.$$componentPath="pages/friendHelp/detail/SubPages/couponFloor/index";var CouponFloor=_temp2;exports.default=CouponFloor,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CouponFloor));