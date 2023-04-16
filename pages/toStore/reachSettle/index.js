import { request, FNIDS } from '../../../common/util/api';
import { clickBuriedV2_, pvBuriedV2_ } from "../../../common/util/BI";
let app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageError: {
      type: '',
      obj: {},
      // empty 数据为空； neterror 网络异常；dataerr 数据异常
      error: ''
    },
    isIPX: false,
    storeId: "",
    orgCode: "",
    bgType: '',
    originToast: '',
    moduleList: [],
    // 结算id
    orderPageId: '',
    // 订单id
    orderId: '',
    couponOperateList: null,
    usePointsNum: null,
    showPayPop: false,
    fee: 0,
    // 支付成功
    isSubmitSuccess: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { storeId = '', orgCode = '', bgType = '' } = options || {}
    this.setData({
      storeId,
      orgCode,
      bgType,
      isIPX: app.globalData.isIpx
    }, () => {
      this.getInitData();
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    if (this.data.isSubmitSucces) {
      let { recommendObj = null } = this.data
      wx.switchTab({
        url: "/pages/tabBar/orderlist/index",
        preObj: recommendObj
      });
    }
  },

  pvFunc(back) {
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data;
    pvBuriedV2_({
      page_par: {
        storeId: this.data.storeId,
        settleType: 1,
        businessType: this.data.bgType
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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  // 获取结算页面数据
  getInitData() {
    return new Promise(resolve => {
      let { orgCode, storeId, recommendObj = {} } = this.data;
      wx.showLoading({
        title: "加载中",
      });
      let params = {
        orgCode: orgCode,
        storeId: storeId
      };
      request({
        ...FNIDS.reachSettleInit,
        method: 'POST',
        isNeedDealError: true,
        body: params,
        pageId: recommendObj.pageIdFirstPage
      })
        .then((res) => {
          wx.hideLoading();
          if (res.data.code == "0" && res.data.result) {
            let result = res.data.result
            this.dealResult(result)
          } else {
            if (!res.data.result) {
              this.setData({
                pageError: {
                  type: 1,
                  error: 'neterror',
                  obj: {
                    title: res.data.msg,
                    btnArr: [{
                      btnName: '重新加载',
                      type: 1
                    }],
                    errorCode: res.data.errorCode || ''
                  }
                }
              })
            }
          }
        })
        .catch((err) => {
          wx.hideLoading();
          this.setData({
            pageError: {
              type: 2,
              error: 'neterror'
            },
          })
        });
    })
  },
  dealResult(result) {
    this.setData({
      moduleList: result.moduleList || [],
      orderPageId: result.orderPageId || ''
    })
  },
  modifySku(e) {
    let { skuId, cartUuid, count, type } = e.detail
    let { storeId, recommendObj = {} } = this.data;
    request({
      ...FNIDS.reachSettleChangeItemsNum,
      method: 'POST',
      isNeedDealError: true,
      body: {
        skuId,
        num: count,
        storeId,
        uuid: cartUuid
      },
      pageId: recommendObj.pageIdFirstPage
    })
      .then(res => {
        if (res.data.code == 0) {
          this.settleOperate(10)
        } else {
          this.setData({
            originToast: res.data.msg
          })
        }
      })
      .catch(err => {
        this.setData({
          originToast: err.data.msg || '网络错误'
        })
      })
    clickBuriedV2_({
      click_id: type == 'min' ? 'click_reduce' : 'click_add',
      click_par: {
        storeId,
        skuId,
        orderPageId: this.data.orderPageId,
        businessType: this.data.bgType
      },
      pageId: recommendObj.pageIdFirstPage,
      currentPageName: recommendObj.currentPageName,
      prePageName: recommendObj.prePageName
    });
  },

  settleOperate(operateType) {
    return new Promise(resolve => {
      let { orgCode = '', storeId = '', orderPageId = '',
        couponOperateList = null, usePointsNum = null, recommendObj = {}
      } = this.data;
      let params = {
        orgCode: orgCode,
        storeId: storeId,
        orderPageId,
        couponOperateList,
        usePointsNum,
        operateType
      };
      request({
        ...FNIDS.reachSettleOperate,
        method: 'POST',
        isNeedDealError: true,
        body: params,
        pageId: recommendObj.pageIdFirstPage
      })
        .then((res) => {
          if (res.data.code == "0" && res.data.result) {
            let result = res.data.result
            if (operateType == 20 || operateType == 30 || operateType == 40) {
              this.setLayerInfo(operateType, result.moduleList)
            } else {
              this.dealResult(result)
            }
            resolve('success')
          } else {
            this.setData({
              originToast: res.data.msg || '',
            })
          }
        })
        .catch((err) => {
          this.setData({
            originToast: err.data.msg || '网络错误'
          })
        });
    })
  },
  // 只处理弹层信息
  setLayerInfo(operateType, infos) {
    let keys = operateType == 20 ? 'coupon_module' : operateType == 30 ? 'jdRedPacket_module' : operateType == 40 ? 'points_module' : ''
    let ids = infos.findIndex(item => {
      return item.moduleKey == keys
    })
    if (operateType == 20) {
      let { couponExplainLayer, couponList, notCanUsedCouponList } = infos[ids].data
      this.setData({
        [`moduleList[${ids}].data.couponExplainLayer`]: couponExplainLayer,
        [`moduleList[${ids}].data.couponList`]: couponList,
        [`moduleList[${ids}].data.notCanUsedCouponList`]: notCanUsedCouponList,
      })
    } else if (operateType == 30) {
      let { jdRedPacketDiscountText, jdRedPacketItemList, selected, totalJdRedPacket, useRule } = infos[ids].data
      this.setData({
        [`moduleList[${ids}].data.jdRedPacketDiscountText`]: jdRedPacketDiscountText,
        [`moduleList[${ids}].data.jdRedPacketItemList`]: jdRedPacketItemList,
        [`moduleList[${ids}].data.selected`]: selected,
        [`moduleList[${ids}].data.totalJdRedPacket`]: totalJdRedPacket,
        [`moduleList[${ids}].data.useRule`]: useRule,
      })
    } else if (operateType == 40) {
      let { exchangeRatio, inputTips, maxUsePoints, minUsePoints, points, toastTips, usePoints, useRule, useType } = infos[ids].data
      this.setData({
        [`moduleList[${ids}].data.exchangeRatio`]: exchangeRatio,
        [`moduleList[${ids}].data.inputTips`]: inputTips,
        [`moduleList[${ids}].data.maxUsePoints`]: maxUsePoints,
        [`moduleList[${ids}].data.minUsePoints`]: minUsePoints,
        [`moduleList[${ids}].data.inputTips`]: inputTips,
        [`moduleList[${ids}].data.points`]: points,
        [`moduleList[${ids}].data.toastTips`]: toastTips,
        [`moduleList[${ids}].data.usePoints`]: usePoints,
        [`moduleList[${ids}].data.useRule`]: useRule,
        [`moduleList[${ids}].data.useType`]: useType
      })
    }
  },
  // 提交订单
  goPay(e) {
    let { infos = {} } = e.currentTarget.dataset
    this.setData({
      bt_disabled: true,
      bt_loading: true,
      fee: infos.data.orderPayableMoney
    });
    this.requestSubmit();
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    let body = this.generateSubParams()
    clickBuriedV2_({
      click_id: "goPay",
      click_par: {
        ...body,
        businessType: this.data.bgType
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    });
  },
  generateSubParams() {
    let { storeId = '', orgCode = '', orderPageId = '' } = this.data
    return {
      storeId,
      orgCode,
      orderPageId
    }
  },
  requestSubmit() {
    let { recommendObj = {} } = this.data
    let body = this.generateSubParams()
    wx.showLoading({
      title: "提交中...",
      mask: true,
    });
    request({
      ...FNIDS.reachSettleSubmit,
      method: "POST",
      isNeedDealError: true,
      body: body,
      pageId: recommendObj.pageIdFirstPage
    })
    .then((res) => {
      wx.hideLoading();
      let response = res.data;
      if (response.code == "0" && response.result) {
        if (response.result.zeroPayFlag) {
          this.setData({
            orderId: response.result.orderId,
            bt_disabled: false,
            bt_loading: false
          }, () => {
            let { orderId, storeId, orgCode, bgType } = this.data
            wx.navigateTo({
              url: `/pages/order/paySuccess/index?orderId=${orderId}&storeId=${storeId}&orgCode=${orgCode}&bgType=${bgType}`,
              preObj: recommendObj
            })
          })
        } else {
          this.setData({
            orderId: response.result.orderId,
            bt_disabled: false,
            bt_loading: false,
            showPayPop: true
          })
        }
        clickBuriedV2_({
          click_id: "getOrderSuccess",
          click_par: {
            storeId: this.data.storeId,
            orderId: response.result.orderId,
            orderPageId: this.data.orderPageId,
            businessType: this.data.bgType
          },
          pageId: recommendObj.pageIdFirstPage,
          currentPageName: recommendObj.currentPageName,
          prePageName: recommendObj.prePageName
        });
      } else {
        this.setData({
          bt_disabled: false,
          bt_loading: false,
          originToast: response.msg
        });
        clickBuriedV2_({
          click_id: "getOrderFail",
          click_par: {
            storeId: this.data.storeId,
            msg: response.msg || '',
            code: response.code,
            businessType: this.data.bgType
          },
          pageId: pageIdFirstPage,
          currentPageName,
          prePageName
        });
      }
    })
    .catch((err) => {
      wx.hideLoading();
      this.setData({
        bt_disabled: false,
        bt_loading: false,
        originToast: err.data.msg || '网络错误'
      });
    });
  },
  closeToast() {
    this.setData({ originToast: '' })
  },
  closeNewPayPop() {
    this.setData({
      showPayPop: false
    })
    let { recommendObj } = this.data
    wx.switchTab({
      url: '/pages/tabBar/orderlist/index',
      preObj: recommendObj
    })
  },
  onPaySuccess() {
    this.setData({
      isSubmitSuccess: true
    })
  },
  onDefaultBtnEvent(e) {
    let { type } = e.detail
    if (type == 1) {
      this.getInitData()
    }
  }
});