const oldProtoMehtods = Array.prototype
const proto  = Object.create(oldProtoMehtods)

function update(){
    console.log('更新视图')
}

function observer(tagert){
    if(typeof tagert !== 'object'){
        return tagert
    }
    if(Array.isArray(tagert)){
        Object.setPrototypeOf(tagert, proto)
        for(let i=0;i<tagert.length;i++){
            observer(tagert[i])
        }
    }
    for(let key in tagert){
        defineReactive(tagert, key, tagert[key])
    }
}

['push', 'pop', 'unshift', 'shift'].forEach(method => {
    Object.defineProperty(proto, method, {
        get(){
            update()
            return oldProtoMehtods[method]
        }
    })
})

function defineReactive(obj, key, value) {
    observer(value)
    Object.defineProperty(obj, key, {
        get(){
            return value
        },
        set(NewValue){
            if(NewValue !== value){
                observer(value)
                update()
            }
        }
    })
}

let obj = {hobby:[{name:'人生多浪浪'}]}
observer(obj)
// 使用['push','pop','shift','unshift'] 方法，更改数组会触发视图更新
obj.hobby.push('浪浪')
// 更改数组中的对象也会触发视图更新
obj.hobby[0].name = 'new-name'
console.log(obj.hobby)
