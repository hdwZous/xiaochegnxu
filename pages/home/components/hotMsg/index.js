import { djCmsJump } from "../../../../common/util/agreementV2";
import { transferExposureData } from '../../../../common/util/BI';

Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_hotmsg',
    epSelector: '.home_hotmsg'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    item: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val.data && val.data.length && val.data.length ==1 ) {
          this.epSection && this.epSection()
        }
      }
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    autoPlay: true
  },
  pageLifetimes: {
    show() {
      this.setData({
        autoPlay: true
      })
    },
    hide() {
      this.setData({
        autoPlay: false
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    clickHotText(e) {
      let { to = '', params = '', userAction = '' } = e.currentTarget.dataset.item || {};
      // if(to && params.url){
      djCmsJump({
        to,
        params,
        userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homehotmsg_clickHotText_home'
        }
      })
      // }

    },
    // 获取当前页面路径
     _getHistoryPage() {
      try {
        let historyPage = getApp().globalData.historyPage || [];
        return JSON.stringify(historyPage);
      } catch (err) {
        return JSON.stringify([]);
      }
    },
    swiperChange(e){
      let { current } = e.detail
      let _this = this;
      this.data.observerObj = this.createIntersectionObserver({
        thresholds: [0.5],
        observeAll: true
      });
      const { userAction ='' } =  this.data.item.data[current] && this.data.item.data[current].floorCellData 
      let {pageId= '',traceId='',currentPageName='',prePageName=''} = e.currentTarget.dataset
      this.data.observerObj.relativeToViewport().observe('.swiper_item', function (res) {
        if(_this.data.item.data && _this.data.item.data.length > 1 && _this.data.autoPlay){
          transferExposureData({
            userAction,
            traceId,
            create_time: new Date(),
            clienttime: Date.now(),
            pageId,
            currentPageName,
            prePageName
          })
        }
      })
     

     
    }
  }
})
