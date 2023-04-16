"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.newUserStrategy = exports.paramsEncryption = exports.judgeUserIsGetWxCoupon = exports.subscribeMsginfo = exports.getOpenId = exports.getData = exports.getActivityInfo = exports.getCouponAPI = void 0;

var _indexWeapp = require("../npm/@jd/djmp/common-t/js/http/index.weapp.js"),
    getCouponAPI = exports.getCouponAPI = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/receiveCouponPage/receiveCoupon",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}),
    method: "Get",
    isNeedDealError: !0
  });
},
    getActivityInfo = exports.getActivityInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "inviter/code/getCodeInfo",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}),
    method: "Get",
    isNeedDealError: !0
  });
},
    getData = exports.getData = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/receiveCouponPage/queryPageInfo",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}),
    method: "GET",
    isNeedDealError: !0
  });
},
    openIdFid = "xapp/baidu/getOpenId",
    getOpenId = exports.getOpenId = function () {
  return (0, _indexWeapp.request)({
    functionId: openIdFid,
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}),
    method: "POST",
    isNeedDealError: !0
  });
},
    subscribeMsg = "xapp/subscribeMsg",
    subscribeMsginfo = exports.subscribeMsginfo = function () {
  return (0, _indexWeapp.request)({
    functionId: subscribeMsg,
    isNeedDealError: !0,
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    judgeUserIsGetWxCoupon = exports.judgeUserIsGetWxCoupon = function () {
  return (0, _indexWeapp.request)({
    functionId: "/trade/market/isReceive",
    isNeedDealError: !0,
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    paramsEncryption = exports.paramsEncryption = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/wx/encryptMarket",
    isNeedDealError: !0,
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    newUserStrategy = exports.newUserStrategy = function () {
  return (0, _indexWeapp.request)({
    functionId: "newUserStrategy/foreEndStartup",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
};