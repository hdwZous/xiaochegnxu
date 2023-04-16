import { clickBuriedV2_ } from '../../../../common/util/BI'
import { djCmsJump } from "../../../../common/util/agreementV2";
let app = getApp();
let animation
let distance = {
  // 非iphonex、无底部tab
  y1: {
    w1: '80px',
    w2: '70px',
    w3: '41px'
  },
  // iphonex、无底部tab
  y1x: {
    w1: '114px',
    w2: '104px',
    w3: '41px'
  },
  // 非iphonex、有底部tab
  y2: {
    w1: '135px',
    w2: '125px',
    w3: '41px'
  },
  // iphonex、有底部tab
  y2x: {
    w1: '169px',
    w2: '159px',
    w3: '41px'
  }
}
let widthSize = [323, 121, 182, 243, 304, 335]
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },

  lifetimes: {
    ready() {
      animation = wx.createAnimation({
        duration: 250,
        timingFunction: 'ease'
      })
      this.setData({ isIpx: app.globalData.isIpx })
    }
  },

  properties: {
    flatList: {
      type: Array,
      value: [],
      observer: function (val) {
        console.log(val);
      }
    },
    hasFooterTab: {
      type: Boolean,
      value: false
    },
    moveHide: {
      type: Boolean,
      value: false
    },
    flatCarText: {
      type: Array,
      value: []
    },
    flatPageHide: {
      type: String,
      value: ''
    },
    userAction:{
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
    }
  },

  observers: {
    'flatList': function (news) {
      if (news && news.length) {
        if (news.length == 1) {
          let translate = this.calTrans() 
          animation.translateY('-' + translate.w1).step()
          animation.translateY('-' + translate.w2).step()
          this.setData({
            animationData: animation.export()
          })
          // 埋点
          clickBuriedV2_({
            create_time: new Date(),
            click_id: "epLayerOpen",
            click_par: {
              userAction: this.data.userAction || "",
              traceId: this.data.traceId
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
            currentPageName: this.data.recommendObj.currentPageName,
            prePageName: this.data.recommendObj.prePageName
          });
        } else if (news.length > 1 && this.data.isTips == null) {
          this.setData({
            isTips: true
          })
          for(let i = 1; i < this.data.flatList.length;i++) {
            // 埋点
            clickBuriedV2_({
              create_time: new Date(),
              click_id: "epLayerOpen",
              click_par: {
                userAction: this.data.userAction || "",
                traceId: this.data.traceId
              },
              pageId: this.data.recommendObj.pageIdFirstPage || "",
              currentPageName: this.data.recommendObj.currentPageName,
              prePageName: this.data.recommendObj.prePageName
            });
          }
        } else if (news && news.length > 5) {
          this.setData({
            currentView: `A${news[news.length - 1].storeId}`
          })
        }
        let s = news.length >= 7 ? 5 : news.length -1
        this.setData({
          sWidth: widthSize[s] + 'px'
        })
      }
    },
    'moveHide': function (news) {
      if (this.data.flatList.length) {
        let translate = this.data.isTips && news ? this.calTrans().w3 : this.calTrans().w2
        if (news == true) {
          animation.translateY(translate).step()
          this.setData({
            animationData: animation.export()
          })
        } else if (news == false) { 
          animation.translateY('-' + translate).step()
          this.setData({
            animationData: animation.export()
          })
        }
      }
    },
    'flatPageHide': function (news) {
      if (news.length) {
        try {
          animation.translateY('41px').step()
          this.setData({
            flatList: [],
            animationData: animation.export(),
            sWidth: '233px'
          })
        } catch (error) {
          console.log(error);
        }
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    animationData: '',
    currentView: '',
    isTips: null,
    isIpx: false,
    sWidth: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    calTrans() {
      if (this.data.isIpx) {
        if (this.data.hasFooterTab) {
          return distance.y2x
        } else {
          return distance.y1x
        }
      } else {
        if (this.data.hasFooterTab) {
          return distance.y2
        } else {
          return distance.y1
        }
      }
    },
    tipClose() {
      this.setData({
        isTips: false
      })
    },
    goStore(e) {
      let info = e.currentTarget.dataset.info
      djCmsJump({
        to: info.to,
        params: info.params,
        userAction: this.data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-storeFlat"
      })
    }
  },
});
