"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(o):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,n,o):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_index3=require("../../../../npm/prop-types/index.js"),_index4=_interopRequireDefault(_index3);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(o)))).$usedState=["type","styles","btnText","goLogin","btnHref","handlerReload","__fn_onClick"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.$$refs=[]}},{key:"goLogin",value:function(){this.props.goLogin()}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props,t=e.type,n=e.btnText,o=e.btnHref;return"unLogin"!==t&&"noWifi"!==t&&("noLocation"===t?this.anonymousFunc0=function(){return(0,_indexWeapp.jump)({to:"home"})}:"noShop"===t||"noOpen"===t||"empty"===t?this.anonymousFunc1=function(){return(0,_indexWeapp.jump)({to:o||"home"})}:"search"!==t&&"noSearchBtn"===t&&(this.anonymousFunc2=function(){return(0,_indexWeapp.jump)({to:o||"home"})})),Object.assign(this.__state,{type:t,styles:_indexModuleScssMap2.default,btnText:n}),this.__state}},{key:"funPrivateVRQSK",value:function(){return this.props.handlerReload.apply(void 0,Array.prototype.slice.call(arguments,1))}},{key:"anonymousFunc0",value:function(e){}},{key:"anonymousFunc1",value:function(e){}},{key:"anonymousFunc2",value:function(e){}}]),i}(),_class.$$events=["goLogin","funPrivateVRQSK","anonymousFunc0","anonymousFunc1","anonymousFunc2"],_class.propTypes={btnText:_index4.default.string,type:_index4.default.string.isRequired,handlerReload:_index4.default.func,btnHref:_index4.default.string},_class.defaultProps={msg:"",type:"",btnText:"",customClass:"",handlerReload:function(){}},_class.$$componentPath="pages/vpayMember-t/components/Tip/TipBtn";var TipBtn=_temp2;exports.default=TipBtn,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(TipBtn));