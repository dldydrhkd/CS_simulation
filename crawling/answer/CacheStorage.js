module.exports = {
    init({ head = null, tail = null, cacheMaxSize} = {}){
        this.head = head;
        this.tail = tail;
        this.CACHE_MAX_SIZE = cacheMaxSize;
        this.cacheMap = new Map();
    },
    add(id, value = ''){
        let newNode = null;
        if(this.cacheMap.get(id)){
            newNode = this.cacheMap.get(id);
            newNode.hitCount++;

            if(newNode === this.tail) return;

            if(newNode === this.head){
                newNode.next.previous = null;
                this.head = newNode.next;
            }
            else{
                newNode.previous.next = newNode.next;
                newNode.next.previous = newNode.previous;
            }

            newNode.previous = this.tail;
            this.tail.next = newNode;
            newNode.next = null;
            this.tail = newNode;
        }
        else{
            if(this.cacheMap.size === this.CACHE_MAX_SIZE) this.delete();
            newNode = { id, value, hitCount: 1};
            
            this.cacheMap.set(id, newNode);
            if (!this.head){
                this.head = newNode;
            }
            else{
                newNode.previous = this.tail;
                this.tail.next = newNode;
            }
            this.tail = newNode;
        }
    },
    delete(){
        if (!this.head) return;
        const headID = this.head.id;
        nextNode = this.head.next;
        this.head.next.previous = null;
        this.cacheMap.delete(headID);
        this.head = nextNode;
    },
    getCacheData(id){
        const cachedData = this.cacheMap.get(id);
        if(cachedData){
            this.add(id);
        }
        return cachedData;
    },
    getStorages(){
        return this.cacheMap;
    },
};