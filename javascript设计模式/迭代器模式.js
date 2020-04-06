// 1、定义
// 迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示

// 2、核心
// 在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素

// 3、实现 js数组中的map，forEach 

let myeach = function (obj, cb){
    var arr = obj

    if(Array.isArray(arr)){
        for(let i=0;i< arr.length;i++){

            let result = cb.call(arr[i], i, arr[i])

            if( result === false){
                return 
            }
        }
    } else if(Object.prototype.toString.call(arr) === '[object Object]'){
        for(let key in  arr){
            let result = cb.call(arr[key], key, arr[key])
            if(result === false){
                return 
            }
        }
    }
}

myeach({name:'张三',age:12},(item,key)=>{
    console.log( key + ':' + item)
})

myeach([1,2,3,4,5],(item,index)=>{
    console.log( index + ':' + item)
})

function getManager(){
    var year = new Date().getFullYear()
    if(year>2019){
        console.log('A')
    }else if(year>2016){
        console.log('B')
    }else if(year>2010){
        console.log('C')
    }
}

function year2019(){
    var year = new Date().getFullYear()
    if(year>2019){
        console.log('A')
        return true
    }
    return false
}

function year2016(){
    var year = new Date().getFullYear()
    if(year>2016&&year<2019){
        console.log('B')
        return true
    }
    return false
}
function year2010(){
    var year = new Date().getFullYear()
    if(year>2010&&year<2016){
        console.log('C')
        return true
    }
    return false
}

function iteratorYear(){
    for (var i=0;i<arguments.length;i++){
        let ret = arguments[i]()
        if(!ret){
            return ret
        }
    }
}


var manager = iteratorYear(year2019, year2016, year2010); // B