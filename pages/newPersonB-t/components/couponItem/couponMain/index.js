"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,o);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(n):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,o,n):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function r(){var e,t;_classCallCheck(this,r);for(var o=arguments.length,n=Array(o),i=0;i<o;i++)n[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=r.__proto__||Object.getPrototypeOf(r)).call.apply(t,[this].concat(n)))).$usedState=["style","expirationTime","isFirstCoupon","couponSize","anonymousState__temp","anonymousState__temp2","couponType","limitRule","quota"],t.customComponents=["CountDown"],_possibleConstructorReturn(t,e)}return _inherits(r,_index.Component),_createClass(r,[{key:"_constructor",value:function(e){_get(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"_constructor",this).call(this,e),this.$$refs=[]}},{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"_createShortCouponData",value:function(r){var a=this;return function(){var e=(0,_index.genCompid)(r+"$compid__311"),t=a.props,o=t.couponType,n=t.limitRule,i=t.quota,t=t.expirationTime;return o&&_index.propsManager.set({time:t},e),{$compid__311:e,style:_indexModuleScssMap2.default,couponType:o,quota:i,limitRule:n}}}},{key:"_createSingleCouponData",value:function(r){var a=this;return function(){var e=(0,_index.genCompid)(r+"$compid__312"),t=a.props,o=t.couponType,n=t.quota,i=t.limitRule,t=t.expirationTime;return o&&_index.propsManager.set({time:t},e),{$compid__312:e,style:_indexModuleScssMap2.default,couponType:o,quota:n,limitRule:i}}}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=this.__props,o=t.couponSize,n=t.isFirstCoupon,t=t.expirationTime,i=o?this._createSingleCouponData(e+"QkCAixWVjA")():null,e=this._createShortCouponData(e+"IDHpFCnaNj")();return Object.assign(this.__state,{style:_indexModuleScssMap2.default,expirationTime:t,isFirstCoupon:n,couponSize:o,anonymousState__temp:i,anonymousState__temp2:e}),this.__state}}]),r}(),_class.$$events=[],_class.multipleSlots=!0,_class.$$componentPath="pages/newPersonB-t/components/couponItem/couponMain/index";var CouponMain=_temp2;exports.default=CouponMain,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CouponMain));