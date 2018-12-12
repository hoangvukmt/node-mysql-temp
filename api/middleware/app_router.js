'use strict';

var bodyParser = require('body-parser');
const express = require('express');
const systemConfig = require('config');
var jwt = require('jsonwebtoken');
var cors = require('cors');

const commonUtil = require('../util/common');

const categoryController = require('../controllers/CategoryController');
const faqController = require('../controllers/FaqController');
const favoriteController = require('../controllers/FavoriteController');
const imageController = require('../controllers/ImageController');
const orderController = require('../controllers/OrderController');
const priceController = require('../controllers/PriceController');
const productController = require('../controllers/ProductController');
const userController = require('../controllers/UserController');

//defined by below NotAuthen array
const NotAuthen = [
    '/api/login',
    '/api/getProducts',
    '/api/getProductsByCategory',
    '/api/getProductDetail',
    '/api/createProduct',
    '/api/updateProduct'
];

var router = express.Router();

// for using http json, urlencode
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cors());

//#region check token -------------------------------------------------------------------------------------
router.use(function (req, res, next) {
    var token = req.headers['x-access-token'];
    let orgUrl = req.originalUrl;

    // xss filter
    Object.keys(req.body).forEach(function(key, index) {
        if (typeof req.body[key] !== "undefined" && req.body[key] !== null) {
            if (!commonUtil.stringIsNumber(req.body[key])) {
                //req.body[key] = xssFilters.inHTMLData(req.body[key]);
            }
        }
    });

    if (NotAuthen.indexOf(orgUrl) >= 0) {
        return next();
    }
    if (!token) {
        return res.status(401).send({ code: '401', message: 'No token provided.' });
    } else {
        //check validate token
        jwt.verify(token, systemConfig.get('token.seed'), function(err, decoded){
            if (err) return res.status(401).json({
                code: '401',
                message: 'Failed to authenticate token.'
            });
            req.body.tokenData = decoded;
            return next();
        });
    }
});
//#endregion

//#region category's API ----------------------------------------------------------------------------------



//#endregion

//#region faq's API ---------------------------------------------------------------------------------------



//#endregion

//#region favorite's API ----------------------------------------------------------------------------------



//#endregion

//#region image's API -------------------------------------------------------------------------------------



//#endregion

//#region order's API -------------------------------------------------------------------------------------



//#endregion

//#region price's API -------------------------------------------------------------------------------------



//#endregion

//#region product's API -----------------------------------------------------------------------------------

/**
* get products
*/
router.post('/getProducts', function(req, res){
    return productController.getProducts(req, res);
});

/**
* get products by category
*/
router.post('/getProductsByCategory', function(req, res){
    return productController.getProductsByCategory(req, res);
});

/**
* get product detail
*/
router.post('/getProductDetail', function(req, res){
    return productController.getProductDetail(req, res);
});

/**
* create product
*/
router.post('/createProduct', function(req, res){
    return productController.createProduct(req, res);
});

/**
* update product
*/
router.post('/updateProduct', function(req, res){
    return productController.updateProduct(req, res);
});

//#endregion

//#region user's API --------------------------------------------------------------------------------------

/**
 * Login API
 */
router.post('/login', function(req, res){
    return userController.login(req, res);
});

//#endregion

//#region other -------------------------------------------------------------------------------------------

/**
 * Catch server err for request
 */
router.use(function (err, req, res, next) {
    res.status(500).json({
        ok: false,
        message: 'Server error!'
    });
});

/**
 * Catch 404 err for request
 */
router.use(function (req, res, next) {
    res.status(404).send('NotFound URL!');
})

//#endregion

module.exports = router;