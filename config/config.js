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
    host: 'mongo-vril',
    port: ':5002',
    db: '/vril'
}

const __redis = {
    host: 'redis-vril',
    port: 5003
}

const __adminDefault = {
    username: 'admin',
    full_name: 'Administrator default',
    email: 'admin@localhost.lo',
    power: 0,
    defaultPassword: '0l4uIu7ibBWThkfCu4ktcqn1l3MdWq',
    randomPassword: {
        length: 30,
        numbers: true
    }
}

const __users = {
    __adminDefault
}

module.exports = () => {
    return {
        server: __server,
        auth: __auth,
        mongo: __mongo,
        redis: __redis,
        tokens: __tokens,
        users: __users
    }
}