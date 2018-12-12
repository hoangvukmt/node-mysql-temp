const ProductService = require('../services/ProductService');
const logService = require('../services/LogService');

async function getProducts(request, response) {
    let startTime = new Date();
    let objSearch = {
        name: request.body.name,
        category_id: request.body.category_id,
        discount: request.body.discount,
        favorite: request.body.favorite,
        price_M: request.body.price_M,
        price_L: request.body.price_L,

        Sort: (typeof request.body.sort === "undefined" || request.body.sort === null ? [] : request.body.sort),
        Filter: (typeof request.body.filter === "undefined" || request.body.filter === null ? [] : request.body.filter),
        Page: (typeof request.body.page === "undefined" || request.body.page === null ? 1 : request.body.page),
        PageSize: (typeof request.body.pageSize === "undefined" || request.body.pageSize === null ? 10 : request.body.pageSize)
    };
    let data = await ProductService.getProducts(objSearch);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "getProducts" },
        { key: "Param", content: JSON.stringify(objSearch) }
    ]
    await logService.accessLog(logData);

    return response.json(data);
}

async function getProductsByCategory(request, response) {
    let startTime = new Date();
    let objSearch = {
        category_id: request.body.category_id
    };
    let data = await ProductService.getProductsByCategory(objSearch);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "getProductsByCategory" },
        { key: "Param", content: JSON.stringify(objSearch) }
    ]
    await logService.accessLog(logData);

    return response.json(data);
}

async function getProductDetail(request, response) {
    let startTime = new Date();
    let objSearch = {
        id: request.body.id
    };
    let data = await ProductService.getProductDetail(objSearch);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "getProductDetail" },
        { key: "Param", content: JSON.stringify(objSearch) }
    ]
    await logService.accessLog(logData);

    return response.json(data);
}

async function createProduct(request, response) {
    let startTime = new Date();
    let objData = {
        name: request.body.name,
        category_id: request.body.category_id,
        discount: request.body.discount,
        favorite: request.body.favorite,
        price_M: request.body.price_M,
        price_L: request.body.price_L
    };
    let data = await ProductService.createProduct(objData);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "createProduct" },
        { key: "Param", content: JSON.stringify(objData) }
    ]
    await logService.accessLog(logData);

    return response.json(data);
}

async function updateProduct(request, response) {
    let startTime = new Date();
    let objData = {
        id: request.body.id,
        name: request.body.name,
        category_id: request.body.category_id,
        discount: request.body.discount,
        favorite: request.body.favorite,
        price_M: request.body.price_M,
        price_L: request.body.price_L
    };
    let data = await ProductService.updateProduct(objData);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "ProductController.js" },
        { key: "Function", content: "updateProduct" },
        { key: "Param", content: JSON.stringify(objData) }
    ]
    await logService.accessLog(logData);

    return response.json(data);
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductDetail,
    createProduct,
    updateProduct
}