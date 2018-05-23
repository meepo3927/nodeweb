const Sequelize = require('sequelize');
const CommonModel = require('./common.js');

const model = CommonModel.getModel({
    name: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {msg: '姓名不能为空'}
        }
    }
}, {
    withDate: true
});
console.log(model);

module.exports = {
    name: 'user',
    model
}