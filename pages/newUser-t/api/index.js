"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.newUserRetain=exports.recommendStoreList=exports.newUserCoupons=exports.newUserProducts=void 0;var _indexWeapp=require("../../../npm/@jd/djmp/common-t/js/http/index.weapp.js"),_indexWeapp2=require("../../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),isWeapp=!0,platform=(_indexWeapp2.isDaojiaApp?"app":_indexWeapp2.isJDReactNativeWebView&&"RN")||"MiNi",newUserProducts=exports.newUserProducts=function(e){return e.platform=platform,(0,_indexWeapp.request)({functionId:"new-user/products",method:"POST",body:JSON.stringify(e)})},newUserCoupons=exports.newUserCoupons=function(e){return e.platform=platform,(0,_indexWeapp.request)({functionId:"new-user/coupons",method:"POST",body:JSON.stringify(e)})},recommendStoreList=exports.recommendStoreList=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return e.platform=platform,(0,_indexWeapp.request)({functionId:"zone/recommendStoreList",body:e,signkey:1,isNeedDealError:!0})},newUserRetain=exports.newUserRetain=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return e.platform=platform,(0,_indexWeapp.request)({functionId:"new-user/retain",method:"POST",body:JSON.stringify(e)})};