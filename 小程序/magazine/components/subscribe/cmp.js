// components/subscribe/cmp.js

import {SubscribeModel} from '../../models/subscribe.js'
const subscribeModel = new SubscribeModel();


Component({
  /**
   * 组件的属性列表
   */
  properties: {

    // 因为这个组件要向外界要两个值
    tag: String,
    tagId: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    class: "common",
    myTagList: []
  },

  attached() {
    this.judgeTag();
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onTap() {
      // 先判断你的样式是什么 

      // let className = '';

      // if(this.data.class === 'common') {
      //   console.log(11);
      //   className = 'subscribe';
      // }else {
      //   className = 'common'
      // }

      // this.setData({
      //   class: className
      // })


      // 先获取一下我这个标签的信息  this.data.xxx this.properties.xxx   data和properties可以看成指向一个集合 你可以把它想象称一个引用 它们最后都集合在一个对象里面 去找的时候也是找最后一个大对象 只不过properties的优先级大于data 就是properties里面的值会覆盖里面的data的值
      const mark = {
        tag: this.properties.tag,
        tagId: this.properties.tagId
      }


      // 进行缓存 怎么进行缓存 先来拿到这个缓存当中关于我们订阅标签的缓存 然后再往里添加或者删除 先要判断你点击按钮的时候
      //    点击订阅的时候它是怎么样的状态 是不是意味着class为common的时候要往缓存里面扔东西 如果不为common的时候要从缓存里面拽一个东西
      if(this.data.class === 'common') {
        // 先接收一下缓存当中一个数据
        // const myTagList = subscribeModel.getMyTagList();
        const myTagList = this.getMyTagList();
        myTagList.push(mark); // push标签所需要的信息 它的名字还有它用到的id

        // 缓存
        subscribeModel.setMyTagList(myTagList);
      }else {
        // 取
        subscribeModel.removeMyTag(mark.tagId);
      }


      this.toggleClass(); // 不要把toggleClass放到上面来 放到上面来就是改变之后的状态 那你得那个===变成!== 还是放到下面来符合逻辑的思维习惯
      this.triggerEvent('tap');
    },

    // 获取喜欢的列表
    getMyTagList() {
      const myTagList = subscribeModel.getMyTagList();
      this.setData({
        myTagList
      })
      return myTagList;
    },


    // 判断我们这个标签是不是已经被喜欢过了  什么时候才对比一下我这个标签有没有被我们喜欢 我们可以用组件的生命周期函数 当这个组件被放到页面当中的时候 我们就进行一次对比
    judgeTag() {
      const myTagList = this.getMyTagList();

      myTagList.forEach(item => {
          if(item.tagId === this.properties.tagId) {
            this.setData({
              class: 'subscribe'
            })
          }
      })
    },



    // 这里面可以抽离出来成为一个函数 因为这不仅在这里切换class的值 还有在这里进行缓存的一些操作

    toggleClass() {
      let className = '';

      if(this.data.class === 'common') {
        console.log(11);
        className = 'subscribe';
      }else {
        className = 'common'
      }

      this.setData({
        class: className
      })
    }


    // 可以把订阅的功能逻辑处理放到Model当中
  }
})
