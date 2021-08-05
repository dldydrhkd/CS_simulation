class manager{
    constructor(pos, chef_list, eventQueue){
        this.pos = pos;                         // pos기
        this.chef_list = chef_list;             // 요리사들의 list
        this.eventQueue = eventQueue;           // event Q
    }
    findChef(){
        return this.chef_list.find((chef) => chef.getState() == 'free');  // 놀고 있는 chef를 찾는다.
    }
    makeChefWork(chef){
        chef.start();                                   //요리사에게 일을 시킨다.
    }
    addNewOrder(food){
        this.eventQueue.emit('newOrder',food);          // newOrder event 호출
    }
    showBoard(){
        this.eventQueue.emit('showBoard',this.chef_list);       // showBoard 이벤트 호출
    }
}

module.exports = manager;