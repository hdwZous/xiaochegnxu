"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function r(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),e}}(),_get=function e(t,o,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,o);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(r):void 0:null!==(n=Object.getPrototypeOf(t))?e(n,o,r):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_memberModuleScssMap=require("./member.module.scss.map.js"),_memberModuleScssMap2=_interopRequireDefault(_memberModuleScssMap),_indexWeapp2=require("../../../../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp3=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var o=arguments.length,r=Array(o),n=0;n<o;n++)r[n]=arguments[n];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(r)))).$usedState=["anonymousState__temp","style","goodsInfo","vipFlag","isLoginFlag","toLogin"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props.goodsInfo,t=(0,_index.internal_inline_style)({backgroundImage:"url("+e.skuImg+")"});return Object.assign(this.__state,{anonymousState__temp:t,style:_memberModuleScssMap2.default,goodsInfo:e}),this.__state}},{key:"dealJump",value:function(e,t,o){var r=this.props,n=r.vipFlag,a=r.isLoginFlag,r=r.toLogin;a?1!=n?(0,_indexWeapp.showToast)({title:"开通会员可购买"}):("addCar"==t&&(o.preventDefault(),o.stopPropagation()),this.goToStore(e,t)):r()}},{key:"goToStore",value:function(e,t){var o=e.storeId,r=e.orgCode,n=e.isH5,a=e.lat,a=void 0===a?"":a,s=e.lng,s=void 0===s?"":s,i=e.skuId,e=e.userAction,e=void 0===e?"":e;(0,_indexWeapp3.clickReport)({create_time:new Date,click_id:"click_add",click_par:{skuId:i,storeId:o}}),(0,_indexWeapp2.jump)({type:1==n?"h5":"",to:"store",params:{userAction:e,storeId:o||"",skuId:i||"",orgCode:r||"",longitude:s,latitude:a,needAnchorSku:"addCar"==t,addCart:"addCar"==t,needAddCar:"addCar"==t,needAddCart:"addCar"==t?1:0,isAddCart:"addCar"==t}})}}]),a}(),_class.$$events=["dealJump"],_class.$$componentPath="pages/vpayMember-t/home/components/Goods/index";var Goods=_temp2;exports.default=Goods,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Goods));