Component({
  properties: {
    width: {
      type: Number,
      value: 56,
    },
    height: {
      type: Number,
      value: 56,
    },
    // 商品数量
    count: {
      type: Number,
      value: 1,
    },
    showState: {
      type: Number,
      value: -1,
    },
    showStateName: {
      type: String,
      value: ''
    },
  },
  data: {
    // 防止重复点击减车
    minFlag: true,
    // 防止重复点击加车
    addFlag: true,
    scopeCount: 0,
  },
  observers: {
    count: function () {
      // this.triggerEvent("updatePrePrice", num);
    },
  },
  methods: {
    // 加车
    add() {
      this.setData({
        count: this.data.count + 1,
      });
      this.triggerEvent("updatePrePrice", this.data.count);
    },
    // 减车
    min() {
      if (this.data.count <= 1) return;
      this.setData({
        count: this.data.count - 1,
      });
      this.triggerEvent("updatePrePrice", this.data.count);
    },
    // 减车重复添加解禁
    freeMinClickBtn(boolean) {
      this.setData({
        minFlag: boolean,
      });
    },
    // 加车重复添加解禁
    freeAddClickBtn(boolean) {
      this.setData({
        addFlag: boolean,
      });
    },
  },
});