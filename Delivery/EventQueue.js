const EventEmitter = require('events');

class EventQueue extends EventEmitter{              // EventEmitter를 상속받는다.
    constructor(){
        super();                              
        this.cook_list = [];                    // 매니저로부터 받은 list
        this.completed_list = [];               // 완료된 모든 요리 리스트
    }
    pop(){
        this.cook_list.shift();                 // pop()
    }
    top(){
        return this.cook_list[0];               // top()
    }
    isEmpty(){
        return this.cook_list==0;               // 비어있는지 확인
    }
}

let eventQueue = new EventQueue();              // event Q

eventQueue.on('newOrder',function(food){            // 매니저가 pos에서 주문을 받아 오더한 경우
    console.log(`${food.getName()} 주문 완료.`);        // 주문 완료 출력
    this.cook_list.push(food);                      // cook_list에 음식 추가
});

eventQueue.on('cookStart', function(chefName, food){                // 요리를 시작
    console.log(`${chefName}가 ${food.getName()} 요리를 시작합니다.`);
});

eventQueue.on('cookEnd', function(chefName, food){              // 요리를 끝냄
    console.log(`${chefName}의 ${food.getName()}의 요리가 끝났습니다.`);    // 요리 끝 출력
    this.completed_list.push([chefName,food]);      // 완료 list에 배열로 추가
})

eventQueue.on('showBoard', function(chef_list){         // showBoard
    let str = '=========대기중인 음식=========\n';
    for (var li of this.cook_list){                  
        str += '주문번호 : '+li.getOrderNum()+ ', 음식 : '+ li.getName() + '\n';
    }
    console.log(str+'\n');                      // 대기중인 음식 출력

    str = '=========요리중인 음식=========\n';
    for (var chef of chef_list){
        if (chef.getState() == 'busy'){
            str += `아직 ${chef.getName()}가 ${chef.getFood().getName()}를 요리중입니다.\n`;
        }
    }
    console.log(str);                       // 요리중인 음식 출력

    str = '=========완성된 음식=========\n';
    for (var li of this.completed_list){
        str += `주문번호: ${li[1].getOrderNum()} ${li[0]}의 ${li[1].getName()}\n`;
    }
    console.log(str);                       // 완성된 음식 출력
})

module.exports = eventQueue;