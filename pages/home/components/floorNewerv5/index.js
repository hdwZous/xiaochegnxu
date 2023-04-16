import { djCmsJump } from "../../../../common/util/agreementV2.js";
import {  clickBuriedV2_ } from "../../../../common/util/BI"
import {
  request,
  FNIDS
} from '../../../../common/util/api'
import util from '../../../../common/util/util'
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_floorNewer ',
    epSelector: '.home_floorNewer'
  },
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    newerData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.data && val.data.length) {
          val.data.forEach(item => {
            let { imgWidth = "", imgHeight = "", strategySkuList = [] } = item.floorCellData || {};
            let width = 702;
            let height = 672;
            if (imgHeight && imgWidth) {
              height = (imgHeight * width) / imgWidth;
            }
            item.floorCellData.imgWidth = width + "rpx";
            item.floorCellData.imgHeight = height + "rpx";
            
            //处理次要价格2位小数问题
            if (strategySkuList.length > 0) {
              strategySkuList.forEach((subItem) => {
                let price = subItem.minorPrice && subItem.minorPrice.price ? subItem.minorPrice.price : ''
                if (price && price.includes('.')) {
                  let lastItem = price.split('.')[price.split('.').length - 1]
                  if (lastItem.length >= 2) {
                    subItem.minorPrice.price = Number(subItem.minorPrice.price).toFixed(2)
                  }
                }
                if (subItem.topLeftCornerTag && subItem.topLeftCornerTag.componentTag && subItem.topLeftCornerTag.componentTag.iconText) {
                  subItem.topLeftCornerTag.componentTag.iconTextUp = subItem.topLeftCornerTag.componentTag.iconText.substr(0, 2)
                  subItem.topLeftCornerTag.componentTag.iconTextDown = subItem.topLeftCornerTag.componentTag.iconText.substr(2, 2)
                }
              })
            }

          });
          if (!this.data.begin_end) {
            let countDownTime = val && val.data && val.data.length && val.data[0].floorCellData && val.data[0].floorCellData.countDownTime || 0;
            this.showCountDown(countDownTime)
          }
          this.setData({
            newerData: val
          });
          this.epSection && this.epSection()
        }
      }
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ""
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    homeoptions: {
      type: Object,
      value: {}
    },
  },
  data: {
    newerData: {},
    hour: '00',
    minute: '00',
    second: '00',
    timer: null,
    // null表示未开始，1表示进行中，2表示结束
    begin_end: null
  },
  methods: {

    jumpCoupon(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      // 因getIndex接口无法下发字段，所以暂时写死
      let url = params.url;
      // let paramsStr = []
      // if (url && url.includes('?')) {
      //   paramsStr = url.split("?")[1].split("&");
      // }
      if (url && url.includes("pages/newUser-t/index")) {
        to = "newUser";
      } else if (url && url.includes("pages/newPerson-t/index")) {
        to = "newPerson";
      } else if (url && url.includes("pages/newPersonB-t/index")) {
        to = "newPersonB";
      }
      if (to) {
        djCmsJump({
          to: to,
          params,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_jumpCoupon_home'
          }
        })
      }
    },
    verifySettleForSkuList(e, type) {
      //存储首页单品单结数据
      let app = getApp();
      app.homeSingleProductObj = e;
      let { to = '', params = {}, userAction = '', btnTo = '', btnParams = {} } = e.currentTarget.dataset.item || {};
      let {
        skuId = '',
        orgCode = '',
        storeId = '',
        preSaleSkuInfos = {}
      } = type == 'goods' ? params : btnParams;

      if (to == 'forceReCheckToSettlement' && type == 'goods' || btnTo == 'forceReCheckToSettlement' && type == 'btn') {
        if (util.isLogin()) {
          // 需要校验是否登陆、是否有库存  医药小程序和到家是否做区分
          const { functionId, appVersion } = FNIDS.verifySettleForSkuList;

          request({
            functionId,
            appVersion,
            method: 'POST',
            body: {
              storeId: storeId,
              orgCode: orgCode,
              skuList: [
                {
                  id: skuId,
                  num: preSaleSkuInfos.skuCount || 1
                }
              ],
              fromSource: 5,
              verifyResource: 1,
              pageSource: "home",
            },
            pageId:(this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) ||"",
          })
            .then((res) => {
              const { data: { code } = {} } = res;
              if (code == 0) {
                if (to ) {
                  djCmsJump({
                    to: 'Settlement',
                    params: to == 'forceReCheckToSettlement' && type == 'goods' ? params : btnParams,
                    userAction: userAction,
                    traceId: this.data.pageDataTraceId || '',
                    preObj: this.data.buriedObj,
                    buried_position: {
                      currentPageName: 'homefloornewerv3_verifySettleForSkuList_home'
                    }
                  })
                }
              } else {
                wx.showToast({
                  title: res.data && res.data.msg,
                  icon: "none",
                });
              }
            })
            .catch(() => {
            });
        } else {
          wx.navigateTo({
            url: `/pages/newLogin/login/login`,
            preObj: this.data.buriedObj,
            buried_position: {
              currentPageName: 'homefloornewerv3_verifySettleForSkuList_home'
            }
          });
        }
      } else {
        djCmsJump({
          to: type == 'goods' ? to : btnTo,
          params: type == 'goods' ? params : btnParams,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_verifySettleForSkuList_home'
          }
        })
      }



    },
    clickGoods(e) {
      this.verifySettleForSkuList(e, 'goods')
    },
    clickGoNow(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to ) {
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_clickGoNow_home'
          }
        })
      }
    },
    // 优惠券 去使用
    clickCouponButton(e) {
      let { to = '', params = {}, userAction = '',couponId = '',couponButton= '',couponInfoType='' } = e.currentTarget.dataset.item || {};
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      if (to ) {
        clickBuriedV2_({
          click_id: "click_coupon",
          click_par: {
            userAction,
            couponType: couponInfoType,
            actType: couponButton,
            couponId: couponId
          },
          currentPageName: currentPageName,
          prePageName: prePageName,
          pageId: pageIdFirstPage,
        })
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_clickCouponButton_home'
          }
        })
      }
    },
    //点击右上箭头查看更多 
    clickRightTop(e) {
      let { arrowBtnTo = '', arrowBtnParams = {}, arrowUserAction = '' } = e.currentTarget.dataset.item || {};
      if (arrowBtnTo ) {
        djCmsJump({
          to: arrowBtnTo,
          params: arrowBtnParams,
          userAction: arrowUserAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_clickRightTop_home'
          }
        })
      }
    },
    // 品 查看更多
    listCheckMore(e) {
      let { skuSeeMoreTo = '', skuSeeMoreParams = {}, skuSeeMoreUserAction = '' } = e.currentTarget.dataset.item || {};
      if (skuSeeMoreTo ) {
        djCmsJump({
          to: skuSeeMoreTo,
          params: skuSeeMoreParams,
          userAction: skuSeeMoreUserAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_listCheckMore_home'
          }
        })
      }
    },
    listCheckMoreExpansion(e){
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to ) {
        djCmsJump({
          to,
          params,
          userAction,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_listCheckMoreExpansion_home'
          }
        })
      }
    },
    listexpansionItem(e){
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to ) {
        djCmsJump({
          to,
          params,
          userAction,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_listexpansionItem_home'
          }
        })
      }
    },
    expansionNow(e){
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to ) {
        djCmsJump({
          to,
          params,
          userAction,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewerv3_expansionNow_home'
          }
        })
      }
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
            if (this.data.begin_end == null) {
              this.setData({
                begin_end: 1,
                'info.skuStatus': 1
              })
            } else if (this.data.begin_end == 1) {
              this.setData({
                begin_end: 2
              })
              this.clearInterval();
            }
            return;
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
});
