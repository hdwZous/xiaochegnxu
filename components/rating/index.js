Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: Number | String,
      value: 0,
      observer: function (newVal) {
        const { size = 10 } = this.data;
        const emptyStr = `background-position: -${size * 4}px 0`
        const starList = [emptyStr, emptyStr, emptyStr, emptyStr, emptyStr];
        const ratingCount = `${newVal}`.split('.');
        const integerCount = ratingCount[0];
        for (let i = 0; i < integerCount; i++) {
          starList[i] = `background-position: 0 0`
        }
        const floatCount = ratingCount[1] || 0;
        if (floatCount == 25) {
          starList[integerCount] = `background-position: -${size * 3}px 0`;
        } else if (floatCount == 5) {
          starList[integerCount] = `background-position: -${size * 2}px 0`;
        } else if (floatCount == 75) {
          starList[integerCount] = `background-position: -${size}px 0`;
        }
        this.setData({ starList })
      }
    },
    size: {
      type: Number,
      value: 10,
      observer: function (newVal) {
        if (typeof newVal != 'number') return
        this.setData({ size: (newVal) })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    starList: [],
    size: 10
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

// const ratingPositionMap = {
//   1: 'background-position: 0 0;',
//   2: 'background-position: 0 0;'
// }
