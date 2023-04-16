/* eslint-disable no-empty */
/* eslint-disable no-useless-escape */
/* eslint-disable no-prototype-builtins */

// 请求
import {
  request,
  FNIDS
} from "./api"
let util = {
  isJson (value) {
    try {
      if (typeof value == 'object' && value) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error(e)
      return false;
    }
  },
  getUUIDMD5 () {
    let app = getApp();
    let uuId = app.globalData.uuId;
    if (!uuId) {
      uuId = wx.getStorageSync("uuId");
    }
    if (!uuId) {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";
      uuId = s.join("");
      app.globalData.uuId = uuId;
      wx.setStorageSync("uuId", uuId);
    }
    return uuId;
  },
  getrandom () {
    let uuId;
    let s = [];
    let hexDigits = "0123456789abcdefghkhijklmn";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    uuId = s.join("");
    return uuId;
  },
  // 生成页面pageId
  getPageIdrandom () {
    let uuId;
    let s = [];
    let hexDigits = "0123456789abcdefghkhijklmn";
    for (var i = 0; i < 32; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    uuId = s.join("");
    return uuId;
  },
  /**
   *
   * @param url
   * @param fullPath  true全路径不用拼域名如 url:https://testpdjm.jd.com/activity/market/2018/game_618/index.html?channel=mp_home  false需要拼接域名如：/activity/market/2018/game_618/index.html?channel=mp_home
   * @returns {string}
   */
  mpThroughH5 (url, fullPath) {
    let urlPix = "https://" + getApp().globalData.config.HOST;
    let fixed = "&needPin=yes";
    let deviceId = wx.getStorageSync("uuId");
    let body = {
      returnLink: fullPath ? url : urlPix + url,
      fixedDomain: "appletLogin"
    };
    return (
      urlPix +
      "/honest?functionId=login/appThroughH5&body=" +
      encodeURIComponent(JSON.stringify(body)) +
      fixed +
      "&deviceId=" +
      deviceId
    );
  },

  mpThroughDada (url) {
    let urlPix = "https://" + getApp().globalData.config.HOST;
    let fixed = "&needPin=yes";
    let deviceId = wx.getStorageSync("uuId");
    let body = {
      returnLink: url
    };
    return (
      urlPix +
      "/client?functionId=login/appThroughDada&body=" +
      JSON.stringify(body) +
      fixed +
      "&deviceId=" +
      deviceId
    );
  },
  /**
   * 未登录的情况下 同步deviceid
   * @param {目标地址} url
   * @returns
   */
  mpSyncDeviceId (url) {
    let urlPix = "https://" + getApp().globalData.config.HOST;
    let fixed = "&needPin=yes";
    let deviceId = wx.getStorageSync("uuId");
    let body = {
      returnLink: url,
      fixedDomain: "appletLogin",
      deviceId: deviceId
    };
    return (
      urlPix +
      "/client?functionId=login/addCookie&body=" +
      encodeURIComponent(JSON.stringify(body)) +
      fixed +
      "&deviceId=" +
      deviceId
    );
  },

  /**
   * 是否登录
   */
  isLogin () {
    try {
      if (
        getApp().globalData.loginStateInfo &&
        getApp().globalData.loginStateInfo.o2o_m_h5_sid
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {}
  },
  /**
   *
   * @param times
   * @param cb
   * @param that
   * @param index
   * @returns {{timer: number, timeObj: {hour: string, minute: string, second: string, isOver: boolean}}
   */
  countDownList (times, cb, that, index) {
    let timer;
    clearInterval(timer);
    let timeObj = {
      hour: "00",
      minute: "00",
      second: "00",
      isOver: false
    };
    times = times / 1000;
    timer = setInterval(function () {
      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0; // 时间默认值
      if (times >= 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - day * 24;
        // hour = Math.floor(times / (60 * 60));
        minute = Math.floor(times / 60) - hour * 60 - day * 24 * 60;
        second =
          Math.floor(times) - hour * 60 * 60 - minute * 60 - day * 24 * 60 * 60;
      }
      if (day <= 9) day = "0" + day;
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;
      timeObj = {
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        timer: timer
      };
      cb && cb(timeObj, that, index);

      times--;
      if (times < 0 || timer == null) {
        timeObj = {
          hour: "00",
          minute: "00",
          second: "00",
          isOver: true
        };
        cb && cb(timeObj, that, index);
        clearInterval(timer);
      }
    }, 1000);
    if (times <= 0 || timer == null) {
      timeObj = {
        hour: "00",
        minute: "00",
        second: "00",
        isOver: true
      };
      cb && cb(timeObj, that, index);
      clearInterval(timer);
    }
  },

  /**
   * 是否是空对象
   */
  isEmptyObj (obj) {
    for (let i in obj) {
      return false;
    }
    return true;
  },
  // 非 h5,app分享单人聊天消息卡片，群聊卡片场景值 进入首页
  goHome () {
    let app = getApp();
    let page = getCurrentPages();
    // 小程序下拉的场景
    if (page.length == 1 && app.globalData.appScene === 1089) {
      return true;
    } else {
      return false;
    }
  },
  // 摇一摇
  shark (isShark, cb) {
    wx.onAccelerometerChange(function (e) {
      if (e.x > 0.1 && e.y > 0.1) {
        wx.showToast({
          title: "摇一摇成功",
          icon: "success",
          duration: 2000
        });
        // 回调
        cb();
      }
    });
  },
  formatTime (date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    return (
      [year, month, day].map(this.formatNumber).join("-") +
      " " +
      [hour, minute, second].map(this.formatNumber).join(":")
    );
  },
  // 2012-10-10 时间格式
  formatDate () {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    return (
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day)
    );
  },
  transLocalTime (t) {
    return new Date(t * 1000);
  },
  formatNumber (n) {
    n = n.toString();
    return n[1] ? n : "0" + n;
  },
  getQueryString (options) {
    var search = options.url || "";
    var c = new RegExp("(?:^|&|[?]|[/])" + options.name + "[=|:]([^&]*)");
    var d = c.exec(search);
    return d ? decodeURIComponent(d[1]) : "";
  },
  rpx2px (rpx) {
    var scale = 1;
    var px;
    try {
      var res = wx.getSystemInfoSync();
      scale = res.windowWidth / 750;
      px = scale * rpx;
    } catch (e) {}
    return px;
  },
  px2rpx (px) {
    var scale = 1;
    var rpx;
    try {
      var res = wx.getSystemInfoSync();
      scale = 750 / res.windowWidth;
      rpx = scale * px;
    } catch (e) {}
    return rpx;
  },
  coverTime (datestr) {
    datestr = datestr.replace(/\-/g, "/");
    var time = new Date(datestr);
    // var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    mm = mm < 10 ? "0" + mm : mm;
    // var s = time.getSeconds();
    // return y+'年'+m+'月'+d+'日 '+h+':'+mm;
    return m + "月" + d + "日 " + h + ":" + mm;
  },

  countDown (times, cb, that) {
    times = times / 1000;
    clearInterval(that.data.timer);
    that.data.timer = setInterval(function () {
      var day = 0;
      var hour = 0;
      var minute = 0;
      var second = 0; // 时间默认值
      if (times >= 0) {
        // day = Math.floor(times / (60 * 60 * 24));
        // hour = Math.floor(times / (60 * 60)) - (day * 24);
        hour = Math.floor(times / (60 * 60));
        minute = Math.floor(times / 60) - hour * 60;
        second = Math.floor(times) - hour * 60 * 60 - minute * 60;
      }
      if (day <= 9) day = "0" + day;
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;
      cb &&
        cb(
          {
            hour: hour,
            minute: minute,
            second: second
          },
          that
        );
      times--;
      if (times < 0 || that.data.timer == null) {
        cb &&
          cb(
            {
              isOver: true
            },
            that
          );
        clearInterval(that.data.timer);
      }
    }, 1000);
    if (times <= 0 || that.data.timer == null) {
      cb(
        {
          isOver: true
        },
        that
      );
      clearInterval(that.data.timer);
    }
  },

  /**
   * 自动计算图片高度
   * @param ra1 图片的高宽比
   * @param ra2 图片宽度占设备屏幕宽度 的百分比 ,不传默认100%
   * 返回的为单位为px
   */
  computeImgHeight (ra1, ra2, imageWidth) {
    let app = getApp();
    try {
      let percent = ra2 || 1;
      // 获取宽度
      let width =
          imageWidth ||
          (app.globalData.systemInfo &&
            app.globalData.systemInfo.windowWidth) ||
          wx.getSystemInfoSync().windowWidth;
      width = (width * percent).toFixed(2);
      let height = (width * ra1).toFixed(2);
      return {
        width,
        height
      };
    } catch (e) {
      return null;
    }
  },

  /**
   * 刷新首页
   */
  refreshHomePage (refresh) {
    let app = getApp();
    app.globalData.refreshHomeFlag = refresh == undefined ? true : refresh;
    // console.log('app.globalData.refreshHomeFlag=====' + app.globalData.refreshHomeFlag)
  },

  /**
   * 微信地理位置授权
   * @returns {Promise<any>}
   */
  getLocationByWX () {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success: function (res) {
          let app = getApp();
          app.globalData.gpsInfo = res;
          resolve(res);
        },
        fail: function (res) {
          reject(res);
        }
      });
    });
  },
  // 新倒计时
  newCountDown (times, callBack) {
    // 秒
    times = times / 1000;
    // 计时器
    let timer = setInterval(() => {
      let day = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - day * 24;
        minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
        second =
          Math.floor(times) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
      }
      // 小于10补0
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;
      // 回调
      if (times > 0) {
        callBack({
          day: day,
          hour: hour,
          minute: minute,
          second: second,
          timer: timer,
          end: false,
          times: times * 1000
        });
      } else {
        callBack({
          hour: "00",
          minute: "00",
          second: "00",
          timer: timer,
          end: true,
          times: 0
        });
      }
      times--;
    }, 1000);
  },
  // 新倒计时
  millisecondCountDown (times, callBack) {
    // 计时器
    let timer = setInterval(() => {
      let day = 0;
      let hour = 0;
      let minute = 0;
      let second = 0;
      let millisecond = 0;
      if (times > 0) {
        hour = Math.floor(times / 1000 / 60 / 60);
        minute = Math.floor((times / 1000 / 60) % 60);
        second = Math.floor((times / 1000) % 60);
        millisecond = Math.floor((times % 1000) / 100);
      }
      // 小于10补0
      if (hour <= 9) hour = "0" + hour;
      if (minute <= 9) minute = "0" + minute;
      if (second <= 9) second = "0" + second;
      // if (millisecond < 10) millisecond = "0" + millisecond;
      // 回调
      if (times > 0) {
        callBack({
          day: day,
          hour: hour,
          minute: minute,
          second: second,
          timer: timer,
          end: false,
          millisecond: millisecond
        });
      } else {
        callBack({
          hour: "00",
          minute: "00",
          second: "00",
          millisecond: "00",
          timer: timer,
          end: true
        });
      }
      times = times - 100;
    }, 100);
  },
  // 连续点击节流器
  throttle (fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1000;
    }

    let _lastTime = null;

    // 返回新的函数
    return function () {
      let _nowTime = +new Date();
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments); // 将this和参数传给原函数
        _lastTime = _nowTime;
      }
    };
  },
  // 函数防抖
  debounce (fn, delay) {
    var timeout = null;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(this, arguments);
      }, delay);
    };
  },
  /**
   * 根据手机dpr处理图片尺寸
   * @param width 页面实际展示的宽度
   * @param height 页面实际展示的高度
   * @param URL 图片地址
   */
  dealImgUrl (width, height, url) {
    let urlArr = url && url.indexOf("/") > -1 ? url.split("/") : [];
    if (urlArr.length && url.indexOf(".gif") < 0) {
      let globalData = getApp().globalData;
      let dpr =
        (globalData.systemInfo && globalData.systemInfo.pixelRatio) || 2;
      let newArr =
        urlArr.length > 0 &&
        urlArr.map((item) => {
          if (item.indexOf("jfs") > -1) {
            if (dpr < 2) {
              item = `s${Math.floor(width)}x${Math.floor(height)}_jfs`;
            } else {
              item = `s${Math.floor(width * 2)}x${Math.floor(height * 2)}_jfs`;
            }
          }
          if (item.indexOf("g14") > -1) {
            if (dpr < 2) {
              item = `s${Math.floor(width)}x${Math.floor(height)}_g14`;
            } else {
              item = `s${Math.floor(width * 2)}x${Math.floor(height * 2)}_g14`;
            }
          }
          return item;
        });
      return newArr.join("/");
    } else {
      return url;
    }
  },
  // url地址转成字典对象
  parseUrlParam (url) {
    const paramsStr = url.startsWith("http") ? /.+\?(.+)$/.exec(url)[1] : url; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split("&"); // 将字符串以 & 分割后存到数组中
    let paramsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach((param) => {
      if (/=/.test(param)) {
        // 处理有 value 的参数
        let [key, val] = param.split("="); // 分割 key 和 value
        val = decodeURIComponent(val); // 解码
        val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

        if (paramsObj.hasOwnProperty(key)) {
          // 如果对象有 key，则添加一个值
          paramsObj[key] = [].concat(paramsObj[key], val);
        } else {
          // 如果对象没有这个 key，创建 key 并设置值
          paramsObj[key] = val;
        }
      } else {
        // 处理没有 value 的参数
        paramsObj[param] = true;
      }
    });
    return paramsObj;
  },
  // 判断是否是今天  true 今天 false 不是
  isToday () {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let currentDate = wx.getStorageSync("current_date");
    if (!currentDate) {
      wx.setStorageSync("current_date", `${year}-${month}-${day}`);
    }
    if (currentDate == `${year}-${month}-${day}`) {
      return true;
    } else {
      wx.setStorageSync("current_date", `${year}-${month}-${day}`);
      return false;
    }
  },
  // 获取小程序的路径
  getCurrentPageUrl () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const url = currentPage && `/${currentPage.route}`;
    return url;
  },
  // 获取小程序的路径和参数
  getCurrentPageUrlWithArgs () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    const url = currentPage.route;
    const options = currentPage.options;
    let urlWithArgs = `/${url}?`;
    for (let key in options) {
      const value = options[key];
      urlWithArgs += `${key}=${value}&`;
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
    return urlWithArgs;
  },
  /**
   * @description: 获取前一页面
   * @returns {Object} 当前页面Page对象
   */
  getPrevPage () {
    const curPages = getCurrentPages();
    if (curPages.length > 1) {
      return curPages[curPages.length - 2];
    }
    return {};
  },
  // 获取自定义导航栏高度
  getCapsule () {
    let app = getApp();
    let sysInfo = wx.getSystemInfoSync() || {};
    let { windowWidth, statusBarHeight } = sysInfo;
    // 优先取全局
    let globalCapsule = app.globalData.capsule || {};
    let capsule;
    if (!globalCapsule.height) {
      capsule = globalCapsule;
    } else {
      try {
        // 全局取不到的自己获取
        let capsuleNew =
          (wx.getMenuButtonBoundingClientRect &&
            wx.getMenuButtonBoundingClientRect()) ||
          {};
        if (capsuleNew.height) {
          app.globalData.capsule = capsuleNew;
          capsule = capsuleNew;
        } else {
          // 获取不到走默认
          let width = 87;
          let height = 32; // 假设胶囊默认宽高
          let left = windowWidth - (width + 10); //  (10 + width + 10 )为胶囊左右边距
          let right = windowWidth - 10;
          let top = statusBarHeight + 4;
          let bottom = statusBarHeight + 4 + height; //
          capsule = {
            width,
            height,
            left,
            top,
            right,
            bottom
          };
        }
      } catch (e) {
        // 获取不到走默认
        let width = 87;
        let height = 32; // 假设胶囊默认宽高
        let left = windowWidth - (width + 10); //  (10 + width + 10 )为胶囊左右边距
        let right = windowWidth - 10;
        let top = statusBarHeight + 4;
        let bottom = statusBarHeight + 4 + height; //
        capsule = {
          width,
          height,
          left,
          top,
          right,
          bottom
        };
      }
    }

    if (!capsule.top) {
      capsule.top = statusBarHeight + 4;
    }
    if (!capsule.height) {
      capsule.height = 32;
    }
    if (!capsule.width) {
      capsule.width = 87;
    }
    if (!capsule.left) {
      capsule.left = windowWidth - (capsule.width + 10);
    }
    if (!capsule.right) {
      capsule.right = windowWidth - 10;
    }
    if (!capsule.bottom) {
      capsule.bottom = statusBarHeight + 4 + capsule.height;
    }
    return capsule;
  },
  /**
   * 判断是否兼容，微信7.0.0+才支持页面自定义标题
   * @param version
   * @returns {boolean}
   */
  isCompatible () {
    let sysInfo = wx.getSystemInfoSync() || {};
    let v1 = sysInfo.version;
    let v2 = "7.0.0";
    v1 = v1.split(".");
    v2 = v2.split(".");
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
      v1.push("0");
    }
    while (v2.length < len) {
      v2.push("0");
    }
    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i]);
      const num2 = parseInt(v2[i]);
      if (num1 > num2) {
        return 1;
      } else if (num1 < num2) {
        return -1;
      }
    }
    return 0;
  },
  // 订阅消息判断用户是否点击过总是允许按钮，点过总是允许按钮的话，调取订阅接口不会弹窗
  async judgeAllowBtn (tmIds) {
    return new Promise((resolve) => {
      wx.getSetting({
        withSubscriptions: true,
        success (res) {
          // console.log(res.subscriptionsSetting, 'res.subscriptionsSetting')
          let setting = res.subscriptionsSetting;
          if (setting.mainSwitch == false) {
            // 假如用户将接收按钮置为false则完全不能发起订阅
            resolve(null);
          }
          if (setting.mainSwitch == true) {
            let itemSettings = setting.itemSettings || null;
            // console.log(itemSettings, 'itemSettings')
            if (itemSettings) {
              let flag = true;
              tmIds.forEach((item) => {
                if (itemSettings[item] == undefined) {
                  flag = false;
                }
              });
              if (flag) resolve(true);
            }
          }
          resolve(false);
        }
      });
    });
  },
  // 通过弹层类型获取相应的key
  getKeyByPopUpType (popupType, limitRules, orgCode, storeId) {
    let popKey = "";
    limitRules.forEach((item) => {
      if (item.popupType == popupType) {
        if (item.latType == 1) {
          popKey = `${popupType}_${item.latType}`;
        } else if (item.latType == 2) {
          popKey = `${popupType}_${item.latType}_${orgCode}`;
        } else if (item.latType == 3) {
          popKey = `${popupType}_${item.latType}_${storeId}`;
        }
      }
    });
    return popKey;
  },
  getPopUpItemByPopType (popUpType, rules = []) {
    let result = null;
    rules.forEach((item) => {
      if (item.popupType == popUpType) {
        result = item;
      }
    });
    return result;
  },
  // 给定两个时间戳，查看相差多少小时
  computeTime (time1, time2) {
    let ms = time1 - time2;
    if (ms < 0) return 0;
    return Math.floor(ms / 1000 / 60 / 60);
  },
  findPopUpTypes (rules = []) {
    let popupArr = [];
    rules.forEach((item) => {
      if (item.popupType != 1) {
        popupArr.push(item.popupType);
      }
    });
    return popupArr;
  },
  // 未登录跳转登录
  toLogin (preObj = {}) {
    wx.navigateTo({
      url: `/pages/newLogin/login/login`,
      preObj: preObj
    });
  },
  // 储存定位公共方法
  saveAddressPoi (addressInfo) {
    const { functionId, appVersion } = FNIDS.getJdLocation
    if (addressInfo && addressInfo.longitude && addressInfo.latitude) {
      try {
        request({
          functionId,
          method: 'POST',
          appVersion,
          isNeedDealError: true,
          body: {
            longitude: addressInfo.longitude,
            latitude: addressInfo.latitude
          }
        }).then(res => {
          const { data } = res
          // 获取成功
          if(data.code == 0) {
            const { provinceId = 0, cityId = 0, districtId = 0, townId = 0} = data.result
            addressInfo.area = `${provinceId}_${cityId}_${districtId}_${townId}`
            wx.setStorageSync('address_info', addressInfo);
          } else { // 获取失败
            console.log(res.data.msg);
            wx.setStorageSync('address_info', addressInfo);
          }
        }).catch(err => {
          console.log(err)
          wx.setStorageSync('address_info', addressInfo);
        })
      } catch (error) {
        wx.setStorageSync('address_info', addressInfo);
      }
    } else {
      wx.setStorageSync('address_info', addressInfo);
    }
  }
};

export default util

