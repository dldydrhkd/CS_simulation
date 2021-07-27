const return_address = (num) =>{
  var str = num.toString(16);
  var temp = "";
  for(var i = 0; i<4-str.length; i++){
      temp+='0';
  }
  return (temp+str).toUpperCase();
}

module.exports = {
  init({stackSize, heapSize} = {}){
     this.STACK_SIZE = stackSize;
     this.HEAP_SIZE = heapSize;
     this.low_address = 0;
     this.high_address = stackSize+heapSize;
     this.current_stack_point = stackSize+heapSize;
     this.current_heap_point = 0;
     this.type = new Map();
     this.st = []
     this.heap = []
     return "0x"+return_address(stackSize+heapSize);
  },
  setSize(type, length){
      if(this.type.has(type)){
          console.log("한번 지정한 type은 변경할 수 없습니다.");
      }
      this.type.set(type,length);
  },
  malloc(type, count){
      var res;
      if(this.type.has(type)){
          var allocate_length;
          if(this.type.get(type) < 8){
              allocate_length = 8*count;
          }
          else{
              allocate_length = count*this.type.get(type);
          }
          if(allocate_length > this.HEAP_SIZE-this.current_heap_point || this.STACK_SIZE-(this.high_address-this.current_stack_point)<4){
              return("메모리 공간 부족");
          }
          else{
              res = this.current_stack_point;
              this.st.push({name:"malloc", type:"pointer", heap_addr:this.current_heap_point, size:4, address:this.current_stack_point});
              this.heap.push({name:"malloc", type:type, stack_addr:this.current_stack_point, size: allocate_length, address:this.current_heap_point}); // heap 할당
              this.current_heap_point = this.current_heap_point+allocate_length;
              this.current_stack_point = this.current_stack_point-4;
              return "0x"+return_address(res);
          }
      }
  },
  free(pointer){
      let heap_addr;
      this.st.forEach(element => {
          if(element.address == pointer.toString(10)){
              element.type = 'empty';
              heap_addr = element.heap_addr;
          }
      });
      for(var i=0; i<this.heap.length; i++){
          if(this.heap[i].address==heap_addr){
              this.current_heap_point -= this.heap[i].size;
              for(var j=i+1; j<this.heap.length; j++){
                  this.heap[j].address -= this.heap[i].size;
                  for(var k=0; k<this.st.length; k++){
                      if(this.st[k].address==this.heap[j].stack_addr){
                          this.st[k].heap_addr = this.heap[j].address;
                          break;
                      }
                  }
                  this.heap[j].current_heap_point -= this.heap[i].size;
              }
              this.heap.splice(i,1);
              break;
          }
      }
  },
  call(name, paramCount){
      let allocate_length = 8+4+paramCount;
      if(allocate_length > this.STACK_SIZE-(this.high_address-this.current_stack_point)){
          console.log("메모리 공간 부족");
      }
      else{
          this.st.push({name:name, type:"call", size:allocate_length, address:this.current_stack_point});
          this.current_stack_point-=allocate_length;
      }
  },
  returnf(name){
      for(var i=this.st.length-1; i>=0; i--){
          if(this.st[i].type=="call" && this.st[i].name==name){
              this.current_stack_point=this.st[i].address;
              this.st = this.st.slice(0,i);
              break;
          }
      }
  },
  usage(){
      var stack_left = this.STACK_SIZE-(this.high_address-this.current_stack_point)
      var stack_using = this.high_address-this.current_stack_point;
      var heap_left = this.HEAP_SIZE-this.current_heap_point;
      var heap_using = this.current_heap_point;
      return [this.STACK_SIZE,stack_using,stack_left,this.HEAP_SIZE,heap_using,heap_left];
  },
  callstack(){
      let call_list = "";
      this.st.forEach(element => {
          if(element.type=="call"){
              call_list += element.name+"() "+"0x"+return_address(element.address) + " -> ";
          }
      });
      return call_list.slice(0,-4);
  },
  heapdump(){
      let heap_list = [];
      this.heap.forEach(element => {
          if(element.name == "malloc"){
              heap_list.push([element.type, element.size+"byte", "0x"+return_address(element.stack_addr)]);
          }
      });
      return heap_list;
  },
  garbageCollect(){
      for (var i=0; i<this.heap.length; i++){
          var exist = false;
          for(var j=0; j<this.st.length; j++){
              if(this.heap[i].address == this.st[j].heap_addr){
                  exist = true;
                  break;
              }
          }
          if(!exist){
              for(var j=i+1; j<this.heap.length; j++){
                  for(var k=0; k<this.st.length; k++){
                      if(this.st[k].name == "malloc" && this.st[k].heap_addr==this.heap[j].address){
                          this.st[k].heap_addr-=this.heap[i].size;
                          break;
                      }
                  }
                  this.heap[j].address -= this.heap[i].size;
              }
              this.current_heap_point -= this.heap[i].size;
              this.heap.splice(i,1);
              i--;
          }
      }
  }
}