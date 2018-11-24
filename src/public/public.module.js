const debug = require('debug')('Vril:PublicModule');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user.schema');
const Redis = require('../modules/redis.module');
const vrilConfig = require('../../config/config');

const __status = async (req) => {
    debug(req.headers);
    return {status: 'alive'};
}

const __login = async (email, password) => {
    try {
        const sUser = await Users.findOne({
            email: email
        }).select('_id password');
        const badAuth = {
            error: true,
            message: 'No user found or password incorrect'
        }
        if (!sUser) {
            return badAuth;
        }
        const authSuccess = await bcrypt.compare(password, sUser.password);
        if (!authSuccess) {
            return badAuth;
        }
        const token = await __generateJwt(sUser._id);
        if (!token) {
            return badAuth;
        }
        return {
            error: false,
            message: 'Auth correct',
            token: token
        }
    } catch (error) {
        debug(error);
        return {
            error: true,
            message: 'Error auth'
        }
    }
}

const __generateJwt = async (user) => {
    try {
        const token = await jwt.sign({
            user: user
        }, vrilConfig().tokens.secret,
        {
            algorithm: vrilConfig().auth.jwtAlg,
            expiresIn: vrilConfig().tokens.exp
        })
        return token;
    } catch (error) {
        debug(error);
        return false;
    }
}

module.exports = () => {
    return {
        status: __status,
        login: __login
    }
}