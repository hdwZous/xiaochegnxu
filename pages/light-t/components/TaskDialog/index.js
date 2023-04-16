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
    _indexWeapp = require("../../npm/@jd/djmp/common-t/js/jump/index.weapp.js"),
    _api = require("../../api.js"),
    _indexWeapp2 = require("../../npm/@jd/djmp/common-t/js/taroapi/index.weapp.js"),
    _indexWeapp3 = require("../../npm/@jd/djmp/common-t/js/bi/index.weapp.js"),
    _indexModuleLessMap = require("./index.module.less.map.js"),
    _indexModuleLessMap2 = _interopRequireDefault(_indexModuleLessMap),
    _indexWeapp4 = require("../../npm/@jd/djmp/common-t/js/location/index.weapp.js");

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

var TaskDialog = (_temp2 = _class = function () {
  function o() {
    var e, i;

    _classCallCheck(this, o);

    for (var t = arguments.length, n = Array(t), a = 0; a < t; a++) n[a] = arguments[a];

    return (e = i = _possibleConstructorReturn(this, (e = o.__proto__ || Object.getPrototypeOf(o)).call.apply(e, [this].concat(n)))).$usedState = ["anonymousState__temp3", "loopArray26", "style", "tasks", "infoId", "fetchData", "translateValue", "taskHalfUrl", "closeTaskDialog"], i.invite = function (e, t) {
      var n = i.props,
          n = (n.onClickShare, n.infoId);
      "h5" == t && i.props.onClickShare();
      n = {
        btnName: "立即邀请",
        taskId: e.taskUrl || "",
        infoId: n
      };
      (0, _indexWeapp3.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "clickTask",
        click_par: n
      });
    }, i.toStroll = function (e) {
      var t = i.props.infoId,
          t = {
        btnName: "去逛逛",
        taskId: e.taskUrl || "",
        infoId: t
      };
      (0, _indexWeapp3.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "clickTask",
        click_par: t
      }), i.toFinishTask(e), i.toJump(e);
    }, i.toJump = function (e) {
      0 == e.webType ? e.taskUrl ? (0, _indexWeapp.jump)({
        to: "activityDetail",
        params: {
          activityId: e.taskUrl
        }
      }) : (0, _indexWeapp.jump)({
        to: "home"
      }) : 1 == e.webType ? e.taskUrl ? i.jumpStore(e) : (0, _indexWeapp.jump)({
        to: "home"
      }) : 2 == e.webType && (0, _indexWeapp.jump)({
        to: "home"
      });
    }, i.toPlaceOrder = function (e) {
      var t = i.props.infoId,
          t = {
        btnName: "去下单",
        taskId: e.taskUrl || "",
        infoId: t
      };
      (0, _indexWeapp3.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "clickTask",
        click_par: t
      }), e.taskUrl ? (0, _indexWeapp.jump)({
        to: "activityDetail",
        params: {
          activityId: e.taskUrl
        }
      }) : (0, _indexWeapp.jump)({
        to: "home"
      });
    }, i.toFinishTask = function (e) {
      var t = i.props,
          n = t.fetchData,
          a = t.infoId,
          o = e.taskType || "",
          t = e.taskUrl || "";
      (0, _api.finishTask)({
        infoId: a,
        taskType: o,
        taskId: t
      }).then(function (e) {
        var t = e.code;
        e.result;
        0 == t ? ((0, _indexWeapp2.showToast)({
          title: "领取成功~"
        }), n()) : (e = e.msg, (0, _indexWeapp2.showToast)({
          title: void 0 === e ? '"网络错误，请稍后重试~' : e
        }));
      }).catch(function (e) {
        e = e.msg;
        (0, _indexWeapp2.showToast)({
          title: void 0 === e ? '"网络错误，请稍后重试~' : e
        });
      }), 2 != e.taskType && 4 != e.taskType || (a = {
        btnName: 2 == e.taskType ? "点击签到" : "去领取",
        taskId: e.taskUrl || "",
        infoId: a
      }, (0, _indexWeapp3.clickReport)({
        page_name: "lightenGame",
        create_time: new Date(),
        click_id: "clickTask",
        click_par: a
      }));
    }, i.anonymousFunc1Map = {}, i.anonymousFunc2Map = {}, i.anonymousFunc3Map = {}, i.anonymousFunc4Map = {}, i.anonymousFunc5Map = {}, i.customComponents = [], _possibleConstructorReturn(i, e);
  }

  return _inherits(o, _index.Component), _createClass(o, [{
    key: "_constructor",
    value: function (e) {
      _get(o.prototype.__proto__ || Object.getPrototypeOf(o.prototype), "_constructor", this).call(this, e), this.state = {}, this.$$refs = [];
    }
  }, {
    key: "componentDidMount",
    value: function () {
      _objectDestructuringEmpty(this.props);
    }
  }, {
    key: "jumpStore",
    value: function (n) {
      n ? (0, _indexWeapp4.getLocation)().then(function (e) {
        e = {
          lgt: e.longitude,
          lat: e.latitude,
          orgCode: n.taskUrl
        };
        (0, _api.getStationId)(e).then(function (e) {
          var t = e.code,
              e = e.result,
              e = void 0 === e ? {} : e;
          0 == t && e.stationNo ? (0, _indexWeapp.jump)({
            to: "store",
            params: {
              orgCode: n.taskUrl,
              storeId: e.stationNo
            }
          }) : n.taskSecondUrl ? (0, _indexWeapp.jump)({
            to: "activityDetail",
            params: {
              activityId: n.taskSecondUrl
            }
          }) : ((0, _indexWeapp.jump)({
            to: "home"
          }), console.log("附近无此商家门店，是否跳转首页"));
        }).catch(function (e) {
          n.taskSecondUrl ? (0, _indexWeapp.jump)({
            to: "activityDetail",
            params: {
              activityId: n.taskSecondUrl
            }
          }) : ((0, _indexWeapp.jump)({
            to: "home"
          }), console.log("附近无此商家门店，是否跳转首页"));
        });
      }).catch(function (e) {
        n.taskSecondUrl ? (0, _indexWeapp.jump)({
          to: "activityDetail",
          params: {
            activityId: n.taskSecondUrl
          }
        }) : ((0, _indexWeapp.jump)({
          to: "home"
        }), console.log("无位置是否跳转首页"));
      }) : n.taskSecondUrl ? (0, _indexWeapp.jump)({
        to: "activityDetail",
        params: {
          activityId: n.taskSecondUrl
        }
      }) : ((0, _indexWeapp.jump)({
        to: "home"
      }), console.log("无位置是否跳转首页"));
    }
  }, {
    key: "_createImageData",
    value: function (e) {
      return function (e) {
        var t = "",
            t = e.taskPicUrl || (1 == e.taskType ? "https://storage.360buyimg.com/wxmini/light/taskHelp.png?12" : 2 == e.taskType ? "https://storage.360buyimg.com/wxmini/light/taskSign.png?12" : 3 == e.taskType ? "https://storage.360buyimg.com/wxmini/light/taskVisit.png?12" : "https://storage.360buyimg.com/wxmini/light/taskPlaceOrder.png?12");
        return {
          style: _indexModuleLessMap2.default,
          taskPicUrl: t
        };
      };
    }
  }, {
    key: "onTouchMove",
    value: function (e) {
      return console.log(e), e.stopPropagation(), e.preventDefault(), !1;
    }
  }, {
    key: "_createData",
    value: function () {
      var s = this;
      this.__state = arguments[0] || this.state || {}, this.__props = arguments[1] || this.props || {};
      var p = this.$prefix,
          e = (this.__state.height, this.__props),
          t = e.translateValue,
          u = e.tasks,
          n = e.taskHalfUrl,
          a = e.closeTaskDialog,
          t = (0, _index.internal_inline_style)({
        transform: "translateY(" + t + ")",
        background: "url(" + n + ")",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      });

      this.anonymousFunc0 = function () {
        return a();
      };

      n = u && 0 < u.length ? u.map(function (e, t) {
        e = {
          $original: (0, _index.internal_get_original)(e)
        };
        var n = u && 0 < u.length ? s._createImageData(p + "UtEgTtjCQK" + t)(e.$original) : null,
            a = "VzrDB" + t;

        s.anonymousFunc1Map[a] = function () {
          return s.invite(e.$original, "weapp");
        };

        var o = "eITGt" + t;

        s.anonymousFunc2Map[o] = function () {
          return s.toFinishTask(e.$original);
        };

        var i = "ixnHE" + t;

        s.anonymousFunc3Map[i] = function () {
          return s.toStroll(e.$original);
        };

        var r = "MlPgx" + t;

        s.anonymousFunc4Map[r] = function () {
          return s.toPlaceOrder(e.$original);
        };

        t = "SgPVy" + t;
        return s.anonymousFunc5Map[t] = function () {
          return s.toFinishTask(e.$original);
        }, {
          $loopState__temp2: n,
          _$indexKey: a,
          _$indexKey2: o,
          _$indexKey3: i,
          _$indexKey4: r,
          _$indexKey5: t,
          $loopState__temp5: u && 0 < u.length && e.$original.taskViceTitle ? (0, _index.internal_inline_style)({
            "-webkit-box-orient": "vertical"
          }) : null,
          $original: e.$original
        };
      }) : [];
      return Object.assign(this.__state, {
        anonymousState__temp3: t,
        loopArray26: n,
        style: _indexModuleLessMap2.default,
        tasks: u
      }), this.__state;
    }
  }, {
    key: "anonymousFunc0",
    value: function (e) {}
  }, {
    key: "anonymousFunc1",
    value: function (e, t) {
      return this.anonymousFunc1Map[e] && this.anonymousFunc1Map[e](t);
    }
  }, {
    key: "anonymousFunc2",
    value: function (e, t) {
      return this.anonymousFunc2Map[e] && this.anonymousFunc2Map[e](t);
    }
  }, {
    key: "anonymousFunc3",
    value: function (e, t) {
      return this.anonymousFunc3Map[e] && this.anonymousFunc3Map[e](t);
    }
  }, {
    key: "anonymousFunc4",
    value: function (e, t) {
      return this.anonymousFunc4Map[e] && this.anonymousFunc4Map[e](t);
    }
  }, {
    key: "anonymousFunc5",
    value: function (e, t) {
      return this.anonymousFunc5Map[e] && this.anonymousFunc5Map[e](t);
    }
  }]), o;
}(), _class.$$events = ["anonymousFunc0", "anonymousFunc1", "anonymousFunc2", "anonymousFunc3", "anonymousFunc4", "anonymousFunc5"], _class.multipleSlots = !0, _class.$$componentPath = "pages/light-t/components/TaskDialog/index", _temp2);
exports.default = TaskDialog, Component(require("../../npm/@tarojs/taro-weapp/index.js").default.createComponent(TaskDialog));