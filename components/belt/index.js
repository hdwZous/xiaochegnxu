import {
  request,
  FNIDS
} from '../../common/util/api'
import { djCmsJump } from "../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../common/util/BI";
Component({
  lazyObj: {
    epSelector: '.belt_stack'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    fading: {
      type: Number,
      value: 0
    },
    isShow: {
      type: Boolean,
      value: false
    },
    currentPage: {
      type: String,
      value: ''
    },
    refreshBeltFlag: {
      type: String,
      value: '',
      observer: function(val, oldVal) {
        // 新老时间戳不同
        if (val != oldVal) {
          this.getStorage()
        }
      }
    },
    channelId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: '',
      observer: function () {
        
      }
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
      type: String,
      value: {}
    },
    zIndex: {
      type: String,
      value: '11'
    },
    searchWord: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached: function () {
    }
  },
  pageLifetimes: {
    show: function() {
      this.getStorage()
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: {},
    isShowInside: false,
    hour: '00',
    minute: '00',
    second: '00',
    timer: null,
    isFirst: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getStorage() {
      let isBeltStorage = wx.getStorageSync("beltExist")
      let time = `${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`
      if (isBeltStorage) { // 存在缓存
        if (isBeltStorage[this.data.currentPage] == time) {
           // 当前页面时间和缓存时间一致，不显示腰带
          this.setData({
            isShowInside: false
          })
        } else {
          //当前页面时间和缓存时间不一致，显示腰带
          // this.setData({
          //   isShowInside: true
          // })
          this.getBelt()
        }
      } else { // 不存在缓存，显示腰带
        // this.setData({
        //   isShowInside: true
        // })
        this.getBelt()
      }
    },
    getBelt() {
      // 获取腰带内容
      request({
        functionId: FNIDS.beltPromptBar.functionId,
        appVersion: FNIDS.beltPromptBar.appVersion,
        body: {
          'pageSource': this.data.currentPage,
          channelId: this.data.channelId,
          searchWord: this.data.searchWord
        },
        method: 'POST',
        isNeedDealError: true,
        isForbiddenDialog: true,
        pageId: this.data.pageId,
        preObj: this.data.recommendObj || {}
      }).then(res => {
        let { data } = res
        if (data.code == 0 && data.result && data.result.contentText && data.result.contentText.length > 0) {
          // 显示腰带，组件内show - true
          this.setData({
            content: data.result,
            isShowInside: true
          })
          // 回传腰带类型
          this.triggerEvent('beltBacktop', {
            beltType: data.result.interactiveMode,
            isBeltData: true
          })
          // 显示腰带，组件内show - true
          // this.setData({
          //   isShowInside: true
          // })
          if (this.data.isShow && this.data.isFirst) {
            clickBuriedV2_({
              click_id: 'epLayerOpen',
              click_par: {
                userAction: this.data.content.userAction
              },
              currentPageName: this.data.currentPageName || '',
              prePageName: this.data.prePageName || '',
              pageId: this.data.pageId || '',
            })
            this.setData({
              isFirst: false
            })
          }
          // 倒计时
          if (data.result.countDownFlag) {
            this.showCountDown(data.result.countDownTime)
          }
        } else { // 接口失败, code不为0
          this.triggerEvent('beltBacktop', {
            isBeltData: false
          })
          this.setData({
            isShowInside: false
          })
        }
      }).catch(res => {
        console.log(res);
      })
    },
    closePop() {
      // 关闭弹窗
      let beltStorage = wx.getStorageSync("beltExist") || {}
      beltStorage[this.data.currentPage] = `${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`
      wx.setStorageSync("beltExist", beltStorage)

      this.setData({
        isShowInside: false
      })
      clickBuriedV2_({
        click_id: 'clickClose',
        click_par: {
          userAction: this.data.content.userAction,
        },
        currentPageName: this.data.currentPageName || '',
        prePageName: this.data.prePageName || '',
        pageId: this.data.pageId || '',
      })
    },
    jumpTo() {
      // 跳转
      const { to, params, userAction } = this.data.content
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.recommendObj,
        buried_position: {
          fromPositon: `belt-${this.data.currentPage}`,
        }
      })
    },
    // 展示倒计时
    showCountDown(time) {
      if (time > 0) {
        this.countDown(time, res => {
          if (res.end) {
            this.setData({
              hour: '00',
              minute: '00',
              second: '00'
            });
          }
          // 更新时间
          this.setData({
            hour: res.hour,
            minute: res.minute,
            second: res.second
          });
        })
      } else {
        this.setData({
          hour: '00',
          minute: '00',
          second: '00'
        })
      }
    },
    countDown(times, callBack) {
      // 秒
      // times = times / 1000;
      // 计时器
      clearInterval(this.data.timer)
      this.data.timer = setInterval(() => {
        let hour = 0,
          minute = 0,
          second = 0;
        if (times > 0) {
          hour = Math.floor(times / (60 * 60));
          minute = Math.floor(times / 60) - (hour * 60);
          second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
        }
        // 小于10补0
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        // 回调
        if (times > 0) {
          callBack({
            hour: hour + '',
            minute: minute + '',
            second: second + '',
            end: false
          })
        } else {
          callBack({
            hour: '00',
            minute: '00',
            second: '00',
            end: true
          })
        }
        times--;
      }, 1000)
    },
    // 清除计时器
    clearInterval() {
      clearInterval(this.data.timer)
      this.data.timer = null
    }
  }
})
