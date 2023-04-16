"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.jumpIntercept=exports.navigateToMpByCXCMAP=exports.autoJump=exports.jump=void 0;var _map,_utils=require("./utils.js"),_map2=require("./map.js");function _defineProperty(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}var _HOME$STORE$BACK$MYCO={HOME:"home",STORE:"store",BACK:"back",MYCOUPON:"myCoupon",STORELIST:"storeList",BARGAINDETAIL:"bargainDetail",BARGAINLIST:"bargainList",SIGIN:"sigin",PUNCH:"punch",FRIENDHELPLIST:"friendHelpList",LOTTERY:"lottery",GROUPBUYLIST:"groupBuyList",TASKLIST:"taskList",NEWSIGNIN:"newSignIn",BEANS:"beans",PHONECHARGE:"phoneCharge",ACTIVITYDETAIL:"activityDetail",JDWEB:"jdweb",VIPMEMBER:"vipMember",WEB:"web",MERCHANTMEMBER:"merchantMember",ORCHARD:"orchard",CASH:"cash",NEWUSER:"newUser",SETTLEMENT:"Settlement",PRODUCTDETAIL:"productDetail",FIRSTORDERFISSION:"firstOrderFission",COUPONGOODSLIST:"couponGoodsList"},HOME=_HOME$STORE$BACK$MYCO.HOME,STORE=_HOME$STORE$BACK$MYCO.STORE,BACK=_HOME$STORE$BACK$MYCO.BACK,MYCOUPON=_HOME$STORE$BACK$MYCO.MYCOUPON,BARGAINDETAIL=_HOME$STORE$BACK$MYCO.BARGAINDETAIL,SIGIN=_HOME$STORE$BACK$MYCO.SIGIN,PUNCH=_HOME$STORE$BACK$MYCO.PUNCH,FRIENDHELPLIST=_HOME$STORE$BACK$MYCO.FRIENDHELPLIST,BARGAINLIST=_HOME$STORE$BACK$MYCO.BARGAINLIST,LOTTERY=_HOME$STORE$BACK$MYCO.LOTTERY,GROUPBUYLIST=_HOME$STORE$BACK$MYCO.GROUPBUYLIST,TASKLIST=_HOME$STORE$BACK$MYCO.TASKLIST,BEANS=_HOME$STORE$BACK$MYCO.BEANS,NEWSIGNIN=_HOME$STORE$BACK$MYCO.NEWSIGNIN,PHONECHARGE=_HOME$STORE$BACK$MYCO.PHONECHARGE,VIPMEMBER=_HOME$STORE$BACK$MYCO.VIPMEMBER,ACTIVITYDETAIL=_HOME$STORE$BACK$MYCO.ACTIVITYDETAIL,MERCHANTMEMBER=_HOME$STORE$BACK$MYCO.MERCHANTMEMBER,ORCHARD=_HOME$STORE$BACK$MYCO.ORCHARD,CASH=_HOME$STORE$BACK$MYCO.CASH,PRODUCTDETAIL=_HOME$STORE$BACK$MYCO.PRODUCTDETAIL,SETTLEMENT=_HOME$STORE$BACK$MYCO.SETTLEMENT,FIRSTORDERFISSION=_HOME$STORE$BACK$MYCO.FIRSTORDERFISSION,map=(_defineProperty(_map={},HOME,"/pages/home/home"),_defineProperty(_map,STORE,"/pages/store/index"),_defineProperty(_map,MYCOUPON,"/pages/coupon/person-coupon"),_defineProperty(_map,BARGAINDETAIL,"/pages/bargain/launch/index"),_defineProperty(_map,BARGAINLIST,"/pages/bargain/cutGoodList/index"),_defineProperty(_map,GROUPBUYLIST,"/pages/groupBuy/groupList/index"),_defineProperty(_map,LOTTERY,"/pages/lottery/list/index"),_defineProperty(_map,FRIENDHELPLIST,"/pages/friendHelp/list/index"),_defineProperty(_map,SIGIN,"https://daojia.jd.com/activity/market/signIn/index.html"),_defineProperty(_map,PUNCH,"/pages/punch-t/home/index"),_defineProperty(_map,TASKLIST,"/pages/signIn-t/taskList/index"),_defineProperty(_map,BEANS,"/pages/bean-t/index"),_defineProperty(_map,NEWSIGNIN,"/pages/tabBar/signIn-t/index"),_defineProperty(_map,PHONECHARGE,"/pages/phoneCharge-t/index"),_defineProperty(_map,VIPMEMBER,"/pages/vpayMember-t/home/index"),_defineProperty(_map,ACTIVITYDETAIL,"/pages/activity/homeFocus/index"),_defineProperty(_map,MERCHANTMEMBER,"https://daojia.jd.com/activity/memberCard/index.html"),_defineProperty(_map,ORCHARD,"/pages/orchard-t/index"),_defineProperty(_map,CASH,"/pages/cash-t/index"),_defineProperty(_map,PRODUCTDETAIL,"/pages/product/index"),_defineProperty(_map,SETTLEMENT,"/pages/settlementV2/index"),_defineProperty(_map,FIRSTORDERFISSION,"/pages/firstOrderFission-t/launch/index"),_map),navigateTo=function(a){a?wx.navigateTo({url:a}):switchTab(map[HOME])},switchTab=function(a){wx.switchTab({url:a||map[HOME]})},navigateBack=function(){var a=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}).delta;wx.navigateBack({delta:void 0===a?1:a})},addParams=function(a,e){var t,i=a+"?t=0";for(t in e)i+="&"+t+"="+e[t];return i},navigateToH5=function(a,e){switch(a){case SIGIN:navigateTo("/pages/h5/index?url="+addParams(map[SIGIN],e));break;case MERCHANTMEMBER:navigateTo("/pages/h5/index?url="+addParams(map[MERCHANTMEMBER],e));break;default:e.url?navigateTo("/pages/h5/index?url="+e.url):switchTab()}},navigateToMp=function(a,e){switch(a){case HOME:switchTab(map[HOME]);break;case BACK:navigateBack(e.delta);break;case STORE:navigateTo(addParams(map[STORE],e));break;case MYCOUPON:navigateTo(addParams(map[MYCOUPON],e));break;case BARGAINDETAIL:navigateTo(addParams(map[BARGAINDETAIL],e));break;case BARGAINLIST:navigateTo(addParams(map[BARGAINLIST],e));break;case PUNCH:navigateTo(addParams(map[PUNCH],e));break;case FRIENDHELPLIST:navigateTo(addParams(map[FRIENDHELPLIST],e));break;case LOTTERY:navigateTo(addParams(map[LOTTERY],e));break;case GROUPBUYLIST:navigateTo(addParams(map[GROUPBUYLIST],e));break;case TASKLIST:navigateTo(addParams(map[TASKLIST],e));break;case BEANS:navigateTo(addParams(map[BEANS],e));break;case NEWSIGNIN:navigateTo(addParams(map[NEWSIGNIN],e));break;case PHONECHARGE:navigateTo(addParams(map[PHONECHARGE],e));break;case ORCHARD:navigateTo(addParams(map[ORCHARD],e));break;case CASH:navigateTo(addParams(map[CASH],e));break;case VIPMEMBER:navigateTo(addParams(map[VIPMEMBER],e));case ACTIVITYDETAIL:navigateTo(addParams(map[ACTIVITYDETAIL],e));break;case PRODUCTDETAIL:navigateTo(addParams(map[PRODUCTDETAIL],e));break;case SETTLEMENT:navigateTo(addParams(map[SETTLEMENT],e));break;case FIRSTORDERFISSION:navigateTo(addParams(map[FIRSTORDERFISSION],e));break;default:switchTab(map[HOME])}},jump=exports.jump=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=a.to,e=void 0===e?"home":e,t=a.type,a=a.params,a=void 0===a?{}:a;("h5"===(void 0===t?"":t)?navigateToH5:navigateToMp)(e,a)},autoJump=exports.autoJump=function(){var a,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.url,t=void 0===t?"":t,i=e.nativePageUrl,i=void 0===i?"p1":i,r=e.nativePageParam,r=void 0===r?"":r,e=(e.needLogin,1<arguments.length&&void 0!==arguments[1]?arguments[1]:"");t?(e=(0,_utils.urlToName)(t)?e:"h5",a=t&&t.split("?")[1]||"",jump({type:e,to:(0,_utils.urlToName)(t),params:(0,_utils.paramsToObj)(a)})):i&&(e=_map2.CXC_MAP[i]?e:"h5",jump({type:e,to:_map2.CXC_MAP[i]||"home",params:(0,_utils.paramsToObj)(r)}))},navigateToMpByCXCMAP=exports.navigateToMpByCXCMAP=function(){var a=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=a.nativePageUrl,e=void 0===e?"p1":e,a=a.nativePageParam,t=_map2.CXC_MAP[e],a=(0,_utils.paramsToObj)(void 0===a?"":a);"p1"==e||"p3"==e||"p4"==e?switchTab(t):navigateTo(addParams(t,a))},jumpIntercept=exports.jumpIntercept=function(t){var a=[{key:"#Seckill",link:"/pages/seckill/index"},{key:"firstOrderFission-t",link:"/pages/firstOrderFission-t/launch/index"}].find(function(a){var e=a.key;return t.includes(e)&&a}),e=t&&t.split("?")[1];a?wx.navigateTo({url:a.link+"?"+e}):navigateTo("/pages/h5/index?url="+encodeURIComponent(t))};