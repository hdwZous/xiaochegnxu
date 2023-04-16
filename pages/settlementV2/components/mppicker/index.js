import { clickBuriedV2_} from "../../../../common/util/BI";
Component({
	/**
   * 组件的属性列表
   */
  properties: {
    deliverModel: {
      type: Number,
      value: 1
    },
    show: {
      type: Boolean,
      value: false,
      observer(val) {
        if (val) {
          this.showBox(val)
        }
      }
    },
    promiseTip: {
      type: String,
      value: ''
    },
    //已选择日期的索引
    dateIndex: {
      type: Number,
      value: 0
    },
    //已选择时间的索引
    timeIndex: {
      type: Number,
      value: 0
    },
    curDateIndex: {
      type: Number,
      value: 0
    },
    //二维数组【 { [{ } ] } 】
    promiseDateRespItems: {
      type: Array,
      value: []
    },
    deliverTimeDesc: {
      type: Object,
      value: null
    },
    isIOS: {
      type: Boolean,
      value: false
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
    showBox: false,
    tipShow: false
  },

  options: {
    addGlobalClass: true,
  },

	/**
   * 组件的方法列表
   */
  methods: {
    showBox() {
      setTimeout(() => {
        this.setData({
          showBox: true
        })
      }, 100)

    },
    hide() {
      this.setData({
        showBox: false
      })
      this.triggerEvent('popStatus', {
        types: 'mppicker',
        flag: false
      })
    },
    close() {
      this.hide()
    },
    show() {
      this.setData({
        show: true,
        showBox: false
      })
    },
    //点击左边类目
    selectCurDateIndex(e) {
      let index = e.currentTarget.dataset.dateIndex
      this.setData({
        curDateIndex: index
      })
    },
    //点击右边的类目
    selectTimeIndex(e) {
      let { timeIndex, status, statusTip } = e.currentTarget.dataset
      if (status !== 1) {
        wx.showToast({
          title: `${statusTip}，请选择其他时间`,
          icon: "none",
          duration: 2000
        })
        return
      }
      this.setData({
        dateIndex: this.data.curDateIndex,
        timeIndex: timeIndex
      })
      this.getPickerTime()
      this.hide()
    },
    catchtouchmove() {
      return false
    },
    getPickerTime() {
      this.triggerEvent("getPickerTime", {
        data: {
          dateIndex: this.data.dateIndex,
          timeIndex: this.data.timeIndex
        }
      })
    },
    showDialog() {
      this.setData({
        tipShow: true,
        showBox: false
      })
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickExplainIcon',
        click_par: {
          iconName: '配送时间'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    tipClose() {
      this.setData({
        tipShow: false,
        showBox: true
      })
    }
  }

})
