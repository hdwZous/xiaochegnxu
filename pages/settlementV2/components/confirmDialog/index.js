Component({
  /**
     * 组件的属性列表
     */
  properties: {
    titleText: {
      type: String,
      value: ""
    },
    cancelText: {
      type: String,
      value: ""
    },
    confirmText: {
      type: String,
      value: ""
    },
    showDialog:{
      type: Boolean,
      value: false,
      observer:function (newVal) {
        this.refresh(newVal)
      }
    },
    borderRadius: {
      type: Number,
      value: 24
    },
    width: {
      type: Number,
      value: 540
    },
    height: {
      type: Number,
      value: 320
    },
    rightClose: {
      type: Boolean,
      value: false
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    refresh: ""
  },

  /**
     * 组件的方法列表
     */
  methods: {
    hide(){
      this.setData({
        showDialog:false
      })
    },
    cancel(e){
      let { type } = e.currentTarget.dataset;
      this.triggerEvent("clickCancel",{
        type: type
      })
      this.hide()
    },
    confirm(e){
      this.triggerEvent("clickConfirm")
      this.hide()
    },
    refresh(val){
      this.setData({
        refresh:val
      })
    }
  }
});
