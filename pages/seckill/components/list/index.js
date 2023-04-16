import { djCmsJump } from '../../../../common/util/agreementV2'

Component({
    options: {
        addGlobalClass: true
    },
    lazyObj: {
      selector: '.seckill_list_ep',
      epSelector: '.seckill_list_ep'
    },
    /**
     * 组件的属性列表
     */
    properties: {
        NeedExposure:{
          type: Boolean,
          value: true
        },
        info: {
            type: Object,
            value: {},
            observer(news) {
              if (news && news.toPromEndTimes && news.toPromStartTimes) {
                if (news.toPromStartTimes > 0 ) {
                  this.showCountDown(news.toPromStartTimes)
                } else {
                  this.showCountDown(news.toPromEndTimes)
                  this.setData({
                    begin_end: 1
                  })
                }
              }
              if (news) {
                // 组件位置未发生变化，仅内容发生改变，需要重新init监听器
                this.epSection && this.epSection()
              }
            }
        },
        lazyload: {
            type: Boolean,
            value: true
        },
        traceId: {
          type: String,
          value: ''
        },
        buriedObj: {
          type: Object,
          value: {}
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        hour: '00',
        minute: '00',
        second: '00',
        timer: null,
        // null表示未开始，1表示进行中，2表示结束
        begin_end: null
    },

    pageLifetimes: {
      
    },

    /**
     * 组件的方法列表
     */
    methods: {
      goToStore(e) {
        let { to='',params={},userAction=''} =  e.currentTarget.dataset.item;
        if(params.addCart === true){
          params.isAddCart = true
        }
        djCmsJump({
          // 去向
          to,
          // url参数
          params,
          userAction,
          traceId: this.data.traceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'seckill_list_goToStore'
          }
        })
      },
      //点击抢按钮，跳转协议--下发的跳转协议
      goClickBtn(e) {
        let { userAction='',btnTo='',btnParams={}} =  e.currentTarget.dataset.item;
        if(btnParams.addCart === true){
          btnParams.isAddCart = true
        }
        djCmsJump({
          // 去向
          to: btnTo,
          // url参数
          params:btnParams,
          userAction,
          traceId: this.data.traceId || '',
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: 'seckill_list_goClickBtn'
          }
        })
      },
      // 展示倒计时
      showCountDown(time) {
        if (time > 0) {
          this.countDown(time, res => {
            if (res.end) {
              this.setData({
                hour: '00',
                minute: '00',
                second: '00'
              });
              if (this.data.begin_end == null) {
                this.showCountDown(this.data.info.toPromEndTimes)
                this.setData({
                  begin_end: 1,
                  'info.skuStatus': 1
                })
              } else if (this.data.begin_end == 1) {
                this.setData({
                  begin_end: 2
                })
                this.clearInterval();
              }
              return;
            }
            // 更新时间
            this.setData({
              hour: res.hour,
              minute: res.minute,
              second: res.second
            });
          })
        } else {
          this.setData({
            hour: '00',
            minute: '00',
            second: '00'
          })
        }
      },
      countDown(times, callBack) {
        // 秒
        times = times / 1000;
        // 计时器
        clearInterval(this.data.timer)
        this.data.timer = setInterval(() => {
          let hour = 0,
            minute = 0,
            second = 0;
          if (times > 0) {
            hour = Math.floor(times / (60 * 60));
            minute = Math.floor(times / 60) - (hour * 60);
            second = Math.floor(times) - (hour * 60 * 60) - (minute * 60);
          }
          // 小于10补0
          if (hour <= 9) hour = '0' + hour;
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          // 回调
          if (times > 0) {
            callBack({
              hour: hour + '',
              minute: minute + '',
              second: second + '',
              end: false
            })
          } else {
            callBack({
              hour: '00',
              minute: '00',
              second: '00',
              end: true
            })
          }
          times--;
        }, 1000)
      },
      // 清除计时器
      clearInterval() {
          clearInterval(this.data.timer)
          this.data.timer = null
      }
    }
});
