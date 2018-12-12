'use_strict';

const systemConfig = require('config');
const sql = require('mysql');
let sqlConnect = null;
let connection = null;

async function dbConnect () {
    let sqlConfig = systemConfig.get("dbConfig");
    sqlConfig.options = {
        "encrypt": false
    }
    connection = sql.createConnection(sqlConfig);    
    try{
        sqlConnect = connection.connect();        
    } catch (err) {
        return false;
    }    
    return connection;
}

module.exports = {
    sql,
    sqlConnect,
    dbConnect,
    connection
}