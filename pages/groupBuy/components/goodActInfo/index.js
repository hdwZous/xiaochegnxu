import util from '../../../../common/util/util'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        actPrice: {
            type: String,
            value: ""
        },
        basicPrice: {
            type: String,
            value: ""
        },
        joinNumDesc: {
            type: String,
            value: ""
        },
        remainTime: {
            type: Number,
            value: 0,
            observer: function(newVal) {
                this.countDown(newVal)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // 活动倒计时
        actTime: {
            day: "",
            hour: "",
            minute: "",
            second: "",
            timeEnd: false,
            timer: null
        },
        hasTrigger: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 活动倒计时
        countDown(time) {
            //时间  回调方法  当前实例
            if (time <= 0) {
                this.setData({
                    actTime: {
                        timeEnd: true
                    }
                })
            } else {
                util.countDownList(time, this.timeCallback, this, "actTime")
            }
        },
        // 时间回调函数
        timeCallback(timeObj, self, index) {
            if (timeObj.hour == "00" && timeObj.minute == "00" && timeObj.second == "00") {
                var timeEndIndex = index + '.timeEnd';
                self.setData({
                    [timeEndIndex]: true,
                })
                if (!self.data.hasTrigger) {
                    self.setData({
                        hasTrigger: true
                    })
                    self.triggerEvent("pageEvent", {
                        type: "timeEnd",
                        data: {

                        }
                    })
                }
            }
            if (!timeObj.isOver) {
                var hourIndex = index + '.hour',
                    minuteIndex = index + '.minute',
                    secondIndex = index + '.second',
                    dayIndex = index + ".day",
                    timer = index + '.timer';
                self.setData({
                    [dayIndex]: timeObj.day,
                    [hourIndex]: timeObj.hour,
                    [minuteIndex]: timeObj.minute,
                    [secondIndex]: timeObj.second,
                    [timer]: timeObj.timer
                })
            }
        },
    }
})