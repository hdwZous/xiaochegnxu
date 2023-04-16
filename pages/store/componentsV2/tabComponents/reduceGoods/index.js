import {
  FNIDS,
  request
} from "../../../../../common/util/api";
import mp from "../../../../../common/util/wxapi";
import { djCmsJump } from "../../../../../common/util/agreementV2";
import { updateGoodsNum } from "../../../../../common/util/carService";
import { productScroll , computeFloatBall} from "../../public.js";
Component({
  properties: {
    params: {
      type: Object,
      value: {},
    },
    loadReducePage: {
      type: Boolean,
      value: false,
      observer: function (val) {
        val && this.getReduceGoods();
      },
    },
    updateNum: {
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
    tabName: {
      type: String,
      value: ""
    },
    // 是否展开悬浮球
    showFloatBall: {
      type: Boolean,
      value: true
    }
  },
  data: {
    dataList: [],
    skuId: "",
    showEmpty: true,
    type: 0,
    tips: "",
    btnText: "",
    productTouchTop: true,
    defaultSrc:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
    traceId: "", // 埋点需要
  },
  observers: {
    updateNum: function (newval) {
      if (newval) {
        for (let i = 0; i < this.data.dataList.length; i++) {
          updateGoodsNum(
            this,
            this.data.dataList[i].data,
            newval,
            `dataList[${i}].data`
          );
        }
      }
    },
    productTouchTop: function (val) {
      this.notifyTop(val);
    },
  },
  methods: {
    // 获取减运商品
    getReduceGoods() {
      let {
        storeId = "",
        orgCode = "",
        activityId = "",
        type = "",
      } = this.data.params || {};
      let buriedObj = this.data.buriedObj || {};
      mp.loading_cover();
      request({
        ...FNIDS.tabActivity,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: "POST",
        pageId: buriedObj.pageIdFirstPage || "",
        body: {
          storeId: storeId,
          orgCode: orgCode,
          activityId: activityId,
          type: type,
          ctp: "storeinfo",
          pageSource: buriedObj.pageSource || "store",
          refPageSource: buriedObj.refPageSource || "",
          ref_par: {
            userAction: buriedObj.preUserAction || "",
            traceId: buriedObj.preTraceId || "",
          },
        },
        preObj: this.data.buriedObj || {},
      })
        .then((res) => {
          mp.hideLoading();
          let { code, result } = res.data || {};
          if (code == 0 && result.data) {
            let dataList = result.data || [];
            dataList.forEach((floor) => {
              // 两行三个半
              if (floor.tpl == "tpl2-3.5" && floor.data.length / 2 != 0) {
                floor.data = floor.data.slice(0, floor.data.length - 1);
              }
              // 两行三个半
              if (floor.tpl == "tpl2-3" && floor.data.length / 3 != 0) {
                floor.data = floor.data.slice(0, floor.data.length);
              }
            });
            this.setData({
              showEmpty: !dataList.length,
              dataList: dataList,
              type: 1,
              tips: "商品已抢光，下次早点来哦~",
              traceId: res.data.traceId || "",
            });
          } else {
            this.setData({
              type: 4,
              btnText: "重新加载",
              tips: (res.data && res.data.msg) || "获取商品信息失败",
            });
            wx.reportMonitor(8, 20);
          }
        })
        .catch(() => {
          mp.hideLoading();
          this.setData({
            showEmpty: true,
            type: 4,
            tips: "获取商品信息失败",
            btnText: "重新加载",
          });
          wx.reportMonitor(8, 20);
        });
    },
    notifyTop(val) {
      this.triggerEvent("touchTop", {
        data: val,
      });
    },
    goDetails(e) {
      let { item = {} } = e.currentTarget.dataset;
      djCmsJump({
        to: item.to,
        params: item.params,
        userAction: item.userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-reduceGoods-1`,
          options: this.data.options,
        },
      });
    },
    productTouchTop() {
      if (!this.data.productTouchTop) {
        this.setData({
          productTouchTop: true,
        });
      }
    },
    productTouchBottom() {
      if (!this.data.productTouchBottom) {
        this.setData({
          productTouchBottom: true,
        });
      }
      if (!this.data.productTouchTop) {
        this.setData({
          productTouchTop: false,
        });
      }
    },
    productScroll(e) {
      let { scrollTop } = e.detail;
      productScroll(
        this,
        scrollTop,
        this.data.productTouchTop,
        "productTouchTop"
      );
      computeFloatBall(this, scrollTop)
    },
    onDefaultBtnEvent() {
      mp.loading_cover();
      this.getReduceGoods();
    },
  },
});