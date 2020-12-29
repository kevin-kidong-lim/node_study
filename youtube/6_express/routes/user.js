const express = require('express');

const router = express.Router();

//Get /user router
router.get('/', (req, res) => {  // <- / 뒤에 / 가 붙는다.
    res.send('Hello, /user/ Express');  //get /user/
})

module.exports = router;
