const func = require("./func");

// init(stackSize())
// stack 메모리는 high address부터 쌓이기 때문에 high address를 base address로 생각했다
console.log("base address: "+func.init({stackSize: 1024, heapSize: 1024}));

// size 설정
func.setSize("boolean", 1);
func.setSize("long", 8);
func.setSize("int", 4);
func.setSize("boolean",2);


console.log(func.malloc("boolean", 100000000));  // 메모리 공간 부족
console.log(func.malloc("boolean", 4)+"에 boolean byte 할당");         // 스택에 4바이트 할당, 힙에 32바이트 할당

// usage 확인, stack_size, stack_using, stack_left, heap_size, heap_using, heap_left
console.log(func.usage());  

// a 호출
func.call("a",2);
console.log("a 호출 후"+func.usage());

// b 호출
func.call("b",3);
console.log("b 호출 후: "+func.usage());

// malloc 할당
console.log(func.malloc("int", 10));
console.log("int malloc 후: "+func.usage());

// c 호출
func.call("c",5);
console.log("c 호출 후: "+func.usage());

// malloc 할당
console.log(func.malloc("long",2));
console.log("long malloc 후: "+func.usage());

// callstack();
console.log(func.callstack());  // a, b, c가 순서대로 호출되야함

// c 리턴
func.returnf("c");          // long으로 malloc과 c 함수가 사라짐
console.log("c,long malloc 없어진 후:"+func.usage());

// callstack();
console.log(func.callstack());  // a, b 호출

// heapdump();
console.log(func.heapdump());  // 사용중인 heap 출력, stack에 long malloc이 없음에도 출력되는게 보임

func.garbageCollect();  // long으로 malloc 한 것을 없앰

console.log(func.heapdump());   // long malloc이 사라진걸 볼 수 있음

func.free("0x07DF");            // 0x07DF 스택에 있는 int malloc을 해제함, 스택에 주소는 남아있음

console.log(func.heapdump());   // 해제 된 것을 볼 수 있음

console.log(func.usage()); 
// stack에 boolean malloc 4, a의 2+4+8=14, b의 3+4+8=15, int malloc 4
// heap에는 32byte만 쓰고 있는걸 볼 수 있다