'use strict';
const baseModel = require('../base/BaseModel');
const sql = baseModel.sql;

const logService = require('../services/LogService');

const T_Table = {
    tableName: "favorite",
    columns: [
        { key: "id", type: sql.Int, isPk: true, defaultValue: null },
        { key: "user_id", type: sql.Int, isPk: false, defaultValue: null },
        { key: "product_id", type: sql.Int, isPk: false, defaultValue: null },
        { key: "updated_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()", defaultUpdate: "NOW()" },
        { key: "created_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()" }
    ]
};
const fieldWhiteList = [
    "user_id",
    "product_id",
    "updated_date",
    "created_date"
];

module.exports = {
    
}