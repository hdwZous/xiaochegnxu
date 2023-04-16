import { request, FNIDS } from "../../../../../../common/util/api";
import mp from "../../../../../../common/util/wxapi";
import { clickBuriedV2_ } from "../../../../../../common/util/BI";
const app = getApp();

const CONSTANT = {
  // 1 app 2 h5 5 微信小程序 8 rn 12 商家小程序
  FROM_SOURCE: 5,
  // 门店主页-homestore 购物车-minicart v6.6新增
  SOURCE: "minicart",
  /*
    STATION_HOME_PAGE("station_home_page", "门店页"),
    ACTIVITY_PAGE("activity_page", "活动页"),
    SIGLE_PRODUCT_PAGE("single_product_page", "单品页"),
    MINI_CART("mini_cart","迷你购物车"),
    V_PLUS_PAGE("v_plus_page","V+会员页");
  */
  CHANNEL: "mini_cart",
  /*
    NOT_START(1, "未开始"),
    NOT_GRAB(2, "未领取"),
    HAVE_GRAB(3, "已领取"),
    HAVE_USED(4, "已使用"),
    HAVE_EMPTY(5, "已抢光"),
    HAVE_END(6, "已结束"),
    HAVE_EMPTY_TODAY(7, "今日抢光"),//明日抢
    UNEXCHANGE(8, "未兑换")
  */
  HAVE_GRAB: 3,
  /*
    凑单状态 0 非凑单 1 凑单
  */
  CAN_ADD_ON: 1,
};

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 优惠券信息
    item: {
      type: Object,
      value: {},
    },
    // 门店ID
    storeId: {
      type: String,
      value: "",
    },
    orgCode: {
      type: String,
      value: "",
    },
    fromSource: {
      type: String,
      value: "",
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
    buriedObj: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击按钮
    handleClick(e) {
      let { markState, addOnItemState } = e.detail.data;
      let items = e.detail.data;
      // 未领取
      if (markState != 3) {
        this.grabCoupon(e);
        // 埋点
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            userAction: items.userAction || "",
            storeId: this.data.storeId || "",
            activityCode: items.activityCode || "",
            couponId: items.couponId || "",
            couponType: items.couponType || "",
            actType: items.styles.couponButStyle.title || "",
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        });
        return;
      }
      // 1-可凑单 非1-不可凑单
      if (addOnItemState == 1) {
        this.goToAddOnPage(e);
        if (this.data.fromSource == "shopcar") {
          // 从全局购物车进入其他页面时，全局记录storeId,以便返回时单一刷新
          app.globalData.refreshShopid = this.data.storeId;
        }
        // 埋点
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            userAction: items.userAction || "",
            storeId: this.data.storeId || "",
            activityCode: items.activityCode || "",
            couponId: items.couponId || "",
            couponType: items.couponType || "",
            actType: items.styles.couponButStyle.title || "",
          },
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName,
          pageId: this.data.pageId
        });
      } else {
        wx.showToast({
          title: "暂不支持",
          icon: "none",
          duration: 2000,
        });
      }
    },
    // 去凑单列表页面
    goToAddOnPage() {
      let { storeId = "", orgCode = "", item = {} } = this.data;
      let { params } = item;
      let { limitType, priceDiff, couponId } = params;
      let url = `/pages/addOn/addOnList/index?storeId=${storeId}&orgCode=${orgCode}&couponId=${couponId}&limitType=${limitType}&priceDiff=${priceDiff}`;
      // 凑单列表页面埋点用
      let { price } = item;
      url += `&price=${price}`;

      wx.navigateTo({
        url,
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'minicart_addoncoupon_goToAddOnPage'
        }
      });
    },
    // 领取优惠券
    grabCoupon() {
      let {orgCode = '', item = {}} = this.data;
      let {activityCode, userAction, isFans = 0 } = item;
      let storeNo = JSON.parse(userAction).storeId || this.data.storeId;
      let {functionId='',appVersion=''} = FNIDS.grabCoupon
      request({
        functionId,
        appVersion,
        method: "POST",
        body: {
          code: activityCode,
          isFans,
          fromSource: CONSTANT.FROM_SOURCE,
          storeNo: storeNo,
          orgCode: orgCode,
          grabPlat: 1,
          platNewActivityFlag: '',
          isFloor: 0,
          needCouponGo: true,
          source: CONSTANT.SOURCE,
          channel: CONSTANT.CHANNEL,
        },
      })
        .then((res) => {
          let data = res.data;
          if (data.code === "0" && data.result) {
            mp.toast({
              title: res.data.result.message,
            });
            if (data.result.busiCode != "0") {
              return;
            }
            this.triggerEvent("updateCoupon");
          }
        })
        .catch(() => {});
    }
  },
});
