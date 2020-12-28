const express = require('express');
const app = express();
const path = require('path');

//
app.set('port', process.env.PORT || 3000);

// 미들웨어는 next 를 해야 다음으로 넘어감..
// (req,res,nest) 부분이 미들웨어이다..
// (req,res,nest) 부분을 app.use, app.get 에 장착을 한다
app.use((req, res, next) => {
    console.log('all route...');
    next();
});

app.use('/about',(req, res, next) => {
    console.log(' about...');
    next();
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

// 여러개 순서대로 사용 가능.
app.use('/mypage',(req, res, next) => {
    console.log(' mypage...1');
    next();
},(req, res, next) => {
    console.log(' mypage...2');
    next();
},(req, res, next) => {
    console.log(' mypage...3');
    if (true){
        next('route'); // 이번 라우트를 건너뛰고 다음 라우터 로 넘 넘어간다.
    }else{
        next(); // 다음으로 넘어간다.
    }
},(req, res, next) => {
  // throw new Error("error ....");
  // 보통 try 로 에러를 잡아낸다.
  // next(error)를 해서 다음으로 넘어가는것이 아니라,  에러처리 미들웨어로 
  // 넘겨누는것이다.
  /** 
   * 아래에 있는 에러처리 미들웨어로 넘어간다.
   * app.use((err, req,res,next) =>{
    console.error(err);
    res.send(" Occure error");
    });
   */
  try{
    console.log(kajdsfkaskdf);
  }catch(error){
      next(error);
  }
}
);


app.get('/category/javascript', (req, res) => {
    res.send('hello javascript');
});

// 와일드 카드는 뒤로 가야함.. :name or * 
app.get('/category/:name', (req, res) => {
    res.send('hello wildcard');
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
    res.json({hello: 'kevin'});  // res 후에 다음 console 실행, res 앞에 return 이 없다.
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