Component({
  properties: {
    text: String,
    textColor: String,
    lineColor: String,
    backgroundColor: String,
    backgroundStartColor: String,
    backgroundEndColor: String,
    isCoupon: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  observers: {
    'disabled, isCoupon': function (disabled, isCoupon) {
      const tagCls = []

      if (isCoupon) {
        tagCls.push('tag--coupon')
      }

      if (disabled) {
        tagCls.push('tag--disabled')
      }

      this.setData({
        tagCls: tagCls.join(' ')
      })
    },
    'backgroundColor, textColor, lineColor, backgroundStartColor, backgroundEndColor': function (backgroundColor, textColor, lineColor, backgroundStartColor, backgroundEndColor) {
      const tagStyle = []
      const couponStyle = []
      const style = {}

      if (backgroundStartColor && backgroundEndColor) {
        tagStyle.push(`background-image: linear-gradient(180deg, ${backgroundStartColor} 0%, ${backgroundEndColor} 100%)`)
      } else if (backgroundColor) {
        tagStyle.push(`background-color: ${backgroundColor}`)
      }

      if (textColor) {
        tagStyle.push(`color: ${textColor}`)
      }

      if (lineColor) {
        tagStyle.push(`border-color: ${lineColor}`)
        couponStyle.push(`border-color: ${lineColor}`)
      }

      if (tagStyle.length) {
        style.tagStyle = tagStyle.join('; ')
      }

      if (couponStyle.length) {
        style.couponStyle = couponStyle.join('; ')
      }

      if (Object.keys(style).length) {
        this.setData({ ...style })
      }
    }
  }
})
