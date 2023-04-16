import mp from '../../common/util/wxapi';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgSrc: {
      type: String,
      value: "",
    },
    showDialog: {
      type: Boolean,
      value: false,
      observer(newVal) {
        this.refresh(newVal)
      }
    },
    otherData: {
      type: Object,
      value: {},
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    refresh: "",
    saveImgBtnHidden: false,
    openSettingBtnHidden: true,
    imgFilePath: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {

    close() {
      this.setData({
        refresh: false,
        showDialog: false
      });
    },

    save() {
      this.getAlbumAuth();
    },

    //下载图片
    downloadPic() {
      let that = this;
      if (!that.data.imgSrc) {
        wx.showToast({
          title: '图片为空',
          icon: 'none',
        });
        return;
      }
      mp.loading();
      wx.downloadFile({
        url: that.data.imgSrc,
        success(res) {
          mp.hideLoading();
          if (res.statusCode === 200 && res.tempFilePath) {
            that.setData({
              imgFilePath: res.tempFilePath,
            });
            that.savePicToAlbum();
          }
        },
        fail() {
          mp.hideLoading();
          wx.showToast({
            title: '下载分享图片失败,请稍后再试!',
            icon: 'none',
          })
        },
      })
    },

    //获取相册授权  
    getAlbumAuth() {
      let that = this;
      wx.getSetting({
        success(res) {
          //用户已经授权
          if (res.authSetting['scope.writePhotosAlbum']) {
            that.downloadPic();
            return;
          }
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            //这里是用户同意授权后的回调  
            success() {
              that.downloadPic();
            },
            //这里是用户拒绝授权后的回调
            fail() {
              that.setData({
                saveImgBtnHidden: true,
                openSettingBtnHidden: false
              });
            }
          })
        },
        fail() {
          wx.showToast({
            title: '获取读写相册权限数据失败,请稍后再试!',
            icon: 'none',
          })
        }
      })
    },

    //保存照片到相册 
    savePicToAlbum() {
      let that = this;
      if (!that.data.imgFilePath) {
        wx.showToast({
          title: '图片地址为空,请稍后再试!',
          icon: 'none',
        });
        return;
      }
      wx.saveImageToPhotosAlbum({
        filePath: that.data.imgFilePath,
        success() {
          wx.showToast({
            title: '图片已保存到相册了',
            icon: 'none',
          });
          that.setData({
            showDialog: false
          });
        },
        fail() {
          wx.showToast({
            title: '保存图片失败,请稍后再试!',
            icon: 'none',
          })
        }
      });
    },

    // 对用户的设置进行判断，如果没有授权，即使用户返回到保存页面，显示的也是“去授权”按钮；同意授权之后才显示保存按钮 
    handleSetting(e) {
      let that = this;
      if (!e.detail.authSetting['scope.writePhotosAlbum']) {
        wx.showModal({
          title: '警告',
          content: '若不打开授权，则无法将图片保存在相册中！',
          showCancel: false
        });
        that.setData({
          saveImgBtnHidden: true,
          openSettingBtnHidden: false
        })
      } else {
        that.setData({
          saveImgBtnHidden: false,
          openSettingBtnHidden: true
        });
        wx.showModal({
          title: '提示',
          content: '您已授权，赶紧将图片保存在相册中吧！',
          showCancel: false
        });
      }
    },

    refresh(val) {
      this.triggerEvent('event',{
        type:"close",
        data:{ flag: val}
      })
      this.setData({
        refresh: val
      })
    }
  },
})