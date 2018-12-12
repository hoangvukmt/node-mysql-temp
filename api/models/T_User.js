'use strict';
const baseModel = require('../base/BaseModel');
const sql = baseModel.sql;
const systemConfig = require('config');
const passEncrypt = systemConfig.get('passwordEncrypt');

const logService = require('../services/LogService');

const T_Table = {
    tableName: "user",
    columns: [
        { key: "id", type: sql.Int, isPk: true, defaultValue: null },
        { key: "username", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "email", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "password", type: sql.VarBinary, isPk: false, defaultValue: null },
        { key: "token", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "last_login_activity", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "updated_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()", defaultUpdate: "NOW()" },
        { key: "created_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()" }
    ]
};
const fieldWhiteList = [
    "username",
    "email",
    "updated_date",
    "created_date",
    "last_login_activity"
];

async function getUserByUserName(userName) {
    let user = null;
    try{
        let sqlRequest = new sql.Request();
        sqlRequest.input('userName', sql.VarChar, userName);

        let sqlStr = `SELECT
         T1.id
        ,T1.username
        ,T1.email
        ,convert(nvarchar(MAX), DecryptByPassphrase('${passEncrypt.passPhrase}', T1.password, 1, convert(varbinary(MAX), '${passEncrypt.expression}'))) AS password
        ,T1.token
        ,T1.last_login_activity
        ,T1.updated_date
        ,T1.created_date
         FROM user T1
         WHERE T1.username = @userName`;
        let query = new Promise(function (resolve, reject) {
            sqlRequest.query(sqlStr, (err, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
        });
        await query.then(async function(res) {
            user = res.recordset[0];

            let logData = [
                { key: "Time", content: new Date() },
                { key: "File", content: "T_User.js" },
                { key: "Function", content: "getUserByUserName" },
                { key: "Sql", content: sqlStr },
                { key: "Param", content: userName }
            ]
            await logService.sqlLog(logData);
        }).catch(async function(err) {
            let logData = [
                { key: "Time", content: new Date() },
                { key: "File", content: "T_User.js" },
                { key: "Function", content: "getUserByUserName" },
                { key: "Sql", content: sqlStr },
                { key: "Param", content: userName },
                { key: "Err", content: err }
            ]
            await logService.errorLog(logData);
        });
    } catch (err) {
        let logData = [
            { key: "Time", content: new Date() },
            { key: "File", content: "T_User.js" },
            { key: "Function", content: "getUserByUserName" },
            { key: "Table", content: T_Table.tableName },
            { key: "Param", content: userName },
            { key: "Err", content: err }
        ]
        await logService.errorLog(logData);

        return null;
    }
    return user;
}

module.exports = {
    getUserByUserName
}