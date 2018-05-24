const PRINT_ERROR = true;
const dataJSON = (data) => {
    return {
        success: true,
        data
    }
};

const errJSON = (error) => {
    if (PRINT_ERROR) {
        console.log('\n\n\n');
        console.error(error);
        console.log('----------------------------------------------------------------\n\n\n');
    }
    if (typeof error === 'string') {
        return {success: false, msg: error}
    }
    // Sequelize错误
    if (error.parent) {
        return {
            success: false,
            msg: error.parent.sqlMessage
        }
    }
    // 多条错误
    if (error.errors) {
        return {
            success: false,
            msg: error.errors.map((item) => item.message).join('；')
        }
    }
    return error;
};

function padZero(num) {
    return (num < 10) ? ('0' + (num | 0)) : num;
}
function formatDatetime(str) {
    let date = new Date();
    if (Object.prototype.toString.call(str) === '[object Date]') {
        date = str;
    } else if (typeof str === 'string') {
        date = new Date(str)
    }
    
    return [
        date.getFullYear(),
        padZero(date.getMonth() + 1),
        padZero(date.getDate())
    ].join('-') + ' ' + [
        padZero(date.getHours()),
        padZero(date.getMinutes()),
        padZero(date.getSeconds())
    ].join(':');
}

const inArray = (v, arr) => {
    if (v === undefined) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (v === arr[i]) {
            return true;
        }
    }
    return false;
};

const pushUnique = (arr, v) => {
    if (!inArray(v, arr)) {
        arr.push(v);
    }
};

const mExtend = (target, obj, arr) => {
    var toStr = Object.prototype.toString;

    target = target || {};
    obj = obj || {};

    pushUnique(arr, target);
    pushUnique(arr, obj);

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
            continue;
        }
        var value = obj[i];

        // 打破循环
        if (inArray(value, arr)) {
            continue;
        }

        var type = toStr.call(value);
        if (type === '[object Array]') {
            // 数据
            target[i] = mExtend(target[i] || [], value, arr);
        } else if (type === '[object Object]') {
            target[i] = mExtend(target[i], value, arr);
        } else {
            target[i] = value;
        }
    }

    return target;
};

const extend = function extend(target, obj) {
    if (arguments.length > 2) {
        for (var i = 1; i < arguments.length; i++) {
            target = mExtend(target, arguments[i], []);
        }
        return target;
    }

    return mExtend(target, obj, []);
};

const getSult = () => {
    let d = new Date();
    let sult = [
        d.getFullYear(),
        padZero(d.getMonth() + 1),
        padZero(d.getDate())
    ].join('') + '_' + [
        padZero(d.getHours()),
        padZero(d.getMinutes()),
        padZero(d.getSeconds())
    ].join('') + '_' + d.getMilliseconds();

    return sult;
};

module.exports = {
    dataJSON,
    errJSON,
    padZero,
    formatDatetime,
    extend,
    getSult
};