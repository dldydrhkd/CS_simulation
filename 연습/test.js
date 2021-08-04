// let test = (text, sample) => {
//   console.log(`${text}, ${sample}`);
// }

// function delay(ms){
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

// async function delay_post(item, sample){
//   await delay(3000);
//   return test(item, sample);
// }

// const EventEmitter = require('events');
// const EventBus = new EventEmitter();

// EventBus.on('call', (msg, sample) => {
//   delay_post(msg, sample);
// });

// EventBus.on('call', (msg, sample)=>{
//   delay_post(msg, sample);
// });

// EventBus.emit('call', 'second message', 'sample');

// const Emitter = require('events');
function getData(callback) {
  // new Promise() 추가
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      // 데이터를 받으면 resolve() 호출
      resolve(response);
    });
  });
}

// getData()의 실행이 끝나면 호출되는 then()
getData().then(function(tableData) {
  // resolve()의 결과 값이 여기로 전달됨
  console.log(tableData); // $.get()의 reponse 값이 tableData에 전달됨
});