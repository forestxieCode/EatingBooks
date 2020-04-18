// 1. 定义

// 也称作观察者模式，定义了对象间的一种一对多的依赖关系，当一个对象的状态发 生改变时，所有依赖于它的对象都将得到通知

// 2. 核心

// 取代对象之间硬编码的通知机制，一个对象不用再显式地调用另外一个对象的某个接口。
// 与传统的发布-订阅模式实现方式（将订阅者自身当成引用传入发布者）不同，在JS中通常使用注册回调函数的形式来订阅

// 3. 实现

// JS中的事件就是经典的发布-订阅模式的实现

// 小A在公司C完成了笔试及面试，小B也在公司C完成了笔试。他们焦急地等待结果，每隔半天就电话询问公司C，导致公司C很不耐烦。

// 一种解决办法是 AB直接把联系方式留给C，有结果的话C自然会通知AB

// 这里的“询问”属于显示调用，“留给”属于订阅，“通知”属于发布

var observer = {

    // 订阅着模式
    subscripts:[],
    // 订阅
    subscript:function(type, fn){
        if(!this.subscripts[type]){
            this.subscripts[type]  = []
        }
        typeof fn === 'function' && this.subscripts[type].push(fn)
    },
    // 发布 可能携带一些信息出去
    publish:function(){
        let type = [].shift.call(arguments)

        let fns = this.subscripts[type]

        // 不存在的订阅类型，以及订阅时未传入处理回调的
        if(!fns || !fns.length){
            return ;
        }
        // 挨个处理调用
        for(var i=0;i<fns.length;i++){
            fns[i].apply(this,arguments)
        }
    },
    // 删除订阅
    remove:function(type, fn){
        // 是否删除所有
        if(type === 'undefined'){
            this.subscripts = []
            return ;
        }
        var fns = this.subscripts[type]
        if(!fns || fns.length){
            return ;
        }
        if (typeof fn === 'undefined') {
            fns.length = 0;
            return;
        }
        for(var i=0;i<fns.length; i++){
            if(fns[i] === fn){
                fns.splice(i,1)
            }
        }
    }

}
// 订阅列表 
function jsbListA(jsbs){
    console.log(jsbs)
}
function jsbListB(jsbs){
    console.log(jsbs)
}
// 订阅工作列表

observer.subscript('job',jsbListA)
observer.subscript('job',jsbListB)

// A订阅笔试
observer.subscript('examinationA',function(score){
    console.log(score)
})
// B订阅笔试
observer.subscript('examinationB',function(score){
    console.log(score)
})

// A订阅了面试结果
observer.subscript('interviewA', function(result) {
    console.log(result);
});

observer.publish('examinationA',100)  //发布面试A的笔试结果
observer.publish('examinationB',70)   //发布面试B的笔试结果
observer.publish('interviewA','备胎') 


// B取消订阅了笔试成绩
observer.remove('examinationB');

// A都取消订阅了岗位
observer.remove('job', jsbListA);

observer.publish('examinationB', 80); // 没有可匹配的订阅，无输出
observer.publish('job', ['前端', '后端', '测试']); // 输出B的岗位