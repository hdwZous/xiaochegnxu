"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _createClass = function () {
  function a(e, t) {
    for (var i = 0; i < t.length; i++) {
      var a = t[i];
      a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a);
    }
  }

  return function (e, t, i) {
    return t && a(e.prototype, t), i && a(e, i), e;
  };
}(),
    _get = function e(t, i, a) {
  null === t && (t = Function.prototype);
  var r = Object.getOwnPropertyDescriptor(t, i);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(a) : void 0;
  }

  t = Object.getPrototypeOf(t);
  if (null !== t) return e(t, i, a);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _index3 = require("../../utils/index.js");

function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];

    return i;
  }

  return Array.from(e);
}

function _asyncToGenerator(e) {
  return function () {
    var c = e.apply(this, arguments);
    return new Promise(function (n, o) {
      return function t(e, i) {
        try {
          var a = c[e](i),
              r = a.value;
        } catch (e) {
          return void o(e);
        }

        if (!a.done) return Promise.resolve(r).then(function (e) {
          t("next", e);
        }, function (e) {
          t("throw", e);
        });
        n(r);
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

var isWeapp = !0,
    RedPacket = (_temp2 = _class = function () {
  function n() {
    var e,
        o,
        i = this;

    _classCallCheck(this, n);

    for (var t = arguments.length, a = Array(t), r = 0; r < t; r++) a[r] = arguments[r];

    return (e = o = _possibleConstructorReturn(this, (e = n.__proto__ || Object.getPrototypeOf(n)).call.apply(e, [this].concat(a)))).$usedState = ["anonymousState__temp", "anonymousState__temp2", "$compid__69", "$compid__70", "$compid__71", "$compid__72", "$compid__73", "style", "isStart", "timerPlan", "clickRedPeacket", "clickArr", "doubleHitCount", "setoutCount", "isDoubleHitShow", "isPrizePopup", "closePage", "homeData", "onClickShare", "infoId", "leftChance", "sceneCode", "token", "openpacketRain", "playAgain"], o.closePage = function () {
      o.setState({
        closePage: !0
      }), o.props.openpacketRain();
    }, o.playAgain = function () {
      o.props.playAgain();
    }, o.startRedPacket = _asyncToGenerator(regeneratorRuntime.mark(function e() {
      var t;
      return regeneratorRuntime.wrap(function (e) {
        for (;;) switch (e.prev = e.next) {
          case 0:
            return e.next = 2, _index2.default.getSystemInfo();

          case 2:
            t = e.sent, o.width = t.screenWidth, o.height = t.screenHeight, o.setState({
              width: t.screenWidth,
              height: t.screenHeight
            }, function () {
              o.$scope.createSelectorQuery().select("#canvas").fields({
                node: !0,
                size: !0
              }).exec(o.initCanvas.bind(o));
            });

          case 6:
          case "end":
            return e.stop();
        }
      }, e, i);
    })), o.initCanvas = function (e) {
      o.dpr = _index2.default.getSystemInfoSync().pixelRatio;
      var t = e[0].width,
          i = e[0].height,
          e = e[0].node;
      o.ctx = e.getContext("2d"), e.width = t * o.dpr, e.height = i * o.dpr, o.ctx.scale(o.dpr, o.dpr), o.globalCanvas = e, o.redPacket(e);
    }, o.redPacket = function (t) {
      var i = o.props.homeData.matterDetail,
          a = o.createImage(i.redPackageStyleUrl),
          r = o.createImage(i.redPackageStyleYellowUrl),
          n = o.createImage("https://storage.360buyimg.com/wximg/redPacket/copper.png");
      o.redPacketHeight = o.height / 9, o.redPacketWidth = o.redPacketHeight / 87 * 64, (0, _index3.imgLoad)([a, r, n], function () {
        o.pushRedPackArr(a, r, n), o.moveRedPacked(t);
        var e = 100 / (1e3 * i.rainTime / 50);
        o.timeout = setInterval(function () {
          o.state.timerPlan < 100 ? o.setState({
            timerPlan: o.state.timerPlan += e
          }) : (clearTimeout(o.clearTime), clearTimeout(o.timeout));
        }, 50);
      });
    }, o.pushRedPackArr = function (e, t, i) {
      var a = o.createRedPack(e, t, i);
      o.packedArr.push(a);
      a = Math.floor(351 * Math.random() + 250);
      o.clearTime = setTimeout(function () {
        o.pushRedPackArr(e, t, i);
      }, a);
    }, o.limitWidth = function () {
      var t = Math.floor(Math.random() * (o.width - 64 - 28 - 28 + 1) + 28);
      return o.packedArr.slice(-5).forEach(function (e) {
        if (t > e.x - 64 - 30 && t < e.x + 30) return null;
      }), t;
    }, o.createRedPack = function (e, t, i) {
      var a = o.limitWidth();

      if (a) {
        var r = o.redPacketHeight / (o.height / o.redPacketHeight) * .6,
            n = parseInt(10 * Math.random() + 1);
        return {
          x: a,
          y: -75,
          speed: r,
          img: n < 4 ? t : n < 9 ? e : i,
          type: 9 <= n ? "copper" : null,
          width: 9 <= n ? 22.4 : o.redPacketWidth,
          height: 9 <= n ? 23.8 : o.redPacketHeight,
          maximal: !1
        };
      }
    }, o.moveRedPacked = function (e) {
      var t = o.height,
          i = o.width;
      o.ctx.clearRect(0, 0, i, t), o.drawRedPacked(t), o.state.timerPlan <= 100 && e.requestAnimationFrame(function () {
        return o.moveRedPacked(e);
      });
    }, o.drawRedPacked = function (i) {
      o.packedArr.forEach(function (e, t) {
        o.clickItem.includes(e) && ((e.width >= o.redPacketWidth || e.height >= o.redPacketHeight) && !e.maximal && (e.width *= 1.05, e.height *= 1.05, (e.width > 1.2 * o.redPacketWidth || e.height > 1.2 * o.redPacketHeight) && (e.maximal = !0)), (30 <= e.width || 37.5 <= e.height) && e.maximal && (e.width -= 3.6, e.height -= 4.8), (e.width < 30 || e.height < 37.5) && (e.width = 0, e.height = 0)), o.ctx.drawImage(e.img, e.x, parseInt(e.y), e.width, e.height), e.y > i ? "copper" === e.type || 0 == e.width && 0 == e.height || o.setState({
          doubleHitCount: 0
        }, function () {
          o.packedArr.splice(t, 1);
        }) : e.y += e.speed;
      });
    }, o.canvasHandle = function (e) {
      var a = e.changedTouches[0].x,
          r = e.changedTouches[0].y;
      o.packedArr.forEach(function (e) {
        var t = a - e.x,
            i = r - e.y;
        0 <= t && t <= 56 && -50 <= i && i <= 75 && "copper" !== e.type && (o.clickItem.includes(e) || (o.clickItem.push(e), o.setState({
          clickRedPeacket: o.state.clickRedPeacket + 1,
          doubleHitCount: o.state.doubleHitCount + 1,
          isDoubleHitShow: !0
        }, function () {
          o.setState({
            isDoubleHitShow: !1
          });
        })), o.createClick(a, r));
      });
    }, o.createClick = function (t, i) {
      var e,
          a = o.state.clickArr;
      5 < a.length ? (a.shift(), o.setState({
        clickArr: a
      }, function () {
        var e = [].concat(_toConsumableArray(a), [{
          x: t - 32,
          y: i - 34
        }]);
        o.setState({
          clickArr: e
        });
      })) : (e = [].concat(_toConsumableArray(a), [{
        x: t - 32,
        y: i - 34
      }]), o.setState({
        clickArr: e
      }));
    }, o.createImage = function (e) {
      var t = null;
      return (t = o.globalCanvas.createImage()).src = e, t;
    }, o.customComponents = ["Setout", "ClickHalo", "ProgressComp", "DoubleClick", "OpenRedPacket"], _possibleConstructorReturn(o, e);
  }

  return _inherits(n, _index.Component), _createClass(n, [{
    key: "_constructor",
    value: function (e) {
      _get(n.prototype.__proto__ || Object.getPrototypeOf(n.prototype), "_constructor", this).call(this, e), this.packedArr = [], this.packedWidthArr = [], this.copperArr = [], this.globalCanvas = null, this.timeout = null, this.startTimeout = null, this.clickItem = [], this.state = {
        timerPlan: 0,
        clickRedPeacket: 0,
        clickArr: [],
        doubleHitCount: 0,
        isStart: !1,
        setoutCount: 1,
        isDoubleHitShow: !1,
        isPrizePopup: !0,
        closePage: !1
      }, this.$$refs = [];
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var e = this.$prefix,
          t = (0, _index.genCompid)(e + "$compid__69"),
          i = (0, _index.genCompid)(e + "$compid__70"),
          a = (0, _index.genCompid)(e + "$compid__71"),
          r = (0, _index.genCompid)(e + "$compid__72"),
          n = (0, _index.genCompid)(e + "$compid__73"),
          o = this.__state,
          c = o.timerPlan,
          s = o.clickRedPeacket,
          l = o.width,
          u = o.height,
          d = o.clickArr,
          p = o.doubleHitCount,
          h = o.isStart,
          _ = o.isDoubleHitShow,
          e = o.setoutCount,
          o = o.closePage,
          o = (0, _index.internal_inline_style)({
        display: o ? "none" : null
      }),
          u = c < 100 ? (0, _index.internal_inline_style)({
        width: l + "px",
        height: u + "px"
      }) : null;
      return h || _index.propsManager.set({
        setoutCount: e
      }, t), h && _index.propsManager.set({
        clickArr: d
      }, i), h && _index.propsManager.set({
        clickRedPeacket: s,
        timerPlan: c,
        matterDetail: this.__props.homeData.matterDetail
      }, a), h && c < 100 && _index.propsManager.set({
        doubleHitCount: p,
        isDoubleHitShow: _
      }, r), 100 <= c && _index.propsManager.set({
        onClickShare: this.__props.onClickShare,
        infoId: this.__props.infoId,
        homeData: this.__props.homeData,
        closePage: this.closePage,
        playAgain: this.playAgain,
        leftChance: this.__props.leftChance,
        sceneCode: this.__props.sceneCode,
        clickRedPeacket: s,
        token: this.__props.token
      }, n), Object.assign(this.__state, {
        anonymousState__temp: o,
        anonymousState__temp2: u,
        $compid__69: t,
        $compid__70: i,
        $compid__71: a,
        $compid__72: r,
        $compid__73: n,
        style: _indexModuleLessMap2.default
      }), this.__state;
    }
  }, {
    key: "componentDidMount",
    value: function () {
      var e = this;
      this.startTimeout = setInterval(function () {
        e.setState({
          setoutCount: e.state.setoutCount + 1
        }, function () {
          3 < e.state.setoutCount && (clearInterval(e.startTimeout), e.setState({
            isStart: !0
          }, e.startRedPacket));
        });
      }, 1e3);
    }
  }, {
    key: "componentDidHide",
    value: function () {
      clearTimeout(this.clearTime);
    }
  }, {
    key: "componentDidShow",
    value: function () {
      var e = this.props.homeData.matterDetail,
          t = this.createImage(e.redPackageStyleUrl),
          i = this.createImage(e.redPackageStyleYellowUrl),
          e = this.createImage("https://storage.360buyimg.com/wximg/redPacket/copper.png");
      this.pushRedPackArr(t, i, e);
    }
  }]), n;
}(), _class.$$events = ["canvasHandle"], _class.$$componentPath = "pages/redPacket-t/pages/dotPacket/index", _temp2);
exports.default = RedPacket, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(RedPacket));