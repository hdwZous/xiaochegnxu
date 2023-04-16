Component({
    /**
     * 组件的属性列表
     */
    properties: {
        show: {
            type: Boolean,
            value: false,
            observer(val) {
                if (val) {
                    this.showBox(val)
                }
            }
        },
        //已选择日期的索引
        dateIndex: {
            type: Number,
            value: 0
        },
        //已选择时间的索引
        timeIndex: {
            type: Number,
            value: 0
        },
        curDateIndex: {
            type: Number,
            value: 0
        },
        //二维数组【 { [{ } ] } 】
        promiseDateRespItems: {
            type: Array,
            value: []
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        showBox: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showBox() {
            setTimeout(() => {
                this.setData({
                    showBox: true
                })
            }, 100)

        },
        hide() {
            this.setData({
                show: false,
                showBox: false
            })

        },
        clickMask() {
            this.hide()
            this.triggerEvent('onLogEvent', {
                type: "mask"
            })
            
        },
        close() {
            this.hide();
            this.triggerEvent('onLogEvent', {
                type: "close"
            })
           
        },
        show() {
            this.setData({
                show: true,
                showBox: false
            })
        },
        //点击左边类目
        selectCurDateIndex(e) {
            let index = e.currentTarget.dataset.dateIndex
            this.setData({
                curDateIndex: index
            })
        },
        //点击右边的类目
        selectTimeIndex(e) {
            let { timeIndex, status, statusTip } = e.currentTarget.dataset
            if (status !== 1) {
                wx.showToast({
                    title: `${statusTip}，请选择其他时间`,
                    icon: 'none',
                    duration: 2000
                })
                
                this.triggerEvent('onLogEvent', {
                    type: "confirm",
                    toast: `${statusTip}，请选择其他时间`
                })
                return;
            }
            this.setData({
                dateIndex: this.data.curDateIndex,
                timeIndex: timeIndex
            })
            this.pickerEvent()
            this.hide()
           
            this.triggerEvent('onLogEvent', {
                type: "confirm",
                toast: ""
            })
        },
        catchtouchmove() {

        },
        pickerEvent() {
            this.triggerEvent("pickerEvent", {
                type: "picker-time",
                data: {
                    dateIndex: this.data.dateIndex,
                    timeIndex: this.data.timeIndex
                }
            })
        }
    },
    created() {

    }
    ,
    attached() {

    },
    ready() {

    },
    moved() {

    },
    detached() {

    }

})
