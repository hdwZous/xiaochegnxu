import { djCmsJump } from '../../../../common/util/agreementV2';
import { clickBuriedV2_ } from "../../../../common/util/BI";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        locStoreFloorInfo: {
            type: Object,
            value: {}
        },
        orderInfo: {
            type: Object,
            value: {}
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
        traceId: {
            type: String,
            value: ''
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

    },

    /**
     * 组件的方法列表
     */
    methods: {
        callUp() {
            const { locStoreInfo } = this.data.locStoreFloorInfo
            const { orderInfo, currentPageName, prePageName, pageId } = this.data
            clickBuriedV2_({
                create_time: new Date(),
                click_id: "clickMerchant",
                click_par: {
                    locOrderType: orderInfo.locOrderType,
                    orderId: orderInfo.orderId,
                    orderState: orderInfo.orderState,
                    storeId: orderInfo.storeId
                },
                currentPageName: currentPageName,
                prePageName: prePageName,
                pageId: pageId
            });
            wx.makePhoneCall({
                phoneNumber: locStoreInfo.phoneList[0]
            })
        },

        toAllStore() {
            const { buttonInfo } = this.data.locStoreFloorInfo
            djCmsJump({
                to: buttonInfo.to,
                params: buttonInfo.params,
                preObj: this.data.recommendObj,
            })
        }
    }
})
