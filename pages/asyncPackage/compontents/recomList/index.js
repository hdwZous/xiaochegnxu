import { FNIDS, request } from "../../../../common/util/api";
import { updateGoodsNum } from "../../../../common/util/carService";
import { djCmsJump } from "../../../../common/util/agreementV2";
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 限频次数
    totalTimes: {
      type: Number,
      value: 0,
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    excludeSkuIds: {
      type: Array,
      value: [],
    },
    skuId: {
      type: String,
      value: "",
    },
    updateNum: {
      type: Object,
      value: {},
    },
    couponIds: {
      type: Array,
      value: [],
    },
    isFollow: {
      type: Boolean,
      value: false,
    },
    addCarPushCoupon: {
      type: Object,
      value: null,
    },
    brandCoupon: {
      type: Object,
      value: null,
    },
    pageSource: {
      type: String,
      value: "store",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    NeedExposure: {
      type: Boolean,
      value: false,
    },
    fromPisition: {
      type: String,
      value: "",
    },
    optionsPos: {
      type: Object,
      value: {},
    },
    tabName: {
      type: String,
      value: ""
    }
  },
  observers: {
    updateNum: function (obj) {
      updateGoodsNum(this, this.data.products, obj, "products");
    },
    totalTimes: function (num) {
      // 以限频
      if (num == 0) {
        this.setData({
          limitRate: 1,
        });
      }
    },
  },
  data: {
    limitRate: 0, // 限频状态 未限 0 已限 1
    title: "",
    products: [], // 加车掉品
    couponList: [], // 加车掉券
    traceId: "", // 埋点需要
  },
  lifetimes: {
    attached() {
      this.fetchRecomData();
    },
  },
  methods: {
    fetchRecomData() {
      request({
        ...FNIDS.afterPushInCart,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: FNIDS.afterPushInCart.method || "POST",
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          skuId: this.data.skuId || "",
          excludeSkuIds: this.data.excludeSkuIds || [],
          pageSource: this.data.pageSource,
          ctp:
            this.data.pageSource == "storeSearchResult"
              ? "store_search"
              : "storeinfo",
          limitRate: this.data.limitRate,
          couponIdList: this.data.couponIds || [],
        },
        pageId: this.data.buriedObj.pageIdFirstPage,
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          let { code, result, traceId } = res.data;
          if (code == 0 && result) {
            // result.data = result.data.slice(0,3)
            this.setData({
              title: result.title,
              products: result.data || [],
              couponList: result.couponList || [],
              traceId: traceId || "",
            });
            this.triggerEvent("computeTime", {
              productList: this.data.products || [],
              couponId:
                this.data.couponList.length > 0 &&
                this.data.couponList[0].couponId,
            });
          }
        })
        .catch(() => {
          // console.log(err)
        });
    },
    jump(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: this.data.fromPisition || "没有",
          options: this.data.optionsPos
        }
      });
    },
  },
});