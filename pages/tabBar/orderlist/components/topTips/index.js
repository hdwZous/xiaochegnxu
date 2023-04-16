import { FNIDS, request } from "../../../../../common/util/api";
import { djCmsJump } from '../../../../../common/util/agreementV2';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommendObj: {
      type: Object,
      value: {}
    },
    // 来源页面标识 1：tab订单    2：全部订单
    jumpSource: {
      type: Number,
      value: 1
    },
    from: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 0：无提示  1：评价小黄条  2：V+会员入口
    orderListTopHintType: -1,
    vPlusHintVO: {}
  },

  pageLifetimes: {
    show: function () {
      this.getTopHintInfo()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goVip() {
      let { recommendObj = {}, vPlusHintVO: { params = {}, to = '' } } = this.data;
      djCmsJump({
        to,
        params,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist-topTips',
        }
      })

    },
    // 获取小黄条数据
    getTopHintInfo() {
      let { recommendObj = {}, jumpSource = 1, from = 1 } = this.data;
      request({
        ...FNIDS.orderListTopHint,
        body: {
          jumpSource: jumpSource,
          from
        },
        isNeedDealError: true,
        isForbiddenDialog: true,
        isNeedDealLogin: true,
        pageId: recommendObj.pageIdFirstPage || ""
      }).then(res => {
        let { result = {}, code = -1 } = res.data;
        if (code == '0') {
          this.setData({
            vPlusHintVO: result.vPlusHintVO,
            orderListTopHintType: result.orderListTopHintType || -1
          })
          this.triggerEvent('showFnTip', { orderListTopHintType: result.orderListTopHintType })
        }
      }).catch((e) => {
        console.log('页头小黄条', e)
      })
    }
  }
})
