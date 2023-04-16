import { request, FNIDS } from "../../../common/util/api";
import { getAbTestService } from "../../../common/util/services";
import orderPublic from "../../../common/util/public.js";
import util from "../../../common/util/util";
import { djCmsJump } from '../../../common/util/agreementV2'
import mp from "../../../common/util/wxapi";
import { Lazy } from "../../../common/util/lazyLoad";
import { addFilterMsg, error } from '../../../common/util/wxLog';
import { pvBuriedV2_, clickBuriedV2_ } from '../../../common/util/BI';
import wxbarcode from '../../../npm/wxCode/index.js'
let app = getApp();
let scrollTop = 0
let navHeight = 0
// 【图片懒加载】实例对象
let LazyLoad = null
Page({
  buried: {
    orderId: "空",
    title: "空",
    status: "空"
  },
  data: {
    capsule: {}, // 胶囊信息
    opacity: 0,
    orderId: "",
    storeId: "",
    orgCode: "",
    payStageType: 1,
    attention: "",
    storeName: "",
    midTelShow: '',
    midTelDesc: '',
    orderBasicInfo: null, // 订单基础信息
    luckyDrawInfo: null, // 抽奖模块信息
    redPackAndCouponInfo: {}, // 支付成功共节省信息
    showRule: false,
    currentPage: 0, // 推荐第几页
    lastPage: false, // 是否是最后一页
    title: "为你优选", // 推荐标题
    list: [], // 推荐商品
    showDraw: false, // 是否展示大转盘
    showDrawResult: false, // 是否展示转盘抽奖结果
    experName: "newA",
    prizeList: [], // 奖品列表
    prizeTile: "", // 奖品标题
    notWin: null, // 未中奖信息
    imgLazyLoad: {},
    isBack: false, // 是否是从其他页面返回

    // 展示弹层
    showPop: false,
    // 裂变分享信息
    shareInfo: {},

    // 列表-类型
    type: 0,
    // 列表-提示
    tips: "",
    // 列表-按钮
    btnText: "",
    // 展示首单裂变
    showFissionOrder: false,
    // 首单裂变弹层图片
    fissionImgUrl: '',
    // 是否展示关注按钮
    show: false,
    traceId: '',
    // 大转盘traceId
    traceIdPrize: '',
    locCodeFloorInfo: {},

    barcodeUrl: null,
    qrcodeUrl: null
  },
  async onLoad (options) {
    let capsule = util.getCapsule(); // 获取胶囊高度
    this.setData({
      capsule,
      orderId: options.orderId || "",
      storeId: options.storeId || "",
      orgCode: options.orgCode || "",
      locOrderType: options.bgType || 1,
      payStageType: options.payStageType || 1
    });

    this.fetchStrategyName(); // ab实验

    // 获取订单基础信息和大转盘
    await this.fetchOrderData().then((res) => {
      this.fetchRecommend(); // 获取推荐商品
      // 自动发券
      let luckyDrawInfo = res.luckyDrawInfo;
      if (this.data.experName == "newB" && luckyDrawInfo) {
        this.fetchDrawResult(luckyDrawInfo.lotteryCode);
      }
    });
    this.fetchFollow();
  },

  onReady () {
    // 图片懒加载实例化对象
    LazyLoad = new Lazy(this, ".container >>> .lazy-load");
  },

  onShow () {
    // 如果是从其他页返回则直接跳转到订单详情页
    if (this.data.isBack) {
      let { recommendObj = {} } = this.data;
      wx.redirectTo({
        url: `/pages/order/orderdetail/index?orderId=${this.data.orderId}`,
        preObj: recommendObj
      });
    }
  },
  onHide () {
    this.setData({
      isBack: true
    })
  },
  onUnLoad () {
    // 卸载监听图片懒加载
    LazyLoad && LazyLoad.disconnectObserver && LazyLoad.disconnectObserver();
  },
  onReachBottom () {
    if (!this.data.lastPage) {
      this.fetchRecommend();
    }
  },
  onPageScroll (e) {
    if (scrollTop <= 34 + navHeight) {
      scrollTop = e.scrollTop <= 34 + navHeight ? e.scrollTop : 34 + navHeight;
      this.setData({
        opacity: 0 + scrollTop / (34 + navHeight)
      });
    }
  },
  onShareAppMessage: function (res) {
    if (res.from === "button") {
      this.shareFissionCouponBuried();
    }
    let shareInfo = this.data.shareInfo;
    let recommendObj = this.data.recommendObj || {};
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "share",
      click_par: {},
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
    return {
      title: shareInfo.shareTitle,
      path: shareInfo.sharePath,
      imageUrl: shareInfo.shareImg
    };
  },
  pvFunc (back) {
    let { orderId = '', recommendObj = {}, payStageType = "", locOrderType = "" } = this.data;
    pvBuriedV2_({
      page_par: {
        orderId: orderId,
        payStageType: payStageType,
        locOrderType: locOrderType,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || ""
        }
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      'isBack': back || ''
    })
  },
  showFollow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "showFollow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  }, // 关注门店按钮的曝光
  showWebank () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "showWebank",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  }, // 微常准曝光
  // 裂变楼层曝光
  exposureLayerBuired (title) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "ExposureLayer",
      click_par: {
        title
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 分享裂变红包数据
  shareFissionCouponBuried () {
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
  // 大转盘曝光
  drawShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "drawShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 中奖1个的奖品曝光
  prizeOneShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "prizeOneShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 中奖2个的奖品曝光
  prizeTwoShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "prizeTwoShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 中奖3个的奖品曝光
  prizeThreeShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "prizeThreeShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 自动中奖1个曝光
  directPrizeOneShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "directPrizeOneShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 自动中奖2个曝光
  directPrizeTwoShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "directPrizeTwoShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 自动中奖3个曝光
  directPrizeThreeShow () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "directPrizeThreeShow",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 展示抽奖规则弹窗
  showRulePop () {
    this.setData({
      showRule: true
    });
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickRule",
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 隐藏抽奖规则弹窗
  hideRulePop () {
    this.setData({
      showRule: false
    });
  },
  // 关闭砍订单弹层
  closePop () {
    this.buried.status = "close";
  },
  // 获取组件大转盘的抽奖结果
  getDrawResult (e) {
    let { title, prizeList } = e.detail;
    this.setData({
      prizeTile: title,
      prizeList: prizeList,
      notWin: {
        failImg: this.data.luckyDrawInfo.failImg || "",
        failHint: this.data.luckyDrawInfo.failHint || "谢谢参与，再接再厉哦～"
      }
    });
    if (prizeList.length == 1) {
      this.prizeOneShow();
    } else if (prizeList.length == 2) {
      this.prizeTwoShow();
    } else if (prizeList.length == 3) {
      this.prizeThreeShow();
    }
  },
  // 获取ab实验
  fetchStrategyName () {
    getAbTestService({
      body: {
        experimentName: "minipay",
        routingValue: util.getUUIDMD5() || ""
      }
    }).then((res) => {
      let { code, result = {} } = res.data || {};
      if (code == 0) {
        this.setData({
          // experName: "newB", // 假数据
          experName: result.strategyName || "newA"
        });
      }
    });
  },
  // 获取订单基础信息和转盘内容
  fetchOrderData () {
    return new Promise((resolve) => {
      request({
        ...FNIDS.combinationInfo,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          orderId: this.data.orderId,
          payStageType: this.data.payStageType,
          locOrderType: this.data.locOrderType
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {

          let { code, result = null } = res.data || {};
          // console.log("code,result-----", code, result)
          if (code == 0 && result) {
            let orderBasicInfo = result.orderBasicInfo || {};
            if (result.locCodeFloorInfo) {
              this.codeShow(result.locCodeFloorInfo)
            }
            let locCodeFloorInfo = result.locCodeFloorInfo || {}
            let redPackAndCouponInfo = result.redPackAndCouponInfo || {};
            let { cutOrderInfo = {} } = redPackAndCouponInfo
            orderBasicInfo.homeButtonName = result.homeButtonName;
            orderBasicInfo.orderButtonName = result.orderButtonName;
            orderBasicInfo.pageName = result.pageName || "支付成功";
            orderBasicInfo.yuan = orderBasicInfo.totalDiscount && orderBasicInfo.totalDiscount.split('.')[0];
            orderBasicInfo.cent = orderBasicInfo.totalDiscount && orderBasicInfo.totalDiscount.split('.')[1];
            let luckyDrawInfo = result.luckyDrawInfo || null;
            resolve(result);
            // 如果有微常准提示，则上报曝光埋点
            if (result.orderBasicInfo && result.orderBasicInfo.webankHint) {
              this.showWebank();
            }
            let showFissionOrder = false
            if (cutOrderInfo.imgUrl && cutOrderInfo.jumpUrl.indexOf("firstOrderFission-t") > -1) {
              showFissionOrder = true
            }
            /**
             * redPackAndCouponInfo mock 开始
             */
            //  redPackAndCouponInfo.popupType = 7;
            //  redPackAndCouponInfo.returnCoupon = {
            //   couponName: "全场通用券",
            //   quota: 10,
            //   couponValidTime: "7天内使用",
            //   couponBusinessName:"广告"
            //  }
            //  orderBasicInfo.totalDiscount = 0

            // 达达资源位
            // redPackAndCouponInfo.dadaCoupon = {
            //   imgUrl: 'https://storage.360buyimg.com/wxmini/test/2.png'
            // }
            /**
           * redPackAndCouponInfo mock 结束
           */


            this.setData({
              orderBasicInfo,
              luckyDrawInfo,
              locCodeFloorInfo,
              redPackAndCouponInfo,
              showFissionOrder,
              fissionImgUrl: cutOrderInfo.imgUrl
            }, () => {
              this.createCode(locCodeFloorInfo)
            });
            // 达达券曝光埋点
            let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
            if (redPackAndCouponInfo) {
              clickBuriedV2_({
				  create_time: new Date(),
				  click_id: "showFissionCoupon",
				  click_par: {
                  userAction: redPackAndCouponInfo.useraction || '',
                  url: cutOrderInfo.jumpUrl || ''
				  },
				  currentPageName: currentPageName,
				  prePageName: prePageName,
				  pageId: pageIdFirstPage
              })
			  }
          } else {
            this.setData({
              type: 4,
              tips: (res.data && res.data.msg) || "获取支付信息失败",
              btnText: "重新加载"
            });
            wx.reportMonitor(41, 20);
          }
        })
        .catch((err) => {
          this.setData({
            type: 4,
            tips: "获取支付信息失败",
            btnText: "重新加载"
          });
          wx.reportMonitor(41, 20);
          let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
          let errInfo = err && err.toString();
          let deviceid_pdj_jd = util.getUUIDMD5();
          addFilterMsg('combinationInfoFn');
          addFilterMsg(deviceid_pdj_jd)
          addFilterMsg(PDJ_H5_PIN)
          error(errInfo)
        });
    });
  },
  // 推荐商品
  fetchRecommend () {
    let that = this;
    wx.showLoading();
    request({
      ...FNIDS.orderRecommend,
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {
        orderId: this.data.orderId,
        currentPage: this.data.currentPage,
        storeId: this.data.storeId,
        locOrderType: this.data.locOrderType
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        wx.hideLoading();
        let { code, result = null, traceId } = res.data || {};
        if (code == 0 && result) {
          let traceIdFirst = this.data.currentPage === 0 ? traceId : this.data.traceId;
          this.setData(
            {
              currentPage: result.nextPageNo,
              lastPage: result.lastPage,
              title: result.title || "为你优选",
              list: this.data.list.concat(result.data || []),
              traceId: traceIdFirst
            },
            function () {
              // 监听图片懒加载
              LazyLoad && LazyLoad.initObserver && LazyLoad.initObserver((imgId) => {
                // console.log("=====", imgId);
                if (!this.data.imgLazyLoad[imgId]) {
                  this.setData({
                    [`imgLazyLoad.${imgId}`]: true
                  });
                }
              });
            }
          );
        } else {
          wx.reportMonitor(42, 20);
        }
      })
      .catch((err) => {
        wx.hideLoading();
        wx.reportMonitor(42, 20);
        that.addFilterMsgFn('orderRecommendFn', err);
      });
  },

  // 获取店信息
  fetchFollow () {
    request({
      ...FNIDS.followStore,
      isForbiddenDialog: true,
      isNeedDealError: true,
      method: "POST",
      body: {
        orderId: this.data.orderId,
        orgCode: this.data.orgCode,
        attention: 1
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    }).then((res) => {
      let { code = '', result = {} } = res.data || {};
      if (code == "0" && result) {
        let { watch, show, storeName, midTelShow, midTelDesc } = result;
        this.setData({
          attention: watch,
          show,
          storeName,
          midTelShow,
          midTelDesc
        });
        if (watch == 0) {
          // 关注门店按钮曝光
          this.showFollow();

        }
      }
    }).catch((err) => {console.log(err) });
  },


  // 获取抽奖结果
  fetchDrawResult (lotteryCode) {
    let that = this;
    request({
      ...FNIDS.freePrizeDrawV2,
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {
        orderId: this.data.orderId || "",
        lotteryCode: lotteryCode || ""
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        let { code = "", result, traceIdPrize = '' } = res.data;
        if (code == 0 && result) {
          this.setData({
            prizeTile: result.title || "",
            prizeList: result.prizeList || [],
            traceIdPrize
          });
          if (this.data.prizeList.length == 1) {
            this.directPrizeOneShow();
          } else if (this.data.prizeList.length == 2) {
            this.directPrizeTwoShow();
          } else if (this.data.prizeList.length == 3) {
            this.directPrizeThreeShow();
          }
        } else {
          // 自动领如果未中奖则不展示再接再厉
          this.setData({
            prizeTile: "",
            prizeList: []
          });
          wx.reportMonitor(44, 20);
        }
      })
      .catch((err) => {
        // 自动领如果未中奖则不展示再接再厉
        this.setData({
          prizeTile: "",
          prizeList: []
        });
        wx.reportMonitor(44, 20);
        that.addFilterMsgFn('freePrizeDrawV2Fn', err);
      });
  },
  // 获取裂变红包分享信息
  fetchRedPack () {
    orderPublic
      .reqRedPackey({
        orderId: this.data.orderId
      })
      .then((res) => {
        this.setData({
          shareInfo: {
            redImgSrc: res.icon,
            shareTitle: res.shareTitle,
            shareImg: res.bigPic,
            sharePath: res.path
          },
          showPop: true
        });
      })
      .catch((err) => {
        this.setData({
          showPop: false
        });
        this.addFilterMsgFn('fetchRedPackFn', err);
      });
  },
  // 发起砍订单
  toReturnCash () {
    let data = this.data;
    let userInfo = app.globalData.loginStateInfo;
    let wxUserInfo = {};
    try {
      wxUserInfo = wx.getStorageSync("wxUserInfo");
    } catch (e) {
      // console.log(e);
    }
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickzfcgytk",
      click_par: {
        status: 'point'
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
    request({
      method: "POST",
      ...FNIDS.sendCutOrder,
      body: {
        orderId: data.orderId,
        wxOpenid: userInfo.openId || "",
        nickName: userInfo.nickname || wxUserInfo.nickName || "",
        portraitUrl: userInfo.avatar || wxUserInfo.avatarUrl || "",
        source: 1
      },
      isNeedDealError: true,
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        if (res.data.code == "0") {
          if (res.data.result && res.data.result.id) {
            let { recommendObj = {} } = this.data;
            // 跳转到砍订单详情页
            wx.navigateTo({
              url: `/pages/hackOrder-t/launch/index?cutOrderId=${res.data.result.id}&createSource=1&source=1`,
              preObj: recommendObj,
              buried_postion: "order-paySuccess3"
            });
          }
        } else {
          mp.toast({
            title: (res.data && res.data.msg) || "发起失败"
          });
        }
      })
      .catch((err) => {
        mp.toast({
          title: (err.data && err.data.msg) || "发起失败"
        });
      });
  },
  //   收单裂变跳转
  fissionJump () {
    let { recommendObj = {}, redPackAndCouponInfo = {} } = this.data;
    let { cutOrderInfo = {} } = redPackAndCouponInfo
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "clickFissionCoupon",
      click_par: {
		  userAction: redPackAndCouponInfo.useraction || '',
		  url: cutOrderInfo.jumpUrl || ""
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })

    djCmsJump({
      to: "web",
      params: {
		  url: cutOrderInfo.jumpUrl || ""
      },
      userAction: redPackAndCouponInfo.useraction,
      preObj: recommendObj,
      buried_postion: "order-paySuccess2"
	  });
    // wx.navigateTo({
    //   url: `/pages/firstOrderFission-t/launch/index?source=2`,
    //   preObj: recommendObj,
    //   buried_postion: "order-paySuccess2"
    // });
  },

  // 达达券跳转
  dadaCouponJump (e) {
    let that = this;
    let { jumpUrl = '', to = '', appId = '' } = e.currentTarget.dataset.item;
    let { recommendObj = {} } = this.data;
    if (to && jumpUrl) {
      if (jumpUrl.includes('tomp://')) {
        djCmsJump({
          to,
          params: {
            url: jumpUrl
          },
          userAction: '',
          preObj: recommendObj,
          buried_postion: "order-paySuccess"
        });
      } else {
        wx.navigateToMiniProgram({
          appId: appId,
          path: jumpUrl,
          success: () => {
            console.log('跳转成功')
          },
          fail: (err) => {
            that.addFilterMsgFn('dadaCouponJump', err);
          }
        })
      }
    } else {
      mp.toast({
        title: '跳转失败'
      })
    }
    this.clickJumpDadaCoupon();
  },

  onDefaultBtnEvent () {
    this.fetchOrderData().then((res) => {
      this.fetchRecommend(); // 获取推荐商品
      // 自动发券
      let luckyDrawInfo = res.luckyDrawInfo;
      if (this.data.experName == "newB" && luckyDrawInfo) {
        this.fetchDrawResult(luckyDrawInfo.lotteryCode);
      }
    });
  },
  // 订单支付完成页点击达达券跳转前调此接口上传用户点击动作
  clickJumpDadaCoupon () {
    let { pageIdFirstPage = '' } = this.data.recommendObj;
    request({
      ...FNIDS.clickDadaCoupon,
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {},
      pageId: pageIdFirstPage,
      preObj: this.data.recommendObj || {}
    });

    let { redPackAndCouponInfo = {}, recommendObj = {} } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "ClickFissionCoupon",
      click_par: {
        userAction: redPackAndCouponInfo.useraction || ''
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || ""
    })
  },

  // 监控上报Fn
  addFilterMsgFn (name = '', err) {
    let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
    let errInfo = err && err.toString();
    let deviceid_pdj_jd = util.getUUIDMD5();
    addFilterMsg(name);
    addFilterMsg(deviceid_pdj_jd)
    addFilterMsg(PDJ_H5_PIN)
    error(errInfo)
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


  reloadCode () {
    wx.showLoading({
      title: '加载中'
    })
    this.fetchOrderData()
  },

  // 券码楼层曝光
  codeShow (params) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    let { orderId, payStageType, locOrderType } = this.data
    clickBuriedV2_({
      create_time: new Date(),
      click_id: "showModule",
      click_par: {
        orderId: orderId,
        payStageType: payStageType,
        locOrderType: locOrderType,
        codeNum: params.locCodeInfo.qrCodeNum,
        codeType: '',
        locCodeState: params.locCodeInfo.locCodeState
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
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
  }
});