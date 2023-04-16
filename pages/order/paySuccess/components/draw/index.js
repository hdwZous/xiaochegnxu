
import { request, FNIDS } from "../../../../../common/util/api";
let STEP = 0 // 已走的步数
let interval = null
Component({
  properties: {
    initData: {
      type: Object,
      value: {},
    },
    orderId: {
      type: String,
      value: "",
    },
    pageId: {
      type: String,
      value: ''
    },
    recommendObj:{
      type: Object,
      value: {}
    }
  },
  data: {
    step: 0,
    flag: true,
    current: "",
    arrIndex: [0, 1, 2, 5, 8, 7, 6, 3],
    title: "",
    prizeList: [],
  },
  observers: {
    step: function (val) {
      this.setData({
        current: this.data.arrIndex[val % 8],
      });
    },
  },
  lifetimes: {
    attached() {
      this.triggerEvent("drawShow");
    }
  },
  methods: {
    // 点击抽奖按钮
    clickStart() {
      // 避免重复点击
      if (this.data.flag) {
        this.setData({
          flag: false,
        });
        this.fetchDrawResult()
          .then((res) => {
            // 模拟接口延时
            this.endAnimation(res.index);
            // console.log('------', res)
            // console.log('======', this.data.initData);
            this.setData({
              title: res.title,
              prizeList:
                res.index == this.data.initData.index ? [] : res.prizeList, // 如果中奖结果返回再接再厉的位置则把数组置为空
            });
          })
          .catch(() => {
            // console.log('抽奖结果失败', res);
            // 获取抽奖结果失败，走降级方案,停留在再接再厉
            this.endAnimation(this.data.initData.index);
          });
      }
    },
    // 获取抽奖结果
    fetchDrawResult() {
      this.beginAnimation();
      return new Promise((resolve, reject) => {
        request({
          ...FNIDS.freePrizeDrawV2,
          isForbiddenDialog: true,
          isNeedDealError: true,
          body: {
            orderId: this.data.orderId || "",
            lotteryCode: this.data.initData.lotteryCode || "",
          },
          pageId: this.data.pageId,
          preObj: this.data.recommendObj || {}
        })
          .then((res) => {
            // 返回中奖位置
            let { code = '', result } = res.data
            if (code == 0 && result && (result.index != undefined || result.index != null)) {
              resolve(result);
            } else {
              reject();
            }
          })
          .catch(() => {
            reject();
          });
      });
    },
    // 开始阶段的抽奖动效
    beginAnimation() {
      STEP = 0;
      interval = setInterval(() => {
        this.setData({
          step: STEP++,
        });
      }, 50);
    },
    // 抽奖结果返回后的动效
    endAnimation(index) {
      // 模拟接口
      clearInterval(interval);
      let realIndex = index // this.data.arrIndex.indexOf(index); 对应的转盘里的下标
      let allStep = 24 + realIndex; // 总的步数
      let nextStep = 0;
      // 总步数 - 已走的步数 大于剩余5步， 则继续匀速转并减速, 否则只能继续匀速转一圈在减速
      if (allStep - STEP > 5) {
        nextStep = allStep - STEP;
        this.resStep(nextStep);
      } else {
        nextStep = realIndex - (STEP % 8) + 8;
        if (nextStep < 5) {
          nextStep = nextStep + 8;
        }
        this.resStep(nextStep);
      }
    },
    // 剩下的步数
    resStep(step) {
      // console.log(step);
      if (step < 0) {
        setTimeout(() => {
          this.triggerEvent("getResult", {
            title: this.data.title,
            prizeList: this.data.prizeList,
          });
        }, 500);

        return;
      }
      let time = 50;
      if (step == 5) {
        this.stepTime = 150;
      }
      if (step < 5) {
        time = this.stepTime + (5 - step - 1) * 50;
        this.stepTime = time;
      }
      let timer = setTimeout(() => {
        clearTimeout(timer);
        this.setData({
          step: STEP++,
        });
        this.resStep(step - 1);
      }, time);
    },
  },
});
