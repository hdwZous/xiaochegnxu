import { djCmsJump } from '../../../../common/util/agreementV2';
Component({
  /**
   * 组件的属性列表
   */
  lazyObj: {
    epSelector: ".suggestion"
  },
  properties: {
    suggestionWord: {
      type: Object,
      value: {},
      observer(val){

      }
    },
    styleABMap:{
      type: Object,
      value: {}
    },
    traceId: {
      type:String,
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
  methods:{
    clickItem(e){
      let item = e.currentTarget.dataset.item;
      let {to ='',params ={},userAction = ''} = item
      let { recommendObj } = this.data
      djCmsJump({
        to,
        params,
        userAction,
        preObj: recommendObj,
        buried_postion: "searchAbout-searchSuggestion"
      })
    }
  }
})