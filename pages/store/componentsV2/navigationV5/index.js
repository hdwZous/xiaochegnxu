import util from "../../../../common/util/util";
import { doFollow } from "../../../../common/util/services";
import { mpCmsJump } from "../../../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor: {
      type: String,
      value: "#47b34f",
      observer(newval) {
        this.setNavigationBarColor(newval);
      },
    },
    color: {
      type: String,
      value: "white",
    },
    navTitle: {
      type: String,
      value: "京东到家",
    },
    homeUrl: {
      type: String,
      value: "/pages/home/home",
    },
    navigateType: {
      type: String,
      value: "switchTab",
    },
    preventBack: {
      type: Boolean,
      value: false,
    },
    backing: {
      type: Boolean,
      value: false,
    },
    storeInfo: {
      type: Object,
      value: null,
    },
    headCouponList: {
      type: Array,
      value: [],
    },
    storeId: {
      type: String,
      value: "",
    },
    showCoupon: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          let { pageIdFirstPage, currentPageName, prePageName } =
            this.data.buriedObj || {};
          clickBuriedV2_({
            click_id: "showCoupon",
            click_par: {
              traceId: this.data.traceId || "",
            },
            pageId: pageIdFirstPage || "",
            currentPageName,
            prePageName,
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
    isCart: {
      type: Boolean,
      value: true
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    compatible: false,
    showBack: false,
    showHome: false,
    statusBarHeight: 0,
    titleBarHeight: 46,
    capsule: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去商品搜索
    goToSearch() {
      mpCmsJump({
        pageType: "p70",
        params: {
          fromSource: "storehome",
          ids: this.data.storeId,
          curStoreId: this.data.storeId,
          orgCode: this.data.storeInfo.orgCode || "",
          industryTag: this.data.storeInfo.industry || "",
          isCart: this.data.isCart,
        },
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-navigationV5-1`,
          options: this.data.options,
        },
      });
    },
    //导航标题背景色为白色时 图标为黑 ，反之亦然
    setNavigationBarColor(newval) {
      if (
        newval === "#FFF" ||
        newval === "#fff" ||
        newval === "#ffffff" ||
        newval === "#FFFFFF" ||
        newval === "white"
      ) {
        wx.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#ffffff",
        });
      } else if (
        newval === "#000000" ||
        newval === "#000" ||
        newval === "black"
      ) {
        wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#000000",
        });
      }
    },
    goBack() {
      if (!this.data.backing) {
        this.data.backing = true;
        if (!this.data.preventBack) {
          if (this.data.headCouponList.length && this.todayNeedShowPop()) {
            this.triggerEvent("navEvent", {
              type: "back",
              data: {
                isPop: true,
              },
            });
            this.data.backing = false;
          } else {
            this.triggerEvent("navEvent", {
              type: "back",
              data: {
                isPop: false,
              },
            });
            this.data.backing = false;
          }
        }
      }
    },

    goHome() {
      if (!this.data.navigateType) {
        this.data.navigateType = "switchTab";
      }
      if (this.data.headCouponList.length && this.todayNeedShowPop()) {
        this.triggerEvent("navEvent", {
          type: "home",
          data: {
            isPop: true,
          },
        });
      } else {
        wx[`${this.data.navigateType}`]({
          url: this.data.homeUrl,
        });
      }
    },
    // 判断门店挽留弹窗当天是否弹出过
    todayNeedShowPop() {
      let old = "";
      try {
        old = wx.getStorageSync("detention");
      } catch (e) {
        // console.log(e)
      }
      let date = new Date();
      let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      if (now != old) {
        try {
          wx.setStorageSync("detention", now);
        } catch (e) {
          // console.log(e)
        }
        return true;
      } else {
        return false;
      }
    },
    showHomeOrBack() {
      let pages = getCurrentPages();
      if (pages.length === 1) {
        this.setData({
          showHome: true,
        });
      } else if (pages.length > 1) {
        this.setData({
          showBack: true,
        });
      }
    },
    goScan() {
      this.triggerEvent("navEvent", {
        type: "clickScan",
        data: {},
      });
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "clickElement",
        click_par: {
          iconName: "扫一扫",
          storeId: this.data.storeId || "",
          type: 3,
        },
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName,
      });
    },
    // 关注门店
    clickHeart() {
      if (util.isLogin()) {
        let isFollow = !this.data.storeInfo.isFollow;
        doFollow(isFollow, this.data.storeId)
          .then((res) => {
            let result = res.data.result;
            if (result) {
              this.setData({
                // 点赞
                ["storeInfo.isFollow"]: isFollow,
              });
              wx.showToast({
                title: isFollow ? "关注成功" : "取消关注",
                icon: "none",
              });
              this.triggerEvent("navEvent", {
                type: "followStore",
                data: isFollow,
              });
              let { pageIdFirstPage, currentPageName, prePageName } =
                this.data.buriedObj || {};
              clickBuriedV2_({
                click_id: "clickElement",
                click_par: {
                  iconName: "关注门店",
                  storeId: this.data.storeId || "",
                  type: 2,
                },
                pageId: pageIdFirstPage || "",
                currentPageName,
                prePageName,
              });
            }
          })
          .catch(() => {});
      } else {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
          buried_position: {
            key: `store-navigationV5-2`,
            options: this.data.options,
          },
        });
      }
    },
    showCoupon() {
      this.triggerEvent("navEvent", {
        type: "showCouponMap",
        data: {},
      });
    },
  },
  lifetimes: {
    attached() {
      let capsule = util.getCapsule();
      let sysInfo = wx.getSystemInfoSync() || {};
      let compatible = util.isCompatible();
      this.setData({
        compatible: compatible < 0 ? false : true, //是否兼容
        capsule,
        statusBarHeight: sysInfo.statusBarHeight || 0,
      });
      //显示返回还是home
      this.showHomeOrBack();
    },
  },
});