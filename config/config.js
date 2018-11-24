const __server = {
    "port": 5000,
    "host": "0.0.0.0"
}

const __auth = {
    saltRounds: 10,
}

const __mongo = {
    dbUri: 'mongodb://localhost:5002/vril',
}

module.exports = () => {
    return {
        server: __server,
        auth: __auth,
        mongo: __mongo
    }
}