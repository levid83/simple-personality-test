const { createServer } = require("../server");
const { dbConnect, dbDisconnect, dbClear } = require("../database/database");

const supertest = require("supertest");

require("dotenv").config();

beforeAll(async () => {
  global.request = supertest(createServer());
  global.mongod = await dbConnect();
});

afterEach(async () => {
  await dbClear();
});

afterAll(async () => {
  await dbDisconnect(mongod);
});
