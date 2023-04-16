"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _class,
    _temp2,
    _extends = Object.assign || function (t) {
  for (var e = 1; e < arguments.length; e++) {
    var n,
        i = arguments[e];

    for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
  }

  return t;
},
    _createClass = function () {
  function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
    }
  }

  return function (t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  };
}(),
    _get = function t(e, n, i) {
  null === e && (e = Function.prototype);
  var r = Object.getOwnPropertyDescriptor(e, n);

  if (void 0 !== r) {
    if ("value" in r) return r.value;
    r = r.get;
    return void 0 !== r ? r.call(i) : void 0;
  }

  e = Object.getPrototypeOf(e);
  if (null !== e) return t(e, n, i);
},
    _index = require("../../npm/@tarojs/taro-weapp/index.js"),
    _index2 = _interopRequireDefault(_index);

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

var SwiperScale = (_temp2 = _class = function () {
  function r() {
    var t, f;

    _classCallCheck(this, r);

    for (var e = arguments.length, n = Array(e), i = 0; i < e; i++) n[i] = arguments[i];

    return (t = f = _possibleConstructorReturn(this, (t = r.__proto__ || Object.getPrototypeOf(r)).call.apply(t, [this].concat(n)))).$usedState = ["loopArray25", "nowScene", "sceneEntityList", "currentIndex", "config5", "imgs", "lightIndex"], f.prev = function () {
      var t = f.state,
          e = t.config5,
          t = (t.imgs, f.props.sceneEntityList);
      e.push(e.shift()), f.setState({
        config5: e
      }), f.currentIndex = f.currentIndex - 1, f.currentIndex < 0 && (f.currentIndex = t.length - 1), f.centerIndex("prev");
    }, f.next = function () {
      var t = f.props.sceneEntityList,
          e = f.state,
          n = e.config5;
      e.imgs;
      n.unshift(n.pop()), f.setState({
        config5: n
      }), f.currentIndex = f.currentIndex + 1, f.currentIndex > t.length - 1 && (f.currentIndex = 0), f.centerIndex("next");
    }, f.start = function (t) {
      f.startX = t.touches[0].clientX, f.startY = t.touches[0].clientY;
    }, f.move = function (t) {
      f.endY = t.touches[0].clientY, f.endX = t.touches[0].clientX, f.stopDefault(t);
    }, f.end = function (t) {
      f.interval = f.endX - f.startX, 40 < f.interval && (f.startX = f.endX, f.prev()), f.interval < -40 && (f.startX = f.endX, f.next());
    }, f.stopDefault = function (t) {
      var e = f.endY - f.startY,
          n = f.endX - f.startX;
      Math.abs(n) > Math.abs(e) && t.preventDefault();
    }, f.centerIndex = function (t) {
      var e = f.props.sceneEntityList;
      f.state.imgs;

      if ("prev" == t) {
        var n = !0,
            i = !1,
            r = void 0;

        try {
          for (var o, s = e[Symbol.iterator](); !(n = (o = s.next()).done); n = !0) {
            var a = o.value;
            a.index == e.length - 1 ? a.index = 0 : a.index = a.index + 1;
          }
        } catch (t) {
          i = !0, r = t;
        } finally {
          try {
            !n && s.return && s.return();
          } finally {
            if (i) throw r;
          }
        }
      } else {
        var c = !0,
            i = !1,
            r = void 0;

        try {
          for (var l, p = e[Symbol.iterator](); !(c = (l = p.next()).done); c = !0) {
            var u = l.value;
            0 == u.index ? u.index = e.length - 1 : u.index = u.index - 1;
          }
        } catch (t) {
          i = !0, r = t;
        } finally {
          try {
            !c && p.return && p.return();
          } finally {
            if (i) throw r;
          }
        }
      }
    }, f.moveToIndex = function (t) {
      for (var e = t - f.currentIndex, n = Math.abs(e), i = 0; i < n; i++) 0 < e && f.next(), e < 0 && f.prev();
    }, f.moveToCurrent = function () {
      var t = f.props.nowScene;
      t && f.moveToIndex(t.code);
    }, f.addCardStyle = function () {
      var t = f.props.sceneEntityList,
          e = f.state,
          n = e.config5;
      e.imgs;
      if (t.length < 7) for (var i = 7 - t.length, r = 0; r < i; r++) t.push(t[r + 1]);

      if (7 <= t.length) {
        for (var o = t.length - 7, s = 0; s < o; s++) n.push({
          id: "center",
          position: "absolute",
          width: "60%",
          height: "100%",
          top: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          transition: ".1s"
        });

        f.setState({
          config5: n,
          imgs: t
        }), console.log("sceneEntityList :>> ", t);
      }
    }, f.customComponents = ["Sprites"], _possibleConstructorReturn(f, t);
  }

  return _inherits(r, _index.Component), _createClass(r, [{
    key: "_constructor",
    value: function (t) {
      _get(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "_constructor", this).call(this, t), this.currentIndex = 3, this.centerInfo = "", this.startX = "", this.endX = "", this.previous = 0, this.state = {
        config5: [{
          position: "absolute",
          width: "22%",
          height: "72%",
          top: "15.2%",
          left: "-22%",
          opacity: 0,
          zIndex: 0
        }, {
          position: "absolute",
          width: "22%",
          height: "72%",
          top: "14%",
          left: "0%",
          opacity: 1,
          zIndex: 1
        }, {
          position: "absolute",
          width: "40%",
          height: "82%",
          top: "9%",
          left: "9%",
          opacity: 1,
          zIndex: 2
        }, {
          position: "absolute",
          width: "60%",
          height: "100%",
          top: "0px",
          left: "20%",
          opacity: 1,
          zIndex: 4
        }, {
          position: "absolute",
          width: "28%",
          height: "82%",
          top: "9%",
          left: "61.8%",
          opacity: 1,
          zIndex: 2
        }, {
          position: "absolute",
          width: "22%",
          height: "72%",
          top: "15.2%",
          left: "77%",
          opacity: 1,
          zIndex: 1
        }, {
          position: "absolute",
          width: "22%",
          height: "72%",
          top: "19.2%",
          left: "100%",
          opacity: 0,
          zIndex: 0
        }],
        imgs: t.sceneEntityList || []
      }, this.$$refs = [];
    }
  }, {
    key: "componentWillMount",
    value: function () {}
  }, {
    key: "componentDidMount",
    value: function () {
      this.props.sceneEntityList && this.setState({
        imgs: this.props.sceneEntityList
      }), this.addCardStyle(), this.moveToCurrent();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function (t) {
      var e = JSON.stringify(t.sceneEntityList),
          n = JSON.stringify(this.props.sceneEntityList);
      this.moveToCurrent(), e !== n && this.setState({
        imgs: t.sceneEntityList
      });
    }
  }, {
    key: "_createData",
    value: function () {
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var s = this.$prefix,
          t = this.currentIndex,
          e = this.__state,
          a = e.config5,
          e = (e.imgs, this.__props.sceneEntityList),
          c = void 0 === e ? [] : e,
          e = this.__props,
          l = e.lightIndex,
          p = e.nowScene;
      if (!p) return null;
      e = c && 0 < c.length ? c.map(function (t, e) {
        var n = (t = {
          $original: (0, _index.internal_get_original)(t)
        }).$original.code < 4 ? 4 : 9,
            i = t.$original.code == p.code ? l : "",
            r = !1;
        t.$original.fragmentList && t.$original.fragmentList.length < 1 && (r = !0, l && t.$original.code == p.code && (r = !1));
        var o = c && 0 < c.length ? (0, _index.internal_inline_style)(_extends({}, a[e], {
          backgroundImage: "url(" + t.$original.lightPic + ")"
        })) : null,
            e = (0, _index.genCompid)(s + "zjQpvsrHJA" + e);
        return r || _index.propsManager.set({
          item: t.$original,
          imgUrl: t.$original.lightPic,
          splitNum: n,
          lightIndex: i,
          lightArr: t.$original.fragmentList,
          isMask: r
        }, e), {
          splitNum: n,
          nowLightIndex: i,
          isMask: r,
          $loopState__temp2: o,
          $compid__80: e,
          $original: t.$original
        };
      }) : [];
      return Object.assign(this.__state, {
        loopArray25: e,
        nowScene: p,
        sceneEntityList: c,
        currentIndex: t
      }), this.__state;
    }
  }]), r;
}(), _class.$$events = ["end", "start", "move"], _class.$$componentPath = "pages/light-t/components/SwiperScale/index", _temp2);
exports.default = SwiperScale, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(SwiperScale));