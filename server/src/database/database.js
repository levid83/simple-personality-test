const { connect, disconnect, connection } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function dbConnect() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  await connect(uri, mongooseOpts);
  return mongod;
}

async function dbDisconnect(mongod) {
  await disconnect();
  if (mongod) await mongod.stop();
}

async function dbClear() {
  const collections = connection.collections;

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
