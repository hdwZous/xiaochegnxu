/* eslint-disable camelcase */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-useless-escape */
import { request, FNIDS, onCaptureScreen, offCaptureScreen } from "../../common/util/api"
import util from '../../common/util/util'
import { djCmsJump, mpCmsJump } from "../../common/util/agreementV2";
import mp from "../../common/util/wxapi";
import { updatePageNums, _changeItemNum } from '../../common/util/carService'
import { isLogin } from "../../common/util/loginUtil.js";
import { reportPromote } from "../../common/util/services.js";
import { pvBuriedV2_, clickBuriedV2_ } from "../../common/util/BI.js";
import djBus from "../../common/util/djBus";
import publicMethod from "../../common/util/public";

let flag = 1;
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 默认页是否展示
    showEmpty: false,
    // 默认页类型
    type: 0,
    // 默认页提示语
    tips: "",
    // 默认页按钮文案
    btnText: "",
    // 入参
    options: {},
    // banner图
    images: [],
    // 胶囊位置
    capsule: {},
    // 商品名称
    title: "京东到家",
    // 商品副标题
    adword: "",
    // title标签
    skuNameTag: {},
    // 当前价格
    majorPrice: {},
    // 会员价
    minorPrice: {},
    // 原价
    assistPrice: {},
    // 头部透明过渡
    opacity: 0,
    // 会员卡片
    memberConfigInfo: {},
    memberFloorInfoVO: {},
    // 秒杀
    miaoshaInfo: {},
    // 购物车数量
    inCartCount: 0,
    // 商品id
    skuId: "",
    // 商家id
    orgCode: "",
    // 门店id
    storeId: "",
    // spuId
    spuId: "",
    // 门店信息
    storeInfo: {},
    // 商品评价
    productComment: {},
    // 经度
    latitude: "",
    // 维度
    longitude: "",
    // 是否加车
    isAddCart: false,
    // 0以sku模式展示，1以spu模式展示
    showModel: 0,
    // 加车按钮文案
    showStateName: "",
    // 加车按钮状态
    showState: 1,
    // 优惠券列表
    couponVOList: [],
    // 优惠券标题
    couponTitle: "",
    // 展示优惠券弹层
    showCouponMap: false,
    // 促销标签
    tags: [],
    // 促销标签跳转协议
    transferProtocol: {},
    // 参数
    spuDetailResult: {},
    // 说明
    skuCateAttr: {},
    // 信息半弹层
    isShowInfoPop: false,
    // 处方药购买须知
    prescriptionInstructions: "",
    // 功能说明
    skuCategoryAttr: {},
    // 处方药购买须知展示隐藏
    first: {
      height: 0,
      showMore: false
    },
    // 功能说明展示隐藏
    second: {
      height: 0,
      showMore: false
    },
    // 商品详情
    detailInfo: {},
    // 商品详情类型
    productInfoType: "",
    markingPrice: "",
    // 品牌
    brandHomeInfo: {},
    catAnimation: true,
    cartType: "",
    refreshMiniCartData: false,
    showCart: false,
    // spu选择器
    toggle: false,
    // 降价提醒选择器
    noticeToggle: false,
    refreshDetailData: false,
    refreshRecommendData: false,
    // 优惠券弹层信息
    couponMap: [],
    // 同步推荐商品信息
    skuDataSync: {},
    // 是否展示返回顶部
    // isShowToTop: false,
    // 优惠套装
    suitLandFloor: {},
    // 更新优惠套装购物车数量
    updateCart: {},
    // 称重品重量
    cartWeight: "",
    // 称重服务说明
    weightService: {},
    // 图片水印
    imageWaterMark: "",
    // 是否展示降价提醒
    showPriceRemind: false,
    // 是否开启降价提醒
    priceRemind: false,
    // 分享信息
    shareInfo: null,
    // 新优惠券样式
    couponInfo: false,
    toHandPriceImg: "", // 预估到手价
    toHandPriceDetail: {}, // 预估到手价弹层
    isShowHanldePop: false, // 是否展示预估到手明细弹层
    singleSettle: false, // 是否单品单结
    iconType: 0, // 是否直接加车 1 弹出spu弹层
    modelButtonType: 0, // spu弹层按钮状态 (是展示加购还是购买)
    // 医药授权
    isShowAuthoryDialog: false,
    authoryDialogContent: "",
    // 8.9
    infoPopObj: {},
    preSaleCount: 1, // 预售的数量
    preHandPrice: "0",
    spuActivityId: "",
    brandLayerInfo: null,
    self: 0, // 是否是爆品自提 8.13.5
    realSelf: 0, // 是否是爆品自提 8.13.5
    limitCount: 0, // 爆品限购数量 8.13.5
    showMiniCart: false, // 爆品8.13.5新增
    stockCount: 1000, // 爆品8.13.5库存
    pageMoving: false, // 是否滑动
    hideBackTop: true,
    userAction: "",
    clickUserAction: "",
    isShowOpenVip: false, // 展示开通会员弹层
    popInfo: {}, // 商家会员弹窗
    afterSale: [], // 售后服务信息
    showAfterSale: false, // 是否展示售后服务弹窗
    dialogInfo: {}, // 售后服务弹窗信息
    isShowVipMemberPop: false, // 是否展示v+会员兑换弹层
    recipeVO: null, // 食谱楼层
    transmitData: {}, // 8.26 活鲜透传参数
    isIpx: getApp().globalData.isIpx,

    // 预售订阅相关
    showSubscribe: false,
    subscribeImg: "",
    tmIds: [
      "oglvNUuESMzFISc5tCdVV8xjk92ZpbOY057_tOG-W4Q"
    ],
    preSaleInfo: {},
    showSubscribeSuccessPop: false
  },

  // 本地缓存数据
  scopeData: {
    preSaleOriginPrice: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (options.userAction) {
      this.setData({
        userAction: decodeURIComponent(options.userAction)
      });
    }
    if (options.userActionSku) {
      this.setData({
        userAction: decodeURIComponent(options.userActionSku)
      });
    }
    if (options.dj_par_key) {
      let qrCode = app.globalData.qrcode;
      let shareInfo = {
        title: qrCode.shareTitle,
        imageUrl: qrCode.shareImgUrl,
        path: `/pages/home/home?scene=${options.dj_par_key}`
      };
      this.setData({
        shareInfo
      });
    }
    if (options.pushUserId && isLogin()) {
      reportPromote({
        pushUserId: options.pushUserId || "",
        business: options.business || ""
      });
    }
    flag = 1;
    // 处理null字符串
    if (options.spuId === "null") {
      options.spuId = "";
    }
    // 设置参数
    this.setData(
      {
        options,
        settleShowType: options.settleShowType
      },
      () => {
        // 获取页面数据
        this.getDetailData();
      }
    );
    // 获取胶囊位置
    this.getCapsule();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 获取页面数据
    flag > 1 && this.getDetailData(this.data.options);
    flag += 1;
    // 开通v+会员回来要刷新商详页，刷新完将标识删除
    let vp_pay_success = wx.getStorageSync("vp_pay_success");
    if (vp_pay_success) {
      wx.removeStorageSync("vp_pay_success");
    }
    // 更新优惠券列表
    this.data.showCouponMap && this.getCouponList();
    let { skuId = "", storeId = "" } = this.data.options || {};
    // 开启监听截图
    onCaptureScreen(
      {
        storeId,
        skuId
      },
      this.data.recommendObj
    );
    // 如果开通完商家会员回来后要刷新单品页面
    let source = wx.getStorageSync("businessSource");
    if (source == "newproductDetail") {
      wx.removeStorageSync("businessSource");
      // this.onLoad();
      this.getDetailData();
    }
  },

  pvFunc(back) {
    let { storeId = "", skuId = "", keyword = "", activityId } = this.data.options || {};
    let recommendObj = this.data.recommendObj || {};
    pvBuriedV2_({
      create_time: new Date(),
      page_par: {
        storeId: storeId || "",
        skuId: skuId || "",
        keyword: keyword || "",
        activityId: activityId,
        ref_par: {
          traceId: recommendObj.preTraceId || "",
          userAction: recommendObj.preUserAction || ""
        }
      },
      currentPageName: recommendObj.currentPageName || "",
      prePageName: recommendObj.prePageName || "",
      pageId: recommendObj.pageIdFirstPage || "",
      isBack: back || ""
    });
    this.setData({
      refPar: {
        userAction: recommendObj.preUserAction,
        traceId: recommendObj.preTraceId
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {
    // 取消监听截图
    offCaptureScreen();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let {
      buyNum = 0,
      spuId = "",
      skuId = "",
      storeId = "",
      orgCode = "",
      latitude = "",
      longitude = "",
      userAction = ""
    } = this.data.options || {};
    let { shareInfo = null } = this.data;
    if (shareInfo) {
      return shareInfo;
    } else if (this.data.realSelf) {
      // 爆品自提分享
      let images = this.data.images || [0];
      let price = (this.data.majorPrice && this.data.majorPrice.price) || 0;
      return {
        title: "自提专享：" + price + "元" + this.data.title || "京东到家",
        path: `/pages/product/index?spuId=${spuId}&skuId=${skuId}&storeId=${storeId}&orgCode=${orgCode}&buyNum=${buyNum}&latitude=${latitude}&longitude=${longitude}&self=${this.data.realSelf}&userAction=${userAction}`,
        imageUrl: images[0] && images[0].big
      };
    }
    let images = this.data.images || [0];
    return {
      title: this.data.title || "京东到家",
      path: `/pages/product/index?spuId=${spuId}&skuId=${skuId}&storeId=${storeId}&orgCode=${orgCode}&buyNum=${buyNum}&latitude=${latitude}&longitude=${longitude}&userAction=${userAction}`,
      imageUrl: images[0] && images[0].big
    };
  },

  /**
   * 页面滚动触发事件的处理函数
   */
  onPageScroll (e) {
    let { scrollTop } = e || {};
    if (scrollTop > 400) {
      this.data.opacity < 1 &&
        this.setData({
          opacity: 1
        });
    } else {
      this.setData({
        opacity: scrollTop / 400
      });
    }

    if (e.scrollTop > 300) {
      if (this.data.hideBackTop) {
        this.setData({
          hideBackTop: false
        });
      }
      if (e.scrollTop > 500) {
        this.showBackTop();
      }
    } else {
      this.hiddenBackTop();
      if (!this.data.hideBackTop) {
        this.setData({
          hideBackTop: true
        });
      }
    }
  },
  showBackTop () {
    // 页面不滑动、pageMoving为false
    if (!this.data.pageMoving) {
      this.setData({
        pageMoving: true
      });
    }
    this.hiddenBackTop();
  },
  hiddenBackTop () {
    this.movTime && clearTimeout(this.movTime);
    this.movTime = setTimeout(() => {
      this.setData({
        pageMoving: false
      });
    }, 250);
  },

  // 获取详情页数据
  getDetailData () {
    mp.loading_cover();
    let {
      pageIdFirstPage,
      pageSource,
      refPageSource,
      preUserAction,
      preTraceId
    } = this.data.recommendObj || {};
    let { functionId = "", appVersion = "" } = FNIDS.goodsDetail || {};
    let {
      buyNum = 0,
      spuId = "",
      skuId = "",
      storeId = "",
      orgCode = "",
      latitude = "",
      longitude = "",
      self = 0,
      settleShowType = 0
    } = this.data.options || {};
    if (!latitude || !longitude) {
      try {
        let addressInfo = wx.getStorageSync("address_info") || {};
        latitude = addressInfo.latitude || "";
        longitude = addressInfo.longitude || "";
      } catch (error) {
        // console.log(error)
      }
    }
    request({
      functionId: functionId,
      appVersion: appVersion,
      isNeedDealError: true,
      method: "POST",
      pageId: pageIdFirstPage || "",
      body: {
        spuId: spuId,
        skuId: skuId,
        storeId: storeId,
        orgCode: orgCode,
        latitude: latitude,
        longitude: longitude,
        type: 2,
        buyNum: buyNum,
        channel: "",
        self: self, // 是否是爆品自提
        settleShowType, // 是否是新人单品单结
        pageSource: pageSource || "productDetail",
        refPageSource: refPageSource || "",
        ref_par: {
          userAction: preUserAction || "",
          traceId: preTraceId || ""
        }
      },
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        mp.hideLoading();
        if (res.data.code == "0") {
          let {
            image = [],
            name = "京东到家",
            adword = "",
            majorPrice = {},
            minorPrice = {},
            assistPrice = {},
            memberConfigInfo = {},
            memberFloorInfoVO = {},
            miaoshaInfo = {},
            inCartCount = 0,
            storeInfo = {},
            skuId = "",
            spuId = "",
            orgCode = "",
            showState = 1,
            showStateName = "",
            couponTitle = "",
            couponVOList = [],
            tags = [],
            spuDetailResult = {},
            skuCateAttr = {},
            prescriptionInstructions = "",
            skuCategoryAttr = {},
            productComment = {},
            detailInfo = {},
            productInfoType = "",
            markingPrice = "",
            brandHomeInfo = null,
            suitLandFloor = {},
            transferProtocol = {},
            skuNameTag = {},
            cartWeight = "",
            weightService = {},
            imageWaterMark = "",
            showPriceRemind = false,
            priceRemind = false,
            couponInfo = {},
            toHandPrice = null,
            singleSettle = false,
            singleSettleButton = {},
            iconType = 0,
            rankVO = null,
            cateAttrVO = null,
            // 合约机
            treatyType = 0,
            // 1是正常商品 9是预售品, 11 新人单品单结
            productType = 1,
            preSaleInfo = {},
            brandCouponInfo = null,
            limitCount = 1000,
            stockCount = 1000,
            self = 0,
            userActionSku = "",
            buttonEnable = false,
            afterSale = [], // 售后服务说明
            recipeVO = null, // 食谱
            transmitData = {},
            showModel = 0
          } = res.data.result || {};
          // 匹配过滤
          if (detailInfo.h5HtmlText) {
            let str = detailInfo.h5HtmlText.replace(
              /\<script.*\<\/script>/gi,
              ""
            );
            detailInfo.h5HtmlText = str.replace(/\#\{globalJs\}/gi, "");
          }
          if (spuDetailResult && spuDetailResult.spuId) {
            (inCartCount = spuDetailResult.spuInCartCount),
            (image = spuDetailResult.images || []);
          }
          // 渲染页面
          this.setData(
            {
              showEmpty: false,
              images: image,
              title: name,
              adword,
              majorPrice,
              minorPrice,
              assistPrice,
              memberConfigInfo,
              memberFloorInfoVO,
              miaoshaInfo,
              inCartCount,
              storeInfo,
              skuId,
              spuId,
              orgCode,
              longitude,
              latitude,
              showState,
              showStateName,
              couponVOList,
              couponTitle,
              tags,
              spuDetailResult,
              skuCateAttr,
              prescriptionInstructions,
              skuCategoryAttr,
              productComment,
              detailInfo,
              productInfoType,
              markingPrice,
              brandHomeInfo,
              refreshMiniCartData: !this.data.refreshMiniCartData,
              suitLandFloor,
              transferProtocol,
              skuNameTag,
              cartWeight,
              weightService,
              imageWaterMark,
              showPriceRemind,
              priceRemind,
              couponInfo,
              toHandPriceImg: (toHandPrice && toHandPrice.toHandPriceImg) || "",
              toHandPriceDetail:
                (toHandPrice && toHandPrice.toHandPriceDetaill) || null,
              iconType,
              singleSettle,
              singleSettleButton,
              rankVO,
              cateAttrVO,
              treatyType,
              productType,
              preSaleInfo,
              preHandPrice:
                preSaleInfo.handPrice * (this.data.preSaleCount || 1) || 0,
              brandCouponInfo,
              realSelf: self,
              limitCount,
              stockCount,
              showMiniCart: true,
              clickUserAction: userActionSku || "",
              buttonEnable,
              afterSale,
              traceId: (res.data && res.data.traceId) || "",
              recipeVO,
              transmitData,
              showModel
            },
            () => {
              if (this.data.options.self == 1 && this.data.realSelf == 0) {
                wx.showModal({
                  content: "自提优惠活动已结束",
                  showCancel: false,
                  confirmText: "知道了",
                  success: () => {
                    this.setData({
                      [`options.self`]: 0
                    });
                    this.getDetailData();
                  }
                });
                return;
              }
              if (!this.data.stockCount && this.data.realSelf) {
                wx.showToast({
                  title: "商品已售空",
                  icon: "none"
                });
              }
              this.getTextHeight();
              // 获取品牌会员入会弹窗文案信息
              if (
                this.data.brandCouponInfo &&
                this.data.brandCouponInfo.brandId &&
                !this.data.brandCouponInfo.memberFlag
              ) {
                this.getBrandLayerInfo(this.data.brandCouponInfo.brandId);
              }
            }
          );
          this.scopeData.preSaleOriginPrice = preSaleInfo.handPrice || 0;
        } else {
          clickBuriedV2_({
            click_id: "pushUserCodeError",
            click_par: {
              res: res,
              storeId: storeId,
              orgCode: orgCode,
              latitude: latitude,
              longitude: longitude,
              pageSource: pageSource || "productDetail",
              refPageSource: refPageSource || "没有",
              addressInfo: wx.getStorageSync("address_info"),
              pin:
                app.globalData &&
                app.globalData.loginStateInfo &&
                app.globalData.loginStateInfo.PDJ_H5_PIN
            }
          });
          this.setData({
            showEmpty: true,
            type: 4,
            tips: res.data.msg || "网络繁忙，请稍后再试",
            btnText: "刷新页面"
          });
        }
      })
      .catch((e) => {
        // console.log(err)
        this.setData({
          showEmpty: true,
          type: 1,
          tips: "网络繁忙，请稍后再试",
          btnText: "刷新页面"
        });
        clickBuriedV2_({
          click_id: "pushUserCatchError",
          click_par: {
            e: e,
            storeId: storeId,
            orgCode: orgCode,
            latitude: latitude,
            longitude: longitude,
            pageSource: pageSource || "productDetail",
            refPageSource: refPageSource || "没有",
            addressInfo: wx.getStorageSync("address_info"),
            pin:
              app.globalData &&
              app.globalData.loginStateInfo &&
              app.globalData.loginStateInfo.PDJ_H5_PIN
          }
        });
      });
  },
  // 获取优惠券弹层列表信息
  getCouponList () {
    request({
      ...FNIDS.getGoodsCouponList,
      body: {
        skuId: this.data.skuId,
        stationNo: this.data.storeInfo && this.data.storeInfo.storeId,
        pageSource: "productDetail",
        ctp: "goodsinfo"
      },
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        if (res.data.code == "0") {
          let result = res.data.result || {};
          if (result && result.length > 0) {
            this.setData({
              showCouponMap: true,
              couponMap: result
            });
          }
        }
      })
      .catch(() => {});
  },
  // 获取胶囊位置
  getCapsule () {
    let { capsule = "" } = getApp().globalData || "";
    try {
      if (!capsule) {
        capsule = wx.getStorageSync("capsule") || {
          bottom: 56,
          height: 32,
          left: 278,
          right: 365,
          top: 24,
          width: 87
        };
      }
    } catch (error) {
      // console.log(error)
    }
    this.setData({
      capsule
    });
  },
  // 监听默认页事件
  onDefaultBtnEvent (e) {
    let { type = "" } = e.detail || {};
    if (type == 4 || type == 1) {
      // 刷新页面
      this.getDetailData(this.data.options);
      this.setData({
        refreshMiniCartData: !this.data.refreshMiniCartData
      });
    }
  },
  // 监听套装优惠加车
  // onWrapSku(e) {
  //     let { data = {}, type = '' } = e.detail || {};
  //     // 刷新购物车
  //     this.refreshMiniCart(type);
  // },
  _UPDATEGOODSNUM (obj) {
    // console.log(obj, 'update---');

    let { data = {}, type = "" } = obj || {};
    // 刷新当前商品数量
    this.refreshCurrentProductNum(type, data);
    // 刷新推荐商品数量
    this.refreshRecommendSku(type, data);
    // 刷新购物车
    this.refreshMiniCart(type);
    // 刷新套装商品数量
    this.refreshWrapSku(type, data);
    // 展示spu选择器
    this.showSpuSelector(type, data);
  },
  // 监听优惠券弹层列表
  widgetEvent () {
    this.getDetailData(this.data.options);
  },
  // 同步套装购物车数量
  refreshWrapSku (type, data) {
    if (type === "min" || type === "add" || type === "clear") {
      this.setData({
        updateCart: {
          type,
          data
        }
      });
    }
  },
  // 同步商品数量至推荐商品列表
  refreshRecommendSku (type, data) {
    if (type === "min" || type === "add" || type === "clear") {
      this.setData({
        skuDataSync: {
          type,
          data
        }
      });
    }
  },
  // 同步当前页商品数量
  refreshCurrentProductNum (type, data) {
    if (type === "min" || type === "add") {
      //  && data.spuId == this.data.options.spuId;
      if (data.spuId && data.spuNum > -1) {
        this.setData({
          inCartCount: data.spuNum
        });
      } else if (data.skuId == this.data.options.skuId) {
        if (data.weighting) {
          this.setData({
            inCartCount: data.cartNum,
            cartWeight: data.cartWeight
          });
        } else {
          this.setData({
            inCartCount: data.cartNum
          });
        }
      }
    } else if (type === "clear") {
      this.setData({
        inCartCount: 0
      });
    }
  },
  // 刷新购物车
  refreshMiniCart (type) {
    if (type === "add") {
      this.setData({
        refreshMiniCartData: !this.data.refreshMiniCartData,
        catAnimation: !this.data.catAnimation
      });
    } else {
      this.setData({
        refreshMiniCartData: !this.data.refreshMiniCartData
      });
    }
  },
  /**
   * spu商品组件监听事件
   */
  showSpuSelector (type, data = {}) {
    if (type === "showModel") {
      djBus.emit("mask_spu", this.data.recommendObj);
      // 是否展示spuId
      this.setData({
        toggle: true,
        spuActivityId: data.activityId || "",
        spuData: data || {}
      });
    }
  },
  // 点击信息出现半弹层
  clickInfo (e) {
    let { currentPageName, prePageName, pageIdFirstPage } =
      this.data.recommendObj;
    let { attrs, title } = e.currentTarget.dataset;
    clickBuriedV2_({
      click_id: "clickFeature",
      click_par: {
        skuId: this.data.skuId,
        storeId: this.data.options.storeId || "",
      },
      currentPageName: currentPageName,
      prePageName: prePageName,
      pageId: pageIdFirstPage,
    });
    this.setData({
      infoPopObj: {
        attrs,
        title
      },
      isShowInfoPop: true
    });
  },
  // 点击会员卡片
  clickBusMember (data) {
    // 弹出入会协议框标识，弹窗：true、不弹窗：false
    let {
      to = "",
      params = "",
      guidePop = false,
      memberAgreementVO = null
    } = data || {};
    if (util.isLogin()) {
      if (guidePop == false) {
        djCmsJump({
          to,
          params,
          traceId: this.data.traceId || "",
          preObj: this.data.recommendObj,
          buried_position: {
            key: "product-clickBusMember",
            options: this.data.options
          }
        });
      } else if (memberAgreementVO) {
        this.setData({
          isShowOpenVip: true
        });
      }
    } else {
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-clickBusMember",
          options: this.data.options
        }
      });
    }
  },
  // 关闭当前页
  closeCurrentPage () {
    if (this.isToBack()) {
      wx.navigateBack();
    } else {
      wx.switchTab({
        url: "/pages/home/home"
      });
    }
  },
  // 判断是否展示返回按钮
  isToBack () {
    let pages = getCurrentPages();
    if (pages.length === 1) {
      return false;
    } else if (pages.length > 1) {
      return true;
    }
  },
  // 获取文案高度
  getTextHeight () {
    let _this = this;
    try {
      wx.createSelectorQuery()
        .selectAll(".sku_content")
        .boundingClientRect(function (rects) {
          let first = {
            height: 0,
            showMore: false
          };
          let second = {
            height: 0,
            showMore: false
          };
          rects.forEach(function (rect) {
            let id = rect.id; // 节点的ID
            let height = rect.height; // 节点的高度
            if (id === "first") {
              first.height = height;
            } else if (id === "second") {
              second.height = height;
            }
          });
          _this.setData({
            first,
            second
          });
        })
        .exec();
    } catch (error) {
      // console.log(error);
    }
  },
  // 点击文案下发的箭头
  clickArrowToggle (e) {
    let { id = "" } = e.currentTarget || {};
    if (id) {
      this.setData({
        [`${id}.showMore`]: !this.data[id].showMore
      });
    }
  },
  // 电话
  makePhone (e) {
    let phoneNumber = e.currentTarget.dataset.phone;
    let {
      currentPageName = "",
      prePageName = "",
      pageIdFirstPage = ""
    } = this.data.recommendObj;
    if (phoneNumber) {
      clickBuriedV2_({
        click_id: "clickMerchant",
        click_par: {
          storeId: this.data.options.storeId,
          skuId: this.data.options.skuId,
          traceId: this.data.traceId || "",
          type: 1
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage
      });
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      });
    }
  },
  // 点击进门店
  goToStore () {
    let pages = getCurrentPages();
    let delta = 1;
    let index = null;
    pages.forEach((item, i) => {
      try {
        if (item && item.route && item.route == "pages/store/index") {
          index = i;
        }
      } catch (err) {
        // console.log(err)
      }
    });
    let {
      currentPageName = "",
      prePageName = "",
      pageIdFirstPage = ""
    } = this.data.recommendObj;
    clickBuriedV2_({
      click_id: "clickStore",
      click_par: {
        storeId: this.data.options.storeId,
        skuId: this.data.options.skuId,
        traceId: this.data.traceId || ""
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage
    });
    if (index != null) {
      delta = pages.length - (index + 1);
      delta &&
        wx.navigateBack({
          delta
        });
    } else {
      let { skuId = "", storeId = "", orgCode = "" } = this.data.options || {};
      djCmsJump({
        to: "store",
        params: {
          storeId,
          orgCode,
          skuId
        },
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-GoToStore",
          options: this.data.options
        }
      });
    }
  },
  // 点击促销标
  goToPromotion (e) {
    let { item = {} } = e.currentTarget.dataset || {};

    // if (activityId) {
    //   const { params = {} } = this.data.transferProtocol || {};
    //   params.skuId = this.data.skuId || "";
    //   djCmsJump({
    //     to: item.to || "",
    //     params: item.params || {},
    //     userAction: item.userAction || "",
    //     traceId: this.data.traceId || "",
    //   });
    // }
    // wx.navigateBack({
    //   delta: 2,
    // });
    if (item.to) {
      djCmsJump({
        to: item.to || "",
        params: item.params || {},
        userAction: item.userAction || "",
        traceId: this.data.traceId || ""
      });
    }
  },
  // 点击服务
  clickService (e) {
    let { serviceIntroduce = "" } = e.currentTarget.dataset.item || {};

    if (serviceIntroduce) {
      mp.dialog({
        title: "说明",
        content: serviceIntroduce,
        showCancel: false
      });
    }
  },
  // 点击通知按钮
  clickNotice () {
    if (util.isLogin()) {
      djBus.emit("mask_spu", this.data.recommendObj);
      this.setData({
        noticeToggle: true
      });
    } else {
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-clickNotice",
          options: this.data.options
        }
      });
    }
  },
  // 监听降价提醒
  onNoticePrice () {
    this.setData({
      priceRemind: true,
      noticeToggle: false,
      refreshMiniCartData: !this.data.refreshMiniCartData
    });
  },
  // 展示预估到手价明细弹层
  showHandleDetail () {
    this.setData({
      isShowHanldePop: !this.data.isShowHanldePop
    });
    if (this.data.isShowHanldePop) {
      let {
        currentPageName = "",
        prePageName = "",
        pageIdFirstPage = ""
      } = this.data.recommendObj;
      clickBuriedV2_({
        click_id: "clickExplainIcon",
        click_par: {
          storeId: this.data.options.storeId,
          skuId: this.data.skuId,
          iconName: "预估到手价",
          traceId: this.data.traceId || ""
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage
      });
    }
  },
  // 点击单品单结立即购买
  async handleSgSClick (e) {
    let type = (e.currentTarget.dataset && e.currentTarget.dataset.type) || "";
    let skuId =
      (e.currentTarget.dataset && e.currentTarget.dataset.skuId) || "";
    let spuId =
      (e.currentTarget.dataset && e.currentTarget.dataset.spuId) || "";
    let storeId =
      (e.currentTarget.dataset && e.currentTarget.dataset.storeId) || "";
    let position =
      (e.currentTarget.dataset && e.currentTarget.dataset.position) || "";
    let userAction =
      (e.currentTarget.dataset && e.currentTarget.dataset.userAction) || "";
    let {
      currentPageName = "",
      prePageName = "",
      pageIdFirstPage = ""
    } = this.data.recommendObj;
    clickBuriedV2_({
      click_id: "click_add",
      click_par: {
        skuId,
        spuId,
        storeId,
        type,
        position,
        userAction,
        traceId: this.data.traceId || ""
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage
    });
    if (util.isLogin()) {
      let { singleSettleButton } = this.data;
      if (
        singleSettleButton.buttonType == 3 &&
        singleSettleButton.buttonEnable
      ) {
        if (this.data.iconType == 1) {
          // spu商品
          this.setData(
            {
              modelButtonType: 0
            },
            () => {
              this.showSpuSelector("showModel");
            }
          );
        } else {
          let {
            skuId = "",
            spuId = "",
            storeInfo = {},
            orgCode = ""
          } = this.data;
          let res = await request({
            functionId: FNIDS.verifySettleForSkuList.functionId,
            appVersion: FNIDS.verifySettleForSkuList.appVersion,
            isNeedDealError: true,
            method: "POST",
            body: {
              skuList: [
                {
                  id: skuId,
                  spuId: spuId,
                  num: 1
                }
              ],
              storeId: storeInfo.storeId,
              orgCode: orgCode,
              fromSource: 5,
              verifyResource: 1,
              pageSource: "productDetail"
            },
            preObj: this.data.recommendObj || {}
          });
          if (res && res.data && res.data.code == 0 && res.data.success) {
            this.verifySettleForSkuList();
          } else {
            let { result: { popupWindow = null } = {} } = res.data || {};
            if (popupWindow && popupWindow.content) {
              this.setData({
                isShowAuthoryDialog: true,
                popupWindow,
                authoryDialogContent: popupWindow.content.replace(
                  /<br\/>/g,
                  "\r\n"
                )
              });
            } else {
              wx.showToast({
                title: res.data && res.data.msg,
                icon: "none"
              });
            }
          }
        }
      }
    } else {
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-handleSgClick",
          options: this.data.options
        }
      });
    }
  },
  // 校验跳转
  async verifySettleForSkuList () {
    const { storeInfo, orgCode, skuId } = this.data;
    const preSaleSkuInfos = [
      {
        skuCount: 1,
        skuId,
        skuServiceList: []
      }
    ];
    djCmsJump({
      to: "Settlement",
      params: {
        storeId: storeInfo.storeId,
        orgCode,
        storeName: storeInfo.storeName,
        preSaleSkuInfos: JSON.stringify(preSaleSkuInfos),
        saleType: 5
      },
      preObj: this.data.recommendObj,
      buried_position: {
        key: "product-verfySettleForSkuList",
        options: this.data.options
      }
    });
  },
  // 单品单结加入购物车
  async handleAddCar () {
    if (util.isLogin()) {
      let { singleSettleButton } = this.data;
      if (
        singleSettleButton.buttonType == 3 &&
        singleSettleButton.buttonEnable
      ) {
        if (this.data.iconType == 1) {
          // 弹出spu弹层
          this.setData(
            {
              modelButtonType: 1
            },
            () => {
              this.showSpuSelector("showModel");
            }
          );
        } else {
          let {
            skuId = "",
            storeInfo = {},
            orgCode = "",
            inCartCount
          } = this.data;
          let params = {
            skus: [
              {
                id: skuId,
                num: ++inCartCount
              }
            ],
            storeId: storeInfo.storeId,
            orgCode: orgCode,
            pageSource: "productDetail",
            isAdd: true
          };
          _changeItemNum(params).then((res) => {
            let code = res.data.code;
            if (
              code == "0" ||
              code == "88888" ||
              code == "80011" ||
              res.data.code === "80012"
            ) {
              updatePageNums({
                type: "add",
                data: {
                  storeId: storeInfo.storeId,
                  skuId: skuId || "",
                  cartNum: inCartCount || ""
                }
              });
              // this.setData({
              //   refreshMiniCartData: !this.data.refreshMiniCartData,
              // });
              if (
                (code == "88888" ||
                  code == "80011" ||
                  res.data.code === "80012") &&
                res.data &&
                res.data.msg
              ) {
                mp.toast({
                  title: res.data && res.data.msg
                });
              }
            } else {
              mp.toast({
                title: res.data.msg || "加入购物车失败~请稍后再试！"
              });
            }
          });
        }
        let buriedParams = {
          storeId: this.data.storeInfo.storeId,
          skuId: this.data.skuId,
          type: "addCart",
          userAction: this.data.clickUserAction,
          traceId: this.data.traceId || ""
        };
        if (this.data.iconType == 1) {
          buriedParams = Object.assign({}, buriedParams, {
            spuId: this.data.spuId
          });
        }
        let {
          currentPageName = "",
          prePageName = "",
          pageIdFirstPage = ""
        } = this.data.recommendObj;
        clickBuriedV2_({
          click_id: "click_add",
          click_par: buriedParams,
          currentPageName,
          prePageName,
          pageId: pageIdFirstPage
        });
      }
    } else {
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-handleAddCar",
          options: this.data.options
        }
      });
    }
  },
  clickCancel () {
    this.setData({
      isShowAuthoryDialog: false
    });
  },
  clickConfirm () {
    this.setData({
      isShowAuthoryDialog: false
    });
    this.verifySettleForSkuList();
  },
  goRank (e) {
    let { to, params, categoryId = "" } = e.currentTarget.dataset;
    if (to) {
      djCmsJump({
        to,
        params,
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-goRank",
          options: this.data.options
        }
      });
    }
    let {
      currentPageName = "",
      prePageName = "",
      pageIdFirstPage = ""
    } = this.data.recommendObj;
    clickBuriedV2_({
      click_id: "clickTopSku",
      click_par: {
        storeId: this.data.storeInfo.storeId || "",
        skuId: this.data.skuId || "",
        categoryId: categoryId,
        // traceId: this.data.traceId || ""
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage,
    });
  },
  updatePrePrice (e) {
    let obj = {
      preSaleCount: e.detail
    };
    if (this.scopeData.preSaleOriginPrice != "暂无报价") {
      obj.preHandPrice =
        (this.scopeData.preSaleOriginPrice * 1000 * e.detail) / 1000;
    }

    this.setData(obj);
  },
  spuSelectorEvent (e) {
    let { preSellSku, curSkuId, spuId, storeId, orgCode, cartNum } =
      e.detail.data || {};
    let { type } = e.detail || {};
    if (type == "closeSpu") {
      this.setData({
        toggle: false,
        noticeToggle: false
      });
      return;
    }
    if (!preSellSku && this.data.productType == 9) {
      this.setData(
        {
          options: {
            buyNum: cartNum,
            spuId,
            skuId: curSkuId,
            storeId,
            orgCode,
            latitude: this.data.latitude,
            longitude: this.data.longitude
          }
        },
        () => {
          this.getDetailData();
        }
      );
    }
  },
  getBrandLayerInfo (brandId) {
    let { functionId = "", appVersion = "" } = FNIDS.brandMemberLayerInfo || {};
    request({
      functionId: functionId,
      appVersion: appVersion,
      isNeedDealError: true,
      body: {
        brandId
      },
      preObj: this.data.recommendObj || {}
    })
      .then((res) => {
        if (res.data.code == 0) {
          this.setData({
            brandLayerInfo: res.data.result || null
          });
        }
      })
      .catch(() => {
        // console.log(err)
      });
  },
  showSpu () {
    this.showSpuSelector("showModel");
  },
  async clickSelfBuy (e) {
    let type = (e.currentTarget.dataset && e.currentTarget.dataset.type) || "";
    let skuId =
      (e.currentTarget.dataset && e.currentTarget.dataset.skuId) || "";
    let spuId =
      (e.currentTarget.dataset && e.currentTarget.dataset.spuId) || "";
    let storeId =
      (e.currentTarget.dataset && e.currentTarget.dataset.storeId) || "";
    let position =
      (e.currentTarget.dataset && e.currentTarget.dataset.position) || "";
    let userAction =
      (e.currentTarget.dataset && e.currentTarget.dataset.userAction) || "";
    let {
      currentPageName = "",
      prePageName = "",
      pageIdFirstPage = ""
    } = this.data.recommendObj;
    clickBuriedV2_({
      click_id: "goCart",
      click_par: {
        btnName: type,
        storeId,
        type: "hotProductSelf",
        traceId: this.data.traceId || "",
      },
      currentPageName,
      prePageName,
      pageId: pageIdFirstPage
    });
    if (!util.isLogin()) {
      mpCmsJump({
        pageType: "p56",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-clickSelfBuy1",
          options: this.data.options
        }
      });
      return;
    }
    if (!this.data.stockCount) return;
    let result = await this.checkLimit();
    // 如果超出限购，则弹窗提示
    if (result >= this.data.limitCount) {
      wx.showToast({
        title: "该商品为限购商品，您购买已达上限",
        icon: "none"
      });
    } else {
      djCmsJump({
        to: "Settlement",
        params: {
          storeId:
            (this.data.storeInfo && this.data.storeInfo.storeId) || "" || "",
          orgCode: this.data.orgCode || "",
          saleType: "6",
          storeName:
            (this.data.storeInfo && this.data.storeInfo.storeName) || "",
          skuId: this.data.skuId || ""
        },
        traceId: this.data.traceId || "",
        preObj: this.data.recommendObj,
        buried_position: {
          key: "product-clickSelfBuy2",
          options: this.data.options
        }
      });
    }
  },
  // 校验是否超出限购
  async checkLimit () {
    let res = await request({
      ...FNIDS.recentOrderList,
      isForbiddenDialog: true,
      isNeedDealError: true,
      body: {
        stateCode: 1,
        stateAfter: true,
        tags: [1]
      },
      preObj: this.data.recommendObj || {}
    });
    if (res.data.code == 0 && res.data.result) {
      return res.data.result.size;
    } else {
      return 0;
    }
  },
  handleVipPop (e) {
    let type = e.detail.type;
    if (type == "isShowMemberPop") {
      this.setData({
        isShowOpenVip: false
      });
      // wx.showToast({ // 显示Toast
      //   title: '开通成功',
      //   icon: 'success',
      //   duration: 1500
      // })
    } else if (type == "refreshProductIndex") {
      this.setData({
        isShowOpenVip: false
      });
      this.getDetailData();
      // this.onLoad(this.data.options);
    }
  },
  // 页面事件
  pageEvent (e) {
    let type = e.detail.type || "";
    let data = e.detail.data || "";
    // 售后服务
    if (type == "afterSale") {
      this.setData({
        showAfterSale: true,
        dialogInfo: data
      });
    } else if (type == "busMember") {
      this.clickBusMember(data);
    } else if (type == "vipMember") {
      this.clickVipMember(data);
    }
    // 点击banner的价格明细郯城呢过
    else if (type == "handlePricePop") {
      this.showHandleDetail();
    }
    // 关闭售后服务弹层
    else if (type == "hideAfterSale") {
      this.setData({
        showAfterSale: false
      });
    }
    // 关闭信息弹层
    else if (type == "hideInfoPop") {
      this.setData({
        isShowInfoPop: false
      });
    }
  },
  // 点击v+会员楼层逻辑
  clickVipMember (data) {
    djCmsJump({
      to: data.to || "",
      params: data.params || {},
      preObj: this.data.recommendObj,
      buried_position: {
        key: "product-clickVipMember",
        options: this.data.options
      }
    });
  },
  // 订阅消息
  async goSubscrbe () {
    // 是否是spu
    let { skuId, spuId, showState, storeInfo = {}, preSaleInfo = {}, recommendObj = {}} = this.data
    let { currentPageName, prePageName, pageIdFirstPage } = recommendObj;
	if(!util.isLogin()){
		mpCmsJump({
			pageType: "p56",
			preObj: this.data.recommendObj,
			buried_position: {
			  key: "product-clickBusMember",
			  options: this.data.options
			}
		  });
	}else  if(showState == 12) {
      publicMethod.commonSetTmp(this, this.data);
	  clickBuriedV2_({
        click_id: "clickPreSellRemind",
        click_par: {
			  skuId: skuId,
			  spuId: spuId,
			  storeId: storeInfo.storeId,
			  promotionId: preSaleInfo.promotionId
        },
        pageId: pageIdFirstPage,
        currentPageName: currentPageName,
        prePageName: prePageName
      });
    }
    // }
  },
  // 订阅失败
  subscribeMsgFail () {
    // debugger;
  },
  // 订阅成功
  subscribeMsgOk () {
    this.openNoticePrice()
  },
  // 预售开启提醒
  openNoticePrice () {
    let { functionId = "", appVersion = "" } = FNIDS.noticePriceOpen || {};
    let {
      title = "",
      skuId = "",
      majorPrice = {},
      orgCode = '',
      storeInfo = {},
      spuId = '',
      recommendObj = {},
      preSaleInfo = {}
	 } = this.data || {};
    let { storeName = "", storeId = "" } = storeInfo;
    request({
	  functionId,
	  appVersion,
	  isNeedDealError: true,
	  body: {
        businessType: 1,
        orgCode: orgCode,
        preSellOpeningTime: preSaleInfo.preSellOpeningTime,
        promotionId: preSaleInfo.promotionId,
        refPrice: majorPrice.price * 100,
        sendMessageFlag: 0,
        skuId: skuId,
        storeId: storeId,
        skuName: title,
        storeName: storeName,
        mobilePhoneFlag: 1,
        spuId: spuId
        // pageSource: "productDetail", //需确认
        // ref: "",
        // ctp: "goodsinfo",
	  },
    	pageId: this.data.pageIdFirstPage,
	  preObj: recommendObj
    })
	  .then((res) => {
        if (res.data.code == "0") {
          this.setData({
            showSubscribeSuccessPop: true
          })
          // 刷新详情接口
          this.getDetailData()
        } else if(res.data.code == "EA0001") {// 距离预售十分钟内订阅失败code
		  setTimeout(() => {
            mp.toast({
			  title: res.data.msg || '订阅失败'
            });
		  }, 5000);
        }else{
          setTimeout(() => {
            mp.toast({
				  title: res.data.msg || "开启短信通知失败-"
            });
          }, 5000);
        }
	  })
	  .catch((err) => {
        setTimeout(() => {
		  mp.toast({
            title: err.msg || "开启短信通知失败"
		  });
        }, 5000);
	  });
  },
  //   关闭订阅成功弹层
  closeDialog () {
    this.setData({
      showSubscribeSuccessPop: false
    })
  },
  //   倒计时结束
  onTimeEdnEvent (e) {
    let { type = "" } = e.detail || {};
    if(type == 'timeEnd') {
      // 刷新详情接口
      this.getDetailData()
    }
  },
  // 订阅通知
  onNoticeSubscrib () {
    // 刷新详情接口
    this.getDetailData()
  }
});