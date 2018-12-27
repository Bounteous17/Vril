const debug = require("debug")("Vril:PublicModule");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user.schema");
const Redis = require("../modules/redis.module");
const VrilConfig = require("../../config/config")();

const __moduleSettings = () => {
  return {
    badAuth: { errorCode: 500, message: "No user found or password incorrect" },
    userExists: { errorCode: 500, message: "Username already registered" },
  };
};

const __status = async req => {
  debug(req.headers);
  return { status: "alive" };
};

const __findUser = async (username, values) => {
  return await Users.findOne({
    username: username
  }).select(values);
}

const __create = async (full_name, username, email, power, password) => {
  try {
    let sUser = await __findUser(username);
    if (sUser) {
      return __moduleSettings().userExists;
    }

    newUser = new User({
      full_name: full_name,
      username: username,
      email: email,
      power: power,
      password: password
    });
    await newUser.save();
    debug('User registration success with pasword');

    return newUser
  } catch (error) {
    debug('Error into __create: %o', error);
    return {
      errorCode: 500,
      message: 'Internal server error creating user',
    };
  }
};

const __login = async (username, password) => {
  try {
    let sUser = await __findUser(username);
    if (!sUser) {
      return __moduleSettings().badAuth;
    }

    let authSuccess = await bcrypt.compare(password, sUser.password);
    if (!authSuccess) {
      return __moduleSettings().badAuth;
    }

    let token = await __generateJwt(sUser._id);
    if (!token) {
      return __moduleSettings().badAuth;
    }

    return {
      message: "Auth correct",
      token: token
    };
  } catch (error) {
    debug('Error into __login: %o', error);
    return {
      errorCode: 500,
      message: "Internal server error during login the user"
    };
  }
};

const __generateJwt = async user => {
  try {
    const token = await jwt.sign(
      {
        user: user
      },
      VrilConfig.tokens.secret,
      {
        algorithm: VrilConfig.auth.jwtAlg,
        expiresIn: VrilConfig.tokens.exp
      }
    );
    return token;
  } catch (error) {
    debug(error);
    return false;
  }
};

module.exports = () => {
  return {
    status: __status,
    login: __login,
    create: __create
  };
};
