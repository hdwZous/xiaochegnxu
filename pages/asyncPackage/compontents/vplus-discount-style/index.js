Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    left: {
      type: Array,
      value: [{
        fontColor: '#711A13',
        fontSize: 16,
        fontWeight: 0,
        type: 2,
        text: 120
      }, {
        fontColor: '#711A13',
        fontSize: 8,
        fontWeight: 1,
        type: 1,
        text: '元'
      }]
    },
    bgimg: {
      type: String,
      value: ''
    },
    right: {
      type: Object,
      value: {
        fontColor: '#711A13',
        fontSize: 9,
        fontWeight: 0,
        type: 1,
        text: '含6张店铺券'
      }
    },
    leftMl: {
      type: String,
      value: '32rpx'
    },
    rightWd: {
      type: String,
      value: '106rpx'
    },
    from: {
      type: String,
      value: ''
    },
    vpType: {
      type: String,
      value: 3
    },
    exchangeStyle: {
      type: Object,
      value: {}
    },
    allowance: {
      type: Object,
      value: {}
    }
  },
  data: {}
});