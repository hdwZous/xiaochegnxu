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
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _goToByCouponWeapp = require("../../npm/@jd/djmp/common-t/js/utils/goToByCoupon.weapp.js"),
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

var TreasureBoxLottery = (_temp2 = _class = function () {
  function s() {
    var e, o;

    _classCallCheck(this, s);

    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];

    return (e = o = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp2", "style", "isShowGif", "isShowResult", "anonymousState__temp", "treasureBoxPrizeResult", "infoId", "closeTreasureBoxLottery", "openOrCloseShiwu", "winBoxUrl", "treasureBoxPrizeResultType"], o.onClose = function () {
      (0, o.props.closeTreasureBoxLottery)();
    }, o.toHome = function () {
      (0, _indexWeapp.jump)({
        to: "home"
      });
    }, o.use = function () {
      var e = o.props.treasureBoxPrizeResult,
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
      o.props.openOrCloseShiwu("treasure"), o.setState({
        isShowShiWu: !0
      });
      var e = o.props.infoId;
      (0, _indexWeapp2.clickReport)({
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

  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.state = {
        isShowGif: !0,
        isShowResult: !1
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this;
      setTimeout(function () {
        e.setState({
          isShowGif: !1,
          isShowResult: !0
        });
      }, 800);
      var t = this.props.treasureBoxPrizeResult;
      t.prizeType && 3 === t.prizeType && (t = this.props.infoId, (0, _indexWeapp2.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "showLayer",
        click_par: {
          type: "realPrize",
          infoId: t
        }
      }));
    }
  }, {
    key: "_createPrizeData",
    value: function (e) {
      var o = this;
      return function () {
        var e = o.state,
            t = (e.isShowGif, e.isShowResult, o.props),
            e = (t.winBoxUrl, t.treasureBoxPrizeResultType),
            t = t.treasureBoxPrizeResult;
        return t.prizeType && 3 === t.prizeType && (o.anonymousFunc0 = function () {
          return o.onClose();
        }), o.anonymousFunc1 = function () {
          return o.onClose();
        }, {
          treasureBoxPrizeResultType: e,
          style: _indexModuleLessMap2.default,
          treasureBoxPrizeResult: t
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
          n = o.isShowGif,
          r = o.isShowResult,
          s = this.__props,
          o = s.winBoxUrl,
          t = (s.treasureBoxPrizeResultType, s.treasureBoxPrizeResult, r ? this._createPrizeData(t + "JDHIAkwfKP")() : null);

      this.anonymousFunc2 = function () {
        return e.onClose();
      };

      o = n ? (0, _index.internal_inline_style)({
        background: "url(" + o + ")",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat"
      }) : null;
      return Object.assign(this.__state, {
        anonymousState__temp2: o,
        style: _indexModuleLessMap2.default,
        anonymousState__temp: t
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
  }]), s;
}(), _class.$$events = ["toOpenEdit", "toHome", "anonymousFunc0", "use", "anonymousFunc1", "anonymousFunc2"], _class.multipleSlots = !0, _class.$$componentPath = "pages/light-t/components/TreasureBoxLottery/index", _temp2);
exports.default = TreasureBoxLottery, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(TreasureBoxLottery));