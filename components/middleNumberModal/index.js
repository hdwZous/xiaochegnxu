import {
  request,
  FNIDS
} from "../../common/util/api"
import {
  djCmsJump
} from '../../common/util/agreementV2.js'
import { clickBuriedV2_ } from "../../common/util/BI";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderId: {
      type: Number,
      value: 0,
    },
    storeId: {
      type: Number,
      value: 0,
    },
    shareToken: {
      type: String,
    },
    recommendObj: {
      type: Object,
      value: {}
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    box: {},
    outOfNumberProtect: false,
    state: "normal",
  },
  lifetimes: {
    attached: function () {
      this.checkMiddleNumber();
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    checkMiddleNumber() {
      const shareToken = this.data.shareToken || "";
      // console.log('shareToken---', this.data.shareToken);
      request({
        method: "GET",
        ...FNIDS.checkMiddleNumber,
        body: {
          orderId: this.data.orderId,
          shareToken,
        },
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {
          let result = res.data.result;
          if (result) {
            const { box, outOfNumberProtect } = result;
            // 如果号码保护失效
            if (outOfNumberProtect) {
              this.showInvalidModal(result);
              return;
            }

            this.setData({
              box,
              outOfNumberProtect,
            });
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: "none",
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          wx.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 3000,
          });
        });
    },
    getMiddleNumber() {
      const shareToken = this.data.shareToken || "";

      request({
        method: "GET",
        ...FNIDS.getMiddleNumber,
        body: {
          orderId: this.data.orderId,
          mobile: this.data.box.mobile,
          shareToken,
        },
        preObj: this.data.recommendObj || {}
      })
        .then((res) => {
          let result = res.data.result;
          if (result) {
            const { virtualMobile, outOfNumberProtect } = result;
            // 如果号码保护失效
            if (outOfNumberProtect) {
              this.showInvalidModal(result);
              return;
            }

            wx.makePhoneCall({
              phoneNumber: virtualMobile,
              success: function () {},
            });
          } else {
            wx.makePhoneCall({
              phoneNumber: this.data.box.mobile,
            });
            let { pageId, currentPageName, prePageName } =
              this.data.recommendObj;
            // 埋点
            clickBuriedV2_({
              create_time: new Date(),
              click_id: "showLayer",
              click_par: {
                type: "rideCallNormal",
                orderId: this.data.orderId,
                storeId: this.data.storeId,
              },
              pageId: pageId || "",
              currentPageName: currentPageName,
              prePageName: prePageName,
            });
          }
        })
        .catch((err) => {
          wx.showToast({
            title: err.data.msg,
            icon: "none",
            duration: 3000,
          });
        });
    },
    showInvalidModal(result) {
      const { box } = result;
      const btnList = box
        ? box.buttonList.map((val, index) => {
            val.color = index ? "#00CF37" : "#999";
            val.action = index ? "confirmInvalid" : "cancelInvalid";
            return val;
          })
        : [];

      this.setData({
        state: "invalid",
        title: box.title,
        btnList: btnList,
        text: box.text,
      });
      let { pageId, currentPageName, prePageName } = this.data.recommendObj;
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "showLayer",
        click_par: {
          type: "rideNormaDisable",
          orderId: this.data.orderId,
          storeId: this.data.storeId,
        },
        pageId: pageId || "",
        currentPageName: currentPageName,
        prePageName: prePageName,
      });
    },
    modifyPhone() {
      this.setData({
        state: "modify",
        title: "输入本机号码",
        cancelText: "取消",
        cancelColor: "#999",
        confirmText: "加密呼叫",
        confirmColor: "#00CF37",
        placeholderText: "请输入本机号码",
      });
      let { pageId, currentPageName, prePageName } = this.data.recommendObj;
      // 埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: {
          type: "rideNormalProtect",
          buttonName: "changeNumber",
          orderId: this.data.orderId,
          storeId: this.data.storeId,
        },
        pageId: pageId || "",
        currentPageName: currentPageName,
        prePageName: prePageName,
      });
    },
    updateMobile(e) {
      this.modifyMobile = e.detail.value;
      if (e.detail.value.length != 11) return;

      this.setData({
        "box.mobile": e.detail.value,
      });
    },
    cancelModify() {
      this.setData({
        state: "normal",
      });
    },
    confirmModify() {
      if (this.modifyMobile && this.modifyMobile.length != 11) {
        wx.showToast({
          title: "请输入正确的11位手机号码",
          icon: "none",
        });
        return;
      }
      this.getMiddleNumber();
    },
    cancelInvalid() {
      this.closeModal();
    },
    confirmInvalid(to, params) {
      djCmsJump({
        to,
        params,
        preObj: this.data.buriedObj,
        buried_position: {
          fromPositon: `middleNumberModal-${this.data.fromPositon}`,
          optionsPos: this.data.optionsPos
        }
      });
    },
    complete(e) {
      const methodMap = {
        call: "getMiddleNumber",
        confirmModify: "confirmModify",
        cancelModify: "cancelModify",
        cancelInvalid: "cancelInvalid",
        confirmInvalid: "confirmInvalid",
      };
      const { index, action } = e.currentTarget.dataset;
      const key = methodMap[action];
      const buriedMap = {
        call: {
          type: "rideNormalProtect",
          buttonName: "quickCall",
        },
        confirmModify: {
          type: "rideChangeNumber",
          buttonName: "quickCall",
        },
        cancelModify: {
          type: "rideChangeNumber",
          buttonName: "cancelCall",
        },
        cancelInvalid: {
          type: "rideNormaDisable",
          buttonName: "cancel",
        },
        confirmInvalid: {
          type: "rideNormaDisable",
          buttonName: "service",
        },
      };

      // 埋点
      let { pageId, currentPageName, prePageName } = this.data.recommendObj;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "clickLayer",
        click_par: {
          type: buriedMap[action].type,
          buttonName: buriedMap[action].buttonName,
          orderId: this.data.orderId,
          storeId: this.data.storeId,
        },
        pageId: pageId || "",
        currentPageName: currentPageName,
        prePageName: prePageName,
      });

      // 如果失效联系客服
      if (action == "confirmInvalid") {
        const { to, params } = this.data.btnList[index];
        this[key](to, params);
        return;
      }

      this[key]();
    },
    closeModal() {
      this.triggerEvent("closeModal", {});
      // 埋点
      let { pageId, currentPageName, prePageName } = this.data.recommendObj;
      this.data.state == "normal" &&
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "clickLayer",
          click_par: {
            type: "rideNormalProtect",
            buttonName: "cancelCall",
            orderId: this.data.orderId,
            storeId: this.data.storeId,
          },
          pageId: pageId || "",
          currentPageName: currentPageName,
          prePageName: prePageName,
        });
    },
  },
});
