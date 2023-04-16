import mp from "../../../../../../common/util/wxapi";
import { request, FNIDS } from "../../../../../../common/util/api";
import { djCmsJump } from "../../../../../../common/util/agreementV2";
import { _addTodaySku } from "../../../../../../common/util/carService";
import { clickBuriedV2_ } from "../../../../../../common/util/BI";
let app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    infos: {
      type: Object,
      value: {}
    },
    invalidData: {
      type: Array,
      value: [],
    },
    latitude: {
      type: String,
      value: "",
    },
    longitude: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    pageSource: {
      type: String,
      value: "",
    },
    refPageSource: {
      type: String,
      value: "",
    },
    biPageName: {
      type: String,
      value: "",
    },
    fromMinicart: {
      type: Boolean,
      value: false,
    },
    limitFlag: {
      type: Number,
      value: 0,
    },
    // 10 或者 null 或者不传为mini购物车, 20为全局购物车
    cartType: {
      type: Number,
      value: 10,
    },
    traceId: {
      type: String,
      value: "",
    },
    pullDownFlag: {
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
      value: ''
    },
    noNeedExposure: {
      type: Boolean,
      value: false
    },
    refPar: {
      type: Object,
      value: null
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    // 仅加购今日商品
    addTodayGoods(e) {
      let { status } = e.currentTarget.dataset;
      if (status == 0) {
        let params = {
          lat: this.data.latitude || app.globalData.addressInfo.latitude,
          lng: this.data.longitude || app.globalData.addressInfo.longitude,
          orgCode: this.data.orgCode,
          storeId: this.data.storeId,
          pageSource: this.data.pageSource || "",
          refPageSource: this.data.refPageSource,
          cartType: this.data.cartType,
          ref_par: this.data.refPar
        };
        _addTodaySku(params, this.data.pageId)
          .then((res) => {
            let result = res.data.result;
            if (result) {
              this.triggerEvent("refreshCart", { result });
            }
          })
          .catch(() => {
            // console.log(err);
          });
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "clickTodayPurchase",
          click_par: {
            storeId: this.data.storeId,
          },
          currentPageName: this.data.buriedObj.currentPageName || '',
          prePageName: this.data.buriedObj.prePageName || '',
          pageId: this.data.buriedObj.pageIdFirstPage || ''
        });
      }
    },
    // 勾选和取消勾选商品
    checkToggle(e) {
      let data = e.currentTarget.dataset;
      let isAdd = data.isAdd;
      let skuId = data.skuId || "";
      let combinationInfo = data.combinationInfo || null;
      let skus = [],
        combinationSkus = [],
        combination = [];
      if (isAdd === "") return;
      if (combinationInfo) {
        combinationInfo.skuInfoList.map((item) => {
          combination.push({ id: item.skuId, num: item.cartNum });
        });
        combinationSkus = [
          {
            activityId: combinationInfo.activityId,
            num: combinationInfo.cartNum,
            skus: combination,
          },
        ];
      } else {
        skus = [
          {
            id: skuId,
            num: "",
          },
        ];
      }
      let functionId = isAdd ? FNIDS.miniCartCheckItem.functionId : FNIDS.miniCartUnCheckItem.functionId;
      let appVersion = isAdd ? FNIDS.miniCartCheckItem.appVersion : FNIDS.miniCartUnCheckItem.appVersion;
      request({
        functionId,
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
          combinationSkus,
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
            this.triggerEvent("refreshCart", { result, flags: false });
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
        .catch(() => {});
    },
    // 清空失效商品
    removeAllFailureGoods() {
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "delete_invalid",
        click_par: {
          storeId: this.data.storeId,
        },
        currentPageName: this.data.buriedObj.currentPageName || '',
        prePageName: this.data.buriedObj.prePageName || '',
        pageId: this.data.buriedObj.pageIdFirstPage || ''
      });
      mp.dialog({
        content: "清空购物车中所有失效商品？",
      }).then((res) => {
        if (!res.confirm) return;
        let { storeId = "", orgCode = "", itemList = [] } = this.data.infos;
        let skus = [], combinationSkus = [];
        itemList.forEach((item) => {
          let flag = item.suitType === "invalidate";
          if (flag) {
            if (item.combinationSkuInfo) {
              let combination = [];
              item.combinationSkuInfo.skuInfoList.map((item) => {
                combination.push({ id: item.skuId, num: item.cartNum });
              });
              combinationSkus.push({
                activityId: item.combinationSkuInfo.activityId,
                num: item.combinationSkuInfo.cartNum,
                skus: combination,
              });
            } else {
              let skuList = item.skuList;
              skus = skuList.map((subItem) => {
                return { id: subItem.skuId };
              });
            }
          }
        });
        let { functionId, appVersion } = FNIDS.removeAllFailureGoods;
        request({
          functionId,
          pageId: this.data.pageId,
          body: {
            skus: skus,
            combinationSkus,
            storeId: storeId,
            orgCode: orgCode,
            fromSource: 5,
            cartOpenFlag: true,
            cartType: this.data.cartType,
            ref_par: this.data.refPar
          },
          appVersion,
        })
          .then((res) => {
            let { result } = res.data;
            if (result) {
              this.triggerEvent("refreshCart", { result, flags: true });
            }
          })
          .catch(() => {
            // console.log(err);
          });
        // 埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "click_delete_invalid",
          click_par: {
            storeId: this.data.storeId,
          },
          currentPageName: this.data.buriedObj.currentPageName || '',
          prePageName: this.data.buriedObj.prePageName || '',
          pageId: this.data.buriedObj.pageIdFirstPage || ''
        });
      });
    },
    // store_2.0改版 去凑单/兑换 弹出弹层等逻辑
    goDosomething(e) {
      let { suittype, params, to, text } = e.currentTarget.dataset;
      if (
        suittype == "exchange" ||
        suittype == "wholestoreexchange" ||
        suittype == "wholestoregift" ||
        suittype == "gift"
      ) {
        this.triggerEvent("goDosomething", { suittype });
        // 埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "ClickToRepurchase",
          click_par: {
            suitType: suittype,
            layerStatus: "normal",
            text: text,
            storeId: this.data.storeId,
          },
          currentPageName: this.data.buriedObj.currentPageName || '',
          prePageName: this.data.buriedObj.prePageName || '',
          pageId: this.data.buriedObj.pageIdFirstPage || ''
        });
      } else {
        // 跳转协议
        djCmsJump({
          to,
          params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'minicart_cartgoodsection_goDosomething'
          }
        });
        if (this.data.cartType == 20) {
          // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
          app.globalData.refreshShopid = this.data.storeId;
        }
      }
    },
    addMinControllerChange(e) {
      this.triggerEvent("onAddMinControllerChange", e.detail);
    },
    onShowModify(e) {
      let infos = e.detail.infos
      this.triggerEvent("showModify", {
        infos: infos
      });
    }
  },
});
