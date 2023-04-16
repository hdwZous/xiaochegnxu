/* eslint-disable   no-mixed-spaces-and-tabs*/
Component({
  options: {
    addGlobalClass: true
  },

  /**
     * 组件的属性列表
     */
  properties: {
    info: {
      type: Object,
      value: {},
      observer: function (obj) {
        if (obj.miaoshaRemainTime) {
          this.showCountDown(obj.miaoshaRemainTime)
        }
      }
    }
  },

  pageLifetimes: {
    hide () {
      this.data.timer && clearInterval(this.data.timer)
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    day: '00',
    hour: '00',
    minute: '00',
    second: '00'
  },

  /**
     * 组件的方法列表
     */
  methods: {
    /**
         * 展示倒计时
         * @param time 剩余时间（毫秒）
         * @param countDownStr 倒计时时间（key）
         * @param obj（当前对象）
         */
    showCountDown (time) {
      let flag = true;
      this.countDown(time, res => {
        if (res.end) {
          clearInterval(res.timer)
		  this.triggerEvent("timeEdnEvent", {
            type: "timeEnd"
		  });
        }
        this.setData({
          day: res.day || '',
          hour: res.hour || '',
          minute: res.minute || '',
          second: res.second || ''
        });
        if (flag) {
          this.setData({
            timer: res.timer
          });
          flag = false
        }
      })
    },
    /**
         * 计时器
         * @param times 剩余时间（毫秒）
         * @param callBack 回调函数
         */
    countDown (times, callBack) {
      // 秒
      times = times / 1000;
      const DAY = 60 * 60 * 24;
      const HOUR = 60 * 60;
      const MIN = 60;
      // 计时器
      let timer = setInterval(() => {
        let day = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;
        if (times > 0) {
          day = Math.floor(times / DAY);
          hour = Math.floor((times % DAY) / HOUR);
          minute = Math.floor((times % HOUR) / MIN);
          second = Math.floor(times % MIN);
        }
        // 小于10补0
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        // 回调
        if (times > 0) {
          callBack({
            day: day,
            hour: hour,
            minute: minute,
            second: second,
            timer: timer,
            end: false
          })
        } else {
          callBack({
            day: '',
            hour: '',
            minute: '',
            second: '',
            timer: timer,
            end: true
          })
        }
        times--;
      }, 1000)
    }
  }
})
