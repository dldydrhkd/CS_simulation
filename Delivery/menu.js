class menu{
    constructor(name, duration, orderNum){
        this.name = name;
        this.duration = duration;
        this.orderNum = orderNum;
    }
    getName(){
        return this.name;           // 이름 반환
    }
    getDuration(){  
        return this.duration;           // 시간 설정
    }
    getOrderNum(){
        return this.orderNum;           // 주문번호 반환
    }
}

module.exports = menu;