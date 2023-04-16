import {
  djCmsJump
} from '../../../../common/util/agreementV2.js'
import { getCouponProtocol } from '../../../../common/util/services'
import util from '../../../../common/util/util'
import { clickBuriedV2_ } from "../../../../common/util/BI";

Component({
  lazyObj: {
    epSelector: '.home_pop6'
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
        let { data, userAction = '' } = obj || {};
        if (data.skuAndRedPackPublishList) {
          this.setData({
            isShow: !!data.couponPic || !!data.skuAndRedPackPublishList,
            skuAndRedPackPublishList: data.skuAndRedPackPublishList
          });
          userAction && this.triggerEvent('onPopExposure', {
            data: userAction
          });
          this.setData({
            userAction: userAction
          })
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
    userAction: '',
    skuAndRedPackPublishList: []
  },
  lifetimes: {
    attached() {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "epLayerOpen",
        click_par: {
          userAction: this.data.userAction
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage
      })
    }
  },
  methods: {
    catchtouchmove() {
      return false
    },
    hidePop() {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "click_close",
        click_par: {
          userAction: this.data.userAction
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
      this.setData({
        isShow: false
      })
    },
    picJump(e) {
      let { to, params, userAction } = e.currentTarget.dataset
      if (to) {
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homepop6_picJump_home'
          }
        })
        this.hidePop()
      }
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
                currentPageName: 'homepop6_clickCouponGo_home'
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
            currentPageName: 'homepop6_clickCouponGo_home'
          }
        })
      }
    },
    clickItemGo(e) {
      let {
        to,
        params,
        userAction = '',
      } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homepop6_clickItemGo_home'
        }
      });
    }
  }
})
