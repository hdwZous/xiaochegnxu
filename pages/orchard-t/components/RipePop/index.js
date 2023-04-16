"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function i(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}}(),_get=function t(e,n,i){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(i):void 0:null!==(o=Object.getPrototypeOf(e))?t(o,n,i):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp=require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js");function _interopRequireDefault(t){return t&&t.__esModule?t:{default:t}}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(t)return!e||"object"!=typeof e&&"function"!=typeof e?t:e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var REPORT={},isWeapp=!0,weapp=!0,RipePop=(_temp2=_class=function(){function a(){var t,e;_classCallCheck(this,a);for(var n=arguments.length,i=Array(n),o=0;o<n;o++)i[o]=arguments[o];return(t=e=_possibleConstructorReturn(this,(e=a.__proto__||Object.getPrototypeOf(a)).call.apply(e,[this].concat(i)))).$usedState=["anonymousState__temp","anonymousState__temp2","anonymousState__temp3","anonymousState__temp4","anonymousState__temp5","anonymousState__temp6","anonymousState__temp7","anonymousState__temp8","style","isShowTitleAni","isShowLight","isShowFlower","fruitData","isShowBag","isShowTree","isShowBtnAni","transition","transitionBtn","transitionTitle","transitionSecTitle","transitionHand","transitionTree","transitionLight","layerShowFlag","handleRipeBtn"],e.customComponents=[],_possibleConstructorReturn(e,t)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(t){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,t),this.state={transition:{opacity:"0"},transitionBtn:{opacity:"0"},transitionTitle:{opacity:"0"},transitionSecTitle:{opacity:"0"},transitionHand:{opacity:"0"},transitionTree:{opacity:"0"},transitionLight:{opacity:"0"},isShowFlower:!1,layerShowFlag:!1,isShowTree:!1,isShowBag:!1,isShowBtnAni:!1,isShowTitleAni:!1,isShowLight:!1},this.$$refs=[]}},{key:"componentDidMount",value:function(){}},{key:"handleClick",value:function(){this.setState({transition:{opacity:"0"},transitionBtn:{opacity:"0"},transitionTitle:{opacity:"0"},transitionSecTitle:{opacity:"0"},transitionHand:{opacity:"0"},transitionTree:{opacity:"0"},transitionLight:{opacity:"0"},layerShowFlag:!1,isShowTree:!1,isShowBag:!1,isShowBtnAni:!1,isShowTitleAni:!1,isShowLight:!1,isShowFlower:!1}),this.props.handleRipeBtn&&this.props.handleRipeBtn(),(0,_indexWeapp.showToast)({title:"兑换成功，填写收货地址"})}},{key:"setStateForAni",value:function(){var e=this;_index2.default.createSelectorQuery();_index2.default.createSelectorQuery().in(this.$scope).selectAll("#btnAni").boundingClientRect(function(t){t[0]&&(t=t[0].height+t[0].top-20,e.setState({transitionBtn:{opacity:"1",transform:"translateY("+t+"px) scale(0.1)"},layerShowFlag:!0},function(){setTimeout(function(){e.setState({transitionBtn:{opacity:"1",transform:"translateY(0px) scale(1)",transition:"0.25s linear 0s"},transitionTitle:{opacity:"1"},isShowTitleAni:!0},function(){setTimeout(function(){e.setState({isShowBtnAni:!0},function(){setTimeout(function(){e.setState({isShowLight:!0,transitionTree:{opacity:"1"},isShowTree:!0},function(){setTimeout(function(){e.setState({transitionLight:{opacity:"1"},isShowFlower:!0},function(){setTimeout(function(){e.setState({isShowFlower:!1})},4e3)})},1050),setTimeout(function(){e.setState({transitionTree:{opacity:"0"},transition:{opacity:"1"},transitionHand:{opacity:"1"},transitionSecTitle:{opacity:"1"},isShowBag:!0},function(){})},1e3)})},80)})},250)})},300)}))}).exec()}},{key:"handlePopClick",value:function(){}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};this.$prefix;var t=this.__state,e=t.layerShowFlag,n=t.transition,i=t.transitionBtn,o=t.transitionTitle,a=(t.isShowFlower,t.transitionSecTitle),s=t.transitionLight,r=t.transitionHand,l=t.transitionTree,t=(t.isShowLight,t.isShowTree,t.isShowBag,t.isShowBtnAni,t.isShowTitleAni,this.__props.fruitData),e=(0,_index.internal_inline_style)(e?"":"visibility: hidden;"),o=(0,_index.internal_inline_style)(o),a=(0,_index.internal_inline_style)(a),s=(0,_index.internal_inline_style)(s),n=t&&t.secIcon?(0,_index.internal_inline_style)(n):null,l=(0,_index.internal_inline_style)(l),i=(0,_index.internal_inline_style)(i),r=(0,_index.internal_inline_style)(r);return Object.assign(this.__state,{anonymousState__temp:e,anonymousState__temp2:o,anonymousState__temp3:a,anonymousState__temp4:s,anonymousState__temp5:n,anonymousState__temp6:l,anonymousState__temp7:i,anonymousState__temp8:r,style:_indexModuleScssMap2.default,fruitData:t}),this.__state}}]),a}(),_class.$$events=["handleClick"],_class.$$componentPath="pages/orchard-t/components/RipePop/index",_temp2);exports.default=RipePop,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(RipePop));