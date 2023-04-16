Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    selector: '.countdown',
    epSelector: '.activity_comp_ep'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    },
    traceId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    }
  },

  observers: {
    'item': function (news) {
      if (news) {
        let datas = news.data[0]
        this.setData({
          datas
        })
        this.showCountDown(datas.timePoint - datas.currentTime)
      }
    }
  },

  /**
   * 在组件实例被从页面节点树移除时执行
   */
  detached: function () {
    this.clearInterval()
  },

  /**
   * 组件的初始数据
   */
  data: {
    day: '00',
    hour: '00',
    minute: '00',
    second: '00',
    datas: {},
    timer: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 展示倒计时
    showCountDown(time) {
      if (time > 0) {
        this.countDown(time, res => {
          if (res.end) {
            this.setData({
              day: '00',
              hour: '00',
              minute: '00',
              second: '00'
            });
            this.clearInterval();
            return;
          }
          // 更新时间
          this.setData({
            day: res.day,
            hour: res.hour,
            minute: res.minute,
            second: res.second
          });
        })
      } else {
        this.setData({
          day: '00',
          hour: '00',
          minute: '00',
          second: '00'
        })
      }
    },
    countDown(times, callBack) {
      // 秒
      times = times / 1000;
      // 计时器
      clearInterval(this.data.timer)
      this.data.timer = setInterval(() => {
        let day = 0,
          hour = 0,
          minute = 0,
          second = 0;
        if (times > 0) {
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - (day * 24);
          minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        // 小于10补0
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        // 回调
        if (times > 0) {
          callBack({
            day: day + '',
            hour: hour + '',
            minute: minute + '',
            second: second + '',
            end: false
          })
        } else {
          callBack({
            day: '00',
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
    },
  }
})