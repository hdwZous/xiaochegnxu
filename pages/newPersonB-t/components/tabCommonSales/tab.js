"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function r(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,o){return t&&r(e.prototype,t),o&&r(e,o),e}}(),_get=function e(t,o,r){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,o);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(r):void 0:null!==(n=Object.getPrototypeOf(t))?e(n,o,r):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp2=require("../../../../npm/@jd/djmp/common-t/js/epBi/index.weapp.js"),_indexWeapp3=_interopRequireDefault(_indexWeapp2),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function s(){var e,n;_classCallCheck(this,s);for(var t=arguments.length,o=Array(t),r=0;r<t;r++)o[r]=arguments[r];return(e=n=_possibleConstructorReturn(this,(e=s.__proto__||Object.getPrototypeOf(s)).call.apply(e,[this].concat(o)))).$usedState=["loopArray167","productFloorTypes","current","style","beforePress"],n.onPress=function(e){var t,o=e.categoryCode,r=e.categoryName;(0,_indexWeapp.clickReport)({click_id:"selectTab",click_par:{categoryCode:o,categoryName:r,userAction:e.userAction||""}}),o!==n.state.current&&(r=n.props,t=r.onListeningCurrent,(e=r.beforePress)&&e(o),n.setState({current:o},function(){t&&n.props.onListeningCurrent(n.state.current)}))},n.customComponents=[],_possibleConstructorReturn(n,e)}return _inherits(s,_index.Component),_createClass(s,[{key:"_constructor",value:function(e){_get(s.prototype.__proto__||Object.getPrototypeOf(s.prototype),"_constructor",this).call(this,e),this.state={current:e.current||"newPersonB"},this.Exposure=null,this.$$refs=[]}},{key:"componentDidMount",value:function(){var e,t=this;this.props.productFloorTypes&&(e=this.props.productFloorTypes.find(function(e){return"newPersonB"===e.categoryCode}),(0,_indexWeapp.clickReport)({click_id:"selectTab",click_par:{categoryCode:"newPersonB",categoryName:e.categoryName,state:0,userAction:e.userAction}})),this.Exposure=new _indexWeapp3.default(".tabs >>> .tabs_exposure",this.$scope),setTimeout(function(){t.Exposure&&t.Exposure.initObserver&&t.Exposure.initObserver({otherParams:{a:1}})},5e3)}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var o=this.__state.current,e=this.__props.productFloorTypes,r=void 0===e?[]:e,e=r&&0<!!r.length?r.map(function(e,t){return e={$original:(0,_index.internal_get_original)(e)},{$loopState__temp2:r&&0<!!r.length?(0,_index.internal_inline_style)({marginRight:0==t?"12px":"",color:e.$original.categoryCode===o?"#FF3C56":"",fontWeight:e.$original.categoryCode===o?"bold":"",background:e.$original.categoryCode===o?"#fff":""}):null,$original:e.$original}}):[];return Object.assign(this.__state,{loopArray167:e,productFloorTypes:r,style:_indexModuleScssMap2.default}),this.__state}}]),s}(),_class.$$events=["onPress"],_class.$$componentPath="pages/newPersonB-t/components/tabCommonSales/tab";var TabCommonSales=_temp2;exports.default=TabCommonSales,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(TabCommonSales));