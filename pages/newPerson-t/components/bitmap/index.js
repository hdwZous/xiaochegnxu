"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);return void 0!==a?"value"in a?a.value:void 0!==(a=a.get)?a.call(o):void 0:null!==(a=Object.getPrototypeOf(t))?e(a,n,o):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_index3=require("../../api/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function a(){var e,i;_classCallCheck(this,a);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return(e=i=_possibleConstructorReturn(this,(e=a.__proto__||Object.getPrototypeOf(a)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp3","anonymousState__temp4","style","anonymousState__temp","isRuleDiaShow","anonymousState__temp2","h","m","s","ms","ruleInfo","isCountTime","pageInfo","position"],i._getRuleDiaInfo=function(){var e=i.props.position,e={city_id:e.cityId,lng_pos:e.longitude,lat_pos:e.latitude};(0,_index3.getRuleDiaInfo)(e).then(function(e){var t=e.code,e=e.result;"0"==t&&i.setState({isRuleDiaShow:!0,ruleInfo:e})})},i._countFun=function(e){i.setState({isCountTime:!0});var a=e;clearInterval(i.timer),i.timer=setInterval(function(){var e,t,n,o;1e3<a?(a-=50,e=Math.floor(a/1e3/3600%24),t=Math.floor(a/1e3/60%60),n=Math.floor(a/1e3%60),o=Math.floor(Math.floor(a%1e3)/10),i.setState({h:e<10?"0"+e:e,m:t<10?"0"+t:t,s:n<10?"0"+n:n,ms:o<10?"0"+o:o})):clearInterval(i.timer)},50)},i._onCloseDia=function(){i.setState({isRuleDiaShow:!1})},i.customComponents=["RuleDia"],_possibleConstructorReturn(i,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={h:0,m:0,s:0,ms:0,ruleInfo:{},isCountTime:!1},this.$$refs=[]}},{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=this.__state,n=t.isRuleDiaShow,n=void 0!==n&&n,t=t.isCountTime,o=this.__props.pageInfo,o=0===Object.keys(o).length,a=this._createCountDownViewData(e+"onTjhPQEnC")(),e=n?this._createRuleDiaData(e+"OlarRFRORH")():null,o=(0,_index.internal_inline_style)({backgroundImage:o?"https://storage.360buyimg.com/wximg/newUser/defaultPage_bitmap.png":""}),t=(0,_index.internal_inline_style)({display:t?"":"none"});return Object.assign(this.__state,{anonymousState__temp3:o,anonymousState__temp4:t,style:_indexModuleScssMap2.default,anonymousState__temp:a,isRuleDiaShow:n,anonymousState__temp2:e}),this.__state}},{key:"_createRuleDiaData",value:function(n){var o=this;return function(){var e=(0,_index.genCompid)(n+"$compid__283"),t=o.state.ruleInfo;return _index.propsManager.set({title:"活动规则",txt:t.ruleContent,onCloseDia:o._onCloseDia},e),{$compid__283:e}}}},{key:"_createCountDownViewData",value:function(e){var a=this;return function(){var e=a.state,t=e.h,n=e.m,o=e.s,e=e.ms;return{style:_indexModuleScssMap2.default,h:t,m:n,s:o,ms:e}}}}]),a}(),_class.$$events=["_getRuleDiaInfo"],_class.multipleSlots=!0,_class.$$componentPath="pages/newPerson-t/components/bitmap/index";var Bitmap=_temp2;exports.default=Bitmap,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Bitmap));