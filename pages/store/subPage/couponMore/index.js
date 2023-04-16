import { djCmsJump, mpCmsJump } from '../../../../common/util/agreementV2'
import { request, FNIDS } from '../../../../common/util/api';
import { getCoupon, getCouponProtocol } from '../../../../common/util/services'
import mp from '../../../../common/util/wxapi';
import util from '../../../../common/util/util';
import { clickBuriedV2_, pvBuriedV2_ } from "../../../../common/util/BI";

Page({
  scopeData: {
    // 门店id
    storeId: "",
    // 商家id
    orgCode: "",
    // 当前页列表数据缓存
    listObj: {},
    isFirst: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 按钮选择状态
    activeIndex: 0,
    // tab数据
    tab: [],
    // 列表数据
    list: [],
    // 是否显示红包兑换弹层
    showVipExchange: false,
    // 红包兑换弹层数据
    vipExchange: {},
    isLogin: util.isLogin(),
    isFollow: 0,
    floorCode: "", // 8.20锚中分类的
    showVipCouponPop: false, // 是否展示v+会员券弹层
    fromPop: "", // 是否是老优惠券弹层进来的
    currentTraceId: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      storeId: options.storeId || "",
      orgCode: options.orgCode || "",
      isFollow: options.isFollow || 0,
      floorCode: options.floorCode || "",
      moreCouponAb: options.moreCouponAb || "",
      couponId: options.couponId || "",
      fromPop: options.fromPop,
      options: options
    });
    this.scopeData.storeId = options.storeId;
    this.scopeData.orgCode = options.orgCode;
    this.scopeData.userAction = options.userAction || "";
    this.getCurrentPageData(options.orgCode, options.storeId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (this.data.isLogin != util.isLogin() && util.isLogin()) {
      this.setData({
        isLogin: util.isLogin()
      })
      this.getCurrentPageData(this.data.orgCode, this.data.storeId);
      // this.updateCurrentPageData(
      //   this.scopeData.orgCode,
      //   this.scopeData.storeId
      // );
    }
  },
  pvFunc(back) {
    let {
      preUserAction,
      preTraceId,
      pageIdFirstPage,
      currentPageName,
      prePageName,
    } = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        ref_par: {
          traceId: preTraceId,
          userAction: preUserAction,
        },
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName,
      isBack: back || "",
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  // 点击tab
  clickTab(e) {
    let index = e.currentTarget.dataset.index;
    if (index != this.data.activeIndex) {
      this.setData({
        activeIndex: index,
        list: this.scopeData.listObj[index],
      });
      // 监控错误埋点
      clickBuriedV2_({
        click_id: "couponMoreListObj",
        click_par: {
          list: this.data.list || [111],
          scopeData: this.scopeData.listObj,
        },
      });
    }
  },

  //   获取当前页面数据
  getCurrentPageData(orgCode, storeId) {
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    request({
      ...FNIDS.stationMoreCouponInfo,
      body: {
        orgCode: orgCode,
        stationNo: storeId,
        grabPlat: 2,
        floorCode: this.data.floorCode || "",
        moreCouponAb: this.data.moreCouponAb || "",
        pageSource: pageSource || "storeAllCoupons",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || "",
        },
      },
      pageId: pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let result = res.data.result || [];
        let traceId = res.data.traceId || "";
        let tab = [];
        let listObj = {};
        let cur = 0;
        result.forEach((item, index) => {
          let tabItem = {
            title: item.title || "",
            index: index,
            userAction: item.userAction || "",
            floorCode: item.floorCode || "",
            moreCouponAb: item.moreCouponAb || "",
          };
          item.coupons.forEach((item, index) => {
            item.flag = true;
            item.cpIndex = index;
          });
          tab.push(tabItem);
          listObj[index] = item.coupons || [];
          if (this.data.floorCode == item.floorCode) {
            cur = index;
          }
        });
        // 列表数据缓存
        this.scopeData.listObj = listObj;
        this.scopeData.isFirst = false;
        // 更新列表数据
        this.setData({
          tab: tab,
          list: listObj[cur],
          activeIndex: cur || 0,
          currentTraceId: traceId,
        });
      })
      .catch(() => {
        // console.log(err)
      });
  },
  // 点击券
  rightBtnClick(e) {
    if (util.isLogin()) {
      let data = e.detail.data;
      let {
        couponShowType = "",
        activityCode = "",
        markState = 0,
        needToUse = 0,
        couponId = "",
        couponType = "",
        couponButton = {},
        styles = {},
        userAction = "",
      } = data;

      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "click_coupon",
        click_par: {
          skuId: "",
          activityCode: activityCode,
          couponId: couponId,
          couponType: couponType,
          actType:
            (styles.couponButStyle && styles.couponButStyle.title) ||
            couponButton.title ||
            "",
          storeId: this.data.storeId || "",
          userAction: userAction,
        },
        prePageName,
        currentPageName,
        pageId: pageIdFirstPage || "",
      });
      if (couponShowType == 1) {
        // 普通券
        if (needToUse == 1) {
          // 去使用
          this.handleCouponGo(data);
        } else {
          if (markState == 2) {
            // 未领取状态
            this.getCoupon(activityCode, data);
          }
        }
      }
    } else {
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          key: `store-couponMore-1`,
          options: this.data.options,
        },
      });
    }
  },
  // 优惠券跳转
  handleCouponGo(data) {
    getCouponProtocol({
      activityCode: data.activityCode || "",
      storeId: this.scopeData.storeId || "",
      markState: data.markState || "",
      refPageSource: "store",
      skuId: data.skuId || "",
      orgCode: this.scopeData.orgCode || "",
      couponGoSource: 0,
      couponId: data.couponId || "",
      couponPattern: data.couponPattern || "",
      promotionSource: "storePromotion",
    })
      .then((res) => {
        let result = res.data.result || "";
        if (res.data.code == "0" && result) {
          let { to = "", params = {} } = result;
          let paramsNew = {
            couponId: data.couponId || "",
          };
          for (let i in result.params) {
            if (i != "passThroughParam") {
              paramsNew[i] = params[i];
            } else {
              for (let j in params.passThroughParam) {
                if (params.passThroughParam[j]) {
                  paramsNew[j] = params.passThroughParam[j];
                }
              }
            }
          }
          if (to) {
            djCmsJump({
              to: to,
              params: paramsNew,
              userAction: data.userAction,
              preObj: this.data.recommendObj,
              buried_position: {
                key: `store-couponMore-2`,
                options: this.data.options,
              },
            });
          }
        } else {
          mp.toast({
            title:
              (res.data && res.data.msg) || "哎呀，点击太疼啦，稍后再点我哦~",
          });
        }
      })
      .catch(() => {
        mp.toast({
          title: "哎呀，点击太疼啦，稍后再点我哦~",
        });
      });
  },
  // 领取普通优惠券
  getCoupon(activityCode, data) {
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId,
    } = this.data.recommendObj || {};
    getCoupon({
      channel: "station_more_page",
      source: "homestore",
      code: activityCode,
      isFollow: data.isFans || 0,
      orgCode: this.scopeData.orgCode || "",
      storeNo: this.scopeData.storeId || "",
      isFloor: 0,
      pageSource: "store",
      needCouponGo: true,
      grabPlat: 1,
    })
      .then((res) => {
        let result = res.data.result;
        if (res.data.code == "0" && result) {
          if (result.busiCode === "AC4402") {
            // 限制V+会员领取
            this.setData({
              showVipCouponPop: true,
              popInfo: result.extFieldMap || {},
            });
            this.preventClick(data);
          } else if (result.busiCode === "AC4401") {
            // 限制商家会员领取
            mp.dialog({
              title: "温馨提示",
              content: result.message || "开通会员后才可领取哦~",
              confirmText: "去开通",
            })
              .then((res) => {
                if (res.confirm) {
                  // 去开通
                  if (util.isLogin()) {
                    let openId = "";
                    try {
                      let loginInfo = wx.getStorageSync("login_info");
                      openId = loginInfo.openId || "";
                    } catch (e) {
                      // console.log(e)
                    }
                    if (result.url) {
                      wx.navigateTo({
                        url:
                          "/pages/h5/index?&url=" +
                          encodeURIComponent(result.url + `&openId=${openId}`),
                        preObj: this.data.recommendObj,
                        buried_position: {
                          key: "store-couponMore-jumpHref",
                          options: this.data.options,
                        },
                      });
                    } else {
                      mp.toast({
                        title: "哎呀，跳转路径丢失啦！请稍后再试~",
                      });
                    }
                  } else {
                    wx.navigateTo({
                      url: `/pages/newLogin/login/login`,
                      preObj: this.data.recommendObj,
                      buried_position: {
                        key: "store-couponMore-jumpHref2",
                        options: this.data.options,
                      },
                    });
                  }
                }
                this.preventClick(data);
              })
              .catch(() => {
                this.preventClick(data);
              });
          } else if (result.busiCode === "AC4400") {
            // 限制VIP领取
            mp.dialog({
              title: "温馨提示",
              content: "VIP会员专享券，开通VIP会员即可领取！",
              showCancel: false,
              confirmText: "知道了",
            })
              .then(() => {
                this.preventClick(data);
              })
              .catch(() => {
                this.preventClick(data);
              });
          } else if (result.busiCode === "AC3600") {
            // 限制粉丝领取
            mp.dialog({
              title: "温馨提示",
              content: result.message || "关注店铺即可领取！",
              confirmText: "关注领取",
            })
              .then((res) => {
                if (res.confirm) {
                  // 关注并领取
                  request({
                    functionId: FNIDS.doFollow.functionId,
                    appVersion: FNIDS.doFollow.appVersion,
                    body: {
                      isFollow: true,
                      storeId: this.data.storeId,
                      pageSource: pageSource || "storeAllCoupons",
                      refPageSource: refPageSource || "",
                      ref_par: {
                        userAction: preUserAction || "",
                        traceId: preTraceId || "",
                      },
                    },
                    pageId: pageIdFirstPage,
                    preObj: this.data.recommendObj || {},
                  })
                    .then((res) => {
                      let result = res.data.result;
                      if (result) {
                        this.getCoupon(activityCode);
                        let prePage = util.getPrevPage();
                        if (prePage.updateIsFollow) {
                          prePage.updateIsFollow(true);
                        }
                      } else {
                        mp.toast({
                          title: res.msg || "关注失败",
                        });
                      }
                    })
                    .catch(() => {
                      mp.toast({
                        title: "关注失败",
                      });
                    });
                }
                this.preventClick(data);
              })
              .catch(() => {
                this.preventClick(data);
              });
          } else if (result.busiCode === "AC0000") {
            mp.toast({
              title: result.message || "黑名单！",
            });
            this.preventClick(data);
          } else {
            mp.toast({
              title: (result && result.message) || "领取成功！",
            });
            let coupon = (result.responseList && result.responseList[0]) || {};
            let originCouponList = this.data.list || [];
            originCouponList.forEach((item, index) => {
              if (item.activityCode === coupon.activityCode) {
                // 找到当前优惠券更新状态
                let userAction = item.userAction;

                const newStyle = Object.assign({}, item.styles || {}, {
                  couponLabelStyle:
                    (coupon.styles && coupon.styles.couponLabelStyle) ||
                    coupon.couponSigns ||
                    item.couponSigns ||
                    [],
                  couponButStyle:
                    (coupon.styles && coupon.styles.couponButStyle) ||
                    coupon.couponButton ||
                    item.couponButton ||
                    {},
                  leftTopIconList:
                    (coupon.styles && coupon.styles.leftTopIconList) ||
                    item.leftTopIconList,
                });
                delete coupon.couponBgColor;
                delete coupon.couponBgBorderColor;
                delete coupon.priceColor;
                delete coupon.couponLimitColor;
                delete coupon.couponTitleColor;
                delete coupon.couponExpireColor;
                let newCoupon = Object.assign(item, coupon);
                newCoupon.styles = newStyle;
                newCoupon.userAction = userAction;
                newCoupon.flag = true;
                let key = `list[${index}]`;
                this.setData({
                  [key]: newCoupon,
                });
                if (this.data.fromPop == "old") {
                  let prePage = util.getPrevPage();
                  if (prePage.updateStoreHeadCoupons) {
                    prePage.updateStoreHeadCoupons(coupon);
                  }
                } else {
                  wx.setStorageSync("backSource", "couponMore");
                }
              }
            });
          }
        } else {
          mp.toast({
            title: (res.data && res.data.msg) || "领取失败！",
          });
          this.data.list.forEach((item) => {
            if (!item.flag) {
              item.flag = true;
            }
          });
          this.setData({
            list: this.data.list,
          });
        }
        this.reportCouponError(activityCode, res)
      })
      .catch((err) => {
        mp.toast({
          title: "领取失败！",
        });
        this.data.list.forEach((item) => {
          if (!item.flag) {
            item.flag = true;
          }
        });
        this.setData({
          list: this.data.list,
        });

        this.reportCouponError(activityCode, err);
      });
  },
  updateCurrentPageData(orgCode, storeId) {
    request({
      ...FNIDS.stationMoreCouponInfo,
      body: {
        orgCode: orgCode,
        stationNo: storeId,
        grabPlat: 2,
        pageSource: "storeAllCoupons",
        floorCode: this.data.floorCode || "",
        moreCouponAb: this.data.moreCouponAb || "",
      },
      pageId:
        (this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||
        "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        let result = res.data.result || [];
        let listObj = {};
        result.forEach((item, index) => {
          listObj[index] = item.coupons || [];
        });
        // 列表数据缓存
        this.scopeData.listObj = listObj;
        this.scopeData.isFirst = false;
        // 更新列表数据
        this.setData({
          list: listObj[this.data.activeIndex || "0"],
        });
      })
      .catch(() => {
        // console.log(err)
      });
  },
  preventClick(data) {
    if (data) {
      let key = `list[${data.cpIndex}]`;
      data.flag = true;
      this.setData({
        [key]: data,
      });
    }
  },
  // 监控领券或者去使用等操作报错信息
  reportCouponError(activityCode, res) {
    let deviceid_pdj_jd = util.getUUIDMD5();
    let loginInfo = wx.getStorageSync("login_info");
    let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
    clickBuriedV2_({
      click_id: "reportCouponError",
      click_par: {
        pin: PDJ_H5_PIN,
        deviceId: deviceid_pdj_jd,
        position: "couponListHalfV5",
        activityCode: activityCode || "没有",
        storeNo: this.data.storeId || "没有",
        refPageSource:
          this.data.recommendObj && this.data.recommendObj.refPageSource,
        res: res || "",
      },
    });
  },
});
