
// import { request, FNIDS } from "../../../../../common/util/api";
import mp from '../../../../../common/util/wxapi'
import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { getCouponProtocol } from "../../../../../common/util/services";
import { clickBuriedV2_ } from '../../../../../common/util/BI';
Component({
  properties: {
    prizeList: {
      type: Array,
      value: [],
    },
    title: {
      type: Object,
      value: {},
    },
    notWin: {
      type: Object,
      value: {},
    },
    experName: {
      type: String,
      value: ""
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
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  data: {},
  methods: {
    jump(e) {
      let {
        to = "",
        params = {},
        userAction = "",
      } = e.currentTarget.dataset.jumpProtocol;
      let { markState = 3 } = e.currentTarget.dataset.couponInfo.passThroughParam;
    
      // 新券购协议
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickPrizeBtn",
        click_par: {
          jumpProtocol: e.currentTarget.dataset.jumpProtocol
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      let {traceId = '', recommendObj = {}} = this.data;
      getCouponProtocol({
        activityCode: params.couponCode || "",
        storeId: params.storeId || "",
        markState: markState,
        refPageSource: "ordersuccess",
        orgCode: params.orgCode || "",
        couponGoSource: 3,
        couponId: params.couponId || "",
        skuId: "",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {}} = result;
            let paramsNew = { userAction: userAction };
            for (let i in result.params) {
              if (i != "passThroughParam") {
                paramsNew[i] = params[i];
              } else {
                for (let j in params.passThroughParam) {
                  if (params.passThroughParam[j]) {
                    paramsNew[j] = params.passThroughParam[j];
                  }
                }
              }
            }
            if (to) {
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction,
                traceId,
                preObj: recommendObj,
                buried_postion: "order-paySuccess-drawResult"
              });
            }
          } else {
            mp.toast({
              title: res.data.msg || "哎呀，点击太疼啦，稍后再点我哦~",
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "哎呀，点击太疼啦，稍后再点我哦~",
          });
        });
    },
  },
});
