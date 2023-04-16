let timer = null;
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          if (val.countDown < 86400000 && val.countDown) {
            val.showCountDown = true;
            this.showCountDown(val.countDown);
          } else {
            val.showCountDown = false;
          }
          if (val.price.indexOf(".") > -1) {
            val.uperPrice = val.price.split(".")[0];
            val.lowPrice = val.price.split(".")[1];
          }
          this.setData({
            info: val,
          });
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {},
    countDownStr: "00:00:00",
    hideTime: "",
    flag: true,
    restTime: "",
  },
  /**
   * 在组件实例被从页面节点树移除时执行
   */
  lifetimes: {
    detached: function () {
      this.clearInterval();
    },
  },
  pageLifetimes: {
    show() {
      // 判断是否有压后台的操作，如果hideTime有值，说明是从后台压到前台的
      // restTime有值说明倒计时不为0，还能继续倒计时
      try {
        if (this.data.hideTime && this.data.restTime) {
          // 获取当前时间
          let showTime = Date.now();
          // 这个value就是压后台，在后台运行的时长
          let value = showTime - this.data.hideTime;
          if (value > 0) {
            // flag是判断是否重新给timer赋值为新的interval的timer的开关，所以得重置为true
            this.data.flag = true;
            // 将压后台的这个hideTime重置为初始状态
            this.data.hideTime = "";
            // 将倒计时在压后台那一刻还剩多少时间-压后台停留在后台的时间就是真正还剩余多少时间
            let restCountDownTime = parseInt(this.data.restTime - value) || 0;
            this.showCountDown(restCountDownTime);
          }
        }
      } catch (error) {
        console.log(e)
      }
    },
    hide() {
      // 压后台后，倒计时过一段时间会停止运行，导致压到前台后倒计时不准
      // 在hide时将压后台时间存起来，并停止倒计时执行
      this.data.hideTime = Date.now();
      this.clearInterval();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 展示倒计时
    showCountDown(time) {
      // let flag = true;
      if (time > 0) {
        this.countDown(time, (res) => {
          if (res.end) {
            this.setData({
              countDownStr: "00:00:00",
            });
            this.clearInterval();
            this.data.restTime = "";
            return;
          }
          let countDownStr = "";
          if (res.day) {
            countDownStr =
              res.day +
              "天" +
              res.hour +
              "小时" +
              res.minute +
              "分钟" +
              res.second +
              "秒后失效";
          } else {
            countDownStr =
              res.hour + "小时" + res.minute + "分钟" + res.second + "秒后失效";
          }
          // 更新时间
          this.setData({
            countDownStr: countDownStr,
          });
          if (this.data.flag) {
            timer = res.timer;
            this.data.flag = false;
          }
        });
      } else {
        this.data.restTime = ""
        this.setData({
          countDownStr: "00:00:00",
        });
      }
    },
    countDown(times, callBack) {
      // 秒
      times = times / 1000;
      // 计时器
      let timer = setInterval(() => {
        let day = 0,
          hour = 0,
          minute = 0,
          second = 0;
        if (times > 0) {
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - day * 24;
          minute = Math.floor(times / 60) - day * 24 * 60 - hour * 60;
          second =
            Math.floor(times) -
            day * 24 * 60 * 60 -
            hour * 60 * 60 -
            minute * 60;
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
          });
        } else {
          callBack({
            hour: "00",
            minute: "00",
            second: "00",
            timer: timer,
            end: true,
          });
        }
        times--;
        this.data.restTime = (times - 1) * 1000;
      }, 1000);
    },
    // 清除计时器
    clearInterval() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    },
  },
});
