import { djCmsJump } from "../../../../common/util/agreementV2";
Component({
  options: {
    addGlobalClass: true
  },

  lazyObj: {
    epSelector: '.activity_comp_ep',
    selector: '.ads_wrap'
  },

  /**
   * 组件的属性列表
   */
  properties: {
    imgData: {
      type: Object,
      value: {},
      observer: function (val) {
        let lineOneCache = [];
        let lineTwoCache = [];
        // TODO: 测试数据
        // val.data = [
        //     {
        //         id: 1,
        //         imgHeight: "220",
        //         imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/164677/4/7091/3961/6030a0a5E2b87a778/b5e34fc72e6d84cd.png",
        //         imgWidth: "750"
        //     },
        //     {
        //         id: 2,
        //         imgHeight: "220",
        //         imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/160286/7/7693/5091/6030833cEaf3b6fa8/f7d2cf0c13ab60b7.png",
        //         imgWidth: "750"
        //     },
        //     {
        //         id: 3,
        //         imgHeight: "220",
        //         imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/142307/23/9652/6017/602fb04dEed8f6887/37aa769621003ce8.png",
        //         imgWidth: "750"
        //     },
        //     {
        //         id: 4,
        //         imgHeight: "220",
        //         imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/142307/23/9652/6017/602fb04dEed8f6887/37aa769621003ce8.png",
        //         imgWidth: "750"
        //     },
        //     {
        //         id: 5,
        //         imgHeight: "220",
        //         imgUrl: "https://img30.360buyimg.com/mobilecms/jfs/t1/142307/23/9652/6017/602fb04dEed8f6887/37aa769621003ce8.png",
        //         imgWidth: "750"
        //     }
        // ]
        // val.baseStyleInfo.imgNumEachRow = 2;
        // val.baseStyleInfo.rowsNum = 2;
        // val.seniorStyleInfo.breathEffect = 0;
        // val.seniorStyleInfo.imgWheel = 1;

        let imgArr = val.data || [];
        let { imgWidth, imgHeight } = imgArr[0] || {};
        let percent = imgWidth / imgHeight;
        let { imgNumEachRow = 0, rowsNum = 1, marginParam = 0 } = val.baseStyleInfo || {};

        // 图片分组，轮播使用。
        let lineOne = [];
        let lineTwo = [];
        if (rowsNum == 2) { // 两行情况
          let index = 0;
          while (index < imgArr.length) {
            for (let i = imgNumEachRow * index; i < imgNumEachRow * (index + 1); i++) {
              if (index % 2) {
                imgArr[i] && lineTwo.push(imgArr[i])
              } else {
                imgArr[i] && lineOne.push(imgArr[i])
              }
            }
            index++
          }
        } else {
          lineOne = imgArr
        }
        if (lineOne.length > imgNumEachRow) { // 有轮播资源
          while (lineOne.length && imgNumEachRow) {
            let imgItem = lineOne.splice(0, imgNumEachRow);
            let lineOneCacheLen = lineOneCache.length;
            if (imgItem.length < imgNumEachRow) {
              let lastCacheItem = lineOneCache[lineOneCacheLen - 1] || [];
              let lastCacheItemSplit = lastCacheItem.slice(imgItem.length);
              imgItem = imgItem.concat(lastCacheItemSplit)
            }
            lineOneCache[lineOneCacheLen] = imgItem
          }
        } else {
          lineOneCache[0] = lineOne
        }
        if (lineTwo.length > imgNumEachRow) { // 有轮播资源
          while (lineTwo.length && imgNumEachRow) {
            let imgItem = lineTwo.splice(0, imgNumEachRow);
            let lineTwoCacheLen = lineTwoCache.length;
            if (imgItem.length < imgNumEachRow) {
              let lastCacheItem = lineOneCache[lineTwoCacheLen - 1] || [];
              let lastCacheItemSplit = lastCacheItem.slice(imgItem.length - 1);
              imgItem = imgItem.concat(lastCacheItemSplit)
            }
            lineTwoCache[lineTwoCacheLen] = imgItem
          }
        } else {
          lineTwoCache[0] = lineTwo
        }

        if (lineOne.length < imgNumEachRow) { // 不足展示个数的时候处理
          let emptyItemLen = imgNumEachRow - lineOne.length;
          for (let i = 0; i < emptyItemLen; i++) {
            lineOne.push({})
          }
        }
        if (lineTwo.length < imgNumEachRow) { // 不足展示个数的时候处理
          let emptyItemLen = imgNumEachRow - lineTwo.length;
          for (let i = 0; i < emptyItemLen; i++) {
            lineTwo.push({})
          }
        }

        // 计算高度
        let gapWidth = (imgNumEachRow - 1) * 10;
        imgHeight = (710 - gapWidth) / imgNumEachRow / percent;
        if (marginParam == 0) {
          imgHeight = (750 - gapWidth) / imgNumEachRow / percent;
        }

        // 更新数据
        this.setData({
          imgHeight: imgHeight + 'rpx',
          lineOne: lineOneCache[0] || [],
          lineTwo: lineTwoCache[0] || [],
          lineOneCache,
          lineTwoCache
        })
      }
    },
    traceId: {
      type: String,
      value: ''
    },
    pageId: {
      type: String,
      value: ''
    },
    currentPageName: {
      type: String,
      value: ''
    },
    prePageName: {
      type: String,
      value: ''
    },
    recommendObj: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgHeight: '170rpx',
    lineOne: [],
    lineTwo: [],
    lineOneCache: [],
    lineTwoCache: [],
    lineOneTimer: null,
    lineTwoTimer: null
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // console.log('attached')
      this.changeImgItem()
    },
    moved: function () { },
    detached: function () {
      // console.log('detached')
      this.handleClearInterval()
    },
  },

  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      // console.log('show')
      this.changeImgItem()
    },
    hide: function () {
      // console.log('hide')
      this.handleClearInterval()
    },
    resize: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickItem(e) {
      let { to = '', params = {}, userAction = '' } = e.currentTarget.dataset.item || {};
      djCmsJump({
        to,
        params,
        userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-adsAct"
      })
    },
    changeImgItem() {
      // console.log(1111111111)
      this.handleClearInterval()
      let { lineOneCache, lineTwoCache } = this.data || {};
      let { seniorStyleInfo = {} } = this.data.imgData || {};
      let { imgWheel = 0, timeInterval = 3 } = seniorStyleInfo;
      if (imgWheel === 1) { // 资源位变化
        if (lineOneCache.length > 1) {
          let start = 1;
          let lineOneTimer = setInterval(() => {
            // console.log(1)
            this.setData({
              lineOne: lineOneCache[start],
              lineOneTimer
            })
            start++
            if (start >= lineOneCache.length) {
              start = 0
            }
          }, timeInterval * 1000)
        }
        if (lineTwoCache.length > 1) {
          let start = 1;
          let lineTwoTimer = setInterval(() => {
            // console.log(2)
            this.setData({
              lineTwo: lineTwoCache[start],
              lineTwoTimer
            })
            start++
            if (start >= lineTwoCache.length) {
              start = 0
            }
          }, timeInterval * 1000);
        }
      }
    },
    // 清除定时器
    handleClearInterval() {
      clearInterval(this.data.lineOneTimer)
      clearInterval(this.data.lineTwoTimer)
    }
  }
})
