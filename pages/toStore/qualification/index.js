import { pvBuriedV2_ } from "../../../common/util/BI.js";
Page({
  data: {
    list: []
  },
  onLoad() {
    let list = wx.getStorageSync("qualificationList");
    this.setData({
      list: list || []
    })
  },
  onHide() {
    wx.removeStorageSync("qualificationList");
  },
  pvFunc(back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: this.data.storeId || "",
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || "",
        },
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || "",
    });
  },
})