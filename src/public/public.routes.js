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

router.post("/login", FieldsValid, async (req, res) => {
  try {
    let username = sanitize(req.body.Username);
    let password = sanitize(req.body.Password);
    let resLogin = await PublicModule.login(username, password);
    let { status, body } = Helpers.resStatGen(resLogin);
    res.status(status);
    res.send(body);
    return;
  } catch (error) {
    debug(error);
    res.status(500);
    res.send({ status: "failed" });
  }
});

module.exports = router;
