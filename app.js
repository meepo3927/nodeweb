var path = require('path');
var express = require('express');
var ejs = require('ejs');

// 全局配置
var app = express();
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

// 全局钩子
app.use((req, res, next) => {
    console.log('[request] ' + req.originalUrl);
    next();
});

// 起始页
app.get('/', function (req, res) {
    res.send('Hello world');
});
// API Module
app.use('/api', require('./routes/api.js'));

// 静态资源
app.use(express.static('static'));





var server = app.listen(8333, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
