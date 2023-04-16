// components/ratioPicker/index.js
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer: function (val) {
        // console.log('选择窗显示和隐藏--->',val,val02,val03)
        if (val) {
          this.setData({
            bottom: 0
          })
        } else {
          this.setData({
            selectItem: {},
            txtValue: ""
          })
          setTimeout(() => { // 解决ios不能滚动问题
            this.setData({
              bottom: -600
            })
          }, 0)
        }
      }
    },
    initData: {
      type: Object,
      value: null,
      observer: function () {
        // console.log('111',newVal)
      }
    },
    title: {
      type: String,
      value: ""
    },
    pickerType: {
      type: Number,
      value: 1 // 单选样式类型 1 全能选中的 2 分级的带不能选中的
    },
    cancelTip: {
      type: Object,
      value: null
    },
    recommendObj: {
      type: Object,
      value: {}
    },
    orderState: {
      type: Number,
      value: 0
    },
    orderId: {
      type: Number,
      value: 0
    },
    modalType: {
      type: Number,
      value: 0
    },
    rationTitle: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached: function () {
      let _this = this
      this.setData({
        marginBottom: getApp().globalData.isIpx ? '40rpx' : '30rpx'
      })
      wx.getSystemInfo({
        success: function (res) {
          //  console.log('res',res)
          if (res.platform.toUpperCase() == "IOS") {
            _this.setData({
              isIOS: true
            })
          } else {
            _this.setData({
              isIOS: false
            })
          }
        }
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isIOS: false,
    bottom: -600,
    txtValue: '',
    scrollTop: 0,
    maxHeightRatio: 80, // picker的最大高度
    selectItem: {}, // 单选选中的item
    submitBtnActive: false, // 单选按钮是否选中
    marginBottom: 0, // 底部按钮距离底部距离
    selectItemRecord: {},
    // 显示取消订单提示信息
    showCancelTip: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    stopPropagation () { },
    handleKeyboardheightchange (ev) {
      // console.log('键盘高度变化', ev)
      this.setData({
        bottom: ev.detail.height
      })
      // if(ev.detail.duration > 0){
      if (ev.detail.height > 0) {
        // console.log('高度大于0')
        this.setData({
          maxHeightRatio: this.data.isIOS ? 35 : 40
          // scrollTop:1000
        })
        setTimeout(() => {
          this.setData({
            scrollTop: 1000
          })
        }, 10)
      } else {
        // console.log('高度等于0')
        this.setData({
          maxHeightRatio: 80
        })
      }
      // }
    },
    handleInputChange (ev) {
      if (ev.detail.value.length >= 50) {
        wx.showToast({
          title: '文字输入已达上限～',
          icon: 'none'
        })
      }
      this.setData({
        txtValue: ev.detail.value
      })
      if (ev.detail.value.length >= 6) {
        this.setData({
          submitBtnActive: true
        })
      } else {
        this.setData({
          submitBtnActive: false
        })
      }
    },
    // 选择每一个item
    handleSelect (ev) {
      // console.log(ev)
      let selectItem = ev.currentTarget.dataset.item
      if (selectItem.code != -1) {
        this.setData({
          submitBtnActive: true,
          bottom: 0, // 收起键盘让弹层滚动到底部
          maxHeightRatio: 80
        })
      } else {
        if (this.data.txtValue.length >= 6) {
          this.setData({
            submitBtnActive: true
          })
        } else {
          this.setData({
            submitBtnActive: false
          })
        }
      }
      this.setData({
        selectItem,
        selectItemRecord: selectItem,
        initData: this.data.initData && this.data.initData.map(item => {
          if (item.code == selectItem.code) {
            item.checked = true
          } else {
            item.checked = false
          }
          return item
        })
      })


      let {recommendObj = {}, orderState = 0, orderId = 0, modalType = 0, rationTitle = ''} = this.data;
      let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = recommendObj;
      let params = modalType ? {
        orderId,
        orderState,
        code: selectItem.code,
        reason: selectItem.name,
        type: rationTitle
      } : {
        orderId,
        orderState,
        code: selectItem.code,
        reason: selectItem.name
      }
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "selectReason",
        click_par: params,
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage
      })
    },
    // 选择提交
    handleSubmit () {
      if (this.data.submitBtnActive) {
        this.triggerEvent('selectCallback', { selectItem: this.data.selectItem, txtValue: this.data.txtValue })
        let {recommendObj = {}, orderState = 0, orderId = 0, selectItemRecord = {}, rationTitle = ''} = this.data;
        let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = recommendObj;
        let params = rationTitle ? {
          orderId,
          orderState,
          type: rationTitle,
          code: selectItemRecord.code || 0,
          reason: selectItemRecord.name
        } : {
          orderId,
          orderState,
          code: selectItemRecord.code || 0,
          reason: selectItemRecord.name
        }
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "clickSubmit",
          click_par: params,
          currentPageName: currentPageName,
          prePageName: prePageName,
          pageId: pageIdFirstPage
        })
      }
    },
    // 关闭弹窗
    colseMask () {
      this.triggerEvent('close', {})
      this.setData({
        selectItem: {},
        txtValue: "",
        submitBtnActive: false
      })
    },
    showCancelTipHandle () {
      this.setData({
        showCancelTip: !this.data.showCancelTip
      });
      let {recommendObj = {}, orderState = 0, orderId = 0} = this.data;
      let {currentPageName = '', prePageName = '', pageIdFirstPage = ''} = recommendObj;
      clickBuriedV2_({
        create_time: new Date(),
        click_id: "unfoldText",
        click_par: {
          orderId,
          orderState
        },
        currentPageName: currentPageName,
        prePageName: prePageName,
        pageId: pageIdFirstPage
      })
    }

  }
})
