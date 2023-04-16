// pages/order/components/deliveryInfo/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData:{
      type:Object,
      value:{},
      observer:()=>{
        // console.log('val',val)
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showImgBig(e) {
      let {item = {}} = e.currentTarget.dataset;
      this.triggerEvent('showPrescription', {
        imgUrl: item.img0
      });
    },
    catchTouchmove() {
      return false
    },
    closeImgBig(){
      this.setData({
        imgUrl: ''
      })
    }
  }
})
