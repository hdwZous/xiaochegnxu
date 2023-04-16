import { request, FNIDS } from '../../../../common/util/api';
import { djCmsJump } from '../../../../common/util/agreementV2';
import { pvBuriedV2_, clickBuriedV2_ } from '../../../../common/util/BI';
import emitter from '../../../../common/util/events'
import util from '../../../../common/util/util'

import djBus from '../../../../common/util/djBus'

let app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    channelId: {
      type: String,
      value: ""
    },
    channelBusiness: {
      type: String,
      value: ""
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    traceId: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    pageIsGetInfoOnShow: {
      type: Boolean,
      value: false
    },
    pageId: {
      type: String,
      value: "",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isIPX: app.globalData.isIpx,
    visible: false,
    skuDesc: {},
    skuModelList: [],
    title: '',
    list: [],
    loading: false,
    showEmpty: true,// 展示默认页
    type: 0,//类型
    tips: "",// 提示
    btnText: "",// 按钮
    scrollTop: 0,
    skuId: '',
    userAction: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 埋点方法
     * */
    pvFunc(back) {
      pvBuriedV2_({
        page_par: {
          channelId: this.data.channelId,
          skuId: this.data.skuId,
          ref_par: {
            traceId: this.data.traceId || "",
            userAction: this.data.userAction
          }
        },
        pageId: this.data.pageId,
        currentPageName: 'aggregateStoresLayer',
        prePageName: this.data.recommendObj.prePageName,
        isBack: back || ""
      })
    },
    onDefaultBtnEvent() {
      this.handleFooterJump(this.data.item)
    },
    handleFooterJump(e) {
      this.setData({
        skuId: e.skuId,
        userAction: e.userAction
      }, () => {
        // 埋点
        // let isHasOpenMask = getCurrentMaskHasOpen('aggregateStoresLayer')
        // if (isHasOpenMask) {
        //   let { pageName = '', prePageName = '' } = getMaskOpenPageNameAndPageSource('open', 'aggregateStoresLayer')
          
        // }
      })

      this.data.item = e;
      let { channelId, channelBusiness } = this.data;
      let pageId = util.getPageIdrandom()
      this.setData({
        visible: true,
        loading: true,
        scrollTop: 0
      }, () => {
        djBus.once('mask_drug_pop',(data)=>{
          /*
          1、拿到data赋值到弹层的一个属性中(recommendObj，type是个{})，用于之后的业务场景需要；recommendObj属性，可以通过this.data.recommendObj访问到  
          /*
          2、发出一个事件，用来通知页面page来上报pv 
          */
          this.setData({
            pageId,
            recommendObj: {
              pageIdFirstPage: pageId,
              currentPageName: 'aggregateStoresLayer',
              prePageName: data.prePageName,
              pageSource: data.pageSource,
              refPageSource: data.refPageSource
            }
          }, () => {

            if (data.currentPageName != "channel") {
              clickBuriedV2_({
                click_id: "test_popAndPageDiff0906",
                click_par: {
                  recommendObj: data,
                  options: this.data.options,
                  popName: "aggregateStoresLayer",
                  popRealPrePageName: data.currentPageName,
                  popSelfPrePageName: "channel",
                },
              });
            }
            if (!this.data.pageIsGetInfoOnShow) {
              clickBuriedV2_({
                click_id: "test_pageIsGetInfoOnShow0906",
                click_par: {
                  popName: "aggregateStoresLayer",
                  route: "/pages/channelNew/index",
                  type: "open",
                },
              });
            }
            this.pvFunc();
            const pageList = getCurrentPages();
            const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
            const prePageId = this.data.pageId || ''
            emitter.emit('halfMaskFunc_'+route+'_aggregateStoresLayer_'+prePageId,{
              name:'aggregateStoresLayer',
              type:'open',
              selector:'#drug', // 用于页面找到半弹层    
              buriedObj: this.data.recommendObj 
            }) 
          })    
        })
      })
      request({
        functionId: FNIDS.getRecommendStoreInfos.functionId,
        appVersion: FNIDS.getRecommendStoreInfos.appVersion,
        method: "POST",
        body: {
          channelBusiness,
          channelId,
          skuBaseInfos: this.data.item.skuBaseInfos,
          pageSource: "newChannelPage",
          ctp: "channel"
        },
        pageId: pageId,
        preObj: this.data.recommendObj
      }).then(res => {
        this.setData({
          loading: false
        })
        if (res && res.data && res.data.code == 0) {
          let { skuDesc = {}, skuModelList = [], title } = res.data.result;
          this.setData({
            skuDesc,
            skuModelList,
            title,
            showEmpty: false,
          })
        } else {
          this.setData({
            showEmpty: true,
            type: 1,
            tips: res.data && res.data.msg,
            btnText: "重新加载",
            title: '',
          })
        }
      }).catch(err => {
        this.setData({
          showEmpty: true,
          type: 1,
          tips: err.data && err.data.msg || "出错啦～",
          btnText: "重新加载",
          title: '',
        })
      })
    },
    handlePopStoreJump(e) {
      clickBuriedV2_({
        click_id: "popstorelist_click",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      let { item } = e.currentTarget.dataset;
      if (item.to && item.params) {
        djCmsJump({
          item,
          preObj: this.data.recommendObj,
          buried_postion: "channel-drugPop1"
        })
      }
    },
    handleGotoBuy(e) {
      let { item } = e.currentTarget.dataset;
      let { to, params } = item.storeJumpParam
      params.isAddCart = params.addCart ? params.addCart : ''
      djCmsJump({
        to,
        params,
        preObj: this.data.recommendObj,
        buried_postion: "channel-drugPop2"
      })
    },
    close() {
      // getMaskOpenPageNameAndPageSource('close', 'aggregateStoresLayer')
      // emitter.emit('pvFunc',{maskName:'aggregateStoresLayer'})
      if (!this.data.pageIsGetInfoOnShow) {
        clickBuriedV2_({
          click_id: "test_pageIsGetInfoOnShow0906",
          click_par: {
            popName: "aggregateStoresLayer",
            route: "/pages/channelNew/index",
            type: "close",
          },
        });
      }
      const pageList = getCurrentPages();
      const route = ( pageList && pageList.length && pageList[pageList.length - 1].route ) || ''
      const prePageId = this.data.pageId || ''
      emitter.emit('halfMaskFunc_'+route+'_aggregateStoresLayer_'+prePageId,{
        name:'aggregateStoresLayer',
        type:'close',
        selector:'#drug', // 用于页面找打半弹层 
        buriedObj: this.data.recommendObj    
      })
      this.setData({
        visible: false
      })
    }
  },
  pageLifetimes: {
    show: function () {
      
    },
    hide: function () {
      
    }
  },
})
