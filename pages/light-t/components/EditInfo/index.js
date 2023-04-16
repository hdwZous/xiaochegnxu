"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n,
        o = arguments[t];

    for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n]);
  }

  return e;
},
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
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
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
    var i = e.apply(this, arguments);
    return new Promise(function (s, u) {
      return function t(e, n) {
        try {
          var o = i[e](n),
              r = o.value;
        } catch (e) {
          return void u(e);
        }

        if (!o.done) return Promise.resolve(r).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        s(r);
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

var EditInfo = (_temp2 = _class = function () {
  function s() {
    var e, o;

    _classCallCheck(this, s);

    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];

    return (e = o = _possibleConstructorReturn(this, (e = s.__proto__ || Object.getPrototypeOf(s)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "style", "userInfo", "shiwuResult", "myprize", "infoId", "openOrCloseShiwu", "winBoxUrl"], o.onClose = function () {
      (0, o.props.openOrCloseShiwu)();
    }, o.changeUserInfo = function (e, t) {
      var n = o.state.userInfo;

      switch (t) {
        case "userName":
          n.userName = e.target.value;
          break;

        case "userPhone":
          n.userPhone = e.target.value;
          break;

        case "address":
          n.address = e.target.value;
      }

      o.setState({
        userInfo: n
      });
    }, o.toOpenEdit = function () {}, o.customComponents = [], _possibleConstructorReturn(o, e);
  }

  var e;
  return _inherits(s, _index.Component), _createClass(s, [{
    key: "_constructor",
    value: function (e) {
      _get(s.prototype.__proto__ || Object.getPrototypeOf(s.prototype), "_constructor", this).call(this, e), this.state = {
        userInfo: {
          userName: "",
          userPhone: "",
          address: ""
        }
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.props.myprize && this.getUserInfoFun();
    }
  }, {
    key: "getUserInfoFun",
    value: function () {
      var t = this;
      console.log("getUserInfoFun");

      var e = this.state.userInfo,
          n = this.props.infoId,
          o = this.props.shiwuResult.prizeId,
          e = _extends({
        infoId: n,
        prizeId: o
      }, e);

      console.log("params :>> ", e), (0, _api.getUserInfo)(e).then(function (e) {
        0 == e.code && e.result && t.setState({
          userInfo: e.result
        });
      }).catch(function (e) {
        console.error(e);
      });
    }
  }, {
    key: "submit",
    value: (e = _asyncToGenerator(regeneratorRuntime.mark(function e() {
      var t;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            if (console.log("this.state.userInfo :>> ", this.state.userInfo), !(t = this.state.userInfo).userPhone || t.userPhone.length < 11) return (0, _indexWeapp.showToast)({
              title: "请填写正确格式的手机号"
            }), e.abrupt("return");
            e.next = 5;
            break;

          case 5:
            if (t.userName) {
              e.next = 8;
              break;
            }

            return (0, _indexWeapp.showToast)({
              title: "请填写用户名"
            }), e.abrupt("return");

          case 8:
            if (t.address) {
              e.next = 11;
              break;
            }

            return (0, _indexWeapp.showToast)({
              title: "请填写地址"
            }), e.abrupt("return");

          case 11:
            return console.log("handleSubmit1"), e.next = 14, this.handleSubmit();

          case 14:
          case "end":
            return e.stop();
        }
      }, e, this);
    })), function () {
      return e.apply(this, arguments);
    })
  }, {
    key: "handleSubmit",
    value: function () {
      var t = this,
          e = this.state.userInfo,
          n = this.props.infoId,
          o = this.props.shiwuResult.prizeId,
          e = _extends({
        infoId: n,
        prizeId: o
      }, e);

      console.log("params :>> ", e), (0, _api.submitUserInfo)(e).then(function (e) {
        0 == e.code && ((0, _indexWeapp.showToast)({
          title: "提交成功！"
        }), t.props.openOrCloseShiwu());
      }).catch(function (e) {
        (0, _indexWeapp.showToast)({
          title: e.msg || "提交失败！"
        }), console.error(e);
      });
    }
  }, {
    key: "_createData",
    value: function () {
      var t = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix, this.__state.userInfo;
      var e = this.__props,
          n = (e.winBoxUrl, e.shiwuResult);
      this.anonymousFunc0 = function () {
        return t.onClose();
      }, this.anonymousFunc1 = function (e) {
        return t.changeUserInfo(e, "userName");
      }, this.anonymousFunc2 = function (e) {
        return t.changeUserInfo(e, "userPhone");
      };
      e = (0, _index.internal_inline_style)({
        height: "100px"
      });
      return this.anonymousFunc3 = function (e) {
        return t.changeUserInfo(e, "address");
      }, this.anonymousFunc4 = function () {
        return t.submit();
      }, this.anonymousFunc5 = function () {
        return t.onClose();
      }, Object.assign(this.__state, {
        anonymousState__temp: e,
        style: _indexModuleLessMap2.default,
        shiwuResult: n
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
  }, {
    key: "anonymousFunc3",
    value: function (e) {}
  }, {
    key: "anonymousFunc4",
    value: function (e) {}
  }, {
    key: "anonymousFunc5",
    value: function (e) {}
  }]), s;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5"], _class.$$componentPath = "pages/light-t/components/EditInfo/index", _temp2);
exports.default = EditInfo, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(EditInfo));