const Sequelize = require('sequelize');
const CommonModel = require('./common.js');

const options = {
    timestamps: true,
    underscored: true,
    freezeTableName: true
};
const model = CommonModel.getModel({
    name: {
        type: Sequelize.STRING,
        unique: true,
        validate: {
            is: {
                args: /[A-Za-z0-9_]{2,32}/g,
                msg: '用户名只能包含字母、数字、下划线，长度2-32'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: {msg: '密码不能为空'},
            len: {
                args: [4, 32],
                msg: '长度4至32'
            }
        }
    }
}, options);

module.exports = {
    name: 'user',
    model,
    options
}