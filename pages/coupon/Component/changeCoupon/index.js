import { request, FNIDS } from "../../../../common/util/api.js";
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    changeCode: {
        type: String,
        value: '',
        observer: function (val) {
            this.setData({
                value: val || ''
            })
        }
    },
    pageId: {
      type: String,
      value: ''
    }
  },
  data: {
    value: "",
    warn: false,
  },
  methods: {
    handleInput(e) {
      console.log(e.detail.value);
      this.setData({
        value: e.detail.value,
        warn: e.detail.value.length == 0,
      });
    },
    cancel() {
      this.setData({
        value: "",
      });
      this.triggerEvent("hideChangePop");
    },
    confirm() {
        if (!this.data.value.length) {
          wx.showToast({
            title: "兑换码不能为空",
            icon: "none",
          });
          return
        }
        let { pageId } = this.data;
        request({
          ...FNIDS.exchangeCode,
          isNeedDealError: true,
          isForbiddenDialog: true,
          body: {
            exchangeCode: this.data.value || "",
          },
          pageId: pageId,
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            this.setData({
              value: "",
            });
            let { code, result } = res.data || {};
            if (code == 0 && result) {
              wx.showToast({
                title: "兑换成功",
                icon: "none",
              });
              this.triggerEvent("hideChangePop", true);
            } else {
              wx.showToast({
                title: "兑换失败",
                icon: "none",
              });
              this.triggerEvent("hideChangePop", false);
            }
          })
          .catch((err) => {
            this.setData({
              value: "",
            });
            this.triggerEvent("hideChangePop", false);
            wx.showToast({
              title: "兑换失败",
              icon: "none",
            });
          });
      
    },
  },
});
