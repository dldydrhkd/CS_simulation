export class subinfo{
    constructor(subName, EventName, Sender){
        this.subName = subName;
        this.EventName = EventName;
        this.Sender = Sender;
    }
    is_EventName_same(event){
        if(this.EventName==="") return true;
        if(this.EventName === event.EventName) return true;
        return false;
    }
    is_sender_same(event){
        if(this.Sender === undefined) return true;
        if(this.Sender === event.Sender) return true;
        return false;
    }
    is_both_same(event){
        return this.is_EventName_same(event) && this.is_sender_same(event);
    }
}