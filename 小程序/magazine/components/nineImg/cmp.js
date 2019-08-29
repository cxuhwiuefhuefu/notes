// components/nineImg/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgArr: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    // imgArr: ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg',
    //          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1359793217,2805555887&fm=27&gp=0.jpg']

    // imgArr: Array
  },

  /**
   * 组件的方法列表
   */
  methods: { // 方法集中写在methods里面

    onTap(e) {
      // console.log(e);

      var index = e.currentTarget.dataset.index;
      const array = this.data.imgArr;
      wx.previewImage({
        urls: array,
        current: array[index] // 应该动态改变
      })
    }

  }
})
