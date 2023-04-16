"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function o(t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
    }
  }

  return function (t, e, n) {
    return e && o(t.prototype, e), n && o(t, n), t;
  };
}(),
    _get = function t(e, n, o) {
  null === e && (e = Function.prototype);
  var i = Object.getOwnPropertyDescriptor(e, n);

  if (void 0 !== i) {
    if ("value" in i) return i.value;
    i = i.get;
    return void 0 !== i ? i.call(o) : void 0;
  }

  e = Object.getPrototypeOf(e);
  if (null !== e) return t(e, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _api = require("../../api.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

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

var CityCard = (_temp2 = _class = function () {
  function r() {
    var t, o;

    _classCallCheck(this, r);

    for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];

    return (t = o = _possibleConstructorReturn(this, (t = r.__proto__ || Object.getPrototypeOf(r)).call.apply(t, [this].concat(n)))).$usedState = ["anonymousState__temp", "loopArray27", "style", "newCityCadrList", "cityCadrList", "closeCityCard", "infoId", "optionCityUrl"], o.onClose = function () {
      (0, o.props.closeCityCard)();
    }, o.select = function (n) {
      var t = o.state.newCityCadrList;
      t.map(function (t, e) {
        t.value = n == e;
      }), o.setState({
        newCityCadrList: t
      });
    }, o.toBindCity = function () {
      var t = o.state.newCityCadrList,
          e = o.props.infoId,
          n = "";
      t.map(function (t, e) {
        1 == t.value && (n = t.code);
      }), 0 == n || "" != n && null != n && null != n && " " != n ? (0, _api.bindCity)({
        infoId: e,
        cityCode: n
      }).then(function (t) {
        var e = t.code,
            t = t.result;
        0 == e ? (0, _indexWeapp.showToast)({
          title: "选择成功，快去参与游戏吧"
        }) : ((0, _indexWeapp.showToast)({
          title: "亲，稍后再试一下哦"
        }), reject()), o.onClose();
      }).catch(function (t) {
        (0, _indexWeapp.showToast)({
          title: "亲，稍后再试一下哦"
        }), console.log(t), o.onClose();
      }) : (0, _indexWeapp.showToast)({
        title: "请选择一个城市~"
      });
    }, o.anonymousFunc1Map = {}, o.customComponents = [], _possibleConstructorReturn(o, t);
  }

  return _inherits(r, _index.Component), _createClass(r, [{
    key: "_constructor",
    value: function (t) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, t), this.state = {
        newCityCadrList: []
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var t = this.props.cityCadrList,
          n = [];
      t.map(function (t, e) {
        t.value = 0 == e, n.push(t);
      }), this.setState({
        newCityCadrList: n
      });
    }
  }, {
    key: "_createData",
    value: function () {
      var o = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__state.newCityCadrList,
          e = this.__props.optionCityUrl;

      this.anonymousFunc0 = function () {
        return o.onClose();
      };

      e = (0, _index.internal_inline_style)({
        background: "url(" + e + ")",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat"
      });

      this.anonymousFunc2 = function () {
        return o.onClose();
      };

      t = t.map(function (t, e) {
        t = {
          $original: (0, _index.internal_get_original)(t)
        };
        var n = "mxpkg" + e;
        return o.anonymousFunc1Map[n] = function () {
          return o.select(e);
        }, {
          _$indexKey: n,
          $original: t.$original
        };
      });
      return Object.assign(this.__state, {
        anonymousState__temp: e,
        loopArray27: t,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (t) {}
  }, {
    key: "anonymousFunc1",
    value: function (t, e) {
      return this.anonymousFunc1Map[t] && this.anonymousFunc1Map[t](e);
    }
  }, {
    key: "anonymousFunc2",
    value: function (t) {}
  }]), r;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "toBindCity", "anonymousFunc2"], _class.$$componentPath = "pages/light-t/components/CityCard/index", _temp2);
exports.default = CityCard, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CityCard));