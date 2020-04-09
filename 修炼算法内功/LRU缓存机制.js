function LRU(capacity){
    this.capacity = capacity
    this.cache = new Map()
}
LRU.prototype = {
    get(key){
        const { cache } = this.cache
        if(cache.has(key)){
            let value = cache.get(value)
            cache.delete(key)
            cache.set(key, value)
            return value
        }
        return -1
    },
    push(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key)
        } else if(this.cache.size > this.capacity -1){
            const keys = this.cache.keys().next().value
            this.cache.delete(keys)
        }
        this.cache.set(key, value)
    }
}
