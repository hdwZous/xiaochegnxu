
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: () => {
        //  console.log('val',val)
      }
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowAntiInfoPop: false,
    antiEpidemicTip: '',
    antiEpidemicTitle: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleContact() {
      const isMiddle = this.data.initData.deliveryManInfo.isMiddleNumber == 1 || this.data.initData.orderStateMap.isMiddleNumber == 1;
      
      let {orderId = '', storeId = '', deliveryManInfo = {}, orderState = ''} = this.data.initData;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickDelivery",
        click_par: {
          orderId,
          storeId,
          deliveryType: deliveryManInfo.deliveryType || "",
          orderState
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });

      // 请求中间号
      if (isMiddle) {
        this.triggerEvent('showMiddleModal', {
          orderId: this.data.initData.orderId
        });
        return;
      }

      if (!this.data.initData.deliveryManInfo.contact.phoneNum) {
        wx.showToast({
          title: "获取电话号码失败",
          icon: 'none',
        })
      } else {
        wx.showModal({
          title: this.data.initData.deliveryManInfo.contact.text,
          content: this.data.initData.deliveryManInfo.contact.phoneNum,
          success: (res) => {
            if (res.confirm) {
              wx.makePhoneCall({
                phoneNumber: this.data.initData.deliveryManInfo.contact.phoneNum,
                success: function () { },
              })
            }
          }
        })
      }
    },
    showExp() {
      let deliveryManInfo = this.data.initData.deliveryManInfo
      if (deliveryManInfo && deliveryManInfo.antiEpidemicInfo && deliveryManInfo.antiEpidemicInfo.antiEpidemicTitle && deliveryManInfo.antiEpidemicInfo.antiEpidemicTip) {
        this.setData({
          isShowAntiInfoPop: true,
          antiEpidemicTip: deliveryManInfo.antiEpidemicInfo.antiEpidemicTip.replace(new RegExp('<br/>', 'g'), '\n')
        })
      }
    },
    hidePop() {
      this.setData({
        isShowAntiInfoPop: false
      })
    }
  }
})
