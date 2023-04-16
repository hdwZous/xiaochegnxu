/* eslint-disable camelcase */
import { request, FNIDS } from '../../common/util/api';
import { djCmsJump } from '../../common/util/agreementV2.js'
import funId from '../../common/util/functionId';
import { isEmpty, showDialog } from './util/index';
import emitter from '../../common/util/events'
import { custom_order } from '../../common/util/tencentBi/report'
import util from "../../common/util/util"
import { clickBuriedV2_, pvBuriedV2_ } from "../../common/util/BI";
import { getSubscribeAb } from '../../common/util/services'
import { addFilterMsg, error } from "../../common/util/wxLog";
const { judgeAllowBtn } = util
let self = null
let app = getApp()
// 当前时间（性能检测上报用）
let startTime = Date.now();
// 请求开始时间（性能检测上报用）
let requestPreTime = Date.now();
// 请求结束时间（性能检测上报用）
let requestEndTime = Date.now();
// 打点上报flag
let flag = true;

const defaultError = {
  loading: {
    // 默认页-类型
    type: 0,
    // 默认页-图标
    src: '',
    // 默认页-按钮
    btnText: '',
    // 默认页-按钮
    tips: ''
  },
  netError: { // 默认页-展示
    // 默认页-类型
    type: 1,
    // 默认页-图标
    src: 'https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png',
    // 默认页-按钮
    btnText: '重新加载',
    // 默认页-按钮
    tips: '网络异常'
  }
};
let movTime = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    capsule: {},
    isIPX: app.globalData.isIpx,
    defaultError: defaultError.loading,
    storeId: "",
    orgCode: "",
    storeName: "",
    settleUseraction: '', // 页面path上的useraction
    deliverModel: '', // 配送类型 默认为空 1送货上门 2到店自提
    orderPayType: "first", // 支付方式(取值为"1"：货到付款， "4"：在线支付，第一次请求传："first")
    addressId: "0",
    promiseDate: "", //	配送日期 v3.7新增；时间格式：“2016-11-07“
    usePlatPointsFlag: false, // 是否使用鲜豆
    // 结算页接口刷新次数
    countOfFresh: 0,
    // 是否使用礼品卡
    useGiftCardFlag: false,
    giftDisable: false, // 禁用礼品卡
    showGiftPay: false, // 隐藏密码输入框
    userOperateType: 0, // 用户操作类型 0用户首次进入结算页操作, 10 点击购买vip
    preSaleSkuInfo: {}, // 预售商品信息 需确认小程序是否需要传
    lastAddressId: "", // 上次配送地址id
    lastDeliverType: 1, // 上次配送方式
    lastPromiseTime: {}, // 上次配送时间信息
    lastDeliverFee: "", // 上次配送费信息
    // 已选优惠
    selectedDiscountType: null,
    selectDiscountThreshold: null,
    selectedDiscountMoney: null,
    freightCouponCode: null,
    // 页面展示数据
    discountRuleTip: "", // 优惠互斥提示
    topText: "", // 顶部提示条文字
    topIcon: "", // 顶部提示图标
    selectedDeliveryTime: "", // 送达时间
    deliverUrlTextList: [], // 服务协议
    checkAgreementFlag: true, // 是否同意服务协议
    isSubmitSuccess: false, // 是否成功提单
    totalWeight: "", // 总重量

    couponDiglogVisible: false, // 优惠券弹层
    showPicker: false, // 配送时间picker --flag
    // 结算按钮数据
    totalMoney: null,
    totalDiscount: null,
    showAddressTip: false, // 地址小黄条
    // 特殊行业信息
    orderNameValue: "",
    orderPhoneValue: "",
    specialRemark: "",
    // 号码保护falg
    mobileSafeFlag: null,
    // tip提示组件相关信息
    tipDialog: {
      show: false,
      types: 0,
      title: "",
      desc: "",
      readmeList: []
    },
    // 商品列表
    productList: [],
    productTotal: 0,
    showVip: false, // 红包弹层
    buyCouponWithOrderFlag: 0, // 是否随单购买红包
    // 用户选中的小费id
    deliveryClerkFeeId: null,
    // 用户选中的小费文案id
    deliveryClerkFeeTipId: null,
    orderPageId: "", // 结算页面id
    openState: "", // 微常准按钮的选择状态
    couponCacheId: "",
    picUrl: [], // 处方单
    giftH5: "https://daojia.jd.com/html/index.html#giftCardSetPayPassWord",
    invoiceRightValue: "未选择", // 发票右边文案
    invoiceId: "", // 发票id
    currentDiseasesCacheId: "", // 医药id
    prescriptionInfo: {}, // 医药提单信息
    // 发票
    invoiceData: {},
    orderInvoiceOpenMark: 2, // 是否需要开发票 1需要 2不需要
    orderInvoiceContent: "", // 发票内容
    orderInvoiceMoneyDetail: "", // 发票金额说明
    distributionFee: false, // 发票页面是否勾选运费
    distributionService: false, // 是否勾选增值服务
    unique: "", // 结算页面唯一id
    remarkContent: "", // 备注内容
    selectedLackGoods: "", // 缺货选项
    couponDialogVisible: false, // 自动下发的优惠券弹窗
    recommendCouponInfo: {}, // 下发的优惠券信息
    couponInfoList: [], // 弹层里面的优惠券
    showSubscribeMessage: false, // 模版消息
    exchangeToast: null, // 兑换弹层是否展示
    exFloorTop: 0, // 兑换楼层距离顶层距离(页面初次渲染)
    memberOpenState: null, // 会员开通状态
    memberToast: false,
    specialBusinessResult: {},
    // 点击提单商家会员弹层副文案-8.13.5新增
    submitOrderMemberTip: [],
    // 8.1 提单新增字段
    buyMerchantMemberFlag: false,
    settlementPayMoney: 0,
    hasMerchantMemberFloorFlag: false,
    hasVipFloorFlag: false,
    userChooseFreightDiscountFlag: false,
    userChooseCouponFlag: false,
    submitOrderLayerType: "",
    submitOrderLayerCheckedFlag: "",
    // 8.2 结算新增字段
    grabCouponList: [],
    // 8.4 追平 vip套餐id (假如有vip红包楼层提单时vipId必传，但是结算页只有在选择时传，故另起字段区分)
    submitVipTypeId: "",
    // 挽留弹层信息
    retainShow: false,
    // 一键开通会员弹层信息
    oneKeyOpen: false,
    memberBenefitInfo: {},
    educationInfo: null, // 教育优惠楼层数据
    educationInfoSubmit: null, // 提交的教育楼层数据
    // 8.8.5 单品单结
    preSaleSkuInfos: null,
    saleType: 1,
    // 8.9.5 挽留弹层info
    retainInfo: null,
    toPayPage: false,
    // 预售 同意定金不退按钮
    payStageType: 1,
    usePreSaleProtocol: false,
    depositInfo: {
      title: "",
      price: ""
    },
    depositShow: false,
    // 8.12.5 包装费支持可手动选择
    needpackShow: false,
    blockPopupFlag: null, // 是否显示阻断提单弹窗
    blockPopup: null, // 阻断提单弹窗内容
    packUseFlag: null, // 用户选择是否使用包装
    extendInfo: null, // 透传提单
    // 8.15.5 省钱攻略
    styPopInfos: {
      status: null, // null 不符合条件, 1 弹层弹出但未展开; 2 弹层弹出且展开
      basicHeight: 56, // 弹层出现但未展开时的默认高度
      oneVipHeight: 62, // 单个会员模块的高度
      animation: 0, // 弹层具体移动的数值
      count: 0, // 会员个数 大于等于3时,取2.5
      moneyItems: null // 下发的省钱项
    },
    pageMoving: false,
    // 8.16.5
    deliverTypeABStyle: 0, // ab样式默认是0
    distributionTypeLabel: null,
    dispatchMold: '', // 配送模块判断配送方式用
    selfPhone: '', // 用户自提手机号
    ariaHidden: false,
    pickerValue: null,
    showNewVipLayer: false,
    // 8.20.1 操作优惠券是否走默认选红包标识
    operateCouponDefaultRedPacketFlag: null,
    // 是否是vip会员
    vipMemberFlag: false,
    mockVip: false,
    // 8.22.5
    initSettleParams: {}, // 结算页接口请求数据
    defaultCheckVipPackageType: null,
    // 商家会员套餐id,联合开卡时需要传
    purchaseMemberId: '',
    // 是否是膨胀新人券
    inflationCoupleVoucherFlag: false,
    // 联合开卡标识
    unionVipFlag: null,
    // 通用取消开通弹层弹层
    confirmDialog: {
      cancelText: '取消',
      confirmText: '开通自动续费',
      show: false,
      soltContent: '购买连续包月套餐需开通微信自动续费协议'
    },
    vipMonthCard: {
      have: false,
      vipId: ''
    },
    // 连续包月vipId
    monthlyVipId: '',
    newSaveMoneyPlan: null,
    getPlanHml: false,
    refreshSwell: false,
    roundStatus: false,
    componentParamList: null,
    submitComParamList: null,
    refreshModuleKey: null,
    moduleJumpH5: false,
    modulePickerInit: false,
    ringCountDown: false,
    // 8.26 家政服务时间点
    lastServiceDateTime: '',
    showHomemaking: false,
    settlementBusinessTag: '',
    originToast: '',
    isShowTableWare: false,
    // 必选弹层
    isShowMustOrder: false,
    // 餐具弹层
    tableWareClickType: '',
    tableWareData: {},
    requiredCategoryData: {},
    upDateGoods: null,
    // 8.28新增
    v28VoucherList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取胶囊位置
    this.getCapsule();
    // 打点起始时间
    startTime = Date.now();
    flag = true;
    self = this;
    // 结算页线下用户标签透传
    let specialBusinessTagList = null;
    if (
      options.specialBusinessTag &&
      options.specialBusinessTag == "LaiLaiTuiMini"
    ) {
      specialBusinessTagList = ["LaiLaiTuiMini"];
    }
    // 组装结算页所需参数
    const preSaleSkuInfo = [
      {
        skuCount: 1,
        skuId: options.skuId || '',
        skuServiceList: [],
        skuType: 0,
        spuId: ""
      }
    ];
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      storeId: options.storeId,
      orgCode: options.orgCode,
      storeName: options.storeName || '',
      settleUseraction: options.userAction || '',
      countOfFresh: 0,
      exchangeToast: null,
      grabCouponList:
        options.grabCouponList && options.grabCouponList.length
          ? JSON.parse(options.grabCouponList)
          : [],
      preSaleSkuInfos:
        options.preSaleSkuInfos != undefined
          ? JSON.parse(options.preSaleSkuInfos)
          : preSaleSkuInfo,
      saleType: options.saleType || 1,
      toPayPage: false,
      specialBusinessTagList,
      defaultCheckVipPackageType: options.vipPackageType || null
    });
    let isTempAddress = app.isUsingTempAddress();
    if (!isTempAddress) {
      var addressInfo = wx.getStorageSync('address_info') || null;
      if (addressInfo != null && addressInfo.id != null) {
        this.setData({
          addressId: addressInfo.id
        })
      }
    }
    wx.getSystemInfo({
      success: (res) => {
        if (res.platform.toUpperCase() == "IOS") {
          this.setData({
            isIOS: true
          })
        } else {
          this.setData({
            isIOS: false
          })
        }
      }
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    // 免密协议轮巡查询状态
    if (app.globalData.appScene === 1038 && this.data.roundStatus == true) {
      this.roundStatus()
      this.data.roundStatus = false
      return
    }
    /* 新建地址成功返回结算页读取当前缓存中地址信息 */
    let settlement = app.globalData.settlement;
    if (!settlement.isGet) {
      // 假如是家政服务 切换地址需要清空服务时间
      if (this.data.settlementBusinessTag == 1) {
        let newAddres = settlement.addressInfo.addressId || settlement.id || "0"
        let nowAddres = this.data.addressId
        if (newAddres !== nowAddres) {
          this.setData({
            lastServiceDateTime: '',
            orgStartTime: '',
            orgEndTime: ''
          })
        }
      }
      this.setData({
        addressId: settlement.addressInfo.addressId || settlement.id || "0",
        mobile: settlement.addressInfo.mobile || "",
        addressName: settlement.addressInfo.name || "",
        fullAddress:
          settlement.addressInfo.fullAddress || "请选择您的收货地址",
        showAddress: settlement.addressInfo.canDelivery ? false : true
      });
      // settlement.isGet = true;  初始化设置挪到了地址半弹层中，为了新建地址回来后判断弹层是否需要关闭(新建地址支持配送需要关闭；不支持配送不需要关闭)
    }
    // 医药h5页面传输的数据
    emitter.addListener("drug", (val) => {
      if (val) {
        self.data.currentDiseasesCacheId = val.data[0].infoid;
      }
    });
    // 教育优惠h5页面传输的数据
    emitter.addListener("education", (val) => {
      if (val) {
        self.data.educationInfoSubmit = val.data[0].educationInfo;
      }
    });
    emitter.addListener("goaddOn", () => {
      let initObj = self.initPreferParams();
      self.setData(initObj);
    });
    emitter.addListener("settleDiscounts", () => {
      let initObj = self.initPreferParams();
      self.setData(initObj);
    });
    emitter.addListener("miniGoH5", (res) => {
      let info = res.data.JsonDataCallBack
      let { businessType, jsonData } = info
      if (this.data.moduleJumpH5 == true) {
        this.changeModuleComponet(businessType, jsonData, this.data.refreshModuleKey)
        this.data.moduleJumpH5 = false
      } else{
        switch (businessType) {
        default:
          break;
        }
      }
    });
    if (this.data.isSubmitSuccess && this.data.toPayPage) {
      let { recommendObj = null } = this.data
      wx.switchTab({
        url: "/pages/tabBar/orderlist/index",
        preObj: recommendObj
      });
    } else if (!this.data.isSubmitSuccess) {
      // 新版vip弹层内操作不调接口，所以跳转返回不刷新接口
      if (this.data.showNewVipLayer == true || this.data.refreshModuleKey != null) {
        this.data.refreshModuleKey = null
      } else {
        this.getInitData();
      }
    }
    // 获取订阅消息AB
    if (!app.globalData.subscribeAb) {
      getSubscribeAb()
    }
  },

  pvFunc (back) {
    let page_par = {}
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data;
    if (this.data.settleUseraction) {
      page_par = {
        storeId: this.data.storeId,
        saleType: this.data.saleType,
        settleType: 1,
        ref_par: {
          userAction: decodeURIComponent(this.data.settleUseraction)
        }
      }
    } else {
      page_par = {
        storeId: this.data.storeId,
        saleType: this.data.saleType,
        settleType: 1
      }
    }
    pvBuriedV2_({
      page_par,
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName,
      isBack: back || ""
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.timerId && clearTimeout(this.timerId);
    // 通用picker缓存重置
    app.globalData.settlePickerKey = null
  },
  // 获取结算页面数据
  getInitData (callSaveMoney = true, needToast = true) {
    // callSaveMoney 需不要调省钱攻略接口
    return new Promise(resolve => {
      let { deliverModel, orgCode, storeId, grabCouponList, recommendObj = {} } = this.data;
      let { pageIdFirstPage = '', pageSource = '', refPageSource = '' } = recommendObj
      if (this.data.countOfFresh) {
        // 只有初始进入结算页时才需要传入grabCouponList, 刷新时需要置空
        grabCouponList = [];
      }
      if (needToast) {
        wx.showLoading({
          title: "加载中"
        });
      }
      // 请求开始时间（性能检测上报用）
      requestPreTime = Date.now();
      let { functionId = "", appVersion = "" } = funId.settleAccount;
      let params = {
        deliverType: deliverModel,
        fromSource: 5,
        jingBeansNum: 0,
        source: 2,
        orgCode: orgCode,
        storeId: storeId,
        // addressType: false,
        cityId: app.globalData.addressInfo.cityId,
        longitude: app.globalData.addressInfo.longitude,
        latitude: app.globalData.addressInfo.latitude,
        orderPayType: this.data.orderPayType,
        addressId: this.data.addressId,
        // coupons: [],
        firstPlaceVoucherCode: this.data.firstPlaceVoucherCode || "",
        promiseDate: this.data.promiseDate, //	String	否	配送日期 v3.7新增；时间格式：“2016-11 - 07“
        usePlatPointsFlag: this.data.usePlatPointsFlag,
        // infoId: this.data.useDrug && this.data.useDrug.data && this.data.useDrug.data.useDrugId ? this.data.useDrug.data.useDrugId : "",
        // promise改版
        orgStartTime: this.data.orgStartTime,
        orgEndTime: this.data.orgEndTime,
        userStartTime: this.data.userStartTime,
        userEndTime: this.data.userEndTime,
        arriveType: this.data.arriveType,
        // 礼品卡
        useGiftCardFlag: this.data.useGiftCardFlag,
        // 3.4.1 增加vip红包
        checkVipFlag: this.data.checkVipFlag || "",
        purchaseVipTypeId: this.data.purchaseVipTypeId || "",
        redPacketCode: this.data.redPacketCode || null,
        firstPlaceRedPacketCode: this.data.firstPlaceRedPacketCode || "",
        // 免运券 3.5.2
        selectedDiscountType: this.data.selectedDiscountType,
        selectDiscountThreshold: this.data.selectDiscountThreshold,
        selectedDiscountMoney: this.data.selectedDiscountMoney,
        freightCouponCode: this.data.freightCouponCode,

        // 接口新加字段
        operate: this.data.operate,
        couponGroup: this.data.couponGroup,
        operateConsumeCode: this.data.operateConsumeCode,
        couponCacheId: this.data.couponCacheId, // noCacheId 表示是否使用缓存id，当在结算页面直接领取完优惠券时，不用缓存id，取空
        selectedCouponInfoPreOperateList:
          this.data.selectedCouponInfoPreOperateList,

        // 用来判断是否下发toast提示
        lastAddressId: this.data.lastAddressId, // 上次的地址id
        lastDeliverType: this.data.lastDeliverType, // 上次的配送方式
        lastPromiseTime: this.data.lastPromiseTime, // 上次的配送时间信息
        lastDeliverFee: this.data.lastDeliverFee, // 上次的配送费
        marketTagParam: { couponRecommended: this.data.couponRecommended }, // 是否已经下发过优惠券，透穿给后端
        userOperateType: this.data.userOperateType, // 用户操作类型
        deliveryClerkFeeId: this.data.deliveryClerkFeeId, // 用户选中的小费id
        deliveryClerkFeeTipId: this.data.deliveryClerkFeeTipId,
        orderPageId: this.data.orderPageId, // 结算页面id
        openState: this.data.openState, // 微常准选择按钮
        currentDiseasesCacheId: this.data.currentDiseasesCacheId, // 医药id

        // 8.1 新增会员开通状态字段
        memberOpenState: this.data.memberOpenState,
        // 8.2 新增待领取的券活动code列表
        grabCouponList,
        educationInfo: this.data.educationInfoSubmit,
        // 8.8.5 单品单结
        preSaleSkuInfos: this.data.preSaleSkuInfos,
        saleType: this.data.saleType,
        // 线下用户标签透传
        specialBusinessTagList: this.data.specialBusinessTagList,
        // 8.12.5 用户选择是否使用包装费
        packUseFlag: this.data.packUseFlag,
        // 8.22.5
        defaultCheckVipPackageType: this.data.defaultCheckVipPackageType,
        inflationCoupleVoucherFlag: this.data.inflationCoupleVoucherFlag,
        unionVipFlag: this.data.unionVipFlag,
        purchaseMemberId: this.data.purchaseMemberId,
        pageSource,
        refPageSource,
        componentParamList: this.data.componentParamList,
        lastServiceDateTime: this.data.lastServiceDateTime,
        tablewareOptionStatus: this.data.tableWareData.data && this.data.tableWareData.data.tablewareLayer.tablewareOptionStatus,
        needTablewareNum: this.data.tableWareData.data && this.data.tableWareData.data.tablewareLayer.needTablewareNum,
        tablewareRememberStatus: this.data.tableWareData.data && this.data.tableWareData.data.tablewareLayer.tablewareRememberStatus,
        vpType: (this.data.newVip && this.data.newVip.data && this.data.newVip.data.vpType) || ''
      };
      this.setData({
        initSettleParams: params
      })
      wx.setStorageSync("settleParams", params);
      request({
        functionId,
        method: 'POST',
        isNeedDealError: true,
        appVersion,
        body: params,
        pageId: pageIdFirstPage,
        preObj: recommendObj
      })
        .then((res) => {
        // 请求结束时间（性能检测上报用）
          requestEndTime = Date.now();
          wx.hideLoading();
          if (res.data.code == "0" && res.data.result) {
            let result = res.data.result
            // 先重置settlementModules下的各个模块为null，防止刷新接口时某些模块不下发，但模块不重置的现象
            let settlementModules = {
              defaultError: null,
              receiptAddress: null, // 收货地址
              deliverType: null, // 配送方式模块
              useDrug: null, // 处方药用药人信息模块
              selfAddress: null, // 自提地址模块
              microSettlement: null, // 超时赔付模块
              deliverTime: null, // 送达时间
              bookInfo: null, // 预定人信息
              specialInfo: null, // 特殊信息/祝福语
              couponInfo: null, // 优惠券
              platPoints: null, // 积分模块
              giftCard: null, // 礼品卡模块
              orderMark: null, // 订单备注
              productInfo: null, // 商品信息
              moneyInfo: null, // 应付金额
              actionModule: null, // 运费模块
              disMoneyInfo: null, // 优惠金额
              invoice: null, // 发票模块
              newVip: null, // vip模块
              memberEntrance: null, // 商家会员入口
              cryptoguard: null, // 号码保护
              huanGouProductInfo: null, // 换购信息模块
              submitInfoNew: null, // 小程序提交信息模块
              educationInfoShow: null, // 教育信息填写入口模块
              saveMoneyPlan: null, // 省钱攻略模
              outOfStockConfig: null, // 如遇缺货
              picker: null, // picker模块
              headerFloor: null, // 头部模块化楼层集合
              footerFloor: null, // 尾部模块化楼层集合
              serviceDateTime: null, // 家政服务时间楼层
              tableware: null, // 餐具楼层
              requiredCategory: null // 必选楼层
            }
            let modulesArr = result.newModules.map((item) => item.moduleKey);
            // 假如没有省钱攻略模块，重置styPopInfos
            if (!modulesArr.includes("saveMoneyPlan")) {
              this.setData({
                saveMoneyPlan: null,
                'styPopInfos.status': null
              });
            }
            // 假如没有picker模块，重置pickerValue
            if (!modulesArr.includes("picker")) {
              this.setData({
                pickerValue: null
              });
            }
            // 假如没有newVip会员模块,重置checkVipFlag
            if (!modulesArr.includes("newVip")) {
              this.setData({
                checkVipFlag: 0,
                buyCouponWithOrderFlag: 0,
                hasVipFloorFlag: false,
                submitVipTypeId: '',
                purchaseVipTypeId: '',
                purchaseVip: false,
                mockVip: false,
                unionVipFlag: false,
                purchaseMemberId: ''
              });
            }
            // 重新请求接口需重置组件模块化数据为初始状态
            this.data.componentParamList = null
            this.data.submitComParamList = null
            this.data.lastServiceDateTime = ''
            // 处理提示，toast等信息
            this.dealBaseInfo(result);
            result.newModules &&
            result.newModules.forEach((item) => {
              settlementModules[item.moduleKey] = item;
              switch (item.moduleKey) {
              case "receiptAddress":
                // 处理收货人地址
                this.dealReceiptAddress(item);
                break;
              case "deliverTime":
                // 处理送达时间
                this.dealDeliverTime(item);
                break;
              case "deliverType":
                // 设置当前配送方式
                this.dealDeliverType(item);
                break;
              case "actionModule":
                this.dealActionModule(item);
                break;
              case "bookInfo":
                // 设置订购人电话信息
                this.dealOrderMobile(item);
                this.showBookInfo();
                break;
              case "productInfo":
                // 处理商品列表
                this.dealProduct(item);
                break;
              case "disMoneyInfo":
                // 处理下发的红包信息
                this.dealDisMoneyInfo(item);
                break;
              case "newVip":
                // 处理下vip红包信息
                this.dealNewVip(item);
                break;
              case "microSettlement":
                // 处理微常准信息
                this.dealmicroSettlement(item);
                break;
              case "educationInfoShow":
                // 处理教育优惠信息
                this.dealEducationInfo(item);
                break;
              case "useDrug":
                // 处理医药信息
                this.dealUseDrug(item);
                break;
              case "invoice":
                // 处理发票信息
                this.dealInvoice(item);
                break;
              case "cryptoguard":
                // 处理号码保护
                this.dealCryptoguard(item);
                break;
              case "huanGouProductInfo":
                // 处理换购弹层是否出现
                this.dealExchangeToast(item);
                break;
              case "memberEntrance":
                // 处理随单商家会员楼层
                this.dealMemberEntrance(item);
                break;
              case "reserveOrderInfo":
                // 处理定金
                this.dealDeposit(item);
                break;
              case "saveMoneyPlan":
                // 处理省钱攻略
                this.dealSaveMoney(item)
                break;
              case "headerFloor":
              case "footerFloor":
                // 处理模块化
                this.dealComponetList(item)
                break;
              case "submitInfoNew":
                this.dealSubmitInfoNew(item)
                break;
                // 必选分类
              case "requiredCategory":
                console.log('必选分类');
                this.dealRequiredCategory(item)
                break
                // 餐具模块
              case "tableware":
                this.dealTableWare(item)
                break
              default:
                break;
              }
            });
            this.setData(settlementModules, () => {
              if (flag) {
                flag = false;
                // 请求时间（性能检测上报用）
                let requestTime = requestEndTime - requestPreTime;
                // 上报请求时间（性能检测上报用）
                app.reportPerformance(1017, requestTime);
                // setDate渲染时间（性能检测上报用）
                let setDataTime = Date.now() - startTime - requestTime;
                // 上报setDate渲染时间（性能检测上报用）
                app.reportPerformance(2018, setDataTime);
              }
              // 8.9.5请求挽留弹层接口
              this.getRetainLayer(params, res.data.result);
              // 请求省钱攻略
              if (callSaveMoney) {
                this.getSaveMoneyLayer(res.data.result)
              }
            });
            this.setData({
              modulePickerInit: true
            })
            // 某些特殊逻辑可以通过resolve单独在函数中处理
            resolve(true)
          } else {
          // 仅支持自提
            if (res.data.code == "A2304") {
              this.setData({
                deliverModel: 2
              });
              wx.showToast({
                title: res.data && res.data.msg,
                icon: "none"
              });
              return;
            }
            showDialog({
              text: res.data && res.data.msg,
              isClose: true
            });
            this.reportMonitor('52', 'settleInitError', res.data.msg)
          }
        })
        .catch((err) => {
          wx.hideLoading();
          showDialog({
            text: (err && err.msg) || "请求失败",
            isClose: true
          });
          this.setData({
            userOperateType: ""
          });
          let infos = err && err.toString()
          this.reportMonitor('52', 'settleInitCatchError', infos)
        });
    })
  },
  // 红包弹层点击
  handleVipClick (e) {
    let { clickFlag, requestFlag = false } = e.detail;
    if (clickFlag) {
      if (requestFlag) {
        // 为true走红包降级
        this.setData({
          vipFlag: new Date().getTime()
        });
        return;
      }
      this.setData({
        showVip: true,
        ariaHidden: true
      });
    }
  },
  // 一键兑换红包
  handleOneKeyExchange (e) {
    let { data: { redPacketInfo } = {}, types } = e.detail;
    let exchangeLsit = []
    if (types == 'old') {
      exchangeLsit = redPacketInfo.exchangeRedPacketModeList
    } else if (types == 'new') {
      exchangeLsit = redPacketInfo.exchangeList
    }
    if (exchangeLsit.length) {
      let { functionId, appVersion } = funId.convertCouponOneKey;
      let { recommendObj = {} } = this.data
      let { pageIdFirstPage = ''} = recommendObj
      request({
        functionId,
        isNeedDealError: true,
        appVersion,
        method: "post",
        body: {
          activityCode: exchangeLsit[0].activityCode,
          grabChannel: "order_pay_page",
          orderPageId: this.data.orderPageId,
          exchangeFlag: exchangeLsit[0].exchangeFlag,
          buyCouponWithOrderFlag: this.data.buyCouponWithOrderFlag == 0 ? false : true,
          exchangeId: exchangeLsit[0].exchangeId || '',
          fromSource: 5
        },
        pageId: pageIdFirstPage,
        preObj: recommendObj
      }).then((res) => {
        if (res.data && res.data.code == 0) {
          this.setData(
            {
              redPacketCode: res.data.result.consumeCode
            },
            () => {
              this.getInitData();
              wx.showToast({
                title: res.data.msg || "兑换成功",
                icon: "none",
                duration: 2500
              });
            }
          );
        } else {
          wx.showToast({
            title: res.data.msg || "兑换失败",
            icon: "none",
            duration: 2500
          });
          this.reportMonitor('54', 'OneKeyExchangeError', res.data.msg)
        }
      }).catch(err => {
        let infos = err && err.toString()
        this.reportMonitor('54', 'OneKeyExchangeCatchError', infos)
      });
    } else {
      wx.showToast({
        title: "暂无可兑换用优惠券～",
        icon: "none"
      });
    }
  },
  // 勾选vip红包
  handleVipCheck (e, callSaveMoney = true, needToast = true) {
    let { checkVip = 0, vipId = '', unionVipFlag = false, unionMemberId = '' } = e.detail;
    // unionVipFlag 判断是不是联合会员
    if (unionVipFlag == true) {
      this.unionVipCheck(checkVip, vipId, unionMemberId, callSaveMoney, needToast)
      return
    }
    let setObj = this.outVipParam(checkVip, vipId)
    setObj.userOperateType = checkVip == 1 ? 10 : 11
    this.setData(setObj, () => {
      this.getInitData(callSaveMoney, needToast);
    })
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'buy_vip',
      click_par: {
        select_type: checkVip == 1 ? "yes" : "no",
        vip_style: this.data.newVip.data.newStyle ? true : false
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 勾选联合会员  包含月卡与商家会员
  unionVipCheck (checkVip = 0, vipId = '', unionMemberId = '', callSaveMoney, needToast = true) {
    let setObj = this.outVipUniParam(checkVip, vipId, unionMemberId)
    setObj.userOperateType = checkVip == 1 ? 10 : 11,
    this.setData(setObj, () => {
      this.getInitData(callSaveMoney, needToast)
    })
  },
  // 生成v+参数
  outVipParam (checkVip, vipId) {
    return {
      checkVipFlag: checkVip || 0, // 结算参数 勾选状态
      purchaseVipTypeId: vipId, // 结算 提单参数
      purchaseVip: checkVip == 1 ? true : false, // 提单参数
      buyCouponWithOrderFlag: checkVip, // 随单购标识
      mockVip: checkVip == 1 ? true : false // vip兑换红包/优惠券弹层使用
    }
  },
  // 生成联合会员参数
  outVipUniParam (checkVip, vipId, unionMemberId) {
    // v+参数
    let setObj = {
      checkVipFlag: checkVip || 0, // 结算参数
      purchaseVipTypeId: vipId, // 结算 提单参数
      purchaseVip: checkVip == 1 ? true : false, // 提单参数
      buyCouponWithOrderFlag: checkVip,
      mockVip: checkVip == 1 ? true : false,
      unionVipFlag: true,
      purchaseMemberId: checkVip == 1 ? unionMemberId : '' // 商家会员id
    }
    let memberObj = this.outMemberParam(checkVip)
    setObj = Object.assign({}, setObj, memberObj)
    return setObj
  },
  // 生成商家会员参数
  outMemberParam (checkVip) {
    let memberObj = {
      memberOpenState: checkVip == 1 ? 1 : 2,
      buyMerchantMemberFlag: checkVip == 1 ? true : false,
      submitOrderLayerCheckedFlag: false
    };
    let initObj = this.initPreferParams();
    let setObj = Object.assign({}, memberObj, initObj)
    return setObj
  },
  // 在vip红包弹层中选择红包
  handleVipPopChecked (e) {
    let redPacketCode = e.detail;
    this.setData(
      {
        redPacketCode: redPacketCode
      },
      () => {
        this.getInitData();
      }
    );
  },
  // 兑换红包
  exchangeVipBag (e) {
    this.setData(
      {
        redPacketCode: e.detail
      },
      () => {
        this.getInitData();
      }
    );
  },
  // 处理优惠券弹层
  handleCouponDiglogVisible (e) {
    this.setData({
      couponDiglogVisible: true,
      couponInfoList: e.detail,
      ariaHidden: true
    });
  },
  // 点击优惠券关闭
  onClickCloseCoupon (e) {
    let isShow = e.detail.isShow;
    this.setData({
      couponDiglogVisible: isShow,
      ariaHidden: false
    });
  },
  // 处理优惠券缓存
  handleInitCouponInfo (e) {
    let {
      couponCacheId,
      selectedCouponInfoPreOperateList,
      couponInfoList
    } = e.detail;
    this.setData({
      couponCacheId: couponCacheId,
      selectedCouponInfoPreOperateList,
      couponGroup: '',
      operate: '',
      operateConsumeCode: '',
      v28VoucherList: couponInfoList
    });
  },
  // 优惠券选择
  handleCouponInfo (e) {
    let { couponGroup = '', operate = '', operateConsumeCode = '' } = e.detail;
    let setObj = {}
    if (this.data.operateCouponDefaultRedPacketFlag == true) {
      setObj = {
        couponGroup,
        operate,
        operateConsumeCode,
        redPacketCode: null,
        firstPlaceRedPacketCode: null
      }
    } else {
      setObj = {
        couponGroup,
        operate,
        operateConsumeCode
      }
    }
    this.setData(setObj, () => {
      if (operate) {
        // 用来区分是不是优惠券降级过来的，降级的不执行请求
        !this.data.userChooseCouponFlag &&
          (this.data.userChooseCouponFlag = true);
        this.getInitData();
      }
    })
  },
  // 商家会员跳转
  handleMemberJump () {
    let { skipUrl } = this.data.memberEntrance.data;
    let { recommendObj = null } = this.data
    wx.navigateTo({
      url: "/pages/h5/index?url=" + encodeURIComponent(skipUrl),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'settlementv2_handleMemberJump'
      }
    });
  },
  // 是否使用仙豆
  handleUseBeans () {
    this.setData(
      {
        usePlatPointsFlag: !this.data.usePlatPointsFlag
      },
      () => {
        this.getInitData();
      }
    );
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'use_bean',
      click_par: {
        type: !this.data.usePlatPointsFlag ? "use" : "unuse"
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 微常准按钮点击
  handleWeBankBtnClick () {
    if (this.data.openState != 0) {
      this.setData(
        {
          openState: this.data.openState == 1 ? 2 : 1
        },
        () => {
          this.getInitData();
        }
      );
    }
  },
  // 获取自动下发的优惠券
  handleAutoCoupon () {
    this.setData(
      {
        couponDialogVisible: false,
        couponCacheId: "" // 当在结算页面直接领取完优惠券时，不用缓存id，取空
      },
      () => {
        this.getInitData();
      }
    );
  },
  addressBannerlist () {},
  // 页面滚动
  onPageScroll (e) {
    if (e.scrollTop > 50) {
      if (!this.data.showAddressTips && !this.data.memberToast) {
        this.setData({
          showAddressTips: true
        });
        this.addressBannerlist();
      }
    } else {
      if (this.data.showAddressTips) {
        this.setData({
          showAddressTips: false
        });
      }
    }
    // 省钱攻略
    if (this.data.styPopInfos.status !== null) {
      if (!this.data.pageMoving) {
        this.data.pageMoving = true
        this.data.styPopInfos.status === 2 && this.computeStrategy()
      }
      movTime && clearTimeout(movTime)
      movTime = setTimeout(() => {
        this.data.pageMoving = false
      }, 250)
    }
  },
  dealBaseInfo (result) {
    if (result.toast) {
      // 如果下发toast，比如配送费发生变化
      wx.showToast({
        title: result.toast,
        icon: "none",
        duration: 2500
      })
    }
    this.setData(
      {
        countOfFresh: this.data.countOfFresh + 1,
        discountRuleTip: result.msg || "",
        topText: result.topText,
        topIcon: result.topIcon,
        totalCost: result.totalCost,
        totalDiscount: result.totalDiscount,
        totalMoney: result.totalMoney,
        settlementPayMoney: result.totalMoneyValue,
        totalWeight: result.totalWeight || "",
        unique: result.unique,
        signatureKey: result.serverSign,
        distributionTypeLabel: result.distributionTypeLabel || null,
        orderPayType: 4,
        disabled: false,
        giftCardForgetPassUrl: result.giftCardForgetPassUrl || "",
        lastDeliverFee: result.deliverFee,
        userOperateType: "", // 清空操作类型
        orderPageId: result.orderPageId,
        storeName: result.storeName,
        extendInfo: result.extendInfo || null,
        deliverModel: result.deliverType || 1,
        dispatchMold: result.deliverType || 1,
        deliverTypeABStyle: result.deliverTypeABStyle || 0,
        operateCouponDefaultRedPacketFlag: result.operateCouponDefaultRedPacketFlag || null,
        vipMemberFlag: result.vipMemberFlag || false,
        inflationCoupleVoucherFlag: false,
        settlementBusinessTag: result.settlementBusinessTag || ''
      },
      () => {
        this.setRequestStoreage({
          lastDeliverFee: this.data.lastDeliverFee
        });
      }
    );
    this.dealAutoCoupon(result);
    // 埋点逻辑
    result.topText && this.showTopYellowBar();
  },
  // 处理自动下发优惠券弹层
  dealAutoCoupon (result) {
    if (
      result.couponRecommendInfo &&
      result.couponRecommendInfo.recommendCouponInfo &&
      result.couponRecommendInfo.recommendCouponInfo.activityCode
    ) {
      this.setData({
        couponDialogVisible: true,
        recommendCouponInfo: result.couponRecommendInfo.recommendCouponInfo
      });
      let recommendCouponInfo = result.couponRecommendInfo.recommendCouponInfo;
      let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
      clickBuriedV2_({
        click_id: 'ex_counpon_layer',
        click_par: {
          code: recommendCouponInfo.activityCode || '',
          amount: recommendCouponInfo.amount || '',
          limitRule: recommendCouponInfo.limitRule || ''
        },
        pageId: pageIdFirstPage,
        currentPageName,
        prePageName
      })
    } else {
      this.setData({
        couponDialogVisible: false
      });
    }
    if (
      result.couponRecommendInfo &&
      result.couponRecommendInfo.couponRecommended
    ) {
      this.setData({
        couponRecommended: result.couponRecommendInfo.couponRecommended
      });
    }
  },
  dealReceiptAddress (module) {
    this.setData(
      {
        addressName:
          (module.data.addressVo && module.data.addressVo.name) || "",
        mobile: (module.data.addressVo && module.data.addressVo.phone) || "",
        fullAddress:
          (module.data.addressVo && module.data.addressVo.addressName) || "",
        addressId:
          (module.data.addressVo && module.data.addressVo.addressId) || "0",
        lastAddressId:
          (module.data.addressVo && module.data.addressVo.addressId) || ""
      },
      () => {
        this.setRequestStoreage({
          addressId: this.data.addressId,
          lastAddressId: this.data.lastAddressId
        });
      }
    );
  },

  dealActionModule (module) {
    if (this.data.deliverModel == 2) return;
    let packUseFlag = null;
    let blockPopupFlag = null;
    let blockPopup = null;

    if (module.data) {
      module.data.forEach((item) => {
        if (item.moneyType == "freight" || item.name == "运费") {
          this.setData({
            deliverCnt: item.value
          });
        } else if (item.moneyType == "packaging" || item.name == "包装费") {
          blockPopupFlag = item.blockPopupFlag || null;
          blockPopup = item.blockPopup || null;
          packUseFlag = item.choiceButtonFlag
            ? item.selectedButtonFlag != undefined
              ? item.selectedButtonFlag
              : null
            : null;
        }
      });
    }
    this.setData({ packUseFlag, blockPopupFlag, blockPopup });
  },

  dealDeliverTime (module) {
    let promiseDate = this.data.promiseDate || "";
    let orgStartTime = this.data.orgStartTime || "";
    let orgEndTime = this.data.orgEndTime || "";
    let userStartTime = this.data.userStartTime || "";
    let userEndTime = this.data.userEndTime || "";
    this.setData(
      {
        selectedDeliveryTime: module.data.nonPushTimeText,
        deliverUrlTextList: module.data.urlTextList,
        pushTimeFlag: module.data.pushTimeFlag,
        promiseDate,
        orgStartTime,
        orgEndTime,
        userStartTime,
        userEndTime,
        lastPromiseTime: {
          promiseDate,
          orgStartTime,
          orgEndTime,
          userStartTime,
          userEndTime
        }
      },
      () => {
        this.setRequestStoreage({
          lastPromiseTime: this.data.lastPromiseTime
        });
      }
    );
  },

  dealDeliverType (item) {
    let deliverModel = item.data.defaultType || 1;
    this.setData(
      {
        deliverModel,
        lastDeliverType: deliverModel,
        dispatchMold: deliverModel
      },
      () => {
        this.setRequestStoreage({
          lastDeliverType: this.data.lastDeliverType
        });
      }
    );
  },

  dealOrderMobile (item) {
    if (this.data.countOfFresh == 1) {
      let orderPhoneValue = item.data.userPhone;
      this.setData({
        orderPhoneValue
      });
    }
  },

  dealProduct (item) {
    let total = 0;
    let skus = [];
    let productInfo = item.data;
    if (productInfo && productInfo.length) {
      productInfo.forEach((item) => {
        skus.push(item);
        total += item.quantity || 0;
      });
      this.setData({
        productTotal: total,
        productList: skus
      });
    }
  },
  // 折算的信息
  dealDisMoneyInfo (item) {
    let redPacketCode = "";
    let firstPlaceRedPacketCode = "";
    for (let i = 0; i < item.data.length; i++) {
      if (item.data[i].name == "红包") {
        firstPlaceRedPacketCode =
          (item.data[i].redPacketInfo &&
            item.data[i].redPacketInfo.firstPlaceRedPacketCode) ||
          "";
        redPacketCode =
          (item.data[i].redPacketInfo &&
            item.data[i].redPacketInfo.redPacketCode) ||
          "";
        break;
      }
    }
    this.setData({
      redPacketCode: redPacketCode || "",
      firstPlaceRedPacketCode: firstPlaceRedPacketCode || ""
    });
  },
  // vip红包
  dealNewVip (item) {
    // vipPackageChoiceType 0或null表示传统样式(月卡或者联合会员); 1表示多套餐类型
    let setObj = {}; let showItem = null; let defaultIds = ''; let vipPackageChoiceType = item.data.vipPackageChoiceType;
    let vipMonthCard = this.data.vipMonthCard; let monthlyVipId = ''; let merchantMember = {}
    if (vipPackageChoiceType == 1) {
      item.data.vipPackageItemList.map((items, index) => {
        if (items.checkVipFlag == 1) {
          showItem = items
        }
        if (items.defaultShowFlag == true) {
          defaultIds = index
        }
        if (items.vipPackageType == 1) {
          vipMonthCard.have = true
          vipMonthCard.vipId = items.vipId
        }
        if (items.vipPackageType == 2) {
          monthlyVipId = items.vipId
        }
      })
      showItem = showItem ? showItem : item.data.vipPackageItemList[defaultIds]
    }
    setObj = {
      hasVipFloorFlag: true,
      vipMonthCard,
      monthlyVipId,
      buyCouponWithOrderFlag: vipPackageChoiceType == 1
        ? showItem.checkVipFlag
        : item.data.checkVipFlag,
      submitVipTypeId: vipPackageChoiceType == 1
        ? showItem.vipId || ""
        : item.data.vipId || "",
      checkVipFlag: vipPackageChoiceType == 1
        ? showItem.checkVipFlag
        : item.data.checkVipFlag,
      purchaseVipTypeId: vipPackageChoiceType == 1
        ? showItem.vipId || ''
        : item.data.vipId || '', // 结算 提单参数
      purchaseVip: vipPackageChoiceType == 1
        ? showItem.checkVipFlag == 1 ? true : false
        : item.data.checkVipFlag == 1 ? true : false, // 提单参数
      mockVip: vipPackageChoiceType == 1
        ? showItem.checkVipFlag == 1 ? true : false
        : item.data.checkVipFlag == 1 ? true : false,
      unionVipFlag: vipPackageChoiceType == 1
        ? null
        : item.data.unionVipFlag || null,
      purchaseMemberId: vipPackageChoiceType == 1
        ? ''
        : item.data.unionVipFlag && item.data.checkVipFlag == 1 ? item.data.unionMemberId : ''
    }
    if (item.data.unionVipFlag) {
      merchantMember = { buyMerchantMemberFlag: item.data.checkVipFlag == 1 ? true : false }
    }
    setObj = Object.assign({}, setObj, merchantMember)
    this.setData(setObj);
  },
  // 微常准
  dealmicroSettlement (item) {
    this.setData({
      openState: item.data.openState
    });
  },
  // 医药
  dealUseDrug (item) {
    let currentDiseasesInfoJson = item.data.currentDiseasesInfoJson || {};
    this.setData({
      prescriptionInfo: currentDiseasesInfoJson
    });
  },
  // 教育优惠
  dealEducationInfo (item) {
    let educationInfo = item.data;
    if (Object.keys(educationInfo).length > 0) {
      this.setData({
        educationInfo: educationInfo
      });
    }
  },
  // 发票
  dealInvoice (item) {
    if (item.data) {
      this.setData({
        orderInvoiceContent: item.data.invoiceStoreRemark,
        orderInvoiceMoneyDetail: item.data.invoiceMoneyTip,
        orderInvoiceFormType: item.data.invoiceEType
      });
    }
  },
  // 号码保护
  dealCryptoguard (item) {
    this.setData({
      mobileSafeFlag: Boolean(item.data.useCryptoguard)
    });
  },
  // 超值换购弹层
  dealExchangeToast (item) {
    if (this.data.exchangeToast == null) {
      let flag = item.data.huanGouProductList.find((subItem) => {
        return subItem.skuNum == 0;
      });
      if (flag !== undefined && item.data.toast && item.data.toast.length) {
        let query = wx.createSelectorQuery();
        let refQuery = this.createIntersectionObserver();
        let that = this;
        this.setData({ exchangeToast: true, refQuery });
        setTimeout(() => {
          query
            .select(".exchange_wrap")
            .boundingClientRect(function (res) {
              that.setData({ exFloorTop: res.top });
            })
            .exec();
          refQuery
            .relativeToViewport()
            .observe(".exchange_wrap", function (res) {
              if (res.intersectionRatio > 0) {
                that.data.exchangeToast &&
                  that.setData({ exchangeToast: false });
                that.data.refQuery.disconnect();
              }
            });
        }, 300);
      }
    }
  },
  // 出现随单购商家会员楼层 需回传
  dealMemberEntrance (item) {
    this.setData({
      hasMerchantMemberFloorFlag: item.data.memberType == 1 || item.data.memberType == 2 ? true : false
    });
  },
  // 获取定金金额
  dealDeposit (item) {
    this.setData({
      payStageType: item.data.payStageType || 1,
      "depositInfo.title": item.data.payTypeTip || "",
      "depositInfo.price": item.data.goodsTotalHandPriceTip || ""
    });
  },
  // 处理省钱攻略
  dealSaveMoney (item) {
    if (item && item.data && item.data.title) {
      this.setData({
        'styPopInfos.status': this.data.styPopInfos.status != null ? this.data.styPopInfos.status : 1,
        'styPopInfos.count': item.data.saveMoneyItems.length >= 3 ? 2.5 : item.data.saveMoneyItems.length,
        'styPopInfos.moneyItems': item.data.saveMoneyItems[0]
      }, () => {
        let that = this
        setTimeout(() => {
          wx.createSelectorQuery().selectAll('.strategy-top-box, .sgvip-items-box').boundingClientRect(function (rect) {
            if (rect.length) {
              let basicHeight = rect[0].height
              let oneVipHeight = rect[1].height
              that.setData({
                'styPopInfos.basicHeight': basicHeight,
                'styPopInfos.oneVipHeight': oneVipHeight
              })
            }
          }).exec()
        }, 300)
      })
    }
  },
  // 处理模块化
  dealComponetList (infos) {
    let componentParamList = this.data.componentParamList || []; let submitComParamList = this.data.submitComParamList || []
    if (infos.data.componentList.length) {
      infos.data.componentList.map(item => {
        componentParamList.push({ key: item.key, value: item.value })
        submitComParamList.push({
          key: item.key,
          value: item.value,
          requiredBlockSubmitFlag: item.requiredBlockSubmitFlag,
          requiredBlockText: item.requiredBlockText
        })
      })
    }
    this.data.componentParamList = componentParamList
    this.data.submitComParamList = submitComParamList
  },
  // 处理底部提交
  dealSubmitInfoNew (infos) {
    let { orderReturnRitual: { textList = [] } = {} } = infos.data || {}
    if (textList.length) {
      let str = ''
      textList.forEach(item => {
        str += item.text
      })
      infos.data.orderReturnRitual.airaStr = str
    }
  },
  // 发票页面跳转
  handleInvoiceClick () {
    let invoice = this.data.invoice.data;
    let { recommendObj } = this.data
    if (invoice.enableInvoice == 0) {
      wx.showModal({
        title: "提示",
        content: invoice.noInvoicePrompt,
        showCancel: false
      });
      return;
    }
    let invoiceData = this.data.invoiceData.invoiceData || {}
    let postInfo = Object.assign({ source: 'settle' }, this.data.invoice.data, {
      invoiceId: this.data.invoiceId, // 发票id
      selectIdData: invoiceData,
      distributionFee: this.data.distributionFee, // true或false，表示发票列表是否勾选了运费（头部绿色背景那里）。是发票页面回传给结算页的，每次跳转带上就可以
      distributionService: this.data.distributionService // 是否勾选增值服务
    })
    wx.navigateTo({
      url: '/pages/newInvoice/list/index',
      preObj: recommendObj,
      success (res) {
        res.eventChannel.emit('acceptSettle', { postInfo })
      }
    })
  },
  // 发票回传信息 在发票页面执行的～
  postInvoiceMsg (msg) {
    this.setData({
      invoiceData: msg.data,
      invoiceId: msg.data.invoiceId || "",
      distributionFee: msg.data.distributionFee || false,
      distributionService: msg.data.distributionService || false
    });
    if (
      msg.data.invoiceId &&
      msg.data.invoiceData &&
      msg.data.invoiceData.titleContent
    ) {
      this.setData({
        invoiceRightValue: msg.data.invoiceData.titleContent,
        orderInvoiceOpenMark: 1
      });
    } else {
      this.setData({
        invoiceRightValue: "未选择",
        orderInvoiceOpenMark: 2
      });
    }
  },
  goAddress () {
    this.setData({
      showAddress: true,
      ariaHidden: true
    });
  },
  // 是否同意自提服务协议
  checkAgreement () {
    this.setData({
      checkAgreementFlag: !this.data.checkAgreementFlag
    });
  },
  // 查看自提服务协议
  lookAgreement (e) {
    const item = e.currentTarget.dataset.item;
    if (!item.url) return
    djCmsJump({
      to: "web",
      params: {
        url: item.url
      },
      userAction: "",
      preObj: this.data.recommendObj || null,
      buried_position: {
        currentPageName: 'settlementv2_lookAgreement'
      }
    });
  },
  // 点击自提tab
  clickAddressTab (e) {
    let { deliverModel } = e.detail;

    this.setData(
      {
        deliverModel,
        firstPlaceRedPacketCode: null,
        redPacketCode: null,
        couponCacheId: null,
        selectedCouponInfoPreOperateList: null,
        selectedDiscountType: null,
        selectDiscountThreshold: null,
        selectedDiscountMoney: null,
        freightCouponCode: null,
        purchaseMemberId: null,
        unionVipFlag: null,
        memberOpenState: null
      },
      () => {
        this.getInitData();
      }
    );
  },

  onDeliverTimeClick () {
    this.setData({
      showPicker: true,
      ariaHidden: true
    });
  },

  getPickerTime (e) {
    let { data } = e.detail;
    this.setDeliveryTime(data, true);
  },

  /**
   * 根据时间索引获取时间
   * 判断是否存在 expectedDeliveryTime 如有 2018-09-09 12：00-14：30
   * expectedDeliveryTime 需要转化为两个参数
   * expectedDeliveryBeginTime：2018-09-09 12：00：00
   * expectedDeliveryEndTime： 2018-09-09 14：30：00
   */
  setDeliveryTime (data, refresh) {
    // 根据索引获取日期 具体参考promiseDateRespItems结构 [{a:1,promiseTimeRespItems:[]},{a:2,promiseTimeRespItems:[]}]
    let promiseDateRespItems =
      this.data.deliverTime.data.promiseDateRespItems || [];
    let promiseBusinessType = this.data.deliverTime.data.promiseBusinessType;
    let promiseDateItems = promiseDateRespItems[data.dateIndex || 0] || {};
    let promiseDate = promiseDateItems.promiseDate || "";
    let promiseTimeRespItems = promiseDateItems.promiseTimeRespItems || [];
    let promiseTime = promiseTimeRespItems[data.timeIndex || 0] || "";
    let deliveryTip = promiseTime.deliveryTip || "";

    let orgStartTime = promiseTime.orgStartTime || "";
    let orgEndTime = promiseTime.orgEndTime || "";
    let userStartTime = promiseTime.userStartTime || "";
    let userEndTime = promiseTime.userEndTime || "";
    let arriveType = promiseTime.arriveType;
    let affectedTime = promiseTime.affectedTime;
    this.setData({
      promiseDate,
      promiseTime,
      orgStartTime,
      orgEndTime,
      userStartTime,
      userEndTime,
      deliveryTip,
      affectedTime,
      arriveType,
      promiseBusinessType
    });
    if (refresh) {
      this.getInitData();
    }
  },

  // 地址列表选中地址
  selectdAddress (e) {
    let { data } = e.detail;
    let homemak = {}; let origin = {}
    origin = {
      addressId: data.addressInfo.addressId || 0,
      mobile: data.addressInfo.mobile || "",
      addressName: data.addressInfo.name || "",
      fullAddress: data.addressInfo.fullAddress || "请选择您的收货地址"
    }
    // 假如是家政服务 切换地址需要清空服务时间
    if (this.data.settlementBusinessTag == 1) {
      let newAddres = data.addressInfo.addressId || 0
      let nowAddres = this.data.addressId
      if (newAddres !== nowAddres) {
        homemak = {
          lastServiceDateTime: '',
          orgStartTime: '',
          orgEndTime: ''
        }
      }
    }
    let setObj = Object.assign({}, origin, homemak)
    this.setData(setObj, () => {
      this.getInitData();
    })
    app.globalData.settlement.isGet = true
  },

  // 结算时校验是否已经选择了配送时间
  hasSelectedDeliveryInfo () {
    // 是否选择过配送时间
    let hasLocalDeliveryInfo =
      !isEmpty(this.data.orgStartTime) && !isEmpty(this.data.orgEndTime);
    if (this.data.pushTimeFlag) {
      if (hasLocalDeliveryInfo) {
        return true;
      } else {
        this.setDeliveryTime(
          {
            dateIndex: 0,
            timeIndex: 0
          },
          false
        );
        return true;
      }
    } else {
      return false;
    }
  },
  // 处理订购人信息
  SetInputValue (e) {
    let { keys } = e.currentTarget.dataset;
    this.setData({
      [keys]: e.detail.value
    });
  },

  getOrderName () {
    return this.data.bookInfo ? this.data.orderNameValue || "匿名" : null;
  },

  getOrderPhone () {
    return this.data.bookInfo ? this.data.orderPhoneValue : null;
  },

  getSpecilMark () {
    return this.data.specialInfo
      ? this.data.specialRemark
        ? `${this.data.specialInfo.title}${this.data.specialRemark}`
        : ""
      : null;
  },
  // ---订购人信息END

  changePhoneNumGuard (e) {
    let mobileSafeFlag;
    if (this.data.mobileSafeFlag != null) {
      mobileSafeFlag = !this.data.mobileSafeFlag;
    } else {
      mobileSafeFlag = !e.currentTarget.dataset.flag;
    }
    this.setData({
      mobileSafeFlag
    });
  },

  showGuardRule (e) {
    let { readmeList, iconName } = e.currentTarget.dataset;
    let obj = {
      show: true,
      types: 1,
      readmeList
    };
    this.setTipDialog(obj);
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickExplainIcon',
      click_par: {
        iconName
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },

  setTipDialog (obj) {
    let tipDialog = Object.assign({}, this.data.tipDialog, obj);
    this.setData({ tipDialog, ariaHidden: obj.show });
  },

  tipClose () {
    this.setTipDialog({ show: false });
  },

  selectFeeId (e) {
    let { deliveryClerkFeeId, deliveryClerkFeeTipId } = e.detail;
    this.setData(
      {
        deliveryClerkFeeId,
        deliveryClerkFeeTipId
      },
      () => {
        this.getInitData();
      }
    );
  },
  setDefaultFree (e) {
    let { data } = e.detail;
    this.setData({
      selectedDiscountType: data.selectedDiscountType,
      selectDiscountThreshold: data.selectDiscountThreshold,
      selectedDiscountMoney: data.selectedDiscountMoney,
      freightCouponCode: data.freightCouponCode
    });
    if (data.refresh) {
      !this.data.userChooseFreightDiscountFlag && (this.data.userChooseFreightDiscountFlag = true);
      this.getInitData();
    }
  },
  // 礼品卡弹窗
  showGiftDialog () {
    let tipDialog = Object.assign({}, this.data.tipDialog, {
      show: true,
      types: 1,
      readmeList: this.data.giftCard.data.readme
    });
    this.setData({
      tipDialog
    });
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickExplainIcon',
      click_par: {
        iconName: '礼品卡'
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  useGiftCard () {
    if (this.data.giftDisable) {
      wx.showModal({
        content:
          "密码输入次数已达上限（最多可输入6次），礼品卡余额暂不可用，请30分钟后重试",
        showCancel: false
      });
      return;
    }
    this.setData(
      {
        useGiftCardFlag: !this.data.useGiftCardFlag
      },
      () => {
        // 刷新结算页
        this.getInitData();
      }
    );
  },
  // 输入礼品卡密码
  inputPwd (e) {
    let { data } = e.detail;
    this.setData({
      giftCardPwd: data
    });
    if (data) {
      this.requestSubmit();
    }
  },
  // 会员规则弹窗
  showMemberRule () {
    let tipDialog = Object.assign({}, this.data.tipDialog, {
      show: true,
      types: 1,
      readmeList: this.data.memberEntrance.data.explain
    });
    this.setData({
      tipDialog
    });
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickExplainIcon',
      click_par: {
        iconName: '商家会员'
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 随单开通商家会员
  openMember (e) {
    // openState 0.不展示 1.已开通 2.未开通 3.开通不反选
    let { openState, toMemberCenterUrl = '' } = e.currentTarget.dataset;
    if (openState == 0 && toMemberCenterUrl) {
      djCmsJump({
        to: 'web',
        params: {
          url: toMemberCenterUrl
        },
        preObj: this.data.recommendObj || null,
        buried_position: {
          currentPageName: 'settlementv2_openMember'
        }
      })
    } else if (openState == 3) {
      return;
    } else {
      this.initMemberData(openState);
    }
  },
  // 合规需求跳H5
  jump2rule (item) {
    let { params, jumpflag } = item.currentTarget.dataset;
    if (!jumpflag) return;
    let jumpurl = `${params}`;
    let { recommendObj = null } = this.data
    wx.navigateTo({
      url: "/pages/h5/index?url=" + encodeURIComponent(jumpurl),
      preObj: recommendObj,
      buried_position: {
        currentPageName: 'settlementv2_jump2rule'
      }
    });
  },
  checkBusiness (e) {
    const { openState } = e.detail
    this.initMemberData(openState)
  },
  initMemberData (openState, fromToast = "", callSaveMoney = true) {
    // openState 1.已开通 2.未开通 这里的状态取的是点击时，当前的开通状态，点击之后要取反
    let memberObj = {
      memberOpenState: openState == 1 ? 2 : openState == 2 ? 1 : null,
      userOperateType: openState == 1 ? 22 : openState == 2 ? 21 : "",
      buyMerchantMemberFlag: openState == 1 ? false : openState == 2 ? true : false,
      submitOrderLayerCheckedFlag: fromToast == "membertoast" ? (openState == 1 ? false : true) : ""
    };
    let initObj = this.initPreferParams();
    let setObj = Object.assign({}, memberObj, initObj);
    this.setData(setObj, () => {
      this.getInitData(callSaveMoney);
    });
  },
  initPreferParams () {
    return {
      selectedDiscountType: null,
      selectDiscountThreshold: null,
      selectedDiscountMoney: null,
      freightCouponCode: null,
      firstPlaceVoucherCode: null,
      firstPlaceRedPacketCode: null,
      couponCacheId: null,
      selectedCouponInfoPreOperateList: null
    };
  },
  listenMember (e) {
    let { flag } = e.detail;
    let layerType = this.data.specialBusinessResult.layerType;
    if (layerType == 1) {
      // openState 这里的状态取的是点击时，当前的开通状态
      let openState = flag ? 2 : 1;
      this.initMemberData(openState, "membertoast");
    } else if (layerType == 2) {
      this.setData({
        submitOrderLayerCheckedFlag: flag
      });
      let vipId = this.data.newVip.data.vipId
      this.handleVipCheck({ detail: { checkVip: flag ? 1 : 0, vipId } });
    }
  },
  // 提交订单
  goPay () {
    let body = this.generateSubParams()
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: "goPay",
      click_par: {
        storeId: this.data.storeId,
        ...body
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    });
    if (this.data.blockPopupFlag === true && this.data.packUseFlag === false) {
      this.setData({ needpackShow: true });
      clickBuriedV2_({
        click_id: "getOrderFail",
        click_par: {
          storeId: this.data.storeId,
          msg: '未选择使用包装费',
          code: ''
        },
        pageId: pageIdFirstPage,
        currentPageName,
        prePageName
      });
      return;
    }
    if (!this.data.checkAgreementFlag && this.data.deliverModel == 2) {
      showDialog({
        text: "请先同意到店自取服务协议",
        isClose: false
      });
      clickBuriedV2_({
        click_id: "getOrderFail",
        click_par: {
          storeId: this.data.storeId,
          msg: '未同意到店自取服务协议',
          code: ''
        },
        pageId: pageIdFirstPage,
        currentPageName,
        prePageName
      });
      return;
    }
    if (
      this.data.addressId == null ||
      this.data.addressId == undefined ||
      this.data.addressId == "0"
    ) {
      if (this.data.deliverModel == '2' && this.data.deliverTypeABStyle == 1) {
        console.log('eslint');
      } else {
        showDialog({
          text: "请选择地址",
          isClose: false
        });
        clickBuriedV2_({
          click_id: "getOrderFail",
          click_par: {
            storeId: this.data.storeId,
            msg: '未选择地址',
            code: ''
          },
          pageId: pageIdFirstPage,
          currentPageName,
          prePageName
        });
        return;
      }
    }
    // 家政服务时间 or 到家服务时间
    if (this.data.settlementBusinessTag === 1) {
      if (!this.data.lastServiceDateTime) {
        showDialog({
          text: "请选择上门时间",
          isClose: false
        });
        return;
      }
    } else {
      if (!this.hasSelectedDeliveryInfo()) {
        showDialog({
          text: "请选择时间",
          isClose: false
        });
        clickBuriedV2_({
          click_id: "getOrderFail",
          click_par: {
            storeId: this.data.storeId,
            msg: '未选择时间',
            code: ''
          },
          pageId: pageIdFirstPage,
          currentPageName,
          prePageName
        });
        return;
      }
    }
    if (this.data.preSaleProtocol && !this.data.usePreSaleProtocol) {
      this.setData({ depositShow: true });
      clickBuriedV2_({
        click_id: "getOrderFail",
        click_par: {
          storeId: this.data.storeId,
          msg: '未同意预售定金不退协议',
          code: ''
        },
        pageId: pageIdFirstPage,
        currentPageName,
        prePageName
      });
      return;
    }
    if (this.data.deliverModel == '2' && this.data.deliverTypeABStyle == 1) {
      if (/1[0-9]{2}((\*{4})|([0-9]{4}))[0-9]{4}/g.test(this.data.selfPhone) == false) {
        showDialog({
          text: "手机号需填写11位数字",
          isClose: false
        });
        return
      }
    }
    // 如果教育优惠品，没做验证
    if(this.data.educationInfo && !this.data.educationInfo.certificationPassFlag) {
      showDialog({
        text: "请先完成资格认证",
        isClose: false
      });
      return;
    }
    if (this.data.submitComParamList && this.data.submitComParamList.length) {
      let flag = false; let toast = ''
      this.data.submitComParamList.forEach(item => {
        if (item.requiredBlockSubmitFlag == true && !item.value) {
          flag = true
          toast = item.requiredBlockText
        }
      })
      if (flag) {
        wx.showToast({
          title: toast,
          icon: 'none',
          duration: 2500
        })
        return
      }
    }
    // 餐具验证
    if (this.data.tableWareData) {
      if (this.data.tableWareData.data && !this.data.tableWareData.data.submitValue) {
        this.setData({
          isShowTableWare: true,
          tableWareClickType: 2
        })
        return;
      }
    }
    this.setData({
      disabled: true,
      loading: true
    });
    this.requestSubmit();
  },
  generateSubParams () {
    return {
      couponCacheId: this.data.couponCacheId || "",
      // 自提新样式下不需要addressId
      addressId: (this.data.deliverModel == '2' && this.data.deliverTypeABStyle == 1) ? null : this.data.addressId,
      // "coupon": app.globalData.couponCode,
      coupons: this.data.selectedCouponInfoPreOperateList
        ? this.data.selectedCouponInfoPreOperateList.map(
          (item) => item.couponCode
        )
        : [],
      deliveryType: this.data.deliverModel || 1,
      generalAddress: 0,
      jdBeansCount: 0,
      onTime: this.data.onTime,
      deliveryTip: this.data.deliveryTip,
      orderPayType: 4,
      storeId: this.data.storeId,
      signatureKey: this.data.signatureKey,
      storeName: this.data.storeName,
      stockOutOption:
        this.data.selectedLackGoods ||
        "所购商品如遇缺货，您需要：其它商品继续配送（缺货商品退款）",
      unique: this.data.unique,
      aging: 5,
      coordType: 2,
      fromSource: 5,
      orderAgingType: "0",
      terminalType: 2,
      orgCode: this.data.orgCode,
      // "validateCode": this.data.voiceCode.voiceCodeStr,
      orderBuyerRemark: this.data.remarkContent,
      ordererName: this.getOrderName(),
      ordererMobile: this.getOrderPhone(),
      specialRemark: this.getSpecilMark(),
      platformPoints: this.data.usePlatPointsFlag ? 1 : 0,
      // "infoId": this.data.useDrug && this.data.useDrug.data && this.data.useDrug.data.useDrugId ? this.data.useDrug.data.useDrugId : "",
      // "picUrl": this.data.picUrl.join(","),
      // promise改版
      sendTime: this.data.orgStartTime || "",
      deliveryTime: this.data.orgEndTime || "",
      expectedDeliveryBeginTime: this.data.userStartTime || "",
      expectedDeliveryTime: this.data.userEndTime || "",
      arriveType: this.data.arriveType,
      affectedTime: this.data.affectedTime,
      promiseBusinessVersion: this.data.promiseBusinessType || "",
      mobileSafeFlag: this.data.mobileSafeFlag,
      // 是否使用礼品卡及密码
      useGiftCard: this.data.useGiftCardFlag ? "1" : "0" || "",
      giftCardPwd: this.data.giftCardPwd || "",
      // 使用vip红包
      redPackageCode: this.data.redPacketCode || "",
      purchaseVip: this.data.purchaseVip || false,
      purchaseVipTypeId: this.data.submitVipTypeId || "",
      // 3.5.2 免运券
      promotionType: this.data.selectedDiscountType,
      freightCouponCode: this.data.freightCouponCode,
      promotionMoney: this.data.selectDiscountThreshold,
      promotionRealMoney: this.data.selectedDiscountMoney,
      checkPayMoney: this.data.totalMoney || "",
      deliveryClerkFeeId: this.data.deliveryClerkFeeId, // 用户选中的小费id
      orderBusinessTagType:
        (this.data.openState == 1 || this.data.openState == 0) &&
        this.data.deliverModel == 1 && this.data.microSettlement
          ? 100
          : 0, // 微常准
      prescriptionInfo: this.data.prescriptionInfo, // 医药提单信息
      educationInfo: this.data.educationInfoSubmit, // 教育优惠信息
      // 发票
      orderInvoiceOpenMark: this.data.orderInvoiceOpenMark, // 是否需要开发票
      orderInvoiceType:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.titleType, // 发票抬头类型
      orderInvoiceTitle:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.titleContent, // 发票抬头
      orderInvoiceContent: this.data.orderInvoiceContent, // 发票内容
      orderInvoiceMoneyDetail: this.data.orderInvoiceMoneyDetail, // 发票金额说明
      orderInvoiceFormType: this.data.orderInvoiceFormType, // 发票呈现类型
      orderInvoiceMail:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.userEmail, // 发票邮箱
      orderInvoiceDutyNo:
        this.data.invoiceData.invoiceData &&
        (this.data.invoiceData.invoiceData.taxNum
          ? this.data.invoiceData.invoiceData.taxNum
          : ""), // 发票税号
      invoiceAddress:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.registerAddress, // 注册地址
      invoiceTelNo:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.registerPhone, // 注册电话
      invoiceBankName:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.depositBank, // 开户银行
      invoiceAccountNo:
        this.data.invoiceData.invoiceData &&
        this.data.invoiceData.invoiceData.bankAccount, // 银行账号
      freightInvoiceFlag: this.data.distributionFee ? 1 : 0, // 是否开运费发票
      serviceInvoiceFlag: this.data.distributionService ? 1 : 0, // 是否开增值服务费发票
      orderPageId: this.data.orderPageId, // 结算页面id
      // 8.1新增参数
      buyMerchantMemberFlag: this.data.buyMerchantMemberFlag,
      settlementPayMoney: this.data.settlementPayMoney,
      hasMerchantMemberFloorFlag: this.data.hasMerchantMemberFloorFlag,
      hasVipFloorFlag: this.data.hasVipFloorFlag,
      userChooseFreightDiscountFlag: this.data.userChooseFreightDiscountFlag,
      userChooseCouponFlag: this.data.userChooseCouponFlag,
      submitOrderLayerType: this.data.submitOrderLayerType,
      submitOrderLayerCheckedFlag: this.data.submitOrderLayerCheckedFlag,
      // 8.8.5 单品单结
      saleType: this.data.saleType,
      skuList: this.data.preSaleSkuInfos,
      // 线下用户标签透传
      specialBusinessTagList: this.data.specialBusinessTagList,
      // 8.12.5 包装费
      packUseFlag: this.data.packUseFlag,
      extendInfo: this.data.extendInfo,
      // 8.16.5 自提手机号
      selfPickPhone: this.data.selfPhone,
      // 指纹id
      riskTokenId: wx.getStorageSync('device_token_id') || "",
      pickerValue: this.data.pickerValue,
      // 8.22.5
      merchantMemberPackageId: this.data.purchaseMemberId,
      // 8.23 结算页模块化
      componentParamList: this.data.componentParamList,
      // 8.28 餐具
      tableware: this.data.tableWareData && this.data.tableWareData.data && this.data.tableWareData.data.submitValue
    };
  },
  requestSubmit () {
    let body = this.generateSubParams();
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    wx.showLoading({
      title: "提交中...",
      mask: true
    });
    let { functionId, appVersion } = funId.orderSubmit34;
    request({
      method: "POST",
      functionId,
      appVersion,
      isNeedDealError: true,
      body: body,
      pageId: pageIdFirstPage
    })
      .then((res) => {
        wx.hideLoading();
        let response = res.data;
        if (response) {
          if (response.code == "0" && response.result) {
            let payName = this.data.productInfo.data[0].name;
            let result = response.result;
            let orderPayType = response.result.orderPayType;
            // let isDrug = this.data.useDrugRequireFlag != null ? true : false;
            // 1货到付款, 2邮局汇款, 4在线支付, 5公司转账
            if (orderPayType == 4) {
              this.requestSign({
                orderId: result.orderId,
                payName: payName,
                orderPrice: result.orderPrice,
                orderStateName: result.orderStateName,
                storeId: this.data.storeId,
                payStageType: this.data.payStageType
              });

              // 付款完成
            } else if (orderPayType == 1) {
              this.initSubscribeMessage({
                orderId: result.orderId,
                payName: payName,
                orderPrice: result.orderPrice,
                orderStateName: result.orderStateName,
                storeId: this.data.storeId
              });
            }
            // 腾讯有数埋点
            custom_order(
              {
                orderId: result.orderId,
                payName: payName,
                orderPrice: result.orderPrice,
                orderStateName: result.orderStateName,
                storeId: this.data.storeId
              },
              "give_order",
              100
            );
            clickBuriedV2_({
              click_id: "getOrderSuccess",
              click_par: {
                storeId: this.data.storeId,
                orderId: result.orderId
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          } else if (response.code == "50002") {
            this.setData({
              disabled: false,
              loading: false
            });
            // 未绑定手机号
            showDialog({
              text: "您还未绑定手机号，请您下载京东到家APP绑定手机号。",
              confirmText: "我知道了"
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: '您还未绑定手机号，请您下载京东到家APP绑定手机号。',
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          }
          // 礼品卡 密码错误 密码不全
          else if (response.code == "50048" || response.code == "50110") {
            this.setData({
              giftTips: response.msg || "",
              clearGiftPwd: new Date().getTime(),
              disabled: false,
              loading: false
            });
            wx.showToast({
              title: response.msg,
              icon: "none",
              duration: 2000,
              mask: false
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: response.msg || "礼品卡 密码错误 密码不全",
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          }
          // 礼品卡 密码超过六次
          else if (response.code == "50049") {
            wx.showModal({
              title: "提示",
              content: response.msg || "",
              confirmText: "我知道了",
              showCancel: false,
              success: () => {
                clickBuriedV2_({
                  click_id: "ClickIKnow",
                  pageId: pageIdFirstPage,
                  currentPageName,
                  prePageName
                });
              }
            });
            this.setData({
              useGiftCardFlag: false, // 禁用礼品卡
              giftDisable: true, // 禁用礼品卡
              showGiftPay: false, // 隐藏密码输入框
              disabled: false,
              loading: false
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: response.msg || "密码超过六次",
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
            // 重新请求
            this.getInitData();
          }
          // 需要设置支付密码后才可以使用礼品卡
          else if (response.code == "50052") {
            this.setData({
              disabled: false,
              loading: false
            });
            let { recommendObj = null } = this.data
            wx.showModal({
              title: "支付密码设置提醒",
              content: "您需要设置支付密码后才可以使用礼品卡",
              showCancel: true,
              cancelText: "稍后设置",
              cancelColor: "#999999",
              confirmText: "去设置",
              confirmColor: "#3CC51F",
              success: (result) => {
                if (result.confirm) {
                  wx.navigateTo({
                    url:
                      "/pages/h5/index?url=" +
                      encodeURIComponent(this.data.giftH5),
                    preObj: recommendObj,
                    buried_position: {
                      currentPageName: 'settlementv2_requestSubmit'
                    }
                  });
                }
              }
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: response.msg || "需要设置支付密码后才可以使用礼品卡",
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          }
          else if (response.code == "50060") { // 提单商品没有餐具sku商品
            wx.showToast({
              title: '请选择餐具后才可以下单哦~',
              icon: "none",
              duration: 2500
            })
            this.getInitData()
          }
          // 请输入礼品卡密码
          else if (response.code == "50053") {
            this.setData({
              showGiftPay: true,
              disabled: false,
              loading: false
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: response.msg || "请输入礼品卡密码",
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          // 提单二次会员弹层
          } else if (response.code == "50056") {
            this.setData({
              memberToast: true,
              showAddressTips: false,
              exchangeToast: false,
              specialBusinessResult: response.result.specialBusinessResult,
              submitOrderMemberTip:
                this.data.memberEntrance &&
                this.data.memberEntrance.data.submitOrderMemberTip,
              submitOrderLayerType:
                response.result.specialBusinessResult.layerType,
              disabled: false,
              loading: false
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: response.msg || "提单二次会员弹层",
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          } else if (response.code == "50058") {
            // 唤起连续包月签约弹层
            this.setData({
              'confirmDialog.cancelText': this.data.vipMonthCard.have ? '购买月卡' : '取消',
              'confirmDialog.show': true,
              disabled: false,
              loading: false
            })
          } else if (response.code == "50059") {
            // 家政服务 该时间点已被约满
            this.setData({
              disabled: false,
              loading: false,
              lastServiceDateTime: '',
              orgStartTime: '',
              orgEndTime: '',
              originToast: response.msg || '该时间点已被约满，请重新选择时间'
            }, () => {
              this.getInitData()
            })
          } else {
            this.setData({
              disabled: false,
              loading: false
            });
            showDialog({
              text: response.msg,
              isClose: false
            });
            clickBuriedV2_({
              click_id: "getOrderFail",
              click_par: {
                storeId: this.data.storeId,
                msg: response.msg || "",
                code: response.code
              },
              pageId: pageIdFirstPage,
              currentPageName,
              prePageName
            });
          }
        } else {
          this.setData({
            disabled: false,
            loading: false
          });
          showDialog({
            text: "接口异常",
            isClose: true
          });
          clickBuriedV2_({
            click_id: "getOrderFail",
            click_par: {
              storeId: this.data.storeId,
              msg: response.msg || "接口异常",
              code: response.code
            },
            pageId: pageIdFirstPage,
            currentPageName,
            prePageName
          });
        }
        this.data.submitDisabled = false;
      })
      .catch((err) => {
        wx.hideLoading();
        showDialog({
          text: "网络异常",
          isClose: false
        });
        this.data.submitDisabled = false;
        this.setData({
          disabled: false,
          loading: false
        });
        let infos = err && err.toString()
        this.reportMonitor('53', 'settleSubmitCatchError', infos)
      });
  },
  requestSign (options) {
    // eslint-disable-next-line
    let discountMoney = "";
    if (
      self.data.couponInfo &&
      self.data.couponInfo.data &&
      self.data.couponInfo.data.totalDiscountMoney
    ) {
      // eslint-disable-next-line
      discountMoney = self.data.couponInfo.data.totalDiscountMoney / 100;
    }
    self.setData({
      isSubmitSuccess: true
    });
    let { recommendObj = null } = self.data
    // 腾讯有数埋点
    custom_order(options || {}, "pay", 100);
    // eslint-disable-next-line
    let paytools = require("../../common/util/PayTools");
    paytools.requestSign(
      options,
      function () {
        app.globalData.needLoadOrder = true;
        self.initSubscribeMessage(options);
        // 腾讯有数埋点
        custom_order(options || {}, "payed", 100);
        self.setData({
          disabled: false,
          loading: false
        });
      },
      function () {
        app.globalData.needLoadOrder = true;
        var url = "/pages/tabBar/orderlist/index";
        wx.switchTab({
          url: url,
          preObj: recommendObj
        });
        // 腾讯有数埋点
        custom_order(options || {}, "cancel_pay", 100);
        self.setData({
          disabled: false,
          loading: false
        });
      }
    );
  },
  // 订阅消息隐藏弹层
  hiddenShowSubscribeMessage (status, _t) {
    _t.setData({
      showSubscribeMessage: status
    });
  },
  // 订阅消息关闭弹层
  hiddenSubscribeMessage () {
    this.setData({
      showSubscribeMessage: false
    });
  },
  // 推送消息曝光埋点
  async commonSetTmp (tmIds) {
    // 检测是否点击过”总是允许“
    let isClicked = await judgeAllowBtn(tmIds);
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    // 埋点
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'showLayer',
      click_par: {
        type: isClicked ? 'hideSubscribe' : 'subscribe',
        templateId: tmIds.join(),
        channelId: 107
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 订阅消息请求
  subscribeMessageUpdata (res, that) {
    let loginStateInfo = app.globalData.loginStateInfo;
    // 模板入参
    let templates = [];
    let acceptTmIds = [];
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    for (var key in res) {
      let tempId = {};
      if (res[key] == "reject") {
        tempId.status = "reject";
        tempId.templateId = key;
        tempId.channelId = that.matchChannel(key);
        templates.push(tempId);
      } else if (res[key] == "accept") {
        tempId.status = "accept";
        tempId.templateId = key;
        tempId.channelId = that.matchChannel(key);
        templates.push(tempId);
        acceptTmIds.push(key);
      } else if (res[key] == "ban") {
        tempId.status = "ban";
        tempId.templateId = key;
        tempId.channelId = that.matchChannel(key);
        templates.push(tempId);
      }
    }

    request({
      ...FNIDS.subscribeMsg,
      body: {
        openId: loginStateInfo.openId || "",
        templates: templates
      },
      pageId: pageIdFirstPage
    })
      .then((res) => {
        console.log("==========res==========", res);
      })
      .catch((err) => {
        console.log("==========err==========", err);
      });
    // "允许"按钮上报
    clickBuriedV2_({
      create_time: new Date(),
      click_id: 'clickLayer',
      click_par: {
        type: 'subscribe',
        templateId: acceptTmIds.join(),
        channelId: 107,
        btnName: 'accept'
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 匹配channel
  matchChannel (templeKey) {
    let channel = 1;
    switch (templeKey) {
    case "MUMVz8L2w1GfGlI_pzERYQKRy8VvCMNUcUsxW-A7c3I":
      channel = 1;
      break;
      // eslint-disable-next-line
      case "foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":
      channel = 3;
      break;
    case "sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU":
      channel = 4;
      break;
    case "oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs":
      channel = 5;
      break;
    case "foXXDvHMDaA45_8QPRwAd_p9unR3syrGG8kxIVQXUQ0":
      channel = 6;
      break;
      // eslint-disable-next-line
      case "oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs":
      channel = 7;
      break;
      // eslint-disable-next-line
      case "foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":
      channel = 8;
      break;
      // eslint-disable-next-line
      case "sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU":
      channel = 9;
      break;
    case "aHE90mjezRAJVQhzUhZ5vXoSQwwI8hgR-tYVSa9F5-A":
      channel = 10;
      break;
    case "Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso":
      channel = 11;
      break;
    case "B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY":
      channel = 12;
      break;
      // eslint-disable-next-line
      case "foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU":
      channel = 13;
      break;
    case "fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I":
      channel = 15;
      break;
    case "iwJcSNrbfOXKnfhoi4tEJh0s48uz689kTloguhSZryk":
      channel = 16;
      break;
    case "tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs":
      channel = 17;
      break;

    default:
      channel = 14;
    }
    return channel;
  },
  initSubscribeMessage (options) {

    this.setData({
      tmplIds: [
        "MUMVz8L2w1GfGlI_pzERYQKRy8VvCMNUcUsxW-A7c3I",
        "tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs",
        "fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I"
      ]
    });
    let { recommendObj = null } = this.data
    let that = this;
    let isSubscribeMessage = true;
    let tmplIds = that.data.tmplIds;
    // 阻止呼起弹层
    let t = setTimeout(() => {
      if (isSubscribeMessage) {
        that.hiddenShowSubscribeMessage(true, that);
      } else {
        that.hiddenShowSubscribeMessage(false, that);
      }
      clearInterval(t);
    }, 1000);
    console.log("========消息模板======", tmplIds);
    wx.requestSubscribeMessage({
      tmplIds: tmplIds,
      success (res) {
        if (res.errMsg == "requestSubscribeMessage:ok") {
          // 用于阻止已经点击总是
          isSubscribeMessage = false;
          that.hiddenShowSubscribeMessage(false, that);
          // 上报数据
          that.subscribeMessageUpdata(res, that);
        }
        var url = `../order/paySuccess/index?orderPrice=${
          options.orderPrice / 100
        }&orderId=${options.orderId}&storeId=${options.storeId}&orgCode=${
          options.orgCode
        }&payStageType=${that.data.payStageType}`;
        wx.navigateTo({
          url: url,
          preObj: recommendObj,
          success: () => {
            self.setData({
              paySuccess4Prescription: true,
              toPayPage: true
            });
          },
          buried_position: {
            currentPageName: 'settlementv2_initSubscribeMessage'
          }
        });
      },
      fail (err) {
        console.log("========err======", err);
        isSubscribeMessage = false;
        that.hiddenShowSubscribeMessage(false, that);

        var url = `../order/paySuccess/index?orderPrice=${
          options.orderPrice / 100
        }&orderId=${options.orderId}&storeId=${options.storeId}&orgCode=${
          options.orgCode
        }&payStageType=${that.data.payStageType}`;
        wx.navigateTo({
          url: url,
          preObj: recommendObj,
          success: () => {
            self.setData({
              paySuccess4Prescription: true,
              toPayPage: true
            });
          },
          buried_position: {
            currentPageName: 'settlementv2_initSubscribeMessage'
          }
        });
      }
    });

    // 曝光埋点 - showLayer
    this.commonSetTmp(tmplIds);
  },
  setRemarkContent (e) {
    let { remarkContent } = e.detail;
    this.setData({ remarkContent });
  },
  setLackGoods (e) {
    let { selectedLackGoods } = e.detail;
    this.setData({ selectedLackGoods });
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'stock_select',
      click_par: {
        type: selectedLackGoods
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 设置请求数据缓存
  setRequestStoreage (obj) {
    let requestData = wx.getStorageSync("settleParams");
    Object.assign(requestData, obj);
    wx.setStorageSync("settleParams", requestData);
  },
  showTopYellowBar () {
    // 顶部小黄条曝光
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'top_yellow_bar',
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 订货人信息曝光
  showBookInfo () {
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'show_book_info',
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  // 换购品添加成功
  exchangeSuccess () {
    let initObj = this.initPreferParams();
    this.setData(initObj, () => {
      this.getInitData();
    });
  },
  // 获取胶囊位置
  getCapsule () {
    let capsule = util.getCapsule();
    this.setData({
      capsule: capsule
    });
  },
  detentionSuccess () {
    let initObj = this.initPreferParams();
    this.setData(initObj, () => {
      this.getInitData();
    });
  },
  oneKeyOpen (e) {
    let { data = {} } = e.detail;
    this.setData({ oneKeyOpen: true, memberBenefitInfo: data, ariaHidden: true });
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {}, storeId = '' } = this.data
    clickBuriedV2_({
      click_id: 'showLayer',
      click_par: {
        storeId: storeId,
        type: 'freightMember'
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  showRetain () {
    this.setData({ retainShow: true });
    // 挽留弹层曝光
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'showLayer',
      click_par: {
        userAction: this.data.retainInfo.userAction
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  memberToastopen () {
    let initObj = this.initPreferParams();
    this.setData(
      {
        memberOpenState: 3,
        userOperateType: 21,
        buyMerchantMemberFlag: true,
        ...initObj
      },
      () => {
        this.getInitData();
      }
    );
  },
  getRetainLayer (info, result) {
    let { functionId, appVersion } = funId.getRetainLayer;
    let exVoucher; let products;
    let { recommendObj = {} } = this.data
    let { pageIdFirstPage = '' } = recommendObj
    result.newModules.map((item) => {
      if (item.moduleKey == "couponInfo") {
        exVoucher = item.data;
      } else if (item.moduleKey == "productInfo") {
        products = item.data;
      }
    });
    let params = {
      ...info,
      unique: result.unique,
      orderPageId: result.orderPageId,
      exVoucher,
      products
    };
    request({
      functionId,
      isNeedDealError: true,
      appVersion,
      body: params,
      method: "POST",
      pageId: pageIdFirstPage,
      preObj: recommendObj
    })
      .then((res) => {
        if (res && res.data && res.data.code == 0) {
          this.setData({
            retainInfo: res.data.result || null
          });
        } else {
          wx.showToast({
            title: (res && res.data && res.data.msg) || '网络异常',
            icon: "none",
            duration: 1500
          });
        }
      })
      .catch(() => {
        wx.showToast({
          title: '网络异常',
          icon: "none",
          duration: 1500
        });
      });
  },
  changePresale () {
    this.setData({ usePreSaleProtocol: !this.data.usePreSaleProtocol });
  },
  // 预售
  monitorDeposit (e) {
    let { types, readmeList = [] } = e.detail;
    /* eslint-disable */
    switch (types) {
      case 1:
        this.setData({ depositShow: false });
        break;
      case 2:
        let obj = {
          show: true,
          types: 1,
          readmeList,
        };
        this.setTipDialog(obj);
        break;
      case 3:
        this.setData({ depositShow: false, usePreSaleProtocol: true });
        this.requestSubmit();
        break;
      default:
        break;
    }
    /* eslint-disable */
  },
  selectPack(e) {
    let { packUseFlag = null } = e.detail || {};
    this.setData({ packUseFlag }, () => {
      this.getInitData();
    });
  },
  packDialogStatus(e) {
    let { packUseFlag = null } = e.detail || {};
    this.setData({ needpackShow: false });
    if (packUseFlag === true) {
      this.setData({ packUseFlag }, () => {
        this.getInitData();
      });
    }
  },
  // 省钱攻略
  upStrategy() {
    try {
      let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
      clickBuriedV2_({
        click_id: 'clickButton',
        click_par: {
          type: this.data.styPopInfos.status == 1 ? 'saveOpen' : 'saveClose',
          storeId: this.data.storeId
        },
        pageId: pageIdFirstPage,
        currentPageName,
        prePageName
      })
    } catch (e) {
      
    }
    this.computeStrategy()
  },
  computeStrategy() {
    let count = this.data.styPopInfos.count
    let vipH = this.data.styPopInfos.oneVipHeight
    let animation
    let status
    switch (this.data.styPopInfos.status) {
      case 1:
        status = 2
        animation = -(count * vipH)
        break;
      case 2:
        status = 1
        animation = 0
        break;
      default:
        break
    }
    this.setData({
      'styPopInfos.status': status,
      'styPopInfos.animation': animation
    })
  },
  ovserevent() {
    if (this.data.styPopInfos.status != null) {
      this.data.styPopInfos.status === 2 && this.computeStrategy()
    }
    if (this.data.newSaveMoneyPlan) {
      let moneyPlan = this.selectComponent('#newMoneyPlan')
      if (moneyPlan.data.layerOpen == true) {
        moneyPlan.closeLayer()
      }
    }
  },
  jumpAgreeUrl(e) {
    let item = e.currentTarget.dataset.item || {}
    if (item.jumpFlag) {
      djCmsJump({
        to: item.to,
        params: item.params,
        preObj: this.data.recommendObj || null,
        buried_position: {
          currentPageName: 'settlementv2_jumpAgreeUrl'
        }
      })
    } else if (item.jumpUrl) {
      djCmsJump({
        to: item.to || 'web',
        params: {
          url: item.jumpUrl
        },
        preObj: this.data.recommendObj || null,
        buried_position: {
          currentPageName: 'settlementv2_jumpAgreeUrl'
        }
      })
    }
  },
  // changeSaveMoneyStaus为总开关按钮，目前与changeMoneyItemsStaus逻辑虽然基本相同，但后期随着会员增多开关逻辑可能会存在变化
  changeSaveMoneyStaus() {
    this.data.styPopInfos.status === 1 && this.computeStrategy()
    this.commonChangeSaveStatus(this.data.styPopInfos.moneyItems)
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: 'selectMember',
      click_par: {
        status: this.data.saveMoneyPlan.data.openState == 1 ? 0 : 1,
        storeId: this.data.storeId
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  changeMoneyItemsStaus(e) {
    let items = e.currentTarget.dataset.items
    this.commonChangeSaveStatus(items)
    let { recommendObj: { pageIdFirstPage = '', currentPageName = '', prePageName = '' } = {} } = this.data
    clickBuriedV2_({
      click_id: items.type === 1 ? 'selectVPlus' : items.type === 2 ? 'selectStoreMem' : '',
      click_par: {
        status: items.openState == 2 ? 1 : 0,
        storeId: this.data.storeId
      },
      pageId: pageIdFirstPage,
      currentPageName,
      prePageName
    })
  },
  commonChangeSaveStatus(items) {
    if (items.type === 1) {
      // v+会员
      // 当前开通状态,点击反选
      let openState = items.openState
      this.setData({
        checkVipFlag: openState === 2 ? 1 : 0, 
        purchaseVipTypeId: items.vipId || '',
        purchaseVip: openState === 2 ? true : false, //提单参数
        buyCouponWithOrderFlag: openState === 2 ? 1 : 0,
        userOperateType: openState === 2 ? 10 : 11
      }, () => {
        this.getInitData()
      });
    } else if (items.type === 2) {
      // 商家会员
      this.initMemberData(items.openState)
    }
  },
  newselfPhone(e) {
    let self_phone = e.detail.self_phone || ''
    this.setData({
      selfPhone: self_phone
    })
  },
  // 监听各类弹窗弹出/关闭状态
  popStatus(e) {
    let { types, flag } = e.detail
    switch(types) {
      case 'mppicker':
        this.setData({
          showPicker: flag,
          ariaHidden: flag
        })
        break;
      case 'selectaddress':
        this.setData({
          showAddress: flag,
          ariaHidden: flag
        })
        break;
      case 'package':
        this.setData({
          ariaHidden: flag
        })
        break;
      case 'openMemberDialog':
        this.setData({
          oneKeyOpen: flag,
          ariaHidden: flag
        })
        break;
      case 'vipredbag':
        this.setData({
          showVip: flag,
          ariaHidden: flag
        })
        break;
      case 'beansRule':
        this.setData({
          ariaHidden: flag
        })
        break;
      case 'footerModule':
        this.setData({
          ariaHidden: flag
        })
        break;
      case 'homemaking':
        this.setData({
          showHomemaking: flag
        })
        break;
      default:
        break;
    }
  },
  setPickerValue(e) {
    let pickerValue = e.detail.pickerValue || ''
    this.setData({
      pickerValue
    })
  },
  // 新版vip套餐方法 --Start
  popNewVip(e) {
    let { requestFlag = false } = e.detail;
    if (requestFlag) {
      // 为true走红包降级
      this.setData({
        newVipReq: new Date().getTime(),
      });
      return;
    }
    this.setData({
      showNewVipLayer: true,
      disMoneyInfo: this.data.disMoneyInfo
    });
  },
  listenNewVipPop(e) {
    let { notice = null } = e.detail
    if (notice) {
      if (notice.unionVipFlag == true) {
        // 联合会员
        let checkVip = notice.checkVipFlag
        let memberObj = {
          memberOpenState: checkVip == 1 ? 1 : 2,
          buyMerchantMemberFlag: checkVip == 1 ? true : false,
          submitOrderLayerCheckedFlag: false
        };
        let initObj = this.initPreferParams();
        notice = Object.assign({}, notice, memberObj, initObj)
      }
      this.setData(notice, () => {
        this.getInitData(true, notice.needToast)
      })
    }
  },
  // 轮巡免密开通状态
  roundStatus() {
    this.setData({
      ringCountDown: true
    })
    let count = 0, status = false, that = this, msg = '', loading = false
    let timer = setInterval(() => {
      count++
      if (count > 5) {
        this.setData({
          ringCountDown: false
        })
        wx.showToast({
          title: msg || '自动续费协议开通失败,请重新提交订单',
          icon: 'none',
          duration: 2500
        })
        timer && clearInterval(timer)
      } else {
        if (loading == true) return
        check().then(res => {
          if (res.code == 0 && res.result == true) {
            this.setData({
              ringCountDown: false
            })
            status = true
            timer && clearInterval(timer)
            this.requestSubmit()
          } else {
            msg = res.msg
          }
        })
      }
    }, 1000)
  
    function check() {
      return new Promise((resolve, reject) => {
        loading = true
        let { recommendObj = {} } = that.data
        let { pageIdFirstPage = '' } = recommendObj
        request({
          ...funId.getVipStatus,
          isNeedDealError: true,
          body: {
            pageSource: 'Settlement'
          },
          pageId: pageIdFirstPage,
          preObj: recommendObj
        }).then(res => {
          loading = false
          resolve(res.data)
        }).catch(() => {
          loading = false
          reject()
        })
      })
    }
  },
  getSaveMoneyLayer(result) {
    let { recommendObj = {} } = this.data
    let { pageIdFirstPage = '' } = recommendObj
    request({
      ...FNIDS.getSaveMoneyPlan,
      isNeedDealError: true,
      body: {
        fromSource: 5,
        orderPageId: result.orderPageId,
        unique: result.unique
      },
      method: "POST",
      pageId: pageIdFirstPage,
      preObj: recommendObj
    })
    .then((res) => {
      if (res && res.data && res.data.code == 0) {
        let result = res.data.result
        this.setData({
          newSaveMoneyPlan: result.saveMoneyPlan || null,
          getPlanHml: !this.data.getPlanHml
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: "none",
          duration: 1500,
        });
      }
    })
    .catch((err) => {
      wx.showToast({
        title: '网络异常',
        icon: "none",
        duration: 1500,
      });
    });
  },
  onRemarkCancle(e) {
    let { type } = e.detail
    if (type == 'left' && this.data.vipMonthCard.have == true) {
      this.handleVipCheck({ detail: { checkVip: 1, vipId: this.data.vipMonthCard.vipId } });
    }
  },
  listenNewSaveMoney(e) {
    // mode 1.点击我要省 2.商家会员 3.v+会员/包月 4.联合会员 5.膨胀券 6.收起省钱攻略
    let { mode, openState, callSaveMoney, vipId, unionMemberId, money, needToast = true } = e.detail
    switch(mode) {
      case 1:
        let vObj = {}, vumObj = {}, mObj = {}, inflat = {}
        if (Object.keys(money).length) {
          Object.keys(money).forEach(item => {
            if (item == 'vm') {
              // v+
              vObj = this.outVipParam(money.vm.openState == 1 ? 1 : 0, money.vm.vipId)
            } else if (item == 'vum') {
              // 联合会员
              vumObj = this.outVipUniParam(money.vum.openState == 1 ? 1 : 0, money.vum.vipId, money.vum.unionMemberId)
            } else if (item == 'sm') {
              // 商家会员
              mObj = this.outMemberParam(money.sm.openState == 1 ? 1 : 2)
            } else if (item == 'inflat') {
              // 膨胀券
              inflat.inflationCoupleVoucherFlag = true
            }
          })
        }
        let setObj = Object.assign({}, vObj, vumObj, mObj, inflat)
        // userOperateType 操作类型
        setObj.userOperateType = openState == 2 ? 40 : 41
        this.setData(setObj, () => {
          this.getInitData(callSaveMoney, needToast).then(()=> {
            this.setData({ refreshSwell: !this.data.refreshSwell })
          })
        })
        break;
      case 2:
        this.initMemberData(openState, '', callSaveMoney)
        break;
      case 3:
        this.handleVipCheck(
          { 
            detail: { checkVip: openState == 2 ? 1 : 0, vipId } 
          },
          callSaveMoney,
          needToast
        )
        break;
      case 4:
        this.handleVipCheck(
          { 
            detail: { checkVip: openState == 2 ? 1 : 0, vipId, unionVipFlag: true, unionMemberId  } 
          },
          callSaveMoney,
          needToast
        )
        break;
      case 5:
        this.setData({
          inflationCoupleVoucherFlag: true
        }, () => {
          this.getInitData(callSaveMoney).then(()=> {
            this.setData({ refreshSwell: !this.data.refreshSwell })
          })
        })
        break
      case 6:
        // 只有收起省钱攻略弹层时才刷新省钱攻略接口
        this.getInitData(callSaveMoney)
        break;
      default:
        break;
    }
  },
  onRemarkCompleted() {
    let platForm = app.globalData.mpChannel == 'yy_xcx' ? 'weixin-yy' : 'weixin-dj'
    let { recommendObj = {} } = this.data
    let { pageIdFirstPage = '' } = recommendObj
    request({
      ...FNIDS.vipContract,
      body: {
        redPacketId: this.data.monthlyVipId,
        platForm,
        pageSource: "Settlement"
      },
      pageId: pageIdFirstPage,
      preObj: recommendObj
    }).then(res => {
      if (res.data.code == 0) {
        let wechatPayVO = JSON.parse(res.data.result)
        let that = this
        wx.navigateToMiniProgram({
          appId:'wxbd687630cd02ce1d',
          path:'pages/index/index',
          extraData: wechatPayVO,
          success() {
            that.data.roundStatus = true
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg || '',
          icon: 'none',
          duration: 2500
        })
      }
    })
  },
  closeLayer(e) {
    let { type = '' } = e.detail
    if (!type) return
    this.setData({ [type]: false })
  },
  // 新版vip套餐方法 --END
  refreshModuleKey(e) {
    let { key = '', value = '', refreshFlag = '', types } = e.detail
    switch(types) {
      case 'picker':
        this.changeModuleComponet(key, value, refreshFlag)
        break;
      case 'jump':
        this.setData({ refreshModuleKey: refreshFlag, moduleJumpH5: true })
        break;
      default:
        break;
    }
  },
  changeModuleComponet(key, value, refreshFlag) {
    this.data.componentParamList.map(item => {
      if (item.key == key) {
        item.value = value
      }
    })
    this.data.submitComParamList.map(item => {
      if (item.key == key) {
        item.value = value
      }
    })
    if (refreshFlag == true) this.getInitData()
  },
  reportMonitor(id, keys, infos) {
    wx.reportMonitor(id,20)
    let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
    let deviceid_pdj_jd = util.getUUIDMD5();
    addFilterMsg(keys)
    addFilterMsg(deviceid_pdj_jd)
    addFilterMsg(PDJ_H5_PIN)
    error(infos);
  },
  // 家政服务 -- START
  getHomemakingTime(e) {
    let { serviceDateTime, startDate, endDate, requestFlag = false } = e.detail
    this.setData({
      lastServiceDateTime: serviceDateTime,
      orgStartTime: startDate,
      orgEndTime: endDate
    }, () => {
      if (!requestFlag) return
      this.getInitData()
    })
  },
  closeToast() {
    this.setData({ originToast: '' })
  },
  // 家政服务 -- END

  // 餐具
  handleTableWare() {
    console.log('打开餐具');
    this.setData({
      isShowTableWare: true,
      tableWareClickType: 1
    })
  },
  handleTableWareBack(e) {
    const { tablewareOptionStatus, needTablewareNum, tablewareRememberStatus, tableWareClickType } = e.detail
    this.setData({
      'tableWareData.data.tablewareLayer.tablewareOptionStatus.': tablewareOptionStatus,
      'tableWareData.data.tablewareLayer.needTablewareNum': needTablewareNum,
      'tableWareData.data.tablewareLayer.tablewareRememberStatus': tablewareRememberStatus,
      tableWareClickType: tableWareClickType
    }, () => {
      console.log(this.data);
      if (this.data.tableWareClickType == 1) {
        this.getInitData()
      } else if (this.data.tableWareClickType == 2) {
        this.getInitData()
          .then(res => {
            if (res) {
              this.goPay()
            }
          })
      }
    })
    // tablewareOptionStatus: 是否需要餐具,1:需要,2:不需要
    // needTablewareNum: 需要餐具数量,0:商家按餐量提供,1~10:具体的餐具数量
    // tablewareRememberStatus: 餐具选择缓存状态,1:后续都需要餐具,2:后续都不需要餐具
  },
  handleTableWareOpenTip(e) {
    const { contentList } = e.detail

    let tipDialog = {
      show: true,
      types: 1,
      title: "",
      desc: "",
      readmeList: contentList
    }
    this.setData({
      tipDialog
    })
  },
  dealTableWare(item) {
    this.setData({
      tableWareData: item
    })
  },
  dealRequiredCategory(item) {
    if (item) {
      this.setData({
        requiredCategoryData: item,
        isShowMustOrder: true
      }) 
    }
  },
  handleMustOrderConfirm(e) {
    const { productList } = e.detail.data
    let preSaleSkuInfos = this.data.preSaleSkuInfos
    if (productList.length > 0) {
      productList.map((item) => {
        if (item.incartCount > 0) {
          let obj = {
            skuId: item.skuId,
            skuCount: item.incartCount
          }
          preSaleSkuInfos.push(obj)
        }
      })
      this.setData({
        preSaleSkuInfos: preSaleSkuInfos,
        isShowMustOrder: false
      }, () => {
        this.getInitData()
      })
    }
  },
  _UPDATEGOODSNUM(data) {
    this.setData({ upDateGoods: data })
  },
});