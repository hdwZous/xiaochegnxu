/**
 * 楼层：1头图、2商品、3保障、4套餐、5购买须知、6门店、7推荐、8评价
 */
Component({
  options: {
    virtualHost: true,
  },
  properties: {
    type: Number,
    info: {
      type: Object,
      value: {}
    },
    config: {
      type: Object,
      value: {},
    },
    traceId: {
      type: String,
      value: '',
    },
    buriedObj: {
      type: Object,
      value: {
        pageIdFirstPage: '',
        currentPageName: '',
        prePageName: '',
      },
    }
  },
  observers: {
    'info.**': function () {
      const value = this.definitionFloor()
      if (value) {
        this.setData(value)
      }
    }
  },
  methods: {
    definitionFloor() {
      const { type, info } = this.data

      switch (type) {
        case 1: {
          return { images: info && info.images ? info.images : {} }
        }
        case 4: {
          const { title, comboList } = info || {}
          const { comboInfoVOList } = (comboList || [])[0] || {}
          const combos = (comboInfoVOList || []).reduce((prev, comboInfo) => {
            const { name, num, price } = comboInfo
            prev.push({ name, num, price })
            return prev
          }, [])

          return { title, combos }
        }
        default: {
          return info
        }
      }
    }
  }
})
