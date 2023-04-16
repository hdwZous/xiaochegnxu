Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(vals) {
        if (vals) {
          this.countdown()
        } else {
          this.data.timers && clearInterval(this.data.timers)
        }
      }
    }
  },

  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 5,
    timers: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    countdown() {
      this.data.timers = setInterval(() => {
        let count = this.data.count
        count -= 1
        this.setData({
          count
        }, () => {
          if (count <= 0) {
            this.setData({
              show: false
            })
            this.data.timers && clearInterval(this.data.timers)
          }
        })
      }, 1000)
    }
  }
});
