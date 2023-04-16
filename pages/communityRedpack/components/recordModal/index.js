Component({
    /**
     * 组件的属性列表
     */
    properties: {
        records: {
            type: Array,
            value: [],
            observer: function() {

            }
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
        closeModal() {
            this.triggerEvent("showModal", { type: '' });
        },
        stopBubble() {
            return false
        },
        getRecord() {
            this.triggerEvent("getRecords");
            console.log('111111111111111111111')
        }
    }
})
