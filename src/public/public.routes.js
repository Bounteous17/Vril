const debug = require('debug')('Vril:PublicRouter');
const sanitize = require('mongo-sanitize');
const express = require('express'),
    router = express.Router();
const publicModule = require('./public.module');

router.get('/', async (req, res) => {
    debug(req.headers);
    res.send({
        alive: true 
    });
});

module.exports = router;