/**
 * 文件引入
 */
/* eslint-disable */
import mp from '../../../../common/util/wxapi'
import { request, FNIDS, onCaptureScreen, offCaptureScreen } from '../../../../common/util/api'
import util from "../../../../common/util/util";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import { djCmsJump } from '../../../../common/util/agreementV2'
import { updatePageNums, _getSingleCart, _dealResults } from '../../../../common/util/carService'
import { getHalfMaskPageSourceAndPrePageSource } from '../../../../common/util/bi/utils'
import emitter from '../../../../common/util/events'
import djBus from '../../../../common/util/djBus'
import { addFilterMsg, error } from "../../../../common/util/wxLog";

/**
 * 事件类型
 */
let TYPE = {
  // 去结算页
  miniCartToBill: 'miniCartToBill',
  // 去登录
  miniCartToLogin: 'miniCartToLogin',
  // 清除购物车
  miniCartClear: 'miniCartClear',
  // 全选/取消全选
  miniCartAllChoose: 'miniCartAllChoose',
  // 勾及取消勾选
  miniCartCheckToggle: 'miniCartCheckToggle',
  // lmy 更新最新数据（为了店内搜索的商品跳转到详情页加车后返回，数量不变的bug）
  miniCartUpdate: 'miniCartUpdate',
};
// 购物车动画对象
let animation;
// let carAnimation;
// let priceAnimation;
let initTranslateY = 0;
let app = getApp();
// 当前时间（性能检测上报用）
let startTime = Date.now();
// 请求开始时间（性能检测上报用）
let requestPreTime = Date.now();
// 请求结束时间（性能检测上报用）
let requestEndTime = Date.now();
// 打点上报flag
let flag = true;

// 1 app 2 h5 5 微信小程序 8 rn 12 商家小程序
const FROM_SOURCE = 5;
// 动画可以执行标志
let animationCanDo = true;
let catStack = []
let newGuid = null
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    refreshMiniCartData: {
      type: Boolean,
      value: null
    },
    // 门店ID
    storeId: {
      type: String,
      value: ''
    },
    // 商家ID
    orgCode: {
      type: String,
      value: ''
    },
    // 纬度
    latitude: {
      type: String,
      value: ''
    },
    // 经度
    longitude: {
      type: String,
      value: ''
    },
    // 埋点用
    // 单品页id
    productId: {
      type: String,
      value: ''
    },
    // 活动页id
    activityId: {
      type: String,
      value: ''
    },
    // --end
    catAnimation: {
      type: Boolean,
      value: false
    },
    showCart: {
      type: Boolean,
      value: false
    },
    // 当前页是否是神券页标识
    isGodStamps: {
      type: Boolean,
      value: false
    },
    // 神券页小黄条
    bottomDiff: {
      type: Array,
      value: []
    },
    // 优惠券id
    couponId: {
      type: String,
      value: ''
    },
    // 前端是否展示过限购弹窗(v8.0新增 加车时爆品限购需求使用)
    limitFlag: {
      type: Number,
      value: 0
    },
    // 展示引导气泡
    showGuidFlag: {
      type: Boolean,
      value: false
    },
    // 搜索关键词
    keyword: {
      type: String,
      value: ''
    },
    // 新券购code码 埋点用
    activityCode: {
      type: String,
      value: ''
    },
    //店内搜索结果页面--埋点用
    searchType: {
      type: String,
      value: ''
    },
    //券购落地页--埋点用
    markState: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: '',
    },
    prePageId: {
      type: String,
      value: ''
    },
    refPar: {
      type: Object,
      value: null
    },
    preBuried: {
      type: Object,
      vaule: null
    },
    biPageName: {
      type: String,
      value: ''
    },
    miniCartMustOrder: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.toast) {
          mp.toast({
            title: val.toast,
            duration: 1000,
          });
        }
      }
    }
  },
  observers: {
    'refreshMiniCartData': function () {
      if (this.data.storeId) {
        // 购物车重置动效用
        this.setData({
          type: ''
        });
        // 获取购物车数据
        let timer = setTimeout(() => {
          this.getCartData();
          clearTimeout(timer)
        }, 500)
      }
    },
    'catAnimation': function (news) {
      // 调取购物车动画
      // 执行动画
      if (catStack.length == 0) {
        this.setData({
          scaleAble: true
        })
        let _t = this
        setTimeout(function () {
          _t.setData({
            scaleAble: false
          });
          catStack = [];
        }, 400)
      }
      catStack.push(news)
    },
    'showGuidFlag': function (news) {
      if (news == false && this.data.showNewGuid) {
        this.hideNewGuid()
      }
    },
    // 监听是否展示购物车
    isHideCartInfo(val) {
      // 清除监听截图
      offCaptureScreen()
      let list = [];
      const skuItem = this.data.data.itemList || [];
      skuItem.forEach(v => {
        if (v.suitType == 'combination') {
          list.push([
            `activityId=${v.combinationSkuInfo.activityId}`,
            `skuCount=${v.combinationSkuInfo.cartNum}`,
            `skuPrice=${v.combinationSkuInfo.price}`
          ])
        }
        if (v.suitType == 'single') {
          v.skuList.forEach(it => {
            list.push([
              `skuId=${it.skuId}`,
              `skuCount=${it.cartNum}`,
              `skuPrice=${it.price}`
            ])
          })
        }
      })

      const lists = list.map(value => {
        return value.join('&')
      }).join(',')
      // pv埋点
      if (val == false) {
        if (this.data.noEmeit == true) {
          this.data.noEmeit = false
          return
        }
        let prePageName = this.data.preBuried.currentPageName
        let pageId = util.getPageIdrandom()
        this.setData({
          pageId,
          currentPageName: 'mini_shopcar',
          prePageName: prePageName,
          recommendObj: {
            pageIdFirstPage: pageId,
            currentPageName: 'mini_shopcar',
            prePageName: prePageName,
            pageSource: this.data.preBuried.pageSource,
            refPageSource: this.data.preBuried.refPageSource
          }
        }, () => {
          this.pvFunc()
          if (prePageName !== this.data.biPageName) {
            clickBuriedV2_({
              click_id: "test_popAndPageDiff0906",
              click_par: {
                recommendObj: this.data.preBuried,
                popName: "mini_cart",
                popRealPrePageName: prePageName,
                popSelfPrePageName: this.data.biPageName,
              },
            });
          }
          let selector = this.generateSel(this.data.biPageName)
          const pageList = getCurrentPages();
          const route = (pageList && pageList.length && pageList[pageList.length - 1].route) || ''
          const prePageId = this.data.preBuried.pageIdFirstPage || ''
          emitter.emit('halfMaskFunc_' + route + '_mini_shopcar_' + prePageId, {
            name: 'mini_shopcar',
            type: 'open',
            selector,
            buriedObj: this.data.recommendObj
          })
          onCaptureScreen({
            storeId: this.data.storeId,
            skuList: lists
          }, this.data.recommendObj)
        })
      } else {
        if (this.data.noEmeit == true) return
        let selector = this.generateSel(this.data.biPageName)
        const pageList = getCurrentPages();
        const route = (pageList && pageList.length && pageList[pageList.length - 1].route) || ''
        const prePageId = this.data.preBuried.pageIdFirstPage || ''
        emitter.emit('halfMaskFunc_' + route + '_mini_shopcar_' + prePageId, {
          name: 'mini_shopcar',
          type: 'close',
          selector,
          buriedObj: this.data.recommendObj
        })
        onCaptureScreen({
          storeId: this.data.storeId
        }, this.data.preBuried)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 购物车数据
    btuBottom: '',
    data: '',
    // 购物车动画
    animationData: {},
    // 车车图标动画
    // carAnimationData: {},
    // priceAnimationData: {},
    // 是否显示购物车
    isHideCartInfo: null,
    // 购物车高度
    cartHeight: 0,
    // 是否全选
    isSelectAll: false,
    // 全选按钮不可点击
    isSelectAllDisabled: false,
    // 加减车类型
    type: '',
    // 结束防止多次点击
    flag: true,
    // 商品总数高度
    goodsHeight: 0,
    scaleAble: false,
    // 是否显示授权对话框
    isShowAuthoryDialog: false,
    // 授权对话框内容
    authoryDialogContent: "",
    // 去凑单tips标识，默认不展示
    hasCouponsTips: false,
    // 去凑单tips信息
    discountTipInfo: {},
    // 去凑单优惠券弹层，默认不展示
    isShowCouponPop: false,
    // 隐藏删除全部商品入口标志，默认false，不隐藏
    hideRemoveAllGoodsEntryFlag: false,
    // 优惠券弹层升起，隐藏购物车标志
    dropDownCartByCouponPop: false,
    // 购物车气泡
    couponDesc: '',
    // 兑换弹窗类型
    giftPopType: '',
    // 兑换弹窗标识
    showGiftPop: false,
    // 失效商品列表
    invalidData: [],
    isIphoneX: false,
    // 8.2 新增待领取的券活动code列表，进入结算页时进行领取
    grabCouponList: [],
    // 优惠券弹层置顶参数
    couponListReuqestParam: {},
    showNewGuid: false,
    // 8.8.5新增一键免费开通弹层
    oneKeyOpen: false,
    traceId: '',
    showVlayer: false,
    vlayerInfo: null,
    // 页面来源
    pageSource: '',
    refPageSource: '',
    popupWindow: null,
    noEmeit: false,
    // 处方药弹层
    showDrugSkuPop: false,
    // 处方药数据
    drugSkuPopData: {}
  },

  /**
   * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
   */
  attached: function () {
    this.setData({
      isIphoneX: app.globalData.isIpx
    })
    let { pageSource, refPageSource } = getHalfMaskPageSourceAndPrePageSource()
    this.setData({
      pageSource,
      refPageSource
    })
  },
  ready() {
    // 创建购物车动画
    animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
  },
  created() {
    // 打点起始时间
    startTime = Date.now();
    flag = true;
  },
  detached() {
    if (newGuid != null) {
      newGuid = null
    }
  },
  pageLifetimes: {
    show: function () {
      if (this.data.orgCode && this.data.orgCode != 'undefined' && this.data.orgCode != 'null') {
        this.getCartData();
        this.setData({
          showDrugSkuPop: false
        })
      }
    },
    hide: function () {
      this.hideNewGuid()
      // 清除监听截图
      offCaptureScreen()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    pvFunc(back = '') {
      let clickpar = this.generatePv(this.data.preBuried.pageSource)
      pvBuriedV2_({
        page_par: clickpar,
        pageId: this.data.pageId,
        currentPageName: 'mini_shopcar',
        prePageName: this.data.prePageName,
        isBack: back
      })
    },
    // 获取购物车数据 succCB（成功回调，增加处理逻辑。减车时需要判断是否隐藏清空购物车入口）
    getCartData(resetHeightFlag) {
      // 请求开始时间（性能检测上报用）
      requestPreTime = Date.now();
      let params = {
        lat: this.data.latitude || app.globalData.addressInfo.latitude,
        lng: this.data.longitude || app.globalData.addressInfo.longitude,
        orgCode: this.data.orgCode,
        storeId: this.data.storeId,
        pageSource: this.data.pageSource,
        refPageSource: this.data.refPageSource,
        cartType: null,
        ref_par: this.data.refPar
      }
      _getSingleCart(params, this.data.pageId)
        .then(res => {
          // 请求结束时间（性能检测上报用)
          requestEndTime = Date.now();
          if (res.data.code == 0) {
            let result = res.data.result;
            if (result) {
              this.dealRequestResult(result, resetHeightFlag);
              // 设置traceId
              let traceId = res.data.traceId
              setTimeout(() => {
                this.setData({ traceId })
              }, 500);
            }
          } else {
            wx.showToast({
              title: res.data.msg,
              duration: 2500,
              icon: 'none'
            })
            let pages = getCurrentPages()
            let currentRouter = pages[pages.length - 1].route
            let preRouter = pages[pages.length - 2].route
            let logParams = {
              lat: this.data.latitude || app.globalData.addressInfo.latitude,
              lng: this.data.longitude || app.globalData.addressInfo.longitude,
              orgCode: this.data.orgCode,
              storeId: this.data.storeId,
              detail: res.data.detail,
              currentRouter,
              preRouter
            }
            this.reportMonitor('12', 'miniCartGetError', JSON.stringify(logParams))
          }
        }).catch((err) => {
          let infos = err && err.toString()
          this.reportMonitor('12', 'miniCartCatch', infos)
        })
    },
    // 处理接口数据
    // resetHeightFlag重新设置动画, 不传为空
    dealRequestResult(result, resetHeightFlag) {
      let {
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
      } = _dealResults(result)
      // 处理新人引导逻辑
      this.dealGuidNewer(result)
      // 处理门店搭配购买
      this.dealExcludeSkuIds(result.itemList);
      // set数据
      this.setData({
        data: result,
        couponDesc,
        invalidData,
        isSelectAll: isSelectAll,
        isSelectAllDisabled: isSelectAllDisabled,
        grabCouponList,
        hasCouponsTips,
        discountTipInfo,
        discountTipStr,
        couponListReuqestParam,
        hideRemoveAllGoodsEntryFlag
      }, () => {
        if (result.itemList && result.itemList.length > 0) {
          // 判断当前是否需要展开购物车
          if (this.data.showCart) {
            this.setData({
              isHideCartInfo: false,
              showCart: false
            })
          }
          // 上报性能
          if (flag) {
            flag = false;
            // 请求时间（性能检测上报用）
            let requestTime = requestEndTime - requestPreTime;
            // 上报请求时间（性能检测上报用）
            app.reportPerformance(1024, requestTime);
            // setDate渲染时间（性能检测上报用）
            let setDataTime = Date.now() - startTime - requestTime;
            // 上报setDate渲染时间（性能检测上报用）
            app.reportPerformance(2023, setDataTime);
          }
          // 直接获取 section高度
          this.getCartRect(resetHeightFlag)
        } else {
          this.setData({ goodsHeight: 0 })
          if (this.data.isHideCartInfo === false)
            this.setData({ isHideCartInfo: true }, () => { this.getCartRect(true) })
        }
        let { initPromotionTipInfo } = this.data.data || {};
        this.triggerEvent("pageEvent", {
          type: "miniCarHasTips",
          data: {
            hasCouponsTips:
              (hasCouponsTips || initPromotionTipInfo) ? "1" : "0",
          },
        });
      });
    },
    // 新人引导弹层参数
    dealGuidNewer(data) {
      let guidFlag = wx.getStorageSync('minicartShowGuid')
      if (data && data.guidanceInfo && data.guidanceInfo.grabCoupon && !guidFlag) {
        this.setData({
          showNewGuid: true
        }, () => {
          newGuid = setTimeout(() => {
            this.data.showNewGuid && this.hideNewGuid()
          }, 10000)
        })
      }
    },
    //从购物车信息中解析去结算时需要展示的授权信息
    dealAuthorizationInfo(cartData) {
      if (cartData && cartData.authorize) {
        this.data.data.authorize = cartData.authorize;
        this.data.data.headAuthorize = cartData.headAuthorize;
        if (cartData.tipAuthorize) {
          this.data.data.tipAuthorize = cartData.tipAuthorize.replace(/<br\/>/g, "\r\n");
        }
      }
    },
    // 获取门店搭配购买所需的skuId
    dealExcludeSkuIds(result) {
      let excludeSkuIds = []
      if (result && result.length) {
        result.forEach(item => {
          if (item.suitType == 'invalidate' || item.suitType == 'combination') return

          item.skuList && item.skuList.length && item.skuList.forEach((subItem) => {
            if (subItem.skuState == "0" || subItem.skuState == "2")
              return;
            excludeSkuIds.push(subItem.skuId);
          });
        });
      }
      app.globalData.excludeSkuIds = excludeSkuIds
    },

    // 展示和隐藏购物车信息
    cartToggle() {
      if (this.data.showVlayer == true) {
        this.setData({
          showVlayer: false
        })
      }
      let itemList = this.data.data.itemList || [];
      if (!itemList.length) return
      let isHideCartInfo = this.data.isHideCartInfo === null ? false : !this.data.isHideCartInfo
      this.setAnimation(() => {
        let translateY = isHideCartInfo ? initTranslateY : -this.data.cartHeight
        animation.translateY(translateY).step();
        this.setData({
          isHideCartInfo,
          animationData: animation.export()
        })
      });

      // 关闭教育引导弹层
      this.data.showNewGuid && this.hideNewGuid()
    },
    // 动画可以执行判断（400ms间隔，防止一个动画没有执行完，又执行另一个动画，产生UI展示bug）
    setAnimationMark() {
      if (!animationCanDo) return false;
      let animationGap = 400;
      animationCanDo = false;
      setTimeout(() => {
        animationCanDo = true;
      }, animationGap)
      return true;
    },
    // 动画执行
    // 解决由于多次执行setAnimation导致mark标多变化一次引起的动画bug，故将函数改造为promise
    setAnimation(fn) {
      return new Promise(resolve => {
        let mark = this.setAnimationMark();
        if (!mark) {
          resolve(false)
        } else {
          fn && fn();
          resolve(true)
        }
      })
    },
    // 获取购物车高度 resetHeightFlag（重新设置高度标识，不限于加减车）
    getCartRect: function (resetHeightFlag) {
      let self = this;
      let query = wx.createSelectorQuery().in(this);
      let preHeight = this.data.cartHeight
      query.select('#section').boundingClientRect(res => {
        let height = res && res.height;
        // isHideCartInfo 为null表示初始状态，购物车未进行展开收起操作，此时不需设置animationData
        let flag = self.data.isHideCartInfo === null ? null : !self.data.isHideCartInfo
        if (resetHeightFlag || (flag && preHeight !== height)) {
          this.setAnimation(() => {
            animation.translateY(-height).step();
            this.setData({
              animationData: animation.export(),
            })
          });
        }
        this.setData({
          cartHeight: height
        })

      }).exec()
    },
    catchtouchmove() {
      return false
    },
    // 隐藏购物车信息
    hideCartInfo() {
      return new Promise(resolve => {
        this.setAnimation(() => {
          animation.translateY(initTranslateY).step();
          this.setData({
            isHideCartInfo: true,
            animationData: animation.export(),
          })
        })
          .then(res => {
            resolve(res)
          })
        this.data.noEmeit = true
      })
    },
    // 全选
    selectAllToggle() {
      if (!this.data.isSelectAllDisabled) {
        let isSelectAll = !this.data.isSelectAll;
        let functionId = isSelectAll ? FNIDS.miniCartCheckAllItem.functionId : FNIDS.miniCartUnCheckAllItem.functionId
        let appVersion = isSelectAll ? FNIDS.miniCartCheckAllItem.appVersion : FNIDS.miniCartUnCheckAllItem.appVersion
        request({
          functionId,
          method: 'POST',
          body: {
            isReturnCart: true,
            positionType: "2",
            orgCode: this.data.orgCode,
            storeId: this.data.storeId,
            lat: this.data.latitude,
            lng: this.data.longitude,
            cartOpenFlag: true,
            fromSource: FROM_SOURCE,
            pageSource: this.data.pageSource || "",
            refPageSource: this.data.refPageSource,
            ref_par: this.data.refPar
          },
          appVersion,
          pageId: this.data.pageId
        })
          .then((res) => {
            let result = res.data.result;
            if (res.data.code == 0) {
              if (result) {
                this.dealRequestResult(result, false);
                this.triggerEvent("miniCartWidgetEvent", {
                  type: TYPE.miniCartAllChoose,
                  data: {},
                });
                // 更新全选flag
                this.setData({
                  isSelectAll: isSelectAll,
                });
              }
            } else {
              this.reportMonitor('13', 'miniCartCheckAllError', res.data.msg)
            }
          })
          .catch((err) => {
            let infos = err && err.toString()
            this.reportMonitor('13', 'miniCartCheckAllCatchError', infos)
          });
      }
    },
    // 删除所有商品
    removeAllGoods() {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'delete_all',
        click_par: {
          storeId: this.data.storeId
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
      mp.dialog({
        content: '清空购物车中所有商品？'
      }).then(res => {
        if (res.confirm) {
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'click_delete',
            click_par: {
              storeId: this.data.storeId
            },
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId
          })
          let { functionId, appVersion } = FNIDS.miniCartRemoveAllItem
          request({
            functionId,
            method: 'POST',
            body: {
              isReturnCart: true,
              orgCode: this.data.orgCode,
              storeId: this.data.storeId,
              lat: this.data.latitude,
              lng: this.data.longitude,
              positionType: "2",
              pageSource: this.data.pageSource,
              refPageSource: this.data.refPageSource,
              ref_par: this.data.refPar
            },
            appVersion,
            pageId: this.data.pageId
          })
            .then((res) => {
              let result = res.data.result;
              this.triggerEvent("miniCartWidgetEvent", {
                type: TYPE.miniCartClear,
                data: {},
              });
              if (result) {
                this.dealRequestResult(result)
                updatePageNums({ type: 'clear', data: { storeId: result.storeId } })
              }
            })
            .catch(() => { });
        }
      }).catch(() => {

      })
    },
    // 监听加减车事件
    onAddMinControllerChange(e) {
      let type = e.detail.type;
      let data = e.detail.data;
      this.getCartData()
      this.setData({
        type: type
      });
      this.triggerEvent('miniCartWidgetEvent', {
        type: type,
        data: data
      })
      // 关闭引导弹层
      this.data.showNewGuid && this.hideNewGuid()
    },

    clickCancel() {
      this.setData({
        flag: true,
        isShowAuthoryDialog: false,
      });
    },

    clickConfirm() {
      this.setData({
        isShowAuthoryDialog: false,
      });
      this.goToBillImplNewByAB();
    },

    // 点击按钮 根据按钮类型进行跳转
    handleClickBt(e) {
      let { buttonType, buttonState, buttonName } = e.currentTarget.dataset
      if (!this.data.flag) return
      this.setData({
        flag: false
      });
      switch (buttonType) {
        case 9:
          this.goToBill(buttonState, buttonName)
          break;
        case 10:
          this.setData({
            flag: true
          });
          let preObj = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
          wx.navigateTo({
            url: `/pages/store/index?storeId=${this.data.storeId}&orgCode=${this.data.orgCode}`,
            preObj,
            buried_position: {
              currentPageName: 'minicart_handleClickBt'
            }
          })
          // 埋点
          let click_par = {
            storeId: this.data.storeId,
            btnName: buttonName,
            couponId: this.data.couponId,
            keyword: this.data.keyword
          }
          click_par = this.resolveEmpty(click_par)
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'goShop',
            click_par,
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName,
            pageId: this.data.pageId
          })
          break
        case 12:
          this.setData({
            flag: true
          });
          let pages = getCurrentPages()
          let route = pages[pages.length - 1].route
          let options = pages[pages.length - 1].options
          let params = ''
          if (Object.keys(options).length) {
            Object.keys(options).forEach((item, index) => {
              if (index == 0) {
                params += `${item}=${options[item]}`
              } else {
                params += `&${item}=${options[item]}`
              }
            })
          }
          let navigatePath = `/${route}?${params}`
          wx.navigateToMiniProgram({
            appId: 'wxffb7d80f8c50ac5c',
            path: navigatePath
          })
          break
        default:
          break;
      }
      if (this.data.showVlayer) {
        this.setData({
          showVlayer: false
        })
      }
    },

    // 去结算(包含是否登录的判断以及是否展示授权对话框)
    goToBill(buttonState, buttonName) {
      if (buttonState === 0) {
        if (util.isLogin()) {
          this.goToBillImpl();
          this.data.showNewGuid && this.hideNewGuid()
          // 埋点
          let click_par = {
            storeId: this.data.storeId,
            btnName: buttonName,
            activityId: this.data.activityId,
            couponId: this.data.couponId,
            keyword: this.data.keyword
          }
          console.log(click_par, 'click_par')
          click_par = this.resolveEmpty(click_par)
          let report = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried;
          clickBuriedV2_({
            create_time: new Date(),
            click_id: 'goCart',
            click_par,
            currentPageName: report.currentPageName,
            prePageName: report.prePageName,
            pageId: report.pageIdFirstPage
          })
        } else {
          this.setData({
            flag: true
          });
          let preObj = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
          wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            preObj,
            buried_position: {
              currentPageName: 'minicart_goToBill'
            }
          })
        }
      } else {
        this.setData({
          flag: true
        });
      }
    },

    // 去结算(真实实现)
    goToBillImpl() {
      let { functionId, appVersion } = FNIDS.verifySettle
      request({
        functionId,
        method: 'POST',
        isNeedDealError: true,
        body: {
          lat: this.data.latitude,
          lng: this.data.longitude,
          orgCode: this.data.data.orgCode,
          positionType: "2",
          storeId: this.data.data.storeId,
          pageSource: this.data.pageSource,
          refPageSource: this.data.refPageSource || this.data.preBuried && this.data.preBuried.refPageSource,
          ref_par: this.data.refPar
        },
        appVersion,
        pageId: this.data.pageId
      })
        .then((res) => {
          if (res.data.code == "0") {
            this.goToBillImplNewByAB();
          } else {
            let { result: { popupWindow = null } = {} } = res.data || {}
            let page ,len, prePage
            try {
              page = getCurrentPages()
              len = getCurrentPages().length
              prePage = page[len - 2].route
            } catch (e) {

            }
            console.log(prePage);
            if (popupWindow) {
              if (popupWindow.type == 1 || popupWindow.type == 2) {
                this.billImplDrugSkuPop(popupWindow)
              } else if (popupWindow.type == 3) {
                // 关闭购物车
                this.hideCartInfo()
                // 上一页是门店
                // eslint-disable-line
                let { param , to} = popupWindow.buttons[1]
                let anchorCateId = param.anchorCateId
                wx.setStorageSync('miniCartMustOrder', {
                  toast: popupWindow.title,
                  anchorCateId: anchorCateId
                })
                if (prePage== 'pages/store/index') {
                  wx.navigateBack()
                } else if (this.data.preBuried.currentPageName == 'storeinfo') {
                  mp.toast({
                    title: res.data.msg,
                    duration: 1500,
                  });
                  this.triggerEvent('miniCartMustOrderFn')
                } else {
                  djCmsJump({
                    params: param,
                    to: to
                  })
                }
              } else {
                this.setData({
                  isShowAuthoryDialog: true,
                  popupWindow,
                  authoryDialogContent: popupWindow.content.replace(
                    /<br\/>/g,
                    "\r\n"
                  ),
                });
              }

            } else {
              if (res.data.code == "10010") {
                mp.toast({
                  title: res.data.msg,
                  duration: 5000,
                });
              } else {
                wx.showToast({
                  title: res.data.msg,
                  icon: "none",
                });
              }
            }
          }

          setTimeout(() => {
            this.setData({
              flag: true,
            });
          }, 2000);
        })
        .catch(() => {
          setTimeout(() => {
            this.setData({
              flag: true,
            });
          }, 2000);
        });
    },
    // 去新结算页面
    goToBillImplNewByAB() {
      let { data, grabCouponList } = this.data;
      let { vplusEstimatedPriceVo: { check = '' } = {} } = data
      let url = `/pages/settlementV2/index?storeId=${data.storeId}&orgCode=${data.orgCode}&storeName=${data.storeName}&grabCouponList=${JSON.stringify(grabCouponList)}&vipPackageType=${check}`
      let preObj = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
      wx.navigateTo({
        url,
        preObj,
        buried_position: {
          currentPageName: 'minicart_goToBillImplNewByAB'
        }
      })
    },
    // 点击去凑单
    goToAddOn() {
      let { addOnOff, tradePieceOffDesc = '' } = this.data.discountTipInfo;
      switch (addOnOff) {
        case 3:
          this.setData({
            isShowCouponPop: true,
            dropDownCartByCouponPop: false
          })
          // eslint-disable-line
          let obj = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
          djBus.emit('couponPop', obj)
          break;
        case 4:
          if (this.data.isHideCartInfo === false) {
            this.hideCartInfo().then(res => {
              if (res) {
                this.setData({
                  giftPopType: 'wholestore',
                  showGiftPop: true,
                  dropDownCartByCouponPop: true
                })
              }
            })
          } else {
            this.setData({
              giftPopType: 'wholestore',
              showGiftPop: true,
              dropDownCartByCouponPop: false
            })
          }
          break;
        case 1:
        case 2:
        case 5:
        case 6:
        case 7:
          let { to, params } = this.data.discountTipInfo
          if (to == 'scrapGoods') {
            params.pageSource = 'minicart'
          }
          let orgCode = this.data.orgCode
          orgCode ? params.orgCode = orgCode : ''
          let preObj = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
          djCmsJump({
            to,
            params,
            preObj,
            buried_position: {
              currentPageName: 'minicart_goToAddOn'
            }
          })
          break
        default:
          break;
      }

      // 埋点
      let click_par = {
        position: 'fold',
        text: tradePieceOffDesc,
        storeId: this.data.storeId,
        addOnOff: addOnOff,
        keyword: this.data.keyword,
        activityId: this.data.activityId
      }
      click_par = this.resolveEmpty(click_par)
      let report = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'miniCartSelect',
        click_par,
        currentPageName: report.currentPageName,
        prePageName: report.prePageName,
        pageId: report.pageIdFirstPage
      })
    },
    // 优惠券弹层隐藏的接收逻辑（判断之前是否弹起购物车，恢复之前购物车弹起状态）
    handleHideCouponPop() {
      this.setData({
        isShowCouponPop: false
      })
      if (this.data.dropDownCartByCouponPop) {
        this.cartToggle()
      }
    },
    // store_2.0改版 获取购物车内券，弹起弹层
    getCoupon() {
      this.hideCartInfo().then(res => {
        if (res) {
          djBus.emit('couponPop', this.data.recommendObj)
          this.setData({
            isShowCouponPop: true,
            dropDownCartByCouponPop: true
          })
        }
      })
    },
    // 去凑单/兑换 弹出弹层等逻辑
    goDosomething(e) {
      let { suittype } = e.detail
      this.hideCartInfo().then(res => {
        if (res) {
          this.setData({
            giftPopType: suittype,
            showGiftPop: true,
            dropDownCartByCouponPop: true
          })
        }
      })
    },
    // 关闭换赠弹窗
    giftPopClose() {
      this.setData({
        showGiftPop: false
      })
      if (this.data.dropDownCartByCouponPop) {
        this.cartToggle()
      }
    },
    async addGiftSuccess() {
      this.setData({
        showGiftPop: false,
        isHideCartInfo: this.data.dropDownCartByCouponPop ? false : this.data.isHideCartInfo
      }, () => {
        this.getCartData(this.data.isHideCartInfo == false ? true : false)
      })
    },
    openMembers(e) {
      let { open, to, params, freeMember } = e.currentTarget.dataset
      // 根据会员弹层信息是否存在判断是否是免费开通会员
      let memberBenefitInfo = this.data.data.estimatedPriceVo && this.data.data.estimatedPriceVo.memberBenefitInfo || ''
      if (memberBenefitInfo) {
        // 免费开通
        this.setData({ oneKeyOpen: true })
      } else {
        if (open) {
          // 如果是跳转h5,但是没下发url则不跳转
          if (to == 'web' && (!params || !params.url)) return
          // 跳转协议
          let preObj = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
          djCmsJump({
            to,
            params,
            preObj,
            buried_position: {
              currentPageName: 'minicart_openMembers'
            }
          })
        }
      }
      if (this.data.data.estimatedPriceVo) {
        let buried = this.getBuriedObj()
        clickBuriedV2_({
          click_id: 'clickMember',
          click_par: {
            storeId: this.data.storeId,
            memberType: freeMember ? 'free' : 'pay'
          },
          currentPageName: buried.currentPageName,
          prePageName: buried.prePageName,
          pageId: buried.pageIdFirstPage
        })
      }
    },
    hideNewGuid() {
      if (this.data.showNewGuid) {
        this.setData({ showNewGuid: false })
        wx.setStorageSync('minicartShowGuid', 'true');
      }
    },
    memberToastopen() {
      let { functionId, appVersion } = FNIDS.shopCartOnClick
      request({
        functionId,
        appVersion,
        method: 'POST',
        body: {
          storeId: this.data.storeId,
          orgCode: this.data.orgCode,
          source: 'cartoneclick',
          ref_par: this.data.refPar
        },
        pageId: this.data.pageId
      }).then(res => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '开通会员成功',
            icon: "none",
            duration: 3000
          });
          this.getCartData();
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 3000
          });
        }
      }).catch(err => {
        wx.showToast({
          title: err.data.msg,
          icon: "none",
          duration: 3000
        });
      })
    },
    onShowModify(e) {
      let { infos = {} } = e.detail
      this.setData({
        showModify: true,
        modifyGoodsInfo: infos
      })
    },
    closeModify(e) {
      let { refreshCar = '', result = {} } = e.detail || {}
      if (refreshCar == true) {
        this.dealRequestResult(result);
      }
      this.setData({
        showModify: false
      })
    },
    onRefreshCart(e) {
      let { result = {}, flags = '' } = e.detail || e
      this.dealRequestResult(result, flags);
    },
    resolveEmpty(params) {
      let newObj = {}
      Object.keys(params).forEach(item => {
        if (params[item] !== '' && params[item] !== null && params[item] !== undefined) {
          newObj[item] = params[item]
        }
      })
      return newObj
    },
    generatePv(pageSource) {
      let clickpar = {}
      switch (pageSource) {
        case 'store':
          clickpar = {
            'storeId': this.data.storeId,
            'ref_par': {
              pageId: this.data.prePageId
            }
          }
          break;
        case 'productDetail':
          clickpar = {
            'storeId': this.data.storeId,
            'skuId': this.data.productId,
            'ref_par': {
              pageId: this.data.prePageId
            }
          }
          break;
        case 'activityDetail':
        case 'storeActDetail':
          clickpar = {
            'storeId': this.data.storeId,
            'activityId': this.data.activityId,
            'ref_par': {
              pageId: this.data.prePageId
            }
          }
          break;
        case 'storeSearchResult':
        case 'storeListByKey':
          clickpar = {
            'storeId': this.data.storeId,
            'keyword': this.data.keyword,
            'searchType': this.data.searchType,
            'ref_par': {
              pageId: this.data.prePageId
            }
          }
          break;
        case 'couponGoodsList':
          clickpar = {
            'storeId': this.data.storeId,
            'couponId': this.data.couponId,
            'activityCode': this.data.activityCode,
            'markState': this.data.markState,
            'orgCode': this.data.orgCode,
            'ref_par': {
              pageId: this.data.prePageId
            }
          }
          break;
        default:
          break;
      }
      return clickpar
    },
    showVM() {
      if (this.data.showVlayer) {
        this.setData({
          showVlayer: false
        })
      } else {
        wx.showLoading()
        let buried = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
        this.getVlayerData().then(res => {
          wx.hideLoading()
          let infos = res
          if (infos) {
            //假如购物车弹层此时已经弹起需要先关闭购物车
            if (this.data.isHideCartInfo == false) {
              this.hideCartInfo().then(res => {
                if (res) {
                  this.setData({
                    showVlayer: true,
                    vlayerInfo: infos
                  })
                }
              })
            } else {
              this.setData({
                showVlayer: true,
                vlayerInfo: infos
              })
            }
            // 上报v+弹层埋点
            let layerType = 'memberLayer'
            for (let i = 0; i < infos.floor.length; i++) {
              if (infos.floor[i].style == 'combo' && infos.floor[i].models.length > 0) {
                layerType = 'memberPackageLayer'
              }
            }
            let { vplusEstimatedPriceVo: { vpType = '' } } = this.data.data || {}
            clickBuriedV2_({
              click_id: 'showLayer',
              click_par: {
                storeId: this.data.storeId,
                memType: '2',
                layerType: layerType,
                vpType
              },
              currentPageName: buried.currentPageName,
              prePageName: buried.prePageName,
              pageId: buried.pageIdFirstPage
            })
          }
        }).catch(() => {
          wx.hideLoading()
        })
        clickBuriedV2_({
          click_id: 'clickMember',
          click_par: {
            storeId: this.data.storeId,
            memType: '2',
            position: 'bottom'
          },
          currentPageName: buried.currentPageName,
          prePageName: buried.prePageName,
          pageId: buried.pageIdFirstPage
        })
      }
    },
    // 选择套餐
    selectSeat(e) {
      mp.loading();
      const { type, beforeCheck, status } = e.detail
      let buried = this.getBuriedObj()
      let { vplusEstimatedPriceVo: { vpType = '' } } = this.data.data || {}
      clickBuriedV2_({
        click_id: 'clickLayer',
        create_time: new Date(),
        click_par: {
          layerType: 'memberPackageLayer',
          type: type,
          storeId: this.data.storeId,
          memType: 2,
          status: status ? 0 : 1,
          vpType
        },
        currentPageName: buried.currentPageName,
        prePageName: buried.prePageName,
        pageId: buried.pageIdFirstPage
      })

      let { functionId, appVersion } = FNIDS.cartGetVPlusPost
      let { vplusEstimatedPriceVo: { addVPlusNum = '', discountAmount = 0, vipEstimatedPriceVoList = {} } = {} } = this.data.data || {}
      request({
        functionId,
        method: 'POST',
        body: {
          positionType: 2,
          fromSource: 5,
          cartType: 10,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          pageSource: this.data.pageSource || '',
          refPageSource: this.data.refPageSource,
          discountAmount: discountAmount,
          addVPlusNum: addVPlusNum,
          check: type,
          vipEstimatedPriceVoList,
          beforeCheck
        },
        appVersion,
      }).then(res => {
        mp.hideLoading();
        let { code = '', result = null } = res.data || {}
        if (code == 0) {
          this.dealRequestResult(result.singleCartResult);
          this.setData({
            vlayerInfo: result.vipPageResult
          })
          if (result.pageStyle == 2) {
            wx.showToast({
              title: result.singleCartResult.vplusEstimatedPriceVo.estimatedPriceTitleStyleVo.iconText,
              icon: "none",
              duration: 3000
            });
          }
        } else {
          if (code == 50904 || code == 50905 || code == 50906) {
            this.setData({
              showVlayer: false
            })
            this.dealRequestResult(result.singleCartResult);
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000
            });
          } else {
            // todo data.msg
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000
            });
          }
        }
      }).catch(() => {
        mp.hideLoading();
      })
    },
    // 开关选项
    vschange(e) {
      let { type, status } = e.detail
      let buried = this.getBuriedObj()
      clickBuriedV2_({
        click_id: 'clickLayer',
        create_time: new Date(),
        click_par: {
          layerType: 'memberLayer',
          type: type,
          storeId: this.data.storeId,
          memType: 2,
          status: status
        },
        currentPageName: buried.currentPageName,
        prePageName: buried.prePageName,
        pageId: buried.pageIdFirstPage
      })

      let { vplusEstimatedPriceVo: { addVPlusNum = '', discountAmount = 0, vipEstimatedPriceVoList = {} } = {} } = this.data.data || {}
      this.setData({
        showVlayer: false
      }, () => {
        let { functionId, appVersion } = FNIDS.cartGetVPlusPost
        request({
          functionId,
          method: 'POST',
          body: {
            positionType: 2,
            fromSource: 5,
            cartType: 10,
            orgCode: this.data.orgCode,
            storeId: this.data.storeId,
            pageSource: this.data.pageSource || '',
            refPageSource: this.data.refPageSource,
            discountAmount: discountAmount,
            addVPlusNum: addVPlusNum,
            check: type,
            vipEstimatedPriceVoList
          },
          appVersion,
        }).then(res => {
          let { code = '', result = null } = res.data || {}
          if (code == 0) {
            this.dealRequestResult(result.singleCartResult);
            this.setData({
              vlayerInfo: result.vipPageResult
            })
            if (type == 0) return
            let iconText = result.singleCartResult.vplusEstimatedPriceVo.estimatedPriceTitleStyleVo.iconText
            if (!iconText) return
            wx.showToast({
              title: iconText,
              icon: 'none',
              duration: 2500
            })
          }
        }).catch((err) => {
          console.log(err);
         })
      })
    },
    // 获取v+楼层信息
    getVlayerData() {
      return new Promise((resolve, reject) => {
        let { functionId, appVersion } = FNIDS.cartGetVPlusSetMeal
        let { vplusEstimatedPriceVo: { addVPlusNum = '', discountAmount = 0, vipEstimatedPriceVoList = {}, check = '0' } = {} } = this.data.data || {}
        request({
          functionId,
          method: 'POST',
          isNeedDealError: true,
          body: {
            addVPlusNum,
            discountAmount,
            cartType: 10,
            orgCode: this.data.orgCode,
            storeId: this.data.storeId,
            pageSource: this.data.pageSource || '',
            refPageSource: this.data.refPageSource,
            vipEstimatedPriceVoList,
            check
          },
          appVersion,
          pageId: this.data.pageId
        }).then(res => {
          let { code = '', result = null } = res.data
          if (code == 0) {
            resolve(result)
          } else {
            wx.showToast({
              title: res.data.msg || '',
              icon: 'none',
              duration: 2500
            })
          }
        }).catch(err => { reject(err) })
      })
    },
    generateSel(name) {
      let selector = ''
      switch (name) {
        case 'storeinfo':
          selector = '#store >>> #minicart'
          break;
        case 'active':
        case 'storeactivity':
          selector = '#floor >>> #minicart'
          break;
        case 'couponTogether':
        case 'feedRecGoods':
        case 'goodsinfo':
        case 'NewCouponBuy':
        case 'coupon_buy':
        case 'coupon_buySearchResult':
        case 'store_search':
        case 'StoreHomeActivity':
        case 'StoreSuitList':
          selector = '#minicart'
          break;
        default:
          break;
      }
      return selector
    },
    reportMonitor(id, keys, infos) {
      wx.reportMonitor(id, 10)
      let PDJ_H5_PIN = app.globalData.loginStateInfo.PDJ_H5_PIN || '未知';
      let deviceid_pdj_jd = util.getUUIDMD5();
      addFilterMsg(keys)
      addFilterMsg(deviceid_pdj_jd)
      addFilterMsg(PDJ_H5_PIN)
      error(infos);
    },
    getBuriedObj() {
      let buried = this.data.isHideCartInfo !== false && !this.data.noEmeit ? this.data.preBuried : this.data.recommendObj
      return buried
    },

    // 去结算
    billImplDrugSkuPop(popupWindow) {
      let buried = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
      this.setData({
        showDrugSkuPop: true,
        drugSkuPopData: {
          ...popupWindow,
          buried,
          storeId: this.data.storeId
        }
      }, () => {
        const { type } = this.data.drugSkuPopData
        let btnType = ''
        switch (type) {
          case 1:
            btnType = 'buyDrugTogether'
            break;
          case 2:
            btnType = 'freePrescription'
            break;
          case 3:
            btnType = 'editSkuCnt'
            break;
          default:
            btnType = 'deleteSku'
            break;
        }
        clickBuriedV2_({
          click_id: 'showLayer',
          click_par: {
            storeId: this.data.storeId,
            type: btnType
          },
          currentPageName: buried.currentPageName,
          prePageName: buried.prePageName,
          pageId: buried.pageIdFirstPage
        })
      })
    },
    // 加减车弹层
    handlePrescriptions(e) {
      const subItem = e.detail.subItem || {}
      const source = e.detail.source || null
      let { functionId, appVersion } = FNIDS.cartPrescriptionPopupPost
      request({
        functionId,
        method: 'POST',
        isNeedDealError: true,
        body: {
          popupType: e.detail.type,
          prescriptionId: subItem.prescriptionTag && subItem.prescriptionTag.prescriptionId,
          skuId: subItem.skuId,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
        },
        appVersion,
        pageId: this.data.pageId
      })
        .then((res) => {
          // res.data.code = '80021'
          if (res.data.code == '80021') {
            wx.showToast({
              title: res.data.msg,
              duration: 2500,
              icon: 'none'
            })
            emitter.emit("confirmChangeSku", {});
          } else {
            let buried = this.data.isHideCartInfo == false ? this.data.recommendObj : this.data.preBuried
            this.setData({
              showDrugSkuPop: true,
              drugSkuPopData: {
                ...res.data.result,
                type: res.data.result.popupType == 1 ? 3 : 4,
                source,
                buried,
                storeId: this.data.storeId
              }
            }, () => {
              const { type } = this.data.drugSkuPopData
              let btnType = ''
              switch (type) {
                case 1:
                  btnType = 'buyDrugTogether'
                  break;
                case 2:
                  btnType = 'freePrescription'
                  break;
                case 3:
                  btnType = 'editSkuCnt'
                  break;
                default:
                  btnType = 'deleteSku'
                  break;
              }
              clickBuriedV2_({
                click_id: 'showLayer',
                click_par: {
                  storeId: this.data.storeId,
                  type: btnType
                },
                currentPageName: buried.currentPageName,
                prePageName: buried.prePageName,
                pageId: buried.pageIdFirstPage
              })
            })
          }
        })
        .catch((err) => {
          console.log(err, 'err')
        });

    },
    // 关闭弹层
    closeDrugSkuPop() {
      this.setData({
        showDrugSkuPop: false,
      })
    },
    // 一起购买
    buyTogether(e) {
      // 勾选和取消勾选商品
      let data = e.detail.drugSkuPopData;
      let isAdd = true;
      let skus = [];
      data.list.forEach((item) => {
        if (item.skuInfoVOList.length) {
          item.skuInfoVOList.forEach(sku => {
            skus.push({
              id: sku.skuId,
              num: ''
            })
          })
        }
      })

      let functionId = FNIDS.checkMultiItem.functionId;
      let appVersion = FNIDS.checkMultiItem.appVersion;
      request({
        functionId,
        method: 'POST',
        pageId: this.data.pageId,
        body: {
          chgNumReturnType: 0,
          isAdd: isAdd,
          isReturnCart: true,
          lat: this.data.latitude,
          lng: this.data.longitude,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          positionType: "2",
          skus,
          cartOpenFlag: true,
          fromSource: 5,
          pageSource: this.data.pageSource || "",
          refPageSource: this.data.refPageSource,
          cartType: this.data.cartType,
          ref_par: this.data.refPar
        },
        appVersion,
      })
        .then((res) => {
          let result = res.data.result;
          if (result) {
            this.closeDrugSkuPop()
            this.onRefreshCart({ result, flags: false })
            this.triggerEvent(
              "miniCartWidgetEvent",
              {
                type: "miniCartCheckToggle",
                data: {},
              },
              { composed: true, bubbles: true }
            );

          }
        })
        .catch(() => { });
    },
    // 确认修改
    confirmChangeSku() {
      this.closeDrugSkuPop();
      emitter.emit("confirmChangeSku", {});
    },
    // 确认删除
    confirmDelSku() {
      this.closeDrugSkuPop()
      emitter.emit("confirmChangeSku", {});
    }
  }
});