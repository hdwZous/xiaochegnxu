"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function o(e, t) {
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
    }
  }

  return function (e, t, r) {
    return t && o(e.prototype, t), r && o(e, r), e;
  };
}(),
    _get = function e(t, r, o) {
  null === t && (t = Function.prototype);
  var n = Object.getOwnPropertyDescriptor(t, r);

  if (void 0 !== n) {
    if ("value" in n) return n.value;
    n = n.get;
    return void 0 !== n ? n.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, r, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
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

var MyBargainGoods = (_temp2 = _class = function () {
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var r = arguments.length, o = Array(r), n = 0; n < r; n++) o[n] = arguments[n];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "style", "r", "g", "b", "backgroundColor", "item"], t.colorTransform = function (e) {
      e && (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), t.setState({
        r: parseInt(e[1], 16),
        g: parseInt(e[2], 16),
        b: parseInt(e[3], 16)
      }));
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.state = {
        r: "",
        g: "",
        b: ""
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this.props.backgroundColor;
      this.colorTransform(e);
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__state,
          t = e.r,
          r = e.g,
          o = e.b,
          n = this.__props,
          a = n.item,
          e = n.backgroundColor,
          n = 0;
      a && a.alreadyCutPrice && "100%" == (n = String(100 * (a.alreadyCutPrice / (a.alreadyCutPrice + a.restPrice)).toFixed(2)) + "%") && (n = "99.5%");
      o = (0, _index.internal_inline_style)({
        background: "rgb(" + t + ", " + r + ", " + o + ", 0.1)"
      }), e = (0, _index.internal_inline_style)({
        width: n,
        background: e
      });
      return Object.assign(this.__state, {
        anonymousState__temp: o,
        anonymousState__temp2: e,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }]), a;
}(), _class.$$events = [], _class.$$componentPath = "pages/bargain-t/components/processBox/index", _temp2);
exports.default = MyBargainGoods, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(MyBargainGoods));