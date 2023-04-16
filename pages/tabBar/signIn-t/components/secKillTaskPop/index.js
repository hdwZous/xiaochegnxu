"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,o,n):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp2=require("../../../../../npm/@jd/djmp/common-t/js/utils/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _defineProperty(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function s(){var e,t;_classCallCheck(this,s);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=s.__proto__||Object.getPrototypeOf(s)).call.apply(t,[this].concat(n)))).$usedState=["style","secTaskInfo","countDownStr","closeSecTaskPop","getReward","setSecOrderTaskScroll"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={countDownStr:""},this.$$refs=[]}},{key:"componentDidMount",value:function(){}},{key:"componentWillReceiveProps",value:function(e){e=e.secTaskInfo,e=void 0===e?{}:e;e.secondsLeft&&0!=e.secondsLeft&&(this.refreshTime(e.secondsLeft),this.showCountDown(e.secondsLeft-1e3,"countDownStr","timer"))}},{key:"initData",value:function(e){}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props.secTaskInfo;this.__state.countDownStr;return Object.assign(this.__state,{style:_indexModuleScssMap2.default,secTaskInfo:void 0===e?{}:e}),this.__state}},{key:"showCountDown",value:function(e,n,r){var s=this;(0,_indexWeapp2.countDown)(e,function(e){var t,o;e.end?(clearInterval(s.state[n]),s.setState((_defineProperty(o={},n,"已过期"),_defineProperty(o,"timeLeft",0),o)),s.props.closeSecTaskPop(!0)):(o="",o=e.day?e.day+"天"+e.hour+":"+e.minute+":"+e.second:e.hour+":"+e.minute+":"+e.second,s.setState((_defineProperty(t={},n,o),_defineProperty(t,r,e.timer),_defineProperty(t,"timeLeft",e.times),t)))})}},{key:"refreshTime",value:function(e){var t,o=0,n=0,r=0;0<e&&(e/=1e3,t=Math.floor(e/86400),o=Math.floor(e/3600)-24*t,n=Math.floor(e/60)-24*t*60-60*o,r=Math.floor(e)-24*t*60*60-60*o*60-60*n,o<=9&&(o="0"+o),n<=9&&(n="0"+n),r<=9&&(r="0"+r),this.setState({countDownStr:t?t+"天"+o+":"+n+":"+r:o+":"+n+":"+r}))}},{key:"getBeanLayer",value:function(e){this.props.getReward(e)}},{key:"clickReportRequest",value:function(e){(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickTaskPopup",click_par:{taskStatus:e.status}})}},{key:"handleTimeText",value:function(e){var t=0,o=0,n=0,r=0;0<(e/=1e3)&&(t=Math.floor(e/86400),o=Math.floor(e/3600)-24*t,n=Math.floor(e/60)-24*t*60-60*o,r=Math.floor(e)-24*t*60*60-60*o*60-60*n);return t?t+"天"+o+":"+n+":"+r:o+":"+n+":"+r}},{key:"hideLayer",value:function(e){this.props.secTaskInfo;this.props.closeSecTaskPop(!1),e.preventDefault(),e.stopPropagation()}},{key:"toSecKillGoods",value:function(){this.props.setSecOrderTaskScroll()}},{key:"onTouchMove",value:function(e){return e.preventDefault(),e.stopPropagation(),!1}}]),s}(),_class.$$events=["hideLayer","onTouchMove","toSecKillGoods","getBeanLayer"],_class.$$componentPath="pages/tabBar/signIn-t/components/secKillTaskPop/index";var SecKillTaskPop=_temp2;exports.default=SecKillTaskPop,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(SecKillTaskPop));