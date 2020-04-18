// 实现一个属于自己的Promise
// 文章链接: https://segmentfault.com/a/1190000016550260
const PENDING = 'pending'
const FULFILLD = 'fulfiled'
const PROJECTED = 'projected'

function MyPromise(excutor){
    let self = this;

    this.state = PENDING
    this.value = ''
    this.reason = ''
    this.onFuifillCallbacks = []
    this.onProjectedCallbacks = []

    function resolve(value){
        if(self.state ===  PENDING){
            self.value = value
            self.state = FULFILLD
            self.onFuifillCallbacks.forEach(element => {
                element()
            });
        }
    }
    function reject(reason){
        if(self.state ===  PENDING){
            self.reason = reason
            self.state = PROJECTED
            self.onProjectedCallbacks1.forEach(element => {
                element()
            });
        }
    }
    try {
        excutor(resolve,reject)
    } catch (reason) {
        reject(reason)
    }
}
MyPromise.prototype.then = function (onFuifilled, onRejected){
    let self = this
    let newPromise = null
    onFuifilled = typeof onFuifilled === 'function' ? onFuifilled : value => {return value;};
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason};
    
    newPromise = new MyPromise((resolve, reject) => {
        if(self.state === PENDING){
           
            self.onFuifillCallbacks.push(() => {
                setTimeout(() => {
                        try {
                            let x = onFuifilled(self.value)
                            self.resolvePromise(newPromise, x, resolve, reject)
                        } catch(reason){
                            reject(reason)
                        }
                })
            })
           
            self.onProjectedCallbacks.push(() => {
                setTimeout(()=>{
                    try {
                        let x = onRejected(self.reason)
                        self.resolvePromise(newPromise, x, resolve, reject)
                    } catch(reason) {
                        reject(reason)
                    }
                })
            })
           
            
        }
    })
  
    if(self.state ===  FULFILLD){
        setTimeout(()=>{
            try {
                let x = onFuifilled(self.value)
                self.resolvePromise(newPromise, x, resolve, reject)
            } catch (reason){
                reject(reason)
            }
        })
    }
    if(self.state ===  PROJECTED){
        setTimeout(()=>{
            try {
                let x = onRejected(self.reason);
                self.resolvePromise(promise2, x, resolve, reject);
              } catch (reason) {
                reject(reason);
            }
        })
    }
    return newPromise
}

MyPromise.prototype.resolvePromise = function(newPromise, x, resolve, reject){
    let self = this;
    let called = false;   // called 防止多次调用
    
    if(newPromise === x){
        return reject(new TypeError('循环引用'));
    }

    if(x !== null && Object.prototype.toString.call(x) === '[object Object]' || Object.prototype.toString.call(x) === '[object Function]'){
        try{
            let then = x.then
            if(typeof then === 'function'){
                then.call(x, (y)=>{
                   if(called) return 
                   called = true
                   self.resolvePromise(newPromise, y, resolve, reject) 
                },(reason) => {
                    if(called) return 
                    called = true
                    reject(reason)
                })
            } else {
                if(called) return ;
                called = true
                resolve(x)
            }
        } catch (reason){
            if (called) return ;
            called = true;
            reject(reason);
        }
    }else {
        //  x 是普通的值，直接resolve
        resolve(x)
    }
}

MyPromise.prototype.catch = function(onRejected){
    return this.then(null, onRejected);
}



// 测试
let pro = new MyPromise(function(resolve, reject) {
    setTimeout(()=>{
        resolve('世界你好')
    },1000)
})
pro.then(function(value){
    return value
}).then(function(value){
    let obj = {
        value
    }
    obj.name = '哈哈'
    console.log(obj)
})
