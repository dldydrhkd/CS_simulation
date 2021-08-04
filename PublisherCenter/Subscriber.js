import { subinfo } from "./SubInfo.js";

export class subscriber{
    constructor(name, EventName, sender, center){
        this.name = name;
        this.center = center;
        this.info = new subinfo(name, EventName, sender);
    }
    getEvent(event){                                // event를 받을 시 출력
        console.log(`subsriber${this.name}: ${event.EventName} event from ${event.Sender} userData=${JSON.stringify(event.Data)}\n`);
    }
    stringify(){                                    // 정보 출력
        return `event name = "${this.info.EventName}", sender = ${this.info.Sender}`;
    }
    subscribe(){                                    // 구독
        this.center.addSub(this);
    }
}