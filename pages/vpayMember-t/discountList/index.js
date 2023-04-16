"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);return void 0!==i?"value"in i?i.value:void 0!==(i=i.get)?i.call(o):void 0:null!==(i=Object.getPrototypeOf(t))?e(i,n,o):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_vpayMember=require("../api/vpayMember.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/constants/index.weapp.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function a(){var e,t;_classCallCheck(this,a);for(var n=arguments.length,o=Array(n),i=0;i<n;i++)o[i]=arguments[i];return(e=t=_possibleConstructorReturn(this,(t=a.__proto__||Object.getPrototypeOf(a)).call.apply(t,[this].concat(o)))).$usedState=["$compid__154","$compid__155","style","showLoading","isEmpty","couponList","defaultType","defaultTips","defaultBtnTxt","address"],t.config={navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black",navigationBarTitleText:"会员抵扣红包"},t.customComponents=["Default","RedPackCont"],_possibleConstructorReturn(t,e)}return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.state={showLoading:!0,couponList:[],isEmpty:!1,defaultType:2,defaultTips:"网络开小差了，请稍后再试",defaultBtnTxt:"去首页看看",address:{}},this.$$refs=[]}},{key:"componentDidShow",value:function(){this.getLocation(),(0,_indexWeapp.pvReport)({create_time:new Date,page_name:"showRedenvelopepage",click_par:{}})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__154"),e=(0,_index.genCompid)(e+"$compid__155"),n=this.__state,o=(n.showLoading,n.couponList),i=n.defaultType,a=n.defaultTips,s=n.defaultBtnTxt,n=n.isEmpty;return n&&_index.propsManager.set({defaultType:i,defaultTips:a,defaultBtnTxt:s,defaultTop:"40px",onDefaultEvent:this.onDefaultEvent.bind(this)},t),n||_index.propsManager.set({couponList:o,from:"disCountList",toUse:this.toUse.bind(this)},e),Object.assign(this.__state,{$compid__154:t,$compid__155:e,style:_indexModuleScssMap2.default}),this.__state}},{key:"getDiscountList",value:function(){var t=this,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},n=(0,_indexWeapp2.getStorageSync)(_indexWeapp3.LOGIN_INFO)||{},o={platform:"H5",from:"newVip"};o.userCardType=this.$router.params.userCardType,o.pin=n.PDJ_H5_PIN||"",o.cityId=e.cityId||0,(0,_vpayMember.discountListCont)(o).then(function(e){e&&0==e.code?0==e.result.length?t.setState({defaultType:2,isEmpty:!0,showLoading:!1,defaultTips:"空空如也",defaultBtnTxt:"去首页看看"}):t.setState({couponList:e.result,showLoading:!1,isEmpty:!1}):t.setState({defaultType:2,isEmpty:!0,showLoading:!1,defaultTips:"网络开小差了，请稍后再试",defaultBtnTxt:"去首页看看"})}).catch(function(){t.setState({defaultType:2,isEmpty:!0,showLoading:!1,defaultTips:"网络开小差了，请稍后再试",defaultBtnTxt:"去首页看看"})})}},{key:"getLocation",value:function(){var t=this;(0,_indexWeapp4.getLocation)().then(function(e){e.cityId=e.cityId||e.areaCode||e.cityCode||"",e.cityName=e.city||e.cityName||"",t.setState({address:e||{}}),t.getDiscountList(e)}).catch(function(e){t.getDiscountList()})}},{key:"onDefaultEvent",value:function(){_index2.default.navigateBack({delta:1,success:function(e){},fail:function(e){},complete:function(e){}}).then(function(e){}).catch(function(e){})}},{key:"toUse",value:function(){this.onDefaultEvent()}}]),a}(),_class.$$events=[],_class.$$componentPath="pages/vpayMember-t/discountList/index";var discountList=_temp2;exports.default=discountList,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(discountList,!0));