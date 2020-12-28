/**
 *  6-8 세션, 쿠키, 미들웨어 확장법
 * 
 */

const express = require('express');
const path = require('path');
const morgan = require('morgan');  // 요청과 응답을 기록 ..
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const multer = require('multer');
const app = express();


app.set('port', process.env.PORT || 3000);

//D:\Working\node_study\node_study\youtube\6_express>npm i morgan cookie-parser express-session

// express body-parser 는 올드함 대신에 morgan 등 사용함.
// express 
//app.use(morgan('combined')); // 요청과 응답 기록 해줌.
app.use(morgan('dev')); // 개발시 
/**
 * http://localhost/kevin.css > express.static 에서 해당 파일을 찾고 종료함 next()를 실행안함.. 못찾을때는 next()로 다음으로 넘어감.
 * http://localhost/about > express.static /about 을 public 폴더에서 찾지 못했기 때문에 next() 를 실행함.
 */

// 미들웨어 확장법.
// app.use('/', express.static(__dirname, 'html')); // css , js 등 정적파일 사용시.,(요청경로, 실제경로)
// // 세션값이 있을경우 보여주길 원할때..
// app.use('/', (req, res, next) => {
//     if ( req.session.id ){
//         express.static(__dirname, 'html')(req, res, next);
//     }else{
//         next();
//     }
// });

app.use(cookieParser('keyboardcat')); // 쿠키 파싱 .
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
// 폼에서 이미지 나 파일 보낼때는 다른것을 사용함.
app.use(multer().array());


app.use((req, res, next) => {
    console.log('all route...');
    console.log(__dirname)
    next();
});

app.use('/about',(req, res, next) => {
    console.log(' about...');
    req.cookies // { mycookie:'test}
    
    //req.signedCookies; //쿠키 서명.

    let name = 'cooke_kevin';
    res.cookie('name', encodeURIComponent(name),{
        expires: new Date(),
        httpOnly: true,
        path: '/',
    });
    // 쿠키 삭제
    // res.clearCookie('name', encodeURIComponent(name),{
    //     httpOnly: true,
    //     path: '/',
    // });

    next();
});

// 데이타 공유
app.use((req, res, next) => {
    //전체가 공유됨.
    app.set('hello', 'kevin_hello');
    // 미들웨어간 공유
    req.data = 'kevin_data'; 
    // 미들웨어간 세션에서 공유
    //req.session.data = 'aa'
    next();
});


app.get('/se', (req, res, next) => {
    console.log('app.get() : ' + app.get('hello'));
    console.log('req.data : ' + req.data);
    req.session;
    req.session.name = 'kevin';
    console.log('req.session.id :' + req.session.id);
    console.log('req.session.name :' + req.session.name);
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/about', (req, res) => {
    /**
     *   res.writeHead(200,{'Content-Type':' text/html'});
     *   res.end(' end ');
     *  위에 두개가 res.send 로 합쳐진다. express에서는..
     */
    res.setHeader('Content-Type', 'text/html');
    //res.send 는 하나만 사용해야 함.
    res.send('hello about');
   //res.sendFile('hello.html');
   // res.json({ hello: 'kevin'});
   
});

app.get('/', (req, res) => {
    // res.send('hello express');
    // res.sendFile(path.join(__dirname, './index.html'));

    /**
     * 원래 node 에서는 
     * res.writeHead(200, { 'Content-Type: ' application/json'})
     * res.end(JSON.stringify({hello:'kevin}))
     * 해야 하는 데  express 에서는 res.json() 으로 줄여 줌.
     */
    res.json({hello: 'kevinaa'});  // res 후에 다음 console 실행, res 앞에 return 이 없다.
    // res.render()
    console.log('hello json kevin');
 });

 
app.get('/a', (req, res) => {
    res.send('hello express aaaaa');
});

app.get('*', (req, res) => {
    res.send('hello ***');
});



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