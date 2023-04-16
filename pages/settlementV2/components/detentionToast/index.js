import { request, FNIDS } from '../../../../common/util/api'
import { clickBuriedV2_ } from '../../../../common/util/BI'
import util from '../../../../common/util/util'
const { judgeAllowBtn } = util
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    info: {
      type: Object,
      value: null,
      observer(val) {
        if (val && val.leftButtonCopy) {
          let obj = JSON.parse(val.userAction)
          this.setData({
            detenType: obj.type
          })
        }
      }
    },
    unique: {
      type: String,
      value: ''
    },
    storeId: {
      type: String,
      value: ''
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

  observers: {
    
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    detenType: '',
    tmplIds: [],
    showSubscribe: false,
    subscribeImg: '',
    stepTypes: '',
    tmIds: ['tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs','aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM',
            'fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.setData({ show: false })
    },
    async goback() {
      let flags = await this.needShowSub()
      if (flags) {
        this.commonSetTmp('stepBack')
      } else {
        this.stepBack()
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickLayer',
        click_par: {
          storeId: this.data.storeId,
          type: 'retain',
          btnName: 'abstain'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    async commonSetTmp(stepTypes) {
      let isClicked = await judgeAllowBtn(this.data.tmIds)
      // 未点击过总是允许，赋予弹层img
      let subscribeImg = !isClicked ? 'https://storage.360buyimg.com/wximg/storewin/subscribe_img.png' : ''
      this.setData({
        tmplIds: this.data.tmIds,
        subscribeImg,
        showSubscribe: true,
        stepTypes
      })
      //埋点
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'showLayer',
        click_par: {
          type: subscribeImg.length ? 'subscribe' : 'hideSubscribe',
          templateId: this.data.tmIds.join(),
          channelId: 105
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    async getCoupon() {
      let flags = await this.needShowSub()
      if (flags) {
        this.commonSetTmp('stepCoupon')
      } else {
        this.stepCoupon()
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickLayer',
        click_par: {
          storeId: this.data.storeId,
          type: 'retain',
          btnName: 'order'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    downover() {
      this.close()
      this.triggerEvent('detentionSuccess')
    },
    async thinkAgain() {
      let flags = await this.needShowSub()
      if (flags) {
        this.commonSetTmp('stepAgain')
      } else {
        this.stepAgain()
      }
    },
    stepBack() {
      this.close()
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          storeId: this.data.storeId || '',
          type: this.data.detenType || '',
          btnName: this.data.info.leftButtonCopy || ''
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      wx.navigateBack({
        delta: 1
      });
    },
    stepCoupon() {
      let { functionId, appVersion } = FNIDS.mlioncoupon
      request({
        functionId,
        isNeedDealError: true,
        appVersion,
        method: 'post',
        body: {
          unique: this.data.unique
        },
        pageId: this.data.pageId || '',
        preObj: this.data.buriedObj
      }).then(res => {
        if (res.data.code == 0) {
          this.close()
          this.triggerEvent('detentionSuccess')
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2500
          });
        }
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2500
        });
      })
    },
    stepAgain() {
      if (this.data.info.coupons && this.data.info.coupons.length) {
        this.close()
        this.triggerEvent('detentionSuccess')
      } else if (this.data.info.products && this.data.info.products.length) {
        this.close()
      }
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          storeId: this.data.storeId || '',
          type: this.data.detenType || '',
          btnName: this.data.info.rightButtonCopy || ''
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    // 判断当前订阅消息是否需要弹出
    async needShowSub() {
      let subscribeAb = getApp().globalData.subscribeAb || ''
      let mpChannel = getApp().globalData.mpChannel || ''
      let count = 0;
      let isClicked = await judgeAllowBtn(this.data.tmIds)
      let record = wx.getStorageSync("subscribeCount") || {}
      let date = new Date();
      let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
      try {
        record = wx.getStorageSync("subscribeCount") || {}
        if (record.days && record.days == now) {
          count = record.count
        }
      } catch (e) {}
      if (subscribeAb == 'submit_a' && count < 2 && isClicked != null && mpChannel == 'wx_xcx') {
        return true;
      } else {
        return false;
      }
    },
    subscribeOk(e) {
      let { result } = e.detail
      let flag = false
      let tmIds = this.data.tmIds
      let report = []
      tmIds.forEach(item => {
        if (result[item] == 'accept') {
          flag = true
          report.push(item)
        }
      })
      if (flag == true) {
        // 假如temId有一个为accept，则表明用户选择了允许，需要缓存里记录次数
        let record = wx.getStorageSync("subscribeCount") || {}
        let date = new Date();
        let now = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`;
        if (record.days && record.days == now) {
          record.count += 1
        } else {
          record.days = now
          record.count = 1
        }
        try {
          wx.setStorageSync("subscribeCount", record)
        } catch (e) {}
        //埋点
        clickBuriedV2_({
          create_time: new Date(),
          click_id: 'clickLayer',
          click_par: {
            type: 'subscribe',
            templateId: report.join(),
            channelId: 105,
            btnName: 'accept'
          },
          pageId: this.data.pageId,
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        })
      }
      this.subscribeFail()
    },
    subscribeFail() {
      switch (this.data.stepTypes) {
        case 'stepBack':
          this.stepBack()
          break;
        case 'stepCoupon':
          this.stepCoupon()
          break;
        case 'stepAgain':
          this.stepAgain()
          break;
        default:
          break;
      }
    }
  }
});
