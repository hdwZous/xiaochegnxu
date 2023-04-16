
import { request, FNIDS } from "../../../../../common/util/api";
import { djCmsJump } from "../../../../../common/util/agreementV2.js";
import { clickBuriedV2_ } from '../../../../../common/util/BI';
Component({
  properties: {
    initData: {
      type: Object,
      value: {},
    },
    orderId: {
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
    attention: {
      type: String,
      value: "",
      observer: function (val) {
        this.setData({
          isAttention: val == "0" ? false : true,
        });
      },
    },
    show: {
      type: String,
      value: "",
      observer: function (val) {
        this.setData({
          isShow: val == "1" ? true : false,
        });
      },
    },
    storeName: {
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
    recommendObj: {
      type: Object,
      value: {}
    },
    midTelShow: {
      type: Boolean,
      value: ''
    },
    midTelDesc: {
      type: String,
      value: ''
    }
  },

  data: {
    isAttention: false,
    isShow: false
  },
  attached() {
  },
  methods: {
    goHome() {
      let { recommendObj = {}, initData = {} } = this.data;
      djCmsJump({
        to: "home",
        params: {},
        preObj: recommendObj,
        buried_postion: "order-paySuccess-basicInfo"
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickGoHome",
        click_par: {},
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    goOrder() {
      let { recommendObj = {} } = this.data;
      djCmsJump({
        to: "orderList",
        params: {},
        preObj: recommendObj,
        buried_postion: "order-paySuccess-basicInfo2"
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickGoOrderDetail",
        click_par: {},
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
    // goBack() {
    //   wx.switchTab({
    //     url: "/pages/tabBar/orderlist/index",
    //     preObj: this.data.recommendObj
    //   });
    // },
    // 关注门店
    fetchFollow() {
      let status = ''
      request({
        ...FNIDS.followStore,
        isForbiddenDialog: true,
        isNeedDealError: true,
        method: "POST",
        body: {
          orderId: this.data.orderId,
          storeId: this.data.storeId,
          orgCode: this.data.orgCode,
          attention: this.data.isAttention == 0 ? 1 : 0,
        },
        pageId: this.data.pageId,
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {
          let { code, result } = res.data || {};
          if (code == "0" && result) {
            wx.showToast({
              title: result.watch ? '已关注成功' : '已取消关注',
              icon: 'none'
            })
            this.setData({
              isAttention: result.watch,
              isShow: true,
            });
            status = result.watch ? '已关注成功' : '已取消关注'
          }
        })
        .catch(() => { });

      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickFollow",
        click_par: {
          status
        },
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      })
    },
  },
});
