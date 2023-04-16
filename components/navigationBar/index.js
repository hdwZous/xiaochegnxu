Component({
  /**
     * 组件的属性列表
     */
  properties: {
    bgColor: {
      type: String,
      value: '#47b34f',
      observer(newval){
        this.setNavigationBarColor(newval)
      }
    },
    color: {
      type: String,
      value: 'white'
    },
    navTitle: {
      type: String,
      value: '京东到家'
    },
    homeUrl: {
      type: String,
      value: '/pages/home/home'
    },
    navigateType: {
      type: String,
      value: 'switchTab'
    },
    preventBack: {
      type: Boolean,
      value: false
    },
    backing: {
      type: Boolean,
      value: false
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    compatible: false,
    showBack: false,
    showHome: false,
    statusBarHeight: 0,
    titleBarHeight: 46
  },

  /**
     * 组件的方法列表
     */
  methods: {
    //导航标题背景色为白色时 图标为黑 ，反之亦然
    setNavigationBarColor(newval) {
      if (newval === '#FFF' || newval === '#fff' || newval === '#ffffff' || newval === '#FFFFFF' || newval === 'white') {
        wx.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#ffffff"
        })
      } else if (newval === '#000000' || newval === '#000000' || newval === 'black') {
        wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#000000"
        })
      }
    },
    goBack() {
      if (!this.data.backing) {
        this.data.backing = true
        if (!this.data.preventBack) {
          wx.navigateBack()
        }
        this.triggerEvent('navEvent', {
          type: 'back',
          data: {}
        })
        setTimeout(()=>{
          this.data.backing = false
        },200)
      }
    },

    goHome() {
      if (!this.data.navigateType) {
        this.data.navigateType = 'switchTab'
      }
      wx[`${this.data.navigateType}`]({
        url: this.data.homeUrl,
        preObj: this.data.buriedObj
      })
      this.triggerEvent('navEvent', {
        type: 'home',
        data: {}
      })
    },
    /**
         * 判断是否兼容，微信7.0.0+才支持页面自定义标题
         * @param version
         * @returns {boolean}
         */
    isCompatible(v1, v2) {
      v1 = v1.split('.')
      v2 = v2.split('.')
      const len = Math.max(v1.length, v2.length)
      while (v1.length < len) {
        v1.push('0')
      }
      while (v2.length < len) {
        v2.push('0')
      }
      for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i])
        const num2 = parseInt(v2[i])
        if (num1 > num2) {
          return 1
        } else if (num1 < num2) {
          return -1
        }
      }
      return 0;
    },
    showHomeOrBack() {
      let pages = getCurrentPages()
      if (pages.length === 1) {
        this.setData({
          showHome: true
        })
      } else if (pages.length > 1) {
        this.setData({
          showBack: true
        })
      }
    }

  },
  lifetimes: {
    attached() {
      let {version, statusBarHeight = 0} = wx.getSystemInfoSync()
      let compatible = this.isCompatible(version, "7.0.0")
      //不兼容时
      if (compatible < 0) {
        this.setData({compatible: false})
        return;
      }

      //兼容
      this.setData({compatible: true, statusBarHeight})
      //显示返回还是home
      this.showHomeOrBack()

    }

  }
});
