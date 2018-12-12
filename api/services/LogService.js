'use strict';

const fs = require('fs');
const systemConfig = require('config');

const commonUtil = require('../util/common');

async function accessLog(data) {
    var dateNow = new Date();
    var folderName = commonUtil.dateToyyyyMMdd(dateNow);

    if (!fs.existsSync(systemConfig.get('logPath'))){
        fs.mkdirSync(systemConfig.get('logPath'));
    }
    if (!fs.existsSync(systemConfig.get('logPath') + '/' + folderName)){
        fs.mkdirSync(systemConfig.get('logPath') + '/' + folderName);
    }

    let fd = await fs.openSync(systemConfig.get('logPath') + '/' + folderName + '/access.log', 'a')
    await fs.writeSync(fd, '==============================================\r\n');
    for (var i = 0; i < data.length; i++) {
        let item = data[i];
        await fs.writeSync(fd, "- " + item.key + ": " + item.content + '\r\n');
    }
    await fs.writeSync(fd, '==============================================\r\n');
    await fs.closeSync(fd);

    return true;
}

async function sqlLog(data) {
    var dateNow = new Date();
    var folderName = commonUtil.dateToyyyyMMdd(dateNow);

    if (!fs.existsSync(systemConfig.get('logPath'))){
        fs.mkdirSync(systemConfig.get('logPath'));
    }
    if (!fs.existsSync(systemConfig.get('logPath') + '/' + folderName)){
        fs.mkdirSync(systemConfig.get('logPath') + '/' + folderName);
    }

    let fd = await fs.openSync(systemConfig.get('logPath') + '/' + folderName + '/sql.log', 'a')
    await fs.writeSync(fd, '==============================================\r\n');
    for (var i = 0; i < data.length; i++) {
        let item = data[i];
        await fs.writeSync(fd, "- " + item.key + ": " + item.content + '\r\n');
    }
    await fs.writeSync(fd, '==============================================\r\n');
    await fs.closeSync(fd);

    return true;
}

async function errorLog(data) {
    var dateNow = new Date();
    var folderName = commonUtil.dateToyyyyMMdd(dateNow);

    if (!fs.existsSync(systemConfig.get('logPath'))){
        fs.mkdirSync(systemConfig.get('logPath'));
    }
    if (!fs.existsSync(systemConfig.get('logPath') + '/' + folderName)){
        fs.mkdirSync(systemConfig.get('logPath') + '/' + folderName);
    }

    let fd = await fs.openSync(systemConfig.get('logPath') + '/' + folderName + '/error.log', 'a')
    await fs.writeSync(fd, '==============================================\r\n');
    for (var i = 0; i < data.length; i++) {
        let item = data[i];
        await fs.writeSync(fd, "- " + item.key + ": " + item.content + '\r\n');
    }
    await fs.writeSync(fd, '==============================================\r\n');
    await fs.closeSync(fd);

    return true;
}

module.exports = {
    accessLog,
    sqlLog,
    errorLog
}