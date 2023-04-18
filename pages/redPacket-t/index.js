"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function n(e, t) {
    for (var a = 0; a < t.length; a++) {
      var n = t[a];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
    }
  }

  return function (e, t, a) {
    return t && n(e.prototype, t), a && n(e, a), e;
  };
}(),
    _get = function e(t, a, n) {
  null === t && (t = Function.prototype);
  var i = Object.getOwnPropertyDescriptor(t, a);

  if (void 0 !== i) {
    if ("value" in i) return i.value;
    i = i.get;
    return void 0 !== i ? i.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, a, n);
},
    _index = require("./npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("./npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("./npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("./npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp4 = require("./npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _index3 = require("./utils/index.js"),
    _api = require("./api.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _asyncToGenerator(e) {
  return function () {
    var s = e.apply(this, arguments);
    return new Promise(function (o, r) {
      return function t(e, a) {
        try {
          var n = s[e](a),
              i = n.value;
        } catch (e) {
          return void r(e);
        }

        if (!n.done) return Promise.resolve(i).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        o(i);
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

var loginTimer = void 0,
    Home = (_temp2 = _class = function () {
  function i() {
    var e, p;

    _classCallCheck(this, i);

    for (var t = arguments.length, a = Array(t), n = 0; n < t; n++) a[n] = arguments[n];

    return (e = p = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(a)))).$usedState = ["defaultType", "anonymousState__temp4", "anonymousState__temp5", "defaultTips", "defaultBtnTxt", "locationError", "homeData", "infoId", "isOpenPacketRain", "hasRainPopOpen", "hasHelpPopState", "isRainOpenFlag", "chancePopState", "helpPopState", "helpSuccessState", "permissionState", "token"], p.config = {
      navigationBarTitleText: "京东到家红包雨",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, p.onClearLoginTimer = function () {
      clearTimeout(loginTimer);
    }, p.closeDialog = function (e) {
      switch (e) {
        case "chancePopState":
          p.setState({
            chancePopState: !1
          });
          break;

        case "isRainOpenFlag":
          p.setState({
            isRainOpenFlag: !1
          }), p.fetchData();
          break;

        case "helpPopState":
          p.setState({
            helpPopState: !1
          }), p.fetchData();
          break;

        case "helpSuccessState":
          p.setState({
            helpSuccessState: !1
          }), p.fetchData();
          break;

        case "permissionState":
          p.setState({
            permissionState: !1
          }), p.fetchData();
      }
    }, p.openHelpPop = function () {
      p.setState({
        helpSuccessState: !0,
        helpPopState: !1
      }), p.clickRp("showLayer", {
        type: "helpSuc"
      });
    }, p.clickRp = function (e, t) {
      (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }, p.handleRule = function () {
      var e = p.state.infoId;
      (0, _indexWeapp3.navigateTo)("/pages/redPacket-t/pages/rule/index?infoId=" + e);
    }, p.closePackteRain = function () {
      p.setState({
        isOpenPacketRain: !1
      }), p.fetchData();
    }, p.openPermissPop = function () {
      p.setState({
        permissionState: !0
      });
    }, p.onClickShare = function (e) {
      var t = p.state.homeData.matterDetail,
          a = (t.title, t.description),
          n = t.xcxShareTitle,
          i = t.xcxSharePicUrl,
          o = p.state.infoId,
          r = p.state.homeData.inviteCode,
          s = "" + window.location.origin + window.location.pathname + "#/pages/redPacket-t/index?infoId=" + o;
      (0, _index3.throttle)(function () {
        var e = {
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: n,
          mpImgUrl: i,
          path: "/pages/redPacket-t/index?infoId=" + o + "&inviteCode=" + r,
          imgUrl: i,
          desc: a || "京东到家红包雨游戏",
          shareUrl: s,
          pyqImg: i,
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        };
        console.log("shareInfo==", e), (0, _indexWeapp4.openShare)(e);
      });
    }, p.customComponents = ["Default", "FriendHelp", "Permission", "OpenRedPacket", "RobRed", "TopBanner", "Bullets", "HourRed", "FriendHelpComp", "DotPacket"], _possibleConstructorReturn(p, e);
  }

  var e;
  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        defaultType: 0,
        defaultTips: "",
        defaultBtnTxt: "",
        locationError: "",
        homeData: {},
        infoId: "",
        isOpenPacketRain: !1,
        hasRainPopOpen: !1,
        hasHelpPopState: !1,
        isRainOpenFlag: !1,
        chancePopState: !1,
        helpPopState: !1,
        helpSuccessState: !1,
        permissionState: !1,
        token: ""
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this.$router.params.infoId || "",
          t = this.$router.params.inviteCode || "";
      console.log("infoId :>> ", e), this.setState({
        infoId: e,
        inviteCode: t
      });
    }
  }, {
    key: "componentDidShow",
    value: function () {
      this.initPage();
    }
  }, {
    key: "initPage",
    value: function () {
      var t = this,
          a = this.$router.params.infoId || "",
          n = this.$router.params.inviteCode || "";
      (0, _indexWeapp.isLogin)().then(function () {
        t.fetchData();
      }).catch(function (e) {
        (0, _indexWeapp3.showToast)({
          title: "您未登录，快去登录领取福利吧!"
        }), loginTimer = setTimeout(function () {
          (0, _indexWeapp.goToLogin)({
            localTargetUrl: "/pages/redPacket-t/index?infoId=" + a + "&inviteCode=" + n
          }), clearTimeout(loginTimer);
        }, 2e3), t.setState({
          defaultType: 4,
          defaultTips: "您还没有登录哦~",
          defaultBtnTxt: "去登录"
        });
      }), (0, _indexWeapp2.pvReport)({
        create_time: new Date()
      });
    }
  }, {
    key: "goLogin",
    value: function () {
      var e = this.$router.params.infoId || "",
          t = this.$router.params.inviteCode || "";
      (0, _indexWeapp.goToLogin)({
        localTargetUrl: "/pages/redPacket-t/index?infoId=" + e + "&inviteCode=" + t
      });
    }
  }, {
    key: "fetchData",
    value: function () {
      var o = this;
      return new Promise(function (n, i) {
        var e = o.state.infoId || o.$router.params.infoId || "";
        (0, _api.getMainInfo)({
          infoId: e
        }).then(function (e) {
          console.log("主接口 res :>> ", e);
          var t = e.code,
              a = e.result,
              a = void 0 === a ? {} : a;
          0 == (void 0 === t ? 0 : t) ? (o.setState({
            homeData: a
          }, function () {
            o.setState({
              defaultType: null,
              defaultTips: "",
              defaultBtnTxt: ""
            }), o.uploadAllImage();
          }), n({
            homeData: a
          }), o.isHelpPoPopStateEvent(a), o.isRainPopOpen(a), o.isChanceOpen(a)) : (e = e.msg, (0, _indexWeapp3.showToast)({
            title: void 0 === e ? '"网络错误，请稍后重试~' : e
          }), i());
        }).catch(function () {
          var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          console.error("发生错=====", e);
          e = e.msg, e = void 0 === e ? '"网络错误，请稍后重试~' : e;
          (0, _indexWeapp3.showToast)({
            title: e
          }), o.setState({
            defaultType: 2,
            defaultTips: e,
            defaultBtnTxt: "重试"
          }), i();
        });
      });
    }
  }, {
    key: "openRedRain",
    value: function (e) {
      var n = this,
          t = this.state.homeData,
          a = void 0 === t ? {} : t,
          i = a.sceneCode,
          o = a.firstVisitChance,
          t = a.state,
          a = {};
      a.infoId = e || this.state.infoId || "", a.sceneCode = i, void 0 !== t && 1 == t && 1 == o && (a.firstVisit = o), (0, _api.openRedRain)(a).then(function (e) {
        var t = e.msg,
            a = e.code,
            e = e.result;
        0 == a ? n.setState({
          isOpenPacketRain: e.canRob,
          token: e.token
        }) : (0, _indexWeapp3.showToast)({
          title: t
        });
      }).catch(function (e) {
        (0, _indexWeapp3.showToast)({
          title: e.msg || "系统在开小差，稍后再试吧～"
        }), console.error(e);
      });
    }
  }, {
    key: "isHelpPoPopStateEvent",
    value: function () {
      var e = this.$router.params.inviteCode || "",
          t = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}) || {},
          a = t.infoState,
          n = t.state,
          t = this.state.hasHelpPopState;
      2 != a && 0 != a && 2 != n && e && !t && (this.setState({
        helpPopState: !0,
        hasHelpPopState: !0
      }), this.clickRp("showLayer", {
        type: "help"
      }));
    }
  }, {
    key: "isRainPopOpen",
    value: function (e) {
      var t = e.state,
          e = e.leftChance;
      void 0 !== t && 0 == t && 0 < e && !this.state.hasRainPopOpen && this.setState({
        isRainOpenFlag: !0,
        hasRainPopOpen: !0
      });
    }
  }, {
    key: "isChanceOpen",
    value: function () {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state,
          e = e.firstVisitChance;
      void 0 !== t && 1 == t && 1 == e && this.setState({
        chancePopState: !0
      });
    }
  }, {
    key: "playAgain",
    value: (e = _asyncToGenerator(regeneratorRuntime.mark(function e() {
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return this.setState({
              isOpenPacketRain: !1
            }), e.next = 3, this.fetchData();

          case 3:
            this.openRedRain(this.state.infoId);

          case 4:
          case "end":
            return e.stop();
        }
      }, e, this);
    })), function () {
      return e.apply(this, arguments);
    })
  }, {
    key: "onShareAppMessage",
    value: function (e) {
      var t = this.state.homeData || {},
          a = t.inviteCode,
          n = t.infoState,
          i = t.state,
          o = this.state,
          r = o.infoId,
          t = o.homeData,
          o = t.matterDetail && t.matterDetail.xcxShareTitle || "红包雨来啦",
          t = t.matterDetail && t.matterDetail.xcxSharePicUrl || "https://storage.360buyimg.com/wxmini/redpacket/%E5%88%86%E4%BA%AB%E5%8D%A1%E7%89%87.png";
      return 2 != n && 2 != i || (o = "亲，当前活动已结束", t = "https://storage.360buyimg.com/wxmini/redpacket/%E5%88%86%E4%BA%AB%E5%8D%A1%E7%89%87.png"), {
        title: o,
        imageUrl: t,
        path: "/pages/redPacket-t/index?infoId=" + r + "&inviteCode=" + a
      };
    }
  }, {
    key: "uploadAllImage",
    value: function () {
      (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/redpacket/dialogtop2.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wximg/redPacket/dialog_btn.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wximg/redPacket/dialog_bottom.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wximg/redPacket/strip_bg.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wximg/redPacket/clock.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wximg/redPacket/setout_title.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/redpacket/%E5%BC%80%E5%A5%96%E5%BC%B9%E7%AA%97.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/redpacket/%E9%80%9A%E7%9F%A5%E5%9B%BE%E7%89%87.png");
    }
  }, {
    key: "_createDefaultData",
    value: function (s) {
      var p = this;
      return function () {
        var e = (0, _index.genCompid)(s + "$compid__36"),
            t = p.state,
            a = t.defaultType,
            n = void 0 === a ? 0 : a,
            i = t.defaultTips,
            o = t.defaultBtnTxt,
            r = t.locationError,
            a = p.$router.params,
            t = a.channel,
            t = void 0 === t ? "" : t,
            a = (a.referid, p.state.infoId);
        return p.anonymousFunc0 = function () {
          return p.initPage();
        }, _index.propsManager.set({
          defaultType: n,
          locationError: r,
          defaultTips: i,
          defaultBtnTxt: o,
          onDefaultEvent: p.anonymousFunc0,
          localTargetUrl: "",
          channel: t,
          infoId: a,
          onClearLoginTimer: p.onClearLoginTimer
        }, e), {
          $compid__36: e
        };
      };
    }
  }, {
    key: "_createMainData",
    value: function (I) {
      var O = this;
      return function () {
        var e = (0, _index.genCompid)(I + "$compid__37"),
            t = (0, _index.genCompid)(I + "$compid__38"),
            a = (0, _index.genCompid)(I + "$compid__39"),
            n = (0, _index.genCompid)(I + "$compid__40"),
            i = (0, _index.genCompid)(I + "$compid__41"),
            o = (0, _index.genCompid)(I + "$compid__42"),
            r = (0, _index.genCompid)(I + "$compid__43"),
            s = (0, _index.genCompid)(I + "$compid__44"),
            p = (0, _index.genCompid)(I + "$compid__45"),
            c = (0, _index.genCompid)(I + "$compid__46"),
            l = O.state.homeData,
            d = l.awardWinnerList,
            u = l.matterDetail,
            m = l.leftChance,
            h = l.sceneCode,
            _ = u && u.awardWindowsUrl ? u.awardWindowsUrl : "https://storage.360buyimg.com/wxmini/redpacket/%E5%BC%80%E5%A5%96%E5%BC%B9%E7%AA%97.png",
            f = u && u.redPackageStyleUrl ? u.redPackageStyleUrl : "https://storage.360buyimg.com/wxmini/redpacket/littlered.png",
            g = u && u.redPackageWindowsUrl ? u.redPackageWindowsUrl : "https://storage.360buyimg.com/wxmini/redpacket/%E6%9C%BA%E4%BC%9A%E5%BC%B9%E7%AA%972.png",
            x = O.state,
            v = x.isRainOpenFlag,
            S = x.chancePopState,
            k = x.permissionState,
            y = x.isOpenPacketRain,
            P = x.helpPopState,
            C = x.helpSuccessState,
            w = x.token,
            R = x.inviteCode,
            D = x.defaultType,
            b = x.infoId,
            T = (0, _index.internal_inline_style)({
          background: u && u.backgroundColor ? "linear-gradient(to bottom, " + u.backgroundColor + ")" : "linear-gradient(to bottom, #FE4F26 , #FFDC87)"
        }),
            l = y ? function () {
          return O.closePackteRain();
        } : null,
            x = y ? function () {
          return O.playAgain();
        } : null;

        return P && _index.propsManager.set({
          title: "帮好友助力 去抢红包",
          text: "快帮好友助力，助力成功后，一起快乐抢红包",
          okText: "帮好友助力",
          cancelHandle: O.closeDialog,
          helpType: "helpPopState",
          infoId: b,
          inviteCode: R,
          openHelpPop: O.openHelpPop,
          awardWindowsUrl: _,
          redPackageStyleUrl: f
        }, e), C && _index.propsManager.set({
          title: "助力成功",
          text: "助力成功 快去抢红包",
          okText: "我也要抢红包",
          cancelHandle: O.closeDialog,
          helpType: "helpSuccessState",
          infoId: b,
          inviteCode: R,
          awardWindowsUrl: _,
          redPackageStyleUrl: f
        }, t), k && _index.propsManager.set({
          cancelHandle: O.closeDialog
        }, a), S && _index.propsManager.set({
          cancelHandle: O.closeDialog,
          redPackageWindowsUrl: g,
          openRedRain: O.openRedRain.bind(O)
        }, n), v && _index.propsManager.set({
          cancelHandle: O.closeDialog,
          openRedRain: O.openRedRain.bind(O),
          openWindowUrl: u.openWindowUrl
        }, i), _index.propsManager.set({
          infoId: b,
          topBg: u
        }, o), _index.propsManager.set({
          awardWinnerList: d
        }, r), _index.propsManager.set({
          homeData: O.state.homeData,
          onClickShare: O.onClickShare,
          openRedRain: O.openRedRain.bind(O),
          infoId: b,
          openPermissPop: O.openPermissPop,
          cancelHandle: O.closeDialog,
          defaultType: D,
          fetchData: O.fetchData.bind(O)
        }, s), _index.propsManager.set({
          onClickShare: O.onClickShare,
          homeData: O.state.homeData,
          infoId: b
        }, p), y && _index.propsManager.set({
          onClickShare: O.onClickShare,
          infoId: b,
          homeData: O.state.homeData,
          openpacketRain: l,
          playAgain: x,
          sceneCode: h,
          leftChance: m,
          token: w
        }, c), {
          anonymousState__temp: T,
          anonymousState__temp2: l,
          anonymousState__temp3: x,
          $compid__37: e,
          $compid__38: t,
          $compid__39: a,
          $compid__40: n,
          $compid__41: i,
          $compid__42: o,
          $compid__43: r,
          $compid__44: s,
          $compid__45: p,
          $compid__46: c,
          style: _indexModuleLessMap2.default,
          helpPopState: P,
          helpSuccessState: C,
          permissionState: k,
          chancePopState: S,
          isRainOpenFlag: v,
          isOpenPacketRain: y
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = this.__state.defaultType,
          t = null !== (void 0 === t ? null : t) ? this._createDefaultData(e + "OohvnTXioW")() : null,
          e = this._createMainData(e + "teUWhIXisX")();

      return Object.assign(this.__state, {
        anonymousState__temp4: t,
        anonymousState__temp5: e
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["handleRule"], _class.multipleSlots = !0, _class.$$componentPath = "pages/redPacket-t/index", _temp2);
exports.default = Home, Component(require("./npm/@tarojs/taro-weapp/index.js").default.createComponent(Home, !0));