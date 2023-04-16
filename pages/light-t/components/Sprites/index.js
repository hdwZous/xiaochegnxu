"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function n(t, e) {
    for (var r = 0; r < e.length; r++) {
      var n = e[r];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  return function (t, e, r) {
    return e && n(t.prototype, e), r && n(t, r), t;
  };
}(),
    _get = function t(e, r, n) {
  null === e && (e = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(e, r);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(n) : void 0;
  }

  e = Object.getPrototypeOf(e);
  if (null !== e) return t(e, r, n);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var Sprites = (_temp2 = _class = function () {
  function i() {
    var t, e;

    _classCallCheck(this, i);

    for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];

    return (t = e = _possibleConstructorReturn(this, (t = i.__proto__ || Object.getPrototypeOf(i)).call.apply(t, [this].concat(n)))).$usedState = ["anonymousState__temp", "loopArray29", "filterList", "splitNum", "lightIndex", "imgUrl", "lightArr", "item", "isMask"], e.getArr = function (t) {
      return Array.from({
        length: t
      }, function (t, e) {
        return e;
      });
    }, e.customComponents = [], _possibleConstructorReturn(e, t);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (t) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, t), this.state = {}, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {}
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__props,
          o = t.imgUrl,
          i = t.splitNum,
          s = t.lightArr,
          e = t.item,
          a = t.lightIndex,
          r = (t.isMask, this.getArr(i)),
          l = null,
          l = 2 == e.status || e.fragmentList.length < 1 ? "unset" : null,
          t = (0, _index.internal_inline_style)({
        margin: null == l ? "-2px" : "0"
      }),
          e = r.map(function (t, e) {
        var r = null,
            n = !(t = {
          $original: (0, _index.internal_get_original)(t)
        });
        return {
          isLight: n = a === e || s.includes(t.$original) ? !0 : n,
          $loopState__temp3: r = 4 == i ? (0, _index.internal_inline_style)({
            backgroundImage: "url(" + o + ")",
            border: l
          }) : r,
          $loopState__temp5: (0, _index.internal_inline_style)({
            backgroundImage: "url(" + o + ")",
            border: l
          }),
          $original: t.$original
        };
      });
      return Object.assign(this.__state, {
        anonymousState__temp: t,
        loopArray29: e,
        filterList: r,
        splitNum: i,
        lightIndex: a
      }), this.__state;
    }
  }]), i;
}(), _class.$$events = [], _class.$$componentPath = "pages/light-t/components/Sprites/index", _temp2);
exports.default = Sprites, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Sprites));