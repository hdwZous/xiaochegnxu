import emitter from '../../../common/util/events'
import { getToStoreDetails, addToStoreCard, getCoupon } from '../../../common/util/services'
import mp from '../../../common/util/wxapi'
import util from '../../../common/util/util'
import { mpCmsJump } from "../../../common/util/agreementV2"
import { TO_REACH_SETTLE, TO_STORE_POPUP, TAKE_COUPON, TAKE_COUPON_RES, CLICK_BURIED } from './constants'
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI.js";

Page({
  data: {
    config: {},
    floors: [],
    login: false,
    showEmpty: false,
    title: '',
    defaultType: 0,
    defaultObj: {},
    capsule: {},
    opacity: 0,
    hideBackTop: true,
    pageMoving: false,
    showPopup: false,
    popupInfo: {},
  },
  takeCouponLock: false,
  onLoad(options) {
    const { userActionSku, userAction } = options
    this.pid = Math.random().toString(36).slice(2) + Math.floor(Math.random() * 9999)

    if (userActionSku || userAction) {
      this.setData({
        userAction: decodeURIComponent(userActionSku || userAction),
      });
    }

    this.onPopupShow()
    this.onReachSettle()
    this.onTakeCoupon()
    this.onCkBuired()
    this.getCapsule()

    this.setData({ options }, () => {
      this.updateDetailData()
    })
  },
  onUnload() {
    [TO_STORE_POPUP, TO_REACH_SETTLE, TAKE_COUPON, CLICK_BURIED].forEach(event => {
      emitter.removeListener(event + this.pid)
    })
  },
  onPageScroll(e) {
    let { scrollTop } = e || {};
    if (scrollTop > 400) {
      this.data.opacity < 1 &&
        this.setData({
          opacity: 1,
        });
    } else {
      this.setData({
        opacity: scrollTop / 400,
      });
    }

    if (e.scrollTop > 300) {
      if (this.data.hideBackTop) {
        this.setData({
          hideBackTop: false,
        });
      }
      if (e.scrollTop > 500) {
        this.showBackTop();
      }
    } else {
      this.hiddenBackTop();
      if (!this.data.hideBackTop) {
        this.setData({
          hideBackTop: true,
        });
      }
    }
  },
  onDefaultBtnEvent(e) {
    let { type = "" } = e.detail || {};
    if (type == 1) {
      this.updateDetailData()
    }
  },
  onPopupClose() {
    this.setData({ showPopup: false, popupInfo: {} })
  },
  onPopupShow() {
    emitter.addListener(TO_STORE_POPUP + this.pid, popupInfo => {
      if (popupInfo.title && popupInfo.html) {
        this.setData({
          showPopup: true,
          popupInfo,
        })
      }
    })
  },
  onReachSettle() {
    emitter.addListener(TO_REACH_SETTLE + this.pid, userAction => {
      this.toReachSettle(userAction, '')
    })
  },
  onPurchase(e) {
    const { userAction = {} } = e.currentTarget.dataset
    this.toReachSettle(userAction, 'bottom')
  },
  onTakeCoupon() {
    emitter.addListener(TAKE_COUPON + this.pid, ({ coupon, index }) => {
      if (!util.isLogin()) {
        return mpCmsJump({
          pageType: "p56",
          preObj: this.data.recommendObj,
          buried_position: {
            // key: "product-clickBusMember",
            options: this.data.options,
          },
        })
      }

      const { markState = "", couponButton = {} } = coupon || {};
      const { state = 0 } = couponButton || {};

      if (state == 1 && markState == 2) {
        this.handleGetCoupon(coupon, index)
      }
    })
  },
  handleGetCoupon(coupon = {}, index, isFollow) {
    if (this.takeCouponLock) return
    this.takeCouponLock = true

    const { config } = this.data
    getCoupon({
      channel: "single_product_page",
      source: "homestore",
      code: coupon.activityCode || '',
      isFollow: isFollow || 0,
      orgCode: config.orgCode || "",
      storeNo: config.storeId || "",
      isFloor: 0,
      needCouponGo: true,
      grabPlat: 1,
      pageSource: "productDetail",
      ctp: "goodsinfo",
      bgType: 'jdToStore',
      ruleId: coupon.ruleId || '',
      couponId: coupon.couponId || '',
      encryptedKey: coupon.encryptedKey || '',
    }, true)
      .then((res) => {
        const { result = {}, code = "", msg = '' } = res.data || {}
        if (code == 0) {
          const { responseList = [], message } = result
          const res = responseList[0] || {}

          mp.toast({ title: message || "领取成功" })
          emitter.emit(`${TAKE_COUPON_RES}_${index}` + this.pid, res)
        } else {
          mp.toast({ title: msg || "领取优惠券失败，请稍后再试~" })
        }
      }).catch(() => {
        mp.toast({ title: "领取优惠券失败，请稍后再试~" })
      }).finally(() => {
        this.takeCouponLock = false
      })
  },
  getDetailData() {
    mp.loading_cover()
    const { skuId = '', storeId = '', orgCode = '', bgType = 'jdToStore' } = this.data.options
    const pageType = bgType === 'jdToStore' ? 2 : 1

    return getToStoreDetails({
      isNeedDealError: true,
      isForbiddenDialog: true,
      body: {
        pageType,
        skuId,
        storeId,
        orgCode
      }
    })
  },
  updateDetailData() {
    this.getDetailData().then(res => {
      const { code, result, traceId = '' } = res.data || {}

      if (code == 0) {
        this.resolvePageData(result.floors)
        this.setData({
          traceId,
          showEmpty: false,
          defaultType: 0,
          ...result,
        })
        return
      }

      this.setData({
        showEmpty: true,
        defaultType: 1,
        defaultObj: {
          msg: res.data.msg,
          btnArr: [{
            type: 1,
            btnName: '重新加载',
          }],
        },
      })
    }).catch(() => {
      this.setData({
        showEmpty: true,
        defaultType: 2,
      })
    }).finally(() => {
      mp.hideLoading()
    })
  },
  getCapsule() {
    let { capsule = "" } = getApp().globalData || "";
    try {
      if (!capsule) {
        capsule = wx.getStorageSync("capsule") || {
          bottom: 56,
          height: 32,
          left: 278,
          right: 365,
          top: 24,
          width: 87,
        };
      }
    } catch (err) { }
    this.setData({
      capsule,
    })
  },
  resolvePageData(floors = []) {
    const findFloor = floors.find(floor => floor.type === 2)
    if (findFloor.data) {
      const { skuInfo = {}, bottomButtonInfo = [] } = findFloor.data || {}
      const { skuName = '' } = skuInfo
      const bottomButton = bottomButtonInfo[0] || {}

      this.setData({
        title: skuName,
        bottomButton,
      })
    }
  },
  toReachSettle(userAction, position) {
    const { skuId = '', storeId = '', orgCode = '' } = this.data.config || {}
    const type = 'buyNow'
    const isCeiled = 0

    emitter.emit(CLICK_BURIED + this.pid, {
      click_id: 'click_add',
      click_par: { userAction, storeId, skuId, type, isCeiled, position },
    })

    if (!util.isLogin()) {
      return mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          // key: "product-clickBusMember",
          options: this.data.options,
        },
      })
    }

    wx.showLoading({ title: "提交中...", mask: true })
    addToStoreCard({
      isNeedDealError: true,
      isForbiddenDialog: true,
      body: { skuId, storeId, num: 1 }
    }).then(res => {
      const { code, msg } = res.data || {}
      const { bgType = 'jdToStore' } = this.data.options
      const pageType = bgType === 'jdToStore' ? 2 : 1

      if (code == 0) {
        wx.navigateTo({
          url: `/pages/toStore/reachSettle/index?orgCode=${orgCode}&storeId=${storeId}&bgType=${pageType}`,
        })
      } else {
        mp.toast({ title: msg || '购买失败~请稍后再试！' })
      }
    }).catch(e => {
      mp.toast({ title: e.message || "出错了~请稍后再试！" })
    })
  },
  isToBack() {
    let pages = getCurrentPages();
    if (pages.length === 1) {
      return false;
    } else if (pages.length > 1) {
      return true;
    }
  },
  closeCurrentPage() {
    if (this.isToBack()) {
      wx.navigateBack();
    } else {
      wx.switchTab({
        url: "/pages/home/home",
      });
    }
  },
  showBackTop() {
    if (!this.data.pageMoving) {
      this.setData({
        pageMoving: true,
      });
    }
    this.hiddenBackTop();
  },
  hiddenBackTop() {
    this.movTime && clearTimeout(this.movTime);
    this.movTime = setTimeout(() => {
      this.setData({
        pageMoving: false,
      });
    }, 250);
  },
  pvFunc(back) {
    let { storeId = "", skuId = "", keyword = "", bgType = 'jdToStore' } = this.data.options || {};
    let recommendObj = this.data.recommendObj || {};

    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: storeId || "",
        skuId: skuId || "",
        keyword: keyword || "",
        bgType,
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
    this.setData({
      refPar: {
        userAction: recommendObj.preUserAction,
        traceId: recommendObj.preTraceId,
      },
    });
  },
  onCkBuired() {
    emitter.addListener(CLICK_BURIED + this.pid, data => {
      const { recommendObj = {} } = this.data

      clickBuriedV2_({
        ...data,
        pageId: recommendObj.pageIdFirstPage || '',
        currentPageName: recommendObj.currentPageName || '',
        prePageName: recommendObj.prePageName || ''
      })
    })
  }
})
