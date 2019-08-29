// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    // a: 9, // '这是我第一个数据',
    // b: 'sss',
    // color: 'color: red',
    // flag: false, // true

    
    // homeData: {
    //   date: "十月七日",
    //   title: "dnwj dnjqwk dnqjkdqw ",
    //   imgSrc: "/image/list/recommend-image.png",
    // }

    // a: 'woshia',
    // array1: [1, 2, 3, 4],
    // array: [
    //   {
    //     id: '1'
    //   },
    //   {
    //     id: '2'
    //   }
    // ]

    aaa: false, // true,
    listLike: {
      0: true,
      1: false,
      2: false,
      3: true
    }


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    // var obj = {
    //   date: "十月七日"
    // }
    // var dom = document.getElementsByTagName('div')[0];
    // dom.innerText = dom.date;
    // 小程序是数据驱动的 它没有dom 怎么填充数据呢


    // console.log(this.data.a);
    // var that = this;
    // setTimeout(function() {
    //   // that.data.a = 10;
    //   that.setData({
    //     a: '10', // this.这个操作是取数据 真正设置数据的时候我们要用this.setData这个方法传入一个对象 
    //           //    这个对象接受一系列属性的key和value
    //     b: 'bbb'
    //   })
    //   console.log(that.data.a);
    // }, 1000)


    // 小程序不识别的代码
    // for(var i = 0; i < 10; i++) {
    //   // 
    // }
    // [1, 2, 3, 4].forEach(function(item, index) {
    // })
    

    // console.log('load');
    this.getHomeData();

    // wx.showModal({
    //   title: '模态框',
    //   content: '内容',
    //   // showCancel: false,
    //   cancelText: '要取消吗',
    //   success: function(res) {
    //     // console.log(res);
    //     if(res.cancel) {
    //  
    //     }else if(res.confirm) {
    //
    //     }
    //   }
    // })

    // wx.showToast({
    //   title: '消息提示框',
    //   // icon: 'loading',
    //   icon: 'none',
    //   image: '/image/list/article/icon/Icon_circle.png',
    //   duration: 5000,
    //   mask: true // 我可能出现消息提示框的时候还可以触摸其他的一个元素 可能还能执行一些事件
    //              //     如果设置成true的话 我们就触摸不到了 就是点击不到任何其他的元素了
    // })

    // setTimeout(function() {
    //   wx.hideToast();
    // }, 1000)


    // wx.showLoading({
    //   title: '加载中...'
    // })

    // setTimeout(function() {
    //   wx.hideLoading();
    // }, 1000)


    // wx.setStorage({
    //   key: 'name',
    //   data: 'shanshan'
    // })
    // wx.setStorage({
    //   key: 'age',
    //   data: '18'
    // })

    // wx.getStorage({
    //   key: 'name',
    //   success: function(res) {
    //     console.log(res.data);
    //   }
    // })

    // setTimeout(function() {
    //   // wx.removeStorage({
    //   //   key: 'name'      
    //   // })
    //   wx.clearStorage({

    //   })
    // }, 1000)
    // 在计算机语言当中 只要后面有Sync这四个字的话 代表的是同步的
    //     也就是我们设置或者是取出一个数据缓存有两种不同的方法
    //     一个是同步的一个是异步的
    // 异步比较快的 因为它是同时做的 但是我们推荐使用同步的 
    //     因为异步去处理这样的事情可能会报上一些不可预知的错误
    //     所以建议你们能使同步就使用同步
    

    // wx.setStorageSync('name', 'shanshan');
    // wx.setStorageSync('age', '18');
    // console.log(wx.getStorageSync('name'));
    // 用缓存来存储我们喜欢和不喜欢的数据在没有服务器的情况下 
    //     缓存只能接收10兆大小的

    // 喜欢数据存放到缓存当中
    // wx.setStorageSync('listLike', {
    //   0: true,
    //   1: false,
    //   2: false,
    //   3: true
    // })
    // 不应该强制的设置这样的数据
    // 操作顺序应该是这样
    //     1. 先来获取数据中的listLike缓存
    //        get 如果是第一次打开这样的页面 是不是这个页面没有缓存的
    //        没有缓存你再进行取的时候你给我返回一个undefined
    //        如果没有缓存的 ==》 undefined    
    //        undefined[0] = ppp会报错的  所以把它设置为一个空对象
    //        ==》 {}
    //     2. 我们获取到的缓存要把它设置为data 把拿到的这个对象重新设置到我们data当中
    //        通过缓存设置数据中的likeList 然后进行一次触摸判断                          
    //        tap事件 ==》 1. 先要知道文章的一个索引 把listLike从data中取出来              
    //                        通过索引知道是否喜欢 取反
    //                     2. listLike重赋值
    //                     3. 再重新的设置缓存
    
    // var listLikeStorage = wx.getStorageSync('listLike');
    // if(!listLikeStorage) {
    //   listLikeStorage = {};
    // }
    // this.setData({
    //   listLike: listLikeStorage
    // })
    // console.log(this.data.listLike);
    this.getLikeData();

  },

  parentTap: function(e) {
    // console.log('parent', e);
  },
  childTap: function(e) {
    // console.log('child', e);
  },

  ceshi: function() {
    // console.log(11);
  },

  // onLikeTap: function(e) {
  //   // 事件对象 凡是事件这种触摸的事件都可以接收一个事件对象e 
  //   // 我们可以把一些所需要的数据存放到组件间 然后通过e.target.dateset给它取出来
  //   // 这要拿到这篇文章点击的这篇文章的一个索引 通过它的索引才知道它是否被喜欢的 
  //   var index = e.currentTarget.dataset.articleindex;
  //   var listLike = this.data.listLike;
   
  //   var isLike = listLike[index];
  //   listLike[index] = !isLike;

  //   this.setData({
  //     listLike: listLike
  //   })
  //   // 实现喜欢和不喜欢的功能
  //   // 在正常写页面的流程 你是点击了喜欢或者是不喜欢它都会去进行一次网络数据请求
  //   //     把我们的数据传到后台 然后下一次进行加载的时候后台会给我们传值回来
  //   //     然后我们再展现到前端 但是我们现在是没有一个服务器后台的
  //   //     所以我们要用一个方法来进行模拟 模拟出来能让我们微信记住我们是否点赞
  //   // console.log(index, isLike);
  // },
  onLikeTap: function(e) {
    var index = e.currentTarget.dataset.articleindex;
    var listLike = this.data.listLike;
    var isLike = listLike[index];
    listLike[index] = !isLike;
    this.setData({
      listLike: listLike
    })
    wx.setStorageSync('listLike', listLike);
  },

  onMoreTap: function(e) {
    
    // console.log(e);
    // console.log(e.currentTarget.dataset.articletype);
    // target和currentTaget有一定的区别的 target: 触发事件的源组件 事件冒泡 事件委托
    //    currentTarget: 事件绑定的当前事件 是哪个组件的绑定的哪个事件 
    // currentTarget: 事件绑定的当前组件
    // target: 触发事件的原组件

    // wx.showActionSheet(Object object) 显示菜单
    
    var type = e.currentTarget.dataset.articletype;
    wx.showActionSheet({
      itemList: ['内容过期了', '内容和 ' + type + '不相关', '不再显示来自'+ type +'的内容'],
      // itemColor: '#f40',
      success: function(res) {
        console.log(res.tapIndex);
      }
    })
  },

  // 跳转页面
  onArticleTypeTap: function(e) {
    var typeId = e.currentTarget.dataset.articletypeid;
    // console.log(typeId);  
    wx.navigateTo({
      url: '/pages/type/type?typeId=' + typeId  
    })
  },

  getHomeData: function() {
    var that = this;
    wx.request({
      url: 'http://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine/home',
      success: function(res) {
        // console.log(res);
        // console.log(res.data);
        that.setData({
          recommend: res.data.recommend,
          markType: res.data.markType,
          articleList: res.data.articleList
        })
      }
    })
  },
  getLikeData: function() {
    var listLikeStorage = wx.getStorageSync('listLike');
    if(!listLikeStorage) {
      listLikeStorage = {};
    }
    this.setData({
      listLike: listLikeStorage
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    // console.log('ready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 什么是页面显示 就是整个小程序的页面当中显示出来一个10是不是就是我们这个页面显示了 哪怕是显示1像素的小黑点
    //     它是不是也叫做显示了
    // console.log('show');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 页面跳转  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 页面卸载是你已经死亡了
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('刷新');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 看到底部再加载  
    // 这个条距离页面有50像素高的时候它就会触发上拉触底事件
    console.log('上拉');  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('分享');
  }
})