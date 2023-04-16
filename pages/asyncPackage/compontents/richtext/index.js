// components/richtext/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailInfo: {
      type: String,
      value: "",
      observer: function (data) {
        this.parseInfo(data)
      }
    },
    drug: {
      type: Boolean,
      value: false,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    parseInfo(data) {
      if (data) {
        //获取 html 里的body内容
        let bodyP = /<body[^>]*>([\s\S]*?)<\/body>/i;
        let bodyContent = bodyP.exec(data)
        bodyContent = bodyContent ? bodyContent[1] : bodyContent
        if (bodyContent) {
          data = bodyContent;
        }
        //图片 获取图片src 替换
        let p = /<img[^>]*src=['"]([^'"]+)[^>]*>/gi;
        data = data.replace(p, (match, capture) => {
          return `<img src="${capture}" style="width:100%;vertical-align:middle;"/>`;
        });
        //有药店缺少span标签
        if (this.data.drug) {
          data = data.replace('<p>本药品', '<p><span>本药品')
        }
        this.setData({
          data: data
        })
      }
    }
  }
})
