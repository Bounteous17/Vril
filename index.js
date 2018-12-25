const debug = require('debug')('Vril:Index');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const vrilConfig = require('./config/config');

const publicRoutes = require('./src/public/public.routes');
const usersRoutes = require('./src/users/user.routes');

// Modules
const vrilDB = require('./src/modules/mongo.module');

app.use(bodyParser.json());

// Cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
})

// Public Routes
app.use('/', publicRoutes);
// Protected routes
app.use('/users', usersRoutes);

// Create express server
const port = vrilConfig().server.port;
const host = vrilConfig().server.host;
app.listen(port, host, async () => {
    debug('Vril API Server running on port:', port);
}); 