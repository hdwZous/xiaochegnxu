import { request, FNIDS } from "../../../../../common/util/api";
import mp from '../../../../../common/util/wxapi'
import {computeFloatBall} from "../../public.js"
let app = getApp()

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
    // 活动id
    activityId: {
      type: String,
      value: "",
    },
    // 频道类型
    channelBusiness: {
      type: String,
      value: "",
    },
    // 频道id
    channelId: {
      type: String,
      value: "",
    },
    updateNum: {
      type: Object,
      value: {},
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    options: {
      type: Object,
      value: {}
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
  floorList: [],
  isLoadRests: true,
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
    floorList: [],
    isIpx: false,
    traceId: "", // 埋点需要
  },
  observers: {
    productTouchTop: function (val) {
      this.notifyTop(val);
    },
  },
  lifetimes: {
    attached() {
      this.setData({
        isIpx: app.globalData.isIpx,
      });
      this.fetchIndexData()
        .then((result) => {
          this.handleSuccess(result);
        })
        .catch((result) => {
          this.handleFail(result);
        });
    },
    ready() {},
    detached() {},
  },
  methods: {
    // 获取门店频道数据
    fetchIndexData() {
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
            type: "storeChannel",
            activityId: this.data.activityId || "",
            channelBusiness: this.data.channelBusiness || "",
            channelId: this.data.channelId || "",
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
            // reportRequestTime(
            //     startTime,
            //     Date.now(),
            //     "门店频道页",
            //     "pages/store/index",
            //     "storeChannel"
            // );暂时不需要
            mp.hideLoading();
            let { code, result = {} } = res.data;
            if (code == 0 && result) {
              this.setData({
                traceId: res.data.traceId || "",
              });
              resolve(result);
            } else {
              reject(res);
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
          });
      });
    },
    // 处理接口成功数据
    handleSuccess(result) {
      result.data &&
        result.data.forEach((floor) => {
          if (
            floor.floorStyle == "mainCate" &&
            (floor.tpl == "tplm3" || floor.tpl == "tplm2")
          ) {
            if (floor.data.length > 10) {
              floor.data = floor.data.slice(0, 10);
            }
          }
          if (floor.floorStyle == "product" && floor.tpl == "tpl1-2") {
            if (floor.data.length > 10) {
              floor.data = floor.data.slice(0, 10);
            }
          }
        });
      this.setData(
        {
          floorList: result.data,
          showEmpty: false,
          showGoodListEmpty: !result.data.length,
          type: 1,
          btnText: "重新加载",
          tips: "获取商品信息失败",
        },
        function () {
          let timer = setTimeout(() => {
            clearTimeout(timer);
            this.loadRestFloor();
          }, 2000);
        }
      );
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
      //加载第二屏之后的楼层数据
      this.loadRestFloor();
      let { scrollTop } = e.detail;
      if (scrollTop > 3) {
        if (this.data.productTouchTop) {
          this.setData({
            productTouchTop: false,
          });
        }
      } else {
        if (!this.data.productTouchTop) {
          this.setData({
            productTouchTop: true,
          });
        }
      }
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
    // 点击通知newStoreV4组件锚中对应分类
    anchorProduct() {
      this.triggerEvent(
        "anchorCate",
        {
          type: "page-bottom",
          data: {},
        },
        { composed: true, bubbles: true }
      );
    },
    // 作为中转，将子组件的消息传递给父页面
    tellParent(e) {
      let data = e.detail.data || {};
      let type = e.detail.type;
      this.triggerEvent("anchorCate", {
        type: type,
        data: data,
      });
    },
    // 加载第二屏楼层数据
    loadRestFloor() {
      if (this.isLoadRests) {
        this.isLoadRests = false;
        this.setData({
          floorList: this.data.floorList.concat(this.floorList),
        });
      }
    },
    onDefaultBtnEvent() {
      this.fetchIndexData()
        .then((result) => {
          this.handleSuccess(result);
        })
        .catch((result) => {
          this.handleFail(result);
        });
    },
  },
});