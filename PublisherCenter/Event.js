export class event{
    constructor(EventName, Sender, Data=undefined){
        this.EventName = EventName;
        this.Sender = Sender;
        this.Data = Data;
    }
}