"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _slicedToArray = function (e, t) {
  if (Array.isArray(e)) return e;
  if (Symbol.iterator in Object(e)) return function (e, t) {
    var r = [],
        n = !0,
        o = !1,
        i = void 0;

    try {
      for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0);
    } catch (e) {
      o = !0, i = e;
    } finally {
      try {
        !n && s.return && s.return();
      } finally {
        if (o) throw i;
      }
    }

    return r;
  }(e, t);
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
},
    _createClass = function () {
  function n(e, t) {
    for (var r = 0; r < t.length; r++) {
      var n = t[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  return function (e, t, r) {
    return t && n(e.prototype, t), r && n(e, r), e;
  };
}(),
    _get = function e(t, r, n) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, r);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, r, n);
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

function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];

    return r;
  }

  return Array.from(e);
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

var Bullets = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(n)))).$usedState = ["loopArray21", "styles", "bulletList"], t.customComponents = [], _possibleConstructorReturn(t, e);
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

      var i = this.__props,
          e = (0, _index.useState)([]),
          t = _slicedToArray(e, 2),
          e = t[0],
          a = t[1],
          s = void 0;

      (0, _index.useEffect)(function () {
        if (a(i.awardWinnerList), i && i.awardWinnerList) {
          for (var n = i.awardWinnerList, e = [], t = 0; t < n.length; t++) e[t] = {}, e[t].text = n[t];

          for (var n = e, r = 0; r < 100; r++) {
            var o = JSON.stringify(n),
                o = JSON.parse(o);
            if (!(n.length < 300)) break;
            n.push.apply(n, _toConsumableArray(o));
          }

          a(n), s = setTimeout(function () {
            for (var e = n, t = 0; t < n.length; t++) {
              var r = Math.floor(80 * Math.random());
              e[t].transitionDelay = 3 * t + "s", e[t].left = "-1000", e[t].top = r;
            }

            a(e);
          }, 1e3);
        }

        return function () {
          clearTimeout(s);
        };
      }, []);
      t = e.map(function (e, t) {
        return e = {
          $original: (0, _index.internal_get_original)(e)
        }, {
          $loopState__temp2: (0, _index.internal_inline_style)({
            transform: "translate(" + e.$original.left + "px)",
            "transition-delay": "" + e.$original.transitionDelay,
            top: e.$original.top + "px"
          }),
          $original: e.$original
        };
      });
      return Object.assign(this.__state, {
        loopArray21: t,
        styles: _indexModuleLessMap2.default,
        bulletList: e
      }), this.__state;
    }
  }]), i;
}(), _class.$$events = [], _class.$$componentPath = "pages/redPacket-t/components/Bullets/index", _temp2);
exports.default = Bullets, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Bullets));