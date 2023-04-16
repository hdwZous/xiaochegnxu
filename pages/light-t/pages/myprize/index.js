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
  var r = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _goToByCouponWeapp = require("../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _api = require("../../api.js"),
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
    return new Promise(function (i, a) {
      return function t(e, n) {
        try {
          var o = u[e](n),
              r = o.value;
        } catch (e) {
          return void a(e);
        }

        if (!o.done) return Promise.resolve(r).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        i(r);
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

var isWeapp = !0,
    MyPrize = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["$compid__58", "defaultType", "styles", "prizes", "anonymousState__temp", "anonymousState__temp2", "isShowShiWu", "shiwuRes"], t.config = {
      navigationBarTitleText: "我的奖品",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, t.goCity = function () {
      t.$router.params.infoId;
      (0, _indexWeapp2.navigateBack)();
    }, t.closeShiWu = function () {
      t.setState({
        isShowShiWu: !1
      });
    }, t.customComponents = ["EditInfo"], _possibleConstructorReturn(t, e);
  }

  var e;
  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        defaultType: 0,
        isShowShiWu: !1,
        shiwuRes: {},
        prizes: []
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: (e = _asyncToGenerator(regeneratorRuntime.mark(function e() {
      var t;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return t = this.$router.params.infoId, this.uploadAllImage(), e.next = 4, this.getPrizeInfo(t);

          case 4:
          case "end":
            return e.stop();
        }
      }, e, this);
    })), function () {
      return e.apply(this, arguments);
    })
  }, {
    key: "getPrizeInfo",
    value: function (e) {
      var t = this;
      (0, _api.getPrizeInfo)({
        infoId: e
      }).then(function (e) {
        0 == e.code && t.setState({
          prizes: e.result,
          defaultType: 1
        });
      }).catch(function (e) {
        t.setState({
          defaultType: 2
        }), console.error(e);
      });
    }
  }, {
    key: "toUse",
    value: function (e) {
      e.prizeType;
      var t = e.couponId,
          n = (e.goToUrl, e.couponCode),
          o = e.markState;
      e.couponEffect && (0, _goToByCouponWeapp.goToByCouponId)({
        couponId: t,
        code: n,
        passThroughParam: {
          markState: o,
          code: n
        }
      });
    }
  }, {
    key: "clickRp",
    value: function (e, t) {
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }
  }, {
    key: "uploadAllImage",
    value: function () {}
  }, {
    key: "toOpenEdit",
    value: function (e) {
      this.setState({
        shiwuRes: e,
        isShowShiWu: !0
      });
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__58"),
          n = this.__state,
          o = n.prizes,
          r = (n.defaultType, n.isShowShiWu),
          i = n.shiwuRes,
          n = this.$router.params.infoId,
          o = o && 0 < o.length ? this._createPrizeData(e + "WvLfPEiqPt")() : null,
          e = this._createPrizeNullData(e + "WSDjHHHVAK")();

      return r && _index.propsManager.set({
        shiwuResult: i,
        openOrCloseShiwu: this.closeShiWu,
        myprize: !0,
        infoId: n
      }, t), Object.assign(this.__state, {
        $compid__58: t,
        styles: _indexModuleLessMap2.default,
        anonymousState__temp: o,
        anonymousState__temp2: e
      }), this.__state;
    }
  }, {
    key: "_createPrizeContentData",
    value: function (e) {
      var a = this;
      return function (e, t) {
        var n;
        e.prizeType && 3 === e.prizeType && (n = t + "shiwu");
        var o = e.couponEffect ? "去使用" : "已过期",
            r = [];
        e.money && e.money.indexOf(".") ? r = e.money.split(".") : r.push(e.money);
        var i = t + "coupon",
            t = (0, _index.internal_inline_style)({
          opacity: e.couponEffect ? 1 : .5
        });
        return a.anonymousFunc0 = function () {
          return a.toUse(e);
        }, {
          _$anonymousState__temp: n,
          anonymousState__temp4: i,
          anonymousState__temp5: t,
          i: e,
          styles: _indexModuleLessMap2.default,
          moneyList: r,
          buttonText: o
        };
      };
    }
  }, {
    key: "_createPrizeData",
    value: function (o) {
      var r = this;
      return function () {
        var n = r.state.prizes;
        return {
          loopArray11: n && 0 < n.length ? n.map(function (e, t) {
            return e = {
              $original: (0, _index.internal_get_original)(e)
            }, console.log("i.prizeType :>> ", e.$original.prizeType), {
              $loopState__temp7: n && 0 < n.length ? r._createPrizeContentData(o + "MrBztPXMkf" + t)(e.$original, t) : null,
              $original: e.$original
            };
          }) : [],
          prizes: n
        };
      };
    }
  }, {
    key: "_createPrizeNullData",
    value: function (e) {
      return function () {
        return {
          styles: _indexModuleLessMap2.default
        };
      };
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["toOpenEdit", "anonymousFunc0", "goCity"], _class.multipleSlots = !0, _class.$$componentPath = "pages/light-t/pages/myprize/index", _temp2);
exports.default = MyPrize, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(MyPrize, !0));