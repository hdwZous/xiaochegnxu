import { djCmsJump } from "../../../../common/util/agreementV2.js";
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
            let { imgWidth = "", imgHeight = "", skuList = [] } = item.floorCellData || {};
            let width = 702;
            let height = 672;
            if (imgHeight && imgWidth) {
              height = (imgHeight * width) / imgWidth;
            }
            item.floorCellData.imgWidth = width + "rpx";
            item.floorCellData.imgHeight = height + "rpx";

            //处理次要价格2位小数问题
            if (skuList.length > 0) {
              skuList.forEach((subItem) => {
                let price = subItem.minorPrice.price ? subItem.minorPrice.price : ''
                if (price && price.includes('.')) {
                  let lastItem = price.split('.')[price.split('.').length - 1]
                  if (lastItem.length >= 2) {
                    subItem.minorPrice.price = Number(subItem.minorPrice.price).toFixed(2)
                  }
                }
                subItem.tags[0].iconTextUp = subItem.tags[0].iconText.substr(0, 2);
                subItem.tags[0].iconTextDown = subItem.tags[0].iconText.substr(2,2);
                
              })
            }

          });
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
  },
  data: {
    newerData: {}
  },
  methods: {

    jump(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      // 因getIndex接口无法下发字段，所以暂时写死
      let url = params.url;
      let paramsStr = []
      if (url && url.includes('?')) {
        paramsStr = url.split("?")[1].split("&");
      }
      if (url && url.includes("pages/newUser-t/index")) {
        to = "newUser";
      } else if (url && url.includes("pages/newPerson-t/index")) {
        to = "newPerson";
      }
      if (to && JSON.stringify(params) != '{}') {
        
        djCmsJump({
          to: to,
          params: {
            paramsStr
          },
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewer_jump_home'
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
            preObj: this.data.buriedObj && this.data.buriedObj || {},
          })
            .then((res) => {
              const { data: { code } = {} } = res;
              if (code == 0) {
                if (to && JSON.stringify(params) != '{}') {
                  djCmsJump({
                    to: 'Settlement',
                    params: to == 'forceReCheckToSettlement' && type == 'goods' ? params : btnParams,
                    userAction: userAction,
                    traceId: this.data.pageDataTraceId || '',
                    preObj: this.data.buriedObj,
                    buried_position: {
                      currentPageName: 'homefloornewer_verifySettleForSkuList_home'
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
              currentPageName: 'homefloornewer_verifySettleForSkuList_home'
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
            currentPageName: 'homefloornewer_verifySettleForSkuList_home'
          }
        })
      }



    },
    clickGoods(e) {
      this.verifySettleForSkuList(e, 'goods')
    },
    clickSingleBtn(e) {
      this.verifySettleForSkuList(e, 'btn')
    },
    clickGoNow(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      if (to && JSON.stringify(params) != '{}') {
        djCmsJump({
          to: to,
          params: params,
          userAction: userAction,
          traceId: this.data.pageDataTraceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'homefloornewer_clickGoNow_home'
          }
        })
      }
    }
  }
});
