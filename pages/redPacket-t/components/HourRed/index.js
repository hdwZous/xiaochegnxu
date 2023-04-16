"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _slicedToArray = function (e, t) {
  if (Array.isArray(e)) return e;
  if (Symbol.iterator in Object(e)) return function (e, t) {
    var n = [],
        i = !0,
        o = !1,
        r = void 0;

    try {
      for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
    } catch (e) {
      o = !0, r = e;
    } finally {
      try {
        !i && s.return && s.return();
      } finally {
        if (o) throw r;
      }
    }

    return n;
  }(e, t);
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
},
    _createClass = function () {
  function i(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  return function (e, t, n) {
    return t && i(e.prototype, t), n && i(e, n), e;
  };
}(),
    _get = function e(t, n, i) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(i) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, i);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/env/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _api = require("../../api.js"),
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
    HourRed = (_temp2 = _class = function () {
  function r() {
    var e, t;

    _classCallCheck(this, r);

    for (var n = arguments.length, i = Array(n), o = 0; o < n; o++) i[o] = arguments[o];

    return (e = t = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(i)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__68", "styles", "infoState", "leftTime", "timer", "buttonType", "leftChance", "middleMsg", "hour", "minute", "second", "buttonText"], t.customComponents = ["BigCard"], _possibleConstructorReturn(t, e);
  }

  return _inherits(r, _index2.default.Component), _createClass(r, [{
    key: "_constructor",
    value: function (e) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__68"),
          n = this.__props,
          i = (0, _index.useState)("00"),
          o = _slicedToArray(i, 2),
          r = o[0],
          a = o[1],
          s = (0, _index.useState)("00"),
          u = _slicedToArray(s, 2),
          p = u[0],
          c = u[1],
          l = (0, _index.useState)("00"),
          d = _slicedToArray(l, 2),
          _ = d[0],
          f = d[1],
          m = (0, _index.useState)(null),
          e = _slicedToArray(m, 2),
          i = e[0],
          y = e[1],
          o = (0, _index.useState)(!1),
          s = _slicedToArray(o, 2),
          x = s[0],
          h = s[1],
          u = (0, _index.useState)(""),
          l = _slicedToArray(u, 2),
          d = l[0],
          b = l[1],
          m = (0, _index.useState)(null),
          e = _slicedToArray(m, 2),
          g = e[0],
          j = e[1],
          v = n.infoId,
          S = n.defaultType,
          o = (n.goLogin, n.homeData || {}),
          T = o.infoState,
          k = o.state,
          s = o.firstVisitChance,
          w = o.leftChance,
          u = o.sceneList,
          l = o.middleMsg,
          C = o.leftTime,
          m = o.matterDetail,
          e = void 0 === m ? {} : m,
          P = o.isSubscribeNext,
          m = e && e.robRedPackagePanelUrl ? e.robRedPackagePanelUrl : "https://storage.360buyimg.com/wxmini/redpacket/%E6%95%B4%E7%82%B92%E5%8E%8B%E7%BC%A9.png",
          o = e && e.redPackageStyleUrl ? e.redPackageStyleUrl : "https://storage.360buyimg.com/wxmini/redpacket/littlered.png",
          R = e.subscribeSuccessGotuUrl,
          O = e.activityFinishGoToUrl;

      e.description, e.xcxShareTitle, e.xcxSharePicUrl;
      (0, _index.useEffect)(function () {
        C && (0, _indexWeapp2.countDown)(C, function (e) {
          e.end ? (a("00"), c("00"), f("00"), y(null), C && n.fetchData()) : (a(e.hour), c(e.minute), f(e.second), y(e.timer));
        }), _indexWeapp.isDaojiaApp && A();
      }, []), (0, _index.useEffect)(function () {
        S && 4 == S ? (b("去登录"), j(5)) : 0 == T ? (b("去挑好物"), j(3)) : 1 == T ? (0 == k && (0 < w ? (b("开启红包雨"), j(1)) : (b("邀请好友得次数"), j(2))), 1 == k && (!P && _indexWeapp.isDaojiaApp ? (b("提醒我抢红包"), j(0)) : (b("去挑好物"), j(3))), 2 == k && (b("去挑好物"), j(4))) : 2 == T && (b("去挑好物"), j(4));
      }, [S, T, k, s, P, _indexWeapp.isDaojiaApp, w]);

      var e = function () {
        var e = null;

        switch (g) {
          case 0:
            e = "remind", W();
            break;

          case 1:
            e = "beginGet", D();
            break;

          case 2:
            e = "invite", q();
            break;

          case 3:
          case 4:
            e = "shopping", E();
            break;

          case 5:
            n.onClearLoginTimer(), n.goLogin();
        }

        (0, _indexWeapp4.clickReport)({
          click_id: "clickButton",
          click_par: {
            text: e,
            type: "back"
          }
        });
      },
          A = function () {
        (0, _indexWeapp2.hasOpenPushSetting2)(M);
      },
          M = function (e) {
        1 == e && h(!0), 0 == e && h(!1);
      },
          W = function () {
        x ? (0, _api.getRemindMe)({
          infoId: v
        }).then(function (e) {
          e && 0 == e.code ? ((0, _indexWeapp3.showToast)({
            title: "提醒成功!"
          }), n.cancelHandle("permissionState")) : (0, _indexWeapp3.showToast)({
            title: e.msg || "提醒失败!"
          });
        }).catch(function (e) {
          (0, _indexWeapp3.showToast)({
            title: e.msg || "系统开小差了，稍后再试哦～"
          });
        }) : n.openPermissPop();
      },
          D = function () {
        n.openRedRain();
      },
          q = function () {},
          E = function () {
        $(3 == g ? R : O);
      },
          $ = function (e) {
        e && (0, _indexWeapp3.navigateTo)("/pages/h5/index?needToken=1&url=" + encodeURIComponent(e));
      },
          s = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + m + ") ",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat"
      }),
          m = (0, _index.internal_inline_style)({
        marginTop: 1 == T ? "50px" : "95px"
      });

      return this.anonymousFunc0 = e, this.anonymousFunc1 = e, _index.propsManager.set({
        infoState: T,
        state: k,
        defaultType: S,
        sceneList: u,
        redPackageStyleUrl: o
      }, t), Object.assign(this.__state, {
        anonymousState__temp: s,
        anonymousState__temp2: m,
        $compid__68: t,
        styles: _indexModuleLessMap2.default,
        infoState: T,
        leftTime: C,
        timer: i,
        buttonType: g,
        leftChance: w,
        middleMsg: l,
        hour: r,
        minute: p,
        second: _,
        buttonText: d
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }]), r;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/redPacket-t/components/HourRed/index", _temp2);
exports.default = HourRed, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(HourRed));