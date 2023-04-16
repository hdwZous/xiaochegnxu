"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.encrypt = exports.uploadImage = exports.throttle = exports.onClickShare = exports.imgLoad = void 0, exports.debounceImmediate = debounceImmediate, exports.debounce = debounce;

var _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _jsencrypt_weapp = require("./jsencrypt_weapp.js"),
    _jsencrypt_weapp2 = _interopRequireDefault(_jsencrypt_weapp);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var isWeapp = !0,
    shareFlag = !0,
    imgLoad = function (n, a) {
  var r = 0;
  n.forEach(function (e) {
    var t = setInterval(function () {
      e.complete && (r += 1, clearInterval(t), r === n.length && a());
    }, 50);
  });
};

function onClickShare(e) {
  e.title;
  var t = e.description,
      n = e.infoId,
      a = e.xcxShareTitle,
      r = e.xcxSharePicUrl,
      o = e.inviteCode,
      i = "" + window.location.origin + window.location.pathname + "#/pages/redPacket-t/index?infoId=" + n;
  throttle(function () {
    var e = {
      djNewShare: 1,
      appId: "gh_5103b94a8a56",
      title: a,
      mpImgUrl: r,
      path: "/pages/redPacket-t/index?infoId=" + n + "&inviteCode=" + o,
      imgUrl: r,
      desc: t || "京东到家红包雨游戏",
      shareUrl: i,
      pyqImg: r,
      channel: "Wxfriends",
      callback: "cashShareCallBack",
      clickcallback: "cashShareCallBack"
    };
    console.log("shareInfo==", e), (0, _indexWeapp.openShare)(e);
  });
}

function throttle(e) {
  shareFlag && (shareFlag = !1, e.apply(this, arguments), setTimeout(function () {
    shareFlag = !0;
  }, 500));
}

var uploadImage = function (e) {
  _index2.default.getImageInfo({
    src: e
  });
};

function encrypt(e) {
  var t = null;
  (t = new _jsencrypt_weapp2.default({
    default_key_size: 1024
  })).setPublicKey("-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMV6vTGRtq0krLSyPVYt7rkLT2FGipdGnGXzzl6j/R489CmkO/16hJd+7DWeSTX1kw3//VrIdSEj13UNC7zSIWj1wc0EwPfEGl2KVZqeCm5P6d8JUIt/rzq4fl2+SnR2rc4L7PZnU/nOnlPbCGH+yWEe8RahF19Ib9uGDTt7B5MwIDAQAB-----END PUBLIC KEY-----");
  e = t.encrypt(e);
  return t = null, e;
}

function debounceImmediate(a, r, o) {
  var i;
  return function () {
    var e = this,
        t = arguments,
        n = o && !i;
    clearTimeout(i), i = setTimeout(function () {
      i = null, o || a.apply(e, t);
    }, r), n && a.apply(e, t);
  };
}

function debounce(n, a) {
  var r = null;
  return function () {
    var e = this,
        t = arguments;
    clearTimeout(r), r = setTimeout(function () {
      n.apply(e, t);
    }, a);
  };
}

exports.imgLoad = imgLoad, exports.onClickShare = onClickShare, exports.throttle = throttle, exports.uploadImage = uploadImage, exports.encrypt = encrypt;