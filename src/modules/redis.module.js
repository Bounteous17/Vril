const debug = require('debug')('Vril:RedisCC');
const redis = require("async-redis");
const VrilConfig = require('../../config/config')();

let mainConstr = {
    host: VrilConfig.redis.host,
    port: VrilConfig.redis.port,
    maxretries: VrilConfig.redis.maxRetries,
    secret: VrilConfig.redis.secret,
};

const __listInstances = (instanceObj, instance) => {
    instanceObj.on('error', err => {
        debug('Could not establish a connection with redis DB ->', instance + err);
    });

    instanceObj.on('connect', succ => {
        debug('Redis client connected successfully to DB ->', instance);
    });
};

const __clientSessions = () => {
    let __sessionsDB = mainConstr;
    __sessionsDB['db'] = VrilConfig.redis.client.sessions;
    return redis.createClient(__sessionsDB);
};

const __clientTokens = () => {
    let __tokensDB = mainConstr;
    __tokensDB['db'] = VrilConfig.redis.client.jwtr;
    return redis.createClient(__tokensDB);
};

module.exports = () => {
    return {
        clientSessions: __clientSessions,
        clientTokens: __clientTokens,
        listInstances: __listInstances
    }
}