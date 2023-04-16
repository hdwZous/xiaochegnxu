import { clickBuriedV2_ } from '../../../../common/util/BI';
Component({
  lazyObj: {
    selector: '',
    epSelector: '.wrap .channel_comp_ep',
    componentName: 'nav'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    initData: {
      type: Array,
      val: [],
      observer: function (val) {
        this.handleNavData(val)
        this.setData({
          currentIndex: 0
        })

        this.epSection()
      }
    },
    config: {
      type: Object,
      val: {},
      observer: function () {
        // console.log('val',val)
      }
    },
    currentIndex: {
      type: Number,
      val: 0
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navArr: [],
    currentIndex: 0
  },
  lifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleNavData(val) {
      // 默认埋点
      clickBuriedV2_({
        click_id: "click_sec_category",
        click_par: {
          traceId: this.data.traceId,
          type: 'default',
          userAction: val[0].userAction,
          state: '0'
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      this.setData({
        navArr: val
      })
      if (val.length <= 16) {
        this.setData({
          navArr: val
        })
      } else {
        let newArr = JSON.parse(JSON.stringify(val)).splice(0, 16)
        newArr[newArr.length - 1] = { name: '展开', fold: true, isfold: true }
        //  console.log(newArr)
        this.setData({
          navArr: newArr
        })
      }
    },
    handleNavClick(e) {
      clickBuriedV2_({
        click_id: "click_sec_category",
        click_par: {
          traceId: e.currentTarget.dataset.traceId,
          type: 'default',
          userAction: e.currentTarget.dataset.userAction,
          state: '1'
        },
        pageId: this.data.pageId || "",
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
      let { item, index } = e.currentTarget.dataset;
      // console.log(item,this.data.initData);
      if (item.isfold) {
        if (item.fold) {
          let diff = this.data.initData.length % 4;
          let newArr = JSON.parse(JSON.stringify(this.data.initData));
          newArr.length = this.data.initData.length + (4 - diff);
          newArr[newArr.length - 1] = { name: '收起', fold: false, isfold: true };
          // console.log(diff,newArr);
          this.setData({
            navArr: newArr
          })
        } else {
          this.handleNavData(this.data.initData)
        }
      } else {
        this.triggerEvent('handleSecondNav', { ...item, index })
        this.setData({
          currentIndex: index
        })
      }
    }
  }
})
