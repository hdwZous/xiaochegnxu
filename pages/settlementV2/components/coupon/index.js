/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { request, FNIDS } from "../../../../common/util/api";
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Object,
      value: {},
      observer: function (val) {
        this.handleCoupon(val);
        this.handleAllCouponInfo(val);
      }
    },
    unique: {
      type: String,
      value: ""
    },
    orderPageId: {
      type: String,
      value: ""
    },
    pageId: {
      type: String,
      value: ""
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: null
    },
    storeId: {
      type: String,
      value: ''
    },
    mockVip: {
      type: Boolean,
      value: false
    },
    buyCouponWithOrderFlag: {
      type: Number,
      value: 0
    },
    vipFloor: {
      type: Object,
      value: {}
    },
    disMoneyInfo: {
      type: Object,
      value: {},
      observer (news) {
        if (news.data) {
          for (let i = 0; i < news.data.length; i++) {
            if (news.data[i].name == '红包') {
              this.setData({
                redPacketInfo: news.data[i].redPacketInfo || {}

              })
              break;
            }
          }
        }
      }
    }
  },

  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    visible: false,
    notice: "",
    couponValue: "",
    couponColor: "",
    couponInfoList: [], // 处理后的真正优惠券列表
    codeListSuccessFlag: true, // 优惠券接口是否请求成功
    isLowCase: false, // 是否是降级
    unavailableAbsolutely: false, // 是否横滑动
    // 接口参数
    couponCacheId: "",
    selectedCouponInfoPreOperateList: [],
    couponGroup: "",
    operateConsumeCode: "",
    operate: "",
    allCachList: [],
    vipRequest: false,
    redPacketInfo: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 处理优惠券提交数据等信息
    handleAllCouponInfo (module) {
      let { couponCacheId = '' } = module.data; // 缓存优惠券id
      let selectedCouponInfoPreOperateList = [];
      let {
        actualSelectedCouponList = [], // 选中的优惠券
        voucherModelListVO = [], // 下发的全量优惠券
        influencedVoucherList = [], // 受影响优惠券
        codeListSuccessFlag,
        unavailableAbsolutely
      } = module.data;
      selectedCouponInfoPreOperateList = actualSelectedCouponList;
      /* couponCacheId 只有在下发全量券的时候才会有couponCacheId，页面上其他操作比如选时间等不会触发下发全量券,
      此时couponInfoList 应该取缓存里的，当再次下发couponCacheId时需要将缓存中的列表重新赋值
      */
      if (!codeListSuccessFlag || couponCacheId.length) {
        this.data.allCachList = voucherModelListVO
      }
      let couponInfoList = JSON.parse(JSON.stringify(this.data.allCachList));
      unavailableAbsolutely = couponCacheId.length ? unavailableAbsolutely : this.data.unavailableAbsolutely
      if (codeListSuccessFlag === true) {
        if (influencedVoucherList.length > 0) {
          // 受影响列表有值
          let newInfoList = couponInfoList;
          influencedVoucherList.forEach((item) => {
            newInfoList.forEach((origin, index) => {
              if (item.couponCode === origin.couponCode) {
                newInfoList[index] = Object.assign({}, origin, item);
              }
            });
          });
          couponInfoList = newInfoList
        } else {
          if (voucherModelListVO.length > 0) {
            couponInfoList = voucherModelListVO
          }
        }
        this.data.couponCacheId = couponCacheId.length ? couponCacheId : this.data.couponCacheId
        couponCacheId = couponCacheId.length ? couponCacheId : this.data.couponCacheId
        this.data.selectedCouponInfoPreOperateList = selectedCouponInfoPreOperateList;
      }
      this.setData({
        codeListSuccessFlag,
        unavailableAbsolutely,
        couponInfoList,
        allCachList: couponInfoList,
        couponCacheId
      });
      this.triggerEvent("handleInitCouponInfo", {
        couponCacheId: this.data.couponCacheId,
        selectedCouponInfoPreOperateList,
        couponInfoList
      });
    },
    // 点击优惠券选择
    handleSelectBtnClick (e) {
      // console.log('e',e)
      let itemData = e.detail.data;
      let couponGroup = itemData.couponGroup;
      let operate = itemData.selectedState == 10 ? 1 : 2;
      let operateConsumeCode = itemData.couponCode;

      let { couponCacheId, selectedCouponInfoPreOperateList } = this.data;
      if (itemData.selectedState != 30) {
        this.triggerEvent("handleCouponInfo", {
          couponCacheId,
          selectedCouponInfoPreOperateList,
          couponGroup,
          operate,
          operateConsumeCode
        });
      }
    },
    // 处理文案
    handleCoupon (obj) {
      // console.log('obj',obj)
      let couponColor = "";
      let couponValue = "";
      let {
        promoteType,
        unavailableAbsolutely,
        description,
        totalDiscountMoney,
        voucherModelListVO,
        couponCacheId = '',
        codeListSuccessFlag,
        cornerMark = null
      } = obj.data;
      let couponList = couponCacheId.length ? voucherModelListVO : this.data.allCachList
      unavailableAbsolutely = couponCacheId.length ? unavailableAbsolutely : this.data.unavailableAbsolutely
      couponCacheId = couponCacheId.length ? couponCacheId : this.data.couponCacheId
      let is_empty = !couponList || (couponList && !couponList.length);
      if (!promoteType) {
        couponValue = description || "本订单不支持使用";
        couponColor = "#999";
      } else if (totalDiscountMoney) {
        couponValue = `-¥${totalDiscountMoney / 100}`;
        couponColor = "#ff5757";
      } else if (unavailableAbsolutely) {
        couponValue = "暂无可用";
        couponColor = "#999";
      } else if (codeListSuccessFlag && couponCacheId && is_empty && !cornerMark) {
        couponValue = "暂无优惠券";
        couponColor = "#999";
      }
      this.setData({
        couponValue,
        couponColor
      });
    },
    // 点击优惠券弹层
    handleRightClick () {
      // console.log('111',this.data.couponInfoList)
      if (this.data.unavailableAbsolutely) {
        this.triggerEvent(
          "handleCouponDiglogVisible",
          this.data.couponInfoList
        );
      }
    },
    // 优惠券降级
    lookCoupon () {
      let { functionId, appVersion } = FNIDS.lowCaseVoucher;
      request({
        functionId,
        method: "POST",
        appVersion,
        body: {
          unique: this.data.unique,
          orderPageId: this.data.orderPageId,
          fromSource: 5
        },
        pageId: this.data.pageId || '',
        preObj: this.data.buriedObj
      }).then((res) => {
        // console.log("res", res);
        if (res && res.data && res.data.code == 0) {
          this.setData(
            {
              couponInfoList: res.data.result.voucherModelListVO,
              couponCacheId: res.data.result.couponCacheId,
              codeListSuccessFlag: true,
              isLowCase: true
            },
            () => {
              this.triggerEvent("handleCouponInfo", {
                couponCacheId: this.data.couponCacheId
              });
            }
          );
          if (!res.data.result.voucherModelListVO) {
            this.setData({
              couponValue: "暂无优惠券",
              couponColor: "#999"
            });
          }
        }
      });
    },
    // 点击问号
    handleClickQust () {
      let { functionId, appVersion } = FNIDS.getQuestionText;
      request({
        functionId,
        appVersion,
        body: {
          type: 58,
          pageSource: "settlementinfo"
        },
        pageId: this.data.pageId || '',
        preObj: this.data.buriedObj
      }).then((res) => {
        if (res && res.data && res.data.code == 0) {
          this.setData({
            notice: res.data.result,
            visible: true
          });
        }
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickExplainIcon",
        click_par: {
          iconName: "优惠券"
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      });
    },
    stopBubble () {
      return false;
    },
    close () {
      this.setData({
        visible: false
      });
    },
    handleExchange (e) {
      this.setData({
        vipRequest: !this.data.vipRequest
      })
    },
    // 点击脚本展示弹层
    listenExchange (e) {
      let { consumeCode = '', exchangeFlag } = e.detail
      let notice = {}; let vip = this.data.vipFloor
      // 假如有下发vip楼层
      if (vip && vip.vipId && !vip.checkVipFlag) {
        let obj = {}
        if (exchangeFlag == 5) {
          obj = {
            couponCacheId: null
          }
        } else {
          obj = {
            redPacketCode: consumeCode
          }
        }
        notice = {
          checkVipFlag: 1, // 结算参数
          purchaseVipTypeId: vip.vipId, // 结算 提单参数
          purchaseVip: true, // 提单参数
          buyCouponWithOrderFlag: 1,
          unionVipFlag: vip.unionVipFlag,
          purchaseMemberId: vip.unionMemberId
        }
        notice = Object.assign({}, notice, obj, { userOperateType: 10 })
        notice.needToast = false
      } else {
        if (exchangeFlag == 5) {
          notice = {
            couponCacheId: null
          }
        } else {
          notice = {
            redPacketCode: consumeCode
          }
        }
      }
      this.triggerEvent('listenNewVipPop', { notice })
    }
  }
});
