"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(t,e,n){return e&&o(t.prototype,e),n&&o(t,n),t}}(),_get=function t(e,n,o){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,n);if(void 0!==r){if("value"in r)return r.value;r=r.get;return void 0!==r?r.call(o):void 0}r=Object.getPrototypeOf(e);if(null!==r)return t(r,n,o)},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_couponModuleScssMap=require("./coupon.module.scss.map.js"),_couponModuleScssMap2=_interopRequireDefault(_couponModuleScssMap);function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}_temp2=_class=function(){function i(){var t,e;_classCallCheck(this,i);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(t=e=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(o)))).$usedState=["anonymousState__temp","anonymousState__temp2","anonymousState__temp3","anonymousState__temp4","couponButton","style","helpActivityStatus","onClick"],e.customComponents=[],_possibleConstructorReturn(e,t)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(t){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,t),this.state={},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var t=this.__props||{},e=t.couponButton,t=t.helpActivityStatus,n=3==t||4==t||5==t?(0,_index.internal_inline_style)({flex:1,width:"100%",alignItems:"center",justifyContent:"center"}):null,o=3==t||4==t||5==t?(0,_index.internal_inline_style)({color:e.titleColor||"#fff"}):null,r=(0,_index.internal_inline_style)({flex:1,width:"100%",alignItems:"center",justifyContent:"center"}),i=(0,_index.internal_inline_style)({color:e&&e.titleColor?e.titleColor:"#fff"});return Object.assign(this.__state,{anonymousState__temp:n,anonymousState__temp2:o,anonymousState__temp3:r,anonymousState__temp4:i,couponButton:e,style:_couponModuleScssMap2.default,helpActivityStatus:t}),this.__state}},{key:"funPrivateiGcCY",value:function(){return this.props.onClick.apply(void 0,Array.prototype.slice.call(arguments,1))}}]),i}(),_class.$$events=["funPrivateiGcCY"],_class.$$componentPath="pages/vpayMember-t/components/coupon/components/couponBtn";var CouponBtn=_temp2;exports.default=CouponBtn,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CouponBtn));