import { FNIDS, request } from '../../common/util/api'
import mp from '../../common/util/wxapi'
import {
  isLogin
} from "../../common/util/loginUtil"
import { clickBuriedV2_ } from "../../common/util/BI";
let beansFlag = true;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: {
      type: String,
      value: ""
    },
    item: {
      type: Object,
      value: {},
      observer: function (newVal) {
        if (newVal) {
          // this.dealItem(newVal)
          this.dealTitle(newVal);
        }
      }
    },
    orderId: {
      type: Number,
      value: ""
    },
    index: {
      type: Number,
      value: 0
    },
    currentPageName: {
      type: String,
      value: ""
    },
    prePageName: {
      type: String,
      value: ""
    },
    pageId: {
      type: String,
      value: ""
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: "",
    content: "",
    confirmText: "",
    showInterLocution: false,
    showCancel: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    dealTitle () {
      // console.log(newVal.content);
    },
    // dealItem(data) {
    //     // this.triggerEvent('pageBuried',{type:9,orderId:'kong',state:'review'})
    //     let status = data.button && data.button.status;
    //     let layer = data && data.layer || {};
    //     let curPageName = this.data.pageName;
    //     let weBankPage = '';
    //     let hasOpenWeBank = false;
    //     let weBankItemIndex = 0;

    //     try {
    //         weBankPage = wx.getStorageSync('weBankPage');
    //         hasOpenWeBank = wx.getStorageSync('hasOpenWeBank');
    //         weBankItemIndex = wx.getStorageSync('weBankItemIndex')
    //     } catch (e) {

    //     }
    //     // console.log('flag==>', data.flag);
    //     // console.log('status==>', status);
    //     // console.log('--------------------------------');
    //     // console.log('curPageName==>', this.data.pageName);
    //     // console.log('weBankPage==>', weBankPage);
    //     // console.log('--------------------------------');
    //     // console.log('hasOpenWeBank==>', hasOpenWeBank);
    //     // console.log('--------------------------------');
    //     // console.log('weBankItemIndex==>', weBankItemIndex);
    //     // console.log('index==>', this.data.index);
    //     if (status === 2 && data.flag && !hasOpenWeBank && weBankPage === curPageName && weBankItemIndex === this.data.index) { // 发起注册的页面和进入的页面一样并且未弹过
    //         console.log('激活成功提示==>', JSON.stringify(layer));
    //         this.setData({
    //             title: layer.title || '微常准账户激活成功',
    //             content: layer.context || '获得鲜豆超时赔付金!',
    //             confirmText: layer.buttonText || '领取奖励',
    //             showInterLocution: true,
    //             showCancel: false
    //         });
    //         try {
    //             wx.setStorageSync('hasOpenWeBank', true);
    //         } catch (e) {

    //         }
    //     }
    //     // 埋点
    //     if (status === 1) { // 审核中
    //         this.triggerEvent('pageBuried',{type:1,orderId:this.data.orderId,state:'review'})
    //         // clickBuried_({
    //         //     click_id: "ex_weichangzhun",
    //         //     create_time: new Date(),
    //         //     click_par: {
    //         //         orderId: this.data.orderId || '',
    //         //         state: 'review'
    //         //     }
    //         // })
    //     }else if(status === 2) { // 审核成功
    //         this.triggerEvent('pageBuried',{type:2,orderId:this.data.orderId,state:'obtain'})
    //         // clickBuried_({
    //         //     click_id: "ex_weichangzhun",
    //         //     create_time: new Date(),
    //         //     click_par: {
    //         //         orderId: this.data.orderId || '',
    //         //         state: 'obtain'
    //         //     }
    //         // })
    //     }else if(status === 3) { // 已领取
    //         this.triggerEvent('pageBuried',{type:2,orderId:this.data.orderId,state:'obtain'})
    //         // clickBuried_({
    //         //     click_id: "ex_weichangzhun",
    //         //     create_time: new Date(),
    //         //     click_par: {
    //         //         orderId: this.data.orderId || '',
    //         //         state: 'check'
    //         //     }
    //         // })
    //     }
    // },
    handleJump () {
      let { currentPageName, prePageName, pageId, orderId = 0 } = this.data || {};
      let {wczStatus = 0, buttonTitle = ''} = this.data.item
      clickBuriedV2_({
        click_id: "clickWcz",
        create_time: new Date(),
        click_par: {
          orderState: wczStatus,
          orderId,
          btnName: buttonTitle
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageId
      });
      if (this.data.item.jumpProtocol && this.data.item.jumpProtocol.params) {
        if (this.data.item.jumpProtocol.to == "freshBean") {
          this.toFreshBean();
        } else {
          let { buriedObj = {} } = this.data;
          wx.navigateTo({
            url: "/pages/weBank/index",
            preObj: buriedObj
          });
        }
      }
    },
    // 点击去微众开通页
    clickToWeBankPage () {
      let { buriedObj = {} } = this.data;
      wx.navigateTo({
        url: "/pages/weBank/index",
        preObj: buriedObj
      });
    },
    // 点击按钮
    // clickWeBankBtn() {
    //     let data = this.data.item;
    //     let status = data.button && data.button.status;
    //     let flag = data.flag;
    //     let layer = data.layer;
    //     if (status === 2) { // 审核成功
    //         if (flag) { // 已激活
    //             // 领取鲜豆
    //             this.getBeans();
    //             // 埋点
    //             this.triggerEvent('pageBuried',{type:4,orderId:this.data.orderId})
    //             // clickBuried_({
    //             //     click_id: "click_obtain",
    //             //     create_time: new Date(),
    //             //     click_par: {
    //             //         orderId: this.data.orderId || ''
    //             //     }
    //             // })
    //         } else { // 未激活
    //             // 提示去微众开通账户
    //             this.setData({
    //                 title: layer.title || '激活微常准账户领赔付金',
    //                 content: layer.context || '订单配送超时',
    //                 confirmText: layer.buttonText || '免费激活',
    //                 showInterLocution: true,
    //                 showCancel: false
    //             });
    //             try {
    //                 wx.setStorageSync('weBankItemIndex', this.data.index)
    //             } catch (e) {

    //             }
    //             // 埋点
    //             this.triggerEvent('pageBuried',{type:5,orderId:this.data.orderId})
    //             // clickBuried_({
    //             //     click_id: "click_activation",
    //             //     create_time: new Date(),
    //             //     click_par: {
    //             //         orderId: this.data.orderId || ''
    //             //     }
    //             // })
    //         }
    //     } else if (status === 3) { // 已领取
    //         this.toFreshBean();
    //         // 埋点
    //         this.triggerEvent('pageBuried',{type:9,orderId:this.data.orderId})
    //         // clickBuried_({
    //         //     click_id: "click_check",
    //         //     create_time: new Date(),
    //         //     click_par: {
    //         //         orderId: this.data.orderId || ''
    //         //     }
    //         // })
    //     }
    // },
    // 去我的鲜豆页
    toFreshBean () {
      if (!isLogin()) {
        let { buriedObj = {} } = this.data;
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: buriedObj
        });
        return;
      }
      let url =
        "https://" +
        getApp().globalData.config.HOST +
        "/html/vue/index.html#integral";
      let { buriedObj = {} } = this.data;
      wx.navigateTo({
        url: "/pages/h5/index?needToken=1&url=" + encodeURIComponent(url),
        preObj: buriedObj
      });
    },
    // 获取鲜豆
    getBeans () {
      if (beansFlag) {
        beansFlag = false;
        // console.log('orderId==>', this.data.orderId)
        let { functionId = "", appVersion = "" } = FNIDS.getOrderBeans;
        request({
          functionId,
          appVersion,
          body: {
            orderId: this.data.orderId || ""
          },
          preObj: this.data.buriedObj
        })
          .then((res) => {
            beansFlag = true;
            let result = res.data.result || {};
            if (res.data.code == "0" && result.grabFlag) {
              let data = this.data.item;
              if (data.button && data.button.status) {
                data.button.status = 3;
                data.button.text = "去查看";
              }
              this.setData({
                item: data,
                title: result.grabTitle || "鲜豆领取成功",
                content:
                  result.grabSubTitle ||
                  `${result.grabTotal}鲜豆已发放至您的账户，本服务由微常准提供`,
                confirmText: "去查看",
                showInterLocution: true,
                showCancel: false
              });
            } else {
              mp.toast({
                title: result.toast || res.data.msg || "领取失败！"
              });
            }
          })
          .catch((err) => {
            beansFlag = true;
            mp.toast({
              title: err.data.msg || "领取失败！"
            });
          });
      }
    }
    // 去微众小程序
    // goToWeBankMp() {
    //     // let self = this;
    //     // let data = this.data.item || {};
    //     // let pin = data.pin || '';
    //     // let config = getApp().globalData.config;
    //     // let weBankConfig = config && config.weBankConfig || {};
    //     // self.setData({
    //     //     showInterLocution: false
    //     // });
    //     // console.log('weBankPin==>', pin);
    //     // // todo
    //     // wx.navigateToMiniProgram({
    //     //     appId: weBankConfig.appId || 'wxe0fd3b6e024bf626',
    //     //     path: '',
    //     //     extraData: {
    //     //         webankAppId: weBankConfig.webankAppId || 'XLoe7tjW',
    //     //         memberId: pin
    //     //     },
    //     //     envVersion: config.env === 'pro' ? 'release' : 'trial',
    //     //     success() {
    //     //         try {
    //     //             wx.setStorageSync('weBankPage', self.data.pageName)
    //     //         } catch (e) {

    //     //         }
    //     //     }
    //     // })
    //     let self = this;
    //     let data = this.data.item || {};
    //     let pin = data.pin || '';
    //     let config = getApp().globalData.config;
    //     let weBankConfig = config && config.weBankConfig || {};
    //     self.setData({
    //         showInterLocution: false
    //     });
    //     console.log('weBankPin==>', pin);
    //     // todo
    //     wx.navigateToMiniProgram({
    //         appId: weBankConfig.appId || 'wxe0fd3b6e024bf626',
    //         path: weBankConfig.path || '',
    //         extraData: {
    //             webankAppId: weBankConfig.webankAppId || 'XLoe7tjW',
    //             memberId: pin
    //         },
    //         envVersion: config.env === 'pro' ? 'release' : 'develop',
    //         success() {
    //             try {
    //                 wx.setStorageSync('weBankPage', self.data.pageName)
    //             } catch (e) {

    //             }
    //         }
    //     })
    // },
    // 领取成功提示
    // onClickPopBtn(e) {
    //     let confirm = e.detail.confirm;
    //     if (confirm) {
    //         let data = this.data.item;
    //         let status = data && data.button && data.button.status;
    //         if (status === 2) { // 审核成功
    //             if (data.flag) { // 已激活
    //                 this.getBeans();
    //                 // 埋点
    //                 this.triggerEvent('pageBuried',{type:6,orderId:this.data.orderId})
    //                 // clickBuried_({
    //                 //     click_id: "click_obtain_layer",
    //                 //     create_time: new Date(),
    //                 //     click_par: {
    //                 //         orderId: this.data.orderId || ''
    //                 //     }
    //                 // })
    //             } else { // 未激活
    //                 this.goToWeBankMp();
    //                 // 埋点
    //                 this.triggerEvent('pageBuried',{type:7,orderId:this.data.orderId})
    //                 // clickBuried_({
    //                 //     click_id: "click_activation_layer",
    //                 //     create_time: new Date(),
    //                 //     click_par: {
    //                 //         orderId: this.data.orderId || ''
    //                 //     }
    //                 // })
    //             }
    //         } else if (status === 3) {
    //             this.toFreshBean();
    //             this.setData({
    //                 showInterLocution: false
    //             });
    //             // 埋点
    //             this.triggerEvent('pageBuried',{type:8,orderId:this.data.orderId})
    //             // clickBuried_({
    //             //     click_id: "click_check_layer",
    //             //     create_time: new Date(),
    //             //     click_par: {
    //             //         orderId: this.data.orderId || ''
    //             //     }
    //             // })
    //         }
    //     }
    // }
  }
});
