/* eslint-disable camelcase */
import {
  request,
  FNIDS
} from '../../common/util/api'
import util from "../../common/util/util";
import { pvBuriedV2_, clickBuriedV2_ } from "../../common/util/BI";
import { observeProxy, setProxy } from '../../common/util/rewrite'
import { addFilterMsg, warn } from '../../common/util/wxLog';
import djBus from '../../common/util/djBus'

// 当前时间（性能检测上报用）
let startTime = (new Date()).getTime();
let requestCostTime = 0;
let getChannelDetailStartTime = 0;
let getChannelDetailEndTime = 0;
let setDataTimeTime = 0;
let app = getApp()
let timer = null
let deviceid_pdj_jd = util.getUUIDMD5();
let loginInfo = wx.getStorageSync('login_info');
let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || '';
Page({
  buried: {
    floorType: '',
    channelId: '',
    userAction: ''
  },
  exposureObj: {
    // selector: '.scrollview >>> .channel_ep'
  },
  /**
   * 页面的初始数据
   */
  data: {
    showEmpty: false, // 展示默认页
    defaultType: 0, // 类型
    channelId: '',
    channelBusiness: '',
    config: {},
    compList: [],
    statusBarHeight: 28,
    scrollTop: 0,
    initIndex: 1,
    currentIndex: 1, // 一级分类导航索引
    sIndex: 0, // 横向滑动一级导航滚动当前选中项目
    secondNavArr: [], // 二级导航数据
    siderHide: false,
    skuList: [],
    couponList: [], // 优惠券券包
    currentPage: 1, // 分页参数
    isRefersh: false, // 是否是刷新商品列表
    isLoading: false,
    list_no_data: false,
    errMsg: '暂无商品',
    firstOnShow: false,
    showSecondNav: false,
    navArr: [], // 二级分类导航 - 横滑
    horiCurrentIndex: 0,
    categoryList: [], // 一级分类导航 - 横滑
    skuListType: 1, // feed类型
    lastPage: false, // 是否到底了
    passThroughParams: null, // 新feeds接口需要参数
    hintMsg: {}, // feeds兜底参数
    categoryBallBgHeight: '', // 分类球背景高度
    isShowBackTop: true,
    pageMoving: false, // 是否滑动
    isBackTopPvShow: true,
    traceId: '',
    skuListTraceId: '',
    isShowArrow: false,
    arrowDirection: false,
    fading: false,
    fadeSrcoll: null,
    isBeltShow: false, //  是否显示腰带
    beltType: 0, // 腰带交互类型
    refreshBeltTimeFlag: '', // 刷新腰带标识
    count: 0, // feed接口字段
    defaultObj: {},
    isIphoneX: false,
    self_page: 'channel',
    categoryBallName: '精选', // 当前选中的分类球，埋点使用
    channelType: '',
    currentBallIndex: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    startTime = Date.now();
    clickBuriedV2_({
      click_id: 'spclModelStart',
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    })
    this.setData({
      channelId: options.channelId,
      isIphoneX: app.globalData.isIpx,
      channelBusiness: options.channelBusiness
    }, () => {
      this.getChannelDetail();
    })
    setTimeout(() => {
      let leavePopDate = wx.getStorageSync('leavePopDate');
      let leavePopLimitDay = wx.getStorageSync('leavePopLimitDay');
      let diffDay = new Date(util.formatDate()).getTime() - new Date(leavePopDate).getTime()
      if (diffDay >= leavePopLimitDay || !leavePopDate) {
        this.selectComponent('#leave') && this.selectComponent('#leave').leaveMarketing({
          pageSource: "newChannelPage",
          channelId: this.data.channelId,
          channelBusiness: this.data.channelBusiness,
          dataType: 0
        })
      }
    }, 2000)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // let {statusBarHeight = 0,windowWidth} = wx.getSystemInfoSync();
    let { top = 24, height = 30 } = app.globalData.capsule;
    this.setData({
      statusBarHeight: top ? top + (height - 30) / 2 : 25
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      refreshBeltTimeFlag: (new Date()).getTime()
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.disconnectEpBuried()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.disconnectEpBuried()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 配置接口异常回调
  onDefaultBtnEvent: function () {
    this.getChannelDetail()
  },
  // feed异常回调
  onDefaultBtnList: function (e) {
    const { type } = e.detail
    this.getChannelSkuList(type)
  },
  // 判断分类个数，设置背景图高度
  countBallNum () {
    let number
    let length = this.data.config && this.data.config.cateBallConfig && this.data.config.cateBallConfig.categoryList && this.data.config.cateBallConfig.categoryList.length
    if (length <= 7) {
      number = 192
    } else if (length > 7 && length <= 10) {
      number = 368
    } else {
      number = 392
    }
    this.setData({
      categoryBallBgHeight: number
    })
  },
  // 获取频道页配置信息接口
  getChannelDetail () {
    requestCostTime = Date.now();
    getChannelDetailStartTime = Date.now();
    const addressInfo = wx.getStorageSync('address_info') || {};
    const { longitude = '', latitude = '', cityId = '', cityName = '' } = addressInfo;
    const query = {
      city: cityName,
      longitude,
      latitude,
      areaCode: cityId,
      coordType: "2",
      channelId: this.data.channelId,
      ctp: 'channel',
      ref: 'home',
      tagId: this.data.tagId || '',
      index: this.data.currentIndex,
      cateBallDataId: this.data.dataId,
      channelBusiness: this.data.channelBusiness,
      pageSource: this.data.recommendObj.pageSource,
      refPageSource: this.data.recommendObj.refPageSource,
      ref_par: {
        traceId: this.data.recommendObj.preTraceId || "",
        userAction: this.data.recommendObj.preUserAction || ""
      }
    }
    // let failMsg = ''
    if (observeProxy.aheadRqFinish == null) {
      request({
        functionId: FNIDS.channelDetail.functionId,
        appVersion: FNIDS.channelDetail.appVersion,
        body: query,
        method: 'POST',
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj
      }).then(res => {
        this.commonFunction(res)
      }).catch(err => {
        // failMsg = err.data && err.data.msg || '';
        this.setData({
          showEmpty: true,
          defaultType: 1,
          defaultObj: {
            imgType: err.data && err.data.imgType,
            title: err.data && err.data.title,
            msg: err.data && err.data.msg,
            errorCode: err.data && err.data.errorCode,
            btnArr: err.data && err.data.btnArr,
          },
        });
        wx.reportMonitor(16, 20);
        addFilterMsg('channelMainErrorCatch')
        addFilterMsg(FNIDS.channelDetail.functionId)
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg(PDJ_H5_PIN)
        warn(query)
      })
    } else if (observeProxy.aheadRqFinish == 'loading') {
      observeProxy.stack = this.commonFunction
    } else if (observeProxy.aheadRqFinish == 'finished') {
      this.commonFunction(observeProxy.preLoad)
      setProxy(true)
    }
  },
  commonFunction (res) {
    if (res && res.data) {
      // mock数据
      // res.data = mock
      const { result = {}, code } = res.data;
      if (this.data.channelType == 22) {
        result.config.cateBallConfig = this.data.config.cateBallConfig
        result.config.searchConfig = this.data.config.searchConfig
      }
      const { config: { passThroughParams, cateBallConfig = {} } = {}} = result;
      const { categoryList = [] } = cateBallConfig;
      getChannelDetailEndTime = Date.now();
      console.log("getChannelDetailtime---->", getChannelDetailEndTime - getChannelDetailStartTime);
      if (code == 0) {
        const setDataStartTime = Date.now();
        let channelData = {
          initIndex: (categoryList[0] && categoryList[0].index) || 0,
          currentIndex: this.data.channelType == 22 ? this.data.currentIndex : (categoryList[0] && categoryList[0].index) || 0,
          config: result.config || {},
          compList: result.data || [],
          tagId: (categoryList[0] && categoryList[0].tagId) || 0,
          channelBusiness: result.config.channelBusiness,
          isRefersh: true,
          showEmpty: false,
          passThroughParams,
          traceId: res.data.traceId,
          channelType: result.config.channelType || ''
        }
        if (this.data.channelType == 22) {
          channelData = Object.assign(channelData, {
            currentBallIndex: this.data.currentIndex
          })
        }
        this.setData(
          channelData,
          () => {
            let nowTime = (new Date()).getTime()
            clickBuriedV2_({
              click_id: 'spclModelSuccess',
              click_par: {
                type: 2,
                duration: String(nowTime - startTime)
              },
              pageId: this.data.recommendObj.pageIdFirstPage || "",
              currentPageName: this.data.recommendObj.currentPageName,
              prePageName: this.data.recommendObj.prePageName
            })
            this.countBallNum()
            setDataTimeTime = Date.now() - setDataStartTime;
            console.log("setDataTime-------->", setDataTimeTime);
            const { compList = [] } = this.data;
            if (Array.isArray(compList) && compList.length > 0) {
              this.data.compList.forEach((item) => {
                this.floorShow(item.floorStyle);
              });
            }
            if (this.data.tagId) {
              this.getChannelSkuList();
              this.setData({
                list_no_data: false,
                errMsg: ""
              });
            } else {
              this.setData({
                list_no_data: true,
                errMsg: "暂无商品"
              });
            }
            if (Array.isArray(categoryList) && categoryList.length > 0) {
              this.setData(
                {
                  categoryList: categoryList.sort(
                    (a = {}, b = {}) => a.index - b.index
                  )
                },
                () => {
                  // console.log('categoryList',this.data.categoryList)
                }
              );
            }
          }
        );
        // 曝光埋点
        this.exposureInit()
        return;
      } else {
        this.setData({
          showEmpty: true,
          defaultType: 1,
          defaultObj: {
            imgType: result.imgType,
            title: result.title,
            msg: result.msg,
            errorCode: result.errorCode,
            btnArr: result.btnArr
          }
        });
      }
      // failMsg = (res.data && res.data.msg) || "";
    } else {
      addFilterMsg('channelMainError')
      warn(res)
    }
  },
  // 异步改同步，顺序执行feed接口
  setUpSynch (type) {
    return new Promise((resolve) => {
      this.setData({
        isLoading: true,
        currentPage: type == 1 ? 1 : ''
      }, () => {
        resolve()
      })
    })
  },
  // 获取数据列表
  async getChannelSkuList (type) {
    // 到店频道页不请求feed
    if (this.data.channelType == 22) {
      return
    }
    // 控制异常接口返回，重新加载等操作
    if (type) {
      await this.setUpSynch(type)
    } else {
      this.setData({
        isLoading: true
      })
    }
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    const { passThroughParams } = this.data;
    let requestStartTime = Date.now();
    let query = {
      "currentPage": this.data.currentPage || 1,
      "channelId": this.data.channelId,
      "tagId": this.data.tagId || '',
      "channelBusiness": this.data.channelBusiness,
      "index": this.data.currentIndex,
      "ref": "",
      'count': this.data.count,
      "ctp": "channel",
      passThroughParams,
      pageSource: this.data.recommendObj.pageSource,
      refPageSource: this.data.recommendObj.refPageSource,
      ref_par: {
        traceId: this.data.recommendObj.preTraceId || "",
        userAction: this.data.recommendObj.preUserAction || ""
      }
    }
    request({
      functionId: FNIDS.getChannelSkuList.functionId,
      appVersion: FNIDS.getChannelSkuList.appVersion,
      method: 'post',
      body: query,
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      isForbiddenDialog: true,
      isNeedDealError: true,
      content: {
        platform: 3
      },
      preObj: this.data.recommendObj
    }).then((res) => {
      // console.log('res',res)
      let requestEndTime = Date.now();
      console.log('getChannelSkuListtime ----->', requestEndTime - requestStartTime)
      wx.hideLoading()
      // 请求时间
      requestCostTime = Date.now() - requestCostTime;
      if (res && res.data && res.data.result) {
        if (!res.data.result.data || res.data.result.data.length == 0) { // 请求数据为空
          if (this.data.currentPage == 1) {
            this.setData({
              list_no_data: true,
              defaultType: 1,
              defaultObj: {
                imgType: res.data && res.data.imgType,
                title: res.data && res.data.title,
                msg: res.data && res.data.msg,
                errorCode: res.data && res.data.errorCode,
                btnArr: res.data && res.data.btnArr,
              },
            });
          } else {
            wx.showToast({
              title: '没有更多数据了',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          if (this.data.currentPage == 1) {
            this.setData({
              skuListType: res.data.result.data && res.data.result.data.length > 0 && res.data.result.data[0].type
            })
          }
          this.setData({
            list_no_data: false
          })
        }
      }
      if (res && res.data && res.data.code == 0) {
        this.setData({
          skuList: res.data.result && res.data.result.data,
          lastPage: res.data.result && res.data.result.lastPage,
          hintMsg: res.data.result && res.data.result.hintMsg,
          skuListTraceId: this.data.currentPage == 1 ? res.data.traceId : this.data.skuListTraceId,
          count: res.data.result.data.length + this.data.count
        })
      } else {
        this.setData({
          errMsg: res.data.msg || '暂无商品'
        })
      }
      this.setData({
        isLoading: false,
        isRefersh: false
      })
    }).catch(err => {
      // 过滤暂无商品的监控
      if (err.data && err.data.code != 100013) {
        wx.reportMonitor(15, 20);
        addFilterMsg('channelFeedCatch')
        addFilterMsg(FNIDS.getChannelSkuList.functionId)
        addFilterMsg(deviceid_pdj_jd)
        addFilterMsg(PDJ_H5_PIN)
        warn(query)
        warn(err.data)
      }
      if (this.data.currentPage == 1) {
        this.setData({
          list_no_data: true,
          defaultType: 1,
          defaultObj: {
            imgType: err.data && err.data.imgType,
            title: err.data && err.data.title,
            msg: err.data && err.data.msg,
            errorCode: err.data && err.data.errorCode,
            btnArr: err.data && err.data.btnArr,
          },
        });
      }
      this.setData({
        isLoading: false,
        isRefersh: false,
        errMsg: err.data && err.data.msg || "出错啦～"
      })
      wx.hideLoading()
    })
  },
  handleScroll () {
    // 通过wxs手势来判断是否是首屏
    if (app.globalData.isFirstPageFlag) {
      app.globalData.isFirstPageFlag = false;
    }
    if (this.data.config.sideFloor) { // 如果侧边栏存在
      this.setData({
        siderHide: true
      })
      // 滑动停止需要展示侧边栏
      this.data.sideBarTimer && clearTimeout(this.data.sideBarTimer);
      this.data.sideBarTimer = null
      this.data.sideBarTimer = setTimeout(() => {
        this.setData({
          siderHide: false
        })
      }, 500)
    }

  },
  handleScrollToBottom () {
    // console.log('滚动到底部')
    // 到店频道页禁止请求feed
    if (this.data.channelType == 22) {
      return
    }
    if (!this.data.isLoading && this.data.tagId && !this.data.lastPage) {
      wx.showLoading({
        title: '数据加载中...',
        mask: true
      })
      this.setData({
        currentPage: this.data.currentPage + 1,
        isRefersh: false
      }, () => {
        this.getChannelSkuList()
      })
    }
  },
  // 点击一级导航
  handleFirstNavClick (e) {
    // console.log('e',e)
    if (e.detail && e.detail.userAction) {
      console.log(e.detail)
    } else {
      // 吸顶埋点上报
      clickBuriedV2_({
        click_id: "click_ball",
        click_par: {
          state: '1',
          traceId: this.data.traceId,
          userAction: e.item.userAction
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      })
    }

    let item = {};
    if (e.detail) { // 不是横滑动的一级分类导航
      item = e.detail
    } else { // 横滑的一级分类导航
      item = e.item
      let { cateBallConfig: { categoryList = [] } = {} } = this.data.config
      this.setData({
        scrollTop: categoryList.length >= 8 ? 102 : 16
      }, () => {
        setTimeout(() => {
          this.setData({
            scrollTop: this.data.scrollTop + 1
          })
        }, 1000)
      })
    }
    this.setData({
      currentIndex: Number(item.index),
      lastPage: false,
      categoryBallName: item.title
    })
    if (!this.data.isLoading) {
      this.setData({
        secondNavArr: item.recommendList || [],
        tagId: item.tagId || item.recommendList[0].tagId,
        currentPage: 1,
        dataId: item.dataId,
        isRefersh: true
      }, () => {
        if (this.data.channelType == 22) {
          this.getChannelDetail()
        } else {
          this.getChannelSkuList()
        }
        if (e.item) { // 横向滑动一级分类导航
          this.setData({
            horiCurrentIndex: 0
          })
        }
      })
    }
    this.data.categoryList.map((item02, index) => { // 寻找横向滚动当前选中项
      if (item02.index == item.index) {
        this.setData({
          sIndex: index
        })
      }
    })
  },
  // 点击二级导航
  handleSecondNav (e) {
    // console.log('e',e)
    let tagId = '';
    let index = '';
    if (e.detail) { // 非横滑动时候的二级导航
      tagId = e.detail.tagId
      index = e.detail.index
    } else {
      tagId = e.id;
      index = e.index;
      let { cateBallConfig: { categoryList = [] } = {} } = this.data.config
      this.setData({
        scrollTop: categoryList.length >= 8 ? 98 : 16
      }, () => {
        setTimeout(() => {
          this.setData({
            scrollTop: this.data.scrollTop + 1
          })
        }, 1000)
      })
    }
    if (!this.data.isLoading && tagId != this.data.tagId) {
      this.setData({
        tagId: tagId,
        currentPage: 1,
        isRefersh: true,
        horiCurrentIndex: index,
        lastPage: false
      }, () => {
        this.getChannelSkuList()
      })
    }
  },
  // 返回
  hanldeGoBack () {
    let result = this.selectComponent('#leave').handleShowPop();
    if (!result) {
      wx.navigateBack({})
    }
  },
  // 回到顶部
  handleBackTop () {
    this.setData({
      scrollTop: 0,
      isShowBackTop: true,
      isBeltShow: this.data.beltType == 2 ? false : true
    }, () => {
      setTimeout(() => {
        this.setData({
          scrollTop: this.data.scrollTop + 1
        })
      }, 500)
    })
    clickBuriedV2_({
      click_id: "clickReturnTop",
      click_par: {
        channelId: this.data.channelId
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName
    })
  },
  backTopScroll () {
    // 回到顶部曝光埋点
    if (this.data.isBackTopPvShow) {
      this.setData({
        isBackTopPvShow: false
      }, () => {
        clickBuriedV2_({
          click_id: "showReturnTop",
          click_par: {
            channelId: this.data.channelId
          },
          pageId: this.data.recommendObj.pageIdFirstPage || "",
          currentPageName: this.data.recommendObj.currentPageName,
          prePageName: this.data.recommendObj.prePageName
        })
      })
    }
    if (!this.data.pageMoving) {
      this.setData({
        pageMoving: true
      })
    }
    this.hiddenBackTop()
  },
  hiddenBackTop () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      this.setData({
        pageMoving: false
      })
    }, 250)
  },
  // 回传腰带交互类型
  beltBacktop (e) {
    this.setData({
      beltType: e.detail.beltType
    })
    if (e.detail.beltType == 1) { // type为1，腰带常在
      this.setData({
        isBeltShow: true
      })
    }
  },
  // 滑动页面
  handleScrolling (e) {
    // 有变化再赋值
    if (!e.isShow != this.data.isShowBackTop) {
      // 是否显示回到顶部
      this.setData({
        isShowBackTop: !e.isShow
      }, () => {
        // 回到顶部出现，传入腰带组件
        if (this.data.beltType == 2) {
          if (this.data.isShowBackTop) { // 隐藏回到顶部
            this.setData({
              isBeltShow: false
            })
          } else { // 显示回到顶部
            this.setData({
              isBeltShow: true
            })
          }
        }
      })
    }
    if (e.scrollTop > 600) {
      this.backTopScroll()
    } else {
      this.hiddenBackTop()
    }
    if (!this.data.fading) {
      this.setData({
        fading: true
      })
    }
    // 滑动停止需要展示侧边栏
    this.data.fadeSrcoll && clearTimeout(this.data.fadeSrcoll);
    this.data.fadeSrcoll = setTimeout(() => {
      this.setData({
        fading: false
      })
    }, 500)
  },
  handleArrowShow (e) {
    if (e.isShowArrow != this.data.isShowArrow) {
      this.setData({
        isShowArrow: e.isShowArrow
      })
    }
  },
  handleArrow (e) {
    this.setData({
      arrowDirection: e.arrowDirection
    })
  },
  // 监听优惠券楼层事件
  onCouponEvent (e) {
    let { type, data } = e.detail || {};
    if (type === 'coupons') { // 优惠券弹层
      this.setData({
        couponList: data
      })
    }
  },
  // 医药点击
  handleFooterJump (e) {
    djBus.emit('mask_drug_pop', this.data.recommendObj)
    this.selectComponent('#drug').handleFooterJump(e.detail)
  },
  /**
   * 埋点方法
   * */
  pvFunc (back) {
    this.buried.channelId = this.data.channelId
    pvBuriedV2_({
      page_par: {
        channelId: this.data.channelId,
        ref_par: {
          traceId: this.data.recommendObj.preTraceId || "",
          userAction: this.data.recommendObj.preUserAction || ""
        }
      },
      pageId: this.data.recommendObj.pageIdFirstPage || "",
      currentPageName: this.data.recommendObj.currentPageName,
      prePageName: this.data.recommendObj.prePageName,
      'isBack': back || ''
    })
  },
  floorShow (type) {
    this.buried.floorType = type;
  }
})