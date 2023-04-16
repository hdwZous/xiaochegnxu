import { clickBuried_ } from "../../../../common/util/BI";
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        isFirstStart: {
            type: Boolean,
            value: true
        },
        type: {
            type: Number,
            value: 0,
        },
        timeStatus: {
            type: Number,
            value: 0
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
            const { type } = this.data;
            clickBuried_({
                create_time: new Date(),
                click_id: "clickRedResultLayer",
                click_par: {
                    type,
                    btnName: '我知道了'
                }
            })
            this.triggerEvent("showModal", { type: '' });
        },
        stopBubble() {
            return false
        },
        subscribeMsg() {
            const { type } = this.data;
            clickBuried_({
                create_time: new Date(),
                click_id: "clickRedResultLayer",
                click_par: {
                    type,
                    btnName: '开抢提醒我'
                }
            })
            this.triggerEvent("showModal", { type: '' });
            this.triggerEvent("subscribeMsg", {});
        }
    }
})
