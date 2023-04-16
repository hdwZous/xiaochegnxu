Component({
  properties: {
    title: {
      type: String,
      value: '',
      observer: function (val) {
        if (val) {
          setTimeout(() => {
            this.setData({
              title: ""
            })
            this.triggerEvent('closeToast')
          }, 2000);
        }
      }
    }
  },
  data: {
  },
  attached() {
  },
  methods: {
  }
})