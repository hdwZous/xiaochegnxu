import { clickBuriedV2_ } from "../../../../../common/util/BI";
import util from '../../../../../common/util/util'
let app = getApp();
const { judgeAllowBtn, isLogin } = util
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headCouponList: {
      type: Array,
      value: [],
    },
    showDetention: {
      type: Boolean,
      value: false,
    },
    buriedObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },

  //监听数据变化
  observers: {
    headCouponList: function (newVal) {
      let lists = new Array();
      lists = newVal && newVal.length > 3 ? newVal.slice(0, 3) : newVal;
      this.setData({
        lists,
      });
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    lists: [],
    tmplIds: [],
    showSubscribe: false,
    subscribeImg: "",
    stepTypes: "",
    tmIds: [
      "tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs",
      "aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM",
      "fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I",
    ],
  },

  lifetimes: {},

  /**
   * 组件的方法列表
   */
  methods: {
    catchtouchmove() {
      return false;
    },
    async close() {
      let flags = await this.needShowSub();
      if (flags) {
        this.commonSetTmp("stepClose");
      } else {
        this.stepClose();
      }
    },
    async commonSetTmp(stepTypes) {
      let isClicked = await judgeAllowBtn(this.data.tmIds);
      // 未点击过总是允许，赋予弹层img
      let subscribeImg = !isClicked
        ? "https://storage.360buyimg.com/wximg/storewin/subscribe_img.png"
        : "";
      this.setData({
        tmplIds: this.data.tmIds,
        subscribeImg,
        showSubscribe: true,
        stepTypes,
      });
      //埋点
      let {
        pageIdFirstPage = "",
        prePageName = "",
        currentPageName = "",
      } = this.data.buriedObj || {};
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: {
          type: subscribeImg.length ? "subscribe" : "hideSubscribe",
          templateId: this.data.tmIds.join(),
          channelId: 104,
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
    rightBtnClick() {
      this.triggerEvent("detenEvent", {
        type: "gouse",
        data: {},
      });
    },
    async leave() {
      let flags = await this.needShowSub();
      if (flags) {
        this.commonSetTmp("stepLeave");
      } else {
        this.stepLeave();
      }
    },
    // 判断当前订阅消息是否需要弹出
    async needShowSub() {
      let subscribeAb = getApp().globalData.subscribeAb || "";
      let count = 0;
      let mpChannel = getApp().globalData.mpChannel || "";
      let isClicked = await judgeAllowBtn(this.data.tmIds);
      let record = wx.getStorageSync("subscribeCount") || {};
      let date = new Date();
      let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      try {
        record = wx.getStorageSync("subscribeCount") || {};
        if (record.days && record.days == now) {
          count = record.count;
        }
      } catch (e) {
        // console.log(err)
      }
      if (
        subscribeAb == "submit_a" &&
        count < 2 &&
        isClicked != null &&
        isLogin() &&
        mpChannel == "wx_xcx"
      ) {
        return true;
      } else {
        return false;
      }
    },
    stepClose() {
      this.triggerEvent("detenEvent", {
        type: "hideDetentionPop",
        data: {},
      });
      //埋点
      let {
        pageIdFirstPage = "",
        prePageName = "",
        currentPageName = "",
      } = this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickCloseFrame",
        click_par: {
          phone: app.globalData.loginStateInfo.PDJ_H5_MOBILE,
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
    stepLeave() {
      let pages = getCurrentPages();
      if (pages.length === 1) {
        wx.switchTab({
          url: "/pages/home/home",
        });
      } else {
        wx.navigateBack({
          delta: 1,
        });
      }
      this.triggerEvent("detenEvent", {
        type: "leave",
        data: {},
      });
      //埋点
      let {
        pageIdFirstPage = "",
        prePageName = "",
        currentPageName = "",
      } = this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickLeaveButton",
        click_par: {
          phone: app.globalData.loginStateInfo.PDJ_H5_MOBILE,
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      });
    },
    subscribeOk(e) {
      let { result } = e.detail;
      let flag = false;
      let tmIds = this.data.tmIds;
      let report = [];
      tmIds.forEach((item) => {
        if (result[item] == "accept") {
          flag = true;
          report.push(item);
        }
      });
      if (flag == true) {
        // 假如temId有一个为accept，则表明用户选择了允许，需要缓存里记录次数
        let record = wx.getStorageSync("subscribeCount") || {};
        let date = new Date();
        let now = `${date.getFullYear()}${
          date.getMonth() + 1
        }${date.getDate()}`;
        if (record.days && record.days == now) {
          record.count += 1;
        } else {
          record.days = now;
          record.count = 1;
        }
        try {
          wx.setStorageSync("subscribeCount", record);
        } catch (e) {
          // console.log(err)
        }
        //埋点
        let {
          pageIdFirstPage = "",
          prePageName = "",
          currentPageName = "",
        } = this.data.buriedObj || {};
        //埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "clickLayer",
          click_par: {
            type: "subscribe",
            templateId: report.join(),
            channelId: 104,
            btnName: "accept",
          },
          currentPageName: currentPageName,
          prePageName: prePageName,
          pageId: pageIdFirstPage,
        });
      }
      this.subscribeFail();
    },
    subscribeFail() {
      switch (this.data.stepTypes) {
        case "stepClose":
          this.stepClose();
          break;
        case "stepLeave":
          this.stepLeave();
          break;
        default:
          break;
      }
    },
  },
});
