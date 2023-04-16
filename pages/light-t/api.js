"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getUserInfo = exports.submitUserInfo = exports.getStationId = exports.treasureBoxSendPrize = exports.commonSendPrize = exports.bindCity = exports.finishTask = exports.getLightClick = exports.getHelp = exports.getPrizeInfo = exports.getRuleInfo = exports.getMainInfo = void 0;

var _indexWeapp = require("./npm/@jd/djmp/common-t/js/http/index.weapp.js"),
    getMainInfo = exports.getMainInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "/light/home",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getRuleInfo = exports.getRuleInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "light/gameRule",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getPrizeInfo = exports.getPrizeInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "/light/prize/list",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getHelp = exports.getHelp = function () {
  return (0, _indexWeapp.request)({
    functionId: "/light/share/help",
    method: "POST",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    getLightClick = exports.getLightClick = function () {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
  return console.log("打卡 params :>> ", e), (0, _indexWeapp.request)({
    functionId: "/light/click",
    method: "POST",
    body: JSON.stringify(e)
  });
},
    finishTask = exports.finishTask = function () {
  return (0, _indexWeapp.request)({
    functionId: "light/finishTask",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    bindCity = exports.bindCity = function () {
  return (0, _indexWeapp.request)({
    functionId: "/light/city/bind",
    method: "POST",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    commonSendPrize = exports.commonSendPrize = function () {
  return (0, _indexWeapp.request)({
    functionId: "light/send/normalPrize",
    method: "POST",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    treasureBoxSendPrize = exports.treasureBoxSendPrize = function () {
  return (0, _indexWeapp.request)({
    functionId: "/light/send/prize",
    method: "POST",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    getStationId = exports.getStationId = function () {
  return (0, _indexWeapp.request)({
    functionId: "station/getStationId",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    submitUserInfo = exports.submitUserInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "promotionGame/saveWinning",
    method: "POST",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
},
    getUserInfo = exports.getUserInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "promotionGame/getWinning",
    body: JSON.stringify(0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
  });
};