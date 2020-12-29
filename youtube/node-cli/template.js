
const fs = require('fs');
const fath = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || '.';

const htmlTemplate = `
<html>
    <body>
        <h1>Hello</h1>
        <p>CLI</p>
        </body>
 </html>`;

 const routerTemplate = `const express = require('express');
 const router = express.Router();
 
 router.get('/', (req, res,next) => {
     try{
         res.send('ok');

     }catch(error){
         console.error(error);
         next(error);
     }
 });
 module.exports = router;`;

const mkdirp = (dir) => {
    const dirname = path
    .relative(' '.path.normalize(dir))
    .split(path.seq)
    .filter(p => !!p);
    dirname.forEach((d, idx) => {
        const pathBuilter = dirname.slice(0, idx +1).join(path.sep);
        if(!exist(pathBuilter)){
            fs.mkdirSync(pathBuilter);
        }
    })
}
const makeTemplate = () => {
    mkdirp(directory);
    if ( type === 'html'){
        const pathToFile = path.join(directory, `${name}.html`);
        if(exist(pathToFile)){
            console.error('이미 파일이 존재합니다');
        }else{
            fs.writeFileSync(pathToFile, htmlTemplate);
            console.log(pathToFile, '생성 완료');
        }

    }
};
 const program = () => {
     if ( !type || !name){
         console.error('사용방법; cli html express-router 파일명 [생성경로]')
     }else{
         makeTemplate();
     }
 };