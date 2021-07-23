module.exports._init = (stackSize, heapSize) => {
  // [StackwholeSize, StackusedSize, Stackavailable, HeapwholeSize, HeapusedSize, Heapavailable]  
  let stackArray = [];
  let heapArray = [];
  stackArray.length = stackSize;
  heapArray.length = heapSize;
  for(let i=0 ; i<stackSize ; i++) stackArray[i] = false;
  for(let i=0 ; i<heapSize ; i++) heapArray[i] = false;

  return [stackArray, heapArray]
}

module.exports.setSize = (map, key, value) => {
  map.set(key, value);
}

module.exports.malloc = (stack, heap, stackpointer, map, type, count, heapSize, stackaddress) => {
  typeSize = map.get(type);
  wholeSize = typeSize * count;
  let baseAddress = 0;
  for(baseAddress = 0 ; baseAddress<heapSize ; baseAddress++)
    if(heap[baseAddress] === false)
      break;
  for(let i=baseAddress ; i<baseAddress+wholeSize ; i++) heap[i] = true;
  stackpointer.set(`0x${stack.lastIndexOf(false).toString(16).padStart(8, '0')}`, [`0x${baseAddress.toString(16).padStart(8, '0')}`, wholeSize, type, true]);
  // console.log(typeof(stack.lastIndexOf(false).toString(16).padStart(8, '0')));
  for(let i=stackaddress ; i>stackaddress-4 ; i--) stack[i] = true;
  return `0x${stack.lastIndexOf(false).toString(16).padStart(8, '0')}`;
}

module.exports.free = (heap, stackpointer, address) => {
  try{
    heapAddress = stackpointer.get(address)[0];
    thatSize = stackpointer.get(address)[1];
    // console.log(`temp=${temp}`);
    // console.log(`addresstype:${typeof(address)}`);
    // console.log(`stackpointer=${stackpointer}`);
    // console.log(stackpointer);
    // console.log(`address=${address}`);
    console.log(heapAddress, thatSize);
    for(let i=parseInt(heapAddress) ; i<thatSize ; i++) heap[i] = true;
    stackpointer.delete(address);
    console.log(stackpointer);
  } catch (err) {
    console.log(`잘못된 Stack 영역 포인터 주소입니다.`);
  }
}

module.exports.call = (stack, callstack, name, paramCount) => {
  if(8 + 4 * paramCount > stack.length) { console.log(`Stack 용량을 초과합니다.`); return; }
  callstack.push(name); // 수정해야할 수 있음 뒤 함수 구현할때
  sp = stack.lastIndexOf(false);
  ret = sp;
  for(let i=sp ; i>sp - 8 - 4 * paramCount ; i--) stack[i] = true;
  return ret;
}

module.exports.returnf = (callstack, name) => {
  if(callstack.length === 0) console.log(`call Stack이 비었습니다.`);
  else if(callstack[callstack.length-1] === name) callstack.pop();
  else console.log(`call Stack의 마지막 함수 이름과 다릅니다.`);
}

module.exports.usage = (stack, heap) => {
  ret = "";
  stackUsing = 0;
  heapUsing = 0;
  for(let i=0 ; i<stack.length ; i++) if(stack[i]) stackUsing++;
  for(let i=0 ; i<heap.length ; i++) if(heap[i]) heapUsing++;
  ret += `Stack 영역 전체 용량 : ${stack.length}\n`;
  ret += `Stack 사용중인 용량 : ${stackUsing}\n`;
  ret += `Stack 남은 용량 : ${stack.length - stackUsing}\n`;
  ret += `Heap 영역 전체 용량 : ${heap.length}\n`;
  ret += `Heap 사용중인 용량 : ${heapUsing}\n`;
  ret += `Heap 남은 용량 : ${heap.length - heapUsing}`;

  return ret;
}

module.exports.heapdump = (type, stackpointer) => {
  ret = "--- Heap 영역 정보 ---\n";
  // console.log(stackpointer.keys());
  stackpointer.forEach((value, key) => ret += `Heap 시작 주소 ${value[0]} 에 ${value[2]} 자료형이 ${value[1] / type.get(value[2])}개 만큼 담긴 영역의 Stack pointer 주소 : ${key}\n`);

  return ret;
}

module.exports.garbageCollect = (stackpointer) => {
  stackpointer.forEach((value, key) => {
    if(!value[3]) stackpointer.delete(key);
  });
  console.log(`heap에 할당된 영역의 주소가 stack에 담겨있지 않은 heap 공간을 삭제했습니다.`);
}