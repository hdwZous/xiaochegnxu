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
    _index3 = require("../../utils/index.js"),
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
    return new Promise(function (a, i) {
      return function t(e, n) {
        try {
          var o = u[e](n),
              r = o.value;
        } catch (e) {
          return void i(e);
        }

        if (!o.done) return Promise.resolve(r).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        a(r);
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
  function a() {
    var e, t;

    _classCallCheck(this, a);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [this].concat(o)))).$usedState = ["styles", "prizes", "anonymousState__temp", "anonymousState__temp2"], t.config = {
      navigationBarTitleText: "我的奖品",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, t.anonymousFunc0Map = {}, t.anonymousFunc1Map = {}, t.anonymousFunc2Map = {}, t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  var e;
  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (e) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, e), this.state = {
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
        0 == e.code && (e = (e.result || {}).prizes, t.setState({
          prizes: e
        }));
      }).catch(function (e) {
        console.error(e);
      });
    }
  }, {
    key: "toUse",
    value: function (e) {
      var t = e.prizeType,
          n = e.couponId,
          o = e.goToUrl,
          r = e.couponCode,
          a = e.markState;
      1 != e.couponState && (this.clickRp("clickusecoupon", {
        couponId: n
      }), 2 == t ? (0, _indexWeapp2.navigateTo)("/pages/h5/index?needToken=1&url=" + encodeURIComponent("https://daojia.jd.com/html/vue/index.html#integral")) : o ? (o = o.split("#"), console.log("小程序跳转 url :>> ", o), o[1] ? (0, _indexWeapp2.navigateTo)(o[1]) : (0, _indexWeapp2.navigateTo)(o[0])) : (0, _goToByCouponWeapp.goToByCouponId)({
        couponId: n,
        code: r,
        passThroughParam: {
          markState: a,
          code: r
        }
      }));
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
    value: function () {
      (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/redpacket/%E7%BC%96%E7%BB%842%E5%80%8D.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/redpacket/dou2.png"), (0, _index3.uploadImage)("https://storage.360buyimg.com/wxmini/redpacket/zhe.png");
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = this.__state.prizes,
          t = t && 0 < t.length ? this._createPrizeData(e + "VavYrXcxUN")() : null,
          e = this._createPrizeNullData(e + "QBkDuWBREm")();

      return Object.assign(this.__state, {
        styles: _indexModuleLessMap2.default,
        anonymousState__temp: t,
        anonymousState__temp2: e
      }), this.__state;
    }
  }, {
    key: "_createPrizeData",
    value: function (e) {
      var i = this;
      return function () {
        var e = i.state.prizes;
        return {
          loopArray10: e && 0 < e.length ? e.map(function (e, t) {
            var n = 1 == (e = {
              $original: (0, _index.internal_get_original)(e)
            }).$original.couponState ? "已过期" : "去使用",
                o = "tdvmE" + t;

            i.anonymousFunc0Map[o] = function () {
              return i.toUse(e.$original);
            };

            var r = "kHcQv" + t;

            i.anonymousFunc1Map[r] = function () {
              return i.toUse(e.$original);
            };

            var a = "yuDtz" + t;
            return i.anonymousFunc2Map[a] = function () {
              return i.toUse(e.$original);
            }, {
              buttonText: n,
              _$indexKey: o,
              _$indexKey2: r,
              _$indexKey3: a,
              $loopState__temp4: 0 == e.$original.prizeType ? t + "coupon" : null,
              $loopState__temp6: 0 == e.$original.prizeType ? (0, _index.internal_inline_style)({
                opacity: 1 == e.$original.couponState ? .5 : 1
              }) : null,
              $loopState__temp8: 1 == e.$original.prizeType ? t + "zhe" : null,
              $loopState__temp10: 1 == e.$original.prizeType ? (0, _index.internal_inline_style)({
                background: 'url("https://storage.360buyimg.com/wxmini/redpacket/zhe.png") 0% 0% / contain no-repeat'
              }) : null,
              $loopState__temp12: 1 == e.$original.prizeType ? (0, _index.internal_inline_style)({
                opacity: 1 == e.$original.couponState ? .5 : 1
              }) : null,
              $loopState__temp14: 2 == e.$original.prizeType ? t + "dou" : null,
              $loopState__temp16: 2 == e.$original.prizeType ? (0, _index.internal_inline_style)({
                background: 'url("https://storage.360buyimg.com/wxmini/redpacket/bean.png") 0% 0% / contain no-repeat'
              }) : null,
              $original: e.$original
            };
          }) : [],
          prizes: e,
          styles: _indexModuleLessMap2.default
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
    value: function (e, t) {
      return this.anonymousFunc0Map[e] && this.anonymousFunc0Map[e](t);
    }
  }, {
    key: "anonymousFunc1",
    value: function (e, t) {
      return this.anonymousFunc1Map[e] && this.anonymousFunc1Map[e](t);
    }
  }, {
    key: "anonymousFunc2",
    value: function (e, t) {
      return this.anonymousFunc2Map[e] && this.anonymousFunc2Map[e](t);
    }
  }]), a;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], _class.multipleSlots = !0, _class.$$componentPath = "pages/redPacket-t/pages/myprize/index", _temp2);
exports.default = MyPrize, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(MyPrize, !0));