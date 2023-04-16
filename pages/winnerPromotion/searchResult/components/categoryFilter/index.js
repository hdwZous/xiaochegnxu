Component({
  properties: {
    displayFilterFloor: {
      type: Object,
      value: {
        itemList: []
      },
    },
    filterList: {
      type: Array,
      value: [],
      observer: function (list) {
        const item = list.reverse().find(i => i.filterType == 1 || i.filterType == 3)
        console.log(item)
        let itemId = item ? `_${item.itemId}` : ''
        if (itemId) {
          this.setData({ itemId })
          return
        }
        this.setData({
          scrollLeft: 0,
          itemId
        })
      },
    },
  },
  data: {
    scrollLeft: 0,
    itemId: '_',
  },
  methods: {
    handleSelectCategory(e) {
      const { itemId } = this.data
      let { item } = e.currentTarget.dataset
      if (itemId === `_${item.itemId}`) {
        return
      }
      this.setData({
        itemId: `_${item.itemId}`,
      })
      this.triggerEvent('categoryChange', item)
    },
  },
})
