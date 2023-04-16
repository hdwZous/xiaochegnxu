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
  var i = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== i) {
    if ("value" in i) return i.value;
    i = i.get;
    return void 0 !== i ? i.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp5 = require("../../npm/@jd/djmp/common-t/js/getApp/index.weapp.js"),
    _indexWeapp6 = _interopRequireDefault(_indexWeapp5);

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

var Default = (_temp2 = _class = function () {
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var n = arguments.length, o = Array(n), i = 0; i < n; i++) o[i] = arguments[i];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["defaultType", "style", "tipsMsg", "defaultTips", "defaultBtnTxt", "locationError", "localTargetUrl", "channel"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.state = {
        tipsMsg: ""
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var t = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__props,
          n = e.defaultType,
          o = void 0 === n ? 0 : n,
          n = e.defaultTips,
          e = e.defaultBtnTxt;
      this.__state.tipsMsg;
      return 0 === o || (1 === o ? (this.anonymousFunc0 = function (e) {
        return t.goToAddress(e);
      }, this.anonymousFunc1 = function (e) {
        return t.goToSetting(e);
      }) : 2 === o || (3 === o ? this.anonymousFunc2 = function () {
        return t.onDefaultEvent();
      } : 4 === o && (this.anonymousFunc3 = function () {
        return t.goLogin();
      }))), Object.assign(this.__state, {
        defaultType: o,
        style: _indexModuleLessMap2.default,
        defaultTips: n,
        defaultBtnTxt: e
      }), this.__state;
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var t = this,
          e = this.props.locationError,
          n = "未授权微信位置，请开启或直接授权~",
          e = (void 0 === e ? {} : e).errMsg || "";
      e && (-1 < (0, _indexWeapp6.default)()._independent_.systemInfo.system.indexOf("iOS") ? -1 < e.indexOf("deny") || -1 < e.indexOf("response") ? n = "未授权微信位置，请开启或直接授权~" : -1 < e.indexOf("system") && -1 < e.indexOf("denied") && (n = "手机定位未授权，你可以：<br/> 1、前往“设置—>隐私—>定位服务—>微信”进行授权 <br/>2、点击页面按钮手动选择地址") : -1 < e.indexOf("auth") && -1 < e.indexOf("denied") ? n = "未授权微信位置，请开启或直接授权~" : -1 < e.indexOf("system") && -1 < e.indexOf("denied") ? n = "微信应用未授权定位，你可以：<br/> 1、请前往手机“设置”进行授权 <br/>2、点击页面按钮手动选择地址" : -1 < e.indexOf("WIFI_LOCATIONONSWITCHOFF") && (n = "手机GPS定位未开启，你可以： <br/>1、请前往“设置”开启 <br/>2、点击页面按钮手动选择地址")), this.setState({
        tipsMsg: n
      }), (0, _indexWeapp2.isLogin)().then(function () {
        t.setState({
          login: !0
        });
      }).catch(function (e) {
        t.setState({
          login: !1
        });
      });
    }
  }, {
    key: "goToAddress",
    value: function () {
      (0, _indexWeapp2.isLogin)().then(function () {
        (0, _indexWeapp3.navigateTo)("/pages/address/home/index?from=locationDefault");
      }).catch(function (e) {
        (0, _indexWeapp3.navigateTo)("/pages/address/search/index?from=locationDefault");
      }), (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickSelectAddress",
        click_par: {
          islogin: this.state.login
        }
      });
    }
  }, {
    key: "goToSetting",
    value: function () {
      _index2.default.openSetting({
        complete: function () {}
      }), (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickCouponAuthorize",
        click_par: {
          islogin: this.state.login
        }
      });
    }
  }, {
    key: "goHome",
    value: function () {
      (0, _indexWeapp4.jump)({
        to: "home"
      });
    }
  }, {
    key: "goLogin",
    value: function () {
      var e = this.props,
          t = e.localTargetUrl,
          e = e.channel;
      (0, _indexWeapp2.goToLogin)({
        localTargetUrl: void 0 === t ? "" : t,
        channel: void 0 === e ? "" : e
      });
    }
  }, {
    key: "onDefaultEvent",
    value: function () {
      this.props.onDefaultEvent();
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }, {
    key: "anonymousFunc2",
    value: function (e) {}
  }, {
    key: "anonymousFunc3",
    value: function (e) {}
  }]), a;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "onDefaultEvent", "anonymousFunc2", "anonymousFunc3"], _class.options = {
  addGlobalClass: !0
}, _class.$$componentPath = "pages/firstOrderFission-t/components/default/index", _temp2);
exports.default = Default, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Default));