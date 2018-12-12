'use strict';

const ResCode = require('../util/validation').RESPONSE_CODE;
const validation = require('../util/validation');

const ProductModel = require('../models/T_Product');

async function getProducts(objSearch) {
    let result = await ProductModel.getProducts(objSearch);
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Get successed!',
            data: result.data,
            totalRecord: result.totalRecord
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

async function getProductsByCategory(objSearch) {
    let requiredFields = [
        'category_id'
    ];
    let checkRequired = validation.checkRequiredFields(objSearch, requiredFields);
    if (checkRequired.required) {
        let result = {
            code: ResCode.REQUIRED,
            message: 'Parameter(s) is required!',
            data: checkRequired
        };
        return result;
    }

    let result = await ProductModel.getProductsByCategory(objSearch);
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Get successed!',
            data: result
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

async function getProductDetail(objSearch) {
    let requiredFields = [
        'id'
    ];
    let checkRequired = validation.checkRequiredFields(objSearch, requiredFields);
    if (checkRequired.required) {
        let result = {
            code: ResCode.REQUIRED,
            message: 'Parameter(s) is required!',
            data: checkRequired
        };
        return result;
    }

    let result = await ProductModel.getProductDetail(objSearch);
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Get successed!',
            data: result
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

async function createProduct(objData) {
    let requiredFields = [
        'name',
        'category_id'
    ];
    let checkRequired = validation.checkRequiredFields(objData, requiredFields);
    if (checkRequired.required) {
        let result = {
            code: ResCode.REQUIRED,
            message: 'Parameter(s) is required!',
            data: checkRequired
        };
        return result;
    }

    let result = await ProductModel.createProduct(objData);
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Create successed!',
            data: result
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

async function updateProduct(objData) {
    let requiredFields = [
        'id'
    ];
    let checkRequired = validation.checkRequiredFields(objData, requiredFields);
    if (checkRequired.required) {
        let result = {
            code: ResCode.REQUIRED,
            message: 'Parameter(s) is required!',
            data: checkRequired
        };
        return result;
    }

    let result = await ProductModel.updateProduct(objData);
    if (result) {
        return {
            code: ResCode.SUCCESS,
            message:'Update successed!'
        }
    } else {
        return {
            code: ResCode.SERVER_ERROR,
            message:'Server error!'
        }
    }
}

module.exports = {    
    getProducts,
    getProductsByCategory,
    getProductDetail,
    createProduct,
    updateProduct
}