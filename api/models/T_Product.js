'use strict';
const baseModel = require('../base/BaseModel');
const sql = baseModel.sql;

const validation = require('../util/validation');

const logService = require('../services/LogService');

const T_Table = {
    tableName: "product",
    columns: [
        { key: "id", type: sql.Int, isPk: true, defaultValue: null },
        { key: "name", type: sql.VarChar, isPk: false, defaultValue: null },
        { key: "category_id", type: sql.Int, isPk: false, defaultValue: null },
        { key: "discount", type: sql.Int, isPk: false, defaultValue: null },
        { key: "updated_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()", defaultUpdate: "NOW()" },
        { key: "created_date", type: sql.DateTime, isPk: false, defaultValue: "NOW()" },
        { key: "favorite", type: sql.TinyInt, isPk: false, defaultValue: null },
        { key: "price_M", type: sql.Int, isPk: false, defaultValue: null },
        { key: "price_L", type: sql.Int, isPk: false, defaultValue: null }
    ]
};
const fieldWhiteList = [
    "name",
    "category_id",
    "discount",
    "updated_date",
    "created_date",
    "favorite",
    "price_M",
    "price_L"
];

async function getProducts(objSearch) {
    let param = baseModel.fillData(T_Table, objSearch);
    let pageSize = parseInt(objSearch.PageSize);
    let currentPage = (parseInt(objSearch.Page) - 1) * pageSize;

    let dataReturn;
    let totalRecord = 0;
    try {
        let sqlStr = `SELECT SQL_CALC_FOUND_ROWS
         T1.id
        ,T1.name
        ,T1.category_id
        ,T1.discount
        ,T1.updated_date
        ,T1.created_date
        ,T1.favorite
        ,T1.price_M
        ,T1.price_L
         FROM product T1
         WHERE 1 = 1`;

        if (!validation.isEmptyObject(objSearch.name)) {
            sqlStr += ` AND UPPER(T1.name) LIKE CONCAT('%', UPPER(@name), '%')`;
        }
        if (!validation.isEmptyObject(objSearch.category_id)) {
            sqlStr += ` AND T1.category_id = @category_id`;
        }
        if (!validation.isEmptyObject(objSearch.discount)) {
            sqlStr += ` AND T1.discount = @discount`;
        }
        if (!validation.isEmptyObject(objSearch.favorite)) {
            sqlStr += ` AND T1.favorite = @favorite`;
        }
        if (!validation.isEmptyObject(objSearch.price_M)) {
            sqlStr += ` AND T1.price_M = @price_M`;
        }
        if (!validation.isEmptyObject(objSearch.price_L)) {
            sqlStr += ` AND T1.price_L = @price_L`;
        }

        let strFilter = await baseModel.buildFilter(objSearch, fieldWhiteList, param);
        sqlStr += ` ` + strFilter;
        let orderStr = await baseModel.buildOrder(objSearch, fieldWhiteList, `created_date DESC`);
        sqlStr += ` ` + orderStr;
        sqlStr += ` LIMIT ` + currentPage + `,` + pageSize + `; SELECT FOUND_ROWS() AS total_row;`;

        let conn = await baseModel.getConnection();
        if (conn) {
            let query = new Promise(function (resolve, reject) {
                conn.query(sqlStr, param, async function(err, result, fields) {
                    if(result) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                });
            });
            
            await query.then(async function(res) {
                dataReturn = res[0];
                totalRecord = res[1][0].total_row;
                let logData = [
                    { key: "Time", content: new Date() },
                    { key: "File", content: "T_Product.js" },
                    { key: "Function", content: "getProducts" },
                    { key: "Sql", content: sqlStr },
                    { key: "Param", content: JSON.stringify(objSearch) }
                ]
                await logService.sqlLog(logData);
            }).catch(async function(err) {
                let logData = [
                    { key: "Time", content: new Date() },
                    { key: "File", content: "T_Product.js" },
                    { key: "Function", content: "getProducts" },
                    { key: "Sql", content: sqlStr },
                    { key: "Param", content: JSON.stringify(objSearch) },
                    { key: "Err", content: err }
                ]
                await logService.errorLog(logData);
            });
        }
        else {
            return false;
        }
    } catch(err) {
        let logData = [
            { key: "Time", content: new Date() },
            { key: "File", content: "T_Product.js" },
            { key: "Function", content: "getProducts" },
            { key: "Table", content: T_Table.tableName },
            { key: "Param", content: JSON.stringify(objSearch) },
            { key: "Err", content: err }
        ]
        await logService.errorLog(logData);
        
        return false;
    }
    
    return {
        data: dataReturn,
        totalRecord: totalRecord
    };
}

async function getProductsByCategory(objSearch) {
    return baseModel.searchData(T_Table, objSearch, [{ key: "created_date", type: "ASC" }]);
}

async function getProductDetail(objSearch) {
    return baseModel.getDetailByID(T_Table, objSearch.id);
}

async function createProduct(objData) {
    return baseModel.createNewGetId(T_Table, objData);
}

async function updateProduct(data) {
    return baseModel.updateById(T_Table, data);
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductDetail,
    createProduct,
    updateProduct
}