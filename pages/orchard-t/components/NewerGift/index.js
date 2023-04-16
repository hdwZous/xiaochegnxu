"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}(),_get=function e(t,i,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,i);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(n):void 0:null!==(o=Object.getPrototypeOf(t))?e(o,i,n):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp2=require("../../js/lottieUtil/index.weapp.js"),_indexWeapp3=require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_orchard=require("../../api/orchard.js"),_utils=require("../../js/utils.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var weapp=!0,REPORT={shownewgiftPopup:function(e){(0,_indexWeapp.clickReport)({click_id:"shownewgift",click_par:{id:e.id,data:e.items}})},clicknewgiftPopup:function(e){(0,_indexWeapp.clickReport)({click_id:"clicknewgift",click_par:{id:e.id,state:e.state,welfareVal:e.welfareVal}})}},isWeapp=!0,aniLottieNew=null,NewerGift=(_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var i=arguments.length,n=Array(i),o=0;o<i;o++)n[o]=arguments[o];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(n)))).$usedState=["anonymousState__temp4","anonymousState__temp5","indexLayerData","layerBgColor","style","newerGiftAni","newerGiftPop","anonymousState__temp","anonymousState__temp2","anonymousState__temp3","newerGiftLayer","recPacketInfo","layerShowFlag","newerGiftInfo","transition","clickAnimation","showGetWaterToast","handleShowPriorityPopFlag","handlePriorityPop","closeNewGiftLayer","isLargeScreen"],t.customComponents=[],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={layerShowFlag:!1,layerBgColor:!1,newerGiftAni:!1,newerGiftLayer:!1,newerGiftPop:!1,newerGiftInfo:{},recPacketInfo:{},transition:{opacity:"1"},clickAnimation:!1},this.$$refs=[]}},{key:"refreshAni",value:function(){var e=this;setTimeout(function(){wx.createSelectorQuery().in(e.$scope).select("#new_box_lottie").node(function(e){(0,_indexWeapp2.initNewerGiftLottie)(e).then(function(e){aniLottieNew=e}).catch(function(e){})}).exec()},200)}},{key:"clickAnimationForNewer",value:function(e){var t=this;this.setState({clickAnimation:!0},function(){setTimeout(function(){t.setState({clickAnimation:!1})},_utils.clickAnimationGap)})}},{key:"showNewerGiftAni",value:function(t,e){var i=this,n=this.props.indexLayerData;this.clickAnimationForNewer(e),setTimeout(function(){(0,_orchard.takeIndexLayerWelfareFunc)({indexLayerId:n.id,indexLayerItemId:t.id}).then(function(e){0==e.code?(3==t.index?i.setState({newerGiftAni:!0,layerShowFlag:!0,newerGiftPop:!1,recPacketInfo:t},function(){aniLottieNew&&aniLottieNew.play(),setTimeout(function(){i.setState({newerGiftLayer:!0})},1500),aniLottieNew?aniLottieNew.addEventListener("complete",function(){i.setState({newerGiftAni:!0,newerGiftLayer:!0}),setTimeout(function(){i.closePopShowGetWater(),setTimeout(function(){i.props.showGetWaterToast(t.welfareVal,!0)},200)},1300)}):setTimeout(function(){i.setState({newerGiftAni:!0,newerGiftLayer:!0}),setTimeout(function(){i.closePopShowGetWater(),setTimeout(function(){i.props.showGetWaterToast(t.welfareVal,!0)},200)},1300)},1300)}):(i.closePop(),setTimeout(function(){i.props.showGetWaterToast(t.welfareVal,!0)},200)),REPORT.clicknewgiftPopup(t)):(0,_indexWeapp3.showToast)({title:e.msg||"网络开小差，请稍后重试"})}).catch(function(e){(0,_indexWeapp3.showToast)({title:e.msg||"网络开小差，请稍后重试"})})},500)}},{key:"callSuperPriority",value:function(){var e=this;setTimeout(function(){e.props.handleShowPriorityPopFlag(),e.props.handlePriorityPop()},500)}},{key:"closePopShowGetWater",value:function(){var e=this;aniLottieNew&&aniLottieNew.stop&&aniLottieNew.stop(),this.setState({layerShowFlag:!1,newerGiftAni:!1}),setTimeout(function(){e.callSuperPriority()},1300)}},{key:"showNewerGiftPop",value:function(){this.setState({layerShowFlag:!0,layerBgColor:!1,newerGiftPop:!0});var e=this.props.indexLayerData;REPORT.shownewgiftPopup(e)}},{key:"componentWillReceiveProps",value:function(e){e=e.isLargeScreen;e&&this.setState({isLargeScreen:e,transition:{opacity:"1",transform:"translateX(0px) translateY(0px) scale(0.75)"}})}},{key:"componentDidMount",value:function(){var e=this;setTimeout(function(){e.refreshAni()},2e3)}},{key:"componentWillUnmount",value:function(){aniLottieNew&&aniLottieNew.destroy&&aniLottieNew.destroy()}},{key:"closePop",value:function(){this.props&&this.props.closeNewGiftLayer&&this.props.closeNewGiftLayer()}},{key:"setStateForClose",value:function(o){var a=this;_index2.default.createSelectorQuery();_index2.default.createSelectorQuery().in(this.$scope).selectAll("#new_box_layout").boundingClientRect(function(e){var t,i,n;e[0]?(t=o.top+o.height/2,i=e[0].top+e[0].height/2,n=o.left+o.width/2,e=e[0].left+e[0].width/2,a.refrushForClose(n-e,t-i)):a.refrushForClose()}).exec()}},{key:"refrushForClose",value:function(){var e=this;this.setState({layerBgColor:!0,transition:{opacity:"1",transform:"translateX("+(0<arguments.length&&void 0!==arguments[0]?arguments[0]:-100)+"px) translateY("+(1<arguments.length&&void 0!==arguments[1]?arguments[1]:-200)+"px) scale(0)"}},function(){setTimeout(function(){e.setState({layerShowFlag:!1,newerGiftPop:!1,animateClose:"",transition:{opacity:"1",transform:"translateX(0px) translateY(0px) scale(0.75)"}}),e.callSuperPriority()},600)})}},{key:"_createItemStatusData",value:function(e){var i=this;return function(e){var t=i.state.clickAnimation?_utils.clickAnimationName:"";return{style:_indexModuleScssMap2.default,item:e,className:t}}}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=this.__props.indexLayerData,i=this.__state,n=i.layerShowFlag,n=void 0!==n&&n,o=(i.newerGiftAni,i.newerGiftLayer,i.newerGiftPop,i.newerGiftInfo,i.recPacketInfo,i.transition),i=(i.layerBgColor,t&&t.items?this._createItemStatusData(e+"FrUpiEEDeY")(t.items[0]):null),a=t&&t.items?this._createItemStatusData(e+"OYgSpikJlH")(t.items[1]):null,e=t&&t.items?this._createItemStatusData(e+"BNdboGDbaV")(t.items[2]):null,n=t&&t.items?(0,_index.internal_inline_style)(n?"":"visibility: hidden;"):null,o=t&&t.items?(0,_index.internal_inline_style)(o):null;return Object.assign(this.__state,{anonymousState__temp4:n,anonymousState__temp5:o,indexLayerData:t,style:_indexModuleScssMap2.default,anonymousState__temp:i,anonymousState__temp2:a,anonymousState__temp3:e}),this.__state}}]),a}(),_class.$$events=["showNewerGiftAni","closePop"],_class.multipleSlots=!0,_class.$$componentPath="pages/orchard-t/components/NewerGift/index",_temp2);exports.default=NewerGift,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(NewerGift));