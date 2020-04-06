// 1、定义

//  为一个对象提供一个代用品或占位符，以便控制对它的访问

// 2、核心

//  当客户不方便访问一个对象或者不满足的时候，提供一个替身对象来控制对这个对象的访问，

//  客户实际上访问的是替身对象。

//  替身对象对请求做了一些处理以后，再把请求转交给本体对象

//  代理和本体的接口具有一致性，本体定义了关键功能，而代理是提供或拒绝对它的访问，或者在访问本体之前做了 一些额外的事情

// 3. 实现

// 代理模式主要有三种：保护代理、虚拟代理、缓存代理

// 主体，发送消息

function sendMsg(msg){
    console.log(msg)
}

function proxySendMsg(msg){
    if(typeof msg === 'undefined'){
        console.log('deny');
        return;
    }
    // 有消息则进行过滤
    msg = msg.replace(/泥\s*煤/g, '')
    
    return msg
}

sendMsg('泥煤呀泥 煤呀'); // 泥煤呀泥 煤呀
proxySendMsg('泥煤呀泥 煤'); // 呀
proxySendMsg(); // deny

// 它的意图很明显，在访问主体之前进行控制，没有消息的时候直接在代理中返回了，拒绝访问主体，这数据保护代理的形式

// 有消息的时候对敏感字符进行了处理，这属于虚拟代理的模式


// 虚拟代理在控制对主体的访问时，加入了一些额外的操作

// 在滚动事件触发的时候，也许不需要频繁触发，我们可以引入函数节流，这是一种虚拟代理的实现


function dobounce(fn,delay){
    delay = delay || 300
    var timer = null
    return function(){
        let arg = arguments

        clearTimeout(timer)
        timer = ''

        timer = setTimeout(function () {
            fn.apply(this, arg)
        },delay)
    }
}

function printName(name){
    console.log('你的名字是'+ name)
}


dobounce(function(name){
    console.log('你的名字是'+ name) 
},1000)('颤三')

dobounce(function(name){
    console.log('你的名字是'+ name) 
},1000)('颤三')

function add(){
    let arg = [].slice.call(arguments)
    let sum =  arg.reduce((sum,item)=>{
        return sum += item
    })
    return sum
}

let ProxyAdd =  (function (){
    let cache = {}
    return function(){
        let key = [].slice.call(arguments).join(',')
        if(cache[key]){
            console.log('cache',cache[key])
            return cache[key]
        }else {
            let result =  add.apply(this,arguments)
            cache[key] = result
            return result
        }
    }
})() 


console.log(ProxyAdd)

console.log(
    add(1,2,3,4,5,5),
    ProxyAdd(2,3,4,1,1,2),
    ProxyAdd(2,3,4,1,1,2)
)





