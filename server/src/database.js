const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function dbConnect() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await mongoose.connect(uri, mongooseOpts);
  return mongod;
}

async function dbDisconnect(mongod) {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
}

async function dbClear() {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbClear,
};
