
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
            let v = this.getDataValue('updatedAt');
            return tool.formatDatetime(v);
        }
    }
};
const dateModelUnderScored = {
    created_at: {
        type: Sequelize.DATE,
        get() {
            let v = this.getDataValue('created_at');
            return tool.formatDatetime(v);
        }
    },
    updated_at: {
        type: Sequelize.DATE,
        get() {
            let v = this.getDataValue('updated_at');
            return tool.formatDatetime(v);
        }
    }
};

const getModel = (m, options = {}) => {
    let model = null;
    // 添加时间戳属性
    if (options.timestamps) {
        if (options.underscored) {
            model = dateModelUnderScored;
        } else {
            model = dateModel;
        }
    }
    return tool.extend({}, IDModel, m, model)
};

module.exports = {
    getModel
}