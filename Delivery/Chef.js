class chef{
    constructor(name, eventQueue){
        this.name = name;
        this.eventQueue = eventQueue;
        this.state = 'free';
        this.food;
        this.time = -1;
    }
    getName(){
        return `Chef ${this.name}`;             // 이름 반환
    }
    getState(){
        return this.state;                      // 상태 반환
    }
    getFood(){
        return this.food;                       // 음식 반환
    }
    start(){
        this.state = 'busy';                        // state 설정
        this.food = this.eventQueue.top();        // 첫번째를 꺼낸다.
        this.time = this.food.getDuration();        // duration 설정
        this.eventQueue.pop();                      // eventQueue에서 pop
        this.eventQueue.emit('cookStart',this.getName(), this.food);    // 요리 시작 이벤트
    }
    end(){
        this.state = 'free';                            // state 설정
        this.eventQueue.emit('cookEnd', this.getName(), this.food);     // 요리 끝 이벤트
        this.food = null;
        this.time = -1;
    }
    minus_time(){
        if(this.state == 'busy') this.time--;               // 요리중일 경우 time -1
        if(this.time==0) this.end();                        // 끝난 경우 end함수 호출
    }
}

module.exports = chef;