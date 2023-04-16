import { request,FNIDS } from "../../../common/util/api"
import { Lazy } from "../../../common/util/lazyLoad"
import mp from '../../../common/util/wxapi'
import util from '../../../common/util/util'
import {mpCmsJump} from "../../../common/util/agreementV2";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI.js";

let app = getApp()
// 【图片懒加载】实例对象
let LazyLoad = null;
// 直播列表
let list = []
Page({
  data: {
    page: 1,
    pageSize: 10,

    showDefault: false, // 默认页-是否展示
    defaultType: 0, // 默认页-类型
    defaultTips: "", // 默认页-提示
    defaultBtnText: "", // 默认页-按钮
    defaultSrc:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",

    roomid: null,
    list: [],
    hasNextPage: true,
    imgLazyLoad: {},
    // 是否是iphoneX
    isIpx: false,
    reachBottom: false,
  },
  scopedData: {
    // 附近商家的分页
    currentPage: 1,
  },
  onLoad(options) {
    this.setData({
      isIpx: app.globalData.isIpx,
      options: options,
    });
  },
  onReady() {
    LazyLoad = new Lazy(this, ".container .lazy-load");
  },
  onShow() {
    this.fetchData(this.data.page);
  },
  onHide() {},
  onUnload() {
    // 卸载监听图片懒加载
    LazyLoad && LazyLoad.disconnectObserver && LazyLoad.disconnectObserver();
  },
  onPullDownRefresh() {
    this.setData({ page: 1 });
    this.fetchData(this.data.page);
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    if (this.data.hasNextPage) {
      this.setData({
        page: this.data.page + 1,
      });
      this.fetchData(this.data.page);
    }
    this.setData({
      reachBottom: !this.data.reachBottom,
    });
  },
  fetchData(currentPage) {
    mp.loading_cover();
    let addressInfo = wx.getStorageSync("address_info");
    let lgt = (addressInfo && addressInfo.longitude) || "";
    let lat = (addressInfo && addressInfo.latitude) || "";
    let cityId = (addressInfo && addressInfo.cityId) || "";
    let { pageIdFirstPage } = this.data.recommendObj || {};
    request({
      ...FNIDS.getLiveInfoList,
      body: {
        currentPage: currentPage || 1,
        dataSize: this.data.pageSize || 10,
        lat: lat || "",
        lgt: lgt || "",
        cityId: cityId || "",
      },
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        mp.hideLoading();
        let code = res.data.code;
        if (code == "0") {
          let result = res.data.result || "";
          if (result && result.length > 0) {
            result.forEach((item) => {
              item.marketingImg = util.dealImgUrl(233, 186, item.marketingImg);
              item.count = item.goodsImg.length;
              item.goodsImg = item.goodsImg.splice(0, 2);
              item.goodsImg.forEach((goodUrl) => {
                goodUrl = util.dealImgUrl(91, 91, goodUrl);
              });
            });

            if (currentPage == 1) {
              list = result;
            } else {
              list = list.concat(result);
            }
            this.setData(
              {
                list: list,
              },
              () => {
                // 监听图片懒加载
                LazyLoad &&
                  LazyLoad.initObserver &&
                  LazyLoad.initObserver((imgId) => {
                    if (!this.data.imgLazyLoad[imgId]) {
                      this.setData({
                        [`imgLazyLoad.${imgId}`]: true,
                      });
                    }
                  });
              }
            );
          } else {
            // 无数据
            this.setData({
              hasNextPage: false,
              showDefault: currentPage == 1 ? true : false,
              defaultType: 2,
              defaultTips: "暂无直播，正在努力开拓中！",
              // defaultBtnText: "重新加载",
              defaultSrc:
                "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
            });
          }
        } else if (code == "1") {
          // 经度或纬度不能为空
          this.setData({
            showDefault: true,
            defaultType: 1,
            defaultTips: res.msg || "未获取到地理位置！",
            defaultBtnText: "授权地理位置",
            defaultSrc:
              "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png",
          });
        } else {
          // 系统繁忙，请稍后再试
          this.setData({
            showDefault: true,
            defaultType: 2,
            defaultTips: res.msg || "服务异常！请稍后再试",
            defaultBtnText: "重新加载",
            defaultSrc:
              "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
          });
        }
      })
      .catch((err) => {
        mp.hideLoading();
        this.setData({
          // showDefault: true,
          defaultType: 2,
          defaultTips: err.msg || "服务异常！请稍后再试",
          defaultBtnText: "重新加载",
          defaultSrc:
            "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
        });
      });
  },
  // 监听默认事件
  defaultBtnEvent(e) {
    let type = e.detail.type;
    if (type === 1) {
      // 授权地理位置，跳转至首页授权。
      wx.switchTab({
        url: "/pages/home/home",
        preObj: this.data.recommendObj
      });
    } else if (type === 2) {
      // 刷新页面
      this.loadPage();
    }
  },
  jump(e) {
    let item = e.currentTarget.dataset.item;
    let roomId = item.roomid;
    let customParams = encodeURIComponent(
      JSON.stringify({ path: "pages/live/index", pid: 1 })
    );
    mpCmsJump({
      pageType: "p53",
      params: {
        room_id: roomId,
        custom_params: customParams,
      },
      preObj: this.data.recommendObj,
      buried_position: {
        key: "liveList",
        options: this.data.options
      }
    });

    let { pageIdFirstPage, prePageName, currentPageName } =
      this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "clickToLiveRoom",
      click_par: {
        roomId: item.roomid || item.roomId,
        liveStatus: item.liveStatus,
      },
      pageId: pageIdFirstPage,
      prePageName,
      currentPageName,
    });
  },
  clickSub(e) {
    let item = e.currentTarget.dataset.item;
    let { pageIdFirstPage, prePageName, currentPageName } =
      this.data.recommendObj || {};
    clickBuriedV2_({
      click_id: "click_blist",
      click_par: {
        roomId: item.roomid || item.roomId,
      },
      pageId: pageIdFirstPage,
      prePageName,
      currentPageName,
    });
  },
  pvFunc(back) {
    let {
      preUserAction,
      preTraceId,
      pageIdFirstPage,
      prePageName,
      currentPageName,
    } = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        ref_par: {
          userAction: preUserAction,
          traceId: preTraceId,
        },
      },
      pageId: pageIdFirstPage,
      prePageName,
      currentPageName,
      isBack: back || "",
    });
  },
});