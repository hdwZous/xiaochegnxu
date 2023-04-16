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
    _index = require("../../../../npm/@tarojs/taro-weapp/index.js"),
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

var ClickHalo = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var r = arguments.length, o = Array(r), n = 0; n < r; n++) o[n] = arguments[n];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["loopArray28", "style", "clickArr"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__props.clickArr,
          t = void 0 === e ? [] : e,
          e = t.map(function (e, t) {
        return e = {
          $original: (0, _index.internal_get_original)(e)
        }, {
          $loopState__temp2: (0, _index.internal_inline_style)({
            top: e.$original.y + "px",
            left: e.$original.x + "px"
          }),
          $original: e.$original
        };
      });
      return Object.assign(this.__state, {
        loopArray28: e,
        style: _indexModuleLessMap2.default,
        clickArr: t
      }), this.__state;
    }
  }]), i;
}(), _class.$$events = [], _class.$$componentPath = "pages/redPacket-t/pages/dotPacket/components/ClickHalo/index", _temp2);
exports.default = ClickHalo, Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(ClickHalo));