"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
  return typeof e;
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
},
    _createClass = function () {
  function a(e, t) {
    for (var s = 0; s < t.length; s++) {
      var a = t[s];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
    }
  }

  return function (e, t, s) {
    return t && a(e.prototype, t), s && a(e, s), e;
  };
}(),
    _get = function e(t, s, a) {
  null === t && (t = Function.prototype);
  var r = Object.getOwnPropertyDescriptor(t, s);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(a) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, s, a);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _bargain = require("../../api/bargain.js"),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/constants/index.weapp.js");

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

var SubscribeMessage = (_temp2 = _class = function () {
  function n() {
    var e, t;

    _classCallCheck(this, n);

    for (var s = arguments.length, a = Array(s), r = 0; r < s; r++) a[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(e, [this].concat(a)))).$usedState = ["style", "showSubscribeMessage", "subscribeMessageImageUrl"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(n, _index.Component), _createClass(n, [{
    key: "_constructor",
    value: function (e) {
      _get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "_constructor", this).call(this, e), this.state = {
        showSubscribeMessage: !1
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__props.subscribeMessageImageUrl;
      this.__state.showSubscribeMessage;
      return Object.assign(this.__state, {
        style: _indexModuleLessMap2.default,
        subscribeMessageImageUrl: e
      }), this.__state;
    }
  }, {
    key: "initSubscribeMessage",
    value: function (t, s, a) {
      var r = this,
          n = !0,
          e = setTimeout(function () {
        n ? r.hiddenShowSubscribeMessage(!0, r) : r.hiddenShowSubscribeMessage(!1, r), clearInterval(e);
      }, 1e3);
      console.log("========消息模板======", t), wx.requestSubscribeMessage({
        tmplIds: t,
        success: function (e) {
          "requestSubscribeMessage:ok" == e.errMsg && (n = !1, r.hiddenShowSubscribeMessage(!1, r), r.subscribeMessageUpdata(e, r, t, s));
          e = "accept" == e[t];
          a && "function" == typeof a && a(e);
        },
        fail: function (e) {
          console.log("========err======", e), r.hiddenShowSubscribeMessage(!1, r), console.log(void 0 === a ? "undefined" : _typeof(a)), a && "function" == typeof a && a(!1), (0, _indexWeapp.clickReport)({
            create_time: new Date(),
            click_id: "subscribeMessage",
            click_par: {
              tempId: t
            }
          });
        }
      });
    }
  }, {
    key: "hiddenShowSubscribeMessage",
    value: function (e, t) {
      t.setState({
        showSubscribeMessage: e
      });
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp2.getStorageSync)(_indexWeapp3.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "subscribeMessageUpdata",
    value: function (e, t, s, a) {
      var r,
          n = this.getLoginInfo(),
          o = [];

      for (r in e) {
        var c = {};
        console.log("=======that.matchChannel(key)======", t.matchChannel(r, s, a)), t.matchChannel(r, s, a) && ("reject" == e[r] ? c.status = "reject" : "accept" == e[r] ? c.status = "accept" : c.status = "ban", c.templateId = r, c.channelId = t.matchChannel(r, s, a), o.push(c));
      }

      console.log("==========templates==========", o), (0, _bargain.subscribeMsginfo)({
        openId: n.openId || "",
        templates: o
      }).then(function (e) {
        console.log("==========res==========", e);
      }).catch(function (e) {
        console.log("==========err==========", e);
      }), (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "subscribeMessage",
        click_par: {
          templates: o
        }
      });
    }
  }, {
    key: "matchChannel",
    value: function (e, t, s) {
      if (s && 0 < s.length) {
        t = t.indexOf(e);
        if (-1 != t) return s[t];
      }

      var a = null;

      switch (e) {
        case "MUMVz8L2w1GfGlI_pzERYQKRy8VvCMNUcUsxW-A7c3I":
          a = 1;
          break;

        case "2DTGty37XUIpQfM2QgM-HUCE2YJ4Um6DUzM9ENBcXSE":
          a = 2;
          break;

        case "foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":
          a = 3;
          break;

        case "sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU":
          a = 4;
          break;

        case "oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs":
          a = 5;
          break;

        case "foXXDvHMDaA45_8QPRwAd_p9unR3syrGG8kxIVQXUQ0":
          a = 6;
          break;

        case "oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs":
          a = 7;
          break;

        case "foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":
          a = 8;
          break;

        case "sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU":
          a = 9;
          break;

        case "aHE90mjezRAJVQhzUhZ5vXoSQwwI8hgR-tYVSa9F5-A":
          a = 10;
          break;

        case "Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso":
          a = 11;
          break;

        case "B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY":
          a = 12;
          break;

        case "foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":
          a = 13;
          break;

        case "K1HtLhViyzUMKbZjeFmR3OKpz8gGpq3Fuy1guWIYVKA":
          a = 14;
          break;

        case "K1HtLhViyzUMKbZjeFmR3AS2FLYmxF1ua8XaReShCt0":
          a = 15;
          break;

        case "fchAp-FzoMeL7H-ENM6JyQV7z_wHexxQfIqhou26ijY":
          a = 16;
          break;

        case "3zzStxd9r5oOQ0N569D5l-cJ6OYj1E3QHb095rCRvSs":
          a = 17;
          break;

        case "aUUy2JkJeivLJJCEPOMuM_fsywgjhNjdN4ryMeWYcsw":
          a = 18;
          break;

        case "iwJcSNrbfOXKnfhoi4tEJvC1AnVWoNj1R8D8FSctMs0":
          a = 19;
          break;

        case "fchAp-FzoMeL7H-ENM6JycKcHKnwK_Ae4YWl4jWXUQ4":
          a = 20;
          break;

        default:
          a = null;
      }

      return a;
    }
  }, {
    key: "hiddenSubscribeMessage",
    value: function () {
      this.setState({
        showSubscribeMessage: !1
      });
    }
  }]), n;
}(), _class.$$events = ["hiddenSubscribeMessage"], _class.$$componentPath = "pages/bargain-t/components/subscribeMessage/index", _temp2);
exports.default = SubscribeMessage, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(SubscribeMessage));