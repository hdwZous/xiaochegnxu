import { request, FNIDS } from "../../../../common/util/api";
import { isLogin } from "../../../../common/util/loginUtil";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import emitter from "../../../../common/util/events";
import util from "../../../../common/util/util";
import djBus from "../../../../common/util/djBus";
let poi = wx.getStorageSync("address_info").poi;
const defaultError = {
  popType1: {
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
    btnText: "知道了",
    bgColor: "#fff",
  },
  popType2: {
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noclosedV1.png",
    title: "门店休息啦",
    subTitle: "阿哦！你来晚了一丢丢，门店又暂时休息了！",
    bgColor: "#f6f6f6",
  },
  popType3: {
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noclosedV1.png",
    btnText: "知道了",
    title: "门店订单已约满",
    subTitle: "订单爆棚啦，去逛逛其他商家吧~",
    bgColor: "#f6f6f6",
  },
  // 休息中和控单接口异常的默认展示
  popDefault: {
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noclosedV1.png",
    title: "当前门店状态异常，请选择其他门店购物",
    bgColor: "#f6f6f6",
  },
};

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    showPop: {
      type: Boolean,
      value: false,
      observer: function (newval) {
        //上报pv埋点 当前只打开了超区，没打开
        if (newval && !this.data.showAddress) {
          this.setData({
            isLogin: isLogin(),
            isOpenAccessibility: getApp().globalData.isOpenAccessibility,
          });
          djBus.once("mask_outrange", (data) => {
            this.setData({
              recommendObj: {
                prePageName: data.currentPageName,
                currentPageName: "outRange",
                pageSource: data.pageSource,
                refPageSource: data.refPageSource,
                pageIdFirstPage: util.getPageIdrandom(),
              },
            }, () => {
              if (data.currentPageName != "storeinfo") {
                clickBuriedV2_({
                  click_id: "test_popAndPageDiff0906",
                  click_par: {
                    recommendObj: data,
                    options: this.data.options,
                    popName: "outRange",
                    popRealPrePageName: data.currentPageName,
                    popSelfPrePageName: "storeinfo",
                  },
                });
              }
              if (!this.data.pageIsGetInfoOnShow) {
                clickBuriedV2_({
                  click_id: "test_pageIsGetInfoOnShow0906",
                  click_par: {
                    popName: "outRange",
                    route: "/pages/store/index",
                    type: "open",
                  },
                });
              }
              this.pvFunc();
              setTimeout(() => {
                const pageList = getCurrentPages();
                const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
                const prePageId = this.data.buriedObj.pageIdFirstPage || ''
                emitter.emit("halfMaskFunc_"+route+"_outRange_"+prePageId, {
                  name: "outRange",
                  type: "open",
                  selector: "#store >>> #overZone",
                  buriedObj: this.data.recommendObj,
                });
              }, 10);
            });
            
          });
        }
      },
    },
    //弹层类型 1超区、2闭店提醒弹层、3控单
    popType: {
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        if (newVal != oldVal && newVal) {
          let info = {
            isLogin: isLogin(),
            isOpenAccessibility: getApp().globalData.isOpenAccessibility,
          };
          // 如果是超区，需要拿缓存中的地址信息展示
          if (newVal == 1) {
            let poi = wx.getStorageSync("address_info").poi;
            info.poi = poi;
            info.paddingTop = 300;
            this.setData(info);
          } else {
            info.paddingTop = 0;
            this.setData(info);
          }
          if (!this.data.isOpenAccessibility) {
            this.fetchData();
          }
        }
      },
    },
    // 行业标签
    industry: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
    pageIsGetInfoOnShow: {
      type: Boolean,
      value: false
    }
  },
  data: {
    showAddress: false,
    showAddressPop: false,
    sameBrandStoreList: {
      storeList: [],
      tips: "",
    },
    nearbyStoreList: {
      storeList: [],
      tips: "",
    },
    mainTitle: "", // 弹窗主文案
    subtitle: "", // 弹窗副文案
    poi: poi || "",
    isLogin: false,
    isOpenAccessibility: getApp().globalData.isOpenAccessibility, // 是否开启了无障碍
    paddingTop: 0,
    default: {}, // 空白图
    showDefault: true, // 是否展示空白图
    currentTraceId: ""
  },
  pageLifetimes: {
    show() {},
  },
  lifetimes: {
    ready: function () {
      this.setData({
        isLogin: isLogin(),
      });
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    // 点击关闭超区弹层
    handleCloseOverHalf() {
      this.setData({
        showPop: false,
      });
      if (!this.data.pageIsGetInfoOnShow) {
        clickBuriedV2_({
          click_id: "test_pageIsGetInfoOnShow0906",
          click_par: {
            popName: "outRange",
            route: "/pages/store/index",
            type: "close",
          },
        });
      }
      const pageList = getCurrentPages();
      const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
      const prePageId = this.data.buriedObj.pageIdFirstPage || ''
      emitter.emit("halfMaskFunc_"+route+"_outRange_"+prePageId, {
        name: "outRange",
        type: "close",
        selector: "#store >>> #overZone", // 用于页面找打半弹层
        buriedObj: this.data.recommendObj,
      });
    },
    // 点击更换地址,展开地址弹层
    handelAddress() {
      djBus.emit("mask_select_address", this.data.recommendObj);
      this.setData({
        showAddress: true,
        showAddressPop: true,
      });
    },
    // 点击关闭地址弹框
    handleCloseStoreAddres() {
      this.setData({
        showAddress: false,
      });
    },
    // 地址弹层，点击具体某一个地址
    selectdAddressOver(e) {
      let data = e.detail.dataOver;
      this.triggerEvent("pageEvent", {
        data: data,
        type: "overZone",
      });
      this.setData({
        showPop: false,
        showAddressPop: false,
        showAddress: false,
      });
      if (!this.data.pageIsGetInfoOnShow) {
        clickBuriedV2_({
          click_id: "test_pageIsGetInfoOnShow0906",
          click_par: {
            popName: "outRange",
            route: "/pages/store/index",
            type: "close",
          },
        });
      }
      const pageList = getCurrentPages();
      const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
      const prePageId = this.data.buriedObj.pageIdFirstPage || ''
      emitter.emit("halfMaskFunc_"+route+"_outRange_"+prePageId, {
        name: "outRange",
        type: "close",
        selector: "#store >>> #overZone", // 用于页面找打半弹层
        buriedObj: this.data.recommendObj,
      });
    },
    pvFunc(back) {
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
      pvBuriedV2_({
        page_par: {
          storeId: this.data.storeId,
          popType: this.data.popType + "",
        },
        pageId: pageIdFirstPage,
        prePageName: prePageName,
        currentPageName: "outRange",
        isBack: back || "",
      });
    },
    popEvent(e) {
      let type = e.detail.type;
      if (type == "hidePop") {
        this.handleCloseOverHalf();
      } else if (type == "handelAddress") {
        this.handelAddress();
      }
    },
    // 请求弹层数据
    fetchData() {
      let { functionId = "", appVersion = "" } = FNIDS.storeOverZone || {};
      let {
        storeId = "",
        orgCode = "",
        industry = "",
        popType = "",
      } = this.data || {};
      request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          storeId,
          orgCode,
          industry,
          popType,
        },
        method: "POST",
        pageId:
          (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||
          "",
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          let {
            mainTitle = "",
            subtitle = "",
            sameBrandStoreList = {},
            nearbyStoreList = {},
          } = res.data.result;
          if (res.data.code == 0 && mainTitle) {
            let defaultInfo = defaultError[`popType${popType}`];
            if (popType == 2 || popType == 3) {
              // 如果接口返回了就用接口返回的文案
              defaultInfo.title = mainTitle;
              defaultInfo.subTitle = subtitle;
            }
            this.setData({
              mainTitle,
              subtitle,
              sameBrandStoreList,
              nearbyStoreList,
              showDefault:
                !sameBrandStoreList.storeList && !nearbyStoreList.storeList,
              default: defaultInfo,
              currentTraceId: res.data.traceId,
            });
          } else {
            this.handleError();
          }
        })
        .catch(() => {
          this.handleError();
        });
    },
    handleError() {
      let popType = this.data.popType;
      if (popType == 1) {
        this.setData({
          showDefault: true,
          default: defaultError[`popType1`],
        });
      } else if (popType == 2 || popType == 3) {
        this.setData({
          showDefault: true,
          default: defaultError[`popDefault`],
        });
      }
    },
  },
});
