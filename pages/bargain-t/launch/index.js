"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var a,
        i = arguments[t];

    for (a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a]);
  }

  return e;
},
    _createClass = function () {
  function i(e, t) {
    for (var a = 0; a < t.length; a++) {
      var i = t[a];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }

  return function (e, t, a) {
    return t && i(e.prototype, t), a && i(e, a), e;
  };
}(),
    _get = function e(t, a, i) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, a);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(i) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, a, i);
},
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _bargain = require("../api/bargain.js"),
    _indexWeapp3 = require("../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp4 = require("../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _asyncToGenerator(e) {
  return function () {
    var u = e.apply(this, arguments);
    return new Promise(function (r, n) {
      return function t(e, a) {
        try {
          var i = u[e](a),
              o = i.value;
        } catch (e) {
          return void n(e);
        }

        if (!i.done) return Promise.resolve(o).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        r(o);
      }("next");
    });
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

var timerout = void 0,
    Launch = (_temp2 = _class = function () {
  function o() {
    var e, n;

    _classCallCheck(this, o);

    for (var t = arguments.length, a = Array(t), i = 0; i < t; i++) a[i] = arguments[i];

    return (e = n = _possibleConstructorReturn(this, (e = o.__proto__ || Object.getPrototypeOf(o)).call.apply(e, [this].concat(a)))).$usedState = ["showDefault", "anonymousState__temp2", "anonymousState__temp3", "defaultType", "locationError", "defaultBtnTxt", "isShowRuleDia", "activityRuleDesc", "expireTime", "backgroundColor", "nickHeadUrl", "skuImageUrl", "skuName", "logoUrl", "storeName", "takeCount", "restPrice", "shareSkuImgUrl", "tabIndex", "cutPriceState", "cutPrice", "leftNewUserCount", "selfCutCount", "shareCount", "isShowBargainDia", "basicPrice", "cutPriceTotal", "lastSelfCutPrice", "nextSelfCutPrice", "storeId", "skuId", "unionCode", "activityId", "orgCode", "totalNewUserCount", "isShowHasCutFourDia", "bindUserList", "cutPricePersonList", "totalSelfCutCount"], n.config = {
      navigationBarTitleText: "砍价领商品",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, n.keepTime = function (e, t, a, i) {
      n.setState({
        d: e,
        h: t,
        m: a,
        s: i
      });
    }, n.getCutPriceDetail = function () {
      var e = n.$router.params,
          t = e.activityId,
          a = e.unionCode,
          i = e.storeId,
          o = e.skuId,
          r = e.orgCode,
          e = {};

      try {
        e = "string" == typeof (e = (0, _indexWeapp3.getStorageSync)("wxUserInfo") || {}) ? JSON.parse(e) : e;
      } catch (e) {}

      e = {
        activityId: n.state.activityId || t,
        unionCode: n.state.unionCode || a,
        storeId: n.state.storeId || i,
        skuId: n.state.skuId || o,
        orgCode: n.state.orgCode || r,
        nickName: e.nickName,
        nickHeadUrl: e.avatarUrl
      };
      (0, _bargain.getCutPriceDetail)(e).then(function (e) {
        var t;
        0 == e.code ? (t = e.result, n.setState({
          showDefault: !1,
          activityRuleDesc: (t = void 0 === t ? {} : t).activityRuleDesc || "",
          cutPriceState: t.cutPriceState || "",
          expireTime: t.expireTime || "",
          nickHeadUrl: t.nickHeadUrl || "",
          skuImageUrl: t.skuImageUrl || "",
          skuName: t.skuName || "",
          logoUrl: t.logoUrl || "",
          storeName: t.storeName || "",
          takeCount: t.takeCount || "",
          selfCutCount: t.selfCutCount || "",
          cutPriceTotal: t.cutPriceTotal || "",
          restPrice: t.restPrice || "",
          shareSkuImgUrl: t.shareSkuImgUrl || "",
          cutPrice: t.cutPrice || "",
          leftNewUserCount: t.leftNewUserCount || "",
          backgroundColor: t.backgroundColor || "",
          nextSelfCutPrice: t.nextSelfCutPrice || "",
          lastSelfCutPrice: t.lastSelfCutPrice || "",
          storeId: t.storeId || "",
          skuId: t.skuId || "",
          activityId: t.activityId || "",
          orgCode: t.orgCode || "",
          bindUserList: t.bindUserList || "",
          cutPricePersonList: t.cutPricePersonList || "",
          totalNewUserCount: t.totalNewUserCount || "",
          unionCode: a,
          basicPrice: t.basicPrice || "",
          isShowBargainDia: 0 == t.cutPriceState,
          totalSelfCutCount: t.totalSelfCutCount || ""
        }), n.getMaterialInfo({
          skuImageUrl: t.skuImageUrl,
          skuName: t.skuName,
          cutPrice: t.cutPrice,
          basicPrice: t.basicPrice,
          storeName: t.storeName,
          unionCode: t.unionCode,
          activityId: t.activityId
        }), n.pvReportFn(t)) : (n.defaultSetData(), (0, _indexWeapp2.showToast)({
          title: e && e.msg || "请稍后再试~"
        }));
      }).catch(function (e) {
        n.defaultSetData(), (0, _indexWeapp2.showToast)({
          title: e && e.msg || "网络异常"
        });
      });
    }, n.pvReportFn = function (e) {
      e.unionCode, e.activityId, e.skuId, e.storeId, e.orgCode;
      var t = n.state,
          a = t.isShowHasCutFourDia,
          i = t.totalSelfCutCount,
          o = e.cutPriceState,
          r = e.lastSelfCutPrice,
          t = e.selfCutCount,
          e = e.cutPriceTotal;
      0 == o && (o = {}, 1 == t && (o = {
        type: "first",
        amount: r
      }, (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: o
      })), 2 == t && (2 == i && 1 == a || 2 < i && 0 == a) && (o = {
        type: "second",
        amount: r
      }, (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: o
      })), 3 == t && (3 == i && 1 == a || 3 < i && 0 == a) && (o = {
        type: "third",
        amount: r
      }, (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: o
      })), 4 == t && 1 == a && (o = {
        type: "fourth",
        amount: r
      }, (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: o
      })), t == i && 0 == a && (o = {
        type: "back",
        amount: e
      }, (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: o
      })));
    }, n.defaultSetData = function () {
      n.setState({
        showDefault: !0,
        defaultType: 3,
        defaultTips: "活动被挤爆啦，稍后再试哦～"
      });
    }, n.onDefaultEvent = function () {
      3 === n.state.defaultType && n.getCutPriceDetail();
    }, n.showRuleDia = function () {
      n.setState({
        isShowRuleDia: !0
      }), (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickRule"
      });
    }, n.closeRuleDia = function () {
      n.setState({
        isShowRuleDia: !1
      });
    }, n.openHasCutFourDia = function () {
      n.setState({
        isShowHasCutFourDia: !0
      });
    }, n.closeHasCutFourDia = function () {
      n.setState({
        isShowHasCutFourDia: !1
      });
    }, n.senderCutPrice = function () {
      var e = n.state,
          t = e.storeId,
          a = e.skuId,
          i = e.activityId,
          o = e.orgCode,
          r = e.unionCode,
          e = n.getLoginInfo() || {};
      (0, _bargain.senderCutPrice)({
        storeId: t || "",
        nickName: e.nickName || "",
        nickHeadUrl: e.avatarUrl || "",
        skuId: a || "",
        activityId: i || "",
        orgCode: o,
        openId: e.openId || "",
        unionCode: r || ""
      });
    }, n.closeBargainDia = function () {
      n.setState({
        isShowBargainDia: !1
      });
    }, n.customComponents = ["Default", "Card", "RecordList", "RuleDia", "BargainDia", "SubscribeMessage"], _possibleConstructorReturn(n, e);
  }

  var t;
  return _inherits(o, _index.Component), _createClass(o, [{
    key: "_constructor",
    value: function (e) {
      var t = this;
      _get(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "_constructor", this).call(this, e), this.shareFlag = !0, this.shareInfo = {}, this.state = {
        showDefault: !0,
        defaultType: 0,
        locationError: {},
        defaultBtnTxt: "",
        isShowRuleDia: !1,
        activityRuleDesc: "",
        expireTime: "",
        backgroundColor: "",
        nickHeadUrl: "",
        skuImageUrl: "",
        skuName: "",
        logoUrl: "",
        storeName: "",
        takeCount: "",
        restPrice: "",
        shareSkuImgUrl: "",
        tabIndex: "",
        cutPriceState: "",
        cutPrice: "",
        leftNewUserCount: "",
        selfCutCount: "",
        shareCount: "",
        isShowBargainDia: !1,
        basicPrice: "",
        cutPriceTotal: "",
        lastSelfCutPrice: "",
        nextSelfCutPrice: "",
        storeId: "",
        skuId: "",
        unionCode: "",
        activityId: "",
        orgCode: "",
        totalNewUserCount: "",
        isShowHasCutFourDia: !1,
        bindUserList: [],
        cutPricePersonList: [],
        totalSelfCutCount: ""
      }, this.$$refs = [{
        type: "component",
        id: "IgLkm",
        refName: "",
        fn: function (e) {
          return t.childSubscribe = e;
        }
      }];
    }
  }, {
    key: "componentDidShow",
    value: function () {
      this.getCutPriceDetail(), (0, _indexWeapp.pvReport)({
        create_time: new Date(),
        page_par: this.$router.params || {}
      });
    }
  }, {
    key: "getMaterialInfo",
    value: (t = _asyncToGenerator(regeneratorRuntime.mark(function e(t) {
      var a = this;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, (0, _bargain.getMaterial)(t).then(function (e) {
              e = e.result;
              a.setState({
                shareInfo: (void 0 === e ? {} : e) || {}
              });
            }).catch(function (e) {});

          case 2:
            return e.next = 4, (0, _bargain.getFriendShareImg)(t).then(function (e) {
              e = e.result, e = _extends({}, a.state.shareInfo, void 0 === e ? {} : e);
              a.setState({
                shareInfo: e
              });
            }).catch(function (e) {});

          case 4:
          case "end":
            return e.stop();
        }
      }, e, this);
    })), function (e) {
      return t.apply(this, arguments);
    })
  }, {
    key: "_createDefaultData",
    value: function (r) {
      var n = this;
      return function () {
        var e = (0, _index.genCompid)(r + "$compid__0"),
            t = n.state,
            a = t.locationError,
            i = t.defaultType,
            o = t.defaultTips,
            t = t.defaultBtnTxt;
        return _index.propsManager.set({
          defaultType: i,
          locationError: a,
          defaultTips: o,
          defaultBtnTxt: t,
          onDefaultEvent: n.onDefaultEvent
        }, e), {
          $compid__0: e
        };
      };
    }
  }, {
    key: "onShareAppMessage",
    value: function (e) {
      var t = this,
          a = this.state,
          i = a.unionCode,
          o = a.activityId,
          r = a.skuId,
          n = a.storeId,
          u = a.orgCode,
          s = (a.skuImageUrl, a.skuName, a.cutPriceTotal, a.basicPrice, a.shareInfo),
          c = a.selfCutCount,
          l = (a.isShowHasCutFourDia, a.totalSelfCutCount),
          e = e || {},
          e = (e.from, e.target),
          e = ((void 0 === e ? {} : e) || {}).dataset,
          e = void 0 === e ? {} : e;
      return !e || "bargainDia" != e.type && "card" != e.type || ("bargainDia" == e.type && this.closeBargainDia(), this._throttle(function () {
        c < l && (t.senderCutPrice(), setTimeout(function () {
          t.getCutPriceDetail();
        }, 3e3)), c == l - 1 && t.openHasCutFourDia(), c != l - 1 && t.closeHasCutFourDia();
      })), {
        title: s.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
        imageUrl: s.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
        path: "/pages/bargain-t/detail/index?unionCode=" + i + "&activityId=" + o + "&skuId=" + r + "&storeId=" + n + "&orgCode=" + u
      };
    }
  }, {
    key: "_throttle",
    value: function (e) {
      var t = this;
      this.shareFlag && (this.shareFlag = !1, e.apply(this, arguments), setTimeout(function () {
        t.shareFlag = !0;
      }, 1e3));
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp3.getStorageSync)(_indexWeapp4.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "showSubscribe",
    value: function () {
      this.sleep(1500);
      var e = this.state.activityId,
          t = [];

      try {
        t = (0, _indexWeapp3.getStorageSync)("cutSubscribeInfo");
      } catch (e) {}

      if (t) {
        for (var a = !1, i = 0; i < t.length; i++) if (t[i].activityId == e) {
          a = !0;
          break;
        }

        a || (t.push({
          activityId: e
        }), (0, _indexWeapp3.setStorageSync)("cutSubscribeInfo", t), this.childSubscribe.initSubscribeMessage(["Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso", "B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY"]));
      } else (t = []).push({
        activityId: e
      }), (0, _indexWeapp3.setStorageSync)("cutSubscribeInfo", t), this.childSubscribe.initSubscribeMessage(["Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso", "B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY"]);
    }
  }, {
    key: "sleep",
    value: function (e) {
      for (var t = new Date(), a = t.getTime() + e;;) if ((t = new Date()).getTime() > a) return;
    }
  }, {
    key: "_createActivityData",
    value: function (W) {
      var $ = this;
      return function () {
        var e = (0, _index.genCompid)(W + "$compid__1"),
            t = (0, _index.genCompid)(W + "$compid__2"),
            a = (0, _index.genCompid)(W + "$compid__3"),
            i = (0, _index.genCompid)(W + "$compid__4"),
            o = $.state,
            r = o.isShowBargainDia,
            n = o.selfCutCount,
            u = o.shareCount,
            s = o.cutPriceState,
            c = o.isShowRuleDia,
            l = (o.tabIndex, o.backgroundColor),
            d = o.cutPrice,
            p = o.leftNewUserCount,
            f = o.cutPriceTotal,
            C = o.restPrice,
            h = o.expireTime,
            m = o.nickHeadUrl,
            _ = o.skuImageUrl,
            g = o.skuName,
            y = o.logoUrl,
            S = o.storeName,
            k = o.takeCount,
            b = o.bindUserList,
            v = o.cutPricePersonList,
            P = o.activityRuleDesc,
            D = o.lastSelfCutPrice,
            I = o.nextSelfCutPrice,
            w = o.totalNewUserCount,
            x = o.storeId,
            U = o.skuId,
            T = o.activityId,
            F = o.orgCode,
            N = o.d,
            j = o.h,
            R = o.m,
            L = o.s,
            O = o.basicPrice,
            H = o.shareInfo,
            B = o.isShowHasCutFourDia,
            M = o.totalSelfCutCount,
            o = (0, _index.internal_inline_style)({
          backgroundColor: l
        });
        return $.anonymousFunc0 = function () {
          return $.showRuleDia();
        }, $.anonymousFunc1 = function (e) {
          return $.showSubscribe(e);
        }, $.anonymousFunc2 = function (e) {
          return $.showSubscribe(e);
        }, $.anonymousFunc3 = function (e) {
          return $.showSubscribe(e);
        }, _index.propsManager.set({
          cutPriceState: s,
          expireTime: h,
          nickHeadUrl: m,
          skuImageUrl: _,
          skuName: g,
          logoUrl: y,
          storeName: S,
          backgroundColor: l,
          takeCount: k,
          cutPriceTotal: f,
          restPrice: C,
          cutPrice: d,
          leftNewUserCount: p,
          storeId: x,
          skuId: U,
          activityId: T,
          orgCode: F,
          getCutPriceDetail: $.getCutPriceDetail,
          keepTime: $.keepTime,
          basicPrice: O,
          shareInfo: H,
          from: "launch",
          onShowSubscribe: $.anonymousFunc1,
          selfCutCount: n,
          nextSelfCutPrice: I,
          openHasCutFourDia: $.openHasCutFourDia,
          closeHasCutFourDia: $.closeHasCutFourDia,
          totalSelfCutCount: M
        }, e), _index.propsManager.set({
          cutPriceState: s,
          backgroundColor: l,
          bindUserList: b,
          cutPricePersonList: v,
          totalNewUserCount: w,
          storeId: x,
          skuId: U,
          activityId: T,
          orgCode: F,
          leftNewUserCount: p,
          getCutPriceDetail: $.getCutPriceDetail,
          onShowSubscribe: $.anonymousFunc2,
          d: N,
          h: j,
          m: R,
          s: L,
          basicPrice: O,
          cutPrice: d,
          shareInfo: H
        }, t), c && _index.propsManager.set({
          title: "活动规则",
          txt: P,
          onCloseDia: $.closeRuleDia
        }, a), r && _index.propsManager.set({
          selfCutCount: n,
          shareCount: u,
          onCloseDia: $.closeBargainDia,
          cutPriceTotal: f,
          leftNewUserCount: p,
          restPrice: C,
          backgroundColor: l,
          lastSelfCutPrice: D,
          nextSelfCutPrice: I,
          skuImageUrl: _,
          skuName: g,
          getCutPriceDetail: $.getCutPriceDetail,
          basicPrice: O,
          cutPrice: d,
          shareInfo: H,
          isShowHasCutFourDia: B,
          openHasCutFourDia: $.openHasCutFourDia,
          closeHasCutFourDia: $.closeHasCutFourDia,
          onShowSubscribe: $.anonymousFunc3,
          totalSelfCutCount: M
        }, i), {
          anonymousState__temp: o,
          $compid__1: e,
          $compid__2: t,
          $compid__3: a,
          $compid__4: i,
          style: _indexModuleLessMap2.default,
          isShowRuleDia: c,
          isShowBargainDia: r
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = this.__state.showDefault ? this._createDefaultData(e + "fVltkrCwOr")() : null,
          e = this._createActivityData(e + "lpUldTfPGJ")();

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
  }]), o;
}(), _class.$$events = ["anonymousFunc0"], _class.options = {
  addGlobalClass: !0
}, _class.multipleSlots = !0, _class.$$componentPath = "pages/bargain-t/launch/index", _temp2);
exports.default = Launch, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(Launch, !0));