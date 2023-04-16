import { clickBuriedV2_ } from '../../../../../common/util/BI';
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        locCodeFloorInfo: {
            type: Object,
            value: {},
            observer: function (val) {
                this.setData({
                    isUnfold: false
                })
            }
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
        },
        orderId: {
            type: String,
            value: "",
        },
        payStageType: {
            type: String,
            value: "",
        },
        locOrderType: {
            type: String,
            value: "",
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        isUnfold: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        unfoldCode() {
            this.setData({
                isUnfold: true
            })
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "unfoldCodeNum",
                click_par: {
                    orderId: this.data.orderId,
                    payStageType: this.data.payStageType,
                    locOrderType: this.data.locOrderType
                },
                currentPageName: this.data.currentPageName,
                prePageName: this.data.prePageName,
                pageId: this.data.pageId
            })
        },

        reloadCode() {
            const { orderId = '' } = this.data
            this.triggerEvent('reloadCode', orderId)
        }
    }
})
