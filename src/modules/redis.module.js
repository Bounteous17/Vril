const debug = require('debug')('Vril:RedisCC');
const redis = require("async-redis");
const VrilConfig = require('../../config/config')();

const __client = redis.createClient({
    host: VrilConfig.redis.host,
    port: VrilConfig.redis.port
});

__client.on('connect', () => {
    debug('Redis client connected');
});

__client.on('error', (err) => {
    debug("Error " + err);
});

module.exports = () => {
    return {
        client: __client
    }
}