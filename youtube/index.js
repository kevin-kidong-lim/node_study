const {odd, even} = require('./var');
const checkNumber = require('./func');

console.time('begin');

function checkStringOddOrEven(str){
    console.log('checkStringOddOrEven:')
    if (str.length %2){
        return odd;
    }else{
        return even;
    }
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));

console.timeEnd('begin');