// 1.定义
// 享元(flyweight)模式是一种用于性能优化的模式,它的目标是尽量减少
// 共享对象的数量

// 2.核心
// 运用共享技术来有效支持大量细粒度的对象
// 强调将对象的属性划分为内部状态(属性)与外部状态(属性).内部状态用于
// 对象的共享,通常不变,而外部状态则剥离开来,由具体的场景决定.

// 3.实现
// 在程序中使用了大量的相似的对象时,可以利用享元模式来优化,减少对象的数量

function Fitness(name, sex, age, height, weight){
    this.name = name
    this.sex = sex
    this.age = age
    this.height = height
    this.weight = weight
}

// 开始评判
Fitness.prototype.judge = function(){
    var ret = this.name + ''
    if(this.sex=== 'male'){
       ret += this.judgeMale() 
    } else {
        ret += this.judgeFemale();
    }
    console.log(ret)
}
// 男性评判规则
Fitness.prototype.judgeMale = function(){
    var ratio = this.height / this.weight

    return this.age > 20 ? (ratio>3.5):(ratio>2.8)
}

// 女性评判规则
Fitness.prototype.judgeMale = function(){
    var ratio = this.height / this.weight

    return this.age > 20 ? (ratio>4):(ratio>3)
}

var a = new Fitness('A', 'male', 18,160,80)
var b = new Fitness('B', 'male', 18,160,70)
var c = new Fitness('C', 'male', 18,160,80)
var d = new Fitness('D', 'male', 18,160,60)
var e = new Fitness('E', 'male', 18,160,40)
// 开始评判
// a.judge(); // A: false
// b.judge(); // B: false
// c.judge(); // C: false
// d.judge(); // D: true
// e.judge(); // E: true

// 评判五个人就需要创建五个对象，一个班就几十个对象

// 可以将对象的公共部分（内部状态）抽离出来，与外部状态独立。将性别看做内部状态即可，其他属性都属于外部状态。

// 这么一来我们只需要维护男和女两个对象（使用factory对象），而其他变化的部分则在外部维护（使用manager对象）

// 健康测量
function Fitness(sex){
    this.sex = sex
}
// 工厂
var  FitnessFactory = {
    
    objs:[],
    create:function(sex){
        if (!this.objs[sex]) {
            this.objs[sex] = new Fitness(sex);
        }

        return this.objs[sex];
    }
}
// 管理器，管理非共享的部分
var FitnessManager = {
    fitnessData: {},
    // 添加一项
    add: function(name, sex, age, height, weight) {
        var fitness = FitnessFactory.create(sex);
        
        // 存储变化的数据
        this.fitnessData[name] = {
            age: age,
            height: height,
            weight: weight
        };

        return fitness;
    },
    // 从存储中获取数据,更新到当前使用中
    updateFitnessData:function(name,obj){
        var fitnessData  = this.fitnessData[name]
        for(var item in fitnessData){
            obj[item] = fitnessData[item];
        }
    }
}

Fitness.prototype.judge = function(name){
    // 获取存储的数据
    FitnessManager.updateFitnessData(name,this)
    let ret = name + ''
    
    if (this.sex === 'male') {
        ret += this.judgeMale();
    } else {
        ret += this.judgeFemale();
    }
    console.log(ret)
}
// 男性评判规则
Fitness.prototype.judgeMale = function() {
    var ratio = this.height / this.weight;

    return this.age > 20 ? (ratio > 3.5) : (ratio > 2.8);
};

// 女性评判规则
Fitness.prototype.judgeFemale = function() {
    var ratio = this.height / this.weight;
    
    return this.age > 20 ? (ratio > 4) : (ratio > 3);
};
var a = FitnessManager.add('A', 'male', 18, 160, 80);
var b = FitnessManager.add('B', 'male', 21, 180, 70);
var c = FitnessManager.add('C', 'female', 28, 160, 80);
var d = FitnessManager.add('D', 'male', 18, 170, 60);
var e = FitnessManager.add('E', 'female', 18, 160, 40);

// 开始评判
a.judge('A'); // A: false
b.judge('B'); // B: false
c.judge('C'); // C: false
d.judge('D'); // D: true
e.judge('E'); // E: true