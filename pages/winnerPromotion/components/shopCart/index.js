import { behavior } from "../../utils/modules/miniprogram-computed";
import { djGetLocation, djToLogin } from "../../utils/modules/dj_wx_mini_util";
import {
  cartQuery,
  cartItemCheck,
  cartItemUnCheck,
  cartAllCheck,
  cartAllUnCheck,
  cartAllItemRemove,
  cartAllInvalidItemRemove,
  cartSettleVerify,
  scanProduct,
  cartItemNumChange
} from "../../services/index";
import eventbus from "../../utils/eventbus";
import { clickLog } from "../../utils/log";
import { isIponeX } from "../../utils/common";

Component({
  behaviors: [behavior],
  properties: {
    showScanBtn: {
      type: Boolean,
      value: false,
    },
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
  },
  data: {
    showPopup: false,
    totalNum: 18,
    cartData: {},
    goodsList: [],
    invalidGoodsList: [],
    latitude: "",
    longitude: "",
    cartBlowUp: false,

    showScan: false,
    scanSkuList: [],
    isIpx:isIponeX()
  },
  computed: {
    isCheckAll(data) {
      const { goodsList = [] } = data;
      return goodsList.every((subItem) => subItem.checkType !== 0);
    },
  },
  lifetimes: {
    attached: function () {
      eventbus.listen("CART_CHANGE", this, (value) => this.changeCart(value));
    },
    detached: function () {
      eventbus.cancel("CART_CHANGE", this);
    },
  },
  pageLifetimes: {
    show: async function () {
      const { latitude, longitude } = await djGetLocation();
      this.setData({ latitude, longitude });
      this.queryData();
    },
  },
  methods: {
    async queryData() {
      const { storeId, orgCode, latitude, longitude } = this.data;

      if (!storeId || !orgCode) return;
      const res = await cartQuery({
        fromSource: 5, // 请求来源，5代表微信小程序
        chgNumReturnType: 0,
        isAdd: false,
        isReturnCart: true,
        cartOpenFlag: true,

        storeId: storeId,
        orgCode: orgCode,
        lat: latitude,
        lng: longitude,
      });
      if (+res.code !== 0) {
        wx.showModal({
          content: res.msg,
          showCancel: false,
        });
        return;
      }
      this.changeCart(res.result);
    },
    changeCart(cartData) {
      const { itemList = [] } = cartData;
      const goodsList = [];
      const invalidGoodsList = [];
      itemList.forEach(item => {
        if (item.suitType === 'invalidate') {
          invalidGoodsList.push(...item.skuList);
        } else {
          goodsList.push(...item.skuList);
        }
      })

      this.setData({ goodsList, invalidGoodsList, cartData });
      console.log('cartData.totalNum: ', cartData.totalNum)
      if (cartData.totalNum) {
        this.setData({ cartBlowUp: true });
        setTimeout(() => this.setData({ cartBlowUp: false }), 1000);
      } else {
        this.setData({ showPopup: false });
      }
    },
    handleClosePopup() {
      this.setData({ showPopup: false });
    },
    async handleRemoveAll() {
      const { storeId, orgCode, latitude, longitude, isCheckAll } = this.data;
      const res = await cartAllItemRemove({
        isReturnCart: true,
        positionType: 2,
        orgCode,
        storeId,
        lat: latitude,
        lng: longitude,
      });
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
        return;
      }
      clickLog('winner_store_info_page__click_clean_car')
      this.setData({ showPopup: false });
      this.changeCart(res.result);
      eventbus.dispatch("CART_CHANGE", res.result);
    },
    async handleRemoveInvalidAll() {
      const { storeId, orgCode, invalidGoodsList } = this.data;
      const skuList = invalidGoodsList.map(i => ({ id: i.skuId }))
      const res = await cartAllInvalidItemRemove({
        skus: skuList,
        // combinationSkus,
        storeId: storeId,
        orgCode: orgCode,
        fromSource: 5,
        cartOpenFlag: true,
      })
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
        return;
      }
      this.changeCart(res.result);
      eventbus.dispatch("CART_CHANGE", res.result);
    },
    async handleCheckAll() {
      const { storeId, orgCode, latitude, longitude, isCheckAll } = this.data;
      const fn = isCheckAll ? cartAllUnCheck : cartAllCheck;
      const res = await fn({
        isReturnCart: true,
        positionType: 2,
        orgCode,
        storeId,
        lat: latitude,
        lng: longitude,
        cartOpenFlag: true,
        fromSource: 5,
        pageSource: "store",
      });
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
        return;
      }
      clickLog('winner_store_info_page__click_shopcar_all', { state: isCheckAll ? false : true }) // 此处记录操作完的结果
      this.queryData();
    },
    async handleCheckSku(e) {
      const { storeId, orgCode, latitude, longitude } = this.data;
      const { checkType, skuId } = e.currentTarget.dataset;
      if (checkType === 2) {
        return;
      }
      const fn = checkType === 1 ? cartItemUnCheck : cartItemCheck;
      const res = await fn({
        chgNumReturnType: 0,
        isAdd: true,
        isReturnCart: true,
        lat: latitude,
        lng: longitude,
        orgCode,
        storeId,
        positionType: "2",
        skus: [
          {
            id: skuId,
            num: "",
          },
        ],
        cartOpenFlag: true,
        fromSource: 5,
        pageSource: "store",
      });
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
        return;
      }
      clickLog('winner_store_info_page__click_select', { skuId, state: checkType === 1 ? false : true }) // 此处记录操作完的结果
      this.queryData();
    },
    handleToggleCart() {
      const { cartData, invalidGoodsList } = this.data;
      if (cartData.totalNum <= 0 && invalidGoodsList.length <= 0) return;
      clickLog('winner_store_info_page__click_mini_shopcar', { state: this.data.showPopup ? "show" : "hidden", cart_data: cartData })
      this.setData({ showPopup: !this.data.showPopup });
    },
    handleToScan() {
      clickLog('winner_store_info_page__click_scan')
      wx.scanCode({
        success: (res) => {
          let qrCodeMsg = res.result;
          clickLog('winner_store_info_page__scan_result', { state: '成功', result: res })
          this.fetchScanSku(qrCodeMsg);
          console.log(res);
        },
        fail: (err) => {
          clickLog('winner_store_info_page__scan_result', { state: '失败', result: res })
          if (err.errMsg && err.errMsg == "scanCode:fail cancel") {
            this.setData({
              showScan: false,
              scanSkuList: [],
            });
          } else {
            this.setData({
              showScan: true,
              scanSkuList: [],
            });
          }
        },
      });
    },
    // 通过upc获取加车商品
    async fetchScanSku(upc) {
      const res = await scanProduct({
        storeId: this.data.storeId || "",
        orgCode: this.data.orgCode || "",
        upc: upc || "",
        ref: "",
        pageSource: "store",
      });
      let { code, result = [] } = res || {};
      // let skuIdList = "";
      if (code == 0) {
        if (result.length == 1) {
          this.add(result[0]);
        }
        this.setData({
          showScan: true,
          scanSkuList: result || [],
        });
        clickLog('winner_store_info_page__scan_request', { state: '成功', sku_list: result })
      } else {
        clickLog('winner_store_info_page__scan_request', { state: '失败', sku_list: [] })
        this.setData({
          showScan: true,
          scanSkuList: [],
        });
      }
      // result.forEach((item) => {
      //   skuIdList += `${item.skuId},`;
      // });
    },
    // 扫码自动加车
    add(item) {
      let cartNum = item.incartCount + 1;
      let params = {
        storeId: this.data.storeId,
        orgCode: this.data.orgCode,
        isReturnCart: true,
        skus: [
          {
            id: item.skuId,
            num: cartNum,
            spuId: item.showModel == 1 ? item.spuId : "",
          },
        ],
      };

      this.scanCartChange(params);
    },
    async scanCartChange(params) {
      const { latitude, longitude } = await djGetLocation();

      const res = await cartItemNumChange({
        ...params,
        latitude,
        longitude,
      });
      if (+res.code !== 0) {
        wx.showModal({
          content: res.msg,
          showCancel: false,
        });
        return;
      }
      eventbus.dispatch("CART_CHANGE", res.result);
    },
    // 扫码加车弹层按钮
    toScan(e) {
      let type = (e && e.detail && e.detail.type) || "";
      this.setData({
        showScan: false,
      });
      if (type == "continue") {
        this.handleToScan();
      }
    },
    async handleToSettle() {
      const { cartData, orgCode, storeId, latitude, longitude } = this.data;
      if (cartData.totalNum <= 0) return;
      const res = await cartSettleVerify({
        isReturnCart: true,
        orgCode,
        storeId,
        lat: latitude,
        lng: longitude,
        positionType: "2",
      });
      if (+res.code === 201) {
        djToLogin();
        return;
      }
      if (+res.code !== 0) {
        wx.showToast({
          title: res.msg,
          icon: "none",
        });
        return;
      }

      clickLog('winner_store_info_page__click_settlement')
      wx.navigateTo({
        url:
          "/pages/settlementV2/index?specialBusinessTag=LaiLaiTuiMini&storeId=" +
          storeId +
          "&orgCode=" +
          orgCode +
          "&storeName=" +
          cartData.storeName,
      });
    },
  },
});
