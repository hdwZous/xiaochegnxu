Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabInfo: {
      type: Object,
      value: {},
      observer: function (news) {
        if (news && news.tabColor && news.tabs.length) {
          let that = this
          let query = wx.createSelectorQuery().in(this)
          query.selectAll('.tabs-box,.tabs-items').boundingClientRect(function (res) {
            let width = res[0].width, left = res[0].left, fillUp = false;
            res.slice(1).map(res => {
              if (!fillUp) {
                let distance = res.left + res.width - left
                if (distance > width) {
                  fillUp = true
                }
              }
            })
            that.setData({
              fillUp,
            })
          }).exec()
          this.setData({
            activeTab: news.tabs[0].spaceNo,
            currentView: news.tabs[0].spaceNo
          })
        }
      }
    },
    tabFixd: {
      type: Boolean,
      value: false
    },
    buriedObj:{
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fillUp: true,
    ainmation: true,
    popup: false,
    activeIds: 0,
    activeTab: 0,
    currentView: 0,
    yetTop: false
  },

  observers: {
    activeIds: function (_activeIds) {
      var len = this.data.tabInfo.tabs.length;
      if (len === 0) return;
      var current = _activeIds - 1;
      if (current < 0) current = 0;
      if (current > len - 1) current = len - 1;
      this.setData({ currentView: this.data.tabInfo.tabs[current].spaceNo });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPop() {
      this.setData({
        popup: true
      })
      this.triggerEvent('reportSortnameTab', {})
    },
    hidePop() {
      this.setData({
        popup: false
      })
    },
    touchHandler() {
      return false
    },
    clickTab(e) {
      let from = e.currentTarget.dataset.from
      let activeIds = e.currentTarget.dataset.ids
      let activeTab = e.currentTarget.dataset.active
      let name = e.currentTarget.dataset.name
      let isLayer = e.currentTarget.dataset.isLayer
      this.setData({ activeTab, activeIds })
      if (from === 'pop') {
        this.hidePop()
      }
      this.triggerEvent('reportPopname', {
        spaceNo: activeTab,
        tabName: name,
        isLayer: isLayer
      })
      this.triggerEvent('querySku', {
        spaceNo: activeTab,
        tabName: name
      })
    }
  }
});
