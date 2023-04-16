import { djCmsJump } from '../../../../common/util/agreementV2'
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
        if (val && val.optionList) {
          this.setData({
            lists: val.optionList,
            title: val.layerTitle
          }, () => {
            let ids = this.data.lists.findIndex(item => {
              return item.selectedFlag == true
            })
            if (ids !== -1) {
              this.notice(ids, true)
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
    },
    modulePickerInit: {
      type: Boolean,
      value: false
    },
    buriedObj: {
      type: Object,
      value: null
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
    showLack: false,
    tipShow: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showPicker() {
      this.setData({
        showLack: true,
      });
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
      this.notice(this.data.selectedIds[0], false, true)
      this.closeBg()
    },
    notice(ids, pickerInit = false, click = false) {
      this.setData({
        selectedText: this.data.lists[ids].showText,
        selectedValue: this.data.lists[ids].value || '',
        'selectedIds[0]': ids
      }, () => {
        this.triggerEvent('refreshModuleKey', {
          key: this.data.infos.key,
          types: 'picker',
          value: click ? this.data.selectedValue : this.data.infos.value,
          pickerInit,
          refreshFlag: this.data.infos.refreshFlag
        })
      })
      if (this.data.modulePickerInit == false) {
        this.setData({
          'infos.rightText': this.data.lists[ids].showText
        })
      } else {
        this.data.modulePickerInit = false
      }
    },
    handleClickQuestion(e){
      let { items: { type = '', jumpUrl = '' } = {} } = e.currentTarget.dataset
      if (type == 1) {
        if (!jumpUrl.length) return
        djCmsJump({
          to: 'web',
          params: {
            url: jumpUrl
          },
          preObj: this.data.buriedObj || null,
          buried_position: {
            currentPageName: 'settlementv2_modulepicker_handleClickQuestion'
          }
        })
      } else if (type == 2) {
        this.showRule()
      }
    },
    showRule() {
      this.setData({ tipShow: !this.data.tipShow })
    },
  },
});
