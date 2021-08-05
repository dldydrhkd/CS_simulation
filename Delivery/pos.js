const menu = require('./menu.js');

class pos{
  constructor(menu_list){
    this.menu_list = menu_list;               // menu_list
    this.queue = [];                          // 주문 list
  }
  push(order_num, food_num, cnt){
    for(var i=0; i<cnt; i++){         
      let name = this.menu_list[food_num].getName();        
      let du = this.menu_list[food_num].getDuration();
      this.queue.push(new menu(name, du, Number(order_num)+i));                  // 새 객체를 만들어 개수만큼 큐에 넣는다.
    }
  }
  pop(){
    this.queue.shift();           //queue의 앞에 있는 것을 뺀다.
  }
  top(){
    return this.queue[0];             // 가장 앞에 있는 걸 return 한다.
  }
  isEmpty(){
    return this.queue == 0;        // 비어있는지 확인한다.
  }
}

module.exports = pos;