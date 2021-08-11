const one = () => Promise.resolve('One!');

function myFunc(){
  console.log('In function');
  const res = one();
  console.log(res);
}

console.log('Before function!');
myFunc();
console.log('After function!');