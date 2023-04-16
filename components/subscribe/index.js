/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-duplicate-case */
import {
  request,
  FNIDS
} from '../../common/util/api';
let app = getApp();
let isFirst = true;
Component({
  /**
   * 组件的属性列表showSubscribeMessage: false
   */
  properties: {
    showSubscribeMessage: {
      type: Boolean,
      value: false,
      observer: function () {
        // this.initSubscribeMessage()
        // this.setData({
        //     showSubscribeMessage: newVal
        // })
      }
    },

    subscribeMessageImageUrl: {
      type: String,
      value: ""
    },
    channel: {
      type: Array,
      value: [],
      observer: function (newVal) {
        this.setData({
          channel: newVal
        })
      }
    },
    tmplIds: {
      type: Array,
      value: [],
      observer: function (newVal) {
        this.setData({
          tmplIds: newVal
        })
        if (isFirst && newVal && newVal.length > 0) {
          isFirst = false;
          // 获取购物车数据
          this.initSubscribeMessage();
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showSubscribeMessage: false,
    tmplIds: [],
    channel: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 订阅
    // tmplIds array []
    initSubscribeMessage () {
      let that = this; let isSubscribeMessage = true;
      let tmplIds = that.data.tmplIds;
      // 阻止呼起弹层
      let t = setTimeout(() => {
        if (isSubscribeMessage) {
          that.hiddenShowSubscribeMessage(true, that)
        } else {
          that.hiddenShowSubscribeMessage(false, that)
        }
        clearInterval(t);
        isFirst = true;
      }, 1000)
      // console.log("========消息模板======", tmplIds);
      wx.requestSubscribeMessage({
        tmplIds: tmplIds,
        success (res) {
          // console.log(res, 'res_subscribe')
          if (res.errMsg == 'requestSubscribeMessage:ok') {
            // 用于阻止已经点击总是
            isSubscribeMessage = false
            that.hiddenShowSubscribeMessage(false, that)
            // 上报数据
            that.subscribeMessageUpdata(res, that)
            that.triggerEvent('subscribeOk', { result: res })
          }
        },
        fail (err) {
          // console.log(err, 'err_subscribe')
          // console.log("========err======", err)
          isSubscribeMessage = false
          that.hiddenShowSubscribeMessage(false, that)
          // 埋点
          that.triggerEvent('pageBuried', { type: 2, tempId: tmplIds })
          // clickBuried_({
          //     click_id: 'subscribeMessage',
          //     create_time: new Date(),
          //     click_par: {
          //         tempId: tmplIds
          //     }
          // })
          that.triggerEvent('subscribeFail', { result: err })
        }
      })

    },


    // 隐藏弹层
    hiddenShowSubscribeMessage (status, _t) {
      _t.setData({
        showSubscribeMessage: status
      })
    },

    // 订阅消息请求
    subscribeMessageUpdata (res, that) {
      let loginStateInfo = app.globalData.loginStateInfo;
      // 模板入参
      let templates = [];
      for (var key in res) {
        let tempId = {}
        // console.log("=======that.matchChannel(key)======", that.matchChannel(key))
        if (that.matchChannel(key)) {
          if (res[key] == 'reject') {
            tempId.status = "reject"
            tempId.templateId = key
            tempId.channelId = that.matchChannel(key)
          } else if (res[key] == 'accept') {
            tempId.status = "accept"
            tempId.templateId = key
            tempId.channelId = that.matchChannel(key)
          } else if (res[key] == 'ban') {
            tempId.status = "ban"
            tempId.templateId = key
            tempId.channelId = that.matchChannel(key)
            templates.push(tempId)
          }
          templates.push(tempId)
        }
      }

      // console.log("==========templates==========", templates)
      let { functionId = '', appVersion = '' } = FNIDS.subscribeMsg
      request({
        functionId,
        appVersion,
        body: {
          openId: loginStateInfo.openId || "",
          templates: templates
        },
        preObj: this.data.recommendObj && this.data.recommendObj || {}
      }).then(() => {
        // console.log("==========res==========", res)
        that.triggerEvent('subscribeMsgOk', { result: res })
      }).catch(() => {
        // console.log("==========err==========", err)
        that.triggerEvent('subscribeMsgFail', { result: res })
      })

      // 埋点
      that.triggerEvent('pageBuried', { type: 1, templates })
      // clickBuried_({
      //     click_id: 'subscribeMessage',
      //     create_time: new Date(),
      //     click_par: {
      //         templates: templates
      //     }
      // })

    },

    // 匹配channel
    matchChannel (templeKey) {
      if (this.data.channel && this.data.channel.length > 0) {
        let indexTemp = this.data.tmplIds.indexOf(templeKey);
        if (indexTemp != -1) {
          return this.data.channel[indexTemp];
        }
      }

      let channel = null
      switch (templeKey) {
      case 'MUMVz8L2w1GfGlI_pzERYQKRy8VvCMNUcUsxW-A7c3I': channel = 1; break;
      case '2DTGty37XUIpQfM2QgM-HUCE2YJ4Um6DUzM9ENBcXSE': channel = 2; break;
      case 'foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU': channel = 3; break;
      case 'sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU': channel = 4; break;
      case 'oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs': channel = 5; break;
      case 'foXXDvHMDaA45_8QPRwAd_p9unR3syrGG8kxIVQXUQ0': channel = 6; break;
        //   case 'oglvNUuESMzFISc5tCdVV3Q2gsDapLvzOOBw6EHQHjs': channel = 7; break;
        //   case 'foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU': channel = 8; break;
      case 'sUa5bwdXb322H3gZYAUF2CLKhDqgCfEE8ClYdMr69AU': channel = 9; break;
      case 'aHE90mjezRAJVQhzUhZ5vXoSQwwI8hgR-tYVSa9F5-A': channel = 10; break;
      case 'Ut2OT-SDxpcLcAp2MB_kJqF69ohZ5-Wjt8OnBDSscso': channel = 11; break;
      case 'B5atC925FkTqrFPYvjw4zywhoIDVcSKPXaMkAqqBQOY': channel = 12; break;
        //   case 'foXXDvHMDaA45_8QPRwAdwK2RdI_18wXLmFDg50u5QU': channel = 13; break;
      case "K1HtLhViyzUMKbZjeFmR3OKpz8gGpq3Fuy1guWIYVKA": channel = 14; break;
      case 'K1HtLhViyzUMKbZjeFmR3AS2FLYmxF1ua8XaReShCt0': channel = 15; break;
      case 'fchAp-FzoMeL7H-ENM6JyQV7z_wHexxQfIqhou26ijY': channel = 16; break;
      // 助力
      case '3zzStxd9r5oOQ0N569D5l-cJ6OYj1E3QHb095rCRvSs': channel = 17; break;
      case 'aUUy2JkJeivLJJCEPOMuM_fsywgjhNjdN4ryMeWYcsw': channel = 18; break;
      case 'iwJcSNrbfOXKnfhoi4tEJvC1AnVWoNj1R8D8FSctMs0': channel = 19; break;
      case 'fchAp-FzoMeL7H-ENM6JycKcHKnwK_Ae4YWl4jWXUQ4': channel = 20; break;
      // 门店、结算挽留
      case 'tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs': channel = 21; break;
      case 'aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM': channel = 22; break;
      case 'fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I': channel = 23; break;
	  //   预售
	  case 'oglvNUuESMzFISc5tCdVV8xjk92ZpbOY057_tOG-W4Q': channel = 24; break;
      default:
        channel = null;
      }
      return channel
    },

    // 关闭弹层
    hiddenSubscribeMessage () {
      this.setData({
        showSubscribeMessage: false
      })
    }
  }
})
