"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.getWxUserInfo = void 0;

var _indexWeapp = require("../../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    getWxUserInfo = exports.getWxUserInfo = function () {
  return new Promise(function (e, n) {
    try {
      var o = wx.getStorageSync(_indexWeapp.LOGIN_INFO);
      o.openId ? e({
        nickName: o.nickname,
        avatarUrl: o.avatar,
        openId: o.openId
      }) : (0, _indexWeapp2.goToLogin)();
    } catch (e) {
      n();
    }
  });
};