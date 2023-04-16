import { request, FNIDS } from '../../../common/util/api'
import mp from '../../../common/util/wxapi'
import {
	pvBuriedV2_
} from "../../../common/util/BI"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 红包列表
        couponList: [],
        // 当前页
        currentPage: 1,
        // 展示默认页
        showDefault: false,
        // 默认页-类型
        type: '',
        // 默认页-图标
        src: '',
        // 默认页-按钮
        btnText: '',
        // 默认页-按钮
        tips: '',
        // 默认页-类型
        defaultType: 0,
        defaultObj:{},
        optionsPos: null,
        self_page:'pages/redEnvelopeList/list/index'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getEnvelopeList(this.data.currentPage)
        this.setData({
          optionsPos: options
        });
    },
    onShow() {
    },
    // pv埋点上报
    pvFunc(back) {
      pvBuriedV2_({
        page_par: {
          ref_par: {}
        },
        currentPageName: this.data.recommendObj.currentPageName || "",
        prePageName: this.data.recommendObj.prePageName || "",
        pageId: this.data.recommendObj.pageIdFirstPage || "",
        isBack: back || "",
      })
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.getEnvelopeList(this.data.currentPage)
    },

    /**
     * 用户点击右上角转发
     */
    onShareAppMessage() {
        return {
            title: '京东到家',
            path: '/pages/home/home'
        }
    },

    // 获取红包列表
    getEnvelopeList(currentPage) {
        mp.loading();
        let loginInfo = wx.getStorageSync('login_info');
        request({
            ...FNIDS.myRedPacketList,
            isNeedDealError: true,
            isForbiddenDialog: true,
            body: {
                pin: loginInfo.PDJ_H5_PIN || '',
                state: 1,
                startIndex: currentPage,
                dataSize: 10
            },
            pageId: this.data.recommendObj.pageIdFirstPage || "",
        }).then(res => {
            mp.hideLoading();
            let couponList = res.data && res.data.result && res.data.result.couponList || [];
            if (res.data.code == '0' && couponList.length > 0) {
                this.setData({
                    couponList: this.data.couponList.concat(couponList),
                    currentPage: ++currentPage,
                    showDefault: false
                })
            } else {
                currentPage === 1 && this.setData({
                    showDefault: true,
                    defaultType: 1,
                    defaultObj:{...res.data}
                })
            }
        }).catch((err) => {
            mp.hideLoading();
            if (currentPage === 1) {
              this.setData({
                showDefault: true,
                defaultType: 2
              })
            }
        })
    },
    // 去红包说明页
    goToRules() {
        let { recommendObj = {} , optionsPos={}} = this.data;
        wx.navigateTo({
            url: '/pages/redEnvelopeList/rules/index',
            preObj: recommendObj,
            buried_position: {
              currentPageName:'pages/redEnvelopeList/list/index',
              optionsPos
            }
        })
    }
});