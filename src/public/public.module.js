const debug = require('debug')('Vril:PublicModule');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/user.schema');

const __status = async (req) => {
    debug(req.headers);
    return {status: 'alive'};
}

const __login = async (email, password) => {
    try {
        const sUser = await Users.findOne({
            email: email
        }).select('password');
        const badAuth = {
            error: true,
            message: 'No user found or password incorrect'
        };
        if (!sUser) {
            return badAuth;
        }
        const authSuccess = await bcrypt.compare(password, sUser.password);
        if (!authSuccess) {
            return badAuth;
        }
        return {
            error: false,
            message: 'Auth correct'
        }
    } catch (error) {
        debug(error);
        return {
            error: true,
            message: 'Error auth'
        }
    }
}

module.exports = () => {
    return {
        status: __status,
        login: __login
    }
}