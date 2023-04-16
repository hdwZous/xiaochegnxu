import {
  mpCmsJump, djCmsJump
} from '../../../../common/util/agreementV2.js'
import { request, FNIDS } from '../../../../common/util/api'
import mp from '../../../../common/util/wxapi.js';
import { clickBuriedV2_ } from "../../../../common/util/BI";
// 门店列表缓存数据
let storeListCache = {}
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_recommendstore',
    epSelector: '.home_recommendstore'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ''
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    // 门店推荐列表
    storeData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val.data && val.data.length) {
          let menuList = val.menuList || []
          if(menuList[0] && menuList[0].menuId && menuList[0].menuId ==0 && menuList[0].menuId == this.data.activeTab){
            let userAction = menuList[0].userAction
            let traceId = this.data.pageDataTraceId
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.buriedObj || {};
            clickBuriedV2_({
              click_id: "ClickIndustryLabel",
              click_par: {
                userAction,
                // traceId,
                state: '0'
              },
              currentPageName: currentPageName,
              prePageName: prePageName,
              pageId: pageIdFirstPage,
            })
          }
         
          this.setData({
            list: val.data
          });
          if (val.menuList && val.menuList[0] && val.menuList[0].menuId) {
            storeListCache[val.menuList[0].menuId] = val.data
          }
          this.epSection && this.epSection()
        } else {
          this.setData({
            showDefault: true,
            defaultTips: '抱歉，该地区暂无此类门店',
            defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png"
          })
        }
      }
    },
    bgColor: {
      type: String,
      value: ''
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    activeTab: 0,
    // 无数据提示
    showDefault: false,
    // 默认页-提示
    defaultTips: "",
    // 默认页-默认图
    defaultSrc: "",
    // 锚中id
    anchorId: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去门店
    goToStore(e) {
      let item = e.currentTarget.dataset.item;
      let storeId = item.storeId || '';
      let orgCode = item.orgCode || '';
      let userAction = item.userAction || '';
      let promiseLabelDesc = item.promiseLabelDesc || '';
      mpCmsJump({
        pageType: 'p20',
        params: {
          storeId: storeId,
          showCoupon: promiseLabelDesc ? 1 : 0,
          orgCode: orgCode,
          userAction: encodeURIComponent(userAction),
          traceId: this.data.pageDataTraceId || '',
          bgType: item.params && item.params.bgType || ''
        },
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homerecommendstore_goToStore_home'
        }
      })
    },
    //点击膨胀券
    clickExpansionCoupon(e){
     let {to = '',params={},userAction=""} =  e.currentTarget.dataset.item;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homerecommendstore_clickExpansionCoupon_home'
        }
      })
    },
    // 去附近商家列表
    clickToNearby(e) {
      let userAction = e.currentTarget.dataset.userAction;
      let { to = '', params = {} } = this.data.storeData || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homerecommendstore_clickToNearby_home'
        }
      })
    },
    // 获取门店列表
    getTabStoreList(e) {
      let { index = 0 } = e.currentTarget.dataset || {};
      let { menuId = '', channelBusiness = '',userAction='' } = e.currentTarget.dataset.item || {};
      if (menuId == this.data.activeTab) return;
      index = `tab_${index - 2}`;
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      let traceId = this.data.pageDataTraceId
      clickBuriedV2_({
        click_id: "ClickIndustryLabel",
        click_par: {
          userAction,
          traceId
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
      })
      if (storeListCache[menuId]) {
        this.setData({
          list: storeListCache[menuId],
          activeTab: menuId,
          anchorId: index
        })
      }
      else {
        mp.loading_cover();
        let { functionId = '', appVersion = '' } = FNIDS.storeListByMenu || {};
        let { longitude = '', latitude = '' } = getApp().globalData.addressInfo || {};
        request({
          functionId,
          appVersion,
          isNeedDealError: true,
          body: {
            "refPageSource": "",
            "menuId": menuId,
            "channelBusiness": channelBusiness,
            "longitude": longitude,
            "latitude": latitude,
            "coordType": 2,
            "pageSource": "home",
            "ref": "",
            "ctp": "home"
          },
          pageId:(this.data.buriedObj && this.data.buriedObj.pageIdFirstPage) ||"",
          preObj: this.data.buriedObj && this.data.buriedObj || {},
        }).then(res => {
          mp.hideLoading()
          if (res.data.code == '0') {
            let { storeModeList = [] } = res.data.result || {};
            if (storeModeList.length) {
              this.setData({
                showDefault: false,
                list: storeModeList,
                activeTab: menuId,
                anchorId: index
              }, () => {
                this.epSection && this.epSection()
              })
              storeListCache[menuId] = storeModeList;
              // this.triggerEvent('onExposure', {})
            } else {
              this.setData({
                anchorId: index,
                showDefault: true,
                defaultTips: '抱歉，该地区暂无此类门店',
                defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png"
              })
            }
          } else {
            this.setData({
              anchorId: index,
              showDefault: true,
              defaultTips: res.data.msg || '网络繁忙，请稍后再试！',
              defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
            })
          }
        }).catch(() => {
          this.setData({
            anchorId: index,
            showDefault: true,
            defaultTips: '网络繁忙，请稍后再试！',
            defaultSrc: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nonetworkV1.png"
          })
        })
      }
    }
  }
});