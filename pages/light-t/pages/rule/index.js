"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
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
    _api = require("../../api.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _asyncToGenerator(e) {
  return function () {
    var s = e.apply(this, arguments);
    return new Promise(function (i, a) {
      return function t(e, n) {
        try {
          var r = s[e](n),
              o = r.value;
        } catch (e) {
          return void a(e);
        }

        if (!r.done) return Promise.resolve(o).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        i(o);
      }("next");
    });
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

var Rule = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(r)))).$usedState = ["styles", "rule"], t.config = {
      navigationBarTitleText: "活动规则",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  var e;
  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        rule: ""
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: (e = _asyncToGenerator(regeneratorRuntime.mark(function e() {
      var t;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return t = this.$router.params.infoId || "", e.next = 3, this.getRuleInfo(t);

          case 3:
          case "end":
            return e.stop();
        }
      }, e, this);
    })), function () {
      return e.apply(this, arguments);
    })
  }, {
    key: "getRuleInfo",
    value: function (e) {
      var t = this;
      (0, _api.getRuleInfo)({
        infoId: e
      }).then(function (e) {
        0 == e.code && (e = e.result || {}, t.setState({
          rule: e.ruleDes
        }));
      }).catch(function (e) {
        console.error(e);
      });
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix, this.__state.rule;
      return Object.assign(this.__state, {
        styles: _indexModuleLessMap2.default
      }), this.__state;
    }
  }]), i;
}(), _class.$$events = [], _class.$$componentPath = "pages/light-t/pages/rule/index", _temp2);
exports.default = Rule, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Rule, !0));