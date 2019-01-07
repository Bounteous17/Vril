const debug = require("debug")("Vril:TimeLogger");
const express = require("express"),
    router = express.Router();
const logger = require("../utils/logger").Logger;


module.exports = (req, res, next) => {
    try {
        let tmpReq = req.headers;
        tmpReq['protocol'] = req.protocol;
        tmpReq['originalUrl'] = req.originalUrl;
        logger.info(tmpReq);
        next();
    } catch (error) {
        debug(error);
        res.status(500);
        res.send();
        return;
    }
}