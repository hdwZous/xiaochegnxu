"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    intervalTime,
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
    _index = require("./npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("./npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("./npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("./npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp4 = require("./npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _indexWeapp5 = require("./npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexWeapp6 = require("./npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _indexWeapp7 = require("./npm/@jd/djmp/common-t/js/utils/index.weapp.js"),
    _index3 = require("./utils/index.js"),
    _api = require("./api.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp8 = require("./npm/@jd/djmp/common-t/js/env/index.weapp.js");

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

var loginTimer = void 0,
    countDownTimer = void 0,
    isWeapp = !0,
    Home = (_temp2 = _class = function () {
  function i() {
    var e, m;

    _classCallCheck(this, i);

    for (var t = arguments.length, o = Array(t), n = 0; n < t; n++) o[n] = arguments[n];

    return (e = m = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["defaultType", "anonymousState__temp10", "anonymousState__temp11", "infoId", "homeData", "defaultTips", "defaultBtnTxt", "locationError", "leftTime", "prizeDateStr", "isLighted", "buttonText", "buttonState", "lightIndex", "isShowRenderCommonLottery", "isShowCommonLottery", "isShowTreasureBoxLottery", "isShowTaskDialog", "translateValue", "isShowCityCard", "hasShowCityCard", "isShowShiWu", "isShowTakePhotoImageCover", "takePhotoImageCoverChange", "takePhotoImageCoverBackground", "isShowFrinendHelp", "isShowFrinendHelpSuccess", "hasHelpPopState", "takePhotoImageCoverChangeBackground", "normalPrizeResultType", "normalPrizeResult", "treasureBoxPrizeResultType", "treasureBoxPrizeResult", "lightName"], m.config = {
      navigationBarTitleText: "点亮游戏",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, m.countDownFunc = function (e) {
      (0, _indexWeapp7.countDown)(e, function (e) {
        e.end && m.fetchData(), countDownTimer = e.timer;
      });
    }, m.setButton = function (e) {
      var t,
          o,
          n,
          i,
          a = e.gameStatus,
          r = e.countDownEntity,
          s = e.nowTime,
          l = e.lightCount,
          u = e.lightedCount,
          p = e.winBigPrized,
          c = r.value - s,
          d = l <= u;

      switch (c && 0 < c && m.countDownFunc(c), a) {
        case 2:
          if (c <= 0 || d) {
            1 == p ? m.setState({
              buttonText: "已开奖",
              buttonState: 4
            }) : 0 < c ? (t = (i = r.value && new Date(Number(r.value))).getMonth() + 1, o = i.getDate(), (n = i.getHours()) < 10 && (n = "0" + n), i = i.getMinutes(), m.setState({
              buttonText: "等待开奖",
              buttonState: 2,
              prizeDateStr: t + "月" + o + "日" + n + ":" + (i = i < 10 ? "0" + i : i) + "开奖"
            })) : m.setState({
              buttonText: "开奖",
              buttonState: 3
            });
            break;
          }

          m.setState({
            buttonText: "点击打卡",
            buttonState: 1
          });
          break;

        case 3:
          m.setState({
            buttonText: "当前活动已结束",
            buttonState: 5
          });
          break;

        default:
          m.setState({
            defaultType: 2,
            defaultTips: "",
            defaultBtnTxt: "异常！一会再试试"
          });
      }

      m.setState({
        leftTime: c,
        isLighted: d
      });
    }, m.handleMainClick = function () {
      switch (m.state.buttonState) {
        case 1:
          m.handleLightClick();
          break;

        case 2:
          break;

        case 3:
          m.showTreasureBoxLottery();
          break;

        case 4:
          break;

        case 5:
          m.goHome();
      }
    }, m.handleLightClick = function () {
      var e = m.state,
          t = e.infoId,
          o = e.homeData,
          e = o.nowScene,
          o = o.resultClock;
      if (!o || Number(o) < 1) return (0, _indexWeapp3.showToast)({
        title: "暂无打卡次数，快去做任务获得次数吧"
      }), void m.showTaskDialog();
      (0, _api.getLightClick)({
        infoId: t,
        lightId: e.code
      }).then(function (e) {
        var t, o;
        e && 0 == e.code && (e = (t = e.result).lightIndex, t = t.sceneEntity, m.setState({
          lightIndex: e
        }), 2 == t.status && m.showTakePhoto(t), m.clickRp("clickButton", {
          btnName: "打卡城市"
        }), m.fetchData(), o = setTimeout(function () {
          m.setState({
            lightIndex: null
          }), clearTimeout(o);
        }, 1e3));
      }).catch(function (e) {
        (0, _indexWeapp3.showToast)({
          title: e.msg
        });
      });
    }, m.onClearLoginTimer = function () {
      clearTimeout(loginTimer);
    }, m.clickRp = function (e, t) {
      var o = m.state.infoId;
      t.infoId = o, (0, _indexWeapp2.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }, m.handleRule = function () {
      var e = m.state.infoId;
      (0, _indexWeapp3.navigateTo)("/pages/light-t/pages/rule/index?infoId=" + e);
    }, m.showTaskDialog = function () {
      var e = m.state.buttonState;
      console.log("buttonState", e), 1 == e ? (m.setState({
        isShowTaskDialog: !0,
        translateValue: "0%"
      }), m.clickRp("clickButton", {
        btnName: "任务"
      })) : 2 == e || 3 == e || 4 == e ? (0, _indexWeapp3.showToast)({
        title: "你已合成宝箱了"
      }) : 5 == e && (0, _indexWeapp3.showToast)({
        title: "亲，当前活动已结束，快去首页逛逛吧"
      });
    }, m.closeTaskDialog = function () {
      m.setState({
        isShowTaskDialog: !1,
        translateValue: "100%"
      });
    }, m.openHelpPop = function () {
      m.setState({
        isShowFrinendHelp: !1,
        isShowFrinendHelpSuccess: !0
      });
    }, m.cancelHandle = function (e) {
      switch (e) {
        case "isShowFrinendHelp":
          m.setState({
            isShowFrinendHelp: !1
          });
          break;

        case "isShowFrinendHelpSuccess":
          m.setState({
            isShowFrinendHelpSuccess: !1
          });
      }
    }, m.showRewardDialog = function () {
      var e = m.state,
          t = e.infoId;
      4 === e.defaultType ? goLogin() : (m.clickRp("clickButton", {
        btnName: "奖励"
      }), (0, _indexWeapp3.navigateTo)("/pages/light-t/pages/myprize/index?infoId=" + t));
    }, m.showCommonLottery = function (e) {
      var o = m.$router.params.infoId || "",
          n = "",
          i = "",
          a = String(e.code),
          r = {};
      (0, _indexWeapp6.getLocation)().then(function (e) {
        n = e.latitude, i = e.longitude;
        e = (0, _index3.encrypt)(o + "," + (i || "") + "," + (n || "") + "," + (a || ""));
        r.encryptData = e, m.commonSendPrize(r);
      }).catch(function (e) {
        var t = (0, _index3.encrypt)(o + "," + (i || "") + "," + (n || "") + "," + (a || ""));
        r.encryptData = t, m.commonSendPrize(r);
      });
    }, m.commonSendPrize = function (e) {
      console.log("普通开奖 params :>> ", e);
      var o = "",
          n = {};
      (0, _api.commonSendPrize)(e).then(function (e) {
        var t = e.code,
            e = e.result,
            e = void 0 === e ? {} : e;
        0 == t ? n = (o = 1 == e.winPrized ? "coupon" : "no", e) : o = "no", m.setState({
          isShowCommonLottery: !0,
          normalPrizeResultType: o,
          normalPrizeResult: n
        });
        e = "coupon" == o ? {
          prize: 1,
          couponId: n.couponId,
          type: "normalPrize"
        } : {
          prize: 0,
          couponId: "",
          type: "normalPrize"
        };
        m.normalPrizeburiedPoint(e), m.fetchData();
      }).catch(function (e) {
        console.log(e), o = "no", m.setState({
          isShowCommonLottery: !0,
          normalPrizeResultType: o
        });
        m.normalPrizeburiedPoint({
          prize: 0,
          couponId: "",
          type: "normalPrize"
        }), m.fetchData();
      });
    }, m.normalPrizeburiedPoint = function (e) {
      var t = m.state.infoId;
      e.infoId = t, (0, _indexWeapp2.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "showPrize",
        click_par: e
      });
    }, m.closeCommonLottery = function () {
      m.setState({
        isShowCommonLottery: !1
      });
    }, m.showTreasureBoxLottery = function () {
      var o = m.$router.params.infoId || "",
          n = "",
          i = "",
          a = {};
      m.clickRp("clickOpen", {
        type: "box"
      }), (0, _indexWeapp6.getLocation)().then(function (e) {
        n = e.latitude, i = e.longitude;
        e = (0, _index3.encrypt)(o + "," + (i || "") + "," + (n || ""));
        a.encryptData = e, m.treasureBoxSendPrize(a);
      }).catch(function (e) {
        a = {
          infoId: o,
          latitude: n,
          longitude: i
        };
        var t = (0, _index3.encrypt)(o + "," + (i || "") + "," + (n || ""));
        a.encryptData = t, m.treasureBoxSendPrize(a);
      });
    }, m.treasureBoxSendPrize = function (e) {
      console.log("触发宝箱领奖接口 params :>> ", e);
      var o = "",
          n = {};
      (0, _api.treasureBoxSendPrize)(e).then(function (e) {
        var t = e.code,
            e = e.result,
            e = void 0 === e ? {} : e;
        o = 0 == t && 1 == e.winPrized ? (n = e, "coupon") : (n = e, "no"), m.setState({
          treasureBoxPrizeResultType: o,
          treasureBoxPrizeResult: n
        });
        e = "coupon" == o ? {
          prize: 1,
          couponId: n.couponId,
          type: "bigPrize"
        } : {
          prize: 0,
          couponId: "",
          type: "bigPrize"
        };
        m.bigPrizeburiedPoint(e), m.fetchData();
      }).catch(function (e) {
        o = "no", m.setState({
          treasureBoxPrizeResultType: o
        });
        m.bigPrizeburiedPoint({
          prize: 0,
          couponId: "",
          type: "bigPrize"
        }), m.fetchData();
      }), m.setState({
        isShowTreasureBoxLottery: !0
      });
    }, m.bigPrizeburiedPoint = function (e) {
      var t = m.state.infoId;
      e.infoId = t, (0, _indexWeapp2.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "showPrize",
        click_par: e
      });
    }, m.closeTreasureBoxLottery = function () {
      m.setState({
        isShowTreasureBoxLottery: !1
      });
    }, m.showCityCard = function () {
      1 === m.state.buttonState && m.setState({
        isShowCityCard: !0
      });
    }, m.closeCityCard = function () {
      m.setState({
        isShowCityCard: !1,
        hasShowCityCard: !0
      });
    }, m.showTakePhoto = function (e) {
      m.setState({
        isShowTakePhotoImageCover: !0,
        lightName: e.name,
        takePhotoImageCoverChangeBackground: e.lightPic || "https://storage.360buyimg.com/wxmini/light/takePhotoChangeImage.png"
      });
      var t,
          o = 0;
      intervalTime = setInterval(function () {
        t = "rgba(255, 255, 255, " + (o += .1) + ")", m.setState({
          takePhotoImageCoverBackground: t
        }), 1 <= o && (clearInterval(intervalTime), m.setState({
          takePhotoImageCoverBackground: "rgba(255, 255, 255, 1)",
          isShowTakePhotoImageCover: !1
        }, function () {
          m.showTakePhotoImageCoverChange(e);
        }));
      }, 30);
    }, m.showTakePhotoImageCoverChange = function (e) {
      m.setState({
        takePhotoImageCoverChange: !0
      }), m.takePhotoSetTimeout(e);
    }, m.takePhotoSetTimeout = function (e) {
      setTimeout(function () {
        m.setState({
          takePhotoImageCoverChange: !1
        }), m.showCommonLottery(e);
      }, 2e3);
    }, m.advertClick = function () {
      var e = m.state.homeData.lightPlayWayConfig.activityLink;
      e && (m.clickRp("clickBar", {}), (0, _indexWeapp3.navigateTo)("/pages/h5/index?needToken=1&url=" + encodeURIComponent(e)));
    }, m.onClickShare = function (e) {
      var t, o, n, i, a, r;
      _indexWeapp8.isDaojiaApp || _indexWeapp8.isJDApp ? (n = m.state.homeData, t = n.shareTitle, o = n.shareWxPicUrl, n = n.inviteCode, i = void 0 === n ? "" : n, a = m.$router.params.infoId || "", r = "" + window.location.origin + window.location.pathname + "#/pages/light-t/index?infoId=" + a, (0, _index3.throttle)(function () {
        var e = {
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: t || "快来帮助好友领取惊喜好礼吧",
          mpImgUrl: o || "https://storage.360buyimg.com/wxmini/light/shareImage.png",
          path: "/pages/light-t/index?infoId=" + a + "&inviteCode=" + i,
          imgUrl: o || "https://storage.360buyimg.com/wxmini/light/shareImage.png",
          desc: t || "快来帮助好友领取惊喜好礼吧",
          shareUrl: r,
          pyqImg: o || "https://storage.360buyimg.com/wxmini/light/shareImage.png",
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        };
        console.log("shareInfo==", e), (0, _indexWeapp4.openShare)(e);
      })) : (0, _indexWeapp3.showToast)({
        title: "请用京东到家app参与活动"
      });
    }, m.showLightGif = function () {
      m.setState({
        lightIndex: 2
      });
      var e = setTimeout(function () {
        m.setState({
          lightIndex: null
        }), m.fetchData(), clearTimeout(e);
      }, 3e3);
    }, m.openOrCloseShiwu = function (e) {
      switch (e) {
        case "common":
          m.setState({
            shiwuResult: m.state.normalPrizeResult
          });
          break;

        case "treasure":
          m.setState({
            shiwuResult: m.state.treasureBoxPrizeResult
          });
          break;

        default:
          m.setState({
            shiwuResult: {}
          });
      }

      m.setState({
        isShowShiWu: !m.state.isShowShiWu
      });
    }, m.customComponents = ["Default", "FriendHelp", "TopBanner", "ProcessComp", "SwiperScale", "TaskDialog", "CommonLottery", "TreasureBoxLottery", "EditInfo", "CityCard"], _possibleConstructorReturn(m, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        infoId: "",
        homeData: {},
        defaultType: 0,
        defaultTips: "",
        defaultBtnTxt: "",
        locationError: "",
        leftTime: "",
        prizeDateStr: "",
        isLighted: !1,
        buttonText: "点击打卡",
        buttonState: 1,
        lightIndex: null,
        isShowRenderCommonLottery: !1,
        isShowCommonLottery: !1,
        isShowTreasureBoxLottery: !1,
        isShowTaskDialog: !1,
        translateValue: "100%",
        isShowCityCard: !1,
        hasShowCityCard: !1,
        isShowShiWu: !1,
        isShowTakePhotoImageCover: !1,
        takePhotoImageCoverChange: !1,
        takePhotoImageCoverBackground: "rgba(255, 255, 255, 0)",
        isShowFrinendHelp: !1,
        isShowFrinendHelpSuccess: !1,
        hasHelpPopState: !1,
        takePhotoImageCoverChangeBackground: "https://storage.360buyimg.com/wxmini/light/takePhotoChangeImage.png",
        normalPrizeResultType: "",
        normalPrizeResult: {},
        treasureBoxPrizeResultType: "",
        treasureBoxPrizeResult: {},
        lightName: "郑州"
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this.$router.params.infoId || "",
          t = this.$router.params.inviteCode || "";
      this.setState({
        infoId: e,
        inviteCode: t
      });
    }
  }, {
    key: "componentDidShow",
    value: function () {
      var t = this,
          o = this.$router.params.infoId || "",
          n = this.$router.params.inviteCode || "";
      (0, _indexWeapp.isLogin)().then(function () {
        t.initPage();
      }).catch(function (e) {
        console.log("err :>> ", e), (0, _indexWeapp3.showToast)({
          title: "您未登录，快去登录领取福利吧!"
        }), t.setState({
          defaultType: 4,
          defaultTips: "您还没有登录哦~",
          defaultBtnTxt: "去登录"
        }), (0, _indexWeapp.goToLogin)({
          localTargetUrl: "/pages/light-t/index?infoId=" + o + "&inviteCode=" + n
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function () {
      clearInterval(countDownTimer);
    }
  }, {
    key: "initPage",
    value: function () {
      var e = this.$router.params.infoId || "";
      this.$router.params.inviteCode;
      console.log("infoId :>> ", e), this.fetchData(), (0, _indexWeapp2.pvReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        page_par: {
          infoId: e || ""
        }
      });
    }
  }, {
    key: "goLogin",
    value: function () {
      var e = this.$router.params.infoId || "",
          t = this.$router.params.inviteCode || "";
      (0, _indexWeapp.goToLogin)({
        localTargetUrl: "/pages/light-t/index?infoId=" + e + "&inviteCode=" + t
      });
    }
  }, {
    key: "fetchData",
    value: function () {
      var s = this,
          l = this.$router.params.inviteCode || "";
      return new Promise(function (a, r) {
        var e = s.state.infoId || s.$router.params.infoId || "";
        (0, _api.getMainInfo)({
          infoId: e
        }).then(function (e) {
          console.log("主接口 res :>> ", e);
          var t,
              o = e.code,
              n = e.result,
              i = void 0 === n ? {} : n;
          0 == (void 0 === o ? 0 : o) ? 1 !== i.gameStatus ? (s.setState({
            homeData: i
          }, function () {
            s.setState({
              defaultType: null,
              defaultTips: "",
              defaultBtnTxt: ""
            }), 0 != i.bindCity || 1 != i.openPopBox || l || s.showCityCard();
          }), s.uploadAllImage(i), s.isHelpPoPopStateEvent(i), s.setButton(i), a({
            homeData: i
          })) : ((0, _indexWeapp3.showToast)({
            title: "亲，您来太早啦，活动尚未开始"
          }), t = setTimeout(function () {
            s.goHome(), clearTimeout(t);
          }, 3e3)) : (e = e.msg, (0, _indexWeapp3.showToast)({
            title: void 0 === e ? '"网络错误，请稍后重试~' : e
          }), r());
        }).catch(function () {
          var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          console.error("发生错=====", e);
          e = e.msg, e = void 0 === e ? '"网络错误，请稍后重试~' : e;
          (0, _indexWeapp3.showToast)({
            title: e
          }), s.setState({
            defaultType: 2,
            defaultTips: e,
            defaultBtnTxt: "异常！一会再试试"
          }), r();
        });
      });
    }
  }, {
    key: "isHelpPoPopStateEvent",
    value: function (e) {
      var t = this.$router.params.inviteCode || "",
          o = e.gameStatus,
          e = this.state.hasHelpPopState;
      2 == o && t && !e && this.setState({
        isShowFrinendHelp: !0,
        hasHelpPopState: !0
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
    key: "onShareAppMessage",
    value: function (e) {
      var t = this.state.homeData,
          o = t.shareTitle,
          n = t.shareWxPicUrl,
          t = t.inviteCode;
      return {
        title: o || "快来帮助好友领取惊喜好礼吧",
        imageUrl: n || "https://storage.360buyimg.com/wxmini/light/shareImage.png",
        path: "/pages/light-t/index?infoId=" + (this.$router.params.infoId || "") + "&inviteCode=" + (void 0 === t ? "" : t)
      };
    }
  }, {
    key: "uploadAllImage",
    value: function (e) {
      (0, _index3.uploadImage)(e.lightHomePicConfig.optionCityUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.homeBannerUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.treasureBoxUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.treasureBoxOpenUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.openRedUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.taskHalfUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.winBoxUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.helpUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.helpSuccessUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.clockButtonUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.prizedButtonUrl), (0, _index3.uploadImage)(e.lightHomePicConfig.taskButtonUrl), (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/light/treasureBoxLotteryDialogBg.png");
    }
  }, {
    key: "_createDefaultData",
    value: function (s) {
      var l = this;
      return function () {
        var e = (0, _index.genCompid)(s + "$compid__47"),
            t = l.state,
            o = t.defaultType,
            n = void 0 === o ? 0 : o,
            i = t.defaultTips,
            a = t.defaultBtnTxt,
            r = t.locationError,
            o = l.$router.params,
            t = o.channel,
            t = void 0 === t ? "" : t,
            o = (o.referid, l.state.infoId);
        return l.anonymousFunc0 = function () {
          return l.initPage();
        }, _index.propsManager.set({
          defaultType: n,
          locationError: r,
          defaultTips: i,
          defaultBtnTxt: a,
          onDefaultEvent: l.anonymousFunc0,
          localTargetUrl: "",
          channel: t,
          infoId: o,
          onClearLoginTimer: l.onClearLoginTimer
        }, e), {
          $compid__47: e
        };
      };
    }
  }, {
    key: "_createOpenBoxData",
    value: function (e) {
      var i = this;
      return function (e, t) {
        var o = i.state.buttonState,
            n = "https://storage.360buyimg.com/wxmini/light/baox.png";
        return (2 == o || 3 == o && e) && (n = e, i.clickRp("showBox", {})), {
          style: _indexModuleLessMap2.default,
          lotteryImage: n = 4 == o || 5 == o && t ? t : n
        };
      };
    }
  }, {
    key: "_createMainData",
    value: function (ie) {
      var ae = this;
      return function () {
        var e = (0, _index.genCompid)(ie + "$compid__48"),
            t = (0, _index.genCompid)(ie + "$compid__49"),
            o = (0, _index.genCompid)(ie + "$compid__50"),
            n = (0, _index.genCompid)(ie + "$compid__51"),
            i = (0, _index.genCompid)(ie + "$compid__52"),
            a = (0, _index.genCompid)(ie + "$compid__53"),
            r = (0, _index.genCompid)(ie + "$compid__54"),
            s = (0, _index.genCompid)(ie + "$compid__55"),
            l = (0, _index.genCompid)(ie + "$compid__56"),
            u = (0, _index.genCompid)(ie + "$compid__57"),
            p = ae.state.homeData,
            c = p.lightHomePicConfig,
            d = p.lightPlayWayConfig,
            m = (p.gameStatus, p.cityConfig),
            h = p.tasks,
            g = p.sceneEntityList,
            _ = p.resultClock,
            f = p.nowScene,
            x = c || {},
            S = x.rotationList,
            y = x.openRedUrl,
            C = x.winBoxUrl,
            w = x.taskHalfUrl,
            v = x.optionCityUrl,
            k = x.backColor,
            T = x.homeBannerUrl,
            P = void 0 === T ? "" : T,
            I = x.treasureBoxUrl,
            b = x.treasureBoxOpenUrl,
            D = x.helpUrl,
            B = x.helpSuccessUrl,
            z = x.clockButtonUrl,
            L = x.prizedButtonUrl,
            R = x.taskButtonUrl,
            H = ae.state,
            j = H.isShowTakePhotoImageCover,
            W = H.takePhotoImageCoverChange,
            $ = H.takePhotoImageCoverBackground,
            U = H.isShowCityCard,
            M = H.hasShowCityCard,
            F = H.isShowTreasureBoxLottery,
            O = H.isShowCommonLottery,
            E = H.isShowTaskDialog,
            q = H.translateValue,
            N = H.inviteCode,
            A = H.defaultType,
            G = H.infoId,
            V = H.isShowFrinendHelpSuccess,
            K = H.prizeDateStr,
            Y = H.isShowFrinendHelp,
            J = H.takePhotoImageCoverChangeBackground,
            X = H.normalPrizeResult,
            Z = H.normalPrizeResultType,
            Q = H.treasureBoxPrizeResult,
            ee = H.buttonText,
            te = H.buttonState,
            oe = H.lightIndex,
            ne = H.treasureBoxPrizeResultType,
            p = H.lightName,
            c = H.isShowShiWu,
            T = H.shiwuResult,
            x = !1;
        1 === te && void 0 !== _ && (x = !0);
        H = ae._createOpenBoxData(ie + "hGUxLYSUYX")(I, b), I = j ? (0, _index.internal_inline_style)({
          background: $
        }) : null, b = W ? (0, _index.internal_inline_style)({
          background: "url(" + J + ")",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat"
        }) : null, $ = (0, _index.internal_inline_style)({
          background: k ? "linear-gradient(to bottom, " + k + ")" : "linear-gradient(to bottom, #FF3517 0%, #FED09D 19%, #FFE0CA 100%)"
        }), J = (0, _index.internal_inline_style)({
          backgroundImage: L ? "url(" + L + ")" : "url(https://storage.360buyimg.com/wxmini/light/re.png)"
        }), k = (0, _index.internal_inline_style)({
          backgroundImage: z ? "url(" + z + ")" : "url(https://storage.360buyimg.com/wxmini/light/button1.png)",
          opacity: 1 == te || 3 == te ? "1" : "0.5"
        }), L = (0, _index.internal_inline_style)({
          backgroundImage: R ? "url(" + R + ")" : "url(https://storage.360buyimg.com/wxmini/light/task2x.png)"
        }), z = d && d.activityAdUrl ? (0, _index.internal_inline_style)({
          backgroundImage: "url(" + d.activityAdUrl + ")"
        }) : null, R = function () {
          return ae.fetchData();
        };
        return Y && _index.propsManager.set({
          cancelHandle: ae.cancelHandle,
          openHelpPop: ae.openHelpPop,
          infoId: G,
          inviteCode: N,
          helpType: "isShowFrinendHelp",
          bgImg: D || "https://storage.360buyimg.com/wxmini/light/help1.png"
        }, e), V && _index.propsManager.set({
          cancelHandle: ae.cancelHandle,
          helpType: "isShowFrinendHelpSuccess",
          infoId: G,
          bgImg: B || "https://storage.360buyimg.com/wxmini/light/helpsuccess1.png"
        }, t), _index.propsManager.set({
          infoId: G,
          rotationList: S,
          homeBannerUrl: P
        }, o), _index.propsManager.set({
          homeData: ae.state.homeData,
          defaultType: A,
          fetchData: ae.fetchData.bind(ae),
          sceneEntityList: g,
          nowScene: f
        }, n), 1 === te && _index.propsManager.set({
          homeData: ae.state.homeData,
          nowScene: f,
          lightIndex: oe,
          sceneEntityList: g
        }, i), _index.propsManager.set({
          translateValue: q,
          tasks: h,
          onClickShare: ae.onClickShare,
          taskHalfUrl: w,
          fetchData: R,
          infoId: G,
          closeTaskDialog: ae.closeTaskDialog
        }, a), O && _index.propsManager.set({
          closeCommonLottery: ae.closeCommonLottery,
          openRedUrl: y,
          normalPrizeResult: X,
          normalPrizeResultType: Z,
          lightName: p,
          openOrCloseShiwu: ae.openOrCloseShiwu,
          infoId: G
        }, r), F && _index.propsManager.set({
          closeTreasureBoxLottery: ae.closeTreasureBoxLottery,
          winBoxUrl: C,
          treasureBoxPrizeResultType: ne,
          treasureBoxPrizeResult: Q,
          openOrCloseShiwu: ae.openOrCloseShiwu,
          infoId: G
        }, s), c && _index.propsManager.set({
          shiwuResult: T,
          openOrCloseShiwu: ae.openOrCloseShiwu,
          infoId: G
        }, l), U && !M && _index.propsManager.set({
          closeCityCard: ae.closeCityCard,
          cityCadrList: m,
          optionCityUrl: v,
          infoId: G
        }, u), {
          anonymousState__temp2: I,
          anonymousState__temp3: b,
          anonymousState__temp4: $,
          anonymousState__temp5: J,
          anonymousState__temp6: k,
          anonymousState__temp7: L,
          anonymousState__temp8: z,
          anonymousState__temp9: R,
          $compid__48: e,
          $compid__49: t,
          $compid__50: o,
          $compid__51: n,
          $compid__52: i,
          $compid__53: a,
          $compid__54: r,
          $compid__55: s,
          $compid__56: l,
          $compid__57: u,
          style: _indexModuleLessMap2.default,
          isShowTakePhotoImageCover: j,
          takePhotoImageCoverChange: W,
          isShowTaskDialog: E,
          isShowFrinendHelp: Y,
          isShowFrinendHelpSuccess: V,
          buttonState: te,
          anonymousState__temp: H,
          prizeDateStr: K,
          isWaitPrize: x,
          lightPlayWayConfig: d,
          isShowCommonLottery: O,
          isShowTreasureBoxLottery: F,
          isShowShiWu: c,
          isShowCityCard: U,
          hasShowCityCard: M,
          resultClock: _,
          buttonText: ee
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = this.__state.defaultType,
          t = null !== (void 0 === t ? null : t) ? this._createDefaultData(e + "hwTyOLrbRT")() : null,
          e = this._createMainData(e + "NZHGKbKkiu")();

      return Object.assign(this.__state, {
        anonymousState__temp10: t,
        anonymousState__temp11: e
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["closeTaskDialog", "showRewardDialog", "handleMainClick", "showTaskDialog", "advertClick"], _class.multipleSlots = !0, _class.$$componentPath = "pages/light-t/index", _temp2);
exports.default = Home, Component(require("./npm/@tarojs/taro-weapp/index.js").default.createComponent(Home, !0));