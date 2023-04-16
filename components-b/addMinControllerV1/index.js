/* eslint-disable no-empty */
/* eslint-disable camelcase */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable  no-mixed-spaces-and-tabs */
/* eslint-disable  no-undef */
import mp from '../../common/util/wxapi'
import { clickBuriedV2_ } from '../../common/util/BI'
import emitter from '../../common/util/events'
import { updatePageNums, _changeItemNum, _removeCart, _deleteGift, _getCartInfo } from '../../common/util/carService'
import { add_to_cart } from '../../common/util/tencentBi/report'
import reportBuried from './report'
import { djCmsJump } from "../../common/util/agreementV2";

/**
 * 事件类型
 */
let TYPE = {
  // 添加
  add: 'add',
  // 减少com
  min: 'min',
  // 展示规格选择器
  showModel: 'showModel'
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 56
    },
    height: {
      type: Number,
      value: 56
    },
    // 商品类型，主要无效商品(invalidate)加车按钮需要置灰,其余正常
    suitType: {
      type: String,
      value: ""
    },
    // 展示类型 2: 基础, 3: 只有加号，没有数量, 4: mini购物车独有新样式
    showType: {
      type: Number,
      value: 0
    },
    // 商品数量
    count: {
      type: Number,
      value: 0,
      observer (news) {
        this.data.scopeCount = news
      }
    },
    // spu Id
    spuId: {
      type: String,
      value: ""
    },
    // 商品ID
    skuId: {
      type: String,
      value: ""
    },
    // 套装ID
    activityId: {
      type: String,
      value: ""
    },
    skuList: {
      type: Array,
      value: []
    },
    isGrey: {
      type: Number,
      value: 0
    },
    // 门店ID
    storeId: {
      type: String,
      value: ""
    },
    // 商家ID
    orgCode: {
      type: String,
      value: ""
    },
    // 纬度
    latitude: {
      type: String,
      value: ""
    },
    // 经度
    longitude: {
      type: String,
      value: ""
    },
    // 是否加车
    isAddCart: {
      type: Boolean,
      value: false,
      observer: function (newVal) {
        if (newVal) {
          this.add();
        }
      }
    },
    // 数量为零加车按钮
    addCartText: {
      type: String,
      value: ""
    },
    // 0以sku模式展示，1以spu模式展示
    showModel: {
      type: Number,
      value: 0
    },
    // 如果标签中有减运则埋点增加一个参数
    tags: {
      type: Array,
      value: [],
      observer: function (arr) {
        if (arr.length > 0)
          [
            arr.forEach((item) => {
              // 是否是减运商品
              if (
                item.type == 24 ||
                (item.iconText.indexOf("减") > -1 &&
                  item.iconText.indexOf("运费") > -1)
              ) {
                this.setData({
                  isJianyun: true
                });
              }
            })
          ];
      }
    },
    // 是否是限购爆品
    limitGroup: {
      type: Boolean,
      value: false
    },
    // 前端是否展示过限购弹窗(v8.0新增 加车时爆品限购需求使用)
    limitFlag: {
      type: Number,
      value: 0
    },
    // 优惠券id
    couponId: {
      type: String,
      value: ""
    },
    // 商品所在楼层名称
    floorName: {
      type: String,
      value: ""
    },
    weighting: {
      type: Boolean,
      value: false
    },
    weight: {
      type: String,
      value: ""
    },
    skuServiceList: {
      type: Array,
      value: []
    },
    userAction: {
      type: String,
      value: ""
    },
    keyword: {
      type: String,
      value: ""
    },
    // 是否吸顶
    isCeiled: {
      type: Number,
      value: 0
    },
    // 是否被mini购物车使用，上报埋点时使用
    fromMinicart: {
      type: Boolean,
      value: false
    },
    // 门店的tab，埋点需要
    tabName: {
      type: String,
      value: ""
    },
    // traceId，埋点需要
    traceId: {
      type: String,
      value: ""
    },
    // 减号禁止点击
    forbiddenMin: {
      type: Boolean,
      value: false
    },
    // 加号禁止点击
    forbiddenAdd: {
      type: Boolean,
      value: false
    },
    // 埋点上报页面名称
    biPageName: {
      type: String,
      value: ""
    },
    // 埋点上报活动id
    biActivityId: {
      type: String,
      value: ""
    },
    // 10 或者 null 或者不传为mini购物车, 20为全局购物车
    cartType: {
      type: Number,
      value: 10
    },
    size: {
      type: String,
      value: "min"
    },
    pageId: {
      type: String,
      value: ""
    },
    currentPageName: {
      type: String,
      value: ""
    },
    prePageName: {
      type: String,
      value: ""
    },
    // 页面来源
    pageSource: {
      type: String,
      value: ""
    },
    refPageSource: {
      type: String,
      value: ""
    },
    refPar: {
      type: Object,
      value: null
    },
    to: {
      type: String,
      value: ''
    },
    params: {
      type: Object,
      value: {}
    },
    // 品的样式类型
    iconType: {
      type: Number,
      value: 0
    },
    // 活鲜 透传给spu的参数
    transmitData: {
      type: Object,
      value: {}
    },
    floorCodeName: {
      type: String,
      value: ""
    },
    // 活动页爆品自提使用
    skuAttr: {
      type: Number,
      value: 0
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    subItem: {
      type: Object,
      value: {}
    },
    prescriptionFlowMark: {
      type: Number,
      value: 0
    },
    showState: {
      type: Number,
      value: 0
    },
    promotionId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 防止重复点击减车
    minFlag: true,
    // 防止重复点击加车
    addFlag: true,
    scopeCount: 0,
    cartWeight: null,
    // spu数量
    spuNum: 0,
    // 是否为减运商品
    isJianyun: false,
    limitData: {} // 限购爆品提示信息
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加车
    add () {
      // NOTE: 加车
      // 处方药流程标识 0:先药后医(老);1:先医后药(新)【v8.26.5新增】
      // prescriptionTag{prescriptionId:id}
	  if(this.data.showState == 12) {
        clickBuriedV2_({
          click_id: "clickPreSellRemind",
          click_par: {
			  skuId: this.data.skuId,
			  spuId: this.data.spuId,
			  storeId: this.data.storeId,
			  promotionId: this.data.promotionId
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        });
	  }
      const prescriptionTag = this.data.subItem.prescriptionTag || {}
      if (this.data.prescriptionFlowMark && prescriptionTag.prescriptionId) {
        this.triggerEvent('isPrescriptions', { subItem: this.data.subItem, type: 1, source: 'miniCart' }, { composed: true, bubbles: true })
        // 监听 confirmChangeSku 方法是否触发
        emitter.addListener("confirmChangeSku", () => {
          this.addHandle()
        });
      } else {
        this.addHandle()
      }
    },
    // 减车
    min () {
      // NOTE: 减车
      // 处方药流程标识 0:先药后医(老);1:先医后药(新)【v8.26.5新增】
      // prescriptionTag{prescriptionId:id}
      const prescriptionTag = this.data.subItem.prescriptionTag || {}
      if (this.data.prescriptionFlowMark && prescriptionTag.prescriptionId) {
        this.triggerEvent('isPrescriptions', { subItem: this.data.subItem, type: this.data.subItem.cartNum == 1 ? 2 : 1, source: 'miniCart' }, { composed: true, bubbles: true })
        // 监听 confirmChangeSku 方法是否触发
        emitter.addListener("confirmChangeSku", () => {
          this.setData({
            prescriptionsFLag: this.data.subItem.cartNum == 1
          }, () => {
            this.minHandle()
          })
        });
      } else {
        this.minHandle()
      }

    },

    // 加车操作
    addHandle () {
      let iconType = this.data.iconType;
      if (iconType !== 1) {
        if (!this.data.addFlag) return;
        this.freeAddClickBtn(false);
        let count = this.data.count + 1;
        let skuId = this.data.skuId;
        let limitGroup = this.data.limitGroup; // 是否是限量爆品 8.0版本神券页需要
        this._requestCart(skuId, count, TYPE.add, limitGroup);
      } else if (iconType === 1) {
        this._cartHasChange(TYPE.showModel);
      }
      reportBuried.call(this, "click_add");
    },

    // 减车操作
    minHandle () {
      if (this.data.suitType == "invalidate") {
        this._removeCurrentCart(this.data.skuId, TYPE.min);
      } else {
        let showModel = this.data.showModel;
        if (showModel == 1) {
          mp.toast({
            title: "多规格商品只能去购物车删除哦~"
          });
          return;
        }
        if (!this.data.minFlag) return;
        this.freeMinClickBtn(false);
        let count = this.data.count - 1;
        let skuId = this.data.skuId;
        let limitGroup = this.data.limitGroup; // 是否是限量爆品 8.0版本需要

        if (count > 0) {
          this._requestCart(skuId, count, TYPE.min, limitGroup);
        } else if (count === 0) {
          if (!this.data.prescriptionsFLag && (this.data.showType == "2" || this.data.showType == "4")) {
            wx.showModal({
              content: `确定删除该${this.data.activityId ? "套装" : "商品"}？`,
              showCancel: true,
              confirmText: "确定",
              cancelText: "取消",
              cancelColor: "#00CF37",
              confirmColor: "#00CF37",
              success: (res) => {
                this.freeMinClickBtn(true);
                if (res.confirm) {
                  this._removeCurrentCart(skuId, TYPE.min);
                }
              },
              fail: () => {
                this.freeMinClickBtn(true);
              }
            });
          } else {
            this.freeMinClickBtn(true);
            this._removeCurrentCart(skuId, TYPE.min);
          }
        }
      }
      reportBuried.call(this, "click_reduce");
    },

    // 减车重复添加解禁
    freeMinClickBtn (boolean) {
      this.setData({
        minFlag: boolean
      });
    },
    // 加车重复添加解禁
    freeAddClickBtn (boolean) {
      this.setData({
        addFlag: boolean
      });
    },
    // 加减车-接口请求
    _requestCart (skuId, cartNum, type, limitGroup) {
      let spuId = this.data.spuId;
      let limitFlag = this.data.limitFlag;
      let body = {};
      let isAdd = type === "add" ? true : type === "min" ? false : "";
      let storeInfo = {
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        lat: this.data.latitude,
        lng: this.data.longitude
      };
      let { pageSource = "", refPageSource = "", refPar } = this.data;
      // 套装
      if (this.data.activityId) {
        let skus = [];
        this.data.skuList.forEach((item) => {
          skus.push({ id: item.skuId, num: item.skuCount || item.cartNum });
        });
        body = {
          skus: [],
          combinationSkus: [
            {
              activityId: this.data.activityId,
              num: cartNum,
              skus: skus
            }
          ],
          cartOpenFlag: true
        };
      } else {
        // 单个商品
        body = {
          skus: [
            {
              id: skuId,
              num: cartNum,
              spuId: this.data.showModel == 1 ? spuId : "",
              purchaseLimitHotSale: limitGroup, // 是否是限购商品
              skuServiceList: this.data.skuServiceList // 8.7.5新增--增值服务需求
            }
          ],
          showedPurchaseLimitHotSalePopupVo: !(limitFlag <= 0), // 是否展示过限购弹层
          couponId: this.data.couponId, // '101373052',
          pageSource: this.data.pageSource,
          incrementFlag: this.data.showModel == 1 ? true : false,
          cartOpenFlag: true
        };
      }
      let params = Object.assign(
        {},
        storeInfo,
        body,
        { isAdd },
        { cartType: this.data.cartType },
        { pageSource, refPageSource },
        { ref_par: refPar }
      );
      // 请求加减车
      _changeItemNum(params, this.data.pageId)
        .then((res) => {
          if (type === "add") {
            this.freeAddClickBtn(true);
          } else if (type === "min") {
            this.freeMinClickBtn(true);
          }
          if (res.data.code === "0") {
            // 正常
            // 更新购物车
            let { cartWeight } = _getCartInfo(this, res.data.result.itemList, this.data.skuId, cartNum);
            this.setData({
              scopeCount: cartNum,
              cartWeight,
              spuNum:
                (spuId &&
                  res.data &&
                  res.data.result &&
                  res.data.result.spuNumMap &&
                  res.data.result.spuNumMap[spuId]) ||
                0
            });
            // 通知购物车变化
            this._cartHasChange(type, "", res.data.result);
          } else if (
            res.data.code === "88888" ||
            res.data.code === "80011" ||
            res.data.code === "80012"
          ) {
            // 88888限购  80011教育优惠
            if (type === "add") {
              // 如果限购添加商品，则提示
              // 券购页中request公共方法的hideLoading会将wx.showToast隐藏
              if (this.data.pageSource != "couponGoodsList") {
                mp.toast({
                  title: res.data.msg,
                  duration: 3000
                });
              }
              // 更新购物车
              let { cartWeight } = _getCartInfo(
                this,
                res.data.result.itemList,
                this.data.skuId,
                cartNum
              );
              this.setData({
                scopeCount: cartNum,
                cartWeight,
                spuNum:
                  (spuId &&
                    res.data &&
                    res.data.result &&
                    res.data.result.spuNumMap &&
                    res.data.result.spuNumMap[spuId]) ||
                  0
              });
              // 通知购物车变化
              this._cartHasChange(type, res.data.msg, res.data.result);
            } else if (type === "min") {
              // 更新购物车
              let { cartWeight } = _getCartInfo(
                this,
                res.data.result.itemList,
                this.data.skuId,
                cartNum
              );
              this.setData({
                scopeCount: cartNum,
                cartWeight,
                spuNum:
                  (spuId &&
                    res.data &&
                    res.data.result &&
                    res.data.result.spuNumMap &&
                    res.data.result.spuNumMap[spuId]) ||
                  0
              });
              // 通知购物车变化
              this._cartHasChange(type, "", res.data.result);
            }
          } else if (res.data.code === "77777") {
            // 爆品限购弹层信息
            let { result = {} } = res.data;
            this.setData(
              {
                limitData: result.purchaseLimitHotSaleReminderVo || {}
              },
              function () {
                // 通知购物车变化
                this._cartHasChange("");
              }
            );
          } else {
            mp.toast({
              title: res.data.msg,
              duration: 3000
            });
          }

          /* 运费立减落地页在加车超重时底部按钮需要展示超重信息，但或许底部信息的接口只提示超重，具体信息未提示只能从加车接口获取 */
          let carButton = {
            buttonState:
              (res.data.result && res.data.result.buttonState) || null,
            buttonName: (res.data.result && res.data.result.buttonName) || ""
          };
          wx.setStorageSync("carButton", carButton);
          // 腾讯有数上报
          let action_type =
            type === "min" ? "remove_from_cart" : "append_to_cart_in_cart";
          let tItem = res.data.result || {};
          if (this.data.addCartText && type == "add" && cartNum == 1) {
            action_type = "append_to_cart";
          }
          tItem.catId = this.data.catId;
          tItem.catName = this.data.catName;
          add_to_cart(tItem || {}, action_type);
        })
        .catch(() => {
          if (type === "add") {
            this.freeAddClickBtn(true);
          } else if (type === "min") {
            this.freeMinClickBtn(true);
          }
        });
    },
    // 减车-删除当前购物车商品
    _removeCurrentCart (skuId, type) {
      let spuId = this.data.spuId;
      let body = {};
      let storeInfo = {
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        lat: this.data.latitude,
        lng: this.data.longitude
      };
      // 套装
      if (this.data.activityId) {
        let skus = [];
        this.data.skuList.forEach((item) => {
          skus.push({ id: item.skuId, num: item.skuCount });
        });
        body = {
          cartOpenFlag: true,
          skus: [],
          combinationSkus: [
            {
              activityId: this.data.activityId,
              num: 0,
              skus: skus
            }
          ]
        };
      } else {
        // 单个商品
        body = {
          chgNumReturnType: 0,
          skus: [
            {
              id: skuId
            }
          ]
        };
      }
      let params = Object.assign({}, storeInfo, body, {
        cartType: this.data.cartType
      });
      _removeCart(params, this.data.pageId)
        .then((res) => {
          this.freeMinClickBtn(true);
          // 更新购物车
          this.setData({
            scopeCount: 0,
            cartWeight: this.data.weighting ? "0g" : null,
            spuNum:
              (spuId &&
                res.data &&
                res.data.result &&
                res.data.result.spuNumMap &&
                res.data.result.spuNumMap[spuId]) ||
              0
          });
          // 通知购物车变化
          this._cartHasChange(type, "", res.data.result);
          // 刷新首页数据
          // util.refreshHomePage()
        })
        .catch(() => {
          this.freeMinClickBtn(true);
        });
    },
    // 加车变化通知
    _cartHasChange (type, msg, cartResult = null) {
      let data = {};
      if (this.data.activityId && type != "deleteGift") {
        let skus = [];
        this.data.skuList.forEach((item) => {
          skus.push({ id: item.skuId, num: item.skuCount });
        });
        data = {
          skus: [],
          activityId: this.data.activityId,
          combinationSkus: [
            {
              activityId: this.data.activityId,
              num: this.data.scopeCount,
              skus: skus
            }
          ],
          cartOpenFlag: true
        };
      } else {
        data = {
          skuId: this.data.skuId,
          spuNum: this.data.spuNum,
          spuId: this.data.spuId,
          isJianyun: this.data.isJianyun,
          limitData: this.data.limitData,
          transmitData: this.data.transmitData
        };
      }
      this.triggerEvent("addMinControllerChange", {
        type: type,
        data: {
          cartNum: this.data.scopeCount,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          msg: msg,
          ...data,
          cartWeight: this.data.cartWeight,
          showModel: this.data.showModel,
          weighting: this.data.weighting
        },
        cartResult
      });
      // 调用updatePageNums 为了在当前页加减车时同步更新页面栈中页面的商品
      updatePageNums({
        type: type,
        data: {
          cartNum: this.data.scopeCount,
          cartWeight: this.data.cartWeight,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          floorName: this.data.floorName,
          msg: msg,
          userAction: this.data.userAction || "",
          ...data,
          showModel: this.data.showModel,
          weighting: this.data.weighting
        }
      });
    },
    // 删除赠品
    deleteGift () {
      let pageId = this.data.pageId;
      wx.showModal({
        content: `确定删除该商品？`,
        showCancel: true,
        confirmText: "确定",
        cancelText: "取消",
        cancelColor: "#00CF37",
        confirmColor: "#00CF37",
        success: (res) => {
          if (res.confirm) {
            let params = {
              lat: this.data.latitude,
              lng: this.data.longitude,
              orgCode: this.data.orgCode,
              storeId: this.data.storeId,
              infoGiftMap: {
                [this.data.activityId]: [this.data.skuId]
              },
              cartType: this.data.cartType
            };
            _deleteGift(params, pageId)
              .then((res) => {
                if (res.data.code == "0") {
                  // 通知购物车变化
                  this._cartHasChange("deleteGift", "", res.data.result);
                }
              })
              .catch(() => { });
          }
        },
        fail: () => { }
      });
    },
    modifyNumber () {
      if (this.data.suitType == "invalidate" || this.data.suitType == "gift")
        return;
      if (this.data.weighting) {
        mp.toast({
          title: "该商品不支持批量修改数量哦"
        });
        return;
      } else {
        console.log(this.data.subItem, 'this.data.subItem')
        this.triggerEvent(
          "showModify",
          {
            infos: {
              count: this.data.count,
              spuId: this.data.spuId,
              skuId: this.data.skuId,
              showModel: this.data.showModel,
              activityId: this.data.activityId,
              orgCode: this.data.orgCode,
              storeId: this.data.storeId,
              lat: this.data.latitude,
              lng: this.data.longitude,
              pageSource: this.data.pageSource,
              couponId: this.data.couponId,
              limitFlag: this.data.limitFlag,
              skuList: this.data.skuList,
              skuServiceList: this.data.skuServiceList,
              limitGroup: this.data.limitGroup,
              userAction: this.data.userAction,
              subItem: this.data.subItem
            }
          },
          { composed: true, bubbles: true }
        );
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "showLayer",
          click_par: {
            type: "batch",
            userAction: this.data.userAction || ""
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        });
      }
    },
    async buy () {
      // 兼容活动页爆品自提逻辑
      if (this.data.skuAttr == 1) {

        /* eslint-disable */
        // 校验跳转
        let res = await request({
          functionId: FNIDS.verifySettleForSkuList.functionId,
          appVersion: FNIDS.verifySettleForSkuList.appVersion,
          isNeedDealError: true,
          method: "POST",
          body: {
            skuList: [
              {
                id: this.data.skuId,
                spuId: this.data.spuId,
                num: 1
              }
            ],
            storeId: this.data.storeId,
            orgCode: this.data.orgCode,
            fromSource: 5,
            verifyResource: 1,
            pageSource: "active"
          }
        });
        // 校验结果
        if (res && res.data && res.data.code == 0 && res.data.success) {
          let params = {
            storeId: (this.data.storeId) || "",
            orgCode: this.data.orgCode || "",
            saleType: "6", // 爆品
            storeName: (this.data.storeName) || "",
            skuId: this.data.skuId || ''
          }
          djCmsJump({
            to: "Settlement",
            params: params,
            userAction: data.userAction,
            preObj: this.data.buriedObj
          });
        }
        /* eslint-disable */
      } else {
        let jumpParams
        // 存在to
        if (this.data.to) {
          djCmsJump({
            to: this.data.to,
            params: this.data.params,
            userAction: this.data.userAction,
            preObj: this.data.buriedObj
          })
        } else { // 不存在to
          // 组装参数
          jumpParams = {
            skuId: this.data.skuId,
            spuId: this.data.spuId,
            orgCode: this.data.orgCode,
            storeId: this.data.storeId
          }
          djCmsJump({
            to: 'productDetail',
            params: jumpParams,
            userAction: this.data.userAction || "",
            traceId: this.data.traceId || "",
            preObj: this.data.buriedObj
          })
        }
      }
    },
    // 待预售
    presale () {
      let jumpParams
      // 存在to
      if (this.data.to) {
        djCmsJump({
          to: this.data.to,
          params: this.data.params,
          userAction: this.data.userAction,
          preObj: this.data.buriedObj
        })
      } else { // 不存在to
        // 组装参数
        jumpParams = {
          skuId: this.data.skuId,
          spuId: this.data.spuId,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId
        }
        djCmsJump({
          to: 'productDetail',
          params: jumpParams,
          userAction: this.data.userAction || "",
          traceId: this.data.traceId || "",
          preObj: this.data.buriedObj
        })
      }
    }
  }
});