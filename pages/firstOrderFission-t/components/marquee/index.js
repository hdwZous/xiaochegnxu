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

var Marquee = (_temp2 = _class = function () {
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var r = arguments.length, o = Array(r), n = 0; n < r; n++) o[n] = arguments[n];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray16", "data", "style", "height", "background"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
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
          e = (e.height, e.background, e.data),
          r = void 0 === e ? [] : e,
          e = r.length ? r.map(function (e, t) {
        return e = {
          $original: (0, _index.internal_get_original)(e)
        }, {
          $loopState__temp2: r.length ? "swiper" + t : null,
          $loopState__temp4: r.length ? [_indexModuleLessMap2.default.nick] : null,
          $loopState__temp6: r.length ? [_indexModuleLessMap2.default.desc] : null,
          $original: e.$original
        };
      }) : [];
      return Object.assign(this.__state, {
        loopArray16: e,
        data: r,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }]), a;
}(), _class.$$events = [], _class.options = {
  addGlobalClass: !0
}, _class.$$componentPath = "pages/firstOrderFission-t/components/marquee/index", _temp2);
exports.default = Marquee, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Marquee));