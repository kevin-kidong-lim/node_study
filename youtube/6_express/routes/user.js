const express = require('express');

const router = express.Router();

//Get /user router
//http://localhost:3000/user/1234?test=1111&t=1
//{ id: '1234' } { test: '1111', t: '1' }
router.get('/', (req, res) => {  // <- / 뒤에 / 가 붙는다.
    console.log(req.params, req.query);
    res.send('Hello, /user/ Express');  //get /user/
})

// 라우터 그룹회, 똑같은 이름으로 get ,post 일때..
router.route('/n/')
    .get((req,res) => {
        res.send('GET /user/n/');
    })
    .post((req,res) => {
        res.send('GET /user/n/');
    });

    // :id 는 제일 마지막에 있어야함.
router.get('/:id', (req, res) => {  // <- / 뒤에 / 가 붙는다.
    console.log(req.params, req.query);
    res.send('Hello, /user/** Express');  //get /user/
})



module.exports = router;
