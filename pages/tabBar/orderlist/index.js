
import mp from "../../../common/util/wxapi";
import { requestSign } from '../../../common/util/PayTools';
import { isLogin } from '../../../common/util/loginUtil';
import { FNIDS, request, onCaptureScreen, offCaptureScreen } from "../../../common/util/api";
import { clickBuriedV2_, pvBuriedV2_ } from "../../../common/util/BI";
import wxbarcode from '../../../npm/wxCode/index.js'
var self = null;
var app = getApp();
// 当前时间（性能检测上报用）
let startTime = Date.now();
// 请求开始时间（性能检测上报用）
let requestPreTime = Date.now();
// 请求结束时间（性能检测上报用）
let requestEndTime = Date.now();
// 打点上报flag
let flag = true;

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
    // 展示feed流
    showFeeds: false,
    // 触发触底事件
    pageReachBottom: 0,
    // 首页请求数据是否加载完毕
    resourceRequestFinished: false,
    pageData: {},
    orderList: [],
    loadTip: "加载中...",
    hasAllPage: false, // 是否加载完毕
    isEmpty: true,
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
    isShowOffenStore: true,
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    // 是否授权
    authLocation: false,
    // 常买店铺
    offenBuyStoreList: [],
    defaultType: 0,
    defaultObj: {},
    topMargin: 0,
    showOther: true,
    traceId: null,
    loginStatus: false,
    orderListTopHintType: false,
    button: '',
    tabResultList: [],
    tabType: 1,
    // 核销码
    showCheckCodePop: false,
    // 核销码信息
    locCodeList: {},
    showPayPop: false
  },
  scopeData: {
    // 【图片懒加载】实例对象
    LazyLoad: null,
    windowHeight: ''
  },
  onShow () {
    // 设置tabBar页
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
    var tlogin = isLogin();
    if (tlogin) {
      self.data.hasAllPage = false;
      this.data.currentIndex = 0;
      this.setData({
        showEmpty: false,
        type: 0,
        newList: [],
        loginStatus: true
      }, () => {
        this.requestListNew();
        this.setData({
          showFeeds: false,
          pageReachBottom: 0
        });
        this.getHotStationCombineFun();
        // 检测用户是否登录--用于排查订单不存在问题，步骤2
        this.listWatch(2)
      })
    } else {
      this.setData({
        showEmpty: true,
        showDefault: true,
        defaultType: 4,
        topMargin: 0,
        showFeeds: false,
        pageReachBottom: 0,
        loginStatus: false
      })
    }

    wx.getSetting({
      success (res) {
        self.setData({
          authLocation: res.authSetting["scope.userLocation"]
        })
      }
    })

    // 检测用户是否登录--用于排查订单不存在问题，步骤1
    this.listWatch(1)
  },
  pvFunc (back) {
    let { storeId = '', recommendObj = {} } = this.data;
    pvBuriedV2_({
      storeId: storeId,
      page_par: {
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
    startTime = Date.now();
    flag = true;
    self = this;
    let res = wx.getSystemInfoSync();
    self.scopeData.windowHeight = res.windowHeight;
  },
  onHide () {
    // 取消监听截图
    offCaptureScreen();
    this.timerId && clearTimeout(this.timerId)
  },
  // 获取热门店铺
  getHotStationCombineFun () {
    const addressInfo = wx.getStorageSync("address_info");
    const { latitude, longitude } = addressInfo;
    request({
      method: "GET",
      ...FNIDS.getHotStationCombine,
      body: {
        latitude,
        longitude
      },
      pageId: this.data.pageId,
      preObj: this.data.recommendObj || {}
    }).then(res => {
      let result = res.data.result;
      if (result) {
        this.setData({
          offenBuyStoreList: result.hotStationResult || [],
          isShowOffenStore: result.hotStationResult.length > 0 ? true : false
        })
      }
    }).catch(err => {
      let msg = (err && err.data && err.data.msg) ? err.data.msg : "网络繁忙喽";
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 3000
      });
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onPageScroll: function (e) {
    if (!isLogin()) return
    const query = wx.createSelectorQuery()
    query.select('#order-container').boundingClientRect(react => {
      // console.log('----', e.scrollTop, react.height, self.scopeData.windowHeight);
      if (react && (e.scrollTop >= react.height - self.scopeData.windowHeight)) {
        this.timerId = setTimeout(() => this.handleOnReachBottom(), 300)
      }
    }).exec();

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

  /**
   * @description: 页面触底事件
   * @param {void}
   * @return:
   */
  handleOnReachBottom () {
    this.setData({
      pageReachBottom: ++this.data.pageReachBottom,
      showFeeds: true
    })
    // 第二屏资源位分页
    let pageData = this.data.pageData;
    if (pageData.hasSecondPage) { // 有第二分页
      pageData.hasSecondPage = false;
      pageData.data.forEach((group, groupIndex) => {
        if (Array.isArray(group.data)) {
          group.data.forEach((floor, floorIndex) => {
            if (!floor.showFloor) {
              this.setData({
                [`pageData.data[${groupIndex}].data[${floorIndex}].showFloor`]: true
              })
            }
          })
        }
      })
      this._initBuriedAndImgLoad()

    }
  },

  // 页面滚动
  pageScrollTo (e) {
    let { rectTop = 0, id = '' } = e.detail || {};
    let { top = 0, height = 0 } = this.data.capsule || {};
    if (rectTop) {
      wx.createSelectorQuery().selectViewport().scrollOffset((res) => {
        let scrollTop = res.scrollTop + rectTop - (top + height + 70);
        wx.pageScrollTo({
          scrollTop: scrollTop,
          duration: 100
        })
      }).exec()

    } else {
      wx.pageScrollTo({
        selector: id,
        duration: 100
      })
    }
  },

  /**
   * 监听默认按钮点击
   */
  onDefaultBtnEvent (e) {
    let type = e.detail.type
    if (type === 1) {
      this.setData({
        type: 0,
        defaultType: 0,
        showEmpty: true,
        topMargin: 0
      })
      this.data.hasAllPage = false;
      this.data.currentIndex = 0;
      this.requestListNew()
    } else if (type == 2) {
      let { recommendObj = {} } = this.data;
      wx.navigateTo({
        url: `/pages/newLogin/login/login`,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist1'
        }
      })
    }
  },
  clickInviteCollage (groupShareData) {
    let deliver_type = Object.keys(groupShareData).length > 0 ? groupShareData.typedesc : "参数为空"
    let store_id = Object.keys(groupShareData).length > 0 ? groupShareData.storeId : "参数为空"
    let sku_id = Object.keys(groupShareData).length > 0 ? groupShareData.skuId : "参数为空"
    let orgcode = Object.keys(groupShareData).length > 0 ? groupShareData.orgCode : "参数为空"
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'share_fission_coupon',
      click_par: {
        deliver_type,
        store_id,
        sku_id,
        orgcode
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  shareFissionCoupon () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'share_fission_coupon',
      click_par: {},
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  clickRewardBgBuried () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickRewardBg',
      click_par: {
        type: '点击背景'
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  clickRewardBeanBuried01 () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickRewardBean',
      click_par: {
        type: '知道了'
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
    })
  },
  clickRewardBeanBuried02 () {
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'ClickRewardBean',
      click_par: {
        type: '去看看'
      },
      currentPageName: this.data.recommendObj.currentPageName || "",
      prePageName: this.data.recommendObj.prePageName || "",
      pageId: this.data.recommendObj.pageIdFirstPage || ""
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
    // 开启监听截图
    console.log(tabType || this.data.tabType, 'tabType || this.data.tabType')
    const mpChannel = app.globalData.mpChannel
    onCaptureScreen({
      id: 111
    }, this.data.recommendObj);
    // 请求开始时间（性能检测上报用）
    requestPreTime = Date.now();
    let self = this;
    mp.loading()
    request({
      functionId: mpChannel == 'wx_xcx' ? FNIDS.newOrderList.functionId : FNIDS.orderList.functionId,
      appVersion: mpChannel == 'wx_xcx' ? FNIDS.newOrderList.appVersion : FNIDS.orderList.appVersion,
      body: {
        "startIndex": currentIndex,
        "dataSize": 10,
        "jumpSource": 1,
        "from": tabType || this.data.tabType
      },
      isNeedDealError: true,
      isForbiddenDialog: true,
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
    }).then(res => {
      let traceId = this.data.traceId || res.data.traceId || '';
      mp.hideLoading()
      // 请求结束时间（性能检测上报用）
      requestEndTime = Date.now();

      if (res.data.code == '0') {
        var list = res.data.result && res.data.result.orderList || [];
        var empty = false;
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
            empty = true;
          }
        }
        // 过长的list需要做二维数组，因为setData一次只能设置1024kb的数据量，如果过大的时候，就会报错（二维数组每次只设置其中一维，所以没有这个问题）
        self.setData({
          showEmpty: false,
          isEmpty: empty,
          loadTip: '',
          button: res.data.result && res.data.result.button || '',
          tabResultList: res.data.result && res.data.result.orderTabList,
          tabType: res.data.result && res.data.result.orderTabList && (res.data.result.orderTabList.find(element => element.selected == true) || {}).type
        }, () => {
          if (flag) {
            flag = false;
            // 请求时间（性能检测上报用）
            let requestTime = requestEndTime - requestPreTime;
            // 上报请求时间（性能检测上报用）
            app.reportPerformance(1019, requestTime);
            // setDate渲染时间（性能检测上报用）
            let setDataTime = Date.now() - startTime - requestTime;
            // 上报setDate渲染时间（性能检测上报用）
            app.reportPerformance(2020, setDataTime);

          }
          if (this.data.tabResultList && !isUserClick) {
            const tab = this.data.tabResultList.find((item) => item.selected) || {}
            this.selectTabClick(tab.type, tab.name, 0)
          }
        });
        // 保存全局store信息
        if (list && list.length < 10) {
          self.setData({
            loadTip: "已显示全部"
          })
          if (!self.data.hasAllPage) {
            let nowList = `newList[${self.data.newList.length}]`
            self.setData({
              [nowList]: list,
              traceId: traceId
            }, () => {
            })
          }
          self.data.hasAllPage = true
        } else {
          let nowList = `newList[${self.data.newList.length}]`
          self.setData({
            [nowList]: list,
            traceId: traceId
          }, () => {
          })
        }
        self.data.currentIndex += 10;
        if (!list || list.length <= 0) {
          this.setData({
            showEmpty: true,
            showDefault: true,
            defaultType: 1,
            showMedicineDefault: false,
            defaultObj: { ...res.data },
            topMargin: 30,
            showOther: true
          })
          this.handleOnReachBottom()
        }
        // 检测用户是否登录--用于排查订单不存在问题，步骤3
        this.listWatch(3, list)
      } else {
        this.setData({
          showEmpty: true,
          showDefault: true,
          defaultType: 1,
          showMedicineDefault: false,
          defaultObj: { ...res.data },
          topMargin: 0,
          showOther: false,
          traceId: traceId
        })
        // 检测用户是否登录--用于排查订单不存在问题，步骤4
        this.listWatch(4)
      }
    }).catch(() => {
      mp.hideLoading()
      this.setData({
        showEmpty: true,
        showDefault: true,
        defaultType: 2,
        topMargin: 0,
        showOther: false
      })
      // 检测用户是否登录--用于排查订单不存在问题，步骤5
      this.listWatch(5)
    })
  },
  // 是否显示小黄条提示占位
  showFnTip (e) {
    this.setData({
      orderListTopHintType: e.detail.orderListTopHintType
    })
  },
  // 到达底部，分页加载
  onReachBottom () {
    // this.requestListNew(this.data.currentIndex)
  },
  onPullDownRefresh () {
    if (!isLogin()) {
      wx.stopPullDownRefresh();
      return;
    }
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
  // 监听数据列表---排查用户下单后无订单问题，不属于业务逻辑
  listWatch (flagNum, list = []) {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '', traceId = '' } = this.data;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'list_watch',
      click_par: {
        flagNum,
        list,
        traceId
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  // 请求裂变红包接口
  reqRedPackey: function (list) {
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
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {}
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
      }).catch(() => {
        self.setData({
          shareImgShow: false
        })
      })
    }
  },
  /**
   * 支付
   * @param options
   */
  requestSign (options) {
    let self = this;
    if (!this.data.flag) return;
    this.setData({
      flag: false
    });
    requestSign(options, function () {
      self.groupPayCheck(options.orderId).then(res => {
        self.setData({
          flag: false
        });
        let result = res.data.result;
        if (result) {
          let { recommendObj = {} } = self.data;
          // 校验拼团或参团成功
          wx.navigateTo({
            url: "/pages/groupBuy/paySuccess/index?orderId=" + options.orderId + '&groupId=' + options.groupId,
            preObj: recommendObj,
            buried_position: {
              currentPageName: 'tabbar-orderlist2'
            }
          })
        } else {
          mp.dialog({
            content: res.data && res.data.msg,
            showCancel: false
          }).then(res => {
            if (res.confirm) {
              let { recommendObj = {} } = this.data;
              // 校验拼团或参团失败
              if (self.data.groupCode) {
                wx.navigateTo({
                  url: "/pages/groupBuy/join/index?&groupId=" + self.data.groupCode,
                  preObj: recommendObj,
                  buried_position: {
                    currentPageName: 'tabbar-orderlist3'
                  }
                })
              } else {
                wx.navigateTo({
                  url: "/pages/groupBuy/orderInfo/index?&orderId=" + options.orderId,
                  preObj: recommendObj,
                  buried_position: {
                    currentPageName: 'tabbar-orderlist4'
                  }
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
      let { recommendObj = {} } = self.data;
      wx.navigateTo({
        url: "/pages/groupBuy/orderInfo/index?orderId=" + options.orderId,
        preObj: recommendObj,
        buried_position: {
          currentPageName: 'tabbar-orderlist5'
        }
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
    return new Promise((resolve, reject) => {
      request({
        ...FNIDS.groupPayCheck,
        body: {
          orderId: orderId
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {}
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
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      preObj: this.data.recommendObj || {}
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
      let msg = (err && err.data && err.data.msg) ? err.data.msg : "今日分享朋友圈机会已用完，请直接分享好友";
      this.hintRequestShareMomentsPicFailed(msg);
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
  clickCallBuried (e) {
    let {orderId = '', type = '', orderState = 0} = e.detail;
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickPhone',
      click_par: {
        orderId,
        phoneNumType: type,
        orderState
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage
    })
  },
  clickAfterSaleBarBuried () {
    let { currentPageName = '', prePageName = '', pageIdFirstPage = '' } = this.data.recommendObj;
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'click_after_sale_bar',
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
    let { deliver_type, store_id, sku_id, orgcode, group_type } = e.detail;
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
  toOrderDetail () {
    let { recommendObj = {} } = this.data;
    wx.navigateTo({
      url: "/pages/order/list/index",
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'tabbar-orderlist6'
      }
    })
  },
  hideOffenStore () {
    // console.log('hideOffenStore---');
    this.setData({
      isShowOffenStore: false
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
    this.data.currentIndex = 0;
    this.data.hasAllPage = false
    this.setData({
      tabResultList: JSON.parse(JSON.stringify(tabResultList)),
      tabType: tabType,
      newList: [],
      showEmpty: false,
      showShare2MomentsDialog: false,
      showFeeds: false
    }, () => {
      this.selectTabClick(tabType, tabName)
      this.requestListNew(0, tabType, true)
      this.selectComponent("#topTips").getTopHintInfo()
    })
  },

  async handleShowCheckCodePop (e) {
    const _this = this
    try {
      wx.showLoading({
        title: '加载中'
      })
      const { data } = await this.getLocCodeList(e.detail.orderId || e.detail)
      if (data.code == '0') {
        wx.hideTabBar({
          success () {
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
          }
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
    }, () => {
      wx.showTabBar()
    })
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

  // 刷新
  reloadCode (e) {
    this.handleShowCheckCodePop(e)
  },

  closeNewPayPop () {
    wx.showTabBar()
    this.setData({
      showPayPop: false
    })
  },
  onShowPayPop (e) {
    const _this = this
    wx.hideTabBar({
      success () {
        _this.setData({
          ...e.detail
        })
      }
    })
  },
  onPaySuccess () {
    this.setData({
      showPayPop: false
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
  }

})
