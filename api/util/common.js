'use_strict';
const systemConfig = require('config');
var mime = require('mime');
const fs = require('fs');

function dateToyyyyMMdd(date) {
    var MM = date.getMonth() + 1;
    var dd = date.getDate();

    return [
        date.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd
    ].join('');
}

function dateToyyyyMMddHHmm(date) {
    var MM = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();

    return [
        date.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm
    ].join('');
}

function dateToyyyyMMddHHmmss(date) {
    var MM = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();

    return [
        date.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm,
        (ss > 9 ? '' : '0') + ss
    ].join('');
}

function dateToyyyyMMddHHmmssii(date) {
    var MM = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    var ii = date.getMilliseconds();

    return [
        date.getFullYear(),
        (MM > 9 ? '' : '0') + MM,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (mm > 9 ? '' : '0') + mm,
        (ss > 9 ? '' : '0') + ss,
        ii
    ].join('');
}

function writeBase64File(fileContent, filePath, fileName) {
    var imageTypeRegularExpression = /\/(.*?)$/;
    var userUploadedFeedMessagesLocation = systemConfig.get('TestENV.uploadPath') + "/" + filePath + "/";
    var imageBuffer = decodeBase64Image(fileContent);
    if (imageBuffer.ok){
        var imageTypeDetected = imageBuffer.type.match(imageTypeRegularExpression);
        var userUploadedImagePath = userUploadedFeedMessagesLocation + fileName + '.' + imageTypeDetected[1];
    
        require('fs').writeFile(userUploadedImagePath, imageBuffer.data, function(){
            
        });
        return {
            ok: true,
            fileExtension: imageTypeDetected[1]
        }
    }
    return imageBuffer;
}

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (typeof matches === "undefined" || matches == null || matches.length !== 3) {
        response.ok = false;
        response.msg = 'Invalid base64 string';
        return response;
    }

    response.ok = true;
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

function encodeBase64Image(filePath) {
    try{
        var base64 = "data:" + mime.lookup(filePath) + ";base64," + fs.readFileSync(filePath).toString('base64');
        return {
            ok: true,
            data: base64
        }
    } catch(err) {
        return {
            ok: false,
            data: "file not found!"
        }
    }
}

function stringIsNumber(numberStr) {
    return !isNaN(numberStr);
}

function cloneObj(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = cloneObj(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = cloneObj(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

module.exports = {
    dateToyyyyMMdd,
    dateToyyyyMMddHHmm,
    dateToyyyyMMddHHmmss,
    dateToyyyyMMddHHmmssii,
    writeBase64File,
    encodeBase64Image,
    stringIsNumber,
    cloneObj
}