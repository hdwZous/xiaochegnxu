// 全局搜索
import { clickBuriedV2_ } from "../../../../common/util/BI";
import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  lazyObj: {
    epSelector: ".store-info"
  },
  properties: {
    storeInfo: {
      type: Object,
      value: {},
      observer: function (val) {
        let starList = []
        let coupons = [],
        tags = [];
        let i = 0;
        if (val.starGrade) { // 4.6
          let starLight = parseInt(val.starGrade) // 4
          let starDart = parseInt(5 - val.starGrade) // 0
          for (let i = 0; i < starLight; i++) {
            starList[i] = "star_100"
          }
          let starIndex = starList.length
          if (starDart + starLight < 5) {
            let starLightDart = 1 - (5 - val.starGrade - starDart)
            if (starLightDart == 0.25) {
              starList[starIndex] = "star_025"
            } else if (starLightDart == 0.5) {
              starList[starIndex] = "star_050"
            } else if (starLightDart == 0.75) {
              starList[starIndex] = "star_075"
            }
            starIndex++;
          }
          for (let j = 0; j < starDart; j++ , starIndex++) {
            starList[starIndex] = "star_000"
          }
        }
        if (val.coupons && val.coupons.length > 0) {
          val.coupons.forEach((item, index) => {
              i = index
                if (index > 3) {
                  coupons.push({
                    word: item.words,
                    hide: true
                  })
                } else {
                  coupons.push({
                    word: item.words,
                    hide: false
                  })
                }
          })
        }

        if (val.tag && val.tag.length > 0) {
          val.tag.forEach((item, index) => {
              i = index
                if (index >= 1) {
                  item.hide = true;
                  tags.push(item)
                } else {
                  item.hide = false;
                  tags.push(item)
                }
          })
        }
      

        this.setData({
          couponTagsArrowUp: false,
          promitionArrowUp: false,
          coupons: coupons,
          promitions: tags,
          starList: starList || '',
          isShowArrowUp: (tags && tags.length > 1) || (coupons && coupons.length > 3)
        })
        this.epSection && this.epSection();
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
    },
    // 判断是否是全部tab下
    tabType: {
      type: Number,
      value: -1
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      // let userAction = this.data.storeInfo.userActionStore;
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行s
    },
  },
  data: {
    couponTagsArrowUp: false,
    coupons: [],
    promitionArrowUp: false,
    promitions: [],
    starList: '',
    isShowArrowUp: false
  },
  methods: {
    clickArrowUp(){
      this.clickCoupons();
      this.clickPromition();
    },
    clickCoupons() {
      let coupons = this.data.coupons || []
      if (coupons.length > 3) {
        coupons.forEach((item, index) => {
          if (!this.data.couponTagsArrowUp) {
            item.hide = false
          } else {
            item.hide = index > 3 ? true : false
          }
        })
        this.setData({
          couponTagsArrowUp: !this.data.couponTagsArrowUp,
          coupons: coupons
        })
      }
    },
    clickPromition() {
      let promitions = this.data.promitions || []
      if (promitions.length > 1) {
        promitions.forEach((item, index) => {
          if (!this.data.promitionArrowUp) {
            item.hide = false
          } else {
            item.hide = index >= 1 ? true : false
          }
        })
        this.setData({
          promitionArrowUp: !this.data.promitionArrowUp,
          promitions: promitions
        })
        wx.pageScrollTo({
          scrollTop: 0,
          success: data => {
            this.triggerEvent("getSearchTagScrollTop");
          }
        }); 
      }
    },
    jumpStore() {
      let { recommendObj = {}, traceId = ''} = this.data;
      let {storeHeadJumpParam: {params = {}, to = ""}, userActionStore = ''} = this.data.storeInfo;
      clickBuriedV2_({
        click_id: "click_to_store",
        click_par: params,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
      // {"storeId": "","isUnfold": "","keyWord":""}
      clickBuriedV2_({
        click_id: "ClickShopHead",
        click_par: params,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName,
        pageId: this.data.pageId
      });
      djCmsJump({
        to,
        params,
        userAction: userActionStore,
        traceId: traceId,
        preObj: recommendObj,
        buried_postion: "searchAbout-storeInfo11"
      })
    }
  }
})