"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(o):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,n,o):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,r;_classCallCheck(this,i);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return(e=r=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(n)))).$usedState=["loopArray164","businessType","undefined","style","couponList","initSharpLeft","expirationTime"],r.getSharpLeft=function(){_index2.default.createSelectorQuery().in(r.$scope).select("#CouponMainCon").boundingClientRect(function(e){e&&e.left&&r.props.initSharpLeft(e.left+e.width/2+"px")}).exec()},r.gainOpacity=function(e,t){if(e!=t)return e=r.shartOpacity,r.shartOpacity=e-.1,e;0!=t&&(r.shartOpacity=r.shartOpacity+.1)},r.gainArgs=function(e,t,n){var o=null,i="已使用",i=t<4?e.businessType>t?(o=1,e.orderCount?e.orderCount+"单后解锁":""):(o=4,"已使用"):e.businessType>t?(o=3,e.orderCount?e.orderCount+"单后解锁":""):(o=2,"已完成");return{bgUrl:"https://storage.360buyimg.com/wximg/newUser/"+r.bgUrlMap[o]+".png",statusText:i}},r.customComponents=["CouponMain","CouponDisable"],_possibleConstructorReturn(r,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.bgUrlMap={0:"couponDisableOpen",1:"couponDisableClose2",2:"couponDisableWidthOpen",3:"couponDisableWidthClose",4:"couponDisableSmileOpen"},this.shartOpacity=.8,this.$$refs=[]}},{key:"componentDidMount",value:function(){this.props.initSharpLeft&&this.getSharpLeft()}},{key:"componentWillUnmount",value:function(){}},{key:"_createData",value:function(){var l,c=this,_=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),e=this.__props,d=e.businessType,f=e.couponList,h=e.expirationTime,y=1===f.length;return void 0===d?null:(l=void 0,this.shartOpacity=.8,f.forEach(function(e,t){e.businessType==d&&(l=t)}),e=f.map(function(e,t){e={$original:(0,_index.internal_get_original)(e)};var n=c.gainArgs(e.$original,d,t),o=n.bgUrl,n=n.statusText,i=c.gainOpacity(t,l),r=e.$original.businessType===d,s=r?_indexModuleScssMap2.default.conponItemSpe:null,a=t===f.length-1?_indexModuleScssMap2.default.conponItemLast:null,p=r?0===t:null,u=(0,_index.genCompid)(_+"bHaERkWpop"+t),t=(r&&_index.propsManager.set({quota:e.$original.quota,limitRule:e.$original.limitRule,couponType:h?1:0,couponSize:y?1:0,expirationTime:h,isFirstCoupon:p},u),(0,_index.genCompid)(_+"FXPIGnrohd"+t));return r||_index.propsManager.set({quota:e.$original.quota,bgUrl:o,statusText:n,orderCount:e.$original.orderCount,opacity:i},t),{bgUrl:o,statusText:n,opacityValue:i,couponMainflag:r,conponItemSpe:s,conponItemLast:a,$loopState__temp2:p,$compid__308:u,$compid__309:t,$original:e.$original}}),Object.assign(this.__state,{loopArray164:e,businessType:d,undefined:void 0,style:_indexModuleScssMap2.default,couponList:f}),this.__state)}}]),i}(),_class.$$events=[],_class.$$componentPath="pages/newPersonB-t/components/couponItem/index";var CouponItem=_temp2;exports.default=CouponItem,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CouponItem));