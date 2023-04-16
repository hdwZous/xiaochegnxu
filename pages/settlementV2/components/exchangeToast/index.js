Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    },
    showAddressTips: {
        type: Boolean,
        value: false
    },
    exFloorTop: {
        type: Number,
        value: 0
    },
    isIPX: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    'info': function (newVal) {
        if (newVal && newVal.data) {
            let toast = newVal.data.toast || []
            this.setData({toast})
        }
    }
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    toast: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickToast() {
        let scroll = this.data.exFloorTop - 150
        wx.pageScrollTo({
            scrollTop: scroll,
            duration: 300
        });
    }
  }
});
