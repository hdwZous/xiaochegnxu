"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,o,n):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function s(){var e,t;_classCallCheck(this,s);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=s.__proto__||Object.getPrototypeOf(s)).call.apply(t,[this].concat(n)))).$usedState=["style","defineSelf","isNeedCloseIcon","isShow","children"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.$$refs=[]}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var e=this.__props.defineSelf;return this.__props.isNeedCloseIcon,Object.assign(this.__state,{style:_indexModuleScssMap2.default,defineSelf:e}),this.__state}},{key:"onClosePop",value:function(e){e.stopPropagation(),this.props.onPopEvent({type:"close"})}},{key:"onClickPop",value:function(e){e.stopPropagation(),this.props.onPopEvent({type:"content",params:{}})}}]),s}(),_class.$$events=["onClosePop","onClickPop"],_class.$$componentPath="pages/hackOrder-t/commonComponents/Pop/index";var Pop=_temp2;exports.default=Pop,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Pop));