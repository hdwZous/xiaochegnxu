Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /* 展示类型 0: 下发说明全部在一个单独字段中 {title: '', descText: ''}
               1: 数组类型 readmeList: [{type: 2, text: {title: ''}}]
    */          
    types: {
      type: Number,
      value: 0
    },
    show: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ''
    },
    desc: {
      type: String,
      value: ''
    },
    readmeList: {
      type: Array,
      value: []
    },
    showBtn: {
      type: Boolean,
      value: false
    }
  },

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeDialog() {
      this.triggerEvent('tipClose')
    },
    catchtouchmove() {
      return false
    }
  }
});
