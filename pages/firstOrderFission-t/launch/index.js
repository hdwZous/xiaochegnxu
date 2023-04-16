"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var i,
        a = arguments[t];

    for (i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
  }

  return e;
},
    _createClass = function () {
  function a(e, t) {
    for (var i = 0; i < t.length; i++) {
      var a = t[i];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
    }
  }

  return function (e, t, i) {
    return t && a(e.prototype, t), i && a(e, i), e;
  };
}(),
    _get = function e(t, i, a) {
  null === t && (t = Function.prototype);
  var n = Object.getOwnPropertyDescriptor(t, i);

  if (void 0 !== n) {
    if ("value" in n) return n.value;
    n = n.get;
    return void 0 !== n ? n.call(a) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, i, a);
},
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp3 = require("../npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _firstOrderFission = require("../api/firstOrderFission.js"),
    _indexWeapp4 = require("../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp5 = require("../npm/@jd/djmp/common-t/constants/index.weapp.js"),
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

var Launch = (_temp2 = _class = function () {
  function n() {
    var e, r;

    _classCallCheck(this, n);

    for (var t = arguments.length, i = Array(t), a = 0; a < t; a++) i[a] = arguments[a];

    return (e = r = _possibleConstructorReturn(this, (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(e, [this].concat(i)))).$usedState = ["showDefault", "anonymousState__temp2", "anonymousState__temp3", "defaultType", "locationError", "defaultBtnTxt", "defaultTips", "isShowRuleDia", "status", "pfOrderId", "activityId", "money", "newUserGiftDesc", "ynInitiator", "ynOldUser", "rule", "withdrawStrategy", "endTime", "remainingTime", "availables", "unCompletes", "completes", "statusMsg", "queryTime", "completeCount", "pageNo", "tabIndex", "showLoading", "showBottomTips", "newUserJumpUrl", "shareImageUrl", "shareTitle"], r.config = {
      navigationBarTitleText: "邀请有礼",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, r.getActivity = function () {
      var e = r.$router.params.source;
      console.log("11111");
      var t = (0, _indexWeapp4.getStorageSync)(_indexWeapp5.LOGIN_INFO) || {};
      console.log("loginInfo2====", t);
      t = {
        source: e,
        openId: t.openId || "",
        unionId: t.unionId || t.unionid_pdj_jd_new || ""
      };
      console.log("风控params", t), (0, _firstOrderFission.getActivity)(t).then(function (e) {
        var t;
        0 == e.code ? (t = e.result, r.setState({
          showDefault: !1,
          status: (t = void 0 === t ? {} : t).status || "",
          statusMsg: t.statusMsg || "",
          pfOrderId: t.pfOrderId || "",
          activityId: t.activityInfo && t.activityInfo.activityId ? t.activityInfo.activityId : "",
          money: t.activityInfo && t.activityInfo.money ? t.activityInfo.money : "",
          newUserGiftDesc: t.newUserGiftDesc || "",
          ynInitiator: t.ynInitiator || "",
          ynOldUser: t.ynOldUser || "",
          endTime: t.activityInfo && t.activityInfo.endTime ? t.activityInfo.endTime : "",
          remainingTime: t.activityInfo && t.activityInfo.remainingTime ? t.activityInfo.remainingTime : "",
          rule: t.activityInfo && t.activityInfo.rule ? t.activityInfo.rule : "",
          withdrawStrategy: t.activityInfo && t.activityInfo.withdrawStrategy ? t.activityInfo.withdrawStrategy : "",
          availables: t.pfOrderDetailInfo && t.pfOrderDetailInfo.availables ? t.pfOrderDetailInfo.availables : [],
          unCompletes: t.pfOrderDetailInfo && t.pfOrderDetailInfo.unCompletes ? t.pfOrderDetailInfo.unCompletes : [],
          completes: t.pfOrderDetailInfo && t.pfOrderDetailInfo.completes ? t.pfOrderDetailInfo.completes : [],
          completeCount: t.pfOrderDetailInfo && t.pfOrderDetailInfo.completeCount ? t.pfOrderDetailInfo.completeCount : "",
          queryTime: t.pfOrderDetailInfo && t.pfOrderDetailInfo.queryTime ? t.pfOrderDetailInfo.queryTime : "",
          withdrawRecords: t.withdrawRecords || "",
          pageNo: 1,
          newUserJumpUrl: t.newUserJumpUrl || "/pages/newPersonB-t/index",
          shareImageUrl: t.shareImageUrl || "https://storage.360buyimg.com/wximg/firstOrderFission/fissionShareImg.png",
          shareTitle: t.shareTitle || "我在京东到家，送你最高满25减12元新人券，下单更优惠哦~"
        }), r.pvReportFn(e)) : (r.defaultSetData(), (0, _indexWeapp2.showToast)({
          title: e && e.msg || "请稍后再试~"
        }));
      }).catch(function (e) {
        r.defaultSetData(), (0, _indexWeapp2.showToast)({
          title: e && e.msg || "网络异常"
        });
      });
    }, r.pvReportFn = function (e) {
      var t = e.result,
          e = void 0 === t ? {} : t,
          t = e.pfOrderDetailInfo && e.pfOrderDetailInfo.availables && e.pfOrderDetailInfo.availables.length,
          t = {
        status: e.status,
        activityRecords_todo: 0 < t ? t : "none"
      };
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "showmainpage",
        click_par: t
      });
    }, r.showRuleDia = function () {
      r.setState({
        isShowRuleDia: !0
      }), (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickrule"
      });
    }, r.onCloseRuleDia = function () {
      r.setState({
        isShowRuleDia: !1
      });
    }, r.onDefaultEvent = function () {
      3 === r.state.defaultType && r.getActivity();
    }, r.onClickShare = function (e) {
      "h5" == e ? r.shareOfH5() : r.onShareAppMessage();
    }, r.shareOfH5 = function () {
      var e = r.state,
          t = e.activityId,
          i = e.pfOrderId,
          a = e.shareImageUrl,
          n = e.shareTitle,
          e = r.$router.params.source,
          o = "" + window.location.origin + window.location.pathname + "#/pages/firstOrderFission-t/launch/index?source=" + e + "&pfOrderId=" + i + "&activityId=" + t;

      r._throttle(function () {
        (0, _indexWeapp3.openShare)({
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: n,
          mpImgUrl: a,
          path: "/pages/firstOrderFission-t/detail/index?source=3&pfOrderId=" + (i || "") + "&activityId=" + (t || ""),
          imgUrl: a,
          desc: n,
          shareUrl: o,
          pyqImg: a,
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        });
      });
    }, r.onShareAppMessage = function (e) {
      var t = r.state,
          i = t.pfOrderId,
          a = t.activityId,
          n = t.shareImageUrl,
          o = t.shareTitle,
          t = e || {},
          e = t.from,
          t = t.target,
          t = ((void 0 === t ? {} : t) || {}).dataset;
      if ("button" == e) switch ((void 0 === t ? {} : t).type) {
        case "activity":
          (0, _indexWeapp.clickReport)({
            create_time: new Date(),
            click_id: "clickyaoqing"
          });
          break;

        case "activityRecordDefault":
          (0, _indexWeapp.clickReport)({
            create_time: new Date(),
            click_id: "clickremind",
            click_par: {
              activityRecords: "none"
            }
          });
          break;

        case "activityRecordList1":
          (0, _indexWeapp.clickReport)({
            create_time: new Date(),
            click_id: "clickremind",
            click_par: {
              activityRecords: "todo"
            }
          });
          break;

        case "activityRecordList2":
          (0, _indexWeapp.clickReport)({
            create_time: new Date(),
            click_id: "clickremind",
            click_par: {
              activityRecords: "ing"
            }
          });
      }
      return {
        title: o,
        imageUrl: n,
        path: "/pages/firstOrderFission-t/detail/index?source=3&pfOrderId=" + (i || "") + "&activityId=" + (a || "")
      };
    }, r.getTabIndex = function (e) {
      r.setState({
        tabIndex: e
      });
    }, r.customComponents = ["Default", "Marquee", "Activity", "ActivityRecord", "PopDia"], _possibleConstructorReturn(r, e);
  }

  return _inherits(n, _index.Component), _createClass(n, [{
    key: "_constructor",
    value: function (e) {
      _get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "_constructor", this).call(this, e), this.shareFlag = !0, this.state = {
        showDefault: !0,
        defaultType: 0,
        locationError: {},
        defaultBtnTxt: "",
        defaultTips: "",
        isShowRuleDia: !1,
        status: "",
        pfOrderId: "",
        activityId: "",
        money: "",
        newUserGiftDesc: "",
        ynInitiator: "",
        ynOldUser: "",
        rule: "",
        withdrawStrategy: "",
        endTime: "",
        remainingTime: "",
        availables: [],
        unCompletes: [],
        completes: [],
        statusMsg: "",
        queryTime: "",
        completeCount: 0,
        pageNo: 1,
        tabIndex: 0,
        showLoading: !1,
        showBottomTips: !1,
        newUserJumpUrl: "",
        shareImageUrl: "",
        shareTitle: ""
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidShow",
    value: function () {
      (0, _indexWeapp.pvReport)({
        create_time: new Date(),
        page_par: _extends({}, this.$router.params)
      }), this.getActivity();
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp4.getStorageSync)(_indexWeapp5.LOGIN_INFO);
      return console.log("loginInfo1====", e), "string" == typeof e ? (console.log("JSON.parse(loginInfo)===", JSON.parse(e)), JSON.parse(e)) : (console.log("返回空对象"), {});
    }
  }, {
    key: "defaultSetData",
    value: function () {
      this.setState({
        showDefault: !0,
        defaultType: 3,
        defaultTips: "活动被挤爆啦，稍后再试哦～"
      });
    }
  }, {
    key: "_createDefaultData",
    value: function (o) {
      var r = this;
      return function () {
        var e = (0, _index.genCompid)(o + "$compid__20"),
            t = r.state,
            i = t.locationError,
            a = t.defaultType,
            n = t.defaultTips,
            t = t.defaultBtnTxt;
        return _index.propsManager.set({
          defaultType: a,
          locationError: i,
          defaultTips: n,
          defaultBtnTxt: t,
          onDefaultEvent: r.onDefaultEvent
        }, e), {
          $compid__20: e
        };
      };
    }
  }, {
    key: "_throttle",
    value: function (e) {
      var t = this;
      this.shareFlag && (this.shareFlag = !1, e.apply(this, arguments), setTimeout(function () {
        t.shareFlag = !0;
      }, 500));
    }
  }, {
    key: "onReachBottom",
    value: function () {
      var t,
          i = this,
          e = this.state,
          a = e.completes,
          n = e.pageNo,
          o = e.queryTime,
          r = e.completeCount,
          e = e.tabIndex;
      1 == e && r > a.length && ((0, _indexWeapp2.showLoading)(), this.setState({
        showLoading: !0,
        showBottomTips: !1
      }), (0, _firstOrderFission.getCompletes)({
        queryType: 2,
        pageNo: t = n + 1,
        pageCount: 50,
        queryTime: o
      }).then(function (e) {
        0 == e.code && (i.setState({
          completes: a.concat(e.result.completes),
          showLoading: !1,
          pageNo: t
        }), (0, _indexWeapp2.hideLoading)());
      }).catch(function (e) {
        (0, _indexWeapp2.showToast)({
          title: e.msg || "网络错误"
        }), (0, _indexWeapp2.hideLoading)();
      }), console.log("到达底部了")), 1 == e && r == a.length && ((0, _indexWeapp2.hideLoading)(), this.setState({
        showBottomTips: !0,
        showLoading: !1
      }));
    }
  }, {
    key: "_createActivityData",
    value: function (D) {
      var T = this;
      return function () {
        var e = (0, _index.genCompid)(D + "$compid__21"),
            t = (0, _index.genCompid)(D + "$compid__22"),
            i = (0, _index.genCompid)(D + "$compid__23"),
            a = (0, _index.genCompid)(D + "$compid__24"),
            n = T.state,
            o = n.isShowRuleDia,
            r = n.status,
            s = n.withdrawRecords,
            c = n.money,
            l = n.rule,
            p = n.availables,
            u = n.unCompletes,
            d = n.completes,
            f = n.statusMsg,
            m = n.remainingTime,
            _ = n.withdrawStrategy,
            y = n.ynInitiator,
            h = n.ynOldUser,
            g = n.endTime,
            v = n.pfOrderId,
            w = n.activityId,
            I = n.showLoading,
            x = n.showBottomTips,
            O = n.newUserGiftDesc;
        T.anonymousFunc0 = function () {
          return T.showRuleDia();
        }, T.anonymousFunc1 = function (e) {
          return T.onClickShare(e);
        }, T.anonymousFunc2 = function (e) {
          return T.onClickShare(e);
        };

        n = function (e) {
          return T.getTabIndex(e);
        };

        return T.anonymousFunc3 = function () {
          return T.onCloseRuleDia();
        }, _index.propsManager.set({
          data: s,
          background: "rgba(255, 255, 255, 0.05"
        }, e), _index.propsManager.set({
          status: r,
          onClickShare: T.anonymousFunc1,
          money: c,
          ynInitiator: y,
          ynOldUser: h,
          endTime: g,
          statusMsg: f,
          pfOrderId: v,
          activityId: w,
          remainingTime: m,
          newUserGiftDesc: O,
          getActivity: T.getActivity,
          entry: "home"
        }, t), _index.propsManager.set({
          status: r,
          withdrawStrategy: _,
          availables: p,
          unCompletes: u,
          completes: d,
          onClickShare: T.anonymousFunc2,
          getTabIndex: n,
          showLoading: I,
          showBottomTips: x
        }, i), o && _index.propsManager.set({
          txt: l,
          title: "活动规则",
          onCloseDia: T.anonymousFunc3
        }, a), {
          anonymousState__temp: n,
          $compid__21: e,
          $compid__22: t,
          $compid__23: i,
          $compid__24: a,
          status: r,
          style: _indexModuleLessMap2.default,
          isShowRuleDia: o
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = this.__state.showDefault ? this._createDefaultData(e + "OpRwuFskmA")() : null,
          e = this._createActivityData(e + "kzCpFfwIUb")();

      return Object.assign(this.__state, {
        anonymousState__temp2: t,
        anonymousState__temp3: e
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
  }]), n;
}(), _class.$$events = ["anonymousFunc0"], _class.options = {
  addGlobalClass: !0
}, _class.multipleSlots = !0, _class.$$componentPath = "pages/firstOrderFission-t/launch/index", _temp2);
exports.default = Launch, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(Launch, !0));