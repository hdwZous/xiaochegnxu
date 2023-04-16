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
  var a = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== a) {
    if ("value" in a) return a.value;
    a = a.get;
    return void 0 !== a ? a.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _goToByCouponWeapp = require("../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
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

var isH5 = !1,
    isWeapp = !0,
    Coupon = (_temp2 = _class = function () {
  function a() {
    var e, i;

    _classCallCheck(this, a);

    for (var t = arguments.length, n = Array(t), o = 0; o < t; o++) n[o] = arguments[o];

    return (e = i = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "styles", "rewardType", "tagText", "firstVisitChance", "haveChance", "title", "rewardValue", "useDoor", "rewardName", "text", "couponInfo", "homeData", "infoId", "okText", "playAgain", "__fn_onClick", "cancelHandle"], i.toUse = function (e) {
      var t = i.props.couponInfo,
          n = void 0 === t ? {} : t,
          o = n.rewardType,
          a = n.couponId,
          r = n.goToUrl,
          t = n.couponCode,
          n = n.markState;
      0 == o && (r ? (0, _indexWeapp2.navigateTo)("/pages/h5/index?needToken=1&url=" + encodeURIComponent(r)) : (0, _goToByCouponWeapp.goToByCouponId)({
        couponId: a,
        code: t,
        passThroughParam: {
          markState: n,
          code: t
        }
      })), 1 == o && (r ? (0, _indexWeapp2.navigateTo)("/pages/h5/index?needToken=1&url=" + encodeURIComponent(r)) : (0, _goToByCouponWeapp.goToByCouponId)({
        couponId: a,
        code: t,
        passThroughParam: {
          markState: n,
          code: t
        }
      })), 2 == o && (0, _indexWeapp2.navigateTo)("/pages/h5/index?needToken=1&url=" + encodeURIComponent("https://daojia.jd.com/html/vue/index.html#integral"));
    }, i.clickRp = function (e, t) {
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }, i.handleClickShare = function (e) {
      console.log("Coupon this.props :>> ", i.props);
      var t = i.props.homeData.matterDetail,
          n = t.description,
          o = t.xcxShareTitle,
          t = t.xcxSharePicUrl;
      i.clickRp("clickLayer", {
        type: "share"
      }), e && ((e = {}).xcxShareTitle = o, e.xcxSharePicUrl = t, e.description = n, e.infoId = i.props.infoId, i.props.onClickShare(e));
    }, i.customComponents = [], _possibleConstructorReturn(i, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__props,
          n = (t.infoId, t.title),
          o = t.text,
          a = (t.okText, t.tagText),
          r = t.couponInfo,
          i = t.homeData,
          p = void 0 === i ? {} : i,
          u = p.matterDetail,
          s = void 0 === u ? {} : u,
          c = p.firstVisitChance,
          l = s.awardWindowsUrl,
          d = (s.description, s.xcxShareTitle, s.xcxSharePicUrl, r || {}),
          t = d.rewardType,
          i = d.rewardValue,
          u = d.rewardName,
          p = d.useDoor,
          s = d.haveChance,
          r = (d.couponId, d.goToUrl, (0, _index.internal_inline_style)({
        backgroundImage: "url(" + (void 0 === l ? "https://storage.360buyimg.com/wxmini/redpacket/%E5%BC%80%E5%A5%96%E5%BC%B9%E7%AA%97.png" : l) + ") ",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      }));

      this.anonymousFunc0 = function () {
        return e.__props.cancelHandle("chancePopState");
      };

      d = 1 == t ? (0, _index.internal_inline_style)({
        background: 'url("https://storage.360buyimg.com/wxmini/redpacket/zhe.png") 0% 0% / contain no-repeat'
      }) : null, l = 2 == t ? (0, _index.internal_inline_style)({
        background: 'url("https://storage.360buyimg.com/wxmini/redpacket/bean.png") 0% 0% / contain no-repeat'
      }) : null;
      return this.anonymousFunc1 = function () {
        return e.toUse();
      }, this.anonymousFunc2 = function () {
        return e.toUse();
      }, this.anonymousFunc3 = function () {
        return e.handleClickShare(!1);
      }, Object.assign(this.__state, {
        anonymousState__temp: r,
        anonymousState__temp2: {
          marginLeft: "1px"
        },
        anonymousState__temp3: d,
        anonymousState__temp4: l,
        styles: _indexModuleLessMap2.default,
        rewardType: t,
        tagText: a,
        firstVisitChance: c,
        haveChance: s,
        title: n,
        rewardValue: i,
        useDoor: p,
        rewardName: u,
        text: o
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
    key: "funPrivatezutZw",
    value: function () {
      return this.props.playAgain.apply(void 0, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: "anonymousFunc3",
    value: function (e) {}
  }]), a;
}(), _class.$$events = ["anonymousFunc3", "anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "funPrivatezutZw"], _class.$$componentPath = "pages/redPacket-t/components/Dialogs/Coupon", _temp2);
exports.default = Coupon, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Coupon));