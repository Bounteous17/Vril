const debug = require('debug')('Vril:UsersModule');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const vrilConfig = require('../../config/config');
const User = require('../models/user.schema');

const __create = async (name, email, password) => {
    try {
        const passwordHash = await bcrypt.hash(password, vrilConfig().auth.saltRounds);
        const user = new User({
            full_name: name,
            email: email,
            password: passwordHash
        });
        await user.save();
        return {
            error: false,
            message: 'New user created'
        }
    } catch (error) {
        debug(error);
        return {
            error: true,
            message: 'Error creating user: check if user already exists, email is valid or password is strong'
        }
    }
}

module.exports = () => {
    return {
        create: __create
    }
}