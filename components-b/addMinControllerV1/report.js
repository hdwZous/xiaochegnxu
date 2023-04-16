import { clickBuriedV2_ } from "../../common/util/BI";
const reportBuried = function (click_id) {
  let params = {}, click_par = {};
  switch (this.data.biPageName) {
  // mini购物车
  case "mini_shopcar":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      activityId: this.data.activityId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
    };
    break;
    // 运费立减落地页
  case "freightReductionPage":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
    };
    break;
    // 凑单/券/运费 落地页
  case "PieceTogether":
  case "collectOrderSearchResult":
  case "collectOrder":
  case "ScrapFreight":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      couponId: this.data.couponId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
    };
    break;
    // 全局搜索结果页
  case "storeSearchResultGlobal":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      keyword: this.data.keyword,
      traceId: this.data.traceId,
    };
    break;
    // 店内搜索结果页
  case "store_search":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      keyword: this.data.keyword,
      traceId: this.data.traceId,
    };
    break;
    // 活动页/店内活动页
  case "activity":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      activityId: this.data.biActivityId,
      traceId: this.data.traceId,
    };
    break;
    // 新券购/券购搜索页
  case "NewCouponBuy":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      couponId: this.data.couponId,
      userAction: this.data.userAction,
      keyword: this.data.keyword,
      traceId: this.data.traceId,
    };
    break;
  case "storeinfo":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
      tab_name: this.data.tabName,
    };
    break;
  case "StoreHomeActivity":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      floor_code_name: this.data.floorCodeName,
      // activityId: this.data.biActivityId,
      // traceId: this.data.traceId,
    };
    break;
  case "goodsinfo":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
      goodProcessing:
        this.data.transmitData && this.data.transmitData.goodProcessing ? 1 : 0,
      type: this.data.addCartText == '立即购买' ? 'buyNow' : "addCart",
      is_spu: !!this.data.showModel,
      activityId: this.data.activityId || ""
    };
    break;
  case "shopcar":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
    };
    break;
  case "feedRecGoods":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      userAction: this.data.userAction,
      traceId: this.data.traceId,
    };
    break;
  case "couponTogether":
    params = {
      storeId: this.data.storeId,
      skuId: this.data.skuId,
      spuId: this.data.spuId,
      userAction: this.data.userAction,
    };
    break;
  default:
    break;
  }

  click_par= resolveEmpty(params)
  if (!Object.keys(click_par).length) return
  clickBuriedV2_({
    create_time: new Date(),
    click_id,
    click_par,
    currentPageName: this.data.currentPageName,
    prePageName: this.data.prePageName,
    pageId: this.data.pageId
  })
};

const resolveEmpty = function (params) {
  let newObj = {}
  Object.keys(params).forEach(item => {
    if (params[item] !== '' && params[item] !== null && params[item] !== undefined) {
      newObj[item] = params[item]
    }
  })
  return newObj
};

export default reportBuried;
