// pages/order/components/deliveryInfo/index.js
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData:{
      type:Object,
      value:{},
      observer:()=>{
      }
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleContact(e){
      let item =  e.currentTarget.dataset.item || {};
      const isMiddle = item.contact.isMiddleNumber == 1;
      let {orderId = '',  orderState = ''} = this.data.initData;
      let {recommendObj={}} = this.data;
      let {currentPageName = '',prePageName='', pageId=''} = recommendObj;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickServicePhone",
        click_par: {
          orderId,
          orderState
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageId
      });
      
      // 请求中间号
      if (isMiddle) {
        this.triggerEvent('showMiddleModal', {
          orderId: this.data.initData.orderId
        });
        return;
      }

      if (!item.contact.phoneNum) {
        wx.showToast({
          title: "获取电话号码失败",
          icon: 'none',
        })
      } else {
        wx.showModal({
          title: item.contact.text,
          content: item.contact.phoneNum,
          success: (res) => {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: item.contact.phoneNum,
                success: function () { },
              })
            }
          }
        })
      }
    }
  }
})
