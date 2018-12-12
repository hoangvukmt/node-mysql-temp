'use strict';
const baseModel = require('../base/BaseModel');
const sql = baseModel.sql;

const logService = require('../services/LogService');

const T_Table = {
    tableName: "faq",
    columns: [
        { key: "id", type: sql.Int, isPk: true, defaultValue: null },
        { key: "user_id", type: sql.Int, isPk: false, defaultValue: null },
        { key: "title", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "content", type: sql.Text, isPk: false, defaultValue: null },
        { key: "updated_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()", defaultUpdate: "NOW()" },
        { key: "created_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()" }
    ]
};
const fieldWhiteList = [
    "user_id",
    "title",
    "content",
    "updated_date",
    "created_date"
];

module.exports = {
    
}