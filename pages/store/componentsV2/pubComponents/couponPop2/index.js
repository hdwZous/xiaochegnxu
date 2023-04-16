// 外部渠道流量进入小程序承接页展示优惠券弹窗（线上助力 和线下推广-来来推）
//Component Object
import { clickBuriedV2_ } from "../../../../../common/util/BI";
import { request, FNIDS } from "../../../../../common/util/api";


Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    spreadChannel: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    showPop: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          this.fetchData();
        }
      },
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
  data: {
    list: [],
    couponIds: "",
    couponParamList: [], // 批次号
    sign: "", // 签名
    merchantId: "", // 商户号
    toast: "",
  },
  methods: {
    hidePop(e) {
      let { position = "关闭" } = e.currentTarget.dataset;
      this.setData({
        showPop: false,
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickLayer",
        click_par: {
          couponIds: this.data.couponIds || "",
          shopId: this.data.storeId || "",
          channel: this.data.spreadChannel || "",
          btnName: position || "关闭",
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
    },
    fetchData() {
      let loginInfo = wx.getStorageSync("login_info") || {};
      request({
        ...FNIDS.couponPop2,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          phone: loginInfo.PDJ_H5_MOBILE || "",
          shopId: this.data.storeId || "",
          channel: this.data.spreadChannel || "",
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result = {} } = res.data || {};
          let couponIds = [];
          let couponParamList = [];
          let couponParam = []; // 获取签名的入参
          if (code == 0 && result.couponList && result.couponList.length > 0) {
            if (result.desc && result.desc.length > 14) {
              result.desc = result.desc.slice(0, 14);
            }
            result.couponList.forEach((item) => {
              if (item.couponId) {
                couponIds.push(item.couponId);
              }
              if (item.stockId) {
                couponParamList.push({
                  stock_id: item.stockId,
                  out_request_no: item.outRequestNo,
                  // customize_send_time: item.customizeSendTime,
                });
                couponParam.push({
                  stockId: item.stockId,
                  outRequestNo: item.outRequestNo,
                });
              }
            });
            this.setData(
              {
                list: result.couponList || [],
                title: result.title || "",
                desc: result.desc || "",
                couponIds: couponIds.length ? couponIds.join("，") : "",
                couponParamList,
                couponParam,
              },
              () => {
                if (this.data.couponParam) {
                  this.getSignAndMerchant();
                }
              }
            );
            let { pageIdFirstPage, currentPageName, prePageName } =
              this.data.buriedObj || {};
            clickBuriedV2_({
              click_id: "showLayer",
              click_par: {
                couponIds: this.data.couponIds || "",
                shopId: this.data.storeId || "",
                channel: this.data.spreadChannel || "",
              },
              prePageName,
              currentPageName,
              pageId: pageIdFirstPage || "",
            });
          } else {
            this.setData({
              list: [],
            });
          }
        })
        .catch(() => {
          this.setData({
            list: [],
          });
        });
    },
    // 获取签名和商户号
    getSignAndMerchant() {
      request({
        ...FNIDS.encryptMarket,
        method: "GET",
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          business: "store_lailaitui",
          couponParamList: this.data.couponParam,
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result = {} } = res.data || {};
          if (code == 0) {
            this.setData({
              sign: result.sign,
              merchantId: result.merchant,
            });
          }
        })
        .catch(() => {});
    },
    // 添加到微信卡券
    getcoupon(e) {
      this.setData({
        toast: "优惠券领取成功",
      });
      this.hidePop(e);
    },
  },
});