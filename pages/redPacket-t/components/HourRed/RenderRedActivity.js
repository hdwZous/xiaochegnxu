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

var isWeapp = !0,
    RenderRedActivity = (_temp2 = _class = function () {
  function i() {
    var e, t;

    _classCallCheck(this, i);

    for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];

    return (e = t = _possibleConstructorReturn(this, (e = i.__proto__ || Object.getPrototypeOf(i)).call.apply(e, [this].concat(r)))).$usedState = ["anonymousState__temp", "loopArray30", "styles", "sceneList"], t.customComponents = [], _possibleConstructorReturn(t, e);
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
      var e = this.__props,
          t = e.sceneList,
          n = void 0 === t ? [] : t,
          t = e.redPackageStyleUrl,
          r = void 0 === t ? "https://storage.360buyimg.com/wxmini/redpacket/lrred.png" : t;
      (0, _index.useEffect)(function () {
        wx.createSelectorQuery().select("#red_box").boundingClientRect(function (e) {
          e && e.scrollLeft && n.map(function (e, t) {
            1 == e.state && (red_box.scrollLeft = 60 * t);
          });
        }).exec();
      }, []), this.anonymousFunc0 = function () {
        (0, _indexWeapp.clickReport)({
          create_time: new Date(),
          click_id: "clickCard"
        });
      };
      e = (0, _index.internal_inline_style)({
        justifyContent: 4 < n.length ? "left" : "space-around"
      }), t = n.map(function (e, t) {
        return e = {
          $original: (0, _index.internal_get_original)(e)
        }, {
          $loopState__temp3: t < n.length - 1 ? (0, _index.internal_inline_style)({
            width: 78 / n.length + "vw",
            right: "-" + 78 / n.length + "vw"
          }) : null,
          $loopState__temp5: (0, _index.internal_inline_style)({
            backgroundImage: "url(" + r + ") ",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            opacity: 2 === e.$original.state ? .49 : .78
          }),
          $loopState__temp7: function (e) {
            var t = "";

            switch (e) {
              case 0:
                t = "待开启";
                break;

              case 1:
                t = "进行中";
                break;

              case 2:
                t = "已结束";
            }

            return t;
          }(e.$original.state),
          $loopState__temp9: function (e) {
            var t = "";

            switch (e) {
              case 0:
                t = "元";
                break;

              case 1:
                t = "折";
                break;

              case 2:
                t = "鲜豆";
            }

            return t;
          }(e.$original.maxValueUnit),
          $original: e.$original
        };
      });
      return Object.assign(this.__state, {
        anonymousState__temp: e,
        loopArray30: t,
        styles: _indexModuleLessMap2.default,
        sceneList: n
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }]), i;
}(), _class.$$events = ["anonymousFunc0"], _class.$$componentPath = "pages/redPacket-t/components/HourRed/RenderRedActivity", _temp2);
exports.default = RenderRedActivity, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(RenderRedActivity));