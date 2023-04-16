// 全局搜索商品列表
import { trigger_sku_component } from '../../../../common/util/tencentBi/report'
import { djCmsJump } from '../../../../common/util/agreementV2'
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    searchAll: {
      type: Boolean,
      value: false
    },
    fromSource: {
      // 来源如果是global代表是全局搜索，其他值代表店内搜索
      type: String,
      value: ""
    },
    traceId: {
      // 埋点产品要求新增 traceId
      type: String,
      value: ""
    },
    keyword: {
      type: String,
      value: ''
    },
    goodList: {
      type: Array,
      value: []
    },
    hasNextPage: {
      type: Boolean,
      value: true
    },
    FstandardCatIds: {
      type: Array,
      value: [],
      observer: function (standard) {
        this.setData({
          showAllGuess: !standard.length
        });
      }
    },
    FcatIds: {
      type: Array,
      value: [],
      observer: function (cat) {
        this.setData({
          showAllGuess: !cat.length
        });
      }
    },
    FbrandIds: {
      type: Array,
      value: [],
      observer: function (brands) {
        this.setData({
          showAllGuess: !brands.length
        });
      }
    },
    imgLazyLoad: {
      type: Object,
      value: {}
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
  data: {
    insertPosition: 3,
    showAllGuess: true
  },
  methods: {
    // 监听商品加减车变化
    onAddMinControllerChange (e) {
      let data = e.detail.data;
      let type = e.detail.type;
      if (type == "add") {
        this.triggerEvent("goodAddBury", data);
        this.noticeParent(type, data);
      } else if (type == "min") {
        this.triggerEvent("goodReduceBury", data);
        this.noticeParent(type, data);
      } else if (type == "showModel") {
        // 多规格时弹出spu-selector选择器
        this.noticeParent(type, data);
      }
    },
    noticeParent () {
      // this.triggerEvent('listenCountChange', {
      //     params: {
      //         type: type,
      //         data: data
      //     }
      // })
    },
    jumpStore (e) {
      let { item = {}, params = {}, to = "", userAction = {} } = e.currentTarget.dataset || {};
      params.keyword = this.data.keyword;
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "searchAbout-goodList1"
      });
      trigger_sku_component(item || {});
    },
    goStore (e) {
      let goodData = e.currentTarget.dataset || {};
      let { item = {}, userAction = {} } = goodData;
      let {storeHeadJumpParam: {params = {}, to = ""}} = item || {};

      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.traceId,
        preObj: this.data.recommendObj,
        buried_postion: "searchAbout-goodList2"
      });
      trigger_sku_component(item || {});
    }
  }
});