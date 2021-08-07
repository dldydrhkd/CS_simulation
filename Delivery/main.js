const readline = require('readline');
const menu = require('./menu.js');
const chef = require('./Chef.js');
const pos = require('./pos.js');
const manager = require('./manager.js');
const eventQueue = require('./EventQueue.js');

const num_chef = 3              // 요리사의 수
const menuCount = 3;            // 메뉴의 개수

let chef_list = [];             // 요리 리스트
let menu_list = [];             // 메뉴 리스트

for(var i=0; i<num_chef; i++){                                          
    chef_list.push(new chef(String.fromCharCode(65+i),eventQueue));     // 요리사 생성
}

menu_list.push(new menu('라면', 3));                // 라면 메뉴 생성
menu_list.push(new menu('떡볶이', 7));               // 떡볶이 메뉴 생성
menu_list.push(new menu('닭볶음탕', 15));               // 닭볶음탕 메뉴 생성

let p = new pos(menu_list);                             // pos기 생성
let man = new manager(p, chef_list, eventQueue);        // 매니저 생성

const rl = readline.createInterface({               
    input : process.stdin,
    output : process.stdout,
})

var cnt = 1;

const main = setInterval(() => {
    console.log('...');                         // 1분이 지날때마다 ... 출력
    for(var i=0; i<chef_list.length; i++){
        chef_list[i].minus_time();              // 일을 받은 요리사들은 요리되고 있는 요리의 시간을 줄인다.
    }
    while(!p.isEmpty()){                        // pos기가 비어있지 않다면
        man.addNewOrder(p.top());               // 매니저가 새로운 주문을 한다.
        p.pop();
    }
    while(!eventQueue.isEmpty()){               // eventQueue가 비어있지 않다면
        let tmpChef = man.findChef();           // 매니저가 일 안 하는 요리사를 찾는다.
        if(tmpChef) man.makeChefWork(tmpChef);       //일 안 하는 요리사를 찾으면 요리사에게 일을 시킨다.
        else break;
    }
    // 입력 받기
    rl.question('',(answer)=>{
        if(answer.match(/[1-9]:[1-9]*/)){
            let [foodNum, foodCnt] = answer.split(':');     // 입력을 받는다.
            p.push(cnt,foodNum-1, foodCnt);                   //  입력된 값을 pos기의 queue에 쌓는다
            cnt+=Number(foodCnt);
        }
        else if(answer == 'q'){
            console.log('프로그램 종료');           // quit
            rl.close();
            clearInterval(main);
        }
        else if(answer == 's'){
            man.showBoard();                        // 메뉴 현황
        }
    })
},1000);