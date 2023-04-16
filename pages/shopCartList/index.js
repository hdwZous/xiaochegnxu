/* eslint-disable camelcase */
import mp from "../../common/util/wxapi";
import { request, FNIDS } from "../../common/util/api";
import { _getSingleCart } from '../../common/util/carService'
import { pvBuriedV2_, clickBuriedV2_ } from "../../common/util/BI";
import { isLogin } from '../../common/util/loginUtil';
import { djCmsJump } from "../../common/util/agreementV2";
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 首页请求数据是否加载完毕
    resourceRequestFinished: false,
    // 触发触底事件
    pageReachBottom: 0,
    // 分页
    pageSize: 5,
    // 单个门店默认显示商品数，超过部分折叠处理
    showGoods: 5,
    // 当前位置门店列表数据
    currentCartsList: [],
    // 当前位置门店id列表
    currentStoreId: [],
    // 其他位置门店列表数据
    otherCartsList: [],
    // 其他位置门店id列表
    otherStoreId: [],
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    isLogin: false,
    // 我的全部购物车按钮 null 初始状态; true 显示; false 点击后消失状态
    allBtFlag: null,
    feedsShow: false,
    feedFlag: true,
    // 网络异常
    pageError: {
      type: 0,
      showError: false,
      obj: {}
    },
    noCartError: {
      type: 1,
      obj: {
        btnArr: [{
          btnName: '去逛逛',
          type: 2,
          to: 'home'
        }],
        imgType: 7,
        msg: '哦莫,那么多好物都没有你想要的吗?',
        title: '购物车空空如也'
      }
    },
    pageHeight: 0,
    feedScrollFlag: true,
    traceId: '',
    vfloor: null,
    openVPlusState: 0,
    shopCarRefresh: '',
    isShowPopUp: false,
    popupWindow: null,
    isShowAuthoryDialog: false
  },

  // 自定义数据
  scopeData: {
    tempList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getAllcarts()
    let res = wx.getSystemInfoSync();
    this.windowHeight = res.windowHeight;
  },

  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.refreshHomeFlag || (this.data.vfloor && this.data.openVPlusState == 1)) {
      this.getAllcarts()
    }
    if (app.globalData.refreshFeedsShopid && app.globalData.refreshFeedsShopid.storeId) {
      let { storeId, orgCode } = app.globalData.refreshFeedsShopid
      this.getCartData(storeId, orgCode)
      app.globalData.refreshFeedsShopid = null
    }
    let date = new Date();
    let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
    if (this.data.shopCarRefresh && now != this.data.shopCarRefresh) {
      this.getAllcarts()
      this.data.shopCarRefresh = now
      console.log('是否刷新')
    }
    this.setData({
      isLogin: isLogin()
    })
  },
  pvFunc (back) {
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    pvBuriedV2_({
      pageId: pageIdFirstPage,
      currentPageName: currentPageName,
      prePageName: prePageName,
      isBack: back || ""
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  onUnload () { },

  onPullDownRefresh () {
    this.getAllcarts('pullDown')
      .then(() => {
        wx.stopPullDownRefresh()
      })
      .catch(() => {
        wx.stopPullDownRefresh()
      })
  },

  onReachBottom () {
    if (!this.data.feedsShow) {
      // 加载门店
      let requestCurrentId = []; let requestOtherId = []; let remainCurrentId = [];
      let remainOtherId = []; let allBtFlag = undefined; let feedsShow = undefined;
      let currentIdList = this.data.currentStoreId; let otherIdlist = this.data.otherStoreId;
      let pageSize = this.data.pageSize

      // 当前位置还有待加载门店
      if (currentIdList.length) {
        requestCurrentId = currentIdList.slice(0, pageSize)
        remainCurrentId = currentIdList.slice(pageSize)
        remainOtherId = otherIdlist
        if (remainCurrentId.length == 0) {
          // 当前位置所有门店将加载完毕
          if (remainOtherId.length) {
            allBtFlag = true
          }
          feedsShow = true
        }
        this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag, feedsShow)
      }

      // 当前位置无待加载门店，其他位置有待加载门店
      if (!currentIdList.length && otherIdlist.length) {
        requestOtherId = otherIdlist.slice(0, pageSize)
        remainOtherId = otherIdlist.slice(pageSize)
        if (remainOtherId.length == 0) {
          // 其他位置所有门店将加载完毕
          feedsShow = true
        }
        this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag, feedsShow)
      }
    }
  },

  /**
  * 页面滑动
  */
  onPageScroll (e) {
    let surplusScroll = this.data.pageHeight - (this.windowHeight + e.scrollTop)
    if (surplusScroll <= 50 && this.data.feedScrollFlag) {
      if (this.data.feedsShow) {
        // 加载feeds
        this.setData({
          pageReachBottom: ++this.data.pageReachBottom,
          feedScrollFlag: false
        })
      }
    }
    // if(this.data.pageHeight && )
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
  // 获取当前位置门店列表及其他位置门店列表
  getAllcarts (froms = '') {
    mp.loading_cover()
    return new Promise((resolve, reject) => {
      let { functionId = '', appVersion = '' } = FNIDS.queryallcarts
      let openVPlusState = this.data.openVPlusState
      let { recommendObj = {} } = this.data
      let { pageIdFirstPage = '', pageSource = '', refPageSource = '' } = this.data.recommendObj
      let body = {
        lat: app.globalData.addressInfo.latitude,
        lng: app.globalData.addressInfo.longitude,
        positionType: 2,
        fromSource: 5,
        cartType: 20,
        pageSource,
        refPageSource,
        openVPlusState
      }
      request({
        functionId,
        appVersion,
        body,
        isNeedDealError: true,
        pageId: pageIdFirstPage,
        preObj: recommendObj
      }).then(res => {
        mp.hideLoading()
        if (res.data.code == 0) {
          let result = res.data.result
          let pageSize = result.grabCouponEntrancePageSize || 5
          let showGoods = result.showGoodsNumPerStore || 5
          let feedFlag = result.feedFlag
          let { currentCartsList = [],
            currentStoreId = [],
            otherCartsList = [],
            otherStoreId = [],
            allBtFlag = null,
            feedsShow = false
          } = this.dealResutl(result, pageSize)
          let traceId = this.data.traceId && froms !== 'pullDown' ? this.data.traceId : res.data.traceId
          this.setData({
            pageSize,
            showGoods,
            feedFlag,
            currentCartsList,
            currentStoreId,
            otherCartsList,
            otherStoreId,
            feedsShow,
            allBtFlag,
            resourceRequestFinished: true,
            traceId,
            pullDownFlag: froms,
            vfloor: result.globalCartVPlusStyle || null,
            openVPlusState: 0
          })
          resolve(true)
        } else {
          this.setData({
            pageError: {
              type: 1,
              showError: true,
              obj: {
                btnArr: res.data.btnArr,
                imgType: res.data.imgType,
                msg: res.data.msg,
                title: res.data.title,
                errorCode: res.data.errorCode
              }
            }
          })
          resolve(true)
        }
      }).catch(() => {
        mp.hideLoading()
        this.setData({
          pageError: {
            type: 2,
            showError: true
          }
        })
        reject(false)
      })
      let date = new Date();
      let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      this.data.shopCarRefresh = now
    })
  },

  onDefaultBtnEvent (e) {
    let { type } = e.detail
    if (type == 1) {
      this.setData({
        pageError: {
          showError: false
        }
      })
      this.getAllcarts()
    }
  },


  dealResutl (result, pageSize) {
    let currentCartsList = []; let currentStoreId = []; let otherCartsList = []; let otherStoreId = [];
    let allBtFlag = null; let feedsShow = false; let otherFirst = []; let currentList = []; let otherList = []
    // 当前门店信息
    if (result.currentLocationCartsVo) {
      currentCartsList = result.currentLocationCartsVo.firstPageCartResults || []
      currentList = result.currentLocationCartsVo.storeIdList || []
      if (currentList.length && currentCartsList.length && currentList.length - pageSize >= 0) {
        currentStoreId = currentList.slice(pageSize)
      }
    }
    // 其他位置门店信息
    if (result.otherLocationCartsVo) {
      otherFirst = result.otherLocationCartsVo.firstPageCartResults || []
      otherList = result.otherLocationCartsVo.storeIdList || []
    }
    // 假如当前位置没有门店
    if (currentCartsList.length == 0) {
      if (otherFirst.length == 0) {
        // 假如其他位置也没有门店，加载feeds
        feedsShow = true
      } else {
        feedsShow = true
        // 其他位置门店信息 保留一个其他位置门店,其余折叠
        otherCartsList = otherFirst.slice(0, 1)
        this.scopeData.tempList = otherFirst.slice(1)
        otherStoreId = otherList.slice(otherFirst.length)
        if (this.scopeData.tempList.length) {
          // 只有其他位置门店的个数超过一个时，才展示查看全部按钮
          allBtFlag = true
        }
      }
    }
    // 假如当前位置门店少于5个
    if (currentCartsList.length > 0 && currentCartsList.length < pageSize) {
      if (otherFirst.length) {
        // 有其他位置门店时，才展示查看全部按钮
        allBtFlag = true
      }
      feedsShow = true
      // 其他位置门店信息
      otherCartsList = []
      this.scopeData.tempList = otherFirst
      otherStoreId = otherList.slice(otherFirst.length)
    }
    // 假如当前门店有5个
    if (currentCartsList.length == pageSize) {
      // 假如当前门店正好仅有5个
      if (currentStoreId.length == 0) {
        if (otherList.length) {
          // 有其他位置门店时，才展示查看全部按钮
          allBtFlag = true
        }
        feedsShow = true
      }
      // 其他位置门店信息
      otherCartsList = otherFirst
      otherStoreId = otherList
    }
    return {
      currentCartsList,
      currentStoreId,
      otherCartsList,
      otherStoreId,
      allBtFlag,
      feedsShow
    }
  },
  // 发生加减车等操作时，监控storeId，更新列表
  updateInfos (e) {
    let { storeId, shopType, subIndex, carResult } = e.detail
    let lists = (shopType == 'current' ? this.data.currentCartsList : shopType == 'other' ? this.data.otherCartsList : [])
    let setStr = (shopType == 'current' ? `currentCartsList[${subIndex}]` : shopType == 'other' ? `otherCartsList[${subIndex}]` : [])
    if (lists[subIndex].storeId == storeId) {
      this.setData({ [setStr]: carResult })
    }
  },
  // 购物车商品数量为0时，监控storeId，在列表中删除
  async noticeRemove (e) {
    let { storeId, shopType } = e.detail
    let pageSize = this.data.pageSize
    let list = []; let ids = 0; let idList = this.data.currentStoreId; let otherIdlist = this.data.otherStoreId
    if (shopType == 'current') {
      list = this.data.currentCartsList
      ids = list.findIndex(item => {
        return item.storeId == storeId
      })
      list.splice(ids, 1)
      if (list.length >= pageSize) {
        this.setData({
          currentCartsList: list
        })
      } else if (list.length > 0 && list.length < pageSize) {
        // 当前页面展示个数少于pagesize,需要补充新门店
        let allBtFlag = undefined; let feedsShow = undefined
        if (idList.length) {
          // 假如还有剩余需要加载门店
          let requestCurrentId = idList.slice(0, pageSize)
          let requestOtherId = []
          let remainCurrentId = idList.slice(pageSize)
          let remainOtherId = this.data.otherStoreId
          if (remainCurrentId.length == 0) {
            feedsShow = true
            if (remainOtherId.length) {
              allBtFlag = true
            }
          }
          this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag, feedsShow, list)
        } else {
          this.setData({
            currentCartsList: list
          })
        }
      } else if (list.length == 0) {
        // 当前位置已无门店
        if (this.scopeData.tempList.length) {
          // 此情况属于初始当前位置门店数1-4之间，才会有tempList存在
          let otherCartsList = this.scopeData.tempList.slice(0, 1)
          let currentCartsList = []
          this.scopeData.tempList.splice(0, 1)
          this.setData({ currentCartsList, otherCartsList })
          if (!this.scopeData.tempList.length && !otherIdlist.length) {
            this.setData({ allBtFlag: false })
          }
        } else {
          let requestCurrentId = []
          if (otherIdlist.length) {
            let requestOtherId = otherIdlist.slice(0, 1)
            let remainCurrentId = []
            let remainOtherId = otherIdlist.slice(1)
            if (remainOtherId.length == 0) {
              this.setData({ allBtFlag: false })
            }
            this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, undefined, undefined, [])
          } else {
            this.setData({
              currentCartsList: []
            })
          }
        }
      }
    } else if (shopType == 'other') {
      list = this.data.otherCartsList
      ids = list.findIndex(item => {
        return item.storeId == storeId
      })
      list.splice(ids, 1)
      if (!this.scopeData.tempList.length) {
        let requestCurrentId = []; let requestOtherId; let remainCurrentId = idList; let remainOtherId = []
        let feedsShow = undefined; let allBtFlag = undefined
        // 删除其他门店位置门店的入口有两种： 一种特殊的是在当前位置无门店时，且allBtFlag为true，即其他位置门店保留一个；
        // 另一种就是没有加载全部购物车的按钮
        if (!this.data.currentCartsList.length && this.data.allBtFlag == true) {
          requestOtherId = otherIdlist.slice(0, 1)
          remainOtherId = otherIdlist.slice(1)
          remainOtherId.length == 0 && (allBtFlag = false)
          this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag, feedsShow)
        } else {
          // 当其他门店id列表为0时，表示已全部加载完成，不需要请求接口
          // 当页面显示中的门店数量超过pageSize时，也不需要重新补充门店
          if (otherIdlist.length == 0 || list.length >= pageSize) {
            this.setData({
              otherCartsList: list
            })
          } else {
            requestOtherId = otherIdlist.slice(0, pageSize)
            remainOtherId = otherIdlist.slice(pageSize)
            if (remainOtherId.length == 0) {
              this.data.feedsShow == false && (feedsShow = true)
            }
            this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag, feedsShow)
          }
        }
      } else {
        // 假如有临时存储list，首先需要从temp中替补
        list.push(this.scopeData.tempList[0])
        this.scopeData.tempList.splice(0, 1)
        this.setData({
          otherCartsList: list
        })
        if (!this.scopeData.tempList.length) {
          this.setData({ allBtFlag: false })
        }
      }
    }
  },
  // 点击查看我的全部购物车按钮
  lookAllCart () {
    if (this.scopeData.tempList.length) {
      // 当前位置无门店时，其他位置门店只显示一个，此时会有临时存储list
      let lists = this.data.otherCartsList.concat(this.scopeData.tempList)
      this.scopeData.tempList = []
      this.setData({ otherCartsList: lists, allBtFlag: false })
      if (this.data.otherStoreId.length) this.setData({ feedsShow: false })
    } else {
      let requestCurrentId = []; let requestOtherId = []; let remainCurrentId = this.data.currentStoreId;
      let remainOtherId = []; let allBtFlag = false; let feedsShow = true; let otherIdlist = this.data.otherStoreId;
      let pageSize = this.data.pageSize
      if (otherIdlist.length <= pageSize) {
        requestOtherId = otherIdlist
        remainOtherId = []
        this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag)
      } else {
        feedsShow = false
        requestOtherId = otherIdlist.slice(0, pageSize)
        remainOtherId = otherIdlist.slice(pageSize)
        this.getMulticarts(requestCurrentId, requestOtherId, remainCurrentId, remainOtherId, allBtFlag, feedsShow)
      }
    }
    clickBuriedV2_({
      click_id: 'unfoldStore',
      click_par: {
        status: 1
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },
  // 根据 定位各个位置的门店ID 批量查询门店购物车信息
  async getMulticarts (currentId, otherId, recurrentId, reotherId, allBtFlag = undefined, feedsShow = undefined, currentCar = this.data.currentCartsList, otherCar = this.data.otherCartsList) {
    mp.loading_cover()
    return new Promise(() => {
      let { functionId = '', appVersion = '' } = FNIDS.queryMultiCartInfo
      let { recommendObj = {} } = this.data
      let { pageIdFirstPage = '' } = this.data.recommendObj
      let multiStoreQueryParam = {
        currentLocationStoreIdList: currentId,
        otherLocationStoreIdList: otherId
      }
      let body = {
        lat: app.globalData.addressInfo.latitude,
        lng: app.globalData.addressInfo.longitude,
        multiStoreQueryParam,
        positionType: 2,
        fromSource: 5,
        cartType: 20,
        pageSource: 'shopcar',
        refPageSource: ''
      }
      request({
        functionId,
        appVersion,
        body,
        pageId: pageIdFirstPage,
        preObj: recommendObj
      }).then(res => {
        mp.hideLoading()
        if (res.data.code == 0) {
          let result = res.data.result
          let currentResult = result.currentLocationStoreCartResults
          let otherResult = result.otherLocationStoreCartResults
          let current = currentCar.concat(currentResult)
          let other = otherCar.concat(otherResult)
          this.setData({
            currentCartsList: current,
            otherCartsList: other,
            currentStoreId: recurrentId,
            otherStoreId: reotherId
          })
          if (allBtFlag !== undefined) {
            this.setData({ allBtFlag })
          }
          if (feedsShow !== undefined) {
            this.setData({ feedsShow })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2500
          })
        }
      }).catch(err => {
        mp.hideLoading()
        wx.showToast({
          title: err.data && err.data.msg || '',
          icon: 'none',
          duration: 2500
        })
      })
    })
  },
  // 全局购物车点击feeds跳转门店 记录storeId
  feedsShopId (e) {
    let { storeId = '', orgCode = '' } = e.detail
    app.globalData.refreshFeedsShopid = { storeId, orgCode }
  },
  // 获取购物车数据
  getCartData (storeId, orgCode) {
    let { recommendObj: { pageSource = '', refPageSource = '' } = {} } = this.data
    let params = {
      lat: app.globalData.addressInfo.latitude || '',
      lng: app.globalData.addressInfo.longitude || '',
      orgCode: orgCode,
      storeId: storeId,
      pageSource,
      refPageSource,
      cartType: 20
    }
    let pageId = this.data.recommendObj.pageIdFirstPage || ''
    _getSingleCart(params, pageId)
      .then(res => {
        if (res.data.code == 0 && res.data.result) {
          this.dealFeedsRefresh(res.data.result)
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
      .catch(err => {
        wx.showToast({
          title: err.data.msg,
          icon: 'none'
        })
      })
  },
  // 解析feeds刷新门店结果
  dealFeedsRefresh (result) {
    if (result.itemList) {
      let currentCartsList = this.data.currentCartsList; let currentStoreId = this.data.currentStoreId;
      let otherCartsList = this.data.otherCartsList
      // 当前位置无门店
      if (currentCartsList.length + currentStoreId.length == 0) {
        if (this.scopeData.tempList.length) {
          // 表示其他位置门店数>1,此时当前位置有门店之后需要隐藏之前显示出来的其他位置门店
          this.scopeData.tempList.unshift(otherCartsList[0])
          otherCartsList.splice(0, 1)
          currentCartsList.push(result)
        } else {
          // 其他位置没有门店或仅有一个
          currentCartsList.push(result)
        }
      } else {
        let cartIds = currentCartsList.findIndex(item => {
          return item.storeId == result.storeId
        })
        // 首先查找storeId是不是在当前页面显示的门店列表中，假如是直接替换
        // 如果不在当前页面显示的列表中，则还需要在剩余的门店列表中查找是否存在，假如存在，则需要在剩余的门店列表中删除
        // 假如也不在剩余的门店列表中则直接push
        if (cartIds != -1) {
          currentCartsList[cartIds] = result
        } else {
          let remainIds = currentStoreId.findIndex(item => {
            return item == result.storeId
          })
          if (remainIds != -1) {
            currentCartsList.push(result)
            currentStoreId.splice(cartIds, 1)
          } else {
            currentCartsList.push(result)
          }
        }
      }
      this.setData({
        currentCartsList,
        currentStoreId,
        otherCartsList
      })
    }
  },

  onPageHeight (e) {
    this.setData({
      pageHeight: e.detail.height,
      feedScrollFlag: e.detail.flag
    })
  },
  clickCancel () {
    this.setData({
      isShowAuthoryDialog: false
    });
  },
  goVplus (e) {
    let { to = '', params = null } = e.currentTarget.dataset
    let { recommendObj = null } = this.data
    if (to) {
      djCmsJump({
        to,
        params,
        preObj: recommendObj
      })
      this.setData({
        openVPlusState: 1
      })
    }
  },
  showPopUp (e) {
    const { popupWindow } = e.detail
    this.setData({
      isShowAuthoryDialog: true,
      popupWindow: popupWindow
    });
  }
});
