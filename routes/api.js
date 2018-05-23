const express = require('express');
const Sequelize = require('sequelize');

const tool = require('../lib/tool.js');
const DB = require('../lib/db.js');
const User = require('../models/user.js');


const router = express.Router();
router.get('/', function (req, res) {
    res.json(tool.dataJSON({name: 'meepo'}));
});

// 获取用户信息
router.get('/newUser', function (req, res) {
    User.create({
        name: 'Meepo' + Math.random()
    }).then((ret) => {
        res.json(tool.dataJSON(ret));
    });
});
router.get('/users', (req, res) => {
    User.all().then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(err);
    });
});
router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    User.conn().then((user) => {
        return user.findById(id)
    }).then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;