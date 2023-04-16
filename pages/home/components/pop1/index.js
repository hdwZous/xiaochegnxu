import { djCmsJump } from "../../../../common/util/agreementV2.js";
import util from '../../../../common/util/util'
const { judgeAllowBtn, isLogin } = util
Component({
  lazyObj: {
    selector: '.home_pop1',
    epSelector: '.home_pop1'
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    data: {
      type: Object,
      value: {},
      observer: function (obj) {
        obj &&
          obj.data &&
          this.setData({
            isShow: !!obj.data.showImgUrl,
            imgUrl: obj.data.showImgUrl || "",
            height: (obj.data.imgHeight * 610) / obj.data.imgWidth
          });
      }
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },
  data: {
    isShow: false,
    height: "auto",
    imgUrl: "",
    tmplIds: [],
    tmIds: [
      'tVl3oywjEtM5mNz-179LZNPRgkA9a3tKvRkszASHgjs', 'aUUy2JkJeivLJJCEPOMuMyN4ew4pS1_Qn9Ln_YOeeYM',
      'fchAp-FzoMeL7H-ENM6JyboyPHI5mMhuG9XqsCvqK5I'],
    showSubscribe: false,
    subscribeImg: '',
    stepTypes: '',
  },
  methods: {
    async hidePop(e, type) {
      let flags = await this.needShowSub()
      if (flags && isLogin() && !type) {
        this.commonSetTmp('stepClose')
      } else {
        this.setData({
          isShow: false
        });
      }

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
    
    },
    // 判断当前订阅消息是否需要弹出
    async needShowSub() {
      let subscribeAb = getApp().globalData.subscribeAb || ''
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
      } catch (e) {
        /**/ 
      }
      if (subscribeAb == 'submit_a' && count < 2 && isClicked != null && isLogin()) {
        return true;
      } else {
        return false;
      }
    },
    jump(e) {
      let { data = {}, userAction } = e.currentTarget.dataset.item;
      // 因getIndex接口无法下发字段，所以暂时写死
      const url = data.params.url;
      if (url && url.includes("pages/newUser-t/index")) {
        data.to = "newUser";
      }
      if (data.to && JSON.stringify(data.params) != '{}') {
        djCmsJump({
          to: data.to,
          params: data.params,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homepop1_jump_home'
          }
        });
      }
      this.hidePop(e, 'hide');
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
        } catch (e) { 
          /**/
        }
        
      }
      this.subscribeFail()
    },
    subscribeFail() {
      // switch (this.data.stepTypes) {
      //   case 'stepClose':
      //     this.stepClose()
      //     break;
      //   case 'stepLeave':
      //     this.stepLeave()
      //     break;
      //   default:
      //     break;
      // }
      this.setData({
        isShow: false
      });
    }
  }
});
