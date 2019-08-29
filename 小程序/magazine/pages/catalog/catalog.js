// pages/catalog/catalog.js
import {tagInfoList} from "../../utils/tagList.js";
import {SubscribeModel} from "../../models/subscribe.js";
const subscribeModel = new SubscribeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagInfoList: tagInfoList,
    myTagList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(subscribeModel.getMyTagList());

    // // 把值传给组件之前先保存出来
    // const myTagList = subscribeModel.getMyTagList();

    // this.setData({
    //   myTagList
    // })

    this.getData();
  },

  onSubscribeTap() {
    // console.log(1);
    this.getData();
  },

  getData() {
    console.log(subscribeModel.getMyTagList());

    // 把值传给组件之前先保存出来
    const myTagList = subscribeModel.getMyTagList();

    this.setData({
      myTagList
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