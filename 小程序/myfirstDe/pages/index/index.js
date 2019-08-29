const app = getApp();

Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },


  toNextPageTap: function(e) {
    console.log(e);
    // 路由可以实现跳转  之前的页面不保留 所以页面卸载了
    // wx.redirectTo({
    //   url: '/pages/inside/inside'
    // })

    // 页面还保留这 只不过当前首屏展示的是另一个页面而已
    wx.navigateTo({
      url: '/pages/inside/inside?=10' // 页面传递数据就是?后面写键值对
    })
  },




  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  /**
   * 生命周期回调--监听页面加载  
   */
  onLoad: function () {

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 回调函数
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  

  /**
   * 生命周期函数--监听页面隐藏
   */ 
  onHide: function() {
    console.log('hide')
  },

  /**
   * 生命周期函数-监听页面卸载  
   */
  onUnLoad: function() {
    console.log('onload');  
  }


})


