var express = require('express');
var pg = require('pg');

var router = express.Router();

router.get('/', function (req, res) {
    
    var conString = "postgres://TDInstaller:1234@localhost/TDInstaller";
    var pgClient = new pg.Client(conString);

    pgClient.connect(function (err, client) {
        if (err) {
            pgClient.end();
            console.error('[Postgre Error]' + err.message);
            //console.error('error connect postgre', err);
            return res.sendStatus(500);
        }
        res.send('postgre connected');
        pgClient.end();
    });
});

module.exports = router;