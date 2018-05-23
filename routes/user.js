const express = require('express');
const Sequelize = require('sequelize');

const tool = require('../lib/tool.js');
const DB = require('../lib/db.js');
const User = require('../models/user.js');

const router = express.Router();
router.get('/', function (req, res) {
    if (req.session.userId) {
        res.send([
            'userId: ' + req.session.userId,
            'userName:' + req.session.userName
        ].join('<br />'))
    } else {
        res.send('你没有登录');
    }
});
router.get('/init', function (req, res) {
    if (req.query.code !== '9527') {
        return res.send('hello');
    }
    DB.init(User).sync().then((ret) => {
        res.send('init done');
    }).catch((err) => {
        res.json(tool.errJSON(err));
    })
});
// 登录
router.get('/login', function (req, res) {
    let name = req.query.userName || '';
    let password = req.query.password;
    if (!name && !password) {
        return res.send('login page');
    }
    DB.init(User).findOne({where: {name}}).then((user) => {
        if (user && user.password === password) {
            req.session.userId = user.id;
            req.session.userName = user.name;
            res.send('login success');
        } else {
            res.send('UserName or Password is invalid.');
        }
    }).catch((err) => {
        res.json(tool.errJSON(err));
    });
});
// 登出
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('./login');
    });
});
// 我的
router.get('/my', function (req, res) {
    if (!req.session.userId) {
        return res.redirect('./login');
    }
    let id = req.session.userId;
    DB.connect(User).findOne({where: {id}}).then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(tool.dbErrorJSON(err));
    });
});
// 列表
router.get('/list', (req, res) => {
    if (!req.session.userId) {
        return res.redirect('./login');
    }
    DB.connect(User).findAll().then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(tool.dbErrorJSON(err));
    });
});

// 获取用户信息
router.get('/reg', function (req, res) {
    DB.connect(User).create({
        name: req.query.name || '',
        password: req.query.password || ''
    }).then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(tool.dbErrorJSON(err));
    });
});

module.exports = router;