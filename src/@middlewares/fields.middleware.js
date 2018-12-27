const debug = require("debug")("Vril:FieldsMiddleware");
const express = require("express"),
  router = express.Router();
const Helpers = require("../helpers/helpers")();


module.exports = (resource) => {
  return (req, res, next) => {
    let validFields = {};
    if (resource === 'login') {
      validFields = Helpers.fieldsCheck(
        [req.body.Username, req.body.Password],
        "user and password"
      );
    } else if (resource === 'signup') {
      validFields = Helpers.fieldsCheck(
        [req.body.Username, req.body.Password, req.body.Mail],
        "user, password and email"
      );
    } else {
      debug('Error on __fieldsValidator: %o', new Error('Not a valid resource'))
      res.status(500);
      res.send('Internal error');
      return;
    }

    if (!validFields.error) {
      return next();
    } else {
      res.status(validFields.status);
      res.send(validFields.message);
      return;
    }

  };
}
