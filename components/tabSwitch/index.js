Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 顶部筛选标签列表
    tabResultList: {
      type: Array,
      value: []
    }
  },
  data:{
    // 方向标识
    flag: true,
    // 首次进入
    firstInto: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击顶部按钮 全部/小时购/到店
    selectTab(e) {
      let { item, index } = e.currentTarget.dataset || {};
      let {tabResultList = []} = this.data;
      if(item.selected) {
        return
      }
      if(index == (tabResultList.length - 1)){
        this.setData({
          flag: false
        })
      } else if(index == 0) {
        this.setData({
          flag: true
        })
      }
      this.setData({
        firstInto: false
      })
      this.triggerEvent("selectTab", { tabType: item.tabType || item.type, tabItem: item, index});
    },
  }
})
