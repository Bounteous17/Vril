const fs = require('fs');
const vrilConfig = require('../../config/config')();

const pathLog = vrilConfig.log.path;
const infoLog = `${pathLog}${vrilConfig.log.info}`;
const accessLog = `${pathLog}${vrilConfig.log.access}`;
const errorLog = `${pathLog}${vrilConfig.log.error}`;

const Logger = exports.Logger = {};

const infoStream = fs.createWriteStream(infoLog);
const accessStream = fs.createWriteStream(accessLog);
const errorStream = fs.createWriteStream(errorLog);

const createMesg = (mesg) => {
    let message = new Date().toISOString() + " - " + JSON.stringify(mesg) + "\n";
    return message;
}

Logger.info = (mesg) => {
    infoStream.write(createMesg(mesg));
}

Logger.access = (mesg) => {
    accessStream.write(createMesg(mesg));
}

Logger.error = (mesg) => {
    errorStream.write(createMesg(mesg));
}