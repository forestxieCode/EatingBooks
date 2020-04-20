function defineReactive(data, key, value){
    observe(value) // 递归遍历所有子属性
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
// 数据劫持
function observe(data){
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
function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function() {
        Dep.target = this;  // 缓存自己
        var value = this.vm.data[this.exp]  // 强制执行监听器里的get函数
        Dep.target = null;  // 释放自己
        return value;
    }
};
// Compile
function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment);
        } else {
            console.log('Dom元素不存在');
        }
    },
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom元素移入fragment中
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    },
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function(node) {
            var reg = /\{\{\s*(.*?)\s*\}\}/;
            var text = node.textContent;
            if (self.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
                self.compileText(node, reg.exec(text)[1]);
            }

            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);  // 继续递归遍历子节点
            }
        });
    },
    compileText: function(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);  // 将初始化的数据初始化到视图中
        new Watcher(this.vm, exp, function (value) { // 生成订阅器并绑定更新函数
            self.updateText(node, value);
        });
    },
    updateText: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    }
}
function SelfVue (options) {
    var self = this;
    this.vm = this;
    this.data = options.data;

    Object.keys(this.data).forEach(function(key) {
        self.proxyKeys(key);
    });

    observe(this.data);
    new Compile(options.el, this.vm);
    return this;
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newVal) {
                self.data[key] = newVal;
            }
        });
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




