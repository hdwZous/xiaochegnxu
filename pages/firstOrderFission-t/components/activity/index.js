"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function i(e, t) {
    for (var n = 0; n < t.length; n++) {
      var i = t[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  return function (e, t, n) {
    return t && i(e.prototype, t), n && i(e, n), e;
  };
}(),
    _get = function e(t, n, i) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(i) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, i);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/utils/index.weapp.js"),
    _indexWeapp5 = require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _firstOrderFission = require("../../api/firstOrderFission.js"),
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

var Activity = (_temp2 = _class = function () {
  function s() {
    var e, n;

    _classCallCheck(this, s);

    for (var t = arguments.length, i = Array(t), o = 0; o < t; o++) i[o] = arguments[o];

    return (e = n = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(i)))).$usedState = ["$compid__62", "style", "status", "isSignIn", "entry", "endTimeStr", "d", "ynInitiator", "isShowFacetofaceDia", "money", "newUserGiftDesc", "h", "m", "s", "statusMsg", "isShowMessage", "mapSrc", "timer", "endTimeCurr", "remainingTimeCurr", "endTime", "remainingTime", "getActivity", "pfOrderId", "activityId", "ynOldUser"], n._goToLogin = function () {
      var e = n.$router.params.source;
      (0, _indexWeapp5.goToLogin)({
        localTargetUrl: "/pages/firstOrderFission-t/launch/index?" + ("source=" + e)
      });
    }, n.jumpCashOutPage = function () {
      "false" == n.state.isSignIn ? n._goToLogin() : ((0, _indexWeapp2.navigateTo)("/pages/firstOrderFission-t/account/index"), (0, _indexWeapp3.clickReport)({
        create_time: new Date(),
        click_id: "clickrecord"
      }));
    }, n.showFacetofaceDia = function () {
      n.state.isSignIn;
      var e = n.props,
          t = e.pfOrderId,
          e = e.activityId;
      (0, _firstOrderFission.getFaceToFaceScannerCode)({
        pfOrderId: t,
        activityId: e,
        businessType: 1
      }).then(function (e) {
        0 == e.code ? n.setState({
          mapSrc: e.result,
          isShowFacetofaceDia: !0
        }) : (0, _indexWeapp2.showToast)({
          title: e && e.msg || "请稍后再试~"
        });
      }).catch(function (e) {
        (0, _indexWeapp2.showToast)({
          title: e.msg || "网络错误"
        });
      }), (0, _indexWeapp3.clickReport)({
        create_time: new Date(),
        click_id: "clickfacefacetoface"
      });
    }, n.closeFacetofaceDia = function () {
      n.setState({
        isShowFacetofaceDia: !1
      });
    }, n.invite = function (e) {
      n.props.onClickShare;
      n.props.onClickShare(e), (0, _indexWeapp3.clickReport)({
        create_time: new Date(),
        click_id: "clickyaoqing"
      });
    }, n.toHomePage = function () {
      (0, _indexWeapp.jump)({
        to: "home"
      }), (0, _indexWeapp3.clickReport)({
        create_time: new Date(),
        click_id: "clickhome"
      });
    }, n.customComponents = ["FacetoFaceDia"], _possibleConstructorReturn(n, e);
  }

  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.state = {
        d: "00",
        h: "00",
        m: "00",
        s: "00",
        endTimeStr: "",
        isSignIn: "false",
        isShowFacetofaceDia: !1,
        isShowMessage: !1,
        mapSrc: "",
        timer: null,
        endTimeCurr: 0,
        remainingTimeCurr: 0
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidShow",
    value: function () {
      this.getLoginStatus();
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.getLoginStatus(), this.setTime();
    }
  }, {
    key: "componentDidUpdate",
    value: function () {
      var e = this.props,
          t = e.endTime,
          n = e.remainingTime,
          i = this.state,
          e = i.endTimeCurr,
          i = i.remainingTimeCurr;
      t == e && n == i || (this.setState({
        remainingTimeCurr: n,
        endTimeCurr: t
      }), this.setTime());
    }
  }, {
    key: "setTime",
    value: function () {
      var t = this,
          e = this.props,
          n = e.endTime,
          i = e.status,
          o = e.remainingTime,
          s = e.getActivity;
      this.setState({
        remainingTimeCurr: o,
        endTimeCurr: n
      });
      new Date().getTime();
      i && 3 != i && (2592e5 < o ? this.setState({
        endTimeStr: n
      }) : (clearInterval(this.state.timer), (0, _indexWeapp4.countDown)(o, function (e) {
        e.end ? (t.setState({
          d: "00",
          h: "00",
          m: "00",
          s: "00",
          timer: null
        }), s()) : t.setState({
          d: e.day,
          h: e.hour,
          m: e.minute,
          s: e.second,
          timer: e.timer
        });
      })));
    }
  }, {
    key: "getLoginStatus",
    value: function () {
      var t = this;
      (0, _indexWeapp5.isLogin)().then(function (e) {
        t.setState({
          isSignIn: "true"
        });
      }).catch(function (e) {
        t.setState({
          isSignIn: "false"
        });
      });
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          n = (0, _index.genCompid)(t + "$compid__62"),
          i = this.__state,
          o = i.isShowFacetofaceDia,
          s = (i.endTimeStr, i.d, i.h, i.m, i.s, i.mapSrc),
          a = i.isSignIn,
          r = this.__props,
          c = r.status,
          u = r.statusMsg,
          p = r.ynInitiator,
          t = (r.ynOldUser, r.money),
          i = r.newUserGiftDesc,
          r = r.entry;
      return this.anonymousFunc0 = function () {
        return e.jumpCashOutPage();
      }, this.anonymousFunc1 = function () {
        return e._goToLogin();
      }, this.anonymousFunc2 = function () {
        return e._goToLogin();
      }, this.anonymousFunc3 = function () {
        "true" == a ? e.showFacetofaceDia() : e._goToLogin();
      }, this.anonymousFunc4 = function () {
        return e.jumpCashOutPage();
      }, this.anonymousFunc5 = function () {
        return e.toHomePage();
      }, o && _index.propsManager.set({
        closeFacetofaceDia: this.closeFacetofaceDia,
        mapSrc: s
      }, n), Object.assign(this.__state, {
        $compid__62: n,
        style: _indexModuleLessMap2.default,
        status: c,
        entry: r,
        ynInitiator: p,
        money: t,
        newUserGiftDesc: i,
        statusMsg: u
      }), this.__state;
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
  }, {
    key: "anonymousFunc4",
    value: function (e) {}
  }, {
    key: "anonymousFunc5",
    value: function (e) {}
  }]), s;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5"], _class.$$componentPath = "pages/firstOrderFission-t/components/activity/index", _temp2);
exports.default = Activity, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Activity));