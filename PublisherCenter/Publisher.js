import {event} from './Event.js'

export class publisher{
    constructor(sender, center){
        this.sender = sender;
        this.center = center;
    }
    stringify(){                        // 정보 출력
        return `Publisher name = "${this.Sender}"`;
    }
    sendEvent(EventName, Data){                     // 이벤트 발생
        let new_event = new event(EventName,this.sender, Data);
        this.center.postEvent(new_event)
    }
}


