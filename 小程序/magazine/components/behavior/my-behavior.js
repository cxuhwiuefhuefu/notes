// 先定义一个行为 它是构造器 我们可以构造一个行为
// let Bah = Behavior({
//     properties: {
//         mainTitle: String,
//         subHead: String,
//         imgSrc: String
//     }
    
// });

// export {Behavior}




let myBeh = Behavior({
    properties: {
        mainTitle: String,
        subHead: String,
        imgSrc: String
    }    
})
export {myBeh}
// 这里面是一个对象 这个对象是什么呢  它是我们这个Component构造器放的对象 
//     我们构造行为就是构造Componnet所需要用到的东西 你可以把properties放到里面
//     data也放到里面 methods也放到里面 如果你两个文件当中有这样的复用
//     那你就放到这个行为里面