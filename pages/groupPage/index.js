import { request, FNIDS } from '../../common/util/api';
import { getDaoJiaLocation } from "../../common/util/services";
import {  pvBuriedV2_ , clickBuriedV2_ } from "../../common/util/BI";
// 埋点描述文件
const app = getApp();
const typeList = [ '', 'code', 'service', 'focus' ];
Page({
    // 埋点描述文件
    buried: {
        storeId: ''
    },
    /**
     * 页面的初始数据
     */
    data: {
        defaultType: 0,
        locationError: {},
        storeId: '',
        cityId: '',
        orgCode: '',
        buttonLink: '',
        contactTitle: '',
        contactImg: '',
        contactPath: '',
        abtestGroup: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const { orderId = '', orgCode = '', storeId = '', cityId = '', abtestGroup = '' } = options;
        this.setData({ storeId, orgCode, cityId, orderId, abtestGroup });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        const _this = this;
        const { cityId, orderId, orgCode, storeId } = this.data;
        const params = {
            cityId,
            orderId,
            orgCode,
            storeId
        }
        if (cityId) {
            this.getQRCode(params)
        } else {
            const addressInfo = wx.getStorageSync('address_info') || '';
            if (addressInfo.cityId) {
                params.cityId = addressInfo.cityId;
                this.getQRCode(params)
            } else {
                wx.getLocation({
                    success(res) {
                        getDaoJiaLocation({
                            longitude: res.longitude,
                            latitude: res.latitude
                        }, function (addressInfo) {
                            if(addressInfo) {
                                addressInfo.from = 'yy_xcx';
                                app.globalData.addressInfo = addressInfo;
                                app.globalData.refreshHomeFlag = true;
                                app.saveAddress(addressInfo);
                                params.cityId = addressInfo.cityId;
                                _this.getQRCode(params)
                            } else {
                                _this.setData({
                                    locationError: {
                                        errMsg: '手机定位未授权'
                                    },
                                    defaultType: -1
                                });
                            }
                        })
                    },
                    fail(err) {
                        _this.setData({
                            locationError: err,
                            defaultType: -1
                        });
                    }
                })
            }
        }
    },

    // pv() {
    //
    // },
    pvFunc(back) {
        let recommendObj = this.data.recommendObj || {};
        pvBuriedV2_({
            create_time: new Date(),
            page_par: {
                storeId: this.data.storeId || "",
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
            isBack: back || "",
        });
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(option) {

    },

    getQRCode(params) {
        const unionId = wx.getStorageSync('unionid') || "";
        const { storeId, abtestGroup } = this.data;
        request({
          ...FNIDS.joinPage,
          isNeedDealLogin: true,
          isForbiddenDialog: true,
          body: {
            ...params,
            abtestGroup,
            unionId,
          },
          method: "POST",
          preObj: this.data.recommendObj || {},
        })
          .then((res) => {
            const { data = {} } = res;
            const {
              code,
              result: {
                layerType,
                qrcodePathOfGroup,
                noQrcodeText,
                buttonLink = "",
                title = "",
                img = "",
                path = "",
              } = {},
            } = data;
            this.setData({
              buttonLink,
              contactTitle: title,
              contactImg: img,
              contactPath: path,
            });

            pvBuriedV2_({
              create_time: new Date(),
              page_par: {
                storeId,
                type: typeList[layerType],
              },
              currentPageName: recommendObj.currentPageName || "",
              prePageName: recommendObj.prePageName || "",
              pageId: recommendObj.pageIdFirstPage || "",
            });
            if (code == 0) {
              this.setData({
                defaultType: layerType,
                qrcodePathOfGroup,
                noQrcodeText,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },

    goHome() {
      let { recommendObj = null } = this.data;
        wx.switchTab({
            url: "/pages/home/home",
            preObj: recommendObj
        });
    },

    jumpToOfficial(e) {
        const { storeId } = this.data;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "clickEnterGroup",
            click_par: {
                storeId,
                type: 'focus'
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
        const { dataset: { buttonLink = '' } = {} } = e.currentTarget;
        buttonLink && wx.navigateTo({
            url: '/pages/h5/index?url=' + encodeURIComponent(buttonLink),
            preObj: recommendObj
        })
    },

    jumpToContact() {
        const { storeId } = this.data;
        let recommendObj = this.data.recommendObj || {};
        clickBuriedV2_({
            click_id: "clickEnterGroup",
            click_par: {
                storeId,
                type: 'service'
            },
            currentPageName: recommendObj.currentPageName || "",
            prePageName: recommendObj.prePageName || "",
            pageId: recommendObj.pageIdFirstPage || "",
        });
    }
})
