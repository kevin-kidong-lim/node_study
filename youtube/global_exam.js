const string = 'abc';
const number =1
const boolean = true;
const obj = {
    outSide:{
        inSide:{
            key:'value',
        },
    },
};

console.time('전체시간');
console.log('평범한 로깅');
console.log(string, number, boolean);
console.error('에러 메시지는 console.error에 담자');

console.table([{name:'kevin', birth:1981}, {name:'hero', birth:1988}]);

console.dir(obj, {color:false, depth:2} );
console.dir(obj, { color: true, depth:1} )

console.time('start_time');
for(let i=0; i < 10000; i++){}
console.timeEnd('start_time');

function b(){
    console.trace('에러 위치 추적');
}
function a(){
    b();
}
a();

console.timeEnd('전체시간');