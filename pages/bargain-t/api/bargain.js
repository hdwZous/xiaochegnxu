"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.transformRgb = exports.subscribeMsginfo = exports.getFriendQrcode = exports.getFriendShareImg = exports.handleSkuName = exports.getMaterial = exports.getCutPriceDetail = exports.senderCutPrice = exports.checkCutPrice = exports.getMyCutGoodsLit = exports.getCutGoodsLit = void 0;

var _indexWeapp = require("../npm/@jd/djmp/common-t/js/http/index.weapp.js"),
    getCutGoodsLit = exports.getCutGoodsLit = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/cutPriceList",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getMyCutGoodsLit = exports.getMyCutGoodsLit = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/myCutPriceList",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    checkCutPrice = exports.checkCutPrice = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/validSenderCutPrice",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    senderCutPrice = exports.senderCutPrice = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/senderCutPrice",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getCutPriceDetail = exports.getCutPriceDetail = function () {
  return (0, _indexWeapp.request)({
    functionId: "xapp/getCutPriceDetail",
    body: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
  });
},
    getMaterial = exports.getMaterial = function () {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
  e.skuName = handleSkuName(e.skuName, 18);
  var t = e.skuImageUrl,
      r = e.skuName,
      i = e.cutPrice,
      e = e.basicPrice,
      e = {
    tempId: "22bdf1a15c89322",
    mpMergeParam: {
      imgs: [t],
      text: [r, "砍后价:" + Number(i).toFixed(2), "原价:" + Number(e).toFixed(2)],
      templateId: "5cbfcdcb7f9c45aa3d628d73"
    }
  };
  return (0, _indexWeapp.request)({
    functionId: "xapp/share/getMaterial",
    method: "POST",
    body: JSON.stringify(e)
  });
},
    handleSkuName = exports.handleSkuName = function (e, t) {
  for (var r = "", i = 0, n = 0; n < e.length; n++) 127 < e.charCodeAt(n) || 94 == e.charCodeAt(n) ? i += 2 : i++, r += e[n], 1 < i && (i % t == 1 || i % t == 0) && (r += "\n", i++);

  return r;
},
    getFriendShareImg = exports.getFriendShareImg = function () {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      i = e.skuImageUrl,
      n = e.skuName,
      o = e.cutPrice,
      d = e.basicPrice,
      a = e.storeName,
      s = e.unionCode,
      u = e.activityId;
  return new Promise(function (t, r) {
    getFriendQrcode({
      unionCode: s,
      activityId: u
    }).then(function (e) {
      e = e.result, e = void 0 === e ? "" : e, e = {
        tempId: "22bdf1a15c89322",
        friendMergeParam: {
          imgs: [i, e],
          text: [n, a || orgName || "", "砍后价:" + Number(o).toFixed(2), "原价:" + Number(d).toFixed(2)],
          templateId: "5cbfd2a646a6efaa6babd40e"
        },
        qrCodeUrl: e
      };
      (0, _indexWeapp.request)({
        functionId: "xapp/share/getMaterial",
        method: "POST",
        body: JSON.stringify(e)
      }).then(function (e) {
        t(e);
      });
    }).catch(function (e) {
      r();
    });
  });
},
    getFriendQrcode = exports.getFriendQrcode = function () {
  var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      e = {
    requestText: "(" + e.unionCode + ' || "") ,' + e.activityId + " ,1",
    type: 45,
    hyaline: 1,
    width: 170
  };
  return (0, _indexWeapp.request)({
    functionId: "xapp/createQrCode",
    body: e
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
    transformRgb = exports.transformRgb = function () {
  var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "#FF1844").split("#")[1],
      t = e.slice(0, 2),
      r = e.slice(2, 4),
      i = e.slice(4, 6),
      e = [];
  return e[0] = parseInt(t, 16), e[1] = parseInt(r, 16), e[2] = parseInt(i, 16), "rgba(" + e[0] + "," + e[1] + "," + e[2] + ",0)";
};