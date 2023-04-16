Component({

    options: {
        multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        locCodeList: {
            type: Object,
            value: {},
            observer: function (val) {
                this.setData({
                    isOpen: false
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isOpen: false,
        barcodeImage: ''
    },

    attached() {
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleTriangle() {
            this.setData({
                isOpen: !this.data.isOpen
            })
        },

        closePop() {
            this.setData({
                barcodeImage: ''
            })
            this.triggerEvent('closeCheckCodePop')
        },

        reloadCode() {
            const { orderId = '' } = this.data.locCodeList
            this.triggerEvent('reloadCode', { orderId })
        }
    }
})
