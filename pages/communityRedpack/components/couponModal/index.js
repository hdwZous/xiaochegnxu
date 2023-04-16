import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        couponInfoList: {
            type: Array,
            value: [],
            observer: function(list) {
                const couponList = list.map((item) => {
                    const { amount = '' } = item;
                    const amountStr = `${amount}`;
                    const amountList = amountStr.split('.')
                    item.amountList = amountList
                    return item
                })
                this.setData({
                    couponList
                })
                console.log(couponList)
            }
        },
        toastTitle: {
            type: String,
            value: ''
        },
        activityId: {
            type: String,
            value: ''
        },
        activityType: {
            type: Number,
            value: 0
        },
        timeStatus: {
            type: Number,
            value: 0
        },
        isFirstStart: {
            type: Boolean,
            value: true
        },
        isFirstEnd: {
            type: Boolean,
            value: true
        },
        type: {
            type: Number,
            value: 0,
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
        couponList: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        closeModal() {
            const { type, couponList } = this.data;
            couponList && couponList.length
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "clickRedResultLayer",
                click_par: {
                    type,
                    btnName: couponList && couponList.length ? '开心收下' : '我知道了'
                }
            })
            this.triggerEvent("showModal", { type: '' });
        },
        stopBubble() {
            return false
        },
        goUse(e) {
            const { couponGoInfo = {}, activityId = '', couponId = '', couponType = '', limitRule = '', amount = '', actType = '', type = '' } = e.currentTarget.dataset;
            let { pageIdFirstPage = '', prePageName = '', currentPageName ='' } =
            this.data.buriedObj || {};
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "click_coupon",
                click_par: {
                    couponId,
                    activityId,
                    couponType,
                    type,
                    limitRule,
                    amount,
                    actType
                },
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageIdFirstPage,
            })
            if (couponGoInfo.to) {
                djCmsJump({
                    ...couponGoInfo,
                    buried_postion: "communityRedpack-animationModal"
                })
            }
        },
        subscribeMsg() {
            const { type } = this.data;
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "clickRedResultLayer",
                click_par: {
                    type,
                    btnName: '下次提醒我'
                }
            })
            this.triggerEvent("showModal", { type: '' });
            this.triggerEvent("subscribeMsg", {});
        }
    }
})
