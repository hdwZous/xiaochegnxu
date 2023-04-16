// import { djCmsJump } from '../../../../common/util/agreementV2'
// 楼层号
let idx = 0;
let subidx = 0
// 优惠券号
let index = 0;
let app = getApp();
import djBus from '../../../../common/util/djBus'
Component({
  lazyObj: {
    epSelector: '.floor_wrap .activity_comp_ep'
  },
  options: {
    addGlobalClass: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    lastPage: {
      type: Boolean,
      value: false
    },
    pageConfig: {
      type: Object,
      value: {}
    },
    activityBtNavigaInfo: {
      type: Object,
      value: {}
    },
    pageFrom: {
      type: String,
      value: ''
    },
    longitude: {
      type: String,
      value: ''
    },
    latitude: {
      type: String,
      value: ''
    },
    upDateGoods: {
      type: Object,
      value: null
    },
    pageMoving: {
      type: Boolean,
      value: false
    },
    flatCarInfo: {
      type: Object,
      value: null
    },
    biPageName: {
      type: String,
      value:''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    }
  },

  lifetimes: {
    attached: function () {
      var pages = getCurrentPages()    //获取加载的页面
      var currentPage = pages[pages.length-1]    //获取当前页面的对象
      var url = currentPage.route
      this.setData({
        pageName: url.includes('store') ? 'store' : 'active'
      })
      if (this.data.pageConfig && this.data.pageConfig.storeInfo && this.data.pageConfig.storeInfo.orgCode) {
        this.setData({
          refreshMiniCartData: !this.data.refreshMiniCartData
        });
      }
    },
    detached: function () {
      this.data.refQuery && this.data.refQuery.disconnect()
      this.data.relative && this.data.relative.disconnect()
    }
  },

  pageLifetimes: {
    hide() {
      let flatPageHide = this.data.flatPageHide == '' || this.data.flatPageHide == 'false' ? 'true' : 'false'
      this.setData({ flatList: [], flatPageHide })
    }
  },

  observers: {
    list(news) {
      if (news && news.length) {
        // 监听tab栏
        let bloon = -1
        let findArr = news.map(item => {
          return item && item.length && item.findIndex(subItem => {
            return subItem.floorStyle == 'navigation'
          })
        })
        findArr.map((item, index) => {
          if (item != -1) {
            bloon = item + index
          }
        })
        if (bloon != -1 && !this.data.yetObser) {
          let top, that = this, seting = false
          let refQuery = this.createIntersectionObserver()
          let relative = this.createIntersectionObserver({ observeAll: true })
          /* tabTop是导航吸顶位置 存在多种情况: 
              1.没有门店头 0;
              3.有门店头 60
          */
          let tabTop = that.data.pageConfig.storeInfo ? 59 : -1
          this.setData({ yetObser: true, tabTop, refQuery, relative, tabIndex: bloon })
          if (bloon) {
            let query = wx.createSelectorQuery().in(this)
            query.select('.tab-wrap').boundingClientRect(function (res) {
              let initHeight = res && res.height ? res.height : 42
              top = that.data.pageConfig.storeInfo ? initHeight + 60 : initHeight
              refQuery.relativeToViewport({ top: -top }).observe('.tab-wrap', function (res) {
                // console.log(res, '.tab-wrap')
                if (res.intersectionRatio == 0 && res.intersectionRect.top == 0 && res.boundingClientRect.top < 100) {
                  //滑到顶部
                  //res.boundingClientRect.top  iphone相交时位置计算不准且会在瞬间触发多次
                  //intersectionRect.top 吸顶时相交区域的上边界坐标一直为0
                  if (!seting && !that.data.tabFixd) {
                    seting = true
                    that.setData({ tabFixd: true }, () => seting = false)
                  }
                } else if (res.intersectionRatio > 0 && res.intersectionRect.top == top) {
                  //正常慢速倒滑离开顶部
                  if (!seting && that.data.tabFixd) {
                    seting = true
                    that.setData({ tabFixd: false }, () => seting = false)
                  }
                } else if (res.intersectionRatio == 1 && res.intersectionRect.top == res.boundingClientRect.top) {
                  //下发tab恰好在第一屏，点击滑动到顶部或快速倒滑之后
                  if (!seting && that.data.tabFixd) {
                    seting = true
                    that.setData({ tabFixd: false }, () => seting = false)
                  }
                } else if (res.intersectionRatio == 0 && res.intersectionRect.top == 0 && res.boundingClientRect.top > 100) {
                  //猛烈滑动，一瞬间导航划出当前页面区域
                  that.data.tabFixd && that.setData({ tabFixd: false })
                } else {
                  // 存在一种情况，点击滑到顶部，由于速度过快，完全没有监听到任何信息
                  that.data.tabFixd && that.setData({ tabFixd: false })
                }
              })

            }).exec()
          } else {
            // 假如tabs栏是一个楼层
            this.setData({ tabFixd: true })
          }
          // relative 判断置顶后的tab相交情况
          relative.relativeTo('.tab-wrap', { bottom: 0 }).observe('.floor_wrap >>>.floor_relative', function (res) {
            if (res.intersectionRatio >= 0 && res.boundingClientRect.top > 0 && res.boundingClientRect.top > res.relativeRect.top) {
              let relativeIds = res.dataset.index
              let relativeDirection = res.intersectionRatio > 0 ? 1 : 0
              that.setData({ relativeIds, relativeDirection })
            }
          })
        }
      }
    },
    upDateGoods(news) {
      if (news) {
        let { type, data } = news
        if (type === 'min' || type === 'add' || type === 'clear') {
          this.setData({
            refreshMiniCartData: !this.data.refreshMiniCartData,
          });
          if (type === 'add') {
            this.setData({ catAnimation: !this.data.catAnimation })
          }
          if (this.data.pageFrom == 'home' && type === 'add') {
            this.upDateFlat(data)
          }
        } else if (type === 'showModel') { // 展示spu选择器
          // let spuData = {
          //   storeId: data.storeId,
          //   orgCode: data.orgCode,
          //   spuId: data.spuId,
          //   skuId: data.skuId,
          //   transmitData: data.transmitData
          // }
          let spuData = data;
          this.toggleSpuSelector(spuData, true);
          return
        }
      }
    },
    activityBtNavigaInfo(news) {
      if (news && news.data && news.data.length) {
        this.setData({
          hasFooterTab: true
        })
      }
    },
    flatCarInfo(news) {
      if (news && news.allStoreInfo && news.allStoreInfo.length) {
        // 多门店活动页门店列表总和
        this.setData({
          storeList: news.allStoreInfo,
          userAction: news.userAction
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 红包弹层信息
    vip: '',
    // 红包弹层券信息
    coupon: {},
    // 券红包列表
    couponList: [],
    // 分享弹层
    showShare: false,
    //tab置顶距离
    tabTop: 0,
    tabFixd: false,
    tabIndex: 0,
    yetObser: false,
    // 滑动时与tab相交的index
    relativeIds: '',
    // 0逆向滑动错交;1正向互动相交
    relativeDirection: 0,
    refreshMiniCartData: false,
    catAnimation: true,
    // spu选择器
    toggle: false,
    // spu选择器参数
    spuData: {
      storeId: '',
      orgCode: '',
      spuId: '',
      skuId: ''
    },
    isIpx: app.globalData.isIpx,
    refQuery: '',
    relative: '',
    // 解决z-index堆叠的问题，tab导航栏与购物车的层级在tab展开未展开时有冲突
    tabs_index: 10,
    // 多门店活动页所有商家列表
    storeList: [],
    userAction:'', //多门店跳转pv使用
    // 扁平化加车门店列表
    flatList: [],
    hasFooterTab: false,
    moveHide: false,
    flatPageHide: '',
    pageName: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击分享背景
    clickShareBg() {
      this.setData({
        showShare: false
      })
    },
    // 更新父组件源数据
    onRefreshActivityHomeData(data) {
      this.triggerEvent('onRefreshActivityHomeData', {
        data: data
      })
    },
    // 监听优惠券楼层事件
    onCouponEvent(e) {
      let { type, data } = e.detail || {};
      index = data.index;
      idx = data.idx;
      subidx = data.subidx;
      if (type === 'coupons') { // 优惠券弹层
        // console.log('onCouponEvent', data);
        this.onRefreshActivityHomeData(data)
        this.setData({
          couponList: data
        })
      } else if (type === 'helpCoupon') { //助力券
        this.triggerEvent('onShareMsg', {
          data: data
        })
        this.setData({
          showShare: true
        })
      } else if (type === 'vipCoupon') { // vip红包
        this.setData({
          vip: data.vip,
          coupon: data.coupon
        })
      }
    },
    // 监听vip兑换楼层事件
    onConvertCouponEvent(e) {
      let { markState, } = e.detail.data || {};
      let key = `list[${idx}][${subidx}].data[${index}].status`;
      this.setData({
        [key]: markState
      })
    },
    // 展示隐藏spu选择器、兼容爆品spu
    toggleSpuSelector(spuData, isDone) {
      let data
      if (isDone) {
        data = spuData
      } else {
        data = spuData.detail
      }
      this.setData({
        spuData: data
      }, () => {
        djBus.emit('mask_spu',this.data.recommendObj)
        this.setData({
          toggle: true
        })
      });
    },
    onSpuSelectorEvent(e) {
      let {type, data} = e.detail || {}
      if (type == 'closeSpu') {
        this.setData({
          toggle: false
        })
      }
    },
    modifyZ(e) {
      let { z_index } = e.detail
      this.setData({
        tabs_index: z_index
      })
    },
    upDateFlat(data) {
      let flatList = this.data.flatList
      let { storeId } = data
      let storeInfo = this.data.storeList.find(item => {
        return item.storeId == storeId
      })
      let exit = this.data.flatList.find(item => {
        return item.storeId == storeInfo.storeId
      })
      if (storeInfo && !exit) {
        flatList.push(storeInfo)
        this.setData({ flatList })
      }
    },
    handlemove() {
      if (!this.data.moveHide && this.data.flatList.length) {
        this.setData({
          moveHide: true
        })
      }
    },
    handleend() {
      if (this.data.moveHide && this.data.flatList.length) {
        this.setData({ moveHide: false })
      }
    }
  }
})
