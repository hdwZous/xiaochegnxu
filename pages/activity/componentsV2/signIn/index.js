import mp from "../../../../common/util/wxapi";
// 请求
import {
  request,
  FNIDS
} from "../../../../common/util/api"
import util from '../../../../common/util/util';
import { djCmsJump } from '../../../../common/util/agreementV2'
import { getActivityCouponProtocol } from '../../../../common/util/services'
let app = getApp();
Component({
  lazyObj: {
    epSelector: '.activity_comp_ep',
    componentName: 'signin'
  },
  /**
  * 组件的属性列表
  */
  properties: {
    // 签到信息
    signData: {
      type: Object,
      value: {}
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
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      //   console.log('---signData------',JSON.stringify(this.data.signData))
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    isShowMask: false,
    isSignSuccess: true,
    isShowRuleMask: false,
    promoCode: '', //活动code
    signTicketDesc: '',
    giftType: 0,//礼品类型:1积分,2优惠券,3鲜豆,4兜底优惠券,5兜底鲜豆
    couponDetails: [],
    backgroundImg: '',
    orgCode: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handeleCloseRuleMask() {
      this.setData({
        isShowRuleMask: false
      })
    },
    handeleOpenRuleMask() {
      this.setData({
        isShowRuleMask: true
      })
    },
    handleRefreshActivityFloor() {
      let { functionId, appVersion } = FNIDS.ActivityRefreshSignInFloor
      let promoCode = this.data.promoCode;
      let pin = app.globalData.loginStateInfo.PDJ_H5_PIN;
      request({
        functionId,
        appVersion,
        body: {
          promoCode: promoCode,
          pin
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        preObj: this.data.recommendObj
      }).then(res => {
        mp.hideLoading();

        // console.log('-------res------', res)
        if (res.data.code === '0') {
          if (res.data.result) {
            // 签到成功  触发重新请求签到数据,刷新签到楼层
            let signData = this.data.signData;
            signData.data[0].signState = res.data.result.signState; // 1 签到 2 未签到
            signData.data[0].signDetails = res.data.result.signDetails;
            this.setData({
              signData
            })
          } else { //没有兜底奖品
            mp.dialog({
              content: res.data.msg,
              showCancel: false
            })
          }
        } else { // 接口异常
          mp.dialog({
            content: res.data.msg,
            showCancel: false
          })
        }
      }).catch(() => {
        mp.hideLoading();
      })
    },
    handleSign(e) {
      //判断是否登陆状态

      if (util.isLogin()) {
        // mp.loading_cover()
        let { functionId, appVersion } = FNIDS.globalActivitySign

        // console.log('--functionId---', functionId, '----', appVersion)

        // console.log('---pin--', app.globalData.loginStateInfo.PDJ_H5_PIN)
        let pin = app.globalData.loginStateInfo.PDJ_H5_PIN;
        let promoCode = e.currentTarget.dataset.promoCode;
        this.data.promoCode = promoCode;
        let signState = e.currentTarget.dataset.signState;
        // console.log('--promoCode--', promoCode, '---signState----', signState)
        if (signState == 2) { //未签到状态
          request({
            functionId,
            method: 'post',
            appVersion,
            body: {
              promoCode: promoCode,
              pin
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            preObj: this.data.recommendObj
          }).then(res => {
            mp.hideLoading();


            // let res = {"data":{"code":"0","msg":"成功","result":{"giftType":2,"orgCode":"","desc":"恭喜获得专属优惠券","couponDetails":[{"couponQuota":"1","availableDate":"2021.01.06-2021.01.08","limitRuleDesc":"满5元可用","showName":"8.6优惠券","couponType":1,"priceUnit":1,"needToUse":1,"activityCode":"RAKA0011291516","couponId":101521515}],"backgroundImg":"https://img30.360buyimg.com/mobilecms/jfs/t1/142937/24/18624/70040/5fd983bcE1adac03e/7ba2a39fd5b2c94d.png"},"success":true}}

            // console.log('-------res------', res)
            if (res.data.code === '0') {
              if (res.data.result) {
                let { desc = '', backgroundImg = '', prizeImg = '', orgCode = '', giftType = 0, couponDetails = [] } = res.data.result || {};
                this.setData({
                  isShowMask: true,
                  signTicketDesc: desc,
                  backgroundImg,
                  giftType,
                  couponDetails,
                  prizeImg,
                  orgCode
                })
                // 签到成功  触发重新请求签到数据
                this.handleRefreshActivityFloor();

              } else { //没有兜底奖品
                mp.dialog({
                  content: res.data.msg,
                  showCancel: false
                })
              }
            } else { // 接口异常
              this.setData({
                isShowMask: true,
                isSignSuccess: false
              })
            }

          }).catch(() => {
            mp.hideLoading();
            this.setData({
              isShowMask: false,
              isSignSuccess: false
            })
          })
        }

      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_position: "active-signIn-login"
        })
      }
    },

    handleCloseSuccessMask() {
      this.setData({
        isShowMask: false
      })

    },
    handleTicket(e) {
      let { activityCode = '', couponId = '' } = e.currentTarget.dataset.couponDetails;
      let orgCode = this.data.orgCode || '';
      this.jump({
        activityCode: activityCode,
        storeId: "",
        markState: "",
        orgCode: orgCode || '',
        couponId: couponId,
        couponType: "",
      })

    },
    //跳转协议
    jump(data) {

      getActivityCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: data.storeId || "",
        markState: data.markState || "",
        refPageSource: "",
        pageSource: "activityDetail",
        orgCode: data.orgCode || "",
        couponGoSource: 4,
        couponPattern: data.couponType || 1,
        couponId: data.couponId || "",
        ref: "",
        ctp: "active"
      }).then(res => {
        let result = res.data.result || '';
        if (res.data.code == '0' && result && result.length) {
          let item = result[0] || {};
          if (item.toast) {
            mp.toast({
              title: item.toast
            })
          } else {
            let { to = '', params = {}, userAction = "" } = item.couponComponentResponse || {};
            let paramsNew = { userAction: userAction };
            for (let i in item.couponComponentResponse.params) {
              if (i != 'passThroughParam') {
                paramsNew[i] = params[i]
              } else {
                for (let j in params.passThroughParam) {
                  if (params.passThroughParam[j]) {
                    paramsNew[j] = params.passThroughParam[j]
                  }
                }
              }
            }
            if (to) {
              djCmsJump({
                to: to,
                params: paramsNew,
                userAction,
                preObj: this.data.recommendObj,
                buried_position: "active-signIn"
              })
            }
          }
        } else {
          mp.toast({
            title: res.data.detail || '哎呀，点击太疼啦，稍后再点我哦~'
          })
        }
      })
    },
  },
});
