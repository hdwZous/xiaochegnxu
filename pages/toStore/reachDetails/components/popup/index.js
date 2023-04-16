Component({
  properties: {
    title: {
      type: String,
      value: '标题',
    },
    html: {
      type: String,
      value: '',
    },
    showPopup: {
      type: Boolean,
      value: false,
      observer(show) {
        this.setData({ show })
      },
    },
  },
  data: {
    show: false,
  },
  methods: {
    onBeforeLeave () {
      this.triggerEvent('close')
      this.setData({ show: false })
    }
  }
})
