const Sequelize = require('sequelize');
const config = require('../global/config.js').db;
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};
var seq;
var connects = {};
const db = () => {
    if (!seq) {
        seq = new Sequelize(config.database, config.user, config.password, {
            dialect: 'mysql',
            logging: false,
            operatorsAliases,
            pool: {
                max: 10,
                min: 0,
                idle: 1000
            }
        });
    }
    return seq;
};
db.init = db.connect = (config = {}) => {
    let name = config.name;
    let model = config.model;
    let options = config.options;
    if (!connects[name]) {
        connects[name] = db().define(name, model, options);
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
