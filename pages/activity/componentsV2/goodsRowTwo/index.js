import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from '../../../../common/util/BI'
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    activityId: {
      type: String,
      value: ''
    },
    // 商品列表数据
    data: {
      type: Array,
      value: [],
      observer: function (newVal) {
        let self = this;
        if (newVal.length) {
          newVal.forEach(item => {
            item.clickBuriedBtn = {
              name: 'buy_now',
              click_par: {
                sku_id: item && item.skuId,
                activityId: self.data.activityId
              }
            };
            item.clickBuriedPic = {
              name: 'click_sku_pic',
              click_par: {
                sku_id: item && item.skuId,
                activityId: self.data.activityId
              }
            }
          });
          this.setData({
            goodList: newVal
          })
        }
      }
    },
    // 是否需要门店入口
    isShowStoreEnter: {
      type: Boolean,
      value: true
    },
    bgColor: {
      type: String,
    },
    pageConfig: {
      type: Object,
      value: {}
    },
    pageFrom: {
      type: String,
      value: ''
    },
    biPageName: {
      type: String,
      value: ''
    },
    biActivityId: {
      type: String,
      value: ''
    },
    traceId: {
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
    // 商品列表
    goodList: [],
    imgBorderRadius: "0rpx"
  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached() {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店锚中商品
    goToStoreShotGood(e) {
      let data = e.currentTarget.dataset;
      data.params.isAddCart = false;
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-goodsRowTwo-goToStoreShotGood"
      })
    },
    // 去门店页
    goToStoreHome(e) {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "go_store",
        click_par: {
          userAction: e.currentTarget.dataset.data.userAction || "",
          activityId: this.data.biActivityId
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      });
      let params = e.currentTarget.dataset.params;
      wx.navigateTo({
        url: '/pages/store/index?storeId=' + params.storeId + "&orgCode=" + params.orgCode + "&skuId=" + '' + "&activityId=" + '' + "&promotionType=" + '' + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
        preObj: this.data.recommendObj,
        buried_position: "active-goodsRowTwo-store"
      })
    }
  }
});