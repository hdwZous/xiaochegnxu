import mp from "../../../../common/util/wxapi";
import { queryFreightService } from '../../../../common/util/services'
import { request, FNIDS } from '../../../../common/util/api';
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(newVal) {
        setTimeout(() => {
          this.setData({
            showDialog: newVal
          });
        }, 100);
        if (newVal) {
          if (this.data.selectedCoupon) {
            clickBuriedV2_({
              click_id: "selectFreightCoupon",
              click_par: {
                state: 1,
                status:
                  this.data.selectedCoupon &&
                    this.data.selectedCoupon.selectedState == 20
                    ? 1
                    : 0,
              },
              pageId: this.data.pageId,
              currentPageName: this.data.currentPageName,
              prePageName: this.data.prePageName
            });
          }
          if (this.data.selectedPromote) {
            clickBuriedV2_({
              click_id: "selectFreightSale",
              click_par: {
                state: 1,
                status:
                  this.data.selectedPromote &&
                    this.data.selectedPromote.selectedState == 20
                    ? 1
                    : 0,
              },
              pageId: this.data.pageId,
              currentPageName: this.data.currentPageName,
              prePageName: this.data.prePageName
            });
          }
        }
      },
    },
    data: {
      type: Object,
      value: null,
      observer(newVal) {
        this.initData(newVal);
      },
    },
    unique: {
      type: String,
      value: "",
    },
    orderPageId: {
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
    requestFlag: {
      type: Boolean,
      value: false,
      observer(newVal) {
        if (newVal) {
          this.reqFreightService();
        }
      },
    },
    pageId: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    initSettleParams: {
      type: Object,
      value: null
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    info: {},
    unavailableCode: "", //不可用券code
    reason: "",
    isIpx: getApp().globalData.isIpx,
    selectedCoupon: null, // 已经选中的运费券
    selectedPromote: null, // 已经选中的运费促销
  },
  /**
   * 组件的方法列表
   */
  methods: {
    hide() {
      this.setData({
        showDialog: false,
        unavailableCode: "",
      });
      setTimeout(() => {
        this.setData({
          show: false,
          reason: "",
        });
        this.triggerEvent('discountClose')
      }, 100);
    },
    initData(disInfo, noTrigger = false) {
      let info = disInfo || {};
      let selectedCoupon = null;
      let selectedPromote = null;
      info.couponDiscountModeOptions &&
        info.couponDiscountModeOptions.forEach((item) => {
          if (item.selectedState == 20) {
            selectedCoupon = item;
            this.data.couponDefault = true;
          }
        });
      info.freightDiscountModeOptions &&
        info.freightDiscountModeOptions.forEach((item) => {
          if (item.selectedState == 20) {
            selectedPromote = item;
            this.data.promoteDefault = true;
          }
        });
      if (info.noUseDiscountMode) {
        info.noUseDiscountMode.discountType = -1;
      }
      this.setData({
        info: info,
        selectedCoupon,
        selectedPromote,
      });
      if (noTrigger == false) {
        //设置默认值
        this.triggerEvent(
          "setDefaultFree",
          {
            data: {
              freightCouponCode:
                (selectedCoupon && selectedCoupon.couponCode) || "",
              selectDiscountThreshold:
                !selectedPromote || selectedPromote.discountThreshold == undefined
                  ? null
                  : selectedPromote.discountThreshold,
              selectedDiscountMoney:
                !selectedPromote || selectedPromote.discountMoney == undefined
                  ? null
                  : selectedPromote.discountMoney,
              selectedDiscountType:
                !selectedPromote || selectedPromote.discountType == undefined
                  ? null
                  : selectedPromote.discountType,
            },
          },
          { bubbles: true, composed: true }
        );
      }
    },
    event() {
      return false;
    },
    onWidgetEvent(e) {
      let { type, data } = e.detail;
      this.triggerEvent("pageEvent", {
        type: "vip",
        data: data.consumeCode || "",
      });
      this.hide();
    },

    catchtouchmove() {
      return false;
    },

    reqFreightService() {
      queryFreightService({
        isNeedDealError: true,
        body: {
          storeId: this.data.storeId || "",
          orgCode: this.data.orgCode || "",
          fromSource: "5",
          unique: this.data.unique || "",
          orderPageId: this.data.orderPageId,
        },
        pageId: this.data.pageId || ''
      })
        .then((res) => {
          if (res.data.code == 0 && res.data.result) {
            let result = res.data.result
            this.triggerEvent('resetDelivery', { info: result })
          } else {
            mp.dialog({
              content: res.data.msg || "网路开小差~",
              showCancel: false,
            }).then((res) => {
              // console.error(res)
              wx.navigateBack();
            });
          }
        })
        .catch(() => {
          mp.dialog({
            content: "网路开小差~",
            showCancel: false,
          }).then((res) => {
            // console.error(res)
            wx.navigateBack();
          });
        });
    },
    // 点击弹层中的选项，调用结算页接口实时刷新弹层中的优惠信息，但是不刷新结算页信息
    // 点击弹层中确定按钮再去刷新结算页的信息
    updatePopInfo(e) {
      let { item = {}, type = "select" } = e.currentTarget.dataset;
      // 当前点击不使用优惠,不使用优惠是已选中，则不可反选
      if (item.discountType == -1 && item.selectedState == 20) {
        return;
      }
      // 如果点击的是确认
      if (type == "confirm") {
      } else if (item.couponCode) {
        // 当前点击的是运费券
        this.setData({
          selectedCoupon: item.selectedState == 20 ? null : item,
        });
        clickBuriedV2_({
          click_id: "selectFreightCoupon",
          click_par: {
            status: item.selectedState == 10 ? 1 : 0,
          },
          pageId: this.data.pageId,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
      } else if (item.discountType == -1) {
        // 当前点击不使用优惠
        // 当前是未选中状态才可点击
        if (item.selectedState == 10) {
          this.setData({
            selectedCoupon: null,
            selectedPromote: null,
          });
          clickBuriedV2_({
            click_id: "selectNoFreight",
            click_par: {
              status: 1,
            },
            pageId: this.data.pageId,
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        }
      } else {
        // 当前点击的是促销
        this.setData({
          selectedPromote: item.selectedState == 20 ? null : item,
        });
        clickBuriedV2_({
          click_id: "selectFreightSale",
          click_par: {
            status: item.selectedState == 10 ? 1 : 0,
          },
          pageId: this.data.pageId,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
      }
      let data = {
        freightCouponCode: this.data.selectedCoupon
          ? this.data.selectedCoupon.couponCode
          : null,
        selectedDiscountType: this.data.selectedPromote
          ? this.data.selectedPromote.discountType
          : -1,
        selectDiscountThreshold:
          (!this.data.selectedPromote ||
          this.data.selectedPromote.discountThreshold == undefined)
            ? null
            : this.data.selectedPromote.discountThreshold,
        selectedDiscountMoney:
          (!this.data.selectedPromote ||
          this.data.selectedPromote.discountMoney == undefined)
            ? null
            : this.data.selectedPromote.discountMoney,
        refresh: true
      }
      if (type == 'confirm') {
        this.triggerEvent("setDefaultFree", { data }, { bubbles: true, composed: true })
      } else {
        this.setData({
          'initSettleParams.selectedDiscountType': data.selectedDiscountType,
          'initSettleParams.selectDiscountThreshold': data.selectDiscountThreshold,
          'initSettleParams.selectedDiscountMoney': data.selectedDiscountMoney,
          'initSettleParams.freightCouponCode': data.freightCouponCode
        }, () => {
          this.getInitData()
        })
      }
      if (type == "confirm") {
        //   不使用优惠不上报
        if (item.discountType != -1) {
          clickBuriedV2_({
            click_id: "clickConfirm",
            click_par: {
              freightSale: this.data.selectedPromote ? 1 : 0,
              freightCoupon: this.data.selectedCoupon ? 1 : 0,
            },
            pageId: this.data.pageId,
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        }
        this.setData({
          showDialog: false,
          unavailableCode: "",
        });
        setTimeout(() => {
          this.setData({
            show: false,
            reason: "",
          });
          this.triggerEvent('discountClose')
        }, 100);
      }
    },
    getInitData() {
      request({
        ...FNIDS.settleAccount,
        method: 'POST',
        isNeedDealError: true,
        body: this.data.initSettleParams,
        pageId: this.data.pageId,
        preObj: this.data.buriedObj
      }).then(res => {
        if (res.data.code == "0" && res.data.result) {
          let result = res.data.result
          let actionModule =  result.newModules.find(item => {
            return item.moduleKey == 'actionModule'
          })
          if (actionModule) {
            actionModule.data.map(item => {
              if (item.moneyType == 'freight' || item.name == '运费') {
                this.initData(item.deliveryDiscountResp, true)
              }
            })
          }
        }
      })
    }
  },
});
