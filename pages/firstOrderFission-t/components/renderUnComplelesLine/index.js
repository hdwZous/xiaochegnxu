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
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),
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

var RenderUnCompletesLine = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["index", "style", "item", "d", "h", "m", "s", "invite"], t.invite = function (e) {
      (0, t.props.invite)("h5", "list");
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        d: "",
        h: "",
        m: "",
        s: ""
      }, this.$$refs = [];
    }
  }, {
    key: "componentWillReceiveProps",
    value: function (e) {}
  }, {
    key: "componentDidShow",
    value: function () {
      console.log("componentDidShow");
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var t = this;
      console.log("componentDidMount");
      var e = this.props.item;
      (0, _indexWeapp.countDown)(e.remainingTime, function (e) {
        t.setState({
          d: e.day,
          h: e.hour,
          m: e.minute,
          s: e.second
        });
      });
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__state,
          t = (e.d, e.h, e.m, e.s, this.__props),
          e = t.item,
          t = t.index;
      return Object.assign(this.__state, {
        index: t,
        style: _indexModuleLessMap2.default,
        item: e
      }), this.__state;
    }
  }]), i;
}(), _class.$$events = [], _class.$$componentPath = "pages/firstOrderFission-t/components/renderUnComplelesLine/index", _temp2);
exports.default = RenderUnCompletesLine, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(RenderUnCompletesLine));