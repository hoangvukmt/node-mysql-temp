'use strict';

var jwt = require('jsonwebtoken');
const systemConfig = require('config');

const ResCode = require('../util/validation').RESPONSE_CODE;
const validation = require('../util/validation');

const UserModel = require('../models/T_User');

async function login(data) {
    if(typeof process.env.NODE_ENV !== "undefined" && process.env.NODE_ENV.trim() === 'test') {
        if (data.username === systemConfig.get('utTestAcc.user_name') && data.password === systemConfig.get('utTestAcc.password')) {
            const token = jwt.sign(
                {
                    user_name: data.username,
                    user_no: 1
                },
                systemConfig.get('token.seed'),
                {
                    expiresIn: systemConfig.get('token.expire')
                }
            );
            process.env.token = token;
            return {
                code: ResCode.SUCCESS,
                message:''
            }
        }
        else {
            return {
                code: ResCode.AUTH_FAIL,
                message:'UserName/Password incorrect!'
            }
        }
    }
    
    let user = await UserModel.getUserByUserName(data.username);
    
    if (!user) {
        return {
            code: ResCode.AUTH_FAIL,
            message:'UserName/Password incorrect!'
        }
    }

    if (user.password === data.password){
        // create a token
        const token = jwt.sign(
            {
                user_name: data.username,
                id: user.id
            },
            systemConfig.get('token.seed'),
            {
                expiresIn: systemConfig.get('token.expire')
            }
        );

        if (typeof process.env.NODE_ENV !== "undefined" && process.env.NODE_ENV.trim() === 'test') {
            process.env.token = token;
        }

        return {
            code: ResCode.SUCCESS,
            message: 'Login success',
            data: { 
                token: token, 
                id: user.id 
            }
        }
    } else {
        return {
            code: ResCode.AUTH_FAIL,
            message:'UserName/Password incorrect!'
        }
    }
}

module.exports = {
    login
}