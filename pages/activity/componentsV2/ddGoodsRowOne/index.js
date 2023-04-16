import { djCmsJump } from '../../../../common/util/agreementV2'
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    // 楼层唯一id
    floorId: {
      type: String,
      value: ''
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    activityId: {
      type: String,
      value: ''
    },
    // 商品列表数据
    data: {
      type: Array,
      value: [],
      observer: function (newVal) {
        if (newVal.length) {
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
    pageConfig: {
      type: Object,
      value: {}
    },
    pageFrom: {
      type: String,
      value: ''
    },
    styles: {
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
    goodList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店锚中商品
    goToStore(e) {
      let data = e.currentTarget.dataset;
      if (data.type == 'buy') {
        // 去门店首页购买商品
        data.params.isAddCart = true;
      } else if (data.type == 'store') {
        data.params.isAddCart = false;
      }
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-goodsRowOne-gotostore"
      })
    },
    // 去门店页
    goToStoreHome(e) {
      let params = e.currentTarget.dataset.params;
      wx.navigateTo({
        url: '/pages/store/index?storeId=' + params.storeId + "&orgCode=" + params.orgCode + "&skuId=" + '' + "&activityId=" + '' + "&promotionType=" + '' + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
        preObj: this.data.recommendObj,
        buried_position: "active-goodsRowOne-store1"
      })
    },
    //监听数量加减按钮 透传给父级
    onAddMinControllerChange(e) {
      this.triggerEvent("onAddMinControllerChange", e.detail, { composed: true, bubbles: true })
    }
  }
});
