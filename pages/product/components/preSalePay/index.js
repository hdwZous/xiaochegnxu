import { request, FNIDS } from "../../../../common/util/api";
import {djCmsJump} from "../../../../common/util/agreementV2.js"
Component({
  properties: {
    stage: {
      type: Object,
      value: {},
    },
    handPrice: {
      type: String,
      value: "暂无报价",
    },
    spuId: {
      type: String,
      value: "",
    },
    skuId: {
      type: String,
      value: "",
    },
    count: {
      type: Number,
      value: 1,
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeName: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    iconType: {
      type: String,
      value: 0,
    },
  },
  data: {
    isIpx: false,
  },
  attached() {
    this.setData({
      isIpx: getApp().globalData.isIpx
    })
  },
  methods: {
    async jumpPay() {
      if (this.data.iconType == 1) {
        this.triggerEvent("showSpu");
        return;
      }
      if (this.data.stage.submitButtonEnable) {
        let result = await this.verify();
        if (result) {
          const { storeId, orgCode, storeName, skuId, count } = this.data;
          const preSaleSkuInfos = [
            {
              skuCount: count,
              skuId,
            },
          ];
          djCmsJump({
            to: "Settlement",
            params: {
              storeId,
              orgCode,
              storeName,
              saleType: 2,
              preSaleSkuInfos: JSON.stringify(preSaleSkuInfos),
            },
            preObj: this.data.recommendObj,
            buried_position: {
              key: "product-jumpPay-jumpPay",
              options: this.data.options,
            },
          });
        }
      }
    },
    async verify() {
      let { functionId = "", appVersion = "" } = FNIDS.preSellVerify || {};
      let res = await request({
        functionId: functionId,
        appVersion: appVersion,
        method: "POST",
        isNeedDealError: true,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          skus: [
            {
              id: this.data.skuId || "",
              num: this.data.count || 1,
              spuId: this.data.spuId || "",
            },
          ],
          fromSource: 5,
          pageSource: "productDetail",
        },
        preObj: this.data.recommendObj || {},
      });
      if (res.data && res.data.code == 0) {
        return true;
      } else {
        wx.showToast({
          title: res.data && res.data.msg,
          icon: "none",
        });
        return false;
      }
    },
  },
});
