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
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/env/index.weapp.js"),
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

var Detail = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["style"], t.config = {
      navigationBarTitleText: "砍价领商品",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black"
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {}, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      return this.anonymousFunc0 = function () {
        return e.openMini();
      }, Object.assign(this.__state, {
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.openMini(), (0, _indexWeapp.pvReport)({});
    }
  }, {
    key: "openMini",
    value: function () {
      console.log(111111111111);
      var e = this.$router.params,
          t = e.channel,
          e = e.from;
      _indexWeapp2.isJDFinanceApp && window.JrBridge && JrBridge.openScheme({
        schemeUrl: "openjdjrapp://com.jd.jrapp/appcommon/wxminiprogram/openprogram?jrlogin=true&jrcontainer=native&jrproductid=gh_5103b94a8a56&jrparam=" + encodeURIComponent(JSON.stringify({
          type: "/pages/bargain-t/list/index?channel=" + (void 0 === t ? "" : t) + "&from=" + (void 0 === e ? "" : e)
        }))
      });
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc0"], _class.$$componentPath = "pages/bargain-t/jrOpenmini/index", _temp2);
exports.default = Detail, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(Detail, !0));