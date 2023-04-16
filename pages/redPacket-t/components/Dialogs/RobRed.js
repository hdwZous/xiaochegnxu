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

var RobRed = (_temp2 = _class = function () {
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "styles", "okText"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(a, _index2.default.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__props,
          t = (e.title, e.text, e.okText),
          n = (e.tagText, e.openWindowUrl),
          n = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + (void 0 === n ? "https://storage.360buyimg.com/wxmini/redpacket/%E7%AB%8B%E5%8D%B3%E6%8A%A22%E5%8E%8B%E7%BC%A9.png" : n) + ")",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat"
      });
      return this.anonymousFunc0 = function () {
        return e.cancelHandle("isRainOpenFlag");
      }, this.anonymousFunc1 = function () {
        (0, _indexWeapp.clickReport)({
          create_time: new Date(),
          click_id: "clickGet",
          click_par: {
            type: "dogWindow"
          }
        }), e.openRedRain(), e.cancelHandle("isRainOpenFlag");
      }, Object.assign(this.__state, {
        anonymousState__temp: n,
        styles: _indexModuleLessMap2.default,
        okText: t
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }]), a;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/redPacket-t/components/Dialogs/RobRed", _temp2);
exports.default = RobRed, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(RobRed));