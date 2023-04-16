// 门店头卡片
import { djCmsJump } from "../../../../common/util/agreementV2";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 门店信息
    storeInfo: {
      type: Object,
      value: {},
    },
    // 优惠券信息
    couponSimpleInfo: {
      type: Array,
      value: [],
    },
    // 商家会员信息
    storeMemberInfo: {
      type: Object,
      value: {},
    },
    showCouponMore: {
      type: Boolean,
      value: false,
    },
    storeCouponPopAb: {
      type: String,
      value: "",
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
    },
    options: {
      type: Object,
      value: {},
    },
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
    // 好店标跳转
    jumpGoodStoreDetail(e) {
      let info = e.currentTarget.dataset.info || {};
      djCmsJump({
        to: info.to || "",
        params: info.params,
        userAction: info.userAction || "",
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-storeHead-1`,
          options: this.data.options,
        },
      });
    },
    // 门店头卡片商家信息跳转
    jumpStoreMember(e) {
      let info = e.currentTarget.dataset.info || {};
      djCmsJump({
        to: info.to || "",
        params: info.params,
        userAction: info.userAction || "",
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-storeHead-2`,
          options: this.data.options,
        },
      });
    },
    clickDelivery() {
      let { storeCouponPopAb, couponSimpleInfo = [], promotionFloor = {} } =
        this.data || {};
      if (storeCouponPopAb == 'F' || storeCouponPopAb == 'H') {
        if (
          (couponSimpleInfo && couponSimpleInfo.length) ||
          (promotionFloor.promotionList && promotionFloor.promotionList.length)
        ) {
          this.showCouponHalf();
        } else {
          this.showOrgServiceHalf();
        }
        
      } else {
        this.showOrgServiceHalf()
      }
    }
  },
  created: function () {},
  attached: function () {},
  ready: function () {},
  moved: function () {},
  detached: function () {},
});