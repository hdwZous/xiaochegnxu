import mp from '../../common/util/wxapi'
import { request, FNIDS } from "../../common/util/api"
import util from "../../common/util/util"
import { clickBuriedV2_ ,pvBuriedV2_} from "../../common/util/BI";
import { observeProxy, setProxy } from '../../common/util/rewrite'
const app = getApp()

Page({
    // 埋点
    buried: {
        spaceNo : '',
        tabName: '',
        isLayer: '0',
        state: null,
        userAction: '',
        storeId: '',
        skuId: '',
        skuCnt: ''
    },
    exposureObj: {
      selector: '.seckill >>> .seckill_exposure'
    },
    /**
     * 页面的初始数据
     */
    data: {
        capsule: {},
        // 自定义导航栏配置图片
        titlePicUrl: '',
        // 置顶秒杀商品楼层商品
        banner: [],
        // 商品列表数据
        lists: [],
        // tab列表信息
        tabInfo: {},
        // 页面滑动距离
        scrollTop: 0,
        spaceNo: '',
        // 网络异常
        netError: {
            pageError: {
              type: 0,
              btnText: '',
              tips: ''
            },
            listError: null
        },
        // 页面内商品总数 -- 数量少于10个时，降级为一行一列样式
        bannerShow: true,
        initScroll: 0,
        // 是否是iphoneX
        isIpx: false,
        searchWord: '',
        // 8.4新增 -- 秒杀楼层banner
        bannerList: [],
        couponList: [],
        showShare: false,
        tabFixd: false,
        // 分页
        pageSize: 10,
        pageCount: 1,
        pageData: [],
        lastPage: false,
        // 底部tab列表
        bottomTabList: [],
        hideBackTop: true,
        pageMoving: false, // 是否滑动
        traceId: '' ,
        self_page:'seckill_active'
       
    },

    // 自定义数据
    scopeData: {
        // 助力券分享信息
        helpCouponShareMsg: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCapsule()
        this.getInfo()
        this.setData({
            isIpx: app.globalData.isIpx
        })  
    },

    onReady() {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      if(getApp().globalData.refreshHomeFlag) {
        getApp().globalData.refreshHomeFlag = false
        this.getInfo()
      }
    },

     // pv埋点上报
    pvFunc(back) {
      let recommendObj = this.data.recommendObj || {};
      pvBuriedV2_({
        create_time: new Date(),
        page_par: {
          ref_par: {
            traceId: recommendObj.preTraceId || "",
            userAction: recommendObj.preUserAction || "",
          }
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || "",
        'isBack': back || ''
      });
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    },

    onUnload() {
        this.data.refQuery && this.data.refQuery.disconnect()
    },

    onPageScroll(e) {
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
    showBackTop() {
        // 页面不滑动、pageMoving为false
        if (!this.data.pageMoving) {
          this.setData({
            pageMoving: true
          })
        }
        this.hiddenBackTop()
      },
    hiddenBackTop() {
        this.movTime && clearTimeout(this.movTime)
        this.movTime = setTimeout(() => {
          this.setData({
            pageMoving: false
          })
        }, 250)
    },
    onPullDownRefresh() {
        this.getInfo()
        wx.stopPullDownRefresh()
    },

    onReachBottom() {
      if (!this.data.lastPage) {
        let count = this.data.pageCount + 1
        this.delPageData(count, this.data.lists)
      }
    },

    /**
    * 用户点击右上角分享
    */
    onShareAppMessage: function (e) {
      if (e.from == 'button') {
        let helpCouponShareMsg = this.scopeData.helpCouponShareMsg;
        return {
            title: helpCouponShareMsg.miniProgram.title || "京东到家",
            imageUrl: helpCouponShareMsg.miniProgram.imageUrl || "",
            path: helpCouponShareMsg.miniProgram.miniProgram
        } 
      }
    },


    // 获取胶囊位置
    getCapsule() {
      let capsule = util.getCapsule()
      this.setData({
          capsule: capsule
      })
    },

    // 获取页面数据
    async getInfo() {
        let address = wx.getStorageSync('address_info')
        let {functionId, appVersion} = FNIDS.grabFloorListNew
       
        let data = {
          isNeedDealError: true,
          functionId,
          appVersion,
          pageId:(this.data.recommendObj && this.data.recommendObj.pageIdFirstPage)||"",
          preObj: this.data.recommendObj && this.data.recommendObj || {},
          body: {
              ctp: 'seckill_active',
              ref: 'home',
              pageSource: 'seckill',
              refPageSource: 'home',
              longitude: address.longitude,
              latitude: address.latitude,
              areaCode: address.adcode,
              city: address.cityName,
              pageSource: "seckill",
              refPageSource: this.data.recommendObj.refPageSource || "",
              ref_par: {
                userAction: this.data.recommendObj.preUserAction || "",
                traceId: this.data.recommendObj.preTraceId || "",
              },
          },
        }
        if (observeProxy.aheadRqFinish == null) {
          let res = await request(data)
          this.commonFunction(res)
        } else if (observeProxy.aheadRqFinish == 'loading') {
          observeProxy.stack = this.commonFunction
        } else if (observeProxy.aheadRqFinish == 'finished') {
          this.commonFunction(observeProxy.preLoad)
          setProxy(true)
        }
    },

    async commonFunction(res) {
      if (res && res.data && res.data.code == '0') {
          let result = res.data.result;
          // 自定义导航栏图片
          let titlePicUrl = result.titlePicUrl
          let searchWord = result.searchWord
          let [banner, lists, tabInfo, couponList] = await Promise.all([this.delBanner(result.sortSkuList, result.bannerList), this.delList(result.navigationSkuList), this.delTab(result.navigationInfo, result.tabColor), this.delCoupon(result.couponList)])
          let skuCount = (result.sortSkuList ? result.sortSkuList.length : 0) + (result.navigationSkuList ? result.navigationSkuList.length : 0)
         
          this.setData(
            {
              traceId: res.data.traceId || '',
              titlePicUrl,
              searchWord,
              ...banner,
              lists,
              tabInfo,
              couponList,
              spaceNo: tabInfo.tabs[0] ? tabInfo.tabs[0].spaceNo : "",
              bannerShow:
                tabInfo.tabs.length == 0 && skuCount < 10 ? false : true,
              "netError.pageError": null,
              "netError.listError": lists.length
                ? null
                : {
                    type: 4,
                    btnText: "重新加载",
                    tips: "暂无数据",
                  },
              bottomTabList: result.tabList && result.tabList.slice(0, 5) || [],
            },
            () => {
              this.getInitScroll();
              this.data.tabInfo.tabs.length > 1 && this.obserberTab();
              // 上报默认tabs 选中埋点
              let defaultE = {
                detail:{
                    spaceNo: tabInfo.tabs[0] ? tabInfo.tabs[0].spaceNo : "",
                    tabName: tabInfo.tabs[0] ? tabInfo.tabs[0].navigationName : "",
                    isLayer: 0,
                    state: 0
                }
              }
              this.reportPopname(defaultE);
              // 初始化全局监听
              this.exposureInit()
            }
          );
      } else {
        wx.reportMonitor('26',1)
        this.setData({
          'netError.pageError': {
            type: 7,
            btnText: '重新加载',
            tips: '网络异常'
          }
        })
      }
    },

    // 轮播图数据
    async delBanner(sortSkuList, imageList) {
        let banner = sortSkuList, sortFloorSkuList = [], bannerList = imageList;
        banner.map(item => {
            sortFloorSkuList.push({
                stationNo: item.storeId,
                skuId: item.skuId
            })
        })
        sortFloorSkuList = JSON.stringify(sortFloorSkuList)
        return { banner, sortFloorSkuList, bannerList }
    },

    // 商品列表数据
    async delList(lists) {
        if (lists && lists.length) {  
          this.delPageData(1, lists)
        }
        return lists && lists.length ? lists : []
    },

    // tab列表
    async delTab(tabs, tabColor) {
        let scrollTop = this.data.capsule.top + this.data.capsule.height + 10
        // tabs = tabs.length > 12 ? tabs.slice(0, 12) : tabs
        tabColor = tabColor ? tabColor : '#FF2626'
        return {
            tabs,
            tabColor,
            scrollTop
        }
    },

    // 优惠券数据
    async delCoupon(couponList) {
        return couponList && couponList.length ? couponList : []
    },

    // 处理分页数据
    async delPageData(count, lists) {
      let s = (count - 1) * this.data.pageSize
      let t = count * this.data.pageSize
      let data = lists.slice(s, t)
      let page = count > 1 ? `pageData[${count - 1}]` : 'pageData'
      let lastPage = data.length < 10 ? true : false
      this.setData({
       [page]: count > 1 ? data : [data],
       pageCount: count,
       lastPage
      })
    },

    querySku(e) {
        let { spaceNo, tabName } = e.detail
        if (spaceNo != this.data.spaceNo) {
            this.setData({ spaceNo })
            this.getQuery(Number(spaceNo), tabName)
        }

    },

    // 分类查询商品
    async getQuery(spaceNo, tabName = '') {
        mp.loading_cover()
        let address = wx.getStorageSync('address_info')
        let {functionId, appVersion} = FNIDS.grabFloorSkuList
        let data = {
            isNeedDealError: true,
            functionId,
            appVersion,
            body: {
                longitude: address.longitude,
                latitude: address.latitude,
                areaCode: address.adcode,
                city: address.cityName,
                sortFloorSkuList: this.data.sortFloorSkuList,
                spaceNo,
                pageSource: "seckill",
                refPageSource: this.data.recommendObj.refPageSource || "",
                ref_par: {
                  userAction: this.data.recommendObj.preUserAction || "",
                  traceId: this.data.recommendObj.preTraceId || "",
                },
            },
            pageId:(this.data.recommendObj && this.data.recommendObj.pageIdFirstPage) ||"",
            preObj: this.data.recommendObj && this.data.recommendObj || {},
        }
        let res = await request(data)
        if (res && res.data && res.data.code == '0') {
            mp.hideLoading()
            let result = res.data.result
            let lists = await this.delList(result)
            this.setData({
                lists,
                traceId: res.data.traceId || '',
                'netError.listError': lists.length ? null : {
                  type: 4,
                  btnText: '重新加载',
                  tips: '暂无数据'
                }
            }, () => {
                if (this.data.tabFixd) {
                  wx.pageScrollTo({
                    scrollTop: this.data.initScroll,
                    duration: 300
                  })
                }
            })
            // 上报埋点
            this.reportGetTab(spaceNo, tabName, lists.length)
        } else {
            mp.hideLoading()
            this.setData({
                'netError.listError': {
                  type: 7,
                  btnText: '重新加载',
                  tips: '网络异常'
                }
            })
        }
    },
    // 处理网络错误
    onDefaultBtnEvent(e) {
        this.getInfo()
    },
    onDefaultlist() {
        this.getQuery(this.data.spaceNo)
    },
    // 返回顶部
    backTop() {
        wx.pageScrollTo({
            scrollTop: 0
        })
    },
    // 获取自定义导航栏 + banner高度
    getInitScroll() {
        let that = this
        let query = wx.createSelectorQuery().in(this)
        query.select('.banner_wrap').boundingClientRect(function (res) {
            let bannerHight = 0, initScroll = 0
            bannerHight = res && res.height ? res.height : that.data.banner.length ? 173 : 0
            initScroll = bannerHight
            that.setData({ initScroll })
        }).exec()
    },
    // 监听导航楼层
    obserberTab() {
      let top, that = this, seting = false
      let refQuery = this.createIntersectionObserver()
      let query = wx.createSelectorQuery().in(this)
      this.setData({ refQuery })
      query.select('.tab-wrap').boundingClientRect(function (res) {         
          top = res.height + that.data.tabInfo.scrollTop
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
    },
    // 监听优惠券楼层事件
    onCouponEvent(e) {
        let { type, data } = e.detail || {};
        if (type === 'helpCoupon') { //助力券
            let { chat = {} } = data || {};
            this.scopeData.helpCouponShareMsg = chat
            this.setData({
                showShare: true
            })
        }
    },
    // 点击分享背景
    clickShareBg() {
        this.setData({
            showShare: false
        })
    },
    /* ------------------ 自动化埋点新增逻辑    --------------------  */
    reportSortnameTab() {
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "click_sortnametab",
        click_par: {
          
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    },
    reportPopname(e) {
      let { spaceNo, tabName, isLayer,state=null } = e.detail
      this.buried.spaceNo = spaceNo
      this.buried.tabName = tabName
      this.buried.isLayer = isLayer
      this.buried.state = state
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "selectTab",
        click_par: {
          spaceNo,
          tabName,
          isLayer,
          state
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    },
    reportGoodsList(e) {
        let { userAction, storeId, skuId } = e.detail
        this.buried.userAction = userAction
        this.buried.storeId = storeId
        this.buried.skuId = skuId
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
        clickBuriedV2_({
          click_id: "getTabResult",
          click_par: {
            userAction,
            storeId,
            skuId
          },
          currentPageName: currentPageName,
          prePageName: prePageName,
          pageId: pageIdFirstPage,
        })
    },
    reportTopfloor(e) {
        let { userAction, storeId, skuId } = e.detail
        this.buried.userAction = userAction
        this.buried.storeId = storeId
        this.buried.skuId = skuId
        let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
        clickBuriedV2_({
          click_id: "getTabResult",
          click_par: {
            userAction,
            storeId,
            skuId
          },
          currentPageName: currentPageName,
          prePageName: prePageName,
          pageId: pageIdFirstPage,
        })
    },
    reportGetTab(spaceNo, tabName, skuCnt) {
      this.buried.spaceNo = spaceNo
      this.buried.tabName = tabName
      this.buried.skuCnt = skuCnt

      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "getTabResult",
        click_par: {
          spaceNo,
          tabName,
          skuCnt
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
    }
})