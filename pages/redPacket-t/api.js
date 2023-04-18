"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.openRedRain = exports.getReward = exports.getHelp = exports.getRemindMe = exports.getPrizeInfo = exports.getRuleInfo = exports.getMainInfo = void 0;

var _indexWeapp = require("./npm/@jd/djmp/common-t/js/http/index.weapp.js"),
    getMainInfo = exports.getMainInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/home",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getRuleInfo = exports.getRuleInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/getRule",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getPrizeInfo = exports.getPrizeInfo = function () {
  return (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/historyReward",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getRemindMe = exports.getRemindMe = function () {
  return (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/remindMe",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getHelp = exports.getHelp = function () {
  return (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/help",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getReward = exports.getReward = function () {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
  return console.log("开奖 params :>> ", e), (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/getReward",
    body: e
  });
},
    openRedRain = exports.openRedRain = function () {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
  return console.log("开始游戏 params :>> ", e), (0, _indexWeapp.request)({
    functionId: "newRedPackageRain/robRedPackage",
    method: "POST",
    body: JSON.stringify(e)
  });
};