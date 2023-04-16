Component({
  properties: {
    searchKey: {
      type: String,
      value: '',
    },
    storeId: {
      type: String,
      value: '',
    },
    orgCode: {
      type: String,
      value: '',
    },
    channelId: {
      type: String,
      value: ''
    },
  },
  methods: {
    handleToSearch() {
      const { searchKey, storeId, orgCode, channelId } = this.data
      wx.redirectTo({
        url: `/pages/winnerPromotion/search/search?searchKey=${searchKey}&storeId=${storeId}&orgCode=${orgCode}&showValue=true&channelId=${channelId}`,
      })
    },
  },
})
