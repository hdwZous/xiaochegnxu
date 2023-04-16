import { djCmsJump } from '../../../../common/util/agreementV2'
import { getVipCoupon, getActivityCoupon, getActivityCouponProtocol, getShareCoupon } from '../../../../common/util/services'
import mp from '../../../../common/util/wxapi';
import util from '../../../../common/util/util';
import { clickBuriedV2_ } from "../../../../common/util/BI";
// let app = getApp();
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    selector: '.coupon_wrap',
    epSelector: '.activity_comp_ep'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 门店信息
    storeInfo: {
      type: Object,
      value: {},
      observer: function () {
        
      }
    },
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        let listOne = val && val.data && val.data[0] || {};
        if (listOne.imgWidth && listOne.imgHeight) {
          if (val.styleTpl === 'tpl25' || val.styleTpl === 'tpl28') { // 大于2个的情况
            this.setData({
              imgWidth: '320rpx',
              imgHeight: (320 * listOne.imgHeight / listOne.imgWidth) + 'rpx'
            })
          } else if (val.styleTpl === 'tpl1' || val.styleTpl === 'tpl5') { // 一行一个的情况
            this.setData({
              imgWidthOne: '710rpx',
              imgWidthTwo: '355rpx',
              imgHeightOne: (710 * listOne.imgHeight / listOne.imgWidth) + 'rpx',
              imgHeightTwo: (346 * listOne.imgHeight / listOne.imgWidth) + 'rpx'
            })
          } else if (val.styleTpl === 'tpl27' || val.styleTpl === 'tpl29') { // 一行两个的情况
            this.setData({
              imgWidthTwo: '346rpx',
              imgHeightTwo: (346 * listOne.imgHeight / listOne.imgWidth) + 'rpx'
            })
          }
        }
      }
    },
    idx: {
      type: Number,
      value: 0
    },
    subidx: {
      type: Number,
      value: 0
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
    imgWidth: '320rpx',
    imgHeight: '',
    imgWidthOne: '710rpx',
    imgHeightOne: '',
    imgWidthTwo: '346rpx',
    imgHeightTwo: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击优惠券(普通券和红包)
    clickCoupon(e) {
      if (util.isLogin()) {
        let { item = {}, index = 0, idx = 0, subidx = 0, userAction } = e.currentTarget.dataset || {};
        let { status, params = {}, couponType, orgId } = item;
        let { orgCode = '' } = this.data.storeInfo || {};
        if (status === 2) { // 普通券未领取
          this.getCoupon(params.id, couponType, orgId || orgCode).then(() => {
            // 更改券状态
            let key = `item.data[${index}].status`;
            // console.log('触发回调');
            this.setData({
              [key]: 3
            })
            this.triggerEvent('onCouponEvent', {
              type: 'coupons',
              data: this.data.item
            })
          })
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "click_coupon",
            click_par: {
              userAction: item.userAction || "",
              activityCode: item.params.id || "",
              couponId: item.couponId || "",
              couponType: item.couponType || "",
              actType: "领取",
            },
            pageId: this.data.pageId || "",
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        } else if (status === 3) { // 普通券去使用
          this.jump({
            activityCode: item.params.id,
            storeId: item.storeId || "",
            markState: item.status || "",
            orgCode: item.orgCode || "",
            couponId: item.couponId || "",
            couponType: item.couponType || "",
            userAction: userAction || ""
          })
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "click_coupon",
            click_par: {
              userAction: userAction || "",
              activityCode: item.params.id || "",
              couponId: item.couponId || "",
              couponType: item.couponType || "",
              actType: "去使用",
            },
            pageId: this.data.pageId || "",
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        } else if (status === 8) { // 红包券未兑换
          this.getRedCoupon(item.activityCouponInfo, idx, subidx, index)
        } else if (status === 9) { // 红包券已兑换
          let { activityCode, storeId, markState, orgCode } = item.activityCouponInfo || {};
          this.jump({
            activityCode: activityCode || "",
            storeId: storeId || "",
            markState: markState || "",
            orgCode: orgCode || "",
            couponId: item.params.id || "",
            couponType: couponType || "",
            userAction: userAction || ""
          })
        }
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_position: "active-coupon-login2"
        })
      }
    },
    // 点击助力券
    clickHelpCoupon(e) {
      if (util.isLogin()) {
        let { activityId = "", status = 0, storeId = "", couponId = "", toast = '', seekHelp = false, to = '', params = {}, userAction = '', couponType } = e.currentTarget.dataset.item || {};
        if (status == 1) { // 分享
          this.shareHelpCoupon(activityId)
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "click_coupon",
            click_par: {
              userAction: userAction || "",
              storeId: storeId || "",
              activityCode: activityId || "",
              couponId: couponId || "",
              couponType: couponType || "",
              actType: '分享领',
            },
            pageId: this.data.pageId || "",
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        } else if (status == 4) { // 失败
          this.shareHelpCoupon(activityId)
        } else if (status == 3) { //助力中
          to && djCmsJump({
            to,
            params,
            userAction,
            preObj: this.data.recommendObj,
            buried_position: "active-coupon1"
          })
        } else if (status == 5) { // 助力成功
          if (seekHelp) {
            this.shareHelpCoupon(activityId)
          } else {
            to && djCmsJump({
              to,
              params,
              userAction,
              preObj: this.data.recommendObj,
              buried_position: "active-coupon2"
            })
          }
        } else {
          toast && mp.toast({
            title: toast
          })
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "click_coupon",
            click_par: {
              userAction: userAction || "",
              storeId: storeId || "",
              activityCode: activityId || "",
              couponId: couponId || "",
              couponType: couponType || "",
              actType: '已抢光',
            },
            pageId: this.data.pageId || "",
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          });
        }
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_position: "active-coupon-login1"
        })
      }
    },
    // 助力券分享
    shareHelpCoupon(activityId) {
      if (util.isLogin()) {
        getShareCoupon({
          activityId: activityId || '',
          // 分享类型，"activity" 活动页| "store" 门店页|"product" 单品页|"helpon"助力券
          type: 'helpon'
        }).then(res => {
          let result = res.data.result || '';
          if (res.data.code == '0') {
            if (result) {
              let { helpStatus = 3, helpCouponGo = {} } = result.couponModel || {};
              this.triggerEvent('onCouponEvent', {
                type: 'helpCoupon',
                data: result
              })
              this.setData({
                [`item.data[0].status`]: helpStatus,
                [`item.data[0].to`]: helpCouponGo.to || '',
                [`item.data[0].params`]: helpCouponGo.params || {}
              })
            } else {
              mp.toast({
                title: '领取失败！'
              })
            }
          } else if (res.data.code == '100009') {
            if (res.data.detail) {
              mp.toast({
                title: res.data.detail || res.data.msg || '领取失败！'
              })
            } else {
              let { helpCouponGo = {}, userAction = '' } = result && result.couponModel || {};
              let { to = '', params = {} } = helpCouponGo || {};
              if (to) {
                djCmsJump({
                  to: to,
                  params: params,
                  userAction,
                  preObj: this.data.recommendObj,
                  buried_position: "active-coupon3"
                })
              }
            }
          } else {
            mp.toast({
              title: (res && res.data && res.data.msg) || "领取失败！",
            });
          }

        }).catch(() => {
          mp.toast({
            title: '领取失败！'
          })
        })
      } else {
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.recommendObj,
          buried_position: "active-coupon-login3"
        })
      }
    },
    // 跳转协议
    jump(data) {
      let { orgCode, storeId } = this.data.storeInfo || {};
      getActivityCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: data.storeId || storeId || "",
        markState: data.markState || "",
        refPageSource: "",
        pageSource: "activityDetail",
        orgCode: data.orgCode || orgCode || "",
        couponGoSource: 4,
        couponPattern: data.couponType || 1,
        couponId: data.couponId || "",
        ref: "",
        ctp: "active"
      }).then(res => {
        let result = res.data.result || '';
        if (res.data.code == '0' && result && result.length) {
          if (result.length > 1) { // 展示券包弹层
            // 展示弹层
            this.triggerEvent('onCouponEvent', {
              type: 'coupons',
              data: result
            })
          } else {
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
                  userAction: data.userAction,
                  preObj: this.data.recommendObj,
                  buried_position: "active-coupon4"
                })
              }
            }

          }
        } else {
          mp.toast({
            title:
              (res && res.data && res.data.detail) ||
              "哎呀，点击太疼啦，稍后再点我哦~",
          });
        }
      })
    },
    // 领取普通券
    getCoupon(code, couponType, orgCode) {
      return new Promise(resolve => {
        getActivityCoupon({
          "refPageSource": 'home',
          "code": code,
          "fromSource": 2,
          "operType": 1,
          "isFloor": 1,
          "needCouponGo": true,
          "grabPlat": 1,
          "platNewActivityFlag": '',
          "orgCode": orgCode || '',
          "channel": 'activity_page',
          "couponPattern": couponType,
          "pageSource": 'activityDetail',
          "ref": 'home',
          "ctp": 'active'
        }).then(res => {
          if (res.data.code === '0') {
            let { message, busiCode, responseList, extFieldMap = '' } = res.data.result || {};
            if (busiCode === '0') {
              resolve(responseList)
            } else if (busiCode === 'AC4401') { // 商家券
              mp.dialog({
                title: '提示',
                content: message || '开通会员后才可领取哦~(限商家会员)(AC4401)',
                cancelText: '暂不开通',
                confirmText: '立即开通'
              }).then(actRes => {
                if (actRes.confirm) {
                  extFieldMap && djCmsJump({
                    to: 'web',
                    params: extFieldMap,
                    preObj: this.data.recommendObj,
                    buried_position: "active-coupon5"
                  })
                }
              })
            } else {
              message && mp.toast({
                title: message
              })
            }
          } else {
            mp.toast({
              title: res && res.data.msg || "领券失败！",
            });
          }
        }).catch(() => {
          mp.toast({
            title: "领券失败！",
          });
        })
      })
    },
    // 领取红包券
    getRedCoupon(data, idx, subidx, index) {
      getVipCoupon({
        "refPageSource": 'home',
        "activityCode": data.activityCode || '',
        "grabChannel": 'activity_page',
        "buyCouponWithOrderFlag": false,
        "pageSource": 'activityDetail',
        "ref": 'home',
        "ctp": 'active'
      }).then(res => {
        let result = res.data.result || '';
        if (res.data.code === '0' && result) {
          this.triggerEvent('onCouponEvent', {
            type: 'vipCoupon',
            data: {
              index: index,
              idx: idx,
              subidx: subidx,
              vip: result,
              coupon: data
            }
          })
        } else {
          mp.toast({
            title: (res && res.data.msg) || "兑换失败",
          });
        }

      }).catch(() => {
        mp.toast({
          title: '兑换失败'
        })
      })

    }
  }
})
