const __server = {
    port: 5000,
    host: "0.0.0.0"
}

const __auth = {
    saltRounds: 10,
    jwtAlg: 'HS512'
}

const __tokens = {
    exp: '1h',
    secret: 'keyboard cat'
}

const __mongo = {
    host: 'swagger-vril-dev',
    port: ':5002',
    db: '/vril'
}

const __redis = {
    host: 'redis-vril-dev',
    port: 5003
}

module.exports = () => {
    return {
        server: __server,
        auth: __auth,
        mongo: __mongo,
        redis: __redis,
        tokens: __tokens
    }
}