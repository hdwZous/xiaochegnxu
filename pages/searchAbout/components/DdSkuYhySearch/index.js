import { djCmsJump } from '../../../../common/util/agreementV2'
// 全局搜索到店商品
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".dd-good-item"
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: {
      type: Object,
      value: null,
      observer(val) {
        if(val){
          this.epSection && this.epSection();
        }
        let starList = []
        if (val.storeStar) { // 4.6
          let starLight = parseInt(val.storeStar) // 4
          let starDart = parseInt(5 - val.storeStar) // 0
          for (let i = 0; i < starLight; i++) {
            starList[i] = "star_100"
          }
          let starIndex = starList.length
          if (starDart + starLight < 5) {
            let starLightDart = 1 - (5 - val.storeStar - starDart)
            if (starLightDart <= 0.25) {
              starList[starIndex] = "star_025"
            } else if ( starLightDart > 0.25 && starLightDart <= 0.5) {
              starList[starIndex] = "star_050"
            } else if (starLightDart > 0.5 && starLightDart <= 0.75) {
              starList[starIndex] = "star_075"
            } else {
              starList[starIndex] = "star_100"
            }
            starIndex++;
          }
          for (let j = 0; j < starDart; j++ , starIndex++) {
            starList[starIndex] = "star_000"
          }
          this.setData({
            starList
          });
        }
      }
    },
    traceId: {
      // 埋点产品要求新增 traceId
      type: String,
      value: ""
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
    keyword: {
      type: String,
      value: ''
    },
  },
  data:{
    starList: [],
    defaultLogo:"https://storage.360buyimg.com/wxmini/search/defaultLogo.png"
  },
  methods:{
    jumpStore(e) {
      let { params = {}, to = "", userAction = {} } = e.currentTarget.dataset || {};
      params.keyword = this.data.keyword;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "searchAbout-goodList-Dd1"
      });
    },
    goStore(e) {
      let goodData = e.currentTarget.dataset || {};
      let { item = {}, userAction = {} } = goodData;
      let {storeHeadJumpParam: {params={}, to=""}} = item || {};
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "searchAbout-goodList-Dd2"
      });
    }
  }
});