// 门店头卡片
import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { maidian } from "../../public.js";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 门店信息
    storeInfo: {
      type: Object,
      value: {}
    },
    // 优惠券信息
    couponSimpleInfo: {
      type: Array,
      value: [],
    },
    showCouponMore: {
      type: Boolean,
      value: false,
    },
    traceId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    // 门店促销优惠信息
    promotionFloor: {
      type: Object,
      value: {},
    }
  },
  data: {},
  methods: {
    // 展示商家服务半弹层
    showOrgServiceHalf() {
      this.triggerEvent("pageEvent", {
        type: "orgServiceHalf",
      });
    },
    // 展示优惠券半弹层
    showCouponHalf() {
      this.triggerEvent("pageEvent", {
        type: "couponHalf",
      });
    },
    // 打电话
    callPhone() {
      let { storeId, storeBusinessType } = this.data.storeInfo || {};
      wx.makePhoneCall({
        phoneNumber: this.data.storeInfo && this.data.storeInfo.storePhone[0]
      })
      maidian("clickButton", {
        storeId: storeId || "",
        businessType: storeBusinessType || 2,
        btnName: "call",
      }, this.data.buriedObj);
    },
    // 导航
    jumpMap() {
      let {
        latitude,
        longitude,
        storeName,
        storeAddress,
        storeId,
        storeBusinessType,
      } = this.data.storeInfo;
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name: storeName,
        address: storeAddress,
      });
      maidian("clickButton", {
        storeId: storeId || "",
        businessType: storeBusinessType || 2,
        btnName: "navigation",
      }, this.data.buriedObj);
    },
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});