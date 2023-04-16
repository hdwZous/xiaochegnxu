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
    _index = require("./npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("./npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("./npm/@jd/djmp/common-t/js/location/index.weapp.js"),
    _indexWeapp3 = require("./npm/@jd/djmp/common-t/js/getApp/index.weapp.js"),
    _indexWeapp4 = _interopRequireDefault(_indexWeapp3),
    _indexWeapp5 = require("./npm/@jd/djmp/common-t/js/env/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp6 = require("./npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _goToByCouponWeapp = require("./npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),
    _indexWeapp7 = require("./npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp8 = require("./npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _index3 = require("./api/index.js"),
    _indexWeapp9 = require("./npm/@jd/djmp/common-t/js/bi/index.weapp.js");

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

var scopeData = {
  throttleFlag: !0,
  isLoginFlag: !1
},
    DifferentIndustry = (_temp2 = _class = function () {
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var o = arguments.length, n = Array(o), i = 0; i < o; i++) n[i] = arguments[i];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(n)))).$usedState = ["$compid__33", "showDefault", "anonymousState__temp", "defaultType", "defaultTips", "ruleDesc", "showRulePop", "topImgUrl", "bgColor", "buttonImgUrl", "bottomImgUrl", "couponActivityStatus", "subscribeState", "showMessage", "receivedRecordList", "getCouponSucess", "bottomImgLink", "topImgText"], t.config = {
      navigationBarTitleText: "到家会员"
    }, t.customComponents = ["Default", "SubscribeMessage", "Pop"], _possibleConstructorReturn(t, e);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      var t = this;
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.state = {
        showDefault: !0,
        defaultType: 0,
        defaultTips: "",
        ruleDesc: "",
        showRulePop: !1,
        topImgUrl: "",
        bgColor: "",
        buttonImgUrl: "",
        bottomImgUrl: "",
        couponActivityStatus: "",
        subscribeState: "",
        showMessage: "大额优惠券",
        receivedRecordList: [],
        getCouponSucess: "",
        bottomImgLink: "",
        topImgText: ""
      }, this.$$refs = [{
        type: "component",
        id: "NpJvh",
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
          t = (0, _index.genCompid)(e + "$compid__33"),
          o = this.__state,
          n = o.showDefault,
          i = o.defaultType,
          o = o.defaultTips,
          e = this._createMainData(e + "YebleLDLZO")();

      return n && _index.propsManager.set({
        defaultType: i,
        defaultTips: o
      }, t), Object.assign(this.__state, {
        $compid__33: t,
        anonymousState__temp: e
      }), this.__state;
    }
  }, {
    key: "_createMainData",
    value: function (u) {
      var c = this;
      return function () {
        var e = (0, _index.genCompid)(u + "$compid__34"),
            t = (0, _index.genCompid)(u + "$compid__35"),
            o = (c.$router.params.channel, c.state),
            n = o.topImgUrl,
            i = o.ruleDesc,
            a = o.showRulePop,
            s = o.bgColor,
            p = o.bottomImgUrl,
            r = o.topImgText,
            o = c._createCenterData(u + "enTkLhzUKw")(),
            s = (0, _index.internal_inline_style)({
          backgroundColor: s
        });

        return c.anonymousFunc0 = function () {
          return c.setState({
            showRulePop: !0
          });
        }, _index.propsManager.set({
          subscribeMessageImageUrl: "https://storage.360buyimg.com/wximg/common/noticeImage1.png"
        }, e), _index.propsManager.set({
          isShow: a,
          onPopEvent: c.onPopEvent.bind(c)
        }, t), {
          anonymousState__temp3: s,
          $compid__34: e,
          $compid__35: t,
          style: _indexModuleLessMap2.default,
          topImgUrl: n,
          anonymousState__temp2: o,
          bottomImgUrl: p,
          ruleDesc: i,
          topImgText: r
        };
      };
    }
  }, {
    key: "_createCenterData",
    value: function (e) {
      var i = this;
      return function () {
        var e = i.state,
            t = e.getCouponSucess,
            o = e.buttonImgUrl,
            n = e.showMessage,
            e = e.receivedRecordList;
        return {
          anonymousState__temp4: "" === t ? (0, _index.internal_inline_style)({
            "background-image": "url(" + o + ")"
          }) : null,
          anonymousState__temp5: !1 === t ? (0, _index.internal_inline_style)({
            "background-image": "url(" + o + ")"
          }) : null,
          style: _indexModuleLessMap2.default,
          getCouponSucess: t,
          receivedRecordList: e,
          showMessage: n
        };
      };
    }
  }, {
    key: "componentDidShow",
    value: function () {
      var e = this,
          t = this.$router.params.activityId,
          o = wx.getLaunchOptionsSync();
      (0, _indexWeapp4.default)()._independent_.qrcode.business = this.$router.params.business, (0, _indexWeapp4.default)()._independent_.qrcode.channel = this.$router.params.channel, (0, _indexWeapp4.default)()._independent_.appScene = o.scene, (0, _indexWeapp9.pvReport)({
        create_time: new Date(),
        page_par: {
          activityId: t || ""
        }
      }), this.judageIsLogin().then(function () {
        scopeData.isLoginFlag = !0, e.fetchData();
      }).catch(function () {
        scopeData.isLoginFlag = !1, e.fetchData();
      });
    }
  }, {
    key: "toBtmLink",
    value: function () {
      this.state.bottomImgLink && (console.log("this.state.bottomImgLink", this.state.bottomImgLink), -1 < this.state.bottomImgLink.indexOf("home/home") ? this.goHome() : (this.state.bottomImgLink = "/" != this.state.bottomImgLink.substring(0, 1) ? "/" + this.state.bottomImgLink : this.state.bottomImgLink, (0, _indexWeapp8.navigateTo)(this.state.bottomImgLink)));
    }
  }, {
    key: "toUse",
    value: function (t) {
      var o = this,
          n = this.$router.params.activityId;
      (0, _indexWeapp2.getLocation)().then(function (e) {
        o.clickRp("clickusecoupon", {
          activityId: n,
          couponId: t.couponId
        }), (0, _goToByCouponWeapp.goToByCouponId)({
          couponId: t.couponId
        }, t.couponGoSource);
      }).catch(function (e) {
        console.log("未定位"), o.goHome();
      });
    }
  }, {
    key: "onPopEvent",
    value: function (e) {
      "close" === e.type && this.setState({
        showRulePop: !1
      });
    }
  }, {
    key: "goHome",
    value: function () {
      var e = this.$router.params,
          t = e.activityId,
          e = e.qrCodeId;
      this.clickRp("clickgojddaojia", {
        activityId: t,
        qrCodeId: e
      }), (0, _indexWeapp6.jump)({
        to: "home",
        params: {}
      });
    }
  }, {
    key: "getOpenIdFn",
    value: function () {
      return new Promise(function (t, o) {
        swan.getLoginCode({
          success: function (e) {
            e.code ? (0, _index3.getOpenId)({
              jsCode: e.code
            }).then(function (e) {
              e.result ? t(e.result.openId) : o();
            }).catch(function () {
              o();
            }) : o();
          },
          fail: function () {
            o();
          }
        });
      });
    }
  }, {
    key: "getCoupon",
    value: function (e) {
      var t, o;
      scopeData.throttleFlag && (scopeData.throttleFlag = !1, setTimeout(function () {
        scopeData.throttleFlag = !0;
      }, 500), t = {
        activityId: (o = this.$router.params).activityId,
        qrCodeId: o.qrCodeId,
        isClick: e
      }, this.clickRp("clickwxcouponpage", t), scopeData.isLoginFlag ? (o = (0, _indexWeapp7.getStorageSync)("login_info") || {}, e = (0, _indexWeapp7.getStorageSync)("unionid") || "", t.pin = o.PDJ_H5_PIN || "", t.unionId = e || "", this.getCouponService(t)) : ((0, _indexWeapp8.showToast)({
        title: "请先登录"
      }), this._goToLogin()));
    }
  }, {
    key: "getCouponService",
    value: function (i) {
      var a = this;
      (0, _index3.getCouponAPI)(i).then(function (e) {
        var t = e.result,
            o = t.subscribeState,
            n = t.receivedRecordList,
            n = void 0 === n ? [] : n,
            t = t.showMessage,
            t = void 0 === t ? "" : t;
        i.isClick && a.clickRp("showgetcoupontoast", {
          activityId: i.activityId,
          toast: t
        }), 0 == e.code ? ((0, _indexWeapp8.showToast)({
          title: t,
          icon: "none"
        }), a.setState({
          subscribeState: o,
          receivedRecordList: n,
          showMessage: t,
          getCouponSucess: n && 0 != n.length
        }), 1 == o && a.childSubscribe.initSubscribeMessage(["fchAp-FzoMeL7H-ENM6JyQV7z_wHexxQfIqhou26ijY"])) : ((0, _indexWeapp8.showToast)({
          title: t,
          icon: "none"
        }), a.setState({
          showMessage: t,
          getCouponSucess: !1
        }));
      }).catch(function () {
        (0, _indexWeapp8.hideLoading)(), i.isClick && a.clickRp("showgetcoupontoast", {
          activityId: i.activityId,
          toast: "获取接口数据异常"
        });
      });
    }
  }, {
    key: "clickRp",
    value: function (e, t) {
      (0, _indexWeapp9.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }
  }, {
    key: "fetchData",
    value: function () {
      var r = this,
          e = this.$router.params.activityId;
      (0, _indexWeapp8.showLoading)(), (0, _index3.getData)({
        activityId: e
      }).then(function (e) {
        var t, o, n, i, a, s, p;
        (0, _indexWeapp8.hideLoading)(), 0 == e.code ? (t = (p = e.result).topImgUrl, o = p.bgColor, n = p.buttonImgUrl, i = p.bottomImgUrl, a = p.ruleDesc, s = p.bottomImgLink, p = p.topImgText, r.setState({
          topImgUrl: t,
          bgColor: o,
          buttonImgUrl: n,
          bottomImgUrl: i,
          ruleDesc: a,
          showDefault: !1,
          bottomImgLink: s,
          topImgText: p
        }), scopeData.isLoginFlag && r.getCouponAuto()) : r.setState({
          showDefault: !0,
          defaultType: 2,
          defaultTips: e.msg || "抱歉活动不存在"
        });
      }).catch(function (e) {
        (0, _indexWeapp8.hideLoading)(), console.log(e), r.setState({
          showDefault: !0,
          defaultType: 2,
          defaultTips: "抱歉活动不存在"
        });
      });
    }
  }, {
    key: "judageIsLogin",
    value: function () {
      return new Promise(function (e, t) {
        (0, _indexWeapp.isLogin)().then(function () {
          e();
        }).catch(function () {
          (0, _indexWeapp5.getH5InWeappFlag)() || _indexWeapp5.isJDReactNativeWebView || _indexWeapp5.isJDApp || _indexWeapp5.isJDFinanceApp ? (0, _indexWeapp.isLoginInWeappH5)(function () {
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
      var e = this.$router.params.activityId;
      (0, _indexWeapp7.getStorageSync)("pageFrom") == "getCoupon-t" + e && ((0, _indexWeapp7.setStorageSync)("pageFrom", ""), this.getCoupon(!1));
    }
  }, {
    key: "_goToLogin",
    value: function () {
      var e = this.$router.params,
          t = e.activityId,
          e = e.qrCodeId;
      (0, _indexWeapp7.setStorageSync)("pageFrom", "getCoupon-t" + t), (0, _indexWeapp.goToLogin)({
        localTargetUrl: "/pages/getCoupon-t/index?activityId=" + t + "&qrCodeId=" + e
      });
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), a;
}(), _class.$$events = ["anonymousFunc0", "toBtmLink", "getCoupon", "goHome", "toUse"], _class.multipleSlots = !0, _class.$$componentPath = "pages/grabCoupon-t/index", _temp2);
exports.default = DifferentIndustry, Component(require("./npm/@tarojs/taro-weapp/index.js").default.createComponent(DifferentIndustry, !0));