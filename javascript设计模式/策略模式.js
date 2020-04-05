// 二、策略模式
// 1. 定义

//     定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

// 2. 核心

//     将算法的使用和算法的实现分离开来。

//     一个基于策略模式的程序至少由两部分组成：

//     第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。

//     第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context 中要维持对某个策略对象的引用

// 3. 实现

//     策略模式可以用于组合一系列算法，也可用于组合一系列业务规则

//     假设需要通过成绩等级来计算学生的最终得分，每个成绩等级有对应的加权值。我们可以利用对象字面量的形式直接定义这个组策略

let LeventMap = {
    S: 10,
    A: 8,
    B: 6,
    C: 4
}

let scoreLevel = {
    basicScro:90,

    S:function () {
        return this.basicScro + LeventMap['S']
    },
    A:function () {
        return this.basicScro + LeventMap['A']
    },
    B:function () {
        return this.basicScro + LeventMap['B']
    },
    C:function () {
        return this.basicScro + LeventMap['C']
    }
}

function getScore(leve){
    return  scoreLevel[leve] ? scoreLevel[leve]() : 0
}

console.log(
    getScore('S'),
    getScore('A'),
    getScore('B'),
    getScore('C') 
)

let errMesageMap = {
    default: '输入数据格式不正确',
    mixLength:'输入的内容不满足最小长度',
    required:'必填选项',
    isNumber:'输入的内容只能是数字',
}

let rules = {
    mixLength:function(value, mixValue , errMesage){
        if(value&&value.length< mixValue){
            return errMesage?errMesage:errMesageMap['mixLength']
        }
    },
    required:function(value, errMesage){
        if(value === ''){
            return errMesage?errMesage:errMesageMap['required']
        }
    },
    isNumber:function(value, errMesage){
        if(!/\d+/.test(value)){
            return errMesage?errMesage:errMesageMap['isNumber']
        }
    }
}

function Validator(){
    this.items = []
}

Validator.prototype = {
    add:function(value, rule, errMesage){
        let arg = []
        arg.push(value)
        if(rule.indexOf('mixLength') !== -1){
            var temp = rule.split(':');
            arg.push(temp[1]);
            rule = temp[0]
        }
        errMesage?arg.push(errMesage):''
        
        this.items.push(function(){
            return rules[rule].apply(this,arg)
        })
    },
    start:function(){
        for (var i = 0; i < this.items.length; ++i) {
            var ret = this.items[i]();
            if (ret) {
                console.log(ret);
            }
        }
    }
}

// 测试数据
function testTel(val) {
    return val;
}

let va = new Validator()

va.add(testTel('ccc'),'isNumber', '只能数字呢')
va.add(testTel(''),'required')
va.add(testTel('21'),'mixLength:3', '太小了')

va.start()
