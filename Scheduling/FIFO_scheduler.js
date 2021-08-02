export class fifo_scheduler{
    constructor(created){
        this.created = created;                 // 생성된 process list
        this.len = created.length;              // process 총 개수
        this.running = [];                      // 실행되고 있는 process
        this.waiting = [];                      // 대기 상태 process
        this.terminated = [];                   // 종료 상태 process
    }
    init(){
        this.created.forEach((el) => el.print());               // 출력
        for(var i=0; i<this.len; i++){
            if(i==0) this.created[i].change_status("running");      // 먼저 들어온 process 상태 변경
            else this.created[i].change_status("waiting");          // 나머지 상태 변경
        }
        this.running.push(this.created[0]);                     // 먼저 들어온 process를 실행 상태에 넣음
        for(var i=1; i<this.len; i++){
            this.waiting.push(this.created[i]);                 // 나머지 process는 대기 상태에 넣음
        }
        console.log('.');
    }
    scheduling(){
        this.init();
        while(this.running.length != 0){                    // 더 이상 running에 없을 때 까지 돌림
            this.running[0].increase_time();                // 1초 증가
            this.created.forEach((el) => el.print());           // 모든 프로세스 정보 출력
            if(this.running[0].is_max()){                       // running process가 종료된 경우
                this.running[0].change_status("terminated");    // 종료상태에 추가
                console.log(`------- ${this.running[0].name} is terminated -------`);
                this.terminated.push(this.running.shift());
            }
            else{                                               // running process의 일이 아직 남은 경우
                this.running[0].change_status("waiting");       // 대기 상태에 추가
                this.waiting.push(this.running.shift());
            }
            if(this.waiting.length!=0){                         // 대기중인 process가 있는 경우
                this.running.push(this.waiting.shift());        // 가장 먼저 들어온 process를 running 상태에 넣어줌
                this.running[0].change_status("running");
            }
            console.log('.');
        }
        this.created.forEach((el) => el.print());           // 프로세스 종류 후 모든 프로세스 정보 출력
        console.log("모든 프로세스가 종료되었습니다.");
    }
}