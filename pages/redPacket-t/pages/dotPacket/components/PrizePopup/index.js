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
  var r = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(a) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, a);
},
    _index = require("../../../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp = require("../../../../npm/@jd/djmp/common-t/js/bi/index.weapp.js");

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
    DialogpopView = (_temp2 = _class = function () {
  function r() {
    var e, i;

    _classCallCheck(this, r);

    for (var t = arguments.length, n = Array(t), a = 0; a < t; a++) n[a] = arguments[a];

    return (e = i = _possibleConstructorReturn(this, (e = r.__proto__ || Object.getPrototypeOf(r)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp6", "style", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "cancelHandle", "__fn_onClick", "haveChance", "homeData", "playAgain", "infoId"], i._closeHandle = function () {
      var e = i.props.cancelHandle;
      "function" == typeof e && e();
    }, i.handleClickShare = function (e) {
      var t = i.props.infoId || "",
          n = (i.props.homeData || {}).matterDetail,
          a = void 0 === n ? {} : n,
          r = a.title,
          o = a.description,
          n = a.xcxShareTitle,
          a = a.xcxSharePicUrl;
      i.clickRp("clickLayer", {
        type: "invite"
      }), e && ((e = {}).title = r, e.xcxShareTitle = n, e.xcxSharePicUrl = a, e.description = o, e.infoId = t, i.props.onClickShare(e));
    }, i.clickRp = function (e, t) {
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: e,
        click_par: t
      });
    }, i.onShareAppMessage = function (e) {
      var t = i.props.infoId || "",
          n = i.props.homeData || {},
          a = n.inviteCode,
          n = n.matterDetail,
          n = void 0 === n ? {} : n;
      n.title, n.description;
      return {
        title: n.xcxShareTitle,
        imageUrl: n.xcxSharePicUrl,
        path: "/pages/redPacket-t/index?infoId=" + t + "&inviteCode=" + a
      };
    }, i.customComponents = [], _possibleConstructorReturn(i, e);
  }

  return _inherits(r, _index.Component), _createClass(r, [{
    key: "_constructor",
    value: function (e) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, e), this.$$refs = [];
    }
  }, {
    key: "_createHeaderData",
    value: function (e) {
      var t = this;
      return function (e) {
        t.props.cancelHandle;
        return t.headerBuilder ? t.headerBuilder(e) : {
          style: _indexModuleLessMap2.default
        };
      };
    }
  }, {
    key: "_createTitleData",
    value: function (e) {
      var t = this;
      return function (e) {
        return t.titleBuilder ? t.titleBuilder(e) : {
          style: _indexModuleLessMap2.default
        };
      };
    }
  }, {
    key: "_createContentData",
    value: function (e) {
      return function (e) {
        return {
          style: _indexModuleLessMap2.default
        };
      };
    }
  }, {
    key: "_createFooterData",
    value: function (e) {
      var t = this;
      return function (e) {
        return t.props.haveChance && t.props.homeData.firstVisitChance, t.anonymousFunc0 = function () {
          return t.handleClickShare(!1);
        }, {
          style: _indexModuleLessMap2.default
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};

      var e = this.$prefix,
          t = (this.__props.homeData || {}).matterDetail,
          n = void 0 === t ? {} : t,
          a = n && n.awardWindowsUrl ? n.awardWindowsUrl : "https://storage.360buyimg.com/wxmini/redpacket/%E5%BC%80%E5%A5%96%E5%BC%B9%E7%AA%97.png",
          r = this._createHeaderData(e + "ehIoOIicJD")(this.__props),
          t = this._createTitleData(e + "xkdmUGIaWz")(this.__props),
          n = this._createContentData(e + "WXgkpTmsRd")(this.__props),
          e = this._createFooterData(e + "oYAaZzhdfF")(this.__props),
          a = (0, _index.internal_inline_style)({
        backgroundImage: "url(" + a + ") ",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      });

      return Object.assign(this.__state, {
        anonymousState__temp6: a,
        style: _indexModuleLessMap2.default,
        anonymousState__temp2: r,
        anonymousState__temp3: t,
        anonymousState__temp4: n,
        anonymousState__temp5: e
      }), this.__state;
    }
  }, {
    key: "funPrivateHKPmw",
    value: function () {
      return this.props.cancelHandle.apply(void 0, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: "funPrivateTazKC",
    value: function () {
      return this.props.playAgain.apply(void 0, Array.prototype.slice.call(arguments, 1));
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), r;
}(), _class.$$events = ["funPrivateHKPmw", "funPrivateTazKC", "anonymousFunc0"], _class.multipleSlots = !0, _class.$$componentPath = "pages/redPacket-t/pages/dotPacket/components/PrizePopup/index", _temp2);
exports.default = DialogpopView, Component(require("../../../../npm/@tarojs/taro-weapp/index.js").default.createComponent(DialogpopView));