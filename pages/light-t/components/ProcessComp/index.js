"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function n(t, e) {
    for (var o = 0; o < e.length; o++) {
      var n = e[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  return function (t, e, o) {
    return e && n(t.prototype, e), o && n(t, o), t;
  };
}(),
    _get = function t(e, o, n) {
  null === e && (e = Function.prototype);
  var r = Object.getOwnPropertyDescriptor(e, o);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(n) : void 0;
  }

  e = Object.getPrototypeOf(e);
  if (null !== e) return t(e, o, n);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

function _toConsumableArray(t) {
  if (Array.isArray(t)) {
    for (var e = 0, o = Array(t.length); e < t.length; e++) o[e] = t[e];

    return o;
  }

  return Array.from(t);
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

var ProcessComp = (_temp2 = _class = function () {
  function s() {
    var t, e;

    _classCallCheck(this, s);

    for (var o = arguments.length, n = Array(o), r = 0; r < o; r++) n[r] = arguments[r];

    return (t = e = _possibleConstructorReturn(this, (t = s.__proto__ || Object.getPrototypeOf(s)).call.apply(t, [this].concat(n)))).$usedState = ["anonymousState__temp", "loopArray24", "styles", "scrollLeft", "cityList", "scrollIntoView", "sceneEntityList", "nowScene", "homeData"], e.scrollLeft = function () {
      var t = e.props.nowScene;
      t && 0 == t.code ? e.setState({
        scrollLeft: 0
      }) : t && 0 != t.code && e.setState({
        scrollLeft: 60 * (Number(t.code) + 1)
      });
    }, e.customComponents = [], _possibleConstructorReturn(e, t);
  }

  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (t) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, t), this.state = {
        cityList: [],
        scrollIntoView: "",
        scrollLeft: 0
      }, this.$$refs = [{
        type: "dom",
        id: "HSkdJ",
        refName: "scroll1",
        fn: null
      }];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var t = this,
          e = this.props.sceneEntityList,
          o = [];
      e && 0 < e.length && ((o = [].concat(_toConsumableArray(e))).unshift({
        name: "起点",
        status: 2
      }), this.setState({
        cityList: o
      }, function () {
        t.scrollLeft();
      }));
    }
  }, {
    key: "componentWillReceiveProps",
    value: function (t) {
      var e = this,
          o = t.sceneEntityList,
          t = [];
      o && 0 < o.length && ((t = [].concat(_toConsumableArray(o))).unshift({
        name: "起点",
        status: 2
      }), this.setState({
        cityList: t
      }, function () {
        e.scrollLeft();
      }));
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var t = this.__state,
          e = t.cityList,
          t = (t.scrollIntoView, t.scrollLeft, this.__props),
          t = (t.sceneEntityList, (t.homeData.lightHomePicConfig || {}).startPointBackColor),
          t = (0, _index.internal_inline_style)({
        background: t ? "linear-gradient(to right, " + t + ")" : ""
      }),
          e = e.map(function (t, e) {
        return {
          $loopState__temp3: "city-" + e,
          $original: (t = {
            $original: (0, _index.internal_get_original)(t)
          }).$original
        };
      });
      return Object.assign(this.__state, {
        anonymousState__temp: t,
        loopArray24: e,
        styles: _indexModuleLessMap2.default
      }), this.__state;
    }
  }]), s;
}(), _class.$$events = [], _class.$$componentPath = "pages/light-t/components/ProcessComp/index", _temp2);
exports.default = ProcessComp, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(ProcessComp));