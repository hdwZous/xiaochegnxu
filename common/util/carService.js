/*
* _UPDATEGOODSNUM 同步更新页面的商品数量的统一使用的方法名
*/

/* eslint-disable */
import { request, FNIDS } from "./api";

// 循环当前页面栈,加减车时通知需要更新商品数量的页面栈
export const updatePageNums = function (info) {
  return new Promise(() => {
    let pages = getCurrentPages();
    let currentPage = pages.slice(pages.length - 1)
    pages = pages.reverse()
    if (pages.length && info.type && (info.type == 'clear' || info.type == 'add' || info.type == 'min')) {
      pages.forEach((item) => {
        if (item && item._UPDATEGOODSNUM !== undefined) {
          item._UPDATEGOODSNUM(info);
        }
      });
    } else if (currentPage.length && info.type == 'showModel') {
      currentPage[0]._UPDATEGOODSNUM(info);
    }
  });
};

/** 
* @param: that: 当前页面的this; lists: 需求更新数量的list列表; 
          info: 加减车时通知到需要更新页面的商品信息; back: 是否需要回传更新下标的 标识
          updateStr: 局部更新字符串
* @return {}
*/
export const updateGoodsNum = function (that, lists = [], info, updateStr) {
  return new Promise((resolve) => {
    let instr, spustr, weightstr, returnArr = [];
    let { type, data } = info
    if (type && type == "clear") {
      let goodsList = lists
      goodsList.map(skuItem => {
        if (skuItem.activityId && skuItem.cartNum) {
          // 套装
          skuItem.cartNum = 0
        } else if (skuItem.incartCount || skuItem.spuCartCount) {
          skuItem.incartCount = 0
          skuItem.spuCartCount = 0
          skuItem.cartWeight = null
        }
      })
      that.setData({
        [updateStr]: goodsList
      })
    } else if (type && (type == 'add' || type == 'min')) {
      lists.map((skuItem, index) => {
        if (skuItem.activityId) {
          // 套装
          if (data.activityId && skuItem.activityId == data.activityId) {
            instr = `${updateStr}[${index}].cartNum`;
            returnArr.push({isCombination: true, activityId: skuItem.activityId || '', cartNum: data.cartNum || 0, ids: index})
            that.setData({
              [instr]: data.cartNum || 0
            })
          }
        } else if (skuItem.showModel == 1) {
          //多规格商品
          if (data.spuId && skuItem.spuId == data.spuId) {
            spustr = `${updateStr}[${index}].spuCartCount`;
            weightstr = `${updateStr}[${index}].cartWeight`;
            returnArr.push({isSpu: true, skuId: skuItem.skuId || '', spuId:skuItem.spuId || '', spuNum: data.spuNum || 0, ids: index})
            that.setData({
              [spustr]: data.spuNum || 0,
              [weightstr]: data.cartWeight || null
            })
          }
        } else {
          // sku商品
          if (data.skuId && skuItem.skuId == data.skuId) {
            returnArr.push({isSku: true, skuId: skuItem.skuId || '', spuId:skuItem.spuId || '', cartNum: data.cartNum || 0, ids: index})
            instr = `${updateStr}[${index}].incartCount`;
            weightstr = `${updateStr}[${index}].cartWeight`;
            that.setData({
              [instr]: data.cartNum || 0,
              [weightstr]: data.cartWeight || null
            })
          }
        }
      });
    }
    // 假如需求回传匹配到的列表数组
    resolve(returnArr)
  });
};


/* 加减车接口相关 */

/* 修改购物车商品数量 
storeId、orgCode为必传项
*/
export const _changeItemNum = function (params, pageId = '') {
  let {functionId, appVersion} = FNIDS.cartControl
  return request({
    functionId,
    method: 'POST',
    isNeedDealError: true,
    body: {
      fromSource: 5,
      chgNumReturnType: 0,
      positionType: "2",
      ...params
    },
    appVersion,
    pageId
  })
}

/* 减车-移除当前购物车单个商品 */
export const _removeCart = function (params, pageId = '') {
  let {functionId, appVersion} = FNIDS.removeCart
  return request({
    functionId,
    isNeedDealError: true,
    body: {
      "fromSource": 5,
      "isAdd": false,
      "positionType": "2",
      cartOpenFlag: true,
      ...params
    },
    appVersion,
    pageId
  })
}

/* 删除赠品 */
export const _deleteGift = function (params, pageId = '') {
  let {functionId, appVersion} = FNIDS.removeGifts
  return request({
    functionId,
    appVersion,
    isNeedDealError: true,
    method: 'POST',
    body: {
      "fromSource": 5,
      "chgNumReturnType": 0,
      cartOpenFlag: true,
      ...params
    },
    pageId
  })
}

/* 查询购物车数据 */
export const _getSingleCart = function (params, pageId = '') {
  let {functionId, appVersion} = FNIDS.querySingleCart
  return request({
    functionId,
    appVersion,
    pageId,
    method: 'POST',
    isNeedDealError: true,
    body: {
      "chgNumReturnType": 0,
      "isAdd": false,
      "positionType": "2",
      "fromSource": 5,
      cartOpenFlag: true,
      ...params
    },
  })
}

/* 结算页添加赠品 */
export const _addGiftsMulti = function (params, pageId = '') {
  let { lat = '', lng = '', orgCode = '', storeId = '', multiInputGiftVoList = [] } = params
  let {functionId, appVersion} = FNIDS.addGiftsSupportMultiSkus
  return request({
    functionId,
    appVersion,
    method: 'POST',
    body: {
      storeId,
      orgCode,
      lat,
      lng,
      multiInputGiftVoList,
      fromSource: 5,
      cartOpenFlag: true
    },
    pageId
  })
}

/* 一键加购今日商品 */
export const _addTodaySku = function (params, pageId = '') {
  let {functionId, appVersion} = FNIDS.akeyPurchased
  return request({
    functionId,
    appVersion,
    method: 'POST',
    pageId,
    body: {
      fromSource: 5,
      cartOpenFlag: true,
      ...params
    }
  })
}

/* 处理购物车接口数据 */
export const _dealResults = function (result) {
  let isSelectAll = true;
  let isSelectAllDisabled = true;
  let itemList = result.itemList || [];
  let invalidData = new Array()
  // 购物车气泡
  let couponDesc = result.couponDesc ? result.couponDesc : ''
  // 8.2 新增待领取的券活动code列表，进入结算页时进行领取
  let grabCouponList = result.unGrabCouponActivityCodeList ? result.unGrabCouponActivityCodeList : []
  // 去凑单tips展示处理
  let { hasCouponsTips, discountTipInfo, discountTipStr } = _dealAddOn(result)
  // 优惠券弹层置顶参数
  let couponListReuqestParam = _dealCouponPop(result)
  // 隐藏删除全部商品入口（购物车中只有失效商品的时候需要）
  let hideRemoveAllGoodsEntryFlag = _resetRemoveAllGoodsEntry(itemList)
  // 处理列表数据
  if (itemList.length > 0) {
    itemList.forEach((item) => {
      // 判断是否存在singleGiftMap字段,且不为空，处理sku赠品逻辑
      if (item.singleGiftMap && Object.keys(item.singleGiftMap).length) {
        _dealSkuGift(item)
      }
      if (item.suitType == 'invalidate') {
        invalidData.push(item)
      }
      // 描述
      item.suitDescrip = item.suitDescrip ? item.suitDescrip.toString() : ''
      // 商品
      if (item.suitType == 'combination') {
        if (!item.combinationSkuInfo.checkType) {
          isSelectAll = false
        }
        isSelectAllDisabled = false
      } else {
        let skuList = item.skuList || [];
        skuList.forEach(subItem => {
          // 无货checkType 设置为2
          if (subItem.skuState == '0' || subItem.skuState == '2') {
            subItem.checkType = 2
          } else {
            isSelectAllDisabled = false;
          }
          if (subItem.checkType === 0) {
            isSelectAll = false
          }
          // lmy 店内搜索多规格的数量  
          subItem.spuNum = result.spuNumMap[subItem.spuId]
        });
      }
    });
  }
  return { 
    couponDesc,
    invalidData,
    isSelectAll,
    isSelectAllDisabled,
    grabCouponList,
    hasCouponsTips, 
    discountTipInfo, 
    discountTipStr,
    couponListReuqestParam,
    hideRemoveAllGoodsEntryFlag
  }
}

const _dealAddOn = function (cartData) {
  let hasCouponsTips = false
  let { discountTipInfo = null } = cartData
  let discountTipStr = ''
  if (discountTipInfo) {
    hasCouponsTips = (discountTipInfo.discountTips && discountTipInfo.discountTips.length > 0)
    if (discountTipInfo.discountTips) {
      discountTipInfo.discountTips.map(item => {
        discountTipStr += item.desc
      })
    }
  }
  return { hasCouponsTips, discountTipInfo, discountTipStr }
}

const _dealCouponPop = function (result) {
  let { grabCouponEntranceInfo = {} } = result
  return grabCouponEntranceInfo
}

const _resetRemoveAllGoodsEntry = function (list) {
  let hideFlag = true;
  list && list.forEach(item => {
    if (item.suitType != 'invalidate') {
      hideFlag = false;
    }
  })
  return hideFlag
}

const _dealSkuGift = function (data) {
  data.skuList.map(item => {
    if (data.singleGiftMap[item.skuId]) {
      item.giftMap = data.singleGiftMap[item.skuId]
    }
  })
}

export const _getCartInfo = function (that, goodList, skuId, cartNum) {
  let cartInfo = { cartWeight: '0g', cartNum: '0' };
  if (goodList && goodList.length && cartNum) {
    goodList.find((item) => {
      if (
        item.suitType !== "invalidate" &&
        item.suitType !== "combination"
      ) {
        return item.skuList && item.skuList.find((subItem) => {
          if (subItem.skuId == skuId) {
            return ( cartInfo = {
              cartWeight: subItem.showInfoOnChangeNum || '0g',
              cartNum: subItem.cartNum
            });
          }
        });
      }
    });
  } else {
    cartInfo = { cartWeight: '0g', cartNum: '0' };
  }
  return cartInfo;
}
