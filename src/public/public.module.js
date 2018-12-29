const debug = require("debug")("Vril:PublicModule");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment")
const Users = require("../models/user.schema");
const RedisVril = require("../modules/redis.module")();
const VrilConfig = require("../../config/config")();

const __moduleSettings = () => {
  return {
    badAuth: { errorCode: 500, message: "No user found or password incorrect" },
    userExists: { errorCode: 500, message: "Username already registered" },
    tokenError: {
      errorCode: 500,
      message: 'Error can not generate token for that user'
    }
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
      error: error,
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

    let token = await __genToken(sUser._id);
    if (!token) {
      return __moduleSettings().badAuth;
    }

    return token
  } catch (error) {
    debug('Error into __login: %o', error);
    return {
      errorCode: 500,
      message: "Internal server error during login the user"
    };
  }
};

const __genToken = async userId => {
  try {
    let storedSessions = [];
    let exp = VrilConfig.tokens.exp;
    let payload = {
      userId: userId,
      expiresDate: moment().add(exp, 'seconds'),
      expiresEllapse: exp,
    };
    let options = {
      expiresIn: exp,
    };

    let token = await __storeToken(payload, options);

    if (token) {
      let actualSessions = await RedisVril
        .clientSessions()
        .get(userId.toString());

      storedSessions.push(token);
      if (actualSessions && actualSessions !== null) {
        actualSessions = actualSessions.split(',');
        for (let session of actualSessions) {
          storedSessions.push(session);
        }
      }

      await RedisVril
        .clientSessions()
        .set(userId.toString(), storedSessions.toString());
      debug(
        'Generated token, assigning token with the sessionID on Redis CC ...',
        token.substr(0, 20),
      );
      return token;
    } else {
      return __moduleSettings().tokenError;
    }
  } catch (error) {
    debug('Error __storeToken: %o', error);
    return __moduleSettings().tokenError;
  }
};

const __storeToken = async (payload, options) => {
  try {
    return await RedisVril.signTokenRedis.sign(
      payload,
      VrilConfig.tokens.secret,
      options
    ); 
  } catch (error) {
    debug('Error into __storeToken: %o', error);
    return {
      errorCode: 500,
      error: error,
      message: 'Error store token'
    }
  }
};

module.exports = () => {
  return {
    status: __status,
    login: __login,
    create: __create
  };
};
