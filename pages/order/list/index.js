
import mp from "../../../common/util/wxapi";
import { requestSign } from '../../../common/util/PayTools';
import { isLogin } from '../../../common/util/loginUtil';
import { FNIDS, request, onCaptureScreen, offCaptureScreen } from "../../../common/util/api";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../common/util/BI";
import { addFilterMsg, error } from '../../../common/util/wxLog';
import util from '../../../common/util/util'
import wxbarcode from '../../../npm/wxCode/index.js'
var self = null;
var app = getApp();
// 当前时间（性能检测上报用）
// let startTime = Date.now();
// 请求开始时间（性能检测上报用）
// let requestPreTime = Date.now();
// 请求结束时间（性能检测上报用）
// let requestEndTime = Date.now();
// 打点上报flag
// let flag = true;

Page({
  // 埋点
  buried: {
    deliver_type: "空",
    store_id: "空",
    sku_id: "空",
    orgcode: "空",
    order_id: "空",
    group_type: "空",
    state: "空",
    orderId: "空"
  },
  data: {
    orderList: [],
    loadTip: "",
    hasAllPage: false, // 是否加载完毕
    showEmpty: false, // 展示默认页
    type: 0, // 列表-类型
    tips: "", // 列表-提示
    btnText: "", // 列表-按钮
    redImgSrc: "https://img11.360buyimg.com/promotion/jfs/t19405/266/1226496275/18804/6b478d02/5ac24c8cN7697529e.png",
    shareImgShow: false,
    flag: true, // 防止重复提单支付
    groupEndTimeObj: null,
    selfPickEndTimeObj: null,
    payEndTimeObj: null,
    showShare2WxDialog: false, // 展示分享微信朋友圈弹层
    momentsShareImgSrc: "", // 朋友圈分享图片
    showShare2MomentsDialog: false, // 保存分享图片弹层
    groupShareData: {}, // 拼团分享受数据
    savePicDialogReportData: {}, // 点击保存图片埋点信息
    newList: [], // 长列表二维数组
    currentIndex: 0, // 分页索引,
    isShowMiddleModal: false,
    orderId: 0,
    storeId: 0,
    defaultType: 0,
    defaultObj: {},
    traceId: null,
    orderListTopHintType: 0,
    showCheckCodePop: false,
    tabResultList: [],
    tabType: 1,
    showPayPop: false
  },
  onShow () {
    // 设置tabBar页
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    // this.closeNewPayPop()
    var tlogin = isLogin();
    if (tlogin) {
      self.data.hasAllPage = false;
      this.data.currentIndex = 0;
      this.setData({
        showEmpty: false,
        type: 0,
        newList: []
      }, () => {
        this.requestListNew();
      })
    } else {
      this.setData({
        showEmpty: true,
        showDefault: true,
        defaultType: 4
      })
    }
  },
  pvFunc (back) {
    let { storeId = '', recommendObj = {} } = this.data;
    pvBuriedV2_({
      page_par: {
        storeId: storeId,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || ""
        }
      },
      pageId: recommendObj.pageIdFirstPage || "",
      currentPageName: recommendObj.currentPageName,
      prePageName: recommendObj.prePageName,
      'isBack': back || ''
    })
  },
  /**
   *  监听页面显示，
   *    当从当前页面调转到另一个页面
   *    另一个页面销毁时会再次执行
   */
  onLoad () {
    // 打点起始时间
    // startTime = Date.now();
    // flag = true;
    self = this;
  },
  onHide () {
    // 取消监听截图
    offCaptureScreen();
  },
  /**
   * 监听默认按钮点击
   */
  onDefaultBtnEvent (e) {
    let type = e.detail.type
    console.log(type, 'type')
    if (type === 1) {
      this.setData({
        defaultType: 0,
        showEmpty: true,
        defaultObj: {}
      })
      this.data.hasAllPage = false;
      this.data.currentIndex = 0;
      this.requestListNew()
    } else if (type == 2) {
      let { recommendObj = {} } = this.data;
      wx.navigateTo({
        url: `/pages/newLogin/login/login`,
        preObj: recommendObj,
        buried_postion: "order-list1"
      })
    }
  },
  clickInviteCollage (groupShareData) {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickInviteCollage',
      click_par: {
        deliver_type: Object.keys(groupShareData).length > 0 ? groupShareData.typedesc : "参数为空",
        store_id: Object.keys(groupShareData).length > 0 ? groupShareData.storeId : "参数为空",
        sku_id: Object.keys(groupShareData).length > 0 ? groupShareData.skuId : "参数为空",
        orgcode: Object.keys(groupShareData).length > 0 ? groupShareData.orgCode : "参数为空"
      }
    })
  },
  shareFissionCoupon () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'share_fission_coupon',
      click_par: {}
    })
  },
  // 是否显示小黄条提示占位
  showFnTip (e) {
    this.setData({
      orderListTopHintType: e.detail.orderListTopHintType
    })
  },
  clickRewardBgBuried () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickRewardBg',
      click_par: {
        type: "点击背景"
      }
    })
  },
  clickRewardBeanBuried01 () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickRewardBean',
      click_par: {
        type: "知道了"
      }
    })
  },
  clickRewardBeanBuried02 () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickRewardBean',
      click_par: {
        type: "去看看"
      }
    })
  },
  onShareAppMessage: function (res) {
    var shareUtil = require('../../../common/util/share_utils.js');
    var url = shareUtil.getShareUrl();
    if (res.from === 'button') {
      // 拼团分享
      let dataSet = res.target.dataset;
      let from = dataSet.from;
      let groupShareData = this.data.groupShareData;
      // 埋点
      this.clickInviteCollage(groupShareData)
      if (from === 'groupBuy') {
        this.setData({
          showShare2WxDialog: false
        });
        let groupShareData = this.data.groupShareData;
        let product = groupShareData.productlist[0]
        let imgUrl = groupShareData.shareimgurl
        let skuName = product.name
        let basicPrice = product.basicPrice / 100
        let price = product.price / 100
        let shareTitle = '快！' + price + '元拼【原价' + basicPrice + '元】' + skuName;
        return {
          title: shareTitle,
          path: '/pages/groupBuy/join/index?groupId=' + groupShareData.groupId + "&channel=2",
          imageUrl: imgUrl
        }
      } else {

        // 来自页面内转发按钮
        this.shareFissionCoupon()
        return {
          title: self.data.shareTitle,
          path: self.data.sharePath,
          imageUrl: self.data.shareImg
        }
      }
    } else {
      return {
        title: '京东到家',
        path: url
      }
    }
  },
  // 获取订单列表
  requestListNew (currentIndex = 0, tabType, isUserClick) {
    let self = this;
    const mpChannel = app.globalData.mpChannel
    mp.loading()
    // 开启监听截图
    onCaptureScreen({
      id: 111
    }, self.data.recommendObj);
    // 请求开始时间（性能检测上报用）
    // requestPreTime = Date.now();
    let { recommendObj = {} } = this.data;
    request({
      functionId: mpChannel == 'wx_xcx' ? FNIDS.newOrderList.functionId : FNIDS.orderList.functionId,
      appVersion: mpChannel == 'wx_xcx' ? FNIDS.newOrderList.appVersion : FNIDS.orderList.appVersion,
      body: {
        "startIndex": currentIndex,
        "dataSize": 10,
        "jumpSource": 2,
        "from": tabType || this.data.tabType
      },
      pageId: recommendObj.pageIdFirstPage || "",
      isNeedDealError: true,
      isForbiddenDialog: true,
      preObj: recommendObj
    }).then(res => {
      mp.hideLoading()
      // 请求结束时间（性能检测上报用）
      // requestEndTime = Date.now();
      let { code = '', result = [] } = res.data;
      let traceId = this.data.traceId || res.data.traceId || '';
      let currentIndex = this.data.currentIndex
      if (code == '0' && result && result.orderList && (currentIndex || result.orderList.length)) {
        var list = res.data.result && res.data.result.orderList || [];
        self.setData({
          tabResultList: res.data.result && res.data.result.orderTabList,
          tabType: res.data.result && res.data.result.orderTabList && (res.data.result.orderTabList.find(element => element.selected == true) || {}).type
        }, () => {
          if (this.data.tabResultList && !isUserClick) {
            const tab = this.data.tabResultList.find((item) => item.selected) || {}
            this.selectTabClick(tab.type, tab.name, 0)
          }
        })
        if (list.length > 0) {
          // 拼团逻辑
          list.forEach((item) => {
            if (item.groupAgainSwitch === 1) {
              item.btnTxt = '再团一个';
              item.btnType = 1;
            } else if (item.inviteFriendsSwitch === 1) {
              item.btnTxt = '邀请参团';
              item.btnType = 2;
            } else if (item.showPay == 1) {
              item.btnTxt = '立即付款';
              item.btnType = 3;
            } else if (!item.prescriptionTag) {
              item.btnTxt = '再次购买';
              item.btnType = 1;
            }
          })
        }
        // 检测是否有砍订单活动
        if (self.data.currentIndex == 0) {
          this.reqRedPackey(list)
          if (!list || list.length <= 0) {
            // empty = true;
            // this.setData({
            //   showEmpty: true,
            //   showDefault: true,
            //   defaultType: 1,
            //   defaultObj:{...res.data}
            // })
          }
        }
        // 过长的list需要做二维数组，因为setData一次只能设置1024kb的数据量，如果过大的时候，就会报错（二维数组每次只设置其中一维，所以没有这个问题）

        if (list && list.length < 10) {
          self.setData({
            loadTip: "已显示全部订单喽~",
            showEmpty: false
          })
          if (!self.data.hasAllPage) {
            let nowList = `newList[${self.data.newList.length}]`
            self.setData({
              [nowList]: list,
              showEmpty: false,
              traceId: traceId
            })
          }
          self.data.hasAllPage = true
        } else {
          let nowList = `newList[${self.data.newList.length}]`
          self.setData({
            [nowList]: list,
            showEmpty: false,
            traceId: traceId,
            loadTip: ''
          }, () => {
          })
        }
        self.data.currentIndex += 10;

      } else {
        this.setData({
          showEmpty: true,
          showDefault: true,
          defaultType: 1,
          defaultObj: { ...res.data }
        })
        wx.reportMonitor(31, 20);
      }
    }).catch(err => {
      mp.hideLoading()
      this.setData({
        showEmpty: true,
        showDefault: true,
        defaultType: 2
      })
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let errInfo = err && err.toString();
      let deviceid_pdj_jd = util.getUUIDMD5();
      wx.reportMonitor(31, 20);
      addFilterMsg('orderListFn');
      addFilterMsg(deviceid_pdj_jd);
      addFilterMsg(PDJ_H5_PIN);
      error(errInfo)
    })
  },
  // 到达底部，分页加载
  onReachBottom () {
    !this.data.hasAllPage && this.requestListNew(this.data.currentIndex)
  },
  onPullDownRefresh () {
    this.data.currentIndex = 0;
    this.data.hasAllPage = false
    this.setData({
      showEmpty: false,
      newList: [],
      showShare2MomentsDialog: false
    }, () => {
      this.requestListNew()
      wx.stopPullDownRefresh()
    })
  },
  // 请求裂变红包接口
  reqRedPackey: function (list) {
    let { recommendObj = {} } = this.data;
    if (list && list.length > 0) {
      request({
        ...FNIDS.getRedPackActivityInfo,
        isNeedDealError: true,
        isForbiddenDialog: true,
        body: {
          "orderNo": list[0].orderId,
          "reqPage": "2",
          userPin: app.globalData.loginStateInfo.PDJ_H5_PIN
        }, // reqPage:1,：支付成功页，2：订单详情页
        pageId: recommendObj.pageIdFirstPage || "",
        preObj: recommendObj
      }).then(res => {
        if (res.data.code == '0') {
          if (res.data.result) {
            var packetData = res.data.result;
            self.setData({
              redImgSrc: packetData.icon,
              shareImgShow: true
            })
            self.data.shareTitle = packetData.shareTitle;
            self.data.shareImg = packetData.bigPic;
            self.data.sharePath = packetData.path;
          } else {
            self.setData({
              shareImgShow: false
            })
          }
        } else {
          self.setData({
            shareImgShow: false
          })
        }
      }).catch((err) => {
        self.setData({
          shareImgShow: false
        })
        let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
        let errInfo = err && err.toString();
        let deviceid_pdj_jd = util.getUUIDMD5();
        addFilterMsg('getRedPackActivityInfoFn');
        addFilterMsg(deviceid_pdj_jd);
        addFilterMsg(PDJ_H5_PIN);
        error(errInfo)
      })
    }
  },
  /**
   * 支付
   * @param options
   */
  requestSign (options) {
    let { recommendObj = {} } = this.data;
    let self = this;
    if (!this.data.flag) return;
    this.setData({
      flag: false
    });
    requestSign(options, function () {
      let { recommendObj = {} } = this.data;
      self.groupPayCheck(options.orderId).then(res => {
        self.setData({
          flag: false
        });
        let result = res.data.result;
        if (result) {
          // 校验拼团或参团成功
          wx.navigateTo({
            url: "/pages/groupBuy/paySuccess/index?orderId=" + options.orderId + '&groupId=' + options.groupId,
            preObj: recommendObj,
            buried_postion: "order-list2"
          })
        } else {
          mp.dialog({
            content: res.data && res.data.msg,
            showCancel: false
          }).then(res => {
            if (res.confirm) {
              // 校验拼团或参团失败
              if (self.data.groupCode) {
                wx.navigateTo({
                  url: "/pages/groupBuy/join/index?&groupId=" + self.data.groupCode,
                  preObj: recommendObj,
                  buried_postion: "order-list3"
                })
              } else {
                wx.navigateTo({
                  url: "/pages/groupBuy/orderInfo/index?&orderId=" + options.orderId,
                  preObj: recommendObj,
                  buried_postion: "order-list4"
                })
              }
            }
          })
        }
      }).catch(() => {
        self.setData({
          flag: false
        })
      })

    }, function () {
      wx.navigateTo({
        url: "/pages/groupBuy/orderInfo/index?orderId=" + options.orderId,
        preObj: recommendObj,
        buried_postion: "order-list5"
      })
    });
    this.setData({
      flag: true
    })
  },
  /**
   * 校验参团
   */
  groupPayCheck (orderId) {
    let { recommendObj = {} } = this.data;
    return new Promise((resolve, reject) => {
      request({
        ...FNIDS.groupPayCheck,
        body: {
          orderId: orderId
        },
        pageId: recommendObj.pageIdFirstPage || "",
        preObj: recommendObj
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 分享
  showShare (data) {
    this.setData({
      showShare2WxDialog: true,
      groupShareData: data.detail
    })
  },
  // 点击朋友圈分享
  share2Moments () {
    let data = this.data.groupShareData;
    let channel = "1"
    this.setData({
      savePicDialogReportData: {
        create_time: new Date(),
        click_id: "ClickSavePicture",
        click_par: {
        }
      }
    })
    let { recommendObj = {} } = this.data;
    // 请求生成朋友圈图片接口
    mp.loading_cover();
    request({
      ...FNIDS.getGroupSharePicture,
      isNeedDealError: true,
      body: {
        scene: data.groupId + "," + channel,
        page: "pages/groupBuy/join/index",
        storeId: data.storeId,
        orgCode: data.orgCode,
        skuId: data.skuId
      },
      pageId: recommendObj.pageIdFirstPage || "",
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0 && res.data.result) {
        this.setData({
          showShare2WxDialog: false,
          showShare2MomentsDialog: true,
          momentsShareImgSrc: res.data.result
        });
      } else {
        this.hintRequestShareMomentsPicFailed();
      }
    }).catch(err => {
      let msg = (err && err.data) ? err.data.msg : "今日分享朋友圈机会已用完，请直接分享好友";
      this.hintRequestShareMomentsPicFailed(msg);
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let errInfo = err && err.toString();
      let deviceid_pdj_jd = util.getUUIDMD5();
      addFilterMsg('getGroupSharePictureFn');
      addFilterMsg(PDJ_H5_PIN);
      addFilterMsg(deviceid_pdj_jd);
      error(errInfo)
    })
  },
  // 获取分享朋友圈图片失败提示
  hintRequestShareMomentsPicFailed (msg) {
    this.setData({
      showShare2WxDialog: false
    });
    mp.toast({
      title: msg || "获取到分享朋友圈图片失败,稍后重试"
    });
  },

  // 当前是 tab 页时，点击 tab 时触发
  onTabItemTap () {
    app.globalData.homeIconFlag = true
  },
  pageBuried (e) {
    const { type, orderId, state } = e.detail;
    if (type == 1 || type == 2 || type == 3) {
      this.exweichangzhunBuried(orderId, state)
    }
    if (type == 4) {
      this.clickObtainBuried(orderId)
    }
    if (type == 5) {
      this.clickActivationBuried(orderId)
    }
    if (type == 6) {
      this.clickObtainLayerBuried(orderId)
    }
    if (type == 7) {
      this.clickActivationLayerBuried(orderId)
    }
    if (type == 8) {
      this.clickCheckLayerBuried(orderId)
    }
    if (type == 9) {
      this.clickCheckBuried(orderId)
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
      click_id: 'clickObtainBuried',
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
  clickCallBuried () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_call',
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickAfterSaleBarBuried () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: '  click_after_sale_bar',
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickOrderStateBuried () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_order_state',
      click_par: {},
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  gotoCodeBuried (e) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickOrderBarCode',
      click_par: {
        order_id: e.detail.orderId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickOrderBtnBuried (e) {
    let { deliver_type = '', store_id = '', sku_id = '', orgcode = '', group_type = '' } = e.detail;
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickCollageAgain',
      click_par: {
        deliver_type,
        store_id,
        sku_id,
        orgcode,
        group_type
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  showMiddleModal (e) {
    this.setData({
      orderId: e.detail.orderId,
      storeId: e.detail.storeId,
      isShowMiddleModal: true
    })
    // 埋点
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'showLayer',
      click_par: {
        type: 'rideNormalProtect',
        orderId: this.data.orderId,
        storeId: this.data.storeId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  closeModal () {
    this.setData({
      isShowMiddleModal: false
    })
  },

  selectTab (e) {
    let { tabType = -1 } = e.detail;
    let { tabResultList = [] } = this.data;
    let tabName = ''
    tabResultList.forEach(v => {
      if (v.type == tabType) {
        v.selected = 1;
        tabName = v.name
      } else {
        v.selected = 0;
      }
    });
    this.setData({
      tabResultList: JSON.parse(JSON.stringify(tabResultList)),
      tabType: tabType,
      newList: [],
      showEmpty: false,
      showShare2MomentsDialog: false,
      currentIndex: 0,
      hasAllPage: false
    }, () => {
      this.selectTabClick(tabType, tabName)
      this.requestListNew(0, tabType, true)
      this.selectComponent("#topTips").getTopHintInfo()
    })
  },
  // 切换Tab埋点
  selectTabClick (tabType, tabName, state = -1) {
    const click_par = {
      tabType,
      tabName
    }
    if (state != -1) {
      click_par.state = state
    }
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectTab',
      click_par,
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },

  async handleShowCheckCodePop (e) {
    const _this = this
    try {
      wx.showLoading({
        title: '加载中'
      })
      const { data } = await this.getLocCodeList(e.detail.orderId)
      if (data.code == '0') {
        _this.setData({
          showCheckCodePop: true,
          locCodeList: {
            ...data.result,
            orderId: e.detail.orderId
          }
        }, () => {
          if (e.detail.isBtnClick) {
            clickBuriedV2_({
              create_time: new Date(),
              click_id: 'showLayer',
              click_par: {
                orderId: e.detail.orderId,
                locOrderType: e.detail.locOrderType,
                orderState: e.detail.orderState,
                type: 'codeNum'
              },
              currentPageName: _this.data.recommendObj.currentPageName || "",
              prePageName: _this.data.recommendObj.prePageName || "",
              pageId: _this.data.recommendObj.pageIdFirstPage || ""
            })
          }
          _this.createCode(data.result.locCodeInfo.qrCodeNum)
        })
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 3000
        })
      }
    } catch (e) {
      wx.hideLoading()
      console.error(e)
    }
  },
  // 发码接口
  async getLocCodeList (orderId) {
    return await request({
      method: "GET",
      ...FNIDS.getLocCodeList,
      isNeedDealError: true,
      body: {
        orderId
      },
      pageId: this.data.pageId,
      preObj: this.data.recommendObj || {}
    })
  },

  createCode (qrCodeNum) {
    wxbarcode.qrcode('qrcode', qrCodeNum, 240, 240);
    if (qrCodeNum.length < 40) {
      wxbarcode.barcode('barcode', qrCodeNum, 240, 80);
    }
  },

  closeCheckCodePop () {
    const _this = this
    _this.setData({
      showCheckCodePop: false
    })
  },

  // 刷新
  reloadCode (e) {
    this.handleShowCheckCodePop(e)
  },
  closeNewPayPop () {
    this.setData({
      showPayPop: false
    })
  },
  onShowPayPop (e) {
    this.setData({
      ...e.detail
    })
  }
})
