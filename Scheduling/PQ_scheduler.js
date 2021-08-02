import { fifo_scheduler } from "./FIFO_scheduler.js";
import {PriorityQueue} from './Priority_queue.js';

export class pq_scheduler extends fifo_scheduler{           // fifo의 구조를 상속 받음
    constructor(created){
        super(created);
        this.waiting = new PriorityQueue();                 // 우선순위를 위한 priority_queue
    }
    init(){
        this.created.forEach((el) => {                      // 모든 process의 정보를 출력하고 대기상태에 넣음
            el.print();
            this.waiting.enqueue(el.get_priority(), el);
            el.change_status("waiting");
        });                   // 시작
        let top = this.waiting.dequeue().value;             // 가장 우선순위가 높은 process를 대기상태에서 running 상태로 바꿈
        top.change_status('running');
        this.running.push(top);
        console.log('.');
    }
    scheduling(){
        this.init();
        while(this.running.length != 0){                    // running 상태에 process가 없을 때 까지
            this.running[0].increase_time();                // running 상태의 process time 증가
            this.created.forEach((el) => el.print());       // 모든 process의 정보 출력
            if(this.running[0].is_max()){                       // running에 있던 프로세스가 종료된 경우
                this.running[0].change_status("terminated");        // 종료 상태로 변경
                console.log(`------- ${this.running[0].name} is terminated -------`);
                this.terminated.push(this.running.shift());
            }
            else{                                           // running에 있던 프로세스가 아직 종료되지 않은 경우
                let tmp = this.running.shift();                 // 대기 상태에 추가
                tmp.change_status("waiting");
                this.waiting.enqueue(tmp.get_priority(), tmp);
            }
            if(!this.waiting.isEmpty()){                        // 대기 상태에 process가 있는 경우
                this.running.push(this.waiting.dequeue().value);    // 우선순위가 높은 process를 running 으로 바꿈
                this.running[0].change_status("running");
            }
            console.log('.');
        }
        this.created.forEach((el) => el.print());
        console.log("모든 프로세스가 종료되었습니다.");
    }
}