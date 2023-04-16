import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
import { getCouponProtocol } from '../../../../common/util/services'
import util from '../../../../common/util/util'

Component({
  lazyObj: {
    selector: '.home_pop2',
    epSelector: '.home_pop2'
  },
  options: {
    addGlobalClass: true
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    data: {
      type: Object,
      value: {},
      observer: function (obj) {
        let { data} = obj || {};
        if (data.redPackPublishList) {
          data.redPackPublishList.forEach(item => {
            item.intCount = item.amount.split('.')[0]
            item.floatCount = item.amount.split('.').length > 1 && item.amount.split('.')[1] || ''
          })
          this.setData({
            isShow: !!data.couponPic || !!data.redPackPublishList,
            redPackPublishList: data.redPackPublishList
          });
        }
      }
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  data: {
    isShow: false,
    redPackPublishList: []
  },
  lifetimes: {
    attached() {
    }
  },
  methods: {
    catchtouchmove() {
      return false
    },
    hidePop() {
      this.setData({
        isShow: false
      })
    },
    picJump(e) {
      let { to, params, userAction } = e.currentTarget.dataset
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homepop2_picJump_home'
        }
      })
      this.hidePop()
    },
    // 点击券列表中的券
    clickCouponGo(e) {
      if (util.isLogin()) {
        let {
          couponCode = '',
          storeId = '',
          skuId = '',
          orgCode = '',
          markState = '',
          couponId = '',
          userAction = '',
        } = e.currentTarget.dataset.item || {};
        getCouponProtocol({
          activityCode: couponCode,
          storeId: storeId,
          markState: markState,
          refPageSource: this.data.from || 'home',
          skuId: skuId,
          orgCode: orgCode,
          couponGoSource: this.data.source || 3,
          couponId: couponId,
          couponPattern: this.data.couponPattern || ''
        }).then(res => {
          let result = res.data.result || '';
          if (res.data.code == '0' && result) {
            let params = { userAction: userAction };
            for (let i in result.params) {
              if (i != 'passThroughParam') {
                params[i] = result.params[i]
              } else {
                for (let j in result.params.passThroughParam) {
                  if (result.params.passThroughParam[j]) {
                    params[j] = result.params.passThroughParam[j]
                  }
                }
              }
            }
            if (!params.orgCode) {
              params.orgCode = orgCode
            }
            let address = wx.getStorageSync("address_info")
            params.longitude = address.longitude
            params.latitude = address.latitude
            djCmsJump({
              to: result.to,
              params: params,
              userAction: userAction,
              traceId: this.data.pageDataTraceId || '',
              preObj: this.data.buriedObj,
              buried_position: {
                currentPageName: 'homepop2_clickCouponGo_home'
              }
            });
            this.hidePop()
          }
        }).catch(() => {
          /**/
        })
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homepop2_clickCouponGo_home'
          }
        })
      }
    }
  }
})
