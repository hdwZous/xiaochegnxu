import { request, FNIDS } from '../../common/util/api';
import { clickBuriedV2_} from '../../common/util/BI';

Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".all_wrap .eb_pub-coupon",
    needExposure: true,
  },
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        this.filterConponListData(val);
      },
    },
    type: {
      type: Number,
      value: 1, //优惠券样式 1普通优惠券 2我的优惠券 3结算页面优惠券
    },
    circleBgColor: {
      type: String,
      value: "#fff", //缺角的背景色 transparent
    },
    ratioBtnImgUrl: {
      type: String,
      value: "https://s.360buyimg.com/wximg/settlement/30.png", //单选框图片地址
    },
    unique: {
      type: String,
      value: "",
    },
    orderPageId: {
      type: String,
      value: "",
    },
    unuseType: {
      //降级请求不可用原因
      type: String,
      value: "",
    },
    isFirst: {
      //是否竖向滚动,在sroll-view页面使用fixed定位，不能全部显示，得拿到scroll-view页面外
      type: Number,
      value: false,
    },
    // 埋点需要
    traceId: {
      type: String,
      value: ""
    },
    pageId: {
      type: String,
      value: "",
    },
    currentPageName: {
      type: String,
      value: ""
    },
    prePageName: {
      type: String,
      value: ""
    },
    curIndex: {
      type: Number,
      value: 0,
      observer: function (newV, oldV) {
        // 切换tab要重新曝光当前tab下的券
        if (newV != oldV) {
          this.epSection && this.epSection();
        }
      },
    },
    noNeedExposure: {
      type: Boolean,
      value: false,
    },
    hasSkuImg: {
      type: Boolean,
      value: false
    },
    couponCacheId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    fold: true,
    showTips: false
  },
  ready() { },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击按钮
    handleBtnClick() {
      this.triggerEvent("rightBtnClick", {
        data: this.data.item,
        userAction: this.data.userAction,
      });
    },
    handleSelectClick() {
      if (this.data.type == 3) {
        this.triggerEvent("selectBtnClick", { data: this.data.item });
      }
    },
    //折叠按钮
    handleFolderClick() {
      this.setData({
        fold: !this.data.fold,
      });
    },
    // 左边icon点击
    handleLeftIconClick() {
      let window = wx.getSystemInfoSync();
      let bottom = 0;
      let left = 0;
      let top = 0;
      let trigleL = 0;
      let _this = this;
      let width = window.windowWidth
      let logWidth = this.data.hasSkuImg ? 190 : 160
      let query = wx.createSelectorQuery().in(this);
      query
        .select(".old-coupon-one-wrap")
        .boundingClientRect(function (res) {
          if (width - res.left < logWidth) {
            left = width - logWidth
            trigleL = res.left + 10
          } else {
            left = res.left;
            trigleL = res.left + 30
          }
          top = res.top;
          bottom = window.windowHeight - res.top + 10;
          if (_this.data.item.couponLeftIcon.icon) {
            if (!_this.data.isFirst) {
              _this.setData({
                showTips: !_this.data.showTips,
                left,
                bottom,
                trigleL,
                trigleT: window.windowHeight - res.top + 5
              });
            } else {
              _this.setData({
                showTips: !_this.data.showTips,
                left,
                top: top + 20
              });
            }
          }
        }).exec();
      let { hasSkuImg, item: { unusableReason = '', couponUnusableReason = null, couponCode = '' } = {} } = this.data
      if (
        ((!hasSkuImg && !unusableReason) || (hasSkuImg && !couponUnusableReason)) &&
        this.data.unique &&
        this.data.item.couponLeftIcon &&
        this.data.item.couponLeftIcon.icon
      ) {
        let { functionId = "", appVersion = "" } = FNIDS.queryCouponUnusableReason;
        request({
          method: "POST",
          functionId,
          appVersion,
          body: {
            unique: this.data.unique || "",
            orderPageId: this.data.orderPageId,
            type: this.data.unuseType || "",
            fromSource: 5,
            couponCode: this.data.item.couponCode,
            couponCacheId: this.data.couponCacheId
          },
          pageId: this.data.pageId || "",
          preObj: this.data.recommendObj || {}
        }).then((res) => {
          let { code, result = null } = res && res.data || {}
          if (code == 0 && result) {
            if (hasSkuImg) {
              this.data.item.couponUnusableReason = result.couponUnusableReason;
              if (hasSkuImg) {
                let { unusableReasonText = '' } = result.couponUnusableReason || {}
                clickBuriedV2_({
                  create_time: new Date(),
                  click_id: "clickExplainIcon",
                  click_par: {
                    iconName: '优惠券不可用',
                    couponId: couponCode,
                    isLayer: 1,
                    unusableReasonText: unusableReasonText
                  },
                  pageId: this.data.pageId || "",
                  currentPageName: this.data.currentPageName,
                  prePageName: this.data.prePageName
                });
              }
            } else {
              this.data.item.unusableReason = result.unusableReason;
            }
            this.setData({
              item: this.data.item,
            });
          } else {
            this.setData({
              showTips: false
            })
          }
        }).catch((err) => {
          this.setData({
            showTips: false
          })
        });
      } else {
        if (hasSkuImg) {
          let { unusableReasonText = '' } = couponUnusableReason || {}
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "clickExplainIcon",
            click_par: {
              iconName: '优惠券不可用',
              couponId: couponCode,
              isLayer: 1,
              unusableReasonText: unusableReasonText
            },
            pageId: this.data.pageId || "",
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        }
      }
    },
    handleMaskClick() {
      this.setData({
        showTips: false,
      });
    },
    // 处理价格展示
    filterConponListData(item) {
      let { price } = item;
      if (price && price.split(".").length > 1) {
        item.renderDataByFE = {};
        item.renderDataByFE.price = price.split(".");
        this.setData({
          item: item,
        });
      }
    },
    stopBubble() {
      return;
    },
  },
});
