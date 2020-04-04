let data = [1,2,3,4]

let p = new Proxy(data,{
    get(target, key){
        console.log('获取值:' ,key)
        return target[key]
    },
    set(target, key, value){
        console.log('修改值:', key, value)
        target[key] = value
        return true
    }
})

let p2 = new Proxy(data,{
    get(target, key){
        console.log('获取值:' ,key)
        return Reflect.get(target,key)
    },
    set(target, key, value){
        console.log('修改值:', key, value)
        return Reflect.set(target,key,value)
    }
})

p2.push(121)