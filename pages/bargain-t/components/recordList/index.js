"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function r(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n];
      r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
  }

  return function (e, t, n) {
    return t && r(e.prototype, t), n && r(e, n), e;
  };
}(),
    _get = function e(t, n, r) {
  null === t && (t = Function.prototype);
  var o = Object.getOwnPropertyDescriptor(t, n);

  if (void 0 !== o) {
    if ("value" in o) return o.value;
    o = o.get;
    return void 0 !== o ? o.call(r) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, n, r);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/storage/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/constants/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _objectDestructuringEmpty(e) {
  if (null == e) throw new TypeError("Cannot destructure undefined");
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

var Card = (_temp2 = _class = function () {
  function o() {
    var e, u;

    _classCallCheck(this, o);

    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];

    return (e = u = _possibleConstructorReturn(this, (e = o.__proto__ || Object.getPrototypeOf(o)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp8", "anonymousState__temp9", "loopArray14", "loopArray15", "style", "cutPriceState", "tabIndex", "tabNameList", "anonymousState__temp6", "anonymousState__temp7", "r", "g", "b", "backgroundColor", "shareInfo", "storeId", "skuId", "activityId", "orgCode", "getCutPriceDetail", "unionCode", "bindUserList", "totalNewUserCount", "leftNewUserCount", "d", "h", "m", "s", "cutPricePersonList"], u.colorTransform = function (e) {
      e && (e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e), u.setState({
        r: parseInt(e[1], 16),
        g: parseInt(e[2], 16),
        b: parseInt(e[3], 16)
      }));
    }, u.shareOfH5 = function () {
      var e = u.$router.params,
          t = e.activityId,
          n = e.unionCode,
          r = e.storeId,
          o = e.skuId,
          a = e.orgCode,
          e = u.props.shareInfo,
          i = void 0 === e ? {} : e,
          s = "" + window.location.origin + window.location.pathname + "#/pages/sharePreview-t/index?image=" + (i.friendMergedImg || "https://storage.360buyimg.com/wximg/h5/bargain/4.jpg") + "&title=砍价领商品";

      u._throttle(function () {
        var e = {
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: i.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          mpImgUrl: i.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          path: "/pages/bargain-t/detail/index?unionCode=" + n + "&activityId=" + t + "&skuId=" + o + "&storeId=" + r + "&orgCode=" + a,
          imgUrl: i.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          desc: i.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          shareUrl: s,
          pyqImg: i.mpMergedImg || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        };
        (0, _indexWeapp2.openShare)(e);
      });
    }, u.senderCutPrice = function () {
      var e = u.props,
          t = e.storeId,
          n = e.skuId,
          r = e.activityId,
          o = e.orgCode,
          a = e.getCutPriceDetail,
          i = e.unionCode,
          e = u.getLoginInfo() || {};
      senderCutPrice({
        storeId: t || "",
        nickName: e.nickName || "",
        nickHeadUrl: e.avatarUrl || "",
        skuId: n || "",
        activityId: r || "",
        orgCode: o,
        openId: e.openId || "",
        unionCode: i || ""
      }), a();
    }, u.chooseTab = function (e, t) {
      u.setState({
        tabIndex: t
      }), 0 == t && (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "selectTab",
        click_par: {
          type: "free"
        }
      }), 1 == t && (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "selectTab",
        click_par: {
          type: "bargain"
        }
      });
    }, u.anonymousFunc0Map = {}, u.anonymousFunc1Map = {}, u.customComponents = ["UnCompletesLine"], _possibleConstructorReturn(u, e);
  }

  return _inherits(o, _index.Component), _createClass(o, [{
    key: "_constructor",
    value: function (e) {
      _get(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "_constructor", this).call(this, e), this.shareFlag = !0, this.state = {
        r: 255,
        g: 255,
        b: 255,
        tabIndex: 0
      }, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this.props,
          t = e.backgroundColor,
          e = e.cutPriceState;
      this.colorTransform(t), 0 == e ? this.setState({
        tabIndex: 0
      }) : this.setState({
        tabIndex: 1
      });
    }
  }, {
    key: "_throttle",
    value: function (e) {
      var t = this;
      this.shareFlag && (this.shareFlag = !1, e.apply(this, arguments), setTimeout(function () {
        t.shareFlag = !0;
      }, 500));
    }
  }, {
    key: "getLoginInfo",
    value: function () {
      var e = (0, _indexWeapp3.getStorageSync)(_indexWeapp4.LOGIN_INFO);
      return "string" == typeof e ? JSON.parse(e) : e || {};
    }
  }, {
    key: "showSubscribe",
    value: function () {
      this.props.onShowSubscribe && this.props.onShowSubscribe();
    }
  }, {
    key: "_createUnCompletesData",
    value: function (c) {
      var d = this;
      return function () {
        _objectDestructuringEmpty(d.state);

        var e = d.props,
            t = e.cutPriceState,
            a = e.bindUserList,
            i = e.backgroundColor,
            n = (e.totalNewUserCount, e.leftNewUserCount),
            s = e.d,
            u = e.h,
            l = e.m,
            p = e.s;
        return {
          anonymousState__temp: 0 == t ? (0, _index.internal_inline_style)({
            color: i
          }) : null,
          loopArray12: a && 0 < a.length ? a.map(function (e, t) {
            e = {
              $original: (0, _index.internal_get_original)(e)
            };
            var n = "gfPBk" + t;

            d.anonymousFunc0Map[n] = function () {
              return d.showSubscribe();
            };

            var r = a && 0 < a.length ? "unCompletes" + t : null,
                o = (0, _index.genCompid)(c + "DvJdHUAElb" + t);
            return _index.propsManager.set({
              item: e.$original,
              index: t,
              backgroundColor: i,
              shareOfH5: d.shareOfH5,
              onShowSubscribe: d.anonymousFunc0.bind(d, n),
              d: s,
              h: u,
              m: l,
              s: p
            }, o), {
              _$indexKey: n,
              $loopState__temp3: r,
              $compid__59: o,
              $original: e.$original
            };
          }) : [],
          style: _indexModuleLessMap2.default,
          cutPriceState: t,
          bindUserList: a,
          leftNewUserCount: n
        };
      };
    }
  }, {
    key: "_createCompletesData",
    value: function (e) {
      var t = this;
      return function () {
        var n = t.props.cutPricePersonList;
        return {
          loopArray13: n && 0 < n.length ? n.map(function (e, t) {
            return e = {
              $original: (0, _index.internal_get_original)(e)
            }, {
              $loopState__temp5: n && 0 < n.length ? "cutPricePersonList" + t : null,
              $original: e.$original
            };
          }) : [],
          style: _indexModuleLessMap2.default,
          cutPricePersonList: n
        };
      };
    }
  }, {
    key: "_createData",
    value: function () {
      var o = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var e = this.$prefix,
          t = this.__state,
          n = t.r,
          r = t.g,
          a = t.b,
          i = t.tabIndex,
          s = this.__props,
          u = s.backgroundColor,
          l = s.cutPriceState,
          p = ["加速领攻略", "砍价记录"],
          p = 0 == l ? ["加速领攻略", "砍价记录"] : ["砍价记录"],
          t = 0 == i && 2 == p.length ? this._createUnCompletesData(e + "QxsPiHqjJr")() : null,
          s = 1 == i && 2 == p.length || 1 == p.length ? this._createCompletesData(e + "kNkRWDiQKe")() : null,
          e = (0, _index.internal_inline_style)({
        background: "rgb(" + n + ", " + r + ", " + a + ", 0.1)"
      }),
          n = 0 == l ? (0, _index.internal_inline_style)({
        background: "rgb(" + n + ", " + r + ", " + a + ", 0.5)"
      }) : null,
          r = 2 == p.length ? p.map(function (e, t) {
        e = {
          $original: (0, _index.internal_get_original)(e)
        };
        var n = i == t ? "" + u : "",
            r = "aNyFz" + t;
        return o.anonymousFunc1Map[r] = function (e) {
          return o.chooseTab(e, t);
        }, {
          borderBottomColor: n,
          _$indexKey2: r,
          $loopState__temp11: 2 == p.length ? "tabNameList" + t : null,
          $loopState__temp13: 2 == p.length ? (0, _index.internal_inline_style)({
            background: n
          }) : null,
          $original: e.$original
        };
      }) : [],
          a = 1 == p.length ? p.map(function (e, t) {
        return e = {
          $original: (0, _index.internal_get_original)(e)
        }, {
          $loopState__temp15: 1 == p.length ? "tabNameList" + t : null,
          $original: e.$original
        };
      }) : [];
      return Object.assign(this.__state, {
        anonymousState__temp8: e,
        anonymousState__temp9: n,
        loopArray14: r,
        loopArray15: a,
        style: _indexModuleLessMap2.default,
        cutPriceState: l,
        tabNameList: p,
        anonymousState__temp6: t,
        anonymousState__temp7: s
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
}(), _class.$$events = ["anonymousFunc1"], _class.multipleSlots = !0, _class.$$componentPath = "pages/bargain-t/components/recordList/index", _temp2);
exports.default = Card, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(Card));