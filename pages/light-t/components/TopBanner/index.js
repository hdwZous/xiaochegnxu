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
        r = !0,
        o = !1,
        i = void 0;

    try {
      for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
    } catch (e) {
      o = !0, i = e;
    } finally {
      try {
        !r && s.return && s.return();
      } finally {
        if (o) throw i;
      }
    }

    return n;
  }(e, t);
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
},
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
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
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

var TopBanner = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(r)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "loopArray23", "styles", "rotationList"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index2.default.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;

      var t = this.__props,
          n = (t.topBg, t.goLogin),
          r = t.rotationList,
          e = t.homeBannerUrl,
          o = (0, _index.useState)(1),
          i = _slicedToArray(o, 2),
          a = i[0],
          s = i[1],
          o = (0, _index.useState)(1),
          i = _slicedToArray(o, 2),
          u = i[0],
          l = i[1],
          o = (0, _index.useState)(1),
          i = _slicedToArray(o, 2),
          o = i[0],
          p = i[1];

      (0, _index.useEffect)(function () {
        var e = void 0;
        return r && (e = setInterval(function () {
          u < r.length ? (p(1), l(u + 1), s(-28 * u)) : (p(0), l(0), s(0));
        }, 5e3)), function () {
          clearInterval(e);
        };
      });
      i = (0, _index.internal_inline_style)({
        backgroundImage: e ? "url(" + e + ")" : 'url("https://storage.360buyimg.com/wxmini/light/topb2.png")',
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      });

      this.anonymousFunc0 = function () {
        var e = t.infoId;
        4 === t.defaultType ? n() : (0, _indexWeapp.navigateTo)("/pages/light-t/pages/rule/index?infoId=" + e);
      };

      e = r ? (0, _index.internal_inline_style)({
        height: "28px"
      }) : null, a = r ? (0, _index.internal_inline_style)({
        transform: "translateY(" + a + "px)",
        transition: "transform " + o + "s ease-in 1s"
      }) : null, o = r ? r.map(function (e, t) {
        return e = {
          $original: (0, _index.internal_get_original)(e)
        }, {
          $loopState__temp5: r ? (0, _index.internal_inline_style)({
            height: "28px",
            lineHeight: "28px"
          }) : null,
          $original: e.$original
        };
      }) : [];
      return Object.assign(this.__state, {
        anonymousState__temp: i,
        anonymousState__temp2: e,
        anonymousState__temp3: a,
        loopArray23: o,
        styles: _indexModuleLessMap2.default,
        rotationList: r
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc0"], _class.$$componentPath = "pages/light-t/components/TopBanner/index", _temp2);
exports.default = TopBanner, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(TopBanner));