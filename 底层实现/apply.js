Function.prototype.myapply = function (ctxCon){
    if(typeof this!=='function'){
        throw new TypeError('error')
    }
    let arg = Array.prototype.slice.call(arguments,1)

    ctxCon.fn = this
    let result = ctxCon.fn(arg)
    return result
}

let obj = {
    name:'张三'
}

function getName(param){
    console.log(param)
    console.log(this.name)
}
getName.myapply(obj,'123123')
