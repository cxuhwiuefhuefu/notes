class LikeModel {

    // 设置缓存
    setLikeList(value) {
        wx.setStorageSync('likeList', value);
    }

    getLikeList() {
        return wx.getStorageSync('likeList') || [];
    }

    // 添加喜欢缓存
    addLikeList(articleDetail) {
        const likeList = this.getLikeList();
        // 设置缓存
        likeList.unshift(articleDetail);
        this.setLikeList(likeList);
    }

    // 移除缓存 
    removeLikeList(artId) {
        const likeList = this.getLikeList();
        let myIndex = 0

        likeList.forEach((item, index) => {
            if(item.artId === artId) {
                myIndex = index;
                return;
            }
        })

        likeList.splice(myIndex, 1);

        // 重新设置我们的缓存
        this.setLikeList(likeList);
    }

    getLikeStatus(artId) {
        const likeList = this.getLikeList();
        let likeStatus = false;

        likeList.forEach((item, index) => {
            if(item.artId === artId) {
                likeStatus = true;
            }
        })
        return likeStatus;
    }
}

export {LikeModel}