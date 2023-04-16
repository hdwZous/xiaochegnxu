import {
  isLogin
} from './loginUtil'
import mp from './wxapi'
import {
  agreementAppIdMap,
  appIdObj
} from './appId';
import { pvLiveBuriedV2_ } from "./BI";
import { toMedicine } from './xcxJumper';
/* eslint-disable  no-case-declarations */


/* eslint-disable camelcase*/
let app = getApp()
let HOST = app.globalData.config.HOST
let addressInfo = app.globalData.addressInfo || {}
let lat = addressInfo && addressInfo.latitude || ''
let lng = addressInfo && addressInfo.longitude || ''
// 小程序cms跳转协议
const mpCmsPath = {
  // 首页
  p1: {
    isNeedLogin: true,
    path: "/pages/home/home"
  },
  // 轻松购
  p2: {
    isNeedLogin: false,
    path: "/pages/tabBar/easyGo/easyGo"
  },
  // 订单
  p3: {
    isNeedLogin: false,
    path: "/pages/tabBar/orderlist/index"
  },
  // 我的
  p4: {
    isNeedLogin: false,
    path: "/pages/tabBar/person/person"
  },
  // 领券页
  p5: {
    isNeedLogin: false,
    path: "/pages/exchange/exchange"
  },
  // 超级会员码优惠券领取列表
  p6: {
    isNeedLogin: false,
    path: "/pages/coupon/voucher/index"
  },
  // 超级会员码页（此业务已删除）
  // 'p13': '/pages/person/personcode',
  // 拼团-商品列表
  p14: {
    isNeedLogin: false,
    path: "/pages/groupBuy/groupList/index"
  },
  // 砍价-商品列表
  p15: {
    isNeedLogin: false,
    path: "/pages/bargain/cutGoodList/index"
  },
  // 优惠券列表
  p16: {
    isNeedLogin: false,
    path: "/pages/coupon/person-coupon"
  },
  // 砍价状态详情页
  p17: {
    isNeedLogin: false,
    path: "/pages/bargain/launch/index"
  },
  // 门店内活动落地页
  p18: {
    isNeedLogin: false,
    path: "/pages/activity/store/index"
  },
  // h5活动页
  p19: {
    isNeedLogin: false,
    path: "/pages/h5/index"
  },
  // 门店页
  p20: {
    isNeedLogin: false,
    path: "/pages/store/index"
  },
  // 频道页
  p21: {
    isNeedLogin: false,
    path: "/pages/channel/channel"
  },
  // 活动页
  p22: {
    isNeedLogin: false,
    path: "/pages/activity/homeFocus/index"
  },
  // 搜索页
  p23: {
    isNeedLogin: false,
    path: "/pages/searchAbout/search/search"
  },
  // 分享有礼规则页
  p24: {
    isNeedLogin: false,
    path: "/pages/inviteFriends/index"
  },
  // 0元抽奖
  p25: {
    isNeedLogin: false,
    path: "/pages/lottery/list/index"
  },
  // 0元抽奖-详情页
  p26: {
    isNeedLogin: false,
    path: "/pages/lottery/detail/index"
  },
  // 我的老带新团详情页
  p27: {
    isNeedLogin: false,
    path: "/pages/groupBuy/oldInviteNew/result/index"
  },
  // 拼团-详情页
  p28: {
    isNeedLogin: false,
    path: "/pages/groupBuy/groupBuyDetail/index"
  },
  // 单品详情页（单品详情再门店页里）| 3.3.1改版 商品详情页独立
  p30: {
    isNeedLogin: false,
    path: "/pages/product/index"
  },
  // 门店获客页
  p31: {
    isNeedLogin: false,
    path: "/pages/getCustomers/index"
  },
  // p33:达达小程序
  p33: {
    isNeedLogin: false,
    path: "/pages/index/index?channel=JDDJ_mini_program"
  },
  // p34:黄油拼购小程序
  p34: {
    isNeedLogin: false,
    path: "/pages/home/dashboard/index?channel=JDDJ_mini_program"
  },
  // 分享有礼
  p36: {
    isNeedLogin: false,
    path: "/pages/shareGift/shareGift"
  },
  // 瓜分步数主页
  p38: {
    isNeedLogin: false,
    path: "/pages/stepNumberSub/step/index"
  },
  // 早起打卡页
  p39: {
    isNeedLogin: false,
    path: "/pages/punch-t/home/index"
  },
  // 好友助力列表
  p40: {
    isNeedLogin: false,
    path: "/pages/friendHelp/list/index"
  },
  // 鲜豆庄园
  p41: {
    isNeedLogin: false,
    path: "/pages/bean-t/index"
  },
  // 鲜豆兑换
  p42: {
    isNeedLogin: false,
    path: "/pages/beansExchange-t/exchangeList/index"
  },
  // 天天送蛋
  p43: {
    isNeedLogin: false,
    path: "/pages/farm-t/home/index"
  },

  p44: {
    isNeedLogin: false,
    path: "/pages/sc-index/index?channel=JDDJ_mini_program"
  },
  // 砍价助力页
  // p45: {
  //   isNeedLogin: false,
  //   path: "/pages/bargain/fuel/index",
  // },
  p45: {
    isNeedLogin: false,
    path: "/pages/bargain-t/detail/index"
  },
  // 新版签到
  p46: {
    isNeedLogin: true,
    path: "/pages/tabBar/signIn-t/index"
  },
  // 门店共赢
  p47: {
    isNeedLogin: false,
    path: "/pages/storeWin/index"
  },
  // 引导关注公众号 (无页面路径，button按钮类型控制)
  p48: true,
  // 微常准活动页
  p49: {
    isNeedLogin: false,
    path: "/pages/weBank/index"
  },
  // 话费
  p50: {
    isNeedLogin: false,
    path: "/pages/phoneCharge-t/index"
  },
  // 订单详情页面
  p51: {
    isNeedLogin: false,
    path: "/pages/order/orderdetail/index"
  },
  // 付费会员
  p52: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/home/index"
  },
  // 直播
  p53: {
    isNeedLogin: false,
    path: "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin"
  },
  // 步步赚主页
  p54: {
    isNeedLogin: false,
    path: "/pages/stepNumberSub/stepNumber/stepNumber"
  },
  // 多门店搜索
  p55: {
    isNeedLogin: false,
    path: "/pages/searchAbout/search-result-new/index"
  },
  // 新版登录页
  p56: {
    isNeedLogin: false,
    path: "/pages/newLogin/login/login"
  },
  // 新人落地页
  p57: {
    isNeedLogin: true,
    path: "/pages/newer/index"
  },
  // 直播列表页
  p58: {
    isNeedLogin: false,
    path: "/pages/live/list/index"
  },
  // 秒杀页
  p59: {
    isNeedLogin: false,
    path: "/pages/seckill/index"
  },
  // 异业合作 兑换码
  p60: {
    isNeedLogin: false,
    path: "/pages/differentIndustry-t/exchangePage/index"
  },
  // 异业合作 无兑换码
  p61: {
    isNeedLogin: false,
    path: "/pages/differentIndustry-t/index"
  },
  // 门店更多优惠券页
  p62: {
    isNeedLogin: false,
    path: "/pages/store/subPage/couponMore/index"
  },
  // 门店商品促销落地页
  p63: {
    isNeedLogin: false,
    path: "/pages/store/subPage/promotionList/index"
  },
  p64: {
    isNeedLogin: true,
    path: "/pages/friendHelp/launch/index"
  },
  // 券购门店商品列表页
  p65: {
    isNeedLogin: false,
    path: "/pages/purchTicket/purchTickets/purchTickets"
  },
  // 券购门店列表页
  p66: {
    isNeedLogin: false,
    path: "/pages/purchTicket/purchTicketsStoreList/storeList"
  },
  // 门店 套装落地页
  p67: {
    isNeedLogin: false,
    path: "/pages/store/subPage/suitList/index"
  },
  p68: {
    isNeedLogin: true,
    path: "/pages/purchTicket/couponGo/index"
  },
  // 附近门店列表
  p69: {
    isNeedLogin: false,
    path: "/pages/nearbyStore/index"
  },
  // 搜索中间页面
  p70: {
    isNeedLogin: false,
    path: "/pages/searchAbout/search/search"
  },
  // 新频道页面
  p71: {
    isNeedLogin: false,
    path: "/pages/channelNew/index"
  },
  // 推荐商品落地页
  p72: {
    isNeedLogin: false,
    path: "/pages/recommendSkuPage/recommendSkuPage"
  },
  // 促销落地页
  p73: {
    isNeedLogin: false,
    path: "/pages/addOn/landPage/collectOrderList/index"
  },
  // 去凑单商品列表页面
  p74: {
    isNeedLogin: false,
    path: "/pages/addOn/addOnList/index"
  },
  // 运费促销凑单页
  p75: {
    isNeedLogin: false,
    path: "/pages/addOnFreight/freight/index"
  },
  // 新领券页
  p76: {
    isNeedLogin: false,
    path: "/pages/getCoupon-t/index"
  },
  // 把欢乐带回家游戏
  p77: {
    isNeedLogin: false,
    path: "/pages/brandLoveHome/index/index"
  },
  // 修改订单
  p78: {
    isNeedLogin: true,
    path: "/pages/order/revise/index"
  },
  p79: {
    isNeedLogin: true,
    path: "/pages/cash-t/index"
  },
  // 果园跳转
  p80: {
    isNeedLogin: true,
    path: "/pages/orchard-t/index"
  },
  // feed中间页面
  p81: {
    isNeedLogin: true,
    path: "/pages/landpage/feed/index"
  },
  // 异业合作 领券落地页
  p82: {
    isNeedLogin: false,
    path: "/pages/differentIndustry-t/home/cooperateDetail/index"
  },
  // 社群红包落地页
  p83: {
    isNeedLogin: false,
    path: "/pages/communityRedpack/index"
  },
  // 新人楼层落地页--8.12
  p85: {
    isNeedLogin: false,
    path: "/pages/newUser-t/index"
  },
  // 我的关注页
  p87: {
    isNeedLogin: true,
    path: "/pages/personSecond/store/index"
  },
  // 我的地址页
  p88: {
    isNeedLogin: true,
    path: "/pages/address/home/index"
  },
  // 结算页
  p89: {
    isNeedLogin: true,
    path: "/pages/settlementV2/index"
  },
  // 砍价列表
  p90: {
    isNeedLogin: false,
    path: "/pages/bargain-t/list/index"
  },
  // 首单裂变
  p91: {
    isNeedLogin: false,
    path: "/pages/firstOrderFission-t/launch/index"
  },
  p92: {
    isNeedLogin: false,
    path: "/pages/couponTogether/index"
  },
  // 新人楼层落地页--8.16
  p93: {
    isNeedLogin: false,
    path: "/pages/newPerson-t/index"
  },
  // 会员改版-新会员首页
  p94: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/home/index"
  },
  // 会员改版-会员日
  p95: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/memberDay/index"
  },
  // 新红包雨
  p96: {
    isNeedLogin: false,
    path: "/pages/redPacket-t/index"
  },
  // 新点亮游戏
  p97: {
    isNeedLogin: false,
    path: "/pages/light-t/index"
  },
  // 新独立分包领券页
  p98: {
    isNeedLogin: false,
    path: "/pages/takeCoupon-t/index"
  },
  // 新人落地页Ab-820新增
  p101: {
    isNeedLogin: false,
    path: "/pages/newPersonB-t/index"
  },
  // 会员套餐选择页
  p102: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/packageSelection/index"
  },
  p103: {
    isNeedLogin: false,
    path: "/pages/vipChannel-t/index"
  },
  // 减运落地页
  p104: {
    isNeedLogin: false,
    path: "/pages/settlementV2/subPage/settlementDiscounts/index"
  },
  p105: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/home/index"
  },
  p106: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/packageSelection/index"
  },
  p107: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/memberDay/index"
  },
  p108: {
    isNeedLogin: false,
    path: "/pages/vpaymember_t/toVPlusCenterPage/index"
  },
  // 到店门店页
  p109: {
    isNeedLogin: false,
    path: "/pages/toStore/reachStore/index"
  },
  // 到店商详页
  p110: {
    isNeedLogin: false,
    path: "/pages/toStore/reachDetails/index"
  },
  // 优惠券落地页-taro
  p111: {
    isNeedLogin: false,
    path: "/pages/myCoupons/index"
  }
};

// 到家cms跳转协议
const djCmsPath = {
  // 首页
  home: "p1",
  // 单品详情页
  productDetail: "p30",
  // 门店页
  store: "p20",
  // 订单列表
  orderList: "p3",
  // 活动页
  activityDetail: "p22",
  // 订单详情页面
  orderDetail: "p51",
  // 频道页
  channelPage: "p21",
  // 优惠券列表
  myCoupon: "p16",
  // 多门店搜索
  storeListByKey: "p55",
  // 跳转我的仙豆
  freshBean: "p19",
  web: "p19",
  // 门店活动页
  storePromotion: "p18",
  // 门店活动页
  storeActDetail: "p18",
  // 秒杀页
  seckill: "p59",
  // 门店更多优惠券页
  storeAllCoupons: "p62",
  promotionPage: "p63",
  // 券购商品列表
  goodsList: "p65",
  // 券购门店列表页
  storeList: "p66",
  layerPromotion: "p67",
  // 直播间
  weChatLive: "p53",
  // 神券页
  couponGoodsList: "p68",
  // 附近门店列表
  channelStorePage: "p69",
  // 全局搜索
  searchTransitPage: "p70",
  // 新频道页面
  newChannelPage: "p71",
  // 推荐商品落地页
  recommendSkuPage: "p72",
  // 促销落地页
  cartGoodPage: "p73",
  // 去凑单商品列表页面
  scrapGoods: "p74",
  // 运费促销凑单页
  ScrapFreightType: "p75",
  // 修改订单页面
  orderModify: "p78",
  // feed中间页面
  feedRecGoods: "p81",
  // 异业合作落地页
  cooperateDetail: "p82",
  // 社群红包落地页
  communityRedpack: "p83",
  // 线上加群页
  groupPage: "p84",
  // 新人楼层落地页--8.12,
  newUser: "p85",
  // 我的关注页
  concern: "p87",
  // 我的关注页
  address: "p88",
  // 结算页
  Settlement: "p89",
  // 首单裂变
  firstOrderFission: "p91",
  // 券聚合落地页
  promotionGoodsList: 'p92',
  // 新人楼层落地页--8.16,
  newPerson: 'p93',
  // 新人楼层落地页--8.20,
  newPersonB: 'p101',
  // 商家会员频道页
  vipChannel: 'p103',
  // 减运落地页
  freightReductionPage: 'p104'
};


/**
 * @param Object 跳转参数和埋点信息
 * @return String 页面跳转需要的参数
 */
function parseParams (obj) {
  let userAction = ''
  if (obj.userAction) {
    userAction = encodeURIComponent(obj.userAction)
  }
  let traceId = obj.traceId || "";
  let paramsStr = ''
  for (let i in obj.params) {
    if (i == "isAddCart") {
      let str = obj.params[i] + "";
      obj.params[i] = str == "true" ? true : "";
    }
    // 处理单品单结算，preSaleSkuInfos字段，下发object类型的参数转化为json,string---为了扩展处理所有对象类型
    if (obj.params[i] != null && typeof obj.params[i] == "object") {
      obj.params[i] = JSON.stringify(obj.params[i]);
    }
    paramsStr += "&" + i + "=" + (obj.params[i] || "");
  }
  if (JSON.stringify(obj.params) == "{}") {
    paramsStr = "?userAction=" + userAction + '&traceId=' + traceId;
  } else {
    paramsStr =
      "?" +
      paramsStr.slice(1) +
      "&userAction=" +
      userAction +
      "&traceId=" +
      traceId;
  }
  return paramsStr
}

/**
 * @description 协议:web,跳转到对应页面
 * @param String 协议返回的跳转url
 * @param Object mpCmsPath对象中匹配到的跳转路径
 * @param String 跳转的参数
 * @param String 跳转需要的埋点信息
 */
function webToJump (
  url,
  mpPathMap,
  webUrlParams,
  usAction,
  preObj,
  buried_position
) {
  let userAction = "";
  if (usAction) {
    userAction = encodeURIComponent(usAction);
  }
  // console.log('mpPathMap', mpPathMap)
  // console.log('webUrlParams', webUrlParams)
  if (mpPathMap.path && !url.includes("tomp://")) {
    if (mpPathMap.isNeedLogin && !isLogin()) {
      wx.navigateTo({
        url: `${mpCmsPath["p56"].path}`,
        preObj: preObj,
        buried_position: buried_position
      });
    } else {
      if (mpPathMap.path == mpCmsPath["p46"].path) {
        // 如果是签到页，跳转方式不同
        wx.navigateTo({
          url: `${mpCmsPath["p46"].path}`,
          preObj: preObj,
          buried_position: buried_position
        });
      } else {
        wx.navigateTo({
          url: `${mpPathMap.path}?${webUrlParams}&userAction=${userAction}`,
          preObj: preObj,
          buried_position: buried_position
        });
      }
    }
  } else if (url.includes("toMp-")) {
    // 小程序（到家CMS新的配置）
    // 医药小程序跳转处理
    if (url.indexOf("toMp-medicine") != -1) {
      const params = getUrlParams(webUrlParams);
      toMedicine(params);
      return;
    }
    let mpName = "toMp-" + url.split("-")[1];
    let params = "";
    let path = "";
    if (mpName.indexOf("?") > -1) {
      let mpArr = mpName.split("?");
      mpName = mpArr[0];
      params = mpArr[1];
    }

    if (agreementAppIdMap[mpName].path.indexOf("?") > -1) {
      path = `${agreementAppIdMap[mpName].path}&${params}`;
    } else {
      path = `${agreementAppIdMap[mpName].path}?${params}`;
    }
    wx.navigateToMiniProgram({
      appId: agreementAppIdMap[mpName].appid,
      path: path,
      success: (res) => {
        console.log("跳转成功", res);
      },
      fail: (err) => {
        console.log("跳转失败", err);
      }
    });
  } else if (url.includes("tomp://")) {
    // 小程序（到家CMS新的配置）
    // tomp://wxffb7d80f8c50ac5c/pages/home/home?business=1&channel=2
    try {
      const urlArr = url.split("//")[1].split("/");
      let appId = urlArr.shift();
      let path = urlArr.reduce((a, b) => `${a}/${b}`);
      if (appId && path) {
        wx.navigateToMiniProgram({
          appId,
          path: `/${path}`,
          success: (res) => {
            console.log("跳转成功", res);
          },
          fail: (err) => {
            console.log("跳转失败", err);
          }
        });
      }
    } catch (error) {
      console.error("tomp://,跳转失败", error);
      mp.toast({
        title: "暂不支持"
      });
    }
  } else if (url.includes("https://daojia.jd.com/pavilion")) {
    if (url.indexOf("mtId=2#/") > -1) {
      // 平安银行链接带#/导致打不开
      url = url.replace("#/", "");
    }
    if (url.indexOf("mtId=2#") > -1) {
      // 平安银行链接带#/导致打不开
      url = url.replace("#", "");
    }
    wx.navigateTo({
      url: `${mpCmsPath["p19"].path}?url=${encodeURIComponent(
        url
      )}&${webUrlParams}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else if (url.includes("extendJump") && url.includes("mpPath")) {
    // web url链接通用跳转
    // https://testpdjm.jd.com/pavilion/poseidon/brand_kimberly_girls_day/index.html?extendJump=true&mpPath=pages/brandLoveHome/index/index#/
    let _mpPathStr = webUrlParams.split("&")[0] || "";
    let _mpPath = _mpPathStr.split("=")[1];
    if (_mpPath) {
      if (webUrlParams.indexOf("#/") > -1) {
        // 平安银行链接带#/导致打不开
        webUrlParams = webUrlParams.replace("#/", "");
      }
      if (webUrlParams.indexOf("#") > -1) {
        // 平安银行链接带#/导致打不开
        webUrlParams = webUrlParams.replace("#", "");
      }
      wx.navigateTo({
        url: `/${_mpPath}?${webUrlParams}`,
        preObj: preObj,
        buried_position: buried_position
      });
    }
  } else {
    // 下掉白名单判断逻辑,暂时注释，运行正常后下版本删除 - 2022/12/29
    // let allow = findWhiteListUrl(url);
    // if (allow) {
    jumpOther(url, webUrlParams, userAction, preObj, buried_position);
    // } else {
    //   jumpHome();
    // }
  }
}


/**
 * @description 拦截砍价列表和砍价详情
 * @param String 协议返回的url
 * @return Object mpCmsPath对象中匹配到的跳转路径
 */
function jumpOther (url, webUrlParams, userAction, preObj, buried_position) {
  if (url.includes('bargain/detail/')) { // 砍价详情
    let arr = url.split('bargain/detail/') || []
    let urlParamsStr = ''
    if (arr.length > 1) {
      let data = JSON.parse(decodeURIComponent(arr[1]))
      let tempArr = []
      for (let i in data) {
        let key = encodeURIComponent(i)
        let value = encodeURIComponent(data[i])
        tempArr.push(key + '=' + value)
      }
      urlParamsStr = tempArr.join('&')
    }
    wx.navigateTo({
      url: `${mpCmsPath["p17"].path}?from=cms&${urlParamsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else if (url.includes('bargain/list')) { // 砍价列表
    let paramsStr = url.split('?')[1]
    wx.navigateTo({
      url: `${mpCmsPath["p15"].path}?${paramsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else if (url.includes('bargain-t/list')) { // 砍价列表
    let paramsStr = url.split('?')[1]
    wx.navigateTo({
      url: `${mpCmsPath["p90"].path}?${paramsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else if (url.includes('newVipHome/index')) { // 会员改版 新会员首页
    let paramsStr = url.split('?')[1]
    wx.navigateTo({
      url: `${mpCmsPath["p94"].path}?${paramsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else if (url.includes("vpayMember-t/memberDay/index")) {
    // 会员改版 会员日
    let paramsStr = url.split("?")[1];
    wx.navigateTo({
      url: `${mpCmsPath["p95"].path}?${paramsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else if (url.includes("vpayMember-t/packageSelection/index")) {
    // 会员改版 会员日
    let paramsStr = url.split("?")[1];
    wx.navigateTo({
      url: `${mpCmsPath["p102"].path}?${paramsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  }else if (url.includes("vpaymember_t/packageSelection/index")) {
    // 会员改版 会员日
    let paramsStr = url.split("?")[1];
    wx.navigateTo({
      url: `${mpCmsPath["p106"].path}?${paramsStr}&userAction=${userAction}`,
      preObj: preObj,
      buried_position: buried_position
    });
  } else {
    // 解决来来推扫码跳转错误(通过检测%区分是否进行编码/解码) - 2022年09月07日
    let domain = url ? url.split('?')[0] : [];
    if(domain && domain.length && !domain.includes('%')) {
      url = encodeURIComponent(url)
    }
    wx.navigateTo({
      url: `${mpCmsPath["p19"].path}?url=${url}&${webUrlParams}&userAction=${encodeURIComponent(userAction)}`,
      preObj: preObj,
      buried_position: buried_position
    });
  }
}


/**
 * @description 根据传入url,找到对应的小程序页面路径
 * @param String 协议返回的url
 * @return Object mpCmsPath对象中匹配到的跳转路径
 */
function findMpPath (url) {
  if (url.includes('/pages/GroupBuy/Detail/index')) { // 拼团h5和小程序链接不一样，这里拦截处理。
    url.replace(/\/pages\/GroupBuy\/Detail\/index/, mpCmsPath['28'].path)
  }
  if (url.includes('pavilion/poseidon/bamboo/brand_love_home/index.html')) {// 把欢乐带回家游戏，h5和小程序地址名不一样情况，这里拦截处理。
    url = 'https://daojia.jd.com/pavilion/poseidon/pages/brandLoveHome/index/index'
  }
  let mpUrlObj = {}
  for (let key in mpCmsPath) {
    if (url.includes(mpCmsPath[key].path)) {
      mpUrlObj = mpCmsPath[key]
    }
  }
  return mpUrlObj
}

function getActivePage () {
  const curPages = getCurrentPages();
  if (curPages.length) {
    return curPages[curPages.length - 1];
  }
  return {};
}

function jumpHome () {
  mp.toast({
    title: '暂不支持该功能，请下载京东到家APP使用!'
  })
  const {
    route
  } = getActivePage();
  if (route !== 'pages/home/home') {
    setTimeout(() => {
      wx.switchTab({
        url: mpCmsPath['p1'].path
      })
    }, 2000)
  }
}
/**
 * @param type 页面类型 pages
 * @param params url参数
 */
function djCmsJump (obj, isRedirect = false) {
  const myNavigate = wx[isRedirect ? 'redirectTo' : 'navigateTo'].bind(wx)
  let { to = "", params = {} } = obj;
  let JdMiniPath = getJdMiniPath(to);
  let type = djCmsPath[to];
  let pageUrl = "";
  // to == "storeAllCoupons" &&params.fromPop == 'old'临时处理方式，为了门店优惠券列表页，只有新优惠券半弹层才跳小程序化的落地页
  if (
    JdMiniPath &&
    JdMiniPath.url
  ) {
    if(to == "storeAllCoupons" &&
    params.fromPop == "old") {
      pageUrl = (mpCmsPath[type] && mpCmsPath[type].path) || "";
    } else {
      // 京东小程序化配置内存在，优先走配置内页面
      pageUrl = JdMiniPath.url;
      params = JdMiniPath.params && Object.assign(params, JdMiniPath.params);
    }
  } else {
    // 跳转门店并且是到店门店页
    if (params.bgType && params.bgType == 'jdToStore') {
      if (to == 'store') {
        pageUrl = mpCmsPath['p109'].path || ""
      } else if (to === 'productDetail') {
        pageUrl = mpCmsPath['p110'].path || ""
      } else {
        pageUrl = (mpCmsPath[type] && mpCmsPath[type].path) || "";
      }
    } else {
      pageUrl = (mpCmsPath[type] && mpCmsPath[type].path) || "";
    }
  }

  switch (to) {
  // tabBar页面
  case "home":
  case "orderList":
    wx.switchTab({
      url: pageUrl
    });
    break;
    // 单品详情
  case "productDetail":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}&latitude=${lat}&longitude=${lng}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 活动详情页
  case "activityDetail":
    myNavigate({
      url: `${pageUrl}${parseParams(
        obj
      )}&latitude=${lat}&longitude=${lng}&cityId=${cityId}&userAction=${
        obj.userAction
      }&traceId=${obj.traceId}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 门店页
  case "store":
    // eslint-disable-next-line no-case-declarations
    let isShowGoodsDetail =
        obj.params.isShowGoodsDetail != undefined || false;
    if (isShowGoodsDetail) {
      myNavigate({
        url: `${pageUrl}${parseParams(obj)}`,
        preObj: obj.preObj,
        buried_position: obj.buried_position
      });
    } else {
      // console.log(222,obj)
      myNavigate({
        url: `${pageUrl}${parseParams(
          obj
        )}&isShowGoodsDetail=${isShowGoodsDetail}&longitude=${lng}&lalngtitude=${lat}`,
        preObj: obj.preObj,
        buried_position: obj.buried_position
      });
    }
    break;
    // 我的关注门店页
  case "concern":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 我的地址页
  case "address":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 订单详情页
  case "orderDetail":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 频道页
  case "channelPage":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}&title=商家列表`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 多门店搜索（全局搜索）
  case "storeListByKey":
    myNavigate({
      url: `${pageUrl}?name=${
        params.keyWords || params.name || ""
      }&userAction=${obj.userAction}&orgCode=${
        params.orgCode || ""
      }&storeId=${params.storeId || ""}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 全局搜索（新频道页面）
  case "searchTransitPage":
    myNavigate({
      url: `${pageUrl}?channelType=${params.channelType}&searchKey=${
        params.searchWords || ""
      }&fromSource=newChannel&channelBusiness=${
        params.channelBusiness
      }&channelId=${params.channelId}&userAction=${obj.userAction}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 新频道页面
  case "newChannelPage":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}&userAction=${obj.userAction || ""}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 推荐商品落地页
  case "recommendSkuPage":
    // eslint-disable-next-line no-case-declarations
    const {
      tagId = "",
      tagIds = "",
      title = "",
      channelId = "",
      floorId = ""
    } = params;
    myNavigate({
      url: `${pageUrl}?tagId=${tagId}&tagIds=${tagIds}&title=${title}&channelId=${channelId}&floorId=${floorId}&userAction=${obj.userAction}&traceId=${obj.traceId}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // feed中间页
  case "feedRecGoods":
    // eslint-disable-next-line no-case-declarations
    const {
      skuId = "",
      storeId = "",
      orgCode = "",
      userAction = ""
    } = params;
    myNavigate({
      url: `${pageUrl}?skuId=${skuId}&storeId=${storeId}&orgCode=${orgCode}&userAction=${userAction}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 异业领券落地页
  case "cooperateDetail":
    // eslint-disable-next-line no-case-declarations
    const {
      loginToken = "",
      popup = "",
      second = "",
      edisonid = "",
      fromid = "",
      business = "",
      cityId = "",
      latitude = "",
      longitude = ""
    } = params;
    myNavigate({
      url: `${pageUrl}?loginToken=${loginToken}&popup=${popup}&second=${second}&edisonid=${edisonid}&fromid=${fromid}&business=${business}&latitude=${latitude}&longitude=${longitude}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 我的优惠券列表
  case "myCoupon":
    myNavigate({
      url: `${pageUrl}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
    // 我的仙豆
  case "freshBean":
    // eslint-disable-next-line no-case-declarations
    let jumpUrl = `https://${HOST}/html/vue/index.html#integral`;
    myNavigate({
      url: `${pageUrl}?needToken=1&url=${encodeURIComponent(jumpUrl)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "storePromotion":
  case "storeActDetail":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "seckill":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "storeAllCoupons":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "promotionPage":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "layerPromotion":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "goodsList":
    myNavigate({
      url: `${pageUrl}?stationNo=${params.storeId || ""}&couponId=${
        params.limitId || ""
      }&orgCode=${params.orgCode || ""}&userAction=${userAction || ""}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "storeList":
    myNavigate({
      url: `${pageUrl}?latitude=${params.latitude}&longitude=${
        params.longitude
      }&stationNo=${params.storeId || ""}&promotionInfoId=${
        params.limitId || ""
      }&orgCode=${params.orgCode || ""}&jumpType=${
        params.jumpType || ""
      }&userAction=${obj.userAction || ""}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "couponGoodsList":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "weChatLive":
    // eslint-disable-next-line no-case-declarations
    let liveUrl = params.weChatLiveRoomUrl || "";
    // eslint-disable-next-line no-case-declarations
    let liveUrlParams = "";
    let urlParamsArr = [];
    let room_id = "";
    if (liveUrl.includes("?")) {
      liveUrlParams = `${liveUrl.split("?")[1]}`;
      urlParamsArr = liveUrlParams.split("&");
      urlParamsArr.forEach((item) => {
        if (item.includes("room_id")) {
          room_id = item.split("=")[1];
        }
      });
    }
    myNavigate({
      url: `${pageUrl}?room_id=${room_id}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position,
      success () {
        // pv埋点
        setTimeout(() => {
          pvLiveBuriedV2_({
            create_time: new Date(),
            livePath:
                "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin",
            livePageName: "liveplayer",
            currentPageName: "liveplayer",
            prePageName: obj.preObj && obj.preObj.currentPageName,
            page_par: {
              roomid: params.room_id
            }
          });
        }, 50);
      }
    });
    break;
  case "channelStorePage":
    myNavigate({
      url: `${pageUrl}${parseParams(
        obj
      )}&latitude=${lat}&longitude=${lng}&cityId=${cityId}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "Settlement":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "promotionGoodsList":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "web":
  case "jdWeb":
  case "jdweb":
    // eslint-disable-next-line no-case-declarations
    let url = params.url || "";
    // eslint-disable-next-line no-case-declarations
    let urlParams = "";
    if (url.includes("?")) {
      urlParams = `${url.split("?")[1]}`;
    }
    // eslint-disable-next-line no-case-declarations
    let mpPathMap = findMpPath(url);
    // 跳转链接上增加traceId
    let traceId = obj.traceId || "";
    if (traceId) {
      urlParams += "&traceId=" + traceId;
    }
    webToJump(
      url,
      mpPathMap,
      urlParams,
      obj.userAction,
      obj.preObj,
      obj.buried_position
    );
    break;
  case "cartGoodPage":
    myNavigate({
      url: `${pageUrl}?skuIds=${params.skuIds.join(",")}&promotionId=${
        params.promotionId
      }&stationRange=${params.stationRange}&storeId=${
        params.storeId
      }&orgCode=${params.orgCode}&totalPriceValue=${
        params.totalPriceValue
      }&totalSkuCount=${params.totalSkuCount}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "scrapGoods":
    myNavigate({
      url: `${pageUrl}?storeId=${params.storeId}&couponId=${
        params.couponId
      }&priceDiff=${params.priceDiff}&limitType=${params.limitType}&orgCode=${
        params.orgCode || ""
      }&fromPage=${
        params.fromPage && params.fromPage == "settle" ? "settle" : ""
      }&pageSource=${params.pageSource || ""}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "ScrapFreightType":
    myNavigate({
      url: `${pageUrl}?params=${JSON.stringify(params)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "orderModify":
    myNavigate({
      url: `${pageUrl}?orderId=${params.orderId}&orderState=${params.orderState}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "newUser":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "newPerson":
    myNavigate({
      url: `${pageUrl}?${params.paramsStr}&to=${obj.to}&userAction=${obj.userAction}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "newPersonB":
    myNavigate({
      url: `${pageUrl}?${params.paramsStr}&to=${obj.to}&userAction=${obj.userAction}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;

  case "vipChannel":
    myNavigate({
      url: `${pageUrl}?${params.paramsStr}&to=${obj.to}&userAction=${obj.userAction}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "redPacket":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "firstOrderFission":
    myNavigate({
      url: `${pageUrl}${parseParams(obj)}`,
      preObj: obj.preObj,
      buried_position: obj.buried_position
    });
    break;
  case "freightReductionPage":
    // eslint-disable-next-line no-case-declarations
    let param = obj ? JSON.stringify(obj.params) : {};
    myNavigate({
      url: `${pageUrl}?params=${param}`,
      buried_position: obj.buried_position
    });
    break;
  default:
    jumpHome();
    break;
  }
}


/**
 * @param type 页面类型 pages
 * @param params url参数
 */
// let mpCmsJumpFlag = true; // 防止重复点击
function mpCmsJump (obj) {
  // if (!mpCmsJumpFlag) return;
  // mpCmsJumpFlag = false;
  // setTimeout(() => {
  //   mpCmsJumpFlag = true
  // }, 1000)
  let type = obj.pageType || '';
  let params = obj.params || {};
  let pageUrl = '';
  // TODO: 确认是否需要添加try catch
  let jdPageName = getJdPageName(type);
  let JdMiniPath = jdPageName ? getJdMiniPath(jdPageName) : '';
  if (JdMiniPath && JdMiniPath.url) {
    if(type == "p62" && params.fromPop == "old") {
      pageUrl =
      (mpCmsPath[type] && mpCmsPath[type].path) ||
      (appIdObj[type] && appIdObj[type].path) ||
      "";
    } else {
      // 京东小程序化配置内存在，优先走配置内页面
      pageUrl = JdMiniPath.url;
      params = JdMiniPath.params && Object.assign(params, JdMiniPath.params);
    }
  } else {
    if (params.bgType && params.bgType == 'jdToStore') {
      // 跳转门店并且是到店门店页
      if (type == 'p20') {
        pageUrl = mpCmsPath['p109'].path || ""
      } else if (type === 'p30') {
        pageUrl = mpCmsPath['p110'].path || ""
      }
    } else {
      pageUrl =
      (mpCmsPath[type] && mpCmsPath[type].path) ||
      (appIdObj[type] && appIdObj[type].path) ||
      "";
    }
  }
  // 如果type == 0,代表第三方小程序跳转
  let appId = '';
  if (Reflect.has(params, 'appId')) {
    appId = params['appId'];
    pageUrl = params['url'];
    Reflect.deleteProperty(params, 'appId');
    Reflect.deleteProperty(params, 'url');
  }
  if (pageUrl) {
    switch (type) {
    case 'p1': // tabBar页面
    case 'p3':
    case 'p4':
      setTimeout(() => {
        wx.switchTab({
          url: pageUrl
        })
      }, 500)
      break;
    case 'p46':
      setTimeout(() => {
        wx.navigateTo({
          url: pageUrl,
          preObj: obj.preObj,
          buried_position: obj.buried_position
        });
      }, 500)
      break;
    case 'p0': // 第三方小程序跳转
      wx.navigateToMiniProgram({
        appId: appId,
        path: pageUrl
      })
      break;
    case 'p34': // 小程序跳转
    case 'p33':
    case 'p44':
    case 'p99':
    case 'p100':
      // eslint-disable-next-line no-case-declarations
      let str = parseParams(params)
      str = str ? '&' + str.slice(1) : '';
      // eslint-disable-next-line no-case-declarations
      let jumpUrl = appIdObj[type].path + str;
      wx.navigateToMiniProgram({
        appId: appIdObj[type].appid,
        path: jumpUrl
      })
      break;
    case 'p53': // 进入直播

      wx.navigateTo({
        url: `${mpCmsPath["p53"].path}?room_id=${params.room_id}`,
        preObj: obj.preObj,
        buried_position: obj.buried_position,
        success () {
          // getApp().globalData.globalCurrentPageNameObj  ={
          //   currentPageName: 'liveplayer'
          // }
          // pv埋点
          setTimeout(() => {
            pvLiveBuriedV2_({
              create_time: new Date(),
              livePath:
                "plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin",
              livePageName: "liveplayer",
              currentPageName: "liveplayer",
              prePageName: obj.preObj && obj.preObj.currentPageName,
              page_par: {
                roomid: params.room_id
              }
            });
          }, 50);
        }
      });
      break;
    case 'p19': // h5跳转
      // eslint-disable-next-line no-case-declarations
      let url = params.url || ''
      // eslint-disable-next-line no-case-declarations
      let urlParams = ''
      if (url.includes('?')) {
        urlParams = `${url.split('?')[1]}`
      }
      // eslint-disable-next-line no-case-declarations
      let mpPathMap = findMpPath(url)
      webToJump(url, mpPathMap, urlParams, obj.userAction, obj.preObj, obj.buried_position)
      break;
    default:
      // eslint-disable-next-line no-case-declarations
      let mpUrl = pageUrl + '?';
      for (let key in params) {
        mpUrl += `${key}=${params[key]}&`
      }
      wx.navigateTo({
        url: mpUrl,
        preObj: obj.preObj,
        buried_position: obj.buried_position
      });
      break;
    }
  } else {
    jumpHome()
  }
}

function getUrlParams (urlStr) {
  let string = urlStr.split('&');
  let res = {};
  for (let i = 0; i < string.length; i++) {
    let str = string[i].split('=');
    if (str[0] != '') {
      res[str[0]] = str[1];
    }
  }
  return res;
}

// 从缓存security_list中，获取”京东小程序化“页面配置Url；
function getJdMiniPath (to) {
  let securityList = wx.getStorageSync('security_list') ? JSON.parse(wx.getStorageSync('security_list')) : [];
  let target = securityList.find(item => {
    return item.dictCode == 'JDPageConfig';
  })
  if(target) {
    let {dictValue = ''} = target;
    dictValue = JSON.parse(dictValue);
    let JdMiniPath = dictValue[to] || {};
    if(JdMiniPath && JdMiniPath.enable) {
      return JdMiniPath
    }
    return {};
  }
  return {};
}

// 根据type反查djCmsPath对应的pageName
function getJdPageName (type) {
  /* eslint-disable  no-prototype-builtins*/
  let jdPageName = ""
  for (const key in djCmsPath) {
    if (djCmsPath.hasOwnProperty(key)) {
      if(djCmsPath[key] === type) {
        jdPageName = key
        return jdPageName
      }
    }
  }
  return jdPageName
}


export {
  djCmsJump,
  mpCmsJump
}


//  "JDPageConfig":{
//   "myCoupon": {
//       "enable": true,
//     "url": "/pages/myCoupons/index",
//     "params":{'JdTest':1}
//   }}
