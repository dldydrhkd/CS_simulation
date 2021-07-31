
function my_set(array){
    array.sort(function(a,b){
        return a - b;
    });
    var uniqueArr = array.filter((element, index) => {
        return array.indexOf(element) === index;
    });
    return uniqueArr;
}

function sum(base, other){
    var arr = [];
    for(var i=0; i<base.length; i++){
        arr.push(base[i]);
    }
    for(var i=0; i<other.length; i++){
        arr.push(other[i]);
    }
    
    return my_set(arr);
}

function complement(base, other){
    var arr = base.filter(x => !other.includes(x));
    return arr;
}

function intersect(base, other){
    var arr = base.filter(x => other.includes(x));
    return arr;
}

function print_return(array){
    process.stdout.write("리턴값 [");
    for(var i=0; i<array.length; i++){
        process.stdout.write("["+array[i]+"]");
        if(i!=array.length-1){
            process.stdout.write(",");
        }
    }
    process.stdout.write("]  ");
    console.log("//A로 만든 집합 원소 개수는 %d개, B로 만든 집합 원소 개수는 %d개, 합집합 원소 개수는 %d, 차집합 원소 개수는 %d, 공통 원소 개수는 %d\n",array[0].length, array[1].length, array[2].length, array[3].length, array[4].length);
}

function print(arrayA, arrayB, array){
    console.log("매개변수 A = [" + arrayA + "]\n");
    console.log("매개변수 B = [" + arrayB + "]\n");
    console.log("A 집합 = [" + array[0] + "]\n");
    console.log("B 집합 = [" + array[1] + "]\n");
    console.log("합집합sum = [" + array[2] + "]\n");
    console.log("차집합complement = [" + array[3] + "]\n");
    console.log("교집합intersect = [" + array[4] + "]\n\n");
    print_return(array);
}

function solution(arrayA, arrayB){
    var answer = [];
    answer.push(my_set(arrayA));
    answer.push(my_set(arrayB));
    answer.push(sum(my_set(arrayA), my_set(arrayB)));
    answer.push(complement(my_set(arrayA), my_set(arrayB)));
    answer.push(intersect(my_set(arrayA), my_set(arrayB)));
    print(arrayA, arrayB, answer);
    return answer;
}

solution([1,2,3,2],[1,3]);

solution([43,"23", 'c', 'a',11, "51"], [43,'a', 02, 'b', "60","72"]);