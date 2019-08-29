// 文章组件
import {LikeModel} from "../../models/like.js"
const likeModel = new LikeModel();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // type: Number
    articleDetail: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    likeStatus: false
  },

  attached() {
    const articleDetail = this.data.articleDetail;
    const artId = articleDetail.artId;
    // const likeList = wx.getStorageSync('likeList') || [];
    // let likeStatus = false;

    // likeList.forEach((item, index) => {
    //   if(item.artId == artId) {

    //     // 被喜欢过  如果这篇文章被喜欢过我们应该怎么操作呢 like.js中有like这样的属性 通过这个属性知道自己的状态
    //     likeStatus = true;
        
    //   }
    // })

    // this.setData({
    //   likeStatus
    // })

    const likeStatus = likeModel.getLikeStatus(artId);
    this.setData({
      likeStatus
    })


    // 第一次attached的时候要对比一下这篇文章是不是被喜欢过 被喜欢过就把状态改成是true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(e) {
      console.log(e.detail);

      const like = e.detail.like;
      const articleDetail = this.data.articleDetail;
      const artId = articleDetail.artId;
      // const likeList = wx.getStorageSync('likeList') || [];

      if(like) {
        // 缓存文章
        // likeList.unshift(articleDetail);
        // wx.setStorageSync('likeList', likeList);

        likeModel.addLikeList(articleDetail);

      }else {
        // 将文章从缓存当中移出 
        // wx.removeStorageSync('like');

        // let myIndex = 0;
        // likeList.forEach((item, index) => {
        //   if(item.artId === artId) {
        //     // console.log(index);
        //     myIndex = index;
        //   }
        // })

        // likeList.splice(myIndex, 1);
        // wx.setStorageSync('likeList', likeList);

        likeModel.removeLikeList(artId);
      }
    }
  }
})
