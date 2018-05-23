const Sequelize = require('sequelize');
const DB = require(__dirname + '/../lib/db.js');
let _conn;
let User = Object.create(null);
const conn = () => {
    if (!_conn) {
        _conn = DB().define('user', {
            name: Sequelize.STRING
        }).sync().catch((e) => {
            return Promise.reject({
                success: false,
                msg: e.message || 'DB错误'
            })
        });
    }
    return _conn;
};

// 新建
const create = (obj) => {
    return conn().then((instance) => {
        return instance.create(obj)
    });
};
// 查询所有
const all = () => {
    return conn().then((instance) => {
        return instance.findAll();
    });
};

User.conn = conn;
User.create = create;
User.all = all;

module.exports = User;