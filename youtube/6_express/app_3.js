/**
 *  6-9 멀티파트 데이터 형식 .  npm i multer
 */

const express = require('express');
const path = require('path');
const morgan = require('morgan');  // 요청과 응답을 기록 ..
const cookieParser = require('cookie-parser');
// const session = require('express-session');
const multer = require('multer');
/**
 * multer 안에 4가지의 미들웨어가 존재한다.
 */

const fs = require('fs');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); // 개발시 
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

try{
    // 서버 시작전에 먼저 시작하니, sync 써도 됨.
    fs.readdirSync('upload');
}catch(error){
    console.error('upload 폴더가 없어서 uploads 폴더를 생성함.');
    fs.mkdirSync('upload');
}
const upload = multer({
    storage: multer.diskStorage({
        destination( req, file, done){
            // done 첫번째 인수는 에러처리용 .
            done(null, 'upload/');
        },
        filename(req, file, done){
            // 확장자 추출
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1025 },
});
app.get('/upload', ( req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
})
// 
//app.use(upload.single('image'));
// 특정라우터 에서만 미들웨어 적용하기 위해, app.use 사용안하고 씀.
// 파일 한개 업로드 upload.single
//app.post('/upload', upload.single('image'), (req, res) => {  
//동일 파일 이름으로 여러개  올 경우upload.array
//formData.append('image', e.target.image.files[0]);

// 파일이름이 다른게 여러개 올 경우 upload.fields([ {name:'image1'}, {name:'image2'}])
//formData.append('image1', e.target.image.files[0]);
app.post('/upload', upload.fields([ {name:'image1', limits:5}, {name:'image2'}]), (req, res) => {
    //console.log(req.file);
    //console.log(req.files);
    console.log(req.files.images1);
    res.send('ok');
});

app.get('/', (req, res) => {
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