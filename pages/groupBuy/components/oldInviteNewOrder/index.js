
import util from '../../../../common/util/util';
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../../../common/util/BI"
let app = getApp()
const TYPE = {
  // 倒计时结束
  refresh: 'refresh'
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
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
    item: {},
    countDownStr: '00:00:00',
    timer: null
  },
  attached() {
    let data = this.data.data || {};
    let time = data && data.groupRemainTime;
    this.setData({
      item: data
    });
    if (time && time > 0) {
      this.showCountDown(time)
    }
  },
  // 在组件实例被从页面节点树移除时执行
  detached() {
    // 清除倒计时
    this.clearInterval()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 展示倒计时
    showCountDown(time) {
      let flag = true;
      if (time > 0) {
        util.newCountDown(time, res => {
          if (res.end) {
            this.setData({
              countDownStr: '00:00:00'
            });
            this.clearInterval();
            this.triggerEvent('pageEvent', {
              type: TYPE.refresh,
            })
            return;
          }
          let countDownStr = '';
          if (res.day) {
            countDownStr = res.day + '天' + res.hour + ':' + res.minute + ':' + res.second
          } else {
            countDownStr = res.hour + ':' + res.minute + ':' + res.second
          }
          // 更新时间
          this.setData({
            countDownStr: countDownStr
          });
          if (flag) {
            this.setData({
              timer: res.timer
            });
            flag = false
          }
        })
      } else {
        this.setData({
          countDownStr: '00:00:00'
        })
      }
    },
    // 清除计时器
    clearInterval() {
      let timer = this.data.timer;
      if (timer !== null) {
        clearInterval(timer);
        this.setData({
          timer: null
        })
      }
    },

    // 再团一个
    launchOther(e) {
      let data = e.currentTarget.dataset;
      let skuId = data.skuId || '';
      let storeId = data.storeId || '';
      let orgCode = data.orgCode || '';
      let status = data.status || '';
  
      let recommendObj = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "ClickMyCollageButton",
        click_par: {
          storeId: storeId,
          skuId: skuId,
          orgcode: orgCode,
          type: 1,
          status: status,
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || "",
      });
      wx.navigateTo({
        url: `/pages/groupBuy/oldInviteNew/detail/index?promotionId=${data.promotionId}&storeId=${data.storeId}`,
        preObj: recommendObj,
        buried_position: "groupBuy-oldInviteNewOrder1",
      });
    },
    //去详情页
    goToResult(e) {
      let data = e.currentTarget.dataset;
      let skuId = data.skuId || '';
      let storeId = data.storeId || '';
      let orgCode = data.orgCode || '';
      let status = data.status || '';
    
      let recommendObj = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "ClickMyCollageArea",
        click_par: {
          skuId: skuId,
          storeId: storeId,
          orgcode: orgcode,
          type: 1,
          status: status,
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || "",
      });
      wx.navigateTo({
        url: `/pages/groupBuy/oldInviteNew/result/index?promotionId=${data.promotionId}&groupId=${data.groupId}&storeId=${data.storeId}&from=order`,
        preObj: recommendObj,
        buried_position: "groupBuy-oldInviteNewOrder2",
      });
    },
    // 判断团状态
    getStatusStr(status) {
      // 拼团状态 0：待成团 1：已成团 2：团失败
      let statusStr = '';
      if (status == 0) {
        statusStr = '分享';
      } else if (status == 1) {
        statusStr = '成功';
      } else if (status == 2) {
        statusStr = '失败';
      }
      return statusStr;
    },
    // 进入门店
    enterStore(e) {
   
      let recommendObj = this.data.recommendObj || {};
      clickBuriedV2_({
        click_id: "ClickChangeCollageStore",
        click_par: {
          "type": 1
        },
        currentPageName: recommendObj.currentPageName || "",
        prePageName: recommendObj.prePageName || "",
        pageId: recommendObj.pageIdFirstPage || "",
      });
      let data = e.currentTarget.dataset;
      let promotionId = data.promotionId || '';
      let skuId = data.skuId || '';
      let storeId = data.storeId || '';
      let orgCode = data.orgCode || '';
      wx.navigateTo({
        url:
          "/pages/store/index?storeId=" +
          storeId +
          "&orgCode=" +
          orgCode +
          "&skuId=" +
          skuId +
          "&longitude=" +
          app.globalData.addressInfo.longitude +
          "&latitude=" +
          app.globalData.addressInfo.latitude,
        preObj: recommendObj,
        buried_position: "groupBuy-oldInviteNewOrder3",
      });
    }
  }
})