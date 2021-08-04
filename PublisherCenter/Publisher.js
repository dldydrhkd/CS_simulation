import {event} from './Event.js'

export class publisher{
    constructor(sender, center){
        this.sender = sender;
        this.center = center;
    }
    stringify(){
        return `Publisher name = "${this.Sender}"`;
    }
    sendEvent(EventName, Data){
        let new_event = new event(EventName,this.sender, Data);
        this.center.postEvent(new_event)
    }
}


