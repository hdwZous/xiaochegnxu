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
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _bargain = require("../../api/bargain.js"),
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

var CutGoodList = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "style", "goodInfo", "backgroundColor", "textDialog"], t.customComponents = [], _possibleConstructorReturn(t, e);
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
      var t = this.__props,
          n = t.goodInfo,
          o = void 0 === n ? {} : n,
          n = t.backgroundColor,
          t = void 0 === n ? "" : n,
          n = Number(o.basicPrice) - Number(o.cutPrice).toFixed(2),
          t = (0, _index.internal_inline_style)({
        background: t
      });
      return this.anonymousFunc0 = function () {
        e.clickFreeBtn(o);
      }, Object.assign(this.__state, {
        anonymousState__temp: n,
        anonymousState__temp2: t,
        style: _indexModuleLessMap2.default,
        goodInfo: o
      }), this.__state;
    }
  }, {
    key: "clickFreeBtn",
    value: function (t) {
      var n = this,
          e = this.props.textDialog;
      (0, _indexWeapp.clickReport)({
        click_id: "clickButton",
        click_par: {
          type: "get",
          text: t.cutPrice + ' 元领"',
          skuId: t.skuId || "",
          textDialog: e || ""
        }
      }), (0, _bargain.checkCutPrice)({
        activityId: t.activityId,
        skuId: t.skuId || ""
      }).then(function (e) {
        e.result;
        n.senderCutPriceAct(t);
      }).catch(function (e) {
        e = e.msg;
        (0, _indexWeapp2.showToast)({
          title: void 0 === e ? "" : e
        });
      });
    }
  }, {
    key: "senderCutPriceAct",
    value: function (t) {
      var n = this.getLoginInfo() || {};
      (0, _bargain.senderCutPrice)({
        storeId: t.storeId || "",
        nickName: n.nickName || "",
        nickHeadUrl: n.avatarUrl || "",
        skuId: t.skuId || "",
        activityId: t.activityId || "",
        orgCode: t.orgCode,
        openId: n.openId || ""
      }).then(function (e) {
        e = e.result, e = void 0 === e ? {} : e;
        (0, _indexWeapp2.navigateTo)("/pages/bargain-t/launch/index?skuId=" + t.skuId + "&storeId=" + t.storeId + "&activityId=" + t.activityId + "&orgCode=" + t.orgCode + "&avatarUrl=" + n.avatarUrl + "&nickName=" + n.nickName + "&unionCode=" + e.unionCode + "&cutRecordPrice=" + e.cutRecordPrice);
      });
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp3.getStorageSync)(_indexWeapp4.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc0"], _class.$$componentPath = "pages/bargain-t/components/cutGoodList/index", _temp2);
exports.default = CutGoodList, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CutGoodList));