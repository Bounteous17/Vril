const debug = require("debug")("Vril:FieldsMiddleware");
const express = require("express"),
  router = express.Router();
const Helpers = require("../helpers/helpers")();

router.use((req, res, next) => {
  try {
    let validFields = Helpers.fieldsCheck(
      [req.body.Username, req.body.Password],
      "user and password"
    );
    if (!validFields.error) {
      next();
    } else {
      res.status(validFields.status);
      res.send(validFields.message);
      return;
    }
  } catch (error) {
    debug(error);
    res.status(500);
    res.send("Internal error");
    return;
  }
});

module.exports = router;
