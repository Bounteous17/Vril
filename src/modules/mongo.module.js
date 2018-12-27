const debug = require('debug')('Vril:MongoDB');
const mongoose = require('mongoose');
const VrilConfig = require('../../config/config')();
mongoose.Promise = require('bluebird');

const dbUri = 'mongodb://'
    + VrilConfig.mongo.host
    + VrilConfig.mongo.port
    + VrilConfig.mongo.db;

// Create the database connection
mongoose.connect(
    dbUri,
    { useNewUrlParser: true },
);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    debug('Mongoose default connection open to ' + dbUri);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    debug('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    debug('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

require('../models/user.schema');