const UserService = require('../services/UserService');
const logService = require('../services/LogService');

async function login(request, response) {
    let startTime = new Date();
    let loginUser = {
        username: request.body.user_name,
        password: request.body.password
    }
    let result = await UserService.login(loginUser);
    let endTime = new Date();
    let logData = [
        { key: "Start time", content: startTime },
        { key: "End time", content: endTime },
        { key: "File", content: "UserController.js" },
        { key: "Function", content: "login" }
    ]
    await logService.accessLog(logData);

    return response.json(result);
}

module.exports = {
    login
}