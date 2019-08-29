// pages/type/type.js

// 引入
var request = require('../../utils/request.js'); // 要写相对路径 不写相对路径会报错的 


Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    var typeId = options.typeId;
    // var that = this;
    this.getData(typeId);

    // 如果你请求回来的数据4xx开头的 它并不会走这个fail方法
    // 把网络断开再请求这个页面就走fail这个函数 网络不好/没有网络
    // code
    // 工具函数一般都会新建一个文件夹
    // wx.request({
    //   url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeTitleInfo/' + typeId,
    //   success: function(res) {
    //     // console.log(res);
    //     if(res.data.code == 0) {
    //       that.setData({
    //         titleInfo: res.data.data
    //       })
    //     }else {
    //       wx.showToast({
    //         title: "请求错误",
    //         icon: "none"
    //       })  
    //     }
       
    //     console.log('suc');
    //   },
    //   fail: function() {
    //     console.log('fail');
    //     wx.showToast({
    //       title: "请求错误",
    //       icon: "none"
    //     })
    //   }
    // })

    // wx.request({
    //   url: 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/getArticleTypeList/' + typeId,
    //   success: function(res) {
    //     that.setData({
    //       articleList: res.data.data
    //     })
    //   }
    // })


    // request({
    //   url: '/getArticleTypeTitleInfo/' + typeId,
    //   success: function(res) {
    //     that.setData({
    //       titleInfo: res
    //     })
    //   }
    // })

    // request({
    //   url: '/getArticleTypeList/' + typeId,
    //   success: function(res) {
    //     that.setData({
    //       articleList: res
    //     })
    //   }
    // })

    
    // 可能你这里还觉得不太好 因为你在反复调用request这个函数 ES6中有个Promise的方法可以好几个接口一起请求
    // 在这里是不会建议你把所有的东西都写在这样的生命周期函数里面 特别是onLoad这样的函数里面
    //     因为你把代码拿给别人看的时候  别人首先会看你的入口 一般页面的入口函数是onLoad
    //     直接把你清晰想干的事情罗列在里面 当然需要调用一个函数 
    

  },

  getData: function(typeId) {
    var that = this;

    request({
        url: '/getArticleTypeTitleInfo/' + typeId,
        success: function(res) {
          that.setData({
            titleInfo: res
          })
        }
      })
  
      request({
        url: '/getArticleTypeList/' + typeId,
        success: function(res) {
          that.setData({
            articleList: res
          })
        }
      })
  },

  // 我们页面跳转每篇文章都不一样 我们还要接收一个参数 这个参数是我们所需文章一个标识符
  //     文章跳转所需的数据不一样 每个文章里面的id
  onTap: function(e) {
    // console.log(e.currentTarget.dataset.articleid);
    var id = e.currentTarget.dataset.articleid;
    wx.navigateTo({
      url: '/pages/articleDetail/articleDetail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})