import { SORT_TYPE, SORT_TYPE_ORDER } from '../../constant'
import { isIponeX } from '../../../utils/common'

Component({
  properties: {
    showFilter: {
      type: Boolean,
      value: false,
      observer: function (_) {
        this.setData({ refresh: false })
        this.setData({ refresh: true })
      },
    },
    filterOptions: {
      type: Array,
      value: [],
      observer: function (list) {
        console.log('filterOptions', list, this.data.filterFloor)
        // 匹配楼层缓存中选中过的筛选项
        const selectedIds = this.data.filterFloor.reduce((pre, cur) => {
          const ids = cur.itemList.filter(i => i.selected).map(i => i.itemId)
          return [...pre, ...ids]
        }, [])

        const filterFloor = list.map((filter, index) => {
          // 只有一个筛选条层展示全部选项，默认展示12个筛选项，超出2层后的隐藏全部选项
          let firstScreen = 12
          if (list.length > 1) {
            firstScreen = index > 2 ? 0 : 12
          }
          filter.itemList = filter.itemList.map(i => ({ ...i, selected: selectedIds.includes(i.itemId) }))

          return {
            ...filter,
            firstScreen,
            showAll: false
          }
        })
        let filterFloorCache = JSON.parse(JSON.stringify(filterFloor))

        this.setData({ filterFloor, filterFloorCache })
      },
    },
    filterList: {
      type: Array,
      value: [],
      observer: function (list) {
        console.log('sortFilter', list)
        const item = list.reverse().find(i => i.filterType == 1 || i.filterType == 3)

        if (item) {
          const filterFloor = this.data.filterOptions.map((filter, index) => {

            filter.itemList = filter.itemList.map(i => ({ ...i, selected: item.itemId == i.itemId }))

            return {
              ...this.data.filterOptions,
              ...filter,
            }
          })
          let filterFloorCache = JSON.parse(JSON.stringify(filterFloor))
          console.log("filterFloorCache", filterFloorCache)

          this.setData({ filterFloor, filterCount: filterFloorCache.length, filterFloorCache })
        }
      }
    }
  },
  data: {
    SORT_TYPE,
    SORT_TYPE_ORDER,
    isIponeX: isIponeX(),
    refresh: true, // 为了解决筛选按钮，展示和不展示来回切换时，导致排序这四个按钮排列的样式错误，因为数据无变化，UI不会重新渲染，导致布局错乱
    priceSortType: SORT_TYPE_ORDER.asc,
    sortType: SORT_TYPE.default,
    sortList: [
      {
        title: '综合排序',
        value: SORT_TYPE.default,
      },
      // {
      //   title: '优惠',
      //   value: SORT_TYPE.promote,
      // },
      // {
      //   title: '销量',
      //   value: SORT_TYPE.sale,
      // },
      {
        title: '价格',
        value: SORT_TYPE.price,
      },
    ],

    showFilterMask: false,
    filterCount: 0, // 选中数量
    filterFloor: [], // 筛选列表
    filterFloorCache: [], // 筛选列表缓存
    filterSelects: [], // 选中列表
    currentIndex: ''
  },
  observers: {
    showFilterMask: function (value) {
      console.log('showFilterMask: ', value)
      // 弹层关闭，将滚动条重置为0
      if (!value) {
        this.setData({ currentIndex: '' })
      }
      // this.triggerEvent("clickChangeZIndex", {
      //   type: val ? "zIndexSort" : "zIndexHide",
      // });
    },
  },

  methods: {
    catchtouchmove() {
      return false
    },
    handleSortChange(e) {
      const { item } = e.currentTarget.dataset
      const { sortType, priceSortType } = this.data

      if (item.value == sortType && item.value !== SORT_TYPE.price) {
        return
      }

      this.setData({
        sortType: item.value,
        priceSortType: priceSortType === SORT_TYPE_ORDER.asc ? SORT_TYPE_ORDER.desc : SORT_TYPE_ORDER.asc,
      })
      this.triggerEvent('sortChange', {
        type: 'sort',
        data: {
          sortType: item.value,
          orderType: this.data.priceSortType,
        },
      })
    },
    handleShowFilter() {
      this.setData({ showFilterMask: true })
    },
    handleCloseFilter() {
      const { filterFloorCache } = this.data
      this.setData({
        filterFloor: JSON.parse(JSON.stringify(filterFloorCache)),
        filterCount: filterFloorCache.length,
        showFilterMask: false
      })
    },
    // 展开隐藏多出的选项
    handleToggleFitler(e) {
      const { index } = e.currentTarget.dataset
      let filter = this.data.filterFloor[index]
      this.setData({
        [`filterFloor[${index}].showAll`]: !filter.showAll
      }, () => {
        // 底部的属性展开后别遮挡，所以需要滑动一下
        if (index >= 3) {
          this.setData({ currentIndex: index })
        }
      })
    },
    handleFilterReset() {
      const filterFloor = this.data.filterFloor.map(filter => {
        const itemList = filter.itemList.map(i => ({ ...i, selected: false }))
        return {
          ...filter,
          itemList,
          showAll: false,
        }
      })
      this.setData({ filterFloor })
    },
    handleFilterConfirm() {
      const { filterFloor } = this.data
      const filterList = filterFloor.reduce((pre, cur) => {
        const items = cur.itemList.filter(i => i.selected)
        return [...pre, ...items]
      }, [])
      this.triggerEvent('sortChange', {
        type: 'filter',
        data: {
          filterList
        },
      });
      this.setData({
        filterFloorCache: JSON.parse(JSON.stringify(filterFloor)),
        showFilterMask: false,
        filterCount: filterFloor.length,
      })
    },
    handleSelected(e) {
      const { filterFloor } = this.data
      let { index, filterIndex } = e.currentTarget.dataset
      let filter = filterFloor[filterIndex]

      // filterType为 1｜3 时单选
      const filterType = +filter.filterType
      if (filterType === 1 || filterType === 3) {
        filter = this.singleFilterChange(filter, index)
      } else {
        filter = this.multiFilterChange(filter, index)
      }
      this.setData({ [`filterFloor[${filterIndex}]`]: filter })
    },
    singleFilterChange(filter, index) {
      const curItem = filter.itemList[index]
      const selected = curItem.selected
      filter.itemList = filter.itemList.map(i => ({
        ...i,
        selected: false
      }))
      filter.itemList[index] = { ...curItem, selected: !selected }
      return filter
    },
    multiFilterChange(filter, index) {
      const curItem = filter.itemList[index]
      filter.itemList[index] = { ...curItem, selected: !curItem.selected }
      return filter
    }
  },
})
