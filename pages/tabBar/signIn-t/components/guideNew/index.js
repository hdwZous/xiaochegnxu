"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var s=0;s<t.length;s++){var o=t[s];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,s){return t&&o(e.prototype,t),s&&o(e,s),e}}(),_get=function e(t,s,o){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,s);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(o):void 0:null!==(n=Object.getPrototypeOf(t))?e(n,s,o):void 0},_index=require("../../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_statusAction2=require("../../js/statusAction.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var s=arguments.length,o=Array(s),n=0;n<s;n++)o[n]=arguments[n];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(o)))).$usedState=["$compid__221","$compid__222","$compid__223","style","showPop","guideIndex","styleDec","taskWidth","taskHeight","taskTop","isScrollDone","pos","sevenDaysReward","hasSiderData","statusAction"],t.config={navigationBarTitleText:""},t.customComponents=["GuideBean","GuideTask","GuideBeanKill"],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.shareFlag=!0,this.state={styleDec:{},guideIndex:-1,taskWidth:0,taskHeight:0,taskTop:0,isScrollDone:!0},this.$$refs=[]}},{key:"componentDidHide",value:function(){this.setState({guideIndex:-1})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__221"),s=(0,_index.genCompid)(e+"$compid__222"),e=(0,_index.genCompid)(e+"$compid__223"),o=this.__props,n=o.pos,o=(o.sevenDaysReward,o.hasSiderData,o.showPop),i=this.__state,a=i.guideIndex,r=i.taskWidth,c=i.taskHeight,p=i.taskTop,i=i.isScrollDone;return 0==a&&_index.propsManager.set({statusAction:this.statusAction.bind(this)},t),1==a&&_index.propsManager.set({tWidth:r,tHeight:c,tTop:p,isScrollDone:i,statusAction:this.statusAction.bind(this)},s),2==a&&_index.propsManager.set({pos:n,statusAction:this.statusAction.bind(this)},e),Object.assign(this.__state,{$compid__221:t,$compid__222:s,$compid__223:e,style:_indexModuleScssMap2.default,showPop:o}),this.__state}},{key:"statusAction",value:function(e,t,s){_statusAction2.statusAction.apply(void 0,[this].concat(Array.prototype.slice.call(arguments)))}},{key:"setNewBeneftScrolls",value:function(){this.props.statusAction(["setNewBeneftScroll"])}},{key:"setGuideTaskNews",value:function(){this.props.statusAction(["setTaskScroll"]),this.setState({isScrollDone:!1})}},{key:"exchangeGoods",value:function(){this.props.statusAction("NewBenefit",["exchangeEventByGuideOpe"])}},{key:"openBeanShare",value:function(){this.props.statusAction(["openBeansSharePop"])}}]),i}(),_class.$$events=[],_class.$$componentPath="pages/tabBar/signIn-t/components/guideNew/index";var Index=_temp2;exports.default=Index,Component(require("../../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index));