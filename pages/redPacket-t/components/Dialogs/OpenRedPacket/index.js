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
    _index = require("../../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp = require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");

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

var OpenRedPacket = (_temp2 = _class = function () {
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "style", "isOpenRedPacket", "cancelHandle", "openRedRain", "redPackageWindowsUrl"], t.openRedPacket = function () {
      t.setState({
        isOpenRedPacket: !0
      }), (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickOpen",
        click_par: {
          type: "chance"
        }
      }), setTimeout(function () {
        console.log("object"), t.props.cancelHandle("chancePopState"), t.props.openRedRain();
      }, 500);
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.state = {
        isOpenRedPacket: !1
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__props.redPackageWindowsUrl,
          t = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + (void 0 === t ? "https://storage.360buyimg.com/wxmini/redpacket/%E6%9C%BA%E4%BC%9A%E5%BC%B9%E7%AA%972.png" : t) + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      });
      return this.anonymousFunc0 = function () {
        return e.__props.cancelHandle("chancePopState");
      }, Object.assign(this.__state, {
        anonymousState__temp: t,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), a;
}(), _class.$$events = ["anonymousFunc0", "openRedPacket"], _class.$$componentPath = "pages/redPacket-t/components/Dialogs/OpenRedPacket/index", _temp2);
exports.default = OpenRedPacket, Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(OpenRedPacket));