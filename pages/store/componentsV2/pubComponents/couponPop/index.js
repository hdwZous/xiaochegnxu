import util from '../../../../../common/util/util'
import { clickBuriedV2_ } from "../../../../../common/util/BI";
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (obj) {
        // 如果有品，展示券+品的样式
        if (obj.skuList && obj.skuList.length > 0) {
          let skuObj = {};
          if (obj.skuList.length >= 3) {
            skuObj.one = obj.skuList[0];
            skuObj.two = obj.skuList.slice(1, 3);
          } else if (obj.skuList.length == 2) {
            skuObj.two = obj.skuList;
          } else {
            skuObj.one = obj.skuList[0];
          }
          this.setData({
            skuObj: skuObj || {},
            showPopType: "sku-coupon",
            userAction: obj.userAction || "",
          });
        }
        // 展示红包样式
        else if (obj.couponList && obj.couponList.length > 0) {
          this.setData(
            {
              showPopType: "coupon",
              showInPop: true,
              showOutPop: true,
              userAction: obj.userAction || "",
            },
            () => {
              let time = 900000;
              try {
                let day = new Date();
                let oldDate = `${day.getFullYear()}${
                  day.getMonth() + 1
                }${day.getDate()}`;
                let date = wx.getStorageSync("detention");
                if (oldDate == date) {
                  time = wx.getStorageSync("storePopTime") || 900000;
                }
              } catch (error) {
                // console.log(err)
              }
              this.showCountDown(time);
            }
          );
        }
      },
    },
    channelBusiness: {
      type: String,
      value: "",
    },
    options: {
      type: Object,
      value: {},
    },
    storeId: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showPopType: "",
    showInPop: false,
    showOutPop: false,
    hour: "",
    minute: "",
    second: "",
    end: false,
    skuObj: {},
    userAction: "",
  },

  // 在组件实例被从页面节点树移除时执行
  detached() {
    // 清楚倒计时
    this.clearInterval();
  },

  attached() {},

  /**
   * 组件的方法列表
   */
  methods: {
    goBack() {
      this.clearInterval();
      this.setData({
        showOutPop: false,
      });
      wx.navigateBack();
    },
    closeOutPop() {
      this.setData({
        showOutPop: false,
        showPopType: "",
      });
    },
    closeInPop() {
      this.setData({
        showInPop: false,
        showPopType: "",
      });
      this.clearInterval();
    },
    // 展示倒计时
    showCountDown(time) {
      let flag = true;
      if (time > 0) {
        util.newCountDown(time, (res) => {
          if (res.end) {
            this.setData({
              hour: "",
              minute: "",
              second: "",
              end: true,
            });
            this.clearInterval();
            return;
          }
          let hour = res.hour || "";
          let minute = res.minute || "";
          let second = res.second || "";
          // console.log(hour,minute,second)
          // 更新时间
          this.setData({
            hour,
            minute,
            second,
            end: false,
          });
          if (flag) {
            this.setData({
              timer: res.timer,
            });
            flag = false;
          }
          try {
            wx.setStorageSync("storePopTime", res.times);
          } catch (error) {
            // console.log(err)
          }
        });
      } else {
        this.setData({
          hour: "",
          minute: "",
          second: "",
        });
      }
    },
    // 清除计时器
    clearInterval() {
      let timer = this.data.timer;
      if (timer !== null) {
        clearInterval(timer);
        this.setData({
          timer: null,
        });
      }
    },
    addCart(e) {
      let item = e.currentTarget.dataset.item || {};
      this.setData({
        showPopType: "",
      });
      this.triggerEvent("freshMinicart", {
        skuId: item.skuId,
        incartCount: item.incartCount,
        showModel: 0,
        userAction: this.data.userAction || "",
      });
      this.addLog("click_add", {
        type: this.data.channelBusiness == "jdncapplsd" ? "jdFarm" : "",
        userAction: this.data.userAction || "",
        storeId: this.data.storeId || "",
        skuId: item.skuId || ""
      });
    },
    // 关闭展示商品的弹层
    closeSkuPop(e) {
      let name = e.currentTarget.dataset.name || "";
      this.setData({
        showPopType: "",
      });
      this.addLog(name, {
        type: this.data.channelBusiness == "jdncapplsd" ? "jdFarm" : "",
        userAction: this.data.userAction || "",
        storeId: this.data.storeId
      });
    },
    addLog(name, opts) {
      clickBuriedV2_({
        click_id: name,
        click_par: opts,
      });
    },
  },
});
