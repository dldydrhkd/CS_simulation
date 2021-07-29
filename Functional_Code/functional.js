function classifierAlpha(number, f){
    return f(number);
}

function isFactor(number, factor){        // 해당 숫자가 약수인지 확인
    return number%factor==0;
}

function factors(number){         //number의 약수인 것들을 모두 반환
    var factorSet = new Set();
    for (var pod = 1; pod <= Math.sqrt(number); pod++) {
        if (isFactor(number, pod)) {
            factorSet.add(pod);
            factorSet.add(number / pod);
        }
    }
    return factorSet;
}

function sum(factors){          // 약수들을 모두 더한다.
    var total = 0;
    factors.forEach( (factor) => {
        total += factor;
    });
    return total;
}

export function isPerfect(number){         // 모두 더한 약수의 값들에서 number를 뺐을 때 number인지 확인
    return (sum(factors(number))-number) == number;
}

export function isAbundant(number){            // 약수를 모두 더한 값에서 number를 뺐을 때 number보다 크면 Abundant
    return (sum(factors(number))-number) > number;
}

export function isDeficient(number){           // 약수를 모두 더한 값에서 number를 뺐을 때 number보다 작으면 Deficient
    return (sum(factors(number))-number) < number;
}

function primeAlpha(number){             
    console.log(`${number}은 소수인가요? `+isPrime(number));
}

function equalSet(aset, bset) {          // number들의 약수들과 primeSet을 받아 set이 올바른지 확인
    if (aset.size !== bset.size) return false;
    return true;
}

export function isPrime(number) {             //  prime인지 확인 하는 함수
    var primeSet = new Set([1, number]);
    return number > 1 && equalSet(factors(number), primeSet);
}


console.log(classifierAlpha(10, isPerfect));
console.log(classifierAlpha(10, isAbundant));
console.log(classifierAlpha(10, isDeficient));

for(var i=0; i<100; i++){
    primeAlpha(i);
}