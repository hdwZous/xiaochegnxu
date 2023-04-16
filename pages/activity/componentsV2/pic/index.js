import { djCmsJump } from '../../../../common/util/agreementV2'
import { clickBuriedV2_ } from '../../../../common/util/BI'
Component({

  lazyObj: {
    selector: '.active_pic',
    epSelector: '.activity_comp_ep'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 数据
    floorData: {
      type: Object,
      value: {}
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
      value: '',
      observer: function(val){
        // console.log('--currentPageName-----',val)
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "act1_component",
          click_par: {
            currentPageName: val
          },
          pageId: this.data.pageId || "",
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
      }
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

  options: {
    addGlobalClass: true
  },

  observers: {
    'floorData': function (newVal) {
      if (newVal.data && newVal.data.length) {
        // 数据
        let imgData = newVal.data.slice(0, 4);
        try {
          // 获取设备宽度
          let res = wx.getSystemInfoSync();
          // 图片宽
          let picWidth, picHeight;
          // 图片宽-取第一张图片
          let imgWidth = imgData[0].imgWidth;
          // 图片高-取第一张图片
          let imgHeight = imgData[0].imgHeight;
          let len
          if (newVal.floorStyle == 'act1') {
            len = 1
          } else if (newVal.floorStyle == 'act2') {
            len = 2
          } else if (newVal.floorStyle == 'act3') {
            len = 3
          } else if (newVal.floorStyle == 'act4') {
            len = 4
          } else {
            len = 0
          }
          picWidth = res.windowWidth / len
          // 图片宽高比
          let ratio = picWidth / imgWidth;
          picHeight = Math.round(imgHeight * ratio) + 'px';
          // 更新数据
          this.setData({
            imgData: imgData,
            picWidth: picWidth + 'px',
            picHeight: picHeight
          })

        } catch (e) {
          // console.log(e);
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 图片数据
    imgData: '',
    // 图片高度
    picHeight: '',
    // 图片宽度
    picWidth: '',
    hookLazy: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击轮播图片
    clickImg(e) {
      let data = e.currentTarget.dataset;
      try {
        clickBuriedV2_({
          create_time: new Date(),
          click_id: "act",
          click_par: {
            userAction: e.currentTarget.dataset.userAction || ""
          },
          pageId: this.data.pageId || "",
          currentPageName: this.data.currentPageName,
          prePageName: this.data.prePageName
        });
      } catch(e) {
        console.log(e);
      }
      // 如果是跳转h5,但是没下发url则不跳转
      if (data.to == 'web' && (!data.params || !data.params.url)) return
      // 跳转协议
      djCmsJump({
        to: data.to,
        params: data.params,
        userAction: data.userAction,
        preObj: this.data.recommendObj,
        buried_position: "active-pic"
      })
    }
  }
});
