import {isPerfect, isAbundant, isDeficient, isPrime} from "./functional.js";

const isSquared = (n) => {Math.sqrt(n)%1 === 0};  //closure 사용

let num = Array(100).fill().map((x,i) => i+1);     // map 사용

const filter_prime = () => num.filter((el) => isPrime(el)); // filter 사용, 함수 합성

console.log(filter_prime());    

function number_feature(){
    let arr = Array(100).fill().map((x,i) => i+1);
    return function(){                  // closure 사용
        let features = arr.reduce(function(acc,cur){    // reduce를 통한 출력
            let tmp = String(cur)+" : ";
            if(isPerfect(cur)) tmp += "perfect, ";
            if(isAbundant(cur)) tmp += "abundant, ";
            if(isDeficient(cur)) tmp += "deficient, ";
            if(isSquared(cur)) tmp += "squared, ";
            if(isPrime(cur)) tmp += "prime, ";
            return acc += tmp.slice(0, -2) + "\n\n";
        }, "");     // acc 시작은 "" 로 시작
        return features;
    }; 
}

let a = number_feature();       //은닉화 완료

console.log(a());