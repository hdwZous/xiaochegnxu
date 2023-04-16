Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: String,
      value: '',
      observer(news) {
        if (news && news.length) {
          this.showCountDown(Number(news))
        }
      }
    },
  },

  options: {
    addGlobalClass: true,
  },

  detached() {
    this.clearInterval()
  },

  /**
   * 组件的初始数据
   */
  data: {
    hour: '00',
    minute: '00',
    second: '00',
    timer: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 倒计时
    showCountDown(time) {
      if (time > 0) {
        this.countDown(time, res => {
          if (res.end) {
            this.setData({
              hour: '00',
              minute: '00',
              second: '00'
            });
            wx.showToast({
              title: '很遗憾您的优惠券已过期，系统已为您重新选择最优券～',
              icon: 'none',
              duration: 1500
            });
            this.triggerEvent('downover')
            this.clearInterval();
            return;
          }
          // 更新时间
          this.setData({
            hour: res.hour,
            minute: res.minute,
            second: res.second
          });
        })
      } else {
        this.setData({
          hour: '00',
          minute: '00',
          second: '00'
        })
      }
    },
    countDown(times, callBack) {
      times = times / 1000
      // 计时器
      clearInterval(this.data.timer)
      this.data.timer = setInterval(() => {
        let hour = 0,
          minute = 0,
          second = 0;
        if (times > 0) {
          hour = Math.floor(times / (60 * 60));
          minute = Math.floor(times / 60) - (hour * 60);
          second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
        }
        // 小于10补0
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        // 回调
        if (times > 0) {
          callBack({
            hour: hour + '',
            minute: minute + '',
            second: second + '',
            end: false
          })
        } else {
          callBack({
            hour: '00',
            minute: '00',
            second: '00',
            end: true
          })
        }
        times--;
      }, 1000)
    },
    // 清除计时器
    clearInterval() {
        clearInterval(this.data.timer)
        this.data.timer = null
    }
  }
});
