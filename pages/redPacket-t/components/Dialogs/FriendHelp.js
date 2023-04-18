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
    _api = require("../../api.js"),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("../../utils/wxuserinfo/index.weapp.js"),
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

var FriendHelp = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, o = Array(n), r = 0; r < n; r++) o[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(o)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "styles", "redPackageStyleUrl", "tagText", "title", "text", "okText"], t.customComponents = [], _possibleConstructorReturn(t, e);
  }

  return _inherits(i, _index2.default.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;

      var n = this.__props,
          e = n.title,
          t = n.text,
          o = n.okText,
          r = n.tagText,
          i = n.helpType,
          a = n.infoId,
          s = n.inviteCode,
          p = n.awardWindowsUrl,
          u = void 0 === p ? "https://storage.360buyimg.com/wxmini/redpacket/redbg2.png" : p,
          l = n.redPackageStyleUrl,
          c = void 0 === l ? "https://storage.360buyimg.com/wxmini/redpacket/lrred.png" : l,
          _ = function () {
        var t = {};
        t.infoId = a, t.inviteCode = s, (t.openId = "", _indexWeapp3.getWxUserInfo)().then(function (e) {
          console.log("小程序环境openId", e), t.openId = e.openId, (0, _api.getHelp)(t).then(function (e) {
            e && 0 == e.code ? n.openHelpPop() : (0, _indexWeapp.showToast)({
              title: e.msg || "助力失败！"
            });
          }).catch(function (e) {
            (0, _indexWeapp.showToast)({
              title: e.msg || "助力失败！"
            });
          });
        }).catch(function () {});
      },
          p = (0, _index.internal_inline_style)({
        zIndex: 20
      }),
          l = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + u + ") ",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      }),
          u = (0, _index.internal_inline_style)({
        padding: "10px"
      });

      return this.anonymousFunc0 = function () {
        var e = null,
            e = "helpPopState" == i ? (_(), "help") : (n.cancelHandle(i), "redPacket");
        (0, _indexWeapp2.clickReport)({
          create_time: new Date(),
          click_id: "clickLayer",
          click_par: {
            type: e
          }
        });
      }, this.anonymousFunc1 = function () {
        n.cancelHandle(i);
      }, Object.assign(this.__state, {
        anonymousState__temp: p,
        anonymousState__temp2: l,
        anonymousState__temp3: u,
        styles: _indexModuleLessMap2.default,
        redPackageStyleUrl: c,
        tagText: r,
        title: e,
        text: t,
        okText: o
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1"], _class.$$componentPath = "pages/redPacket-t/components/Dialogs/FriendHelp", _temp2);
exports.default = FriendHelp, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(FriendHelp));