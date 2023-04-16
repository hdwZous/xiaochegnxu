import { clickBuriedV2_ } from "../../common/util/BI";
import utils from '../../common/util/util'
let app = getApp();
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    locationError: {
      type: Object,
      value: {},
      observer: function (err) {
        let errMsg = err && err.errMsg;
        if (errMsg) {
          let tipsMsg = "未授权微信位置，请领券后开启或直接授权~";
          let platform = app.globalData.systemInfo.system;
          if (platform.indexOf("iOS") > -1) {
            if (
              errMsg.indexOf("deny") > -1 ||
              errMsg.indexOf("response") > -1
            ) {
              // 微信授权未开启
              tipsMsg = "未授权微信位置，请领券后开启或直接授权~";
            } else if (
              errMsg.indexOf("system") > -1 &&
              errMsg.indexOf("denied") > -1
            ) {
              // 设置未开启
              tipsMsg =
                "手机定位未授权，你可以：<br/> 1、前往“设置—>隐私—>定位服务—>微信”进行授权 <br/>2、点击页面按钮手动选择地址";
            }
          } else {
            if (errMsg.indexOf("auth") > -1 && errMsg.indexOf("denied") > -1) {
              // 微信授权未开启
              tipsMsg = "未授权微信位置，请领券后开启或直接授权~";
            } else if (
              errMsg.indexOf("system") > -1 &&
              errMsg.indexOf("denied") > -1
            ) {
              // 设置未开启
              tipsMsg =
                "微信应用未授权定位，你可以：<br/> 1、请前往手机“设置”进行授权 <br/>2、点击页面按钮手动选择地址";
            } else if (
              errMsg.indexOf("WIFI_LOCATIONONSWITCHOFF") > -1 ||
              err.errCode == 2
            ) {
              tipsMsg =
                "手机GPS定位未开启，你可以： <br/>1、请前往“设置”开启 <br/>2、点击页面按钮手动选择地址";
            }
          }
          this.setData({
            tipsMsg: tipsMsg,
          });
        }
      },
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
  data: {
    // 展示未授权提示文案
    tipsMsg: "",
  },
  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行)
   */
  attached() {
    let isLogin = utils.isLogin();
    // 埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickNoAuthorize",
      click_par: {
        islogin: isLogin,
      },
      currentPageName: this.data.currentPageName,
      prePageName: this.data.currentPageName,
      pageId: this.data.pageId,
    });
  },
  pageLifetimes: {},
  methods: {
    // 去地址页
    goToAddress() {
      let { buriedObj = {} } = this.data;
      if (utils.isLogin()) {
        wx.navigateTo({
          url: "/pages/address/home/index?from=locationDefault",
          preObj: buriedObj
        });
      } else {
        wx.navigateTo({
          url: "/pages/address/search/index?from=locationDefault",
          preObj: buriedObj
        });
      }
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickSelectAddress",
        click_par: {
          islogin: utils.isLogin(),
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.currentPageName,
        pageId: this.data.pageId,
      });
    },
    // 去设置页
    goToSetting() {
      wx.openSetting({
        complete: () => {
          app.globalData.refreshHomeFlag = true;
        },
      });
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickCouponAuthorize",
        click_par: {
          islogin: utils.isLogin(),
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.currentPageName,
        pageId: this.data.pageId,
      });
    },
  },
});
