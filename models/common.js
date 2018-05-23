
const Sequelize = require('sequelize');
const tool = require('../lib/tool.js');
const IDModel = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
};
const dateModel = {
    createdAt: {
        type: Sequelize.DATE,
        get() {
            let v = this.getDataValue('createdAt');
            return tool.formatDatetime(v);
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            let v = this.getDataValue('createdAt');
            return tool.formatDatetime(v);
        }
    }
};

const getModel = (m, options = {}) => {
    let model = null;
    if (options.withDate) {
        model = dateModel;
    }
    return tool.extend({}, IDModel, model, m)
};

module.exports = {
    getModel
}