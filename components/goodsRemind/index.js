import util from "../../common/util/util";
import { request, FNIDS } from "../../common/util/api";
import { clickBuriedV2_ } from "../../common/util/BI";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
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
    skuId: {
      type: String,
      value: "",
    },
    // 页面来源
    pageSource: {
      type: String,
      value: "",
    },
    // 按钮状态 9显示到货提醒，10显示已订阅到货提醒
    showState: {
      type: Number,
      value: 0,
    },
    buttonEnable: {
      type: Boolean,
      value: true
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ''
    },
    optionsPos: {
      type: Object,
      value: {}
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    userAction: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 防止重复点击减车
    minFlag: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goodRemind() {
      try {
        let { pageId, currentPageName, prePageName } = this.data.recommendObj;
        // 埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "remindOnSkuArrive",
          click_par: {
            userAction: this.data.userAction,
            isCeiled: 0
          },
          pageId: pageId || "",
          currentPageName: currentPageName,
          prePageName: prePageName,
        });
      } catch (error) {}
      if (!util.isLogin()) {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj,
          buried_position: {
            fromPositon: `goodsRemind-${this.data.fromPositon}`,
            optionsPos: this.data.optionsPos
          }
        });
      } else if (this.data.showState == 10 || this.data.buttonEnable == false){
        return
      } else {
        let source = this.data.pageSource == "goodsinfo" ? "ITEM_PAGE" : "";
        request({
          ...FNIDS.followStock,
          method: "POST",
          isNeedDealError: true,
          body: {
            orgcode: this.data.orgCode,
            storeId: this.data.storeId,
            skuId: this.data.skuId,
            source
          },
          preObj: this.data.recommendObj || {}
        }).then((res) => {
          if (res.data.code == 0) {
            let result = res.data.result;
            if (result.openNotificationFollowMsg) {
              wx.showModal({
                title: "订阅成功",
                content: result.openNotificationFollowMsg.replace("<br/>",""),
                confirmText: "我知道了",
                confirmColor: "#00CF37",
                showCancel: false,
              });
            }
            if (result.followTip) {
              this.setData({
                title: result.followTip,
                showState: 10,
              });
            }
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 2500,
            });
          }
        })
        .catch((err) => {
          wx.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 2500,
          });
        });
      }
    },
  },
});
