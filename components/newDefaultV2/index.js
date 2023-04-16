import { djCmsJump } from '../../common/util/agreementV2.js';
import utils from '../../common/util/util'
Component({
  /**
     * 组件的属性列表
     */
  properties: {
    /*  
      1-接口下发
      2-无网络
      3-无定位
      4-未登录
      未来type 会继续扩展
    */ 
    type: {
      type: Number,
      value: 0,
      observer: function (newVal) {
        let type = newVal || 0;
        switch (type) {
          case 1:
            break;
          case 2:
            this.setData({
              'defaultObj.title': '网络请求失败',
              'defaultObj.msg': '网络离家出走啦？我要把TA找回来~',
              'defaultObj.btnArr': [
                {
                  btnName:'重新加载',
                  type: 1
                }
              ],
            })
            this.setSrc(4);
            break;
          case 3:
            this.setData({
              'defaultObj.title': '无法获取地址',
              'defaultObj.msg': '可以在设置-隐私-定位服务中心开启[京东到家]定位服务哟~~~',
              'defaultObj.btnArr': [
                {
                  btnName:'手动选择地址',
                  type: 4
                },
                {
                  btnName:'直接授权定位',
                  type: 5
                }
              ],
            })
            this.setSrc(6);
            break;
          case 4:
            this.setData({
              'defaultObj.title': '暂未登录',
              'defaultObj.msg': '快去登录，迫不及待与你相见啦~',
              'defaultObj.btnArr': [
                {
                  btnName:'立即登录',
                  type: 3
                }
              ],
            })
            this.setSrc(8);
            break;
          default:
            break;
        }
      },
    },
    imgSize: {
      type: Number,
      value: 0
    },
    topMargin: {
      type: Number,
      value: 0
    },
    fromsource: {
      type: String,
      value: ''
    },
    defaultObj:{
      type: Object,
      value: {
        /*
        imgType: '',
        title: "网络请求失败",
        msg: "网络离家出走啦？我要把TA找回来~",
        errorCode: "43543",
        btnArr: [
          {
            btnName:'',
            type: 1-重新加载,2-走跳转协议; 扩展 3-未登陆 4-手动选择地址 5-直接授权定位
            to: ''
            params:{}
          }
        ]
        */
        
      },
      observer: function (obj) {
        if(this.data.type == 1){
           // 主标题、副标题都没有
          if(typeof obj == 'object' && !obj.title && !obj.msg){
            obj.title = '数据异常'
          }
          //处理msg
          if(obj.msg && obj.msg.includes('[')){
            let index = obj.msg.indexOf('[')
            let _str = obj.msg.substr(0,index)
            obj.msg = _str
            this.setData({
              'defaultObj.msg':_str
            })
          }
          if(obj.msg && obj.msg.includes('[')&& obj.msg.includes(']') && !obj.errorCode){
            let index1 = obj.msg.indexOf('[')
            let index2 = obj.msg.indexOf(']')
            let _str = obj.msg.substr(index1,index2)
            obj.msg = _str
            this.setData({
              'defaultObj.errorCode':_str
            })
          }
          let imgType = obj.imgType || 1
          this.setSrc(imgType);
        }
      }
    },
    buriedObj: {
      type: Object,
      value: {}
    },
    fromPositon: {
      type: String,
      value: ''
    }
  },

  /**
     * 组件的初始数据
     */
  data: {
    src: "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png",
    defaultBtnArr:[]
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
     
    },
  },

  /**
     * 组件的方法列表
     */
  methods: {
    clickLoadAagin(){
      this.triggerEvent("defaultBtnEvent", {
        type: 1,
      });
    },
    clickBtn(e){
      let data = e.currentTarget.dataset.item;
      let {btnName = '',type = '',to='',params={}} = data;
      if(type == 1){
        this.triggerEvent("defaultBtnEvent", {
          type: type,
          data: data,
          defaultObj: this.data.defaultObj
        });
      }else if(type == 2){
        djCmsJump({
          to: to,
          params: params,
          preObj: this.data.buriedObj,
          buried_position: {
            currentPageName: this.data.fromPositon || ''
          }
        })
      }else if(type == 3){
        wx.navigateTo({
          url: `/pages/newLogin/login/login`,
          preObj: this.data.buriedObj
        })
      }else if(type == 4){
        this.goToAddress()
      }else if(type == 5){
        this.goToSetting();
      }

    },
    // 设置默认展示图
    setSrc(type) {
      let src = "";

      // 1-通用兜底图
      // 2-暂无订单、暂无评价
      // 3-暂无优惠券
      // 4-网络请求失败
      // 5-没找到符合的商品
      // 6-暂无收货地址
      // 7-购物车为空
      // 8-暂未登录
      // 9-门店休息
      switch (type) {
        case 1: // 兜底图
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png";
        break;
        case 2: // 暂无订单、暂无评价
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_noorder_evaluationV1.png";
        break;
        case 3: // 暂无优惠券
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_nocouponV1.png";
        break;
        case 4: // 网络请求失败
        src = "/images/common_errorbar_icon_nonetworkV1.png";
        break;
        case 5: // 没找到符合的商品
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_noshopV1.png";
        break;
        case 6: // 暂无收货地址
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_noaddressV1.png";
        break;
        case 7: // 购物车为空
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_emptyCartV1.png";
        break;
        case 8: // 暂未登录
        src = "https://storage.360buyimg.com/wximg/common/errorbar_icon_no_loginV2.png";
        break;
        case 9: // 门店休息
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_noclosedV1.png";
        break;
        default:
        src =  "https://storage.360buyimg.com/wximg/common/errorbar_icon_nothingV2.png";
        break;
      }
      this.setData({
        src,
      });
    },

    // 去地址页
    goToAddress() {
      if (utils.isLogin()) {
        wx.navigateTo({
          url: '/pages/address/home/index?from=locationDefault',
          preObj: this.data.buriedObj
        })
      } else {
        wx.navigateTo({
          url: '/pages/address/search/index?from=locationDefault',
          preObj: this.data.buriedObj
        })
      }
    },
    // 去设置页
    goToSetting() {
      wx.openSetting({
        complete: () => {
          getApp().globalData.refreshHomeFlag = true;
        },
      });
    },
  },
});
