/* eslint-disable camelcase */
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ipx: {
      type: Boolean,
      value: false
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: function (val) {
        // 打开弹层赋 默认值
        if (val && this.data.tableWareData) {
          this.setData({
            tablewareRememberStatus: this.data.tableWareData.data.tablewareLayer.tablewareRememberStatus || '',
            needTablewareNum: this.data.tableWareData.data.tablewareLayer.needTablewareNum || 0,
            maxTablewareNum: this.data.tableWareData.data.tablewareLayer.maxTablewareNum || 10,
            tablewareOptionStatus: this.data.tableWareData.data.tablewareLayer.tablewareOptionStatus || ''
          })
        }
      }
    },
    tableWareClickType: {
      type: String,
      value: '',
      observer: function (val) {
        let buttonText = '请选择餐具'
        if (val == 1 && this.data.tablewareOptionStatus) {
          buttonText = '确认'
        } else if (val == 2 && this.data.tablewareOptionStatus) {
          buttonText = '确认并提交订单'
        }
        this.setData({
          buttonText
        })
      }
    },
    tableWareData: {
      type: Object,
      value: {},
      observer: function (val) {
        if (val && val.data.arrowStatus == 1) {
          this.data.localNeedTablewareNumData = val.data && val.data.tablewareLayer && val.data.tablewareLayer.needTablewareNum
        }
      }
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    storeId: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tablewareRememberStatus: '',
    isFollowUp: false,
    isNeedFollowUp: false,
    needTablewareNum: 0,
    maxTablewareNum: 10,
    buttonText: '请选择餐具',
    defaultData: null,
    reduceDisAble: false,
    addDisAble: false,
    localNeedTablewareNumData: '',
    tableWareNumList: [{
      text: "商家按餐具提供",
      type: 0,
      value: '0'
    }, {
      text: '1份',
      type: 1,
      value: 1
    }, {
      text: '2份',
      type: 2,
      value: 2
    }, {
      text: '3份',
      type: 3,
      value: 3
    }, {
      text: '4份',
      type: 4,
      value: 4
    }, {
      text: '5份',
      type: 5,
      value: 5
    }, {
      text: '6份',
      type: 6,
      value: 6
    }, {
      text: '7份',
      type: 7,
      value: 7
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    close (value) {
      let closeData = {
        isShow: false
      }
      if (value != 'confirm') {
        if (this.data.localNeedTablewareNumData != this.data.needTablewareNum) {
          if (this.data.needTablewareNum > 6 && this.data.localNeedTablewareNumData < 7) {
            Object.assign(closeData, {
              'tableWareNumList[7].value': 7,
              'tableWareNumList[7].text': '7份',
              reduceDisAble: false,
              addDisAble: false
            })
          } else if (this.data.needTablewareNum > 6 && this.data.localNeedTablewareNumData > 6) {
            Object.assign(closeData, {
              'tableWareNumList[7].value': this.data.localNeedTablewareNumData,
              'tableWareNumList[7].text': `${this.data.localNeedTablewareNumData}份`,
              reduceDisAble: this.data.localNeedTablewareNumData == 7 ? false : true,
              addDisAble: this.data.localNeedTablewareNumData == this.data.maxTablewareNum ? true : false
            })
          }
        }
      } else if (value == 'confirm') {
        if (this.data.needTablewareNum < 7) {
          this.setData({
            'tableWareNumList[7].value': 7,
            'tableWareNumList[7].text': '7份',
            reduceDisAble: false,
            addDisAble: false
          })
        }
      }
      this.setData(closeData, () => {
        console.log(this.data.tableWareNumList[7]);
      })
    },
    selectFollowUp () {
      let tablewareRememberStatus = ''
      // 需要餐具
      if (this.data.tablewareOptionStatus == 1) {
        if (this.data.tablewareRememberStatus == 1) {
          tablewareRememberStatus = ''
        } else {
          tablewareRememberStatus = 1
        }
      } else if (this.data.tablewareOptionStatus == 2) { // 无需餐具
        if (this.data.tablewareRememberStatus == 2) {
          tablewareRememberStatus = ''
        } else {
          tablewareRememberStatus = 2
        }
      }
      this.setData({
        tablewareRememberStatus: tablewareRememberStatus
      })
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'tableware',
          storeId: this.data.storeId,
          tablewareRememberStatus: tablewareRememberStatus
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      })
    },
    // 阻止关闭
    stopClose () {
      return false
    },
    confirm () {
      this.triggerEvent('handleTableWareBack', {
        tablewareOptionStatus: this.data.tablewareOptionStatus,
        needTablewareNum: this.data.needTablewareNum,
        tablewareRememberStatus: this.data.tablewareRememberStatus,
        tableWareClickType: this.data.tableWareClickType
      })
      this.close('confirm')
    },
    select (e) {
      const { type } = e.currentTarget.dataset
      let tablewareOptionStatus
      if (type == 1) {
        tablewareOptionStatus = 1
      } else {
        tablewareOptionStatus = 2
      }
      this.setData({
        tablewareOptionStatus: tablewareOptionStatus,
        needTablewareNum: 0,
        tablewareRememberStatus: '',
        buttonText: this.data.tableWareClickType == 1 ? '确认' : '确认并提交订单',
        'tableWareNumList[7].value': 7,
        'tableWareNumList[7].text': '7份',
        reduceDisAble: false,
        addDisAble: false
      })
      clickBuriedV2_({
        click_id: 'clickLayer',
        click_par: {
          type: 'tableware',
          storeId: this.data.storeId,
          tablewareOptionStatus: tablewareOptionStatus
        },
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        currentPageName: this.data.recommendObj.currentPageName,
        prePageName: this.data.recommendObj.prePageName
      })
    },
    selectTableWareNum (e) {
      const { item } = e.currentTarget.dataset
      this.setData({
        needTablewareNum: item.value
      })
    },
    controlNum (e) {
      const { item, control } = e.currentTarget.dataset
      if (item.type == 7) {
        if (Number(item.value) + 1 <= this.data.maxTablewareNum && control == 'add') {
          console.log(Number(item.value) + 1);
          this.setData({
            ['tableWareNumList[7].text']: `${Number(item.value) + 1}份`,
            needTablewareNum: `${Number(item.value) + 1}`,
            ['tableWareNumList[7].value']: `${Number(item.value) + 1}`
          }, () => {
            console.log(this.data);
          })
        } else if (Number(item.value) > 7 && control == 'reduce') {
          this.setData({
            ['tableWareNumList[7].text']: `${Number(item.value) - 1}份`,
            ['tableWareNumList[7].value']: `${Number(item.value) - 1}`,
            needTablewareNum: `${Number(item.value) - 1}`
          })
        }
        this.setData({
          reduceDisAble: this.data.needTablewareNum == 7 ? false : true,
          addDisAble: this.data.needTablewareNum == this.data.maxTablewareNum ? true : false
        }, () => {
          console.log(this.data.reduceDisAble, this.data.addDisAble);
        })
      }
    },
    openTip () {
      console.log('打开');
      this.triggerEvent('handleTableWareOpenTip', this.data.tableWareData.data.tablewareLayer.smallQuestionMark.questionLayer)
    }
  }
})
