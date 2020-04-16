// bind 返回一个新的函数，当返回新的函数时new的话那么指向的this将会失效
Function.prototype.mybind = function(objCtx){
    let ctx = objCtx || window
    let arg = Array.prototype.slice.call(arguments,1)
    let _this = this
    let Fbind  = function(){
        let self = this instanceof Fbind ? this : ctx
        return _this.apply(self,arg.concat(...arguments))
    }
    let obj = function() {}
    obj.prototype = this.prototype
    Fbind.prototype = new obj()
    return Fbind
}

let foo  = {
    value: 12
}

let bar = function(name, age){
    this.habit = '你好'
    console.log(this.value)
    console.log(name, age)
}

bar.prototype.friend = 'shuaige'

var bingFoo = bar.mybind(foo, 'xq')

let obj = new bingFoo(18)

console.log(obj.habit)
console.log(obj.friend)