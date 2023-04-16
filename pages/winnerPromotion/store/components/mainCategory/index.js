Component({
  properties: {
    cateList: {
      type: Array,
      value: [],
    },
    cateIndex: {
      type: String,
      observer: () => {

      }
    },
  },
  methods: {
    clickClassify: function (e) {
      let myEventDetail = e // detail对象，提供给事件监听函数
      let myEventOption = {} // 触发事件的选项
      this.triggerEvent('clickClassify', myEventDetail)
    },
  },
})
