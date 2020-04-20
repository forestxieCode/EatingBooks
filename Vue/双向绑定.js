function defineReactive(data, key, value){
    obServer(value) // 递归遍历所有子属性
    var dep = new Dep(); 
    Object.defineProperty(data, key, {
        configurable:true,
        enumerable:true,
        set:function(newValue){
            if(newValue === value)return 
            value = newValue
            console.log('你更新了'+ key +":"+ newValue)
            dep.notify() // 如果数变化，通知所有的订阅者
        },
        get(){
            if(Dep.target){  // 判断是否需要添加订阅者
                dep.addSub(Dep.target)  // 再这里添加一个订阅者
            }
            return value
        }
    })
}
Dep.target = null

function obServer(data){
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
}

// Dep
function Dep() {
    this.subs = []
}
Dep.prototype = {
    constructor : Dep,
    addSub: function(sub){
        this.subs.push(sub)
    },
    notify: function(){
        this.subs.forEach(function(sub){
            sub.update()
        })
    }
}

//  Watcher 
function Watcher(vm, exp , cb){
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.value = this.get() //将自己添加到订阅器的操作
}
Watcher.prototype = {
    constructor: Watcher,
    update: function(){
        this.run()
    },
    run: function(){
        let value = this.vm.data[this.exp] 
        let oldValue = this.value
        if(value !== oldValue) {
            this.value = value
            this.cb.call(this.vm, value, oldValue)
        }
    },
    get: function(){
        Dep.target = this // 缓存自己
        let value = this.vm.data[this.exp] // 强制执行监听器里的get函数
        Dep.target  = null // 释放自己
        return value
    }
}
function Compile(options,vm){
    this.vm = vm
    this.vnode = this.nodeToFragment(document.querySelector(options.el))
    this.compileElement(this.vnode)
}
Compile.prototype = {
    // 将实际的dom转换到虚拟节点
    nodeToFragment:function (el){
        let fragment = document.createDocumentFragment()
        let child = el.firstChild;
        while(child){
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    },
    compileElement:function (el) {
        let childNodes = el.childNodes;
        let self = this;
        [].slice.call(childNodes).forEach(function(node){
            var reg = /\{\{(.*)\}\}/;
            var text = node.textContent;
    
            if(node.nodeType == 1 && reg.test(text)){
                console.log(reg.exec(text)[1])
                self.compileText(node, reg.exec(text)[1]);
            }
    
            if(node.childNodes && node.childNodes.length){
                self.compileElement(node) // 继续递归遍历子节点
            }
        })
    },
    updateText:function (node, value){
        console.log(node,value)
        node.textContent = typeof value == 'undefined' ? '': value
    },
    compileText:function (node, exp){
        let self = this
        let iniText = this.vm[exp]
        debugger
        console.log(exp,this.vm)
        this.updateText(node, iniText) // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, function(value){ // 生成订阅并绑定更新函数
            self.updateText(node, value)
        })
    }
}


function SelfVue(options){
    // this.data = data

    // // 绑定代理属性
    // Object.keys(data).forEach(key => {
    //     this.proxyKeys(key)
    // })
    // obServer(data)
    // el.innerHTML = this.data[exp]  // 初始化模板数据的值
    // new Watcher(this, exp, function(value,oldValue){
    //     if(value !== oldValue){
    //         el.innerHTML = this.data[exp] 
    //     }
    // })
    var self = this
    this.vm = this
    this.data = options

    Object.keys(this.data.data).forEach(function(key){
        self.proxyKeys(key)
    })
    obServer(this.data.data)
    
    new Compile(options, this.vm)

    return self
}

// 代理函数
SelfVue.prototype = {
    proxyKeys:function(key){
        let self = this
        Object.defineProperty(self, key, {
            enumerable:true,
            configurable:true,
            get:function proxyGetter(){
                return self.data[key];
            },
            set:function proxySetter(newVal) {
                self.data[key] = newVal
            }
        })
    }
}





var selfVue = new SelfVue({
    el: '#app',
    data: {
        title: 'hello world',
        name: '123131313'
    }
});

setTimeout(function () {
    selfVue.title = '你好';
}, 2000);

setTimeout(function () {
    selfVue.name = 'canfoo';
}, 2500);




