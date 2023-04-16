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
  var a = Object.getOwnPropertyDescriptor(t, o);

  if (void 0 !== a) {
    if ("value" in a) return a.value;
    a = a.get;
    return void 0 !== a ? a.call(n) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, o, n);
},
    _index = require("../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp2 = require("../npm/@jd/djmp/common-t/js/env/index.weapp.js"),
    _indexWeapp3 = require("../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _firstOrderFission = require("../api/firstOrderFission.js"),
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

var flag = ["https://storage.360buyimg.com/wximg/firstOrderFission/withdrawFail.png?1", "https://storage.360buyimg.com/wximg/firstOrderFission/withdrawIng.png?1", "https://storage.360buyimg.com/wximg/firstOrderFission/withdrwaSuccess.png?1"],
    Detail = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var o = arguments.length, n = Array(o), a = 0; a < o; a++) n[a] = arguments[a];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(n)))).$usedState = ["$compid__30", "style", "leftMoney", "todayWithdrawTimesOut", "totalMoney", "recordList", "flag", "showLoading", "showAuthPop", "todayBonusPoolUseUp", "pageNum", "pageSize", "haveMoreData"], t.config = {
      navigationBarTitleText: "我的提现",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black",
      onReachBottomDistance: 50
    }, t.customComponents = ["AuthPop"], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.state = {
        showAuthPop: !1,
        totalMoney: 0,
        leftMoney: 0,
        recordList: [],
        todayWithdrawTimesOut: !1,
        todayBonusPoolUseUp: !1,
        pageNum: 1,
        pageSize: 10,
        showLoading: !1,
        haveMoreData: !1
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var e = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          o = (0, _index.genCompid)(t + "$compid__30"),
          n = this.__state,
          a = n.showAuthPop,
          t = n.leftMoney,
          t = (n.totalMoney, n.recordList, n.todayWithdrawTimesOut, n.showLoading, 100 < Number(t / 100) ? 100 : t / 100);
      return this.anonymousFunc0 = function () {
        return e.toWithdraw();
      }, this.anonymousFunc1 = function () {
        return e.getPageData("refresh");
      }, this.anonymousFunc2 = function () {
        return e.hideAuthPop();
      }, a && _index.propsManager.set({
        showAuthPop: a,
        onRefreshPage: this.anonymousFunc1,
        money: t,
        onHideAuthPop: this.anonymousFunc2
      }, o), Object.assign(this.__state, {
        $compid__30: o,
        style: _indexModuleLessMap2.default,
        flag: flag
      }), this.__state;
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.getPageData(), (0, _indexWeapp3.pvReport)({
        create_time: new Date(),
        page_par: {}
      });
    }
  }, {
    key: "onReachBottom",
    value: function () {
      console.log("到达底部了"), this.state.haveMoreData && (this.setState({
        showLoading: !0
      }), this.getPageData());
    }
  }, {
    key: "toWithdraw",
    value: function () {
      (0, _indexWeapp3.clickReport)({
        click_id: "clickcash",
        create_time: new Date(),
        click_par: {}
      });
      var e = this.state,
          t = e.leftMoney,
          o = e.todayWithdrawTimesOut,
          e = e.todayBonusPoolUseUp;
      Number(t) <= 0 || o || (e ? (0, _indexWeapp.showToast)({
        title: "今日现金池已耗尽，明天再来提现试试吧~"
      }) : (_indexWeapp2.isDaojiaApp, this.setState({
        showAuthPop: !0
      })));
    }
  }, {
    key: "hideAuthPop",
    value: function () {
      this.setState({
        showAuthPop: !1
      });
    }
  }, {
    key: "getPageData",
    value: function (e) {
      var i = this,
          t = this.state,
          s = t.pageNum,
          r = t.pageSize,
          u = this.state.recordList || [];
      "refresh" == e && (s = 1, u = []), (0, _firstOrderFission.getMyWithdraw)({
        pageNum: s,
        pageSize: r
      }).then(function (e) {
        var t = e.result,
            o = t.totalMoney,
            n = t.leftMoney,
            a = t.recordList,
            e = void 0 === a ? [] : a,
            a = t.todayWithdrawTimesOut,
            t = t.todayBonusPoolUseUp;
        i.setState({
          totalMoney: o,
          leftMoney: n,
          recordList: u.concat(e),
          pageNum: s + 1,
          todayWithdrawTimesOut: a,
          todayBonusPoolUseUp: t,
          haveMoreData: !(e.length < r)
        });
      }).catch(function (e) {
        (0, _indexWeapp.showToast)({
          title: e.msg
        });
      }), this.setState({
        showLoading: !1
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
  }]), i;
}(), _class.$$events = ["anonymousFunc0"], _class.options = {
  addGlobalClass: !0
}, _class.$$componentPath = "pages/firstOrderFission-t/account/index", _temp2);
exports.default = Detail, Component(require("../npm/@tarojs/taro-weapp/index.js").default.createComponent(Detail, !0));