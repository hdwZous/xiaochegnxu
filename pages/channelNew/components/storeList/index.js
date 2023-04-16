import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    epSelector: '.channel_store_list .channel_comp_ep'
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
    jumperStore: function (e) {
      let { item } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `/pages/store/index?needAnchorSku=true&orgCode=${item.orgCode}&storeId=${item.storeId}&skuId=${item.skuId}&userAction=${encodeURIComponent(item.userAction)}`,
        preObj: this.data.recommendObj,
        buried_postion: "channel-storeList-store"
      })
    },
    jumper: function (e) {
      clickBuriedV2_({
        click_id: e.currentTarget.dataset.type == 'type' ? 'list_store_more' : "list_store_near",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      const data = e.currentTarget.dataset;
      if (data.to) {
        djCmsJump({
          to: data.to,
          params: data.params,
          userAction: data.userAction,
          traceId: this.data.traceId,
          preObj: this.data.recommendObj,
          buried_postion: "channel-storeList1"
        })
      }
    },
  }
})
