class PublisherCenter{                          // PublisherCenter
    constructor(){
        this.subscribers = new Map();
    }
    sharedInstance(){                           // 본인 return
        return this;
    }
    addSub(sub){                                // 구독자 추가
        this.subscribers.set(sub.name, sub);
    }
    removeSub(name){                             // 구독자 삭제
        this.subscribers.delete(name);
    }
    postEvent(event){                            // event 전달
        const event_to_sub = [];

        for (var value of this.subscribers.values()){
            if (value.info.is_both_same(event)) event_to_sub.push(value);
        }
        event_to_sub.forEach((sub) => sub.getEvent(event));
    }
    stringify(){                                // 정보 출력
        let cnt = 1;
        for (var value of this.subscribers.values()){
            console.log(`Subscriber#${cnt} : ${value.stringify()}\n` );
            cnt++;
        }
    }
}

export class PublisherCenterToSingleton {                   // singleton
    constructor() { 
        if (!PublisherCenterToSingleton.instance) { 
            PublisherCenterToSingleton.instance = new PublisherCenter();
        } 
        return PublisherCenterToSingleton.instance;
    }
    sharedInstance(){
        return this.instance;
    }
    addSub(sub){
        return this.instance.addSub(sub);
    }
    removeSub(sub){
        return this.instance.removeSub(sub);
    }
    postEvent(pub, event){
        return this.postEvent(pub, event);
    }
    stringify(){
        return this.stringify();
    }
} 
