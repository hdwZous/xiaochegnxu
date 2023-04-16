import { getCouponProtocol } from '../../common/util/services'
import { djCmsJump, mpCmsJump } from "../../common/util/agreementV2";
import util from '../../common/util/util'
import { clickBuriedV2_ } from '../../common/util/BI'
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
    },
    orgCode: {
      type: String,
      value: "",
    },
    skuId: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    from: {
      type: String,
      value: "",
    },
    source: {
      type: Number,
      value: "",
    },
    userAction: {
      type: String,
      value: ""
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
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowLoading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击领取神券
    clickCouponGo(e) {
      if (util.isLogin()) {
        let {
          activityCode = "",
          storeId = "",
          skuId = "",
          orgCode = "",
          markState = "",
          couponId = "",
          userAction = "",
          showButton = false,
          couponType,
        } = e.currentTarget.dataset || {};
        // 没有activityCode 不能跳转到落地页
        if(!activityCode){
          return
        }
        // 埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "click_coupon",
          click_par: {
            traceId: this.data.traceId || "",
            userAction: this.data.userAction || "",
            storeId: this.data.storeId || "",
            activityCode: activityCode || "",
            couponId: couponId ? couponId + '' : '',
            couponType: couponType || "",
            actType: markState == 2 ? "领取" : markState == 3 ? "使用" : ""
          },
          pageId: this.data.pageId,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
        this.setData({
          isShowLoading: true,
        });
        showButton &&
          getCouponProtocol({
            activityCode: activityCode,
            storeId: storeId,
            markState: markState,
            refPageSource: this.data.from || "home",
            skuId: skuId,
            orgCode: orgCode,
            couponGoSource: this.data.source || 3,
            couponId: couponId,
            couponPattern: this.data.couponPattern || "",
          })
            .then((res) => {
              let result = res.data.result || "";
              if (res.data.code == "0" && result) {
                let params = { userAction: userAction };
                for (let i in result.params) {
                  if (i != "passThroughParam") {
                    params[i] = result.params[i];
                  } else {
                    for (let j in result.params.passThroughParam) {
                      if (result.params.passThroughParam[j]) {
                        params[j] = result.params.passThroughParam[j];
                      }
                    }
                  }
                }
                djCmsJump({
                  to: result.to,
                  params: params,
                  userAction: this.data.userAction,
                  traceId: this.data.traceId,
                  preObj: this.data.buriedObj,
                });
                this.setData({
                  isShowLoading: false,
                  [`data.markState`]: 3,
                });
                this.triggerEvent('feedsShopId', 
                  { storeId: this.data.storeId, 
                    orgCode: this.data.orgCode
                  }, { composed: true, bubbles: true }
                )
              }
            })
            .catch(() => {
              this.setData({
                isShowLoading: false,
              });
            });
      } else {
        // wx.navigateTo({
        //   url: `/pages/newLogin/login/login`,
        // });
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
        });
      }
    },
  },
});
