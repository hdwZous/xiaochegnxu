import {
  request,
  FNIDS
} from "../../common/util/api"
import orderPublic from '../../common/util/public.js';
import { clickBuriedV2_ } from '../../common/util/BI'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mapHeight: {
      type: String,
      value: '600rpx'
    },
    orderId: {
      type: Number,
      value: 0
    },
    storeId: {
      type: Number,
      value: 0
    },
    list: {
      type:Array,
      value:[]
    },
    buriedObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tip: ''
  },
  lifetimes: {
    detached() {
      this.timerId && clearInterval(this.timerId)
      this.exitimerId && clearTimeout(this.exitimerId)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoStore (e){
      orderPublic.gotostore.call(null, e, this)
      this.gotoStoreBi(e);
    },
    gotoStoreBi(e){
      let {storeId = 0} = e.currentTarget.dataset.order || {}
      let {currentPageName = '', prePageName='', pageIdFirstPage = ''} = this.data.buriedObj;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickOftenShop',
        click_par: {
          storeId
        },
        currentPageName: currentPageName || "",
        prePageName: prePageName || "",
        pageId: pageIdFirstPage || ""
      })
    },
    onTapMap() {
      this.triggerEvent('tapMapEvent')
    }
  }
})
