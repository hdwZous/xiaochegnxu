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
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp4 = require("../npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _indexWeapp5 = require("../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexWeapp6 = require("../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp7 = require("../npm/@jd/djmp/common-t/js/getApp/index.weapp.js"),
    _indexWeapp8 = _interopRequireDefault(_indexWeapp7),
    _indexWeapp9 = require("../npm/@jd/djmp/common-t/js/env/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _bargain = require("../api/bargain.js");

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

var List = (_temp2 = _class = function () {
  function i() {
    var e, n;

    _classCallCheck(this, i);

    for (var t = arguments.length, o = Array(t), a = 0; a < t; a++) o[a] = arguments[a];

    return (e = n = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__5", "showPageDefault", "showNewerPage", "anonymousState__temp", "showNoLogin", "anonymousState__temp2", "anonymousState__temp3", "showDefault", "defaultType", "locationError", "defaultTips", "defaultBtnTxt", "defaultImg", "addressInfo", "backgroundColor", "backgroundColorRgb", "bannerImg", "newUserMiddleImg", "currentPage", "dataSize", "haveMoreMyCutData", "tabIndex", "cutPriceList", "myCutPriceList", "cutPriceRule", "showRule", "showStickTab", "isShowRedEnvelopsDia"], n.config = {
      navigationBarTitleText: "砍价领商品",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, n.closeRedEnvelopesDia = function () {
      n.setState({
        isShowRedEnvelopsDia: !1
      });
    }, n.onDefaultEvent = function () {
      var e = n.state,
          t = e.tabIndex,
          e = e.defaultType;
      if (3 == e) switch (t) {
        case 1:
          n.getCutGoodsLitInfo(!1);
          break;

        case 2:
          n.getMyCutGoodsLitInfo(1);
      } else 2 == e && n.goHome();
    }, n.anonymousFunc5Map = {}, n.customComponents = ["Default", "SubscribeMessage", "CutGoodList", "MyBargainGoods", "RuleDia", "RedEnvelopesDia"], _possibleConstructorReturn(n, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      var t = this;
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.joinPageNum = 0, this.state = {
        showDefault: !0,
        showPageDefault: !0,
        showNoLogin: !1,
        defaultType: 0,
        locationError: {},
        defaultTips: "",
        defaultBtnTxt: "",
        defaultImg: "",
        addressInfo: {},
        backgroundColor: "#ff1844",
        backgroundColorRgb: "rgba(255,210,2,0)",
        bannerImg: "https://storage.360buyimg.com/wximg/bargain-t/newListBgNew.png",
        newUserMiddleImg: "https://storage.360buyimg.com/wximg/bargain-t/redBg3.png",
        showNewerPage: !1,
        currentPage: 1,
        dataSize: 10,
        haveMoreMyCutData: !1,
        tabIndex: 1,
        cutPriceList: [],
        myCutPriceList: [],
        cutPriceRule: "",
        showRule: !1,
        showStickTab: !1,
        isShowRedEnvelopsDia: !1
      }, this.$$refs = [{
        type: "component",
        id: "aggDX",
        refName: "",
        fn: function (e) {
          return t.childSubscribe = e;
        }
      }];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__5"),
          n = this.__state,
          o = n.showNewerPage,
          a = n.showNoLogin,
          i = n.showPageDefault,
          r = n.defaultImg,
          u = n.locationError,
          s = n.defaultType,
          c = n.defaultTips,
          l = n.defaultBtnTxt,
          n = n.backgroundColor,
          o = o ? this._createNewerData(e + "dMzxUZudUN")() : null,
          a = a ? this._createNoLoginData(e + "TUIGTmoztJ")() : null,
          e = this._createMainData(e + "bGYFKhXmnO")();

      return i && _index.propsManager.set({
        defaultType: s,
        locationError: u,
        defaultTips: c,
        defaultBtnTxt: l,
        defaultImg: r,
        backgroundColor: n,
        onDefaultEvent: this.onDefaultEvent
      }, t), Object.assign(this.__state, {
        $compid__5: t,
        anonymousState__temp: o,
        anonymousState__temp2: a,
        anonymousState__temp3: e
      }), this.__state;
    }
  }, {
    key: "_createMainData",
    value: function (S) {
      var C = this;
      return function () {
        var e = (0, _index.genCompid)(S + "$compid__8"),
            t = (0, _index.genCompid)(S + "$compid__9"),
            n = (0, _index.genCompid)(S + "$compid__10"),
            o = (0, _index.genCompid)(S + "$compid__11"),
            a = C.state,
            r = a.tabIndex,
            i = a.cutPriceList,
            u = a.showDefault,
            s = a.myCutPriceList,
            c = a.defaultImg,
            l = a.locationError,
            d = a.defaultType,
            p = a.defaultTips,
            g = a.defaultBtnTxt,
            f = a.backgroundColor,
            m = a.backgroundColorRgb,
            _ = a.bannerImg,
            h = a.cutPriceRule,
            y = a.showRule,
            b = a.showStickTab,
            v = a.isShowRedEnvelopsDia,
            x = (0, _index.internal_inline_style)({
          background: "linear-gradient(180deg, " + f + " 0%, " + m + " 100%)"
        });
        C.anonymousFunc0 = function () {
          return C.clickRule(!0);
        }, C.anonymousFunc1 = function () {
          return C.changeTab(1);
        }, C.anonymousFunc2 = function () {
          return C.changeTab(2);
        }, C.anonymousFunc3 = function () {
          return C.changeTab(1);
        }, C.anonymousFunc4 = function () {
          return C.changeTab(2);
        }, C.anonymousFunc6 = function () {
          return C.clickRule(!1);
        };
        var w = 1 == r ? i.map(function (e, t) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          }, e = {
            $original: (0, _index.internal_get_original)(e.$original)
          };
          t = (0, _index.genCompid)(S + "WekpgUXCjg" + t);
          return 1 == r && (0 < i.length || !u) && _index.propsManager.set({
            goodInfo: e.$original,
            backgroundColor: f
          }, t), {
            $compid__6: t,
            $original: e.$original
          };
        }) : [],
            k = 0 < i.length || !u ? i.map(function (e, t) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          }, e = {
            $original: (0, _index.internal_get_original)(e.$original)
          };
          t = (0, _index.genCompid)(S + "WekpgUXCjg" + t);
          return 1 == r && (0 < i.length || !u) && _index.propsManager.set({
            goodInfo: e.$original,
            backgroundColor: f
          }, t), {
            $compid__6: t,
            $original: e.$original
          };
        }) : [],
            a = 2 == r ? s.map(function (e, t) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          }, e = {
            $original: (0, _index.internal_get_original)(e.$original)
          };
          var n = "swqEM" + t;

          C.anonymousFunc5Map[n] = function (e) {
            return C.showSubscribe(e);
          };

          var o = s.length || !u ? function () {
            return C.changeTab(1);
          } : null,
              a = s.length || !u ? function (e) {
            return C.getMyCutGoodsLitInfo(e);
          } : null,
              i = (0, _index.genCompid)(S + "cmilDmpVoi" + t);
          return 2 != r || !s.length && u || _index.propsManager.set({
            item: e.$original,
            index: t,
            backgroundColor: f,
            changeTab: o,
            onShowSubscribe: C.anonymousFunc5.bind(C, n),
            getMyCutGoodsLitInfo: a
          }, i), {
            _$indexKey: n,
            $loopState__temp6: o,
            $loopState__temp8: a,
            $compid__7: i,
            $original: e.$original
          };
        }) : [],
            m = s.length || !u ? s.map(function (e, t) {
          e = {
            $original: (0, _index.internal_get_original)(e)
          }, e = {
            $original: (0, _index.internal_get_original)(e.$original)
          };
          var n = "swqEM" + t;

          C.anonymousFunc5Map[n] = function (e) {
            return C.showSubscribe(e);
          };

          var o = s.length || !u ? function () {
            return C.changeTab(1);
          } : null,
              a = s.length || !u ? function (e) {
            return C.getMyCutGoodsLitInfo(e);
          } : null,
              i = (0, _index.genCompid)(S + "cmilDmpVoi" + t);
          return 2 != r || !s.length && u || _index.propsManager.set({
            item: e.$original,
            index: t,
            backgroundColor: f,
            changeTab: o,
            onShowSubscribe: C.anonymousFunc5.bind(C, n),
            getMyCutGoodsLitInfo: a
          }, i), {
            _$indexKey: n,
            $loopState__temp6: o,
            $loopState__temp8: a,
            $compid__7: i,
            $original: e.$original
          };
        }) : [];
        return 1 != r || 0 < i.length || !u || _index.propsManager.set({
          defaultType: d,
          locationError: l,
          defaultTips: p,
          defaultBtnTxt: g,
          defaultImg: c,
          backgroundColor: f,
          onDefaultEvent: C.onDefaultEvent
        }, e), 2 == r && !s.length && u && _index.propsManager.set({
          defaultType: d,
          locationError: l,
          defaultTips: p,
          defaultBtnTxt: g,
          backgroundColor: f,
          defaultImg: c,
          onDefaultEvent: C.onDefaultEvent
        }, t), y && _index.propsManager.set({
          txt: h,
          title: "活动规则",
          onCloseDia: C.anonymousFunc6
        }, n), v && _index.propsManager.set({
          closeRedEnvelopesDia: C.closeRedEnvelopesDia
        }, o), {
          anonymousState__temp4: x,
          loopArray0: w,
          loopArray1: k,
          loopArray2: a,
          loopArray3: m,
          $compid__8: e,
          $compid__9: t,
          $compid__10: n,
          $compid__11: o,
          style: _indexModuleLessMap2.default,
          bannerImg: _,
          tabIndex: r,
          showStickTab: b,
          cutPriceList: i,
          showDefault: u,
          myCutPriceList: s,
          showRule: y,
          isShowRedEnvelopsDia: v
        };
      };
    }
  }, {
    key: "_createNewerData",
    value: function (e) {
      var t = this;
      return function () {
        var e = t.state.newUserMiddleImg;
        return t.anonymousFunc7 = function () {
          return t.goToNewer();
        }, {
          style: _indexModuleLessMap2.default,
          newUserMiddleImg: e
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
      var n = this;
      this.setBusiness(), (0, _indexWeapp.isLogin)().then(function () {
        (0, _indexWeapp4.getLocation)().then(function (e) {
          var t = n.state.tabIndex;
          n.setState({
            addressInfo: e || {},
            showPageDefault: !1,
            showNoLogin: !1
          }, function () {
            1 == t ? n.getCutGoodsLitInfo(!0, e) : 2 == t && (n.getMyCutGoodsLitInfo(1), (0, _indexWeapp2.clickReport)({
              click_id: "selectTab",
              click_par: {
                type: "myBargain",
                state: 1
              }
            }));
          });
        }).catch(function (e) {
          n.getLocationError(e);
        });
      }).catch(function (e) {
        0 == n.joinPageNum ? ((0, _indexWeapp.goToLogin)({
          localTargetUrl: "/pages/bargain-t/list/index"
        }), n.joinPageNum = 1) : n.setState({
          showNoLogin: !0,
          showPageDefault: !1
        });
      }), (0, _indexWeapp2.pvReport)({
        page_par: this.$router.params || {}
      });
    }
  }, {
    key: "setBusiness",
    value: function () {
      var e = this.$router.params.channel,
          e = void 0 === e ? "" : e;
      console.log("setBusiness------------", e), (0, _indexWeapp8.default)()._independent_.qrcode.business = e;
    }
  }, {
    key: "backTop",
    value: function () {
      _index2.default.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
    }
  }, {
    key: "getLocationError",
    value: function (e) {
      this.setState({
        showPageDefault: !0,
        defaultType: 1,
        defaultTips: "",
        defaultBtnTxt: "",
        locationError: e
      });
    }
  }, {
    key: "changeTab",
    value: function (e) {
      var t = this;
      e != this.state.tabIndex && (this.backTop(), this.setState({
        tabIndex: e,
        currentPage: 1
      }, function () {
        switch (e) {
          case 1:
            t.getCutGoodsLitInfo(!1);
            break;

          case 2:
            t.getMyCutGoodsLitInfo(1);
        }
      }), (0, _indexWeapp2.clickReport)({
        click_id: "selectTab",
        click_par: {
          type: 1 == e ? "bargainGoods" : "myBargain",
          state: 0
        }
      }));
    }
  }, {
    key: "getCutGoodsLitInfo",
    value: function (p, e) {
      var g = this;
      (0, _indexWeapp3.showLoading)();
      var t = this.state,
          n = t.addressInfo,
          f = t.dataSize,
          m = t.currentPage,
          t = this.$router.params.channel;
      n.cityId || (n = e || {}), (0, _bargain.getCutGoodsLit)({
        longitude: n.longitude || "",
        latitude: n.latitude || "",
        cityId: n.cityId || "",
        firstQueryMyCutPriceList: p ? 1 : 0,
        currentPage: m,
        dataSize: f,
        channelForBI: void 0 === t ? "" : t
      }).then(function (e) {
        e.code;
        var t,
            n = e.result,
            o = void 0 === n ? {} : n,
            a = (e.msg, o.cutPriceList),
            i = void 0 === a ? [] : a,
            r = o.bannerImgList,
            n = void 0 === r ? [] : r,
            e = o.backgroundColor,
            a = o.jumpPageCode,
            r = void 0 === a ? 1 : a,
            a = o.cutPriceRule,
            u = void 0 === a ? "" : a,
            a = o.myCutPriceList,
            s = void 0 === a ? [] : a,
            o = o.newUserMiddleImg,
            c = void 0 === o ? "" : o,
            o = g.state,
            l = o.bannerImg,
            o = o.backgroundColorRgb,
            d = void 0 === o ? "rgba(255,210,2,0)" : o,
            l = n[0] || l;
        (t = (t = void 0 === e ? "" : e) || g.state.backgroundColor) && (d = (0, _bargain.transformRgb)(t));
        c = c || g.state.newUserMiddleImg, n = !1;

        switch (0 != r && ((e = String(new Date().getDate())) == (0, _indexWeapp6.getStorageSync)("localStorageDate") ? n = !1 : (n = !0, (0, _indexWeapp6.setStorageSync)("localStorageDate", e)), g.setState({
          isShowRedEnvelopsDia: !!n
        })), r = p ? r : 1) {
          case 0:
            g.setState({
              showNewerPage: !0,
              showDefault: !1,
              newUserMiddleImg: c
            });
            break;

          case 1:
            0 < i.length ? g.setState({
              cutPriceList: i,
              backgroundColor: t,
              backgroundColorRgb: d,
              bannerImg: l,
              showDefault: !1,
              cutPriceRule: u
            }) : g.setState({
              cutPriceList: i,
              backgroundColor: t,
              backgroundColorRgb: d,
              bannerImg: l,
              defaultTips: "当前区域暂无商品，我们正在努力开拓中",
              defaultBtnTxt: "去首页看看",
              showDefault: !0,
              defaultImg: "",
              defaultType: 2,
              cutPriceRule: u
            });
            break;

          case 2:
            g.setState({
              tabIndex: 2,
              backgroundColor: t,
              backgroundColorRgb: d,
              bannerImg: l,
              showDefault: !1,
              cutPriceRule: u,
              currentPage: m + 1,
              haveMoreMyCutData: !(s.length < f),
              myCutPriceList: s
            }), g.backTop();
        }

        (0, _indexWeapp2.clickReport)({
          click_id: "selectTab",
          click_par: {
            type: 1 == r ? "bargainGoods" : "myBargain",
            state: 1
          }
        }), (0, _indexWeapp3.hideLoading)();
      }).catch(function (e) {
        g.setState({
          showDefault: !0,
          defaultImg: "",
          defaultType: 3,
          defaultTips: "" + e.msg || "请求失败"
        }), (0, _indexWeapp3.hideLoading)();
      });
    }
  }, {
    key: "getMyCutGoodsLitInfo",
    value: function (e) {
      var t = this;
      (0, _indexWeapp3.showLoading)();
      var n = this.state,
          o = n.currentPage,
          a = n.dataSize,
          n = n.myCutPriceList,
          i = void 0 === n ? [] : n;
      e && (o = e, i = []), (0, _bargain.getMyCutGoodsLit)({
        currentPage: o,
        dataSize: a
      }).then(function (e) {
        e = e.result, e = void 0 === e ? [] : e;
        1 == o && e.length <= 0 ? t.setState({
          defaultTips: "快来砍价吧~",
          defaultBtnTxt: "",
          showDefault: !0,
          defaultImg: "https://storage.360buyimg.com/wximg/bargain-t/dog.png",
          defaultType: 2
        }) : t.setState({
          myCutPriceList: i.concat(e),
          haveMoreMyCutData: !(e.length < a),
          currentPage: o + 1,
          showDefault: !1
        }), (0, _indexWeapp3.hideLoading)();
      }).catch(function (e) {
        t.setState({
          showDefault: !0,
          defaultImg: "",
          defaultType: 3,
          defaultTips: "" + e.msg || "请求失败"
        }), (0, _indexWeapp3.hideLoading)();
      });
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
      }), (0, _indexWeapp2.clickReport)({
        click_id: "clickRule",
        click_par: {}
      });
    }
  }, {
    key: "onPageScroll",
    value: function (e) {
      122 < e.scrollTop && !this.state.showStickTab && (console.log(11111), this.setState({
        showStickTab: !0
      })), e.scrollTop <= 122 && this.state.showStickTab && (console.log(222), this.setState({
        showStickTab: !1
      }));
    }
  }, {
    key: "onReachBottom",
    value: function () {
      console.log("到达底部了");
      var e = this.state,
          t = e.haveMoreMyCutData,
          e = e.tabIndex;
      t && 2 == e && this.getMyCutGoodsLitInfo();
    }
  }, {
    key: "goToNewer",
    value: function () {
      (0, _indexWeapp5.jump)({
        to: "newUser",
        type: "h5",
        params: {
          business: "out"
        }
      });
    }
  }, {
    key: "showSubscribe",
    value: function (e) {
      console.log("000000000000", e), this.sleep(1500);
      var t = [],
          n = e.activityId;

      try {
        t = (0, _indexWeapp6.getStorageSync)("cutSubscribeInfo");
      } catch (e) {}

      if (t) {
        for (var o = !1, a = 0; a < t.length; a++) if (t[a].activityId == n) {
          o = !0;
          break;
        }

        o || (t.push({
          activityId: n
        }), (0, _indexWeapp6.setStorageSync)("cutSubscribeInfo", t), this.childSubscribe.initSubscribeMessage(["Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso", "B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY"]));
      } else (t = []).push({
        activityId: n
      }), (0, _indexWeapp6.setStorageSync)("cutSubscribeInfo", t), this.childSubscribe.initSubscribeMessage(["Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso", "B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY"]);
    }
  }, {
    key: "sleep",
    value: function (e) {
      for (var t = new Date(), n = t.getTime() + e;;) if ((t = new Date()).getTime() > n) return;
    }
  }, {
    key: "goLogin",
    value: function () {
      var e = this.$router.params || {},
          t = e.channel,
          e = e.from;
      (0, _indexWeapp.goToLogin)({
        localTargetUrl: "/pages/bargain-t/list/index?channel=" + (void 0 === t ? "" : t) + "&from=" + (void 0 === e ? "" : e)
      });
    }
  }, {
    key: "onShareAppMessage",
    value: function (e) {
      var t = e || {},
          e = t.from,
          t = t.target,
          t = ((void 0 === t ? {} : t) || {}).dataset,
          t = (void 0 === t ? {} : t).eTapAA,
          t = void 0 === t ? {} : t;
      if ("button" == e) return {
        title: "帮我点下好嘛？全场商品你也可以免费拿！",
        imageUrl: t.shareSkuImgUrl || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
        path: "/pages/bargain-t/detail/index?unionCode=" + t.unionCode + "&activityId=" + t.activityId + "&skuId=" + t.skuId + "&storeId=" + t.storeId + "&orgCode=" + t.orgCode
      };
    }
  }, {
    key: "getChannel",
    value: function () {
      var e = this.getParameter("channel") || _indexWeapp9.ua,
          t = "";

      return this.getParameter("channel") || this.getParameter("channel") ? t = this.getParameter("channel") : /jdapp/i.test(e) ? t = "from_jdapp" : /jdLocal/i.test(e) ? t = "from_djapp" : /wyqb/i.test(e) ? t = "from_wyapp" : /(?:MicroMessenger)/i.test(_indexWeapp9.ua) ? t = "from_weixin" : /QQ\/([\d.]+)/gi.test(_indexWeapp9.ua) && (t = "from_mqq"), t;
    }
  }, {
    key: "getParameter",
    value: function (e, t) {
      t = t || document.location.href, t = new RegExp("(?:^|&|[?]|[/])" + e + "[=|:]([^&]*)").exec(t);
      return t ? decodeURIComponent(t[1]) : "";
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
    value: function (e, t) {
      return this.anonymousFunc5Map[e] && this.anonymousFunc5Map[e](t);
    }
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
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc7", "anonymousFunc8"], _class.multipleSlots = !0, _class.$$componentPath = "pages/bargain-t/list/index", _temp2);
exports.default = List, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(List, !0));