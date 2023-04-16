"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getMyWithdraw = exports.withdrawConfirm = exports.getCompletes = exports.getFaceToFaceScannerCode = exports.getActivity = void 0;

var _indexWeapp = require("../npm/@jd/djmp/common-t/js/http/index.weapp.js"),
    participate = "xapp/pforder/participate",
    complete = "xapp/pforder/helpDetail",
    getFaceToFace = "xapp/cpOrder/task/getFaceToFaceScannerCode",
    getActivity = exports.getActivity = function () {
  return (0, _indexWeapp.request)({
    functionId: participate,
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}),
    method: "POST"
  });
},
    getFaceToFaceScannerCode = exports.getFaceToFaceScannerCode = function () {
  return (0, _indexWeapp.request)({
    functionId: getFaceToFace,
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getCompletes = exports.getCompletes = function () {
  return (0, _indexWeapp.request)({
    functionId: complete,
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}),
    method: "POST"
  });
},
    withdrawConfirm = exports.withdrawConfirm = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/pforder/withdraw",
    method: "POST",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    getMyWithdraw = exports.getMyWithdraw = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/pforder/myWithdrawal",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
};