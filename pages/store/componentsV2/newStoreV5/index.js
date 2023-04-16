import { request, FNIDS } from "../../../../common/util/api";
import util from "../../../../common/util/util";
import { mpCmsJump, djCmsJump } from "../../../../common/util/agreementV2";
import {
  updatePageNums,
  _changeItemNum
} from "../../../../common/util/carService";
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { addFilterMsg, error } from "../../../../common/util/wxLog";
import djBus from "../../../../common/util/djBus";
import emitter from "../../../../common/util/events";
let timeOut = null;
const leftCateHeight = 100;
const defaultError = {
  loading: {
    showEmpty: true,
    // 默认页-类型
    type: 0,
    // 默认页-图标
    src: "",
    // 默认页-按钮
    btnText: "",
    // 默认页-按钮
    tips: ""
  },
  storeNetError: {
    // 默认页-展示
    showEmpty: true,
    // 默认页-类型
    type: 1,
    // 默认页-图标
    src:
      "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png",
    // 默认页-按钮
    btnText: "重新加载",
    // 默认页-按钮
    tips: "网络异常"
  },
  storeOffline: {
    // 默认页-展示
    // 默认页-类型
    type: 6,
    // 默认页-图标
    src: "https://storage.360buyimg.com/wximg/common/errorOfflineV1.png",
    // 默认页-按钮
    btnText: "去首页逛逛",
    // 默认页-按钮
    tips: "此门店已下线，去首页逛逛吧！"
  }
};
let app = getApp();
let flatCatList = [];
let flatCatIndexMap = {};
let defaultOpenCat = "";
// 是否是第一次进入
let isFirst = true;
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    // 入参-优惠券id
    couponId: {
      type: String,
      value: ""
    },
    // 入参-商家ID
    orgCode: {
      type: String,
      value: ""
    },
    // 入参-门店ID
    storeId: {
      type: String,
      value: "",
      observer (newVal) {
        if (newVal) {
          this.onLoad();
        }
      }
    },
    // 入参-商品ID
    skuId: {
      type: String,
      value: ""
    },
    // 入参-活动ID
    activityId: {
      type: String,
      value: ""
    },
    // 入参-促销
    promotionType: {
      type: String,
      value: ""
    },
    // 入参-经度
    longitude: {
      type: String,
      value: ""
    },
    // 入参-纬度
    latitude: {
      type: String,
      value: ""
    },
    // 进店是否展开购物车
    showCart: {
      type: Boolean,
      value: false
    },
    // 是否自动加车
    isAddCart: {
      type: Boolean,
      value: false,
      observer: function (val) {
        if (val) {
          // 第一次进入页面自动加车，切换分类不应继续自动加车
          this.setData({
            firstAddCar: true
          });
        }
      }
    },
    // 是否关注门店
    isFollow: {
      type: Boolean,
      value: false,
      observer (newVal) {
        if (newVal) {
          this.setData({
            // 点赞
            ["storeInfo.isFollow"]: newVal
          });
        }
      }
    },
    upDateGoodsNum: {
      type: Object,
      value: null
    },
    refreshStoreHeadCoupons: {
      type: Object,
      value: {},
      observer (data) {
        if (data && data.activityCode) {
          this.refreshHeaderCoupons(data);
        }
      }
    },
    // 8.2 活动入店承接新增入参
    source: {
      type: String,
      value: ""
    },
    // 8.2 活动入店承接新增入参
    cateName: {
      type: String,
      value: ""
    },
    // 8.3频道入店承接新增入参
    channelBusiness: {
      type: String,
      value: ""
    },
    // 8.3频道入店承接新增入参
    channelId: {
      type: String,
      value: ""
    },
    // 8.4 搜索承接入店新增入参
    keyword: {
      type: String,
      value: ""
    },
    keyWord: {
      type: String,
      value: ""
    },
    // 是否自动弹出优惠券半弹层
    autoShowCouponPop: {
      type: Number,
      value: 0
    },
    // 是否需要调优惠券领取弹层，东东农场或外部投放
    popup: {
      type: Number,
      value: 0
    },
    // 外部投放的促销渠道
    outPromotion: {
      type: String,
      value: ""
    },
    isNeedReFresh: {
      type: Boolean,
      value: false,
      observer (val) {
        val && this.onLoad();
      }
    },
    // 推广渠道（来来推 或者 助力）
    spreadChannel: {
      type: String,
      value: ""
    },
    strategyCode: {
      type: String,
      value: null
    },
    popupCoupon: {
      type: String,
      value: ""
    },
    asyncRefresh: {
      type: Boolean,
      value: false
    },
    // 搜推埋点需要的参数
    buriedObj: {
      type: Object,
      value: {},
      observer: function (obj) {
        this.setData({
          refPar: {
            userAction: obj.preUserAction,
            traceId: obj.preTraceId
          }
        });
      }
    },
    options: {
      type: Object,
      value: {},
      observer: function (v) {
        if(v.anchorCateId) {
          this.setData({
            curTab: 1
          })
          defaultOpenCat = v.anchorCateId;
          let {cateList = []} = this.data;
          if(cateList.length) {
            let obj = this.handleCateList(cateList);
            obj[`cateList[${this.data.preOpenIndex}].showAll`] = false
            this.setData(obj);
          }
        }
      }
    },
    pageIsGetInfoOnShow: {
      type: Boolean,
      value: false
    },
    needAnchorSku: {
      type: Boolean,
      value: false
    },
    // 8.28 新增-必选品提示内容传给购物车
    miniCartMustOrder: {
      type: Object,
      value: {}
    }
  },
  data: {
    productSwiperIndex: 0,
    currentProduct: {
      catIds: {}
    },
    loadeSuccess: false,
    isLogin: util.isLogin(), // 是否登录
    changeZ: false,
    defaultErrorKey: "loading",
    defaultError: defaultError["loading"],
    ipx: getApp().globalData.isIpx,

    navBackColor: "white", // 导航栏按钮颜色
    y: 0,
    statusBarHeight: 0,
    movableHeight: 0,
    movableViewHeight: 0,
    productBoxHeight: 0,
    productTouchTop: true,
    leftTouchTop: true,
    scrollLeft: 0, // 锚中三级分类
    leftScrollTop: 0, // 锚中一级分类

    showShare2WxDialog: false, // 展示分享组件
    showShare2MomentsDialog: false, // 展示分享朋友圈弹层
    momentsShareImgSrc: "", // 分享朋友圈图片
    square: "", // 分享信息

    toggle: false, // spu选择器
    // spu选择器参数
    spuData: {
      storeId: "",
      orgCode: "",
      spuId: "",
      skuId: ""
    },
    cartSkuId: "", // 加减购物车ID
    cartType: "", // 加减车类型
    catAnimation: false, // 是否有动画
    refreshMiniCartData: false, // 刷新mini购物车

    storeScrollTop: 0,
    couponSimpleInfo: [], // 门店头部优惠券标签和挽留弹层券信息
    storeInfo: {}, // 门店信息
    storeMemberInfo: {}, // 门店头商家会员信息
    tabData: null,
    storeGoodsIndex: "", // 返回的门店tab中全部商品的下标
    curTab: 0, // 当前tab的下标
    curTabType: "", // 当前tab的类型
    loadReducePage: false, // 是否请求减运tab下的数据
    loadVipPage: false, // 是否请求会员tab下的数据
    loadHomePage: false, // 是否请求首页tab下的内容
    loadChannelPage: false, // 是否请求频道tab下的内容

    hidePop: true, // 领券弹窗显示隐藏，不清楚是否还有用
    showVipExchange: false, // vip兑换弹层

    cateList: [], // 所有分类，渲染用
    thirdList: [], // 当前的三级分类，渲染用
    flatCatList: [], // 拍平的所有分类
    curIndex: 0, // 当前拍平的数组下标
    cateIndex: -1, // 锚中的一级分类
    secondIndex: -1, // 锚中的二级分类
    thirdIndex: -1, // 锚中的三级分类
    preOpenIndex: 0,
    virtualItem: null, // 虚拟分类信息
    showAllThirdCate: false, // 是否展示三级分类蒙层
    isFromClassify: false, // 是否滚动到锚点位置, 不清楚是否还有用
    times: 0, // 限频次数
    showCouponGuide: false, // 是否展示优惠券教育弹层
    showGuidFlag: false, // 是否展示购物车优惠券教育弹层
    addCarPushCoupon: null, // 红包弹层点击兑换接口后返回的新数据

    showScan: false, // 是否展示扫码商品弹层
    scanSkuList: [], // 扫码商品
    // 爆品投放 弹层
    hotPopData: {},
    showMemberPop: false,
    isShowBrandVipPop: false, // 加车掉券中点击的是品牌券，展示开通品牌会员弹层
    brandCoupon: null, // 品牌券点击入会后刷新品牌券
    brandMemberPLayerInfo: {}, // 品牌会员入会弹层信息,
    showLogin: false, // 展示登录引导弹窗
    lastPage: "", // 从哪一页返回的
    vipConfig: null, // 会员秒杀虚拟分类展示的文案
    isShowMemberPop: false, // 是否展示门店首页免费开通商家会员的确认弹层
    memberPopInfo: {}, // 门店首页的商家会员的领取弹层信息

    // 8.18优惠信息半弹层需要
    storeRedPackageInfo: {}, //  叠加红包
    storeCouponInfo: {}, // 店铺优惠券
    couponShowMore: {}, // 展示优惠券更多按钮
    storeCommentVO: {}, // 门店评分

    // 8.18商家服务信息半弹层需要
    showServiceHalf: false,

    couponShowTotal: 6, // 门店头最多展示的券个数
    showCouponMore: false, // 门店头是否展示查看更多
    traceId: "", // 当前页的traceID，埋点需要

    storeCouponPop: {}, // 8.20新增优惠券半弹层以及门店头小券都在里面
    storeCouponPopAb: "D", // 8.20优惠券实验结果

    limitRules: [], // 8.22.5膨胀券弹层展示规则需要限频，接入网关下发的限频规则,
    popupPosition: "",
    popupData: null, // 8.22.5天降弹层下发的弹层数据
    popType: "", // 8.22.0 超区弹层类型， 1超区、2闭店提醒弹层、3控单
    showCloseTip: false, // 是否展示闭店提醒
    isCart: true, // 是否展示购物车
    showFloatBall: true, // 8.27.0是否展开切换到店悬浮球
    showStoreEducation: false // 8.27.0是否展示教育弹层
  },
  observers: {
    upDateGoodsNum (obj) {
      if (obj) {
        let data = {
          showGuidFlag: false // 关闭购物车优惠券教育弹层
        };
        if (obj.type == "add" || obj.type == "min") {
          data.refreshMiniCartData = !this.data.refreshMiniCartData;
          if (obj.type == "add") {
            data.catAnimation = !this.data.catAnimation;
          }
        } else if (obj.type == "showModel") {
          djBus.emit("mask_spu", this.data.buriedObj);
          data.toggle = true;
          data.spuData = obj.data;
        }
        this.setData(data);
      }
    },
    // flatCatList中当前的下标
    curIndex: function (newVal) {
      let obj = {
        thirdList: []
      };
      let virtualItem = null;
      let current = flatCatList[newVal] || flatCatList[0] || {};
      let indexArr = (current.index && current.index.split("-")) || [];
      // 虚拟分类（活动页入店、搜索页入店）
      if (
        indexArr[0] &&
        this.data.cateList[indexArr[0]] &&
        this.data.cateList[indexArr[0]].cateActivityName
      ) {
        virtualItem = this.data.cateList[indexArr[0]];
      }

      let scrolltop = this.leftCateAnimation(current, indexArr);
      if (indexArr.length) {
        obj = {
          cateIndex: indexArr[0] || 0,
          [`cateList[${indexArr[0]}].showAll`]: true,
          preOpenIndex: indexArr[0] || 0
        };
        if (current.zIndex == 2) {
          let firstCateList = this.data.cateList[indexArr[0]]
          let secCateList = null
          if (firstCateList && firstCateList.childCategoryList) {
            secCateList = firstCateList.childCategoryList[indexArr[1] || 0];
          }
          if (secCateList && secCateList.childCategoryList) {
            obj.thirdList = secCateList.childCategoryList || []
          }
        } else {
          obj.thirdList = []
        }
      }
      this.setData({
        ...obj,
        currentProduct: current,
        leftScrollTop: scrolltop,
        secondIndex: indexArr[1] != undefined ? indexArr[1] : -1,
        thirdIndex: indexArr[2] != undefined ? indexArr[2] : -1,
        // thirdList:
        //   current.zIndex == 2 && indexArr.length > 0
        //     ? this.data.cateList[indexArr[0]].childCategoryList[
        //       indexArr[1] || 0
        //     ].childCategoryList
        //     : [],
        virtualItem,
        showAllThirdCate: false
      });
    },
    // 当前锚中的门店tab
    curTabType: function (val) {
      if (val == "storeHome") {
        this.setData({
          loadHomePage: true
        });
      } else if (val == "activity") {
        this.setData({
          loadReducePage: true
        });
      } else if (val == "storeChannel") {
        this.setData({
          loadChannelPage: true
        });
      } else if (val == "storeVip") {
        this.setData({
          loadVipPage: true
        });
      }
    },
    // 监听登录态改变，刷新优惠券弹层数据
    isLogin: function (val, oVal) {
      if (!val && util.isLogin() && !isFirst) {
        // if (this.data.showCouponMap) {
        //   this.setData({
        //     showCouponMap: false,
        //   });
        //   this.onLoad();
        // }
        let abName = this.data.storeCouponPopAb;
        // 8.20刷新券逻辑
        if (!abName || abName == "D" || abName == "E") {
          this.reSetCouponList();
        } else {
          this.asyncFetchCoupon();
        }
      }
      // 外部投放如果登录回来需要弹出弹窗;
      if (val != oVal && val && isFirst && this.data.popup == 1) {
        this.getCoupPop(1);
      }
    },
    // 自动弹出优惠券半弹层
    couponSimpleInfo: function (arr) {
      let { storeInfo, autoShowCouponPop, loadeSuccess } = this.data;
      // 门店是营业中、有优惠券、加载成功、并且需要自动弹起
      if (
        storeInfo.closeStatus == 0 &&
        arr.length &&
        loadeSuccess &&
        autoShowCouponPop == 1
      ) {
        djBus.emit("mask_couponLayer", this.data.buriedObj);
        this.setData({
          showCouponMap: true
        });
      }
    },
    asyncRefresh: function (nVal, oVal) {
      if (nVal !== oVal && nVal) {
        this.asyncFetchCoupon();
      }
    }
  },
  lifetimes: {
    attached () {
      let { statusBarHeight = 0 } = app.globalData.systemInfo || {};
      let navigateBarHeight = statusBarHeight + 46; // 导航高度
      let capsule = util.getCapsule();
      let obj = {};
      if (this.data.orgCode) {
        obj.refreshMiniCartData = !this.data.refreshMiniCartData;
      }
      this.setData({
        ...obj,
        bottomMovableView: navigateBarHeight,
        navHeight: capsule.top + capsule.height + 10
      });
    },
    detached () {
      isFirst = true;
    }
  },
  pageLifetimes: {
    show () {
      this.setData({
        isLogin: util.isLogin()
      });
      isFirst = false;
      // 第一次进入门店有虚拟分类，进入详情页，从详情页第二次跳转门店页，门店没有虚拟分类了，这时候返回，返回门店页，第一次的虚拟分类还在，但是实际数据已经没有虚拟分类了，会导致bug
      if (this.data.cateList.length > 0) {
        let preCate = wx.getStorageSync("cate0");
        let nowCate = this.data.cateList[0];
        if (preCate.title != nowCate.title) {
          this.fetchStoreData();
        }
      }
      let source = wx.getStorageSync("businessSource");
      // 如果开通完商家会员回来后要刷新门店页
      // storememberbar： 门店头底部；storemember： 首页商家会员；storecoupon： 门店优惠券弹层
      if (
        source == "storememberbar" ||
        source == "storemember" ||
        source == "storecoupon"
      ) {
        wx.removeStorageSync("businessSource");
        this.onLoad();
      }
      if (
        this.data.storeCouponPopAb &&
        this.data.storeCouponPopAb != "D" &&
        this.data.storeCouponPopAb != "E"
      ) {
        let backSource = wx.getStorageSync("backSource");
        if (backSource == "couponMore") {
          wx.removeStorageSync("backSource");
          this.asyncFetchCoupon();
        }
      }
    },
    hide () {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    }
  },
  methods: {
    onLoad () {
      flatCatList = [];
      flatCatIndexMap = {};
      let {options = {}} = this.data;
      defaultOpenCat = options.anchorCateId ? options.anchorCateId : "";
      // 为了商家会员开通后要重新刷整个门店，如果不重置false，会不刷新门店首页接口
      this.setData({
        loadHomePage: false
      });
      // 获取门店数据
      this.fetchStoreData();
    },
    // 展示优惠信息半弹层
    showCouponHalf () {
      let { storeCouponPopAb } = this.data || {};
      let name = "mask_couponLayer";
      if (storeCouponPopAb && storeCouponPopAb != "D" && storeCouponPopAb != "E") {
        name = "mask_newCouponLayer";
      }
      djBus.emit(name, this.data.buriedObj);
      this.setData({
        showCouponMap: true
      });
    },

    // 获取领取弹层
    getCoupPop (mode, fn) {
      let { functionId = "", appVersion = "" } = FNIDS.leaveMarketing || {};
      let {
        orgCode = "",
        storeId = "",
        strategyCode = null,
        popupCoupon = "1",
        storeInfo = {}
      } = this.data || {};
      request({
        functionId,
        appVersion,
        body: {
          storeId: storeInfo.storeId || storeId,
          orgCode: storeInfo.orgCode || orgCode,
          pageSource: "store",
          mode,
          dataType: 4, // 0,
          showStyle: 1,
          experimentName: "staystore",
          needMulti: 1,
          popup: 1,
          strategyCode,
          popupCoupon
        },
        isNeedDealError: true,
        isForbiddenDialog: true,
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {}
      })
        .then((res) => {
          if (res.data.code == 0) {
            let { result = {} } = res.data;
            if (!result.dataInfo || JSON.stringify(result.dataInfo) == "{}") {
              result.dataInfo = {};
            }
            // 优先展示商家会员弹层
            if (
              result.dataInfo.storeMember &&
              result.dataInfo.storeMember.popUpContent
            ) {
              let popUpContent = result.dataInfo.storeMember.popUpContent;
              let memberInfo = {
                topTitle: [{ text: popUpContent.title, color: "#FC881F" }],
                popUpBenefitInfoList:
                  popUpContent.popUpBenefitInfoDTOList || [],
                buttonName: popUpContent.buttonText,
                bottomDesc: "开通会员即代表同意",
                toName: "会员协议",
                to: "web",
                params: { url: popUpContent.toAgreementUrl }
              };
              this.setData({
                showMemberPop: true,
                hotPopData: memberInfo || []
              });
              this.addLog("showLayer", {
                storeId: this.data.storeId || "",
                type: "jdFarmMember"
              });
            } else {
              // 展示券+品
              if (
                result.dataInfo.couponList &&
                result.dataInfo.couponList.length > 0
              ) {
                result.dataInfo.mode = mode;
                result.dataInfo.userAction = result.userAction || "";
                result.dataInfo.couponList.forEach((item) => {
                  item.uperPrice = item.quota.split(".")[0];
                  item.lowerPrice = item.quota.split(".")[1];
                });
              }
              this.setData({
                hotPopData: result.dataInfo
              });
              this.addLog("click_open", {
                type: this.data.channelBusiness == "jdncapplsd" ? "jdFarm" : "",
                userAction: result.userAction || "",
                storeId: storeId || ""
              });
              fn && fn(result || "");
            }
          }
        })
        .catch(() => {
          fn && fn("");
        });
    },
    getStoreData (Fnids) {
      let { addressInfo = {} } = app.globalData || {};
      let { functionId, appVersion } = Fnids;
      let buriedObj = this.data.buriedObj || {};
      return request({
        functionId,
        appVersion,
        method: "POST",
        isNeedDealError: true,
        isForbiddenDialog: true,
        pageId: buriedObj.pageIdFirstPage || "",
        body: {
          couponId: this.data.couponId || "",
          storeId: this.data.storeId || "",
          skuId: this.data.skuId || "",
          orgCode: this.data.orgCode || "",
          activityId: this.data.activityId || "",
          promotionType: this.data.promotionType || "",
          longitude: this.data.longitude || addressInfo.longitude || "",
          latitude: this.data.latitude || addressInfo.latitude || "",
          source: this.data.source || "", // 8.2 活动入店承接
          cateName: this.data.cateName || "", // 8.2 活动入店承接
          channelBusiness: this.data.channelBusiness || "", // 8.3 频道入店承接
          channelId: this.data.channelId || "", // 8.3 频道入店承接,
          keyWord: this.data.keyword || this.data.keyWord || "", // 8.4搜索入店承接
          ref: buriedObj.prePageName || this.data.ref || "",
          pageSource: buriedObj.pageSource || "store",
          refPageSource: buriedObj.refPageSource || "",
          ref_par: {
            userAction: buriedObj.preUserAction || "",
            traceId: buriedObj.preTraceId || ""
          }
        },
        preObj: this.data.buriedObj || {}
      });
    },
    // 获取门店信息 这是主入口
    fetchStoreData () {
      this.getStoreData(FNIDS.storeHomepage)
        .then((res) => {
          try {
            let { code, result } = res.data || {};
            if (code != 0) {
              this.setData({
                defaultErrorKey: "storeNetError",
                defaultError: defaultError["storeNetError"]
              });
              try {
                let deviceid_pdj_jd = util.getUUIDMD5();
                let loginInfo = wx.getStorageSync("login_info");
                let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
                wx.reportMonitor(2, 20);
                let logParams = {
                  appVersion: FNIDS.storeHomepage.appVersion,
                  storeId: this.data.storeId,
                  orgCode: this.data.orgCode,
                  longitude: this.data.longitude,
                  latitude: this.data.latitude,
                  refPageSource:
                    this.data.buriedObj && this.data.buriedObj.refPageSource,
                  globalAddressInfo: app.globalData.addressInfo,
                  res: res,
                  pin: PDJ_H5_PIN
                };
                addFilterMsg("homePageError");
                addFilterMsg(
                  FNIDS.storeHomepage && FNIDS.storeHomepage.functionId
                );
                addFilterMsg(deviceid_pdj_jd);
                addFilterMsg(PDJ_H5_PIN);
                error(JSON.stringify(logParams));
              } catch (error) {
                console.log(error)
              }
              return;
            }
            let obj = {
              curTab: "", // 全部商品
              curTabType: "",
              tabData: [],
              storeGoodsIndex: "", // 全部商品tab的下标
              storeId: result.storeInfo && result.storeInfo.storeId || '',
              orgCode: result.storeInfo && result.storeInfo.orgCode || '',
              storeInfo: result.storeInfo || {},
              switchStore: result.switchStore || {} // 切换到店||到家的悬浮球

            };
            // 如果接口没下发或者下发异常，也要展示购物车
            if (
              result.isCart === null ||
              result.isCart === undefined ||
              result.isCart === ''
            ) {
              result.isCart = true
            }
            obj.isCart = result.isCart;
            obj.times = result.times || 0; // 搭配购买的限频次数
            obj.traceId = res.data.traceId || ""; // 埋点需要
            let rules = [];
            result.limitRules.forEach((item) => {
              if (!(item.popupType == 2 || item.popupType == 3)) {
                rules.push(item);
              }
            });
            obj.limitRules = rules || [];
            // 8.22.5 因膨胀券弹层，需要接入限频规则
            let tabName = ""; // 埋点上报需要
            let activityId = ""; // 埋点上报需要

            if (result.tabs && result.tabs.length > 0) {
              result.tabs.forEach((item) => {
                if (item.type == "storeGoods") {
                  obj.storeGoodsIndex = item.anchorTarget;
                }
                if (item.anchorTarget == undefined && item.type == "activity") {
                  item.anchorTarget = item.activityId;
                }
                if (item.title.includes("会员")) {
                  item.type = "storeVip";
                }
                obj.tabData.push(item);
                // 如果上一页传入了needAnchorSku需要锚中全部商品tab
                if (this.data.needAnchorSku && obj.storeGoodsIndex !== "") {
                  result.anchorTarget = obj.storeGoodsIndex;
                }
                if (result.anchorTarget == item.anchorTarget) {
                  let {options = {}} = this.data;
                  obj.curTab = options.anchorCateId ? 1 : result.anchorTarget;
                  obj.curTabType = item.type;
                  tabName = item.title;
                  activityId = item.activityId || "";
                } else {
                  // 如果没找到需要锚中的tab，兜底锚中全部商品
                  // obj.curTab = obj.storeGoodsIndex;
                }
              });
              if (obj.curTab === "") {
                // 如果没找到需要锚中的tab，兜底锚中全部商品
                obj.curTab = obj.storeGoodsIndex;
              }
            } else {
              obj.tabData = [
                {
                  anchorTarget: "0",
                  title: "全部商品",
                  type: "storeGoods"
                }
              ];
              obj.curTab = "0";
            }
            let { pageIdFirstPage, currentPageName, prePageName } =
              this.data.buriedObj || {};
            clickBuriedV2_({
              click_id: "selectTab",
              click_par: {
                storeId: this.data.storeId || "",
                tabName: tabName,
                activityId: activityId,
                state: 0,
                traceId: res.data.traceId || ""
              },
              pageId: pageIdFirstPage || "",
              currentPageName,
              prePageName
            });
            clickBuriedV2_({
              click_id: 'getActMixType',
              click_par: {
                actMixType: result.storeInfo.storeBusinessType
              },
              pageId: pageIdFirstPage || "",
              currentPageName,
              prePageName
            })

            // 刷新mini购物车，进来没有orgCode的时候，走接口的来刷新购物车。
            if (
              !this.data.orgCode &&
              (result.orgCode || result.storeInfo.orgCode)
            ) {
              obj = Object.assign({}, obj, {
                orgCode: result.orgCode || result.storeInfo.orgCode || "",
                refreshMiniCartData: !this.data.refreshMiniCartData
              });
            }

            // 门店状态正常TODO:
            let { closeStatus = -1 } = result.storeInfo || {};
            // 营业中和休息的门店都需要递归分类请求商品列表
            if (closeStatus === 0 || closeStatus === 1) {
              if (result.cateList && result.cateList.length > 0) {
                let obj1 = this.handleCateList(result.cateList || []);
                obj = Object.assign({}, obj, obj1);
              } else {
                // 没有返回分类
                let obj1 = this.handleCateList([
                  {
                    catId: "4",
                    childCategoryList: [],
                    ispromotcat: false,
                    openCatetory: false,
                    parentId: "",
                    productCount: 0,
                    promotLabel: "",
                    title: "全部商品",
                    type: "3"
                  }
                ]);
                obj = Object.assign({}, obj, obj1);
              }
              // 门店休息中，展示休息提示
              if (closeStatus === 1) {
                // 门店已下线
                obj = Object.assign({}, obj, {
                  defaultErrorKey: "storeOffline",
                  defaultError: defaultError["storeOffline"]
                });
              }
            } else {
              // 接口没有返回isOpen字段
              obj = Object.assign({}, obj, {
                defaultErrorKey: "storeNetError",
                defaultError: defaultError["storeNetError"]
              });
            }
            this.setData(obj, () => {
              wx.setStorageSync("cate0", obj.cateList[0]);

              // 获取门店弹层实验结果，展示新的半层还是老的
              let abTestResult = result.storeCouponPopAb;
              // 新弹层
              if (abTestResult && abTestResult != "D" && abTestResult != "E") {
                if (
                  this.data.showCouponMap &&
                  (!this.data.storeCouponPopAb || this.data.storeCouponPopAb ==
                    "D" ||
                    this.data.storeCouponPopAb == "E")
                ) {
                  const pageList = getCurrentPages();
                  const route =
                    (pageList &&
                      pageList.length &&
                      pageList[pageList.length - 1].route) ||
                    "";
                  const prePageId = this.data.buriedObj.pageIdFirstPage || "";
                  emitter.emit(
                    "halfMaskFunc_" + route + "_couponLayer_" + prePageId,
                    {
                      name: "couponLayer",
                      type: "close",
                      selector: "#store >>> #couponLayer", // 用于页面找打半弹层
                      buriedObj: this.data.couponLayerRecommengObj
                    }
                  );
                  djBus.emit("mask_newCouponLayer", this.data.buriedObj);
                }
                // 如果优惠券半弹层实验结果是新的
                this.setStoreInfoV20(result); // 显示门店信息
              } else {
                if (
                  this.data.showCouponMap &&
                  this.data.storeCouponPopAb &&
                  this.data.storeCouponPopAb != "D" &&
                  this.data.storeCouponPopAb != "E"
                ) {
                  const pageList = getCurrentPages();
                  const route =
                    (pageList &&
                      pageList.length &&
                      pageList[pageList.length - 1].route) ||
                    "";
                  const prePageId = this.data.buriedObj.pageIdFirstPage || "";
                  emitter.emit(
                    "halfMaskFunc_" + route + "_couponLayer_" + prePageId,
                    {
                      name: "newCouponLayer",
                      type: "close",
                      selector: "#store >>> #newCouponLayer", // 用于页面找打半弹层
                      buriedObj: this.data.newCouponLayerRecommengObj
                    }
                  );
                  djBus.emit("mask_couponLayer", this.data.buriedObj);
                }
                this.setStoreInfo(result); // 显示门店信息
              }
              this.alertUnusualStatus(result.storeInfo, result.switchStore); // 超区 休息中

              this.setData(
                {
                  defaultErrorKey: obj.defaultErrorKey || "",
                  loadeSuccess: true
                },
                () => {
                  let current = flatCatList[obj.curIndex] || {};
                  let indexArr =
                    (current.index && current.index.split("-")) || [];
                  let scrolltop = this.leftCateAnimation(current, indexArr);
                  this.setData({
                    leftScrollTop: scrolltop
                  });
                }
              );
              // 外部渠道入店是否弹层
              if (this.data.popup == 1) {
                this.showLoginPop();
              }
              // 调用再营销挽留弹层数据
              let timer = setTimeout(() => {
                clearTimeout(timer);
                this.fetchLeavePop();
              }, 1000);
            });
          } catch (e) {
            this.setData({
              defaultErrorKey: "storeNetError",
              defaultError: defaultError["storeNetError"]
            });
            let deviceid_pdj_jd = util.getUUIDMD5();
            let loginInfo = wx.getStorageSync("login_info");
            let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
            wx.reportMonitor(2, 20);
            let logParams = {
              appVersion: FNIDS.storeHomepage && FNIDS.storeHomepage.appVersion,
              storeId: this.data.storeId,
              orgCode: this.data.orgCode,
              longitude: this.data.longitude,
              latitude: this.data.latitude,
              refPageSource:
                this.data.buriedObj && this.data.buriedObj.refPageSource,
              globalAddressInfo: app.globalData.addressInfo,
              res: res,
              pin: PDJ_H5_PIN,
              err: e && e.toString()
            };
            addFilterMsg("homePageTryCatchError");
            addFilterMsg(FNIDS.storeHomepage && FNIDS.storeHomepage.functionId);
            addFilterMsg(deviceid_pdj_jd);
            addFilterMsg(PDJ_H5_PIN);
            error(JSON.stringify(logParams));

            // console.log(e)
          }
        })
        .catch((e) => {
          this.setData({
            defaultErrorKey: "storeNetError",
            defaultError: defaultError["storeNetError"]
          });
          let deviceid_pdj_jd = util.getUUIDMD5();
          let loginInfo = wx.getStorageSync("login_info");
          let PDJ_H5_PIN = loginInfo.PDJ_H5_PIN || "";
          wx.reportMonitor(2, 20);
          let logParams = {
            appVersion: FNIDS.storeHomepage.appVersion,
            storeId: this.data.storeId,
            orgCode: this.data.orgCode,
            longitude: this.data.longitude,
            latitude: this.data.latitude,
            refPageSource:
              this.data.buriedObj && this.data.buriedObj.refPageSource,
            globalAddressInfo: app.globalData.addressInfo,
            pin: app.globalData.loginStateInfo.PDJ_H5_PIN,
            err: e && e.toString()
          };
          addFilterMsg("homePageThenCatchError");
          addFilterMsg(FNIDS.storeHomepage && FNIDS.storeHomepage.functionId);
          addFilterMsg(deviceid_pdj_jd);
          addFilterMsg(PDJ_H5_PIN);
          error(JSON.stringify(logParams));
        });
    },
    // 请求再营销挽留弹层数据
    fetchLeavePop () {
      let leavePopDate = wx.getStorageSync("leavePopDate");
      let leavePopLimitDay = wx.getStorageSync("leavePopLimitDay");
      let diffDay =
        new Date(util.formatDate()).getTime() -
        new Date(leavePopDate).getTime();
      if (diffDay >= leavePopLimitDay || !leavePopDate) {
        let { storeInfo = {}, orgCode, storeId } = this.data;
        this.selectComponent("#leave") &&
          this.selectComponent("#leave").leaveMarketing({
            pageSource: "store",
            orgCode: storeInfo.orgCode || orgCode,
            storeId: storeInfo.storeId || storeId,
            dataType: 0
          });
      }
    },
    // 处理左侧分类
    handleCateList (cateList = []) {
      cateList.map((item, index) => {
        this.handleAllCate(item, 0, index);
      });
      return {
        cateList,
        flatCatList,
        curIndex: flatCatIndexMap[defaultOpenCat] || 0 // 找到需要锚中的分类index
      };
    },
    // 递归处理所有分类
    handleAllCate (item, zIndex = 0, index) {
      // 存储flatCatList数组中catId对应的下标
      // 例： 二级分类下有三级分类 直接选择二级分类时列表需要使用第一个三级分类catId
      //     故二级分类id需要存入【拍平数组flatCatList】中对应的三级分类的下标
      flatCatIndexMap[
        item.catId
          ? item.catId
          : item.params && item.params.keyWords
            ? item.params.keyWords
            : item.promotLabel
      ] = flatCatList.length;
      if (item.childCategoryList.length > 0) {
        item.childCategoryList.map((subItem, i) => {
          this.handleAllCate(subItem, zIndex + 1, `${index}-${i}`);
        });
      } else {
        // 必选品分类锚中优先级更高
        let {anchorCateId = ''} = this.data.options || {}
        if(item.openCatetory && !anchorCateId) {
            defaultOpenCat = item.catId
            ? item.catId
            : item.params && item.params.keyWords
              ? item.params.keyWords
              : item.promotLabel;
        }
        let params = item.params ? item.params : {};
        flatCatList.push({
          index: `${index}`,
          zIndex: zIndex,
          catId: item.catId
            ? item.catId
            : item.params && item.params.keyWords
              ? item.params.keyWords
              : item.promotLabel,
          userAction: item.user_action,
          catIds: {
            openCatetory: item.openCatetory,
            catId: item.catId ? item.catId : item.promotLabel,
            catName: item.title,
            type: item.catId ? item.level : 4,
            skuList: item.skuList || [],
            ...params
          }
        });
      }
    },
    // 点击一级分类
    clickClassify (e) {
      let {
        index = 0,
        item = null
      } = (e.currentTarget && e.currentTarget.dataset) || {};
      let data = { firstAddCar: false };
      let showAll = true;
      // 如果当前点击的是同一个
      if (this.data.preOpenIndex == index) {
        showAll = !item.showAll;
      } else {
        data[`cateList[${this.data.preOpenIndex}].showAll`] = false;
        let catId = item.catId
          ? item.catId
          : item.params && item.params.keyWords
            ? item.params.keyWords
            : item.promotLabel;
        data.curIndex = flatCatIndexMap[catId];
        data.isClickBlist = true // 一级分类点击埋点需要，用来区分是点击还是默认选中
      }
      data[`cateList[${index}].showAll`] = showAll;
      this.setData(data);
      this.triggerEvent('clearMustOrder')
    },
    // 点击二级/三级分类
    clickSubClassify (e) {
      let { item, level } = e.currentTarget.dataset;
      let catId = item.catId ? item.catId : item.promotLabel;
      // 开始，这段逻辑主要是用来区分是点击的分类还是默认没有点击，用来埋点上报时区分的
      let obj = {}
      if (level == 2) {
        obj.isClickSlist = true;
      } else if (level == 3) {
        obj.isClick3Cate = true;
      }

      this.setData({
        curIndex: flatCatIndexMap[catId],
        firstAddCar: false,
        ...obj
      });
    },
    // 滑动右侧商品
    swiperChange (e) {
      let { current, source } = e.detail;
      // 非用户滚动触发
      if (source == "") return;
      let curIndex = this.data.curIndex;

      // 判断swiper 向前向后
      switch (current - this.data.productSwiperIndex) {
      case 1:
      case -2:
        curIndex++;
        // if (curIndex != flatCatList.length -1) curIndex++
        break;
      case -1:
      case 2:
        curIndex--;
        break;
      default:
        break;
      }

      if (curIndex < 0 || curIndex >= flatCatList.length) {
        this.setData({
          productSwiperIndex: this.data.productSwiperIndex
        });
        return;
      }
      this.setData({
        [`cateList[${this.data.preOpenIndex}].showAll`]: false,
        productSwiperIndex: current,
        curIndex: curIndex,
        firstAddCar: false,
        vipConfig: {}
      });
    },
    // 接收门店首页点击需要锚中的分类信息
    anchorCate (e) {
      let { firstCateId, secondCateId } = e.detail.data || {};
      let obj = {
        curTab: this.data.storeGoodsIndex,
        firstAddCar: false
      };

      let catId = secondCateId != undefined ? secondCateId : firstCateId;
      if (catId != undefined) {
        obj.curIndex = flatCatIndexMap[catId];
        obj[`cateList[${this.data.preOpenIndex}].showAll`] = false;
      }
      this.setData(obj);
    },
    // 监听点击门店tab
    onTabClick (e) {
      let { index, type, tabName, activityId } = e.currentTarget.dataset || {};
      if (this.data.curTab === index) {
        return false;
      } else {
        this.setData({
          curTab: index,
          curTabType: type
        });
      }

      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: "selectTab",
        click_par: {
          storeId: this.data.storeId || "",
          tabName: tabName,
          activityId: activityId,
          traceId: this.data.traceId || ""
        },
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName
      });
    },
    // 门店信息处理
    setStoreInfo (result) {
      // 门店头部优惠券标 （最多展示6个）
      let couponSimpleInfo = [];
      let showCouponMore = false;
      let {
        storeRedPackageInfo = {},
        storeCouponInfo = {},
        storeInfo = {},
        storeMemberInfo,
        couponShowTotal = 6
      } = result || {};

      // 红包券
      let couponModelList = storeRedPackageInfo.couponModelList || [];
      // 普通券
      let storeCouponModelList = storeCouponInfo.couponModelList || [];

      // 红包券取第一个展示
      if (couponModelList.length) {
        couponSimpleInfo.push(couponModelList[0]);
      }
      // 门店优惠券最多展示6个，如果有的话。
      if (storeCouponModelList.length) {
        let needPushNum = couponShowTotal - couponSimpleInfo.length;
        couponSimpleInfo = couponSimpleInfo.concat(
          storeCouponModelList.slice(0, needPushNum)
        );
      }
      if (
        couponModelList.length + storeCouponModelList.length >
        couponShowTotal
      ) {
        showCouponMore = true;
      }
      // 渲染门店信息 和banner
      this.setData(
        {
          couponSimpleInfo: couponSimpleInfo,
          // storeInfo: result.storeInfo || {},
          storeRedPackageInfo: result.storeRedPackageInfo || {},
          storeCouponInfo: result.storeCouponInfo || {},
          couponShowMore: result.couponShowMore || {},
          storeCommentVO: result.storeCommentVO || {},
          storeMemberInfo: result.storeMemberInfo, // 商家会员信息
          couponShowTotal: couponShowTotal,
          showCouponMore, // 门店头优惠券展示查看更多
          showCloseTip: storeInfo.closeTip1 || storeInfo.closeTip2, // 是否展示闭店提醒
          storeCouponPopAb: result.storeCouponPopAb
        },
        () => {
          this.getStoreHead(storeInfo, couponSimpleInfo, storeMemberInfo);
        }
      );
      // 2022.4.8 上海保供
      this.triggerEvent("onUpdateShareInfo", {
        type: "shopShare",
        data: {
          title: storeInfo.storeName || "京东到家",
          imageUrl: ["372344", "372398", "372225"].includes(storeInfo.orgCode)
            ? "https://storage.360buyimg.com/wxmini/open_app/shanghai.jpg"
            : ""
        }
      });
    },
    // 门店休息或超区或下线或控单
    alertUnusualStatus (storeInfo, switchStore) {
      // 门店营业状态，1营业中；3下线
      if (storeInfo.stationStatus == 3) {
        this.setData({
          defaultErrorKey: "storeOffline",
          defaultError: defaultError["storeOffline"]
        });
      }
      // 门店是否超出派送范围内
      else if (storeInfo.isOverZone) {
        timeOut = setTimeout(() => {
          djBus.emit("mask_outrange", this.data.buriedObj);
          this.setData({
            popType: 1
          });
          clearTimeout(timeOut);
        }, 500);
      }
      // 营业状态 1：休息中
      else if (storeInfo.closeStatus == 1) {
        timeOut = setTimeout(() => {
          djBus.emit("mask_outrange", this.data.buriedObj);
          this.setData({
            popType: 2
          });
          clearTimeout(timeOut);
        }, 500);
      }
      // 是否控单
      else if (storeInfo.storePromiseState == 3) {
        timeOut = setTimeout(() => {
          djBus.emit("mask_outrange", this.data.buriedObj);
          this.setData({
            popType: 3
          });
          clearTimeout(timeOut);
        }, 500);
      } else {
        // 弹层优先级 超区&休息中&控单 > 京东农场进店 > 来来推入店 >膨胀券>门店天降	>	门店挽留 >	门店券教育弹层 >自动领券教育弹层 >闭店提醒
        this.setData({
          popType: "0"
        });
        // 来来推或者助力渠道入店 || 外部投放或者爆品投放渠道入店
        if (
          this.data.spreadChannel ||
          this.data.channelBusiness == "outside" ||
          this.data.channelBusiness == "jdncapplsd"
        ) {
          this.handleShowStoreEducation(switchStore)
          return;
        }
        let limitRules = this.data.limitRules || [];
        if (limitRules.length == 0) return;
        let popupsStorage = wx.getStorageSync("_popupsStorage");
        // 缓存无弹出记录
        if (!popupsStorage) {
          // 获取除了popupType：1以外的所有的popupType
          let popupArr = util.findPopUpTypes(limitRules);
          if (popupArr.length > 0) {
            // 调用天降弹层接口（里面会下发膨胀弹层）
            // 如果开启无障碍，不展示该弹层
            if (getApp().globalData.isOpenAccessibility) return;
            this.fetchPopUpData(popupArr);
          } else {
            // 展示悬浮球教育弹层
            this.handleShowStoreEducation(switchStore)
          }
        } else {
          let { orgCode, storeId } = this.data.storeInfo || this.data || {};
          let popupArr = []; // 通过规则后的popupType
          let isPassed = true; // 限频规则是否通过
          let ischanged = false; // 限频缓存数据是否有删除操作（因时间过期后需要重置次数和时间）
          for (let index = 0; index < limitRules.length; index++) {
            const currentRule = limitRules[index];
            let weiDu = currentRule.latType; // 限频维度
            let interval = currentRule.interval; // 限频时长
            let limitCount = currentRule.limitValue; // 限频次数
            let popupType = currentRule.popupType; // 弹层类型

            let obj = popupsStorage[weiDu]; // 根据限频规则找到缓存里对应维度的信息
            let info = {}; // 拿到对应限频具体信息（已弹次数，里面各个弹层的弹出次数等）
            if (weiDu == 3) {
              info = obj[`${storeId}`];
            } else if (weiDu == 2) {
              info = obj[`${orgCode}`];
            } else if (weiDu == 1) {
              info = obj.pingtai;
            }
            // 如果找到缓存信息
            if (info) {
              let subObj = info[popupType == 1 ? "total" : `pop_${popupType}`];
              // 缓存是否有 当前popupType下记录
              if (!subObj) {
                // *** 没有缓存 校验则通过
                if (popupType != 1) popupArr.push(popupType);
              } else {
                // 先判断是否还在限频时间内
                // let timeDiff = util.computeTime(Date.now(), subObj.time);
                let timeDiff = Date.now() - subObj.time;
                // 将毫秒换算成小时后我是向下取整的，所以导致刚过24小时几分钟不到
                if (timeDiff <= interval * 60 * 60 * 1000) {
                  // 再判断是否在总次数以为
                  if (subObj.count < limitCount) {
                    // *** 校验通过 继续校验分规则
                    if (popupType != 1) popupArr.push(popupType);
                  } else {
                    // 总规则校验未通过 不继续校验分规则
                    if (popupType == 1) {
                      isPassed = false;
                      break;
                    }
                  }
                } else {
                  // *** 删除当前维度缓存 校验通过 继续校验分规则
                  ischanged = true;
                  delete info[popupType == 1 ? "total" : `pop_${popupType}`];
                  // ***
                  if (popupType != 1) popupArr.push(popupType);
                }
              }
            } else {
              // *** 没有记录，说明总校验通过 继续校验分规则
              if (popupType != 1) popupArr.push(popupType);
            }
          }
          // 如果有删除缓存的操作，需要重新更新缓存信息
          ischanged && wx.setStorageSync("_popupsStorage", popupsStorage);
          // 校验通过，并且有能弹的弹层，则调用接口获取弹层数据
          if (isPassed && popupArr.length > 0) {
            this.fetchPopUpData(popupArr);
          }
          // 限频了展示悬浮球教育弹层
          else {
            this.handleShowStoreEducation(switchStore)
          }
        }
      }
    },
    // 调用天降弹层接口获取膨胀弹层数据
    fetchPopUpData (popupArr) {
      let { storeId, orgCode } = this.data.storeInfo || this.data || {};
      request({
        ...FNIDS.storePopUp,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: FNIDS.storePopUp.method,
        body: {
          popupTypes: popupArr || [],
          logoUrl: this.data.storeInfo.logoUrl || "",
          storeId: storeId || "",
          orgCode: orgCode || ""
        },
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {}
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result && result.data) {
            this.setData({
              popupData: result.data || {},
              popupPosition: "storeFirstLoad"
            });
            // 将弹出记录缓存
            this.savePopupStorage(result.popupType);
          } else {
            // 展示悬浮球教育弹层
            this.handleShowStoreEducation(this.data.switchStore)
            return;
          }
        })
        .catch(() => {});
    },
    // 计算高度 兜底
    getStoreHead1 (storeInfo, couponSimpleInfo, storeMemberInfo) {
      wx.nextTick(() => {
        let minStoreCardHeight = 148;
        let marginTop = 24;
        let marginBot = 26;
        let height = minStoreCardHeight + marginTop + marginBot; // 门店头卡片最小高度 + margin-top + margin-bottom

        // 促销标签
        if (storeInfo.tags && storeInfo.tags.length > 0) {
          height = height + 52; // 36 + 16
        }
        // 优惠券
        if (couponSimpleInfo.length) {
          height = height + 76; // 44 + 32
        }
        // 商家信息
        if (storeMemberInfo) {
          height = height + 72; // 40 + 32
        }
        let {
          statusBarHeight = 0,
          windowHeight = 0,
          windowWidth = 0
        } = app.globalData.systemInfo || {};
        let navigateBarHeight = statusBarHeight + 46; // 导航高度
        let movableViewHeight = windowHeight - navigateBarHeight; // 滑动高度
        let productBoxHeight = movableViewHeight - 46; //
        let scale = windowWidth / 750;

        // 整体向上移动要刨除导航栏的实际高度
        let y = height * scale - navigateBarHeight;
        this.setData({
          navigateBarHeight,
          movableViewHeight,
          productBoxHeight,
          y
        });
      });
    },
    // 计算高度 new
    getStoreHead (storeInfo, couponSimpleInfo, storeMemberInfo) {
      let query = this.createSelectorQuery();
      query
        .select("#store-head-wrap")
        .boundingClientRect((rect) => {
          // 如果能获取节点高度，用节点高度做为吸顶高度
          if (rect && rect.height) {
            let { statusBarHeight = 0, windowHeight = 0 } =
              app.globalData.systemInfo || {};
            let navigateBarHeight = statusBarHeight + 46; // 导航高度
            let movableViewHeight = windowHeight - navigateBarHeight + 10; // 滑动高度
            let productBoxHeight = movableViewHeight - 46;

            // 整体向上移动要刨除导航栏的实际高度
            let y = rect.height - navigateBarHeight + 1;
            this.setData({
              navigateBarHeight,
              movableViewHeight,
              productBoxHeight,
              y
            });
          } else {
            // 兜底手动计算吸顶高度
            this.getStoreHead1(storeInfo, couponSimpleInfo, storeMemberInfo);
          }
        })
        .exec();
    },

    // 展示隐藏spu选择器
    toggleSpuSelector () {
      djBus.emit("mask_spu", this.data.buriedObj);
      this.setData({
        toggle: true
      });
    },
    // 监听组件事件
    widgetEvent (e) {
      let type = e.detail.type;
      let data = e.detail.data;
      if (type == "shareHelpCoupon") {
        //  8.20之前的助力券同步逻辑
        // 分享助力券
        this.setData({
          showShare2WxDialog: true,
          square: data.square || {}
        });
        this.triggerEvent("onUpdateShareInfo", {
          type: type,
          data: data
        });
        data.couponModel && this.refreshHeaderCoupons(data.couponModel);
      } else if (type === "updateCurrentCouponStatus") {
        // 券列表领取后同步券状态
        this.refreshHeaderCoupons(data);
      } else if (type === "isFollow") {
        // 是否关注门店
        this.setData({
          ["storeInfo.isFollow"]: data.isFollow
        });
      } else if (type === "showVipExchange") {
        // 展示会员兑换弹层
        const { showVipExchange, vipCouponInfo } = data;
        this.setData({
          showVipExchange: showVipExchange,
          vipCouponInfo: vipCouponInfo
        });
      } else if (type === "vipExchange") {
        // 会员兑换弹层点击后同步优惠券
        // vip券
        const { sliderRedPackageList } = this.data;
        sliderRedPackageList.forEach((item, index) => {
          if (item.couponId == data.couponId && data.couponButton) {
            const key = `sliderRedPackageList[${index}].couponButton`;
            const coupListKey = `storeRedPackageInfo.couponModelList[${index}].couponButton`;
            const couponButton = data.couponButton;
            this.setData({
              [key]: couponButton,
              [coupListKey]: couponButton,
              addCarPushCoupon: data
            });
          }
        });
      } else if (type == "showBrandVipPop") {
        // 品牌会员
        this.setData({
          isShowBrandVipPop: data.isShowBrandVipPop,
          brandMemberPLayerInfo: data.brandMemberPLayerInfo
        });
      } else if (type == "updateBrandCoupon") {
        // 更新品牌会员优惠券
        this.setData({
          isShowBrandVipPop: data.isShowBrandVipPop,
          brandCoupon: data.brandCoupon
        });
      } else if (type == "promotionGoodsList") {
        this.data.lastPage = "promotionGoodsList";
      } else if (type == "vipVirtual") {
        // 在商品列表上方展示商家会员秒杀虚拟分类提示
        this.setData({
          vipConfig: data.vipConfig || null
        });
      } else if (type == "isShowMemberPop") {
        // 是否展示商家会员确认提示弹层
        this.setData({
          isShowMemberPop: data.isShow,
          memberPopInfo: data.popInfo
        });
      } else if (type == "refreshStore") {
        // 刷新整个门店
        this.setData({
          isShowMemberPop: false
        });
        this.onLoad();
      } else if (type == "overZone") {
        // 展示超区半弹层
        app.saveAddress(data);
        app.globalData.addressInfo = data;
        app.globalData.refreshHomeFlag = true;
        this.onLoad();
      } else if (type == "orgServiceHalf") {
        // 展开商家服务半弹层
        let { storeInfo, storeCommentVO } = this.data;
        if (storeInfo && storeCommentVO) {
          djBus.emit("mask_shopService", this.data.buriedObj);
          this.setData({
            showServiceHalf: true
          });
        }
      } else if (type == "couponHalf") {
        // 展开优惠券半弹层
        this.showCouponHalf();
      } else if (type == "closeCouonHalf") {
        // 如果是关闭优惠券半弹层
        this.setData({
          showCouponMap: false
        });
      } else if (type == "asyncFreshStoreCoupon") {
        // 关闭优惠券弹层|| v+兑换后  需要异步刷新券接口
        this.asyncFetchCoupon();
      } else if (type == "shareHelpCoupon820") {
        // 展示分享助力券的弹层
        // 分享助力券
        this.setData({
          showShare2WxDialog: true,
          square: data.square || {}
        });
        this.triggerEvent("onUpdateShareInfo", {
          type: type,
          data: data
        });
      } else if (type == "vipHeadCoupon") {
        this.data.couponSimpleInfo.forEach((item, index) => {
          if (item.activityCode == data.activityCode) {
            // data = Object.assign(item, data);
            let key = `couponSimpleInfo[${index}].couponButton`;
            this.setData({
              [key]: data.couponButton
            });
          }
        });
      } // 购物车是否有小黄条
      else if (type == "miniCarHasTips") {
        this.setData({
          ["storeInfo.miniCarHasTips"]: data.hasCouponsTips || "0"
        });
      }
      // 展示膨胀券弹层
      else if (type == "showExpandPop") {
        this.setData({
          popupPosition: "couponHalfV6",
          popup4Params: data
        });
      }
      // 膨胀券立即膨胀后刷新页面
      else if (type == "expandNeedFreshStore") {
        this.onLoad();
      }
      // 关闭商家服务半弹层
      else if (type == 'closeOrgServiceHalf') {
        this.setData({
          showServiceHalf: false
        });
      }
      // 展开还是缩小悬浮球
      else if (type == 'showFloatBall') {
        this.setData({
          showFloatBall: data
        })
      }
      else if (type == 'closeEducationPop') {
        this.setData({
          showStoreEducation: false
        })
      }
    },
    // 当上推时，更新导航栏的背景色以及优惠券标替换关注门店标
    // 当门店没有优惠券时，上推后还是展示专注门店标
    refreshShowCoupon (e) {
      // 优惠券和促销只要有一个，都要展示优惠券标
      let couponList = this.data.couponSimpleInfo;
      let tags = [];
      // 新门店弹层
      if (
        this.data.storeCouponPopAb &&
        this.data.storeCouponPopAb != "D" &&
        this.data.storeCouponPopAb != "E"
      ) {
        let storeCouponPop = this.data.storeCouponPop || {};
        tags =
          (storeCouponPop.promotionFloor &&
            storeCouponPop.promotionFloor.promotionList) ||
          [];
      } else {
        tags = (this.data.storeInfo && this.data.storeInfo.tags) || [];
      }
      this.setData({
        showCoupon: e.showCoupon && (couponList.length || tags.length),
        navBackColor: e.navBackColor
      });
      // 通过wxs手势来判断是否是首屏
      if (app.globalData.isFirstPageFlag) {
        app.globalData.isFirstPageFlag = false;
      }
    },
    // 更新门店头部券状态
    refreshHeaderCoupons (data) {
      let headerCoupons = this.data.couponSimpleInfo || [];
      const { storeCouponInfo: { couponModelList = [] } = {} } = this.data;
      couponModelList.forEach((item, index) => {
        if (item.activityCode == data.activityCode) {
          let key = `storeCouponInfo.couponModelList[${index}]`;
          data &&
            this.setData({
              [key]: data
            });
        }
      });
      headerCoupons.forEach((item, index) => {
        if (item.activityCode == data.activityCode) {
          let key = `couponSimpleInfo[${index}]`;
          data &&
            this.setData({
              [key]: data
            });
        }
      });
    },
    // 展示三级分类蒙层
    showThirdCateMask (e) {
      let { type } = e.currentTarget.dataset;
      this.setData({
        showAllThirdCate: type
      });
    },
    // 设置挽留弹窗标识
    showDetention (bool) {
      this.setData({
        showDetention: bool
      });
      if (bool) {
        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "showLayer",
          click_par: {
            type: "storeRetain"
          },
          pageId: pageIdFirstPage || "",
          currentPageName,
          prePageName
        });
      }
    },
    // 监听挽留弹层点击事件
    detentionEvent (e) {
      let { type = "" } = e.detail;
      if (type == "hideDetentionPop" || type == "leave") {
        this.showDetention(false);
      } else if (type == "gouse") {
        this.showDetention(false);
        this.showCouponHalf();
      }
    },

    // 用户分享到朋友圈
    share2Moments () {
      let { imageUrl = "" } = this.data.square || {};
      this.setData({
        showShare2WxDialog: false,
        showShare2MomentsDialog: true,
        momentsShareImgSrc: imageUrl
      });
    },
    onProductTouchTop (e) {
      let { data } = e.detail;
      this.setData({
        productTouchTop: data
      });
    },
    leftCateScroll (e) {
      let { scrollTop } = e.detail;
      if (scrollTop <= 10) {
        if (!this.data.leftTouchTop) {
          this.setData({
            leftTouchTop: true
          });
        }
      } else {
        if (this.data.leftTouchTop) {
          this.setData({
            leftTouchTop: false
          });
        }
      }
      this.computeFloatBall(scrollTop)
    },
    leftCateTouchTop () {
      if (!this.data.leftTouchTop) {
        this.setData({
          leftTouchTop: true
        });
      }
    },

    // 头部搜索
    navEvent (e) {
      let { type = "", data = {} } = e.detail;
      if (type == "showCouponMap") {
        this.showCouponHalf();
      } else if (type == "back" || type == "home") {
        if (this.data.popup == 1) {
          this.getCoupPop(0, (res) => {
            if (!res) {
              let result =
                this.selectComponent("#leave") &&
                this.selectComponent("#leave").handleShowPop();
              if (result) return; // 如果有再挽留营销弹层，先弹这个，后再弹原来的挽留弹层
              if (data.isPop) {
                // 8.20 新的优惠券弹层不展示门店挽留弹层
                if (
                  !this.data.storeCouponPopAb ||
                  this.data.storeCouponPopAb != "D" ||
                  this.data.storeCouponPopAb != "E"
                ) {
                  wx.navigateBack({});
                } else {
                  this.showDetention(true);
                }
              } else {
                wx.navigateBack({});
              }
            }
          });
        } else {
          let result =
            this.selectComponent("#leave") &&
            this.selectComponent("#leave").handleShowPop();
          if (result) return; // 如果有再挽留营销弹层，先弹这个，后再弹原来的挽留弹层
          if (data.isPop) {
            // 8.20 新的优惠券弹层不展示门店挽留弹层
            if (
              !this.data.storeCouponPopAb ||
              this.data.storeCouponPopAb != "D" ||
              this.data.storeCouponPopAb != "E"
            ) {
              wx.navigateBack({});
            } else {
              this.showDetention(true);
            }
          } else {
            wx.navigateBack({});
          }
        }
      } else if (type == "clickScan") {
        this.addLog("clickScan", { storeId: this.data.storeId });
        this.clickScan();
      } else if (type == "followStore") {
        this.setData({
          // 点赞
          ["storeInfo.isFollow"]: data
        });
      }
    },
    // 监听默认页事件
    onDefaultBtnEvent () {
      // let type = e.detail.type;
      let { defaultErrorKey } = this.data;
      this.setData({
        defaultErrorKey: ""
      });
      if (defaultErrorKey == "storeNetError") {
        this.fetchStoreData();
      }
      if (defaultErrorKey == "storeOffline") {
        wx.switchTab({
          url: "/pages/home/home"
        });
      }
    },
    leftCateAnimation (current, indexArr) {
      let leftScrollTop = this.data.leftScrollTop;
      leftScrollTop =
        indexArr.length > 0
          ? leftCateHeight * indexArr[0] - 100
          : leftScrollTop;
      if (current.zIndex == 1 && indexArr[1] != undefined && indexArr[1] >= 3) {
        leftScrollTop = leftScrollTop + 88 * indexArr[1];
      }
      return leftScrollTop;
    },
    // 登录态改变后刷新优惠券半弹层数据
    reSetCouponList () {
      this.getStoreData(FNIDS.storeHomepage)
        .then((res) => {
          try {
            let result = res.data.result || {};
            // const { storeCouponInfo = {}, storeRedPackageInfo = {} } = result;
            this.setData({
              storeCouponInfo: result.storeCouponInfo || {},
              storeRedPackageInfo: result.storeRedPackageInfo || {},
              couponShowMore: result.couponShowMore || {}
            });
          } catch (e) {
            // console.log(e)
          }
        })
        .catch(() => {
          // console.log(e)
        });
    },
    // 优惠券教育弹层组件关闭来通知本页面
    closeCouponGuide () {
      this.setData({
        showCouponGuide: false
      });
    },
    // 点击扫一扫商品加车
    clickScan () {
      if (!util.isLogin()) {
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.buriedObj,
          buried_position: {
            key: `store-newStoreV5-1`,
            options: this.data.options
          }
        });
      }
      wx.scanCode({
        success: (res) => {
          let qrCodeMsg = res.result;
          this.fetchScanSku(qrCodeMsg);
        },
        fail: (err) => {
          if (err.errMsg && err.errMsg == "scanCode:fail cancel") {
            this.setData({
              showScan: false,
              scanSkuList: []
            });
          } else {
            this.setData({
              showScan: true,
              scanSkuList: []
            });
            this.addLog("scanUpcCodeResult", {
              storeId: this.data.storeId,
              upcCode: "",
              skuIdList: [],
              skuCnt: "",
              detail: (err && err.errMsg) || "扫码失败"
            });
          }
        }
      });
    },
    // 通过upc获取加车商品
    fetchScanSku (upc) {
      let storeInfo = this.data.storeInfo || {}
      request({
        ...FNIDS.scanSku,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          storeId: storeInfo.storeId || this.data.storeId || "",
          orgCode: storeInfo.orgCode || this.data.orgCode || "",
          upc: upc || "",
          ref: this.data.ref || "",
          pageSource: "store"
        },
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {}
      })
        .then((res) => {
          let { code, result = [] } = res.data || {};
          let skuIdList = "";
          if (code == 0) {
            if (result.length == 1) {
              this.add(result[0]);
            }
            this.setData({
              showScan: true,
              scanSkuList: result || []
            });
          } else {
            this.setData({
              showScan: true,
              scanSkuList: []
            });
          }
          result.forEach((item) => {
            skuIdList += `${item.skuId},`;
          });
          this.addLog("scanUpcCodeResult", {
            storeId: this.data.storeId,
            upcCode: upc,
            skuIdList: skuIdList || "",
            skuCnt: result && result.length,
            detail: res.data.msg || ""
          });
        })
        .catch(() => {
          this.setData({
            showScan: true,
            scanSkuList: []
          });
          this.addLog("scanUpcCodeResult", {
            storeId: this.data.storeId,
            upcCode: upc,
            skuIdList: [],
            skuCnt: "",
            detail: "扫码失败"
          });
        });
    },
    // 扫码自动加车
    add (item) {
      let storeInfo = this.data.storeInfo || {}
      let cartNum = item.incartCount + 1;
      let params = {
        storeId: storeInfo.storeId || this.data.storeId,
        orgCode: storeInfo.orgCode || this.data.orgCode,
        isReturnCart: true,
        skus: [
          {
            id: item.skuId,
            num: cartNum,
            spuId: item.showModel == 1 ? item.spuId : ""
          }
        ]
      };
      _changeItemNum(params)
        .then(() => {
          let storeInfo = this.data.storeInfo || {}
          updatePageNums({
            type: "add",
            data: {
              skuId: item.skuId || "",
              spuId: item.spuId,
              cartNum: cartNum || 0,
              orgCode: storeInfo.orgCode || this.data.orgCode || "",
              storeId: storeInfo.storeId || this.data.storeId || ""
            }
          });
        })
        .catch(() => {});
    },
    toScan (e) {
      let type = (e && e.detail && e.detail.type) || "";
      this.setData({
        showScan: false
      });
      if (type == "continue") {
        this.addLog("clickContinueScan", { storeId: this.data.storeId });
        this.clickScan();
      }
    },
    addLog (name, opts) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.buriedObj || {};
      clickBuriedV2_({
        click_id: name,
        click_par: opts,
        pageId: pageIdFirstPage || "",
        currentPageName,
        prePageName
      });
    },
    memberToastopen () {
      this.addLog("clickLayer", {
        storeId: this.data.storeId || "",
        type: "jdFarmMember",
        btnName: "freeOpen"
      });
      this.openMember();
    },
    // 开通商家会员
    openMember () {
      request({
        ...FNIDS.storeOpenMember,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: "POST",
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          source: "jdstoreoneclick"
        },
        pageId:
          (this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) || "",
        preObj: this.data.buriedObj || {}
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            wx.showToast({
              title: "开通会员成功！"
            });
          } else {
            wx.showToast({
              title: "开通会员排队中，请稍后再试。"
            });
          }
        })
        .catch(() => {
          wx.showToast({
            title: "开通会员排队中，请稍后再试。"
          });
        });
    },
    freshMinicart (e) {
      this.add(e.detail);
      this.setData({
        showCart: true
      });
    },
    showLoginPop () {
      if (util.isLogin()) {
        this.getCoupPop(1);
      } else {
        this.setData({
          showLogin: true
        });

        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          click_id: "showLoginLayer",
          click_par: {
            type: "outsideLogin",
            traceId: this.data.traceId || ""
          },
          pageId: pageIdFirstPage || "",
          currentPageName,
          prePageName
        });
      }
    },
    jumpVip (e) {
      let { to, params } = e.currentTarget.dataset || {};
      djCmsJump({
        to,
        params,
        traceId: this.data.traceId || "",
        preObj: this.data.buriedObj,
        buried_position: {
          key: `store-newStoreV5-2`,
          options: this.data.options
        }
      });
      this.addLog("clickOpMem", {
        type: "vipSeckill"
      });
    },
    // 8.20版本门店信息处理
    setStoreInfoV20 (result) {
      // 门店头部优惠券标 （最多展示6个）
      let couponSimpleInfo = [];
      let {
        storeInfo = {},
        storeMemberInfo,
        storeCouponPop = {},
        storeCouponPopAb = "D"
      } = result || {};
      // 渲染门店信息
      this.setData(
        {
          storeCouponPopAb,
          couponSimpleInfo: storeCouponPop.smallCouponList || [],
          // storeInfo: result.storeInfo || {},
          storeCommentVO: result.storeCommentVO || {},
          storeMemberInfo: result.storeMemberInfo, // 商家会员信息
          showCouponMore: storeCouponPop.couponShowTotal || false, // 门店头优惠券展示查看更多
          storeCouponPop: result.storeCouponPop || {}, // 新优惠券弹层数据
          showCloseTip: storeInfo.closeTip1 || storeInfo.closeTip2 // 是否展示闭店提醒
        },
        () => {
          this.getStoreHead(storeInfo, couponSimpleInfo, storeMemberInfo);
        }
      );
      // 2022.4.8 上海保供
      this.triggerEvent("onUpdateShareInfo", {
        type: "shopShare",
        data: {
          title: storeInfo.storeName || "京东到家",
          imageUrl: ["372344", "372398", "372225"].includes(storeInfo.orgCode)
            ? "https://storage.360buyimg.com/wxmini/open_app/shanghai.jpg"
            : ""
        }
      });
    },
    // 8.20异步刷新券接口(新优惠券弹层)
    asyncFetchCoupon () {
      this.getStoreData(FNIDS.asyncFreshStoreCoupon)
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == 0 && result) {
            let storeCouponPop = result;
            this.setData({
              couponSimpleInfo: storeCouponPop.smallCouponList || [],
              storeCouponPop
            });
          }
        })
        .catch(() => {
          // console.log(err)
        });
    },
    // 将门店弹层弹出记录缓存或更新
    savePopupStorage (type = 4) {
      let { storeId = "", orgCode = "" } = this.data.storeInfo || this.data || {};
      let popupsStorage = wx.getStorageSync("_popupsStorage");
      if (popupsStorage) {
        // ===平台维度次数进行更新
        let pingtai = popupsStorage["1"].pingtai;
        // 总
        let oldTotal = pingtai.total || { count: 0, time: Date.now() };
        pingtai.total = {
          count: oldTotal.count + 1,
          time: oldTotal.time
        };
        // 分
        let oldSingle = pingtai[`pop_${type}`] || {
          count: 0,
          time: Date.now()
        };
        pingtai[`pop_${type}`] = {
          count: oldSingle.count + 1,
          time: oldSingle.time
        };

        // ===商家维度次数进行更新
        let shangjia = popupsStorage["2"];
        if (shangjia[`${orgCode}`]) {
          // 总
          let oldTotal = shangjia[`${orgCode}`].total || {
            count: 0,
            time: Date.now()
          };
          shangjia[`${orgCode}`].total = {
            count: oldTotal.count + 1,
            time: oldTotal.time
          };
          // 分
          let oldSingle = shangjia[`${orgCode}`][`pop_${type}`] || {
            count: 0,
            time: Date.now()
          };
          shangjia[`${orgCode}`][`pop_${type}`] = {
            count: oldSingle.count + 1,
            time: oldSingle.time
          };
        } else {
          shangjia[`${orgCode}`] = {
            total: {
              count: 1,
              time: Date.now()
            },
            [`pop_${type}`]: {
              count: 1,
              time: Date.now()
            }
          };
        }

        // ===门店维度次数进行更新
        let memdian = popupsStorage["3"];
        if (memdian[`${storeId}`]) {
          // 总
          let oldTotal = memdian[`${storeId}`].total || {
            count: 0,
            time: Date.now()
          };
          memdian[`${storeId}`].total = {
            count: oldTotal.count + 1,
            time: oldTotal.time
          };
          // 分
          let oldSingle = memdian[`${storeId}`][`pop_${type}`] || {
            count: 0,
            time: Date.now()
          };
          memdian[`${storeId}`][`pop_${type}`] = {
            count: oldSingle.count + 1,
            time: oldSingle.time
          };
        } else {
          memdian[`${storeId}`] = {
            total: {
              count: 1,
              time: Date.now()
            },
            [`pop_${type}`]: {
              count: 1,
              time: Date.now()
            }
          };
        }
        wx.setStorageSync("_popupsStorage", popupsStorage);
      }
      // 没有缓存 创建新的（例如第一次进小程序或者删除小程序）
      else {
        // key代表维度，现有三种维度，1：平台维度，2：商家维度，3：门店维度
        let obj = {
          1: this.popStructure("pingtai", type),
          2: this.popStructure(orgCode, type),
          3: this.popStructure(storeId, type)
        };
        wx.setStorageSync("_popupsStorage", obj);
      }
    },
    // 弹层限频记录的数据结构
    // weiDuStr： 如果是平台维度，则是字符串pingtai,如果是商家则是对应的orgCode, 如果是门店则是对应的storeId
    popStructure (weiDuStr, popupType) {
      return {
        [weiDuStr]: {
          total: {
            count: 1,
            time: Date.now()
          },
          [`pop_${popupType}`]: {
            count: 1,
            time: Date.now()
          }
        }
      };
    },
    getPopRecommendObj (e) {
      if (e.detail.popName == "couponLayer") {
        this.data.couponLayerRecommengObj = e.detail.data;
      } else if (e.detail.popName == "newCouponLayer") {
        this.data.newCouponLayerRecommengObj = e.detail.data;
      }
    },
    onSpuSelectorEvent (e) {
      let {type} = e.detail || {}
      if (type == 'closeSpu') {
        this.setData({
          toggle: false
        })
      }
    },
    computeFloatBall (scrollTop) {
      this.data.scrollTop = scrollTop
      // 处理悬浮球
      if (this.data.showFloatBall) {
        this.setData({
          showFloatBall: false
        })
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (scrollTop == this.data.scrollTop) {
          this.setData({
            showFloatBall: true
          });
        } else {
          this.setData({
            showFloatBall: false
          });
        }
        clearTimeout(this.timer);
      }, 800);
    },
    handleShowStoreEducation (switchStore) {
      // 缓存里是否有弹出记录
      let storeEducation = wx.getStorageSync('storeEducation')
      if (switchStore && switchStore.btnName && !storeEducation) {
        this.setData({
          showStoreEducation: true
        })
      }
    },
    miniCartMustOrderFn () {
      this.triggerEvent('getMiniCartMustOrder')
    }
  }
});
