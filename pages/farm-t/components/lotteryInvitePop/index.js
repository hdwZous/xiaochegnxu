"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,o,n):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(n)))).$usedState=["showLotteryInvitePop","style","data","countDown"],t.onClosePopContent=function(e){e.stopPropagation()},t.onClosePop=function(e){e.stopPropagation(),t.props.onClickCloseLotteryInvitePop()},t.onInviteFriendClosePop=function(e){e.stopPropagation(),t.props.onClickCloseLotteryInvitePop(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickCloseEasterInvite"})},t.onInviteFriend=function(e){e.stopPropagation(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickEasterInvite"})},t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props,t=e.showLotteryInvitePop,o=e.countDown,e=e.data;return Object.assign(this.__state,{showLotteryInvitePop:t,style:_indexModuleScssMap2.default,data:e,countDown:o}),this.__state}}]),i}(),_class.$$events=["onClosePop","onClosePopContent","onInviteFriend","onInviteFriendClosePop"],_class.options={addGlobalClass:!0},_class.$$componentPath="pages/farm-t/components/lotteryInvitePop/index";var LotteryInvitePop=_temp2;exports.default=LotteryInvitePop,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(LotteryInvitePop));