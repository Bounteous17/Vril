const debug = require('debug')('Vril:PublicRouter');
const sanitize = require('mongo-sanitize');
const express = require('express'),
    router = express.Router();
const publicModule = require('./public.module');

router.get('/', async (req, res) => {
    try {
        const status = await publicModule().status(req);   
        res.send(status);
    } catch (error) {
        debug(error);
        res.status(500);
        res.send({status: 'failed'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const email = sanitize(req.body.email);
        const password = sanitize(req.body.password);
        const login = await publicModule().login(email, password);
        if (login.error) {
            res.status(403);
        }
        res.send(login.message);
    } catch (error) {
        debug(error);
        res.status(500);
        res.send({status: 'failed'});
    }
});

module.exports = router;