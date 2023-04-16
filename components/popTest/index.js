import {
  djCmsJump
} from '../../common/util/agreementV2.js'
import emitter from '../../common/util/events'
import { clickBuriedV2_ } from "../../common/util/BI";

Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: true,
    item: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePop() {
      this.setData({
        show: false
      })
      wx.setStorageSync('agreeMentPrivacy', true)
      emitter.emit('agreeMentPrivacy', {
        agreeMentPrivacy: true
      })
      let {currentPageName, prePageName, pageId} = this.data.buriedObj || {}
      clickBuriedV2_({
        click_id: "clickLayer",
        click_par: {
          type: "authorization",
          isAgree: 1,
        },
        currentPageName,
        prePageName,
        pageId,
      });
    },
    gotoH5M() {
      let data = {
        "to": 'web',
        "params": {
          "url": "https://daojia.jd.com/html/agreementApp.html?type=87",

        },
      }
      djCmsJump({
        to: data.to,
        params: data.params
      });
    },
    gotoH5Y() {
      let data = {
        "to": 'web',
        "params": {
          "url": "https://daojia.jd.com/html/agreementApp.html?type=11",
        },
      }
      djCmsJump({
        to: data.to,
        params: data.params
      });
    },
    gotoH5P() {
      let data = {
        "to": 'web',
        "params": {
          "url": "https://daojia.jd.com/html/agreementApp.html?type=88",
        },
      }
      djCmsJump({
        to: data.to,
        params: data.params
      });
    },
    gotoH5(e) {
      let type = e && e.target && e.target.dataset && e.target.dataset.item
      switch (type) {
        case '1':
          this.gotoH5Y()
          break;
        case '2':
          this.gotoH5M()
          break;
        case '3':
          this.gotoH5P()
          break;
        default:
          break;
      }
    }
  }
})
