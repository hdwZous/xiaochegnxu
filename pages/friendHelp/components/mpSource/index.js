"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(o):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,n,o):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp2=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(o)))).$usedState=["style","sourceData"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={},this.$$refs=[]}},{key:"_createData",value:function(){var t=this,e=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix,this.__props.sourceData);return this.anonymousFunc0=function(e){return t.clickSource(e)},Object.assign(this.__state,{style:_indexModuleScssMap2.default,sourceData:e}),this.__state}},{key:"clickSource",value:function(e){var t=this.props.sourceData,n=t.jump,o=t.jumpParam,r=t.linkUrl,t=t.title;(0,_indexWeapp2.clickReport)({create_time:new Date,click_id:"clickbanner",click_par:{title:t,jump:n,linkUrl:r||""}}),n&&(0,_indexWeapp.navigateToMpByCXCMAP)({nativePageUrl:n,nativePageParam:o}),r&&(0,_indexWeapp.autoJump)({url:r})}},{key:"anonymousFunc0",value:function(e){}}]),a}(),_class.$$events=["anonymousFunc0"],_class.options={addGlobalClass:!0},_class.$$componentPath="pages/friendHelp/components/mpSource/index";var MpSource=_temp2;exports.default=MpSource,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(MpSource));