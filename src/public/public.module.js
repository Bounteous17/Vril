const debug = require('debug')('Vril:PublicModule');
const mongoose = require('mongoose');

const __status = async (req) => {
    debug(req.headers);
    return {status: 'alive'};
}

module.exports = () => {
    return {
        status: __status
    }
}