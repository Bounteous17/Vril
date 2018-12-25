const debug = require('debug')('Vril:JwtModule');
const express = require('express'),
    router = express.Router();
const jwt = require('jsonwebtoken');
const vrilConfig = require('../../config/config');

router.use(async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenData = await jwt.verify(
            token,
            vrilConfig().tokens.secret
        )
    } catch (error) {
        debug(error);
        res.status(403);
        res.send('Token not valid, login again');
        return;
    }
})

module.exports = router;