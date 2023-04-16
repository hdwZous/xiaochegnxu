Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: {
      type: Object,
      value: {}
    },
    show: {
      type: Boolean,
      value: false
    },
    memberOpenState: {
      type: Number,
      value: null
    },
    isIPX: {
      type: Boolean,
      value: false
    },
    submitOrderMemberTip: {
      type: Object,
      value: {}
    },
    buriedObj: {
      type: Object,
      value: null
    }
  },

  observers: {
    'memberOpenState': function(news) {
      if (news != null && this.data.show) {
        this.setData({
          flag: news == 1 ? true : false
        })
      }
    }
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    flag: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jump2shopRule(e){
       // 合规需求跳H5
      let { to,params,jumpflag } = e.currentTarget.dataset;
      if(!jumpflag) return;
      let jumpurl = `${params}`;
      wx.navigateTo({
          url: '/pages/h5/index?url=' + encodeURIComponent(jumpurl),
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'settlementv2_mebertoast_jump2shopRule'
          }
      })
    },
    
    changeSwitch() {
        this.setData({
            flag: !this.data.flag
        }, () => {
            this.triggerEvent('listenMember', {flag: this.data.flag})
        })
    }
  }
});
