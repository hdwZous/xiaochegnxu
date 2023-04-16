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
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js");

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

var Default = (_temp2 = _class = function () {
  function s() {
    var e, t;

    _classCallCheck(this, s);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "type", "style", "tips", "btnTxt", "defaultType", "defaultTips", "defaultBtnTxt", "defaultTop"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__props.defaultType,
          t = this.__props.defaultTips,
          n = this.__props.defaultBtnTxt,
          o = (0, _index.internal_inline_style)({
        paddingTop: this.__props.defaultTop || "30%"
      });
      return Object.assign(this.__state, {
        anonymousState__temp: o,
        type: e,
        style: _indexModuleLessMap2.default,
        tips: t,
        btnTxt: n
      }), this.__state;
    }
  }, {
    key: "clickSearchAddress",
    value: function () {
      (0, _indexWeapp.jump)({
        to: "indexaddress"
      });
    }
  }, {
    key: "onDefaultEvent",
    value: function () {
      this.props.onDefaultEvent();
    }
  }]), s;
}(), _class.$$events = ["onDefaultEvent"], _class.$$componentPath = "pages/grabCoupon-t/commonComponents/Default/index", _temp2);
exports.default = Default, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Default));