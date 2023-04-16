import { updateGoodsNum } from '../../../../common/util/carService'

Component({
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {},
    },
    activityId: {
      type: String,
      value: "",
    },
    pageConfig: {
      type: Object,
      value: {},
    },
    pageFrom: {
      type: String,
      value: "",
    },
    updateInfo: {
      type: Object,
      value: null,
    },
    biPageName: {
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
    updateInfo: function (news) {
      if (news && news.type) {
        let { data } = news
        this.data.item.data.map((item, index) => {
          if ( (item.storeId == undefined) || (item.storeId && item.storeId == data.storeId) ) {
            updateGoodsNum(this, this.data.item.data[index].skuList, news, `item.data[${index}].skuList`)
          }
        })
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
});
