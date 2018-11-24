const redis = require("async-redis");
const vrilConfig = require('../../config/config');

const __client = redis.createClient({
    host: vrilConfig().redis.host,
    port: vrilConfig().redis.port
});

__client.on("error", (err) => {
    console.log("Error " + err);
});

module.exports = () => {
    return {
        client: __client
    }
}