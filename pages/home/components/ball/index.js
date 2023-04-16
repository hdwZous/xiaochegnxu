import { djCmsJump } from '../../../../common/util/agreementV2.js';
let pre = 0;
Component({
  options: {
    addGlobalClass: true
  },
  lazyObj: {
    selector: '.home_ball',
    epSelector: '.home_ball'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    NeedExposure:{
      type: Boolean,
      value: true
    },
    // 楼层唯一id
    floorId: {
      type: String,
      value: ''
    },
    // 图片懒加载
    imgLazyLoad: {
      type: Object,
      value: {}
    },
    scrollLeft: {
      type: Number,
      value: 0
    },
    backgroundUrl: {
      type: String,
      value: ''
    },
    backgroundCloor: {
      type: String,
      value: ''
    },
    pageDataTraceId: {
      type: String,
      value: ''
    },
    isFirstFloor: {
      type: Boolean,
      value: false,
      observer: function () {
      }
    },
    buriedObj: {
      type: Object,
      value: {}
    },
  
    isHeaderFloorHasBgImg: {
      type: Boolean,
      value: false,
      observer: function () {
      }
    },
    data: {
      type: Object,
      value: {},
      observer: function (floor) {
        let newVal = floor.data;
        let len = newVal.length;

        // 初始化曝光埋点打标签（对可视区球打上标记）
        if (len > 0) {
          newVal.forEach((item, index) => {
            if (index < 10) { // 前10个打标
              item.hasExposure = true
            } else {
              item.hasExposure = false
            }
          })
          this.epSection && this.epSection()
        }
        if (len > 10) {

          // 超过10个球

          let listOne = newVal.slice(0, 10);
          let listOne_2 = newVal.slice(10, 20);
          let listOne_3 = newVal.slice(20, 30);



          let len1 = listOne.length >= 5 ? 5 : listOne.length;
          let len2 = listOne_2.length >= 5 ? 5 : listOne_2.length;
          let len3 = listOne_3.length >= 5 ? 5 : listOne_3.length;
          let totalLen = len1 + len2 + len3;
          let widthNum = 24;

          let maxPre = (totalLen * 48 / 10 - widthNum) / (totalLen * 48 / 10)
          let totalWidth = totalLen * 48 / 10
          let preWidth = widthNum / totalWidth;
          this.setData({
            listOne,
            listOne_2,
            listOne_3,
            totalLen,
            preWidth,
            maxPre,
            floor: floor,
            processWidth: widthNum
          })


        } else {
          this.setData({
            listOne: newVal,
            floor: floor,
            processWidth: '100%'
          })
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    listOne: [],
    listOne_2: [],
    listOne_3: [],
    processLeft: 0,
    processWidth: '',
    preWidth: 0,  //滚动条宽度占比
    maxPre: 0,   //能够滑动的最大百分比
    totalLen: 0,
    ballWidth: '',
    floor: [],
    srollFlag: false,
    beginLeft: 0
  },

  lifetimes: {
    attached() {
      let self = this;
      wx.getSystemInfo({
        success(res) {
          let ballWidth = res.windowWidth / 5;
          self.setData({
            ballWidth: ballWidth
          })
        }
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScroll(e) {
      let now = Date.now();
      let scrollLeft = e.detail.scrollLeft;

      let originLen = this.data.totalLen
      //滚动的时候，少一屏幕
      let totalLen = originLen > 5 ? originLen - 5 : originLen;
      let listTwoWidth = Math.ceil(totalLen) * this.data.ballWidth;

      let percent = listTwoWidth && scrollLeft / listTwoWidth;

      let processLeft = percent * this.data.maxPre;

      if (now - pre > 60) {
        this.setData({
          // processLeft: percent * 13 + 'px'
          processLeft: processLeft * 100 + '%'
        }, () => {
          pre = now;
        })
      }
      if (scrollLeft > 0 && !this.data.srollFlag) {
        this.setData({
          srollFlag: true
        })
      }
      if (scrollLeft <= 15) {
        this.setData({
          srollFlag: false
        })
      }

    },
    binddragstart(e) {
      let left = e.detail && e.detail.scrollLeft || 0;
      this.setData({
        beginLeft: left
      })
    },
    binddragend(e) {


      let left = e.detail && e.detail.scrollLeft || 0;
      let beginLeft = this.data.beginLeft;
      if (left - beginLeft > 0) {
        // if(left > 50){
        this.setData({
          scrollLeft: 375,
          beginLeft: 375
        })
        // }
      } else {
        this.setData({
          scrollLeft: 0,
          beginLeft: 0
        })
      }
    },
    onClickBallItem(e) {
      let data = e.currentTarget.dataset.item;
      let to = data.to || ''
      let params = data.params || {};
      let userAction = data.userAction || '';
      let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
      this.data.buriedObj || {};
      
      djCmsJump({
        to: to,
        params: params,
        userAction: userAction,
        traceId: this.data.pageDataTraceId || '',
        preObj: this.data.buriedObj,
        buried_position: {
          currentPageName: 'homeball_onClickBallItem_home'
        }
      })
    }
  }
});