"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var n,
        a = arguments[t];

    for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
  }

  return e;
},
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
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _bargain = require("../../api/bargain.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/share/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap);

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _asyncToGenerator(e) {
  return function () {
    var s = e.apply(this, arguments);
    return new Promise(function (i, o) {
      return function t(e, n) {
        try {
          var a = s[e](n),
              r = a.value;
        } catch (e) {
          return void o(e);
        }

        if (!a.done) return Promise.resolve(r).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        i(r);
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

var MyBargainGoods = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, a = Array(n), r = 0; r < n; r++) a[r] = arguments[r];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(a)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "$compid__60", "$compid__61", "style", "item", "changeTab", "index", "backgroundColor", "getMyCutGoodsLitInfo"], t.customComponents = ["CountDown", "ProcessBox"], _possibleConstructorReturn(t, e);
  }

  var n;
  return _inherits(i, _index.Component), _createClass(i, [{
    key: "_constructor",
    value: function (e) {
      _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "_constructor", this).call(this, e), this.shareFlag = !0, this.shareInfo = {}, this.state = {}, this.$$refs = [];
    }
  }, {
    key: "jumpLaunchDetail",
    value: function (e, t) {
      t.stopPropagation(), (0, _indexWeapp2.navigateTo)("/pages/bargain-t/launch/index?activityId=" + e.activityId + "&unionCode=" + e.unionCode + "&storeId=" + e.storeId + "&skuId=" + e.skuId + "&orgCode=" + e.orgCode);
    }
  }, {
    key: "share",
    value: function (e, t) {
      t.stopPropagation();
      var n = e.skuImageUrl,
          a = e.skuName,
          r = e.cutPrice,
          i = e.basicPrice,
          o = e.storeName,
          s = e.unionCode,
          c = e.activityId,
          u = e.skuId,
          t = e.state;
      this.getMaterialInfo({
        skuImageUrl: n,
        skuName: a,
        cutPrice: r,
        basicPrice: i,
        storeName: o,
        unionCode: s,
        activityId: c
      }, e);
      t = {
        skuId: u,
        activityId: c,
        activeState: t
      };
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickSku",
        click_par: t
      });
    }
  }, {
    key: "getMaterialInfo",
    value: (n = _asyncToGenerator(regeneratorRuntime.mark(function e(t, n) {
      var a = this;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, (0, _bargain.getMaterial)(t).then(function (e) {
              e = e.result;
              a.shareInfo = (void 0 === e ? {} : e) || {};
            }).catch(function (e) {});

          case 2:
            return e.next = 4, (0, _bargain.getFriendShareImg)(t).then(function (e) {
              e = e.result;
              a.shareInfo = _extends({}, a.shareInfo, void 0 === e ? {} : e);
            }).catch(function (e) {});

          case 4:
            this.shareOfH5(this.shareInfo, n);

          case 5:
          case "end":
            return e.stop();
        }
      }, e, this);
    })), function (e, t) {
      return n.apply(this, arguments);
    })
  }, {
    key: "shareOfH5",
    value: function (t) {
      var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
          a = "" + window.location.origin + window.location.pathname + "#/pages/sharePreview-t/index?image=" + (t.friendMergedImg || "https://storage.360buyimg.com/wximg/h5/bargain/4.jpg") + "&title=砍价领商品";

      this._throttle(function () {
        var e = {
          djNewShare: 1,
          appId: "gh_5103b94a8a56",
          title: t.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          mpImgUrl: t.mpMergedImg || n.shareSkuImgUrl || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          path: "/pages/bargain-t/detail/index?unionCode=" + n.unionCode + "&activityId=" + n.activityId + "&skuId=" + n.skuId + "&storeId=" + n.storeId + "&orgCode=" + n.orgCode,
          imgUrl: n.shareSkuImgUrl || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          desc: t.mpShareTitle || "帮我点下好嘛？全场商品你也可以免费拿！",
          shareUrl: a,
          pyqImg: t.mpMergedImg || n.shareSkuImgUrl || "https://storage.360buyimg.com/wximg/bargain-t/bargainShareCard.png",
          channel: "Wxfriends",
          callback: "cashShareCallBack",
          clickcallback: "cashShareCallBack"
        };
        (0, _indexWeapp4.openShare)(e);
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
    key: "jumpItemList",
    value: function (e, t) {
      t.stopPropagation();
      t = this.props.changeTab, e = {
        skuId: e.skuId,
        activityId: e.activityId,
        activeState: e.state
      };
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickSku",
        click_par: e
      }), t(1);
    }
  }, {
    key: "jumpStore",
    value: function (e, t) {
      t.stopPropagation();
      t = {
        skuId: e.skuId,
        activityId: e.activityId,
        activeState: e.state
      };
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickSku",
        click_par: t
      }), (0, _indexWeapp3.jump)({
        to: "store",
        params: {
          storeId: e.storeId || "",
          orgCode: e.orgCode || "",
          addCart: !0,
          needAddCar: !0,
          needAddCart: 1,
          isAddCart: !0,
          skuId: e.skuId || "",
          needAnchorSku: !0
        }
      });
    }
  }, {
    key: "onShareWx",
    value: function (e, t) {
      t.stopPropagation(), this.props.onShowSubscribe && this.props.onShowSubscribe(e);
      e = {
        skuId: e.skuId,
        activityId: e.activityId,
        activeState: e.state
      };
      (0, _indexWeapp.clickReport)({
        create_time: new Date(),
        click_id: "clickSku",
        click_par: e
      });
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__60"),
          n = (0, _index.genCompid)(e + "$compid__61"),
          a = this.__props,
          r = a.item,
          i = void 0 === r ? {} : r,
          o = a.index,
          s = a.backgroundColor,
          c = a.getMyCutGoodsLitInfo,
          u = "myBargainGoodsLine" + o,
          p = i && 0 == i.state ? (0, _index.internal_inline_style)({
        color: s
      }) : null,
          e = 0 == i.state ? (0, _index.internal_inline_style)({
        background: s
      }) : null,
          r = 4 == i.state || 2 == i.state ? (0, _index.internal_inline_style)({
        background: s
      }) : null,
          a = 3 == i.state ? (0, _index.internal_inline_style)({
        background: "#FFC91C"
      }) : null,
          o = 1 == i.state ? (0, _index.internal_inline_style)({
        background: s
      }) : null;
      return 0 == i.state && _index.propsManager.set({
        item: i,
        getMyCutGoodsLitInfo: c
      }, t), 0 == i.state && _index.propsManager.set({
        item: i,
        backgroundColor: s
      }, n), Object.assign(this.__state, {
        anonymousState__temp: u,
        anonymousState__temp2: p,
        anonymousState__temp3: e,
        anonymousState__temp4: r,
        anonymousState__temp5: a,
        anonymousState__temp6: o,
        $compid__60: t,
        $compid__61: n,
        style: _indexModuleLessMap2.default,
        item: i
      }), this.__state;
    }
  }]), i;
}(), _class.$$events = ["jumpLaunchDetail", "onShareWx", "jumpItemList", "jumpStore"], _class.$$componentPath = "pages/bargain-t/components/myBargainGoods/index", _temp2);
exports.default = MyBargainGoods, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(MyBargainGoods));