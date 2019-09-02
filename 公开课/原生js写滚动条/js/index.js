// 为什么要定位呢 因为我要让我整个这个滚动条动起来 让它往上动进行绝对定位 它的top有变化 这个bar在上下移动的过程也需要一个定位 有拖拽 让这个top有变化 
//     所以我要给它一个定位
//
//
// 首先我们是不是要取到我们这个bar 然后还会用到整个滚动条scroll的高度 还会用到我们中间这个内容constents 会让它上来下来动 这样我们取到的内容dom会多些
//
//
// 这里写一个立即执行函数 让我们的js代码不污染全局变量

(function() {


    // 定义全局的变量 我们拿到会比较方便一些
    var drag = document.getElementsByClassName('bar')[0],
        scroll = document.getElementsByClassName('scroll')[0],
        container = document.getElementsByClassName('container')[0],
        contents = document.getElementsByClassName('contents')[0],
        ulScroll = document.getElementsByTagName('ul')[0];
    
    // 上面的东西可以放到一个obj对象里面   
    

    var contentsH = contents.offsetHeight,
        containerH = container.offsetHeight;
    
    var dragH = Math.floor(containerH / contentsH * scroll.offsetHeight); // 得到滚动条的初始高 根据它内容变化的
    drag.style.height = dragH + 'px';        
        
    // 最开始做的事情先让我们的bar出现 它的出现高度取决于我们这个内容的显示区域占我们整个内容的比例乘以我们整个内容的高度可以得出我们整个bar的一个高度
        



    init();
    function init() {

        // 有三个方法 先把方法罗列出来    功能模块化
        scrollGrag(drag, scroll); // 拖拽滑动
        scrollWheel(container, drag); // 滚轮滑动
        scrollBtn(ulScroll, drag); // 点击滑动

    }

    
    function scrollGrag(item, scroll) { // 首先对我们drag继续拖拽

        item.onmousedown = function(e) { // 兼容
            e = e || window.event;  // 这里兼容要写养成一个习惯
            // mousedown的同时要记录我们一个当时鼠标点下的时候一个记录 一个topY
            // 正常还有默认事件 取消默认 在我们滑轮的时候要取消默认 这里不写也可以    
            var topY = e.pageY;
            document.onmousemove = function(e) {
                e = e || window.event;
                e.preventDefault();
                // 当我鼠标点击滚轮的时候 我们会记录当时的一个鼠标的pageX e.pageX是距离我们body窗口的位置 每次移动的时候我让这个y
                var moveY = e.pageY - topY;
                item.style.top = moveY + item.offsetTop + 'px';
                // console.log(moveY); // 滑动的时候往下滑 它走的都是1010 为什么 因为我的鼠标向下走的时候我的y要大于原来的y
                                       //     所以每次差值都是一个正值 当我往上走的时候 它都是一个负值 这样的话我可以通过什么 
                                       //     往上走往下走可以通过moveY正负来判断我是向下滑还是向上滑 这样我们可以写一个方位 
                                       //     可以通过offsetTop等于0
                
                if(moveY > 0) {
                    if((moveY + item.offsetHeight + item.offsetTop) > scroll.offsetHeight) { // 怎么判断它到底了 滚动条自身的高度加上我们整个走过的或者说是我们的top是不是等于我们整个滚动条的高度 就可以来判断它是在最底下了
                        item.style.top = scroll.offsetHeight - item.offsetHeight + 'px';
                    }
                }else {
                    if((moveY + item.offsetTop) <= 0) {
                        item.style.top = 0 + 'px';
                    }
                }   
                                 
                
                topY = e.pageY; // 每次完事之后还要把它更新一下
                // console.log(topY);

                // var scale = item.offsetTop / (scroll.offsetHeight - item.offsetHeight);
                // var scrollContents = scale * (contentsH - containerH);
                // contents.style.top = - scrollContents + 'px';
                runScroll(item);

            }
            document.onmouseup = function(e) {
                document.onmousemove = null;
            }
            // 有个问题 当我们上下走的时候它会超过我们所要的范围 我们还要做一下上下范围的一个判断 怎么判断这个到头这个到底 

        }

    }


    // 怎么让我左边的内容走起来 当我滚动条往下移动的时候 我运动出的这个距离占整个滚动条移动的这段距离 是不是我运动的这个比例就出来了 
    //     当我往下移动的换行 我们移动这个距离也就是我们的scrollTop我们的offsetTop比上整个的距离 这个比例是不是就是我们整个要移动的 
    //     它走出多少那对应的这个部分 它走出是它这边距离的 它上升多少距离就等于这边走出这部分占这块的比例乘以我们整个溢出部分的高度
    //     等于我们溢出 往上走出的部分来


    // 滚轮部分  这部分会涉及到有些兼容性问题 比如说火狐的兼容 火狐的滚轮它是它这个事件和我们日常监听事件是不一样的 这个滚轮对整个box 
    //     这个外观的进行一个滚
    function scrollWheel(box, item) {
        box.onmousewheel = function(e) {
            e = e || window.event;
            e.preventDefault();

            console.log(e); 
            // 有个问题 这个滚轮怎么判断我是向上滚动还是向下滚动 这个鼠标拖拽的时候可以通过我这个差值正负来判断是向上拖还是向下拖  
            //     从而判断我这个滚动条上下走的一个范围 滚轮怎么判断的
            // wheelDeltaY这个属性也是有兼容性的 在我们IE和火狐还有正常性标准性浏览器还是有区别 这个兼容区别在哪里
            //     在兼容我们滚轮方向的时候会涉及到一个小问题 
            //   
            // console.log(e);
            // console.log(e.wheelDefault); // 在浏览器打开150 160也有 所以你不能通过等于120来判断它是向上滑向下滑 但是你可以通过正负 
                                            //     当我向下滑的时候它是负的 往上滑它是正的  所以我们还是通过if判断滑轮的正负  
            
            if(e.wheelDeltaY > 0) { // 向上滑动 我们这个向上是内容的向上 bar是向下的 它们两个正好是相反的
                item.style.top = item.offsetTop + 10 + 'px';
                if((item.offsetHeight + item.offsetTop) > scroll.offsetHeight) { // 怎么判断它到底了 滚动条自身的高度加上我们整个走过的或者说是我们的top是不是等于我们整个滚动条的高度 就可以来判断它是在最底下了
                    item.style.top = scroll.offsetHeight - item.offsetHeight + 'px';
                }
            }else {
                item.style.top = item.offsetTop - 10 + 'px'; // 封装的时候这个10可以变成一个参数
                if((item.offsetTop) <= 0) {
                    item.style.top = 0 + 'px';
                }
            }                             

            // 这么走的话上下还是得去判断上下两头的范围

            // var scale = item.offsetTop / (scroll.offsetHeight - item.offsetHeight);
            // var scrollContents = scale * (contentsH - containerH);
            // contents.style.top = - scrollContents + 'px';
            runScroll(item);
        }

    }



    // 这块代码比较重复 我们写一个方法给它封装一下
    function runScroll(item) {
        var scale = item.offsetTop / (scroll.offsetHeight - item.offsetHeight);
        var scrollContents = scale * (contentsH - containerH);
        contents.style.top = - scrollContents + 'px';
    }



    // 点击滑动 
    function scrollBtn(ulScroll, item) {
        ulScroll.onclick = function(e) {

            // console.log(e.target.parentNode.className); // 可以通过父级的类名来判断出想点击的是哪一个按钮
            var icoName = e.target.parentNode.className;
            if(icoName == 'ico up') { // 往上点的时候说明滑轮往上走
                item.style.top = item.offsetTop - 10 + 'px'; 
                if((item.offsetTop) <= 0) {
                    item.style.top = 0 + 'px';
                }
            }else if(icoName == 'ico down') {
                item.style.top = item.offsetTop + 10 + 'px';
                if((item.offsetHeight + item.offsetTop) > scroll.offsetHeight) { // 怎么判断它到底了 
                                 //  滚动条自身的高度加上我们整个走过的或者说是我们的top是不是等于我们整个滚动条的高度 就可以来判断它是在最底下了
                    item.style.top = scroll.offsetHeight - item.offsetHeight + 'px';
                }
            }

            runScroll(item);

        }
    }

    // 其实滚轮和点击是一样的原理
    //
    // 完成三大部分 滚轮部分 拖拽部分 点击部分 模块化来写
    // 兼容到火狐下面的 事件绑定的兼容 IE的事件监听
    // 扩充一下 当我们对obj监听的时候 我们会传进来一个方法 这个方法 在监听的时候也有一个handle方法 
    //     这个handle方法我们就兼容函数 我们传进来这个方法会遇到e事件对象 这个e事件对象我要它传到fn里面
    //     通过call的方法把这个e传进来同时this指向指向我们的obj 这个是滚轮的兼容 还有默认的兼容

})()