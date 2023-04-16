import { request, FNIDS } from "../../../../../common/util/api";
Component({
  properties: {
    showPop: {
      type: Boolean,
      value: false,
    },
    popInfo: {
      type: Object,
      value: null,
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },
  methods: {
    openVip() {
      request({
        ...FNIDS.getBrandCoupon,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          couponId: (this.data.popInfo && this.data.popInfo.couponId) || "",
          brandId: (this.data.popInfo && this.data.popInfo.brandId) || "",
        },
        preObj: this.data.buriedObj || {}
      })
        .then((res) => {
          let { code, result, msg } = res.data || {};
          // 领取成功
          if (code == 0 && result) {
            this.showTip(msg || "恭喜入会成功，券已发放");
            this.triggerEvent("pageEvent", {
              type: "updateBrandCoupon",
              data: {
                isShowBrandVipPop: false,
                brandCoupon: {
                  couponButton: {
                    title: result.bntWords,
                    titleColor: result.bntWordsStyle,
                    startColor: result.bntStyle,
                    endColor: result.bntStyle,
                    state: result.state || 1,
                  },
                  couponId: result.couponId || "",
                },
              },
            });
          } else {
            this.showTip(msg || "入会失败，请稍后重试");
            this.triggerEvent("pageEvent", {
              type: "showBrandVipPop",
              data: {
                isShowBrandVipPop: false,
              },
            });
          }
        })
        .catch(() => {
          this.showTip("入会失败，请稍后重试");
          this.triggerEvent("pageEvent", {
            type: "showBrandVipPop",
            data: {
              isShowBrandVipPop: false,
            },
          });
        });
    },
    cancel() {
      this.triggerEvent("pageEvent", {
        type: "showBrandVipPop",
        data: {
          isShowBrandVipPop: false,
        },
      });
    },
    showTip(msg) {
      wx.showToast({
        title: msg || "",
        icon: "none",
      });
    },
    jumpHref(e) {
      let url = e.currentTarget.dataset.href;
      url = encodeURIComponent(url);
      // let i = url.indexOf('?')
      // if (i > -1) {
      //     let urlArr = url.split("?");
      //     let host = urlArr[0];
      //     if (url.includes("#/")) {
      //         let paramsArr = urlArr[1].split("#/");
      //         let params = paramsArr[0];
      //         let hash = paramsArr[1];
      //         url = `${host}#${hash}?${params}`
      //     } else if (url.includes("#")) {
      //       let paramsArr = urlArr[1].split("#");
      //       let params = paramsArr[0];
      //       let hash = paramsArr[1];
      //       url = `${host}#${hash}?${params}`;
      //     }

      // }
      wx.navigateTo({
        url: `/pages/h5/index?noNeedLogin=true&url=${url}`,
        preObj: this.data.buriedObj,
        buried_position: {
          key: "store-brandCoupon-jumpHref",
          options: this.data.options,
        },
      });
      // djCmsJump({
      //   to: "web",
      //   params: {
      //     url: url,
      //     noNeedLogin: true
      //   }
      // });
    },
  },
});