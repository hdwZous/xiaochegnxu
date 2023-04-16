"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,o){return t&&n(e.prototype,t),o&&n(e,o),e}}(),_get=function e(t,o,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,o);return void 0!==r?"value"in r?r.value:void 0!==(r=r.get)?r.call(n):void 0:null!==(r=Object.getPrototypeOf(t))?e(r,o,n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_vpayMember=require("../api/vpayMember.js"),_envelopesRecordModuleScssMap=require("./envelopesRecord.module.scss.map.js"),_envelopesRecordModuleScssMap2=_interopRequireDefault(_envelopesRecordModuleScssMap),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var o=arguments.length,n=Array(o),r=0;r<o;r++)n[r]=arguments[r];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(n)))).$usedState=["loopArray19","loopArray20","$compid__148","$compid__149","isLoading","tipMsg","style","showCloseEntrance","recordList","validFlagObj","tipType"],t.config={navigationBarBackgroundColor:"#f4f4f4",navigationBarTextStyle:"black",navigationBarTitleText:"购买记录"},t.customComponents=["Loading","Default","Tip"],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={tipType:"",tipMsg:"",isLoading:!0,recordList:[]},this.$$refs=[]}},{key:"componentDidShow",value:function(){var t=this;(0,_indexWeapp.pvReport)({create_time:new Date,page_name:"vipRecord",page_par:{url:"/pages/vpayMember-t/envelopesRecord/index"}}),this.getContractInfo(),(0,_vpayMember.api_buy_record)({}).then(function(){var e=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}).result;t.setState({recordList:e,isLoading:!1})}).catch(function(){t.setState({isLoading:!1,tipType:"noWifi",tipMsg:"网络异常，请稍后再试~"})})}},{key:"componentDidMount",value:function(){}},{key:"getContractInfo",value:function(){var t=this;(0,_vpayMember.getContractHistoryState)().then(function(e){t.setState({showCloseEntrance:e.result})}).catch(function(e){})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__148"),e=(0,_index.genCompid)(e+"$compid__149"),o=this.__state,n=o.isLoading,r=o.tipType,i=o.tipMsg,a=o.recordList,o=o.showCloseEntrance,s={"进行中":_envelopesRecordModuleScssMap2.default.normal,"待发放":_envelopesRecordModuleScssMap2.default.pre,"已过期":_envelopesRecordModuleScssMap2.default.overtime},l=i?[]:a.map(function(e,t){return e={$original:(0,_index.internal_get_original)(e)},e={$original:(0,_index.internal_get_original)(e.$original)},{$loopState__temp2:a&&0<a.length?"list"+t:null,$original:e.$original}}),p=a&&0<a.length?a.map(function(e,t){return e={$original:(0,_index.internal_get_original)(e)},e={$original:(0,_index.internal_get_original)(e.$original)},{$loopState__temp2:a&&0<a.length?"list"+t:null,$original:e.$original}}):[];return n||i||a&&0<a.length||_index.propsManager.set({defaultType:2,defaultTips:"暂无数据"},t),!n&&i&&_index.propsManager.set({type:r,msg:i,handlerReload:this.handlerReload},e),Object.assign(this.__state,{loopArray19:l,loopArray20:p,$compid__148:t,$compid__149:e,style:_envelopesRecordModuleScssMap2.default,showCloseEntrance:o,validFlagObj:s}),this.__state}},{key:"toManageRenew",value:function(){(0,_index.navigateTo)({url:"/pages/vpayMember-t/manageRenew/index?flag="+this.state.showCloseEntrance})}}]),i}(),_class.$$events=["toManageRenew"],_class.$$componentPath="pages/vpayMember-t/envelopesRecord/index";var envelopesRecord=_temp2;exports.default=envelopesRecord,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(envelopesRecord,!0));