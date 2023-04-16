import {
  request,
  FNIDS
} from "../../common/util/api"

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mapHeight: {
      type: String,
      value: '600rpx'
    },
    orderId: {
      type: Number,
      value: 0
    },
    storeId: {
      type: Number,
      value: 0
    },
    lotteryInfo: {
      type: Object,
      value: {}
    },
    // 是否显示礼盒
    isShowGift: {
      type: Boolean,
      value: true
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
    latitude: 29.72881,
    longitude: 90.9177,
    zoom: false,
    scroll: false,
    markers: [],
    markerIds: ['buyer', 'deliveryMan', 'store'],
    tip: '',
    direction: 0
  },
  lifetimes: {
    attached: function () {
      // console.log('result--');
      this.getCoordinateFun()
      this.mapCtx = wx.createMapContext('mymap');
      // 定时刷新派送员坐标
      this.timerId = setInterval(() => this.refreshMap(), 3000 * 60)
    },
    detached() {
      // console.log('detached------');
      this.timerId && clearInterval(this.timerId)
      this.exitimerId && clearTimeout(this.exitimerId)
    }
  },
  pageLifetimes: {
    // onShow() {
    //   console.log('onShow------');
    // },
    // onHide() {
    //   console.log('onHide------');
    // }
  },
  observers: {
    'mapHeight': function (val) {
      if (val == '100vh') {
        this.setData({
          zoom: true,
          scroll: true,
        })
      } else {
        this.setData({
          zoom: false,
          scroll: false,
        });
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    giftJump() {
      this.triggerEvent('tapGift')
      this.exitFullMap()
    },
    getCoordinateFun() {
      request({
        method: "GET",
        ...FNIDS.getCoordinate,
        body: {
          orderId: this.data.orderId,
          storeId: this.data.storeId
        },
        preObj: this.data.recommendObj || {}
      }).then(res => {
        let result = res.data.result;
        if (result) {
          const { buyerLng, buyerLat, deliveryManlng, deliveryManlat, storelng, storelat, userLogo, storeLogo, tipCopy, direction } = result;
          const deliveryManLogo = direction == 1 ? 'https://storage.360buyimg.com/wxmini/cash/deliveryMan_left.png' : 'https://storage.360buyimg.com/wxmini/cash/deliveryMan_right.png'
          const defaultUserLogo = 'https://storage.360buyimg.com/wxmini/map/bg_head_new.webp';
          const markers = [];
          this.data.markerIds.forEach((val, index) => {
            const head = 'https://images.weserv.nl/?url=' + (val == 'buyer' ? userLogo || defaultUserLogo : val == 'store' ? storeLogo : deliveryManLogo);
            let lat = result[`${val}${val == 'buyer' ? 'Lat' : 'lat'}`];
            let lng = result[`${val}${val == 'buyer' ? 'Lng' : 'lng'}`];
            val == 'buyer' && (lat = lat + 0.01)

            lat && lng && markers.push({
              id: index,
              name: val,
              latitude: lat,
              longitude: lng,
              // joinCluster: true,
              content: val == 'deliveryMan' ? `${result.distanceContent || ''}` : '',
              distanceAndTimeDes: result.distanceAndTimeDes || '',
              iconPath: 'https://storage.360buyimg.com/wxmini/map/icon-location.png',
              width: 30,
              height: 30,
              head,
              alpha: 1,
              customCallout: {
                alpha: 1,
                anchorY: 2,
                anchorX: -1,
                display: 'ALWAYS'
              },
              // label: {
              //   content: val == 'deliveryMan' ? `${result.distanceContent || ''}` : '用户或门店',
              //   fontSize: 13,
              //   textAlign: 'center',
              //   borderWidth: 0,
              //   borderRadius: 20,
              //   bgColor: '#FF5757',
              //   padding: 5
              // }
            });
          })

          this.setData({
            latitude: deliveryManlat || storelat,
            longitude: deliveryManlng || storelng,
            markers,
            tip: tipCopy,
            direction: direction
          })
          const points = [{
            longitude: buyerLng, latitude: buyerLat
          }, {
            longitude: deliveryManlng, latitude: deliveryManlat
          }]

          this.mapCtx.includePoints({
            padding: [100, 20, 300, 20],
            points
          })
        } else {
          // 埋点
          // clickBuried_({
          //   create_time: new Date(),
          //   click_id: 'showLayer',
          //   click_par: {
          //     type: 'rideCallNormal',
          //     orderId: this.data.orderId,
          //     storeId: this.data.storeId
          //   }
          // })
        }
      }).catch(err => {
        let msg = err && err.data && err.data.msg ? err.data.msg : 'getCoordinate异常';
        wx.showToast({
          title: msg,
          icon: 'none',
          duration: 3000,
        });
      })
    },
    onTapMap() {
      this.triggerEvent('tapMapEvent')
    },
    exitFullMap() {
      this.triggerEvent('exitFullMap')
      this.exitimerId = setTimeout(() => {
        this.refreshMap();
      }, 500)
    },
    refreshMap() {
      const { latitude, longitude } = this.data;
      this.getCoordinateFun();
      this.mapCtx.moveToLocation({
        latitude,
        longitude
      });
    },
    showTip() {
      wx.showModal({
        title: '提示',
        content: this.data.tip || '',
        showCancel: false,
        confirmText: '我知道了'
      })
    }
  }
})
