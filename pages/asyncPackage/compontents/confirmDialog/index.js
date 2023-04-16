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
    locationId: {
      type: String,
      observer: function (newVal) {
        if (newVal == "step_num_exchange"){
          this.setData({
            confirmBtnTextColor:"#12D59C",
          });
        }
      }
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    refresh: "",
    confirmBtnTextColor:"#47B34F",
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
      let type = e.detail.type;
      let data = e.detail.data;
      this.triggerEvent("clickCancel",{
        type: type,
        data: data
      })
      this.hide()
    },
    confirm(e){
      let type = e.detail.type;
      let data = e.detail.data;
      this.triggerEvent("clickConfirm",{
        type: type,
        data: data
      })
    },
    refresh(val){
      this.setData({
        refresh:val
      })
    }
  }
});
