import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function (newVal) {

        const { styleTpl = '', data = [], floorBgImg, showTitle } = newVal;
        const defaultProduct = data[0] || {};
        const productGroups = [];
        const btnDescGroups = [];
        let titleLocation = 'center', tabList = [];
        // 默认埋点
        if (data.length > 0) {
          clickBuriedV2_({
            click_id: "select_label",
            click_par: {
              traceId: this.data.traceId,
              userAction: data[0].userAction,
              state: '0'
            },
            pageId: this.data.pageId || "",
            currentPageName: this.data.currentPageName,
            prePageName: this.data.prePageName
          })
        }

        tabList = data.map((i, idx) => {
          titleLocation = i.titleLocation
          productGroups.push(i.skuList)
          btnDescGroups.push(i.moreBtnDesc)
          if (i.titleLocation == 0) {
            titleLocation = 'flex-start'
          }
          if (i.titleLocation == 2) {
            titleLocation = 'flex-end'
          }
          return {
            title: i.categoryTitle,
            color: i.titleColor,
            index: idx,
            userAction: i.userAction
          }
        })
        this.setData({
          tabList,
          titleLocation,
          productList: defaultProduct.skuList || [],
          styleTpl,
          floorBgImg,
          productGroups,
          btnDescGroups,
          showTitle
        })
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
    tabList: [],
    productList: [],
    tabIndex: 0,
    titleLocation: 'center',
    styleTpl: '',
    floorBgImg: '',
    productGroups: [],
    btnDescGroups: [],
    showTitle: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTabChange: function (e) {
      const data = e.currentTarget.dataset;
      clickBuriedV2_({
        click_id: "select_label",
        click_par: {
          traceId: this.data.traceId,
          userAction: data.item.userAction,
          state: '1'
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })

      this.setData({
        tabIndex: data.index,
        productList: this.data.productGroups[data.index]
      })
    },
    jumper: function (e) {
      clickBuriedV2_({
        click_id: "more_product",
        click_par: {
          
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      const data = e.currentTarget.dataset;
      data.traceId = this.data.traceId
      if (data.to && data.params) {
        if (data.params.id) {
          data.params.activityId = data.params.id
        }
        djCmsJump({
          to: data.to,
          params: data.params,
          userAction: data.userAction,
          traceId: this.data.traceId,
          preObj: this.data.recommendObj,
          buried_postion: "channel-productList"
        })
      }
    }
  },
  attached() {
    // console.log(this.data)
  }
})
