const __server = {
    "port": 8989,
    "host": "127.0.0.1"
}

const __auth = {
    saltRounds: 10,
}

const __mongo = {
    dbUri: 'mongodb://localhost:27017/vril',
}

module.exports = () => {
    return {
        server: __server,
        auth: __auth,
        mongo: __mongo
    }
}