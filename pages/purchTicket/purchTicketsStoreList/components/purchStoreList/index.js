import {
  request,
  FNIDS
} from '../../../../../common/util/api';
import util from '../../../../../common/util/util'
let app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {
        this.setData({
          storeList: newVal,
        });
      },
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    options: {
      type: Object,
      value: {},
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    storeList: [],
    // 收缩的商品数量
    amountOfFold: 2,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店
    handleStore(e) {
      let data = e.currentTarget.dataset;
      let index = data.index;
      let skuId = data.skuId || "";
      let storeId = data.storeId || "";
      let orgCode = data.orgCode || "";
      let userAction = {};
      let storeListItem = this.data.storeList[index];
      let jumpType = storeListItem.to || "";

      if (jumpType == "store") {
        wx.navigateTo({
          url:
            "/pages/store/index?storeId=" +
            storeId +
            "&skuId=" +
            skuId +
            "&orgCode=" +
            orgCode +
            "&longitude=" +
            app.globalData.addressInfo.longitude +
            "&latitude=" +
            app.globalData.addressInfo.latitude +
            "&userAction=" +
            JSON.stringify(userAction),
          preObj: this.data.recommendObj,
          buried_position: {
            key: "purchTicketsStoreList-purchStoreList-handleStore1",
            options: this.data.options,
          },
        });
      } else if (jumpType == "goodsList") {
        wx.navigateTo({
          url:
            "/pages/purchTicket/purchTickets/purchTickets?stationNo=" +
            storeListItem.params.storeId +
            "&couponId=" +
            storeListItem.params.limitId +
            "&longitude=" +
            app.globalData.addressInfo.longitude +
            "&latitude=" +
            app.globalData.addressInfo.latitude +
            "&orgCode=" +
            storeListItem.orgCode,
          preObj: this.data.recommendObj,
          buried_position: {
            key: "purchTicketsStoreList-purchStoreList-handleStore2",
            options: this.data.options,
          },
        });
      } else if (data.use == "home") {
        wx.switchTab({
          url: "/pages/home/home",
          preObj: this.data.recommendObj,
        });
      }
    },

    // 促销信息
    showPromotionTag(e) {
      let index = e.currentTarget.dataset.index;
      let storeListItem = this.data.storeList[index];
      // if (storeListItem.tags && storeListItem.tags.length < 3) {
      //     wx.navigateTo({
      //         url: '../store/index?storeId=' + storeListItem.storeId + "&orgCode=" + storeListItem.orgCode + '&longitude=' + app.globalData.addressInfo.longitude + '&latitude=' + app.globalData.addressInfo.latitude,
      //     });
      //     return;
      // }

      if (!storeListItem.expend) {
        storeListItem.expend = true;
        storeListItem.transfromClass = "arrow-up";
        storeListItem.couponHeightClass = "";
        for (let i = 0; i < storeListItem.tags.length; i++) {
          if (i > 1) {
            storeListItem.tags[i].promotionState = "show";
          }
        }
      } else {
        storeListItem.expend = false;
        storeListItem.transfromClass = "";
        storeListItem.couponHeightClass = "coupon_height";
        for (let i = 0; i < storeListItem.tags.length; i++) {
          if (i > 1) {
            storeListItem.tags[i].promotionState = "hide";
          }
        }
      }
      this.setData({
        storeList: this.data.storeList,
      });
    },

    // 跟新门店购物车数量
    handleCartNum() {
      let storeIds = [];
      let storeList = this.data.storeList || [];
      storeList.forEach((item) => {
        storeIds.push(item.storeId);
      });
      // 请求购物车数量
      request({
        method: "POST",
        ...FNIDS.getStoreCartNum,
        body: {
          chgNumReturnType: "2",
          storeIds: storeIds,
          cartUuid: util.getUUIDMD5(),
        },
        preObj: this.data.recommendObj || {},
      })
        .then((res) => {
          let result = res.data.result;
          if (result && result.length > 0) {
            storeList.forEach((item) => {
              result.forEach((subItem) => {
                if (item.storeId == subItem.storeid) {
                  item.inCartNum = subItem.num;
                }
              });
            });
            this.setData({
              storeList: storeList,
            });
          }
        })
        .catch(() => {
          // console.log(err)
        });
    },

    // 点击商品跳转到门店
    handleStoreSkuItemClick: function (e) {
      let data = e.currentTarget.dataset;
      let promotionType = data.promotionType || "";
      let activityId = data.activityId || "";
      let skuId = data.skuId || "";
      let storeId = data.storeId || "";
      let orgCode = data.orgCode || "";
      wx.navigateTo({
        url:
          "/pages/store/index?storeId=" +
          storeId +
          "&orgCode=" +
          orgCode +
          "&skuId=" +
          skuId +
          "&activityId=" +
          activityId +
          "&promotionType=" +
          promotionType +
          "&longitude=" +
          app.globalData.addressInfo.longitude +
          "&latitude=" +
          app.globalData.addressInfo.latitude,
        preObj: this.data.recommendObj,
        buried_position: {
          key: "purchTicketsStoreList-purchStoreList-handleStoreSkuItemClick",
          options: this.data.options,
        },
      });
    },
  },
});
