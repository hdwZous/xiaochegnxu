
import { djCmsJump } from "../../../../common/util/agreementV2.js";
import { getCouponProtocol } from "../../../../common/util/services";
import mp from "../../../../common/util/wxapi";
Component({
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val) {
          this.setData({
            isShow: true,
          });
        }
      },
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },
  data: {
    isShow: false,
  },

  methods: {
    hidePop() {
      this.setData({
        isShow: false,
      });
    },
    clickItem(e) {
      let { to, params, userAction, couponInfo = {} } = e.currentTarget.dataset.item;
      let { markState = 3 } = couponInfo.passThroughParam;
      // 新券购协议
      getCouponProtocol({
        activityCode: params.couponCode || "",
        storeId: params.storeId || "",
        markState: markState,
        refPageSource: "myorderdetail",
        orgCode: params.orgCode || "",
        couponGoSource: 3,
        couponId: params.couponId || "",
        skuId: "",
      })
        .then((res) => {
          let result = res.data.result || "";
          if (res.data.code == "0" && result) {
            let { to = "", params = {}, userAction = "" } = result;
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
              let { recommendObj } = this.data;
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction,
                preObj: recommendObj
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
