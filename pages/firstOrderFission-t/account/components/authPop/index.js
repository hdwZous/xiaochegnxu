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
  var s = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== s) {
    if ("value" in s) return s.value;
    s = s.get;
    return void 0 !== s ? s.call(o) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, o);
},
    _index = require("../../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp2 = require("../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp3 = require("../../../utils/wxuserinfo/index.weapp.js"),
    _firstOrderFission = require("../../../api/firstOrderFission.js");

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

var AuthPop = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, o = Array(n), s = 0; s < n; s++) o[s] = arguments[s];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["style", "showWxAuth", "canIUseGetUserProfile", "showWxConfirm", "userInfo", "showCertification", "showUserName", "userName", "confirmName", "showWithdrawing", "money", "cashNum", "Input", "showAuthPop"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.throttleFlag = !0, this.timer = null, this.timer2 = null, this.state = {
        userName: "",
        cashNum: 20,
        Input: "",
        userInfo: {
          openId: "",
          nickName: "",
          avatarUrl: ""
        },
        showWxAuth: !0,
        showCertification: !1,
        showUserName: !1,
        confirmName: !1,
        showWxConfirm: !1,
        showWithdrawing: !1,
        canIUseGetUserProfile: !!wx.getUserProfile
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      var t = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;
      var e = this.__state,
          e = (e.userName, e.userInfo, e.showWxConfirm, e.showUserName, e.showCertification, e.showWithdrawing, e.showWxAuth, e.confirmName, e.canIUseGetUserProfile, this.__props.money);
      return this.anonymousFunc0 = function () {
        return t.onCancel("showWxAuth");
      }, this.anonymousFunc1 = function () {
        return t.getUserProfile();
      }, this.anonymousFunc2 = function (e) {
        return t.getWxUser(e);
      }, this.anonymousFunc3 = function () {
        return t.getWxUserClick();
      }, this.anonymousFunc4 = function () {
        return t.onCancel("showWxConfirm");
      }, this.anonymousFunc5 = function () {
        return t.onSubmit("showWxConfirm");
      }, this.anonymousFunc6 = function () {
        return t.onCancel("showCertification");
      }, this.anonymousFunc7 = function () {
        return t.onSubmit("showCertification");
      }, this.anonymousFunc8 = function (e) {
        return t.changeInput(e);
      }, this.anonymousFunc9 = function () {
        return t.onCancel("showUserName");
      }, this.anonymousFunc10 = function () {
        return t.onSubmit("showUserName");
      }, this.anonymousFunc11 = function () {
        return t.onCancel("confirmName");
      }, this.anonymousFunc12 = function () {
        return t.onSubmit("confirmName");
      }, this.anonymousFunc13 = function () {
        t.hideWithdrawing();
      }, Object.assign(this.__state, {
        style: _indexModuleLessMap2.default,
        money: e
      }), this.__state;
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.setState({
        showWxAuth: this.props.showAuthPop
      });
    }
  }, {
    key: "changeInput",
    value: function (e) {
      this.setState({
        userName: e.detail.value || ""
      });
    }
  }, {
    key: "onCancel",
    value: function (e) {
      switch (e) {
        case "showWxAuth":
          this.setState({
            showWxAuth: !1
          }), this.props.onHideAuthPop();
          break;

        case "showWxConfirm":
          this.setState({
            showWxConfirm: !1
          }), this.props.onHideAuthPop();
          break;

        case "showCertification":
          this.setState({
            showCertification: !1
          }), this.props.onHideAuthPop();
          break;

        case "showUserName":
          this.setState({
            showUserName: !1
          }), this.props.onHideAuthPop();
          break;

        case "confirmName":
          this.setState({
            showUserName: !0,
            confirmName: !1
          });
      }
    }
  }, {
    key: "onSubmit",
    value: function (e) {
      switch (e) {
        case "showWxAuth":
          this.getUserOpenId();
          break;

        case "showWxConfirm":
          this.setState({
            showWxConfirm: !1,
            showCertification: !0
          });
          break;

        case "showCertification":
          this.setState({
            showCertification: !1,
            showUserName: !0
          });
          break;

        case "showUserName":
          this.state.userName ? this.setState({
            showUserName: !1,
            confirmName: !0
          }) : (0, _indexWeapp.showToast)({
            title: "请输入真实姓名"
          });
          break;

        case "confirmName":
          this.goWithdrawConfirm();
      }
    }
  }, {
    key: "getWxUserClick",
    value: function () {
      (0, _indexWeapp.showLoading)({
        mask: !0
      }), clearTimeout(this.timer2), this.timer2 = setTimeout(function () {
        (0, _indexWeapp.hideLoading)();
      }, 1500);
    }
  }, {
    key: "getUserProfile",
    value: function () {
      var t = this;
      (0, _indexWeapp.showLoading)({
        mask: !0
      }), clearTimeout(this.timer2), this.timer2 = setTimeout(function () {
        (0, _indexWeapp.hideLoading)();
      }, 1500), wx.getUserProfile({
        desc: "完善提现信息",
        success: function (e) {
          t.getUserOpenId(e.userInfo || {});
        }
      });
    }
  }, {
    key: "getWxUser",
    value: function (e) {
      e = e.detail;
      this.getUserOpenId((void 0 === e ? {} : e).userInfo || {});
    }
  }, {
    key: "getUserOpenId",
    value: function (t) {
      var n = this;
      (0, _indexWeapp3.getWxUserInfo)().then(function (e) {
        console.log("小程序环境openId", e), t.nickName ? n.setState({
          showWxConfirm: !0,
          showWxAuth: !1,
          userInfo: {
            openId: e.openId,
            nickName: t.nickName || e.nickName,
            avatarUrl: t.avatarUrl || e.avatarUrl
          }
        }) : (n.setState({
          showWxAuth: !1
        }), n.props.onHideAuthPop());
      }).catch(function () {
        (0, _indexWeapp.showToast)({
          title: "获取提现微信账户失败~"
        });
      });
    }
  }, {
    key: "goWithdrawConfirm",
    value: function () {
      var e,
          t,
          n,
          o = this;
      this.throttleFlag && (this.throttleFlag = !1, n = this.props.money, e = (t = this.state).userName, t = t.userInfo, n = 100 * Number(n), console.log("提现参数---------", {
        money: n,
        userName: e,
        nickName: t.nickName,
        nickUrl: t.avatarUrl,
        openId: t.openId,
        type: 1
      }), (0, _firstOrderFission.withdrawConfirm)({
        money: n,
        userName: e,
        nickName: t.nickName,
        nickUrl: t.avatarUrl,
        openId: t.openId,
        type: 1
      }).then(function (e) {
        e = e.result || {};
        1 == e.status ? o.setState({
          confirmName: !1,
          showWithdrawing: !0
        }) : (o.setState({
          confirmName: !1
        }), (0, _indexWeapp.showToast)({
          title: e.showMessage || "提现失败"
        }), o.props.onHideAuthPop()), (0, _indexWeapp2.clickReport)({
          create_time: new Date(),
          click_id: "cashresult",
          click_par: {
            result: e.showMessage
          }
        }), clearTimeout(o.timer), o.timer = setTimeout(function () {
          o.throttleFlag = !0;
        }, 1e3);
      }).catch(function (e) {
        o.throttleFlag = !0, (0, _indexWeapp.showToast)({
          title: e.msg || "提现失败"
        }), o.setState({
          confirmName: !1
        }), o.props.onHideAuthPop();
      }));
    }
  }, {
    key: "hideWithdrawing",
    value: function () {
      this.setState({
        showWithdrawing: !1
      }), this.props.onRefreshPage(), this.props.onHideAuthPop();
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
  }, {
    key: "anonymousFunc3",
    value: function (e) {}
  }, {
    key: "anonymousFunc4",
    value: function (e) {}
  }, {
    key: "anonymousFunc5",
    value: function (e) {}
  }, {
    key: "anonymousFunc6",
    value: function (e) {}
  }, {
    key: "anonymousFunc7",
    value: function (e) {}
  }, {
    key: "anonymousFunc8",
    value: function (e) {}
  }, {
    key: "anonymousFunc9",
    value: function (e) {}
  }, {
    key: "anonymousFunc10",
    value: function (e) {}
  }, {
    key: "anonymousFunc11",
    value: function (e) {}
  }, {
    key: "anonymousFunc12",
    value: function (e) {}
  }, {
    key: "anonymousFunc13",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5", "anonymousFunc6", "anonymousFunc7", "anonymousFunc8", "anonymousFunc9", "anonymousFunc10", "anonymousFunc11", "anonymousFunc12", "anonymousFunc13"], _class.options = {
  addGlobalClass: !0
}, _class.$$componentPath = "pages/firstOrderFission-t/account/components/authPop/index", _temp2);
exports.default = AuthPop, Component(require("../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(AuthPop));