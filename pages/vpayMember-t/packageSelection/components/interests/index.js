"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}}(),_get=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(n):void 0:null!==(o=Object.getPrototypeOf(t))?e(o,r,n):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp2=require("../../../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var r=arguments.length,n=Array(r),o=0;o<r;o++)n[o]=arguments[o];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(n)))).$usedState=["$compid__276","isAB","currentInterests","style","interestList"],t.customComponents=["RpList","NoneData"],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={},this.$$refs=[]}},{key:"imgError",value:function(){return"https://storage.360buyimg.com/wxmini/vpay_member/default.png"}},{key:"toRightsDetail",value:function(e,t,r){(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickBall",click_par:{text:r}}),(0,_indexWeapp2.navigateTo)("/pages/vpayMember-t/rightsInstruction/index?vpId="+t+"&type="+e)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,e=(0,_index.genCompid)(e+"$compid__276"),t=this.__props,r=t.currentInterests,t=t.isAB,n=r.interestList,n=void 0===n?[]:n;this.__state.showRenewFlag;return"new_page"!=t&&r&&_index.propsManager.set({rpList:r.redPackageList},e),Object.assign(this.__state,{$compid__276:e,isAB:t,currentInterests:r,style:_indexModuleScssMap2.default,interestList:n}),this.__state}}]),i}(),_class.$$events=["toRightsDetail"],_class.$$componentPath="pages/vpayMember-t/packageSelection/components/interests/index";var packageItem=_temp2;exports.default=packageItem,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(packageItem));