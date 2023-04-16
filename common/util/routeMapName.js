// 页面映射,页面映射
/* eslint-disable camelcase*/
const pathUrlMap = {
  "pages/home/home": {
    pageName: "home",
    pageSource: "home"
  },
  "pages/store/index": {
    pageName: "storeinfo",
    pageSource: "store"
  },
  "pages/tabBar/orderlist/index": {
    pageName: "myorderlist",
    pageSource: "orderList"
  },
  "pages/order/orderdetail/index": {
    pageName: "myorderdetail",
    pageSource: "orderDetail"
  },
  "pages/settlementV2/index": {
    pageName: "settlementinfo",
    pageSource: "Settlement"
  },
  "pages/coupon/person-coupon": {
    pageName: "couponsList",
    pageSource: "myCoupon"
  },
  "pages/myCoupons/index": {
    pageName: "couponsList",
    pageSource: "myCoupon"
  },
  "pages/searchAbout/search/search": {
    pageName: "search",
    pageSource: "searchTransitPage"
  },
  "pages/searchAbout/search-result-new/index": {
    pageName: "search_results",
    pageSource: "storeListByKey"
  },
  "pages/searchAbout/storeSearchResult-new/index": {
    pageName: "store_search",
    pageSource: "storeSearchResult"
  },
  "pages/channel/channel": {
    pageName: "channel"
  },
  "pages/tabBar/person/person": {
    pageName: "myinfo"
  },
  "pages/coupon/voucherlist": {
    pageName: "voucherlist"
  },
  "pages/coupon/push-coupon": {
    pageName: "push_coupon"
  },
  "pages/redPacketFission/redPacketFission": {
    pageName: "reward"
  },
  "pages/order/orderstatus/index": {
    pageName: "order_status"
  },
  "pages/newLogin/login/login": {
    pageName: "login"
  },
  "pages/activity/homeFocus/index": {
    pageName: "active",
    pageSource: "activityDetail"
  },
  "pages/worldcup/index": {
    pageName: "worldcup_home"
  },
  "pages/worldcup/select-game": {
    pageName: "worldcup_select_game"
  },
  "pages/worldcup/guess-history": {
    pageName: "worldcup_guess_history"
  },
  "pages/worldcup/cup-coin": {
    pageName: "worldcup_cup_coin"
  },
  "pages/worldcup/coupon": {
    pageName: "worldcup_coupon"
  },
  "pages/worldcup/add-records": {
    pageName: "worldcup_add_records"
  },
  "pages/worldcup/rank": {
    pageName: "worldcup_rank"
  },
  "pages/worldcup/shared-game": {
    pageName: "worldcup_shared"
  },
  "pages/order/paySuccess/index": {
    pageName: "ordersuccess"
  },
  "pages/activity/store/index": {
    pageName: "storeactivity",
    pageSource: "storeActDetail"
  },
  "pages/groupBuy/groupList/index": {
    pageName: "CollageSale"
  },
  "pages/groupBuy/groupBuyDetail/index": {
    pageName: "CollageGoodsInfo"
  },
  "pages/groupBuy/paySuccess/index": {
    pageName: "CollageResult&&CollagePaySuccess"
  },
  "pages/groupBuy/join/index": {
    pageName: "CollageJoin"
  },
  "pages/groupBuy/orderInfo/index": {
    pageName: "collageorderdetail"
  },
  "pages/groupBuy/confirmOrder/index": {
    pageName: "CollageOrderConfirm"
  },
  "pages/groupBuy/chooseStore/index": {
    pageName: "ChangeStoreAddress"
  },
  "pages/groupBuy/collection/myCollectionDetail/index": {
    pageName: "CollageOrderInfo"
  },
  "pages/address/home/index": {
    pageName: "manage_address"
  },
  "pages/address/search/index": {
    pageName: "poi_search_lst"
  },
  "pages/address/map/index": {
    pageName: "current_address_list"
  },
  "pages/address/createOrEdit/index": {
    pageName: "new_address"
  },
  "pages/other/remarkPage/remarkPage": {
    pageName: "OrderNote"
  },
  "pages/order/ordergoods/index": {
    pageName: "OrderGoodsList"
  },
  "pages/bargain/fuel/index": {
    pageName: "cutdownhelp"
  },
  "pages/bargain/cutGoodList/index": {
    pageName: "cutdowngoods"
  },
  "pages/bargain/launch/index": {
    pageName: "cutdowndetail"
  },
  "pages/personSecond/pay-result/pay-result": {
    pageName: "ordersuccess_offline"
  },
  "pages/inviteFriends/index": {
    pageName: "sharegift_invite"
  },
  "pages/personSecond/feedback/feedback": {
    pageName: "AdviceNote"
  },
  "pages/medicineMan/choose/index": {
    pageName: "drugUserList"
  },
  "pages/order/addOrRenewMember/index": {
    pageName: "ShopMemberPay"
  },
  "pages/coupon/voucher/index": {
    pageName: "getcoupon_offline"
  },
  "pages/coupon/storeList/index": {
    pageName: "SelectAddressOffline"
  },
  "pages/lottery/list/index": {
    pageName: "luckyby0list"
  },
  "pages/lottery/detail/index": {
    pageName: "luckyby0detail"
  },
  "pages/lottery/userList/index": {
    pageName: "luckyby0userlist"
  },
  "pages/h5/index": {
    pageName: "web",
    pageSource: "web"
  },
  "pages/groupBuy/oldInviteNew/detail/index": {
    pageName: "OldNewCollageGoodsInfo"
  },
  "pages/groupBuy/oldInviteNew/result/index": {
    pageName: "OldNewCollageInfoLaunch"
  },
  "pages/groupBuy/oldInviteNew/fuel/index": {
    pageName: "OldNewCollageInfoJoin"
  },
  "pages/groupBuy/groupOrder/index": {
    pageName: "mygroupbuy"
  },
  "pages/product/index": {
    pageName: "goodsinfo",
    pageSource: "productDetail"
  },
  "pages/buyVip/index": {
    pageName: "BuyVip"
  },
  "pages/newer/index": {
    pageName: "newer"
  },
  "pages/weBank/index": {
    pageName: "weizhong_activity"
  },
  "pages/purchTicket/couponGo/index": {
    pageName: "NewCouponBuy",
    pageSource: "couponGoodsList"
  },
  "pages/purchTicket/purchTicketsStoreList/storeList": {
    pageName: "store_list_coupon"
  },
  "pages/purchTicket/purchTickets/purchTickets": {
    pageName: "coupon_buy",
    pageSource: 'coupon_buy'
  },
  "pages/purchTicket/purchTicketSearch/index": {
    pageName: "coupon_buySearchResult",
    pageSource: 'coupon_buySearchResult'
  },
  "pages/order/shareOrder/orderdetail/index": {
    pageName: "order_share_detail"
  },
  "pages/storeWin/index": {
    pageName: "couponWinner"
  },
  "pages/address/city/index": {
    pageName: "city_list"
  },
  "pages/appExclusive/index": {
    pageName: "appExclusive"
  },
  "pages/live/list/index": {
    pageName: "LiveList"
  },
  "pages/channelNew/index": {
    pageName: "channel",
    pageSource: "newChannelPage"
  },
  "pages/recommendSkuPage/index": {
    pageName: "ChannelRecGoods"
  },
  "pages/nearbyStore/index": {
    pageName: "moreStoreList",
    pageSource: "channelStorePage"
  },
  "pages/shareCard/index": {
    pageName: "shareCard"
  },
  "pages/landpage/feed/index": {
    pageName: "feedRecGoods",
    pageSource: "feedRecGoods"
  },
  "pages/personSecond/store/index": {
    pageName: "my_favorite",
    pageSource: "concern"
  },
  "pages/myAttention/index": {
    pageName: "my_favorite",
    pageSource: "concern"
  },
  "pages/order/list/index": {
    pageName: "allOrderList"
  },
  "pages/couponTogether/index": {
    pageName: "couponTogether",
    pageSource: "promotionGoodsList"
  },
  "pages/personSecond/setList/index": {
    pageName: "set"
  },
  "pages/personSecond/wallet/index": {
    pageName: "my_wallet"
  },
  "pages/personSecond/set/index": {
    pageName: "autoDecide"
  },
  "pages/shopCartList/index": {
    pageName: "shopcar",
    pageSource: "shopcar"
  },
  "pages/seckill/index": {
    pageName: "seckill_active"
  },
  "pages/settlementV2/subPage/settlementDiscounts/index": {
    pageName: "freightreduction"
  },
  "pages/addOnFreight/freight/index": {
    pageName: "collectFreight"
  },
  "pages/exchange/exchange": {
    pageName: "exchange"
  },
  "pages/store/subPage/couponMore/index": {
    pageName: "StoreCouponPage",
    pageSource: "storeAllCoupons"
  },
  "pages/store/subPage/promotionList/index": {
    pageName: "StoreHomeActivity",
    pageSource: "promotionPage"
  },
  "pages/store/subPage/suitList/index": {
    pageName: "StoreSuitList",
    pageSource: "StoreSuitList"
  },
  "pages/recommendSkuPage/recommendSkuPage": {
    pageName: "ChannelRecGoods"
  },
  "pages/addOn/landPage/collectOrderList/index": {
    pageName: "collectOrder"
  },
  "pages/brandLoveHome/index/index": {
    pageName: "brandLoveHome"
  },
  "pages/order/revise/index": {
    pageName: "orderModify"
  },
  "pages/communityRedpack/index": {
    pageName: "communityRedpack"
  },
  "pages/addOnFreight/freightSearch/index": {
    pageName: "collectFreightSearchResult"
  },
  "pages/addOn/landPage/collectOrderSearch/index": {
    pageName: "collectOrderSearchResult"
  },
  "pages/addOn/addOnList/index": {
    pageName: "PieceTogether"
  },
  "pages/addOn/addOnListSearch/index": {
    pageName: "PieceTogetherSearchResult"
  },
  "pages/settlementV2/subPage/map/index": {
    pageName: "mapLocation",
    pageSource: "mapLocation"
  },
  mini_shopcar: {
    pageName: "mini_shopcar"
  },
  couponListLayer: {
    pageName: "couponListLayer"
  },
  ExposureSpuGoods: {
    pageName: "ExposureSpuGoods"
  },
  priceRemindLayer: {
    pageName: "priceRemindLayer"
  },
  aggregateStoresLayer: {
    pageName: "aggregateStoresLayer"
  },
  couponLayer: {
    pageName: "couponLayer"
  },
  shopService: {
    pageName: "shopService"
  },
  outRange: {
    pageName: "outRange"
  },
  select_address: {
    pageName: "select_address"
  },
  redPacLayer: {
    pageName: "redPacLayer"
  },
  newCouponLayer: {
    pageName: "newCouponLayer"
  },
  "pages/newInvoice/list/index": {
    pageName: "createinvoice",
    pageSource: "invoice"
  },
  "pages/newInvoice/edit/index": {
    pageName: "editinvoiceheader",
    pageSource: "editinvoiceheader"
  },

  // 新添加
  "pages/friendHelp/detail/index": {
    pageName: "helpfriendinfo",
    pageSource: "helpfriendinfo"
  },
  "pages/friendHelp/list/index": {
    pageName: "friendshelplist",
    pageSource: "friendshelplist"
  },
  "pages/friendHelp/myList/index": {
    pageName: "myFriendsHelpList",
    pageSource: "myFriendsHelpList"
  },
  "pages/friendHelp/launch/index": {
    pageName: "MyLaunchHelpInvite",
    pageSource: "MyLaunchHelpInvite"
  },

  "pages/beansExchange-t/exchangeDetail/index": {
    pageName: "ExchangeDetailPage",
    pageSource: "ExchangeDetailPage"
  },
  "pages/beansExchange-t/myExchange/index": {
    pageName: "MyExchangePage",
    pageSource: "MyExchangePage"
  },

  "pages/bean-t/index": {
    pageName: "FreshBeanManor",
    pageSource: "FreshBeanManor"
  },

  "pages/signIn-t/record/index": {
    pageName: "SignRecord",
    pageSource: "SignRecord"
  },
  "pages/signIn-t/taskList/index": {
    pageName: "SignTask",
    pageSource: "SignTask"
  },
  "pages/signIn-t/newCustomerBenefit/index": {
    pageName: "SignNewCustomer",
    pageSource: "SignNewCustomer"
  },
  "pages/signIn-t/secondKillList/index": {
    pageName: "SignSecondKillList",
    pageSource: "SignSecondKillList"
  },

  "pages/phoneCharge-t/index": {
    pageName: "phoneCharge",
    pageSource: "phoneCharge"
  },
  "pages/phoneCharge-t/rechargeList/index": {
    pageName: "rechargeList",
    pageSource: "rechargeList"
  },
  "pages/phoneCharge-t/rechargeDetail/index": {
    pageName: "rechargeDetail",
    pageSource: "rechargeDetail"
  },
  "pages/phoneCharge-t/payResult/index": {
    pageName: "payResult",
    pageSource: "payResult"
  },

  "pages/vpayMember-t/home/index": {
    pageName: "newvippage",
    pageSource: "newvippage"
  }, // 付费会员
  "pages/vpayMember-t/instructions/index": {
    pageName: "PaidMemberHelp",
    pageSource: "PaidMemberHelp"
  }, // 付费规则
  "pages/vpayMember-t/taskPage/index": {
    pageName: "PaidMemberTask",
    pageSource: "PaidMemberTask"
  }, // 任务落地
  "pages/vpayMember-t/discountList/index": {
    pageName: "Redenvelopepage",
    pageSource: "Redenvelopepage"
  }, // 开卡大礼包
  "pages/vpayMember-t/couponTab/index": {
    pageName: "VIPrednewpage",
    pageSource: "VIPrednewpage"
  }, // 红包、津贴
  "pages/vpayMember-t/renew/index": {
    pageName: "renewpage",
    pageSource: "renewpage"
  }, // 会员缴费页
  "pages/vpayMember-t/introductionPage/index": {
    pageName: "vip_jintiejieshao",
    pageSource: "vip_jintiejieshao"
  }, // 津贴介绍页
  "pages/vpayMember-t/bountyList/index": {
    pageName: "vip_jintiemingxi",
    pageSource: "vip_jintiemingxi"
  }, // 津贴明细
  "pages/vpayMember-t/packageSelection/index": {
    pageName: "packageSelection",
    pageSource: "packageSelection"
  }, // 会员套餐选择
  "pages/vpayMember-t/memberDay/index": {
    pageName: "memberDay",
    pageSource: "memberDay"
  }, // 会员日
  "pages/vpayMember-t/manageRenew/index": {
    pageName: "manageRenew",
    pageSource: "manageRenew"
  }, // 退费管理
  "pages/vpayMember-t/exchangePage/index": {
    pageName: "vip_codepage",
    pageSource: "vip_codepage"
  }, // 异业合作兑换码

  "pages/vpaymember_t/home/index": {
    pageName: "newvippage",
    pageSource: "newvippage"
  }, // 付费会员
  "pages/vpaymember_t/instructions/index": {
    pageName: "PaidMemberHelp",
    pageSource: "PaidMemberHelp"
  }, // 付费规则
  "pages/vpaymember_t/taskPage/index": {
    pageName: "PaidMemberTask",
    pageSource: "PaidMemberTask"
  }, // 任务落地
  "pages/vpaymember_t/discountList/index": {
    pageName: "Redenvelopepage",
    pageSource: "Redenvelopepage"
  }, // 开卡大礼包
  "pages/vpaymember_t/couponTab/index": {
    pageName: "VIPrednewpage",
    pageSource: "VIPrednewpage"
  }, // 红包、津贴
  "pages/vpaymember_t/renew/index": {
    pageName: "renewpage",
    pageSource: "renewpage"
  }, // 会员缴费页
  "pages/vpaymember_t/introductionPage/index": {
    pageName: "vip_jintiejieshao",
    pageSource: "vip_jintiejieshao"
  }, // 津贴介绍页
  "pages/vpaymember_t/bountyList/index": {
    pageName: "vip_jintiemingxi",
    pageSource: "vip_jintiemingxi"
  }, // 津贴明细
  "pages/vpaymember_t/packageSelection/index": {
    pageName: "packageSelection",
    pageSource: "packageSelection"
  }, // 会员套餐选择
  "pages/vpaymember_t/memberDay/index": {
    pageName: "memberDay",
    pageSource: "memberDay"
  }, // 会员日
  "pages/vpaymember_t/manageRenew/index": {
    pageName: "manageRenew",
    pageSource: "manageRenew"
  }, // 退费管理
  "pages/vpaymember_t/exchangePage/index": {
    pageName: "vip_codepage",
    pageSource: "vip_codepage"
  }, // 异业合作兑换码
  "pages/hackOrder-t/detail/index": {
    pageName: "hackOrderDetail",
    pageSource: "hackOrderDetail",
  },
  "pages/hackOrder-t/launch/index": {
    pageName: "hackOrderLaunch",
    pageSource: "hackOrderLaunch",
  },

  "pages/differentIndustry-t/index": {
    pageName: "vipCooperatepage",
    pageSource: "vipCooperatepage"
  }, // 异业合作
  "pages/differentIndustry-t/yili/index": {
    pageName: "yiliVipCooperatepage",
    pageSource: "yiliVipCooperatepage"
  }, // 异业合作伊利四等奖
  "pages/differentIndustry-t/exchangePage/index": {
    pageName: "vip_code_cooperatepage",
    pageSource: "vip_code_cooperatepage"
  }, // 异业合作兑换码
  "pages/differentIndustry-t/home/index": {
    pageName: "vipcooperatepage_home",
    pageSource: "vipcooperatepage_home"
  }, // 异业合作自动跳店

  "pages/offLineActive-t/index": {
    pageName: "offlineGwdLanding",
    pageSource: "offlineGwdLanding"
  },
  "pages/getCoupon-t/index": {
    pageName: "wxcouponpage",
    pageSource: "wxcouponpage"
  }, // 新领券页

  "pages/cash-t/index": {
    pageName: "CashCreatorPage",
    pageSource: "CashCreatorPage"
  }, // 主页面
  "pages/cash-t/detail/index": {
    pageName: "CashHelpPage",
    pageSource: "CashHelpPage"
  }, // 卡片页
  "pages/cash-t/account/index": {
    pageName: "CashPage",
    pageSource: "CashPage"
  }, // 提现页
  "pages/orchard-t/index": {
    pageName: "orchard",
    pageSource: "orchard"
  },
  "pages/orchard-t/strategy/index": {
    pageName: "orchardStrategy",
    pageSource: "orchardStrategy"
  },
  "pages/orchard-t/myHarvest/index": {
    pageName: "orchardMyHarvest",
    pageSource: "orchardMyHarvest"
  },

  "pages/newUser-t/index": {
    pageName: "newComerActivity",
    pageSource: "newComerActivity"
  },
  "pages/newPerson-t/index": {
    pageName: "newPersonActivity",
    pageSource: "newPersonActivity"
  },
  "pages/takeCoupon-t/index": {
    pageName: "couponBranch",
    pageSource: "couponBranch"
  }, // 新领券页

  "pages/firstOrderFission-t/launch/index": {
    pageName: "firstOrderFissionlaunch",
    pageSource: "firstOrderFissionlaunch"
  }, // 首单发起详情，从首页进入
  "pages/firstOrderFission-t/detail/index": {
    pageName: "firstOrderFissiondetail",
    pageSource: "firstOrderFissiondetail"
  }, // 首单发起详情，从卡片进入
  "pages/firstOrderFission-t/account/index": {
    pageName: "firstOrderFissionaccount",
    pageSource: "firstOrderFissionaccount"
  }, // 提现

  "pages/bargain-t/launch/index": {
    pageName: "bargainlaunch",
    pageSource: "bargainlaunch"
  },
  "pages/bargain-t/list/index": {
    pageName: "bargainlist",
    pageSource: "bargainlist"
  },
  "pages/bargain-t/detail/index": {
    pageName: "bargaindetail",
    pageSource: "bargaindetail"
  },
  "pages/bargain-t/jrOpenmini/index": {
    pageName: "bargainjrOpenmini",
    pageSource: "bargainjrOpenmini"
  },

  "pages/redPacket-t/index": {
    pageName: "newRain",
    pageSource: "newRain"
  }, // 新红包雨
  "pages/storeCouponList/index": {
    // 京东小程序化-券购
    pageName: "StoreCouponPage",
    pageSource: "storeAllCoupons"
  },
  // 到店结算页
  "pages/toStore/reachSettle/index": {
    pageName: "settlementinfo",
    pageSource: "Settlement"
  },
  // 到店详情页
  "pages/toStore/reachDetails/index": {
    pageName: "goodsinfo",
    pageSource: "productDetail"
  },
  // 到店门店页
  "pages/toStore/reachStore/index": {
    pageName: "storeinfo",
    pageSource: "store"
  },
  // 到店商家资质页
  "pages/toStore/qualificatiion/index": {
    pageName: "storeQualify",
    pageSource: ""
  },
  "pages/newPersonB-t/index": {
    pageName: "newPersonB"
  }
};
module.exports = {
  routeMapName: pathUrlMap
};