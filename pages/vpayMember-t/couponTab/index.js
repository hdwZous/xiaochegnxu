"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}}(),_get=function e(t,a,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,a);return void 0!==o?"value"in o?o.value:void 0!==(o=o.get)?o.call(n):void 0:null!==(o=Object.getPrototypeOf(t))?e(o,a,n):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_vpayMember=require("../api/vpayMember.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_goToByCouponWeapp=require("../../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function i(){var e,t;_classCallCheck(this,i);for(var a=arguments.length,n=Array(a),o=0;o<a;o++)n[o]=arguments[o];return(e=t=_possibleConstructorReturn(this,(t=i.__proto__||Object.getPrototypeOf(i)).call.apply(t,[this].concat(n)))).$usedState=["$compid__151","style","isLoading","pageType","anonymousState__temp","anonymousState__temp2","consumeCode","activeIndex","couponListIndex","couponList","allowanceNum","exchangeDesc","nerbyOrg","showPoup","isOpen","address","exchangeData","needCloseBtn","showOverTime","title","text"],t.config={navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black"},t.customComponents=["Loading","PopEx","Pop"],_possibleConstructorReturn(t,e)}return _inherits(i,_index.Component),_createClass(i,[{key:"_constructor",value:function(e){_get(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"_constructor",this).call(this,e),this.state={consumeCode:"",activeIndex:1,couponListIndex:1,couponList:[],allowanceNum:0,exchangeDesc:"",isLoading:!0,nerbyOrg:null,showPoup:!1,isOpen:!1,address:{},exchangeData:{},needCloseBtn:!0,showOverTime:!1,title:"",text:""},this.$$refs=[]}},{key:"componentDidMount",value:function(){this.getLocation();var e=this.$router.params.pageType;(0,_indexWeapp.pvReport)({create_time:new Date,page_name:"clickrenewpage",click_par:{pageType:"redPackage"==e?"会员红包":"会员津贴",url:"/pages/vpayMember-t/couponTab/index"}}),_index2.default.setNavigationBarTitle({title:"redPackage"==e?"会员红包":"会员津贴"})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=(0,_index.genCompid)(e+"$compid__151"),a=this.__state,n=(a.isLoading,a.isOpen),o=a.title,i=a.text,a=a.needCloseBtn,c=this.$router.params.pageType,s="redPackage"==c?this._createRedPackageData(e+"UclDlHkuFI")():null,e=this._createAllowanceData(e+"JHtKQxJJyg")();return _index.propsManager.set({isNeedCloseIcon:a,isShow:n,text:i,title:o,onPopEvent:this.popBtn.bind(this),ok:"确认兑换",quit:"我再想想"},t),Object.assign(this.__state,{$compid__151:t,style:_indexModuleScssMap2.default,pageType:c,anonymousState__temp:s,anonymousState__temp2:e}),this.__state}},{key:"_createCouponData",value:function(o){var i=this;return function(){var e=i.state,t=e.activeIndex,e=e.couponList,a=i.$router.params.pageType,n=i._createEmptyData(o+"WzioKggmAH")();return{couponList:e,activeIndex:t,style:_indexModuleScssMap2.default,pageType:a,anonymousState__temp3:n}}}},{key:"_createAllowanceData",value:function(i){var c=this;return function(){var e=(0,_index.genCompid)(i+"$compid__152"),t=c.state,a=t.showOverTime,n=t.allowanceNum,t=t.exchangeDesc,o=c._createCouponData(i+"VwBfifzfOM")();return _index.propsManager.set({isShow:a,defineSelf:!0,isNeedCloseIcon:!0,onPopEvent:c.onPopEvent.bind(c),onClickPop:c.onClickPop.bind(c)},e),{$compid__152:e,style:_indexModuleScssMap2.default,anonymousState__temp4:o,exchangeDesc:t,allowanceNum:n}}}},{key:"_createEmptyData",value:function(e){return function(){return{style:_indexModuleScssMap2.default}}}},{key:"onClickPop",value:function(){}},{key:"_createRedPackageData",value:function(a){var n=this;return function(){var e=n.state.activeIndex,t=n._createCouponData(a+"pIqqlflwqF")();return{style:_indexModuleScssMap2.default,activeIndex:e,anonymousState__temp5:t}}}},{key:"toRent",value:function(){var e=this.state.address,e=(e.longitude,e.latitude,e.cityId,this.setState({showOverTime:!1}),this.$router.params.vipFlag);(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickButton",click_par:{text:"renew",type:{1:"open",0:"notOpen",3:"past "}[e]}}),(0,_indexWeapp2.navigateTo)("/pages/vpayMember-t/packageSelection/index?vipFlag="+e+"&h5=#newPay")}},{key:"refreshPage",value:function(){this.getCurrentTypeData(2)}},{key:"onPopEvent",value:function(){this.setState({showOverTime:!1})}},{key:"todetail",value:function(){(0,_indexWeapp2.navigateTo)("/pages/vpayMember-t/bountyList/index")}},{key:"tabClick",value:function(e){this.setState({activeIndex:e,couponList:[]}),(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"selectTab",click_par:{status:e}}),this.getCurrentTypeData(e)}},{key:"getLocation",value:function(){var t=this,a="redPackage"==this.$router.params.pageType?1:2;(0,_indexWeapp3.getLocation)().then(function(e){e.cityId=e.cityId||e.areaCode||e.cityCode||"",e.cityName=e.city||e.cityName||"",t.setState({address:e||{}},function(){t.getCurrentTypeData(a)})}).catch(function(e){})}},{key:"getCurrentTypeData",value:function(t){var a=this,e=this.state.address,n=e.longitude,o=e.latitude,i=e.cityId,e=e.userCardType;(0,_vpayMember.tabContentFun)({longitude:n||"",latitude:o||"",cityId:i||"",userCardType:e||-1,tabType:t||1,pageVersion:"v6"}).then(function(e){(0,_indexWeapp2.hideLoading)(),0==e.code?(a.setState({couponList:e.result.data.exchangeInfoList||e.result.data,couponListIndex:t||1,allowanceNum:e.result.data.allowanceNum,exchangeDesc:e.result.exchangeDesc,isLoading:!1}),(0,_indexWeapp.clickReport)({click_id:{1:"vip_keyonghongbao",2:"vip_jintieduihuan",3:"vip_daifafang"}[t]})):a.setState({isLoading:!1})}).catch(function(e){a.setState({isLoading:!1}),(0,_indexWeapp2.hideLoading)()})}},{key:"toUse",value:function(e){(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickUse"}),(0,_goToByCouponWeapp.goToByCouponId)({couponId:e.couponId,code:e.activityCode})}},{key:"popBtn",value:function(e){"close"==e.type&&this.setState({isOpen:!1}),"content"==e.type&&(this.setState({isOpen:!1}),this.confirmExchange())}},{key:"confirmExchange",value:function(){var t=this,e=this.state.exchangeData,a=this.state.address||{},n=a.cityId,o=a.longitude,a=a.latitude;(0,_vpayMember.api_exchangeconFirm)({showName:e.showName||"",exchangeType:e.exchangeType||"",activityCode:e.activityCode||"",couponId:e.couponId||"",quota:e.quota||"",threshold:e.threshold||"",expendAllowance:e.expendAllowance||"",createPin:e.createPin||"",longitude:o,latitude:a,cityId:n,uuid:e.uuid}).then(function(e){0==e.code?((0,_indexWeapp2.showToast)({title:e.msg||"兑换成功"}),setTimeout(function(){t.refreshPage()},1e3)):(0,_indexWeapp2.showToast)({title:e.msg||"兑换失败，请稍后重试"})}).catch(function(e){(0,_indexWeapp2.showToast)({title:e.msg||"兑换失败，请稍后重试"})})}},{key:"toExchange",value:function(t){var e,a,n=this,o=this.$router.params.vipFlag;(0,_indexWeapp.clickReport)({create_time:new Date,click_id:"clickButton",click_par:{text:"exchange",type:{1:"open",0:"notOpen",3:"past "}[o]}}),3==o?this.setState({showOverTime:!0}):0==t.exchangeState?(e=(o=this.state.address||{}).cityId,a=o.longitude,o=o.latitude,(0,_vpayMember.api_exchangeconCheck)({showName:t.showName||"",exchangeType:t.exchangeType||"",activityCode:t.activityCode||"",couponId:t.couponId||"",quota:t.quota||"",threshold:t.threshold||"",expendAllowance:t.expendAllowance||"",createPin:t.createPin||"",longitude:a,latitude:o,cityId:e,uuid:t.uuid}).then(function(e){0==e.code?n.setState({title:e.result.exchangeName||"",text:e.result.exchangeText,isOpen:!0,exchangeData:t}):(0,_indexWeapp2.showToast)({title:e.msg||"兑换失败，请稍后重试"})}).catch(function(e){(0,_indexWeapp2.showToast)({title:e.msg||"兑换失败，请稍后重试"})})):this.toUse(t)}}]),i}(),_class.$$events=["toUse","toExchange","todetail","onPopEvent","toRent","tabClick"],_class.multipleSlots=!0,_class.$$componentPath="pages/vpayMember-t/couponTab/index";var couponTab=_temp2;exports.default=couponTab,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(couponTab,!0));