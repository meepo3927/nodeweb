var path = require('path');
var express = require('express');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var cookieParser = require('cookie-parser');
var ejs = require('ejs');

var config = require('./global/config.js');
var sessionStore = new MySQLStore(config.MySQLStore);
// 全局配置
var app = express();
app.set('views', path.join(__dirname, 'views'));
//app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
    secret: '3333',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
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
app.use('/user', require('./routes/user.js'));

// 静态资源
app.use(express.static('static'));





var server = app.listen(8333, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
