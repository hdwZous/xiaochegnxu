"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,o){return e&&n(t.prototype,e),o&&n(t,o),t}}(),_get=function t(e,o,n){null===e&&(e=Function.prototype);var r=Object.getOwnPropertyDescriptor(e,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(e))?t(r,o,n):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(t)return!e||"object"!=typeof e&&"function"!=typeof e?t:e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}_temp2=_class=function(){function s(){var t,e;_classCallCheck(this,s);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(t=e=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp","anonymousState__temp2","anonymousState__temp3","anonymousState__temp4","style","item","clickBtn","getProgressWidth","couponState"],e.customComponents=[],_possibleConstructorReturn(e,t)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(t){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,t),this.state={},this.$$refs=[]}},{key:"componentDidMount",value:function(){}},{key:"clickBtn",value:function(){this.props.clickBtn&&this.props.clickBtn()}},{key:"getBtnText",value:function(t){var e="立即领取",o={0:"立即领取",1:"去使用"};return e=o[t]?o[t]:e}},{key:"getProgressWidth",value:function(t,e){var o=0;return o=this.props.getProgressWidth?this.props.getProgressWidth(t,e):o}},{key:"couponState",value:function(){var t=this.props.item,e="";return e=this.props.couponState?this.props.couponState(t.state):e}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var t=this.__props.item,e=4===t.state||3===t.state||2===t.state?"background:url("+this.couponState()+") no-repeat center;background-size: 100% 100%;\n      -webkit-background-size: 100% 100%;":null,o=2===t.state||3===t.state||4===t.state?this.getBtnText(t.state):null,n=this.getBtnText(t.state),r=(0,_index.internal_inline_style)({width:this.getProgressWidth(t.schedule,100)+"%"});return Object.assign(this.__state,{anonymousState__temp:e,anonymousState__temp2:o,anonymousState__temp3:n,anonymousState__temp4:r,style:_indexModuleScssMap2.default,item:t}),this.__state}}]),s}(),_class.$$events=["clickBtn"],_class.$$componentPath="pages/vpayMember-t/memberDay/components/platformCoupon/index";var platformCoupon=_temp2;exports.default=platformCoupon,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(platformCoupon));