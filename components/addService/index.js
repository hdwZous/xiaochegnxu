Component({
  /**
   * 组件的属性列表
   */
  properties: {
    service: {
      type: Array,
      value: []
    }
  },

  observers: {
    'service': function (newVal) {
      if (newVal && newVal.length) {
        let serviceList = newVal.length > 4 ? newVal.slice(0, 4) : newVal
        let isFold = newVal.length > 4 ? true : false
        this.setData({
          serviceList,
          isFold
        })
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
    serviceList: [],
    isFold: null
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadmore() {
      if (this.data.service.length > 4) {
        let serviceList = this.data.isFold ? this.data.service : this.data.service.slice(0, 4)
        let isFold = !this.data.isFold
        this.setData({
          serviceList,
          isFold
        })
      }
    }
  }
});