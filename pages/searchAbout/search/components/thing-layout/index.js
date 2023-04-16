Component({
  properties: {
    imgUrl: {
      type: String,
      value: ''
    },
    cornerImage: String
  },
  methods: {
    onTap () {
      this.triggerEvent('tapEvent')
    }
  }
})