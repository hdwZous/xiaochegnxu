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
  var r = Object.getOwnPropertyDescriptor(t, o);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, o, n);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _goToByCouponWeapp = require("../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
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

var CommonLottery = (_temp2 = _class = function () {
  function i() {
    var e, o;

    _classCallCheck(this, i);

    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];

    return (e = o = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp3", "style", "isShowOpenAward", "isShowResult", "normalPrizeResultType", "anonymousState__temp2", "normalPrizeResult", "infoId", "closeCommonLottery", "openOrCloseShiwu", "lightName", "openRedUrl"], o.onClose = function () {
      (0, o.props.closeCommonLottery)();
    }, o.use = function () {
      var e = o.props.normalPrizeResult,
          t = {
        markState: e.markState,
        code: e.couponCode
      };
      (0, _goToByCouponWeapp.goToByCouponId)({
        couponId: e.couponId,
        code: e.couponCode,
        passThroughParam: t
      });
    }, o.toOpenEdit = function () {
      o.props.openOrCloseShiwu("common");
      var e = o.props.infoId;
      (0, _indexWeapp.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: {
          type: "realPrize",
          infoId: e
        }
      }), o.onClose();
    }, o.closeShiWu = function () {
      o.props.openOrCloseShiwu("close");
    }, o.customComponents = [], _possibleConstructorReturn(o, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        isShowOpenAward: !0,
        isShowResult: !1
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this;
      setTimeout(function () {
        e.setState({
          isShowOpenAward: !1,
          isShowResult: !0
        });
      }, 1e3);
      var t = this.props,
          o = t.normalPrizeResult,
          t = t.infoId;
      o.prizeType && 3 === o.prizeType && (0, _indexWeapp.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "showLayer",
        click_par: {
          type: "realPrize",
          infoId: t
        }
      });
    }
  }, {
    key: "_createCouponBoxData",
    value: function (e) {
      var i = this;
      return function () {
        var e,
            t = i.props,
            o = t.normalPrizeResult,
            n = t.lightName,
            r = String(o.money),
            t = [];
        return 1 != o.couponType && 2 != o.couponType || !r.indexOf(".") ? t.push(r) : t = r.split("."), console.log("normalPrizeResult :>> ", o), {
          _$anonymousState__temp: e = o.prizeType && 3 === o.prizeType ? (0, _index.internal_inline_style)({
            margin: "20px"
          }) : e,
          normalPrizeResult: o,
          style: _indexModuleLessMap2.default,
          moneyList: t,
          lightName: n
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          o = this.__state,
          n = (o.isShowOpenAward, o.isShowResult),
          r = this.__props,
          i = r.openRedUrl,
          o = (r.normalPrizeResult, r.normalPrizeResultType),
          t = (r.lightName, "coupon" == o ? this._createCouponBoxData(t + "Juzpcheija")() : null);

      this.anonymousFunc0 = function () {
        return e.onClose();
      };

      i = n ? (0, _index.internal_inline_style)({
        background: "url(" + i + ")",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat"
      }) : null;
      return this.anonymousFunc1 = function () {
        return e.onClose();
      }, this.anonymousFunc2 = function () {
        return e.onClose();
      }, Object.assign(this.__state, {
        anonymousState__temp3: i,
        style: _indexModuleLessMap2.default,
        normalPrizeResultType: o,
        anonymousState__temp2: t
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
  }]), i;
}(), _class.$$events = ["toOpenEdit", "use", "anonymousFunc0", "anonymousFunc1", "anonymousFunc2"], _class.multipleSlots = !0, _class.$$componentPath = "pages/light-t/components/CommonLottery/index", _temp2);
exports.default = CommonLottery, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(CommonLottery));