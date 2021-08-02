class Heap{
    constructor(){
        this.heap = [];                 // heap 배열
    }
    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;              // 해당 노드의 왼쪽 자식의 인덱스를 가져옴
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;          // 해당 노드의 오른쪽 자식의 인덱스를 가져옴
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);  // 해당 노드의 부모 인덱스를 가져옴

    peek = () => this.heap[0];                                          // 부모노드를 반환

    insert = (key, value) =>  {                             // key, value로 노드를 heap에 push
        const node = {key, value};
        this.heap.push(node);
        this.heapifyUp();                                   // heap_up을 통해 작은 값이 위로 가도록 힙을 재구성 한다.
    }

    heapifyUp = () =>{
        let index = this.heap.length - 1;                   // 마지막 index를 가져옴
        const lastInsertedNode = this.heap[index];          // 마지막에 저장된 node를 가져옴

        while(index > 0){                                   // root 노드가 아니면
            const parentIndex = this.getParentIndex(index);         // 부모노드의 index를 저장

            if(this.heap[parentIndex].key > lastInsertedNode.key){      //부모의 key가 자식의 key보다 크면 스위치를 한다.
                this.heap[index] = this.heap[parentIndex];              // 자식이 있던 곳에 부모를 넣음
                index = parentIndex;                                    // index를 부모의 index로 교체
            }
            else break;
        }

        this.heap[index] = lastInsertedNode                     // 해당 index에 삽입했던 node를 저장
    }

    remove = () => {
        const count = this.heap.length;                         // heap 길이를 가져옴
        const rootNode = this.heap[0];                          // root node를 가져옴

        if (count <= 0) return undefined;                       // count가 0이면 return
        if (count === 1) this.heap = [];                        // count가 1개면 this.heap 초기화
        else{
            this.heap[0] = this.heap.pop();                     // root node에 마지막 노드를 봍이고 down heap 진행
            this.heapifyDown();
        }
        return rootNode;                                        // root node 반환
    }

    heapifyDown = () => {
        let index = 0;                                         
        const count = this.heap.length;                        
        const rootNode = this.heap[index];
    
        while (this.getLeftChildIndex(index) < count) {             // 자식노드가 heap_size 보다 작을때까지
          const leftChildIndex = this.getLeftChildIndex(index);             // 왼쪽 자식을 가져옴
          const rightChildIndex = this.getRightChildIndex(index);           // 오른쪽 자식을 가져옴
    
          const smallerChildIndex =
            rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key ? rightChildIndex : leftChildIndex;   // key가 더 작은 노드의 index를 가져옴
    
          if (this.heap[smallerChildIndex].key <= rootNode.key) {       // 자식이 root보다 작으면 교체한다
            this.heap[index] = this.heap[smallerChildIndex];            // index에 heap에 더 작은 노드를 저장한다
            index = smallerChildIndex;                  // index는 smallerChildIndex로 업데이트
          } else break;
        }
    
        this.heap[index] = rootNode;
      }
}

export class PriorityQueue extends Heap {
    constructor() {
      super();
    }
  
    enqueue = (priority, value) => this.insert(priority, value);                //push
    dequeue = () => this.remove();                                              //pop
    isEmpty = () => this.heap.length <= 0;                                      //비어있는지
  }