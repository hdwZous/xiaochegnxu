/* eslint-disable camelcase */
import {FNIDS, request} from "../../../common/util/api";
import { updateGoodsNum } from '../../../common/util/carService'
import util from "../../../common/util/util.js";
import { clickBuriedV2_ } from "../../../common/util/BI";
import djBus from '../../../common/util/djBus';
import mp from '../../../common/util/wxapi'
import { djCmsJump } from '../../../common/util/agreementV2'
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
  // 凑单tips文案 ---阶梯凑单文案
  togetherOrderInfoTips: [],
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
  type: 0,
  tips: "",
  pageCount: 1,
  // 下拉加载数据结束标志
  isFinish: false,
  // 接口入参-上页接口返回
  priceDiff: "",
  // 接口入参-上页接口返回
  limitType: "",
  categoryId: '',
  categorys: [],
  toggle: false,
  // spu选择器参数
  spuData: {
    storeId: "",
    orgCode: "",
    spuId: "",
    skuId: "",
    userAction: "",
    transmitData: ''
  },
  cartButton: "", // 按钮状态
  catText: "", // 底部按钮文案
  compatible: false,
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
  screen: {},
  displayFilterFloor: [],
  scrollViewPadding: 140,
  sortModal: false,
  categoryModal: false,
  couponIdNew: 0,
  popupWindow: null,
  showDialog: false
};
// 获取列表数据
export function getGoodsList (instant, buriedtypes) {
  let {storeId = '', couponId = '', sortType = '', priceDiff = '', keyword = '', limitType = '', pageCount, categoryId = null, orderType = '', recommendObj = {} } = instant.data;
  const { filterList = [], priceFilter = [] } = instant.data;
  let {functionId = '', appVersion = ''} = FNIDS.couponTogetherOrder
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
      couponId,
      sortType,
      priceDiff,
      keyword,
      page: pageCount,
      pageSize: PAGE_SIZE,
      limitType: limitType,
      categoryId,
      filterList: [...priceFilter, ...filterList],
      orderType
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    preObj: recommendObj
  }).then(res => {
    let result = res.data.result;
    if (res.data.code == 0 && result) {
      let {pageCount} = instant.data;
      if (
        result.categorys &&
        result.categorys.length &&
        result.categorys[0].categoryName == "全部"
      ) {
        result.categorys[0].categoryId = "";
      }
      const { togetherOrderInfo = [], displayFilterFloor = [], screen = {} } = result;
      const oldScreen = instant.data.screen;
      const oldDisplayFilterFloor = instant.data.displayFilterFloor;
      let scrollViewPadding = 140;
      // 修改bug orgcdoe为空
      let orgCode
      if (instant.data.orgCode && instant.data.orgCode !== 'undefined') {
        orgCode = instant.data.orgCode
      } else if (res.data.code == 0 && res.data.result.venderId) {
        orgCode = res.data.result.venderId
      }
      instant.setData({orgCode}, () => {instant.getGoodsListDesc()})
      // 8.9.5 增加的凑单，将凑单条移动到底部，吸底位置减去对应的高度
      if (togetherOrderInfo && togetherOrderInfo.length) {
        scrollViewPadding = scrollViewPadding + 74 - 72;
      }
      if (displayFilterFloor && displayFilterFloor.length) {
        scrollViewPadding = scrollViewPadding + 88;
      }

      if (result.products && result.products.length > 0) {
        let goodList = []
        if (instant.data.isFinish) {
          goodList = instant.data.goodList
        } else {
          goodList = instant.data.goodList.concat(result.products)
        }
        if (instant.data.pageCount <= 1) {
          goodList = result.products
        }
        instant.setData({
          pageError: {
            error: ''
          },
          goodList,
          categorys: result.categorys,
          displayFilterFloor: oldDisplayFilterFloor && oldDisplayFilterFloor.length ? oldDisplayFilterFloor : displayFilterFloor,
          scrollViewPadding,
          screen: oldScreen && oldScreen.displayFilterFloor && oldScreen.displayFilterFloor.length ? oldScreen : screen
        })
      } else {
        if(instant.data.pageCount > 1) {
          instant.setData({
            isFinish: true
          });
          return;
        } else {
          instant.setData({
            pageError: {
              type: 1,
              error: 'empty',
              obj: {
                imgType: 5,
                title: '暂无符合条件的商品',
                btnArr: [{
                  btnName: '现在就去逛逛',
                  type: 2,
                  to: 'store',
                  params: {
                    storeId: instant.data.storeId,
                    orgCode: instant.data.orgCode
                  }
                }],
                errorCode: res.data.errorCode || ''
              }
            },
            goodList: instant.data.goodList,
            // togetherOrderInfo: result.togetherOrderInfo,
            categorys: result.categorys,
            orgCode: result.venderId
          })
        }
      }

      if (pageCount == result.pageCount) {
        instant.setData({
          isFinish: true
        })
      }
      // 埋点
      if (res.data.code == 0 && result && buriedtypes == 'filter') {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'getFilterResult',
          click_par: {
            contentType: 'sku',
            cnt: result.products && result.products.length,
            storeId: instant.data.storeId,
            couponId: instant.data.couponId
          },
          pageId: instant.data.recommendObj.pageIdFirstPage || '',
          currentPageName: instant.data.recommendObj.currentPageName || '',
          prePageName: instant.data.recommendObj.prePageName || ''
        })
      }
    } else {
      if(instant.data.pageCount > 1) {
        instant.setData({
          isFinish: true
        });
        return;
      }
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
    wx.hideLoading()

  }).catch(() => {
    if(instant.data.pageCount > 1) {
      instant.setData({
        isFinish: true
      });
      return;
    }
    instant.setData({
      pageError: {
        type: 2,
        error: 'neterror'
      },
      goodList: instant.data.goodList
    });
    wx.hideLoading()
  })
}
// 获取列表数据
export function getGoodsListDesc (instant) {
  let {storeId = '', couponId = '', keyword = '', orgCode = '', limitType = '', recommendObj = {}} = instant.data;
  let {functionId = '', appVersion = ''} = FNIDS.getCartForCouponDesc
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
      couponId,
      keyword,
      orgCode,
      limitType,
      settle: instant.data.pageSource && instant.data.pageSource == 'minicart' ? false : true
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    preObj: recommendObj
  }).then(res => {
    let result = res.data.result;
    const { desc = [], discountTips = []} = result || {};
    // 后台团建---待确认这个逻辑
    try {
      let togetherOrderInfoTips = this.data.togetherOrderInfoTips
      if (!togetherOrderInfoTips.length && discountTips.length) {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'showLayer',
          click_par: {
            text: '去凑单'
          },
          pageId: instant.data.recommendObj.pageIdFirstPage || '',
          currentPageName: instant.data.recommendObj.currentPageName || '',
          prePageName: instant.data.recommendObj.prePageName || ''
        })
      }
    } catch (error) {
      console.log(error);
    }
    let couponIdNew = result.couponId
    if(result.desc && result.desc.length > 0) {
      if(couponIdNew) {
        instant.setData({
          togetherOrderInfo: desc,
          togetherOrderInfoTips: discountTips,
          couponIdNew: couponIdNew
        })
      } {
        instant.setData({
          togetherOrderInfo: desc,
          togetherOrderInfoTips: discountTips
        })
      }
    }

    wx.hideLoading()

  }).catch(() => {
    wx.hideLoading()
  })
}
// 排序tab切换
export function sortTypeClick (instant, e) {
  let type = e.currentTarget.dataset.type;
  let sortType = '';
  let rangeWay = 0;
  if (type == 1) {
    sortType = '';
    rangeWay = 0;
  } else if (type == 2) {
    sortType = 'sort_redissale30_desc';
    rangeWay = 0;
  } else if (type == 3) {
    if (instant.data.sortType == 'sort_price_desc') {
      sortType = 'sort_price_asc';
      rangeWay = 1;
    } else if (instant.data.sortType == 'sort_price_asc') {
      sortType = 'sort_price_desc';
      rangeWay = 2;
    } else {
      sortType = 'sort_price_asc';
      rangeWay = 1;
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
      currentPageName: 'addon_common_goToDetail'
    }
  });
  clickBuriedV2_({
    click_id: 'click_goods',
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 去凑单，刷新页面
export function refreshOrder (instant) {
  wx.showLoading({
    title: '加载中',
    mask: true
  });
  let { couponIdNew = ''} = instant.data;
  instant.setData({
    couponId: couponIdNew
  }, () => {
    instant.getGoodsList();
    // instant.getGoodsListDesc();
  })
  clickBuriedV2_({
    click_id: 'miniCarSelect',
    click_par: {"text": "去凑单"},
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
// 加减车后重新获取tips文案
export function getPriceDiff (instant) {
  let {functionId = '', appVersion = ''} = FNIDS.couponPriceDiff
  let { recommendObj = {} } = instant.data
  request({
    functionId,
    method: 'POST',
    appVersion,
    body: {
      stationNo: instant.data.storeId || "",
      couponId: instant.data.couponId || "",
      orgCode: instant.data.orgCode || "",
      limitType: instant.data.limitType || ""
    },
    content: {
      source: instant.data.pageSource && instant.data.pageSource == 'minicart' ? 'cartMinatoOrder' : 'couponGoMinatoOrder'
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    preObj: recommendObj
  }).then(res => {
    let result = res.data.result;
    if (instant.data.pageSource && instant.data.pageSource == 'minicart') {
      instant.setData({
        togetherOrderInfo: result.desc,
        priceDiff: result.priceDiff
      })
    } else {
      instant.setData({
        togetherOrderInfo: result
      })
    }
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
    updateGoodsNum(instant, instant.data.goodList, obj, `goodList`);
    // 更新商品详情 获取  ---借口废弃
    // instant.getPriceDiff();

    // 更新之后调取新借口，获取文案---
    instant.getGoodsListDesc();

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
  let sysInfo = wx.getSystemInfoSync() || {};
  let { version, statusBarHeight = 0 } = sysInfo;
  let compatible = isCompatible(version, "7.0.0");

  instant.setData({
    compatible: compatible < 0 ? false : true,
    statusBarHeight,
    isIpx: app.globalData.isIpx,
    ...options
  });
  getCapsule(instant, app, sysInfo); // 获取胶囊高度
  instant.showHomeOrBack(); // 显示返回还是home
  instant.getGoodsList();
  // instant.getGoodsListDesc();
  if (options.fromPage && options.fromPage == "settle") {
    instant.fetchCatData();
  }

  // 上报默认排序埋点
  clickBuriedV2_({
    create_time: new Date(),
    click_id: 'selectSort',
    click_par: {
      sortType: 'sort_default',
      sortState: 0,
      orderType: 'desc',
      storeId: options.storeId || '',
      couponId: options.couponId || ''
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
  let { categoryId } = e.currentTarget.dataset
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
  }
}
// 调用购物车接口
export function fetchCatData (instant) {
  let { recommendObj = {} } = instant.data
  let { pageSource = '', refPageSource = '' } = recommendObj
  request({
    ...FNIDS.querySingleCart,
    isForbiddenDialog: true,
    isNeedDealError: true,
    method: 'POST',
    body: {
      orgCode: instant.data.orgCode || "304477",
      storeId: instant.data.storeId || "",
      positionType: "2",
      skus: [],
      cartOpenFlag: false,
      fromSource: 5, // 5代表小程序
      pageSource,
      refPageSource
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
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
  clickBuriedV2_({
    click_id: 'goCart',
    click_par: {
      storeId: instant.data.storeId || '',
      couponId: instant.data.couponId || '',
      btnName: instant.data.catText || ''
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
  if (instant.data.cartButton == 1) return;
  goToBill(instant, num);
}

export function showHomeOrBack (instant) {
  let pages = getCurrentPages()
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
export function goBack (e, instant, num = 1) {
  if (instant.data.fromPage == "settle") {
    // 不可返回
    if (instant.data.cartButton == 1) {
      instant.setData({
        showPop: true
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'showLayer',
        click_par: {
          storeId: instant.data.storeId || '',
          type: 'block'
        },
        pageId: instant.data.recommendObj.pageIdFirstPage || '',
        currentPageName: instant.data.recommendObj.currentPageName || '',
        prePageName: instant.data.recommendObj.prePageName || ''
      })
    } else {
      goToBill(instant, num);
    }
  } else {
    wx.navigateBack({
      delta: 1
    });
  }
}
export function goHome (instant) {
  let { recommendObj = '' } = instant.data
  wx.switchTab({
    url: '/pages/home/home',
    preObj: recommendObj
  })
}
export function hidePop (instant, e) {
  instant.setData({
    showPop: false
  });
  let { storeId = '', type = '', btnName = '' } = e.currentTarget.dataset
  clickBuriedV2_({
    create_time: new Date(),
    click_id: 'clickLayer',
    click_par: {
      storeId,
      type,
      btnName
    },
    pageId: instant.data.recommendObj.pageIdFirstPage || '',
    currentPageName: instant.data.recommendObj.currentPageName || '',
    prePageName: instant.data.recommendObj.prePageName || ''
  })
}
export function popback (instant, e) {
  wx.navigateBack({
    delta: 2
  });
  let { storeId = '', type = '', btnName = '' } = e.currentTarget.dataset
  clickBuriedV2_({
    create_time: new Date(),
    click_id: 'clickLayer',
    click_par: {
      storeId,
      type,
      btnName
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
        currentPageName: 'addon_common_goToBill'
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
      isNeedDealError: true,
      method: 'POST',
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
          let { param, to } = result.popupWindow.buttons[1]
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

export function showModal (instant, e) {
  const { type = '', value = '', selectItem = {} } = e.detail;
  const modalData = {
    sortModal: false,
    categoryModal: false
  }
  switch (type) {
  case 'categoryModal':
    modalData.categoryModal = value;
    // 埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'unfoldDisplayFilter',
      click_par: {
        bizType: selectItem.bizType,
        filterName: selectItem.filterName,
        status: value ? 1 : 0,
        couponId: instant.data.couponId,
        keyword: instant.data.keyword
      },
      pageId: instant.data.recommendObj.pageIdFirstPage || '',
      currentPageName: instant.data.recommendObj.currentPageName || '',
      prePageName: instant.data.recommendObj.prePageName || ''
    })
    break;
  case 'sortModal':
    modalData.sortModal = value;
    break;
  default:
    break;
  }
  instant.setData({
    ...modalData
  })
}

export function onDefaultBtnEvent (instant, e) {
  let { type } = e.detail
  if (type == 1) {
    instant.getGoodsList()
  }
}

