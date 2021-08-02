export class process{
    constructor(name, max_time, priority, str){
        this.name = name;
        this.max_time = max_time;
        this.status = "ready";
        this.cur_time = 0;
        this.priority = priority;
        if(str=='single'){                  // sigle thread인 경우
            this.is_single = 1;
            this.thread = 1;
        }
        else if(str=='multi'){              // multi thread인 경우
            this.is_single = 0;
            if(this.max_time==1) this.thread = 1;       // thread가 1인 경우는 2로 나눠지지 않으므로 1로 초기화
            else {
                this.thread = Math.floor(this.max_time/2);
                if(this.thread>4) this.thread = 4;          // thread의 개수가 4가 넘으면 4로 고정
            }
        }
    }
    print(){
        if(this.is_max()){                      // max_time을 넘은 경우 출력
            console.log(`${this.name}(${this.status}),${this.max_time}/${this.max_time}sec`);   
        }
        else{                                   // max_time 못 넘은 경우 출력
            console.log(`${this.name}(${this.status}),${this.cur_time}/${this.max_time}sec`);
        }
    }
    change_status(st){                          // 상태 변경 함수
        this.status = st;
    }
    increase_time(){                        
        if(this.is_single) this.cur_time++;             // single인 경우 1초 증가
        else this.cur_time+=Math.floor(this.thread)*2;      // multi thread인 경우 thread 개수 * 2 증가
    }
    is_max(){                                       // max_time을 넘은 경우 true 반환
        return this.cur_time>=this.max_time;    
    }
    get_priority(){                                  // process의 우선순위를 가져온다
        return this.priority;
    }
}