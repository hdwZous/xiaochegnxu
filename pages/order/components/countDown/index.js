Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: String,
      value: '',
      observer: () => {
      }
    },
    type: {
      type: Number,
      value: 1
    },
    initStyle: {
      type: Object,
      value: {},
      observer: () => {
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    day: '00',
    hour: "00",
    minute: "00",
    seconds: "00"
  },
  lifetimes: {
    attached: function () {
      this.countDown(String(this.data.initData))
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    countDown(times) {
      times = times / 1000;
      clearInterval(this.data.timer);
      this.data.timer = setInterval(() => {
        var day = 0,
          hour = 0,
          minute = 0,
          second = 0; //时间默认值
        if (times >= 0) {
          day = Math.floor(times / (60 * 60 * 24));
          hour = Math.floor(times / (60 * 60)) - (day * 24);
          minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
          second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        // if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        this.setData({
          day: day,
          hour: hour,
          minute: minute,
          seconds: second
        })
        times--;
        if (times < 0 || this.data.timer == null) {
          this.triggerEvent("timeendCallback")
          clearInterval(this.data.timer);
        }
      }, 1000);
      if (times <= 0 || this.data.timer == null) {
        clearInterval(this.data.timer);
      }
    },
  }
})
