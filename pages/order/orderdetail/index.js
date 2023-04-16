/* eslint-disable camelcase*/
import { request, FNIDS, onCaptureScreen, offCaptureScreen } from '../../../common/util/api'
import { pvBuriedV2_, clickBuriedV2_ } from '../../../common/util/BI';
import orderPublic from '../../../common/util/public.js'
import util from '../../../common/util/util';
import { djCmsJump } from "../../../common/util/agreementV2.js";
import { custom_order } from '../../../common/util/tencentBi/report';
import { addFilterMsg, error } from '../../../common/util/wxLog';
import wxbarcode from '../../../npm/wxCode/index.js';
let app = getApp();
let suspendedTimer = null;

// 线上加群悬浮球动画图片
const suspendedBallList = [
  'https://storage.360buyimg.com/wxmini/order/deceiveDiscount1.png',
  'https://storage.360buyimg.com/wxmini/order/deceiveDiscount2.png'
];
//  线上加群按钮和曝光上报type字段定义
const typeList = ['', 'code', 'service', 'focus', 'focus'];

Page({
  buried: {
    contentId: "",
    state: "",
    orderId: "",
    statusID: ""
  },
  data: {
    // 返回顶部按钮展示隐藏
    showTopBtn: false,
    // 页面触底
    pageReachBottom: 0,
    redImgSrc: "",
    shareImgShow: false,
    showEmpty: false,
    type: 0, // 列表-类型
    tips: "", // 列表-提示
    btnText: "", // 列表-按钮
    rationPickerVisible: false,
    picPickerVisible: true,
    orderId: "", // 订单id
    orderInfo: {}, // 订单信息
    actionSheetVisble: false,
    isShowRepayBtn: true, // 重新支付按钮
    drawPop: null, // 大转盘中奖弹层
    isIpx: false,
    isShowInitBox: true,
    minute: 0,
    second: 0,
    suspendedImage: suspendedBallList[0],
    isShowQRCode: false,
    modalClass: '',
    mantleClass: '',
    ballClass: '',
    qrcodePathOfGroup: '',
    showSuspendedBall: false,
    buttonLink: '',
    contactTitle: '',
    contactImg: '',
    contactPath: '',
    layerType: 1,
    payButton: [],
    isShowMiddleModal: false,
    mapHeight: '460rpx',
    mapInHeight: '600rpx',
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    defaultType: 0,
    defaultObj: {},
    traceId: null,
    showPayPop: false,
    imgUrl: "",
    orderType: 1,
    barcodeUrl: null,
    qrcodeUrl: null,
    bgImg: ''
  },
  onLoad (options) {
    this.setData(
      {
        orderId: options.orderId,
        orderType: options.orderType,
        isIpx: app.globalData.isIphoneX,
        locOrderType: options.locOrderType,
        orderState: options.orderState
      },
      () => {
        console.log(this.data.orderType, 'orderType')
        // 订单详情
        // this.requestData();
        // 请求裂变红包接口
        // this.reqRedPackey();
      }
    );
  },
  onUnload: function () {
    suspendedTimer && clearInterval(suspendedTimer);
  },
  onShareAppMessage: function (res) {
    // eslint-disable-next-line no-case-declarations
    var shareUtil = require("../../../common/util/share_utils.js");
    var url = shareUtil.getShareUrl();
    if (res.from === "button") {
      // 来自页面内转发按钮
      this.onShareAppMessageBtn();
      return {
        title: this.data.shareTitle,
        path: this.data.sharePath,
        imageUrl: this.data.shareImg
      };
    } else {
      return {
        title: "京东到家",
        path: url
      };
    }
  },
  onReady () { },
  onShow: function () {
    this.requestData(true);
    this.closeNewPayPop()
  },
  onHide () {
    offCaptureScreen();
  },
  pvFunc (back) {
    let { orderId = '', recommendObj = {}, locOrderType = "", orderState = "" } = this.data;
    const params = {
      orderId: orderId,
      locOrderType,
      orderState
    }
    if (recommendObj.preTraceId || recommendObj.preUserAction) {
      params.ref_par = {
        traceId: recommendObj.preTraceId || "",
        userAction: recommendObj.preUserAction || ""
      }
    }
    pvBuriedV2_({
      page_par: params,
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName,
      prePageName: recommendObj.prePageName,
      'isBack': back || ''
    })
  },
  hackorderBuired (e) {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickddxqykddgdrk",
      click_par: {
        contentId: e.detail
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  showHackOrderBuried (e) {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "showddxqykddgdrk",
      click_par: {
        contentId: e.detail
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },

  /**
  * 页面滑动
  */
  onPageScroll (e) {
    const { showSuspendedBall } = this.data;

    if (showSuspendedBall) {
      this.stopAnimate();
    }

    if (e.scrollTop > 300) {
      if (this.data.hideBackTop) {
        this.setData({
          hideBackTop: false
        })
      }
      if (e.scrollTop > 500) {
        this.showBackTop()
      }
    } else {
      this.hiddenBackTop()
      if (!this.data.hideBackTop) {
        this.setData({
          hideBackTop: true
        })
      }
    }
  },
  showBackTop () {
    // 页面不滑动、pageMoving为false
    if (!this.data.pageMoving) {
      this.setData({
        pageMoving: true
      })
    }
    this.hiddenBackTop()
  },
  hiddenBackTop () {
    this.movTime && clearTimeout(this.movTime)
    this.movTime = setTimeout(() => {
      this.setData({
        pageMoving: false
      })
    }, 250)
  },

  // 取消订单校验
  async cancelOrderCheck (val) {
    let { recommendObj = {}, orderId = '', orderInfo = {} } = this.data;
    return new Promise((resolve) => {
      request({
        functionId: FNIDS.cancelOrderCheck.functionId,
        appVersion: FNIDS.cancelOrderCheck.appVersion,
        body: {
          orderId: this.data.orderId,
          reasonContent: val || ""
        },
        isNeedDealError: true,
        pageId: recommendObj.pageIdFirstPage || "",
        preObj: recommendObj
      }).then(res => {
        if (res.data && res.data.code == 0) {
          let { status, hint } = res.data.result;
          if (!status && hint) {
            wx.showToast({
              title: hint,
              icon: "none",
              duration: 2000
            });
            clickBuriedV2_({
              create_time: new Date(),
              click_id: "getSubmitFail",
              click_par: {
                orderId,
                orderState: orderInfo.orderState || 0,
                code: 0,
                msg: hint
              },
              currentPageName: "cancelOrder",
              prePageName: recommendObj.prePageName,
              pageId: recommendObj.pageIdFirstPage
            })
          }
          resolve(status)
        }
      }).catch(err => {
        let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
        let errInfo = err && err.toString();
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg('cancelOrderCheckFn')
        addFilterMsg(PDJ_H5_PIN)
        error(errInfo)
      })
    })
  },
  // 确定取消订单
  handleConfirmCancel: async function (ev) {
    //   console.log('确定取消订单',ev)
    let { txtValue, cancelReason } = ev.detail
    if (txtValue) {
      let cancelResult = await this.cancelOrderCheck(txtValue);
      if (!cancelResult) return
    }
    let _this = this;
    wx.showModal({
      title: "提示",
      content: "是否取消订单？",
      confirmText: "取消",
      cancelText: "返回",
      success: function (res) {
        let { recommendObj = {} } = _this.data;
        if (res.confirm) {
          // 请求接口
          request({
            functionId: FNIDS.cancelOrder.functionId,
            appVersion: FNIDS.cancelOrder.appVersion,
            body: {
              orderId: _this.data.orderId,
              cancelReason: cancelReason,
              reasonText: txtValue || ""
            },
            method: "POST",
            isNeedDealError: true,
            pageId: recommendObj.pageIdFirstPage || "",
            preObj: recommendObj || {}
          }).then((res) => {
            if (res.data.code == "0") {
              _this.requestData();
              custom_order(
                {
                  orderId: _this.data.orderId,
                  orderDate: new Date(),
                  orderPrice: _this.data.orderInfo.realPay || ""
                },
                "cancel_give_order"
              );

            } else {
              wx.showModal({
                title: "提示",
                content: res.data && res.data.msg,
                showCancel: false,
                confirmText: "确定",
                success: function (res1) {
                  if (res1.confirm) {
                    if (res.data.code == "2222" || res.data.code == "2223") {
                      _this.requestData();
                      // _this.reqRedPackey();
                    }
                  }
                }
              });
            }
          }).catch((err) => {
            wx.showModal({
              title: "提示",
              content: err.data && err.data.msg,
              showCancel: false,
              confirmText: "确定",
              success: function (res) {
                if (res.confirm) {
                  if (err.data.code == "2222" || err.data.code == "2223") {
                    app.globalData.needLoadOrder = true;
                    _this.requestData();
                    // _this.reqRedPackey();
                  }
                }
              }
            });
            let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
            let errInfo = err && err.toString();
            let deviceid_pdj_jd = util.getUUIDMD5();
            addFilterMsg('cancelOrderFn')
            addFilterMsg(deviceid_pdj_jd)
            addFilterMsg(PDJ_H5_PIN)
            error(errInfo)
          });
        }
      }
    });
  },
  // 关闭单选弹窗
  handleCloseRationPicker: function () {
    this.setData({
      rationPickerVisible: false
    });
  },
  // 取消订单
  handleCancelOrder: function () {
    if (this.data.orderInfo.orderState == 20030) {
      wx.showToast({
        title: "商家正在审核该订单取消申请，请耐心等待",
        icon: "none",
        duration: 2000
      });
      return;
    }
    this.selectComponent("#cancelOrder").cancelOrder();
  },
  // 客服和售后actionsheet
  handleActionsheet: function () {
    this.setData({
      actionSheetVisble: !this.data.actionSheetVisble
    });
  },
  // 删除订单
  handleDeleteOrder: orderPublic.deleteOrder,
  // 继续支付
  handleGotopay (e) {
    let _this = this;
    const { recommendObj = {}, locOrderType, orderState } = this.data;
    let { canClick, orderPrice, orderId } = e.currentTarget.dataset
    if (this.data.orderType == 2) {
      _this.setData({
        showPayPop: true,
        fee: orderPrice,
        orderId: orderId
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "goPay",
        click_par: {
          locOrderType: locOrderType,
          orderId: orderId,
          orderState: orderState
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || ""
      })
      return;
    }
    if (canClick) {
      // 腾讯有数埋点
      custom_order(
        {
          orderId: _this.data.orderId,
          orderDate: new Date(),
          orderPrice: _this.data.orderInfo.realPay
        },
        "pay"
      );
      orderPublic.gotopay(
        e,
        () => {
          this.requestData();
          // 腾讯有数埋点
          custom_order(
            {
              orderId: _this.data.orderId,
              orderDate: new Date(),
              orderPrice: _this.data.orderInfo.realPay
            },
            "payed"
          );
        },
        () => {
          // 腾讯有数埋点
          custom_order(
            {
              orderId: _this.data.orderId,
              orderDate: new Date(),
              orderPrice: _this.data.orderInfo.realPay
            },
            "cancel_pay"
          );
        }
      );
    }
  },
  // 初始化数据
  requestData (isFirst) {
    let { recommendObj = {}, orderId = "", orderType } = this.data;
    request({
      functionId: FNIDS.orderInfoNew.functionId,
      appVersion: FNIDS.orderInfoNew.appVersion,
      isNeedDealError: true,
      isForbiddenDialog: true,
      body: {
        orderId: orderId,
        locOrderType: orderType
      },
      pageId: recommendObj.pageIdFirstPage || "",
      preObj: recommendObj
    })
      .then((res) => {
        wx.hideLoading()
        let traceId = this.data.traceId || res.data.traceId || '';
        if (res.data.code == "0" && res.data.result) {
          let result = (res.data && res.data.result) || {};


          const { payStateArray = [], showRemark = 0, showPay = 0, initBox = {}, orderId, storeId } = result;
          if (initBox && initBox.title) {
            clickBuriedV2_({
              create_time: new Date(),
              click_id: "order/infoNew",
              click_par: {
                orderId,
                storeId,
                isShowWrite: showRemark
              },
              currentPageName: this.data.recommendObj.currentPageName || "",
              prePageName: this.data.recommendObj.prePageName || "",
              pageId: this.data.recommendObj.pageIdFirstPage || ""
            })
          }
          if (showRemark == 1 && Array.isArray(payStateArray)) {
            const payStateItem = payStateArray[0] || {};
            const { countDownTime = 0 } = payStateItem;
            const countTime = countDownTime - Date.now();
            util.newCountDown(countTime, (e) => {
              const { minute, second } = e;
              this.setData({
                minute,
                second
              })
            })
          }
          if (showPay == 1 && Array.isArray(payStateArray)) {
            this.data.payStateArray = payStateArray
            this.dealPayButton(this.data.payStateArray, result.serverTime)
          }
          this.setData({
            showEmpty: false,
            orderInfo: result,
            traceId: traceId
          }, () => {
            if (result.locCodeFloorInfo) {
              this.createCode(result.locCodeFloorInfo)
            }
            if (isFirst) {
              this.getQRCode();
            }
          });
          // 津贴曝光
          if (
            res.data.result.allowanceInfo &&
            res.data.result.allowanceInfo.content.length
          ) {
            this.setOrderStateBurid(res.data.result.orderState);
            // 无障碍
            let info = res.data.result.allowanceInfo.content.map(val => val.text);
            this.setData({
              allowanceInfos: info
            })
          }
          // if (res.data.result.payEndTime) {
          //     // 未支付
          //     let payEndTime =
          //         res.data.result.payEndTime - res.data.result.serverTime;
          //     util.countDown(payEndTime, this.timeCallback, this);
          // }
        } else {
          this.setData({
            showEmpty: true,
            showDefault: true,
            defaultType: 1,
            defaultObj: { ...res.data }
          })
          wx.reportMonitor(37, 20);
        }

        let {
          orderId
        } = this.data.orderInfo
        // 开启监听截图
        onCaptureScreen({
          orderId
        }, this.data.recommendObj);
      })

      .catch((err) => {
        this.setData({
          showEmpty: true,
          showDefault: true,
          defaultType: 2
        })
        wx.hideLoading()
        wx.reportMonitor(37, 20);
        let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
        let errInfo = err && err.toString();
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg('orderInfoNewFn');
        addFilterMsg(PDJ_H5_PIN);
        error(errInfo)
      });
  },
  setOrderStateBurid (orderState) {
    // statusID=2  orderState=33060 代表已完成
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "show_vipallowance",
      click_par: {
        statusID: orderState == 33060 ? 2 : 1
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  // 请求裂变红包入口接口
  reqRedPackey: function () {
    let { recommendObj = {} } = this.data
    request({
      functionId: FNIDS.getRedPackActivityInfo,
      isNeedDealError: true,
      isForbiddenDialog: true,
      body: {
        orderNo: this.data.orderId,
        reqPage: "2",
        userPin: app.globalData.loginStateInfo.PDJ_H5_PIN
      },
      pageId: recommendObj.pageIdFirstPage || "",
      preObj: recommendObj
    })
      .then((res) => {
        if (res.data.code == "0" && res.data.result) {
          var packetData = res.data.result;
          this.setData({
            redImgSrc:
              packetData.icon ||
              "https://img11.360buyimg.com/promotion/jfs/t19405/266/1226496275/18804/6b478d02/5ac24c8cN7697529e.png",
            shareImgShow: true
          });
          // 分享的数据
          this.data.shareTitle = packetData.shareTitle;
          this.data.shareImg = packetData.bigPic;
          this.data.sharePath = packetData.path;
        } else {
          this.setData({
            shareImgShow: false
          });
        }
      })
      .catch((err) => {
        this.setData({
          shareImgShow: false
        });
        let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
        let errInfo = err && err.toString();
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg('getRedPackActivityInfoFn');
        addFilterMsg(PDJ_H5_PIN);
        error(errInfo)
      });
  },
  // 修改订单
  handleReviseOrder () {
    let { recommendObj = {} } = this.data;
    let params = this.data.orderInfo.updateOrderAccess;
    params.preObj = recommendObj
    djCmsJump({
      ...params,
      buried_postion: "order-orderdetail11"
    })
  },
  // 前往订单状态页面
  handleGotoOrderStatusPage () {
    let { recommendObj = {}, orderType } = this.data;
    if (orderType == 2) return;
    wx.navigateTo({
      url: `/pages/order/orderstatus/index?orderId=${this.data.orderId}`,
      preObj: recommendObj,
      buried_postion: "order-orderdetail1"
    });
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_order_state',
      click_par: {},
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  // h5页面跳转
  handleH5pageJump (ev) {
    let clickName = '';
    let orderInfo = this.data.orderInfo;
    let type = ev.currentTarget.dataset.type; // 1 联系客服 2 投诉 3,4 申请售后 5跳转达达小程序 6商家会员任务 7申请退款 8开发票
    let url = "";
    let { recommendObj = {}, locOrderType, orderState, orderId } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickAgainBuy",
      click_par: {
        locOrderType: locOrderType,
        orderId: orderId,
        orderState: orderState
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
    if (type == 1) {
      url = `https://${app.globalData.config.HOST}/html/index/orderDetailBridge?value=${this.data.orderId}&storeId=${orderInfo.storeId}&orgCode=${orderInfo.orgCode}&type=1`;
      clickName = 'click_customer_service'
    }
    if (type == 2) {
      url = `https://${app.globalData.config.HOST}/activity/report/reportMerchant.html?pageType=complaint&orderId=${this.data.orderId}&storeId=${orderInfo.storeId}&appVersion=7.3.1`;
      clickName = 'click_complain'
    }
    if (type == 7) {
      url = `https://${app.globalData.config.HOST}/html/index.html#orderRefundDetail/orderId:${this.data.orderId}/orderState:${this.data.orderInfo.orderState}`
    }
    if (type == 3) {
      if (orderInfo.afsProcessInfo) {
        // 申请过售后
        url = orderInfo.afsProcessInfo.params.url;
        let tureUrl = decodeURIComponent(url)
        let arr; let b
        if (/appThroughH5&body/ig.test(tureUrl)) {
          arr = tureUrl.split('&')
          arr.map(item => {
            if (/returnLink/i.test(item)) {
              let j = item.split('body=')
              if (j[1]) {
                b = JSON.parse(j[1]).returnLink
                url = b
              }
            }
          })
        }
      } else {
        if (!orderInfo.afsEntrance.canApply) {
          wx.showToast({
            title: orderInfo.afsEntrance.toast,
            icon: "none",
            duration: 2000
          });
          return;
        } else {
          url = orderInfo.afsEntrance.params.url;
        }
      }
      clickName = 'click_after_sale_bar'
    }
    if (type == 4) {
      if (!orderInfo.afsEntrance.canApply) {
        wx.showToast({
          title: orderInfo.afsEntrance.toast,
          icon: "none",
          duration: 2000
        });
        return;
      } else {
        url = orderInfo.afsEntrance.params.url;
      }
    }
    if (type == 5) {
      let { to = '', params = {} } = orderInfo.dadaSourceInfo || {};
      if (orderInfo.dadaSourceInfo && params && to)
        djCmsJump({
          to,
          params,
          userAction: '',
          preObj: recommendObj,
          buried_postion: "order-orderdetail12"
        });
      return;
    }
    if (type == 6) {
      url = orderInfo.memberTaskInfo.params.url;
      clickName = 'click_after_sale'
    }
    if (type == 8) {
      let postInfo = Object.assign({ source: 'order' }, {
        orderId: orderInfo.orderId,
        storeId: orderInfo.storeId,
        orderState: orderInfo.orderState
      })
      wx.navigateTo({
        url: '/pages/newInvoice/list/index',
        preObj: recommendObj,
        buried_postion: "order-orderdetail2",
        success (res) {
          res.eventChannel.emit('acceptSettle', { postInfo })
        }
      })
      this.setData({
        actionSheetVisble: false
      })
      return
    }
    // console.log('url',url)
    wx.navigateTo({
      url: "/pages/h5/index?url=" + encodeURIComponent(url),
      preObj: recommendObj,
      buried_postion: "order-orderdetail3"
    });
    if (clickName) {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: clickName,
        click_par: {},
        currentPageName: this.data.recommendObj.currentPageName || "",
        prePageName: this.data.recommendObj.prePageName || "",
        pageId: this.data.recommendObj.pageIdFirstPage || ""
      })
    }
  },
  // 监听默认按钮点击
  onDefaultBtnEvent (e) {
    let type = e.detail.type;
    if (type === 1) {
      this.setData({
        type: 0,
        defaultType: 0,
        showEmpty: true
      });
      this.requestData();
    }
  },
  // 全屏地图开关
  onTapMap (e) {
    // console.log('onTapMap', e);
    if (e.type == 'tapMapEvent' && this.data.mapHeight == '100vh') return;
    this.setData({
      mapHeight: this.data.mapHeight == '100vh' ? '460rpx' : '100vh',
      mapInHeight: this.data.mapHeight == '100vh' ? '600rpx' : '100vh'
    })
  },
  // 时间回调函数
  timeCallback (timeObj) {
    // console.log('timeObj',timeObj)
    if (!timeObj.isOver) {
      this.setData({
        hour: timeObj.hour,
        minute: timeObj.minute,
        second: timeObj.second
      });
    } else {
      if (this.data.isShowRepayBtn) {
        this.setData({
          isShowRepayBtn: false
        });
      }
    }
  },
  pageBuried (e) {
    const { type, orderId, state } = e.detail;
    if (type == 1 || type == 2 || type == 3) {
      this.exweichangzhunBuried(orderId, state);
    }
    if (type == 4) {
      this.clickObtainBuried(orderId);
    }
    if (type == 5) {
      this.clickActivationBuried(orderId);
    }
    if (type == 6) {
      this.clickObtainLayerBuried(orderId);
    }
    if (type == 7) {
      this.clickActivationLayerBuried(orderId);
    }
    if (type == 8) {
      this.clickCheckLayerBuried(orderId);
    }
    if (type == 9) {
      this.clickCheckBuried(orderId);
    }
  },
  exweichangzhunBuried (orderId, state) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ex_weichangzhun',
      click_par: {
        orderId,
        state
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickObtainBuried (orderId) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_obtain',
      click_par: {
        orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickActivationBuried (orderId) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_activation',
      click_par: {
        orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickObtainLayerBuried (orderId) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_obtain_layer',
      click_par: {
        orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickActivationLayerBuried (orderId) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_activation_layer',
      click_par: {
        orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickCheckLayerBuried (orderId) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_check_layer',
      click_par: {
        orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickCheckBuried (orderId) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_check',
      click_par: {
        orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  onShareAppMessageBtn () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "share_fission_coupon",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 跳转付费会员
  toVip () {
    let { recommendObj = {} } = this.data;
    let addressInfo = app.globalData.addressInfo || {};
    let latitude = (addressInfo && addressInfo.latitude) || "";
    let longitude = (addressInfo && addressInfo.longitude) || "";
    let cityId = (addressInfo && addressInfo.cityId) || "";
    wx.navigateTo({
      url: `/pages/vpaymember_t/home/index?latitude=${latitude}&longitude=${longitude}&cityId=${cityId}`,
      preObj: recommendObj,
      buried_postion: "order-orderdetail4"
    });
  },
  toVipBountryList () {
    let { recommendObj = {} } = this.data;
    let addressInfo = app.globalData.addressInfo || {};
    let latitude = (addressInfo && addressInfo.latitude) || "";
    let longitude = (addressInfo && addressInfo.longitude) || "";
    let cityId = (addressInfo && addressInfo.cityId) || "";
    wx.navigateTo({
      url: `/pages/vpaymember_t/bountyList/index?latitude=${latitude}&longitude=${longitude}&cityId=${cityId}`,
      preObj: recommendObj,
      buried_postion: "order-orderdetail5"
    });
  },
  // 大转盘抽奖
  fetchLottery () {
    let { orderId, orderInfo = {}, recommendObj = {} } = this.data;
    if (orderInfo.lotteryInfo.useNewLogic) {
      djCmsJump({
        to: orderInfo.lotteryInfo.to,
        params: orderInfo.lotteryInfo.params,
        preObj: recommendObj,
        buried_postion: "order-orderdetail13"
      })
    } else {
      request({
        ...FNIDS.freePrizeDraw,
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          orderId: orderId,
          lotteryCode:
            (orderInfo.lotteryInfo && orderInfo.lotteryInfo.lotteryCode) || ""
        },
        pageId: recommendObj.pageIdFirstPage || "",
        preObj: recommendObj
      })
        .then((res) => {
          let { code, result } = res.data;
          if (code == 0 && result) {
            this.setData({
              drawPop: result
            });
          } else {
            wx.reportMonitor(38, 20);
          }
        })
        .catch((err) => {
          wx.reportMonitor(38, 20);
          let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
          let errInfo = err && err.toString();
          addFilterMsg('freePrizeDrawFn');
          let deviceid_pdj_jd = util.getUUIDMD5();
          addFilterMsg(deviceid_pdj_jd)
          addFilterMsg(PDJ_H5_PIN);
          error(errInfo)
        });
    }
  },
  // 跳转vip会员
  goVip (e) {
    let jumpProtocol = e.currentTarget.dataset.item || {};
    jumpProtocol.preObj = this.data.recommendObj || {};
    djCmsJump({
      jumpProtocol,
      buried_postion: "order-orderdetail14"
    });
  },

  // 【生命周期】页面上拉触底事件的处理函数,分页请求
  onReachBottom () {
    let { feedFlag = true } = this.data.result || {};
    feedFlag && this.setData({
      pageReachBottom: ++this.data.pageReachBottom,
      showTopBtn: true
    })
  },

  jumpHandler (e) {
    const { orderId, orderInfo: { storeId } = {}, recommendObj = {} } = this.data;
    const { to = '', params = {}, type = 'page' } = e.currentTarget.dataset;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickWrite",
      click_par: {
        orderId,
        storeId,
        type
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
    if (to) {
      let { recommendObj = {} } = this.data;
      djCmsJump({
        to,
        params,
        preObj: recommendObj,
        buried_postion: "order-orderdetail15"
      })
    }
    this.setData({
      isShowInitBox: false
    })
  },
  openQRCode (isClick) {
    const { orderInfo: { storeId = '' } = {}, layerType, recommendObj = {} } = this.data;

    this.setData({
      modalClass: 'scale-up-br',
      mantleClass: '',
      isShowQRCode: true
    })
    if (isClick) {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: {
          storeId
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || ""
      })
    }
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "showLayer",
      click_par: {
        storeId,
        type: typeList[layerType]
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  closeQRCode () {
    this.setData({
      modalClass: 'scale-down-br',
      mantleClass: 'fade-out'
    })
    setTimeout(() => {
      this.setData({
        isShowQRCode: false
      })
    }, 200)
  },
  startAnimate: util.debounce(function () {
    this.setData({
      ballClass: ''
    })
    suspendedTimer = setInterval(() => {
      const { suspendedImage = '' } = this.data;
      if (suspendedImage == suspendedBallList[0]) {
        this.setData({
          suspendedImage: suspendedBallList[1]
        })
      } else {
        this.setData({
          suspendedImage: suspendedBallList[0]
        })
      }
    }, 300)
  }, 300),

  stopAnimate () {
    suspendedTimer && clearInterval(suspendedTimer);
    this.setData({
      suspendedImage: suspendedBallList[0],
      ballClass: 'hide-ball'
    })
    this.startAnimate();
  },
  getQRCode () {
    const unionId = wx.getStorageSync('unionid') || "";
    const { orderInfo: { storeId = '' } = {}, recommendObj = {} } = this.data;
    request({
      ...FNIDS.onlineJoin,
      isNeedDealLogin: true,
      isForbiddenDialog: true,
      body: {
        unionId,
        storeId
      },
      method: 'POST',
      pageId: recommendObj.pageIdFirstPage || "",
      preObj: recommendObj
    }).then(res => {
      const { data = {} } = res;
      const { code, result: { showQrcodeLayer, qrcodePathOfGroup, showSuspendedBall, layerType = 1, buttonLink = '', title = '', img = '', path = '', bgImg = '' } = {} } = data;
      this.setData({
        buttonLink,
        contactTitle: title,
        contactImg: img,
        contactPath: path,
        layerType,
        bgImg
      })
      if (code == 0) {
        this.setData({
          qrcodePathOfGroup,
          showSuspendedBall
        }, () => {
          if (showSuspendedBall) {
            this.startAnimate()
          }
          if (showQrcodeLayer) {
            this.openQRCode()
          }
        })
      } else {
        wx.reportMonitor(39, 20)
      }
    }).catch((err) => {
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let errInfo = err && err.toString();
      wx.reportMonitor(39, 20)
      addFilterMsg('onlineJoinFn');
      addFilterMsg(PDJ_H5_PIN)
      error(errInfo)
    })
  },
  jumpToOfficial (e) {
    const { orderInfo: { storeId = '' } = {} } = this.data;
    const { dataset: { buttonLink = '', layerType = '' } = {} } = e.currentTarget;
    let { recommendObj = {} } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickLayer",
      click_par: {
        storeId,
        type: 'focus'
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
    if (layerType == 4) {
      buttonLink && wx.navigateTo({
        url: `/pages/h5/index?url=${encodeURIComponent(buttonLink)}&source=weapp&noNeedLogin=true`,
        buried_postion: "order-orderdetail6"
      })
    } else {
      buttonLink && wx.navigateTo({
        url: '/pages/h5/index?url=' + encodeURIComponent(buttonLink),
        preObj: recommendObj,
        buried_postion: "order-orderdetail6"
      })
    }
  },
  jumpToContact () {
    const { orderInfo: { storeId = '' } = {}, recommendObj = {} } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickLayer",
      click_par: {
        storeId,
        type: 'service'
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  _handleAgain (e) {
    let { to, params } = e.currentTarget.dataset
    let { recommendObj = {} } = this.data;
    djCmsJump({
      to,
      params,
      preObj: recommendObj,
      buried_postion: "order-orderdetail16"
    })

  },
  handleAgain (e) {
    const { orderInfo = {}, recommendObj = {}, locOrderType, orderId, orderState } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickAgainBuy",
      click_par: {
        locOrderType: locOrderType,
        orderId: orderId,
        orderState: orderState,
        storeId: orderInfo.storeId,
        type: locOrderType
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
    if (!e.currentTarget.dataset.clickJumpcheck) {
      this._handleAgain(e)
      return;
    }
    request({
      ...FNIDS.singleProductNew,
      isNeedDealError: true,
      body: {
        orderId: this.data.orderId,
        locOrderType: orderInfo.locOrderType
      },
      method: 'POST',
      pageId: this.data.pageId || '',
      preObj: this.data.recommendObj || {}
    }).then(res => {
      if (res.data.code == 0) {
        let { result } = res.data || -1;
        let tipMsgObj = {
          2: '该商品已下架，可到门店查看其它相似商品。',
          3: '此商品库存不足',
          4: '此门店已下线，去其它门店逛逛吧。'
        };
        if (result == 0) {
          this._handleAgain(e)
        } else {
          wx.showModal({
            title: '温馨提示',
            content: tipMsgObj[result] || '该商品已下架，可到门店查看其它相似商品。',
            confirmText: '知道了',
            showCancel: false
          })
        }
      } else if (res.data.code == 2) {
        wx.showToast({
          title: '该商品已下架',
          icon: 'none',
          duration: 3000
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 3000
        });
        wx.reportMonitor(34, 20);
      }
    }).catch(err => {
      wx.showToast({
        title: err.toString(),
        icon: 'none',
        duration: 3000
      });
    })
  },
  dealPayButton (lists, serverTime) {
    let payButton = []
    if (lists.length) {
      lists.map(item => {
        if (item.showCountDownTime && (item.countDownTime - serverTime > 0)) {
          payButton.push(item)
        } else if (!item.showCountDownTime) {
          payButton.push(item)
        }
      })
      this.setData({ payButton })
    }
  },
  paybuttonback () {
    this.requestData()
  },
  // 中间号弹窗
  showMiddleModal () {
    this.setData({
      isShowMiddleModal: true
    })
    // 埋点
    let { orderId = '', orderInfo = {}, recommendObj = {} } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'showLayer',
      click_par: {
        type: 'rideNormalProtect',
        orderId: orderId,
        storeId: orderInfo.storeId || ""
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },
  closeModal () {
    this.setData({
      isShowMiddleModal: false
    })
  },
  tapGift () {
    this.fetchLottery()
  },
  showPrescription (e) {
    let { imgUrl } = e.detail;
    this.setData({
      imgUrl
    })
  },
  closePrescription () {
    this.setData({
      imgUrl: ''
    })
  },
  reloadCode () {
    wx.showLoading({
      title: '加载中'
    })
    this.requestData()
  },
  createCode (locCodeFloorInfo) {
    const _this = this
    if (locCodeFloorInfo.locCodeInfo) {
      wxbarcode.qrcode('qrcode', locCodeFloorInfo.locCodeInfo.qrCodeNum, 240, 240, () => {
        _this.handleCanvarToImg('qrcode', 240, 240, 'qrcodeUrl')
      });
      if (locCodeFloorInfo.locCodeInfo.qrCodeNum.length < 40) {
        wxbarcode.barcode('barcode', locCodeFloorInfo.locCodeInfo.qrCodeNum, 240, 80, () => {
          _this.handleCanvarToImg('barcode', 240, 80, 'barcodeUrl')
        });
      }
    }
  },
  closeNewPayPop () {
    this.setData({
      showPayPop: false
    })
  },
  // canvas 转图片
  handleCanvarToImg (canvasId, width, height, returnUrl) {
    var that = this;
    that.setData({
      [returnUrl]: null
    }, () => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width,
        height,
        canvasId,
        success: function (res) {
          that.setData({ [returnUrl]: res.tempFilePath });
        }
      });
    })
  },

  onPaySuccess () {
    this.setData({
      closeNewPayPop: false
    })
  }
});
