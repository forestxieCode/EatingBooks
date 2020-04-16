// 当高频事件触发时，第一次会立即执行（给scroll事件绑定函数与真正触发事件的间隔一般大于delay，如果你非要在网页加载1000毫秒以内就去滚动网页的话，我也没办法o(╥﹏╥)o），而后再怎么频繁地触发事件，也都是每delay时间才执行一次。而当最后一次事件触发完毕后，事件也不会再被执行了 （最后一次触发事件与倒数第二次触发事件的间隔小于delay
// ，为什么小于呢？因为大于就不叫高频了呀(*╹▽╹*)）。
var throttle = function(func, delay) {            
    　　var prev = Date.now();            
    　　return function() {                
    　　　　var context = this;                
    　　　　var args = Array.prototype.slice.call(arguments);                   
    　　　　var now = Date.now();                
    　　　　if (now - prev >= delay) {                    
    　　　　　　func.apply(context, args);                    
    　　　　　　prev = Date.now();                
    　　　　}            
    　　}        
}
var throttleTime = function(func, delay) {            
    　　var timer = null            
    　　return function() {                
    　　　　var context = this;              
    　　　　var args = Array.prototype.slice.call(arguments);                              
            if(!timer){
                timer = setTimeout(() => {
                    func.apply(context, args)
                    timer = null
                }, delay);

            }
     }    
}
function handle (name){
    console.log(name)
}
throttleTime(handle,1000)('123123')
