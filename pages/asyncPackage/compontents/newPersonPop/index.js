import {
  isLogin
} from '../../../../common/util/loginUtil';
import {
  request
} from '../../../../common/util/api';
import { mpCmsJump } from "../../../../common/util/agreementV2.js";
let app = getApp()
Component({
  /**
     * 组件的属性列表
     */
  properties: {
    // 是否展示弹层
    showPop: {
      type: Boolean,
      value: false,
      observer: function(newVal) {
        this.setData({
          showPop: newVal
        })
      }
    },
    // 是否登录
    isLogin: {
      type: Boolean,
      value: true,
      observer: function(newVal) {
        this.setData({
          isLogin: newVal
        });
      }
    },
    // 弹层数据
    popData: {
      type: Object,
      value: {},
      observer: function(newVal) {
        if(newVal && newVal.homePageUrl) { // 专属助力红包
          let name = newVal.name;
          let nameArr = name.split('元');
          let price = nameArr[0];
          let subName = nameArr[1];
          newVal.price = price;
          newVal.subName = subName;
        }
        this.setData({
          popData: newVal
        });
      }
    },
    buriedObj: {
      type:Object,
      value:{}
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    toUseUrl: "https://storage.360buyimg.com/wximg/newPeopleCoupon/new_homeNewPeople.png",
    toGetUrl: "https://storage.360buyimg.com/wximg/newPeopleCoupon/new_homeNewPeople2.png",
    imgUrl: ""
  },
  /**
     * 组件的方法列表
     */
  methods: {
    clickCoupon(e) {
      this.setData({
        showPop: false
      });
      let data = e.currentTarget.dataset
      if (data.name == "homePop") {
        // 是否需要微信模板消息通知
        let needPushMsg = data.needPushMsg;
        // 模板消息上报接口ID
        let functionId = data.functionId;
        // 是否需要登录
        let needLogin = data.needLogin;
        // h5地址
        let linkUrl = data.linkUrl;
        // 跳转小程序页地址
        let jump = data.jump;
        // 临时宫格名称
        let title = data.title || '';
        // 跳转参数
        let jumpParam = new Object();
        let jumpParamStr = data.jumpParam || "";
        let paramArry = jumpParamStr.split("&");
        paramArry.forEach((item) => {
          let itemdata = item.split("=");
          let keyName = itemdata[0];
          let keyValue = itemdata[1];
          jumpParam[keyName] = keyValue
        })

        // 埋点
        this.triggerEvent('pageBuried',{type:1,title:title})
        // clickBuried_({
        //     click_id: "layer",
        //     create_time: new Date(),
        //     click_par: {
        //         title: title
        //     }
        // });
        // 微信推送模板消息
        if (needPushMsg) {
          let formId = e.detail.formId;
          let openId = app.globalData.loginStateInfo.openId;
          let unionId = app.globalData.loginStateInfo.unionid_pdj_jd_new;

          if (formId && openId && unionId) {
            request({
              method: 'POST',
              functionId: functionId || '',
              body: {
                formId: formId || '',
                toUser: openId || ''
              }
            }).then(() => {

            }).catch(() => {

            })
          }
        }
        // 跳转
        if (needLogin) {
          if (isLogin()) {
            if (jump && jump !== "0") {
              mpCmsJump({
                pageType: jump,
                params: jumpParam,
                preObj: this.data.buriedObj,
              });
              return
            }
            let url = linkUrl;
            if (url) {
              // 纬度
              let latitude = app.globalData.addressInfo.latitude;
              // 经度
              let longitude = app.globalData.addressInfo.longitude;
              // 城市ID
              let cityId = app.globalData.addressInfo.cityId;
              // h5地址
              let linkUrl = url + '&miniProgram=daojia&lat=' + latitude + '&lng=' + longitude + '&cityId=' + cityId;
              // 跳转H5
              wx.navigateTo({
                url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent(linkUrl)
              })
            }
          } else {
            // wx.navigateTo({
            //     url: '../newLogin/login/login?source=game'
            // })
                        
            wx.navigateTo({
              url: `/pages/newLogin/login/login`
            })
          }
        } else {
          //后置登录
          if (jump) {
            mpCmsJump({
              pageType: jump,
              params: jumpParam,
              preObj: this.data.buriedObj,
            });
            return
          }
          let url = linkUrl;
          if (url) {
            // 纬度
            let latitude = app.globalData.addressInfo.latitude;
            // 经度
            let longitude = app.globalData.addressInfo.longitude;
            // 城市ID
            let cityId = app.globalData.addressInfo.cityId;
            // h5地址
            let linkUrl = url + '&miniProgram=daojia&lat=' + latitude + '&lng=' + longitude + '&cityId=' + cityId;
            // 跳转H5
            wx.navigateTo({
              url: '/pages/h5/index?needToken=1&url=' + encodeURIComponent(linkUrl)
            })
          }
        }
      } else if (data.name == "newCoupon") {
        if (this.data.isLogin) {
          this.triggerEvent('pageBuried',{type:2,title:'15元红包待使用弹层'})
          // clickBuried_({
          //     create_time: new Date(),
          //     click_id: "layer",
          //     click_par: {
          //         title: "15元红包待使用弹层"
          //     }
          // })
          wx.switchTab({
            url: "/pages/home/home"
          })
        } else {
          this.triggerEvent('pageBuried',{type:3,title:'新人专享15元红包弹层'})
          // clickBuried_({
          //     create_time: new Date(),
          //     click_id: "layer",
          //     click_par: {
          //         title: "新人专享15元红包弹层"
          //     }
          // })
                    
          wx.navigateTo({
            url: `/pages/newLogin/login/login`
          })
        }

      }
    },
    // 去优惠券列表页
    goToCouponList() {
      let that = this;
      // 跳转到我发起的助力
      wx.navigateTo({
        url: '/pages/friendHelp/list/index?tab=1',
        success() {
          that.setData({
            showPop: false
          })
        }
      })
      // wx.navigateTo({
      //     url: '/pages/coupon/person-coupon',
      //     success() {
      //         that.setData({
      //             showPop: false
      //         })
      //     }
      // })
    },
    hidePop(e) {
      let data = this.data,
        dataset = e.currentTarget.dataset;
      if (data.popData) {
        this.triggerEvent('pageBuried',{type:4,title:data.popData.title,types:dataset.name})
        // clickBuried_({
        //     create_time: new Date(),
        //     click_id: "close",
        //     click_par: {
        //         title: data.popData.title,
        //         type: dataset.name
        //     }
        // })
      } else if (data.isLogin) {
        this.triggerEvent('pageBuried',{type:5,title:'15元红包待使用弹层',types:dataset.name})
        // clickBuried_({
        //     create_time: new Date(),
        //     click_id: "close",
        //     click_par: {
        //         title: "15元红包待使用弹层",
        //         type: dataset.name
        //     }
        // })
      } else {
        this.triggerEvent('pageBuried',{type:6,title:'新人专享15元红包弹层',types:dataset.name})
        // clickBuried_({
        //     create_time: new Date(),
        //     click_id: "close",
        //     click_par: {
        //         title: "新人专享15元红包弹层",
        //         type: dataset.name
        //     }
        // })
      }
      this.setData({
        showPop: false
      });
      // if (isLogin()) {
      //     wx.switchTab({
      //         url: "/pages/home/home"
      //     })
      // }
    }
  }
})