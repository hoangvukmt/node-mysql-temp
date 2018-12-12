'use strict';
const baseModel = require('../base/BaseModel');
const sql = baseModel.sql;

const logService = require('../services/LogService');

const T_Table = {
    tableName: "category",
    columns: [
        { key: "id", type: sql.Int, isPk: true, defaultValue: null },
        { key: "parent_id", type: sql.Int, isPk: false, defaultValue: null },
        { key: "name", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "updated_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()", defaultUpdate: "NOW()" },
        { key: "created_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()" }
    ]
};
const fieldWhiteList = [
    "parent_id",
    "name",
    "updated_date",
    "created_date"
];

module.exports = {
    
}