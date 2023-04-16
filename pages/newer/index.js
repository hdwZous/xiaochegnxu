import {
    request,
    FNIDS,
} from '../../common/util/api'
import { isLogin } from '../../common/util/loginUtil'
import mp from '../../common/util/wxapi'
import { Lazy } from "../../common/util/lazyLoad"
import { pvBuriedV2_ } from "../../common/util/BI";
let app = getApp()
let flag = false
let LazyLoad = null
Page({
  buried: {
    userAction: "",
    isLogin: isLogin(),
    
    
    
  },
  data: {
    showDefault: false, // 默认页-是否展示  
    defaultType: 0, // 默认页-类型      
    defaultTips: "", // 默认页-提示  
    defaultBtnText: "", // 默认页-按钮

    newData: {}, // 页面数据
    show: false, // 是否显示新人数据
    abSupportFlag: '', // abc实验数据标识，old代表a/b， new代表c
    currentPage: 1, // 商品列表分页
    nextPageDataList: [],
    animation: true,
    imgLazyLoad: {},
    
  },
  onLoad: function (options) {
      this.loadPage()
  },
  onReady() {
    LazyLoad = new Lazy(this, '.lazy-load-case >>> .img')
  },
  onShow: function () {
    if(flag) {
      this.loadPage()
      this.setData({
        animation: true,
        currentPage: 1
      })
    }
    
  },
  // pv埋点
  pvFunc(back) {
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        isLogin: isLogin(),
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || "",
    });
  },
  onHide() {
    flag = true
    this.setData({ animation: false })
  },
  onUnload() {
    LazyLoad = null
  },
  onReachBottom: function () {
    this.loadMore(this.data.currentPage+1)
  },
  onShareAppMessage: function () {
    return {
      title: '京东到家',
      path: '/pages/home/home'
    }
  },
  // 加载页面
  loadPage() {
    try {
      let location = wx.getStorageSync('address_info');
      let latitude = location.latitude || '';
      let longitude = location.longitude || '';
      let cityId = location.cityId || '';
      mp.loading_cover();
      request({
        ...FNIDS.newerResource,
        isNeedDealError: true,
        body: {
          lgt: longitude,
          lat: latitude,
          cityId: cityId,
          currentPage: 1,
          // dataSize: 10,
          sceneId: 103,
        }
      }).then(res => {
        mp.hideLoading();
        let code = res.data.code;
        if (code === '0') { // 成功
          let result = res.data.result || ''
          if (result) { // 有数据
            let configList = result.configList || []
            configList.forEach(item => {
              if (item.abTest) {
                app.globalData.testtag.push(item.abTest)
              }
            })
            this.setData({
              newData: result,
              show: configList.length > 1 ? true : false,
              showDefault: false,
              abSupportFlag: result.abSupportFlag
            })
            this.initLazyOrExposure()
          } else { // 无数据
            this.setData({
              show: false,
              // 默认页-是否展示
              showDefault: true,
              // 默认页-类型
              defaultType: 2,
              // 默认页-提示
              defaultTips: '无数据，请稍后再试!',
              // 默认页-按钮
              defaultBtnText: "重新加载",
              // 默认页-默认图
              defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png"
            })
          }
        } else if (code === '1') { // 经度或纬度不能为空
          this.setData({
            show: false,
            // 默认页-是否展示
            showDefault: true,
            // 默认页-类型
            defaultType: 1,
            // 默认页-提示
            defaultTips: res.msg || '未获取到地理位置！',
            // 默认页-按钮
            defaultBtnText: "授权地理位置",
            // 默认页-默认图
            defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png"
          })
        } else if (code === '2') { // 当前城市未开通服务[100001]
          this.setData({
            show: false,
            // 默认页-是否展示
            showDefault: true,
            // 默认页-类型
            defaultType: 3,
            // 默认页-提示
            defaultTips: res.msg || '当前城市未开通！',
            // 默认页-默认图
            defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png"
          })
        } else if (code === '-1') {
          mp.dialog({
            title: '活动仅限新用户参与~',
            showCancel: true,
            confirmText: '首页逛逛'
          }).then(() => {
            this.goBack()
          }).catch(() => {
            this.goBack()
          })
        } else { // 系统繁忙，请稍后再试
          this.setData({
            show: false,
            // 默认页-是否展示
            showDefault: true,
            // 默认页-类型
            defaultType: 2,
            // 默认页-提示
            defaultTips: res.msg || '服务异常！请稍后再试',
            // 默认页-按钮
            defaultBtnText: "重新加载",
            // 默认页-默认图
            defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
          })
        }
      }).catch(err => {
        this.setData({
          show: false,
          // 默认页-是否展示
          showDefault: true,
          // 默认页-类型
          defaultType: 2,
          // 默认页-提示
          defaultTips: err.msg || '服务异常！请稍后再试',
          // 默认页-按钮
          defaultBtnText: "重新加载",
          // 默认页-默认图
          defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
        })
      })
    } catch (e) {
      mp.hideLoading();
      this.setData({
        show: false,
        // 默认页-是否展示
        showDefault: true,
        // 默认页-类型
        defaultType: 2,
        // 默认页-提示
        defaultTips: "哎呀出错啦！请稍后再试",
        // 默认页-按钮
        defaultBtnText: "重新加载",
        // 默认页-默认图
        defaultSrc: ""
      })
    }
  },

  // 分页门店列表数据
  loadMore(currentPage) {
    let location = wx.getStorageSync('address_info');
    let latitude = location.latitude || '';
    let longitude = location.longitude || '';
    let cityId = location.cityId || '';
    mp.loading_cover();
    request({
      ...FNIDS.productOrStoreList,
      isNeedDealError: true,
      body: {
        lgt: longitude,
        lat: latitude,
        cityId: cityId,
        currentPage: currentPage,
        dataSize: this.data.abSupportFlag == 'old' ? 10 : 2,
        sceneId: 103,
      }
    }).then(res => {
      mp.hideLoading();
      let { code, msg, result = [] } = res.data
      if (code == '0' && result.length > 0) {
        this.setData({
          nextPageDataList: result,
          currentPage: this.data.currentPage + 1
        })
        this.initLazyOrExposure()
      } else {
        mp.toast({
          title: msg || '加载完啦，去首页查看更多！'
        })
      }
    }).catch(err => {
      mp.hideLoading();
      mp.toast({
        title: err.msg || '加载完啦，去首页查看更多！'
      })
    })
  },

  // 监听默认事件
  defaultBtnEvent(e) {
    let type = e.detail.type;
    if (type === 1) { // 授权地理位置，跳转至首页授权。
      let recommendObj = this.data.recommendObj || {};
      wx.switchTab({
        url: '/pages/home/home',
        preObj: recommendObj
      })
    } else if (type === 2) { // 刷新页面
      this.loadPage()
    }
  },

  goBack() { // 回到首页
    app.globalData.refreshHomeFlag = true
    wx.navigateBack()
  },
  initLazyOrExposure() {
   
  },
  getData() {
    this.loadPage()
  }
})
