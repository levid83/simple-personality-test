const { connect, disconnect, connection } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

async function dbConnect(
  options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
) {
  let mongod;
  if (process.env.IN_MEMORY_DATABASE) {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    process.env.MONGODB_URI = uri.slice(0, uri.lastIndexOf("/"));
  }
  await connect(process.env.MONGODB_URI, options);
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
