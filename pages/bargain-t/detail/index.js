"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function n(e, t) {
    for (var o = 0; o < t.length; o++) {
      var n = t[o];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  return function (e, t, o) {
    return t && n(e.prototype, t), o && n(e, o), e;
  };
}(),
    _get = function e(t, o, n) {
  null === t && (t = Function.prototype);
  var i = Object.getOwnPropertyDescriptor(t, o);

  if (void 0 !== i) {
    if ("value" in i) return i.value;
    i = i.get;
    return void 0 !== i ? i.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, o, n);
},
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp4 = require("../npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _indexWeapp5 = require("../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexWeapp6 = require("../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp7 = require("../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexWeapp8 = require("../npm/@jd/djmp/common-t/js/getApp/index.weapp.js"),
    _indexWeapp9 = _interopRequireDefault(_indexWeapp8),
    _bargain = require("../api/bargain.js"),
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

var Detail = (_temp2 = _class = function () {
  function i() {
    var e, r;

    _classCallCheck(this, i);

    for (var t = arguments.length, o = Array(t), n = 0; n < t; n++) o[n] = arguments[n];

    return (e = r = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp5", "$compid__12", "$compid__13", "$compid__14", "showDefault", "showNoLoginPage", "anonymousState__temp", "showNewerPage", "anonymousState__temp2", "showOldPage", "anonymousState__temp3", "anonymousState__temp4", "showAuthPop", "showRule", "defaultType", "locationError", "defaultTips", "defaultBtnTxt", "defaultImg", "backgroundColor", "bannerImg", "newUserMiddleImg", "cutPriceList", "activityRuleDesc", "bindNewUserResponse", "helpCutResponse", "nickHeadUrl", "skuImageUrl", "skuName", "logoUrl", "storeName", "takeCount", "expireTime", "cutPriceTotal", "restPrice", "ladderCutPrice", "leftNewUserCount", "bindUserList", "cutPricePersonList", "totalNewUserCount", "nextSelfCutPrice", "lastSelfCutPrice", "selfCutCount", "shareCount", "cutPriceState", "basicPrice", "cutPrice", "isShowHasCutFourDia", "options", "isShowBargainDia", "shareInfo", "d", "h", "m", "s", "wxUserInfo", "totalSelfCutCount"], r.config = {
      navigationBarTitleText: "砍价领商品",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black"
    }, r.onDefaultEvent = function () {
      2 == r.state.defaultType ? (r.goHome(), (0, _indexWeapp2.clickReport)({
        click_id: "clickButton",
        click_par: {
          text: "去首页看看"
        }
      })) : r.getPageInfo();
    }, r.closeBargainDia = function () {
      r.setState({
        isShowBargainDia: !1
      });
    }, r.keepTime = function (e, t, o, n) {
      r.setState({
        d: e,
        h: t,
        m: o,
        s: n
      });
    }, r.senderCutPrice = function () {
      var e = r.state.options,
          t = void 0 === e ? {} : e,
          o = t.storeId,
          n = t.skuId,
          i = t.activityId,
          a = t.orgCode,
          e = t.unionCode,
          t = r.getLoginInfo() || {};
      (0, _bargain.senderCutPrice)({
        storeId: o || "",
        nickName: t.nickName || "",
        nickHeadUrl: t.avatarUrl || "",
        skuId: n || "",
        activityId: i || "",
        orgCode: a,
        openId: t.openId || "",
        unionCode: e || ""
      });
    }, r.openHasCutFourDia = function () {
      r.setState({
        isShowHasCutFourDia: !0
      });
    }, r.closeHasCutFourDia = function () {
      r.setState({
        isShowHasCutFourDia: !1
      });
    }, r.customComponents = ["Default", "AuthPop", "RuleDia", "CutGoodList", "Card", "RecordList", "BargainDia"], _possibleConstructorReturn(r, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        showDefault: !0,
        defaultType: 0,
        locationError: {},
        defaultTips: "",
        defaultBtnTxt: "",
        defaultImg: "",
        showNewerPage: !1,
        showNoLoginPage: !1,
        showOldPage: !1,
        backgroundColor: "#FF1844",
        bannerImg: "https://storage.360buyimg.com/wximg/bargain-t/bg.png?2",
        newUserMiddleImg: "https://storage.360buyimg.com/wximg/bargain-t/redBg3.png?2",
        cutPriceList: [],
        showRule: !1,
        activityRuleDesc: "",
        bindNewUserResponse: {},
        helpCutResponse: {},
        nickHeadUrl: "",
        skuImageUrl: "",
        skuName: "",
        logoUrl: "",
        storeName: "",
        takeCount: 0,
        expireTime: 0,
        cutPriceTotal: "",
        restPrice: "",
        ladderCutPrice: "",
        leftNewUserCount: "",
        bindUserList: "",
        cutPricePersonList: "",
        totalNewUserCount: "",
        nextSelfCutPrice: "",
        lastSelfCutPrice: "",
        selfCutCount: "",
        shareCount: "",
        cutPriceState: "",
        basicPrice: "",
        cutPrice: "",
        isShowHasCutFourDia: !1,
        options: {
          unionCode: "",
          activityId: "",
          skuId: "",
          storeId: "",
          orgCode: ""
        },
        isShowBargainDia: !1,
        shareInfo: {},
        d: "00",
        h: "00",
        m: "00",
        s: "00",
        wxUserInfo: {},
        showAuthPop: !1,
        totalSelfCutCount: ""
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          o = (0, _index.genCompid)(t + "$compid__12"),
          n = (0, _index.genCompid)(t + "$compid__13"),
          i = (0, _index.genCompid)(t + "$compid__14"),
          a = this.__state,
          r = a.showRule,
          u = a.activityRuleDesc,
          s = a.showNewerPage,
          c = a.showNoLoginPage,
          l = a.showOldPage,
          d = a.showDefault,
          p = a.defaultType,
          g = a.locationError,
          f = a.defaultTips,
          m = a.defaultBtnTxt,
          _ = a.defaultImg,
          h = a.wxUserInfo,
          a = a.showAuthPop;
      console.log("wxUserInfo---------", void 0 === h ? {} : h);
      h = c ? this._createNoLoginData(t + "lfaRUoqYcc")() : null, c = s ? this._createNewerData(t + "VsrmfAoMuD")() : null, s = l ? this._createOldData(t + "iGuqGNuOfA")() : null, l = this._createMainData(t + "aMpKuUdwyV")();
      this.anonymousFunc0 = function () {
        return e.hideAuthPop();
      }, this.anonymousFunc1 = function () {
        return e.initPage();
      };
      t = a ? function () {
        return e.getAddress();
      } : null;
      return this.anonymousFunc2 = function () {
        return e.clickRule(!1);
      }, d && _index.propsManager.set({
        defaultType: p,
        locationError: g,
        defaultTips: f,
        defaultBtnTxt: m,
        defaultImg: _,
        onDefaultEvent: this.onDefaultEvent
      }, o), a && _index.propsManager.set({
        onHideAuthPop: this.anonymousFunc0,
        onRefreshPage: this.anonymousFunc1,
        goNextStep: t
      }, n), r && _index.propsManager.set({
        txt: u,
        title: "活动规则",
        onCloseDia: this.anonymousFunc2
      }, i), Object.assign(this.__state, {
        anonymousState__temp5: t,
        $compid__12: o,
        $compid__13: n,
        $compid__14: i,
        anonymousState__temp: h,
        anonymousState__temp2: c,
        anonymousState__temp3: s,
        anonymousState__temp4: l
      }), this.__state;
    }
  }, {
    key: "_createOldData",
    value: function (g) {
      var f = this;
      return function () {
        var e = (0, _index.genCompid)(g + "$compid__16"),
            t = f.state,
            o = t.cutPriceList,
            n = void 0 === o ? [] : o,
            i = t.backgroundColor,
            a = t.defaultType,
            r = t.locationError,
            u = t.defaultTips,
            s = t.defaultBtnTxt,
            c = t.defaultImg,
            l = t.bannerImg,
            d = t.helpCutResponse,
            p = (0, _index.internal_inline_style)({
          backgroundColor: i
        }),
            o = (0, _index.internal_inline_style)({
          background: "url(" + l + ") no-repeat top",
          backgroundSize: "100%"
        });
        f.anonymousFunc3 = function () {
          return f.clickRule(!0);
        }, f.anonymousFunc4 = function () {
          return f.toMyCutList();
        };
        t = n.map(function (e, t) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          }, e = {
            $original: (0, _index.internal_get_original)(e.$original)
          };
          t = (0, _index.genCompid)(g + "PjKIGUiCSi" + t);
          return 0 < n.length && _index.propsManager.set({
            goodInfo: e.$original,
            textDialog: d.textDialog,
            backgroundColor: i
          }, t), {
            $compid__15: t,
            $original: e.$original
          };
        }), l = 0 < n.length ? n.map(function (e, t) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          }, e = {
            $original: (0, _index.internal_get_original)(e.$original)
          };
          t = (0, _index.genCompid)(g + "PjKIGUiCSi" + t);
          return 0 < n.length && _index.propsManager.set({
            goodInfo: e.$original,
            textDialog: d.textDialog,
            backgroundColor: i
          }, t), {
            $compid__15: t,
            $original: e.$original
          };
        }) : [];
        return 0 < n.length || _index.propsManager.set({
          defaultType: a,
          backgroundColor: i,
          locationError: r,
          defaultTips: u,
          defaultBtnTxt: s,
          defaultImg: c,
          onDefaultEvent: f.onDefaultEvent
        }, e), {
          anonymousState__temp6: p,
          anonymousState__temp7: o,
          loopArray4: t,
          loopArray5: l,
          $compid__16: e,
          style: _indexModuleLessMap2.default,
          helpCutResponse: d,
          cutPriceList: n
        };
      };
    }
  }, {
    key: "_createMainData",
    value: function (M) {
      var W = this;
      return function () {
        var e = (0, _index.genCompid)(M + "$compid__17"),
            t = (0, _index.genCompid)(M + "$compid__18"),
            o = (0, _index.genCompid)(M + "$compid__19"),
            n = W.state,
            i = n.isShowBargainDia,
            a = n.selfCutCount,
            r = n.shareCount,
            u = n.cutPriceState,
            s = n.backgroundColor,
            c = n.leftNewUserCount,
            l = n.cutPriceTotal,
            d = n.restPrice,
            p = n.expireTime,
            g = n.nickHeadUrl,
            f = n.skuImageUrl,
            m = n.skuName,
            _ = n.logoUrl,
            h = n.storeName,
            C = n.takeCount,
            y = n.bindUserList,
            v = n.cutPricePersonList,
            k = n.totalNewUserCount,
            P = n.lastSelfCutPrice,
            w = n.nextSelfCutPrice,
            x = n.options,
            I = n.shareInfo,
            S = n.d,
            b = n.h,
            D = n.m,
            U = n.s,
            N = n.basicPrice,
            L = n.cutPrice,
            T = n.isShowHasCutFourDia,
            j = n.totalSelfCutCount,
            R = (0, _index.internal_inline_style)({
          backgroundColor: s
        });

        W.anonymousFunc5 = function () {
          return W.clickRule(!0);
        };

        function F() {
          return W.getPageInfo();
        }

        function $() {
          return W.getPageInfo();
        }

        W.anonymousFunc6 = function () {
          return W.closeBargainDia();
        };

        n = i && 0 == u ? function () {
          return W.getPageInfo();
        } : null;
        return _index.propsManager.set({
          cutPriceState: u,
          expireTime: p,
          nickHeadUrl: g,
          skuImageUrl: f,
          skuName: m,
          logoUrl: _,
          storeName: h,
          backgroundColor: s,
          takeCount: C,
          cutPriceTotal: l,
          restPrice: d,
          cutPrice: L,
          leftNewUserCount: c,
          storeId: x.storeId,
          skuId: x.skuId,
          activityId: x.activityId,
          orgCode: x.orgCode,
          unionCode: x.unionCode,
          getCutPriceDetail: F,
          keepTime: W.keepTime,
          basicPrice: N,
          shareInfo: I,
          selfCutCount: a,
          nextSelfCutPrice: w,
          openHasCutFourDia: W.openHasCutFourDia,
          closeHasCutFourDia: W.closeHasCutFourDia,
          totalSelfCutCount: j
        }, e), _index.propsManager.set({
          cutPriceState: u,
          backgroundColor: s,
          bindUserList: y,
          cutPricePersonList: v,
          totalNewUserCount: k,
          storeId: x.storeId,
          skuId: x.skuId,
          activityId: x.activityId,
          orgCode: x.orgCode,
          unionCode: x.unionCode,
          leftNewUserCount: c,
          getCutPriceDetail: $,
          d: S,
          h: b,
          m: D,
          s: U,
          basicPrice: N,
          cutPrice: L,
          shareInfo: I
        }, t), i && 0 == u && _index.propsManager.set({
          selfCutCount: a,
          shareCount: r,
          onCloseDia: W.anonymousFunc6,
          cutPriceTotal: l,
          leftNewUserCount: c,
          restPrice: d,
          backgroundColor: s,
          lastSelfCutPrice: P,
          nextSelfCutPrice: w,
          skuImageUrl: f,
          skuName: m,
          getCutPriceDetail: n,
          basicPrice: N,
          cutPrice: L,
          shareInfo: I,
          isShowHasCutFourDia: T,
          openHasCutFourDia: W.openHasCutFourDia,
          closeHasCutFourDia: W.closeHasCutFourDia,
          totalSelfCutCount: j
        }, o), {
          anonymousState__temp8: R,
          anonymousState__temp9: F,
          anonymousState__temp10: $,
          anonymousState__temp11: n,
          $compid__17: e,
          $compid__18: t,
          $compid__19: o,
          style: _indexModuleLessMap2.default,
          isShowBargainDia: i,
          cutPriceState: u
        };
      };
    }
  }, {
    key: "_createNewerData",
    value: function (e) {
      var o = this;
      return function () {
        var e = o.state,
            t = e.bindNewUserResponse,
            e = e.newUserMiddleImg,
            e = (0, _index.internal_inline_style)({
          background: "url(" + (t.newUserMiddleImg || e) + "?1) no-repeat top",
          backgroundSize: "100vw 100vh"
        });
        return o.anonymousFunc7 = function () {
          return o.clickNewerBtn();
        }, {
          anonymousState__temp12: e,
          style: _indexModuleLessMap2.default,
          bindNewUserResponse: t
        };
      };
    }
  }, {
    key: "_createNoLoginData",
    value: function (e) {
      var t = this;
      return function () {
        return t.anonymousFunc8 = function () {
          return t.goLogin();
        }, {
          style: _indexModuleLessMap2.default
        };
      };
    }
  }, {
    key: "componentDidShow",
    value: function () {
      this.setBusiness(), this.initPage(), (0, _indexWeapp2.pvReport)({
        create_time: new Date(),
        page_par: this.$router.params || {}
      });
    }
  }, {
    key: "initPage",
    value: function () {
      var t = this;
      (0, _indexWeapp.isLogin)().then(function () {
        t.getWxUserInfo().then(function (e) {
          e.nickName || wxUserInfo.avatarUrl ? t.setState({
            showNoLoginPage: !1,
            showDefault: !0,
            showAuthPop: !1
          }, function () {
            t.getAddress();
          }) : t.setState({
            showNoLoginPage: !1,
            showDefault: !0,
            showAuthPop: !0
          });
        }).catch(function (e) {
          t.setState({
            showNoLoginPage: !1,
            showDefault: !0,
            showAuthPop: !0
          });
        });
      }).catch(function (e) {
        t.setState({
          showNoLoginPage: !0,
          showDefault: !1
        });
      });
    }
  }, {
    key: "getAddress",
    value: function () {
      var t = this;
      (0, _indexWeapp4.getLocation)().then(function (e) {
        e && e.longitude ? t.setState({
          addressInfo: e
        }, function () {
          t.handleQRCodeData();
        }) : t.getLocationError();
      }).catch(function (e) {
        t.getLocationError(e);
      });
    }
  }, {
    key: "getWxUserInfo",
    value: function () {
      var n = this;
      return new Promise(function (e, t) {
        var o = n.state.wxUserInfo;

        try {
          o = (0, _indexWeapp6.getStorageSync)("wxUserInfo") || {};
        } catch (e) {
          t(o);
        }

        n.setState({
          wxUserInfo: o
        }), e(o);
      });
    }
  }, {
    key: "setBusiness",
    value: function () {
      (0, _indexWeapp9.default)()._independent_.qrcode.business = 18;
    }
  }, {
    key: "handleQRCodeData",
    value: function () {
      var e = this,
          t = this.$router.params || {},
          o = t.unionCode,
          n = void 0 === o ? "" : o,
          i = t.activityId,
          a = void 0 === i ? "" : i,
          r = t.skuId,
          o = void 0 === r ? "" : r,
          i = t.storeId,
          r = void 0 === i ? "" : i,
          i = t.orgCode,
          i = void 0 === i ? "" : i,
          t = t.scene,
          t = void 0 === t ? "" : t;
      t ? 3 == (t = decodeURIComponent(t).split(",")).length && this.setState({
        options: {
          unionCode: t[0],
          activityId: t[1]
        }
      }, function () {
        e.getPageInfo();
      }) : this.setState({
        options: {
          unionCode: n,
          activityId: a,
          skuId: o,
          storeId: r,
          orgCode: i
        }
      }, function () {
        e.getPageInfo();
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
    key: "getPageInfo",
    value: function () {
      var U = this,
          e = this.state,
          t = e.options,
          o = e.wxUserInfo,
          n = void 0 === o ? {} : o,
          i = (void 0 === t ? {} : t) || {},
          a = i.unionCode,
          r = void 0 === a ? "" : a,
          u = i.activityId,
          e = void 0 === u ? "" : u,
          o = i.skuId,
          t = void 0 === o ? "" : o,
          a = i.storeId,
          u = void 0 === a ? "" : a,
          o = i.orgCode,
          a = void 0 === o ? "" : o,
          i = this.$router.params || {},
          o = this.getLoginInfo() || {};
      (0, _bargain.getCutPriceDetail)({
        unionCode: r || i.unionCode || "",
        activityId: e || i.activityId || "",
        skuId: t || i.skuId || "",
        storeId: u || i.storeId || "",
        orgCode: a || i.orgCode || "",
        nickName: n.nickName,
        nickHeadUrl: n.avatarUrl,
        openId: o.loginInfo || "",
        wcUnionId: o.unionid_pdj_jd_new || ""
      }).then(function (e) {
        e.code;
        var t = e.result,
            o = void 0 === t ? {} : t,
            n = e.msg,
            i = void 0 === n ? "" : n,
            a = o.backgroundColor,
            r = o.cutPrice,
            u = o.basicPrice,
            s = o.bindUserList,
            c = o.cutPricePersonList,
            l = o.bannerImgList,
            d = o.jumpPageCode,
            p = o.activityRuleDesc,
            g = o.cutPriceState,
            f = void 0 === g ? "" : g,
            m = o.bindNewUserResponse,
            _ = o.helpCutResponse,
            h = o.nickHeadUrl,
            C = o.skuImageUrl,
            y = o.skuName,
            v = o.logoUrl,
            k = o.storeName,
            P = o.takeCount,
            w = o.cutPriceTotal,
            x = o.restPrice,
            I = o.ladderCutPrice,
            S = o.leftNewUserCount,
            b = o.totalNewUserCount,
            D = o.nextSelfCutPrice,
            t = o.lastSelfCutPrice,
            e = o.shareSkuImgUrl,
            n = o.expireTime,
            g = o.selfCutCount,
            o = o.totalSelfCutCount;
        d ? (U.setState({
          cutPriceState: f,
          isShowBargainDia: 3 == d && 0 == f,
          showNewerPage: 6 == d,
          showOldPage: 5 == d,
          showNoLoginPage: 4 == d,
          bindNewUserResponse: void 0 === m ? {} : m,
          helpCutResponse: void 0 === _ ? {} : _,
          activityRuleDesc: p,
          backgroundColor: void 0 === a ? "#0000ff" : a,
          nickHeadUrl: h,
          skuImageUrl: C,
          skuName: y,
          logoUrl: void 0 === v ? "" : v,
          storeName: k,
          takeCount: P,
          cutPriceTotal: w,
          restPrice: x,
          ladderCutPrice: I,
          leftNewUserCount: S,
          bindUserList: void 0 === s ? [] : s,
          cutPricePersonList: void 0 === c ? [] : c,
          totalNewUserCount: b,
          nextSelfCutPrice: D,
          lastSelfCutPrice: t,
          bannerImg: (void 0 === l ? [] : l)[0] || "https://storage.360buyimg.com/wximg/bargain-t/bg.png?2",
          showDefault: !1,
          shareSkuImgUrl: e,
          expireTime: n,
          basicPrice: u,
          cutPrice: r,
          selfCutCount: g,
          totalSelfCutCount: o
        }), 5 == d && U.getCutGoodsLitInfo(), 3 == d && (U.getMaterialInfo({
          skuImageUrl: C,
          skuName: y,
          cutPrice: r,
          basicPrice: u
        }), U.pvReportFn({
          cutPriceState: f,
          lastSelfCutPrice: t,
          selfCutCount: g,
          cutPriceTotal: w
        }))) : U.setState({
          showDefault: !0,
          defaultImg: "",
          defaultType: 3,
          defaultTips: "" + i || "请求失败"
        });
      }).catch(function (e) {
        U.setState({
          showDefault: !0,
          defaultImg: "",
          defaultType: 3,
          defaultTips: "(" + e.code + ") " + e.msg || "请求失败"
        });
      });
    }
  }, {
    key: "pvReportFn",
    value: function (e) {
      var t = this.state,
          o = t.isShowHasCutFourDia,
          n = t.totalSelfCutCount,
          i = e.cutPriceState,
          a = e.lastSelfCutPrice,
          t = void 0 === a ? "" : a,
          a = e.selfCutCount,
          a = void 0 === a ? "" : a,
          e = e.cutPriceTotal,
          e = void 0 === e ? "" : e;
      0 == (void 0 === i ? "" : i) && (i = {}, 1 == a && (i = {
        type: "first",
        amount: t
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: i
      })), 2 == a && (2 == n && 1 == o || 2 < n && 0 == o) && (i = {
        type: "second",
        amount: t
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: i
      })), 3 == a && (3 == n && 1 == o || 3 < n && 0 == o) && (i = {
        type: "third",
        amount: t
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: i
      })), 4 == a && 1 == o && (i = {
        type: "fourth",
        amount: t
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: i
      })), a == n && 0 == o && (i = {
        type: "back",
        amount: e
      }, (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: i
      })));
    }
  }, {
    key: "getMaterialInfo",
    value: function (e) {
      var t = this;
      (0, _bargain.getMaterial)(e).then(function (e) {
        e = e.result;
        t.setState({
          shareInfo: e || {}
        });
      }).catch(function (e) {});
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp6.getStorageSync)(_indexWeapp7.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "goHome",
    value: function () {
      (0, _indexWeapp5.jump)({
        to: "home"
      });
    }
  }, {
    key: "clickRule",
    value: function (e) {
      this.setState({
        showRule: e
      });
    }
  }, {
    key: "goLogin",
    value: function () {
      var e = this.$router.params || {},
          t = e.unionCode,
          o = e.activityId,
          n = e.skuId,
          i = e.storeId,
          a = e.orgCode,
          e = e.scene;
      (0, _indexWeapp.goToLogin)({
        localTargetUrl: "/pages/bargain-t/detail/index?unionCode=" + (void 0 === t ? "" : t) + "&activityId=" + (void 0 === o ? "" : o) + "&skuId=" + (void 0 === n ? "" : n) + "&storeId=" + (void 0 === i ? "" : i) + "&orgCode=" + (void 0 === a ? "" : a) + "&scene=" + (void 0 === e ? "" : e)
      });
    }
  }, {
    key: "clickNewerBtn",
    value: function () {
      var e = this.state.bindNewUserResponse,
          e = void 0 === e ? {} : e;
      2 == e.bindStatus ? this.goHome() : (0, _indexWeapp3.navigateTo)("/pages/newUser-t/index?business=out"), (0, _indexWeapp2.clickReport)({
        click_id: "clickGet",
        click_par: {
          type: "bargain",
          activeState: e.textDialog || ""
        }
      });
    }
  }, {
    key: "getCutGoodsLitInfo",
    value: function () {
      var o = this,
          e = this.state.addressInfo,
          e = void 0 === e ? {} : e;
      (0, _bargain.getCutGoodsLit)({
        longitude: e.longitude || "",
        latitude: e.latitude || "",
        cityId: e.cityId || "",
        firstQueryMyCutPriceList: 0
      }).then(function (e) {
        e.code;
        var t = e.result,
            e = void 0 === t ? {} : t,
            t = e.cutPriceList,
            t = void 0 === t ? [] : t,
            e = e.cutPriceRule;
        0 < t.length ? o.setState({
          cutPriceList: t,
          showDefault: !1,
          showOldPage: !0,
          activityRuleDesc: e
        }) : o.setState({
          defaultTips: "当前区域暂无商品，我们正在努力开拓中",
          defaultBtnTxt: "去首页看看",
          defaultImg: "",
          defaultType: 2,
          showOldPage: !0,
          showDefault: !1,
          activityRuleDesc: e
        });
      }).catch(function (e) {
        o.setState({
          defaultImg: "",
          defaultType: 3,
          defaultTips: "" + e.msg || "请求失败"
        });
      });
    }
  }, {
    key: "onShareAppMessage",
    value: function (e) {
      var t = this,
          o = (e || {}).target,
          n = ((void 0 === o ? {} : o) || {}).dataset,
          i = void 0 === n ? {} : n,
          a = this.$router.params || {},
          r = a.unionCode,
          u = void 0 === r ? "" : r,
          s = a.activityId,
          c = void 0 === s ? "" : s,
          e = a.skuId,
          o = void 0 === e ? "" : e,
          n = a.storeId,
          r = void 0 === n ? "" : n,
          s = a.orgCode,
          e = void 0 === s ? "" : s,
          n = this.state,
          a = n.shareInfo,
          s = n.selfCutCount,
          n = n.totalSelfCutCount;
      return !i || "bargainDia" != i.type && "card" != i.type || ("bargainDia" == i.type && this.closeBargainDia(), s < n && (this.senderCutPrice(), setTimeout(function () {
        t.getPageInfo();
      }, 3e3)), s == n - 1 && this.openHasCutFourDia(), s != n - 1 && this.closeHasCutFourDia()), {
        title: a.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
        imageUrl: a.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
        path: "/pages/bargain-t/detail/index?unionCode=" + u + "&activityId=" + c + "&skuId=" + o + "&storeId=" + r + "&orgCode=" + e
      };
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp6.getStorageSync)(_indexWeapp7.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "toMyCutList",
    value: function () {
      (0, _indexWeapp3.navigateTo)("/pages/bargain-t/list/index");
    }
  }, {
    key: "hideAuthPop",
    value: function () {
      this.setState({
        showAuthPop: !1
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
  }, {
    key: "anonymousFunc3",
    value: function (e) {}
  }, {
    key: "anonymousFunc4",
    value: function (e) {}
  }, {
    key: "anonymousFunc5",
    value: function (e) {}
  }, {
    key: "anonymousFunc6",
    value: function (e) {}
  }, {
    key: "anonymousFunc7",
    value: function (e) {}
  }, {
    key: "anonymousFunc8",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc7", "anonymousFunc8"], _class.multipleSlots = !0, _class.$$componentPath = "pages/bargain-t/detail/index", _temp2);
exports.default = Detail, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(Detail, !0));