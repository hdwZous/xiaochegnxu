"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _class,_temp2,_createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_get=function e(t,n,o){null===t&&(t=Function.prototype);var a=Object.getOwnPropertyDescriptor(t,n);return void 0!==a?"value"in a?a.value:void 0!==(a=a.get)?a.call(o):void 0:null!==(a=Object.getPrototypeOf(t))?e(a,n,o):void 0},_index=require("../../npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_indexWeapp=require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),_indexWeapp2=require("../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),_indexWeapp3=require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),_indexWeapp4=require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),_indexWeapp5=require("../../npm/@jd/djmp/common-t/js/epBi/index.weapp.js"),_indexWeapp6=_interopRequireDefault(_indexWeapp5),_indexWeapp7=require("../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),_index3=require("./api/index.js"),_indexModuleScssMap=require("./index.module.scss.map.js"),_indexModuleScssMap2=_interopRequireDefault(_indexModuleScssMap);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _asyncToGenerator(e){return function(){var s=e.apply(this,arguments);return new Promise(function(i,r){return function t(e,n){try{var o=s[e](n),a=o.value}catch(e){return void r(e)}if(!o.done)return Promise.resolve(a).then(function(e){t("next",e)},function(e){t("throw",e)});i(a)}("next")})}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(e)return!t||"object"!=typeof t&&"function"!=typeof t?e:t;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var isInWeappH5=(0,_indexWeapp2.getH5InWeappFlag)(),isH5=!1,isWeapp=!0,location={},Index=(_temp2=_class=function(){function a(){var e,p,l=this;_classCallCheck(this,a);for(var t=arguments.length,n=Array(t),o=0;o<t;o++)n[o]=arguments[o];return(e=p=_possibleConstructorReturn(this,(e=a.__proto__||Object.getPrototypeOf(a)).call.apply(e,[this].concat(n)))).$usedState=["anonymousState__temp13","anonymousState__temp14","style","anonymousState__temp","anonymousState__temp2","anonymousState__temp3","isShowOldUserPage","anonymousState__temp4","vipInfo","anonymousState__temp5","product","anonymousState__temp6","position","commonSalesInfo","anonymousState__temp7","isShowStore","anonymousState__temp8","store","anonymousState__temp9","coupon","anonymousState__temp10","anonymousState__temp11","isLogin","isCommonSales","popupInfo","anonymousState__temp12","isDialog","dialogList","headerInfo","pageInfo","couponsInfo","payInfo","currentPage","shopList","flagShop","showFlag","statusBarH","toBar","isAssistCouponDialogShow"],p.config={navigationBarTitleText:"新人专区",navigationBarBackgroundColor:"#fff",navigationBarTextStyle:"black",onReachBottomDistance:160,navigationStyle:"custom"},p._weappIsDialog=function(){var e=p.state.showFlag;e?((0,_indexWeapp4.clickReport)({click_id:"click_open",click_par:{userAction:p.retainUserAction,type:"retain"}}),p.setState({isDialog:e})):p.childCustomNavBg.goback()},p._callNativeClose=function(){(0,_indexWeapp4.clickReport)({click_id:"clickLayer",click_par:{userAction:p.retainUserAction,btnName:"leave",type:"retain"}}),_indexWeapp2.isDaojiaApp&&0<=p._isCompatible(String(_indexWeapp2.djAppVersion),String("8.6.0"))?_indexWeapp2.isIOS?_indexWeapp2.supportDJSHWK&&window.webkit.messageHandlers.MobileNavi.postMessage({method:"closeWebview",callBackName:null,callBackId:null}):_indexWeapp2.isAndroid&&window.djJava.closeWebview&&window.djJava.closeWebview():p._childSubscribeHandle([],null,103,function(){p.childCustomNavBg.goback()})},p._childSubscribeHandle=function(r,s,u,c){var t;r=r&&0<r.length?r:["tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs","aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM","fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I"],(0,_index3.getAbTest)({experimentName:"wechat_submit"}).then((t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n,o,a=t.code,i=t.result;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("0"==a&&i&&"submit_a"==i.strategyName)return e.next=4,p.judgeAllowBtn(r);e.next=10;break;case 4:return n=e.sent,e.next=7,p.needShowSub(n);case 7:e.sent?(o=p._childSubscribeCb.bind(p,r,u),p.childSubscribe.initSubscribeMessage(r,s,c,o)):c&&c(),(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"showLayer",click_par:{type:n?"hideSubscribe":"subscribe",templateId:r.join(),channelId:u}});case 10:case"end":return e.stop()}},e,l)})),function(e){return t.apply(this,arguments)})).catch(function(e){c&&c()})},p._initiativeCloseLog=function(){(0,_indexWeapp4.clickReport)({click_id:"clickLayer",click_par:{userAction:p.retainUserAction,btnName:"close",type:"retain"}}),p.setState({showFlag:!1,isDialog:!1})},p.customComponents=["Default","SubscribeMessage","Bitmap","Products","CommonSales","OldShops","Coupons","PayInfoRoll","Shops","Dialog","Custom","AssistCouponDialog"],_possibleConstructorReturn(p,e)}var t,n,e,o,i,r,s,u,c,p;return _inherits(a,_index.Component),_createClass(a,[{key:"_constructor",value:function(e){var t=this;_get(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_constructor",this).call(this,e),this.Exposure=null,this.userAction={},this.retainUserAction={},this.goToLoginParams={localTargetUrl:"/pages/newPerson-t/index"},this.hotsList=0,this.state={isDialog:!1,dialogList:[],headerInfo:{},pageInfo:{},couponsInfo:null,payInfo:[],currentPage:1,isLogin:null,position:null,shopList:[],flagShop:!0,showFlag:null,statusBarH:20,toBar:44,isAssistCouponDialogShow:!1,isCommonSales:!1,commonSalesInfo:null},this.$$refs=[{type:"component",id:"eKajf",refName:"",fn:function(e){return t.childSubscribe=e}},{type:"component",id:"LIrge",refName:"oldShops",fn:null},{type:"component",id:"NhrxY",refName:"shops",fn:null},{type:"component",id:"TRSgW",refName:"",fn:function(e){return t.childCustomNavBg=e}}]}},{key:"componentWillMount",value:(p=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.Exposure=new _indexWeapp6.default(".content >>> .exposure",this.$scope),t=!1,e.prev=2,e.next=5,this._judageIsLogin();case 5:t=e.sent,e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),t=!1;case 11:t||(0,_indexWeapp.goToLogin)(this.goToLoginParams),n=this,_index2.default.getSystemInfo({success:function(e){n.setState({statusBarH:e.statusBarHeight}),"ios"!=e.platform&&"android"==e.platform?n.setState({toBar:48}):n.setState({toBar:44})}});case 14:case"end":return e.stop()}},e,this,[[2,8]])})),function(){return p.apply(this,arguments)})},{key:"componentDidShow",value:(c=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(t=this.$router.params).userAction&&(this.userAction=decodeURIComponent(t.userAction)),n=!1,e.prev=3,e.next=6,this._judageIsLogin();case 6:n=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(3),n=!1;case 12:this.setState({isLogin:n,params:t}),this._initPage(),t.business&&(getApp().globalData.qrcode.business=t.business||null,getApp().globalData.qrcode.roomid=t.roomId||null),(0,_indexWeapp4.pvReport)({page_name:"newPerson",create_time:new Date,page_par:{roomId:t.roomId||null,business:t.business||null,orderIndex:t.stage||null,ref_par:{userAction:this.userAction}}});case 16:case"end":return e.stop()}},e,this,[[3,9]])})),function(){return c.apply(this,arguments)})},{key:"onReachBottom",value:function(){var e=this,t=this.state,n=t.currentPage,o=t.pageInfo;this.setState({currentPage:n+1},function(){o.store&&e.child._fetchShopData(),o.isShowStore&&e.childOldShops.fetchData()})}},{key:"_createData",value:function(){this.__state=arguments[0]||this.state||{},this.__props=arguments[1]||this.props||{};var e=this.$prefix,t=this.__state,n=t.isLogin,o=t.headerInfo,a=t.pageInfo,i=t.position,t=(t.isCommonSales,t.commonSalesInfo),r=a.coupon,s=a.product,u=a.store,c=a.isShowStore,p=a.isShowOldUserPage,a=a.popupInfo,o=o.vipInfo,l=(o&&this._toExposure(),this._createCustomData(e+"rEFzsaiZWN")()),_=this._createBitmapData(e+"bBZWtbPnEv")(),d=this._createCouponData(e+"LhnNvlEMBE")(),m=p?this._createOldUsersData(e+"HcExvohrcr")():null,f=o&&!p?this._createBannerData(e+"PxshCaQRsY")():null,h=s?this._createProductsData(e+"voqkGqktIM")():null,t=i&&!p&&t?this._createCommonSalesData(e+"fSUOmVvGrb")():null,i=i&&(c||p)?this._createNearbyStoresData(e+"lfnHvHLCcN")():null,g=u?this._createShopsData(e+"hnqKfVAYpB")():null,y=r||s||u?this._createPayInfoRollData(e+"WEqUAmHcmT")():null,v=this._createDialogData(e+"aTTBempJHF")(),e=a?this._createAssistCouponDialogData(e+"PuXMtpCSVR")():null,n=(0,_index.internal_inline_style)({display:null===n?"none":""}),S=(0,_index.internal_inline_style)({display:o?"":"none"});return Object.assign(this.__state,{anonymousState__temp13:n,anonymousState__temp14:S,style:_indexModuleScssMap2.default,anonymousState__temp:l,anonymousState__temp2:_,anonymousState__temp3:d,isShowOldUserPage:p,anonymousState__temp4:m,vipInfo:o,anonymousState__temp5:f,product:s,anonymousState__temp6:h,anonymousState__temp7:t,isShowStore:c,anonymousState__temp8:i,store:u,anonymousState__temp9:g,coupon:r,anonymousState__temp10:y,anonymousState__temp11:v,popupInfo:a,anonymousState__temp12:e}),this.__state}},{key:"_createBannerData",value:function(e){var t=this;return function(){var e=t.state.headerInfo.vipInfo;return t.anonymousFunc0=function(){return t._toVipLink(e.to)},{style:_indexModuleScssMap2.default,vipInfo:e}}}},{key:"_createBitmapData",value:function(r){var s=this;return function(){var e=(0,_index.genCompid)(r+"$compid__198"),t=s.state,n=t.headerInfo,o=t.position,a=t.pageInfo,i=t.statusBarH,t=t.toBar,i=(0,_index.internal_inline_style)({marginTop:2*(i+t)+"rpx"});return s.anonymousFunc1=function(e){return s.bitmap=e},_index.propsManager.set({headerInfo:n,onRef:s.anonymousFunc1,position:o,pageInfo:a},e),{anonymousState__temp16:i,$compid__198:e}}}},{key:"_createProductsData",value:function(o){var a=this;return function(){var e=(0,_index.genCompid)(o+"$compid__199"),t=a.$router.params.channel,n=a.state.position;return n&&_index.propsManager.set({position:n,channel:t},e),{$compid__199:e,style:_indexModuleScssMap2.default,position:n}}}},{key:"_createCommonSalesData",value:function(o){var a=this;return function(){var e=(0,_index.genCompid)(o+"$compid__200"),t=a.state,n=t.commonSalesInfo,t=t.position;return _index.propsManager.set({position:t,commonSalesInfo:n,toStore:a._toStore},e),{$compid__200:e}}}},{key:"_createNearbyStoresData",value:function(o){var a=this;return function(){var e=(0,_index.genCompid)(o+"$compid__201"),t=a.state,n=t.position,t=t.currentPage;return a.anonymousFunc2=function(e){return a.childOldShops=e},_index.propsManager.set({position:n,toStore:a._toStore,currentPage:t,onRef:a.anonymousFunc2,fromSource:"newPerson"},e),{$compid__201:e}}}},{key:"_createCouponData",value:function(r){var s=this;return function(){var e=(0,_index.genCompid)(r+"$compid__202"),t=s.state,n=t.position,o=t.isLogin,a=t.pageInfo,i=t.couponsInfo,t=t.isCommonSales;return _index.propsManager.set({position:n,isLogin:o,pageInfo:a,couponsInfo:i,isCommonSales:t},e),{$compid__202:e}}}},{key:"_createOldUsersData",value:function(e){var t=this;return function(){return t.anonymousFunc3=function(){(0,_indexWeapp3.jump)({to:"home"})},{style:_indexModuleScssMap2.default}}}},{key:"_createPayInfoRollData",value:function(a){var i=this;return function(){var e=(0,_index.genCompid)(a+"$compid__203"),t=i.state,n=t.pageInfo,o=t.payInfo,t=2*(t.statusBarH+t.toBar)+"rpx";return _index.propsManager.set({pageInfo:n,payInfo:o,top:t},e),{anonymousState__temp17:t,$compid__203:e}}}},{key:"_createShopsData",value:function(i){var r=this;return function(){var e=(0,_index.genCompid)(i+"$compid__204"),t=r.state,n=t.position,o=t.currentPage,a=t.shopList,t=t.flagShop;return r.anonymousFunc4=function(e){return r.child=e},_index.propsManager.set({position:n,toStore:r._toStore,shopList:a,flagShop:t,currentPage:o,onRef:r.anonymousFunc4},e),{$compid__204:e}}}},{key:"_createDialogData",value:function(r){var s=this;return function(){var e=(0,_index.genCompid)(r+"$compid__205"),t=s.state,n=t.isLogin,o=t.isDialog,a=t.dialogList,i=t.statusBarH,t=t.toBar;return _index.propsManager.set({isDialog:o,dialogList:void 0===a?[]:a,callNativeClose:s._callNativeClose,initiativeCloseLog:s._initiativeCloseLog,isLogin:n,statusBarH:i,toBar:t,onToStore:s._toStore,retainUserAction:s.retainUserAction},e),{$compid__205:e}}}},{key:"_createCustomData",value:function(o){var a=this;return function(){var e=(0,_index.genCompid)(o+"$compid__206"),t=a.state,n=t.statusBarH,t=t.toBar;return _index.propsManager.set({statusBarH:n,toBar:t,weappIsDialog:a._weappIsDialog},e),{$compid__206:e}}}},{key:"_createAssistCouponDialogData",value:function(a){var i=this;return function(){var e=(0,_index.genCompid)(a+"$compid__207"),t=i.state,n=t.pageInfo,o=t.isAssistCouponDialogShow,t=t.isLogin;return i.anonymousFunc5=function(){return i._closeAssistCouponDialog()},_index.propsManager.set({isAssistCouponDialogShow:o,popupInfo:n.popupInfo,onCloseEv:i.anonymousFunc5,isLogin:t},e),{$compid__207:e}}}},{key:"_closeAssistCouponDialog",value:function(){this.setState({isAssistCouponDialogShow:!1});var e=this.$router.params.source;this._childSubscribeHandle([],null,"hyzl"===e?106:102)}},{key:"_assistCouponSubscribeClickReport",value:function(e){e&&(e=this.$router.params.source,(0,_indexWeapp4.clickReport)({click_id:"clickLayer",click_par:{type:"subscribe",templateId:"tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs,aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM,fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I",channelId:"hyzl"===e?106:102,btnName:"accept"}}))}},{key:"_showAssistCouponDialog",value:function(){(0,_indexWeapp4.clickReport)({click_id:"showLayer",click_par:{type:"helpCoupon"}}),this.setState({isAssistCouponDialogShow:!0})}},{key:"_getPageInfo",value:(u=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n,o,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:o=this.state.position,n=this.$router.params,t=n.source,n=n.popupText,o={city_id:o.cityId,lng_pos:o.longitude,lat_pos:o.latitude,source:t,popupText:decodeURIComponent(n)},(0,_index3.getPageInfo)(o).then(function(e){var t=e.code,n=e.result;"0"==t&&a.setState({pageInfo:n},function(){n.header&&a._getHeaderInfo(),n.coupon&&a._getCouponsInfo(),a._isShowPayRecords(n),n.popupInfo&&a._showAssistCouponDialog()})});case 4:case"end":return e.stop()}},e,this)})),function(){return u.apply(this,arguments)})},{key:"_getHeaderInfo",value:(s=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n,o=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state.position){e.next=3;break}return e.abrupt("return");case 3:return n={city_id:t.cityId,lng_pos:t.longitude,lat_pos:t.latitude},e.next=6,(0,_index3.getHeaderInfo)(n).then(function(e){var t=e.code,e=e.result;"0"==t&&o.setState({headerInfo:e},function(){var e=o.state.pageInfo,t=e.coupon,n=e.product,e=e.store;(t||n||e)&&o._executeBitmapFun()})});case 6:case"end":return e.stop()}},e,this)})),function(){return s.apply(this,arguments)})},{key:"_getPayRecords",value:(r=_asyncToGenerator(regeneratorRuntime.mark(function e(){var n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(0,_index3.getPayRecords)().then(function(e){var t=e.code,e=e.result;"0"==t&&n.setState({payInfo:e})});case 1:case"end":return e.stop()}},e,this)})),function(){return r.apply(this,arguments)})},{key:"_getCouponsInfo",value:(i=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.position,t={city_id:t.cityId,lng_pos:t.longitude,lat_pos:t.latitude},(0,_index3.getCouponsInfo)(t).then(function(e){var t=e.code,e=e.result;"0"==t&&n.setState({couponsInfo:e})});case 3:case"end":return e.stop()}},e,this)})),function(){return i.apply(this,arguments)})},{key:"_newUserRetain",value:(o=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n,o,a=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state.position,n=this.$router.params.channel,n=void 0===n?null:n,t){e.next=4;break}return e.abrupt("return");case 4:o={city_id:t.cityId,lng_pos:t.longitude,lat_pos:t.latitude},n&&(o.channel=n),(0,_index3.newUserRetain)(o).then(function(e){e.result.showFlag&&a._djAppShowFlag(),a.retainUserAction=e.result.userAction||{},a.setState({showFlag:e.result.showFlag,dialogList:e.result.products})});case 7:case"end":return e.stop()}},e,this)})),function(){return o.apply(this,arguments)})},{key:"_getCommonSales",value:(e=_asyncToGenerator(regeneratorRuntime.mark(function e(){var t,n=this;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=this.state.position,t={cityId:t.cityId,longitude:t.longitude,latitude:t.latitude},(0,_index3.getCommonSalesInfo)(t).then(function(e){var t=e.code,e=e.result;"0"==t&&e&&e.productList&&0<e.productList.length&&n.setState({isCommonSales:!0,commonSalesInfo:e})});case 3:case"end":return e.stop()}},e,this)})),function(){return e.apply(this,arguments)})},{key:"judgeAllowBtn",value:(n=_asyncToGenerator(regeneratorRuntime.mark(function e(a){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(o){wx.getSetting({withSubscriptions:!0,success:function(e){var t,n,e=e.subscriptionsSetting;0==e.mainSwitch&&o(null),1==e.mainSwitch&&(t=e.itemSettings||null)&&(n=!0,a.forEach(function(e){null==t[e]&&(n=!1)}),n&&o(!0)),o(!1)}})}));case 1:case"end":return e.stop()}},e,this)})),function(e){return n.apply(this,arguments)})},{key:"needShowSub",value:(t=_asyncToGenerator(regeneratorRuntime.mark(function e(t){var n,o,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=0,o=wx.getStorageSync("subscribeCount")||{},a=new Date,a=""+a.getFullYear()+(a.getMonth()+1)+a.getDate();try{(o=wx.getStorageSync("subscribeCount")||{}).days&&o.days==a&&(n=o.count)}catch(e){}if(n<2&&null!=t&&this.state.isLogin)return e.abrupt("return",!0);e.next=9;break;case 9:return e.abrupt("return",!1);case 10:case"end":return e.stop()}},e,this)})),function(e){return t.apply(this,arguments)})},{key:"_isShowPayRecords",value:function(e){return!!(e.coupon||e.product||e.store)&&(this._getPayRecords(),!0)}},{key:"_toVipLink",value:function(e){var e=e.split("#")[1],t=this.state.headerInfo.vipInfo;(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clickMember",click_par:{userAction:t.userAction,url:t.url}}),_index2.default.navigateTo({url:e})}},{key:"_executeBitmapFun",value:function(){var e=this.state.headerInfo,t=e.nowTime,e=e.todayLastTime;this.bitmap&&!this.bitmap.timer&&this.bitmap._countFun((void 0===e?0:e)-(void 0===t?0:t))}},{key:"_judageIsLogin",value:function(){return new Promise(function(e,t){(0,_indexWeapp.isLogin)().then(function(){e(!0)}).catch(function(){isInWeappH5||_indexWeapp2.isJDReactNativeWebView||_indexWeapp2.isJDApp||_indexWeapp2.isJDFinanceApp||_indexWeapp2.isJxApp||_indexWeapp2.isJiSuApp?(0,_indexWeapp.isLoginInWeappH5)().then(function(){e(!0)}).catch(function(){t(!1)}):t(!1)})})}},{key:"_toExposure",value:function(){var e=this;this.state.headerInfo.vipInfo&&setTimeout(function(){e.Exposure&&e.Exposure.initObserver&&e.Exposure.initObserver()},2e3)}},{key:"_childSubscribeCb",value:function(e,t,n){var o=!1,a=[];if(e.forEach(function(e){"accept"==n[e]&&(o=!0,a.push(e))}),o){var e=wx.getStorageSync("subscribeCount")||{},i=new Date,i=""+i.getFullYear()+(i.getMonth()+1)+i.getDate();e.days&&e.days==i?e.count+=1:(e.days=i,e.count=1);try{wx.setStorageSync("subscribeCount",e)}catch(e){}(0,_indexWeapp4.clickReport)({create_time:new Date,click_id:"clickLayer",click_par:{type:"subscribe",templateId:a.join(),channelId:t,btnName:"accept"}})}}},{key:"_djAppShowFlag",value:function(){_indexWeapp2.isDaojiaApp&&0<=this._isCompatible(String(_indexWeapp2.djAppVersion),String("8.6.0"))&&(this._callEnableIntercept(),this._closeWebCall())}},{key:"_callEnableIntercept",value:function(){_indexWeapp2.isDaojiaApp&&0<=this._isCompatible(String(_indexWeapp2.djAppVersion),String("8.6.0"))&&(_indexWeapp2.isIOS?_indexWeapp2.supportDJSHWK&&window.webkit.messageHandlers.MobileNavi.postMessage({method:"enableIntercept",params:1,callBackName:null,callBackId:null}):_indexWeapp2.isAndroid&&window.djJava.enableIntercept&&window.djJava.enableIntercept(1))}},{key:"_closeWebCall",value:function(){var t=this;window.djWebviewBack=function(){var e=t.state.showFlag;return!!e&&((0,_indexWeapp4.clickReport)({click_id:"click_open",click_par:{userAction:t.retainUserAction,type:"retain"}}),t.setState({isDialog:e}),!0)}}},{key:"_isCompatible",value:function(e,t){e=e.split("."),t=t.split(".");for(var n=Math.max(e.length,t.length);e.length<n;)e.push("0");for(;t.length<n;)t.push("0");for(var o=0;o<n;o++){var a=parseInt(e[o]),i=parseInt(t[o]);if(i<a)return 1;if(a<i)return-1}return 0}},{key:"_toStore",value:function(e){e={userAction:e.userAction,storeId:e.storeId||"",skuId:e.skuId||"",orgCode:e.orgCode||"",longitude:location.longitude||116.51064,latitude:location.latitude||39.79553,needAnchorSku:!0,addCart:!0,needAddCar:!0,needAddCart:1,isAddCart:!0};(0,_indexWeapp3.jump)({to:"store",params:e})}},{key:"_initPage",value:function(){var t=this;this._getCurLocation().then(function(e){t.setState({position:e},function(){t._getPageInfo(),t._newUserRetain(),t._getCommonSales()})})}},{key:"_getCurLocation",value:function(){return new Promise(function(t,e){(0,_indexWeapp7.getLocation)().then(function(e){t(location=e)}).catch(function(){e()})})}},{key:"anonymousFunc0",value:function(e){}},{key:"anonymousFunc1",value:function(e){}},{key:"anonymousFunc2",value:function(e){}},{key:"anonymousFunc3",value:function(e){}},{key:"anonymousFunc4",value:function(e){}},{key:"anonymousFunc5",value:function(e){}}]),a}(),_class.$$events=["anonymousFunc0","anonymousFunc3"],_class.multipleSlots=!0,_class.$$componentPath="pages/newPerson-t/index",_temp2);exports.default=Index,Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Index,!0));