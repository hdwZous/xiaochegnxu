import { djCmsJump } from '../../../../common/util/agreementV2';
import { pvBuriedV2_, clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  lazyObj: {
    epSelector: '.channel_ep .channel_comp_ep',
    needExposure: true,
    componentName: 'drugList'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initData:{
      type:Array,
      value:[],
      observer:function(val){
        this.handleInitData(val)
      }
    },
    isRefersh:{
      type:Boolean,
      value:false,
      observer:function(val){
        val && (
          this.setData({
            list: [],
          })
        )
      }
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
    list: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInitData(val){
      if (this.data.isRefersh) {
        this.setData({
          list: [],
        });
      }
      setTimeout(() => {
        this.setData({
          list: this.data.list.concat(val),
        });
      }, 4)
    },
    handleABJump(e){
      clickBuriedV2_({
        click_id: "druglist_click",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      let {item}=e.currentTarget.dataset;
      if(item.to && item.params){
        djCmsJump({
          to: item.to,
          params: item.params,
          userAction: item.userAction,
          traceId: this.data.traceId,
          preObj: this.data.recommendObj,
          buried_postion: "channel-drugList1"
        })
      }else{
        this.handleFooterJump(e)
      }
    },
    handleGotoBuy(e){
      let { item } = e.currentTarget.dataset;
      let { to, params } = item.storeJumpParam
      let userAction = item.userAction
      params.needAddCart = params.addCart ? params.addCart : ''
      params.isAddCart = params.addCart ? params.addCart : ''
      clickBuriedV2_({
        click_id: "click_add",
        click_par: {
          userAction,
          traceId: this.data.traceId
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      // return
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "channel-drugList2"
      })
    },
    handleFooterJump(e){
      let { item }=e.currentTarget.dataset;
      const { skuBaseInfos = [] } = item;
      pvBuriedV2_({
        page_par: {
          ref_par: {
            userAction: item.userAction || "",
            traceId: this.data.traceId
          },
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      });
      if (skuBaseInfos.length <= 1) {
        this.handleGotoBuy(e)
      } else {
        this.triggerEvent('handleFooterJump',item)
      }
    },
    // 图文跳转
    handleGraphicJump(e) {
      const { to, userAction, params } = e.currentTarget.dataset
      clickBuriedV2_({
        click_id: "channel",
        click_par: {
          userAction: userAction
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "channel-drugList3"
      })
    },
    // 附近店铺
    handleHotStore(e) {
      let {to, params, userAction}=e.currentTarget.dataset;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "channel-drugList4"
      })
    }
  }
})
