"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function a(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}}(),_get=function e(t,i,a){null===t&&(t=Function.prototype);var n=Object.getOwnPropertyDescriptor(t,i);return void 0!==n?"value"in n?n.value:void 0!==(n=n.get)?n.call(a):void 0:null!==(n=Object.getPrototypeOf(t))?e(n,i,a):void 0},_index=require("../../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_vpayMember=require("../api/vpayMember.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap),_indexWeapp=require("../../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_indexWeapp3=require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp4=require("../../../npm/@jd/djmp/common-t/js/cookie/index.weapp.js"),_indexWeapp5=require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),_indexWeapp6=require("../../../npm/@jd/djmp/common-t/js/env/index.weapp.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}_temp2=_class=function(){function o(){var e,t;_classCallCheck(this,o);for(var i=arguments.length,a=Array(i),n=0;n<i;n++)a[n]=arguments[n];return(e=t=_possibleConstructorReturn(this,(t=o.__proto__||Object.getPrototypeOf(o)).call.apply(t,[this].concat(a)))).$usedState=["_$anonymousState__temp","loopArray24","$compid__157","$compid__158","$compid__159","$compid__160","$compid__161","$compid__162","$compid__163","$compid__164","tipType","style","isAB","purchasePageResult","isDaojiaApp","isAndroid","djAppVersion","userCardType","isNewPayFnByApi","btnData","isShowPayResult","showPayResultNum","showRenewFlag","showBtnAnim","storeId","isLoading","tipMsg","orderId","currentInterests","objParams","showRenewTip","payList","isToPage"],t.config={navigationBarTitleText:"开通会员",navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black"},t.getPaySource=function(){return(_indexWeapp6.isWeixin?"isWeixin":_indexWeapp6.isDaojiaApp&&"isDaojiaApp")||_indexWeapp6.isJDReactNativeWebView&&"isJDReactNativeWebView"||"isMiniProgram"},t.customComponents=["Tip","Skeleton","PackageItem","NoneData","Interests","BottomBtnPlusWrapNew","PayList","RightsArea","H5PayResult","Pop"],_possibleConstructorReturn(t,e)}return _inherits(o,_index.Component),_createClass(o,[{key:"_constructor",value:function(e){var t=this;_get(o.prototype.__proto__||Object.getPrototypeOf(o.prototype),"_constructor",this).call(this,e),this.state={showBtnAnim:!0,userCardType:this.$router.params.userCardType||null,storeId:1,tipType:"",isLoading:!0,tipMsg:"",orderId:-1,purchasePageResult:new Array(3).fill({cardType:-1,cardName:"未知",noticeTitle:"未知",tipText:"未知",originPrice:"未知",firstMonthPrice:"",priceWord:"未知",payToken:"未知",redPacketId:"未知"}),currentInterests:{redPackageList:new Array(4).fill({quota:"无",quotaUnit:"¥",limitWord:"未知"}),interestList:new Array(1).fill({url:""})},objParams:{},btnData:{cardType:-1,cardName:"",noticeTitle:"",tipText:"",originPrice:"",priceWord:"",firstMonthPrice:"",payToken:"",redPacketId:"",buyTip:""},showRenewTip:!1,payList:[],isShowPayResult:(0,_indexWeapp4.getCookie)("wxWebPay"),showPayResultNum:0,isNewPayFnByApi:"A",isAB:"old_page",isToPage:!1},this.$$refs=[{type:"component",id:"yMbVe",refName:"",fn:function(e){return t.childSkeleton=e}},{type:"component",id:"TpHPI",refName:"",fn:function(e){return t.childPay=e}}]}},{key:"componentDidMount",value:function(){this.childPay.refreshbCallInDjApp&&this.childPay.refreshbCallInDjApp()}},{key:"componentDidShow",value:function(){var e=this;if(this.state.isToPage){var t=_index2.default.getApp().globalData||{},i=t.referrerInfo,i=void 0===i?{}:i,a=t.appScene,t=t.vp_entrust_pay,n=void 0===t?"":t,t=i.appId,i=i.extraData;if(1038===a&&"wxbd687630cd02ce1d"==t&&(void 0===i||"SUCCESS"==i.return_code))return void this.setState({isToPage:!1},function(){e.tovPentrustPayPage(n)})}this.state.isShowPayResult;setTimeout(function(){e.childSkeleton&&e.childSkeleton.initSkeleton&&e.childSkeleton.initSkeleton()},0),this.login(),_index2.default.pageScrollTo({scrollTop:0}),(0,_indexWeapp3.pvReport)({create_time:new Date,page_par:{vPlusSet:"packageSelection"}}),(0,_indexWeapp3.clickReport)({create_time:new Date,click_id:"show_old_vip_packageSelection"})}},{key:"tovPentrustPayPage",value:function(e){var t=this.getParams(this.$router.params);wx.navigateTo({url:"/pages/vpaymember_t/payResult/index?businessContractCode="+e+"&"+t,success:function(e){_index2.default.getApp().globalData.referrerInfo={}}})}},{key:"getParams",value:function(t){var i="";return Object.keys(t).forEach(function(e){i=""===i?e+"="+t[e]:i+"&"+e+"="+t[e]}),i}},{key:"isToPageEvent",value:function(){this.setState({isToPage:!0})}},{key:"showRenewFlagAlert",value:function(){this.setState({showRenewFlag:!0})}},{key:"closeAlert",value:function(){this.setState({showRenewFlag:!1})}},{key:"login",value:function(){var t=this,i=this;(0,_indexWeapp.isLogin)().then(function(){i.loadPage();try{(0,_vpayMember.abProductList)().then(function(e){t.setState({isAB:0==e.code?e.result:"old_page"})}).catch(function(e){t.setState({isAB:"old_page"})})}catch(e){t.setState({isAB:"old_page"})}}).catch(function(e){i.setState({isLoading:!1,tipType:"unLogin",tipMsg:"您还未登录哦~",purchasePageResult:[],currentInterests:{}})})}},{key:"loadPage",value:function(){this.getLocationPlus()}},{key:"getLocationPlus",value:function(){var i=this;(0,_indexWeapp2.getLocation)().then(function(e){var t=i.state.userCardType;i.getPurchasePageInfo(e,void 0===t?null:t),i.setState({objParams:e})}).catch(function(){i.setState({isLoading:!1,tipType:"noWifi",tipMsg:"未获取到地理位置",purchasePageResult:[],currentInterests:{}})})}},{key:"getPayStatus",value:function(a){var n=this,e=(0,_indexWeapp4.getCookie)("wxWebPay");e&&(0,_vpayMember.getPayInfoFun)(e).then(function(e){var t=e.code,i=e.msg,e=e.result;"0"===t?"20"===e.payStatus?(_index2.default.showToast({title:"恭喜！您已开通会员 快去使用会员特权吧!",duration:2e3}),window.returnAppLink&&!window.returnAppLink.includes("vpayMember-t/home/index")?window.location.href=window.returnAppLink:setTimeout(function(e){_index2.default.redirectTo({url:"https://daojia.jd.com/html/index/user"})},2500)):1===a&&_index2.default.showToast({title:"支付失败，请重新支付",icon:"none",duration:2e3}):_index2.default.showToast({title:"获取支付信息失败，请刷新-"+i,icon:"none"}),(0,_indexWeapp4.removeCookie)("wxWebPay"),(0,_indexWeapp4.removeCookie)("showPayResultNum"),n.setState({isShowPayResult:!1,showPayResultNum:0})}).catch(function(e){_index2.default.showToast({title:"支付失败，请稍后再试",icon:"none"}),(0,_indexWeapp4.removeCookie)("wxWebPay"),(0,_indexWeapp4.removeCookie)("showPayResultNum"),n.setState({isShowPayResult:!1,showPayResultNum:0})})}},{key:"payResult",value:function(){this.getPayStatus(1)}},{key:"getPurchasePageInfo",value:function(e){var a=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,t=this.$router.params,i=t.fromChannel,t=t.receiptFlag,o=this,e={longitude:e.longitude||"",latitude:e.latitude||"",cityId:e.cityId||e.areaCode||e.cityCode||e.code||e.RNuserCityId||"",pageVersion:"v7",requestor:"",userCardType:n,fromChannel:void 0===i?"":i,receiptFlag:void 0===t?"":t};(0,_vpayMember.get_purchasePage_info)(e).then(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.result,i=e.code,e=e.msg;"0"===i?(t&&t.redPackageAndInterestInfo||(t.redPackageAndInterestInfo={cardType:-1,interestList:[]}),i=void 0,t.userCardInfoList&&0<t.userCardInfoList.length?(t.redPackageAndInterestInfo.cardType?i=t.userCardInfoList.find(function(e){return e.cardType===t.redPackageAndInterestInfo.cardType}):t.redPackageAndInterestInfo.cardType=t.userCardInfoList[0].cardType,i||(i=t.userCardInfoList[0],t.redPackageAndInterestInfo.cardType=t.userCardInfoList[0].cardType)):a.setState({tipType:"noOpen",tipMsg:"当前城市未开通"}),a.setState({btnData:i,purchasePageResult:t.userCardInfoList||[],currentInterests:t.redPackageAndInterestInfo,userCardType:t.redPackageAndInterestInfo&&t.redPackageAndInterestInfo.cardType||n,isLoading:!1})):o.setState({isLoading:!1,tipType:"noWifi",tipMsg:e||"网络开小差了~",purchasePageResult:[],currentInterests:{}})}).catch(function(e){o.setState({isLoading:!1,tipType:"noWifi",tipMsg:(e||{}).msg||"",purchasePageResult:[],currentInterests:{}})})}},{key:"selectPackage",value:function(e){var t=e.cardType,i=this.state,a=i.objParams,i=i.btnData,i=Object.assign({},i,e),e=(this.setState({userCardType:t,btnData:i}),this.getPurchasePageInfo(a,t),{type:{2:"monCard",4:"conMonCard",3:"expCard",5:"quaCard",6:"yearCard"}[t]});(0,_indexWeapp3.clickReport)({create_time:new Date,click_id:"clickSet",click_par:e})}},{key:"clickRenewTip",value:function(){var e=this.state.showRenewTip;this.setState({showRenewTip:!e})}},{key:"_payModesFun",value:function(e){var a=this;this.setState({isNewPayFnByApi:e});var e={isDaojiaApp:257,isJDReactNativeWebView:258,isDJBrowser:259,isWeixin:260,isJDApp:261,isMiniProgram:"yy_xcx"==(_index2.default.getApp().globalData&&_index2.default.getApp().globalData.mpChannel||"")?265:264},t=this.getPaySource();(0,_vpayMember.payModesFun)({paySource:e[t]}).then(function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.result,i=e.code,e=e.msg;"0"===i?a.setState({payList:t}):(a.setState({payList:[]}),_index2.default.showToast({title:e,icon:"none",duration:2e3}))}).catch(function(e){a.setState({payList:[]}),_index2.default.showToast({title:e.msg,icon:"none",duration:2e3})})}},{key:"toDiscountPage",value:function(){var e=this.state.userCardType;(0,_indexWeapp5.navigateTo)("/pages/vpayMember-t/discountList/index?userCardType="+e)}},{key:"_createData",value:function(){var e,i=this,a=(this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{},this.$prefix),t=(0,_index.genCompid)(a+"$compid__157"),n=(0,_index.genCompid)(a+"$compid__158"),o=(0,_index.genCompid)(a+"$compid__159"),s=(0,_index.genCompid)(a+"$compid__160"),r=(0,_index.genCompid)(a+"$compid__161"),p=(0,_index.genCompid)(a+"$compid__162"),d=(0,_index.genCompid)(a+"$compid__163"),c=(0,_index.genCompid)(a+"$compid__164"),u=this.__state,l=u.purchasePageResult,_=u.showBtnAnim,g=u.userCardType,h=u.currentInterests,y=u.btnData,m=u.isLoading,f=u.objParams,P=u.tipType,v=u.tipMsg,x=u.payList,w=u.isShowPayResult,b=u.showPayResultNum,k=u.isNewPayFnByApi,T=u.isAB,u=u.showRenewFlag,C={floorItem:h.interestList},j=this.$router.params,A=j.vipFlag,S=j.fromChannel,S=void 0===S?"":S,j=j.receiptFlag,j=void 0===j?"":j,P=(P&&_index.propsManager.set({type:P,msg:v,style:e={height:"100vh"},longitude:this.__state.objParams.longitude,cityId:this.__state.objParams.cityId,latitude:this.__state.objParams.latitude,handlerReload:this.loadPage},t),l.length?l.map(function(e,t){e={$original:(0,_index.internal_get_original)(e)};t=(0,_index.genCompid)(a+"MMtfHNVqbV"+t);return!l.length||4==e.$original.cardType&&_indexWeapp6.isDaojiaApp&&_indexWeapp6.isAndroid&&_indexWeapp6.djAppVersion<"8.19.0"||_index.propsManager.set({cardInfo:e.$original,userCardType:g,selectPackage:i.selectPackage.bind(i)},t),{$compid__156:t,$original:e.$original}}):[]);return _index.propsManager.set({selector:"skeleton",loading:m},n),_index.propsManager.set({isAB:T,currentInterests:h},o),_index.propsManager.set({className:_indexModuleScssMap2.default.PkBtnPlusWrapOpen,showBtnAnim:_,isAB:T,userCardType:g,refreshPage:this.loadPage.bind(this),longitude:f.longitude,latitude:f.latitude,cityId:f.cityId,btnData:y,fromChannel:S,receiptFlag:j,isToPageEvent:this.isToPageEvent.bind(this),onPayModesFun:this._payModesFun.bind(this)},s),"A"===k||_indexWeapp6.isDaojiaApp&&_indexWeapp6.isAndroid&&_indexWeapp6.djAppVersion<"8.19.0"||_index.propsManager.set({payList:x,isAB:T},r),"new_page"==T&&_index.propsManager.set({hasPadding:!0,vipFlag:A||0,type:"nowrap",data:C},p),w&&b&&_index.propsManager.set({payResult:this.getPayStatus.bind(this),onGoBack:this.payResult.bind(this)},d),u&&_index.propsManager.set({isShow:u,isNeedCloseIcon:!1,onPopEvent:this.closeAlert.bind(this)},c),Object.assign(this.__state,{_$anonymousState__temp:e,loopArray24:P,$compid__157:t,$compid__158:n,$compid__159:o,$compid__160:s,$compid__161:r,$compid__162:p,$compid__163:d,$compid__164:c,style:_indexModuleScssMap2.default,isDaojiaApp:_indexWeapp6.isDaojiaApp,isAndroid:_indexWeapp6.isAndroid,djAppVersion:_indexWeapp6.djAppVersion,showRenewFlag:u}),this.__state}}]),o}(),_class.$$events=["showRenewFlagAlert","toDiscountPage"],_class.$$componentPath="pages/vpayMember-t/packageSelection/index";var packageSelection=_temp2;exports.default=packageSelection,Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(packageSelection,!0));