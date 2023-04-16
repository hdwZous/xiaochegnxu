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
  var s = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== s) {
    if ("value" in s) return s.value;
    s = s.get;
    return void 0 !== s ? s.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
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

function _objectDestructuringEmpty(e) {
  if (null == e) throw new TypeError("Cannot destructure undefined");
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

var RedEnvelopesDia = (_temp2 = _class = function () {
  function r() {
    var e, t;

    _classCallCheck(this, r);

    for (var n = arguments.length, o = Array(n), s = 0; s < n; s++) o[s] = arguments[s];

    return (e = t = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "style", "isShowMoneyText", "isShowClickButton", "isClick", "upTranslateValue", "downTranslateValue", "closeRedEnvelopesDia"], t.onClose = function () {
      (0, t.props.closeRedEnvelopesDia)();
    }, t.getClick = function () {
      t.setState({
        isClick: !0
      }), setTimeout(function () {
        t.setState({
          upTranslateValue: "-100%",
          downTranslateValue: "100%"
        });
      }, 1200), setTimeout(function () {
        t.setState({
          isShowClickButton: !1
        });
      }, 1e3), setTimeout(function () {
        t.setState({
          isShowMoneyText: !0
        });
      }, 1400);
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(r, _index.Component), _createClass(r, [{
    key: "_constructor",
    value: function (e) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, e), this.state = {
        isClick: !1,
        isShowClickButton: !0,
        upTranslateValue: "0",
        downTranslateValue: "0",
        isShowMoneyText: !1
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      _objectDestructuringEmpty(this.props);
    }
  }, {
    key: "_createData",
    value: function () {
      var t = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__state,
          n = (e.isClick, e.isShowClickButton, e.upTranslateValue),
          o = e.downTranslateValue;
      e.isShowMoneyText;
      _objectDestructuringEmpty(this.__props), this.anonymousFunc0 = function (e) {
        return t.onClose(e);
      };
      n = (0, _index.internal_inline_style)({
        transform: "translateY(" + n + ")"
      }), o = (0, _index.internal_inline_style)({
        transform: "translateY(" + o + ")"
      });
      return Object.assign(this.__state, {
        anonymousState__temp: n,
        anonymousState__temp2: o,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), r;
}(), _class.$$events = ["anonymousFunc0", "getClick"], _class.$$componentPath = "pages/bargain-t/components/redEnvelopesDia/index", _temp2);
exports.default = RedEnvelopesDia, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(RedEnvelopesDia));