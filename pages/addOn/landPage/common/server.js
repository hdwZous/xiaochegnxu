import { FNIDS, request } from "../../../../common/util/api";
import { updateGoodsNum } from '../../../../common/util/carService'
import { clickBuriedV2_ } from "../../../../common/util/BI";
import djBus from '../../../../common/util/djBus'
// 每页大小
const PAGE_SIZE = 10;

// 页面数据
export let data = {
  noSearchBtn: "nobtn",
  // 输入框占位符
  placeHolder: "搜索你想要的商品",
  // 搜索type
  sortType: "",
  // 输入框关键字
  keyword: "",
  rangeWay: 0,  //排序
  // 商品列表
  goodList: [],
  longitude: "",
  latitude: "",
  orgCode: "",
  promotionId:"",
  skuIds:"",
  stationRange:"",
  storeId: "",
  totalPriceValue:"",
  totalSkuCount:"",
  // 加减购物车ID
  cartSkuId: "",
  // 加减车类型
  cartType: "",
  // 刷新mini购物车
  refreshMiniCartData: false,
  // 刷新商品列表
  refreshGoodListData: false,
  catAnimation: true,
  showCart: false,
  couponId: "",
  // 凑单tips文案
  togetherOrderInfo: [],
  // 点击显示搜索框
  isShowSearchLayout: false,
  // 输入框聚焦
  focus: false,
  isShowSearchCancel: false,
  pageError: {
    type: '',
    obj: {},
    // empty 数据为空； neterror 网络异常；dataerr 数据异常
    error: ''
  },
  toggle: false,
  // spu选择器参数
  spuData: {
    storeId: '',
    orgCode: '',
    spuId: '',
    skuId: '',
    userAction: '',
    transmitData: ''
  },
};
// 获取列表数据
export function getGoodsList(instant) {
  let {
    skuIds = "",
    promotionId = "",
    stationRange = "",
    storeId = "",
    orgCode = "",
    totalPriceValue = "",
    totalSkuCount= "",
    recommendObj = {}
  } = instant.data;
  let { pageIdFirstPage = '' } = recommendObj

  wx.showLoading({
    title: "加载中",
    mask: true,
  });
  request({
    functionId: FNIDS.pieceLandingSkuList.functionId,
    appVersion: FNIDS.pieceLandingSkuList.appVersion,
    method: "POST",
    body: {
      skuIds: skuIds.split(','),
      promotionId,
      stationRange,
      storeId,
      orgCode,
      totalPriceValue,
      totalSkuCount,
      keyword:instant.data.keyword,
      sortType:instant.data.sortType,
      pageSource:"cartGoodPage",
      ref:"",
      ctp:"collectOrder",
    },
    pageId: pageIdFirstPage,
    preObj: recommendObj
  })
    .then((res) => {
      let result = res.data.result;
      if (res.data.code == 0 && result) {
        if (result.productInfoList && result.productInfoList.length > 0) {
          instant.setData({
            pageError: {
              error: ''
            },
            goodList: result.productInfoList,
          });
        }
      } else {
        instant.setData({
          pageError: {
            type: 1,
            error: 'dataerror',
            obj: {
              btnArr: res.data.btnArr,
              imgType: res.data.imgType,
              msg: res.data.msg,
              title: res.data.title,
              errorCode: res.data.errorCode
            }
          }
        });
      }
      wx.hideLoading();
    })
    .catch(() => {
      instant.setData({
        pageError: {
          type: 2,
          error: 'neterror'
        },
        goodList: instant.data.goodList,
      });
      wx.hideLoading();
    });
}
// 更新凑单tips信息
export function updateTips(instant, tips) {
  if (!tips) return;
  instant.setData({
    togetherOrderInfo: tips,
  });
}
// 排序tab切换
export function sortTypeClick(instant, e) {
  let type = e.currentTarget.dataset.type;
  let sortType = "";
  let rangeWay = 0;
  let click_par = {}
  if (type == 1) {
    sortType = "";
    rangeWay = 0;
    click_par = {
      sortType: 'sort_default',
      orderType: 'desc',
      storeId: instant.data.storeId || ''
    }
  } else if (type == 2) {
    sortType = "sort_redissale30_desc";
    rangeWay = 0;
    click_par = {
      sortType: 'sort_sale',
      orderType: 'desc',
      storeId: instant.data.storeId || ''
    }
  } else if (type == 3) {
    if (instant.data.sortType == "sort_price_desc") {
      sortType = "sort_price_asc";
      rangeWay = 1;
      click_par = {
        sortType: 'sort_price',
        orderType: 'asc',
        storeId: instant.data.storeId || ''
      }
    } else if (instant.data.sortType == "sort_price_asc") {
      sortType = "sort_price_desc";
      rangeWay = 2;
      click_par = {
        sortType: 'sort_price',
        orderType: 'desc',
        storeId: instant.data.storeId || ''
      }
    } else {
      sortType = "sort_price_asc";
      rangeWay = 1;
      click_par = {
        sortType: 'sort_price',
        orderType: 'asc',
        storeId: instant.data.storeId || ''
      }
    }
  }
  instant.setData({
    sortType: sortType,
    rangeWay: rangeWay,
    goodList: [],
    showEmpty:true
  });
  instant.getGoodsList();
  // 埋点
  clickBuriedV2_({
    create_time: new Date(),
    click_id: 'selectSort',
    click_par,
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 点击蒙层
export function handleMongClick(instant) {
  instant.setData({
    isShowSearchLayout: false,
    focus: false,
  });
}
// 点击搜索框 生成蒙层
export function handleShowSearchClick(instant, e) {
  instant.setData({
    keyword: instant.data.keyword,
    isShowSearchLayout: !instant.data.isShowSearchLayout,
    focus: true,
  });
}
// 搜索框输入
export function searchInput(instant, e) {
  let searchContent = e.detail.value;
  instant.setData({
    keyword: searchContent,
  });
}
// 去商品详情
export function goToDetail(instant, e) {
  let data = e.currentTarget.dataset;
  let { recommendObj = null } = instant.data
  wx.navigateTo({
    url: `/pages/product/index?orgCode=${data.orgCode}&storeId=${data.storeId}&skuId=${data.skuId}`,
    preObj: recommendObj,
    buried_position: {
      currentPageName: 'addon_landpage_common_goToDetail'
    }
  });
  clickBuriedV2_({
    click_id: 'click_goods',
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 加减车后重新获取tips文案
export function getPriceDiff(instant) {
  // console.log('---->',instant.data)
  let { recommendObj = {} } = instant.data
  let { pageIdFirstPage = '' } = recommendObj
  request({
    functionId: FNIDS.pieceDesc.functionId,
    appVersion: FNIDS.pieceDesc.appVersion,
    method: "POST",
    body: {
      promotionId: instant.data.promotionId || "",
      stationRange: instant.data.stationRange || "",
      storeId: instant.data.storeId || "",
      orgCode: instant.data.orgCode || "",
      pageSource:"cartGoodPage",
      ref:"",
      ctp:"collectOrder"
    },
    pageId: pageIdFirstPage,
    preObj: recommendObj
  })
    .then((res) => {
      let result = res.data.result;
      instant.setData({
        togetherOrderInfo: result.desc,
      });
    })
    .catch(() => {});
}

// 更新当前页面商品数量 skuId, cartNum, clear, spuId
export function _UPDATEGOODSNUM(instant, obj) {
  let {type, data} = obj
  if (type == 'showModel') {
    // 展示spu选择器
    instant.toggleSpuSelector();
    instant.setData({
      spuData: data
    });
  } else {
    let str = `goodList`
    updateGoodsNum(instant, instant.data.goodList, obj, str)
  }
}
// 监听商品加减车变化
export function onAddMinControllerChange(instant, e) {
  instant.getPriceDiff();
}
export function toggleSpuSelector (instant) {
  djBus.emit("mask_spu", instant.data.recommendObj);
  instant.setData({
      toggle: true
  })  
}
export function onSpuSelectorEvent(instant, e) {
  let type = e.detail.type;
  if (type === 'addCart') { // 添加购物车
      //更新商品详情 获取
      instant.getPriceDiff()
  }
}
export function goToStore(instant){
  let { recommendObj = null } = instant.data
  wx.navigateTo({
    url: `/pages/store/index?storeId=${instant.data.storeId}&orgCode=${instant.data.orgCode}`,
    preObj: recommendObj,
    buried_position: {
      currentPageName: 'addon_landpage_common_goToStore'
    }
  })
}
// 生命周期函数--监听页面加载
export function onLoad(instant, options) {
  instant.setData({
    ...options,
  });
  // 上报默认排序埋点
  clickBuriedV2_({
    create_time: new Date(),
    click_id: 'selectSort',
    click_par: {
      sortType: 'sort_default',
      orderType: 'desc',
      sortState: 0,
      storeId: options.storeId || ''
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 生命周期函数--监听页面显示
export function onShow(instant) {
  instant.getPriceDiff();
  instant.getGoodsList();
}

export function onDefaultBtnEvent(instant, e) {
  let { type } = e.detail
  if (type == 1) {
    instant.getGoodsList()
  }
}

