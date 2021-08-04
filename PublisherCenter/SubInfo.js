export class subinfo{
    constructor(subName, EventName, Sender){
        this.subName = subName;
        this.EventName = EventName;
        this.Sender = Sender;
    }
    is_EventName_same(event){               // 이벤트 이름이 같은지 확인
        if(this.EventName === "") return true;
        if(this.EventName === event.EventName) return true;
        return false;
    }
    is_sender_same(event){                  // sender가 같은지 확인
        if(this.Sender === undefined) return true;
        if(this.Sender === event.Sender) return true;
        return false;
    }
    is_both_same(event){                    // 둘다 같은지 확인
        return this.is_EventName_same(event) && this.is_sender_same(event);
    }
}