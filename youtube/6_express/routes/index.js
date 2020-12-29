const express = require('express');

const router = express.Router();

//Get router
router.get('/', (req, res) => {
    res.send('Hello, Express');
})

module.exports = router;
