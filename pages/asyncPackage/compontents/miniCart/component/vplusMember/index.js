Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showVlayer: {
      type: Boolean,
      value: false
    },
    vlayerInfo: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.floor) {
          let item = val.floor
          let that = this
          for (let i = 0; i < item.length; i++) {
            if (item[i].style == 'combo' && item[i].models.length > 0) {
              // 多个套餐显示关闭按钮
              that.setData({
                isShowCloseIcon: true
              })
              for (let j = 0;j < item[i].models.length;j++) {
                // 为了反选为beforeCheck赋值
                if (item[i].models[j].check == 1) {
                  that.setData({
                    currentCheck: item[i].models[j].type
                  })
                }
              }
            }
          }
        }
      }
    },
    storeId: {
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
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentCheck: '',
    beforeCheck: '',
    isShowCloseIcon: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    vschange(e) {
      let { mealType } = e.currentTarget.dataset
      this.triggerEvent("vschange", {
        type: e.currentTarget.dataset.check == 1 ? 0 : 1,
        status: mealType != this.data.currentCheck ? 0 : 1
      });
    },
    showVM() {
      this.triggerEvent("showVM", {})
    },
    // 选中套餐
    clickPrime(e) {
      let { mealType } = e.currentTarget.dataset
      // 选中和当前缓存的值相同
      this.triggerEvent("selectSeat", {
        type: mealType == this.data.currentCheck ? 0 : mealType,
        beforeCheck: this.data.currentCheck,
        status: mealType != this.data.currentCheck ? 0 : 1
      });
      this.setData({
        currentCheck: mealType == this.data.currentCheck ? 0 : mealType,
        beforeCheck: this.data.currentCheck
      }, () => {
        console.log(this.data.currentCheck, this.data.beforeCheck);
      })

    },
    closeLayer(e) {
      this.triggerEvent("showVM", {})
    }
  }
})
