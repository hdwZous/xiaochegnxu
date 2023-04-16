import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    epSelector: '.store-list .channel_comp_ep',
    needExposure: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        const { data = [], floorTitle: { floorName = '附近商家' } = {} } = newVal;
        this.setData({
          storeList: data,
          floorName
        })
      }
    },
    traceId: {
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
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    storeList: [],
    floorName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumper: function (e) {
      clickBuriedV2_({
        click_id: "slide_store_item",
        click_par: {
          traceId: this.data.traceId
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      const data = e.currentTarget.dataset;
      data.traceId = this.data.traceId
      if (data.to) {
        djCmsJump({
          ...data,
          preObj: this.data.recommendObj,
          buried_postion: "channel-slideStoreList1"
        })
      }
    },
    expandCouponJump(e) {
      const { item } = e.currentTarget.dataset || {};
      djCmsJump({
        to: item.to,
        params: item.params,
        userAction: item.userAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-slideStoreList2"
      })
    }
  }
})
