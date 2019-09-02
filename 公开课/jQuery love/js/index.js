// 图片需要进行一个3D的旋转 文字需要逐个的渐入




$('.pic ul li').each(function(i) { // 遍历
    var deg = 360 / $(".pic ul li").length; // size个数
    
    // 给当前的li对象去添加CSS样式
    $(this).css({
        "transform": "rotateY("+ deg * i +"deg) translateZ(220px)"  // 我们中间还有另一个 中间还有另一个 我们需要利用这个3D进行之间这个距离 
                                                                    //     离这个Z轴到底有多少距离 否则所有的图片会贴到一起
    });
})




// 文字 
var i = 0;
var str = "饭我可以帮你打，事我可以帮你办，座我可以帮你占，课我可以帮你上，零食我可以帮你买，作业我可以帮你做，但是“喜欢你”三个字，我希望你亲自说。情人节快乐!";
// 需要把这个文字追加到我这个id为text的div当中 然后让它一个一个的跳出来
window.onload = function typing() { 
    // 先获取一下div
    var mydiv = document.getElementById('text');
    mydiv.innerHTML += str.charAt(i);
    i ++;
    var id = setTimeout(typing, 100);
    if(i === str.length) {
        clearTimeout(id);
    }

    // 字是加进去的 没有多大问题 没有给text定义样式

}




// 飘雪的效果
var minSize = 5; // 定义最小的雪花
var maxSize = 50; // 最大雪花
var newOne = 100; // 生成大小雪花的时间
var flakColor = '#fff';  // 雪花颜色
var flak = $('<div class="xh"></div>').css({
    "position": "absolute",
    "top": "0px",
}).html("❄"); // 定义一个雪花 定义完雪花之后让当前的雪花知道它要滑到多高
var dheight = $(window).height(); // 定义视图高度
var dw = $(window).width(); // 定义视图宽度


// 雪花要用定时器生成
setInterval(function() {

    var sizeflak = minSize + Math.random() * maxSize; // 产生大小不等的雪花
    // 让雪花随机生成随机的Left值
    var startleft = Math.random() * dw; // 随机的left值
    // 给雪花生成随机的透明度 雪花正常来说从高空往下飘的时候到底下肯定会有一个融化的过程 我们就让它透明度减小等同于让它融化了
    var startopcity = 0.7 + Math.random() * 0.3; // 随机透明度
    // 随机透明之后 我让雪花停止到头部的位置
  
    var endpositionTop = dheight - 100; // top停止
    var endleft = Math.random() * dw; // 随机left值
    // 因为雪花大小不一 重量也不等 速度不一样 让雪花的速度不一样
    var durationful = 5000 + Math.random() * 3000; // 雪花的速度

    
    // 只定义了一个雪花 需要给雪花克隆               --- 链式调用
    flak.clone().appendTo($('body')).css({
        'left': startleft,
        'opacity': startopcity,
        'font-size': sizeflak,
        'color': flakColor
    }).animate({ // 因为我要让雪花动起来所以添加一个animate
        'top': endpositionTop,
        'left': endleft,
        'opacity': 0.1
    }, durationful, function() { // 雪花落到底下 我们需要让它融化掉 删掉就完了
        $(this).remove();

    });

}, newOne); // 给个生成雪花的时间



// 声音是一个H5的标签 audio标签或者 embed标签




// 什么叫通信层 为什么通信层当中有内容请求和资源请求 内容的头部可能标题是固定的 当时这个图片可能不是固定的 照片是需要通过后台的json数据来获取的 
//     正常来说我们需要在图片的这个位置需要留一个端口去用json的情况去获取 所以它是个动态的 为什么我把它写死了 写死的是为了大家看的更明白 
//     而且下面文字的跳动它也通过一步一步的去获取才有的这个东西





