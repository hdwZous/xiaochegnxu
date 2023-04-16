// pages/order/components/hint/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        reminderFloorInfo: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isViewMore: true

    },

    /**
     * 组件的方法列表
     */
    methods: {
        handieViewMore() {
            this.setData({
                isViewMore: false
            })
        }
    }
})
