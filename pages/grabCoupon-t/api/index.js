"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.subscribeMsginfo = exports.getOpenId = exports.getData = exports.getCouponAPI = void 0;

var _indexWeapp = require("../npm/@jd/djmp/common-t/js/http/index.weapp.js"),
    getCouponAPI = exports.getCouponAPI = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/receiveCouponPage/receiveCoupon",
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
};