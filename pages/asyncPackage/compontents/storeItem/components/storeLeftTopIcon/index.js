
Component({
  properties: {
    type: {
      type: String,
      value: "",
      observer: function (type) {
        if (type) {
          this.setData({
            leftTopIcon: `https://storage.360buyimg.com/peibanjia/dj_wx/${type}.png`,
          });
        }
        
      }
    },
  },
  data: {
    leftTopIcon: '',
  },
});
