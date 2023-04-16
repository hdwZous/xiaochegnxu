// import { functionIds } from './consts_platform';
import versionConfig from './releaseVersion'
const appVersion = versionConfig.appVersion;
export default {
  // 首页数据
  homeData: {
    // functionId: "indexh5/getIndex",
    functionId: "indexh5/getIndexPost",
    appVersion: appVersion
  },
  // 安全配置的白名单
  securityList: {
    functionId: "/group/item/list",
    appVersion: appVersion
  },
  mpHomeData: {
    functionId: "xapp/getIndexSimple",
    appVersion: appVersion
  },
  // 首页推荐门店列表
  storeListByMenu: {
    functionId: "zone/queryStoreListByMenu",
    appVersion: appVersion
  },
  // 首页底部商品推荐
  recommendSku: {
    functionId: "zone/recommendSkuList",
    appVersion: appVersion
  },
  recommendSkuListPost: {
    functionId: "zone/recommendSkuListPost",
    appVersion: appVersion
  },
  // 获取二维码信息
  getQrCode: {
    functionId: "inviter/code/getCodeInfo",
    appVersion: appVersion
  },
  // 获取新门店数据
  getNewStoreData: {
    functionId: "store/storeDetailV220",
    appVersion: appVersion
  },
  // 获取门店购物车数量
  getStoreCartNum: {
    functionId: "cartV3_3_0/getstoresum",
    appVersion: appVersion
  },
  // 门店商品列表
  storeGoodsList: {
    functionId: "storeIndexSearch/searchByCategoryPost",
    appVersion: appVersion
  },
  // spu商品规格
  spuSelect: {
    functionId: "spuSaleAttr/spuSaleAttrListPost",
    appVersion: appVersion
  },
  // 降价提醒弹层接口
  noticePrice: {
    functionId: "spuSaleAttr/priceRemind",
    appVersion: appVersion
  },
  // 降价提醒，开启接口
  noticePriceOpen: {
    functionId: "notice/saveDiscountNotice",
    appVersion: appVersion
  },
  // 获取优惠券
  getCoupon: {
    functionId: "get/getCounpon", // 即将废弃
    appVersion: appVersion
  },
  // 点赞
  doFollow: {
    functionId: "store/doFollow",
    appVersion: appVersion
  },
  // 结算校验
  verifySettle: {
    functionId: "cartV3_3_0/verifySettlePost",
    appVersion: appVersion
  },
  // 加减购物车
  cartControl: {
    functionId: "cartV3_3_0/changeItemNumPost",
    appVersion: appVersion
  },
  // 清除购物车商品
  removeCart: {
    functionId: "cartV3_3_0/removeItem",
    appVersion: appVersion
  },
  // 购物车
  querySingleCart: {
    functionId: "cartV3_3_0/querySingleCartPost",
    appVersion: appVersion
  },
  // mini购物车取消勾选商品
  miniCartUnCheckItem: {
    functionId: "cartV3_3_0/uncheckItem",
    appVersion: appVersion
  },
  // mini购物车勾选商品
  miniCartCheckItem: {
    functionId: "cartV3_3_0/checkItem",
    appVersion: appVersion
  },
  // mini购物车取消勾选全部商品
  miniCartUnCheckAllItem: {
    functionId: "cartV3_3_0/uncheckAllItemsPost",
    appVersion: appVersion
  },
  // mini购物车勾选全部商品
  miniCartCheckAllItem: {
    functionId: "cartV3_3_0/checkAllItemsPost",
    appVersion: appVersion
  },
  // mini购物车清空商品
  miniCartRemoveAllItem: {
    functionId: "cartV3_3_0/removeAllItemsPost",
    appVersion: appVersion
  },
  // 购物车清空失效商品
  removeAllFailureGoods: {
    functionId: "cartV3_3_0/removeItems",
    appVersion: appVersion
  },
  // 页头小黄条
  orderListTopHint: {
    functionId: "order/orderListTopHint",
    appVersion: appVersion
  },
  // 拼团订单详情
  orderInfo: {
    functionId: "order/info",
    appVersion: appVersion
  },
  // 拼团-参团
  groupJoin: {
    functionId: "xapp/groupJoin",
    appVersion: appVersion
  },
  // spu单品详情
  goodsDetail: {
    functionId: "product/detailPost",
    appVersion: appVersion
  },
  // 拼团支付结果页
  groupPayFinish: {
    functionId: "xapp/groupPayFinish",
    appVersion: appVersion
  },
  // 位置转化
  transferAddress: {
    // functionId: "local/getAddressN",
    functionId: "local/getAddressNPost",
    appVersion: appVersion
  },
  // 拼团结算
  getGroupShopping: {
    functionId: "miniApp/getGroupShopping",
    appVersion: appVersion
  },
  // 拼团结算门店列表
  getExtractStationList: {
    functionId: "miniApp/getExtractStationList",
    appVersion: appVersion
  },
  // 拼团提单
  submitGroupOrder: {
    functionId: "order/groupOrder",
    appVersion: appVersion
  },
  // 拼团列表
  groupList: {
    functionId: "xapp/groupList",
    appVersion: appVersion
  },
  // 拼团详情页
  groupDetail: {
    functionId: "xapp/groupDetail",
    appVersion: appVersion
  },
  // 拼团-支付后校验
  groupPayCheck: {
    functionId: "xapp/groupPayCheck",
    appVersion: appVersion
  },
  // 拼团-获取分享朋友圈图片
  getGroupSharePicture: {
    functionId: "xapp/group/getSharePicture",
    appVersion: appVersion
  },

  // 我的页获取用户账户信息
  getUserAccountInfo: {
    // functionId: "mine/getUserAccountInfo",
    functionId: "mine/getUserAccountInfoPost",
    appVersion: appVersion
  },
  // 我的页获取用户v+会员信息
  getClassifyModuleInfo: {
    functionId: "mine/getClassifyModuleInfo",
    appVersion: appVersion
  },
  // 我的页钱包等小红点
  getRedDot: {
    // functionId: "user/redDot",
    functionId: "user/redDotPost",
    appVersion: appVersion
  },
  // 取消红包小红点
  updateRedPacketRead: {
    functionId: "mine/updateRedPacketRead",
    appVersion: appVersion
  },
  // 更新优惠卷消息为已读
  updateCouponRead: {
    functionId: "user/updateCouponRead",
    appVersion: appVersion
  },
  // 个人中心商品feeds
  getRecommend: {
    functionId: "mine/getRecommend",
    appVersion: appVersion
  },
  // 我的页获取个性化推荐
  getUserRecommendStatus: {
    functionId: "mine/getUserRecommendStatus",
    appVersion: appVersion
  },
  // 我的页设置个性化推荐
  updateUserRecommendStatus: {
    functionId: "mine/updateUserRecommendStatus",
    appVersion: appVersion
  },
  // 我的关注门店列表
  getFollowStoreList: {
    functionId: "store/getFollowStoreList",
    appVersion: appVersion
  },
  // 砍价-发起砍价-new
  senderCutPrice: {
    functionId: "xapp/senderCutPrice",
    appVersion: appVersion
  },
  // 砍价-验证能否发起砍价-new
  validSenderCutPrice: {
    functionId: "xapp/validSenderCutPrice",
    appVersion: appVersion
  },

  // 自己系统中退出登录(相对京东系统)
  selfLogout: {
    functionId: "userInfo/logout",
    appVersion: appVersion
  },

  // 新建用药人信息
  insertUseDrugInfo: {
    functionId: "userinfo/insertUseDrugInfo",
    appVersion: appVersion
  },
  // 删除用药人
  deleteUseDrugInfo: {
    functionId: "userinfo/deleteUseDrugInfo",
    appVersion: appVersion
  },
  // 修改用药人
  updateUseDrugInfo: {
    functionId: "userinfo/updateUseDrugInfo",
    appVersion: appVersion
  },
  // 获取用药人列表
  getUseDrugInfoList: {
    functionId: "userinfo/getUseDrugInfoList",
    appVersion: appVersion
  },
  // 分享有礼页面数据
  shareInfo: {
    functionId: "gameAccessories/getInfoAccessories",
    appVersion: appVersion
  },
  // 分享有礼，红包裂变资源位
  getConfigInfo: {
    functionId: "xapp/getConfigInfo",
    appVersion: appVersion
  },
  // 裂变-获得爆品
  newUserPage: {
    functionId: "xapp/resourcePage/newUserPage",
    appVersion: appVersion
  },
  // 或去分享有礼分享链接
  getShareRewardLink: {
    functionId: "inviter/share/getShareLinkForCoupon",
    appVersion: appVersion
  },
  // 超级会员码优惠券
  superMemberCoupon: {
    functionId: "superMember/index",
    appVersion: appVersion
  },
  // 获取门店列表
  superNumStationList: {
    functionId: "superMember/getStationList",
    appVersion: appVersion
  },
  // 支付成功页获取裂变红包资源位
  getRedPackActivityInfo: {
    functionId: "activity/getRedPackActivityInfo",
    appVersion: appVersion
  },
  // 结算页基本数据
  settleAccount: {
    functionId: "marketsettle/getCurrentAccountNewPost",
    appVersion: appVersion
  },
  // 结算页门店地图信息
  settleStoresMap: {
    functionId: "marketsettle/getStoresMap",
    appVersion: appVersion
  },
  // 提单
  orderSubmit34: {
    functionId: "order/submit34",
    appVersion: appVersion
  },
  // 判断是否有新人红包
  redPacket: {
    functionId: "promotionGame/redPacket/get",
    appVersion: appVersion
  },
  // 专属优惠券
  exclusiveCoupon: {
    functionId: "xapp/friendHelp/getActivityByIndex",
    appVersion: appVersion
  },
  // 保存微信用户信息接口
  saveWxUserInfo: {
    functionId: "xapp/wechat/saveUserInfo",
    appVersion: appVersion
  },
  // 登录||获取UnionId接口
  loginByPtKeyNew: {
    functionId: "xapp/loginByPtKeyNew",
    appVersion: appVersion
  },
  // 老带新团-开团、参团接口：
  joinGroup: {
    functionId: "xapp/oldBeltNew/joinGroup",
    appVersion: appVersion
  },
  // 老带新团-列表
  ordInviteNewList: {
    functionId: "xapp/oldBeltNew/groupList",
    appVersion: appVersion
  },
  // 老带新团-商品详情
  queryGroupSkuPage: {
    functionId: "xapp/oldBeltNew/queryGroupSkuPage",
    appVersion: appVersion
  },
  // 老带新团-拼团详情
  oldGroupDetail: {
    functionId: "xapp/oldBeltNew/groupDetail",
    appVersion: appVersion
  },
  // 我的老带新团
  myOldInviteNewOrder: {
    functionId: "xapp/oldBeltNew/myGroupList",
    appVersion: appVersion
  },
  // 优惠券不可用原因
  queryCouponUnusableReason: {
    functionId: "voucher/queryCouponUnusableReason",
    appVersion: appVersion
  },
  // 请求openId
  requestOpenId: {
    functionId: "xapp/loginbycode",
    appVersion: appVersion
  },
  // 参与或者发起好友助力
  joinOrLaunchFriendHelp: {
    functionId: "xapp/friendHelp/join",
    appVersion: appVersion
  },
  // 助力券-获取分享数据
  getCouponShareInfo: {
    functionId: "share/multiData",
    appVersion: appVersion
  },
  // 检验用户是否关注门店
  getStationAttention: {
    functionId: "station/getStationAttention",
    appVersion: appVersion
  },
  // 取消||关注门店
  changeAttention: {
    functionId: "store/doFollow",
    appVersion: appVersion
  },
  // 门店获客获取券列表
  getHkNewCoupon: {
    functionId: "get/getHkNewCoupon",
    appVersion: appVersion
  },
  // 团长代收列表
  groupOrderList: {
    functionId: "xapp/group/orderList",
    appVersion: appVersion
  },
  // 团长代收详情
  groupOrderDetail: {
    functionId: "xapp/group/orderDetail",
    appVersion: appVersion
  },
  // 团长代收取消订单
  candleOrder: {
    functionId: "xapp/group/orderCancel",
    appVersion: appVersion
  },
  // 签到-我的页签到点击
  savePushMsgForWeChat: {
    functionId: "signin/savePushMsgForWeChat",
    appVersion: appVersion
  },
  // 任务--领取任务
  getTask: {
    functionId: "signin/getTask",
    appVersion: appVersion
  },
  // 任务-查询任务
  queryTaskInfo: {
    functionId: "signin/queryTaskInfo",
    appVersion: appVersion
  },
  // 任务-完成任务
  finishTask: {
    functionId: "signin/finshTask",
    appVersion: appVersion
  },
  // 新人落地页接口
  newerResource: {
    functionId: "xapp/resourcePage/newUserPage",
    appVersion: appVersion
  },
  // 直接加车去结算接口
  uncheckAddGoods: {
    functionId: "cartV3_3_0/uncheckAddGoods",
    appVersion: appVersion
  },
  // 新人落地页商品列表/门店列表分页
  productOrStoreList: {
    functionId: "xapp/resourcePage/productOrStoreList",
    appVersion: appVersion
  },
  // 领取新人券
  newUserGrabCoupon: {
    functionId: "xapp/resourcePage/newUserGrabCoupon",
    appVersion: appVersion
  },
  // 【微常准赔付】中间页获取按钮状态
  getWeBankStatus: {
    functionId: "xapp/webank/getUserAccountStatus",
    appVersion: appVersion
  },
  // 【微常准赔付】中间页开通临时账户
  openWeBankTempAccount: {
    functionId: "xapp/webank/userAccountStatusChange",
    appVersion: appVersion
  },
  // 【微常准赔付】订单列表和订单详情的获取鲜豆
  getOrderBeans: {
    functionId: "order/grabPayout",
    appVersion: appVersion
  },
  // 【微常准赔付】获取问号提示文案
  getQuestionText: {
    functionId: "marketCms/getHtml",
    appVersion: appVersion
  },
  // 券购列表
  stroreIdInCoordinatorAndType: {
    functionId: "coupon/getStationList",
    appVersion: appVersion
  },
  // 券购门店商品
  couponApplyGoods: {
    functionId: "coupon/applyGoods",
    appVersion: appVersion
  },
  /**
   * 更新tip文案
   * 加车 减车  收起购物车 从上一页返回券购页调用
   */
  couponPriceDiff: {
    functionId: "coupon/getPriceDiff",
    appVersion: appVersion
  },
  // 获取订单取消原因列表
  cancelOrderReason: {
    functionId: "order/cancel/page",
    appVersion: appVersion
  },
  // 取消订单
  cancelOrder: {
    functionId: "order/orderCancel",
    appVersion: appVersion
  },
  // 门店共赢
  wincoupon: {
    functionId: "xapp/wincouponreceive/new",
    appVersion: appVersion
  },
  // 凑单列表页获取列表数据
  couponTogetherOrder: {
    functionId: "coupon/couponTogetherOrderPost",
    appVersion: appVersion
  },
  // 凑单列表页--获取凑单文案
  getCartForCouponDesc: {
    functionId: "coupon/getCartForCouponDescPost",
    appVersion: appVersion
  },
  // 获取去凑单优惠券列表
  getCouponList: {
    functionId: "cartV3_3_0/getCouponList",
    appVersion: appVersion
  },
  // 领取优惠券
  grabCoupon: {
    // functionId: "grab/grabCoupon",
    functionId: "coupon/grabCouponPost",
    appVersion: appVersion
  },
  // 领取分享券
  grabShareCoupon: {
    functionId: "share/multiDataLogin",
    appVersion: appVersion
  },
  // 订阅消息接口
  subscribeMsg: {
    functionId: "xapp/subscribeMsg",
    appVersion: appVersion
  },
  // 获取城市列表排序
  getCitiesSort: {
    functionId: "addresspdj/getCitiesSort",
    appVersion: appVersion
  },
  // 获取城市列表排序
  getHotCities: {
    functionId: "addresspdj/getHotCities",
    appVersion: appVersion
  },
  // 清除常用城市列表
  clearHotCities: {
    functionId: "addresspdj/clearHotCity",
    appVersion: appVersion
  },
  // 发起砍订单
  sendCutOrder: {
    functionId: "xapp/cpOrder/sendCut",
    appVersion: appVersion
  },
  // 搭配购买
  recommendSkus: {
    functionId: "productsearch/recommendSkusPost",
    appVersion: appVersion
  },
  // 商品优惠券
  getGoodsCouponList: {
    functionId: "coupon/getGoodsCouponList",
    appVersion: appVersion
  },
  // 门店tab
  tabActivity: {
    functionId: "store/activityPost",
    appVersion: appVersion
  },
  // 秒杀落地页初始化
  grabFloorListNew: {
    functionId: "grab/grabFloorListNew",
    appVersion: appVersion
  },
  // 秒杀落地页分类查询商品接口
  grabFloorSkuList: {
    functionId: "grab/queryGrabFloorSkuList",
    appVersion: appVersion
  },
  // 结算页-降级运费
  queryFreightDiscountList: {
    functionId: "deliverydiscount/queryFreightDiscountList",
    appVersion: appVersion
  },
  // 结算页-降级红包
  queryRedPacketList: {
    functionId: "redPacketDiscount/queryRedPacketList",
    appVersion: appVersion
  },
  // abTest
  abTest: {
    functionId: "xapp/abTest",
    appVersion: appVersion
  },
  // 获取群Id
  getWxGroupId: {
    functionId: "xapp/wechat/getWxGroupId",
    appVersion: appVersion
  },
  // 提醒添加小程序
  isRemindAddMp: {
    functionId: "xapp/myApp/isRemindAdd",
    appVersion: appVersion
  },
  clickAddMp: {
    functionId: "xapp/myApp/clickAdd",
    appVersion: appVersion
  },
  // 满折，打包，捆绑落地页
  pieceLandingSkuList: {
    functionId: "orderdiscount/getPieceLandingSkuList",
    appVersion: appVersion
  },
  // 落地页描述信息
  pieceDesc: {
    functionId: "orderdiscount/getPieceDesc",
    appVersion: appVersion
  },
  // 购物车换购等
  addGift: {
    functionId: "cartV3_3_0/addGift",
    appVersion: appVersion
  },
  // 红包兑换弹层
  vipChangePopInfo: {
    functionId: "vip/convertCouponCheck",
    appVersion: appVersion
  },
  // 兑换红包
  changeRedPacketCoupon: {
    functionId: "vip/convertCoupon",
    appVersion: appVersion
  },
  // 一键兑换红包
  convertCouponOneKey: {
    functionId: "vip/convertCouponOneKey",
    appVersion: appVersion
  },
  // 购物车删除赠品
  removeGifts: {
    functionId: "cartV3_3_0/removeGiftsPost",
    appVersion: appVersion
  },
  // 券跳转协议
  couponProtocol: {
    functionId: "coupon/singleCouponTreadyPost",
    appVersion: appVersion
  },
  // 活动页券跳转协议
  activityCouponProtocol: {
    functionId: "coupon/activityCouponTreaty",
    appVersion: appVersion
  },
  // 活动页兑换红包
  activityConvertCoupon: {
    functionId: "vip/convertCoupon",
    appVersion: appVersion
  },
  // 结算页面降级接口
  lowCaseVoucher: {
    functionId: "voucher/getVoucherModeInfoResp",
    appVersion: appVersion
  },
  // 首页弹层信息
  homePop: {
    functionId: "lauch/aggregation",
    appVersion: appVersion
  },
  // 全局活动页
  globalActivity: {
    functionId: "act/getActivityPagePost",
    appVersion: appVersion
  },
  // 活动页刷新签到楼层
  ActivityRefreshSignInFloor: {
    functionId: "promo/active/home",
    appVersion: appVersion
  },
  // 查询全局购物车信息
  queryAllCartsNum: {
    functionId: "cartV3_3_0/queryAllCartsNum",
    appVersion: appVersion
  },
  // 全局活动页签到
  globalActivitySign: {
    functionId: "promo/active/sign",
    appVersion: appVersion
  },
  // 附近商家
  nearbyStore: {
    functionId: "zone/recommendStoreListPost",
    appVersion: appVersion
  },
  // 获取附近门店数量
  getStoreNum: {
    functionId: "zone/getNumFilterTag",
    appVersion: appVersion
  },
  // 门店活动页
  storeActivity: {
    functionId: "act/storeActPagePost",
    appVersion: appVersion
  },
  // 频道页配置信息
  channelDetail: {
    functionId: "zone/getNewChannelDetailPost",
    appVersion: appVersion
  },
  // 腰带楼层
  beltPromptBar: {
    functionId: "lauch/beltPromptBarPost",
    appVersion: appVersion
  },
  // 推荐商品列表页接口
  channelRecommendSkus: {
    functionId: "landingPage/channelRecommendSkusPost",
    appVersion: appVersion
  },
  // 频道页面列表数据
  getChannelSkuList: {
    functionId: "zone/recommendChannelSkuList",
    appVersion: appVersion
  },
  // 挽留再营销接口
  leaveMarketing: {
    functionId: "lauch/leaveMarketing",
    appVersion: appVersion
  },
  // 聚合频道弹层
  getRecommendStoreInfos: {
    functionId: "lauch/getRecommendStoreInfos",
    appVersion: appVersion
  },
  // 附近门店id
  nearbyStoreId: {
    functionId: "station/getStationId",
    appVersion: appVersion
  },
  // 订单详情
  orderInfoNew: {
    functionId: "order/infoNew",
    appVersion: appVersion
  },
  // 8.4版本 订单详情页抽奖
  freePrizeDraw: {
    functionId: "order/freePrizeDraw",
    appVersion: appVersion
  },
  // 大转盘抽奖
  freePrizeDrawV2: {
    functionId: "orderFinish/freePrizeDrawV2.0",
    appVersion: appVersion
  },
  // 结算页 添加超值换购
  addGiftsSupportMultiSkus: {
    functionId: "cartV3_3_0/addGiftsSupportMultiSkusPost",
    appVersion: appVersion
  },
  // 门店首页
  storeIndex: {
    functionId: "store/actAreaPost",
    appVersion: appVersion
  },
  // 券购落地页领券接口
  couponGoGrab: {
    // functionId: "coupon/couponGoGrabCoupon",
    functionId: "coupon/couponGoGrabCouponPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 券购落地页门店列表
  couponGoStoreList: {
    // functionId: "/coupon/v8ApplyStoreList",
    appVersion: appVersion,
    functionId: "coupon/v8ApplyStoreListPost",
    method: "POST"
  },
  // 券购落地页初始化
  v8Init: {
    // functionId: "/coupon/v8InitCategoryAndGoods",
    appVersion: appVersion,
    functionId: "coupon/v8InitCategoryAndGoodsPost",
    method: "POST"
  },
  // 券购落地页过滤商品
  v8SearchGoods: {
    functionId: "coupon/v8SearchGoodsPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 券购落地页小黄条
  v8PriceDiff: {
    functionId: "coupon/v8PriceDiffPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 券购落地页请求筛选接口
  v8ScreenButt: {
    functionId: "/coupon/v8ScreenButt",
    appVersion: appVersion
  },
  // 店内搜索落地页
  storeIndexSearch: {
    functionId: "storeIndexSearch/searchPost",
    appVersion: appVersion
  },
  // 全局搜索落地页
  homeGoodsSearch: {
    functionId: "homeSearch/searchSkuResultByTab",
    appVersion: appVersion
  },
  // 全局搜索结果页门店列表
  homeStoresSearch: {
    functionId: "homeSearch/searchByTab",
    appVersion: appVersion
  },
  // 全局搜索落地页
  homePromotionGoodsSearch: {
    functionId: "promotionSearch/searchStoreGoodsPost",
    appVersion: appVersion
  },
  // 全局搜索结果页门店列表
  homePromotionStoresSearch: {
    functionId: "promotionSearch/searchByStoreMultiPost",
    appVersion: appVersion
  },
  // 全局搜索落地页
  floorSkus: {
    functionId: "store/floorSkus",
    appVersion: appVersion
  },
  // 运费落地页
  queryFreeFreightDetails: {
    functionId: "freeFreightProduct/queryFreeFreightDetails",
    appVersion: appVersion
  },
  queryClassifyMenuList: {
    functionId: "freeFreightProduct/queryClassifyMenuList",
    appVersion: appVersion
  },
  queryFreeFreightProductList: {
    functionId: "freeFreightProduct/queryFreeFreightProductList",
    appVersion: appVersion
  },
  // 获取地址列表
  getAddressList: {
    // functionId: "addresspdj/getAddressList",
    functionId: "addresspdj/getAddressListPost",
    appVersion: appVersion
  },
  // 获取搜索联想词
  getSearchList: {
    functionId: "suggest/listPost",
    appVersion: appVersion
  },
  // 搜索热词
  getHotWords: {
    functionId: "hotWords/list",
    appVersion: appVersion
  },
  // 支付成功页聚合信息
  combinationInfo: {
    functionId: "orderFinish/combinationInfo",
    appVersion: appVersion
  },
  // 支付成功页推荐商品
  orderRecommend: {
    functionId: "orderFinish/recommend",
    appVersion: appVersion
  },
  // 支付成功关注门店
  followStore: {
    functionId: "other/store/watch/toggle",
    appVersion: appVersion
  },
  afterPushInCart: {
    functionId: "zone/recommendSkuAfterPushInCartPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 获取门店页 促销分类下商品
  getPromotionSkuList: {
    functionId: "orderdiscount/getPromotionSkuListPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 获取门店促销分类标签列表
  getPromotionLabelList: {
    functionId: "orderdiscount/getPromotionLabelListPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 运费凑单落地页
  freightTogetherOrder: {
    functionId: "freight/freighttogetherorderPost",
    appVersion: appVersion
  },
  // 运费凑单落地页小黄条
  freightTogetherOrderTip: {
    functionId: "freight/freightTogetherOrderTip",
    appVersion: appVersion
  },
  // 订单修改页面接口
  reviseOrderPage: {
    functionId: "order/update/page",
    appVersion: appVersion
  },
  // 订单备注校验
  orderRemarkCheck: {
    functionId: "order/update/remark/check",
    appVersion: appVersion
  },
  // 修改订单
  reviseOrderSubmit: {
    functionId: "order/update/submit",
    appVersion: appVersion
  },
  // 取消订单原因校验
  cancelOrderCheck: {
    functionId: "order/cancel/reasonCheck",
    appVersion: appVersion
  },
  // 结算页挽留弹层领券
  mlioncoupon: {
    functionId: "mlion/coupon/grabCoupon",
    appVersion: appVersion
  },
  // 套装落地页
  getFloatLayerPromotion: {
    functionId: "orderdiscount/getFloatLayerPromotion",
    appVersion: appVersion
  },
  // 删除订单
  orderDelete: {
    functionId: "order/orderDelete",
    appVersion: appVersion
  },
  // 检查门店是否已下线
  checkStoreStatus: {
    functionId: "check/checkBeforeToStoreDetail",
    appVersion: appVersion
  },
  // 生成码
  createQrCode: {
    functionId: "xapp/createQrCode",
    appVersion: appVersion
  },
  // 获取分享素材
  getShareMaterial: {
    functionId: "xapp/share/getMaterial",
    appVersion: appVersion
  },
  // 小程序强制更新
  needUpGrade: {
    functionId: "xapp/needUpgrade",
    appVersion: appVersion
  },
  // 获取埋点数据
  getNewBuried: {
    functionId: "xapp/getNewBuried",
    appVersion: appVersion
  },
  // 结算页订单地址
  containsStoreId: {
    functionId: "addresspdj/containsStoreId",
    appVersion: appVersion
  },
  // 获取城市列表
  getCities: {
    functionId: "addresspdj/getCities",
    appVersion: appVersion
  },
  // 更新城市列表
  updateAddress: {
    functionId: "addresspdj/updateAddress",
    appVersion: appVersion
  },
  // 添加城市列表
  addAddress: {
    functionId: "addresspdj/addAddress",
    appVersion: appVersion
  },
  // 删除城市列表
  delAddress: {
    functionId: "addresspdj/delAddress",
    appVersion: appVersion
  },
  // 获取附近城市列表
  getLocalAddressList: {
    functionId: "local/getAddressList",
    appVersion: appVersion
  },
  // 获取地址搜索联想词儿
  addressSearch: {
    functionId: "address/search",
    appVersion: appVersion
  },
  // 获取地址历史记录
  getSearchInfos: {
    functionId: "local/getSearchInfos",
    appVersion: appVersion
  },
  // 添加地址历史记录
  addSearchInfo: {
    functionId: "local/addSearchInfo",
    appVersion: appVersion
  },
  // 删除地址历史记录
  delSearchInfos: {
    functionId: "local/delSearchInfos",
    appVersion: appVersion
  },
  // 专属助力券
  getActivityByCoupon: {
    functionId: "xapp/friendHelp/getActivityByCoupon",
    appVersion: appVersion
  },
  // 我的券列表
  myCouponList: {
    functionId: "user/myCouponListV2",
    appVersion: appVersion
  },
  // 获取优惠
  getVoucherListFive: {
    functionId: "voucher/getVoucherListFive",
    appVersion: appVersion
  },

  // 获取优惠券推送code
  getCouponByPushCode: {
    functionId: "get/getCouponByPushCode",
    appVersion: appVersion
  },
  // 获取登录
  loginTicket: {
    functionId: "login/ticket",
    appVersion: appVersion
  },
  // 直播列表
  getLiveInfoList: {
    functionId: "wechatlive/getLiveInfoList",
    appVersion: appVersion
  },
  // 订单状态
  orderState: {
    functionId: "order/state",
    appVersion: appVersion
  },
  // 支付结果
  getOrderPayStatus: {
    functionId: "supermember/getOrderPayStatus",
    appVersion: appVersion
  },
  // 获取红包列表
  myRedPacketList: {
    functionId: "user/myRedPacketList",
    appVersion: appVersion
  },
  // 获取红包说明
  couponIntroduce: {
    functionId: "user/couponIntroduce",
    appVersion: appVersion
  },
  // 获取门店更多优惠券列表
  stationMoreCouponInfo: {
    functionId: "coupon/stationMoreCouponInfo",
    appVersion: appVersion
  },
  // 我的订单列表
  orderList: {
    functionId: "order/listV2.0",
    appVersion: appVersion
  },
  // 新我的订单列表
  newOrderList: {
    functionId: "order/listV3",
    appVersion: appVersion
  },
  // 订单详情页推荐商品feeds接口
  orderDetailFeeds: {
    functionId: "order/orderDetail/recommend",
    appVersion: appVersion
  },
  // 根据传入sid和deviceid生成新的登录态
  throughLogin: {
    functionId: "xapp/throughLogin",
    appVersion: appVersion
  },
  // 获取openId
  getNewOpenId: {
    functionId: "xapp/wechat/getWxUserInfoAndLog",
    appVersion: appVersion
  },
  // feed中间页面
  getRecommendSkuInfos: {
    functionId: "lauch/getRecommendSkuInfosPost",
    appVersion
  },
  // 异业合作京东农场领水滴领取优惠券接口(目前只用于获取门店id)
  takeCoupon: {
    functionId: "vip/third/party/takeCoupon",
    appVersion: appVersion
  },
  // 根据登录态获取临时登录token(配合throughLogin接口解密token生成新的登录态)
  token: {
    functionId: "userLogin/token",
    appVersion: appVersion
  },
  uvpTag: {
    functionId: "uvp_act_gateway_tag",
    appVersion: appVersion
  },
  // 购物车一键勾选今日加购
  akeyPurchased: {
    functionId: "cartV3_3_0/checkTodayPurchaseAndUncheckOtherItems",
    appVersion: appVersion
  },
  // 购物车一键开通会员
  shopCartOnClick: {
    functionId: "gateway/openCardByShopCartOnClick",
    appVersion: appVersion
  },
  // 单品结算跳转校验
  verifySettleForSkuList: {
    functionId: "cartV3_3_0/verifySettleForSkuListPost",
    appVersion: appVersion
  },
  // 门店线下扫码自动加车
  scanSku: {
    functionId: "store/scanSku",
    appVersion: appVersion
  },
  // 查询社群红包
  redPacketTips: {
    functionId: "community/redPacket/redPacketTips",
    appVersion: appVersion
  },
  // 领取社群红包
  openRedPacket: {
    functionId: "community/redPacket/openRedPacket",
    appVersion: appVersion
  },
  // 红包活动页-首页接口
  activityIndex: {
    functionId: "community/activity/index",
    appVersion: appVersion
  },
  // 红包活动页-群领取记录接口
  redPacketRecord: {
    functionId: "community/activity/redpacketRecord",
    appVersion: appVersion
  },
  // 红包记录弹层接口
  walletDetails: {
    functionId: "community/activity/walletDetails",
    appVersion: appVersion
  },
  // 社群红包提现接口
  redPacketWithdraw: {
    functionId: "community/redPacket/withdraw",
    appVersion: appVersion
  },
  // 社群红包提现接口
  getRule: {
    functionId: "community/activity/getRule",
    appVersion: appVersion
  },
  getRetainLayer: {
    functionId: "marketsettle/getRetainLayer",
    appVersion: appVersion
  },
  // 多规格弹层获取套装
  spuSuitInfo: {
    functionId: "product/suitInfo",
    appVersion: appVersion
  },
  // 门店页开通商家会员
  storeOpenMember: {
    functionId: "gateway/openCardByStorePageOnClick",
    appVersion: appVersion
  },
  // 获取入会弹窗文案信息
  brandMemberLayerInfo: {
    functionId: "pavilionWeb/member/layerInfo",
    appVersion: appVersion
  },
  // 领取品牌券
  getBrandCoupon: {
    functionId: "pavilionWeb/member/grapCoupon",
    appVersion: appVersion
  },
  // 刷新门店首页优惠券楼层数据
  refreshCouponFloor: {
    functionId: "store/refreshCouponFloor",
    appVersion: appVersion
  },
  // 我的优惠券页面支持兑换码
  exchangeCode: {
    functionId: "share/exchangeCouponByCode",
    appVersion: appVersion
  },
  // 上报推广人员信息
  reportPromote: {
    functionId: "uvp_lbs_inviterBindInfo",
    appVersion: appVersion
  },
  // 加群二维码查询
  joinPage: {
    functionId: "group/joinPage",
    appVersion: appVersion
  },
  // 在线加群悬浮球和加群二维码
  onlineJoin: {
    functionId: "group/onlineJoin",
    appVersion: appVersion
  },
  giftCardApp: {
    functionId: "giftCardApp/submitOrder",
    appVersion: appVersion
  },
  // 预售结算校验
  preSellVerify: {
    functionId: "cartV3_3_0/verifySettleForPreSellPost",
    appVersion: appVersion
  },
  // 社群红包提现校验接口
  withdrawCheck: {
    functionId: "community/redPacket/withdrawCheck",
    appVersion: appVersion
  },
  singleProductNew: {
    functionId: "rePurchase/singleProductNew",
    appVersion: appVersion
  },
  // 获取最近订单（爆品自提用于判断是否超出限购）
  recentOrderList: {
    functionId: "order/recent/orderList",
    appVersion: appVersion
  },
  // 中间号校验（弹窗）
  checkMiddleNumber: {
    functionId: "order/checkMiddleNumber",
    appVersion: appVersion
  },
  // 获取中间号
  getMiddleNumber: {
    functionId: "order/getMiddleNumber",
    appVersion: appVersion
  },
  // 监控截图
  reportScreenshot: {
    functionId: "sr/r",
    appVersion: appVersion
  },
  // 获取骑手坐标
  getCoordinate: {
    functionId: "order/coordinate",
    appVersion: appVersion
  },
  // 常逛门店及省钱提示
  getHotStationCombine: {
    functionId: "order/hotStationCombine",
    appVersion: appVersion
  },
  // 券聚合落地页初始化接口
  initFullPromotion: {
    functionId: "promotion/go/initFullPromotion",
    appVersion: appVersion
  },
  // 点击优惠券和三级分类
  initPromotion: {
    functionId: "promotion/go/initPromotion",
    appVersion: appVersion
  },
  // 点击优惠券和三级分类
  redTip: {
    functionId: "promotion/go/redBar",
    appVersion: appVersion
  },
  // 查询全局购物车feeds
  globalShopCartFeeds: {
    functionId: "cartV3_3_0/queryGlobalShopCartFeeds",
    appVersion: appVersion
  },
  queryallcarts: {
    functionId: "cartV3_3_0/queryallcarts",
    appVersion: appVersion
  },
  queryMultiCartInfo: {
    functionId: "cartV3_3_0/queryMultiCartInfo",
    appVersion: appVersion
  },
  // 购买会员卡
  buycard: {
    functionId: "gateway/buycard",
    appVersion: appVersion
  },
  // 续费会员卡
  renewcard: {
    functionId: "gateway/renewcard",
    appVersion: appVersion
  },
  // 门店ab实验
  globalAb: {
    functionId: "global/abTest",
    appVersion: appVersion
  },
  // 新门店主页接口
  storeHomepage: {
    functionId: "store/homepage",
    appVersion: appVersion
  },
  // 门店超区
  storeOverZone: {
    functionId: "store/popTips",
    appVersion: appVersion
  },
  // 门店优惠券弹窗（来来推或者助力）
  couponPop2: {
    functionId: "xapp/couponList",
    appVersion: appVersion
  },
  followStock: {
    functionId: "sockout/setFollowStockoutSku",
    appVersion: appVersion
  },
  queryBrandHref: {
    functionId: "inviter/v2/coupon/queryBrandHref",
    appVersion: appVersion
  },
  // 8.20 门店异步刷新券接口
  asyncFreshStoreCoupon: {
    functionId: "store/couponPop",
    appVersion: appVersion,
    method: "POST"
  },
  // 8.20 领取商家会员券
  grabBusinessCoupon: {
    functionId: "gateway/grabCoupon",
    appVersion: appVersion
  },
  reportBusiness: {
    functionId: "newUserStrategy/foreEndStartup",
    appVersion: appVersion
  },
  // 门店天降接口（膨胀券弹层也是在这个接口里）
  storePopUp: {
    functionId: "store/popupPost",
    appVersion: appVersion,
    method: "POST"
  },
  // 膨胀系统下发的膨胀券弹层
  inflateExpand: {
    functionId: "inflate/queryInflateByStoreId",
    appVersion: appVersion
  },
  // 膨胀系统点击立即膨胀
  inflateRightNow: {
    functionId: "inflate/action",
    appVersion: appVersion
  },
  cartCheckVPlus: {
    functionId: "cartMember/checkVPlusPost",
    appVersion: appVersion
  },
  cartGetVPlusPost: {
    functionId: "cartMember/checkVipPost",
    appVersion: appVersion
  },
  // 订单支付完成页点击达达券
  clickDadaCoupon: {
    functionId: "orderFinish/clickCoupon",
    appVersion: appVersion
  },
  cartGetVPlus: {
    functionId: "cartMember/vplusFloorPost",
    appVersion: appVersion
  },
  // v8.22.5购物车连续包月
  cartGetVPlusSetMeal: {
    functionId: "cartMember/vipFloorPost",
    appVersion: appVersion
  },
  // 结算获取省钱攻略弹层
  getSaveMoneyPlan: {
    functionId: "marketsettle/getSaveMoneyPlan",
    appVersion: appVersion
  },
  // 查询签约状态
  getVipStatus: {
    functionId: "vip/contract/queryStatus",
    appVersion: appVersion
  },
  // 会员免密签约协议
  vipContract: {
    functionId: "vip/contract/handle",
    appVersion: appVersion
  },
  // 我的红包页接口
  getWalletInfo: {
    functionId: "mine/getWalletInfo",
    appVersion: appVersion
  },
  // 订单详情页点击商品跳转商品详情前校验商品状态，
  checkBeforeToProductDetail: {
    functionId: "check/checkBeforeToProductDetail",
    appVersion: appVersion
  },
  // 获取发票列表
  getInvoiceInfo: {
    functionId: "invoiceweb/getInvoiceInfoPost",
    appVersion: appVersion
  },
  // 删除发票
  deleteInvoiceInfo: {
    functionId: "invoiceweb/deleteInvoiceInfo",
    appVersion: appVersion
  },
  // 新增发票
  insertInvoiceInfo: {
    functionId: "invoiceweb/insertInvoiceInfo",
    appVersion: appVersion
  },
  // 更新发票
  updateInvoiceInfo: {
    functionId: "invoiceweb/updateInvoiceInfo",
    appVersion: appVersion
  },
  // 获取补开发票信息
  getSupplementInvoice: {
    functionId: "invoiceweb/getSupplementInvoice",
    appVersion: appVersion
  },
  // 提交补开发票信息
  insertSupplementInvoice: {
    functionId: "invoiceweb/insertSupplementInvoice",
    appVersion: appVersion
  },
  // 微信商家券获取签名加密接口
  encryptMarket: {
    functionId: "xapp/wx/encryptMarket",
    appVersion: appVersion
  },
  // 到店门店页主接口
  reachStoreDetail: {
    appVersion: appVersion,
    functionId: "store/reachStoreDetail",
    method: "POST"
  },
  // 到店门店首页接口
  reachStoreHomepage: {
    appVersion: appVersion,
    functionId: "store/reachStoreHomepage",
    method: "POST"
  },
  // 四级地址接口
  getJdLocation: {
    appVersion: appVersion,
    functionId: 'local/getJdLocation'
  },
  // 到店修改购物车中商品数量
  reachSettleChangeItemsNum: {
    appVersion: appVersion,
    functionId: 'trade/cart/changeItemsNum'
  },
  // 到店结算页初始化
  reachSettleInit: {
    appVersion: appVersion,
    functionId: 'trade/settle/init'
  },
  // 到店结算页操作
  reachSettleOperate: {
    appVersion: appVersion,
    functionId: 'trade/settle/operate'
  },
  // 到店提单操作
  reachSettleSubmit: {
    appVersion: appVersion,
    functionId: 'trade/submit/submitOrder'
  },
  // 到店商详
  toStoreDetails: {
    appVersion,
    functionId: 'product/detailV8_27'
  },
  // 到店购物车
  toStoreCard: {
    appVersion,
    functionId: 'trade/cart/addItems'
  },
  // 购物车处方药接口弹层【8.26.5新增】
  cartPrescriptionPopupPost: {
    functionId: "cartPrescription/popupPost",
    appVersion: appVersion
  },

  // 购物车处方药接口弹层【8.26.5新增】
  checkMultiItem: {
    functionId: "cartV3_3_0/checkMultiItem",
    appVersion: appVersion
  },

  // 发码接口
  getLocCodeList: {
    appVersion: appVersion,
    functionId: 'order/getLocCodeList'
  },

  // 搜索榜单
  djSearchRankList: {
    appVersion,
    functionId: "dj_searchRank_list"
  },
  // 必选分类弹层添加商品校验
  addProductCheck: {
    appVersion: appVersion,
    functionId: 'marketsettle/addProductCheck'
  }
  // 多端差异化functionId
  // ...functionIds
};
