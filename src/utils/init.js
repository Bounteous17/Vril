const debug = require("debug")("Vril:InitUtil");
const Helpers = require('../helpers/helpers')();
const VrilConfig = require("../../config/config")();
const RedisVril = require('../modules/redis.module')();
const mongoose = require('mongoose'),
    User = mongoose.model('User');

const __createAdminUser = async () => {
    try {
        let adminPlainPasswd = VrilConfig.users.__adminDefault.defaultPassword;
        let adminHashPasswd = Helpers.hashPasswd(adminPlainPasswd);
        let adminUser = new User({
            full_name: VrilConfig.users.__adminDefault.full_name,
            username: VrilConfig.users.__adminDefault.username,
            email: VrilConfig.users.__adminDefault.email,
            power: VrilConfig.users.__adminDefault.power,
            password: adminHashPasswd
        })
        await adminUser.save();
        return adminUser;
    } catch (error) {
        debug('Error into __createAdminUser: %o', error);
        return {
            errorCode: 500,
            error: error,
            message: "Error create admin default"
        };
    }
}

const __findAdminUser = async (action) => {
    try {
        let sUser = await User.find(
            { power: 0 }
        )
        if (action === 'create' && !sUser[0]) {
            let adminUser = await __createAdminUser()
            debug('Default Administrator user created success: %o', adminUser);
        } else {
            debug('An Admin user already exists, I will not create the default one');
        }
        return sUser
    } catch (error) {
        debug('Error into __findAdminUser: %o', error);
        return {
            errorCode: 500,
            error: error,
            message: "Error on init system"
        };
    }
}

const __instanciateRedisDBs = () => {
    RedisVril.listInstances(RedisVril.clientSessions(), 'Sessions');
}

module.exports = () => {
    return {
        createAdminUser: __createAdminUser,
        findAdminUser: __findAdminUser,
        instanciateRedisDBs: __instanciateRedisDBs,
    }
}