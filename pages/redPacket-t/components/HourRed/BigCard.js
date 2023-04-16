"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
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

var isWeapp = !0,
    BigCard = (_temp2 = _class = function () {
  function s() {
    var e, t;

    _classCallCheck(this, s);

    for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];

    return (e = t = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(n)))).$usedState = ["$compid__81", "defaultType", "styles", "infoState", "state", "sceneList"], t.customComponents = ["RenderRedActivity"], _possibleConstructorReturn(t, e);
  }

  return _inherits(s, _index2.default.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__81"),
          r = this.__props,
          n = r.infoState,
          o = r.state,
          s = r.defaultType,
          e = r.sceneList,
          r = r.redPackageStyleUrl;
      return 2 != n && e && e.length, _index.propsManager.set({
        sceneList: e,
        redPackageStyleUrl: r
      }, t), Object.assign(this.__state, {
        $compid__81: t,
        defaultType: s,
        styles: _indexModuleLessMap2.default,
        infoState: n,
        state: o,
        sceneList: e
      }), this.__state;
    }
  }]), s;
}(), _class.$$events = [], _class.$$componentPath = "pages/redPacket-t/components/HourRed/BigCard", _temp2);
exports.default = BigCard, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(BigCard));