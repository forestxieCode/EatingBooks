// 因为 new 是关键字， 我们只能写一个函数来模拟了，构造函数作为参数传入。

function objFactory (){
    let Con = [].shift.call(arguments)
    let obj = {}
    obj._proto_ = Con.prototype

    let reulst = Con.apply(obj, Array.prototype.slice.call(arguments))

    return Object.prototype.toString.call(reulst) === '[object Object]' ? reulst : obj

}
function Angel (name, age) {
    this.strength = 60;
    this.age = age;
    return null
  }

  
var person = objFactory(Angel, 'Kevin', '18');
console.log(person.strength, person.age) // 60 "18"