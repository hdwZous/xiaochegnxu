"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(t,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,a){return e&&n(t.prototype,e),a&&n(t,a),t}}(),_get=function t(e,a,n){null===e&&(e=Function.prototype);var s=Object.getOwnPropertyDescriptor(e,a);if(void 0!==s){if("value"in s)return s.value;s=s.get;return void 0!==s?s.call(n):void 0}e=Object.getPrototypeOf(e);if(null!==e)return t(e,a,n)},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_signIn=require("../../../../../common-mp/api/signIn.js");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var isWeapp=!0,AddMp=(_temp2=_class=function(){function o(){var t,e;_classCallCheck(this,o);for(var a=arguments.length,n=Array(a),s=0;s<a;s++)n[s]=arguments[s];return(t=e=_possibleConstructorReturn(this,(t=o.__proto__||Object.getPrototypeOf(o)).call.apply(t,[this].concat(n)))).$usedState=["anonymousState__temp","anonymousState__temp2","status","styles","top"],e.state={status:0,top:0},e.customComponents=[],_possibleConstructorReturn(e,t)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(t){_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,t),this.$$refs=[]}},{key:"initData",value:function(){var t=getApp().globalData,e=t.addMpStatus,t=t.addMpRequested;this.setState({status:e}),t?e&&(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"add_my_mp_show",page_par:{status:e}}):this.remindAddMp()}},{key:"remindAddMp",value:function(){var e=this,a=getApp(),t=a.globalData.appScene;(0,_signIn.addMyMp)({sceneId:t}).then(function(t){t&&t.data&&0==t.data.code&&(a.globalData.addMpRequested=!0),t&&t.data&&(t.data.result?(e.setState({status:1},function(){a.globalData.addMpStatus=e.state.status}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"add_my_mp_show",page_par:{status:1}})):e.setState({status:0},function(){a.globalData.addMpStatus=e.state.status}))})}},{key:"handleClick",value:function(){var t=this,e=getApp();this.setState({status:2},function(){e.globalData.addMpStatus=t.state.status}),(0,_signIn.clickAddMyApp)(),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"add_my_mp_click_first"})}},{key:"handleClose",value:function(){var t=this,e=getApp();this.setState({status:0},function(){e.globalData.addMpStatus=t.state.status}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"add_my_mp_click_second"})}},{key:"componentDidMount",value:function(){}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var t=this.__state,e=t.status,a=t.top,t=1==e?(0,_index.internal_inline_style)({top:a+"rpx"}):null,a=2==e?(0,_index.internal_inline_style)({top:a+"rpx"}):null;return Object.assign(this.__state,{anonymousState__temp:t,anonymousState__temp2:a,styles:_indexModuleScssMap2.default}),this.__state}}]),o}(),_class.$$events=["handleClick","handleClose"],_class.$$componentPath="pages/tabBar/signIn-t/components/addMp/index",_temp2);exports.default=AddMp,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(AddMp));