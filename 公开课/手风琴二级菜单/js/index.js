// 点击可以把它展开 然后再点击可以把它合上 先不考虑颜色变化的问题 点击展开再点击合上是怎么做的呢 展开而且是向下展开的 不是纯粹的display:none/block
//     有个向下拉的过程 收的话有个向上收的过程的  这个时候就涉及动画了




// var multiple = false; // 多重 如果true代表多个展开的 如果是false代表不是多个展开的

// 当我点击可以把这个下拉菜单展开的  我希望点击一下可以让它展示出来 展示出来是有个下拉和往上收回这样动态的效果的
// $('.title').on('click', function() {


//     // $('.list').slideDown(); // 你会发现一个问题 当点击个人主页的时候不当它的二级菜单展开了 其他的二级菜单也展开了
//                                //     因为你把所有的list元素都找出来 我不想找全部 我想找点击的那个一级菜单它所对应的二级菜单
//                                //     怎么找呢 找p标签下面的list 
//     // $(this).next().slideDown(); // 找兄弟元素 
//     // 点击展开了 再点击收回 我现在做的是点一下收回 再点一下展开 用判断 
    
//     // if(flag) {
//     //     $(this).next().slideUp();
//     // }else {
//     //     $(this).next().slideDown();
//     // }   
//     // flag = !flag;




//     if(!multiple) {
//         $('.item').removeClass('active');
//         $('.list').slideUp();
//     }
//     // 点一下收回 点击展开 有一个单独的功能 不需要你判断 它能自动的帮你判断 
//     $(this).next().slideToggle();
//     // $(this).parent().addClass('active');

//     // 点一下没有class类名就添加 再点一下有class类名就删除
//     $(this).parent().toggleClass('active');


// });




// 学习jQuery需要把常用的功能都了解了 你需要去了解一下jQuery内部的方法是如何封装的 因为jQuery库文件并不适用于所有项目的 所以项目非常简单 
//     jQuery包含很多的方法 导致你这个文件偏重一些了 可能一些方法不适合你这个项目 而且你这个项目要有一些特殊的功能 所以它就不适合你这个项目了
//     这个时候怎么办呢 就需要你去写一个类似jQuery这样类似的库 你可能没人家封装的方法那么全  但是也会有几百行代码几千行代码
//     把你这个项目常用的一些方法都开发出来 开发出这个库供你这个项目组去使用 需要了解jQuery源码怎么写的 
//     
//
// 1. 学会使用   2. 了解源码是如何封装的
//
// 展开有个特殊的提示  添加的个特殊的class类名 点击有颜色 缩回这个颜色就取消
//
//
// 可以通过参数可以展开一个菜单 当我点击它的时候是不是把所有的active类名都删除掉 是不是只要没有active这个类名那么它是不是不会变红了
//     可以进行一个判断
//
//
//
// 
// 现在一个单独的功能你可以给它封装成插件 如果你把它封装成一个插件 只要把你这个文件拿过来给所有的人 只要按照你这个格式写就可以自定义这样的下拉菜单了
//    现在把所写的功能给它封装成一个插件 这样的话适用性更强 可以允许用户自定义了 首先我在这个地方定义一个函数 用这个函数作为一个构造函数new出来一个对象
// Accordion.prototype.toggleshow = function(e) {
//     var $thisParent = $(this).parent();
//     var $thisNext = $(this).next();
//     if(!e.data.multiple) {
//         var itemClass = $thisParent.attr('class');
//         var listClass = $thisNext.attr('class');
//         // $('.' + itemClass).removeClass('active');
//         $('.' + itemClass).removeClass(e.data.activeClass);
//         $('.' + listClass).slideUp();
//     }
//     // $thisParent.toggleClass('active'); 
//     $thisParent.toggleClass(e.data.activeClass);
//     $thisNext.slideToggle();
// }
// function toggleClass() {}  // 这样写的话暴漏给用户就不只一个接口了 封装成插件就是保证你当前项目的完整性 那你暴漏出这么多接口不好
                              //     jQuery在封装框架的时候只暴漏出来一个接口 虽然有这些多方法 但是暴漏给用户的只有一个接口
                              //     $()就是接口 防止污染到用户的全局变量 所以把这些方法封装到对象的原型上面 这样使用的话就不污染到用户了
// function Accordion(obj) { // 留一个接口 用户在使用的时候就只有一个它
//     obj.tar.on('click', obj, Accordion.prototype.toggleshow);
// }
var obj = {
    tar: $('.title'),
    activeClass: 'active',
    multiple: true
}
var accordion = new Accordion(obj); // 可以通过往里面传参数来让用户自动的决定哪一个作为点击 哪一个作为下拉菜单了 哪一个作为当前的class名称了 
                                    //     现在封装成插件了 就允许用户自己去定义这样的class名称 所以可以往里面传参数
// 
// 既然通过new的方式创建一个对象了 这些方法就可以把它放到这个对象的原型上面去了 可以给这样对象原型上绑定一个方法 就是click回调之后的函数
//     这个方法就是展开和展示的 为什么要写成这种形式 其实每一个函数都应该单独拿出来放到一个单独作用域下 这样看起来模块化更好一些 

// 最开始往里面传一个参数 通过传这个参数就可以让用户自己去定义 哪一个叫当前的class名称  你不一定非得叫item 然后把这个值都给你传进来了 传进来之后
//     绑定一个点击事件 然后为了使插件封装的只能给用户暴漏出来一个接口 所以把这个方法只能定义在这个原型上面 定义在原型上面 如果是一个把所有的都隐藏掉
//     再把当前的显示出来
//
// 说好封装这些东西不用写固定的class名称 为什么写active 说明这个值可以获取的  怎么获取当前传过来的active名称呢
//  
// 封装的话可以更方便的让用户自定义去实现你这个功能大小 颜色可以传参了 控制的变量往里传的参数越多