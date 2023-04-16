"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function o(e, t) {
    for (var n = 0; n < t.length; n++) {
      var o = t[n];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
    }
  }

  return function (e, t, n) {
    return t && o(e.prototype, t), n && o(e, n), e;
  };
}(),
    _get = function e(t, n, o) {
  null === t && (t = Function.prototype);
  var r = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp5 = require("../../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexWeapp6 = require("../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),
    _indexWeapp7 = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _bargain = require("../../api/bargain.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _classCallCheck(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
  if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
  if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

var Card = (_temp2 = _class = function () {
  function r() {
    var e, m;

    _classCallCheck(this, r);

    for (var t = arguments.length, n = Array(t), o = 0; o < t; o++) n[o] = arguments[o];

    return (e = m = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "anonymousState__temp7", "anonymousState__temp8", "style", "cutPriceState", "d", "nickHeadUrl", "skuImageUrl", "logoUrl", "selfCutCount", "totalSelfCutCount", "h", "m", "s", "skuName", "storeName", "takeCount", "cutPriceTotal", "restPrice", "leftNewUserCount", "nextSelfCutPrice", "cutPrice", "r", "g", "b", "timer", "expireTime", "backgroundColor", "keepTime", "getCutPriceDetail", "storeId", "skuId", "orgCode", "from", "shareInfo", "isShowHasCutFourDia", "openHasCutFourDia", "closeHasCutFourDia"], m.countDown = function (e) {
      var t = m.props,
          n = t.keepTime,
          o = t.getCutPriceDetail;
      (0, _indexWeapp6.countDown)(e, function (e) {
        e.end ? (m.setState({
          timer: null
        }), o()) : m.setState({
          d: e.day,
          h: e.hour,
          m: e.minute,
          s: e.second,
          timer: e.timer
        }), n(e.day, e.hour, e.minute, e.second);
      });
    }, m.colorTransform = function (e) {
      e && (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), m.setState({
        r: parseInt(e[1], 16),
        g: parseInt(e[2], 16),
        b: parseInt(e[3], 16)
      }));
    }, m.jumpStore = function () {
      var e = m.props,
          t = e.storeId,
          n = e.skuId,
          e = e.orgCode;
      (0, _indexWeapp7.jump)({
        to: "store",
        params: {
          storeId: t || "",
          orgCode: e || "",
          addCart: !0,
          needAddCar: !0,
          needAddCart: 1,
          isAddCart: !0,
          skuId: n || "",
          needAnchorSku: !0
        }
      });
    }, m.jumpList = function () {
      var e = m.props.from;
      "launch" == (void 0 === e ? "" : e) ? (0, _indexWeapp2.navigateBack)() : (0, _indexWeapp2.navigateTo)("/pages/bargain-t/list/index");
    }, m.clickReport = function () {
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickShare"
      });
    }, m.shareOfH5 = function () {
      var e = m.$router.params,
          t = e.activityId,
          n = e.unionCode,
          o = e.storeId,
          r = e.skuId,
          a = e.orgCode,
          i = m.props,
          e = i.shareInfo,
          s = void 0 === e ? {} : e,
          u = (i.isShowHasCutFourDia, i.selfCutCount),
          c = i.getCutPriceDetail,
          l = i.openHasCutFourDia,
          p = i.closeHasCutFourDia,
          d = "" + window.location.origin + window.location.pathname + "#/pages/sharePreview-t/index?image=" + (s.friendMergedImg || "https://storage.360buyimg.com/wximg/h5/bargain/4.jpg") + "&title=砍价领商品";

      m._throttle(function () {
        var e = {
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: s.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          mpImgUrl: s.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          path: "/pages/bargain-t/detail/index?unionCode=" + n + "&activityId=" + t + "&skuId=" + r + "&storeId=" + o + "&orgCode=" + a,
          imgUrl: s.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          desc: s.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          shareUrl: d,
          pyqImg: s.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        };
        (0, _indexWeapp3.openShare)(e), u < 4 && m.senderCutPrice(), setTimeout(function () {
          c();
        }, 3e3), 3 == u && l(), 3 != u && p(), m.clickReport();
      });
    }, m.senderCutPrice = function () {
      var e = m.$router.params,
          t = e.activityId,
          n = e.unionCode,
          o = e.storeId,
          r = e.skuId,
          a = e.orgCode,
          e = m.getLoginInfo() || {};
      (0, _bargain.senderCutPrice)({
        storeId: o || "",
        nickName: e.nickName || "",
        nickHeadUrl: e.avatarUrl || "",
        skuId: r || "",
        activityId: t || "",
        orgCode: a,
        openId: e.openId || "",
        unionCode: n || ""
      });
    }, m.customComponents = [], _possibleConstructorReturn(m, e);
  }

  return _inherits(r, _index.Component), _createClass(r, [{
    key: "_constructor",
    value: function (e) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, e), this.shareFlag = !0, this.state = {
        d: null,
        h: null,
        m: null,
        s: null,
        r: 255,
        g: 255,
        b: 255,
        timer: null
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this.props,
          t = e.expireTime,
          n = e.backgroundColor;
      e.cutPriceTotal, e.restPrice;
      0 == e.cutPriceState && this.countDown(t), this.colorTransform(n), this.clearTime();
    }
  }, {
    key: "clearTime",
    value: function () {
      clearInterval(this.state.timer);
    }
  }, {
    key: "_throttle",
    value: function (e) {
      var t = this;
      this.shareFlag && (this.shareFlag = !1, e.apply(this, arguments), setTimeout(function () {
        t.shareFlag = !0;
      }, 500));
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp4.getStorageSync)(_indexWeapp5.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "showSubscribe",
    value: function () {
      this.props.onShowSubscribe && this.props.onShowSubscribe(), this.clickReport();
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__state,
          n = (t.d, t.h, t.m, t.s, t.r),
          o = t.g,
          r = t.b,
          a = this.__props,
          i = a.cutPriceState,
          s = a.cutPriceTotal,
          u = a.skuImageUrl,
          c = a.takeCount,
          l = a.nickHeadUrl,
          p = a.skuName,
          d = a.logoUrl,
          m = a.storeName,
          _ = a.backgroundColor,
          g = a.restPrice,
          f = a.cutPrice,
          h = a.leftNewUserCount,
          y = a.selfCutCount,
          C = a.nextSelfCutPrice,
          b = a.totalSelfCutCount,
          k = 0;
      0 == i && "100%" == (k = String(100 * (s / (s + g)).toFixed(2)) + "%") && (k = "99.5%");
      var x = (0, _index.internal_inline_style)({
        background: "rgb(" + n + ", " + o + ", " + r + ", 0.1)"
      }),
          t = 0 == i ? (0, _index.internal_inline_style)({
        color: _
      }) : null,
          a = 0 == i ? (0, _index.internal_inline_style)({
        background: "rgb(" + n + ", " + o + ", " + r + ", 0.1)"
      }) : null,
          n = 0 == i ? (0, _index.internal_inline_style)({
        width: k,
        background: _
      }) : null;

      this.anonymousFunc0 = function () {
        return e.showSubscribe();
      };

      o = y < b ? (0, _index.internal_inline_style)({
        background: _
      }) : null;

      this.anonymousFunc1 = function () {
        return e.showSubscribe();
      };

      r = y == b ? (0, _index.internal_inline_style)({
        background: _
      }) : null, k = 4 == i || 3 == i || 1 == i ? (0, _index.internal_inline_style)({
        background: _
      }) : null;

      this.anonymousFunc2 = function () {
        return e.jumpList();
      };

      _ = 2 == i ? (0, _index.internal_inline_style)({
        background: "#FFC91C"
      }) : null;
      return this.anonymousFunc3 = function () {
        return e.jumpStore();
      }, Object.assign(this.__state, {
        anonymousState__temp: x,
        anonymousState__temp2: t,
        anonymousState__temp3: a,
        anonymousState__temp4: n,
        anonymousState__temp5: o,
        anonymousState__temp6: r,
        anonymousState__temp7: k,
        anonymousState__temp8: _,
        style: _indexModuleLessMap2.default,
        cutPriceState: i,
        nickHeadUrl: l,
        skuImageUrl: u,
        logoUrl: d,
        selfCutCount: y,
        totalSelfCutCount: b,
        skuName: p,
        storeName: m,
        takeCount: c,
        cutPriceTotal: s,
        restPrice: g,
        leftNewUserCount: h,
        nextSelfCutPrice: C,
        cutPrice: f
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }, {
    key: "anonymousFunc2",
    value: function (e) {}
  }, {
    key: "anonymousFunc3",
    value: function (e) {}
  }]), r;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], _class.$$componentPath = "pages/bargain-t/components/card/index", _temp2);
exports.default = Card, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Card));