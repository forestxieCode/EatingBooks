// call 方法改变函数的this指向，通过接收一个参数列表传递参数
Function.prototype.mycall = function(objCtx){
    if(typeof this !== 'function'){
        throw new TypeError('Error')
    }
    let arg = Array.prototype.slice.call(arguments, 1)
    objCtx.fn = this
    let result  = objCtx.fn(...arg)
    delete objCtx.fn
    return result
}
let obj = {
    name:'张三'
}
function getName(){
    console.log(Array.from(arguments))
    console.log(this.name)
}
getName.mycall(obj,3,2)