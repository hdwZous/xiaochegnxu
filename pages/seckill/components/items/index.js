import { djCmsJump } from '../../../../common/util/agreementV2'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  pageLifetimes: {
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击轮播图片
    goToStore(e) {
      let data = e.currentTarget.dataset;
      data.params = {
        storeId: data.storeId,
        skuId: data.skuId,
        promotionType: data.promotion || ''
      }
      this.triggerEvent('reportTopfloor', {
        userAction: data.userAction,
        storeId: data.storeId,
        skuId: data.skuId
      }, {bubbles: true, composed: true})
      if (data.type == 'buy') {
        // 去门店首页购买商品
        data.params.isAddCart = true;
      } else if (data.type == 'store') {
        data.params.isAddCart = false;
      }
      
      djCmsJump({
        // 去向
        to: data.to,
        // url参数
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'seckill_items_clickImg'
        }
      })
    },
    // 图片加载失败
    imgError(err) {

    }
  }
});
