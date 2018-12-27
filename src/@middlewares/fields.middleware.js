const debug = require("debug")("Vril:FieldsMiddleware");
const express = require("express"),
  router = express.Router();
const Helpers = require("../helpers/helpers")();


module.exports = (resource) => {
  return (req, res, next) => {
    if (resource === 'login') {
      try {
        let validFields = Helpers.fieldsCheck(
          [req.body.Username, req.body.Password],
          "user and password"
        );
        if (!validFields.error) {
          return next();
        } else {
          res.status(validFields.status);
          res.send(validFields.message);
          return;
        }
      } catch (error) {
        res.status(500);
        res.send("Internal error");
        return;
      }
    } else {
      debug('Error on __fieldsValidator: %o', 'Not a valid resource')
      res.status(500);
      res.send('Internal error');
      return;
    }
  };
}
