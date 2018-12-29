const debug = require("debug")("Vril:PublicRouter");
const sanitize = require("mongo-sanitize");
const express = require("express"),
    router = express.Router();
const PublicModule = require("./public.module")();
const Helpers = require("./../helpers/helpers")();
const FieldsValid = require("../@middlewares/fields.middleware");

router.get("/", async (req, res) => {
    try {
        const status = await PublicModule.status(req);
        res.send(status);
    } catch (error) {
        debug(error);
        res.status(500);
        res.send({ status: "failed" });
    }
});

router.post("/create", FieldsValid('create'), async (req, res) => {
    try {
        let full_name = sanitize(req.body.FullName);
        let username = sanitize(req.body.Username);
        let email = sanitize(req.body.Mail);
        let power = sanitize(req.body.Power);
        let password = sanitize(req.body.Password);
        let resSignup = await PublicModule.create(full_name, username, email, power, password);
        let { status, body } = Helpers.resStatGen(resSignup);
        res.status(status);
        res.send(body);
        return;
    } catch (error) {
        debug('Error into /user/signup: %o', error);
        res.status(500);
        res.send("Signup server error");
    }
});

router.post("/login", FieldsValid('login'), async (req, res) => {
    try {
        let username = sanitize(req.body.Username);
        let password = sanitize(req.body.Password);
        let resLogin = await PublicModule.login(username, password);
        let { status, body } = Helpers.resStatGen(resLogin);
        res.status(status);
        res.send(body);
        return;
    } catch (error) {
        debug('Error into /user/login: %o', error);
        res.status(500);
        res.send("Login server error");
    }
});

module.exports = router;
