// var request = require('../../utils/request.js');
// import {Request} from "../../utils/request.js"
// const request = new Request;
import {IndexModel} from '../../models/index.js'
import {random} from '../../utils/randomStr.js'
const indexModel = new IndexModel();


Page({

  data: {
    articleList: [], // 这样给它一个初始值 这样马上就知道它的数据是什么类型 还是打印两遍 即使在这个组件里面起始值是一个空数组 但还是监听到改变了 引用值不等于引用值
    markList: [],
    recommend: {},

    // getMore: random(20),
    getMore: '',
    magazineId: 0,

    loading: true
  },
  
  onLoad: function () {
 
    // resolve当进行中变成已失败的时候
    // reject 当进行中变成已成功的时候
    // const promise = new Promise((resolve, reject) => {
    //   wx.request({
    //     url: 'https://easy-mock.com/mock/5bd149fab36f2c5eac3a9274/QM_magazine/getIndexArticleList/0/0',
    //     success: (res) => {
    //       resolve(res);
    //     },
    //     fail: (err) => {
    //       reject(err);
    //     }
    //   })
    // });

    // promise.then((res) => {
    //   console.log(res);
    // }, (err) => {
    //   console.log(err);
    // })


    // request.getData({
    //   url: '/getRecommendInfo/0'
    // }).then(res => {
    //   console.log(res);
    // })
    // request.getData({
    //   url: '/getMarkTypeList/0'
    // }).then(res => {
    //   console.log(res);
    // })
    // request.getData({
    //   url: '/getIndexArticleList/0/0',
    //   // method: 'POST',
    //   // data: {
    //   //   name: 'shan',
    //   //   age: 18
    //   // }
    // }).then(res => {
    //   console.log(res);
    // })
    // 可以把页面当中所需要写的复杂的函数都放到一个整体一个js里面
    
    

    // indexModel.getArticleList().then(res => {
    //   console.log(res);
    // })
    // indexModel.getMarkList().then(res => {
    //   console.log(res);
    // })
    // indexModel.getRecommendInfo().then(res => {
    //   console.log(res);
    // })
    // 在数据没有请求回来是有个动画的 是有个loading 要等到它三组数据都请求回来的时候再去请求
    //     那我怎么知道这三组数据哪组是最后请求回来了 那我该怎么做呢
    // promise.all([]) 数组里面填的是你每个promise


    // const articleList = indexModel.getArticleList();
    // const markList = indexModel.getMarkList();
    // const recommend = indexModel.getRecommendInfo();
    // Promise.all([articleList, markList, recommend]).then(res => { // 这个res都分别是什么 它有三种不同的 这个res也是一个数组 第一个数组里面的第一个元素articleList给你返回的这个值
    //   console.log(res[0], res[1], res[2]);
    // })
    //  我们可以用Promise.all来写我们异步的请求 这样的话代码看上去更工整了
    //      我们依旧在onLoad函数里面去写我们的逻辑代码 我们把它写在逻辑函数里面


    this.getData();
    // wx.showLoading();
    

    // wx.showTabBarRedDot({
    //   index: 0
    // })
    // wx.setTabBarBadge({
    //   index: 0,
    //   text: "测试"
    // })

    // wx.setTabBarItem({
    //   index: 0,
    //   text: "测试"
    // })
    // setTimeout(() => {
    //   // wx.hideTabBar({
    //   //   animation: true
    //   // })

    //   // wx.hideTabBarRedDot({
    //   //   index: 0
    //   // })

    //   wx.setTabBarStyle({ // 16进制 不可以简写的 
    //     color: "#F00000",
    //     selectedColor: "#00FF00",
    //     backgroundColor: "#0000FF",
    //     borderStyle: "white"
    //   })
    // })
  },

  onReachBottom: function() { // 在这里面再进行一次数据的请求 我们在搜索页面也需要加载更多的请求 最好让我们组件去加载更多的数据
    // 那我们这个页面怎么去通知组件去进行一次操作呢   
    // console.log(111);
    
    this.setData({
      getMore: this.data.getMore + '1'
    })
  },

  toUpper() {
    console.log('upper');
  },

  toLower() {
    console.log('111');
  },

  onCatalog() {
    // wx.navigateTo({
    //   url: "/pages/catalog/catalog"
    // })
    
    wx.switchTab({
      url: "/pages/catalog/catalog"
    })
  },

  onNav(e) {
    // console.log(e);

    const magazineId = e.detail.index;

    // this.setData({
    //   magazineId,

    //   articleList: [],
    //   markList: [],
    //   recommend: {},
    // })

    // // 让页面回滚到顶部
    // wx.pageScrollTo({
    //   scrollTop: 0,
    //   duration: 300
    // })


    this.setMagazineId(magazineId);
    this.resetData();
    this.scrollPageToTop();

    this.getData(magazineId)
  },

  getData(magazineId) {
    const articleList = indexModel.getArticleList(magazineId);
    const markList = indexModel.getMarkList(magazineId);
    const recommend = indexModel.getRecommendInfo(magazineId);
    Promise.all([articleList, markList, recommend]).then(res => { // 这个res都分别是什么 它有三种不同的 这个res也是一个数组 第一个数组里面的第一个元素articleList给你返回的这个值
      // console.log(res[0], res[1], res[2]);
      this.setData({
        articleList: res[0],
        markList: res[1],
        recommend: res[2]
      })
      // wx.hideLoading();
      this.hideLoading();
    })
  },

  hideLoading() {
    this.setData({
      loading: false
    })
  },

  // 重置我们的数据
  resetData() {
    this.setData({
      articleList: [], 
      markList: [],
      recommend: {},
    })
  },

  // 滚动到页面顶部
  scrollPageToTop() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  // 设置杂志的类型id
  setMagazineId(magazineId) {
    this.setData({
      magazineId
    })
  }



   
})
