function Sport(){

}
Sport.prototype = {
    // 模块，按顺序执行
    init:function(){
        this.stretch()
        this.jog()
        this.deepBreath()
        this.start()

        var free = this.end();

        if(free !== false){
            this.stretch()
        }
    },
    // 拉伸
    stretch:function(){
        console.log('拉伸')
    },
    // 慢跑
    jog: function(){
        console.log('慢跑')
    },
    // 深呼吸
    deepBreath:function(){
        console.log('深呼吸')
    },
    // 开始运动
    start:function(){
        throw new Error('子类必须重写此方法')
    },
    // 结束运动
    end:function(){
        console.log('运动结束')
    }
}

function Basketball(){

}
Basketball.prototype = new Sport()

Basketball.prototype.start = function(){
    console.log('先投上几个三分')
}
Basketball.prototype.start = function(){
    console.log('运动结束了,有事先走一步')
    return false
}

// 马拉松
function Marathon() {

}

Marathon.prototype = new Sport();

var basketball = new Basketball();
var marathon = new Marathon();

// 子类调用，最终会按照父类定义的顺序执行
basketball.init();
marathon.init();

