
const computedBehavior = require('../../../utils/modules/miniprogram-computed').behavior

let timer = null

Component({
  behaviors: [computedBehavior],
  properties: {
    searchKey: {
      type: String,
      value: '',
      observer: (value) => this.watchSearchKey(value)
    },
  },
  data: {
    autoFocus: true,
    searchValue: '',
    showClearBtn: false,
    suggestionList: [],
    initSearchVal: ''
  },
  computed: {
    searchPlaceholder(data) {
      const { initSearchVal } = data
      return initSearchVal || '搜索您要购买的商品'
    }
  },
  methods: {
    watchSearchKey(value) {
      if (!value) return
      this.setData({ initSearchVal: value })
    },
    handleSearch() { // 点击搜索或者回车
      const { searchValue, initSearchVal } = this.data
      this.triggerEvent('search', {
        value: searchValue || initSearchVal,
        tagType: 'general'
      })
    },
    handleChange(e) {
      timer = setTimeout(() => {
        clearTimeout(timer)
        const { value } = e.detail
        this.setData({
          searchValue: value,
          showClearBtn: value.length > 0,
        })
      }, 150)
    },
    handleDelete() {
      this.setData({
        searchValue: '',
        showClearBtn: false
      })
    },
  }
})
