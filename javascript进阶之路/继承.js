function Person(name){
    this.name = name
    this.getName = function(){
        console.log(this.name)
    }
}

Person.prototype.age = 10

// 通过 原型链实现继承
// 特点 ：继承父类所有的属性，继承弗雷原型链上的所有属性，
// 缺点 : 不能传递参数，当改变新实例的原型链的数据线，父类也会改变
function Per(){ 
    this.name = '网名'
}
Per.prototype = new Person()


// 通过 构造函数 实现继承
// 特点： 继承父类构造函数的所有属性，可以传参数
// 缺点： 不能继承父类原型链的所有属性
function Per1(){
    Person.call(this,'你好')
}

// 组合继承
// 特点 ： 弥补 上面的所有缺点
// 缺点 ： 使用两次 父类的构造器

function Per2(name){
    Person.call(this,name)
}

Per2.prototype = new Person()

// 原型式继承
// 特点 ： 先创建一个对象，用函数来包装
// 缺点 ： 无法实现复用（新实例属性都是后面添加的），所有的实例都会继承原型上的属性
function connect(obj){
    function F(){}
    F.prototype = obj
    return new F()
}

// 寄生式继承

function subObject(obj){
    let sub = connect(obj)
    sub.name = '寄生式继承'
    return sub
} 

let pre = new Per2('哈哈')

let sup = new Person()
let sup1 = connect(sup)

let person = new Person('网名')
let supobj = subObject(person)
console.log(supobj.name)


