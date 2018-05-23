const Sequelize = require('sequelize');
const config = {
    database: 'meepo',
    user: 'TDInstaller',
    password: '3333',
    type: 'mysql'
};
var seq;
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
db.close = () => {
    if (seq) {
        seq.close();
        seq = null;
    }
};

module.exports = db;
