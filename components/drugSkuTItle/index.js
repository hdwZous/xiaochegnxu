// pages/asyncPackage/compontents/miniCart/component/drugSkuTItle/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        subItem: {
            type: Object,
            value: {},
        },
        source: {
            type: String,
            value: ''
        },
        isToday: {
            type: Boolean,
            value: false
        }

    },
    observers: {
        'subItem': function (newVal) {
            const _this = this
            const result = this.dealDateText()
            this.setData({
                titleData: result
            }, () => {
                const isFound = this.data.titleData.prescriptionCountDown
                const sku = this.data.titleData
                if (this.interval) {
                    clearInterval(this.interval)
                    this.interval = null
                }
                if (isFound && !this.interval) {
                    this.interval = setInterval(() => {
                        const minus = sku.prescriptionCountDown - 1000
                        sku.prescriptionCountDown = minus
                        sku.skuTitleDateText = _this.handleTime(minus)
                        _this.setData({
                            titleData: this.data.titleData
                        })
                    }, 1000)
                }
            })
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        titleData: {}
    },

    ready() {
        console.log(this.data.isToday, 'isToday')
    },
    moved() {
        console.log(this.interval)
    },
    detached() {
        console.log(this.interval)
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 时间处理
        handleTime(time) {
            if (time >= 0) {
                let h = Math.floor((time / 1000 / 60 / 60));
                let m = Math.floor((time / 1000 / 60) % 60);
                let s = Math.floor((time / 1000) % 60);
                h = h < 10 ? `0${h}` : h;
                m = m < 10 ? `0${m}` : m;
                s = s < 10 ? `0${s}` : s;
                return `${h}:${m}:${s}`
            }else{
                return `00:00:00`
            }
        },
        dealDateText() {
            // 判断是否有处方单
            const result = JSON.parse(JSON.stringify(this.data.subItem))

            if (result.prescriptionCountDown) {
                const minus = result.prescriptionCountDown
                result.skuTitleDateText = this.handleTime(minus)
            }
            return result
        },
    }
})
