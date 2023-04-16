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
  var i = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== i) {
    if ("value" in i) return i.value;
    i = i.get;
    return void 0 !== i ? i.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _api = require("../../api.js"),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
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

var FriendHelp = (_temp2 = _class = function () {
  function r() {
    var e, t;

    _classCallCheck(this, r);

    for (var n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];

    return (e = t = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "styles", "okText"], t.customComponents = [], _possibleConstructorReturn(t, e);
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
      this.$prefix;
      var n = this.__props,
          e = (n.title, n.text, n.okText),
          o = (n.tagText, n.helpType),
          i = n.infoId,
          t = n.inviteCode,
          r = n.bgImg;
      (0, _index.useEffect)(function () {
        var e = null,
            e = "isShowFrinendHelp" == o ? "help" : "helpSuc";
        (0, _indexWeapp2.clickReport)({
          page_name: "lightenGame",
          create_time: new Date(),
          click_id: "showLayer",
          click_par: {
            type: e,
            infoId: i
          }
        });
      }, []);

      var a = function () {
        var e = {};
        e.infoId = i, e.inviteCode = t, (0, _api.getHelp)(e).then(function (e) {
          e && 0 == e.code ? n.openHelpPop() : ((0, _indexWeapp.showToast)({
            title: e.msg || "助力失败！"
          }), n.cancelHandle(o));
        }).catch(function (e) {
          (0, _indexWeapp.showToast)({
            title: e.msg || "助力失败！"
          }), n.cancelHandle(o);
        });
      },
          s = (0, _index.internal_inline_style)({
        zIndex: 20
      }),
          r = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + r + ") ",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      });

      return this.anonymousFunc0 = function () {
        var e = null,
            t = "",
            t = "isShowFrinendHelp" == o ? (a(), e = "help", "为好友助力") : (n.cancelHandle(o), e = "helpSuc", "我也去瓜分");
        (0, _indexWeapp2.clickReport)({
          page_name: "lightenGame",
          create_time: new Date(),
          click_id: "clickLayer",
          click_par: {
            type: e,
            btnName: t,
            infoId: i
          }
        });
      }, this.anonymousFunc1 = function () {
        n.cancelHandle(o);
      }, Object.assign(this.__state, {
        anonymousState__temp: s,
        anonymousState__temp2: r,
        styles: _indexModuleLessMap2.default,
        okText: e
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }]), r;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/light-t/components/FriendHelpDialog/index", _temp2);
exports.default = FriendHelp, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(FriendHelp));