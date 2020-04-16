// 函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，
// 如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
function debounce(fn, delay = 300){
    let timer 
    return function(){
        let arg  = Array.prototype.slice.call(arguments)
        clearTimeout(timer)
        let _this = this
        
        timer = setTimeout(function(){
            fn.apply(_this, arg)
        },delay)
    }
}

function name(name){
    console.log(name)
}

debounce(name,1000)('12312')