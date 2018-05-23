const express = require('express');
const Sequelize = require('sequelize');

const tool = require('../lib/tool.js');
const DB = require('../lib/db.js');
const User = require('../models/user.js');


const router = express.Router();
router.get('/', function (req, res) {
    res.json(tool.dataJSON({name: 'meepo'}));
});

router.get('/users', (req, res) => {
    DB.connect(User).then((user) => {
        return user.findAll();
    }).then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(err);
    });
});

// 获取用户信息
router.get('/newUser', function (req, res) {
    DB.connect(User).then((user) => {
        return user.create({
            name: req.query.name || ''
        })
    }).then((ret) => {
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(tool.dbErrorJSON(err));
    });
});

router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    DB.connect(User).then((user) => {
        return user.findById(id)
    }).then((ret) => {
        console.log(ret);
        res.json(tool.dataJSON(ret));
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;