"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function o(t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
    }
  }

  return function (t, e, n) {
    return e && o(t.prototype, e), n && o(t, n), t;
  };
}(),
    _get = function t(e, n, o) {
  null === e && (e = Function.prototype);
  var a = Object.getOwnPropertyDescriptor(e, n);

  if (void 0 !== a) {
    if ("value" in a) return a.value;
    a = a.get;
    return void 0 !== a ? a.call(o) : void 0;
  }

  e = Object.getPrototypeOf(e);
  if (null !== e) return t(e, n, o);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(t) {
  return t && t.__esModule ? t : {
    default: t
  };
}

function _classCallCheck(t, e) {
  if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
  if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

var ActivityRecord = (_temp2 = _class = function () {
  function a() {
    var t, i;

    _classCallCheck(this, a);

    for (var e = arguments.length, n = Array(e), o = 0; o < e; o++) n[o] = arguments[o];

    return (t = i = _possibleConstructorReturn(this, (t = a.__proto__ || Object.getPrototypeOf(a)).call.apply(t, [this].concat(n)))).$usedState = ["loopArray20", "$compid__64", "style", "tabIndex", "tabNameList", "isSignIn", "availables", "status", "anonymousState__temp7", "anonymousState__temp8", "unCompletes", "anonymousState__temp9", "anonymousState__temp10", "completes", "anonymousState__temp11", "anonymousState__temp12", "isShowWithdrawStrategyDia", "isShowArrowDown", "currentPage", "newUnCompletes", "getTabIndex", "showLoading", "showBottomTips", "withdrawStrategy"], i.chooseTab = function (t, e) {
      i.state.isSignIn;
      var n = i.props,
          o = n.getTabIndex,
          a = (n.availables, n.unCompletes),
          n = n.completes;
      i.setState({
        tabIndex: e
      }), o(e);
      o = {};
      0 == e && a && 0 < a.length && (o = {
        tab: "activityRecords_ing",
        showContent: a.length
      }), 0 != e || a && 0 != a.length || (o = {
        tab: "activityRecords_ing",
        showContent: "none"
      }), 1 == e && n && 0 < n.length && (o = {
        tab: "activityRecords_done",
        showContent: n.length
      }), 1 != e || n && 0 != n.length || (o = {
        tab: "activityRecords_done",
        showContent: "none"
      }), console.log("params=======", o), (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickTab",
        click_par: o
      });
    }, i.showWithdrawStrategyDia = function () {
      i.setState({
        isShowWithdrawStrategyDia: !0
      }), (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickWithdrawStrategy"
      });
    }, i.closeWithdrawStrategyDia = function () {
      i.setState({
        isShowWithdrawStrategyDia: !1
      });
    }, i.invite = function (t, e) {
      var n = i.state.tabIndex;
      i.props.onClickShare;
      i.props.onClickShare(t);
      t = "default" == e ? {
        activityRecords: "none"
      } : {};
      "list" == e && (-1 == n && (t = {
        activityRecords: "todo"
      }), 0 == n && (t = {
        activityRecords: "ing"
      })), (0, _indexWeapp2.clickReport)({
        create_time: new Date(),
        click_id: "clickremind",
        click_par: t
      });
    }, i._goToLogin = function () {
      var t = i.$router.params.source;
      (0, _indexWeapp.goToLogin)({
        localTargetUrl: "/pages/firstOrderFission-t/launch/index?" + ("source=" + t)
      });
    }, i.arrowDown = function () {
      i.setState({
        isShowArrowDown: !1
      });
    }, i.anonymousFunc3Map = {}, i.customComponents = ["RenderUnCompletesLine", "PopDia"], _possibleConstructorReturn(i, t);
  }

  return _inherits(a, _index.Component), _createClass(a, [{
    key: "_constructor",
    value: function (t) {
      _get(a.prototype.__proto__ || Object.getPrototypeOf(a.prototype), "_constructor", this).call(this, t), this.state = {
        tabIndex: 0,
        isShowWithdrawStrategyDia: !1,
        isShowArrowDown: !1,
        currentPage: 1,
        isSignIn: "true",
        newUnCompletes: []
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidShow",
    value: function () {
      this.getLoginStatus();
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var t = this.props.unCompletes;
      this.getLoginStatus(), t && 6 < t.length ? this.setState({
        isShowArrowDown: !0
      }) : this.setState({
        isShowArrowDown: !1
      });
    }
  }, {
    key: "getLoginStatus",
    value: function () {
      var e = this;
      (0, _indexWeapp.isLogin)().then(function (t) {
        e.setState({
          isSignIn: "true"
        });
      }).catch(function (t) {
        e.setState({
          isSignIn: "false"
        });
      });
    }
  }, {
    key: "_createActivityRecordDefaultPageData",
    value: function (t) {
      var n = this;
      return function () {
        var t = n.state.isSignIn,
            e = n.props.status;
        return n.anonymousFunc0 = function () {
          return n._goToLogin();
        }, n.anonymousFunc1 = function () {
          return n.showWithdrawStrategyDia();
        }, {
          style: _indexModuleLessMap2.default,
          isSignIn: t,
          status: e
        };
      };
    }
  }, {
    key: "_createAvailablesData",
    value: function (t) {
      var e = this;
      return function () {
        var t = e.props.availables;
        return {
          loopArray17: t.map(function (t, e) {
            return {
              $loopState__temp2: "availables" + e,
              $original: (t = {
                $original: (0, _index.internal_get_original)(t)
              }).$original
            };
          }),
          style: _indexModuleLessMap2.default,
          availables: t
        };
      };
    }
  }, {
    key: "_createUnCompletesData",
    value: function (a) {
      var i = this;
      return function () {
        var t = i.state,
            e = t.isShowArrowDown,
            n = t.newUnCompletes,
            o = i.props.unCompletes,
            t = [],
            t = n && 0 < n.length ? n : o;
        return i.anonymousFunc2 = function () {
          return i.arrowDown();
        }, {
          loopArray18: t.map(function (t, e) {
            t = {
              $original: (0, _index.internal_get_original)(t)
            };
            var n = "unCompletes" + e,
                o = (0, _index.genCompid)(a + "fSulDJSmQf" + e);
            return _index.propsManager.set({
              item: t.$original,
              index: e,
              invite: i.invite
            }, o), {
              $loopState__temp4: n,
              $compid__63: o,
              $original: t.$original
            };
          }),
          style: _indexModuleLessMap2.default,
          isShowArrowDown: e,
          list: t
        };
      };
    }
  }, {
    key: "_createCompletesData",
    value: function (t) {
      var o = this;
      return function () {
        var t = o.props,
            e = t.completes,
            n = t.showLoading;
        t.showBottomTips;
        return {
          loopArray19: e.map(function (t, e) {
            return {
              $loopState__temp6: "completesNew" + e,
              $original: (t = {
                $original: (0, _index.internal_get_original)(t)
              }).$original
            };
          }),
          style: _indexModuleLessMap2.default,
          completes: e,
          showLoading: n
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      var o = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var t = this.$prefix,
          e = (0, _index.genCompid)(t + "$compid__64"),
          n = this.__state,
          a = n.tabIndex,
          i = n.isShowWithdrawStrategyDia,
          r = n.isSignIn,
          s = this.__props,
          u = s.availables,
          l = s.unCompletes,
          c = s.withdrawStrategy,
          p = s.completes,
          _ = s.status,
          d = ["待完成", "已完成"],
          m = -1 == a && "true" == r && u && 0 < u.length && (1 == _ || 8 == _) ? this._createAvailablesData(t + "vGmcaOvvIu")() : null,
          h = -1 == a ? this._createActivityRecordDefaultPageData(t + "kzeVPCLctF")() : null,
          n = 0 == a && "true" == r && l && 0 < l.length && (1 == _ || 8 == _ || 4 == _ || 3 == _ || 2 == _) ? this._createUnCompletesData(t + "VcpjcNqLdx")() : null,
          s = 0 == a ? this._createActivityRecordDefaultPageData(t + "hmzaDtUqGE")() : null,
          r = 1 == a && "true" == r && p && 0 < p.length && (1 == _ || 8 == _ || 4 == _ || 3 == _ || 2 == _) ? this._createCompletesData(t + "CYwjeJtCuA")() : null,
          a = 1 == a ? this._createActivityRecordDefaultPageData(t + "vDtBlBgEUN")() : null,
          t = d.map(function (t, e) {
        t = {
          $original: (0, _index.internal_get_original)(t)
        };
        var n = "asZfn" + e;
        return o.anonymousFunc3Map[n] = function (t) {
          return o.chooseTab(t, e);
        }, {
          _$indexKey: n,
          $loopState__temp14: "tabNameList" + e,
          $original: t.$original
        };
      });
      return i && _index.propsManager.set({
        txt: c,
        title: "提现攻略",
        onCloseDia: this.closeWithdrawStrategyDia
      }, e), Object.assign(this.__state, {
        loopArray20: t,
        $compid__64: e,
        style: _indexModuleLessMap2.default,
        tabNameList: d,
        availables: u,
        status: _,
        anonymousState__temp7: m,
        anonymousState__temp8: h,
        unCompletes: l,
        anonymousState__temp9: n,
        anonymousState__temp10: s,
        completes: p,
        anonymousState__temp11: r,
        anonymousState__temp12: a
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (t) {}
  }, {
    key: "anonymousFunc1",
    value: function (t) {}
  }, {
    key: "anonymousFunc2",
    value: function (t) {}
  }, {
    key: "anonymousFunc3",
    value: function (t, e) {
      return this.anonymousFunc3Map[t] && this.anonymousFunc3Map[t](e);
    }
  }]), a;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3"], _class.multipleSlots = !0, _class.$$componentPath = "pages/firstOrderFission-t/components/activityRecord/index", _temp2);
exports.default = ActivityRecord, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(ActivityRecord));