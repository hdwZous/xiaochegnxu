/* eslint-disable camelcase */
import {FNIDS, request} from "../../../common/util/api";
import { updateGoodsNum } from '../../../common/util/carService'
import util from '../../../common/util/util.js'
import { clickBuriedV2_ } from "../../../common/util/BI";
import djBus from '../../../common/util/djBus';
import mp from '../../../common/util/wxapi'
import { djCmsJump } from "../../../common/util/agreementV2";
// 每页大小
const PAGE_SIZE = 20;

// 页面数据
export let data = {
  noSearchBtn: "nobtn",
  // 输入框占位符
  placeHolder: "搜索你想要的商品",
  // 搜索type
  sortType: "",
  // 输入框关键字
  keyword: "",
  rangeWay: 0,
  // 商品列表
  goodList: [],
  longitude: "",
  latitude: "",
  orgCode: "",
  storeId: "",
  // 加减购物车ID
  cartSkuId: "",
  // 加减车类型
  cartType: "",
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
  showEmpty: true,
  type: 0,
  tips: "",
  pageCount: 1,
  // 下拉加载数据结束标志
  isFinish: false,
  categoryId: '',
  categorys: [],
  toggle: false,
  // spu选择器参数
  spuData: {
    storeId: "",
    orgCode: "",
    spuId: "",
    skuId: "",
    transmitData: ''
  },
  cartButton: "", // 按钮状态
  catText: "", // 底部按钮文案
  compatible: false, // 版本库是否兼容自定义导航
  capsule: {}, // 胶囊信息
  showBack: false,
  statusBarHeight: "",
  strickTop: "", // 吸顶距离
  fromPage: "", // 上一页名称
  showPop: false, // 是否展示返回弹层
  isShowAuthoryDialog: false, // 是否显示授权对话框
  authoryDialogContent: "", // 授权对话框内容
  isIpx: false,
  curcateId: '',
  priceDiff: '',
  showDialog: false,
  popupWindow: null
};
// 获取列表数据
export function getGoodsList (instant) {
  let {storeId = '', addItemType = '', addItemThreshold = '', addItemFaceVlaue = '', differenceOfThreshold = '', orgCode = '', sortType = '', keyword = '', priceDiff = '', pageCount, categoryId = null, recommendObj = {}} = instant.data;
  let {functionId, appVersion} = FNIDS.freightTogetherOrder
  let { pageIdFirstPage = '' } = recommendObj
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  request({
    functionId,
    method: 'POST',
    appVersion,
    body: {
      stationNo: storeId,
      addItemType,
      addItemThreshold,
      addItemFaceVlaue,
      differenceOfThreshold,
      orgCode,
      categoryId,
      sortType,
      keyword,
      priceDiff,
      page: pageCount,
      pageSize: PAGE_SIZE
    },
    pageId: pageIdFirstPage,
    preObj: recommendObj
  }).then(res => {
    let result = res.data.result;
    let {pageCount} = instant.data;
    if (
      result.categorys &&
      result.categorys.length &&
      result.categorys[0].categoryName == "全部"
    ) {
      result.categorys[0].categoryId = ''
    }
    if (result.products && result.products.length > 0) {
      instant.setData({
        showEmpty: false,
        goodList: instant.data.isFinish ? instant.data.goodList : instant.data.goodList.concat(result.products),
        togetherOrderInfo: result.togetherOrderInfo,
        categorys: result.categorys
      })
    } else {
      if(instant.data.pageCount > 1) {
        instant.setData({
          isFinish: true
        });
        return;
      }
      instant.setData({
        showEmpty: true,
        type: 4,
        tips: "暂无符合条件的商品",
        goodList: instant.data.goodList,
        togetherOrderInfo: result.togetherOrderInfo,
        categorys: result.categorys
      })
    }
    if (pageCount == result.pageCount) {
      instant.setData({
        isFinish: true
      })
    }
    wx.hideLoading()

  }).catch(() => {
    if(instant.data.pageCount > 1) {
      instant.setData({
        isFinish: true
      });
      return;
    }
    instant.setData({
      showEmpty: true,
      type: 4,
      tips: "暂无符合条件的商品",
      goodList: instant.data.goodList
    });
    wx.hideLoading()
  })
}

// 排序tab切换
export function sortTypeClick (instant, e) {
  let type = e.currentTarget.dataset.type;
  let sortType = '';
  let rangeWay = 0;
  let click_par = {}
  if (type == 1) {
    sortType = '';
    rangeWay = 0;
    click_par = {
      sortType: 'sort_default',
      orderType: 'desc',
      storeId: instant.data.storeId || ''
    }
  } else if (type == 2) {
    sortType = 'sort_redissale30_desc';
    rangeWay = 0;
    click_par = {
      sortType: 'sort_sale',
      orderType: 'desc',
      storeId: instant.data.storeId || ''
    }
  } else if (type == 3) {
    if (instant.data.sortType == 'sort_price_desc') {
      sortType = 'sort_price_asc';
      rangeWay = 1;
      click_par = {
        sortType: 'sort_price',
        orderType: 'asc',
        storeId: instant.data.storeId || ''
      }
    } else if (instant.data.sortType == 'sort_price_asc') {
      sortType = 'sort_price_desc';
      rangeWay = 2;
      click_par = {
        sortType: 'sort_price',
        orderType: 'desc',
        storeId: instant.data.storeId || ''
      }
    } else {
      sortType = 'sort_price_asc';
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
    pageCount: 1,
    goodList: [],
    isFinish: false
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
export function handleMongClick (instant) {
  instant.setData({
    isShowSearchLayout: false,
    focus: false
  });
}
// 点击搜索框 生成蒙层
export function handleShowSearchClick (instant) {
  instant.setData({
    keyword: instant.data.keyword,
    isShowSearchLayout: !instant.data.isShowSearchLayout,
    focus: true
  });
}
// 搜索框输入
export function searchInput (instant, e) {
  let searchContent = e.detail.value;
  instant.setData({
    keyword: searchContent
  })
}
// 去商品详情
export function goToDetail (instant, e) {
  let data = e.currentTarget.dataset;
  let { recommendObj = '' } = instant.data
  wx.navigateTo({
    url: `/pages/product/index?orgCode=${data.orgCode}&storeId=${data.storeId}&skuId=${data.skuId}`,
    preObj: recommendObj,
    buried_position: {
      currentPageName: 'addonfreight_common_goToDetail'
    }
  });
  clickBuriedV2_({
    click_id: "click_goods",
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 加减车后重新获取tips文案
export function getPriceDiff (instant) {
  let {functionId = '', appVersion = ''} = FNIDS.freightTogetherOrderTip
  let { recommendObj = {} } = instant.data
  let { pageIdFirstPage = '' } = recommendObj
  request({
    functionId,
    method: 'get',
    appVersion,
    body: {
      stationNo: instant.data.storeId || "",
      addItemType: instant.data.addItemType || "",
      addItemThreshold: instant.data.addItemThreshold || "",
      addItemFaceVlaue: instant.data.addItemFaceVlaue || "",
      orgCode: instant.data.orgCode || "",
      pageSource: "ScrapFreightType",
      ctp: "ScrapFreightType"
    },
    pageId: pageIdFirstPage,
    preObj: recommendObj
  }).then(res => {
    let result = res.data.result;
    instant.setData({
      togetherOrderInfo: result.desc,
      priceDiff: result.priceDiff
    })
  }).catch(() => {

  })
}
// 更新当前页面商品数量 skuId, cartNum, clear, spuId
export function _UPDATEGOODSNUM (instant, obj) {
  let {type, data} = obj
  if (type == 'showModel') {
    // 展示spu选择器
    instant.toggleSpuSelector();
    instant.setData({
      spuData: data
    });
  } else {
    updateGoodsNum(instant, instant.data.goodList, obj, `goodList`)
    // 更新商品详情 获取
    instant.getPriceDiff()
    // 更新购物车按钮状态
    instant.fetchCatData(instant);
  }
}
export function toggleSpuSelector (instant) {
  djBus.emit("mask_spu", instant.data.recommendObj);
  instant.setData({
    toggle: true
  })

}
// 生命周期函数--监听页面加载
export function onLoad (instant, options, app) {
  let params = JSON.parse(options.params);

  let sysInfo = wx.getSystemInfoSync() || {};
  let { version, statusBarHeight = 0 } = sysInfo;
  getCapsule(instant, app, sysInfo); // 获取胶囊高度
  let compatible = isCompatible(version, "7.0.0");
  instant.setData({
    compatible: compatible < 0 ? false : true,
    statusBarHeight,
    isIpx: app.globalData.isIpx,
    params: params,
    ...params
  });

  instant.showHomeOrBack(); // 显示返回还是home
  instant.getGoodsList();
  if (instant.data.fromPage && instant.data.fromPage == "settle") {
    instant.fetchCatData();
  }

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
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 生命周期函数--监听页面显示
export function onShow () {

}
// 页面上拉触底事件的处理函数
export function onReachBottom (instant) {
  if (instant.data.isFinish) {
    return;
  }
  instant.data.pageCount += 1
  instant.getGoodsList();
}

export function clickCategory (instant, e) {
  let { categoryId, userAction = '' } = e.currentTarget.dataset
  if (categoryId == instant.data.categoryId) {
    return
  } else {
    instant.setData(
      {
        pageCount: 1,
        goodList: [],
        isFinish: false,
        categoryId,
        curcateId: `_${categoryId}`
      },
      () => {
        instant.getGoodsList();
      }
    );
    // 上报默认排序埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'selectCateTag',
      click_par: {
        userAction
      },
      pageId: instant.data.recommendObj.pageIdFirstPage || '',
      currentPageName: instant.data.recommendObj.currentPageName || '',
      prePageName: instant.data.recommendObj.prePageName || ''
    })
  }
}
// 调用购物车接口
export function fetchCatData (instant) {
  let { recommendObj = {} } = instant.data
  let { pageSource = '', refPageSource = '', pageIdFirstPage = '' } = recommendObj
  request({
    ...FNIDS.querySingleCart,
    isForbiddenDialog: true,
    isNeedDealError: true,
    method: 'POST',
    body: {
      orgCode: instant.data.orgCode || "",
      storeId: instant.data.storeId || "",
      positionType: "2",
      skus: [],
      cartOpenFlag: false,
      fromSource: 5, // 5代表小程序
      pageSource,
      refPageSource
    },
    pageId: pageIdFirstPage,
    preObj: recommendObj
  })
    .then((res) => {
      let result = res.data.result;
      if (result) {
        if (result.cartButtonList && result.cartButtonList.length) {
          let data = {
            // 0 不置灰， 1置灰
            cartButton: result.cartButtonList[0].buttonState,
            catText: result.cartButtonList[0].buttonName || "去结算"
          };
          instant.setData(data);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
// 底部按钮跳转
export function goSettlement (instant, num = 1) {
  if (instant.data.cartButton == 1) return
  goToBill(instant, num);

}
// 自定义导航条左侧按钮
export function showHomeOrBack (instant) {
  let pages = getCurrentPages();
  if (pages.length === 1) {
    instant.setData({
      showHome: true
    });
  } else if (pages.length > 1) {
    instant.setData({
      showBack: true
    });
  }
}
// 导航条返回
export function goBack (e, instant, num = 1) {
  if (instant.data.fromPage == "settle") {
    // 不可返回
    if (instant.data.cartButton == 1) {
      instant.setData({
        showPop: true
      });
    } else {
      goToBill(instant, num);
    }
  } else {
    wx.navigateBack({
      delta: 1
    });
  }
}
// 导航条返回首页
export function goHome (instant) {
  let { recommendObj = '' } = instant.data
  wx.switchTab({
    url: "/pages/home/home",
    preObj: recommendObj
  });
}
// 隐藏弹层
export function hidePop (instant) {
  instant.setData({
    showPop: false
  });
  clickBuriedV2_({
    click_id: "clickLayer",
    click_par: {
      storeId: instant.data.storeId || "",
      type: 'block',
      btnName: 'goAround'
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 弹层的返回
export function popback (instant) {
  wx.navigateBack({
    delta: 2
  });
  clickBuriedV2_({
    click_id: "clickLayer",
    click_par: {
      storeId: instant.data.storeId || "",
      type: 'block',
      btnName: 'back'
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 处方药弹层按钮
export function cancel (instant) {
  instant.setData({
    isShowAuthoryDialog: false
  });
}
// 处方药弹层按钮
export function confirm (instant, num) {
  instant.setData({
    isShowAuthoryDialog: false
  });
  wx.navigateBack({
    delta: num || 1
  });
}

// 获取胶囊高度
function getCapsule (instant, app, sysInfo) {
  // 优先取全局
  let globalCapsule = app.globalData.capsule || {};
  let capsule;
  if (!globalCapsule.height) {
    capsule = globalCapsule;
  } else {
    try {
      // 全局取不到的自己获取
      let capsuleNew =
          (wx.getMenuButtonBoundingClientRect &&
            wx.getMenuButtonBoundingClientRect()) ||
          {};
      if (capsuleNew.height) {
        app.globalData.capsule = capsuleNew;
        capsule = capsuleNew;
      } else {
        // 获取不到走默认
        let { windowWidth, statusBarHeight } = sysInfo;
        let width = 87;
        let height = 32; // 假设胶囊默认宽高
        let left = windowWidth - (width + 10); //  (10 + width + 10 )为胶囊左右边距
        let right = windowWidth - 10;
        let top = statusBarHeight + 4;
        let bottom = statusBarHeight + 4 + height; //
        capsule = {
          width,
          height,
          left,
          top,
          right,
          bottom
        };
      }
    } catch (e) {
      // 获取不到走默认
      let { windowWidth, statusBarHeight } = sysInfo;
      let width = 87;
      let height = 32; // 假设胶囊默认宽高
      let left = windowWidth - (width + 10); //  (10 + width + 10 )为胶囊左右边距
      let right = windowWidth - 10;
      let top = statusBarHeight + 4;
      let bottom = statusBarHeight + 4 + height; //
      capsule = {
        width,
        height,
        left,
        top,
        right,
        bottom
      };
    }
  }
  instant.setData({
    capsule,
    strickTop: capsule.top + capsule.height || 0
  });
}
function isCompatible (v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  const len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push("0");
  }
  while (v2.length < len) {
    v2.push("0");
  }
  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);
    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

function goToBill (instant, num) {
  if (util.isLogin()) {
    goToBillImpl(instant)
      .then(() => {
        wx.navigateBack({
          delta: num
        });
      })
      .catch((res) => {
        instant.setData({
          isShowAuthoryDialog: true,
          authoryDialogContent:
            res &&
            res.data &&
            res.data.result &&
            res.data.result.popupWindow.content.replace(/<br\/>/g, "\r\n")
        });
      });
  } else {
    let { recommendObj = '' } = instant.data
    wx.navigateTo({
      url: `/pages/newLogin/login/login`,
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'addonfreight_common_goToBill'
      }
    });
  }
}
// 去结算(真实实现)
function goToBillImpl (instant) {
  let { functionId, appVersion } = FNIDS.verifySettle;
  let { recommendObj = {} } = instant.data
  let { pageIdFirstPage = '' } = recommendObj
  return new Promise((resolve, reject) => {
    request({
      functionId,
      method: 'POST',
      isNeedDealError: true,
      body: {
        orgCode: instant.data.orgCode,
        positionType: "2",
        storeId: instant.data.storeId
      },
      appVersion,
      pageId: pageIdFirstPage,
      preObj: recommendObj
    })
      .then((res) => {
        const { result } = res.data
        if (res.data.code == "0") {
          resolve();
        } else if (res.data.code == "30910") {
          reject(res);
        } else if (result.popupWindow && result.popupWindow.type && result.popupWindow.type == 3) {
          // 上一页是门店
          let { param, to } = result.popupWindow.buttons[0]
          let anchorCateId = param.anchorCateId
          wx.setStorageSync('miniCartMustOrder', {
            toast: result.popupWindow.title,
            anchorCateId: anchorCateId
          })
          if (this.data.preBuried.prePageName == 'storeinfo' || this.data.preBuried.prePageName == 'storeSearch') {
            wx.navigateBack()
          } else if (this.data.preBuried.currentPageName == 'storeinfo') {
            mp.toast({
              title: res.data.msg,
              duration: 1500
            });
            this.triggerEvent('miniCartMustOrderFn')
          } else {
            djCmsJump({
              params: param,
              to: to
            })
          }
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          });
          if (result.popupWindow) {
            instant.setData({
              showDialog: true,
              popupWindow: result.popupWindow
            })
          }
        }
      })
      .catch(() => {});
  });
}
