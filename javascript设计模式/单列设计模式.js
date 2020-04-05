// 1.1 单列设计模式
//   定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点
//   核心： 确保只有一个实例，并提供全局访问
//   假设要设置一个管理员，多次调用也仅设置一次，我们可以使用闭包缓存一个内部变量来实现这个单例


function SetMange(name){
    console.log('name',name)
    this.name = name
}
SetMange.prototype.getName = function(){
    console.log(this.name)
}

function SetHr(name){
    this.name = name
}
SetHr.prototype.getName = function(){
    console.log(this.name)
}

var signletonSetMange = function(){
    let manger = null
    return function(name){
        if(!manger){
            manger = new SetMange(name) 
        }
        return manger
    }
}()

// 将signleton 抽离出来

function signleton(fn){
    let instance = null
    return function(){
        if(!instance){
            instance = fn.apply(this, arguments)
        }
        return instance
    }
}

let MangeSignleton = signleton(function(name){
    let manger = new SetMange(name)
    return new SetMange(name)
})


let HrSignleton = signleton(function(name){
    let manger = new SetHr(name)
    return new SetHr(name)
})





HrSignleton('张三').getName()
HrSignleton('王明').getName()
HrSignleton('老狗').getName()


//
function createPopup(html){
    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.append(div);

    return div
}

let PopupSingleton = signleton(function(name){

    let div = createPopup.apply(this, [name])
    return div
})

console.log(
    PopupSingleton('1212').innerHTML,
    PopupSingleton('2121').innerHTML,
    PopupSingleton('333').innerHTML
)