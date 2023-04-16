Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object,
            value: {},
            observer: function (newVal) {
                this.clearInterval();
                if(newVal.totalMemberNum) {
                    let percent = Math.floor(((newVal.totalMemberNum-newVal.leftMembers)/newVal.totalMemberNum)*100)+'%';
                    this.setData({
                        percent: percent
                    })
                }
                if(newVal.groupRemainTime) {
                    this.showCountDown(newVal.groupRemainTime)
                }
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        exclusiveCouponArrowDown: true,
        // 倒计时对象
        timer: null,
        // 倒计时
        countDownStr: '00:00:00',
        percent: ''
    },

    attached() {

    },

    /**
     * 组件的方法列表
     */
    methods: {

        clickCouponArrow() {
            this.setData({
                exclusiveCouponArrowDown: !this.data.exclusiveCouponArrowDown
            })
        },

        // 展示倒计时
        showCountDown(time) {
            let flag = true;
            if (time > 0) {
                this.countDown(time, res => {
                    if (res.end) {
                        this.setData({
                            countDownStr: '00:00:00'
                        });
                        this.clearInterval();
                        return;
                    }
                    let countDownStr = '';
                    if (res.day) {
                        countDownStr = res.day + '天' + res.hour + ':' + res.minute + ':' + res.second
                    } else {
                        countDownStr = res.hour + ':' + res.minute + ':' + res.second
                    }
                    // 更新时间
                    this.setData({
                        countDownStr: countDownStr
                    });
                    if (flag) {
                        this.setData({
                            timer: res.timer
                        });
                        flag = false
                    }
                })
            } else {
                this.setData({
                    countDownStr: '00:00:00'
                })
            }
        },

        // 清除计时器
        clearInterval() {
            let timer = this.data.timer;
            if (timer !== null) {
                clearInterval(timer);
                this.setData({
                    timer: null
                })
            }
        },

        countDown(times, callBack) {
            // 秒
            times = times / 1000;
            // 计时器
            let timer = setInterval(() => {
                let day = 0, hour = 0, minute = 0, second = 0;
                if (times > 0) {
                    day = Math.floor(times / (60 * 60 * 24));
                    hour = Math.floor(times / (60 * 60)) - (day * 24);
                    minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
                    second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                }
                // 小于10补0
                if (hour <= 9) hour = '0' + hour;
                if (minute <= 9) minute = '0' + minute;
                if (second <= 9) second = '0' + second;
                // 回调
                if (times > 0) {
                    callBack({
                        day: day,
                        hour: hour,
                        minute: minute,
                        second: second,
                        timer: timer,
                        end: false
                    })
                } else {
                    callBack({
                        hour: '00',
                        minute: '00',
                        second: '00',
                        timer: timer,
                        end: true
                    })
                }
                times--;
            }, 1000)
        }
    }
});
