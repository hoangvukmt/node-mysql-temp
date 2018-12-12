'use_strict';

const express = require('express');
const db = require('./api/util/db_util');

const appRouter = require('./api/middleware/app_router');
var app = express();

async function startServer() {
    let dbConnect = await db.dbConnect();    
    if(dbConnect) {        
        console.log('Connected to DB.....Server started!');
    }
    else {
        console.log('Connect to DB fail! Server stopped!');
        process.exit(1);
    }
}

if (typeof process.env.NODE_ENV === "undefined" || process.env.NODE_ENV.trim() !== "test"){
    startServer();
}

// use authen for route of back-end
app.use('/api', appRouter);
app.listen(2000);

/**
 * Catch 404 err for request
 * redirect to front-end
 */
app.use(function (req, res, next) {
    res.redirect('/');
});

module.exports = app;
