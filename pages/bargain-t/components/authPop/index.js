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
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
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

var AuthPop = (_temp2 = _class = function () {
  function s() {
    var e, t;

    _classCallCheck(this, s);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(o)))).$usedState = ["style", "canIUseGetUserProfile", "goNextStep"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.state = {
        canIUseGetUserProfile: !!wx.getUserProfile
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var t = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix, this.__state.canIUseGetUserProfile;
      return this.anonymousFunc0 = function () {
        t.hidePop();
      }, this.anonymousFunc1 = function () {
        return t.getUserProfileInfo();
      }, this.anonymousFunc2 = function (e) {
        return t.getWxUser(e);
      }, Object.assign(this.__state, {
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "getUserProfileInfo",
    value: function () {
      var t = this;
      this.props.onHideAuthPop(), (0, _indexWeapp.showLoading)({
        mask: !0
      }), clearTimeout(this.timer2), this.timer2 = setTimeout(function () {
        (0, _indexWeapp.hideLoading)();
      }, 1e3), wx.getUserProfile({
        desc: "完善提现信息",
        complete: function (e) {
          t.handleWxUserInfo(e.userInfo || {});
        }
      });
    }
  }, {
    key: "getWxUser",
    value: function (e) {
      this.props.onHideAuthPop();
      e = e.detail;
      this.handleWxUserInfo((void 0 === e ? {} : e).userInfo || {});
    }
  }, {
    key: "handleWxUserInfo",
    value: function (e) {
      if (e.nickName || e.avatarUrl) {
        try {
          (0, _indexWeapp2.setStorageSync)("wxUserInfo", e);
        } catch (e) {}

        this.props.onRefreshPage();
      } else this.props.goNextStep();
    }
  }, {
    key: "hidePop",
    value: function () {
      this.props.goNextStep(), this.props.onHideAuthPop();
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
  }]), s;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], _class.options = {
  addGlobalClass: !0
}, _class.$$componentPath = "pages/bargain-t/components/authPop/index", _temp2);
exports.default = AuthPop, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(AuthPop));