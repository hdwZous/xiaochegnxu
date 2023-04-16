import { djCmsJump } from "../../common/util/agreementV2";
import { clickBuriedV2_ } from "../../common/util/BI";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        drugSkuPopData: {
            type: Object,
            value: {},
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
        // 通知关闭弹层
        closeDrugSkuPop() {
            this.triggerEvent('closeDrugSkuPop', {}, { composed: true, bubbles: true })
            this.clickInfo('cancel')
        },
        // 去处方单h5
        toPrescriptionsH5(e) {
            const { to, param } = e.target.dataset.popButton
            this.clickInfo('confirm')
            djCmsJump({
                to,
                params: param
            })
        },
        // 一起购买
        buyTogether() {
            // 直接把数据返回
            this.triggerEvent('buyTogether', { drugSkuPopData: this.data.drugSkuPopData }, { composed: true, bubbles: true })
            this.clickInfo('confirm')
        },
        // 确认修改
        confirmChangeSku() {
            this.triggerEvent('confirmChangeSku', { drugSkuPopData: this.data.drugSkuPopData }, { composed: true, bubbles: true })
            this.clickInfo('confirm')
        },
        // 确认删除
        confirmDelSku() {
            this.triggerEvent('confirmDelSku', { drugSkuPopData: this.data.drugSkuPopData }, { composed: true, bubbles: true })
            this.clickInfo('confirm')
        },


        clickInfo(btnName) {
            const { buried, storeId, type } = this.data.drugSkuPopData
            let btnType = ''
            switch (type) {
                case 1:
                    btnType = 'buyDrugTogether'
                    break;
                case 2:
                    btnType = 'freePrescription'
                    break;
                case 3:
                    btnType = 'editSkuCnt'
                    break;
                default:
                    btnType = 'deleteSku'
                    break;
            }
            clickBuriedV2_({
                click_id: 'clickLayer',
                click_par: {
                    storeId,
                    type: btnType,
                    btnName
                },
                currentPageName: buried.currentPageName,
                prePageName: buried.prePageName,
                pageId: buried.pageIdFirstPage
            })
        }

    }
})
