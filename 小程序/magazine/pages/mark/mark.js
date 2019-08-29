// pages/mark/mark.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    authorized: false,
    likeList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success: res => {
    //     // console.log(res.authSetting);

    //     if(res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: res => {
    //           // console.log(res.userInfo);

    //           this.setData({
    //             userInfo: res.userInfo,
    //             authorized: true
    //           })

    //           this.getMyLike();
    //         }
    //       })
    //     }
    //   }
    // })

    // // 从缓存当中取值
    // const likeList = wx.getStorageSync('likeList') || [];
    // this.setData({
    //   likeList
    // })


    this.userAuthorized();
  },

  onGetUserInfo(e) {
    // console.log(e);

    const userInfo = e.detail.userInfo;
    // console.log(userInfo);

    if(userInfo) { // 有数据才设置数据
      this.setData({
        userInfo,
        authorized: true
      })

      this.getMyLike();
    }
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // // 从缓存当中取值
    // const likeList = wx.getStorageSync('likeList') || [];
    // this.setData({
    //   likeList
    // })  

    this.getMyLike();
  },

  getMyLike() {
    // 从缓存当中取值
    const likeList = wx.getStorageSync('likeList') || [];
    this.setData({
      likeList
    }) 
  },

  userAuthorized() {
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting);

        if(res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // console.log(res.userInfo);

              this.setData({
                userInfo: res.userInfo,
                authorized: true
              })

              this.getMyLike();
            }
          })
        }
      }
    })
  }

  
})


// 不要把你们的代码直接写在onload函数中
// 这样是不是也不太清晰 我们最好把那些代码抽离出来成为一个文件 像我们之前写的index.js获取网络请求的文件