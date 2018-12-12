'use strict';
const baseModel = require('../base/BaseModel');
const sql = baseModel.sql;

const logService = require('../services/LogService');

const T_Table = {
    tableName: "price",
    columns: [
        { key: "id", type: sql.Int, isPk: true, defaultValue: null },
        { key: "product_id", type: sql.Int, isPk: false, defaultValue: null },
        { key: "size", type: sql.Varchar, isPk: false, defaultValue: null },
        { key: "price", type: sql.Decimal, isPk: false, defaultValue: null }
    ]
};
const fieldWhiteList = [
    "product_id",
    "size",
    "price"
];

module.exports = {
    
}