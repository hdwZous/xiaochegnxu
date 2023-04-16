import { request, FNIDS } from "../../../../../common/util/api";
import mp from '../../../../../common/util/wxapi'
import { updateGoodsNum } from "../../../../../common/util/carService";
import { productScroll } from "../../public.js";
import {djCmsJump}  from '../../../../../common/util/agreementV2.js'
import {computeFloatBall} from "../../public.js"
let app = getApp();

Component({
  properties: {
    // 商家ID
    orgCode: {
      type: String,
      value: "",
    },
    // 门店ID
    storeId: {
      type: String,
      value: "",
    },
    updateNum: {
      type: Object,
      value: {},
    },
    activityId: {
      type: Number,
      value: null,
    },
    // 是否加载会员数据
    loadVipPage: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          this.fetchVipData()
            .then((result) => {
              this.handleSuccess(result);
            })
            .catch((result) => {
              this.handleFail(result);
            });
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
    showEmpty: true,
    showGoodListEmpty: false,
    showLoading: true,
    type: 0,
    tips: "",
    btnText: "",
    // 默认页-默认图
    defaultSrc:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",

    productTouchTop: true,
    isIpx: false,
    list: [],
    traceId: "",
  },
  observers: {
    productTouchTop: function (val) {
      this.notifyTop(val);
    },
    updateNum: function (newval) {
      if (newval) {
        for (let i = 0; i < this.data.list.length; i++) {
          updateGoodsNum(
            this,
            this.data.list[i].data,
            newval,
            `list[${i}].data`
          );
        }
      }
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        isIpx: app.globalData.isIpx,
      });
    },
    ready() {},
    detached() {},
  },
  methods: {
    // 获取门店首页数据
    fetchVipData() {
      let buriedObj = this.data.buriedObj || {};
      mp.loading_cover();
      return new Promise((resolve, reject) => {
        request({
          ...FNIDS.tabActivity,
          isForbiddenDialog: true,
          isNeedDealError: true,
          method: "POST",
          pageId: buriedObj.pageIdFirstPage || "",
          body: {
            orgCode: this.data.orgCode,
            storeId: this.data.storeId,
            activityId: this.data.activityId,
            type: "activity",
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
            let { code, result = {} } = res.data;
            if (code == 0 && result) {
              this.setData({
                traceId: res.data.traceId || "",
              });
              resolve(result);
            } else {
              reject(res);
              wx.reportMonitor(10, 20);
            }
          })
          .catch(() => {
            mp.hideLoading();
            this.setData({
              showEmpty: true,
              type: 1,
              tips: "获取商品信息失败",
              btnText: "重新加载",
            });
            wx.reportMonitor(10, 20);
          });
      });
    },
    // 处理接口成功数据
    handleSuccess(result) {
      this.setData({
        showEmpty: false,
        showGoodListEmpty: !result.data.length,
        type: 1,
        btnText: "重新加载",
        tips: "获取商品信息失败",
        list: result.data || [],
      });
    },
    // 处理接口异常数据
    handleFail(result) {
      this.setData({
        showEmpty: true,
        type: 1,
        btnText: "重新加载",
        tips: (result && result.data && result.data.msg) || "获取商品信息失败",
      });
    },
    // 监听首页列表滑动
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
    // 通知父组件，来控制父组件的上下滑动面板
    notifyTop(val) {
      this.triggerEvent("touchTop", {
        data: val,
      });
    },
    onDefaultBtnEvent() {
      this.fetchVipData()
        .then((result) => {
          this.handleSuccess(result);
        })
        .catch((result) => {
          this.handleFail(result);
        });
    },
    clickMoreBtn(e) {
      let { to, params, userAction } = e.currentTarget.dataset;
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-storeVip-1`,
          options: this.data.options,
        },
      });
    },
  },
});