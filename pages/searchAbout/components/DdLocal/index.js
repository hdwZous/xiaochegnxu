import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nearbyObj: {
      type: Object,
      value: {}
    },
    showNearby: {
      type: Boolean,
      value: false
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    keyword: {
      type: String,
      value: ""
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    clickArrow(){
      let {showNearby = false} = this.data;
      this.triggerEvent("selectNearby", {showNearby:!showNearby});
      this.clickArrowBi()
    },
    clickArrowBi(){
      let {recommendObj = {}, keyword = ''} = this.data; 
      let { currentPageName = '', prePageName = '', pageIdFirstPage = ''} = recommendObj;
      clickBuriedV2_({
        click_id: "clickFilter",
        click_par: {
          tabType: '到店',
          keyword: keyword
        },
        currentPageName: currentPageName ,
        prePageName: prePageName,
        pageId: pageIdFirstPage,
        preObj: recommendObj
      });
    }
  }
});