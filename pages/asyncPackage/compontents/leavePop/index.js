import { request, FNIDS } from "../../../../common/util/api";
import { djCmsJump } from "../../../../common/util/agreementV2";
import { getActivityCouponProtocol} from "../../../../common/util/services";
import mp from "../../../../common/util/wxapi";
import emitter from '../../../../common/util/events';
import util from "../../../../common/util/util";
import { clickBuriedV2_ } from "../../../../common/util/BI";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modal:{
      type:Object,
      value:{},
      observer:function(val){
        // console.log('val',val)
        if(val){
          this.handlePrice(val.dataInfo.couponAmountDesc)
        }
      }
    },
    visible:{
      type:Boolean,
      value:false,
      observer:function(){
        //  console.log('val',val)
      }
    },
    pageId: {
      type: String,
      value: ''
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
    priceArr: [],
    pointIndex:-1,
    isShowed:false, //弹层是否展示过
  },

  /**
   * 组件的方法列表
   */
  methods: {
    leaveMarketing(params) {
      request({
        functionId: FNIDS.leaveMarketing.functionId,
        appVersion: FNIDS.leaveMarketing.appVersion,
        body: params,
        pageId: this.data.pageId || "",
      }).then((res) => {
        // console.log("res", res);
        if (res.data && res.data.code == 0) {
          let {result={}}=res.data;
          if(Object.keys(result).length>0){
            let currentDate = util.formatDate();
            wx.setStorageSync('leavePopDate', currentDate)
            wx.setStorageSync('leavePopLimitDay', result.limitDay)  
            this.setData({
              modal:result,
            },()=>{
              this.handlePrice(this.data.modal.dataInfo.couponAmountDesc)
            });
          }
        }
      });
    },
    handlePrice(price){
      let priceArr = price && price.split('');
      let pointIndex = priceArr && priceArr.indexOf('.')
      this.setData({
        priceArr,
        pointIndex
      },()=>{
        // console.log('priceArr',this.data.priceArr)
      })
    },
    handleBtnClick(e){
      let {index}=e.currentTarget.dataset;
      if(this.data.modal.buttonList.length==1){
        this.clickCoupon()
      }
      if(this.data.modal.buttonList.length==2){
        if(index==0){
          wx.navigateBack({})
        }
        if(index==1){
          this.clickCoupon()
        }
      }
      this.setData({
        visible:false
      })
    },
    //是否展示弹层
    handleShowPop(){
      // console.log(this.data.isShowed,this.data.modal)
      if(!this.data.isShowed&&Object.keys(this.data.modal).length>0){
        let { pageIdFirstPage, currentPageName, prePageName } = this.data.buriedObj || {};
        if(this.data.modal.pageName=='newChannelPage' || this.data.modal.pageName=='store'){
          this.setData({
            visible:true,
            isShowed:true
          }, () => {
            try {
              clickBuriedV2_({
                click_id: "click_open",
                click_par: {
                  userAction:
                    (this.data.modal && this.data.modal.userAction) || "",
                },
                pageId: pageIdFirstPage || "",
                currentPageName,
                prePageName,
              });
            } catch (error) {}
          })
          return true
        }
        if(this.data.modal.pageName=='home'){
          this.setData({
            isShowed:true
          })
          emitter.emit('leavePop',{leaveModal:this.data.modal})
          try {
            clickBuriedV2_({
              click_id: "click_open",
              click_par: {
                userAction:
                  (this.data.modal && this.data.modal.userAction) || "",
              },
              pageId: pageIdFirstPage || "",
              currentPageName,
              prePageName,
            });
          } catch (error) {}
          return false
        }
      }
      return false
    },
    handleClosePop(){
      this.setData({
        visible:false
      })
    },
    // 点击优惠券
    clickCoupon() {
      let {dataInfo:{activityCode="",couponId=""}={}}=this.data.modal
      // 普通券去使用
      this.jump({
        activityCode: activityCode || "",
        storeId: "",
        markState: "",
        orgCode: "",
        couponId: couponId || "",
      });
      this.setData({
        visible:false
      })
      try {
        let { pageIdFirstPage, currentPageName, prePageName } =
          this.data.buriedObj || {};
        clickBuriedV2_({
          click_id: "click_into",
          click_par: {
            userAction: (this.data.modal && this.data.modal.userAction) || "",
          },
          pageId: pageIdFirstPage || "",
          currentPageName,
          prePageName,
        });
      } catch (error) {}
      
    },
    // 跳转协议
    jump(data) {
      let { orgCode, storeId } = this.data.storeInfo || {};
      getActivityCouponProtocol({
        activityCode: data.activityCode || "",
        storeId: data.storeId || storeId || "",
        markState: data.status || "",
        refPageSource: "",
        pageSource: "channelNew",
        orgCode: data.orgCode || orgCode || "",
        couponGoSource: 4,
        couponPattern: data.couponType || 1,
        couponId: data.couponId || "",
        ref: "",
        ctp: "active"
      }).then(res => {
        let result = res.data.result || '';
        if (res.data.code == '0' && result && result.length) {
          this.handleClosePop()
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
                preObj: this.data.buriedObj,
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
