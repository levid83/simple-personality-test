const config = require("./jest.config.js");

config.testMatch = ["**/?(*.)+(int).(spec|test).[jt]s?(x)"];

module.exports = config;
