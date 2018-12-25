const debug = require('debug')('Vril:RedisCC');
const redis = require("async-redis");
const vrilConfig = require('../../config/config');

const __client = redis.createClient({
    host: vrilConfig().redis.host,
    port: vrilConfig().redis.port
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