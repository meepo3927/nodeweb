var path = require('path');
var express = require('express');
var ejs = require('ejs');

// app init
var app = express();
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.use('/api', function (req, res) {
    res.json({
        success: true,
        data: {name: 'meepo'}
    });
});

app.all('/admin', function (req, res) {
    var pg = require('pg');
    var conString = "postgres://TDInstaller:1234@localhost/TDInstaller";
    var pgClient = new pg.Client(conString);
    
    pgClient.connect(function (err, client) {
        if (err) {
            return console.log('error connect postgre', err);
        }
        
    });
    res.send('admin path');
});

app.use(express.static('static'));

var server = app.listen(8333, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});