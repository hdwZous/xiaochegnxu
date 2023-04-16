import { request, FNIDS } from '../../../../common/util/api';
import util from '../../../../common/util/util';
import { getDaoJiaLocation } from "../../../../common/util/services";
import { clickBuriedV2_ } from "../../../../common/util/BI";
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        activityId: {
            type: String,
            value: ''
        },
        isLogin: {
            type: Boolean,
            value: false
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
        showOpenBtn: true,
        showRotateBtn: false,
        move: false,
        transparent:false,
        playEnd: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        openRedpack() {
            const { activityId = '' } = this.data;
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "clickRedLayer",
                click_par: {
                    activityId
                }
            })
            if (!util.isLogin()) {
                wx.navigateTo({
                    url: `/pages/newLogin/login/login`,
                    preObj: this.data.recommendObj,
                    buried_postion: "communityRedpack-animationModal"
                })
                return
            }
            const addressInfo = wx.getStorageSync('address_info');
            if (!addressInfo.cityId) {
                wx.getLocation({
                    success(res) {
                        getDaoJiaLocation({
                            longitude: res.longitude,
                            latitude: res.latitude
                        }, function (addressInfo) {
                            if(res) {
                                app.globalData.addressInfo = addressInfo;
                                addressInfo.from = 'yy_xcx';
                                context && (context.scopeData.addressInfo = addressInfo);
                                app.globalData.refreshHomeFlag = true;
                                app.saveAddress(addressInfo);
                            }
                        })
                    },
                    fail() {}
                })
            }
            const unionId = wx.getStorageSync('unionid') || "";
            const userInfo = wx.getStorageSync('login_info') || {};
            let openId = getApp().requestLoginEntity.openId || userInfo.openId;
            const deviceReport = JSON.stringify(wx.getSystemInfoSync() || {});
            this.setData({
                showOpenBtn: false,
                showRotateBtn: true
            })
            const riskParam  = {
                nickName: userInfo.nickname || '',
                nickPicture: userInfo.avatar || '',
                openId,
                deviceReport
            }
            request({
                ...FNIDS.openRedPacket,
                body: {
                    unionId,
                    riskParam
                },
                method: 'POST',
                isForbiddenDialog: true,
                preObj: this.data.recommendObj
            }).then(res => {
                const { data: { code, result = {} } = {} } = res;
                const { money, type, toastTitle = '', couponInfoList = [] } = result;
                this.triggerEvent("openRedPacket", { result, code });
                if (code == 0) {
                    // type值是5则表示活动未开始
                    if (type == 5) {
                        this.triggerEvent("showModal", { type: 'tips' });
                    } else {
                        if (money) {
                            setTimeout(() => {
                                this.triggerEvent("showModal", { type: 'success' });
                            }, 0)
                        }
                        if (type == 2 && toastTitle && !(couponInfoList && couponInfoList.length)) {
                            wx.showToast({
                                title: toastTitle,
                                icon: "none",
                                duration: 2000
                            })
                        }
                    } 
                }
                this.setData({ move: true })
                setTimeout(() => {
                    this.setData({ transparent: true })
                }, 300)
                setTimeout(()=>{
                    this.setData({ playEnd: true })
                },400)
                
            }).catch(err => {
                const { data: { code = 2001 } = {} } = err;
                this.triggerEvent("openRedPacket", { result: err, code: 2001 });
                this.setData({ move: true })
                setTimeout(() => {
                    this.setData({ transparent: true })
                }, 300)
                setTimeout(()=>{
                    this.setData({ playEnd: true }, () => {
                        if (code == 2001) {
                            setTimeout(() => {
                             wx.showToast({
                                 title: '您已参与过本次活动抢红包活动了',
                                 icon: "none",
                                 duration: 2000
                             })
                            }, 300)
                        }
                    })
                },400)
                
            })
        }
    }
})
