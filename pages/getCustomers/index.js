import util from '../../common/util/util'
import {
    FNIDS,
    request
} from "../../common/util/api";
import mp from "../../common/util/wxapi";
let app = getApp();
Page({
    /**
     * 组件的初始数据
     */
    data: {
        idolImage: {},
        options: {},
        phone: '',
        result: [],
        inputGroupShow: true,
        couponShow: false,
        canReceive:false
    },
    // 生命周期函数--监听页面加载
    onLoad(options) {
        console.log("=============options=========");
        console.log(options);
        this.setData({
            options: options,
            result: [{
                amount: 15,
                amountUnit: "元",
                couponTitle: "1小时清凉体验券",
                couponTypeDesc: "满减券 满299元可用",
                avilableDate: "从领取之日起3天内有效"
            }, {
                amount: 15,
                amountUnit: "元",
                couponTitle: "1小时清凉体验券",
                couponTypeDesc: "满减券 满299元可用",
                avilableDate: "从领取之日起3天内有效"
            }]
        })
    },
    // 生命周期函数--监听页面进入
    onShow() {
        // 设置business
        app.globalData.qrcode.business = this.data.options.business || "128";
        // 计算明星图片宽高
        let image = {}
        image = util.computeImgHeight(18 / 25);
        this.setData({
            idolImage: image
        })
    },
    // 点击获取券信息
    getTicket() {
        // 验证
        if (this.data.phone === '') {
            mp.toast({
                title: "手机号不能为空"
            });
            return false;
        }
        if (this.data.phone.length !== 11) {
            mp.toast({
                title: "输入手机号有误"
            })
            return false;
        }
        // 发请求
        let that = this;
        request({
            ...FNIDS.getHkNewCoupon,
            body: {
                maxChannel: "",
                longitude: this.data.options.longitude,
                latitude: this.data.options.latitude,
                stationNo: this.data.options.storeId,
                exchangeCode: this.data.options.code,
                phone: this.data.phone,
                minChannel: this.data.options.channel,
                cityId: this.data.options.cityId
            },
            preObj: this.data.recommendObj || {}
        }).then(res => {
            let result = res.data.result;
            if (res.data.code == 0) {
                that.setData({
                    result: result,
                    inputGroupShow: false,
                    couponShow: true
                })
                // 关注门店
                that.attentionStore();
            }
        }).catch(err => {})
    },
    // 获取电话号码
    setPhoneData(e) {
        this.setData({
            phone: e.detail.value
        })
        if (e.detail.value.length==11&&this.data.options.code){
            this.setData({
                canReceive:true
            })
        }else{
            this.setData({
                canReceive: false
            })
        }
    },
    // 关注门店
    attentionStore() {
        request({
          ...FNIDS.changeAttention,
          body: {
            storeId: this.data.options.storeId,
            isFollow: true,
          },
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            if (res.data.result) {
              console.log("==========关注门店成功=========");
            }
          })
          .catch((err) => {
            console.log("==========关注门店失败=========");
          });
    },
    // 点击返回首页
    toHome() {
        wx.switchTab({
            url: "/pages/home/home"
        })
    },
    // 点击换个手机号继续
    noceMore() {
        this.setData({
            phone: '',
            inputGroupShow: false,
            couponShow: true
        })
    }
});