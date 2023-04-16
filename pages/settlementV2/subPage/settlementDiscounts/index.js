import { request, FNIDS } from '../../../../common/util/api'
import mp from '../../../../common/util/wxapi'
import { updateGoodsNum } from '../../../../common/util/carService'
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import emitter from '../../../../common/util/events';
import djBus from '../../../../common/util/djBus';
let app = getApp()

Page({
  data: {
    showEmpty: true,
    listError: false,
    showGoodListEmpty: true,
    showLoading: true,
    type: 0,
    tips: "",
    btnText: '',
    // 默认页-默认图
    defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",

    toggle: false, //多规格商品的spu选择器
    spuData: {},
    orgCode: "", // 接口入参
    storeId: "", // 接口入参
    cityId: '', // 接口入参
    orderPageId: '', // 接口入参
    unique: '', // 接口入参
    topSkuIdList: [], // 接口入参
    showMask: false, // 是否展示促销蒙层
    skuList: [], // 促销商品对象
    // 是否是iphoneX
    isIpx: false,
    freeFreightTextList: '',
    classifyResult: [],
    sortLabelList: [],
    skuList: [],
    checkIndex: 0,
    sortIndex: 0,
    firstCategorId: '', //分类id
    sortType: '', //排序类型
    buttonState: 0,
    buttonName: '',
    traceId: ''
  },
  onLoad(options) {
    let params = JSON.parse(options.params)
    
    this.setData({
      isIpx: app.globalData.isIpx,
      orgCode: params.orgCode || '',
      storeId: params.storeId || '',
      cityId: params.cityId || params.cityCode || '',
      orderPageId: params.orderPageId || '',
      unique: params.unique || '',
      topSkuIdList: params.topSkuIdList || []
    })
    emitter.emit('settleDiscounts')

    // 上报默认排序埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectSort',
      click_par: {
        sortType: 'sort_default',
        orderType: 'desc',
        sortState: 0,
        storeId: params.storeId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },
  onReady() {
   
  },
  onShow() {
    this.fetchFreightDetails()
    this.fetchMenuList()
    this.fetchSKus()
  },
  pvFunc(back){
    pvBuriedV2_({
      page_par: {
        storeId: this.data.storeId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || '',
      isBack: back || "",
    })
  },
  onUnload() {
    
  },
  // 获取提交文案按钮
  fetchFreightDetails() {
    mp.loading_cover()
    let {functionId, appVersion} = FNIDS.queryFreeFreightDetails
    let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
    request({
      functionId,
      appVersion,
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {
        orderPageId: this.data.orderPageId,
      },
      pageId: pageIdFirstPage,
      preObj: recommendObj
    }).then(res => {
      mp.hideLoading()
      let { code, result = {} } = res.data
      if (code == 0 && result) {
        this.setData({
          buttonState: 0,
          freeFreightTextList: result.freeFreightTextList
        })
      } else if (code == 'A0603') {
        let carButton = wx.getStorageSync('carButton')
        if (carButton.buttonState != null && carButton.buttonState == 1) {
          this.setData({
            buttonState: 1,
            buttonName: carButton.buttonName
          })
        }
      }
    }).catch(err => {
      mp.hideLoading()
    })
  },
  // 获取分类列表
  fetchMenuList() {
    mp.loading_cover()
    let {functionId, appVersion} = FNIDS.queryClassifyMenuList
    let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
    request({
      functionId,
      appVersion,
      method: 'POST',
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {
        orgCode: this.data.orgCode,
        storeId: this.data.storeId,
        unique: this.data.unique,
        cityId: this.data.cityId,
      },
      pageId: pageIdFirstPage,
      preObj: recommendObj
    }).then(res => {
      mp.hideLoading()
      let { code, result = {} } = res.data
      if (code == 0 && result) {
        this.setData({
          classifyResult: result.LandPageClassifyResult || [],
          showEmpty: result.LandPageClassifyResult && result.LandPageClassifyResult.length ? false : true
        })
      } else {
        this.handleErrData(res, 'showEmpty')
      }

      // 上报默认埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'selectTab',
        click_par: {
          firstCategorId: result.LandPageClassifyResult[0].firstCategorId,
          tabName: result.LandPageClassifyResult[0].classifyName,
          isLayer: 0,
          state: 0,
          storeId: this.data.storeId || ''
        },
        pageId: this.data.recommendObj.pageIdFirstPage || '',
        currentPageName: this.data.recommendObj.currentPageName || '',
        prePageName: this.data.recommendObj.prePageName || ''
      })
    }).catch(err => {
      mp.hideLoading()
      this.handleErrData(err, 'showEmpty')
    })
  },
  // 查询免运商品列表
  fetchSKus() {
    mp.loading_cover()
    let {functionId, appVersion} = FNIDS.queryFreeFreightProductList
    let { recommendObj,recommendObj: { pageIdFirstPage = '' } = {} } = this.data
    request({
      functionId,
      appVersion,
      method: 'POST',
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {
        orgCode: this.data.orgCode,
        storeId: this.data.storeId,
        pageIndex: 1,
        unique: this.data.unique,
        cityId: this.data.cityId,
        firstCategorId: this.data.firstCategorId,
        sortType: this.data.sortType,
        fromSource: 5,
        topSkuIdList: this.data.topSkuIdList
      },
      pageId: pageIdFirstPage,
      preObj: recommendObj
    }).then(res => {
      mp.hideLoading()
      let { code, result = {} } = res.data
      if (code == 0 && result) {
        let sortLabelList = [], skuList = []
        sortLabelList = (result.sortLabelList || this.data.sortLabelList) || []
        if (result.productInfoVoList && result.productInfoVoList.length) {
          skuList = result.productInfoVoList
        }
        if (skuList.length) {
          this.setData({
            sortLabelList,
            skuList,
            listError: false,
            traceId: result.traceId
          })
        } else {
          this.setData({
            sortLabelList,
            skuList,
            traceId: result.traceId
          })
          this.handleErrData(res, 'listError')
        }
      } else {
        this.handleErrData(res, 'listError')
      }
    }).catch(err => {
      mp.hideLoading()
      this.handleErrData(err, 'listError')
    })
  },
  // 处理接口异常信息
  handleErrData(res, errtype) {
    this.setData({
      [errtype]: true,
      type: 1,
      btnText: "重新加载",
      tips: !(res.data && res.data.result.productInfoVoList) ? '暂无符合的商品' : (res.data && res.data.msg || '获取商品信息失败'),
    })
  },
  // 点击促销分类
  clickPromo(e) {
    let { index, ids, name, layer } = e.currentTarget.dataset
    this.setData({
      firstCategorId: ids,
      checkIndex: index,
      showMask: false
    }, () => {
      this.fetchSKus()
    })

    // 上报埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectTab',
      click_par: {
        firstCategorId: ids,
        tabName: name,
        isLayer: layer ? 1 : 0,
        storeId: this.data.storeId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },
  // 点击排序
  clickSort(e) {
    let { index, type, name } = e.currentTarget.dataset
    this.setData({
      sortIndex: index,
      sortType: type
    }, () => {
      this.fetchSKus()
    })

    // 上报默认排序埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectSort',
      click_par: {
        sortType: name,
        orderType: 'desc',
        storeId: this.data.storeId || ''
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },
  // 展示促销分类弹层
  showPop(e) {
    let isShow = e.currentTarget.dataset.isShow
    this.setData({
      showMask: isShow
    })
  },
  _UPDATEGOODSNUM(obj) {
    let { type, data} = obj
    if (type == 'showModel') {
      djBus.emit("mask_spu", this.data.recommendObj);
      this.setData({
        toggle: true,
        spuData: data
      })
    } else {
      updateGoodsNum(this, this.data.skuList, obj, 'skuList')
      this.fetchFreightDetails()
    }
  },
  onDefaultBtnEvent: function (e) {
    let type = e.detail.type;
    if (type == 1) { // 网络请求失败
      this.onShow()
    }
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    });
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'goCart',
      click_par: {
        storeId: this.data.storeId,
        btnName: this.data.buttonName || '返回结算页'
      },
      pageId: this.data.recommendObj.pageIdFirstPage || '',
      currentPageName: this.data.recommendObj.currentPageName || '',
      prePageName: this.data.recommendObj.prePageName || ''
    })
  },
  onSpuSelectorEvent(e) {
    let {type, data} = e.detail || {}
    if (type == 'closeSpu') {
      this.setData({
        toggle: false
      })
    }
  }
});