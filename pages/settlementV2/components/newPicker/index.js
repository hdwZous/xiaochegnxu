import { clickBuriedV2_ } from '../../../../common/util/BI'
let app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    infos: {
      type: Object,
      value: null,
      observer: function (val) {
        if (val.data && val.data.optionList) {
          this.setData({
            lists: val.data.optionList,
            title: val.data.title
          }, () => {
            // 查询缓存中是否有上次请求的pickId
            if (app.globalData.settlePickerKey != null) {
              let cacheId = app.globalData.settlePickerKey
              let ids = this.data.lists.findIndex(item => {
                return item.id == cacheId
              })
              if (ids !== -1) {
                this.notice(ids)
              } else {
                this.notice(0)
              }
            } else {
              this.notice(0)
            }
            
          })
        }
      }
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
    selectedIds: [0],
    selectedText: '',
    selectedValue: '',
    lists: [],
    showLack: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showPicker() {
      this.setData({
        showLack: true,
      });
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'showLayer',
        click_par: {
          type: 'picker'
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    closeBg() {
      this.setData({
        showLack: false,
      });
    },
    bindPickerChange(e) {
      let val = e.detail.value
      this.setData({
        selectedIds: val
      })
    },
    confirm() {
      this.notice(this.data.selectedIds[0])
      this.closeBg()
      clickBuriedV2_({
        create_time: new Date(),
        click_id: 'clickLayer',
        click_par: {
          type: 'picker',
          content: this.data.lists[this.data.selectedIds[0]].showText
        },
        pageId: this.data.pageId,
        currentPageName: this.data.currentPageName,
        prePageName: this.data.prePageName
      })
    },
    notice(ids) {
      this.setData({
        selectedText: this.data.lists[ids].showText,
        selectedValue: this.data.lists[ids].value || '',
        'selectedIds[0]': ids
      })
      this.triggerEvent('setPickerValue', {
        pickerValue: this.data.lists[ids].value || ''
      })
      app.globalData.settlePickerKey = this.data.lists[ids].id
    }
  },
});
