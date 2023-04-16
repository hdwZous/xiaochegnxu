import { clickBuriedV2_ } from "../../common/util/BI";
// import {
//   request,
//   FNIDS
// } from "../../common/util/api";
import Public from "../../common/util/public";
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showFlag: {
      type: Boolean,
      value: false,
    },
    sceneId: {
      type: Number,
      value: 0,
    },
    popName: {
      type: String,
      value: "",
    },
    clickBuryName: {
      type: String,
      value: "",
    },
    from: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: "",
    },
    prePageName: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: "",
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bgData: {},
    floorArr: [],
    userAction: "",
  },
  ready() {
    this.fetchData();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    fetchData() {
      Public.getNewerListData(this.data.sceneId, "isFloor")
        .then((res) => {
          res &&
            res.floorArr &&
            res.floorArr.forEach((item) => {
              if (item.resourceNo == 100 && item.newUserCoupon) {
                item.newUserCoupon.amount = Math.floor(
                  item.newUserCoupon.amount || 0
                );
              }
            });
          this.setData({
            floorArr: res.floorArr || [],
            bgData: res.bgData,
          });
          this.triggerEvent("noticeFlag", {
            isNewPerFlag: true,
          });
          clickBuriedV2_({
            click_id: this.data.popName,
            click_par: {},
            create_time: new Date(),
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId,
          });
        })
        .catch(() => {
          this.triggerEvent("noticeFlag", {
            isNewPerFlag: false,
          });
        });
    },
    clickNewer(e) {
      let userAction = e.currentTarget.dataset.userAction || "";
      // 埋点
      clickBuriedV2_({
        click_id: this.data.clickBuryName || "new_user",
        click_par: {
          userAction: userAction,
        },
        create_time: new Date(),
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId,
      });
      let { buriedObj = {} } = this.data;
      if (this.data.from == "bargain") {
        wx.navigateTo({
          url: `/pages/h5/index?url=${encodeURIComponent(
            `https://${app.globalData.config.HOST}/pavilion/poseidon/newuser/index.html`
          )}`,
          preObj: buriedObj
        });
      } else {
        wx.navigateTo({
          url: "/pages/newer/index?userAction=" + userAction,
          preObj: buriedObj
        });
      }
    },
  },
});
