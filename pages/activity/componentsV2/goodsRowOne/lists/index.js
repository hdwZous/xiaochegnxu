import {
  jumpTo
} from "../../../../../common/util/activity_utils"
import { clickBuriedV2_ } from "../../../../../common/util/BI";
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true
  },
  properties: {
    info: {
      type: Object,
      value: {}
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

  lazyObj: {
    selector: '.log-good-one',
    epSelector: '.activity_comp_ep'
  },

  /**
   * 组件的初始数据
   */
  data: {
    hookLazy: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店锚中商品
    goToStore(e) {
      let data = e.currentTarget.dataset;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "click_producks_sku",
        click_par: {
          userAction: data.userAction || "",
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      });

      if (data.type == 'buy') {
        // 去门店首页购买商品
        data.params.isAddCart = true;
      } else if (data.type == 'store') {
        data.params.isAddCart = false;
      }
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      jumpTo(data, data.icontype, this.data.info, data.skutype, this.data.recommendObj)
    },
    // 去门店页
    goToStoreHome(e) {
      let params = e.currentTarget.dataset.params;
      wx.navigateTo({
        url: '/pages/store/index?storeId=' + params.storeId + "&orgCode=" + params.orgCode + "&skuId=" + '' + "&activityId=" + '' + "&promotionType=" + '' + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
        preObj: this.data.recommendObj,
        buried_position: "active-goodsRowOne-store2"
      })
    },
    //监听数量加减按钮 透传给父级
    onAddMinControllerChange(e) {
      this.triggerEvent("onAddMinControllerChange", e.detail, { composed: true, bubbles: true })
    }
  }
});
