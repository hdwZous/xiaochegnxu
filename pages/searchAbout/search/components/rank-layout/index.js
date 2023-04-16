Component({
  properties: {
    title: String,
    logo: String,
    titleColor: {
      type: String,
      value: ''
    },
    bgStartColor: String,
    bgEndColor: String,
    bottomText: {
      type: String,
      value: ''
    }
  },
  observers: {
    'bgStartColor, bgEndColor': function (bgStartColor, bgEndColor) {
      const contentStyle = []
      const footerStyle = []

      if (bgStartColor && bgEndColor) {
        contentStyle.push(`background-image: linear-gradient(180deg, ${bgStartColor} 0%, ${bgEndColor} 100%)`)
      }

      if (bgEndColor) {
        footerStyle.push(`background-color: ${bgEndColor}`)
      }

      this.setData({
        contentStyle: contentStyle.join('; '),
        footerStyle: footerStyle.join('; ')
      })
    },

    'bgStartColor, titleColor': function (bgStartColor, titleColor) {
      const headerStyle = []
      if (bgStartColor) {
        headerStyle.push(`background-color: ${bgStartColor}`)
      }

      if (titleColor) {
        headerStyle.push(`color: ${titleColor}`)
      }

      if (headerStyle.length) {
        this.setData({
          headerStyle: headerStyle.join('; ')
        })
      }
    }
  }
})
