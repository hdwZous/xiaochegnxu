"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(o):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,n,o):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function s(){var e,t;_classCallCheck(this,s);for(var n=arguments.length,o=Array(n),r=0;r<n;r++)o[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=s.__proto__||Object.getPrototypeOf(s)).call.apply(t,[this].concat(o)))).$usedState=["anonymousState__temp","anonymousState__temp2","anonymousState__temp3","anonymousState__temp4","anonymousState__temp5","anonymousState__temp6","cssDefined","style","day","hour","minute","second","timer","refreshFlag","timeFormat","cssObj","time"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={day:"00",hour:"00",minute:"00",second:"00",timer:null,refreshFlag:!1},this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props,t=e.cssDefined,e=(e.timeFormat,e.cssObj),n=t?(0,_index.internal_inline_style)({color:e.color}):null,o=t?(0,_index.internal_inline_style)({"background-color":e.bg}):null,r=t?(0,_index.internal_inline_style)({color:e.bg}):null,s=t?(0,_index.internal_inline_style)({"background-color":e.bg}):null,i=t?(0,_index.internal_inline_style)({color:e.bg}):null,e=t?(0,_index.internal_inline_style)({"background-color":e.bg}):null;return Object.assign(this.__state,{anonymousState__temp:n,anonymousState__temp2:o,anonymousState__temp3:r,anonymousState__temp4:s,anonymousState__temp5:i,anonymousState__temp6:e,cssDefined:t,style:_indexModuleScssMap2.default}),this.__state}},{key:"componentDidMount",value:function(){this.clearTime(),this.state.refreshFlag!=this.props.refreshFlag&&this.initTime()}},{key:"componentDidUpdate",value:function(e,t){}},{key:"componentWillUnmount",value:function(){this.setState({refreshFlag:!1}),clearInterval(this.state.timer)}},{key:"clearTime",value:function(){clearInterval(this.state.timer)}},{key:"initTime",value:function(){this.clearTime(),this.props.time&&this.showCountDown(this.props.time),this.setState({refreshFlag:this.props.refreshFlag})}},{key:"showCountDown",value:function(e){var t=this;(0,_indexWeapp.countDown)(e,function(e){e.end?t.setState({day:"00",hour:"00",minute:"00",second:"00",timer:null}):t.setState({day:e.day,hour:e.hour,minute:e.minute,second:e.second,timer:e.timer})})}}]),s}(),_class.$$events=[],_class.$$componentPath="pages/friendHelp/components/Countdown/index";var Countdown=_temp2;exports.default=Countdown,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Countdown));