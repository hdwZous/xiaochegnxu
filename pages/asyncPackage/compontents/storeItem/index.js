
import { djCmsJump } from "../../../../common/util/agreementV2.js";
Component({
  options: {
    addGlobalClass: true,
  },
  lazyObj: {
    selector: ".ep_store-item",
    epSelector: ".ep_store-item",
  },
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (item) {
        if (item) {
          // 门店左上角的标
          let leftTopIconType = "";
          // 关注
          if (item.isfollow == 1 || item.attentionStatus == 1) {
            leftTopIconType = "home_icon_guanzhu";
          }
          // 常逛
          if (item.recommendType == 1) {
            leftTopIconType = "home_icon_oftenguang";
          } 
          // 推荐
          else if (item.recommendType == 2) {
            leftTopIconType = "home_icon_tuijian";
          }
          // 新店
          else if (item.recommendType == 6) {
            leftTopIconType = "home_icon_xindian";
          }
          // 24h
          else if (item.recommendType == 7) {
            leftTopIconType = "home_icon_24h";
          }
          // 关注
          else if (item.recommendType == 9) {
            leftTopIconType = "home_icon_guanzhu";
          }
          if (item.tags && item.tags.length) {
            // 促销标
            item.tags.forEach((tagItem, tagIndex) => {
              if (tagIndex > 0) {
                tagItem.show = false;
              } else {
                tagItem.show = true;
              }
              tagItem.words = tagItem.words.replace(/\#\#\#/gi, "");
            });
          }
          item.couponAndTagArrowDown = true;
          // 附近门店
          if (item.brosStore && item.brosStore.length > 1) {
            item.storeArrowDown = true;
          }
          this.setData(
            {
              storeItem: item,
              leftTopIconType,
            },
            () => {
              let query = this.createSelectorQuery();
              query
                .select(".coupon-wrap")
                .boundingClientRect((rect) => {
                  // 如果能获取节点高度
                  if (rect && rect.height) {
                    item.couponHeight = rect.height;
                    //console.log("coupon-wrap", rect.height);
                    this.setData({
                      [`storeItem.couponHeight`]: rect.height,
                    });
                  }
                })
                .exec();
              query
                .select(".coupon-in-one-line")
                .boundingClientRect((rect) => {
                  // 如果能获取节点高度
                  if (rect && rect.height) {
                    item.couponInOneHeight = rect.height;
                    // console.log("coupon-in-one-line", rect.height);
                    this.setData({
                      [`storeItem.couponInOneHeight`]: rect.height,
                    });
                  }
                })
                .exec();
            }
          );
        }
      },
    },
    // 埋点需要
    traceId: {
      type: String,
      value: "",
    },
    // 埋点需要
    buriedObj: {
      type: Object,
      value: {},
    },
    // 埋点需要，是否需要曝光
    noNeedExposure: {
      type: Boolean,
      value: false
    },
    fromWherePosition: {
      type: String,
      value: ""
    },
    storeStyle: {
      type: String,
      value: ''
    },
    keyword: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 门店列表
    storeItem: [],
    isShowTag: false,
    leftTopIconType: 0,
    img_load_error: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击券箭头
    clickCouponArrowIcon(e) {
      let { iconDown } = e.currentTarget.dataset || {};
      let item = this.data.storeItem || {};
      // 促销标展示状态
      item.tags &&
        item.tags.length &&
        item.tags.forEach((subItem, index) => {
          if (iconDown) {
            subItem.show = true;
          } else {
            if (index > 0) {
              subItem.show = false;
            } else {
              subItem.show = true;
            }
          }
        });
      item.couponAndTagArrowDown = !iconDown;

      this.setData({
        storeItem: item,
        isShowTag: iconDown,
      });
    },
    // 点击附近商家箭头
    clickStoreArrowIcon(e) {
      let { iconDown } = e.currentTarget.dataset || {};
      let item = this.data.storeItem || {};
      // 近商家状态
      item.storeArrowDown = !iconDown;
      this.setData({
        storeItem: item,
      });
    },
    /**
     * @param Object 跳转参数和埋点信息
     * @return String 页面跳转需要的参数
     */
    parseParams(obj) {
      let userAction = "";
      if (obj.userAction) {
        userAction = encodeURIComponent(obj.userAction);
      }

      let paramsStr = "";
      for (let i in obj.params) {
        if (i == "isAddCart") {
          let str = obj.params[i] + "";
          obj.params[i] = str == "true" ? true : "";
        }
        // 处理单品单结算，preSaleSkuInfos字段，下发object类型的参数转化为json,string---为了扩展处理所有对象类型
        if (obj.params[i] != null && typeof obj.params[i] == "object") {
          obj.params[i] = JSON.stringify(obj.params[i]);
        }
        paramsStr += "&" + i + "=" + (obj.params[i] || "");
      }

      if (JSON.stringify(obj.params) == "{}") {
        paramsStr = "?userAction=" + userAction + "&traceId=" + obj.traceId;
      } else {
        paramsStr =
          "?" +
          paramsStr.slice(1) +
          "&userAction=" +
          userAction +
          "&traceId=" +
          obj.traceId;
      }
      return paramsStr;
    },
    // 点击去门店
    goToStore(e) {
      let { storeItem = {} } = e.currentTarget.dataset || {};
      let { to = "home", params = {}, userAction = "" } = storeItem || {};
      if (params.bgType && params.bgType=='jdToStore') {
        params.storeStyle = this.data.storeStyle
        params.keyword = this.data.keyword
        djCmsJump({
          to,
          userAction,
          params,
          preObj: this.data.buriedObj,
          traceId: this.data.traceId || "",
        });
      } else {
        let app = getApp();
        let addressInfo = app.globalData.addressInfo || {};
        let lat = (addressInfo && addressInfo.latitude) || "";
        let lng = (addressInfo && addressInfo.longitude) || "";
        let pageUrl = "/pages/store/index";
        let obj = {
          to,
          userAction,
          params,
          traceId: this.data.traceId,
        };
        let isShowGoodsDetail =
          obj.params.isShowGoodsDetail != undefined || false;
        // 超区跳转用redirectTo跳转
        if (this.data.fromWherePosition === "outRange") {
          if (isShowGoodsDetail) {
            wx.redirectTo({
              url: `${pageUrl}${this.parseParams(
                obj
              )}&longitude=${lng}&lalngtitude=${lat}`,
              preObj: this.data.buriedObj,
            });
          } else {
            wx.redirectTo({
              url: `${pageUrl}${this.parseParams(
                obj
              )}&isShowGoodsDetail=${isShowGoodsDetail}&longitude=${lng}&lalngtitude=${lat}`,
              preObj: this.data.buriedObj,
            });
          }
        } else {
          if (isShowGoodsDetail) {
            wx.navigateTo({
              url: `${pageUrl}${this.parseParams(
                obj
              )}&longitude=${lng}&lalngtitude=${lat}`,
              preObj: this.data.buriedObj,
            });
          } else {
            wx.navigateTo({
              url: `${pageUrl}${this.parseParams(
                obj
              )}&isShowGoodsDetail=${isShowGoodsDetail}&longitude=${lng}&lalngtitude=${lat}`,
              preObj: this.data.buriedObj,
            });
          }
        }
      }
    },
    // 点击膨胀券
    clickExpandCoupon(e) {
      let { to, params, userAction } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        userAction,
        params,
        preObj: this.data.buriedObj,
        traceId: this.data.traceId || "",
      });
    },
    imageError(e) {
      this.setData({
        img_load_error: true
      })
    }
  },
});
