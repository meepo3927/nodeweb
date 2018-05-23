const Sequelize = require('sequelize');
const config = {
    database: 'meepo',
    user: 'TDInstaller',
    password: '3333',
    type: 'mysql'
};
var seq;
var connects = {};
const db = () => {
    if (!seq) {
        seq = new Sequelize(config.database, config.user, config.password, {
            dialect: config.type,
            logging: false,
            operatorsAliases: false,
            pool: {
                max: 10,
                min: 0,
                idle: 1000
            }
        });
    }
    return seq;
};
db.connect = (name, model) => {
    if (typeof name === 'object' && name.name && name.model) {
        model = name.model;
        name = name.name;
    }
    if (!connects[name]) {
        connects[name] = db().define(name, model).sync().catch((err) => {
            return Promise.reject({
                success: false,
                msg: err.message || '数据库错误'
            })
        });
    }
    return connects[name];
};
db.close = () => {
    if (seq) {
        seq.close();
        seq = null;
    }
};

module.exports = db;
