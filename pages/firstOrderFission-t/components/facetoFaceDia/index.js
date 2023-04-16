"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function n(e, t) {
    for (var o = 0; o < t.length; o++) {
      var n = t[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  return function (e, t, o) {
    return t && n(e.prototype, t), o && n(e, o), e;
  };
}(),
    _get = function e(t, o, n) {
  null === t && (t = Function.prototype);
  var r = Object.getOwnPropertyDescriptor(t, o);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, o, n);
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

var FacetoFaceDia = (_temp2 = _class = function () {
  function s() {
    var e, t;

    _classCallCheck(this, s);

    for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(n)))).$usedState = ["style", "mapSrc", "closeFacetofaceDia"], t.onClose = function () {
      (0, t.props.closeFacetofaceDia)();
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.state = {}, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__props.mapSrc;
      return this.anonymousFunc0 = function () {
        return e.onClose();
      }, this.anonymousFunc1 = function () {
        return e.onClose();
      }, Object.assign(this.__state, {
        style: _indexModuleLessMap2.default,
        mapSrc: t
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }]), s;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/firstOrderFission-t/components/facetoFaceDia/index", _temp2);
exports.default = FacetoFaceDia, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(FacetoFaceDia));