/* eslint-disable camelcase */
/* eslint-disable no-mixed-spaces-and-tabs */

import {
  request,
  FNIDS
} from '../../../../common/util/api'
import mp from "../../../../common/util/wxapi";
import util from "../../../../common/util/util";
import Spu from './Spu'
import {
  updatePageNums,
  _changeItemNum,
  _getCartInfo
} from "../../../../common/util/carService";
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
import emitter from "../../../../common/util/events";
import { djCmsJump, mpCmsJump } from "../../../../common/util/agreementV2.js"
import djBus from "../../../../common/util/djBus";
import publicMethod from "../../../../common/util/public";

let app = getApp();
let animation = null;

/**
 * 事件类型
 */
let TYPE = {
  // addCart
  addCart: 'add'
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeInfo: {
      type: Object,
      value: ""
    },
    //   降价提醒标识
    showPriceRemind: {
      type: Boolean,
      value: ""
    },
    //   开启状态
    // priceRemind: {
    //   type: Boolean,
    //   value: "",
    // },
    // 门店id
    storeId: {
      type: String,
      value: ""
    },
    // 商家id
    orgCode: {
      type: String,
      value: ""
    },
    // 多规格商品id
    spuId: {
      type: String,
      value: ""
    },
    // 商品id
    skuId: {
      type: String,
      value: ""
    },
    // 展示spu规格选择
    toggle: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        setTimeout(() => {
          let name = this.data.showPriceRemind
            ? "priceRemindLayer"
            : "ExposureSpuGoods";
          if (newVal) {
            this.setData({
              isInit: true
            })
            this.getSpuData();
            // 动画
            animation.bottom(0).step();

            // 埋点
            djBus.once("mask_spu", (data) => {
              this.setData(
                {
                  recommendObj: {
                    prePageName: data && data.currentPageName,
                    currentPageName: name,
                    pageSource: data && data.pageSource,
                    refPageSource: data && data.refPageSource,
                    pageIdFirstPage: util.getPageIdrandom()
                  }
                },
                () => {
                  let selector = "#spu-selector";
                  if (data.currentPageName == "storeinfo") {
                    selector = "#store >>> #spu-selector";
                  }
                  if (data.currentPageName == "active") {
                    selector = "#floor >>> #spu-selector";
                  }
                  this.pvFunc();
                  const pageList = getCurrentPages();
                  const route =
                    (pageList &&
                      pageList.length &&
                      pageList[pageList.length - 1].route) ||
                    "";
                  const prePageId = this.data.pageId || "";
                  emitter.emit(`halfMaskFunc_${route}_${name}_${prePageId}`, {
                    name: name,
                    type: "open",
                    selector: selector, // 用于页面找打半弹层
                    buriedObj: this.data.recommendObj
                  });
                }
              );
            });
          } else {
            // 动画
            animation.bottom(this.data.contentHeight).step();

            let { currentPageName = "" } = this.data.recommendObj || {};
            // 埋点
            let selector = "#spu-selector";
            if (currentPageName == "storeinfo") {
              selector = "#store >>> #spu-selector";
            }
            if (currentPageName == "active") {
              selector = "#floor >>> #spu-selector";
            }
            const pageList = getCurrentPages();
            const route =
              (pageList &&
                pageList.length &&
                pageList[pageList.length - 1].route) ||
              "";
            const prePageId = this.data.pageId || "";
            emitter.emit(`halfMaskFunc_${route}_${name}_${prePageId}`, {
              name: name,
              type: "close",
              selector: selector, // 用于页面找打半弹层
              buriedObj: this.data.recommendObj
            });
          }
          this.setData({
            animationData: animation.export(),
            anchorId: "select",
            skuProcessServiceCode: ""
          });
        }, 10);
      }
    },
    couponId: {
      type: String,
      value: ""
    },
    // 外部投放的促销渠道
    outPromotion: {
      type: String,
      value: ""
    },
    // 单品单结参数
    singleSettle: {
      type: Boolean,
      value: false
    },
    modelButtonType: {
      type: Number,
      value: 0
    },
    // 套装id
    activityId: {
      type: String,
      value: ""
    },
    // 0： 官方标配 1: 合约机
    treatyType: {
      type: Number,
      value: 0
    },
    userAction: {
      type: String,
      value: ""
    },
    preTraceId: {
      type: String,
      value: ""
    },
    pageId: {
      type: String,
      value: ""
    },
    refPar: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ""
    },
    biPageName: {
      type: String,
      value: ""
    },
    pageIsGetInfoOnShow: {
      type: Boolean,
      value: false
    },
    optionsPos: {
      type: Object,
      value: {}
    },
    // 扩展参数，用于标识特殊品类品如鲜活
    transmitData: {
      type: Object,
      value: {}
    },
    showModel: {
      type: Number,
      value: 0
    },
    carNumber: {
      type: Number,
      value: 0
    },
    weighting: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 降价提醒开启短信默认开启
    priceRemind: true,
    // 是否是iphoneX
    isIpx: false,
    // 内容高度
    contentHeight: 0,
    // 商品规格选项列表
    selectionList: [],
    // 选择提示文案
    selectionGuide: "",
    // sku商品信息
    skuDetail: {},
    // spu实例
    // 百度小程序构建实例不能在data中定义属性名称,否则会触发两次监听导致原型链上的方法丢失,故暂时注释掉
    // spu: null,
    // 购物车数量
    cartNum: 1,
    // 动画
    animationData: {},
    // 电话
    mobile: "",
    // 提示
    topDesc: "",
    // 手机增值服务
    addedValueGroupList: [],
    // 手机增值服务映射关系表
    skuAddedValueList: [],
    // 满足规格的sku商品信息
    choosedSku: "",
    majorSkuId: "", // 用于显示主skuid下的增值服务
    suitTitle: "", // 优惠套装标题
    suitLandList: [], // 优惠套装列表
    hasSelectedAdded: null, // 已经选中的增值服务id
    hasSelectedSuit: null, // 已经选中的套装id
    anchorId: "",
    treatyType: 0, // 合约机or官方标配
    skuSaleAttrValueList: [],
    goodProcessList: [], // 8.26新增所有sku对应的鲜活服务列表
    processServiceList: null, // 当前选中的sku的鲜活加工服务楼层标题
    curGoodProcessTitle: "", // 当前选中的sku的鲜活加工服务列表
    skuProcessServiceCode: "", // 当前选择的具体加工服务值，加车和去结算需要带过去
    isInit: true,
	  // 预售订阅相关
	  showSubscribe: false,
	  subscribeImg: "",
	  tmIds: [
      "oglvNUuESMzFISc5tCdVV8xjk92ZpbOY057_tOG-W4Q"
	  ],
	  showSubscribeSuccessPop: false
  },
  observers: {
    choosedSku: function (val) {
      let addedValueGroupList = this.data.addedValueGroupList || []; // 全部增值服务列表
      let skuAddedValueList = this.data.skuAddedValueList || []; // 增值服务和商品skuId映射关系
      let goodProcessList = this.data.goodProcessList || []; // 全部的鲜活加工服务列表
      // 当前已经选中了对应的skuId
      if (val && typeof val == "object") {
        this.fetchSuitList(val.skuId); // 确定了sku后请求对应sku下的套装
        let addValueItem = skuAddedValueList.find((item) => {
          return item.skuId == val.skuId;
        });

        // 增值服务
        addedValueGroupList.forEach((item) => {
          item.hideGroup = true;
          if (addValueItem) {
            for (const key in addValueItem.groupAddedValue) {
              if (item.groupId == key) {
                item.hideGroup = false;
                item.addedValueList.forEach((subItem) => {
                  if (
                    addValueItem.groupAddedValue[key].indexOf(subItem.skuId) >
                    -1
                  ) {
                    subItem.canUse = true;
                    subItem.selected = false;
                  } else {
                    subItem.canUse = false;
                    subItem.selected = false;
                  }
                });
              }
            }
          }
        });
        // 鲜活加工服务
        let curSkuGoodProcessList = goodProcessList.find((item) => {
          return item.skuId == val.skuId;
        });
        curSkuGoodProcessList &&
          curSkuGoodProcessList.processServiceList.forEach((item) => {
            item.selected = false;
          });
        this.setData({
          addedValueGroupList: addedValueGroupList,
          hasSelectedSuit: null,
          hasSelectedAdded: null,
          intervalPrice: false,
          skuProcessServiceCode: "",
          processServiceList:
            (curSkuGoodProcessList &&
              curSkuGoodProcessList.processServiceList) ||
            [],
          curGoodProcessTitle:
            (curSkuGoodProcessList && curSkuGoodProcessList.processTitle) || ""
        });
      } else {
        this.data.suitLandList && this.data.suitLandList.forEach((ele) => {
          ele.selected = false;
        });
        // 价格是否展示“起”字
        this.setData({
          intervalPrice: true,
          processServiceList: null,
          curGoodProcessTile: "",
          hasSelectedSuit: null,
          suitLandList: this.data.suitLandList
        });
      }
    },
    hasSelectedSuit: function (val) {
      if (val && val.length > 0) {
        this.data.addedValueGroupList.forEach((item) => {
          item.addedValueList.forEach((subItem) => {
            subItem.canUse = false;
          });
        });
        this.setData({
          addedValueGroupList: this.data.addedValueGroupList
        });
      }
    }
  },
  attached () {
    let height = app.globalData.systemInfo.screenHeight || 600;
    this.setData({
      contentHeight: -height * 0.8,
      isIpx: app.globalData.isIpx
    });
    // 创建购物车动画
    animation = wx.createAnimation({
      duration: 350,
      timingFunction: "ease"
    });
  },
  pageLifetimes: {
    show () { }
  },
  methods: {
    catchtouchmove () {
      return false;
    },
    // 获取spu规格数据
    getSpuData () {
      let { functionId = "", appVersion = "" } = FNIDS.spuSelect || {};
      let method = "POST";
      const { singleSettle } = this.data;
      if (this.data.showPriceRemind) {
        functionId = FNIDS.noticePrice.functionId;
        appVersion = FNIDS.noticePrice.appVersion;
        method = "GET";
      }
      request({
        functionId,
        appVersion,
        method: method,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          spuId: this.data.spuId || "",
          skuId: this.data.skuId || "",
          singleSettle: this.data.activityId ? false : singleSettle, // 从商详页套装楼层点击购买套装弹出spu时singleSettle还是用的商详页下发的singleSettle,是不对的
          treatyType: this.data.treatyType,
          pageSource: this.data.pageSource || "",
          refPageSource: this.data.refPageSource || "",
          ref_par: this.data.refPar,
          ...(this.data.transmitData || {})
        },
        pageId: this.data.pageIdFirstPage || "",
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {
          let result = res.data.result;
          if (result) {
            let spu = new Spu(
              result,
              this.data.showPriceRemind,
              this.data.spuId
            );

            this.setData({
              topDesc: result.topDesc || "",
              mobile: result.mobile || "",
              noticeInfo: result.skuDetailResult || null,
              // spu实例
              spu: spu,
              // sku商品信息
              skuDetail: spu._detail,
              // 商品规格选项列表
              selectionList: spu._selection,
              // 选择提示文案
              selectionGuide: spu.getTextOfSelected(),
              // 全部增值服务列表
              addedValueGroupList: spu._addedValueGroupList || [],
              // 全部商品对应的增值服务映射表
              skuAddedValueList: result.skuAddedValueList || [],
              addedValueTitle: result.addedValueTitle || "",
              majorSkuId:
                result.spuDetailResult && result.spuDetailResult.skuId,
              // 优惠套装标题
              suitTitle:
                (result.spuDetailResult &&
                  result.spuDetailResult.suitLandInfo &&
                  result.spuDetailResult.suitLandInfo.title) ||
                "",
              skuSaleAttrValueList: result.skuSaleAttrValueList || [],
              goodProcessList: result.goodProcessList || [],
              spuDetail: result.spuDetailResult || {}
            });
            // 获取默认选中 触发点击事件
            if (
              result.skuSaleAttrValueList &&
              result.skuSaleAttrValueList.length
            ) {
              result.skuSaleAttrValueList.forEach((item) => {
                if (item.skuId == result.spuDetailResult.skuId) {
                  let checkdata = item.attrValue || {}; // 这个是 默认选中的参数
                  // 如果没有item.attrValue，则无法渲染规则选项楼层（sku打开鲜活服务弹层时会出现）
                  if (!checkdata || JSON.stringify(checkdata) == "{}") {
                    let getChoosedSku = this.data.spu.getChoosedSku();
                    this.setData({
                      skuDetail: getChoosedSku,
                      choosedSku: getChoosedSku,
                      selectionGuide: ""
                    });
                  } else {
                    for (let key in checkdata) {
                      var itemdata = {};
                      itemdata.id = key;
                      itemdata.subId = checkdata[key];
                      this.clickItem(itemdata);
                    }
                  }
                }
              });
            }
          }
        })
        .catch((err) => {
          console.log("===selector err===", err);
        });
    },
    // 关闭spu选择器
    closeSpuSelector () {
      this.setData({
        cartNum: 1,
        toggle: false
      });
      this.triggerEvent("spuSelectorEvent", {
        type: "closeSpu"
      });
    },
    // 点击spu规格项
    clickItem (e) {
      let dataSet = e.id ? e : e.currentTarget.dataset;
      let id = dataSet.id;
      let subId = dataSet.subId;
      //  如果不可点，则不能点击
      let item = dataSet.item
      let isClick = dataSet.isClick
      if (isClick && !item.canUse) return
      // 获取规格列表
      let toggleAttr = this.data.spu.toggle(id, subId);
      // 获取满足规格的sku商品信息
      let getChoosedSku = this.data.spu.getChoosedSku();
      // 选择提示文案
      let getTextOfSelected = this.data.spu.getTextOfSelected();
      this.setData({
        selectionList: toggleAttr || [],
        selectionGuide: getTextOfSelected,
        skuDetail:
          typeof getChoosedSku === "object"
            ? getChoosedSku
            : this.data.spu._detail,
        choosedSku: getChoosedSku
      });
      // if (toggleAttr) {
      //   this.setData({
      //     selectionList: toggleAttr,
      //     selectionGuide: getTextOfSelected,
      //     skuDetail:
      //       typeof getChoosedSku === "object"
      //         ? getChoosedSku
      //         : this.data.spu._detail,
      //     choosedSku: getChoosedSku,
      //   });
      // }
    },
    // 点击加车按钮
    clickAdd (e) {
      let num = e.currentTarget.dataset.num;
      if (
        !this.data.skuDetail ||
        this.data.skuDetail.stockCount === undefined ||
        this.data.skuDetail.stockCount === null
      ) {
        mp.toast({
          title: "库存就剩这么多啦，我们会尽快补货！"
        });
        return;
      }
      if (num < this.data.skuDetail.stockCount) {
        this.setData({
          cartNum: ++num
        });
      } else {
        mp.toast({
          title: "库存就剩这么多啦，我们会尽快补货！"
        });
      }
    },
    // 点击减车按钮
    clickMin (e) {
      let num = e.currentTarget.dataset.num;
      if (num > 1) {
        this.setData({
          cartNum: --num
        });
      }
    },
    // 添加购物车
    addCart (e) {
      let sku = this.data.spu && this.data.spu._sku;
      const { button = {} } = e.target.dataset;
      const { modelButtonType } = this.data;
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};

	  console.log("currentPageName,",this.data.recommendObj)

	   //   预售新增
	   if(button.buttonType == 4) {
      let {skuDetail = {}, spuId = '', storeId = ''} = this.data
      let {preSaleInfo = {}} = skuDetail
      clickBuriedV2_({
        click_id: "clickPreSellRemind",
        click_par: {
          skuId: sku.skuId,
          spuId: spuId,
          storeId: storeId,
          promotionId: preSaleInfo.promotionId
        },
        pageId: pageIdFirstPage || "",
        currentPageName: this.data.showPriceRemind
          ? "priceRemindLayer"
          : "ExposureSpuGoods",
        prePageName: prePageName || ""
      });
      if(util.isLogin()){
        // 调订阅
        this.goSubscrbe()
        return
      }else{
        mpCmsJump({
          pageType: "p56",
          preObj: this.data.recommendObj,
          buried_position: {
            fromPositon: this.data.fromPositon || ""
          }
          });
      }
      }
      //   已订阅
      if(button.buttonType == 5) {
        return
      }

      if (
        this.data.skuSaleAttrValueList &&
        this.data.skuSaleAttrValueList.length == 0
      )
        return;
      if (typeof sku === "string") {
        // 提示选择规格
        mp.toast({
          title: sku
        });
        return;
      }
      // 用户未选点击加车按钮无法加车且toast提示：请选择加工服务
      let { processServiceList, skuProcessServiceCode } = this.data || {};
      if (
        processServiceList &&
        processServiceList.length &&
        !skuProcessServiceCode
      ) {
        mp.toast({
          title: "请选择加工服务"
        });
        return;
      }
      // 加车 增值服务
      let skuServiceList = [];
      this.data.addedValueGroupList &&
        this.data.addedValueGroupList.forEach((item) => {
          item.addedValueList.forEach((subItem) => {
            if (subItem.selected) {
              skuServiceList.push({
                categoryId: subItem.groupId || null,
                skuId: subItem.skuId || null,
                storeId: subItem.storeId || ""
              });
            }
          });
        });
      // 套装
      let suitInfoList = [];
      let activityId = "";
      if (this.data.suitLandList) {
        this.data.suitLandList.forEach((item) => {
          if (item.selected) {
            item.skuInfoList.forEach((suitItem) => {
              suitInfoList.push({ id: suitItem.skuId, num: suitItem.skuCount });
            });
            activityId = item.activityId || "";
          }
        });
      }
      // 埋点
      clickBuriedV2_({
        click_id: "click_add",
        click_par: {
          skuId: sku.skuId,
          spuId: this.data.spuId,
          storeId: this.data.storeId,
          processServiceValue: this.data.skuProcessServiceCode || "",
          type:
            (button.buttonType == 2 && button.buttonEnable) ||
              (button.buttonType == 3 && modelButtonType !== 1)
              ? "buyNow"
              : "addCart"
        },
        pageId: pageIdFirstPage || "",
        currentPageName: this.data.showPriceRemind
				? "priceRemindLayer"
				: "ExposureSpuGoods",
        prePageName: prePageName || ""
      });
      // 预售交定金
      if (button.buttonType == 2 && button.buttonEnable) {
        let { functionId = "", appVersion = "" } = FNIDS.preSellVerify || {};
        const {
          cartNum = "",
          storeId = "",
          orgCode = "",
          spuId = "",
          storeInfo: { storeName = "" } = {},
          choosedSku = {},
          skuProcessServiceCode
        } = this.data;
        request({
          functionId: functionId,
          appVersion: appVersion,
          isNeedDealError: true,
          method: "POST",
          body: {
            storeId: storeId || "",
            orgCode: orgCode || "",
            skus: [
              {
                id: choosedSku.skuId || "",
                num: cartNum || 1,
                spuId: spuId || ""
              }
            ],
            fromSource: 5,
            pageSource: "productDetail"
          },
          pageId: this.data.pageIdFirstPage,
          preObj: this.data.recommendObj || {}
        })
          .then((res) => {
            if (res.data && res.data.code == 0) {
              const preSaleSkuInfos = [
                {
                  skuCount: cartNum,
                  skuId: choosedSku.skuId,
                  spuId,
                  skuProcessServiceCode: skuProcessServiceCode || ""
                }
              ];
              djCmsJump({
                to: "Settlement",
                params: {
                  storeId,
                  orgCode,
                  storeName,
                  saleType: 2,
                  preSaleSkuInfos: JSON.stringify(preSaleSkuInfos)
                },
                preObj: this.data.recommendObj,
                buried_position: {
                  fromPositon: this.data.fromPositon || ""
                }
              });
            } else {
              wx.showToast({
                title: res.data && res.data.msg,
                icon: "none"
              });
            }
          })
          .catch((err) => {
            wx.showToast({
              title: (err.data && err.data.msg) || '失败',
              icon: "none"
            });
          });
        return;
      }
      if (button.buttonType == 3 && modelButtonType !== 1) {
        if (util.isLogin()) {
          const { functionId, appVersion } = FNIDS.verifySettleForSkuList;
          const {
            cartNum = "",
            storeId = "",
            orgCode = "",
            spuId = "",
            storeInfo: { storeName = "" } = {},
            choosedSku = {},
            skuProcessServiceCode = ""
          } = this.data;
          request({
            functionId,
            appVersion,
            method: "POST",
            body: {
              refPageSource: "Settlement",
              storeId: storeId,
              orgCode: orgCode,
              skuList: [
                {
                  spuId: spuId,
                  id: choosedSku.skuId,
                  num: cartNum
                }
              ],
              fromSource: 2,
              verifyResource: 1,
              pageSource: "productDetail",
              ref: "settlementinfo",
              ctp: "goodsinfo"
            },
            pageId: this.data.pageIdFirstPage,
            preObj: this.data.recommendObj || {}
          })
            .then((res) => {
              const { data: { code } = {} } = res;
              if (code == 0) {
                const preSaleSkuInfos = [
                  {
                    skuCount: cartNum,
                    skuId: choosedSku.skuId,
                    spuId,
                    skuServiceList,
                    skuProcessServiceCode: skuProcessServiceCode || ""
                  }
                ];
                djCmsJump({
                  to: "Settlement",
                  params: {
                    storeId,
                    orgCode,
                    storeName,
                    saleType: 5,
                    preSaleSkuInfos: JSON.stringify(preSaleSkuInfos)
                  },
                  preObj: this.data.recommendObj,
                  buried_position: {
                    fromPositon: this.data.fromPositon || ""
                  }
                });
                // wx.navigateTo({
                //   url: `/pages/settlementV2/index?storeId=${storeId}&orgCode=${orgCode}&storeName=${storeName}&saleType=5&preSaleSkuInfos=${JSON.stringify(
                //     preSaleSkuInfos
                //   )}`,
                // });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          mpCmsJump({
            pageType: "p56",
            preObj: this.data.recommendObj,
            buried_position: {
              fromPositon: this.data.fromPositon || ""
            }
          });
          // wx.navigateTo({
          //   url: `/pages/newLogin/login/login`,
          // });
        }
        return;
      }
      sku.skuServiceList = skuServiceList || [];
      sku.suitInfoList = suitInfoList;
      sku.activityId = activityId;
      this.requestAddCart(sku)
        .then((res) => {
          let { code, result = {}, msg = "" } = res.data;
          if (
            code == "0" ||
            code == "88888" ||
            code == "80011" ||
            code === "80012"
          ) {
            let carNumMap = result.spuNumMap || {};
            let item = {};
            //  套装
            if (sku.suitInfoList.length > 0) {
              result.itemList &&
                result.itemList.forEach((ele) => {
                  if (
                    ele.suitType == "combination" &&
                    ele.activityId == sku.activityId
                  ) {
                    item = ele;
                  }
                });
              this.triggerEvent("spuSelectorEvent", {
                type: TYPE.addCart,
                data: {
                  activityId: item.activityId || "",
                  cartNum:
                    item.combinationSkuInfo && item.combinationSkuInfo.cartNum,
                  storeId: this.data.storeId || "",
                  orgCode: this.data.orgCode || ""
                }
              });
              updatePageNums({
                type: TYPE.addCart,
                data: {
                  activityId: item.activityId || "",
                  cartNum:
                    item.combinationSkuInfo && item.combinationSkuInfo.cartNum,
                  floorName: "spuSelector",
                  storeId: this.data.storeId || "",
                  orgCode: this.data.orgCode || ""
                }
              });
            } else {
              let carInfo = _getCartInfo(
                this,
                result.itemList || [],
                sku.skuId,
                this.data.cartNum
              );
              this.triggerEvent("spuSelectorEvent", {
                type: TYPE.addCart,
                data: {
                  skuId: sku.skuId || "",
                  spuNum: carNumMap[this.data.spuId] || 0,
                  cartNum: carInfo.cartNum,
                  spuId: this.data.spuId || "",
                  storeId: this.data.storeId || "",
                  orgCode: this.data.orgCode || "",
                  preSellSku: false,
                  curSkuId: sku.skuId || "",
                  cartWeight: carInfo.cartWeight,
                  weighting: this.data.weighting
                }
              });
              updatePageNums({
                type: TYPE.addCart,
                data: {
                  skuId: sku.skuId || "",
                  spuNum: carNumMap[this.data.spuId] || 0,
                  cartNum: carInfo.cartNum,
                  spuId: this.data.spuId || "",
                  floorName: "spuSelector",
                  storeId: this.data.storeId || "",
                  orgCode: this.data.orgCode || "",
                  cartWeight: carInfo.cartWeight,
                  weighting: this.data.weighting
                }
              });
            }
            this.setData({
              toggle: false,
              cartNum: 1
            });
            this.triggerEvent("spuSelectorEvent", {
              type: "closeSpu"
            });
            if (
              code == "0" ||
              code == "88888" ||
              code == "80011" ||
              code === "80012"
            ) {
              setTimeout(() => {
                mp.toast({
                  title:
                    code == "0" ? "加入购物车成功" : msg || "加入购物车成功"
                });
              }, 1000);
            }
          } else {
            setTimeout(() => {
              mp.toast({
                title: (res.data && res.data.msg) || "加入购物车失败"
              });
            }, 1000);

            this.setData({
              toggle: false,
              cartNum: 1
            });
            this.triggerEvent("spuSelectorEvent", {
              type: "closeSpu"
            });
          }
        })
        .catch(() => {
          setTimeout(() => {
            mp.toast({
              title: "加入购物车失败"
            });
          }, 1000);
          this.setData({
            toggle: false,
            cartNum: 1
          });
          this.triggerEvent("spuSelectorEvent", {
            type: "closeSpu"
          });
        });
    },
    beginNotice () {
      if (this.data.spuId) {
        let sku = this.data.spu && this.data.spu._sku;
        if (typeof sku === "string") {
          // 提示选择规格
          mp.toast({
            title: sku
          });
          return;
        }
        this.openNoticePrice({
          skuName: sku.skuName || "",
          skuId: sku.skuId || "",
          majorPrice: sku.majorPrice || ""
        }, 0);
        this.remindAddCart(sku);
      } else {
        this.openNoticePrice({
          skuName: this.data.noticeInfo.skuName || "",
          skuId: this.data.noticeInfo.skuId || "",
          majorPrice: this.data.noticeInfo.majorPrice || ""
        }, 0);
        this.remindAddCart(this.data.noticeInfo);
      }
    },
    // 开启降价||或订阅提醒
    openNoticePrice (sku, businessType) {
      // businessType  1：预热预售  0：降价提醒
	  let {skuDetail = {}} = this.data
	  let {preSaleInfo = {}} = skuDetail
      let { storeName = "", storeId = "" } = this.data.storeInfo || {};
      ({ storeId = "" } = this.data || {})
      let { functionId = "", appVersion = "" } = FNIDS.noticePriceOpen || {};
      let { skuName = "", skuId = "", majorPrice = {} } = sku || {};
      console.log("skuDetail-----", skuDetail, majorPrice.price)

	 let sendMessageFlag = 0 // 是否短信通知
	 if(businessType == 0) {
        sendMessageFlag = this.data.priceRemind ? 1 : 0
	 }
	  request({
        functionId,
        appVersion,
        isNeedDealError: true,
        body: {
          businessType,
          orgCode: this.data.orgCode,
          preSellOpeningTime: preSaleInfo.preSellOpeningTime,
          promotionId: preSaleInfo.promotionId,
          refPrice: majorPrice.price * 100,
          sendMessageFlag: sendMessageFlag,
          skuId: skuId,
          storeId: storeId,
          skuName: skuName,
          storeName: storeName,
          mobilePhone: this.data.mobile,
          mobilePhoneFlag: 1,
          spuId: this.data.spuId,
          pageSource: "productDetail",
          ref: "",
          ctp: "goodsinfo",
          refPageSource: ""
        },
        pageId: this.data.pageIdFirstPage,
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {
          let msg = '开启短信通知失败'
          if(businessType == 1) {
            msg = '订阅失败'
          }
          if (res.data.code == "0") {
            if(businessType == 1) {
			   this.triggerEvent("onNoticeSubscrib", {});
			   this.setData({
                showSubscribeSuccessPop: true
              })
            }else{
              this.triggerEvent("onNoticePrice", {});
			  setTimeout(() => {
				mp.toast({
					title: res.data.msg || msg
				});
			  }, 2000);
            }
          } else {
            setTimeout(() => {
              mp.toast({
                title: res.data.msg || msg
              });
            }, 2000);
          }
        })
        .catch(() => {
          setTimeout(() => {
            mp.toast({
              title: "开启短信通知失败"
            });
          }, 2000);
        });
    },
    // 加购物车
    requestAddCart (sku) {
      let params = {
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        incrementFlag: true,
        allCartSkuNumFlag: false,
        couponId: this.data.couponId || "",
        chgNumReturnType: 0,
        isAdd: true,
        cartOpenFlag: true,
        spuId: this.data.spuId
      };
      if (sku.suitInfoList && sku.suitInfoList.length > 0) {
        params = Object.assign({}, params, {
          combinationSkus: [
            {
              activityId: sku.activityId,
              num: this.data.cartNum,
              skus: sku.suitInfoList
            }
          ]
        });
      } else {
        params = Object.assign({}, params, {
          skus: [
            {
              id: sku && sku.skuId,
              num: this.data.cartNum,
              spuId: this.data.spuId,
              skuServiceList: (sku && sku.skuServiceList) || [],
              skuProcessServiceCode: this.data.skuProcessServiceCode || ""
            }
          ]
        });
      }
      return _changeItemNum(params);
    },
    clickNotice () {
      this.setData({
        priceRemind: !this.data.priceRemind
      });
    },
    // 点击增值服务选项
    clickAddValueItem (e) {
      let { index, subIndex, item = {} } = e.currentTarget.dataset;
      if (!item.canUse) return;

      // 当前点击的服务所在的分组
      let currentGroup = this.data.addedValueGroupList[index].addedValueList;
      currentGroup.forEach((item, index) => {
        // 找到当前点击的，状态取反，其他置为未选中状态
        item.selected = index == subIndex ? !item.selected : false;
      });
      let str = `addedValueGroupList[${index}].addedValueList`;

      let selectedArr = this.data.hasSelectedAdded || [];
      let selectIndex = selectedArr.indexOf(currentGroup[subIndex].skuId);
      if (selectIndex > -1) {
        if (!currentGroup[subIndex].selected) {
          selectedArr.splice(selectIndex, 1);
        }
      } else {
        selectedArr.push(currentGroup[subIndex].skuId);
      }
      this.data.suitLandList.forEach((item) => {
        item.canUse = !(selectedArr.length > 0);
      });

      this.setData({
        [str]: currentGroup,
        hasSelectedAdded: selectedArr,
        suitLandList: this.data.suitLandList
      });
    },
    // 点击服务说明
    jumpTip (e) {
      let skuId = this.data.majorSkuId || "";
      let choosedSku = this.data.choosedSku;
      if (choosedSku && typeof choosedSku == "object") {
        skuId = choosedSku.skuId;
      }
      let { jumpUrl, groupId } = e.currentTarget.dataset.item;
      let url = `${jumpUrl}/skuId:${skuId}`;
      // console.log(url);
      // wx.navigateTo({
      //   url: "/pages/h5/index?url=" + encodeURIComponent(url),
      // });
      djCmsJump({
        to: "web",
        params: {
          url: encodeURIComponent(url)
        },
        preObj: this.data.recommendObj,
        buried_position: {
          fromPositon: this.data.fromPositon || ""
        }
      });
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "clickExplainIcon",
        click_par: {
          spuId: this.data.spuId,
          storeId: this.data.storeId,
          skuId: this.data.skuId,
          iconName: "服务说明",
          categoryId: groupId || "",
        },
        pageId: pageIdFirstPage || "",
        currentPageName: this.data.showPriceRemind
          ? "priceRemindLayer"
          : "ExposureSpuGoods",
        prePageName: prePageName || "",
      });
    },
    // 点击优惠套装选项
    clickSuitItem (e) {
      let { item = {}, index } = e.currentTarget.dataset;
      if (!item.canUse) return;

      let selectedSuit = this.data.hasSelectedSuit || [];
      if (selectedSuit[0] && selectedSuit[0].activityId == item.activityId) {
        selectedSuit.pop();
      } else {
        selectedSuit = [item];
      }
      let obj = {}
      let text = this.data.spu.getTextOfSelected();
      if (selectedSuit.length == 0) {
        obj.selectionGuide = text;
      } else if (this.data.choosedSku && typeof this.data.choosedSku == 'object') {
        obj.selectionGuide = text + "，" + item.suitTitle;
      }
      // 改变套装选中状态
      this.data.suitLandList.forEach((ele, i) => {
        ele.selected = index == i ? !ele.selected : false;
      });
      // 增值服务和套装互斥，选中其一，另一个不可点击
      this.data.addedValueGroupList.forEach((item) => {
        item.addedValueList.forEach((subItem) => {
          subItem.canUse = !(selectedSuit.length > 0);
        });
      });
      this.setData({
        suitLandList: this.data.suitLandList,
        addedValueGroupList: this.data.addedValueGroupList,
        hasSelectedSuit: selectedSuit,
        ...obj
      });

      // 埋点
      if (selectedSuit.length > 0) {
        let sku = this.data.spu && this.data.spu._sku;
        let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
        clickBuriedV2_({
          click_id: "clickSuit",
          click_par: {
            activityId: (selectedSuit[0] && selectedSuit[0].activityId) || "",
            skuId: typeof sku == "string" ? this.data.majorSkuId : sku.skuId,
            spuId: this.data.spuId,
          },
          pageId: pageIdFirstPage || "",
          currentPageName: this.data.showPriceRemind
            ? "priceRemindLayer"
            : "ExposureSpuGoods",
          prePageName: prePageName || "",
        });
      }
    },
    // 获取套装列表
    fetchSuitList (skuId) {
      let { functionId = "", appVersion = "" } = FNIDS.spuSuitInfo || {};
      request({
        functionId,
        appVersion,
        isForbiddenDialog: true,
        isNeedDealError: true,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          spuId: this.data.spuId || "",
          skuId: skuId || "",
          singleSettle: this.data.activityId ? false : this.data.singleSettle, // this.data.singleSettle,
          treatyType: this.data.treatyType
        },
        pageId: this.data.pageIdFirstPage,
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {
          let { code, result = {} } = res.data;
          if (
            code == 0 &&
            result.suitLandList &&
            result.suitLandList.length > 0
          ) {
            result.suitLandList.forEach((item) => {
              item.canUse = true;
            });
            let obj = {
              isInit: false,
              suitLandList: result.suitLandList
            };
            if (this.data.isInit) {
              let selectedSuit = [];
              let selectionGuide = this.data.selectionGuide;
              result.suitLandList.forEach((item) => {
                item.canUse = true;
                if (item.activityId == this.data.activityId) {
                  item.selected = true;
                  selectedSuit = [item];
                  selectionGuide += `，${item.suitTitle}`;
                }
              });
              obj.suitLandList = result.suitLandList || [];
              if (selectedSuit.length > 0) {
                obj.anchorId = "suit";
                obj.hasSelectedSuit = selectedSuit;
              }
              if (
                this.data.choosedSku &&
                typeof this.data.choosedSku == "object"
              ) {
                obj.selectionGuide = selectionGuide;
              }
            }
            this.setData(obj);
            let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
            clickBuriedV2_({
              click_id: "spuSaleAttr/getSpuSaleAttrList",
              click_par: {
                storeId: this.data.storeId || "",
                skuId:
                  (this.data.spu._detail && this.data.spu._detail.skuId) || "",
                spuId: this.data.spuId || "",
                isShowActivity: 1,
              },
              pageId: pageIdFirstPage || "",
              currentPageName: this.data.showPriceRemind
                ? "priceRemindLayer"
                : "ExposureSpuGoods",
              prePageName: prePageName || "",
            });
          } else {
            this.setData({
              suitLandList: [],
              hasSelectedSuit: []
            });
          }
        })
        .catch(() => {
          this.setData({
            suitLandList: [],
            hasSelectedSuit: []
          });
        });
    },
    pvFunc (isHasOpenMask) {
      let { pageIdFirstPage, prePageName } = this.data.recommendObj || {};
      pvBuriedV2_({
        page_par: {
          storeId: this.data.storeId || "",
          skuId: this.data.skuId || "",
          spuId: this.data.spuId || "",
          ref_par: {
            userAction: this.data.userAction || "",
            traceId: this.data.preTraceId || "",
            pageId: this.data.pageId
          }
        },
        pageId: pageIdFirstPage || "",
        currentPageName: this.data.showPriceRemind
          ? "priceRemindLayer"
          : "ExposureSpuGoods",
        prePageName: prePageName || "",
        isBack: isHasOpenMask
      });
    },
    // 降价提醒弹层点击开启，开启提醒同时需要加入购物车
    remindAddCart (sku) {
      // 加车 增值服务
      let skuServiceList = [];
      this.data.addedValueGroupList &&
        this.data.addedValueGroupList.forEach((item) => {
          item.addedValueList.forEach((subItem) => {
            if (subItem.selected) {
              skuServiceList.push({
                categoryId: subItem.groupId || null,
                skuId: subItem.skuId || null,
                storeId: subItem.storeId || ""
              });
            }
          });
        });
      // 套装
      let suitInfoList = [];
      let activityId = "";
      if (this.data.suitLandList) {
        this.data.suitLandList.forEach((item) => {
          if (item.selected) {
            item.skuInfoList.forEach((suitItem) => {
              suitInfoList.push({ id: suitItem.skuId, num: suitItem.skuCount });
            });
            activityId = item.activityId || "";
          }
        });
      }
      sku.skuServiceList = skuServiceList || [];
      sku.suitInfoList = suitInfoList;
      sku.activityId = activityId;
      this.requestAddCart(sku)
        .then((res) => {
          let { code, result = {} } = res.data;
          if (code == "0" || code == "88888") {
            let carNumMap = result.spuNumMap || {};
            let item = {};
            //  套装
            if (sku.suitInfoList.length > 0) {
              result.itemList &&
                result.itemList.forEach((ele) => {
                  if (
                    ele.suitType == "combination" &&
                    ele.activityId == sku.activityId
                  ) {
                    item = ele;
                  }
                });
              updatePageNums({
                type: TYPE.addCart,
                data: {
                  activityId: item.activityId || "",
                  cartNum:
                    item.combinationSkuInfo && item.combinationSkuInfo.cartNum,
                  floorName: "spuSelector",
                  storeId: this.data.storeId || "",
                  orgCode: this.data.orgCode || ""
                }
              });
            } else {
              updatePageNums({
                type: TYPE.addCart,
                data: {
                  skuId: this.data.skuId || "",
                  spuNum: carNumMap[this.data.spuId] || 0,
                  cartNum:
                    this.data.showModel == 0
                      ? this.data.carNumber + this.data.cartNum
                      : this.data.cartNum || "",
                  spuId: this.data.spuId || "",
                  floorName: "spuSelector",
                  storeId: this.data.storeId || "",
                  orgCode: this.data.orgCode || ""
                }
              });
            }
            mp.toast({
              title: "成功加入购物车！"
            });
            this.setData({
              toggle: false,
              cartNum: 1
            });
            this.triggerEvent("spuSelectorEvent", {
              type: "closeSpu"
            });
          } else {
            mp.toast({
              title: res.data.msg || "加入购物车失败~请稍后再试！"
            });
            this.setData({
              toggle: false
            });
            this.triggerEvent("spuSelectorEvent", {
              type: "closeSpu"
            });
          }
        })
        .catch(() => {
          mp.toast({
            title: "加入购物车失败~请稍后再试！"
          });
          this.setData({
            toggle: false
          });
          this.triggerEvent("spuSelectorEvent", {
            type: "closeSpu"
          });
        });
    },
    clickGoodProcess (e) {
      let { index } = e.currentTarget.dataset;
      let list = this.data.processServiceList || [];
      list.forEach((ele, i) => {
        ele.selected = i == index ? !ele.selected : false;
      });
      let process = list.find((ele) => {
        return ele.selected;
      });
      this.setData({
        processServiceList: list,
        skuProcessServiceCode: (process && process.processServiceValue) || ""
      });
    },
    // 订阅消息
    async goSubscrbe () {
      publicMethod.commonSetTmp(this, this.data);
    },
    // 订阅失败
    subscribeMsgFail () {
    },
    // 订阅成功
    async subscribeMsgOk () {
      let sku = this.data.spu && this.data.spu._sku;
      await this.openNoticePrice({
        skuName: sku.skuName || "",
        skuId: sku.skuId || ""
      }, 1)
    },
    // 关闭订阅成功弹层
    closeDialog () {
      this.setData({
        showSubscribeSuccessPop: false
      })
	  this.triggerEvent("spuSelectorEvent", {
        type: "closeSpu"
	  });
    }
  }
});