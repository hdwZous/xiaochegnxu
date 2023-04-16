"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  return function (e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), e;
  };
}(),
    _get = function e(t, n, r) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(r) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, r);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _bargain = require("../../api/bargain.js"),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),
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

var BargainDia = (_temp2 = _class = function () {
  function o() {
    var e, _;

    _classCallCheck(this, o);

    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];

    return (e = _ = _possibleConstructorReturn(this, (e = o.__proto__ || Object.getPrototypeOf(o)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "style", "selfCutCount", "totalSelfCutCount", "isShowHasCutFourDia", "leftNewUserCount", "cutPriceTotal", "lastSelfCutPrice", "restPrice", "nextSelfCutPrice", "r", "g", "b", "percent", "backgroundColor", "shareInfo", "getCutPriceDetail", "openHasCutFourDia", "closeHasCutFourDia", "shareCount"], _.colorTransform = function (e) {
      e && (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), _.setState({
        r: parseInt(e[1], 16),
        g: parseInt(e[2], 16),
        b: parseInt(e[3], 16)
      }));
    }, _.onClose = function () {
      _.props.onCloseDia;

      _.props.onCloseDia();
    }, _.clickReport = function () {
      var e = _.props,
          t = (e.shareInfo, e.getCutPriceDetail, e.selfCutCount),
          n = e.isShowHasCutFourDia,
          r = e.totalSelfCutCount,
          e = {};
      1 == t && (e = {
        type: "first"
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: e
      })), 2 == t && (2 == r && 1 == n || 2 < r && 0 == n) && (e = {
        type: "second"
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: e
      })), 3 == t && (3 == r && 1 == n || 3 < r && 0 == n) && (e = {
        type: "third"
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: e
      })), 4 == t && 1 == n && (e = {
        type: "fourth"
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: e
      })), t == r && 0 == n && (e = {
        type: "back"
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: e
      }));
    }, _.shareOfH5 = function () {
      var e = _.$router.params,
          t = e.activityId,
          n = e.unionCode,
          r = e.storeId,
          o = e.skuId,
          a = e.orgCode,
          e = _.props,
          i = e.shareInfo,
          s = e.getCutPriceDetail,
          u = e.selfCutCount,
          c = e.openHasCutFourDia,
          l = e.closeHasCutFourDia,
          p = e.isShowHasCutFourDia,
          d = "" + window.location.origin + window.location.pathname + "#/pages/sharePreview-t/index?image=" + (i.friendMergedImg || "https://storage.360buyimg.com/wximg/h5/bargain/4.jpg") + "&title=砍价领商品";

      _._throttle(function () {
        var e = {
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: i.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          mpImgUrl: i.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          path: "/pages/bargain-t/detail/index?unionCode=" + n + "&activityId=" + t + "&skuId=" + o + "&storeId=" + r + "&orgCode=" + a,
          imgUrl: i.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          desc: i.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          shareUrl: d,
          pyqImg: i.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        };
        (0, _indexWeapp4.openShare)(e), _.onClose(), u < 4 && _.senderCutPrice(), setTimeout(function () {
          s();
        }, 3e3), 4 == u && 1 == p && setTimeout(function () {
          s();
        }, 3e3), 3 == u && c(), 3 != u && l(), _.clickReport();
      });
    }, _.senderCutPrice = function () {
      var e = _.$router.params,
          t = e.activityId,
          n = e.unionCode,
          r = e.storeId,
          o = e.skuId,
          a = e.orgCode,
          e = _.getLoginInfo() || {};
      (0, _bargain.senderCutPrice)({
        storeId: r || "",
        nickName: e.nickName || "",
        nickHeadUrl: e.avatarUrl || "",
        skuId: o || "",
        activityId: t || "",
        orgCode: a,
        openId: e.openId || "",
        unionCode: n || ""
      });
    }, _.customComponents = [], _possibleConstructorReturn(_, e);
  }

  return _inherits(o, _index.Component), _createClass(o, [{
    key: "_constructor",
    value: function (e) {
      _get(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "_constructor", this).call(this, e), this.shareFlag = !0, this.state = {
        r: "",
        g: "",
        b: "",
        percent: 0
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this.props,
          t = (e.selfCutCount, e.backgroundColor);
      e.cutPriceTotal, e.restPrice, e.isShowHasCutFourDia;
      this.colorTransform(t);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function (e) {
      var t = e.selfCutCount,
          n = (e.backgroundColor, e.cutPriceTotal),
          r = e.restPrice,
          o = (e.isShowHasCutFourDia, "");
      t == e.totalSelfCutCount && (o = String(100 * (n / (n + r)).toFixed(2)) + "%", this.setState({
        percent: o = "100%" == o ? "99.5%" : o
      }));
    }
  }, {
    key: "_throttle",
    value: function (e) {
      var t = this;
      this.shareFlag && (this.shareFlag = !1, e.apply(this, arguments), setTimeout(function () {
        t.shareFlag = !0;
      }, 1e3));
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp.getStorageSync)(_indexWeapp3.LOGIN_INFO);
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
      var t = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__state,
          n = e.r,
          r = e.g,
          o = e.b,
          a = e.percent,
          i = this.__props,
          s = i.selfCutCount,
          u = (i.shareCount, i.cutPriceTotal),
          c = i.restPrice,
          l = i.backgroundColor,
          p = i.lastSelfCutPrice,
          d = i.nextSelfCutPrice,
          _ = i.leftNewUserCount,
          f = i.isShowHasCutFourDia,
          e = i.totalSelfCutCount;

      this.anonymousFunc0 = function (e) {
        return t.onClose(e);
      };

      i = (0, _index.internal_inline_style)({
        color: l
      }), o = s == e && 0 == f ? (0, _index.internal_inline_style)({
        background: "rgb(" + n + ", " + r + ", " + o + ", 0.1)"
      }) : null, a = s == e && 0 == f ? (0, _index.internal_inline_style)({
        width: a,
        background: l
      }) : null, l = (0, _index.internal_inline_style)({
        background: l
      });
      return this.anonymousFunc1 = function () {
        return t.showSubscribe();
      }, Object.assign(this.__state, {
        anonymousState__temp: i,
        anonymousState__temp2: o,
        anonymousState__temp3: a,
        anonymousState__temp4: l,
        style: _indexModuleLessMap2.default,
        selfCutCount: s,
        totalSelfCutCount: e,
        isShowHasCutFourDia: f,
        leftNewUserCount: _,
        cutPriceTotal: u,
        lastSelfCutPrice: p,
        restPrice: c,
        nextSelfCutPrice: d
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }]), o;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/bargain-t/components/bargainDia/index", _temp2);
exports.default = BargainDia, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(BargainDia));