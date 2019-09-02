// init --> imgSplit{div * 9}
// 标准数组 --> 乱序数组(随机 但是有打乱的范围 你打乱的数组必须和标准数组的范围一样) --> 你拿到这个乱序数组之后再去改变页面上图片的显示 
//     当我点击开始游戏之后我是不是数组打乱是对应的数据层 当我数组打乱完之后我图片重排对应我当前的展示层 所以我有个标准数组有个乱序数组
//     当前对图片不管你是拖动还是开始复原都是操作这两个数组 利用这两个数组 然后有一个相当于工具类的方法 这个工具类的方法叫做cellOrder(arr)
//     当你想让它以正确排序显示的时候你就把这个标准数组给它传进来 当你打乱的时候就把乱序数组传进来 
//     我根据你传进来的数组每一位对应的值以及它这样的索引值来操作这个left/top 我所有的位置变化都是通过这样的数组 
//     操作数组最终显示在每个小碎片的left和top上


var imgArea = $('.imgArea');    
var imgW = parseInt(imgArea.css('width'));
var imgH = parseInt(imgArea.css('height'));
var cellW = imgW / 3;
var cellH = imgH / 3;
// 标准数组
var oriArr = [];
// 乱序数组
var ranArr = [];
var flag = true;
var imgCell; // 代表所有的小碎片


init();
function init() {
    imgSplit();
    // 当前你点击的话叫bindEvent还不是  太准确把 因为它判断一下你当前的游戏状态你是开始还是想复原
    gameState();
}

function imgSplit() { // 生成函数碎片 其实不是图片碎片 其实通过9个div以及背景图片这样的定位的不同 通过定位的不同拼接成整张的图片 显示成碎片的效果
    var cell;                  
    for(var i = 0; i < 3; i++) { // i 行    j 列
        for(var j = 0; j < 3; j++) {
            oriArr.push(i * 3 + j); // 生成标准的数组
            cell = $('<div class="imgCell"></div>');
            $(cell).css({
                'width': cellW + 'px',
                'height': cellH + 'px',
                'left': cellW * j + 'px',
                'top': cellH * i + 'px',
                'backgroundPosition': (-cellW) * j + 'px ' + (-cellH) * i + 'px'   // 怎么移动呢 也是通过i 和 j来控制
            })
            imgArea.append(cell);
        }
    }                  
    imgCell = $('.imgCell');
}


// 既没有发送请求为什么有数据层呢 我现在把这个图片已经放到这个位置来了 我每次当它开始打乱的时候可不可以看作什么呢 我先给每张图片起个名 
//     它这个名是什么 0 1 2 3 4 5 6 7 8 我现在每个图片具体有不同的样子 div显示不同的背景图片 然后它们有不同的名字 当我改变它的顺序的时候
//     它的名字是不是固定的  我现在把它的名字都存在这个标准的数组里 这个名字怎么起 i j


function gameState() { // 有个值判断当前是开始还是复原 状态
    $('.start').on('click', function() {
       
        if(flag) {
            $(this).text('复原');
            flag = false;
            randomArr(); // 得到乱序数组
            cellOrder(ranArr); // 展示数组的顺序


            imgCell.on('mousedown', function(e) {   
               
                var index1 = $(this).index();
                var left = e.pageX - imgCell.eq(index1).offset().left;
                var top = e.pageY - imgCell.eq(index1).offset().top; // 因为这块是为将来得到我点距离我每个小块的边的距离
                     
            
                $(document).on('mousemove', function(e2) {
                    imgCell.eq(index1).css({
                        'z-index': '40',
                        'left': e2.pageX - left - imgArea.offset().left + 'px',
                        'top': e2.pageY - top - imgArea.offset().top + 'px'
                    })
                }).on('mouseup', function(e3) {
                    var left = e3.pageX - imgArea.offset().left;
                    var top = e3.pageY - imgArea.offset().top; // 定一个停的点的目的是找到停对应的索引
                    var index2 = changIndex(left, top, index1); // top/left传过来是基于我们文档页面的坐标减去我自己的top值和left值 
                                                                //    把index1传过来是因为我在changIndex里面要判断一下 它最后给我返回一个index值 
                                                                //    index2是我可能改变的位置
                    if(index1 === index2) {
                        cellReturn(index1);
                    }else {
                        cellChange(index1, index2);
                    }
                    $(document).off('mousemove').off('mouseup');
                })
            })
            
        }else {
            $(this).text('开始');
            flag = true;
            cellOrder(oriArr);
            $(imgCell).off('mousemove').off('mouseup').off('mousedown');
        }
    })
}


// 展示层都是通过业务层来交互的 数据层就是控制了展示层 我这里通过改变数组得到乱序的数组之后传给我图片重排 传给cellOrder 
//     先拿过来一个乱序的数组传给cellOrder
// 点击开始之后首先第一步做的事情是打乱数组 第二步根据数组根据这个数组来渲染这个页面 打乱数组 把当前的标准数组还留着 剩下新的数组 那么新的数组是干嘛
//     就是一个乱序的数组 


function randomArr() {
    ranArr = [];
    var len = oriArr.length;
    var order;
    for(var i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len);
        // 万一这次随机生成一个3 下次还随机生成一个3 如果有值我们判断一下 判断它有没有重复 有重复的话 我们再重新生成一次 
        //     如果没有重复的情况下我才给它push到randArr
        if(ranArr.length > 0) {
            while($.inArray(order, ranArr) > -1) { // 前面传过来值 后面传过来一个数组 这样的话 当前的值没有在数组它就返回-1 如果在这个数组里就大于-1的值
                                                   //     如果它在里面大于-1 我们再重新生成一次order
                order = Math.floor(Math.random() * len);
            }                              
        }
        ranArr.push(order);
    }
    return
}


// 图片重排 把乱序之后的数组传给cellOrder cellorder可能接收乱序可能接收正序的  那么cellOrder拿到这个数组之后改变top值left值
//     改变它们的位置 拿到这个数组 这个数组的每一位是怎么来的 每一位是通过i * 3 + j 得到数组里的每一位
//     那我这个left值和top值怎么得出来呢


function cellOrder(arr) { // [2, 1, 0, 4, 3, 5, 8, 7, 6]
    var len = arr.length;       
    for(var i = 0; i < len; i++) {
        imgCell.eq(i).animate({
            'left': arr[i] % 3 * cellW + 'px', // left需要拿到的是j
            'top': Math.floor(arr[i] / 3) * cellH + 'px' // 取整
        }, 400)
    }
}


// change在哪里change的 有操作才change的 开始有拖拽 拖拽事件是鼠标落下鼠标移动以及鼠标抬起
// 我开始 选中这个 鼠标落下开始移动 当我鼠标开始抬起的时候就定了一个 你可能冲出去了 没有要交换的 你可能移动这个位置有交换的 它俩可能改变了 
//     样式看着位置改变了 实际上是改变了 看着是碎片位置的改变 是数组的改变 是交换了两个数组之间的位置 是我打乱的数组改变了 想算出移动的距离
//     算出的是imgArea


function changIndex(x, y, i) {  // 找出要移动的位置
    if(x < 0 || x > imgW || y < 0 || y > imgH) {
        return i;
    }
    //  我们应该获得什么 通过x y 现在是已知和未知 我们得到索引值 已知位置 我们现在已知x y 得到它的行和列之后
    //     通过这个值获得它的行和列索引值 拿到它的名字之后你改遍历这个数组找到当前的索引值就可以了
    var row = Math.floor(y / cellH);
    var col = Math.floor(x / cellW);
    var l = row * 3 + col;
    // 最终得到的是一个索引
    var i = 0, len = ranArr.length;
    while((i < len) && (ranArr[i] !== l)) { // 找出i要移动到哪里的位置
        i++;
    } 
    return i;
}


// 图片飞回去 两张图片做这样的交换
function cellReturn(index) { // 飞回原来的位置
    var j = ranArr[index] % 3;
    var i = Math.floor(ranArr[index] / 3);
    imgCell.eq(index).animate({
        'left': cellW * j + 'px',
        'top': cellH * i + 'px' 
    }, 400, function() {
        $(this).css('z-index', 10);
    });
}


// 从哪里来到哪里去  --  完成交换数组 图片重排 
function cellChange(from, to) {
    var colFrom = ranArr[from] % 3;
    var rowFrom = Math.floor(ranArr[from] / 3);
    var toJ = ranArr[to] % 3;
    var toI = Math.floor(ranArr[to] / 3);

    var temp = ranArr[from];

    imgCell.eq(from).animate({
        'left': cellW * toJ + 'px',
        'top': cellH * toI + 'px'
    }, 400, function() {
        $(this).css('z-index', '10');
    });

    imgCell.eq(to).animate({
        'left': cellW * colFrom + 'px',
        'top': cellH * rowFrom + 'px'
    }, 400, function() {
        $(this).css('z-index', '10');
        ranArr[from] = ranArr[to];
        ranArr[to] = temp;
        
        check();
    })
    // 它们两个进行交换 它们交换完之后 要进行检查 也没有游戏结束 并且你当前位置交换完了 还要把存在乱序数组里两个Index对应的值给它交换一下
}


// 有可能交换一次成功 就是在chang的时候做一件事要检查一下它当前游戏是否结束
function check() { // 判断游戏成功的条件是什么 比对 判断数据 现在所有的操作都是通过数组来决定你这个结构的
    //  你当前页面的结构排成功了 跟初始化一样 标准数组和动态数组是相相等的情况下 它就完成判定了
    if(oriArr.toString() === ranArr.toString()) {
        alert('right');
        $('.start').text('开始');
        flag = true;
    }
}
// 每次change完都应该判断一次


// 架构图