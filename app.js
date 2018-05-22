var path = require('path');
var express = require('express');
var ejs = require('ejs');

// global config
var app = express();
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

// global request
app.use((req, res, next) => {
    console.log('[request] ' + req.originalUrl);
    next();
});

app.get('/', function (req, res) {
    res.send('Hello world');
});
app.use('/api', require('./routes/api.js'));
app.use('/admin', require('./routes/admin.js'));

app.use(express.static('static'));

var server = app.listen(8333, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
