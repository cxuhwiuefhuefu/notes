// 在这里进行缓存的处理 处理缓存订阅标签的功能

class SubscribeModel{
    // 存的功能
    setMyTagList(value) {
        wx.setStorageSync('markTagList', value);
    }

    // 取缓存功能的函数
    getMyTagList() {
        return wx.getStorageSync('markTagList') || [];
    }

    // 移除缓存 这个思路和移除喜欢文章的思路一样的 它判断所以标记过的标签里面有没有某一个标签的tagId跟我传入的tagId 如果有的话就把它索引给记录下来 然后把它截取掉
    removeMyTag(tagId) {
        // 先获取喜欢标签的列表
        let myTagList = this.getMyTagList();
        let myIndex = 0;

        myTagList.forEach((item, index) => {
            if(item.tagId === tagId) {
                myIndex = index;
            }else {
                return;
            }

            // 如果是一样的话 截取一下
            myTagList.splice(myIndex, 1);
            // 重新设置缓存
            this.setMyTagList(myTagList);
        })
    }
}

export {SubscribeModel}
