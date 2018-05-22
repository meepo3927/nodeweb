var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.json({
        success: true,
        data: {name: 'meepo'}
    });
});

module.exports = router;