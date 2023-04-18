"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n,o=arguments[t];for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,n);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(o):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,n,o):void 0},_index=require("../../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../../npm/@jd/djmp/common-t/js/epBi/index.weapp.js"),_indexWeapp2=_interopRequireDefault(_indexWeapp),_indexWeapp3=require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var isWeapp=!0,InflateCoupon=(_temp2=_class=function(){function i(){var e,r;_classCallCheck(this,i);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return(e=r=_possibleConstructorReturn(this,(e=i.__proto__||Object.getPrototypeOf(i)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp","loopArray165","loopArray166","channelList","style","scrollLeft","current","showList","isShowAll","currentChannelId","showListNum","traceId","appVersion","inflateFloorInfo","sharpLeft","toStore"],r.initTabLeft=function(){(r.props.inflateFloorInfo||{}).channelList.forEach(function(t){_index2.default.createSelectorQuery().in(r.$scope).select("#tab"+t.channelId).boundingClientRect(function(e){r.tabListLeft["tab"+t.channelId]=e.left}).exec()}),setTimeout(function(){var e=(r.props.inflateFloorInfo||{}).currentChannelId,e=r.state.currentChannelId||e;r.setState({scrollLeft:r.tabListLeft["tab"+e]-r.screenWidth/3})},200)},r.tabSel=function(e){r.state.currentChannelId!=e&&(r.tabListLeft["tab"+e]?r.setState({currentChannelId:e,scrollLeft:r.tabListLeft["tab"+e]-r.screenWidth/3}):r.setState({currentChannelId:e}),setTimeout(function(){r.Exposure2&&r.Exposure2.initObserver&&r.Exposure2.initObserver({otherParams:r.epParams})},1e3))},r.showMore=function(e,t){var n=r.state.showListNum;n["p"+e]=t?3:(n["p"+e]||3)+3,r.setState({showListNum:n}),t&&_index2.default.pageScrollTo({scrollTop:0})},r.getShowData=function(){var e=r.props.inflateFloorInfo||{},t=e.channelList,e=e.currentChannelId,n=r.state.currentChannelId||e,o=r.state.showListNum["p"+n]||3,e=(t.find(function(e){return e.channelId==n}).inflateOrgList||[]).slice(0,15),t=o>=e.length;return{showList:e=e.map(function(e,t){return _extends({},e,{isShow:t+1<=o})}),isShowAll:t,current:n}},r.initClickReport=function(){var e=r.props.inflateFloorInfo||{},t=e.currentChannelId,e=e.channelList.find(function(e){return e.channelId==t});r.clickPeport(e,{state:"0"})},r.clickPeport=function(e){(0,_indexWeapp3.clickReport)({click_id:"selectTab",page_name:"newPersonB",click_par:_extends({userAction:e.userAction,channelId:e.channelId},1<arguments.length&&void 0!==arguments[1]?arguments[1]:{})})},r.anonymousFunc0Map={},r.customComponents=["Coupon"],_possibleConstructorReturn(r,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.userAction={},this.state={currentChannelId:null,showListNum:{},scrollLeft:0},this.tabListLeft={},this.screenWidth=_index2.default.getSystemInfoSync().screenWidth,this.epParams={traceId:this.props.traceId,app_version:this.props.appVersion,page_name:"newPersonB"},this.$$refs=[]}},{key:"componentDidMount",value:function(){var e=this;this.Exposure=new _indexWeapp2.default(".content_coupon >>> .tab_ep",this.$scope),this.Exposure2=new _indexWeapp2.default(".content_coupon >>> .coupon_ep",this.$scope);var t=(this.props.inflateFloorInfo||{}).channelList;if(!t||0==t.length)return null;this.initTabLeft(),this.initClickReport(),setTimeout(function(){e.Exposure&&e.Exposure.initObserver&&e.Exposure.initObserver({otherParams:e.epParams}),e.Exposure2&&e.Exposure2.initObserver&&e.Exposure2.initObserver({otherParams:e.epParams})},1100)}},{key:"shouldComponentUpdate",value:function(e,t){}},{key:"_createData",value:function(){var e,t,n,o,r,i,s=this,a=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),l=(this.__props.inflateFloorInfo||{}).channelList;return l&&0!=l.length?(r=this.__props.sharpLeft,this.__state.scrollLeft,e=(o=this.getShowData()).showList,t=o.isShowAll,n=o.current,o=(0,_index.internal_inline_style)(r?{left:r}:{}),this.anonymousFunc1=function(){s.showMore(n,t)},r=l.map(function(e,t){e={$original:(0,_index.internal_get_original)(e)};t="KuQJL"+t;return s.anonymousFunc0Map[t]=function(){s.clickPeport(e.$original),s.tabSel(e.$original.channelId)},{_$indexKey:t,$original:e.$original}}),i=e.map(function(e,t){e={$original:(0,_index.internal_get_original)(e)};var n=(0,_index.genCompid)(a+"sHbKBNgLfR"+t);return _index.propsManager.set({item:e.$original,index:t,toStore:s.__props.toStore},n),{$compid__310:n,$original:e.$original}}),Object.assign(this.__state,{anonymousState__temp:o,loopArray165:r,loopArray166:i,channelList:l,style:_indexModuleScssMap2.default,current:n,showList:e,isShowAll:t}),this.__state):null}},{key:"anonymousFunc0",value:function(e,t){return this.anonymousFunc0Map[e]&&this.anonymousFunc0Map[e](t)}},{key:"anonymousFunc1",value:function(e){}}]),i}(),_class.$$events=["anonymousFunc0","anonymousFunc1"],_class.$$componentPath="pages/newPersonB-t/components/inflateCoupon/index",_temp2);exports.default=InflateCoupon,Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(InflateCoupon));