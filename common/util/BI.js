import util from './util'
import { encrypt } from './aes.utils'
import versionConfig from './releaseVersion'
//页面映射
const pathUrlMap = {
  "pages/home/home": "home",
  "pages/store/index": "storeinfo",
  // "pages/store/subPage/decadeItemList/index": "storeinfo_reduce_freight_commodity", // 门店落地页
  "pages/tabBar/orderlist/index": "myorderlist",
  "pages/order/orderdetail/index": "myorderdetail",
  "pages/settlementV2/index": "settlementinfo",
  "pages/coupon/person-coupon": "couponsList",
  "pages/searchAbout/search/search": "search", //搜索页
  "pages/searchAbout/search-result-new/index": "search_results", // 新的全局搜索结果页
  "pages/searchAbout/storeSearchResult-new/index": "store_search", // 新的门店搜索结果页
  "pages/channel/channel": "channel",
  "pages/shareGift/shareGift": "sharegift", //分享有礼
  "pages/shareGift/coupon": "invitefriends", //分享拿现金
  "pages/tabBar/easyGo/easyGo": "EasyGoHome", //轻松购首页
  "pages/easyGo/shoppingCart/index": "easygoshopcar", //轻松购购物车
  "pages/easyGo/paySuccess/paySuccess": "EasyGoVerificationCode", //轻松购核验码页
  "pages/easyGo/orderFinish/index": "EasyGoOrderSuccess", //轻松购订单完成页
  "pages/tabBar/person/person": "myinfo",
  "pages/coupon/voucherlist": "voucherlist",
  "pages/coupon/push-coupon": "push_coupon",
  "pages/redPacketFission/redPacketFission": "reward",
  "pages/order/orderstatus/index": "order_status",
  "pages/newLogin/login/login": "login",
  "pages/activity/homeFocus/index": "active",
  "pages/worldcup/index": "worldcup_home", //游戏主页
  "pages/worldcup/select-game": "worldcup_select_game", //选择场次页
  "pages/worldcup/guess-history": "worldcup_guess_history", //竞猜历史页
  "pages/worldcup/cup-coin": "worldcup_cup_coin", //杯币兑换页
  "pages/worldcup/coupon": "worldcup_coupon", //兑换成功页
  "pages/worldcup/add-records": "worldcup_add_records", //加注记录页
  "pages/worldcup/rank": "worldcup_rank", //排行榜
  "pages/worldcup/shared-game": "worldcup_shared", //分享后的加注页
  "pages/order/paySuccess/index": "ordersuccess", //订单支付成功页
  "pages/activity/store/index": "storeactivity", //店内活动
  "pages/groupBuy/groupList/index": "CollageSale", //拼团享优惠
  "pages/groupBuy/groupBuyDetail/index": "CollageGoodsInfo", //拼团详情页
  "pages/groupBuy/paySuccess/index": "CollageResult&&CollagePaySuccess", //参团和拼团结果页
  "pages/groupBuy/join/index": "CollageJoin", //参团页
  "pages/groupBuy/orderInfo/index": "collageorderdetail", //拼团订单详情
  "pages/groupBuy/confirmOrder/index": "CollageOrderConfirm", //拼团确认订单
  "pages/groupBuy/chooseStore/index": "ChangeStoreAddress", //选择门店
  // "pages/groupBuy/collection/myCollection/index": "MyCollageList", //我的拼团列表页
  "pages/groupBuy/collection/myCollectionDetail/index": "CollageOrderInfo", //拼团订单详情页
  "pages/address/home/index": "manage_address", //选择地址页
  "pages/address/search/index": "poi_search_lst", //地址搜索
  "pages/address/map/index": "current_address_list", //地址地图搜索
  "pages/address/createOrEdit/index": "new_address", //新建收货地页
  "pages/other/remarkPage/remarkPage": "OrderNote", //订单备注页
  "pages/order/ordergoods/index": "OrderGoodsList", //商品清单页
  "pages/bargain/fuel/index": "cutdownhelp", // 砍价-帮忙砍价页
  "pages/bargain/cutGoodList/index": "cutdowngoods", //砍价商品列表
  "pages/bargain/launch/index": "cutdowndetail", //发起砍价-详情
  "pages/personSecond/pay-result/pay-result": "ordersuccess_offline", //会员码支付结果页,
  "pages/inviteFriends/index": "sharegift_invite", //分享有礼邀请页
  "pages/personSecond/feedback/feedback": "AdviceNote", //意见反馈
  "pages/medicineMan/choose/index": "drugUserList", //用药人列表页
  "pages/order/addOrRenewMember/index": "ShopMemberPay", //会员卡购买成功页
  "pages/coupon/voucher/index": "getcoupon_offline", //超级会员码领券页
  "pages/coupon/storeList/index": "SelectAddressOffline", //超级会码门店列表页
  "pages/lottery/list/index": "luckyby0list", // 0元和我的抽奖列表页
  "pages/lottery/detail/index": "luckyby0detail", // 0元抽奖详情页
  "pages/lottery/userList/index": "luckyby0userlist", // 0元抽奖用户列表页
  "pages/h5/index": "web", // webView
  // "pages/groupBuy/oldInviteNew/order/index": "MyOldNewCollage", // 我的老带新团,
  "pages/groupBuy/oldInviteNew/detail/index": "OldNewCollageGoodsInfo", //老带新商品详情
  "pages/groupBuy/oldInviteNew/result/index": "OldNewCollageInfoLaunch", //发起者老带新拼团详情
  "pages/groupBuy/oldInviteNew/fuel/index": "OldNewCollageInfoJoin", //卡片老带新拼团详情
  "pages/friendHelp/detail/index": "helpfriendinfo", //好友助力详情
  // "pages/signInLand/index": "APPSignInShare", //APP签到分享页
  "pages/groupBuy/groupOrder/index": "mygroupbuy", //我的拼团订单
  "pages/product/index": "goodsinfo", //单品详情页面
  "pages/buyVip/index": "BuyVip", //购买VIP页面
  "pages/stepNumberSub/stepNumber/stepNumber": "EarnByWalk", //步步赚-首页
  "pages/stepNumberSub/coin/index": "EarnByWalkExchange", //步步赚-兑换明细
  "pages/stepNumberSub/product/detail": "EarnByWalkGoods", //步步赚-商品详情
  "pages/stepNumberSub/step/index": "CollageCraveUpWalks", //步步赚-瓜分步数页
  "pages/stepNumberSub/productList/index": "stepProductList", //步步赚-瓜分步数页
  "pages/newer/index": "newer", //新人落地页
  "pages/weBank/index": "weizhong_activity", // 微常准
  "pages/purchTicket/couponGo/index": "NewCouponBuy", //新券购页
  "pages/purchTicket/purchTicketsStoreList/storeList": "store_list_coupon", //券购门店列表
  "pages/purchTicket/purchTickets/purchTickets": "coupon_buy", //券购商品列表
  "pages/purchTicket/purchTicketSearch/index": "coupon_buySearchResult", //券购商品搜索列表
  "pages/order/shareOrder/orderdetail/index": "order_share_detail", // 订单分享落地页
  "pages/storeWin/index": "couponWinner", //门店共赢页面
  "pages/address/city/index": "city_list", //城市选择
  "pages/appExclusive/index": "appExclusive", //转app落地页
  "pages/live/list/index": "LiveList", //直播列表页
  "pages/channelNew/index": "channel", //新频道页面
  "pages/recommendSkuPage/index": "ChannelRecGoods", // 推荐商品落地页
  "pages/nearbyStore/index": "moreStoreList", // 频道推荐门店落地页
  "pages/shareCard/index": "shareCard", // 推荐商品落地页
  "pages/landpage/feed/index": "feedRecGoods", //feed中间页面
  "pages/personSecond/store/index": "my_favorite", // 我的关注门店落地页
  "pages/order/list/index": "allOrderList", // 全部订单落地页
  "pages/couponTogether/index": "couponTogether", // 券聚合落地页
  "pages/personSecond/setList/index": "set", // 设置
  "pages/personSecond/set/index": "autoDecide", // 个性化设置
  "pages/shopCartList/index": "shopcar", // 全局购物车
  "pages/seckill/index": "seckill_active", //秒杀
  "pages/settlementV2/subPage/settlementDiscounts/index" : 'freightreduction',  //  结算页-减免运费查看更多
  "pages/addOnFreight/freight/index": 'collectFreight', // 凑运费
  "pages/exchange/exchange": 'exchange', // 领券页面
  "pages/store/subPage/couponMore/index": 'StoreCouponPage', // 门店更多优惠券页
  "pages/store/subPage/promotionList/index": 'StoreHomeActivity', // 门店商品促销落地页
  "pages/store/subPage/suitList/index": 'StoreSuitList', // 门店 套装落地页
  "pages/recommendSkuPage/recommendSkuPage": 'ChannelRecGoods',  // 推荐商品落地页
  "pages/addOn/landPage/collectOrderList/index": 'collectOrder', // 促销落地页
  "pages/brandLoveHome/index/index": 'brandLoveHome', // 把欢乐带回家游戏
  "pages/order/revise/index": 'orderModify', // 修改订单
  "pages/communityRedpack/index": 'communityRedpack', // 社群红包落地页
  "pages/addOnFreight/freightSearch/index": "collectFreightSearchResult",//凑运费，搜索
  "pages/addOn/landPage/collectOrderSearch/index": "collectOrderSearchResult", // 凑单搜索结果页
  "pages/addOn/addOnList/index": "PieceTogether", // 去凑券商品列表页面
  "pages/addOn/addOnListSearch/index": "PieceTogetherSearchResult", // 去凑券商品搜索页面

};

//曝光
// ep = [
//     {
//        traceId1: 
//         [
//             {
//                 "spmId":"{\"spm_id\":\"search|1|0|tpl2|1|null|\"
//                 "cnt":1
//             }
//         ]
//     },
//     {
//        traceId2: 
//         [
//             {
//                 "spmId":"{\"spm_id\":\"search|1|0|tpl2|1|null|\"
//                 "cnt":1
//             }
//         ]
//     },
// ]

//处理组件上报上来的数据，超过一定数量就上报
function transferExposureData(par){
  let app =  getApp();
  let traceId = par.traceId
  let userAction =  par.userAction;
  let epArr = app.globalData.epArr
  let globalLogEpObj = app.globalData.globalLogEpObj
  let pageId = par.pageId || ''
  let currentPageName = par.currentPageName || ''
  let prePageName = par.prePageName || ''
  let traceIdIndex = ''
  let lazyObj = par.lazyObj || ''
  let resource_index = 0,resource = '';
  // 埋点
  if(userAction){
    let spm_id = JSON.parse(userAction)['spm_id'] || ''
    if(spm_id){
      resource_index = spm_id.indexOf('|')
      resource =spm_id.slice(0,resource_index) || ''
    }
  }
  if (!traceId ||!userAction ||!pageId || !currentPageName || !prePageName || (!userAction.includes('spm_id'))){
    clickBuriedV2({
      click_id:'test_empty_traceId_0927',
      click_par:{
        traceId,
        userAction,
        pageId,
        currentPageName,
        prePageName,
        resource,
        lazyObj
      },
      currentPageName,
      prePageName,
      pageId
    })
    return false
  }
  // 埋点
  // let obj ={
  //   traceId: '2123434234',
  //   currentPageName:'aa',
  //   prePageName:'bb',
  //   pageId:"1233",
  //   ep:[
  //     {
  //       'spmId': userAction,
  //       'cnt': 1
  //     }
  //   ]
  // }
  var noTraceIdFun = function(globalLogEpObj,traceId,currentPageName,prePageName,userAction,pageId){
    globalLogEpObj['traceId'] = traceId
    globalLogEpObj['currentPageName'] = currentPageName
    globalLogEpObj['prePageName'] = prePageName
    globalLogEpObj['pageId'] = pageId
    globalLogEpObj['create_time'] = new Date()
    globalLogEpObj['clienttime'] = Date.now()
    globalLogEpObj['ep'] = []
    let epItem = {
      'spmId': userAction,
      'cnt': 1
    }
    globalLogEpObj['ep'].push(epItem)
  }
  var hasTraceIdFun = function(globalLogEpObj,traceId,currentPageName,prePageName,userAction,pageId){
    if(!globalLogEpObj['currentPageName']){
      globalLogEpObj['currentPageName'] = currentPageName
    }
    if(!globalLogEpObj['prePageName']){
      globalLogEpObj['prePageName'] = prePageName
    }
    if(!globalLogEpObj['pageId']){
      globalLogEpObj['pageId'] = pageId
    }
    if(!globalLogEpObj['create_time']){
      globalLogEpObj['create_time'] = new Date()
    }
    if(!globalLogEpObj['clienttime']){
      globalLogEpObj['clienttime'] = Date.now()
    }
    let userActionIndex = ''
    userActionIndex =  globalLogEpObj['ep'].findIndex((userActiontem)=>{
      return userActiontem['spmId'] == userAction
    })
    if(userActionIndex == -1){
      let subEpItem = {
        'spmId': userAction,
        'cnt': 1
      }
      globalLogEpObj['ep'].push(subEpItem)
    }else{
      if(globalLogEpObj['ep'][userActionIndex]['cnt'] < 100){
        globalLogEpObj['ep'][userActionIndex]['cnt']++
      }
    }
  }
 
  if(!globalLogEpObj['traceId']){
    noTraceIdFun(globalLogEpObj,traceId,currentPageName,prePageName,userAction,pageId)
  }else if(
    globalLogEpObj['traceId'] == traceId && 
    globalLogEpObj['currentPageName'] == currentPageName && 
    globalLogEpObj['prePageName'] == prePageName &&
    globalLogEpObj['pageId'] == pageId
  ){
    let userActionLen = globalLogEpObj['ep'].length
    if(userActionLen >= 10){
      var log_data_type = "show";
      let history = reportAllExposureDataHistoryPage()
      buriedReport(globalLogEpObj, log_data_type, history)
      getApp().globalData.globalLogEpObj = {}
      noTraceIdFun(getApp().globalData.globalLogEpObj,traceId,currentPageName,prePageName,userAction,pageId)
    }else{
      hasTraceIdFun(globalLogEpObj,traceId,currentPageName,prePageName,userAction,pageId)
    }
  }else if(
    globalLogEpObj['traceId'] != traceId || 
    globalLogEpObj['currentPageName'] != currentPageName || 
    globalLogEpObj['prePageName'] != prePageName|| 
    globalLogEpObj['pageId'] != pageId ){
    if( 
      globalLogEpObj['currentPageName'] != currentPageName || 
      globalLogEpObj['prePageName'] != prePageName ||
      globalLogEpObj['pageId'] != pageId){
        clickBuriedV2({
          click_id:'test_different_cur_pre_pageid_0927',
          click_par:{
            traceId,
            userAction,
            pageId,
            currentPageName,
            prePageName,
            resource,
            lazyObj
          },
          currentPageName,
          prePageName,
          pageId
        })
    }
    var log_data_type = "show";
    let history = reportAllExposureDataHistoryPage()
    buriedReport(globalLogEpObj, log_data_type, history)
    getApp().globalData.globalLogEpObj = {}
    noTraceIdFun(getApp().globalData.globalLogEpObj,traceId,currentPageName,prePageName,userAction,pageId)
  }

  
    
}
function reportAllExposureDataHistoryPage() {
  let page = getCurrentPages();
  let historyPage = [];
  // let currentPagePath = page[page.length - 1] && page[page.length - 1].route || "";
  let len = page && page.length || 0
  let currentPagePath = page && len && page[len - 1] && page[len - 1].route || "";
  // let PrePagePath = page[page.length - 2] && page[page.length - 2].route || "";
  let PrePagePath =  page && len>=2 && page[len - 2] && page[len - 2].route || "";
  historyPage.unshift({
    name: pathUrlMap[currentPagePath] || "",
    path: currentPagePath || ""
  })
  historyPage.unshift({
    name: pathUrlMap[PrePagePath] || "",
    path: PrePagePath || ""
  })
  return historyPage
}
// 处理页面切后台、页面销毁时上报所有数据
function reportAllExposureData(){
  let app =  getApp();
  let history = reportAllExposureDataHistoryPage()
  let globalLogEpObj = app.globalData.globalLogEpObj;
  let log_data_type = "show";
  buriedReport(globalLogEpObj, log_data_type, history)
  getApp().globalData.globalLogEpObj = {}

}
function totalNumFunc(epArr){
  let num = 0,    
    len = epArr.length
  if(len > 0){
    for(let i=0;i<len;i++){
      let item = epArr[i]
      for(let traceId in item){
        if(traceId != 'pageId' && traceId != 'currentPageName' && traceId != 'prePageName'){
          num += item[traceId].length
        }
      }
    }
  }
  return num
}
// 页面埋点
function exposureBuried(par, history) {
  var log_data_type = "show";
  reportCurPageUrl().then(() => {
    buriedReport(par, log_data_type, history)
  });
}
// 直播pv埋点
function pvLiveBuried(par) {
  var log_data_type = "wechat_app_pv";
  buriedReport(par, log_data_type);
}
// 页面埋点
function pvBuried(par) {
  setTimeout(() => {
    var log_data_type = "wechat_app_pv";
    reportCurPageUrl().then(() => {
      buriedReport(par, log_data_type)
    });
  }, 50)
}
// 点击埋点
function clickBuried(par) {
  var log_data_type = "wechat_app_click";
  reportCurPageUrl().then(() => {
    buriedReport(par, log_data_type)
    // let history = reportAllExposureDataHistoryPage()
    // buriedDeal10Data(par, log_data_type, history)
  }).catch(() => {
    /**/
  })
}
// 页面埋点
function pvBuriedV2(par) {
  setTimeout(() => {
    var log_data_type = "wechat_app_pv";
      let pageStack = getApp().globalData.pageStack || []
      par.pageStack = pageStack;
      if(!par.currentPageName){
        clickBuriedV2({
          click_id:'test_empty_pv_cur_0927',
          click_par:{
            par
          },
          currentPageName: 'testname',
          prePageName: par.prePageName,
          pageId: par.pageId
        })
      }
      if(!par.prePageName){
        clickBuriedV2({
          click_id:'test_empty_pv_pre_0927_1',
          click_par:{
            par
          },
          currentPageName: par.currentPageName,
          prePageName: 'testname',
          pageId: par.pageId
        })
      }
      try{
        buriedReportV2(par, log_data_type)
      }catch(e){
        clickBuriedV2({
          click_id:'test_report_pv_fail_0927',
          click_par:{
            par
          },
          currentPageName: par.currentPageName || 'testname',
          prePageName: 'testname',
          pageId: par.pageId
        })
      }
      
  }, 50)
}
// 点击埋点
function clickBuriedV2(par) {
  var log_data_type = "wechat_app_click";
  try{
    buriedReportV2(par, log_data_type)
  }catch(e){}
}
// 直播pv埋点
function pvLiveBuriedV2_(par) {
  var log_data_type = "wechat_app_pv";
  buriedReportV2(par, log_data_type);
}
/**
 * @description: 判断当前页面是半弹层打开的数量，
 *               并且判断当前打开的半弹层的顺序,如果当前打开的半弹层，不是第一个，说明是*               从半弹层跳转到的半弹层;
 *               
 * @param {type} 
 * @return: 
 */
const Pre_currentOpenMask = (mask_name)=>{
  // 
  let pre_path =  getApp().globalData.historyPage[0] && getApp().globalData.historyPage[0].path  || '';
  let halfMaskArr = getApp().globalData.halfMaskArr;
  let index = halfMaskArr.findIndex((item)=>{
    return item.path == pre_path
  })
  let pre_maskName = ''
  let subIndex = -1
  if(index > -1){
    if(halfMaskArr[index].subMaskArr && Array.isArray(halfMaskArr[index].subMaskArr) ){
      subIndex = halfMaskArr[index].subMaskArr.findIndex((item)=>{
        return item.name == mask_name
      })
    }
  }
  /**
     * 如果页面a(有打开的半弹层)跳转到页面b(没有打开的半弹层)
     */
  if(index > -1 && !mask_name){
    if(halfMaskArr[index].subMaskArr && Array.isArray(halfMaskArr[index].subMaskArr) ){
      subIndex = halfMaskArr[index].subMaskArr.length - 1;
    }
        
  }
  if(subIndex > -1){
    if(halfMaskArr[index].subMaskArr && Array.isArray(halfMaskArr[index].subMaskArr) ){
      pre_maskName = subIndex == 0 ? halfMaskArr[index].subMaskArr[subIndex].name : halfMaskArr[index].subMaskArr[subIndex-1].name
    }
  }
  return pre_maskName
}
/**
 * @description: 判断当前页面是否有打开的半弹层，并返回最后一个半弹层
 * @param {type} 
 * @return: 
 */
const currentOpenMask = (path)=>{
  // 
  let current_path = path  || '';
  let halfMaskArr = getApp().globalData.halfMaskArr;
  let index = halfMaskArr.findIndex((item)=>{
    return item.path == current_path
  })
  let maskName = ''
  if(index > -1){
    if(halfMaskArr[index].subMaskArr && Array.isArray(halfMaskArr[index].subMaskArr) ){
      let len = halfMaskArr[index].subMaskArr && halfMaskArr[index].subMaskArr.length > 0 ? halfMaskArr[index].subMaskArr.length : -1
      if(len > 0 ){
        maskName = halfMaskArr[index].subMaskArr[len -1].name
      }
    }
        
  }
  return maskName
}
// 埋点参数整理---整体上整合10条数据
function buriedDeal10Data(par, log_data_type, history) {
  /**log_data_type字段
     * wechat_app_pv  全部上报埋点。
     * wechat_app_click  上报关键点击日志，如加车、提单成功
     * 加车点击（click_id=click_add）、提单成功（click_id=to_order_success，并传order_id）需埋点击日志。
     * 首页/频道页 跳到其它页面，pv日志的page_par字段需透传userAction（含res_type、res_name 、channelId等）。
     * 一级字段，全部上报，为空时也上报；能获取值时，都需要传值。如门店页 需传参 store_id，商品详情页 需传参 sku_id，
     *  订单详情页 需传参 order_id。
     * 微信小程序 跳h5页面，微信小程序增加埋点，
     * 上传一个click日志 log_data_type='wechat_app_click', click_id='to_web',click_par 透传 userAction
     * 上传一个 pv日志  log_data_type='wechat_app_pv'   , page_name='web'。
     * par.isOpenMask  关闭半弹层时传true,打开可以false或null
     * 
     */
  let app = getApp();
  var openId = app.globalData && app.globalData.loginStateInfo && app.globalData.loginStateInfo.openId ? app.globalData.loginStateInfo.openId : "";
  // 埋点暂不上线，勿删
  var sys = app.globalData.systemInfo.system || '';
  var visit_time = new Date();
  var create_time = par.create_time && par.create_time.getTime() || new Date().getTime();
  var os = sys.indexOf("iOS") == 0 ? "iOS" : "android";
  var os_ver = sys.split(" ").length > 1 ? sys.split(" ")[1] : "";
  // let prePage = '',
  //     curPage = '';
  let historyPage = [];
  if (history) {
    historyPage = history || []
  } else {
    historyPage = app.globalData.historyPage || [];
  }
  // AB test
  let testTag = app.globalData.testtag;
  if (testTag.length > 0) {
    // 过期删除
    testTag.forEach((item, index) => {
      let endTime = Date.now();
      if (endTime - item.startTime > item.duration) { // 过期删除
        testTag.splice(index, 1)
      }
    })
  }
  if (app.globalData.qrcode && !app.globalData.qrcode.roomId) {
    app.globalData.qrcode.roomid = app.globalData.roomId
  }

  // 获取地理位置
  let addressInfo = {};
  try {
    addressInfo = wx.getStorageSync('address_info')
  } catch (e) {
    /**/
  }

  // 获取风控位置
  let realTimeLocation = {};
  try {
    realTimeLocation = wx.getStorageSync('realTimeLocation')
  } catch (e) {
    /**/
  }
  let maskName = par.livePageName  // 手动传入的半弹层名字
  let cur_path = historyPage[1] && historyPage[1].path // 当前页面路径
  let pre_maskName = Pre_currentOpenMask( maskName)
  let curr_maskName = currentOpenMask(cur_path)
  //处理手动上报中字段为空的情况
  let _click_par = par.click_par ? par.click_par : {}
  if(JSON.stringify(_click_par) != '{}'){
    for(var key in _click_par){
      if (
        _click_par[key] === "" ||
              _click_par[key] === undefined || 
              _click_par[key] === null || 
              (_click_par[key] && JSON.stringify(_click_par[key]) == "{}")
      ) {
        delete _click_par[key];
      }
    }
  }
  par.click_par = _click_par;

  let _page_par = par.page_par ? par.page_par : {}
  if(JSON.stringify(_page_par) != '{}'){
    for(var key_page in _page_par){
      if (
        _page_par[key_page] === "" ||
              _page_par[key_page] === undefined ||
              _page_par[key_page] === null ||
              (_page_par[key_page] &&
                JSON.stringify(_page_par[key_page]) == "{}")
      ) {
        delete _page_par[key_page];
      }
    }
  }
  par.page_par = _page_par;
  // traceId 为空不上报
  if(!par.traceId){
    return 
  }
  //处理手动上报中字段为空的情况
  let systemInfo = app.globalData && app.globalData.systemInfo || {};
  let bodyParams = {
    // 当前页路径
    "cur_path": par.livePath || historyPage[1] && historyPage[1].path || "",
    "ref_path": par.livePath ? (historyPage[1] && historyPage[1].path || "") : (historyPage[0] && historyPage[0].path || ""),
    // 曝光埋点新加-版本
    "app_ver": app.globalData.config.xcxVersion,
    // 曝光埋点新加-当前页
    "cur_page": par.currentPageName ? par.currentPageName : '',
    "platcode": "wx_xcx",
    "ep": par.ep || '',
    "traceId": par.traceId || '', //手动上报曝光的traceId
    "is_test": app.globalData.config.is_test, //1表示预发布，0表示线上
    "log_data_type": log_data_type, //上报类型，点击上报或页面上报
    "session_id": app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid || "",
    // 为了兼容上报的一个切换前后台的埋dian，增加的参数对以前的逻辑不影响
    "ref_page_name": par.prePageName ? par.prePageName : '', //上一页地址
    "page_name": par.currentPageName ? par.currentPageName : '', //本页地址
    "device_id": util.getUUIDMD5(),
    "network": app.globalData.networkType,
    "poi_select": app.globalData.addressInfo.poi,
    "lat_select": app.globalData.addressInfo.latitude,
    "lng_select": app.globalData.addressInfo.longitude,
    "city_id_select": app.globalData.addressInfo.cityId,
    "city_name_select": app.globalData.addressInfo.cityName,
    "lng_pos": app.globalData.gpsInfo.longitude || "",
    "lat_pos": app.globalData.gpsInfo.latitude || "",
    "channel_name": app.globalData.qrcode.business || "usedwechatapp",
    "app_name": "wx_xcx",
    "app_version": app.globalData.config.xcxVersion,
    "wechat_version": app.globalData.systemInfo.version,
    "create_time": create_time,
    "visit_time": visit_time.getTime(),
    "os": os,
    "os_ver": os_ver,
    "openId": openId,
    "brand": systemInfo.brand,
    "model": systemInfo.model,
    "click_par": par.click_par ? par.click_par : "",
    "ext_par": {
      "roomid": app.globalData.roomId || "",
      // 【风控地址】
      "lat_pos": realTimeLocation.latitude || '',
      // 【风控地址】
      "lng_pos": realTimeLocation.longitude || '',
      // 【风控地址】
      "city_name_pos": realTimeLocation.cityName || '',
      // 【风控地址】
      "city_id_pos": realTimeLocation.cityId || '',
      // 【用户选择的地址】
      "lng": addressInfo.longitude || app.globalData.addressInfo.longitude || '',
      // 【用户选择的地址】
      "lat": addressInfo.latitude || app.globalData.addressInfo.latitude || '',
      // 【用户选择的地址】
      "poi": addressInfo.poi || app.globalData.addressInfo.poi || '',
      // 【用户选择的地址】
      "city_id_select": addressInfo.cityId || app.globalData.addressInfo.cityId || '',
      // 【用户选择的地址】
      "city_name_select": addressInfo.cityName || app.globalData.addressInfo.cityName || '',
      // 【用户选择的地址】
      "adcode": addressInfo.adcode || app.globalData.addressInfo.adcode || '',
      // 【用户选择的地址】
      "districtCode": addressInfo.districtCode || app.globalData.addressInfo.districtCode || '',
      "fontSizeSetting": app.globalData.systemInfo.fontSizeSetting,
      "SDKVersion": app.globalData.systemInfo.SDKVersion,
      "language": app.globalData.systemInfo.language,
      "sourcefrom": app.globalData.sourcefrom, // – index 首页；channel 频道页
      "scene": app.globalData.qrcode,
      "wxScene": app.globalData.appScene,
      "wxGroupId": app.globalData.wxGroupId || "",
      "dj_par_key": app.globalData.qrcode.dj_par_key || "",
      "mpChannel": 'wx_xcx',
      "pageId": par.pageId || '',
      "build_no": versionConfig.xcxUpdateVersionTimes
    },
    "page_par": par.page_par || "",
    // 非必传参数
    "user_id": app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_PIN || "",
    "store_id": par.store_id || "",
    "sku_id": par.sku_id || "",
    "order_id": par.order_id || "",
    "click_id": par.click_id || "",
    // AB test
    "testtag": JSON.stringify(testTag),
  };
  if (par.clienttime) {
    bodyParams.clienttime = par.clienttime
  }
  // 上报参数
  // var body = [];
  // body.push(bodyParams)
  let globalLogEpArr =  app.globalData.globalLogEpArr;
  //let globalLogClickArr =  app.globalData.globalLogClickArr;
  if(log_data_type === 'show'){
    globalLogEpArr.push(bodyParams)
  }
  // else if(log_data_type === 'wechat_app_click'){
  //     globalLogClickArr.push(bodyParams)
  // }
}

// 埋点参数整理---上报10条不同traceId/pv/click
function buriedReport10DataToServices(body,log_data_type) {
 
  let app = getApp();
  let is_djencryptFlag_log = null;
  try {
    is_djencryptFlag_log = wx.getStorageSync('djencryptFlag_log')
    if (!is_djencryptFlag_log) {
      is_djencryptFlag_log = 'success'
    }
  } catch (e) {
    /**/
  }
  let sendData
  if (app.globalData.config.env == 'pro' && is_djencryptFlag_log == 'success') {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
      "json": encodeURIComponent(encrypt(JSON.stringify(body))),
      "jef": 1
    }
  } else {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
      "json": JSON.stringify(body),
    };
  }
  var reaquest = {
    timeout:1000,
    url: app.globalData.config.buriedUrl, //预发布
    // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
    data: sendData,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
      'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid
    },

    success: function (res) {
      if (res.data.code == 0) {
        if (is_djencryptFlag_log == 'nosuccess') {
          wx.setStorageSync('djencryptFlag_log', 'success')
        }
      }
      //接口加密传输失败，降级明文传输
      if (res.data.code == 110) {
        //接口没有请求成功，设置加密传输flag
        wx.setStorageSync('djencryptFlag_log', 'nosuccess')
        var reaquest_second = {
          timeout:1000,
          url: app.globalData.config.buriedUrl, //预发布
          // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
          data: {
            "kafka topic": "topic_daojia_wechat_app",
            "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
            "json": JSON.stringify(body)
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
            'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid
          },

          success: function (res) {
            //接口加密传输失败，降级明文传输
            if (res.data.code == 110) {
              //接口没有请求成功，设置加密传输flag
              wx.setStorageSync('djencryptFlag_log', 'nosuccess')

            }

          },
          fail: function () { },
          complete: function () {
            
          }
        };
        wx.request(reaquest_second)
      }

    },
    fail: function () { },
    complete: function () {
      
    }
  };
  wx.request(reaquest)
}

// 埋点参数整理
function buriedReport(par, log_data_type, history) {
  /**log_data_type字段
     * wechat_app_pv  全部上报埋点。
     * wechat_app_click  上报关键点击日志，如加车、提单成功
     * 加车点击（click_id=click_add）、提单成功（click_id=to_order_success，并传order_id）需埋点击日志。
     * 首页/频道页 跳到其它页面，pv日志的page_par字段需透传userAction（含res_type、res_name 、channelId等）。
     * 一级字段，全部上报，为空时也上报；能获取值时，都需要传值。如门店页 需传参 store_id，商品详情页 需传参 sku_id，
     *  订单详情页 需传参 order_id。
     * 微信小程序 跳h5页面，微信小程序增加埋点，
     * 上传一个click日志 log_data_type='wechat_app_click', click_id='to_web',click_par 透传 userAction
     * 上传一个 pv日志  log_data_type='wechat_app_pv'   , page_name='web'。
     * par.isOpenMask  关闭半弹层时传true,打开可以false或null
     * 
     */
  let app = getApp();
  var openId = app.globalData && app.globalData.loginStateInfo && app.globalData.loginStateInfo.openId ? app.globalData.loginStateInfo.openId : "";
  // 埋点暂不上线，勿删
  var sys = app.globalData.systemInfo.system || "";
  var visit_time = new Date();
  var create_time = par.create_time && par.create_time.getTime() || new Date().getTime();
  var os = sys.indexOf("iOS") == 0 ? "iOS" : "android";
  var os_ver = sys.split(" ").length > 1 ? sys.split(" ")[1] : "";
  // let prePage = '',
  //     curPage = '';
  let historyPage = [];
  if (history) {
    historyPage = history || []
  } else {
    historyPage = app.globalData.historyPage || [];
  }
  // AB test
  let testTag = app.globalData.testtag;
  if (testTag.length > 0) {
    // 过期删除
    testTag.forEach((item, index) => {
      let endTime = Date.now();
      if (endTime - item.startTime > item.duration) { // 过期删除
        testTag.splice(index, 1)
      }
    })
  }
  if (app.globalData.qrcode && !app.globalData.qrcode.roomId) {
    app.globalData.qrcode.roomid = app.globalData.roomId
  }

  // 获取地理位置
  let addressInfo = {};
  try {
    addressInfo = wx.getStorageSync('address_info')
  } catch (e) {
    /**/
  }

  // 获取风控位置
  let realTimeLocation = {};
  try {
    realTimeLocation = wx.getStorageSync('realTimeLocation')
  } catch (e) {
    /**/
  }
  let maskName = par.livePageName  // 手动传入的半弹层名字
  let cur_path = historyPage[1] && historyPage[1].path // 当前页面路径
  let pre_maskName = Pre_currentOpenMask( maskName)
  let curr_maskName = currentOpenMask(cur_path)
    
  //处理手动上报中字段为空的情况
  var _handleEmpty = function(obj){
    for(var key in obj){
      if (obj[key] === "" || obj[key] === undefined || obj[key] === null || (obj[key] && JSON.stringify(obj[key]) == "{}")
      ) {
        delete obj[key];
      }
      if( Object.prototype.toString.call(obj[key]) == '[object Object]' ){
        _handleEmpty(obj[key])
      }
    }
    return obj
  }
  let _click_par = par.click_par ? par.click_par : {}
  if(JSON.stringify(_click_par) != '{}'){
    _click_par = _handleEmpty(_click_par);
  }
  par.click_par = _click_par;
  let _page_par = par.page_par ? par.page_par : {}
  if(JSON.stringify(_page_par) != '{}'){
    _page_par = _handleEmpty(_page_par);
  }
  
  par.page_par = _page_par;
  //处理手动上报中字段为空的情况
  let systemInfo = app.globalData && app.globalData.systemInfo || {};
  let bodyParams = {
    // 当前页路径
    "cur_path": par.livePath || historyPage[1] && historyPage[1].path || "",
    "ref_path": par.livePath ? (historyPage[1] && historyPage[1].path || "") : (historyPage[0] && historyPage[0].path || ""),
    // 曝光埋点新加-版本
    "app_ver": app.globalData.config.xcxVersion,
    // 曝光埋点新加-当前页
    "cur_page": par.currentPageName ? par.currentPageName : '',
    "platcode": "wx_xcx",
    "ep": par.ep || '',
    "traceId": par.traceId || '', //手动上报曝光的traceId
    "is_test": app.globalData.config.is_test, //1表示预发布，0表示线上
    "log_data_type": log_data_type, //上报类型，点击上报或页面上报
    "session_id": app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid || "",
    // 为了兼容上报的一个切换前后台的埋dian，增加的参数对以前的逻辑不影响
    "ref_page_name": par.prePageName ? par.prePageName : '', //上一页地址
    "page_name": par.currentPageName ? par.currentPageName : '', //本页地址
    "device_id": util.getUUIDMD5(),
    "network": app.globalData.networkType,
    "poi_select": app.globalData.addressInfo.poi,
    "lat_select": app.globalData.addressInfo.latitude,
    "lng_select": app.globalData.addressInfo.longitude,
    "city_id_select": app.globalData.addressInfo.cityId,
    "city_name_select": app.globalData.addressInfo.cityName,
    "lng_pos": app.globalData.gpsInfo.longitude || "",
    "lat_pos": app.globalData.gpsInfo.latitude || "",
    "channel_name": app.globalData.qrcode.business || "usedwechatapp",
    "app_name": "wx_xcx",
    "app_version": app.globalData.config.xcxVersion,
    "wechat_version": app.globalData.systemInfo.version,
    "create_time": create_time,
    "visit_time": visit_time.getTime(),
    "os": os,
    "os_ver": os_ver,
    "openId": openId,
    "brand": systemInfo.brand,
    "model": systemInfo.model,
    "click_par": par.click_par ? par.click_par : "",
    "ext_par": {
      "roomid": app.globalData.roomId || "",
      // 【风控地址】
      "lat_pos": realTimeLocation.latitude || '',
      // 【风控地址】
      "lng_pos": realTimeLocation.longitude || '',
      // 【风控地址】
      "city_name_pos": realTimeLocation.cityName || '',
      // 【风控地址】
      "city_id_pos": realTimeLocation.cityId || '',
      // 【用户选择的地址】
      "lng": addressInfo.longitude || app.globalData.addressInfo.longitude || '',
      // 【用户选择的地址】
      "lat": addressInfo.latitude || app.globalData.addressInfo.latitude || '',
      // 【用户选择的地址】
      "poi": addressInfo.poi || app.globalData.addressInfo.poi || '',
      // 【用户选择的地址】
      "city_id_select": addressInfo.cityId || app.globalData.addressInfo.cityId || '',
      // 【用户选择的地址】
      "city_name_select": addressInfo.cityName || app.globalData.addressInfo.cityName || '',
      // 【用户选择的地址】
      "adcode": addressInfo.adcode || app.globalData.addressInfo.adcode || '',
      // 【用户选择的地址】
      "districtCode": addressInfo.districtCode || app.globalData.addressInfo.districtCode || '',
      "fontSizeSetting": app.globalData.systemInfo.fontSizeSetting,
      "SDKVersion": app.globalData.systemInfo.SDKVersion,
      "language": app.globalData.systemInfo.language,
      "sourcefrom": app.globalData.sourcefrom, // – index 首页；channel 频道页
      "scene": app.globalData.qrcode,
      "wxScene": app.globalData.appScene,
      "wxGroupId": app.globalData.wxGroupId || "",
      "dj_par_key": app.globalData.qrcode.dj_par_key || "",
      "mpChannel": 'wx_xcx',
      "pageId": par.pageId || '',
      "build_no": versionConfig.xcxUpdateVersionTimes
    },
    "page_par": par.page_par || "",
    // 非必传参数
    "user_id": app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_PIN || "",
    "store_id": par.store_id || "",
    "sku_id": par.sku_id || "",
    "order_id": par.order_id || "",
    "click_id": par.click_id || "",
    // AB test
    "testtag": JSON.stringify(testTag),
  };
  if (par.clienttime) {
    bodyParams.clienttime = par.clienttime
  }
  
  // 上报参数
  var body = [];
  body.push(bodyParams)
  let is_djencryptFlag_log = null;
  try {
    is_djencryptFlag_log = wx.getStorageSync('djencryptFlag_log')
    if (!is_djencryptFlag_log) {
      is_djencryptFlag_log = 'success'
    }
  } catch (e) {
    /**/
  }
  let sendData
  if (app.globalData.config.env == 'pro' && is_djencryptFlag_log == 'success') {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
      "json": encodeURIComponent(encrypt(JSON.stringify(body))),
      "jef": 1
    }
  } else {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
      "json": JSON.stringify(body),
    };
  }
  var reaquest = {
    timeout:1000,
    url: app.globalData.config.buriedUrl, //预发布
    // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
    data: sendData,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
      'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid
    },

    success: function (res) {
      if (res.data.code == 0) {
        if (is_djencryptFlag_log == 'nosuccess') {
          wx.setStorageSync('djencryptFlag_log', 'success')
        }
      }
      //接口加密传输失败，降级明文传输
      if (res.data.code == 110) {
        //接口没有请求成功，设置加密传输flag
        wx.setStorageSync('djencryptFlag_log', 'nosuccess')
        var reaquest_second = {
          timeout:1000,
          url: app.globalData.config.buriedUrl, //预发布
          // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
          data: {
            "kafka topic": "topic_daojia_wechat_app",
            "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
            "json": JSON.stringify(body)
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
            'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid
          },

          success: function (res) {
            //接口加密传输失败，降级明文传输
            if (res.data.code == 110) {
              //接口没有请求成功，设置加密传输flag
              wx.setStorageSync('djencryptFlag_log', 'nosuccess')

            }

          },
          fail: function () { },
          complete: function () {
           
          }
        };
        wx.request(reaquest_second)
      }

    },
    fail: function () { },
    complete: function () {
     
    }
  };
  //如果是曝光并且 ep为空不做上报
  if(log_data_type === 'show'){
    let ep = bodyParams.ep
    if(ep && ep.length > 0){
      wx.request(reaquest)
    }
  }else{
    wx.request(reaquest)
  }
  
}
// 埋点参数整理
function buriedReportV2(par, log_data_type, history) {
  /**log_data_type字段
     * wechat_app_pv  全部上报埋点。
     * wechat_app_click  上报关键点击日志，如加车、提单成功
     * 加车点击（click_id=click_add）、提单成功（click_id=to_order_success，并传order_id）需埋点击日志。
     * 首页/频道页 跳到其它页面，pv日志的page_par字段需透传userAction（含res_type、res_name 、channelId等）。
     * 一级字段，全部上报，为空时也上报；能获取值时，都需要传值。如门店页 需传参 store_id，商品详情页 需传参 sku_id，
     *  订单详情页 需传参 order_id。
     * 微信小程序 跳h5页面，微信小程序增加埋点，
     * 上传一个click日志 log_data_type='wechat_app_click', click_id='to_web',click_par 透传 userAction
     * 上传一个 pv日志  log_data_type='wechat_app_pv'   , page_name='web'。
     * par.isOpenMask  关闭半弹层时传true,打开可以false或null
     * 
     */
  let app = getApp();
  var openId = app.globalData && app.globalData.loginStateInfo && app.globalData.loginStateInfo.openId ? app.globalData.loginStateInfo.openId : "";
  // 埋点暂不上线，勿删
  var sys = app.globalData.systemInfo.system || '';
  var visit_time = new Date();
  var create_time = par.create_time && par.create_time.getTime() || new Date().getTime();
  var os = sys.indexOf("iOS") == 0 ? "iOS" : "android";
  var os_ver = sys.split(" ").length > 1 ? sys.split(" ")[1] : "";
  // let prePage = '',
  //     curPage = '';
  let historyPage = [];
  if (history) {
    historyPage = history || []
  } else {
    historyPage = app.globalData.historyPage || [];
  }
  // AB test
  let testTag = app.globalData.testtag;
  if (testTag.length > 0) {
    // 过期删除
    testTag.forEach((item, index) => {
      let endTime = Date.now();
      if (endTime - item.startTime > item.duration) { // 过期删除
        testTag.splice(index, 1)
      }
    })
  }
  if (app.globalData.qrcode && !app.globalData.qrcode.roomId) {
    app.globalData.qrcode.roomid = app.globalData.roomId
  }

  // 获取地理位置
  let addressInfo = {};
  try {
    addressInfo = wx.getStorageSync('address_info')
  } catch (e) {
    /**/
  }

  // 获取风控位置
  let realTimeLocation = {};
  try {
    realTimeLocation = wx.getStorageSync('realTimeLocation')
  } catch (e) {
    /**/
  }
 
    
  //处理手动上报中字段为空的情况
  var _handleEmpty = function(obj){
    for(var key in obj){
      if (obj[key] === "" || obj[key] === undefined || obj[key] === null || (obj[key] && JSON.stringify(obj[key]) == "{}")
      ) {
        delete obj[key];
      }
      if( Object.prototype.toString.call(obj[key]) == '[object Object]' ){
        _handleEmpty(obj[key])
      }
    }
    return obj
  }
  let _click_par = par.click_par ? par.click_par : {}
  if(JSON.stringify(_click_par) != '{}'){
    _click_par = _handleEmpty(_click_par);
  }
  par.click_par = _click_par;
  let _page_par = par.page_par ? par.page_par : {}
  if(JSON.stringify(_page_par) != '{}'){
    _page_par = _handleEmpty(_page_par);
  }
  
  par.page_par = _page_par;
  // 增加页面是否有打开的半弹层---处理back
  //增加页面是否有打开的半弹层判断
  
  let pageList = getCurrentPages();
  // console.log("BI.js---buriedReportv2----1146line---pageList", pageList);
  // let route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
  let len = pageList && pageList.length || 0;
  let route =
    (pageList &&
      len &&
      pageList[len - 1] &&
      pageList[len - 1] !== "null" &&
      pageList[len - 1].route) ||
    "";
  // console.log("BI.js---buriedReportv2----1146line---pageList", route);
  let pvRouteObj = getApp().globalData.pvRouteObj
  let pageNum = pvRouteObj[route]
  
  // console.log('---halfMaskArr---',getApp().globalData.halfMaskArr,'----isHasOpenMask-----',isHasOpenMask)
  
  if( (par.isHasOpenMask && par.isHasOpenMask == 'true') || (par.isBack && par.isBack == 'back'&& log_data_type == 'wechat_app_pv') ||  pageNum > 2 && log_data_type == 'wechat_app_pv' && !par.isHasOpenMask  ){
    if(par.page_par['ref_par']){
      delete par.page_par['ref_par']
    }
    par.page_par['ret_Type'] = 'back'
  }
  // 增加页面是否有打开的半弹层---处理back,如果是打开的半弹层，就不能考虑back
  // console.log('-----pvRouteObj------',JSON.stringify(pvRouteObj))
  //处理手动上报中字段为空的情况
  //处理h5跳转小程序，上报pv
  if(log_data_type == 'wechat_app_pv'){
    if(getApp().globalData.H5extraParams.ref_par){
      par.page_par['ref_par'] = getApp().globalData.H5extraParams.ref_par
      getApp().globalData.H5extraParams = {}
    }
  }
  let systemInfo = app.globalData && app.globalData.systemInfo || {};
  let bodyParams = {
    // 当前页路径
    "cur_path": par.livePath || historyPage[1] && historyPage[1].path || "",
    "ref_path": par.livePath ? (historyPage[1] && historyPage[1].path || "") : (historyPage[0] && historyPage[0].path || ""),
    // 曝光埋点新加-版本
    "app_ver": app.globalData.config.xcxVersion,
    // 曝光埋点新加-当前页
    "cur_page": par.currentPageName ? par.currentPageName : '',
    "platcode": "wx_xcx",
    "ep": par.ep || '',
    "traceId": par.traceId || '', //手动上报曝光的traceId
    "is_test": app.globalData.config.is_test, //1表示预发布，0表示线上
    "log_data_type": log_data_type, //上报类型，点击上报或页面上报
    "session_id": app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid || "",
    // 为了兼容上报的一个切换前后台的埋dian，增加的参数对以前的逻辑不影响
    "ref_page_name": par.prePageName ? par.prePageName : '', //上一页地址
    "page_name": par.currentPageName ? par.currentPageName : '', //本页地址
    "device_id": util.getUUIDMD5(),
    "network": app.globalData.networkType,
    "poi_select": app.globalData.addressInfo.poi,
    "lat_select": app.globalData.addressInfo.latitude,
    "lng_select": app.globalData.addressInfo.longitude,
    "city_id_select": app.globalData.addressInfo.cityId,
    "city_name_select": app.globalData.addressInfo.cityName,
    "lng_pos": app.globalData.gpsInfo.longitude || "",
    "lat_pos": app.globalData.gpsInfo.latitude || "",
    "channel_name": app.globalData.qrcode.business || "usedwechatapp",
    "app_name": "wx_xcx",
    "app_version": app.globalData.config.xcxVersion,
    "wechat_version": app.globalData.systemInfo.version,
    "create_time": create_time,
    "visit_time": visit_time.getTime(),
    "os": os,
    "os_ver": os_ver,
    "openId": openId,
    "brand": systemInfo.brand,
    "model": systemInfo.model,
    "click_par": par.click_par ? par.click_par : "",
    "ext_par": {
      "roomid": app.globalData.roomId || "",
      // 【风控地址】
      "lat_pos": realTimeLocation.latitude || '',
      // 【风控地址】
      "lng_pos": realTimeLocation.longitude || '',
      // 【风控地址】
      "city_name_pos": realTimeLocation.cityName || '',
      // 【风控地址】
      "city_id_pos": realTimeLocation.cityId || '',
      // 【用户选择的地址】
      "lng": addressInfo.longitude || app.globalData.addressInfo.longitude || '',
      // 【用户选择的地址】
      "lat": addressInfo.latitude || app.globalData.addressInfo.latitude || '',
      // 【用户选择的地址】
      "poi": addressInfo.poi || app.globalData.addressInfo.poi || '',
      // 【用户选择的地址】
      "city_id_select": addressInfo.cityId || app.globalData.addressInfo.cityId || '',
      // 【用户选择的地址】
      "city_name_select": addressInfo.cityName || app.globalData.addressInfo.cityName || '',
      // 【用户选择的地址】
      "adcode": addressInfo.adcode || app.globalData.addressInfo.adcode || '',
      // 【用户选择的地址】
      "districtCode": addressInfo.districtCode || app.globalData.addressInfo.districtCode || '',
      "fontSizeSetting": app.globalData.systemInfo.fontSizeSetting,
      "SDKVersion": app.globalData.systemInfo.SDKVersion,
      "language": app.globalData.systemInfo.language,
      "sourcefrom": app.globalData.sourcefrom, // – index 首页；channel 频道页
      "scene": app.globalData.qrcode,
      "wxScene": app.globalData.appScene,
      "wxGroupId": app.globalData.wxGroupId || "",
      "dj_par_key": app.globalData.qrcode.dj_par_key || "",
      "mpChannel": 'wx_xcx',
      "pageId": par.pageId || '',
      "build_no": versionConfig.xcxUpdateVersionTimes,
      "pageStack": getApp().globalData.pageStack || ''
    },
    "page_par": par.page_par || "",
    // 非必传参数
    "user_id": app.globalData.loginStateInfo && app.globalData.loginStateInfo.PDJ_H5_PIN || "",
    "store_id": par.store_id || "",
    "sku_id": par.sku_id || "",
    "order_id": par.order_id || "",
    "click_id": par.click_id || "",
    // AB test
    "testtag": JSON.stringify(testTag),
   
  };
  if (par.clienttime) {
    bodyParams.clienttime = par.clienttime
  }
  // 上报参数
  var body = [];
  body.push(bodyParams)
  let is_djencryptFlag_log = null;
  try {
    is_djencryptFlag_log = wx.getStorageSync('djencryptFlag_log')
    if (!is_djencryptFlag_log) {
      is_djencryptFlag_log = 'success'
    }
  } catch (e) {
    /**/
  }
  let sendData
  if (app.globalData.config.env == 'pro' && is_djencryptFlag_log == 'success') {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
      "json": encodeURIComponent(encrypt(JSON.stringify(body))),
      "jef": 1
    }
  } else {
    sendData = {
      "kafka topic": "topic_daojia_wechat_app",
      "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
      "json": JSON.stringify(body),
    };
  }
  var reaquest = {
    timeout:1000,
    url: app.globalData.config.buriedUrl, //预发布
    // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
    data: sendData,
    method: 'POST',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
      'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid
    },

    success: function (res) {
      if (res.data.code == 0) {
        if (is_djencryptFlag_log == 'nosuccess') {
          wx.setStorageSync('djencryptFlag_log', 'success')
        }
      }
      //接口加密传输失败，降级明文传输
      if (res.data.code == 110) {
        //接口没有请求成功，设置加密传输flag
        wx.setStorageSync('djencryptFlag_log', 'nosuccess')
        var reaquest_second = {
          timeout:1000,
          url: app.globalData.config.buriedUrl, //预发布
          // logType 目前取值有：app、h5、delivery_daojia_h5、jingming,api
          data: {
            "kafka topic": "topic_daojia_wechat_app",
            "logType": log_data_type === 'show' ? log_data_type : "daojia_wechat",
            "json": JSON.stringify(body)
          },
          method: 'POST',
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'cart_uuid=' + util.getUUIDMD5(),
            'sid': app.globalData.loginStateInfo && app.globalData.loginStateInfo.o2o_m_h5_sid
          },

          success: function (res) {
            //接口加密传输失败，降级明文传输
            if (res.data.code == 110) {
              //接口没有请求成功，设置加密传输flag
              wx.setStorageSync('djencryptFlag_log', 'nosuccess')

            }

          },
          fail: function () { },
          complete: function () {
           
          }
        };
        wx.request(reaquest_second)
      }

    },
    fail: function () { },
    complete: function () {
     
    }
  };
  wx.request(reaquest)
}
//上报当前页面
function reportCurPageUrl() {
  return new Promise(function (resolve) {
    try {
      let app = getApp();
      let historyPage = app.globalData.historyPage || [];
      let page = getCurrentPages();
      let len = page && page.length || 0
      let back_deltaNum = app.globalData.back_deltaNum;
          
      // 主要是处理navigateBack情况，当获取的页面栈数量和回退数量一致时，才执行
      if (back_deltaNum && back_deltaNum == page.length || !back_deltaNum) {
        // let currentPagePath = page[page.length - 1] && page[page.length - 1].route || "";
        let currentPagePath = page && len && page[len - 1] && page[len - 1].route || "";
        let flag = true;
        // 当时为什么做这样的处理？？？
        // if (historyPage[1] && historyPage[1].path === currentPagePath) {
        //     flag = false
        // }
        if (flag) {
          if (!historyPage.length) {
            historyPage.push({
              name: "",
              path: ""
            })
            historyPage.push({
              name: pathUrlMap[currentPagePath] || "",
              path: currentPagePath || ""
            })
          } else {
            historyPage.shift({
              name: "",
              path: ""
            });
            historyPage.push({
              name: pathUrlMap[currentPagePath] || "",
              path: currentPagePath || ""
            })
          }
                   
          app.globalData.historyPage = historyPage;
        }
        app.globalData.back_deltaNum = 0
        resolve()
      }
    } catch (e) {
      resolve()
    }
  })

}

module.exports = {
  pvBuried_: pvBuried,
  clickBuried_: clickBuried,
  pvBuriedV2_: pvBuriedV2,
  clickBuriedV2_: clickBuriedV2,
  exposureBuried_: exposureBuried,
  pvLiveBuried_: pvLiveBuried,
  reportCurPageUrl,
  transferExposureData,
  reportAllExposureData,
  pvLiveBuriedV2_: pvLiveBuriedV2_,
};