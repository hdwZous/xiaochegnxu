import { clickBuriedV2_ } from "../../../../common/util/BI";
import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.newUser ',
    epSelector: '.channel_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        this.showCountDown(val.countDownTime)
      }
    },
    traceId: {
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
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    url: '',
    hour: '00',
    minute: '00',
    second: '00',
    timer: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击商品
    jumpItem(e) {
      const { to = '', params={}, userAction='' } = e.currentTarget.dataset.item
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-newUser1"
      })
    },
    // 点击合图优惠券
    clickCoupon(e) {
      const { to = '', params={}, userAction='' } = e.currentTarget.dataset.item
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-newUser2"
      })
    },
    // 点击右上角箭头
    jumpArrow(e) {
      const { arrowBtnTo, arrowBtnParams, arrowUserAction } = e.currentTarget.dataset.item
      if (arrowBtnTo) {
        djCmsJump({
          to: arrowBtnTo,
          params: arrowBtnParams,
          userAction: arrowUserAction,
          preObj: this.data.recommendObj,
          buried_postion: "channel-newUser3"
        })
      }
    },
    // 跳转查看更多
    jumpMore(e) {
      const { item } = e.currentTarget.dataset
      console.log(item);
      djCmsJump({
        to: item.skuSeeMoreTo,
        params: item.skuSeeMoreParams,
        userAction: item.skuSeeMoreUserAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-newUser4"
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
    },
    // 膨胀劵查看更多
    clickMore(e) {
      const { item } = e.currentTarget.dataset
      djCmsJump({
        to: item.expansionCouponSeeMore.to,
        params: item.expansionCouponSeeMore.params,
        userAction: item.expansionCouponSeeMore.userAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-newUser5"
      })
    },
    // 膨胀劵跳转
    expandClick(e) {
      const { item } = e.currentTarget.dataset

      djCmsJump({
        to: item.to,
        params: item.params,
        userAction: item.userAction,
        preObj: this.data.recommendObj,
        buried_postion: "channel-newUser6"
      })
    },
  }
})
