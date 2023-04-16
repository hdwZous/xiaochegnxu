import { updatePageNums, _changeItemNum } from "../../../../../common/util/carService";
import { clickBuriedV2_ } from "../../../../../common/util/BI.js";
let app = getApp();

Component({
  properties: {
    limitFlag: {
      type: Number,
      value: 0,
      observer(val) {
        wx.nextTick(() => {
          if (val) {
            this.setData({
              toTop: true,
              showPop: true,
            });
            try {
              this.maidian("showLayer");
            } catch (error) {}
          } else {
            this.setData({
              toTop: "",
              showPop: false,
            });
          }
        });
      },
    },
    limitPop: {
      type: Object,
      value: {},
      observer: function (popupVo) {
        this.setData({
          tips:
            (popupVo.hotSaleGroupVo &&
              popupVo.hotSaleGroupVo.purchaseLimitTip) ||
            "",
          tag: (popupVo.hotSaleGroupVo && popupVo.hotSaleGroupVo.tagsVO) || {},
          skuList:
            (popupVo.hotSaleGroupVo && popupVo.hotSaleGroupVo.skuInfoList) ||
            [],
          keepBuyInfo: popupVo.keepBuyVo || {},
        });
      },
    },
    couponId: {
      type: String,
      value: "",
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    recommendObj: {
      type: Object,
      value: {},
    },
    skuId: {
      type: String,
      value: ""
    },
  },
  data: {
    toTop: "",
    showPop: false,
    skuList: [],
    tips: "",
    tag: {},
    keepBuyInfo: {},
    isIphoneX: false,
  },
  lifetimes: {
    attached: function () {
      this.setData({
        isIphoneX: app.globalData.isIpx,
      });
    },
  },
  methods: {
    // 关闭弹层
    hidePop() {
      this.setData({
        showPop: false,
      });
    },
    add(e) {
      let item = e.currentTarget.dataset.item;
      let count = item.incartCount + 1;
      let skuId = item.skuId;
      let spuId = item.spuId;
      let showModel = item.showModel;
      this._requestCart(skuId, spuId, count, "add", showModel);
      this.hidePop();
      try {
        this.maidian("clickLayer", "continueBuy");
      } catch (error) {}
      
    },
    // 加减车-接口请求
    _requestCart(skuId, spuId, cartNum, type, showModel) {
      // 请求加减车
      let params = {
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        isReturnCart: true,
        skus: [
          {
            id: skuId,
            num: cartNum,
            spuId: showModel == 1 ? spuId : "",
            purchaseLimitHotSale: true, // 是否是限购商品
          },
        ],
        showedPurchaseLimitHotSalePopupVo: true, // 是否展示过限购弹层
        couponId: this.data.couponId,
        pageSource: "couponGoodsList",
        incrementFlag: false,
      };

      _changeItemNum(params)
        .then((res) => {
          if (res.data.code === "0") {
            // 正常
            this.setData({
              count: cartNum,
            });
            this._cartHasChange(type, skuId, cartNum, spuId);
          } else {
            this.setData({ count: cartNum });
            this._cartHasChange(type, skuId, cartNum, spuId);
          }
        })
        .catch(() => {});
    },
    _cartHasChange(type, skuId, cartNum, spuId) {
      // this.triggerEvent("addMinControllerChange", {
      //   type: type || "",
      //   data: {
      //     skuId: skuId || "",
      //     cartNum: cartNum || 0,
      //     orgCode: this.data.orgCode || "",
      //     storeId: this.data.storeId || "",
      //   },
      // });

      // 调用updatePageNums 为了在当前页加减车时同步更新页面栈中页面的商品
      updatePageNums({
        type: type,
        data: {
          skuId: skuId || "",
          spuId: spuId,
          cartNum: cartNum || 0,
          orgCode: this.data.orgCode || "",
          storeId: this.data.storeId || "",
        },
      });
    },
    maidian(clickId, btnName) {
      let { pageIdFirstPage, currentPageName, prePageName } =
        this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: clickId,
        click_par: {
          storeId: this.data.storeId,
          couponId: this.data.couponId,
          skuId: this.data.skuId,
          type: "saleLimit",
          btnName: btnName || "",
        },
        currentPageName,
        prePageName,
        pageId: pageIdFirstPage,
      });
    },
  },
});
