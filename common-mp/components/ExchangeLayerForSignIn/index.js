"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(o):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,n,o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var REPORT={key:{sure:"clickConfirmExchange",cancel:"clickCancelExchange"},sure:function(){var e=this.key.sure;(0,_indexWeapp.clickReport)({click_id:e})},cancel:function(){var e=this.key.cancel;(0,_indexWeapp.clickReport)({click_id:e})}},ExchangeLayerForSignIn=(_temp2=_class=function(){function r(){var e,t;_classCallCheck(this,r);for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=r.__proto__||Object.getPrototypeOf(r)).call.apply(t,[this].concat(o)))).$usedState=["anonymousState__temp","$compid__269","style","skuImg","skuTitle","secondTitle","showComfireDialog","popData"],t.config={navigationBarTitleText:""},t.customComponents=["Pop"],_possibleConstructorReturn(t,e)}return _inherits(r,_index.Component),_createClass(r,[{key:"_constructor",value:function(e){_get(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_constructor",this).call(this,e),this.state={},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,e=(0,_index.genCompid)(e+"$compid__269"),t=this.__props,n=t.showComfireDialog,t=t.popData,t=void 0===t?{}:t,o=t.skuResponse,o=void 0===o?{}:o,t=t.couponResponse,t=void 0===t?{}:t,i=t.secondTitle,r=o.skuTitle||t.couponTitle||t.counponTitle,o=o.skuImg||t.couponImg,t=(0,_index.internal_inline_style)({WebkitBoxOrient:"vertical"});return _index.propsManager.set({isShow:n,isNeedCloseIcon:!0,onPopEvent:this.onPopEvent.bind(this)},e),Object.assign(this.__state,{anonymousState__temp:t,$compid__269:e,style:_indexModuleScssMap2.default,skuImg:o,skuTitle:r,secondTitle:i}),this.__state}},{key:"onPopEvent",value:function(){this.props.onClickPop()}},{key:"BtnEvent",value:function(e){this.props.onClickPopBtn(e);var t=1==e;2==e&&REPORT.sure(),t&&REPORT.cancel()}}]),r}(),_class.$$events=["BtnEvent"],_class.$$componentPath="common-mp/components/ExchangeLayerForSignIn/index",_temp2);exports.default=ExchangeLayerForSignIn,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(ExchangeLayerForSignIn));