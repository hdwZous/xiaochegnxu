"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var i,
        n = arguments[t];

    for (i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
  }

  return e;
},
    _createClass = function () {
  function n(e, t) {
    for (var i = 0; i < t.length; i++) {
      var n = t[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  return function (e, t, i) {
    return t && n(e.prototype, t), i && n(e, i), e;
  };
}(),
    _get = function e(t, i, n) {
  null === t && (t = Function.prototype);
  var a = Object.getOwnPropertyDescriptor(t, i);

  if (void 0 !== a) {
    if ("value" in a) return a.value;
    a = a.get;
    return void 0 !== a ? a.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, i, n);
},
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _firstOrderFission = require("../api/firstOrderFission.js"),
    _indexWeapp3 = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp4 = require("../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexWeapp5 = require("../npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _indexWeapp6 = require("../npm/@jd/djmp/common-t/js/getApp/index.weapp.js"),
    _indexWeapp7 = _interopRequireDefault(_indexWeapp6),
    _indexWeapp8 = require("../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
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

var timer = null,
    Detail = (_temp2 = _class = function () {
  function o() {
    var e, t;

    _classCallCheck(this, o);

    for (var i = arguments.length, n = Array(i), a = 0; a < i; a++) n[a] = arguments[a];

    return (e = t = _possibleConstructorReturn(this, (e = o.__proto__ || Object.getPrototypeOf(o)).call.apply(e, [this].concat(n)))).$usedState = ["$compid__25", "showDefault", "showNewUserPage", "anonymousState__temp", "showToastNew", "style", "statusMsg", "defaultType", "defaultTips", "defaultBtnTxt", "locationError", "pageNo", "pageCount", "completeCount", "showLoading", "isShowRuleDia", "queryTime", "activityInfo", "availables", "completes", "unCompletes", "pfOrderId", "status", "withdrawRecords", "ynInitiator", "ynOldUser", "newUserGiftDesc", "isSignIn"], t.config = {
      navigationBarTitleText: "邀请有礼",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50,
      enablePullDownRefresh: !0
    }, t.getTabIndex = function (e) {
      t.setState({
        tabIndex: e
      });
    }, t.showRuleDia = function () {
      t.setState({
        isShowRuleDia: !0
      }), (0, _indexWeapp3.clickReport)({
        create_time: new Date(),
        click_id: "clickrule"
      });
    }, t.onCloseDia = function () {
      t.setState({
        isShowRuleDia: !1
      });
    }, t.customComponents = ["Default", "Marquee", "Activity", "ActivityRecord", "PopDia"], _possibleConstructorReturn(t, e);
  }

  return _inherits(o, _index.Component), _createClass(o, [{
    key: "_constructor",
    value: function (e) {
      _get(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "_constructor", this).call(this, e), this.state = {
        showDefault: !0,
        defaultType: 0,
        defaultTips: "",
        defaultBtnTxt: "重新加载",
        locationError: {},
        pageNo: 2,
        pageCount: 50,
        completeCount: 0,
        showLoading: !1,
        isShowRuleDia: !1,
        queryTime: "",
        activityInfo: {},
        availables: [],
        completes: [],
        unCompletes: [],
        pfOrderId: "",
        status: null,
        statusMsg: "",
        showToastNew: !1,
        withdrawRecords: [],
        ynInitiator: !0,
        ynOldUser: !1,
        showNewUserPage: !0,
        newUserGiftDesc: "",
        isSignIn: !1
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          i = (0, _index.genCompid)(t + "$compid__25"),
          n = this.__state,
          a = n.locationError,
          o = n.showDefault,
          s = n.defaultType,
          r = n.defaultTips,
          c = n.defaultBtnTxt,
          p = n.showNewUserPage,
          t = (n.showToastNew, n.statusMsg, this._createMainData(t + "ocfvIKOiUk")());
      return this.anonymousFunc0 = function () {
        return e.onDefaultEvent();
      }, (o || p) && _index.propsManager.set({
        defaultType: s,
        locationError: a,
        defaultTips: r,
        defaultBtnTxt: c,
        onDefaultEvent: this.anonymousFunc0
      }, i), Object.assign(this.__state, {
        $compid__25: i,
        anonymousState__temp: t,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "_createMainData",
    value: function (x) {
      var I = this;
      return function () {
        var e = (0, _index.genCompid)(x + "$compid__26"),
            t = (0, _index.genCompid)(x + "$compid__27"),
            i = (0, _index.genCompid)(x + "$compid__28"),
            n = (0, _index.genCompid)(x + "$compid__29"),
            a = I.state,
            o = a.status,
            s = a.statusMsg,
            r = a.pfOrderId,
            c = a.activityInfo,
            p = a.ynOldUser,
            u = a.ynInitiator,
            l = a.availables,
            d = a.unCompletes,
            f = a.completes,
            m = a.showLoading,
            _ = a.withdrawRecords,
            h = a.isShowRuleDia,
            g = a.newUserGiftDesc,
            y = a.isSignIn,
            w = u || !u && 2 !== o && 3 !== o && 4 !== o && 7 !== o || 9 == o;

        I.anonymousFunc1 = function () {
          return I.showRuleDia();
        };

        function v() {
          return I.getDetailInfo();
        }

        a = 1 == y && w ? function (e) {
          return I.getTabIndex(e);
        } : null;
        return I.anonymousFunc2 = function () {
          return I.onCloseDia();
        }, _index.propsManager.set({
          data: _,
          background: "rgba(218, 60, 60, 0.6)"
        }, e), _index.propsManager.set({
          status: o,
          money: c.money,
          ynInitiator: u,
          ynOldUser: p,
          endTime: c.endTime,
          remainingTime: c.remainingTime,
          newUserGiftDesc: g,
          statusMsg: s,
          pfOrderId: r,
          activityId: c.activityId,
          getActivity: v,
          entry: "card"
        }, t), 1 == y && w && _index.propsManager.set({
          status: o,
          withdrawStrategy: c.withdrawStrategy,
          availables: l,
          unCompletes: d,
          completes: f,
          getTabIndex: a,
          showLoading: m
        }, i), h && _index.propsManager.set({
          txt: c.rule,
          title: "活动规则",
          onCloseDia: I.anonymousFunc2
        }, n), {
          anonymousState__temp2: v,
          anonymousState__temp3: a,
          $compid__26: e,
          $compid__27: t,
          $compid__28: i,
          $compid__29: n,
          status: o,
          style: _indexModuleLessMap2.default,
          isSignIn: y,
          showRuleTab: w,
          isShowRuleDia: h
        };
      };
    }
  }, {
    key: "componentDidShow",
    value: function () {
      (0, _indexWeapp7.default)()._independent_.qrcode.business = "248", (0, _indexWeapp3.pvReport)({
        create_time: new Date(),
        page_par: _extends({}, this.$router.params)
      }), this.initPage(), this.getLoginStatus();
    }
  }, {
    key: "getLoginStatus",
    value: function () {
      var t = this;
      (0, _indexWeapp8.isLogin)().then(function (e) {
        t.setState({
          isSignIn: !0
        });
      }).catch(function (e) {
        t.setState({
          isSignIn: !1
        });
      });
    }
  }, {
    key: "initPage",
    value: function () {
      var t = this;
      (0, _indexWeapp5.getLocation)().then(function (e) {
        e && e.longitude ? t.getDetailInfo() : t.getLocationError();
      }).catch(function (e) {
        t.getLocationError(e);
      });
    }
  }, {
    key: "getLocationError",
    value: function (e) {
      this.setState({
        showDefault: !0,
        defaultType: 1,
        defaultTips: "",
        defaultBtnTxt: "",
        locationError: e
      });
    }
  }, {
    key: "getDetailInfo",
    value: function () {
      var i,
          f = this,
          e = this.$router.params,
          t = e.pfOrderId,
          n = void 0 === t ? "" : t,
          a = e.activityId,
          t = void 0 === a ? "" : a,
          a = e.source,
          e = e.q,
          e = void 0 === e ? "" : e;
      e && (o = (e = decodeURIComponent(e)).split("?")[1].split("&") || [], i = {}, o.forEach(function (e) {
        var t = e.split("=")[0],
            e = e.split("=")[1];
        i[t] = e;
      }), n = i.pfOrderId, t = i.activityId, a = i.source);
      var o = (0, _indexWeapp2.getStorageSync)(_indexWeapp4.LOGIN_INFO) || {},
          m = {
        pfOrderId: n,
        activityId: t,
        source: a,
        nickName: o.nickname,
        headImageUrl: o.avatar,
        openId: o.openId || "",
        unionId: o.unionId || o.unionid_pdj_jd_new || ""
      };
      console.log("风控params", m), (0, _firstOrderFission.getActivity)(m).then(function (e) {
        var t = e.result || {},
            i = t.activityInfo,
            n = void 0 === i ? {} : i,
            a = t.pfOrderDetailInfo,
            o = void 0 === a ? {} : a,
            s = t.pfOrderId,
            r = t.status,
            c = t.statusMsg,
            p = t.withdrawRecords,
            u = t.ynInitiator,
            l = t.ynOldUser,
            e = t.newUserGiftDesc,
            i = t.newUserJumpUrl,
            d = void 0 === i ? "/pages/newPersonB-t/index" : i,
            a = t.shareImageUrl,
            i = t.shareTitle,
            t = !1;
        l ? 1 != r && 8 != r || m.pfOrderId === s || (c = c || "你已经是老用户了，快来参与活动吧~", f.setState({
          showToastNew: !0
        }), clearTimeout(timer), timer = setTimeout(function () {
          f.setState({
            showToastNew: !1
          });
        }, 1e3)) : 6 != r && 5 != r || (f.setState({
          showToastNew: t = !0
        }), clearTimeout(timer), timer = setTimeout(function () {
          f.setState({
            showToastNew: !1
          }, function () {
            (0, _indexWeapp.redirectTo)(d);
          });
        }, 1500)), f.setState({
          activityInfo: n,
          availables: o.availables || [],
          unCompletes: o.unCompletes || [],
          completes: o.completes || [],
          pfOrderId: s,
          status: r,
          statusMsg: c,
          withdrawRecords: p,
          ynInitiator: u,
          ynOldUser: l,
          showNewUserPage: t,
          showDefault: !1,
          queryTime: o.queryTime,
          completeCount: o.completeCount || 0,
          newUserGiftDesc: e,
          pageNo: 2,
          shareImageUrl: a || "https://storage.360buyimg.com/wximg/firstOrderFission/fissionShareImg.png",
          shareTitle: i || "我在京东到家，送你最高满25减12元新人券，下单更优惠哦~"
        }), (0, _indexWeapp3.clickReport)({
          create_time: new Date(),
          click_id: "showmainpage",
          click_par: {
            Identity: u ? 1 : 0,
            status: r,
            TheUserType: l ? "old" : "new",
            activityRecords_todo: o.availables && 0 < o.availables.length ? "list" : "none"
          }
        });
      }).catch(function (e) {
        f.setState({
          showDefault: !0,
          defaultType: 3,
          defaultTips: e.msg
        });
      });
    }
  }, {
    key: "onShareAppMessage",
    value: function (e) {
      var t = this.state,
          i = t.activityInfo,
          n = void 0 === i ? {} : i,
          a = t.pfOrderId,
          o = t.shareImageUrl,
          i = t.shareTitle,
          t = e || {},
          e = t.from,
          t = t.target,
          t = (void 0 === t ? {} : t).dataset;
      if ("button" == e) switch ((void 0 === t ? {} : t).type) {
        case "activity":
          (0, _indexWeapp3.clickReport)({
            create_time: new Date(),
            click_id: "clickyaoqing"
          });
          break;

        case "activityRecordDefault":
          (0, _indexWeapp3.clickReport)({
            create_time: new Date(),
            click_id: "clickremind",
            click_par: {
              activityRecords: "none"
            }
          });
          break;

        case "activityRecordList1":
          (0, _indexWeapp3.clickReport)({
            create_time: new Date(),
            click_id: "clickremind",
            click_par: {
              activityRecords: "todo"
            }
          });
          break;

        case "activityRecordList2":
          (0, _indexWeapp3.clickReport)({
            create_time: new Date(),
            click_id: "clickremind",
            click_par: {
              activityRecords: "ing"
            }
          });
      }
      return {
        title: i,
        imageUrl: o,
        path: "/pages/firstOrderFission-t/detail/index?activityId=" + n.activityId + "&pfOrderId=" + a + "&source=3"
      };
    }
  }, {
    key: "onReachBottom",
    value: function () {
      console.log("到达底部了");
      var e = this.state,
          t = e.tabIndex,
          i = e.completeCount,
          e = e.completes;
      1 == t && i > e.length ? ((0, _indexWeapp.showLoading)(), this.setState({
        showLoading: !0,
        showBottomTips: !1
      }), this.getCompleteData()) : this.setState({
        showLoading: !1,
        showBottomTips: !0
      });
    }
  }, {
    key: "onPullDownRefresh",
    value: function () {
      (0, _indexWeapp.showLoading)({
        title: "正在刷新"
      }), this.initPage();
      var e = setTimeout(function () {
        (0, _indexWeapp.hideLoading)(), _index2.default.stopPullDownRefresh(), clearTimeout(e);
      }, 1e3);
    }
  }, {
    key: "getCompleteData",
    value: function () {
      var i = this,
          e = this.state,
          n = e.pageNo,
          t = e.pageCount,
          a = e.completes,
          e = e.queryTime;
      (0, _firstOrderFission.getCompletes)({
        queryType: 2,
        pageNo: n,
        pageCount: t,
        queryTime: e
      }).then(function (e) {
        var t = e.result;
        0 == e.code && i.setState({
          completes: a.concat((void 0 === t ? {} : t).completes || []),
          showLoading: !1,
          pageNo: n + 1
        }), (0, _indexWeapp.hideLoading)();
      }).catch(function (e) {
        (0, _indexWeapp.showToast)({
          title: e.msg
        }), (0, _indexWeapp.hideLoading)();
      });
    }
  }, {
    key: "onDefaultEvent",
    value: function () {
      var e = this;
      this.setState({
        defaultType: 0
      }, function () {
        e.initPage();
      });
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
  }]), o;
}(), _class.$$events = ["anonymousFunc1"], _class.options = {
  addGlobalClass: !0
}, _class.multipleSlots = !0, _class.$$componentPath = "pages/firstOrderFission-t/detail/index", _temp2);
exports.default = Detail, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(Detail, !0));