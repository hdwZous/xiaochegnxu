"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function a(e, t) {
    for (var n = 0; n < t.length; n++) {
      var a = t[n];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
    }
  }

  return function (e, t, n) {
    return t && a(e.prototype, t), n && a(e, n), e;
  };
}(),
    _get = function e(t, n, a) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(a) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, a);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/login/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
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

var isH5 = !1,
    FriendHelpComp = (_temp2 = _class = function () {
  function o() {
    var e, i;

    _classCallCheck(this, o);

    for (var t = arguments.length, n = Array(t), a = 0; a < t; a++) n[a] = arguments[a];

    return (e = i = _possibleConstructorReturn(this, (e = o.__proto__ || Object.getPrototypeOf(o)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp", "loopArray22", "styles", "inviteCount", "increaseChanceCount", "minute", "faceArr", "homeData", "defaultType"], i.handleClickShare = function (e) {
      var t = i.props.defaultType,
          n = i.$router.params.infoId || "",
          a = i.props.homeData,
          o = a.infoState,
          r = a.state,
          a = a.inviteCode;

      if ("share" !== e) {
        if (4 == t) return (0, _indexWeapp3.showToast)({
          title: "您未登录，快去登录领取福利吧!"
        }), void (0, _indexWeapp.goToLogin)({
          localTargetUrl: "/pages/redPacket-t/index?infoId=" + n + "&inviteCode=" + a
        });
        null != t || 2 != o && 2 != r ? ((r = i.props.homeData.matterDetail).description, r.xcxShareTitle, r.xcxSharePicUrl, (0, _indexWeapp2.clickReport)({
          create_time: new Date(),
          click_id: "clickButton",
          click_par: {
            type: "invite"
          }
        })) : (0, _indexWeapp3.showToast)({
          title: "活动已结束不可分享哦～"
        });
      }
    }, i.onShareAppMessage = function (e) {
      var t = i.props.homeData,
          n = t.inviteCode,
          a = t.infoState,
          o = t.state,
          r = i.props.homeData && i.props.homeData.matterDetail && i.props.homeData.matterDetail.xcxShareTitle || "红包雨来啦",
          t = i.props.homeData && i.props.homeData.matterDetail && i.props.homeData.matterDetail.xcxSharePicUrl || "https://storage.360buyimg.com/wxmini/redpacket/%E5%88%86%E4%BA%AB%E5%8D%A1%E7%89%87.png";
      return null != defaultType || 2 != a && 2 != o || (r = "亲，当前活动已结束", t = "https://storage.360buyimg.com/wxmini/redpacket/%E5%88%86%E4%BA%AB%E5%8D%A1%E7%89%87.png"), {
        title: r,
        imageUrl: t,
        path: "/pages/redPacket-t/index?infoId=" + (i.$router.params.infoId || "") + "&inviteCode=" + n
      };
    }, i.anonymousFunc0Map = {}, i.anonymousFunc1Map = {}, i.customComponents = [], _possibleConstructorReturn(i, e);
  }

  return _inherits(o, _index.Component), _createClass(o, [{
    key: "_constructor",
    value: function (e) {
      _get(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "_constructor", this).call(this, e), this.state = {
        minute: "00",
        faceArr: [0, 1, 2, 3, 4, 5]
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      this.$router.params.infoId;
      var e = this.props.homeData.dailyHelpedLimit;

      if (e) {
        for (var t = [], n = 0; n < e; n++) t[n] = n;

        this.setState({
          faceArr: t
        });
      }
    }
  }, {
    key: "_createData",
    value: function () {
      var s = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      this.$prefix;

      var e = this.__props.homeData || {},
          t = e.increaseChanceCount,
          n = void 0 === t ? 0 : t,
          t = e.inviteCount,
          u = void 0 === t ? "" : t,
          t = e.matterDetail,
          e = t && t.inviteFriendPanelUrl ? t.inviteFriendPanelUrl : "https://storage.360buyimg.com/wxmini/redpacket/%E9%82%80%E8%AF%B72%E5%8E%8B%E7%BC%A9.png",
          t = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + e + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      }),
          e = this.__state.faceArr.map(function (e, t) {
        var n = (e = {
          $original: (0, _index.internal_get_original)(e)
        }).$original < u ? 'url("https://storage.360buyimg.com/wxmini/redpacket/dog.png")' : "",
            a = e.$original < u ? "已邀请" : "未邀请",
            o = e.$original < u ? "share" : "",
            r = "tKqod" + t;

        s.anonymousFunc0Map[r] = function () {
          return s.handleClickShare(o);
        };

        var i = "JlOxQ" + t;

        s.anonymousFunc1Map[i] = function () {
          return s.handleClickShare(o);
        };

        var p = e.$original < u ? (0, _index.internal_inline_style)({
          backgroundImage: n,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat"
        }) : null,
            t = (0, _index.internal_inline_style)({
          backgroundImage: n,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat"
        });
        return {
          url: n,
          text: a,
          shareType: o,
          _$indexKey: r,
          _$indexKey2: i,
          $loopState__temp3: p,
          $loopState__temp5: t,
          $original: e.$original
        };
      });

      return Object.assign(this.__state, {
        anonymousState__temp: t,
        loopArray22: e,
        styles: _indexModuleLessMap2.default,
        inviteCount: u,
        increaseChanceCount: n
      }), this.__state;
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
  }]), o;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "handleClickShare"], _class.$$componentPath = "pages/redPacket-t/components/FriendHelpComp/index", _temp2);
exports.default = FriendHelpComp, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(FriendHelpComp));