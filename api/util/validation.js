'use_strict';

// const systemConfig = require('config');
const Email_Length = 255;

const RESPONSE_CODE = {
    'SUCCESS': '001',
    'REQUIRED': '101',
    'SERVER_ERROR': '500',
    'NOT_EXIST': '404',
    'AUTH_FAIL': '401',
    'DUPLICATE': '400'
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.dir(`${isEmptyObject(email)} : ${email}`);
    if(isEmptyObject(email) || email.length > Email_Length) {
        return false;
    }
    return re.test(email);
}
function isEmptyObject(...listObject) {
    let check = false;
    listObject.forEach(obj => {
        if(obj === undefined || obj === null || obj === '') check = true;
    });
    return check;
}
function checkRequiredFields(checkObject, requiredKeys) {
    let hasNull = false;
    let requiredTextList = '';
    requiredKeys.forEach( key => {
        if(isEmptyObject(checkObject[key])) {
            hasNull = true;
            requiredTextList += `${key}, `  ;
        }
    });
    return {
        required: hasNull,
        requiredFields: requiredTextList
    }
}
module.exports = {
    validateEmail,
    isEmptyObject,
    RESPONSE_CODE,
    checkRequiredFields
}