"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),e}}(),_get=function e(t,r,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,r);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(o):void 0:null!==(n=Object.getPrototypeOf(t))?e(n,r,o):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var r=arguments.length,o=Array(r),n=0;n<r;n++)o[n]=arguments[n];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(o)))).$usedState=["loopArray109","style","floorItem","showMerchantMore","showMore","item","vipFlag","userCardType","addressObj","loadMore","refreshPage"],t.customComponents=["EnvelopesComponent"],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={showMore:!0},this.$$refs=[]}},{key:"componentDidMount",value:function(){}},{key:"_createData",value:function(){var o=this,n=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),e=this.__props,t=e.item,a=e.vipFlag,r=e.showMerchantMore,s=e.userCardType,e=e.addressObj,i=e.cityId,l=e.latitude,p=e.longitude,u=(t||{}).floorItem,e=(u&&u.map(function(e){if(e.storeStar){for(var t,r=[],o=Math.floor(e.storeStar),n=0;n<o;n++)r[n]=n;t=0<e.storeStar%1?e.storeStar%1*100:0,e.allStartNum=r,e.halfStartNum=t}return e}),u?u.map(function(e,t){e={$original:(0,_index.internal_get_original)(e)};var r=u?"EnvelopesComponent"+t:null,t=(0,_index.genCompid)(n+"FJieoFwxUz"+t);return _index.propsManager.set({item:e.$original,vipFlag:a,userCardType:s,longitude:p,latitude:l,cityId:i,refreshPage:o.refreshPage.bind(o)},t),{$loopState__temp2:r,$compid__274:t,$original:e.$original}}):[]);return Object.assign(this.__state,{loopArray109:e,style:_indexModuleScssMap2.default,floorItem:u,showMerchantMore:r}),this.__state}},{key:"loadmore",value:function(){this.props.loadMore()}},{key:"refreshPage",value:function(){this.props.refreshPage()}}]),a}(),_class.$$events=["loadmore"],_class.$$componentPath="pages/vpayMember-t/home/components/merchantEnvelopesNew/index";var MerchantEnvelopesNew=_temp2;exports.default=MerchantEnvelopesNew,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(MerchantEnvelopesNew));