import {
  request,
  FNIDS
} from '../../common/util/api'
// 埋点描述文件
import { djCmsJump } from '../../common/util/agreementV2'
import { getCouponProtocol } from '../../common/util/services'
import mp from '../../common/util/wxapi'
import util from '../../common/util/util'
import {clickBuriedV2_, pvBuriedV2_} from '../../common/util/BI'

let app = getApp();
var self = null
Page({
  // 埋点
  buried: {
    activity_id: "",
    group_id: "",
  },
  scopeData: {
    duihuanma: '',
    isFirstDuihuan: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    isIPX: app.globalData.isIpx,
    voucherList: [],
    pageNo: 1,
    voucherCode: "",
    isEmpty: false,
    showEmpty: false,
    reasonList: [],
    showAll: false,
    hasNextPage: false,
    loadTip: "",
    exclusiveCouponList: [],
    isLogin: false,
    isShowChangePop: false,
    duihuanma: '',
    // 默认页-类型
    defaultType: 0,
    defaultObj:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    self = this;
    this.scopeData.duihuanma = options && options.duihuanma || ''
    if (
      app.globalData.loginStateInfo &&
      app.globalData.loginStateInfo.o2o_m_h5_sid
    ) {
      self.setData({
        isLogin: true,
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (self.data.isLogin) {
      self.getVoucherList(1);
      this.getExclusiveCoupon();
    }
  },

  // 专属助力券
  getExclusiveCoupon() {
    request({
      ...FNIDS.getActivityByCoupon,
      isNeedDealError: true,
      isForbiddenDialog: true,
      body: {
        userChannel: "app",
        userPin: app.globalData.loginStateInfo.PDJ_H5_PIN,
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        if (res.data.code == 0) {
          let result = res.data.result;
          this.setData({
            exclusiveCouponList: result,
          });
        }
      })
      .catch((err) => {});
  },

  goback: function () {
    wx.navigateBack({});
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    var create_time = new Date();
   
    if (util.isLogin() && this.scopeData.isFirstDuihuan) {
      this.setData({
        isShowChangePop: !!this.scopeData.duihuanma.length,
        duihuanma: this.scopeData.duihuanma,
      });
      this.scopeData.isFirstDuihuan = false
    }
    if (!self.data.isLogin) {
      self.getVoucherList(1);
      this.getExclusiveCoupon();
    }
  },
  pvFunc(back) {
    let {recommendObj = {}} = this.data;
    pvBuriedV2_({
        page_par: {
            ref_par: {
                traceId: recommendObj.preTraceId || "",
                userAction: recommendObj.preUserAction || "",
            }
        },
        pageId: recommendObj.pageIdFirstPage || "",
        currentPageName: recommendObj.currentPageName,
        prePageName: recommendObj.prePageName,
        isBack: back || "",
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  dealErrorClick: function () {
    self.setData({
      showEmpty: false,
    });
    self.getVoucherList(1);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // self.getVoucherList(self.data.pageNo + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    if (e.from === "button") {
      let data = e.target.dataset;
      this.reportShareApp(data.activityId, data.groupId);
      return {
        title: data.name,
        path:
          "/pages/friendHelp/detail/index?activityId=" +
          data.activityId +
          "&groupId=" +
          data.groupId,
        imageUrl: data.url,
      };
    } else {
      var shareUtil = require("../../common/util/share_utils.js");
      var url = shareUtil.getShareUrl();

      return {
        title: "京东到家",
        path: url,
      };
    }
  },
  selectCouponHandle(event) { },
  toUseCoupon(e) {
    let data = e.currentTarget.dataset.item;
    this.handleCouponGo(data);
  },
  // 优惠券跳转
  handleCouponGo(data) {
    let { userAction, activityCode, couponId, couponType } = data
    // 埋点
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_coupon",
      click_par: {
        userAction: userAction || "",
        activityCode: activityCode || "",
        couponId: couponId || "",
        couponType: couponType || "",
        actType: "去使用",
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
    });
    getCouponProtocol({
      activityCode: data.activityCode || "",
      storeId: data.storeId || "",
      markState: data.markState || "",
      refPageSource: "couponsList",
      skuId: data.skuId || "",
      orgCode: data.orgCode || "",
      couponGoSource: 1,
      couponId: data.couponId || "",
      couponPattern: data.couponPattern || "",
    })
      .then((res) => {
        let result = res.data.result || "";
        if (res.data.code == "0" && result) {
          let { to = "", params = {}, userAction = "" } = result;
          let paramsNew = { userAction: userAction };
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
              userAction,
              preObj: recommendObj
            });
          }
        } else {
          mp.toast({
            title: res.data.msg || "哎呀，点击太疼啦，稍后再点我哦~",
          });
        }
      })
      .catch((err) => {
        mp.toast({
          title: "哎呀，点击太疼啦，稍后再点我哦~",
        });
      });
  },
  couponBottomSigned(e) {
    let {recommendObj = {}} = this.data;
    wx.navigateTo({
      url: "/pages/tabBar/signIn-t/index",
      preObj: recommendObj
    });

    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_sign_in",
      click_par: {},
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
    });
  },
  couponBottomHelp(e) {
    let {recommendObj = {}} = this.data;
    wx.navigateTo({
      url: "/pages/friendHelp/list/index",
      preObj: recommendObj
    });
    
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_friend_help",
      click_par: {},
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
    });
  },
  // 兑换优惠券
  showChangePop() {
    this.setData({
      isShowChangePop: true,
    });
  },
  hideChangePop(e) {
    this.setData({
      isShowChangePop: false,
    });
    if (e.detail) {
      this.getVoucherList(1);
      this.getExclusiveCoupon();
    }
  },
  getVoucherList(pageNo) {
    mp.loading()
    request({
      ...FNIDS.myCouponList,
      isNeedDealError: true,
      isForbiddenDialog: true,
      body: {
        startIndex: pageNo,
        dataSize: 10,
        state: 1, //1,有效2：已使用，3：已过期
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {},
    })
      .then((res) => {
        mp.hideLoading();
        if (res.data.code == "0") {
          let result = res.data.result;
          if (result && result.couponList) {
            if (result.couponList.length > 0) {
              let voucherList = result.couponList;
              let reasonList = "";
              for (let i = 0; i < voucherList.length; i++) {
                if (voucherList[i].couponDetail) {
                  reasonList = voucherList[i].couponDetail.split("\n");
                  voucherList[i].reasonList = reasonList;
                  voucherList[i].showAll = false;
                }
              }

              this.setData({
                voucherList: voucherList,
                pageNo: pageNo,
                isEmpty: false,
                showEmpty: false,
                loadTip: "已显示全部",
              });
            } else {
              if (pageNo == 1) {
                this.setData({
                  showDefault: true,
                  defaultType: 1,
                  defaultObj: { ...res.data },
                  isEmpty: true,
                });
              }
            }
          } else {
            if (pageNo == 1) {
              this.setData({
                showDefault: true,
                defaultType: 1,
                defaultObj: { ...res.data },
                isEmpty: true,
              });
            }
          }
        } else {
          // 无定位
          let app = getApp();
          let { addressInfo } = app.globalData.addressInfo;
          if (addressInfo && !addressInfo.poi) {
            this.setData({
              showDefault: true,
              defaultType: 3,
              isEmpty: true,
            });
          } else {
            pageNo == 1 &&
              this.setData({
                showDefault: true,
                defaultType: 1,
                defaultObj: { ...res.data },
                isEmpty: true,
              });
          }
        }
      })
      .catch((err) => {
        mp.hideLoading();
        if (pageNo == 1) {
          this.setData({
            showDefault: true,
            defaultType: 2,
            isEmpty: true,
          });
        }
      });
  },
  showAllMsg(e) {
    let index = e.currentTarget.dataset.index;
    this.data.voucherList[index].showAll =
      !this.data.voucherList[index].showAll;
    this.setData({
      voucherList: this.data.voucherList,
    });
  },
  /* ------------------ 自动化埋点新增逻辑    --------------------  */
  reportShareApp(activityId, groupId) {
    let {recommendObj = {}} = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "click_sign_in",
      click_par: {
        activity_id: activityId,
        group_id: groupId
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
    });
  }
});