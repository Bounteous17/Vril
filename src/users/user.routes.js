const debug = require('debug')('Vril:PublicRouter');
const sanitize = require('mongo-sanitize');
const express = require('express'),
    router = express.Router();
const publicModule = require('./user.module');

router.post('/create', async (req, res) => {
    try {
        debug('Signup requested');
        const name = sanitize(req.body.name);
        const email = sanitize(req.body.email);
        const password = sanitize(req.body.password);
        const login = await publicModule().create(name, email, password);
        if (login.error) {
            res.status(500);
            res.send(login.message);
        }
        res.send('Signup success for user ' + email);   
    } catch (error) {
        res.status(500);
        res.send('General error');
    }
});

module.exports = router;