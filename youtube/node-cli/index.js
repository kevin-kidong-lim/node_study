#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear();

// rl.question('hi ...', (ans) => {
//     // 
//     if ( ans === 'y'){
//         console.log('yyyy');
//     }else if( ans === 'n'){
//         console.log('nnnnn');
//     }else{
//         console.log('y or n ');
//     }
//     rl.close();
// });
// 재귀 함수 .
const answerCallback = (ans) => {
    if ( ans === 'y'){
        console.log('yyyy');
        rl.close();
    }else if( ans === 'n'){
        console.log('nnnnn');
        rl.close();
    }else{
        console.clear();
        console.log('y or n ');
        rl.question('input y or n :', answerCallback);
    }
    
}

// console.log('Hello CLI', process.argv);
rl.question('input y or n :', answerCallback);
/**
 * 
 * C:\WORKdev\NodeStudy\node_study\youtube\node_cli>npm i -g
 * package.json 에 bin: cli 추가한후
 * 글로벌에 등록을 해줘야 실행 가능하다.
 */
