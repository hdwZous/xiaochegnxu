"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _slicedToArray = function (e, t) {
  if (Array.isArray(e)) return e;
  if (Symbol.iterator in Object(e)) return function (e, t) {
    var o = [],
        n = !0,
        a = !1,
        i = void 0;

    try {
      for (var s, r = e[Symbol.iterator](); !(n = (s = r.next()).done) && (o.push(s.value), !t || o.length !== t); n = !0);
    } catch (e) {
      a = !0, i = e;
    } finally {
      try {
        !n && r.return && r.return();
      } finally {
        if (a) throw i;
      }
    }

    return o;
  }(e, t);
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
},
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
  var a = Object.getOwnPropertyDescriptor(t, o);

  if (void 0 !== a) {
    if ("value" in a) return a.value;
    a = a.get;
    return void 0 !== a ? a.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, o, n);
},
    _index = require("./npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _index3 = require("./api/index.js"),
    _indexWeapp = require("./npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _indexWeapp2 = require("./npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp3 = require("./npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp4 = require("./npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp5 = require("./npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _goToByCouponWeapp = require("./npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),
    _indexWeapp6 = require("./npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp7 = require("./npm/@jd/djmp/common-t/js/getApp/index.weapp.js"),
    _indexWeapp8 = _interopRequireDefault(_indexWeapp7),
    _indexWeapp9 = require("./npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexWeapp10 = require("./npm/@jd/djmp/common-t/js/env/index.weapp.js");

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

var Index = (_temp2 = _class = function () {
  function a() {
    var e, r;

    _classCallCheck(this, a);

    for (var t = arguments.length, o = Array(t), n = 0; n < t; n++) o[n] = arguments[n];

    return (e = r = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp8", "anonymousState__temp9", "$compid__31", "couponType", "style", "grabSucceed", "anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "isRuleDiaShow", "anonymousState__temp7", "isDefault", "popupHeight", "topImgUrl", "ruleDesc", "btnText", "isLogin", "grabLose", "errorMsg", "receivedRecordList", "business", "isUserGetWxCouponBtnText", "key", "couponParamList", "send_coupon_params", "send_coupon_merchant", "sign", "isUserGetWxCoupon", "isUserGetWxCouponMessage", "isShowMessage", "isShowUserGetWxCouponFailed", "recordVOMap"], r.config = {
      navigationBarTitleText: "到家会员",
      navigationBarBackgroundColor: "#fff",
      usingComponents: {
        "send-coupon": "plugin://sendCoupon/send-coupon"
      }
    }, r.newUserStrategy = function () {
      (0, _index3.newUserStrategy)().then(function (e) {
        console.log(e);
      }).catch(function (e) {
        console.log(e);
      });
    }, r.judgeUserIsGetWxCoupon = function (s) {
      var e = r.state,
          t = e.activityId,
          o = e.qrCodeId,
          e = (0, _indexWeapp3.getStorageSync)("unionid") || "";
      (0, _index3.getCouponAPI)({
        activityId: t,
        qrCodeId: o,
        unionId: e
      }).then(function (e) {
        var t, o, n, a, i;
        0 == e.code ? "001" == (t = e.result).state ? (o = t.recordVOMap, r.setState({
          isUserGetWxCoupon: !0,
          recordVOMap: n = void 0 === o ? {} : o
        }), a = [], s.map(function (e, t) {
          for (var o in n) String(o) == String(e.stockId) && a.push(e);
        }), i = [], a.map(function (e, t) {
          var o = {};
          o.out_request_no = e.outRequestNo, o.stock_id = e.stockId, i.push(o);
        }), r.setState({
          send_coupon_params: i
        }), console.log("couponParamList=====", s), console.log("recordVOMap=====", n), console.log("couponParamListTemp=====", a), r.paramsEncryption(a)) : r.setState({
          isUserGetWxCoupon: !1,
          isUserGetWxCouponMessage: t.message || "领取失败，请退出小程序重试"
        }) : r.setState({
          isUserGetWxCoupon: !1,
          isUserGetWxCouponMessage: e.msg || "领取失败，请退出小程序重试"
        });
      }).catch(function (e) {
        r.setState({
          isUserGetWxCoupon: !1,
          isUserGetWxCouponMessage: "领取失败，请退出小程序重试"
        });
      });
    }, r.paramsEncryption = function (e) {
      var t = (0, _indexWeapp3.getStorageSync)(_indexWeapp9.LOGIN_INFO) || {},
          o = t.openId;
      t.unionId, t.unionid_pdj_jd_new;
      (0, _index3.paramsEncryption)({
        openId: o,
        couponParamList: e
      }).then(function (e) {
        0 == e.code ? r.setState({
          sign: e.result.sign
        }) : (console.log("加密参数res", e), r.setState({
          isUserGetWxCoupon: !1,
          isUserGetWxCouponMessage: "领取失败，请退出小程序重试",
          isUserGetWxCouponBtnText: "点击领取"
        }));
      }).catch(function (e) {
        console.log("加密参数err", e), r.setState({
          isUserGetWxCoupon: !1,
          isUserGetWxCouponMessage: "领取失败，请退出小程序重试",
          isUserGetWxCouponBtnText: "点击领取"
        });
      });
    }, r.takeCouponHandle = function () {
      var e = r.state,
          t = e.grabLose,
          o = e.grabSucceed,
          e = e.activityId;
      return t ? ((0, _indexWeapp5.jump)({
        to: "home",
        params: {}
      }), r.clickRp("clickgojddaojia", {
        activityId: e
      }), !1) : !o && (r.clickRp("clickwxcouponpage", {
        activityId: e
      }), void (r.state.isLogin ? r.getCoupon() : r._goToLogin()));
    }, r.getCoupon = function () {
      var e = r.state,
          n = e.activityId,
          t = e.qrCodeId,
          e = (0, _indexWeapp3.getStorageSync)("unionid") || "";
      (0, _index3.getCouponAPI)({
        activityId: n,
        qrCodeId: t,
        unionId: e
      }).then(function (e) {
        var t, o;
        0 == e.code ? (t = void 0 === (t = (o = e.result).receivedRecordList) ? [] : t, o = o.showMessage, r.clickRp("showgetcoupontoast", {
          activityId: n,
          toast: o
        }), t.length ? r.setState({
          receivedRecordList: t,
          grabSucceed: !0
        }) : ((0, _indexWeapp2.showToast)({
          title: o,
          icon: "none"
        }), r.setState({
          btnText: "查看其他活动",
          grabLose: !0,
          errorMsg: o
        }))) : ((0, _indexWeapp2.showToast)({
          title: e.msg,
          icon: "none"
        }), r.setState({
          btnText: "查看其他活动",
          grabLose: !0,
          errorMsg: e.msg + ("(" + e.code) + ")"
        }));
      });
    }, r._toRuleHandle = function (e) {
      e.stopPropagation(), r.setState({
        isRuleDiaShow: !0
      });
    }, r._closePopup = function (e) {
      e.stopPropagation(), r.setState({
        popupHeight: 0
      });
    }, r._showPopup = function (e) {
      e.stopPropagation(), r.setState({
        popupHeight: 70
      });
    }, r._onCloseDia = function () {
      r.setState({
        isRuleDiaShow: !1
      });
    }, r._toCouponbuy = function (t, e) {
      e.stopPropagation();
      var e = r.state.activityId,
          o = t.couponId,
          n = t.couponGoSource,
          a = t.activityCode,
          i = r;
      r.clickRp("showgetcoupontoast", {
        activityId: e,
        couponId: o
      }), (0, _indexWeapp.getLocation)().then(function (e) {
        4 == t.couponPurpose ? _index2.default.navigateTo({
          url: "/pages/newPerson-t/index"
        }) : (console.log({
          couponId: o,
          code: a
        }, n), (0, _goToByCouponWeapp.goToByCouponId)({
          couponId: o,
          code: a
        }, n));
      }).catch(function (e) {
        _index2.default.getSetting({
          success: function (e) {
            e.authSetting["scope.userLocation"] || _index2.default.authorize({
              scope: "scope.userLocation",
              success: function () {
                4 == t.couponPurpose ? _index2.default.navigateTo({
                  url: "/pages/newPerson-t/index"
                }) : (0, _goToByCouponWeapp.goToByCouponId)({
                  couponId: o,
                  code: a
                }, n);
              },
              fail: function (e) {
                i.setState({
                  isDefault: !0
                });
              }
            });
          }
        });
      });
    }, r.getWxCouponToast = function () {
      var e = r.state,
          t = e.isUserGetWxCouponBtnText;
      e.isUserGetWxCouponMessage;
      "点击领取" == t ? r.setState({
        isUserGetWxCouponBtnText: "查看其他活动",
        isShowMessage: !0
      }) : "查看其他活动" == t && (r.setState({
        isShowMessage: !1
      }), (0, _indexWeapp5.jump)({
        to: "home",
        params: {}
      }));
    }, r.test = function () {
      r.setState({
        grabSucceed: !0,
        receivedRecordList: [{
          activityCode: "KAKA0012013501",
          couponBeginTime: "2022.06.10",
          couponEndTime: "2022.06.19",
          couponGoSource: 3,
          couponId: 102239501,
          quota: "10",
          showName: "普通券测试",
          threshold: "280,230,300,200"
        }]
      });
    }, r.onSendcoupon = function (o) {
      console.log("onSendcoupon-e", o);
      var n,
          a = [],
          i = [],
          s = "领取失败（";
      o.detail && "OK" == o.detail.errcode || o.detail && "ok" == o.detail.errcode ? (o.detail && o.detail.send_coupon_result && 0 < o.detail.send_coupon_result.length && o.detail.send_coupon_result.map(function (e, t) {
        "DUPREQUEST" != e.code && "SUCCESS" != e.code && "MAXQUOTA" != e.code || a.push(e), s = t == o.detail.send_coupon_result.length - 1 ? s + e.code + "）" : s + e.code + "，";
      }), console.log("userGetCouponList=====", a), "[]" == JSON.stringify(a) ? (console.log("qqqqqqqqqqq"), r.setState({
        isShowUserGetWxCouponFailed: !0,
        isUserGetWxCoupon: !1,
        isShowMessage: !0,
        isUserGetWxCouponMessage: s,
        isUserGetWxCouponBtnText: "查看其他活动"
      })) : (n = r.state.recordVOMap, a.map(function (e, t) {
        for (var o in n) String(o) == String(e.stock_id) && i.push(n[o]);
      }), setTimeout(function () {
        r.setState({
          grabSucceed: !0,
          receivedRecordList: i
        });
      }, 2e3))) : r.setState({
        isShowUserGetWxCouponFailed: !0,
        isUserGetWxCoupon: !1,
        isShowMessage: !0,
        isUserGetWxCouponMessage: o.detail.msg,
        isUserGetWxCouponBtnText: "查看其他活动"
      });
    }, r.onUserconfirm = function (e) {
      console.log("onUserconfirm-e", e), console.log("e.detail", e.detail);
    }, r.customComponents = ["Default", "RuleDia"], _possibleConstructorReturn(r, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.state = {
        popupHeight: 0,
        isRuleDiaShow: !1,
        topImgUrl: "",
        ruleDesc: "",
        btnText: "点击领取",
        isLogin: null,
        grabLose: !1,
        grabSucceed: !1,
        errorMsg: "",
        receivedRecordList: [],
        isDefault: !1,
        business: null,
        isUserGetWxCouponBtnText: "点击领取",
        key: "55688b8b540b4252b696309f93e5267c",
        couponType: "",
        couponParamList: [],
        send_coupon_params: [],
        send_coupon_merchant: "",
        sign: "",
        isUserGetWxCoupon: !1,
        isUserGetWxCouponMessage: "",
        isShowMessage: !1,
        isShowUserGetWxCouponFailed: !1,
        recordVOMap: {}
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidShow",
    value: function () {
      var t = this,
          e = this.state.isDefault,
          o = this.$router.params.scene;
      console.log("componentDidShow");
      var n,
          a = null,
          i = null,
          s = null,
          r = null;
      o ? (n = decodeURIComponent(o).split(","), a = (n = _slicedToArray(n, 2))[0], i = n[1], this.getActivityInfo(a)) : (a = this.$router.params.qrCodeId, i = this.$router.params.activityId, s = this.$router.params.business, r = this.$router.params.channel, n = wx.getLaunchOptionsSync(), (0, _indexWeapp8.default)()._independent_.qrcode.business = s, (0, _indexWeapp8.default)()._independent_.qrcode.dj_par_key = a || "", (0, _indexWeapp8.default)()._independent_.qrcode.channel = r || "", (0, _indexWeapp8.default)()._independent_.appScene = n.scene, this.newUserStrategy(), (0, _indexWeapp6.pvReport)({
        create_time: new Date(),
        page_par: {
          activityId: i || ""
        }
      })), this.setState({
        activityId: i,
        qrCodeId: a
      }, function () {
        t.judageIsLogin().then(function () {
          t.setState({
            isLogin: !0
          }, function () {
            t.fetchData();
          });
        }).catch(function () {
          t.setState({
            isLogin: !1
          }, function () {
            t.fetchData();
          });
        }), e && (0, _indexWeapp.getLocation)().then(function (e) {
          t.setState({
            isDefault: !1
          });
        });
      });
    }
  }, {
    key: "componentDidHide",
    value: function () {}
  }, {
    key: "fetchData",
    value: function () {
      var i = this,
          e = this.state,
          s = e.isLogin,
          e = e.activityId;
      (0, _indexWeapp2.showLoading)();
      var r = "normalCoupon";
      (0, _index3.getData)({
        activityId: e
      }).then(function (e) {
        var t, o, n, a;
        (0, _indexWeapp2.hideLoading)(), 0 == e.code ? (t = (a = e.result).topImgUrl, o = a.ruleDesc, n = a.merchant, (a = void 0 === (a = a.couponParamList) ? [] : a) && 0 < a.length && (r = "weixinCoupon"), i.setState({
          topImgUrl: t,
          ruleDesc: o,
          couponType: r,
          couponParamList: a,
          send_coupon_merchant: n
        }), "weixinCoupon" == r && s && i.judgeUserIsGetWxCoupon(a)) : i.setState({
          showDefault: !0,
          defaultType: 2,
          defaultTips: e.msg || "抱歉活动不存在",
          couponType: r
        });
      }).catch(function (e) {
        (0, _indexWeapp2.hideLoading)(), i.setState({
          showDefault: !0,
          defaultType: 2,
          defaultTips: "抱歉活动不存在",
          couponType: r
        });
      });
    }
  }, {
    key: "getActivityInfo",
    value: function (e) {
      var i = this;
      (0, _index3.getActivityInfo)({
        qrCodeId: e
      }).then(function (e) {
        var t, o, n, a;
        0 == e.code && (t = e.result.business, o = e.result.couponActivityId, n = i.$router.params.channel, a = wx.getLaunchOptionsSync(), (0, _indexWeapp8.default)()._independent_.qrcode.business = t, (0, _indexWeapp8.default)()._independent_.qrcode.dj_par_key = e.result.dj_par_key || "", (0, _indexWeapp8.default)()._independent_.qrcode.channel = n || "", (0, _indexWeapp8.default)()._independent_.appScene = a.scene, i.newUserStrategy(), (0, _indexWeapp6.pvReport)({
          create_time: new Date(),
          page_par: {
            activityId: o || ""
          }
        }), i.setState({
          business: t
        }));
      });
    }
  }, {
    key: "judageIsLogin",
    value: function () {
      return new Promise(function (e, t) {
        (0, _indexWeapp4.isLogin)().then(function () {
          e();
        }).catch(function () {
          (0, _indexWeapp10.getH5InWeappFlag)() || _indexWeapp10.isJDReactNativeWebView || _indexWeapp10.isJDApp || _indexWeapp10.isJDFinanceApp ? (0, _indexWeapp4.isLoginInWeappH5)(function () {
            e();
          }).catch(function () {
            t();
          }) : t();
        });
      });
    }
  }, {
    key: "getCouponAuto",
    value: function () {
      var e = this.state.activityId;
      (0, _indexWeapp3.getStorageSync)("pageFrom") == "grabCoupon-t" + e && ((0, _indexWeapp3.setStorageSync)("pageFrom", ""), this.getCoupon());
    }
  }, {
    key: "clickRp",
    value: function (e, t) {
      (0, _indexWeapp6.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }
  }, {
    key: "_goToLogin",
    value: function () {
      var e = this.state,
          t = e.activityId,
          e = e.qrCodeId;
      (0, _indexWeapp3.setStorageSync)("pageFrom", "grabCoupon-t" + t), (0, _indexWeapp4.goToLogin)({
        localTargetUrl: "/pages/grabCoupon-t/index?activityId=" + t + "&qrCodeId=" + e
      });
    }
  }, {
    key: "onShareAppMessage",
    value: function () {
      var e = this.$router.params.scene,
          t = this.state,
          o = t.business,
          n = t.activityId,
          t = t.qrCodeId;
      return {
        title: "京东到家",
        path: "/pages/takeCoupon-t/index?" + (o ? "qrCodeId=" + t + "&activityId=" + n + "&business=" + o : "scene=" + e),
        imageUrl: "https://storage.360buyimg.com/wximg/common/logo.jpg"
      };
    }
  }, {
    key: "onShareTimeline",
    value: function () {
      var e = this.$router.params.scene,
          t = this.state,
          o = t.business,
          n = t.activityId,
          t = t.qrCodeId;
      return {
        title: "京东到家",
        path: "/pages/takeCoupon-t/index?" + (o ? "qrCodeId=" + t + "&activityId=" + n + "&business=" + o : "scene=" + e),
        imageUrl: "https://storage.360buyimg.com/wximg/common/logo.jpg"
      };
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__31"),
          o = this.__state,
          n = o.isRuleDiaShow,
          a = o.topImgUrl,
          i = o.grabSucceed,
          s = o.isDefault,
          r = o.couponType;
      console.log("couponType======", r), console.log("grabSucceed====", i);
      var p = {
        backgroundImage: "url(" + a + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%"
      },
          u = i ? null : this._createHandleData(e + "mKryiRQCzr")(),
          c = i ? this._createCouponfloorData(e + "gVVUntsIFn")() : null,
          d = "normalCoupon" == r ? this._createPopupData(e + "PRaIBChxyV")() : null,
          o = "weixinCoupon" == r ? this._createGetCouponButtonData(e + "fnjxKwUnGj")() : null,
          a = i ? this._createCouponfloorData(e + "aPjSNEVKqp")() : null,
          i = "weixinCoupon" == r ? this._createPopupData(e + "EOVwYMqXPX")() : null,
          n = n ? this._createRuleDiaData(e + "BjySMAFJoz")() : null,
          e = "normalCoupon" == r ? (0, _index.internal_inline_style)(p) : null,
          p = "weixinCoupon" == r ? (0, _index.internal_inline_style)(p) : null;
      return s && _index.propsManager.set({
        defaultType: 1
      }, t), Object.assign(this.__state, {
        anonymousState__temp8: e,
        anonymousState__temp9: p,
        $compid__31: t,
        style: _indexModuleLessMap2.default,
        anonymousState__temp: u,
        anonymousState__temp2: c,
        anonymousState__temp3: d,
        anonymousState__temp4: o,
        anonymousState__temp5: a,
        anonymousState__temp6: i,
        anonymousState__temp7: n
      }), this.__state;
    }
  }, {
    key: "_createGetCouponButtonData",
    value: function (e) {
      var p = this;
      return function () {
        var e = p.state,
            t = e.isLogin,
            o = e.isUserGetWxCoupon,
            n = e.send_coupon_params,
            a = e.send_coupon_merchant,
            i = e.sign,
            s = e.isUserGetWxCouponBtnText,
            r = e.isUserGetWxCouponMessage,
            e = (e.grabLose, e.isShowMessage);
        return console.log("send_coupon_params=====", n), console.log("send_coupon_merchant=====", a), console.log("sign=====", i), console.log("isUserGetWxCoupon=====", o), console.log("isUserGetWxCouponMessage======", r), console.log("isUserGetWxCouponBtnText======", s), {
          isLogin: t,
          style: _indexModuleLessMap2.default,
          isUserGetWxCoupon: o,
          send_coupon_params: n,
          send_coupon_merchant: a,
          sign: i,
          isShowMessage: e,
          isUserGetWxCouponMessage: r,
          isUserGetWxCouponBtnText: s
        };
      };
    }
  }, {
    key: "_createHandleData",
    value: function (e) {
      var a = this;
      return function () {
        var e = a.state,
            t = e.btnText,
            o = e.grabLose,
            n = e.errorMsg;
        e.couponType;
        return {
          style: _indexModuleLessMap2.default,
          grabLose: o,
          errorMsg: n,
          btnText: t
        };
      };
    }
  }, {
    key: "_createCouponfloorData",
    value: function (o) {
      var n = this;
      return function () {
        var e = n.state.receivedRecordList,
            t = e.slice(0, 2),
            e = e.length;
        return {
          loopArray7: t.map(function (e, t) {
            return e = {
              $original: (0, _index.internal_get_original)(e)
            }, {
              $loopState__temp11: n._createCouponData(o + "DhQeTGfQek" + t)(e.$original),
              $original: e.$original
            };
          }),
          style: _indexModuleLessMap2.default,
          length: e,
          list: t
        };
      };
    }
  }, {
    key: "_createCouponData",
    value: function (e) {
      return function () {
        return {
          style: _indexModuleLessMap2.default,
          coupon: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
        };
      };
    }
  }, {
    key: "_createPopupData",
    value: function (o) {
      var n = this;
      return function () {
        var e = n.state,
            t = e.popupHeight,
            e = e.receivedRecordList,
            e = void 0 === e ? [] : e;
        return {
          anonymousState__temp14: (0, _index.internal_inline_style)({
            height: t + "vh"
          }),
          loopArray8: e.map(function (e, t) {
            return e = {
              $original: (0, _index.internal_get_original)(e)
            }, {
              $loopState__temp13: n._createCouponData(o + "UPSGqJmakC" + t)(e.$original),
              $original: e.$original
            };
          }),
          style: _indexModuleLessMap2.default,
          receivedRecordList: e
        };
      };
    }
  }, {
    key: "_createRuleDiaData",
    value: function (o) {
      var n = this;
      return function () {
        var e = (0, _index.genCompid)(o + "$compid__32"),
            t = n.state.ruleDesc;
        return _index.propsManager.set({
          title: "活动规则",
          txt: t,
          onCloseDia: n._onCloseDia
        }, e), {
          $compid__32: e
        };
      };
    }
  }]), a;
}(), _class.$$events = ["takeCouponHandle", "_toRuleHandle", "_goToLogin", "onSendcoupon", "onUserconfirm", "getWxCouponToast", "_showPopup", "_toCouponbuy", "_closePopup"], _class.multipleSlots = !0, _class.$$componentPath = "pages/takeCoupon-t/index", _temp2);
exports.default = Index, Component(require("./npm/@tarojs/taro-weapp/index.js").default.createComponent(Index, !0));