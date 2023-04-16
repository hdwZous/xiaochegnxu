Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rules: {
            type: String,
            value: '',
            observer: function(e = '') {
                const ruleList = e.split('\/n');
                console.log(ruleList)
                this.setData({ ruleList })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        ruleList: []
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
        }
    }
})
