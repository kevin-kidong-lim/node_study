
const value = require('./var');
// console.log(value);

const o_odd = value.odd;
const o_even = value.even;
// console.log('o_odd', o_odd)
// console.log('o_even', o_even)

// git test
const {odd, even} = require('./var');
// console.log('o2_odd', odd)
// console.log('o2_even', even)

function checkOddOrEven(number){
    console.log('checkOddOrEven:')
    if (number % 2){
        return odd;
    }else{
        return even;
    }
}
module.exports = checkOddOrEven;