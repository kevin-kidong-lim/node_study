/**
 *  express.Router
 *  app.js 가 길어지는것을 막을 수 있음.
 *  userRouter의 get은 /user 와 / 가 합쳐져서 Get /user/ 가 됨.
 *  
 *  ./routes 폴더 index.js 참조.
 * 
 *   nunjucks 템팔릿 엔진 설치
 *  npm i nunjucks
 */ 


const express = require('express');
const path = require('path');
const morgan = require('morgan');  // 요청과 응답을 기록 ..
const cookieParser = require('cookie-parser');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');
const nunjucks = require('nunjucks');

const indexRouter = require('./routes');
const userRouter = require('./routes/user');


/**
 * multer 안에 4가지의 미들웨어가 존재한다.
 */

const app = express();

app.set('port', process.env.PORT || 3000);

// // Pug setting 
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// Nunjucks setting
app.set('view engine', 'html');
nunjucks.configure('views',{
    express: app,
    watch: true,
})

app.use(morgan('dev')); // 개발시 

app.use(cookieParser('keyboardcat')); // 쿠키 파싱 .
//app.use(process.env.COOKIE_SECRET); // 쿠키 환경변수에 서 가져옴. .

// app.use('/', express.static(__dirname, 'http'));

// body-parser 대신 사용함.
app.use(express.json());   // json 으로 넘겨줄시 .
app.use(express.urlencoded({extended: true}));  // 폼 서브밋시 extended 옵션은 true 로 하면 qs, false 는 queryString
// app.use(session());
app.use(require('express-session')({
     secret: 'keyboardcat', 
     resave: false, 
     saveUninitialized: false,
     cookie:{
         httpOnly: true,
     },
     //name: 'connect.sid',

    }));

app.use('/', indexRouter);
app.use('/user', userRouter);


// app.get('/', (req, res) => {
//     res.send('hello /router');
// });

// 404 미들웨어 처리.
// 라우터에 없는게 여기까지 오니깐..
app.use((req,res,next) =>{
    res.send("404 Not Found");
    //res.status(404).send("404 Not Found");
});

// 에러 미들웨어는 반듯이 4개 있어야 한다..
app.use((err, req,res,next) =>{
    console.error(err);
    res.send(" Occure error");
});

app.listen(app.get('port'), () => {
    console.log('express server running ..');
})
