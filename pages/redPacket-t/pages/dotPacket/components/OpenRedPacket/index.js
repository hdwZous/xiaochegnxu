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
  var a = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== a) {
    if ("value" in a) return a.value;
    a = a.get;
    return void 0 !== a ? a.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _index3 = require("../../../../utils/index.js"),
    _indexWeapp2 = require("../../../../npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _api = require("../../../../api.js");

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

var OpenRedPacket = (_temp2 = _class = function () {
  function r() {
    var e, n;

    _classCallCheck(this, r);

    for (var t = arguments.length, o = Array(t), a = 0; a < t; a++) o[a] = arguments[a];

    return (e = n = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__82", "$compid__83", "style", "isOpenRedPacket", "rewardState", "noRewardState", "couponInfo", "infoId", "sceneCode", "token", "clickRedPeacket", "closePage", "playAgain", "homeData", "onClickShare"], n.clickRp = function (e, t) {
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }, n.openRedPacket = (0, _index3.debounceImmediate)(function () {
      var e = n.props.infoId || "",
          t = (0, _index3.encrypt)(e + "," + (n.props.sceneCode || "") + "," + n.props.token);
      (0, _indexWeapp2.getLocation)().then(function (e) {
        console.log("location :>> ", e), e && e.latitude && (0, _api.getReward)({
          longitude: e.longitude,
          latitude: e.latitude,
          encryptData: t
        }).then(function (e) {
          console.log("开红包 res :>> ", e), e && 0 == e.code ? (n.setState({
            couponInfo: e.result,
            isOpenRedPacket: !0
          }), n.clickRp("clickOpen", {
            type: "reward",
            couponId: e.result.couponId || ""
          }), e.result.haveReward ? n.setState({
            rewardState: !0
          }) : n.setState({
            noRewardState: !0,
            isOpenRedPacket: !0
          })) : n.setState({
            noRewardState: !0,
            isOpenRedPacket: !0
          });
        }).catch(function (e) {
          n.setState({
            noRewardState: !0,
            isOpenRedPacket: !0
          });
        });
      }).catch(function (e) {
        n.setState({
          noRewardState: !0,
          isOpenRedPacket: !0
        });
      });
    }, 1e4, !0), n.customComponents = ["CouponPop", "PrizePopup"], _possibleConstructorReturn(n, e);
  }

  return _inherits(r, _index.Component), _createClass(r, [{
    key: "_constructor",
    value: function (e) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, e), this.state = {
        isOpenRedPacket: !1,
        couponInfo: {},
        rewardState: !1,
        noRewardState: !1
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          n = (0, _index.genCompid)(t + "$compid__82"),
          o = (0, _index.genCompid)(t + "$compid__83"),
          a = this.__state,
          r = a.isOpenRedPacket,
          i = a.rewardState,
          s = a.noRewardState,
          t = a.couponInfo,
          a = this.__props.infoId || "";
      return this.anonymousFunc0 = function () {
        return e.__props.closePage();
      }, r && i && _index.propsManager.set({
        cancelHandle: this.__props.closePage,
        title: "恭喜获得",
        text: "可在“我的优惠券”中查询",
        okText: "再玩一次",
        couponInfo: t,
        playAgain: this.__props.playAgain,
        homeData: this.__props.homeData,
        infoId: a,
        onClickShare: this.__props.onClickShare
      }, n), r && s && _index.propsManager.set({
        onClickShare: this.__props.onClickShare,
        infoId: a,
        homeData: this.__props.homeData,
        cancelHandle: this.__props.closePage,
        playAgain: this.__props.playAgain,
        haveChance: this.__state.couponInfo.haveChance
      }, o), Object.assign(this.__state, {
        $compid__82: n,
        $compid__83: o,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), r;
}(), _class.$$events = ["anonymousFunc0", "openRedPacket"], _class.$$componentPath = "pages/redPacket-t/pages/dotPacket/components/OpenRedPacket/index", _temp2);
exports.default = OpenRedPacket, Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(OpenRedPacket));