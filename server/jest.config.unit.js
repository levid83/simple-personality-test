const config = require("./jest.config.js");

config.testMatch = ["**/?(*.)+(unit).(spec|test).[jt]s?(x)"];

module.exports = config;
