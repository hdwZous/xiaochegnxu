"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_createClass=function(){function a(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,s){return t&&a(e.prototype,t),s&&a(e,s),e}}(),_get=function e(t,s,a){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,s);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(a):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,s,a):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_common=require("../../api/common.js"),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function o(){var e,t;_classCallCheck(this,o);for(var s=arguments.length,a=Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=o.__proto__||Object.getPrototypeOf(o)).call.apply(t,[this].concat(a)))).$usedState=["style","showSubscribeMessage","subscribeMessageImageUrl"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(e){_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,e),this.state={showSubscribeMessage:!1},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props.subscribeMessageImageUrl;this.__state.showSubscribeMessage;return Object.assign(this.__state,{style:_indexModuleScssMap2.default,subscribeMessageImageUrl:e}),this.__state}},{key:"initSubscribeMessage",value:function(t,s,a,r){var o=this,n=!0,e=setTimeout(function(){n?o.hiddenShowSubscribeMessage(!0,o):o.hiddenShowSubscribeMessage(!1,o),clearInterval(e)},1e3);wx.requestSubscribeMessage({tmplIds:t,success:function(e){"requestSubscribeMessage:ok"==e.errMsg&&(n=!1,o.hiddenShowSubscribeMessage(!1,o),o.subscribeMessageUpdata(e,o,t,s),r&&"function"==typeof r&&r(e));e="accept"==e[t];a&&"function"==typeof a&&a(e)},fail:function(e){o.hiddenShowSubscribeMessage(!1,o),a&&"function"==typeof a&&a(!1),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"subscribeMessage",click_par:{tempId:t}})}})}},{key:"hiddenShowSubscribeMessage",value:function(e,t){t.setState({showSubscribeMessage:e})}},{key:"subscribeMessageUpdata",value:function(e,t,s,a){var r,o=getApp().globalData.loginStateInfo,n=[];for(r in e){var c={};t.matchChannel(r,s,a)&&("reject"==e[r]?c.status="reject":"accept"==e[r]?c.status="accept":c.status="ban",c.templateId=r,c.channelId=t.matchChannel(r,s,a),n.push(c))}(0,_common.subscribeMsginfo)({openId:o.openId||"",templates:n}).then(function(e){}).catch(function(e){}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"subscribeMessage",click_par:{templates:n}})}},{key:"matchChannel",value:function(e,t,s){if(s&&0<s.length){t=t.indexOf(e);if(-1!=t)return s[t]}var a=null;switch(e){case"MUMVz8L2w1GfGlI_pzERYQKRy8VvCMNUcUsxW-A7c3I":a=1;break;case"2DTGty37XUIpQfM2QgM-HUCE2YJ4Um6DUzM9ENBcXSE":a=2;break;case"foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":a=3;break;case"sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU":a=4;break;case"oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs":a=5;break;case"foXXDvHMDaA45_8QPRwAd_p9unR3syrGG8kxIVQXUQ0":a=6;break;case"oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs":a=7;break;case"foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":a=8;break;case"sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU":a=9;break;case"aHE90mjezRAJVQhzUhZ5vXoSQwwI8hgR-tYVSa9F5-A":a=10;break;case"sUt2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso":a=11;break;case"B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY":a=12;break;case"foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":a=13;break;case"K1HtLhViyzUMKbZjeFmR3OKpz8gGpq3Fuy1guWIYVKA":a=14;break;case"K1HtLhViyzUMKbZjeFmR3AS2FLYmxF1ua8XaReShCt0":a=15;break;case"fchAp-FzoMeL7H-ENM6JyQV7z_wHexxQfIqhou26ijY":a=16;break;case"3zzStxd9r5oOQ0N569D5l-cJ6OYj1E3QHb095rCRvSs":a=17;break;case"aUUy2JkJeivLJJCEPOMuM_fsywgjhNjdN4ryMeWYcsw":a=18;break;case"iwJcSNrbfOXKnfhoi4tEJvC1AnVWoNj1R8D8FSctMs0":a=19;break;case"fchAp-FzoMeL7H-ENM6JycKcHKnwK_Ae4YWl4jWXUQ4":a=20;break;case"tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs":a=21;break;case"aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM":a=22;break;case"fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I":a=23;break;default:a=null}return a}},{key:"hiddenSubscribeMessage",value:function(){this.setState({showSubscribeMessage:!1})}}]),o}(),_class.$$events=["hiddenSubscribeMessage"],_class.$$componentPath="common-mp/components/subscribeMessage/index";var SubscribeMessage=_temp2;exports.default=SubscribeMessage,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(SubscribeMessage));